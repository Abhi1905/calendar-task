import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import dotenv from 'dotenv';

dotenv.config();

const app = initializeApp({
  credential: cert({
    projectId: 'calendar-task-70f32',
    clientEmail: 'firebase-adminsdk-v8886@calendar-task-70f32.iam.gserviceaccount.com',
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

export const auth = getAuth(app);