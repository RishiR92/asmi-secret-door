import { useState, useEffect, useRef } from 'react';
import { Mail, Calendar, MessageSquare, Slack, FileText, Workflow, Mic, Eye, Waves, Lock, Smartphone, Zap, Globe, Brain, Database } from 'lucide-react';

const OrbitDialVisionSection = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const [flowingChips, setFlowingChips] = useState<number[]>([]);
  const [cueWords, setCueWords] = useState<string[]>([]);
  const [showLock, setShowLock] = useState(false);
  const [showRouting, setShowRouting] = useState(false);
  const [connections, setConnections] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const phases = [
    {
      name: "Now",
      apps: [
        { icon: Mail, name: "Gmail", emoji: "📧" },
        { icon: Calendar, name: "Google Calendar", emoji: "📅" },
        { icon: MessageSquare, name: "WhatsApp", emoji: "💬" }
      ],
      cueWords: ["All-in-one", "Noise-free"],
      color: "neon-green",
      radius: 140
    },
    {
      name: "2026", 
      apps: [
        { icon: Slack, name: "Slack", emoji: "💼" },
        { icon: FileText, name: "Google Docs", emoji: "📄" },
        { icon: Workflow, name: "Workflow APIs", emoji: "⚙️" }
      ],
      cueWords: ["Richer signals", "Smarter links"],
      color: "soft-purple",
      radius: 180
    },
    {
      name: "2027",
      apps: [
        { icon: Mic, name: "Voice (On-device)", emoji: "🎤" },
        { icon: Eye, name: "Vision (Context cam)", emoji: "👁️" },
        { icon: Waves, name: "Ambient (Enviro-sensors)", emoji: "🌐" }
      ],
      cueWords: ["Beyond screens", "Always-on"],
      color: "gradient",
      radius: 220
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

    const runPhaseSequence = () => {
      // Reset all states
      setFlowingChips([]);
      setCueWords([]);
      setShowLock(false);
      setShowRouting(false);
      setConnections([]);
      setShowCaption(false);
      
      // Phase 0: Now (0-3s)
      setCurrentPhase(0);
      setTimeout(() => {
        // Start chip animations one by one
        phases[0].apps.forEach((_, index) => {
          setTimeout(() => {
            setFlowingChips(prev => [...prev, index]);
          }, index * 300);
        });
        
        // Show cue words after chips
        setTimeout(() => {
          setCueWords(phases[0].cueWords);
        }, 1000);
      }, 200);

      // Phase 1: 2026 (3-6s)
      setTimeout(() => {
        setCurrentPhase(1);
        setFlowingChips([]);
        setCueWords([]);
        
        setTimeout(() => {
          // Start chip animations
          phases[1].apps.forEach((_, index) => {
            setTimeout(() => {
              setFlowingChips(prev => [...prev, index]);
              // Add connection lines
              setConnections(prev => [...prev, true]);
            }, index * 300);
          });
          
          // Show cue words
          setTimeout(() => {
            setCueWords(phases[1].cueWords);
          }, 1000);
        }, 200);
      }, 3000);

      // Phase 2: 2027 (6-9s)
      setTimeout(() => {
        setCurrentPhase(2);
        setFlowingChips([]);
        setCueWords([]);
        setConnections([]);
        
        setTimeout(() => {
          // Start chip animations with fusion effect
          phases[2].apps.forEach((_, index) => {
            setTimeout(() => {
              setFlowingChips(prev => [...prev, index]);
            }, index * 300);
          });
          
          // Show cue words
          setTimeout(() => {
            setCueWords(phases[2].cueWords);
          }, 1000);
          
          // Show lock briefly
          setTimeout(() => {
            setShowLock(true);
            setTimeout(() => {
              setShowLock(false);
              setShowRouting(true);
            }, 500);
          }, 1500);
        }, 200);
      }, 6000);

      // Final caption (8-10s)
      setTimeout(() => {
        setShowCaption(true);
      }, 8000);
    };

    // Start the sequence
    runPhaseSequence();
    
    // Loop every 10 seconds
    const loopTimer = setInterval(runPhaseSequence, 10000);

    return () => clearInterval(loopTimer);
  }, [isVisible]);

  const renderAppChips = (apps: any[], phaseIndex: number) => {
    return apps.map((app, index) => {
      const isFlowing = currentPhase === phaseIndex && flowingChips.includes(index);
      const phase = phases[phaseIndex];
      
      // Calculate starting position on the arc
      const startAngle = (index * 100) + (phaseIndex * 30) - 60;
      const startRadius = phase.radius;
      const startX = Math.cos((startAngle * Math.PI) / 180) * startRadius;
      const startY = Math.sin((startAngle * Math.PI) / 180) * startRadius;

      return (
        <div
          key={`${phaseIndex}-${index}`}
          className={`absolute transition-all duration-[2000ms] ${
            isFlowing ? 'opacity-100 animate-chip-flow' : 'opacity-0'
          }`}
          style={{
            left: `calc(50% + ${startX}px)`,
            top: `calc(50% + ${startY}px)`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${index * 300}ms`,
            animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        >
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-full bg-black/70 backdrop-blur-sm border transition-all duration-300 ${
            phase.color === 'neon-green' ? 'border-neon-green/60 shadow-lg shadow-neon-green/20' :
            phase.color === 'soft-purple' ? 'border-soft-purple/60 shadow-lg shadow-soft-purple/20' :
            'border-neon-green/60 shadow-lg shadow-neon-green/20'
          }`}>
            <span className="text-base">{app.emoji}</span>
            <span className="text-white text-sm font-medium whitespace-nowrap">{app.name}</span>
          </div>
          
          {/* Connection line for 2026 phase */}
          {phaseIndex === 1 && connections[index] && (
            <div 
              className="absolute w-0.5 bg-gradient-to-r from-soft-purple/80 to-transparent animate-draw-line"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                transformOrigin: 'left center',
                width: `${Math.sqrt(startX * startX + startY * startY)}px`,
                height: '2px',
                rotate: `${Math.atan2(startY, startX)}rad`,
                animationDelay: `${index * 300 + 500}ms`
              }}
            />
          )}
        </div>
      );
    });
  };

  const renderCueWords = () => {
    return cueWords.map((word, index) => {
      const phase = phases[currentPhase];
      
      // Position cue words at different spots
      const angle = (index * 140) + 45;
      const radius = phase.radius + 50;
      const x = Math.cos((angle * Math.PI) / 180) * radius;
      const y = Math.sin((angle * Math.PI) / 180) * radius;

      return (
        <div
          key={`cue-${currentPhase}-${index}`}
          className="absolute animate-fade-in"
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${index * 200}ms`
          }}
        >
          <span className={`text-sm font-medium px-3 py-1.5 rounded-full bg-black/70 border backdrop-blur-sm shadow-lg ${
            phase.color === 'neon-green' ? 'border-neon-green/60 text-neon-green shadow-neon-green/20' :
            phase.color === 'soft-purple' ? 'border-soft-purple/60 text-soft-purple shadow-soft-purple/20' :
            'border-neon-green/60 text-neon-green shadow-neon-green/20'
          }`}>
            {word}
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
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
          {phases.map((phase, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                currentPhase === index 
                  ? 'bg-neon-green shadow-lg shadow-neon-green/50 scale-125' 
                  : 'bg-gray-600'
              }`} />
              <span className={`text-xs font-medium transition-all duration-500 ${
                currentPhase === index 
                  ? phase.color === 'neon-green' ? 'text-neon-green' :
                    phase.color === 'soft-purple' ? 'text-soft-purple' :
                    'text-neon-green'
                  : 'text-gray-500'
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
                    className={`transition-all duration-1000 ease-out ${
                      isActive 
                        ? index === 0 ? 'stroke-neon-green' 
                          : index === 1 ? 'stroke-soft-purple'
                          : index === 2 ? 'stroke-neon-green' : 'stroke-transparent'
                        : 'stroke-transparent'
                    }`}
                    strokeWidth={isActive ? "3" : "1"}
                    style={{
                      filter: isActive ? `drop-shadow(0 0 16px ${
                        index === 0 ? '#00FF8A' 
                          : index === 1 ? '#A066FF'
                          : '#00FF8A'
                      })` : 'none',
                      stroke: isActive && index === 2 
                        ? 'url(#gradient-2027)' 
                        : undefined
                    }}
                  />
                  
                  {/* Gradient definition for 2027 */}
                  {index === 2 && (
                    <defs>
                      <linearGradient id="gradient-2027" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00FF8A" />
                        <stop offset="100%" stopColor="#A066FF" />
                      </linearGradient>
                    </defs>
                  )}
                  
                  {/* Shimmer particles for active arc */}
                  {isActive && (
                    <circle
                      cx="250"
                      cy="250"
                      r={radius}
                      fill="none"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="1"
                      className="animate-pulse"
                      strokeDasharray="4 8"
                      style={{
                        animation: 'rotate-slow 8s linear infinite'
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Central Asmi Orb */}
          <div className="relative z-10">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-r from-neon-green to-neon-green/80 flex items-center justify-center shadow-2xl shadow-neon-green/40 relative transition-all duration-500 ${
              currentPhase === 2 && flowingChips.length > 0 ? 'animate-orb-halo-pulse' : 'animate-pulse-orb'
            }`}>
              {/* Purple halo */}
              <div className="absolute inset-0 rounded-full bg-soft-purple/20 animate-pulse scale-125 blur-sm" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-green/30 to-soft-purple/30 animate-spin-slow scale-150 blur-md" />
              <div className="absolute inset-0 rounded-full bg-neon-green/10 animate-ping scale-200" />
              
              {/* Core orb */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-neon-green via-neon-green/95 to-neon-green/90 flex items-center justify-center border border-neon-green/50">
                <span className="text-black font-bold text-base tracking-wide font-sans">Asmi</span>
              </div>
            </div>
          </div>

          {/* App Chips */}
          {phases.map((phase, phaseIndex) => renderAppChips(phase.apps, phaseIndex))}
          
          {/* Cue Words */}
          {renderCueWords()}

          {/* 2027 Phase - Lock and routing animation */}
          {currentPhase === 2 && (
            <>
              {/* Lock icon - appears briefly */}
              {showLock && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="animate-fade-in">
                    <Lock size={20} className="text-neon-green drop-shadow-glow" />
                  </div>
                </div>
              )}
              
              {/* App routing arrows - appear after lock */}
              {showRouting && (
                <div className="absolute inset-0">
                  {[Smartphone, Zap, Globe, Brain, Database].map((Icon, index) => {
                    const angle = (index * 72) - 90; // 360/5 = 72 degrees apart
                    const radius = 180;
                    const x = Math.cos((angle * Math.PI) / 180) * radius;
                    const y = Math.sin((angle * Math.PI) / 180) * radius;
                    
                    return (
                      <div
                        key={index}
                        className="absolute animate-fade-in-scale"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: 'translate(-50%, -50%)',
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-900/80 border border-neon-green/40 flex items-center justify-center shadow-lg shadow-neon-green/10 backdrop-blur-sm">
                          <Icon size={16} className="text-neon-green" />
                        </div>
                        
                        {/* Arrow pointing from center */}
                        <div 
                          className="absolute w-0.5 bg-gradient-to-r from-neon-green/60 to-transparent animate-draw-arrow"
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(-50%, -50%) rotate(${angle + 180}deg)`,
                            transformOrigin: 'left center',
                            width: '60px',
                            height: '1px',
                            animationDelay: `${index * 100 + 200}ms`
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Caption */}
        {showCaption && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in">
            <div className="bg-gray-900/80 border border-gray-700 rounded-xl p-4 text-center backdrop-blur-sm max-w-sm">
              <p className="text-base font-bold text-white leading-tight">
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