import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Search } from 'lucide-react';
import type { Meal, DailyStats } from '../types';
import { foodDatabase, FoodItem } from '../data/foodDatabase';

export default function NutritionTracker() {
  const [meals, setMeals] = useState<Meal[]>(() => {
    const saved = localStorage.getItem('meals');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState<number>(100);
  const [filteredFoods, setFilteredFoods] = useState<FoodItem[]>([]);

  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = foodDatabase.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFoods(filtered);
    } else {
      setFilteredFoods([]);
    }
  }, [searchTerm]);

  const calculateNutrients = (food: FoodItem, qty: number) => {
    const multiplier = qty / 100;
    return {
      calories: Math.round(food.calories * multiplier),
      protein: Math.round(food.protein * multiplier * 10) / 10,
      carbs: Math.round(food.carbs * multiplier * 10) / 10,
      fats: Math.round(food.fats * multiplier * 10) / 10
    };
  };

  const addMeal = () => {
    if (!selectedFood) return;
    
    const nutrients = calculateNutrients(selectedFood, quantity);
    
    setMeals([
      ...meals,
      {
        id: crypto.randomUUID(),
        name: `${selectedFood.name} (${quantity}g)`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        ...nutrients
      },
    ]);

    setSearchTerm('');
    setSelectedFood(null);
    setQuantity(100);
    setFilteredFoods([]);
  };

  const removeMeal = (id: string) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  const stats = meals.reduce(
    (acc, meal) => ({
      totalCalories: acc.totalCalories + meal.calories,
      totalProtein: acc.totalProtein + meal.protein,
      totalCarbs: acc.totalCarbs + meal.carbs,
      totalFats: acc.totalFats + meal.fats,
    }),
    { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFats: 0 }
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-[#151C2F] rounded-2xl border border-gray-800 p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text mb-6">
          Nutrition Tracker
        </h2>

        {/* Stats Display */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1A2237] p-4 rounded-lg border border-green-500/20">
            <h3 className="text-sm font-semibold text-green-400">Calories</h3>
            <p className="text-2xl font-bold text-green-500">{stats.totalCalories}</p>
          </div>
          <div className="bg-[#1A2237] p-4 rounded-lg border border-blue-500/20">
            <h3 className="text-sm font-semibold text-blue-400">Protein</h3>
            <p className="text-2xl font-bold text-blue-500">{stats.totalProtein}g</p>
          </div>
          <div className="bg-[#1A2237] p-4 rounded-lg border border-yellow-500/20">
            <h3 className="text-sm font-semibold text-yellow-400">Carbs</h3>
            <p className="text-2xl font-bold text-yellow-500">{stats.totalCarbs}g</p>
          </div>
          <div className="bg-[#1A2237] p-4 rounded-lg border border-red-500/20">
            <h3 className="text-sm font-semibold text-red-400">Fats</h3>
            <p className="text-2xl font-bold text-red-500">{stats.totalFats}g</p>
          </div>
        </div>

        {/* Food Search and Add */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search food..."
              className="w-full px-4 py-2 bg-[#1A2237] border border-gray-800 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
            
            {filteredFoods.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-[#1A2237] border border-gray-800 rounded-lg shadow-lg max-h-60 overflow-auto">
                {filteredFoods.map((food) => (
                  <button
                    key={food.name}
                    className="w-full px-4 py-2 text-left text-gray-300 hover:bg-[#232B42] transition-colors duration-150"
                    onClick={() => {
                      setSelectedFood(food);
                      setSearchTerm(food.name);
                      setFilteredFoods([]);
                    }}
                  >
                    {food.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedFood && (
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Quantity (g)"
                className="w-32 px-4 py-2 bg-[#1A2237] border border-gray-800 rounded-lg text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
              />
              <button
                onClick={addMeal}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Add
              </button>
            </div>
          )}
        </div>

        {/* Meals List */}
        <div className="space-y-4">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="flex items-center justify-between bg-[#1A2237] p-4 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors duration-150"
            >
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-white">{meal.name}</h3>
                  <span className="text-sm text-gray-400">{meal.time}</span>
                </div>
                <p className="text-gray-400">
                  {meal.calories} cal | {meal.protein}g protein | {meal.carbs}g carbs | {meal.fats}g fats
                </p>
              </div>
              <button
                onClick={() => removeMeal(meal.id)}
                className="text-red-400 hover:text-red-300 transition-colors duration-150 ml-4"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}