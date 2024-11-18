import React, { useState } from 'react';
import { Play, ArrowRight, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';

type ExerciseType = 'compound' | 'isolation';
type ArmSection = 'biceps' | 'triceps' | 'forearms';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  type: ExerciseType;
  section: ArmSection;
  primary: string[];
  secondary?: string[];
  focus: string;
  equipment: string[];
  tips?: string[];
  media: {
    image: string;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions?: string[];
}

const ARM_EXERCISES: Exercise[] = [
  {
    id: 'arms-1',
    name: 'Barbell Curls',
    sets: 3,
    reps: '8-12',
    type: 'isolation',
    section: 'biceps',
    primary: ['Biceps Brachii'],
    focus: 'Overall bicep development',
    equipment: ['Barbell'],
    difficulty: 'beginner',
    media: {
      image: '/images/exercises/arms/barbell-curls.png'
    },
    instructions: [
      'Stand with feet shoulder-width apart',
      'Grip barbell with underhand grip',
      'Curl weight up to shoulders',
      'Lower with control'
    ],
    tips: [
      'Keep elbows at sides',
      'Don\'t swing body',
      'Full range of motion'
    ]
  },
  {
    id: 'arms-2',
    name: 'Skull Crushers',
    sets: 3,
    reps: '10-12',
    type: 'isolation',
    section: 'triceps',
    primary: ['Triceps Brachii'],
    focus: 'Overall tricep development',
    equipment: ['EZ Bar', 'Bench'],
    difficulty: 'intermediate',
    media: {
      image: '/images/exercises/arms/skull-crushers.png'
    },
    instructions: [
      'Lie on bench with weight above chest',
      'Lower weight behind head',
      'Keep upper arms still',
      'Extend arms to starting position'
    ],
    tips: [
      'Keep elbows pointed up',
      'Control the movement',
      'Don\'t flare elbows'
    ]
  },
  {
    id: 'arms-3',
    name: 'Hammer Curls',
    sets: 3,
    reps: '10-12',
    type: 'isolation',
    section: 'biceps',
    primary: ['Brachialis', 'Biceps Brachii'],
    secondary: ['Forearms'],
    focus: 'Bicep thickness and forearm development',
    equipment: ['Dumbbells'],
    difficulty: 'beginner',
    media: {
      image: '/images/exercises/arms/hammer-curls.png'
    },
    instructions: [
      'Hold dumbbells at sides',
      'Keep palms facing each other',
      'Curl weights to shoulders',
      'Lower with control'
    ],
    tips: [
      'Keep elbows steady',
      'Maintain neutral grip',
      'Control the negative'
    ]
  }
];

export default function ArmsExercises() {
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
          Arm Exercises
        </h2>
        <p className="text-gray-400">
          Complete guide to biceps, triceps, and forearm development
        </p>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARM_EXERCISES.map((exercise, index) => (
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

            {/* Exercise Details */}
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

                {exercise.instructions && (
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-2">Instructions:</div>
                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                      {exercise.instructions.map((instruction, i) => (
                        <li key={i}>{instruction}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                  <span className="text-gray-400">{exercise.sets} sets</span>
                  <span className="text-gray-400">{exercise.reps}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}