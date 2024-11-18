import React, { useState } from 'react';
import { Dumbbell, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

type ExerciseType = 'compound' | 'isolation';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  type: ExerciseType;
  primary: string[];
  secondary?: string[];
  focus: string;
  equipment: string[];
  tips?: string[];
  media: {
    image: string;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const CHEST_EXERCISES: Exercise[] = [
  {
    id: 'chest-1',
    name: 'Flat Barbell Bench Press',
    sets: 4,
    reps: '6-8',
    type: 'compound',
    primary: ['Pectoralis Major'],
    secondary: ['Front Deltoids', 'Triceps'],
    focus: 'Overall chest development',
    equipment: ['Barbell', 'Bench'],
    tips: [
      'Keep your feet flat on the ground',
      'Maintain a slight arch in your back',
      'Lower the bar to mid-chest level'
    ],
    media: {
      image: '/images/exercises/chest/bench-press.png'
    },
    difficulty: 'intermediate'
  },
  {
    id: 'chest-2',
    name: 'Incline Dumbbell Press',
    sets: 3,
    reps: '8-10',
    type: 'compound',
    primary: ['Upper Chest'],
    secondary: ['Front Deltoids', 'Triceps'],
    focus: 'Upper chest development',
    equipment: ['Dumbbells', 'Incline Bench'],
    media: {
      image: '/images/exercises/chest/incline-dumbbell-press.png'
    },
    difficulty: 'intermediate'
  },
  {
    id: 'chest-3',
    name: 'Cable Chest Flyes',
    sets: 3,
    reps: '12-15',
    type: 'isolation',
    primary: ['Pectoralis Major'],
    focus: 'Inner chest and stretch',
    equipment: ['Cable Machine'],
    media: {
      image: '/images/exercises/chest/cable-chest-flyes.png'
    },
    difficulty: 'beginner'
  },
  // Add more chest exercises...
];

export default function ChestExercises() {
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({});

  const handleImageError = (exerciseId: string) => {
    setImageError(prev => ({
      ...prev,
      [exerciseId]: true
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text mb-3">
          Chest Exercises
        </h2>
        <p className="text-gray-400">
          Comprehensive guide to chest development exercises
        </p>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CHEST_EXERCISES.map((exercise, index) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#151C2F] rounded-2xl border border-gray-800 overflow-hidden hover:border-indigo-500/50 transition-colors duration-300"
          >
            {/* Exercise Image */}
            <div className="aspect-video relative bg-[#1A2237]">
              {!imageError[exercise.id] && exercise.media?.image && (
                <img
                  src={exercise.media.image}
                  alt={exercise.name}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(exercise.id)}
                />
              )}
              {(imageError[exercise.id] || !exercise.media?.image) && (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <Dumbbell className="h-12 w-12" />
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{exercise.name}</h3>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    exercise.type === 'compound'
                      ? 'bg-indigo-500/10 text-indigo-400'
                      : 'bg-purple-500/10 text-purple-400'
                  }`}>
                    {exercise.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    exercise.difficulty === 'beginner'
                      ? 'bg-green-500/10 text-green-400'
                      : exercise.difficulty === 'intermediate'
                      ? 'bg-yellow-500/10 text-yellow-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}>
                    {exercise.difficulty}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
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
                  <div>
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

                <div>
                  <div className="text-sm font-medium text-gray-400 mb-2">Equipment:</div>
                  <div className="flex flex-wrap gap-2">
                    {exercise.equipment.map((item) => (
                      <span key={item} className="px-3 py-1 bg-[#1A2237] text-gray-300 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {exercise.tips && (
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-2">Tips:</div>
                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                      {exercise.tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                  <span className="text-gray-400">{exercise.sets} sets</span>
                  <span className="text-gray-400">{exercise.reps} reps</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}