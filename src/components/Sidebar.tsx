import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Dumbbell, 
  Calendar, 
  LineChart, 
  Apple, 
  UtensilsCrossed,
  Settings,
  LogOut
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/workout-plans', icon: Calendar, label: 'Workout Plans' },
    { path: '/exercises', icon: Dumbbell, label: 'Exercises' },
    { path: '/progress', icon: LineChart, label: 'Progress' },
    { path: '/diet-plan', icon: Apple, label: 'Diet Plan' },
    { path: '/nutrition-tracker', icon: UtensilsCrossed, label: 'Nutrition' },
  ];

  return (
    <div className="w-64 h-screen bg-[#151C2F] fixed left-0 top-0 flex flex-col p-4 border-r border-gray-800">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 py-6">
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
          className="p-2 rounded-xl bg-indigo-500/10"
        >
          <Dumbbell className="h-8 w-8 text-indigo-500" />
        </motion.div>
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
          FitFreak
        </span>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 mt-8">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                isActive 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon className="h-5 w-5 relative z-10" />
              <span className="font-medium relative z-10">{item.label}</span>
              {isActive && (
                <div className="absolute right-4 h-2 w-2 rounded-full bg-indigo-500" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 