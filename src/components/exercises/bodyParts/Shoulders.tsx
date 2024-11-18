import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';

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
  instructions: string[];
  commonMistakes?: string[];
}

const SHOULDER_EXERCISES: Exercise[] = [
  {
    id: 'shoulders-1',
    name: 'Military Press',
    sets: 4,
    reps: '6-8',
    type: 'compound',
    primary: ['Anterior Deltoids', 'Middle Deltoids'],
    secondary: ['Triceps', 'Upper Chest', 'Traps'],
    focus: 'Overall shoulder development and strength',
    equipment: ['Barbell', 'Rack'],
    difficulty: 'intermediate',
    media: {
      image: '/images/exercises/shoulders/military-press.png'
    },
    instructions: [
      'Stand with feet shoulder-width apart',
      'Hold barbell at shoulder level',
      'Press bar overhead while keeping core tight',
      'Lower with control to starting position'
    ],
    tips: [
      'Keep core engaged throughout',
      'Don\'t lean back excessively',
      'Full range of motion'
    ],
    commonMistakes: [
      'Arching back too much',
      'Not engaging core',
      'Incomplete lockout'
    ]
  },
  {
    id: 'shoulders-2',
    name: 'Lateral Raises',
    sets: 3,
    reps: '12-15',
    type: 'isolation',
    primary: ['Middle Deltoids'],
    focus: 'Shoulder width and lateral head development',
    equipment: ['Dumbbells'],
    difficulty: 'beginner',
    media: {
      image: '/images/exercises/shoulders/lateral-raises.png'
    },
    instructions: [
      'Stand with dumbbells at sides',
      'Raise arms out to sides until parallel',
      'Slight bend in elbows',
      'Lower with control'
    ],
    tips: [
      'Don\'t swing weights',
      'Keep shoulders down',
      'Lead with elbows'
    ],
    commonMistakes: [
      'Using too much momentum',
      'Raising above shoulder level',
      'Internal rotation at shoulders'
    ]
  },
  {
    id: 'shoulders-3',
    name: 'Face Pulls',
    sets: 3,
    reps: '12-15',
    type: 'isolation',
    primary: ['Posterior Deltoids', 'Rotator Cuff'],
    secondary: ['Middle Traps', 'Rhomboids'],
    focus: 'Rear deltoid development and shoulder health',
    equipment: ['Cable Machine', 'Rope Attachment'],
    difficulty: 'beginner',
    media: {
      image: '/images/exercises/shoulders/face-pulls.png'
    },
    instructions: [
      'Set cable at upper chest height',
      'Pull rope to face level',
      'Pull elbows high and wide',
      'Focus on external rotation'
    ],
    tips: [
      'Keep upper arms parallel to ground',
      'Squeeze shoulder blades',
      'Control the negative'
    ]
  },
  {
    id: 'shoulders-4',
    name: 'Arnold Press',
    sets: 3,
    reps: '10-12',
    type: 'compound',
    primary: ['Anterior Deltoids', 'Middle Deltoids'],
    secondary: ['Triceps', 'Traps'],
    focus: 'Complete shoulder development',
    equipment: ['Dumbbells'],
    difficulty: 'intermediate',
    media: {
      image: '/images/exercises/shoulders/arnold-press.png'
    },
    instructions: [
      'Start with dumbbells at shoulder height, palms facing you',
      'Press weights while rotating palms forward',
      'Full extension overhead',
      'Reverse motion on return'
    ],
    tips: [
      'Smooth rotation movement',
      'Keep core engaged',
      'Control the descent'
    ]
  },
  {
    id: 'shoulders-5',
    name: 'Front Raises',
    sets: 3,
    reps: '12-15',
    type: 'isolation',
    primary: ['Anterior Deltoids'],
    focus: 'Front deltoid development',
    equipment: ['Dumbbells', 'Barbell', 'Plate'],
    difficulty: 'beginner',
    media: {
      image: '/images/exercises/shoulders/front-raises.png'
    },
    instructions: [
      'Stand with weights in front of thighs',
      'Raise weights to shoulder height',
      'Keep slight bend in elbows',
      'Lower with control'
    ],
    tips: [
      'Don\'t use momentum',
      'Keep core tight',
      'Breathe steadily'
    ]
  }
];

export default function ShouldersExercises() {
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
          Shoulder Exercises
        </h2>
        <p className="text-gray-400">
          Build strong, well-rounded shoulders with these targeted exercises
        </p>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SHOULDER_EXERCISES.map((exercise, index) => (
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

                {exercise.commonMistakes && (
                  <div>
                    <div className="text-sm font-medium text-gray-400 mb-2">Common Mistakes:</div>
                    <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                      {exercise.commonMistakes.map((mistake, i) => (
                        <li key={i}>{mistake}</li>
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