import React, { useState } from 'react';
import { Dumbbell, ChevronDown, Target, ArrowRight, Calendar, Clock, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

type ExerciseCategory = 'push' | 'pull' | 'legs';
type MuscleGroup = 'chest' | 'shoulders' | 'triceps' | 'back' | 'biceps' | 'legs' | 'core';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  category: ExerciseCategory;
  muscleGroups: MuscleGroup[];
  description?: string;
}

interface Day {
  name: string;
  exercises: Exercise[];
}

interface WorkoutPlan {
  id: string;
  name: string;
  goal: string;
  daysPerWeek: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  days: Day[];
}

const WORKOUT_PLANS: WorkoutPlan[] = [
  {
    id: 'beginner-full-body',
    name: 'Beginner Full-Body Plan',
    goal: 'Build foundational strength and technique',
    daysPerWeek: 3,
    duration: '45-60 minutes',
    level: 'beginner',
    days: [
      {
        name: 'Day 1',
        exercises: [
          { name: 'Squats', sets: 3, reps: '10', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Push-Ups', sets: 3, reps: '10-15', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' },
          { name: 'Dumbbell Rows', sets: 3, reps: '10 per arm', category: 'pull', muscleGroups: ['back', 'biceps'], description: 'This is a description' },
          { name: 'Plank', sets: 3, reps: '20-30 seconds', category: 'core', muscleGroups: ['core'], description: 'This is a description' }
        ]
      },
      {
        name: 'Day 2',
        exercises: [
          { name: 'Deadlifts', sets: 3, reps: '8', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Dumbbell Bench Press', sets: 3, reps: '10', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' },
          { name: 'Lat Pulldowns', sets: 3, reps: '12', category: 'pull', muscleGroups: ['back', 'biceps'], description: 'This is a description' },
          { name: 'Bicycle Crunches', sets: 3, reps: '20 per side', category: 'core', muscleGroups: ['core'], description: 'This is a description' }
        ]
      },
      {
        name: 'Day 3',
        exercises: [
          { name: 'Lunges', sets: 3, reps: '12 per leg', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Overhead Dumbbell Press', sets: 3, reps: '10', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' },
          { name: 'Dumbbell Shrugs', sets: 3, reps: '12', category: 'pull', muscleGroups: ['back', 'biceps'], description: 'This is a description' },
          { name: 'Side Plank', sets: 3, reps: '20 seconds per side', category: 'core', muscleGroups: ['core'], description: 'This is a description' }
        ]
      }
    ]
  },
  {
    id: 'strength-focused',
    name: 'Strength-Focused Plan',
    goal: 'Maximize strength in compound lifts',
    daysPerWeek: 4,
    duration: '60-75 minutes',
    level: 'intermediate',
    days: [
      {
        name: 'Day 1 (Upper)',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: '6', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' },
          { name: 'Pull-Ups', sets: 4, reps: '6-8', category: 'pull', muscleGroups: ['back', 'biceps'], description: 'This is a description' },
          { name: 'Overhead Press', sets: 4, reps: '8', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' },
          { name: 'Barbell Curls', sets: 3, reps: '12', category: 'pull', muscleGroups: ['back', 'biceps'], description: 'This is a description' }
        ]
      },
      {
        name: 'Day 2 (Lower)',
        exercises: [
          { name: 'Squats', sets: 4, reps: '5', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Romanian Deadlifts', sets: 4, reps: '6-8', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Walking Lunges', sets: 3, reps: '12 per leg', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Seated Calf Raises', sets: 4, reps: '15', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' }
        ]
      },
      {
        name: 'Day 3 (Upper)',
        exercises: [
          { name: 'Incline Dumbbell Press', sets: 4, reps: '8', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' },
          { name: 'T-Bar Rows', sets: 4, reps: '8', category: 'pull', muscleGroups: ['back', 'biceps'], description: 'This is a description' },
          { name: 'Arnold Press', sets: 3, reps: '10', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' },
          { name: 'Tricep Rope Pushdowns', sets: 3, reps: '12', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' }
        ]
      },
      {
        name: 'Day 4 (Lower)',
        exercises: [
          { name: 'Deadlifts', sets: 4, reps: '5', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Front Squats', sets: 3, reps: '8', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Glute Bridges', sets: 3, reps: '12-15', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Standing Calf Raises', sets: 4, reps: '20', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' }
        ]
      }
    ]
  },
  {
    id: 'ppl',
    name: 'Push-Pull-Legs',
    goal: 'Maximize hypertrophy (muscle growth)',
    daysPerWeek: 6,
    duration: '60-90 minutes',
    level: 'advanced',
    days: [
      {
        name: 'Push',
        exercises: [
          { name: 'Flat Bench Press', sets: 4, reps: '8', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' },
          { name: 'Incline Dumbbell Press', sets: 4, reps: '10', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' },
          { name: 'Overhead Dumbbell Press', sets: 3, reps: '12', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' },
          { name: 'Cable Lateral Raises', sets: 3, reps: '15', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' },
          { name: 'Tricep Dips', sets: 3, reps: '12-15', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' }
        ]
      },
      {
        name: 'Pull',
        exercises: [
          { name: 'Deadlifts', sets: 4, reps: '6', category: 'pull', muscleGroups: ['back', 'biceps'], description: 'This is a description' },
          { name: 'Pull-Ups', sets: 4, reps: '8', category: 'pull', muscleGroups: ['back', 'biceps'], description: 'This is a description' },
          { name: 'Barbell Rows', sets: 3, reps: '10', category: 'pull', muscleGroups: ['back', 'biceps'], description: 'This is a description' },
          { name: 'Face Pulls', sets: 3, reps: '12', category: 'pull', muscleGroups: ['back', 'biceps'], description: 'This is a description' },
          { name: 'Bicep Hammer Curls', sets: 3, reps: '12', category: 'pull', muscleGroups: ['back', 'biceps'], description: 'This is a description' }
        ]
      },
      {
        name: 'Legs',
        exercises: [
          { name: 'Squats', sets: 4, reps: '6', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Romanian Deadlifts', sets: 3, reps: '8', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Leg Press', sets: 3, reps: '12', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Bulgarian Split Squats', sets: 3, reps: '12 per leg', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Seated Calf Raises', sets: 4, reps: '15', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' }
        ]
      }
    ]
  },
  {
    id: 'fat-loss-hiit',
    name: 'Fat Loss HIIT Plan',
    goal: 'Burn fat while maintaining muscle',
    daysPerWeek: 4,
    duration: '45 minutes',
    level: 'intermediate',
    days: [
      {
        name: 'Day 1 (HIIT Cardio + Weights)',
        exercises: [
          { name: '15-minute HIIT (sprints/cycling intervals)', sets: 1, reps: '15 minutes', category: 'cardio', muscleGroups: ['cardio'], description: 'This is a description' },
          { name: 'Deadlifts', sets: 3, reps: '8', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Push-Ups', sets: 3, reps: '20', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' },
          { name: 'Dumbbell Rows', sets: 3, reps: '10', category: 'pull', muscleGroups: ['back', 'biceps'], description: 'This is a description' }
        ]
      },
      {
        name: 'Day 2 (Bodyweight Circuit)',
        exercises: [
          { name: 'Jump Squats', sets: 3, reps: '12', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Mountain Climbers', sets: 3, reps: '20 per side', category: 'core', muscleGroups: ['core'], description: 'This is a description' },
          { name: 'Burpees', sets: 3, reps: '15', category: 'full body', muscleGroups: ['full body'], description: 'This is a description' },
          { name: 'Side Planks', sets: 3, reps: '20 seconds per side', category: 'core', muscleGroups: ['core'], description: 'This is a description' }
        ]
      },
      {
        name: 'Day 3 (Active Recovery)',
        exercises: [
          { name: 'Light Cardio (Brisk Walking)', sets: 1, reps: '30 minutes', category: 'cardio', muscleGroups: ['cardio'], description: 'This is a description' },
          { name: 'Yoga/Stretching', sets: 1, reps: '20 minutes', category: 'flexibility', muscleGroups: ['flexibility'], description: 'This is a description' }
        ]
      },
      {
        name: 'Day 4 (HIIT + Strength)',
        exercises: [
          { name: '10-minute HIIT (bike or rower)', sets: 1, reps: '10 minutes', category: 'cardio', muscleGroups: ['cardio'], description: 'This is a description' },
          { name: 'Squats', sets: 4, reps: '6', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Bench Press', sets: 3, reps: '8', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' },
          { name: 'Pull-Ups', sets: 3, reps: '10', category: 'pull', muscleGroups: ['back', 'biceps'], description: 'This is a description' }
        ]
      }
    ]
  },
  {
    id: 'functional-fitness',
    name: 'Functional Fitness Plan',
    goal: 'Improve athleticism and mobility',
    daysPerWeek: 3,
    duration: '45-60 minutes',
    level: 'intermediate',
    days: [
      {
        name: 'Day 1',
        exercises: [
          { name: 'Kettlebell Swings', sets: 3, reps: '15', category: 'full body', muscleGroups: ['full body'], description: 'This is a description' },
          { name: 'Pull-Ups', sets: 3, reps: '8-10', category: 'pull', muscleGroups: ['back', 'biceps'], description: 'This is a description' },
          { name: 'Medicine Ball Slams', sets: 3, reps: '20', category: 'full body', muscleGroups: ['full body'], description: 'This is a description' },
          { name: "Farmer's Carry", sets: 3, reps: '30 seconds', category: 'full body', muscleGroups: ['full body'], description: 'This is a description' }
        ]
      },
      {
        name: 'Day 2',
        exercises: [
          { name: 'Box Jumps', sets: 3, reps: '10', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Dumbbell Clean and Press', sets: 3, reps: '10', category: 'full body', muscleGroups: ['full body'], description: 'This is a description' },
          { name: 'TRX Rows', sets: 3, reps: '10', category: 'pull', muscleGroups: ['back', 'biceps'], description: 'This is a description' },
          { name: 'Plank with Shoulder Taps', sets: 3, reps: '20', category: 'core', muscleGroups: ['core'], description: 'This is a description' }
        ]
      },
      {
        name: 'Day 3',
        exercises: [
          { name: 'Deadlifts', sets: 4, reps: '5', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Bulgarian Split Squats', sets: 3, reps: '12 per leg', category: 'legs', muscleGroups: ['legs'], description: 'This is a description' },
          { name: 'Push-Ups', sets: 3, reps: '20', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' },
          { name: 'Hanging Leg Raises', sets: 3, reps: '15', category: 'core', muscleGroups: ['core'], description: 'This is a description' }
        ]
      }
    ]
  },
  {
    id: 'advanced-hypertrophy',
    name: 'Advanced Hypertrophy Plan',
    goal: 'Build maximum muscle size',
    daysPerWeek: 5,
    duration: '60-75 minutes',
    level: 'advanced',
    days: [
      {
        name: 'Day 1 (Chest & Triceps)',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: '8', category: 'push', muscleGroups: ['chest', 'shoulders', 'triceps'], description: 'This is a description' },
          { name: 'Bench Press', sets: 4, reps: '8' },
          { name: 'Incline Dumbbell Press', sets: 4, reps: '10' },
          { name: 'Chest Flys', sets: 3, reps: '12' },
          { name: 'Tricep Dips', sets: 3, reps: '12-15' }
        ]
      },
      {
        name: 'Day 2 (Back & Biceps)',
        exercises: [
          { name: 'Deadlifts', sets: 4, reps: '6' },
          { name: 'Pull-Ups', sets: 4, reps: '8' },
          { name: 'T-Bar Rows', sets: 4, reps: '10' },
          { name: 'Bicep Curls', sets: 3, reps: '12' }
        ]
      },
      {
        name: 'Day 3 (Legs)',
        exercises: [
          { name: 'Squats', sets: 4, reps: '6' },
          { name: 'Romanian Deadlifts', sets: 4, reps: '8' },
          { name: 'Leg Press', sets: 3, reps: '10' },
          { name: 'Seated Calf Raises', sets: 4, reps: '20' }
        ]
      },
      {
        name: 'Day 4 (Shoulders)',
        exercises: [
          { name: 'Overhead Press', sets: 4, reps: '8' },
          { name: 'Lateral Raises', sets: 3, reps: '15' },
          { name: 'Rear Delt Flys', sets: 3, reps: '15' },
          { name: 'Arnold Press', sets: 3, reps: '10' }
        ]
      },
      {
        name: 'Day 5 (Core & Cardio)',
        exercises: [
          { name: 'Plank', sets: 3, reps: '1 minute' },
          { name: 'Russian Twists', sets: 3, reps: '15 per side' },
          { name: 'Hanging Leg Raises', sets: 3, reps: '15' },
          { name: 'HIIT Cardio', sets: 1, reps: '20 minutes' }
        ]
      }
    ]
  },
  {
    id: 'time-crunched',
    name: 'Time-Crunched Plan',
    goal: 'Quick, effective workouts',
    daysPerWeek: 3,
    duration: '30 minutes',
    level: 'beginner',
    days: [
      {
        name: 'Day 1',
        exercises: [
          { name: 'Squats', sets: 3, reps: '10' },
          { name: 'Bench Press', sets: 3, reps: '8' },
          { name: 'Dumbbell Rows', sets: 3, reps: '10' }
        ]
      },
      {
        name: 'Day 2',
        exercises: [
          { name: 'Deadlifts', sets: 3, reps: '8' },
          { name: 'Push-Ups', sets: 3, reps: '15' },
          { name: 'Pull-Ups', sets: 3, reps: '8' }
        ]
      },
      {
        name: 'Day 3',
        exercises: [
          { name: 'Bulgarian Split Squats', sets: 3, reps: '12 per leg' },
          { name: 'Overhead Dumbbell Press', sets: 3, reps: '12' },
          { name: 'Plank', sets: 3, reps: '1 minute' }
        ]
      }
    ]
  },
  {
    id: 'endurance-athlete',
    name: 'Endurance Athlete Plan',
    goal: 'Boost stamina and maintain strength',
    daysPerWeek: 3,
    duration: '60-90 minutes',
    level: 'intermediate',
    days: [
      {
        name: 'Day 1',
        exercises: [
          { name: 'Long-Distance Running', sets: 1, reps: '60 minutes' },
          { name: 'Plank', sets: 3, reps: '1 minute' },
          { name: 'Side Plank', sets: 2, reps: '30 seconds per side' },
          { name: 'Bicycle Crunches', sets: 3, reps: '20 per side' }
        ]
      },
      {
        name: 'Day 2',
        exercises: [
          { name: 'Squats', sets: 4, reps: '10' },
          { name: 'Pull-Ups', sets: 4, reps: '8' },
          { name: 'Push-Ups', sets: 3, reps: '20' }
        ]
      },
      {
        name: 'Day 3',
        exercises: [
          { name: 'Sprint Intervals', sets: 10, reps: '30 seconds sprint, 1 minute rest' },
          { name: 'Dumbbell Bench Press', sets: 3, reps: '10' },
          { name: 'Deadlifts', sets: 3, reps: '8' }
        ]
      }
    ]
  },
  {
    id: 'bodyweight-only',
    name: 'Bodyweight-Only Plan',
    goal: 'Stay fit without equipment',
    daysPerWeek: 3,
    duration: '30-45 minutes',
    level: 'beginner',
    days: [
      {
        name: 'Full Body Workout',
        exercises: [
          { name: 'Push-Ups', sets: 4, reps: '20' },
          { name: 'Air Squats', sets: 4, reps: '25' },
          { name: 'Plank', sets: 3, reps: '1 minute' },
          { name: 'Burpees', sets: 3, reps: '15' }
        ]
      }
    ]
  },
  {
    id: 'low-impact',
    name: 'Low-Impact Plan for Beginners/Seniors',
    goal: 'Improve mobility and light strength',
    daysPerWeek: 3,
    duration: '30-45 minutes',
    level: 'beginner',
    days: [
      {
        name: 'Full Body Workout',
        exercises: [
          { name: 'Chair Squats', sets: 3, reps: '10' },
          { name: 'Wall Push-Ups', sets: 3, reps: '12' },
          { name: 'Step-Ups (Low Platform)', sets: 3, reps: '10 per leg' },
          { name: 'Light Stretching', sets: 1, reps: '10 minutes' }
        ]
      }
    ]
  }
];

function WorkoutPlans() {
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  const filteredPlans = WORKOUT_PLANS.filter(plan => 
    selectedLevel === 'all' || plan.level === selectedLevel
  );

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Hero Section */}
      <div className="relative py-20 mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
              Transform Your Body with Our Workout Plans
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Choose from our carefully crafted workout plans designed for all fitness levels
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Level Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
            <motion.button
              key={level}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedLevel(level as typeof selectedLevel)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedLevel === level 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25' 
                  : 'bg-[#151C2F] text-gray-400 hover:text-white hover:bg-[#1A2237]'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Workout Plan Cards */}
        <div className="grid grid-cols-1 gap-8">
          {filteredPlans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#151C2F] rounded-2xl border border-gray-800 overflow-hidden hover:border-indigo-500/50 transition-colors duration-300"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-white">{plan.name}</h2>
                  <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                    plan.level === 'beginner' 
                      ? 'bg-green-500/10 text-green-400'
                      : plan.level === 'intermediate'
                      ? 'bg-yellow-500/10 text-yellow-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}>
                    {plan.level.charAt(0).toUpperCase() + plan.level.slice(1)}
                  </span>
                </div>

                <div className="flex gap-6 text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-indigo-400" />
                    <span>{plan.daysPerWeek} days/week</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-400" />
                    <span>{plan.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-300 mb-6">
                  <Target className="h-5 w-5 text-indigo-400" />
                  <p>{plan.goal}</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {expandedPlan === plan.id ? 'Hide Workout Details' : 'View Workout Details'}
                  <ChevronDown className={`h-5 w-5 transform transition-transform duration-200 ${
                    expandedPlan === plan.id ? 'rotate-180' : ''
                  }`} />
                </motion.button>

                {expandedPlan === plan.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-8 space-y-8"
                  >
                    {plan.days.map((day, index) => (
                      <div key={index} className="border-t border-gray-800 pt-6">
                        <h3 className="text-xl font-bold text-white mb-4">{day.name}</h3>
                        <div className="space-y-4">
                          {day.exercises.map((exercise, exerciseIndex) => (
                            <div 
                              key={exerciseIndex} 
                              className="flex justify-between items-center p-4 rounded-xl bg-[#1A2237] hover:bg-[#1F2847] transition-colors duration-200"
                            >
                              <div className="flex items-center gap-3">
                                <Dumbbell className="h-5 w-5 text-indigo-400" />
                                <span className="font-medium text-gray-200">{exercise.name}</span>
                              </div>
                              <span className="text-gray-400 font-medium">
                                {exercise.sets} × {exercise.reps}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkoutPlans;

