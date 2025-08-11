import { useState, useEffect, useRef } from 'react';
import { Mail, Calendar, MessageSquare, Slack, FileText, Workflow, Mic, Eye, Waves, Lock, Smartphone, Zap, Globe, Brain, Database } from 'lucide-react';

const OrbitDialVisionSection = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const [animatingIcons, setAnimatingIcons] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const phases = [
    {
      name: "Now",
      icons: [Mail, Calendar, MessageSquare],
      tags: ["dedupe", "unify"],
      color: "text-neon-green",
      arcColor: "stroke-neon-green",
      radius: 120
    },
    {
      name: "2026", 
      icons: [Slack, FileText, Workflow],
      tags: ["context", "amplify"],
      color: "text-soft-purple",
      arcColor: "stroke-soft-purple",
      radius: 160
    },
    {
      name: "2027",
      icons: [Mic, Eye, Waves],
      tags: ["vision", "ambient"],
      color: "text-neon-green",
      arcColor: "stroke-neon-green",
      radius: 200
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

    const phaseTimer = setInterval(() => {
      setCurrentPhase((prev) => {
        const nextPhase = (prev + 1) % phases.length;
        
        // Reset animating icons when phase changes
        setAnimatingIcons([]);
        
        // Start icon animations 1 second after phase starts
        setTimeout(() => {
          const currentPhaseIcons = phases[nextPhase].icons;
          currentPhaseIcons.forEach((_, index) => {
            setTimeout(() => {
              setAnimatingIcons(prev => [...prev, index]);
            }, index * 800); // Stagger icon animations by 800ms
          });
        }, 1000);
        
        // Show caption only on the last phase
        if (nextPhase === phases.length - 1) {
          setTimeout(() => setShowCaption(true), 4000);
        } else {
          setShowCaption(false);
        }
        
        return nextPhase;
      });
    }, 8000); // 8 seconds per phase (slower)

    // Initial animation for first phase
    if (currentPhase === 0) {
      setTimeout(() => {
        phases[0].icons.forEach((_, index) => {
          setTimeout(() => {
            setAnimatingIcons(prev => [...prev, index]);
          }, index * 800);
        });
      }, 1000);
    }

    return () => clearInterval(phaseTimer);
  }, [isVisible, phases.length]);

  const renderFlowingIcons = (icons: any[], phaseIndex: number) => {
    return icons.map((Icon, index) => {
      const isActive = currentPhase === phaseIndex && animatingIcons.includes(index);
      const phase = phases[phaseIndex];
      
      // Calculate starting position on the arc
      const startAngle = (index * 120) + (phaseIndex * 45);
      const startRadius = phase.radius;
      const startX = Math.cos((startAngle * Math.PI) / 180) * startRadius;
      const startY = Math.sin((startAngle * Math.PI) / 180) * startRadius;

      return (
        <div
          key={`${phaseIndex}-${index}`}
          className={`absolute transition-all duration-3000 ease-out ${
            isActive ? 'opacity-100 animate-flow-radial' : 'opacity-0'
          }`}
          style={{
            left: `calc(50% + ${startX}px)`,
            top: `calc(50% + ${startY}px)`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${index * 0.8}s`
          }}
        >
          <div className="relative">
            <Icon size={24} className={`${phase.color} drop-shadow-glow`} />
            <div className="absolute inset-0 animate-pulse-glow rounded-full blur-sm opacity-50" 
                 style={{ backgroundColor: phaseIndex === 0 ? '#00FF8A' : phaseIndex === 1 ? '#A066FF' : '#00FF8A' }} />
          </div>
        </div>
      );
    });
  };

  const renderFloatingTags = (tags: string[], phaseIndex: number) => {
    return tags.map((tag, index) => {
      const isActive = currentPhase === phaseIndex;
      const phase = phases[phaseIndex];
      
      // Position tags at different angles around their respective arcs
      const angle = (index * 180) + 90 + (phaseIndex * 30);
      const radius = phase.radius + 30; // Position tags slightly outside the arc
      const x = Math.cos((angle * Math.PI) / 180) * radius;
      const y = Math.sin((angle * Math.PI) / 180) * radius;

      return (
        <div
          key={`tag-${phaseIndex}-${index}`}
          className={`absolute transition-all duration-2000 ${
            isActive ? 'opacity-100 scale-100 animate-fade-in-scale' : 'opacity-0 scale-75'
          }`}
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${1.5 + index * 0.5}s`
          }}
        >
          <span className={`text-sm font-medium px-3 py-1.5 rounded-full bg-black/70 border backdrop-blur-sm ${
            phaseIndex === 0 ? 'border-neon-green text-neon-green shadow-neon-green/20' :
            phaseIndex === 1 ? 'border-soft-purple text-soft-purple shadow-soft-purple/20' :
            'border-neon-green text-neon-green shadow-neon-green/20'
          } shadow-lg`}>
            {tag}
          </span>
        </div>
      );
    });
  };

  return (
    <div ref={sectionRef} className="h-screen bg-black flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl mx-auto relative h-[500px]">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            Vision: Personal Superintelligence
          </h1>
        </div>

        {/* Phase Indicators */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {phases.map((phase, index) => (
            <div key={index} className="flex flex-col items-center space-y-1">
              <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                currentPhase === index 
                  ? 'bg-neon-green shadow-lg shadow-neon-green/50 scale-125' 
                  : 'bg-gray-600'
              }`} />
              <span className={`text-xs font-medium transition-all duration-500 ${
                currentPhase === index ? phase.color : 'text-gray-500'
              }`}>
                {phase.name}
              </span>
            </div>
          ))}
        </div>

        {/* Central Orbit Dial */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Concentric Arcs */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
            {phases.map((phase, index) => {
              const radius = phase.radius * 0.6; // Scale for SVG viewBox
              const circumference = 2 * Math.PI * radius;
              const isActive = currentPhase === index;
              
              // Calculate label position on the arc
              const labelAngle = -Math.PI / 3; // Position at top-right of arc
              const labelX = 250 + radius * Math.cos(labelAngle);
              const labelY = 250 + radius * Math.sin(labelAngle);
              
              return (
                <g key={index}>
                  {/* Background arc */}
                  <circle
                    cx="250"
                    cy="250"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="2"
                  />
                  {/* Active arc with glow */}
                  <circle
                    cx="250"
                    cy="250"
                    r={radius}
                    fill="none"
                    className={`transition-all duration-2000 ease-out ${
                      isActive 
                        ? index === 0 ? 'stroke-neon-green' 
                          : index === 1 ? 'stroke-soft-purple'
                          : 'stroke-neon-green'
                        : 'stroke-transparent'
                    }`}
                    strokeWidth={isActive ? "4" : "2"}
                    strokeDasharray={`${circumference * 0.8} ${circumference * 0.2}`}
                    strokeDashoffset={isActive ? 0 : circumference}
                    style={{
                      filter: isActive ? `drop-shadow(0 0 12px ${
                        index === 0 ? '#00FF8A' 
                          : index === 1 ? '#A066FF'
                          : '#00FF8A'
                      })` : 'none',
                      animation: isActive ? 'rotate-slow 20s linear infinite' : 'none',
                      transformOrigin: '250px 250px'
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Central Asmi Orb */}
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-neon-green to-neon-green/80 flex items-center justify-center shadow-2xl shadow-neon-green/40 relative animate-pulse-orb">
              {/* Purple halo */}
              <div className="absolute inset-0 rounded-full bg-soft-purple/20 animate-pulse scale-125 blur-sm" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-green/30 to-soft-purple/30 animate-spin-slow scale-150 blur-md" />
              <div className="absolute inset-0 rounded-full bg-neon-green/10 animate-ping scale-200" />
              
              {/* Core orb */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-neon-green via-neon-green/95 to-neon-green/90 flex items-center justify-center border border-neon-green/50">
                <span className="text-black font-bold text-base tracking-wide">Asmi</span>
              </div>
            </div>
          </div>

          {/* Flowing Icons */}
          {phases.map((phase, phaseIndex) => renderFlowingIcons(phase.icons, phaseIndex))}
          
          {/* Floating Tags */}
          {phases.map((phase, phaseIndex) => renderFloatingTags(phase.tags, phaseIndex))}

          {/* 2027 Phase - App routing animation */}
          {currentPhase === 2 && (
            <>
              {/* Lock icon - appears first */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className={`transition-all duration-1000 ${
                  animatingIcons.length > 0 ? 'opacity-100 scale-100 animate-pulse-glow' : 'opacity-0 scale-75'
                }`}>
                  <Lock size={24} className="text-neon-green drop-shadow-glow" />
                </div>
              </div>
              
              {/* App routing arrows - appear after lock */}
              <div className="absolute inset-0">
                {[Smartphone, Zap, Globe, Brain, Database].map((Icon, index) => {
                  const angle = (index * 72) - 90; // 360/5 = 72 degrees apart
                  const radius = 250;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  return (
                    <div
                      key={index}
                      className={`absolute transition-all duration-1500 ${
                        animatingIcons.length > 1 ? 'opacity-100 scale-100 animate-fade-in-scale' : 'opacity-0 scale-75'
                      }`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)',
                        animationDelay: `${3 + index * 0.3}s`
                      }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-900 border-2 border-neon-green/50 flex items-center justify-center shadow-lg shadow-neon-green/20 hover:border-neon-green transition-colors">
                        <Icon size={20} className="text-neon-green" />
                      </div>
                      
                      {/* Arrow pointing from center */}
                      <div 
                        className="absolute w-0.5 h-16 bg-gradient-to-b from-neon-green/80 to-transparent animate-draw-arrow opacity-0"
                        style={{
                          left: '50%',
                          bottom: '100%',
                          transform: `translateX(-50%) rotate(${angle}deg)`,
                          transformOrigin: 'bottom center',
                          animationDelay: `${4 + index * 0.3}s`,
                          animationFillMode: 'forwards'
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Bottom Caption */}
        {showCaption && (
          <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 ${
            showCaption ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="bg-gray-900/80 border border-gray-700 rounded-xl p-4 text-center backdrop-blur-sm">
              <p className="text-lg font-bold text-white leading-tight">
                Deepest personal context. You choose where it flows.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrbitDialVisionSection;