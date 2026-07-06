"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT || 8000);
const HOST = '0.0.0.0';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const API_BASE_URL = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
app.use(express_1.default.json());
const sendCollection = async (res, fetcher) => {
    try {
        const collection = await fetcher();
        res.json(collection);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({ error: message });
    }
};
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl: API_BASE_URL, port: PORT });
});
app.get('/api/users/', (_req, res) => {
    void sendCollection(res, async () => models_1.User.find().lean());
});
app.get('/api/teams/', (_req, res) => {
    void sendCollection(res, async () => models_1.Team.find().lean());
});
app.get('/api/activities/', (_req, res) => {
    void sendCollection(res, async () => models_1.Activity.find().populate('user', 'name email').lean());
});
app.get('/api/leaderboard/', (_req, res) => {
    void sendCollection(res, async () => models_1.LeaderboardEntry.find().populate('user', 'name').lean());
});
app.get('/api/workouts/', (_req, res) => {
    void sendCollection(res, async () => models_1.Workout.find().lean());
});
mongoose_1.default
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
