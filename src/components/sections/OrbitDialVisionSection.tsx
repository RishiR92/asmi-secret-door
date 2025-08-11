import { useState, useEffect, useRef } from 'react';
import { Mail, Calendar, MessageCircle, Slack, FileText, Workflow, Mic, Eye, Waves, Lock } from 'lucide-react';

const OrbitDialVisionSection = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const phases = [
    {
      name: "Now",
      duration: 3000,
      icons: [Mail, Calendar, MessageCircle],
      tags: ["dedupe", "unify"],
      arcColor: "neon-green"
    },
    {
      name: "2026", 
      duration: 3000,
      icons: [Slack, FileText, Workflow],
      tags: [],
      arcColor: "soft-purple"
    },
    {
      name: "2027",
      duration: 3000,
      icons: [Mic, Eye, Waves],
      tags: [],
      arcColor: "neon-green"
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

    const cyclePhases = () => {
      let phaseIndex = 0;
      
      const nextPhase = () => {
        setCurrentPhase(phaseIndex);
        
        // Show caption at the end of the last phase
        if (phaseIndex === phases.length - 1) {
          setTimeout(() => {
            setShowCaption(true);
          }, phases[phaseIndex].duration - 1000);
        }
        
        phaseIndex = (phaseIndex + 1) % phases.length;
        
        // Reset caption when cycling back
        if (phaseIndex === 0) {
          setShowCaption(false);
        }
        
        setTimeout(nextPhase, phases[phaseIndex === 0 ? phases.length - 1 : phaseIndex - 1].duration);
      };
      
      nextPhase();
    };

    const timer = setTimeout(cyclePhases, 500);
    return () => clearTimeout(timer);
  }, [isVisible, phases.length]);

  const renderFlowingIcons = (icons: any[], phaseIndex: number) => {
    return icons.map((IconComponent, index) => (
      <div
        key={`${phaseIndex}-${index}`}
        className={`absolute transition-all duration-300 ${
          currentPhase === phaseIndex ? 'animate-icon-flow' : 'opacity-0'
        }`}
        style={{
          left: `${20 + index * 15}%`,
          top: `${45 + index * 10}%`,
          animationDelay: `${index * 200}ms`
        }}
      >
        <IconComponent size={16} className="text-neon-green" />
      </div>
    ));
  };

  const renderFloatingTags = (tags: string[], phaseIndex: number) => {
    return tags.map((tag, index) => (
      <div
        key={`tag-${phaseIndex}-${index}`}
        className={`absolute text-xs text-white/70 transition-all duration-300 ${
          currentPhase === phaseIndex ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          left: `${60 + index * 20}%`,
          top: `${30 + index * 15}%`,
          animationDelay: `${index * 400}ms`
        }}
      >
        {tag}
      </div>
    ));
  };

  return (
    <div ref={sectionRef} className="h-screen bg-black-matte flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-sm mx-auto space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white leading-tight">
            Vision: Personal Superintelligence
          </h1>
        </div>

        {/* Orbit Dial */}
        <div className="relative w-80 h-80 mx-auto">
          {/* Concentric Arcs */}
          {[120, 160, 200].map((radius, index) => (
            <svg
              key={index}
              className="absolute inset-0 w-full h-full animate-orbit-rotate"
              style={{ animationDelay: `${index * 2}s` }}
            >
              <circle
                cx="160"
                cy="160"
                r={radius}
                fill="none"
                stroke={currentPhase === index ? `hsl(var(--${phases[index].arcColor}))` : 'rgba(255,255,255,0.1)'}
                strokeWidth="2"
                strokeDasharray="8 12"
                className={`transition-all duration-500 ${
                  currentPhase === index ? 'opacity-80 animate-pulse' : 'opacity-30'
                }`}
              />
            </svg>
          ))}

          {/* Arc Labels */}
          {phases.map((phase, index) => (
            <div
              key={`label-${index}`}
              className={`absolute text-sm font-medium transition-all duration-300 ${
                currentPhase === index ? 'text-white' : 'text-white/50'
              }`}
              style={{
                left: `${50 + (index * 15)}%`,
                top: `${15 + (index * 10)}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {phase.name}
            </div>
          ))}

          {/* Central Orb */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-neon-green/20 to-soft-purple/20 border-2 border-neon-green animate-orb-pulse flex items-center justify-center">
                <span className="text-white font-bold text-lg">Asmi</span>
              </div>
              
              {/* Purple Outer Halo */}
              <div className="absolute inset-0 w-24 h-24 -m-2 rounded-full bg-soft-purple/10 animate-pulse"></div>
            </div>
          </div>

          {/* Flowing Icons */}
          {phases.map((phase, phaseIndex) => renderFlowingIcons(phase.icons, phaseIndex))}
          
          {/* Floating Tags */}
          {phases.map((phase, phaseIndex) => renderFloatingTags(phase.tags, phaseIndex))}

          {/* Lock Icon for Security (2027 phase) */}
          {currentPhase === 2 && (
            <div className="absolute top-1/3 right-1/4 animate-fade-in">
              <Lock size={14} className="text-white/70" />
            </div>
          )}

          {/* App Routing Icons (2027 phase) */}
          {currentPhase === 2 && (
            <div className="absolute bottom-1/4 right-1/3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-neon-green/60 rounded-full animate-pulse"
                  style={{
                    transform: `rotate(${i * 72}deg) translateX(40px)`,
                    animationDelay: `${i * 200}ms`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bottom Caption */}
        {showCaption && (
          <div className="text-center animate-fade-in">
            <p className="text-lg font-bold text-white leading-tight">
              Deepest personal context. You choose where it flows.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrbitDialVisionSection;