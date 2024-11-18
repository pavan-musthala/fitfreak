import React, { useState } from 'react';
import { Play, Info, X } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Exercise Image/Video Section */}
      <div className="relative aspect-video">
        {showVideo ? (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-3xl mx-4">
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-10 right-0 text-white"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="aspect-video">
                <iframe
                  src={exercise.media.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <img
              src={exercise.media.image}
              alt={exercise.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setShowVideo(true)}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-opacity"
            >
              <Play className="h-12 w-12 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Exercise Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{exercise.name}</h3>
          <span className={`px-2 py-1 rounded-full text-sm ${
            exercise.difficulty === 'beginner' 
              ? 'bg-green-100 text-green-800'
              : exercise.difficulty === 'intermediate'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {exercise.difficulty}
          </span>
        </div>

        {/* Exercise Details */}
        <div className="space-y-4">
          {/* ... existing card content ... */}
          
          {/* Instructions Accordion */}
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer">
              <span className="font-medium">Instructions</span>
              <Info className="h-5 w-5 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="mt-2 space-y-2">
              {exercise.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="font-medium text-indigo-600">{index + 1}.</span>
                  <p className="text-gray-600">{instruction}</p>
                </div>
              ))}
            </div>
          </details>

          {/* Common Mistakes */}
          {exercise.commonMistakes && (
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer">
                <span className="font-medium">Common Mistakes</span>
                <Info className="h-5 w-5 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="mt-2 space-y-2">
                {exercise.commonMistakes.map((mistake, index) => (
                  <div key={index} className="flex items-start gap-2 text-red-600">
                    <span>•</span>
                    <p>{mistake}</p>
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
} 