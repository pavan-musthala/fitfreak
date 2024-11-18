import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Exercise } from '../types';

export default function WorkoutTracker() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [newExercise, setNewExercise] = useState({
    name: '',
    sets: 3,
    reps: 10,
    weight: 0,
  });

  const addExercise = () => {
    if (!newExercise.name) return;
    
    setExercises([
      ...exercises,
      {
        ...newExercise,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      },
    ]);
    setNewExercise({ name: '', sets: 3, reps: 10, weight: 0 });
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Workout Tracker</h2>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Exercise name"
          className="flex-1 min-w-[200px] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={newExercise.name}
          onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Sets"
          className="w-20 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={newExercise.sets}
          onChange={(e) => setNewExercise({ ...newExercise, sets: parseInt(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Reps"
          className="w-20 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={newExercise.reps}
          onChange={(e) => setNewExercise({ ...newExercise, reps: parseInt(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          className="w-32 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={newExercise.weight}
          onChange={(e) => setNewExercise({ ...newExercise, weight: parseInt(e.target.value) })}
        />
        <button
          onClick={addExercise}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add
        </button>
      </div>

      <div className="space-y-4">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
          >
            <div className="flex-1">
              <h3 className="font-semibold">{exercise.name}</h3>
              <p className="text-gray-600">
                {exercise.sets} sets × {exercise.reps} reps @ {exercise.weight}kg
              </p>
            </div>
            <button
              onClick={() => removeExercise(exercise.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}