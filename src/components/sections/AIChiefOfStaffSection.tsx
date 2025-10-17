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
    { icon: '⚡', delay: 0, angle: -60 },
    { icon: '💫', delay: 0.15, angle: -30 },
    { icon: '🤖', delay: 0.3, angle: 0 },
    { icon: '✨', delay: 0.45, angle: 30 },
    { icon: '⭐', delay: 0.6, angle: 60 }
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
        <div className="relative min-h-[320px] flex items-center justify-center">
          {/* User Prompt Text */}
          {step >= 0 && (
            <div 
              className="absolute left-0 transition-all duration-1000 ease-out"
              style={{
                opacity: step >= 1 ? 0 : 1,
                transform: step >= 1 ? 'translateX(150px)' : 'translateX(0)'
              }}
            >
              <span className="text-white text-lg font-medium">
                User Prompt
              </span>
            </div>
          )}

          {/* Central Asmi Logo */}
          <div className="relative">
            <div 
              className="w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-500"
              style={{ 
                backgroundColor: '#25D366',
                transform: step === 2 ? 'scale(1.15)' : 'scale(1)',
                boxShadow: step === 2 ? '0 0 30px rgba(0, 217, 111, 0.6)' : 'none'
              }}
            >
              <MessageCircle size={36} color="#fff" fill="#fff" />
              <span className="text-white text-xs font-bold mt-1">Asmi</span>
            </div>

            {/* AI Agents emerging in radial pattern */}
            {step >= 3 && (
              <>
                {agents.map((agent, index) => {
                  const radius = 100;
                  const angleRad = (agent.angle * Math.PI) / 180;
                  const x = Math.cos(angleRad) * radius;
                  const y = Math.sin(angleRad) * radius;
                  
                  return (
                    <div
                      key={index}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-scale-in"
                      style={{ 
                        animationDelay: `${agent.delay}s`,
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                      }}
                    >
                      <div 
                        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                        style={{ 
                          backgroundColor: '#1F2C34',
                          animation: 'float-subtle 2s ease-in-out infinite',
                          animationDelay: `${agent.delay * 2}s`
                        }}
                      >
                        {agent.icon}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChiefOfStaffSection;
