import React, { useState } from 'react';
import { Dumbbell, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

type MuscleGroup = 'chest' | 'shoulders' | 'triceps';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  muscleGroup: MuscleGroup;
  primary: string[];
  secondary?: string[];
  focus?: string;
  isCompound?: boolean;
  media: {
    image: string;
  };
}

export const PUSH_EXERCISES: Exercise[] = [
  // Chest Exercises
  {
    name: 'Flat Barbell Bench Press',
    sets: 4,
    reps: '6-8',
    muscleGroup: 'chest',
    primary: ['Pectoralis major', 'Anterior deltoids', 'Triceps'],
    secondary: ['Serratus anterior', 'Core'],
    isCompound: true,
    media: {
      image: '/images/exercises/chest/bench-press.png'
    }
  },
  {
    name: 'Incline Dumbbell Press',
    sets: 3,
    reps: '8-10',
    muscleGroup: 'chest',
    primary: ['Upper chest'],
    focus: 'Upper chest (clavicular head)',
    isCompound: true,
    media: {
      image: '/images/exercises/chest/incline-dumbbell-press.png'
    }
  },
  {
    name: 'Cable Chest Flys',
    sets: 3,
    reps: '12-15',
    muscleGroup: 'chest',
    primary: ['Inner chest', 'Outer chest'],
    focus: 'Inner and outer chest (stretch and contraction)',
    media: {
      image: '/images/exercises/chest/cable-flys.png'
    }
  },
  {
    name: 'Pec Deck (Machine Fly)',
    sets: 3,
    reps: '12-15',
    muscleGroup: 'chest',
    primary: ['Pectoralis major'],
    focus: 'Chest isolation',
    media: {
      image: '/images/exercises/chest/pec-deck.png'
    }
  },

  // Shoulder Exercises
  {
    name: 'Overhead Barbell Press',
    sets: 4,
    reps: '6-8',
    muscleGroup: 'shoulders',
    primary: ['Front deltoids', 'Triceps'],
    secondary: ['Core stabilizers'],
    focus: 'Front delts, triceps, stabilizers',
    isCompound: true,
    media: {
      image: '/images/exercises/shoulders/overhead-press.png'
    }
  },
  {
    name: 'Lateral Raises',
    sets: 3,
    reps: '15-20',
    muscleGroup: 'shoulders',
    primary: ['Side deltoids'],
    focus: 'Side delts (medial deltoid for width)',
    media: {
      image: '/images/exercises/shoulders/lateral-raises.png'
    }
  },
  {
    name: 'Arnold Press',
    sets: 3,
    reps: '10-12',
    muscleGroup: 'shoulders',
    primary: ['Front deltoids'],
    focus: 'Front delts with wider range of motion',
    media: {
      image: '/images/exercises/shoulders/arnold-press.png'
    }
  },
  {
    name: 'Front Plate Raises',
    sets: 3,
    reps: '15',
    muscleGroup: 'shoulders',
    primary: ['Front deltoids'],
    focus: 'Front delts (anterior deltoid)',
    media: {
      image: '/images/exercises/shoulders/front-raises.png'
    }
  },

  // Triceps Exercises
  {
    name: 'Tricep Dips',
    sets: 3,
    reps: '12-15',
    muscleGroup: 'triceps',
    primary: ['Long head', 'Lateral head'],
    focus: 'Long head and lateral head of triceps',
    media: {
      image: '/images/exercises/triceps/dips.png'
    }
  },
  {
    name: 'Rope Tricep Pushdowns',
    sets: 3,
    reps: '15-20',
    muscleGroup: 'triceps',
    primary: ['Lateral head'],
    focus: 'Lateral head and isolation',
    media: {
      image: '/images/exercises/triceps/rope-pushdowns.png'
    }
  },
  {
    name: 'Overhead Tricep Extension',
    sets: 3,
    reps: '12-15',
    muscleGroup: 'triceps',
    primary: ['Long head'],
    focus: 'Long head stretch and engagement',
    media: {
      image: '/images/exercises/triceps/overhead-extension.png'
    }
  },
  {
    name: 'Close-Grip Bench Press',
    sets: 3,
    reps: '8-10',
    muscleGroup: 'triceps',
    primary: ['Triceps'],
    secondary: ['Chest'],
    focus: 'Emphasizes triceps while engaging chest',
    isCompound: true,
    media: {
      image: '/images/exercises/triceps/close-grip-bench.png'
    }
  }
];

export default function PushExercises() {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'all'>('all');
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({});

  const filteredExercises = selectedMuscle === 'all' 
    ? PUSH_EXERCISES 
    : PUSH_EXERCISES.filter(ex => ex.muscleGroup === selectedMuscle);

  const handleImageError = (exerciseName: string) => {
    setImageError(prev => ({
      ...prev,
      [exerciseName]: true
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text mb-3">
          Push Day Exercises
        </h2>
        <p className="text-gray-400">
          Focus on chest, shoulders, and triceps movements
        </p>
      </div>

      {/* Muscle Group Filters */}
      <div className="flex flex-wrap gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedMuscle('all')}
          className={`px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-200 ${
            selectedMuscle === 'all'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-[#151C2F] text-gray-400 hover:text-white hover:bg-[#1A2237]'
          }`}
        >
          <Dumbbell className="h-5 w-5" />
          All
        </motion.button>
        {['chest', 'shoulders', 'triceps'].map((muscle) => (
          <motion.button
            key={muscle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMuscle(muscle as MuscleGroup)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              selectedMuscle === muscle
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-[#151C2F] text-gray-400 hover:text-white hover:bg-[#1A2237]'
            }`}
          >
            {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Exercise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#151C2F] rounded-2xl border border-gray-800 overflow-hidden hover:border-indigo-500/50 transition-colors duration-300"
          >
            {/* Exercise Image */}
            <div className="aspect-video relative bg-[#1A2237]">
              {!imageError[exercise.name] && exercise.media?.image && (
                <img
                  src={exercise.media.image}
                  alt={exercise.name}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(exercise.name)}
                />
              )}
              {(imageError[exercise.name] || !exercise.media?.image) && (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <Dumbbell className="h-12 w-12" />
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{exercise.name}</h3>
                {exercise.isCompound && (
                  <span className="bg-indigo-500/10 text-indigo-400 text-xs px-3 py-1 rounded-full font-medium">
                    Compound
                  </span>
                )}
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-gray-400 mb-2">Primary Muscles:</div>
                <div className="flex flex-wrap gap-2">
                  {exercise.primary.map((muscle) => (
                    <span key={muscle} className="px-3 py-1 bg-[#1A2237] text-gray-300 rounded-full text-sm">
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              {exercise.secondary && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-400 mb-2">Secondary Muscles:</div>
                  <div className="flex flex-wrap gap-2">
                    {exercise.secondary.map((muscle) => (
                      <span key={muscle} className="px-3 py-1 bg-[#1A2237] text-gray-400 rounded-full text-sm">
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {exercise.focus && (
                <p className="text-gray-400 text-sm mb-4">
                  <span className="font-medium text-gray-300">Focus:</span> {exercise.focus}
                </p>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                <span className="text-gray-400">{exercise.sets} sets</span>
                <span className="text-gray-400">{exercise.reps} reps</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}