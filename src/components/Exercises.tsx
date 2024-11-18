import React, { useState } from 'react';
import { Dumbbell, ChevronRight } from 'lucide-react';
import PushExercises from './exercises/Push';
import PullExercises from './exercises/Pull';
import LegExercises from './exercises/Legs';
import ChestExercises from './exercises/bodyParts/Chest';
import BackExercises from './exercises/bodyParts/Back';
import ShouldersExercises from './exercises/bodyParts/Shoulders';
import ArmsExercises from './exercises/bodyParts/Arms';
import AbsExercises from './exercises/bodyParts/Abs';
import { motion } from 'framer-motion';

type ExerciseView = 'ppl' | 'bodyParts';
type WorkoutType = 'push' | 'pull' | 'legs';
type BodyPart = 'chest' | 'back' | 'shoulders' | 'arms' | 'abs' | 'legs';

export default function Exercises() {
  const [view, setView] = useState<ExerciseView>('ppl');
  const [selectedType, setSelectedType] = useState<WorkoutType>('push');
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart>('chest');

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Hero Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
              Exercise Library
            </h1>
            <p className="text-xl text-gray-300">
              Master your form with our comprehensive guide to exercises
            </p>
          </motion.div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="container mx-auto px-4">
        <div className="flex gap-4 mb-8">
          {['ppl', 'bodyParts'].map((viewType) => (
            <motion.button
              key={viewType}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView(viewType as ExerciseView)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                view === viewType
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-[#151C2F] text-gray-400 hover:text-white hover:bg-[#1A2237]'
              }`}
            >
              {viewType === 'ppl' ? 'Push/Pull/Legs' : 'Body Parts'}
            </motion.button>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
          {(view === 'ppl' ? [
            { id: 'push', label: 'Push Day', icon: Dumbbell },
            { id: 'pull', label: 'Pull Day', icon: Dumbbell },
            { id: 'legs', label: 'Leg Day', icon: Dumbbell },
          ] : [
            { id: 'chest', label: 'Chest', icon: Dumbbell },
            { id: 'back', label: 'Back', icon: Dumbbell },
            { id: 'shoulders', label: 'Shoulders', icon: Dumbbell },
            { id: 'arms', label: 'Arms', icon: Dumbbell },
            { id: 'abs', label: 'Abs', icon: Dumbbell },
            { id: 'legs', label: 'Legs', icon: Dumbbell },
          ]).map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => view === 'ppl' 
                ? setSelectedType(tab.id as WorkoutType)
                : setSelectedBodyPart(tab.id as BodyPart)
              }
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ${
                (view === 'ppl' ? selectedType : selectedBodyPart) === tab.id
                  ? 'bg-[#1A2237] text-white border border-indigo-500/50'
                  : 'bg-[#151C2F] text-gray-400 hover:text-white hover:bg-[#1A2237] border border-transparent'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#151C2F] rounded-2xl border border-gray-800 overflow-hidden mb-8"
        >
          <div className="p-8">
            {view === 'ppl' ? (
              <>
                {selectedType === 'push' && <PushExercises />}
                {selectedType === 'pull' && <PullExercises />}
                {selectedType === 'legs' && <LegExercises />}
              </>
            ) : (
              <>
                {selectedBodyPart === 'chest' && <ChestExercises />}
                {selectedBodyPart === 'back' && <BackExercises />}
                {selectedBodyPart === 'shoulders' && <ShouldersExercises />}
                {selectedBodyPart === 'arms' && <ArmsExercises />}
                {selectedBodyPart === 'abs' && <AbsExercises />}
                {selectedBodyPart === 'legs' && <LegExercises />}
              </>
            )}
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#151C2F] rounded-2xl border border-gray-800 p-8 mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
            Training Tips
          </h3>
          <div className="grid gap-4">
            {[
              'Always warm up properly before starting your workout',
              'Focus on proper form over weight',
              'Progress gradually to avoid injury',
              'Stay hydrated throughout your workout'
            ].map((tip, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#1A2237] hover:bg-[#1F2847] transition-colors duration-200"
              >
                <div className="p-2 rounded-lg bg-indigo-500/10">
                  <ChevronRight className="h-5 w-5 text-indigo-400" />
                </div>
                <p className="text-gray-300">{tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}