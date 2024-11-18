import React, { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import type { DailyWorkout, Exercise } from '../types';

const SAMPLE_WORKOUT: DailyWorkout = {
  id: '1',
  name: 'Full Body Workout A',
  exercises: [
    { id: '1', name: 'Squats', sets: 3, reps: 10, weight: 0 },
    { id: '2', name: 'Push-ups', sets: 3, reps: 12, weight: 0 },
    { id: '3', name: 'Rows', sets: 3, reps: 10, weight: 0 },
  ]
};

export default function TodayWorkout() {
  const [workout, setWorkout] = useState<DailyWorkout>(SAMPLE_WORKOUT);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const toggleExercise = (exerciseId: string) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseId)) {
      newCompleted.delete(exerciseId);
    } else {
      newCompleted.add(exerciseId);
    }
    setCompletedExercises(newCompleted);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{workout.name}</h1>
          <span className="text-gray-500">
            {completedExercises.size}/{workout.exercises.length} completed
          </span>
        </div>

        <div className="space-y-6">
          {workout.exercises.map((exercise) => (
            <div
              key={exercise.id}
              className={`p-4 rounded-lg border ${
                completedExercises.has(exercise.id)
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{exercise.name}</h3>
                <button
                  onClick={() => toggleExercise(exercise.id)}
                  className="text-gray-600 hover:text-green-600 transition"
                >
                  {completedExercises.has(exercise.id) ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <Circle className="h-6 w-6" />
                  )}
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-gray-600 text-sm">Sets</span>
                  <p className="font-semibold">{exercise.sets}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Reps</span>
                  <p className="font-semibold">{exercise.reps}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Weight (kg)</span>
                  <p className="font-semibold">{exercise.weight || 'BW'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}