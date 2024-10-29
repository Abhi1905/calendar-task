import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { auth } from './config/firebase.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticateUser = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Protected routes
app.get('/api/events', authenticateUser, async (req, res) => {
  try {
    // TODO: Implement MongoDB integration
    res.json({ events: [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.post('/api/events', authenticateUser, async (req, res) => {
  try {
    const { title, description, date } = req.body;
    // TODO: Implement MongoDB integration
    res.status(201).json({ message: 'Event created' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});