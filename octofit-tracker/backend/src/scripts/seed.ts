import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const createdUsers = await User.create([
      {
        name: 'Ava Chen',
        email: 'ava.chen@example.com',
        age: 29,
        fitnessLevel: 'advanced',
        city: 'Seattle'
      },
      {
        name: 'Noah Patel',
        email: 'noah.patel@example.com',
        age: 34,
        fitnessLevel: 'intermediate',
        city: 'Austin'
      },
      {
        name: 'Mina Alvarez',
        email: 'mina.alvarez@example.com',
        age: 27,
        fitnessLevel: 'beginner',
        city: 'Denver'
      }
    ]);

    const createdTeams = await Team.create([
      {
        name: 'Rocket Runners',
        sport: 'Running',
        members: 6,
        score: 1240,
        captain: createdUsers[0]._id
      },
      {
        name: 'Peak Performers',
        sport: 'Cross Training',
        members: 5,
        score: 980,
        captain: createdUsers[1]._id
      }
    ]);

    await User.findByIdAndUpdate(createdUsers[0]._id, { team: createdTeams[0]._id });
    await User.findByIdAndUpdate(createdUsers[1]._id, { team: createdTeams[1]._id });
    await User.findByIdAndUpdate(createdUsers[2]._id, { team: createdTeams[0]._id });

    await Activity.create([
      {
        user: createdUsers[0]._id,
        type: 'Run',
        durationMinutes: 35,
        caloriesBurned: 320,
        distanceKm: 5.4,
        loggedAt: new Date('2026-07-05T06:15:00.000Z')
      },
      {
        user: createdUsers[1]._id,
        type: 'Strength',
        durationMinutes: 45,
        caloriesBurned: 280,
        distanceKm: 0,
        loggedAt: new Date('2026-07-04T18:30:00.000Z')
      },
      {
        user: createdUsers[2]._id,
        type: 'Yoga',
        durationMinutes: 30,
        caloriesBurned: 180,
        distanceKm: 0,
        loggedAt: new Date('2026-07-03T07:00:00.000Z')
      }
    ]);

    await LeaderboardEntry.create([
      {
        user: createdUsers[0]._id,
        username: 'ava.chen',
        points: 320,
        rank: 1,
        streak: 7
      },
      {
        user: createdUsers[1]._id,
        username: 'noah.patel',
        points: 280,
        rank: 2,
        streak: 4
      },
      {
        user: createdUsers[2]._id,
        username: 'mina.alvarez',
        points: 240,
        rank: 3,
        streak: 2
      }
    ]);

    await Workout.create([
      {
        title: 'Morning Jog',
        type: 'Cardio',
        durationMinutes: 20,
        difficulty: 'easy',
        equipment: ['running shoes'],
        focusArea: 'endurance'
      },
      {
        title: 'Core Circuit',
        type: 'Strength',
        durationMinutes: 30,
        difficulty: 'moderate',
        equipment: ['mat'],
        focusArea: 'core'
      },
      {
        title: 'Hill Intervals',
        type: 'Cardio',
        durationMinutes: 25,
        difficulty: 'hard',
        equipment: ['running shoes'],
        focusArea: 'speed'
      }
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
