import { useState, useEffect, useRef } from 'react';
import { Mic, Zap, Brain } from 'lucide-react';

const PersonalOSTimelineSection = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [showHighlight, setShowHighlight] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const timelineSteps = [
    {
      year: "Now",
      title: "Personal OS",
      description: "One interface for everything — calendar, inbox, meetings and thoughts.",
      icon: <Mic className="text-green-400" size={20} />,
    },
    {
      year: "2025", 
      title: "Decision Layer",
      description: "Asmi takes over high-frequency tasks — calls, bookings, purchases — to build rich, real-time context.",
      icon: <Zap className="text-green-400" size={20} />,
    },
    {
      year: "2026",
      title: "Personalized AI", 
      description: "The deepest user context layer. Powers any LLM or tool. Controlled by you - just flip the switch.",
      icon: <Brain className="text-green-400" size={20} />,
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      timelineSteps.forEach((_, index) => {
        setTimeout(() => {
          setVisibleSteps(prev => [...prev, index]);
        }, index * 600);
      });
      
      // Show highlight after all steps are visible
      setTimeout(() => {
        setShowHighlight(true);
      }, timelineSteps.length * 600 + 400);
    }, 300);

    return () => clearTimeout(timer);
  }, [isVisible, timelineSteps.length]);

  return (
    <div ref={sectionRef} className="h-screen bg-black flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-sm mx-auto space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-400">Starting with Personal OS.</p>
          <h1 className="text-2xl font-bold text-white leading-tight">
            Building the Deepest Personal Context.
          </h1>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {timelineSteps.map((step, index) => (
            <div
              key={index}
              className={`relative transition-all duration-700 transform ${
                visibleSteps.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Timeline Line */}
              {index < timelineSteps.length - 1 && (
                <div className="absolute left-5 top-12 w-0.5 h-12 bg-green-400/30 z-0" />
              )}
              
              {/* Timeline Item */}
              <div className="relative flex items-start space-x-4">
                {/* Icon Circle */}
                <div className="w-10 h-10 bg-transparent border-2 border-green-400 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                  {step.icon}
                </div>
                
                {/* Content */}
                <div className="text-left space-y-1 pt-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white">{step.year}:</span>
                    <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Highlight */}
        {showHighlight && (
          <div className={`transition-all duration-700 transform ${
            showHighlight ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-center">
              <p className="text-lg font-bold text-white leading-tight">
                Asmi becomes your AI layer that — Knows you. Adapts to you. Gets it done — without being asked.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalOSTimelineSection;