import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PUSH_EXERCISES, PULL_EXERCISES, LEG_EXERCISES } from '../data/exercises';

type WorkoutType = 'push' | 'pull' | 'legs';

interface ExerciseLog {
  id: string;
  date: string;
  workoutType: WorkoutType;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
}

export default function Progress() {
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>(() => {
    const saved = localStorage.getItem('exerciseLogs');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedWorkoutType, setSelectedWorkoutType] = useState<WorkoutType | ''>('');
  
  const [newLog, setNewLog] = useState({
    workoutType: '',
    exercise: '',
    sets: '',
    reps: '',
    weight: ''
  });

  useEffect(() => {
    localStorage.setItem('exerciseLogs', JSON.stringify(exerciseLogs));
  }, [exerciseLogs]);

  // Get available exercises based on workout type
  const getExerciseOptions = () => {
    switch (selectedWorkoutType) {
      case 'push':
        return PUSH_EXERCISES;
      case 'pull':
        return PULL_EXERCISES;
      case 'legs':
        return LEG_EXERCISES;
      default:
        return [];
    }
  };

  const handleWorkoutTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const workoutType = e.target.value as WorkoutType;
    setSelectedWorkoutType(workoutType);
    setNewLog(prev => ({
      ...prev,
      workoutType,
      exercise: '' // Reset exercise when workout type changes
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewLog(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const today = new Date().toLocaleDateString();
    
    const newExerciseLog: ExerciseLog = {
      id: Date.now().toString(),
      date: today,
      workoutType: selectedWorkoutType as WorkoutType,
      exercise: newLog.exercise,
      sets: Number(newLog.sets),
      reps: Number(newLog.reps),
      weight: Number(newLog.weight)
    };

    setExerciseLogs(prev => [...prev, newExerciseLog]);
    setNewLog({
      workoutType: selectedWorkoutType,
      exercise: '',
      sets: '',
      reps: '',
      weight: ''
    });
  };

  const handleDelete = (id: string) => {
    setExerciseLogs(prev => prev.filter(log => log.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text mb-6">
        Progress Tracking
      </h2>

      {/* Exercise Log Form */}
      <div className="bg-[#151C2F] rounded-2xl border border-gray-800 p-6 mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Log Exercise</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Workout Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Workout Type
              </label>
              <select
                name="workoutType"
                value={selectedWorkoutType}
                onChange={handleWorkoutTypeChange}
                className="w-full px-3 py-2 bg-[#1A2237] border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select Type</option>
                <option value="push">Push</option>
                <option value="pull">Pull</option>
                <option value="legs">Legs</option>
              </select>
            </div>

            {/* Exercise Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Exercise
              </label>
              <select
                name="exercise"
                value={newLog.exercise}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#1A2237] border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                disabled={!selectedWorkoutType}
              >
                <option value="">Select Exercise</option>
                {getExerciseOptions().map((exercise, index) => (
                  <option key={index} value={exercise.name}>
                    {exercise.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sets Input */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Sets
              </label>
              <input
                type="number"
                name="sets"
                value={newLog.sets}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#1A2237] border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Reps Input */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Reps
              </label>
              <input
                type="number"
                name="reps"
                value={newLog.reps}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#1A2237] border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Weight Input */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={newLog.weight}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#1A2237] border border-gray-800 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                min="0"
                step="0.5"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Log Exercise
          </button>
        </form>
      </div>

      {/* Exercise Logs Table */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Exercise Logs</h3>
        <div className="bg-[#151C2F] rounded-2xl border border-gray-800 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-[#1A2237]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Exercise</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Sets</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Reps</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Weight (kg)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {exerciseLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#1A2237] transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{log.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300 capitalize">{log.workoutType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{log.exercise}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{log.sets}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{log.reps}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{log.weight} kg</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(log.id)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-150"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weight Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-[#151C2F] rounded-2xl border border-gray-800 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Weight Progress</h3>
          <LineChart width={500} height={300} data={exerciseLogs}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1A2237',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                color: '#9CA3AF'
              }}
            />
            <Legend wrapperStyle={{ color: '#9CA3AF' }} />
            <Line type="monotone" dataKey="weight" stroke="#818CF8" name="Weight (kg)" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}