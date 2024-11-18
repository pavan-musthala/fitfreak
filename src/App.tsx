import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import WorkoutPlans from './components/WorkoutPlans';
import Exercises from './components/Exercises';
import Progress from './components/Progress';
import DietPlan from './components/DietPlan';
import NutritionTracker from './components/NutritionTracker';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0A0F1C]">
        <Navbar />
        <main className="pt-20">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/workout-plans" element={<WorkoutPlans />} />
              <Route path="/exercises" element={<Exercises />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/diet-plan" element={<DietPlan />} />
              <Route path="/nutrition-tracker" element={<NutritionTracker />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;