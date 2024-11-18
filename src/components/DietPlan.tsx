import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import type { UserGoals, DietPlan } from '../types';

export default function DietPlan() {
  const [goals, setGoals] = useState<Partial<UserGoals>>({});
  const [plan, setPlan] = useState<DietPlan | null>(null);

  const calculateDietPlan = (goals: Partial<UserGoals>): DietPlan => {
    // This is a simplified calculation
    const bmr = 2000; // Would normally calculate based on goals
    return {
      calories: bmr,
      protein: Math.round(bmr * 0.3 / 4), // 30% protein
      carbs: Math.round(bmr * 0.4 / 4),   // 40% carbs
      fats: Math.round(bmr * 0.3 / 9),    // 30% fats
      meals: [
        {
          id: '1',
          name: 'Breakfast',
          time: '8:00 AM',
          calories: Math.round(bmr * 0.3),
          protein: Math.round(bmr * 0.3 * 0.3 / 4),
          carbs: Math.round(bmr * 0.3 * 0.4 / 4),
          fats: Math.round(bmr * 0.3 * 0.3 / 9),
          suggestions: ['Oatmeal with protein powder', 'Greek yogurt with berries']
        },
        {
          id: '2',
          name: 'Lunch',
          time: '1:00 PM',
          calories: Math.round(bmr * 0.35),
          protein: Math.round(bmr * 0.35 * 0.3 / 4),
          carbs: Math.round(bmr * 0.35 * 0.4 / 4),
          fats: Math.round(bmr * 0.35 * 0.3 / 9),
          suggestions: ['Grilled chicken with rice', 'Salmon with quinoa']
        },
        {
          id: '3',
          name: 'Dinner',
          time: '7:00 PM',
          calories: Math.round(bmr * 0.35),
          protein: Math.round(bmr * 0.35 * 0.3 / 4),
          carbs: Math.round(bmr * 0.35 * 0.4 / 4),
          fats: Math.round(bmr * 0.35 * 0.3 / 9),
          suggestions: ['Lean beef with sweet potato', 'Turkey with vegetables']
        }
      ]
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedPlan = calculateDietPlan(goals);
    setPlan(calculatedPlan);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text mb-8">
        Personalized Diet Plan
      </h2>

      {!plan ? (
        <div className="bg-[#151C2F] rounded-2xl border border-gray-800 p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Enter Your Goals</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Current Weight (kg)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 bg-[#1A2237] border border-gray-800 rounded-lg text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={goals.weight || ''}
                  onChange={(e) => setGoals({ ...goals, weight: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Target Weight (kg)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 bg-[#1A2237] border border-gray-800 rounded-lg text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={goals.targetWeight || ''}
                  onChange={(e) => setGoals({ ...goals, targetWeight: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 bg-[#1A2237] border border-gray-800 rounded-lg text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={goals.height || ''}
                  onChange={(e) => setGoals({ ...goals, height: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 bg-[#1A2237] border border-gray-800 rounded-lg text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={goals.age || ''}
                  onChange={(e) => setGoals({ ...goals, age: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Gender
                </label>
                <select
                  className="w-full px-4 py-2 bg-[#1A2237] border border-gray-800 rounded-lg text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={goals.gender || ''}
                  onChange={(e) => setGoals({ ...goals, gender: e.target.value as UserGoals['gender'] })}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Activity Level
                </label>
                <select
                  className="w-full px-4 py-2 bg-[#1A2237] border border-gray-800 rounded-lg text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={goals.activityLevel || ''}
                  onChange={(e) => setGoals({ ...goals, activityLevel: e.target.value as UserGoals['activityLevel'] })}
                >
                  <option value="">Select activity level</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Lightly Active</option>
                  <option value="moderate">Moderately Active</option>
                  <option value="very">Very Active</option>
                  <option value="extra">Extra Active</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Goal
                </label>
                <select
                  className="w-full px-4 py-2 bg-[#1A2237] border border-gray-800 rounded-lg text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={goals.goal || ''}
                  onChange={(e) => setGoals({ ...goals, goal: e.target.value as UserGoals['goal'] })}
                >
                  <option value="">Select goal</option>
                  <option value="lose">Lose Weight</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain">Gain Weight</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Calculator className="h-5 w-5" />
              Calculate Diet Plan
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-[#151C2F] rounded-2xl border border-gray-800 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Daily Targets</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#1A2237] p-4 rounded-lg border border-green-500/20">
                <h4 className="text-sm font-semibold text-green-400">Calories</h4>
                <p className="text-2xl font-bold text-green-500">{plan.calories}</p>
              </div>
              <div className="bg-[#1A2237] p-4 rounded-lg border border-blue-500/20">
                <h4 className="text-sm font-semibold text-blue-400">Protein</h4>
                <p className="text-2xl font-bold text-blue-500">{plan.protein}g</p>
              </div>
              <div className="bg-[#1A2237] p-4 rounded-lg border border-yellow-500/20">
                <h4 className="text-sm font-semibold text-yellow-400">Carbs</h4>
                <p className="text-2xl font-bold text-yellow-500">{plan.carbs}g</p>
              </div>
              <div className="bg-[#1A2237] p-4 rounded-lg border border-red-500/20">
                <h4 className="text-sm font-semibold text-red-400">Fats</h4>
                <p className="text-2xl font-bold text-red-500">{plan.fats}g</p>
              </div>
            </div>
          </div>

          <div className="bg-[#151C2F] rounded-2xl border border-gray-800 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Meal Plan</h3>
            <div className="space-y-6">
              {plan.meals.map((meal) => (
                <div key={meal.id} className="border-b border-gray-800 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-white">{meal.name}</h4>
                    <span className="text-gray-400">{meal.time}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-400">Calories</span>
                      <p className="font-semibold text-gray-300">{meal.calories}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400">Protein</span>
                      <p className="font-semibold text-gray-300">{meal.protein}g</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400">Carbs</span>
                      <p className="font-semibold text-gray-300">{meal.carbs}g</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400">Fats</span>
                      <p className="font-semibold text-gray-300">{meal.fats}g</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Suggested Foods:</h4>
                    <ul className="list-disc list-inside text-gray-300">
                      {meal.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setPlan(null)}
            className="w-full bg-[#1A2237] text-gray-300 py-3 px-6 rounded-lg hover:bg-[#232B42] transition-colors duration-200"
          >
            Recalculate
          </button>
        </div>
      )}
    </div>
  );
}