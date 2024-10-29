import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { CalendarEvent } from '../../types';

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, events, onDateClick }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="grid grid-cols-7 gap-1">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className="p-2 text-center font-semibold text-gray-600">
          {day}
        </div>
      ))}
      
      {days.map((day) => {
        const dayEvents = events.filter(event => 
          format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
        );

        return (
          <button
            key={day.toString()}
            onClick={() => onDateClick(day)}
            className={`
              min-h-[100px] p-2 border rounded-lg
              ${!isSameMonth(day, currentDate) ? 'bg-gray-100' : 'bg-white'}
              ${isToday(day) ? 'border-blue-500' : 'border-gray-200'}
              hover:bg-gray-50 transition-colors
            `}
          >
            <div className="text-right mb-1">
              <span className={`
                text-sm font-medium
                ${!isSameMonth(day, currentDate) ? 'text-gray-400' : 'text-gray-700'}
              `}>
                {format(day, 'd')}
              </span>
            </div>
            <div className="space-y-1">
              {dayEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="text-xs p-1 rounded bg-blue-100 text-blue-700 truncate"
                >
                  {event.title}
                </div>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
};