
import { useState } from 'react';
import { User, Briefcase, TrendingUp, Users } from 'lucide-react';
import MobileOptimizedSection from './MobileOptimizedSection';

const BuiltForEveryoneSection = () => {
  const [selectedPersona, setSelectedPersona] = useState(0);

  const personas = [
    {
      icon: <TrendingUp className="text-white" size={20} />,
      title: "Fast Growing Startups",
      summary: "Context intelligence",
      example: "Asmi is pulling meetings, relationships, and email into one place. It preps you before every call, surfaces network intel automatically, and turns your inbox into simple, actionable updates in WhatsApp/iMessage"
    },
    {
      icon: <User className="text-white" size={20} />,
      title: "Founders",
      summary: "Leverage on autopilot",
      example: "Asmi keeps you sharp in the chaos - daily plan in WhatsApp, pre-reads before every call, and missed follow-ups surfaced from your inbox. Think of it as the co-pilot that never misses."
    },
    {
      icon: <Briefcase className="text-white" size={20} />,
      title: "Operators & Execs", 
      summary: "Execution speed",
      example: "Operators don't have time to switch between 10 apps. Asmi brings everything that matters into WhatsApp/iMessage - meetings, inbox, network insights - saving you 1+ hours every day so you can ship faster."
    },
    {
      icon: <Users className="text-white" size={20} />,
      title: "Investors & Advisors", 
      summary: "Relationship intelligence",
      example: "Asmi tracks every founder interaction, surfaces deal-relevant context instantly, and reminds you when to follow up - for both portfolio and new opportunities. Stay ahead of the curve, without the spreadsheet grind."
    }
  ];

  return (
    <MobileOptimizedSection>
      <div className="text-center space-y-8">
        <h2 className="text-3xl font-bold text-white">
          Built for fast moving people.
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
