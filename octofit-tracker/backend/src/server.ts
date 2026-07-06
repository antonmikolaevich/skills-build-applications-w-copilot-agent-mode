import express, { type Response } from 'express';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const HOST = '0.0.0.0';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());

const sendCollection = async (res: Response, fetcher: () => Promise<unknown[]>) => {
  try {
    const collection = await fetcher();
    res.json(collection);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
};

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl: API_BASE_URL, port: PORT });
});

app.get('/api/users/', (_req, res) => {
  void sendCollection(res, async () => User.find().lean());
});

app.get('/api/teams/', (_req, res) => {
  void sendCollection(res, async () => Team.find().lean());
});

app.get('/api/activities/', (_req, res) => {
  void sendCollection(res, async () => Activity.find().populate('user', 'name email').lean());
});

app.get('/api/leaderboard/', (_req, res) => {
  void sendCollection(res, async () => LeaderboardEntry.find().populate('user', 'name').lean());
});

app.get('/api/workouts/', (_req, res) => {
  void sendCollection(res, async () => Workout.find().lean());
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`MongoDB connected to ${MONGODB_URI}`);
  })
  .catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`MongoDB not available, continuing without it: ${message}`);
  });

app.listen(PORT, HOST, () => {
  console.log(`Backend listening on http://${HOST}:${PORT}`);
  console.log(`API base URL: ${API_BASE_URL}`);
});
