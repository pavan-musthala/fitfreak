import React, { useState } from 'react';
import { Dumbbell, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

type MuscleGroup = 'back' | 'biceps' | 'rear-delts';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  muscleGroup: MuscleGroup;
  primary: string[];
  secondary?: string[];
  focus?: string;
  isCompound?: boolean;
  variation?: string[];
  media: {
    image: string;
  };
}

export const PULL_EXERCISES: Exercise[] = [
  // Back Exercises
  {
    name: 'Deadlifts',
    sets: 4,
    reps: '5-6',
    muscleGroup: 'back',
    primary: ['Erector spinae', 'Glutes', 'Traps', 'Lats'],
    secondary: ['Hamstrings', 'Forearms', 'Core'],
    variation: ['Conventional', 'Sumo'],
    isCompound: true,
    media: {
      image: '/images/exercises/back/deadlift.png'
    }
  },
  {
    name: 'Pull-Ups/Chin-Ups',
    sets: 4,
    reps: '8-10',
    muscleGroup: 'back',
    primary: ['Lats', 'Teres major'],
    secondary: ['Biceps'],
    variation: [
      'Wide Grip (Pull-Ups): Lats focus',
      'Close Grip (Chin-Ups): Biceps focus'
    ],
    isCompound: true,
    media: {
      image: '/images/exercises/back/pullups.png'
    }
  },
  {
    name: 'Barbell Rows',
    sets: 4,
    reps: '8-10',
    muscleGroup: 'back',
    primary: ['Lats', 'Traps', 'Rhomboids', 'Rear delts'],
    focus: 'Overall back development',
    isCompound: true,
    media: {
      image: '/images/exercises/back/barbell-rows.png'
    }
  },
  {
    name: 'T-Bar Rows',
    sets: 3,
    reps: '8-10',
    muscleGroup: 'back',
    primary: ['Lats', 'Mid-back'],
    focus: 'Mid-back thickness',
    variation: ['Standard', 'Chest-Supported'],
    media: {
      image: '/images/exercises/back/tbar-rows.png'
    }
  },
  {
    name: 'Lat Pulldowns',
    sets: 3,
    reps: '10-12',
    muscleGroup: 'back',
    primary: ['Lats'],
    focus: 'Lats and scapular movement',
    variation: ['Wide Grip', 'Neutral Grip'],
    media: {
      image: '/images/exercises/back/lat-pulldowns.png'
    }
  },

  // Biceps Exercises
  {
    name: 'Barbell Bicep Curls',
    sets: 3,
    reps: '8-10',
    muscleGroup: 'biceps',
    primary: ['Biceps brachii'],
    focus: 'Long head of biceps',
    media: {
      image: '/images/exercises/biceps/barbell-curls.png'
    }
  },
  {
    name: 'Hammer Curls',
    sets: 3,
    reps: '10-12',
    muscleGroup: 'biceps',
    primary: ['Brachialis', 'Brachioradialis'],
    variation: ['Dumbbell', 'Rope'],
    media: {
      image: '/images/exercises/biceps/hammer-curls.png'
    }
  },
  {
    name: 'Concentration Curls',
    sets: 3,
    reps: '12-15',
    muscleGroup: 'biceps',
    primary: ['Biceps brachii'],
    focus: 'Peak contraction of biceps',
    media: {
      image: '/images/exercises/biceps/concentration-curls.png'
    }
  },
  {
    name: 'Preacher Curls',
    sets: 3,
    reps: '12-15',
    muscleGroup: 'biceps',
    primary: ['Biceps brachii'],
    focus: 'Isolated stretch and contraction',
    media: {
      image: '/images/exercises/biceps/preacher-curls.png'
    }
  },

  // Rear Delts Exercises
  {
    name: 'Face Pulls',
    sets: 3,
    reps: '12-15',
    muscleGroup: 'rear-delts',
    primary: ['Rear deltoids', 'Traps'],
    secondary: ['External rotators'],
    variation: ['Cable', 'Bands'],
    media: {
      image: '/images/exercises/rear-delts/face-pulls.png'
    }
  },
  {
    name: 'Rear Delt Dumbbell Flys',
    sets: 3,
    reps: '12-15',
    muscleGroup: 'rear-delts',
    primary: ['Posterior deltoids', 'Mid traps'],
    focus: 'Rear delt isolation',
    media: {
      image: '/images/exercises/rear-delts/rear-delt-flys.png'
    }
  },
  {
    name: 'Reverse Pec Deck Machine',
    sets: 3,
    reps: '12-15',
    muscleGroup: 'rear-delts',
    primary: ['Posterior deltoids'],
    focus: 'Rear delt isolation',
    media: {
      image: '/images/exercises/rear-delts/reverse-pec-deck.png'
    }
  }
];

export default function PullExercises() {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'all'>('all');
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({});

  const filteredExercises = selectedMuscle === 'all' 
    ? PULL_EXERCISES 
    : PULL_EXERCISES.filter(ex => ex.muscleGroup === selectedMuscle);

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
          Pull Day Exercises
        </h2>
        <p className="text-gray-400">
          Focus on back, biceps, and rear deltoids movements
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
        {[
          { id: 'back', label: 'Back' },
          { id: 'biceps', label: 'Biceps' },
          { id: 'rear-delts', label: 'Rear Delts' }
        ].map((muscle) => (
          <motion.button
            key={muscle.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMuscle(muscle.id as MuscleGroup)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              selectedMuscle === muscle.id
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'bg-[#151C2F] text-gray-400 hover:text-white hover:bg-[#1A2237]'
            }`}
          >
            {muscle.label}
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

              {exercise.variation && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-400 mb-2">Variations:</div>
                  <ul className="list-disc list-inside text-sm text-gray-400">
                    {exercise.variation.map((var_type, idx) => (
                      <li key={idx}>{var_type}</li>
                    ))}
                  </ul>
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