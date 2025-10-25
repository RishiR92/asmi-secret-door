
import { useState } from 'react';
import { Calendar, MessageSquare, Users, Clock } from 'lucide-react';
import MobileOptimizedSection from './MobileOptimizedSection';

const BuiltForEveryoneSection = () => {
  const [selectedPersona, setSelectedPersona] = useState(0);

  const personas = [
    {
      icon: <Calendar className="text-white" size={20} />,
      title: "Too Many Meetings",
      summary: "Never caught off guard",
      example: "Asmi preps you for every call - client presentations at 9am, parent-teacher conference at 3pm. Background on every person, context from past conversations, and follow-ups tracked. Work meetings and family commitments, all handled."
    },
    {
      icon: <MessageSquare className="text-white" size={20} />,
      title: "Drowning in Messages",
      summary: "Inbox to action, instantly",
      example: "Asmi turns email chaos into clear updates in WhatsApp. Urgent client requests, school permission slips, dinner RSVPs - all triaged and surfaced with what needs your attention right now, both work and personal."
    },
    {
      icon: <Users className="text-white" size={20} />,
      title: "Losing Track of People",
      summary: "Remember every relationship",
      example: "Asmi tracks everyone - colleagues, clients, friends, family. Reminds you when someone's birthday is coming up, surfaces when it's time to follow up with a lead, and helps you maintain relationships that matter in every part of your life."
    },
    {
      icon: <Clock className="text-white" size={20} />,
      title: "Work-Life Blur",
      summary: "Balance without effort",
      example: "Asmi manages both worlds seamlessly. Reschedules your team standup around your kid's soccer game, blocks focus time for your presentation while keeping space for date night. One AI, all of life, in sync."
    }
  ];

  return (
    <MobileOptimizedSection>
      <div className="text-center space-y-8">
        <h2 className="text-3xl font-bold text-white">
          One AI managing everything. Work and life.
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
