type MuscleGroup = 'chest' | 'shoulders' | 'triceps' | 'back' | 'biceps' | 'rear-delts' | 'quads' | 'hamstrings' | 'glutes' | 'calves';

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
}

export const PUSH_EXERCISES: Exercise[] = [
  {
    name: 'Flat Barbell Bench Press',
    sets: 4,
    reps: '6-8',
    muscleGroup: 'chest',
    primary: ['Pectoralis major', 'Anterior deltoids', 'Triceps'],
    secondary: ['Serratus anterior', 'Core'],
    isCompound: true
  },
  {
    name: 'Incline Dumbbell Press',
    sets: 3,
    reps: '8-10',
    muscleGroup: 'chest',
    primary: ['Upper chest'],
    focus: 'Upper chest (clavicular head)',
    isCompound: true
  },
  {
    name: 'Overhead Barbell Press',
    sets: 4,
    reps: '6-8',
    muscleGroup: 'shoulders',
    primary: ['Front deltoids', 'Triceps'],
    secondary: ['Core stabilizers'],
    isCompound: true
  },
  {
    name: 'Lateral Raises',
    sets: 3,
    reps: '12-15',
    muscleGroup: 'shoulders',
    primary: ['Side deltoids'],
    focus: 'Shoulder width'
  },
  {
    name: 'Tricep Rope Pushdowns',
    sets: 3,
    reps: '12-15',
    muscleGroup: 'triceps',
    primary: ['Triceps'],
    focus: 'Tricep isolation'
  }
];

export const PULL_EXERCISES: Exercise[] = [
  {
    name: 'Deadlifts',
    sets: 4,
    reps: '5-6',
    muscleGroup: 'back',
    primary: ['Erector spinae', 'Glutes', 'Traps'],
    secondary: ['Hamstrings', 'Core'],
    isCompound: true
  },
  {
    name: 'Barbell Rows',
    sets: 4,
    reps: '8-10',
    muscleGroup: 'back',
    primary: ['Latissimus dorsi', 'Rhomboids'],
    secondary: ['Biceps', 'Rear deltoids'],
    isCompound: true
  },
  {
    name: 'Pull-Ups',
    sets: 3,
    reps: '8-12',
    muscleGroup: 'back',
    primary: ['Latissimus dorsi', 'Teres major'],
    secondary: ['Biceps'],
    isCompound: true
  },
  {
    name: 'Barbell Bicep Curls',
    sets: 3,
    reps: '10-12',
    muscleGroup: 'biceps',
    primary: ['Biceps brachii'],
    focus: 'Bicep peak'
  },
  {
    name: 'Hammer Curls',
    sets: 3,
    reps: '12-15',
    muscleGroup: 'biceps',
    primary: ['Brachialis', 'Brachioradialis'],
    focus: 'Forearm development'
  }
];

export const LEG_EXERCISES: Exercise[] = [
  {
    name: 'Back Squats',
    sets: 4,
    reps: '6-8',
    muscleGroup: 'quads',
    primary: ['Quadriceps', 'Glutes'],
    secondary: ['Core', 'Lower back'],
    isCompound: true
  },
  {
    name: 'Romanian Deadlifts',
    sets: 4,
    reps: '8-10',
    muscleGroup: 'hamstrings',
    primary: ['Hamstrings', 'Glutes'],
    secondary: ['Lower back'],
    isCompound: true
  },
  {
    name: 'Leg Press',
    sets: 3,
    reps: '10-12',
    muscleGroup: 'quads',
    primary: ['Quadriceps'],
    secondary: ['Glutes'],
    focus: 'Quad isolation'
  },
  {
    name: 'Hip Thrusts',
    sets: 3,
    reps: '12-15',
    muscleGroup: 'glutes',
    primary: ['Gluteus maximus'],
    secondary: ['Hamstrings'],
    focus: 'Glute development'
  },
  {
    name: 'Standing Calf Raises',
    sets: 4,
    reps: '15-20',
    muscleGroup: 'calves',
    primary: ['Gastrocnemius'],
    focus: 'Calf development'
  }
]; 