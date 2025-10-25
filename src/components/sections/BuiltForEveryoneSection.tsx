
import { useState } from 'react';
import { User, Briefcase, TrendingUp, Users } from 'lucide-react';
import MobileOptimizedSection from './MobileOptimizedSection';

const BuiltForEveryoneSection = () => {
  const [selectedPersona, setSelectedPersona] = useState(0);

  const personas = [
    {
      icon: <Briefcase className="text-white" size={20} />,
      title: "Operators & Executives",
      summary: "Work + life in sync",
      example: "Asmi manages your work meetings, personal commitments, and everything in between. Get prepped before calls, never miss a birthday, and handle both project deadlines and family plans - all from WhatsApp/iMessage."
    },
    {
      icon: <Users className="text-white" size={20} />,
      title: "Consultants & Advisors",
      summary: "Client context on demand",
      example: "Asmi tracks every client interaction across work and personal networks. Surfaces relevant background before meetings, reminds you of follow-ups, and helps balance multiple clients while keeping your personal life organized."
    },
    {
      icon: <TrendingUp className="text-white" size={20} />,
      title: "Legal & Finance Professionals",
      summary: "Details that matter",
      example: "Asmi organizes case details, client communications, and deadlines while managing your personal schedule. Never lose track of important dates - whether it's a filing deadline, court appearance, or your kid's recital."
    },
    {
      icon: <User className="text-white" size={20} />,
      title: "Educators & Creators",
      summary: "Focus on what matters",
      example: "Asmi handles your teaching schedule, student communications, and personal commitments. Get reminded of parent meetings, prep materials for classes, and still have time for your creative projects and family - all managed effortlessly."
    }
  ];

  return (
    <MobileOptimizedSection>
      <div className="text-center space-y-8">
        <h2 className="text-3xl font-bold text-white">
          Built for busy professionals managing work and life.
        </h2>

        {/* Main selected persona */}
        <div className="bg-gray-900/50 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
          <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
            {personas[selectedPersona].icon}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">
            {personas[selectedPersona].title}
          </h3>
          
          <div className="text-green-400 font-medium mb-4 text-sm">
            {personas[selectedPersona].summary}
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            {personas[selectedPersona].example}
          </p>
        </div>

        {/* Persona selector */}
        <div className="flex justify-center space-x-3">
          {personas.map((persona, index) => (
            <button
              key={index}
              onClick={() => setSelectedPersona(index)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 touch-target ${
                selectedPersona === index 
                  ? 'bg-green-400 border-2 border-green-400 scale-110' 
                  : 'bg-gray-800 border-2 border-gray-600 hover:border-gray-400'
              }`}
            >
              {persona.icon}
            </button>
          ))}
        </div>

        <p className="text-gray-500 text-xs">
          Tap personas to explore
        </p>
      </div>
    </MobileOptimizedSection>
  );
};

export default BuiltForEveryoneSection;
