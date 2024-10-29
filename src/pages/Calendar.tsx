import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { CalendarGrid } from '../components/Calendar/CalendarGrid';
import { EventModal } from '../components/Calendar/EventModal';
import { useAuth } from '../contexts/AuthContext';
import { CalendarEvent } from '../types';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    if (currentUser) {
      loadEvents();
    }
  }, [currentUser, currentDate]);

  const loadEvents = async () => {
    if (!currentUser) return;

    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('userId', '==', currentUser.uid));
    
    try {
      const querySnapshot = await getDocs(q);
      const loadedEvents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CalendarEvent[];
      setEvents(loadedEvents);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleSaveEvent = async (eventData: Omit<CalendarEvent, 'id'>) => {
    if (!currentUser) return;

    try {
      const eventsRef = collection(db, 'events');
      await addDoc(eventsRef, {
        ...eventData,
        userId: currentUser.uid
      });
      loadEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-semibold">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        <CalendarGrid
          currentDate={currentDate}
          events={events}
          onDateClick={handleDateClick}
        />

        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
          selectedDate={selectedDate}
        />
      </main>
    </div>
  );
};