import mongoose, { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, min: 13, max: 100 },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    city: { type: String, trim: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' }
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sport: { type: String, required: true, trim: true },
    members: { type: Number, default: 0, min: 0 },
    score: { type: Number, default: 0 },
    captain: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, default: 0, min: 0 },
    loggedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true, trim: true },
    points: { type: Number, default: 0, min: 0 },
    rank: { type: Number, min: 1 },
    streak: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'hard'],
      default: 'moderate'
    },
    equipment: { type: [String], default: [] },
    focusArea: { type: String, trim: true }
  },
  { timestamps: true }
);

export const User = model('User', userSchema, 'users');
export const Team = model('Team', teamSchema, 'teams');
export const Activity = model('Activity', activitySchema, 'activities');
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema, 'leaderboard');
export const Workout = model('Workout', workoutSchema, 'workouts');

export default mongoose;
