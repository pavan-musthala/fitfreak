import React from 'react';
import { Dumbbell, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8" />
            <h1 className="text-2xl font-bold">FitTrack</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#dashboard" className="hover:text-indigo-200 transition">Dashboard</a>
            <a href="#workouts" className="hover:text-indigo-200 transition">Workouts</a>
            <a href="#nutrition" className="hover:text-indigo-200 transition">Nutrition</a>
          </nav>
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}