import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, Calendar, LineChart, Apple, ArrowRight, Flame, Target, Users } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, link, gradient }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Link 
        to={link} 
        className="block h-full bg-[#151C2F] p-8 rounded-2xl border border-gray-800 hover:border-indigo-500/50 transition-colors duration-300"
      >
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} mb-6`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </Link>
    </motion.div>
  );
}

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center p-8 bg-[#1A2237] rounded-2xl border border-gray-800"
    >
      <div className="inline-flex p-4 rounded-xl bg-indigo-500/10 mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white overflow-hidden">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[600px] overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(10, 15, 28, 0.9), rgba(10, 15, 28, 0.7)), url('/hero-bg.jpg')`
          }}
        />
        
        {/* Hero Content */}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
              TRANSFORM YOUR BODY,
              <br />
              ELEVATE YOUR LIFE
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Your journey to greatness starts here. Join the elite community of fitness enthusiasts who dare to push their limits.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/workout-plans"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
              >
                Start Your Journey
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <FeatureCard
            icon={<Calendar className="h-8 w-8" />}
            title="Smart Workout Plans"
            description="AI-powered personalized routines that adapt to your progress"
            link="/workout-plans"
            gradient="from-blue-500 to-indigo-500"
          />
          <FeatureCard
            icon={<Dumbbell className="h-8 w-8" />}
            title="Exercise Library"
            description="HD video guides with proper form techniques"
            link="/exercises"
            gradient="from-indigo-500 to-purple-500"
          />
          <FeatureCard
            icon={<LineChart className="h-8 w-8" />}
            title="Progress Analytics"
            description="Advanced metrics to track your transformation"
            link="/progress"
            gradient="from-purple-500 to-pink-500"
          />
          <FeatureCard
            icon={<Apple className="h-8 w-8" />}
            title="Nutrition Master"
            description="Custom meal plans to fuel your workouts"
            link="/diet-plan"
            gradient="from-pink-500 to-red-500"
          />
        </motion.div>
      </div>

      {/* Benefits Section */}
      <div className="bg-[#151C2F] py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
              Why Choose FitFreak?
            </h2>
            <p className="text-xl text-gray-400">Join the revolution in fitness transformation</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <BenefitCard
              icon={<Flame className="h-12 w-12" />}
              title="Expert Guidance"
              description="Get professional workout plans designed by certified trainers"
            />
            <BenefitCard
              icon={<Target className="h-12 w-12" />}
              title="Track Progress"
              description="Monitor your improvements with advanced analytics"
            />
            <BenefitCard
              icon={<Users className="h-12 w-12" />}
              title="Community Support"
              description="Join thousands of motivated fitness enthusiasts"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-24"
      >
        <div 
          className="absolute inset-0 bg-[url('/cta-bg.jpg')] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(79, 70, 229, 0.9), rgba(147, 51, 234, 0.9)), url('/cta-bg.jpg')`
          }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Become Unstoppable?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join FitFreak today and discover what you're truly capable of achieving
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/workout-plans"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-white/25"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 