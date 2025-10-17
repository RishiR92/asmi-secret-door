import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const AIChiefOfStaffSection = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const agents = [
    { name: 'Meeting Prep Agent', icon: '📋', delay: 0 },
    { name: 'Network Agent', icon: '🔗', delay: 0.3 },
    { name: 'Email Agent', icon: '📧', delay: 0.6 }
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4" style={{ backgroundColor: '#000000' }}>
      <div className="w-full max-w-[400px] mx-auto space-y-8">
        {/* Current Wedge Badge */}
        <div className="flex justify-center">
          <div 
            className="px-6 py-2 rounded-full text-black font-medium text-lg"
            style={{ backgroundColor: '#00D96F' }}
          >
            Current Wedge
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-white text-4xl md:text-5xl font-bold text-center leading-tight">
          AI Chief of Staff
        </h1>

        {/* Messaging Apps */}
        <div className="flex items-center justify-center space-x-4">
          <span className="text-gray-400 text-lg">Within</span>
          <div className="flex items-center space-x-3">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle size={28} color="#fff" fill="#fff" />
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#34C759' }}
            >
              <MessageCircle size={28} color="#fff" fill="#fff" />
            </div>
          </div>
        </div>

        {/* Animation Section */}
        <div className="space-y-4 min-h-[300px]">
          {/* User Prompt - WhatsApp Style */}
          {step >= 0 && (
            <div className="flex justify-end animate-slide-in-right">
              <div 
                className="px-4 py-3 rounded-lg rounded-tr-sm max-w-[85%]"
                style={{ backgroundColor: '#005C4B' }}
              >
                <span className="text-sm text-white">
                  Get me ready for today
                </span>
              </div>
            </div>
          )}

          {/* Asmi thinking/coordinating */}
          {step >= 1 && (
            <div className="flex justify-start animate-scale-in">
              <div 
                className="px-4 py-3 rounded-lg rounded-tl-sm"
                style={{ backgroundColor: '#1F2C34' }}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#00D96F' }}></div>
                  <span className="text-sm text-white">Coordinating agents...</span>
                </div>
              </div>
            </div>
          )}

          {/* AI Agents spinning up */}
          {step >= 2 && (
            <div className="flex justify-center space-x-3 py-4 animate-fade-in">
              {agents.map((agent, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 animate-scale-in"
                  style={{ 
                    animationDelay: `${agent.delay}s`,
                    opacity: step >= 2 ? 1 : 0
                  }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl animate-spin"
                    style={{ 
                      backgroundColor: '#1F2C34',
                      animationDuration: '2s'
                    }}
                  >
                    {agent.icon}
                  </div>
                  <span className="text-xs text-gray-400 text-center max-w-[70px]">
                    {agent.name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Completion message */}
          {step >= 3 && (
            <div className="flex justify-start animate-scale-in">
              <div 
                className="px-4 py-3 rounded-lg rounded-tl-sm"
                style={{ backgroundColor: '#1F2C34' }}
              >
                <span className="text-sm text-white">
                  ✓ All agents synced. You're all set!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIChiefOfStaffSection;
