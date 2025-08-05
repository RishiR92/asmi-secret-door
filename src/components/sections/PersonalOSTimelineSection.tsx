import { useState, useEffect, useRef } from 'react';
import { Database, MessageSquare, Eye, Calendar, Mail } from 'lucide-react';

const PersonalOSTimelineSection = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const timelineSteps = [
    {
      year: "Now",
      title: "Digital Layer",
      description: "Integrating mails, calendar and conversations to build work related context",
      icon: <Database className="text-blue-400" size={16} />,
      color: "border-blue-400/30 bg-blue-500/10"
    },
    {
      year: "2026", 
      title: "Go Deeper",
      description: "Bring more high context and high frequency digital data points like slack & more to building deeper context",
      icon: <MessageSquare className="text-green-400" size={16} />,
      color: "border-green-400/30 bg-green-500/10"
    },
    {
      year: "2027",
      title: "The Context Layer", 
      description: "Going beyond digital data to unstructured physical data on what users see, say or hear - mapping the complete personal context",
      icon: <Eye className="text-purple-400" size={16} />,
      color: "border-purple-400/30 bg-purple-500/10"
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
    }, 300);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="h-screen bg-black flex items-center justify-center py-4">
      <div className="px-4 w-full max-w-sm mx-auto">
        <div className="text-center space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white leading-tight">
              Starting from Personal OS, Building the context layer for personal super-intelligence
            </h2>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {timelineSteps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 transform ${
                  visibleSteps.includes(index)
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-4 scale-95'
                }`}
              >
                {/* Timeline Line */}
                {index < timelineSteps.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-6 bg-gradient-to-b from-gray-600 to-transparent z-0" />
                )}
                
                {/* Timeline Item */}
                <div className={`relative bg-gradient-to-r from-gray-900/60 to-gray-800/40 border rounded-xl p-4 backdrop-blur-sm ${step.color}`}>
                  <div className="flex items-start space-x-3">
                    {/* Icon & Year */}
                    <div className="flex flex-col items-center space-y-1 flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-br from-black/70 to-gray-900/50 rounded-full flex items-center justify-center">
                        {step.icon}
                      </div>
                      <span className="text-xs font-semibold text-white">
                        {step.year}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="text-left space-y-1">
                      <h3 className="text-sm font-bold text-white">
                        {step.title}
                      </h3>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalOSTimelineSection;