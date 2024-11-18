export type Exercise = {
  name: string;
  sets: number;
  reps: string;
  notes?: string;
}

export type WorkoutDay = {
  name: string;
  exercises: Exercise[];
}

export type WorkoutPlan = {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  daysPerWeek: number;
  workouts: WorkoutDay[];
}

export interface DailyWorkout {
  id: string;
  name: string;
  exercises: Exercise[];
  completed?: boolean;
  date?: string;
}

export interface Progress {
  id: string;
  exerciseId: string;
  exerciseName: string;
  date: string;
  weight: number;
  sets: number;
  reps: number;
}

export interface UserGoals {
  weight: number;
  targetWeight: number;
  height: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
  goal: 'lose' | 'maintain' | 'gain';
}

export interface DietPlan {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: {
    id: string;
    name: string;
    time: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    suggestions: string[];
  }[];
}

export interface Meal {
  id: string;
  name: string;
  date: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DailyStats {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}