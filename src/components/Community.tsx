import React from 'react';

export default function Community() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Community</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Forums Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Discussion Forums</h2>
          <ul className="space-y-4">
            <li className="border-b pb-2">
              <h3 className="font-medium">Workout Tips & Advice</h3>
              <p className="text-sm text-gray-600">Share and discuss workout techniques</p>
            </li>
            <li className="border-b pb-2">
              <h3 className="font-medium">Nutrition & Diet</h3>
              <p className="text-sm text-gray-600">Exchange meal plans and recipes</p>
            </li>
            <li className="border-b pb-2">
              <h3 className="font-medium">Progress Stories</h3>
              <p className="text-sm text-gray-600">Share your fitness journey</p>
            </li>
          </ul>
        </div>

        {/* Events Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <ul className="space-y-4">
            <li className="border-b pb-2">
              <h3 className="font-medium">Group Workout Session</h3>
              <p className="text-sm text-gray-600">Saturday, 10 AM</p>
            </li>
            <li className="border-b pb-2">
              <h3 className="font-medium">Nutrition Workshop</h3>
              <p className="text-sm text-gray-600">Sunday, 2 PM</p>
            </li>
          </ul>
        </div>

        {/* Challenges Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Challenges</h2>
          <ul className="space-y-4">
            <li className="border-b pb-2">
              <h3 className="font-medium">30-Day Push-Up Challenge</h3>
              <p className="text-sm text-gray-600">Join 156 participants</p>
            </li>
            <li className="border-b pb-2">
              <h3 className="font-medium">Clean Eating Challenge</h3>
              <p className="text-sm text-gray-600">Join 89 participants</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 