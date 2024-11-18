import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Calendar, LineChart, Utensils, Menu } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const links = [
    { path: '/plans', name: 'Workout Plans', icon: Dumbbell },
    { path: '/today', name: 'Today\'s Workout', icon: Calendar },
    { path: '/progress', name: 'Progress', icon: LineChart },
    { path: '/diet', name: 'Diet Plan', icon: Utensils },
  ];

  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8" />
            <h1 className="text-2xl font-bold">FitTrack</h1>
          </Link>

          <nav className="hidden md:flex space-x-6">
            {links.map(({ path, name, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 hover:text-indigo-200 transition ${
                  location.pathname === path ? 'text-indigo-200' : ''
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{name}</span>
              </Link>
            ))}
          </nav>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {links.map(({ path, name, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 p-2 rounded hover:bg-indigo-700 transition ${
                  location.pathname === path ? 'bg-indigo-700' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}