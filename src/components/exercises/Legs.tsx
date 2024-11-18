import React, { useState } from 'react';
import { Dumbbell, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

type MuscleGroup = 'quads' | 'hamstrings' | 'glutes' | 'calves';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  muscleGroup: MuscleGroup;
  primary: string[];
  secondary?: string[];
  focus: string;
  isCompound?: boolean;
  variation?: string[];
  media: {
    image: string;
  };
}

export const LEG_EXERCISES: Exercise[] = [
  // Quad Exercises
  {
    name: 'Back Squats',
    sets: 4,
    reps: '6-8',
    muscleGroup: 'quads',
    primary: ['Quadriceps', 'Glutes'],
    secondary: ['Core', 'Lower back'],
    focus: 'Overall quad development, glutes, core',
    variation: ['Low Bar', 'High Bar'],
    isCompound: true,
    media: {
      image: '/images/exercises/legs/quads/back-squats.png'
    }
  },
  {
    name: 'Leg Press',
    sets: 3,
    reps: '10-12',
    muscleGroup: 'quads',
    primary: ['Quadriceps'],
    secondary: ['Glutes'],
    focus: 'Quad isolation with controlled range',
    media: {
      image: '/images/exercises/legs/quads/leg-press.png'
    }
  },
  {
    name: 'Bulgarian Split Squats',
    sets: 3,
    reps: '10-12 per leg',
    muscleGroup: 'quads',
    primary: ['Quadriceps'],
    secondary: ['Glutes', 'Core'],
    focus: 'Quad dominance with stability',
    variation: ['Dumbbell', 'Barbell'],
    media: {
      image: '/images/exercises/legs/quads/bulgarian-split-squats.png'
    }
  },
  {
    name: 'Front Squats',
    sets: 3,
    reps: '8-10',
    muscleGroup: 'quads',
    primary: ['Quadriceps'],
    secondary: ['Core'],
    focus: 'Emphasis on quads and core',
    isCompound: true,
    media: {
      image: '/images/exercises/legs/quads/front-squats.png'
    }
  },

  // Hamstring Exercises
  {
    name: 'Romanian Deadlifts',
    sets: 4,
    reps: '8-10',
    muscleGroup: 'hamstrings',
    primary: ['Hamstrings', 'Glutes'],
    secondary: ['Lower back'],
    focus: 'Hamstrings, glutes',
    variation: ['Barbell', 'Dumbbell'],
    isCompound: true,
    media: {
      image: '/images/exercises/legs/hamstrings/romanian-deadlifts.png'
    }
  },
  {
    name: 'Seated Leg Curls',
    sets: 3,
    reps: '12-15',
    muscleGroup: 'hamstrings',
    primary: ['Hamstrings'],
    focus: 'Hamstring isolation with stretch and contraction',
    media: {
      image: '/images/exercises/legs/hamstrings/seated-leg-curls.png'
    }
  },
  {
    name: 'Good Mornings',
    sets: 3,
    reps: '10-12',
    muscleGroup: 'hamstrings',
    primary: ['Hamstrings'],
    secondary: ['Lower back', 'Glutes'],
    focus: 'Hamstring stretch and posterior chain',
    variation: ['Barbell', 'Dumbbell'],
    media: {
      image: '/images/exercises/legs/hamstrings/good-mornings.png'
    }
  },

  // Glute Exercises
  {
    name: 'Hip Thrusts',
    sets: 3,
    reps: '8-10',
    muscleGroup: 'glutes',
    primary: ['Gluteus Maximus'],
    secondary: ['Hamstrings'],
    focus: 'Glutes and hip extension',
    variation: ['Barbell', 'Dumbbell'],
    media: {
      image: '/images/exercises/legs/glutes/hip-thrusts.png'
    }
  },
  {
    name: 'Sumo Deadlifts',
    sets: 3,
    reps: '6-8',
    muscleGroup: 'glutes',
    primary: ['Glutes', 'Inner thighs'],
    secondary: ['Hamstrings', 'Lower back'],
    focus: 'Glutes and inner thighs',
    isCompound: true,
    media: {
      image: '/images/exercises/legs/glutes/sumo-deadlifts.png'
    }
  },
  {
    name: 'Cable Kickbacks',
    sets: 3,
    reps: '12-15 per leg',
    muscleGroup: 'glutes',
    primary: ['Gluteus Maximus'],
    focus: 'Isolated glute engagement',
    media: {
      image: '/images/exercises/legs/glutes/cable-kickbacks.png'
    }
  },

  // Calf Exercises
  {
    name: 'Standing Calf Raises',
    sets: 3,
    reps: '15-20',
    muscleGroup: 'calves',
    primary: ['Gastrocnemius'],
    focus: 'Gastrocnemius (upper calves)',
    media: {
      image: '/images/exercises/legs/calves/standing-calf-raises.png'
    }
  },
  {
    name: 'Seated Calf Raises',
    sets: 3,
    reps: '20-25',
    muscleGroup: 'calves',
    primary: ['Soleus'],
    focus: 'Soleus (lower calves)',
    media: {
      image: '/images/exercises/legs/calves/seated-calf-raises.png'
    }
  },
  {
    name: 'Donkey Calf Raises',
    sets: 3,
    reps: '15-20',
    muscleGroup: 'calves',
    primary: ['Gastrocnemius', 'Soleus'],
    focus: 'Full calf activation',
    media: {
      image: '/images/exercises/legs/calves/donkey-calf-raises.png'
    }
  }
];

export default function LegExercises() {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | 'all'>('all');
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({});

  const handleImageError = (exerciseName: string) => {
    setImageError(prev => ({
      ...prev,
      [exerciseName]: true
    }));
  };

  const filteredExercises = selectedMuscle === 'all' 
    ? LEG_EXERCISES 
    : LEG_EXERCISES.filter(ex => ex.muscleGroup === selectedMuscle);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text mb-3">
          Leg Day Exercises
        </h2>
        <p className="text-gray-400">
          Focus on lower body compound and isolation movements
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
          { id: 'quads', label: 'Quadriceps' },
          { id: 'hamstrings', label: 'Hamstrings' },
          { id: 'glutes', label: 'Glutes' },
          { id: 'calves', label: 'Calves' }
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