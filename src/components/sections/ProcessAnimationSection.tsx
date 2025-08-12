import { useState, useEffect, useRef } from 'react';
import { Mic, Link2, Target } from 'lucide-react';
import MobileOptimizedSection from './MobileOptimizedSection';

const ProcessAnimationSection = () => {
  const [currentPhase, setCurrentPhase] = useState(0); // 0: Zone1, 1: Zones2&3, 2: Complete
  const [isVisible, setIsVisible] = useState(false);
  const [showZoneLabel, setShowZoneLabel] = useState(false);
  const [chatText, setChatText] = useState('');
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showKnowledgeGraph, setShowKnowledgeGraph] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [finalMessageText, setFinalMessageText] = useState('');
  const [zone2Label, setZone2Label] = useState(false);
  const [zone3Label, setZone3Label] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const zones = [
    { label: "Capture", duration: 2000 },
    { label: "Link", duration: 2000 },
    { label: "Act", duration: 2000 }
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

    const runAnimation = () => {
      // Phase 1: Zone 1 only (0-3s)
      setTimeout(() => {
        setCurrentPhase(0);
        setShowZoneLabel(true);
        setShowTypewriter(true);
        // Type out WhatsApp message
        const message = "Great call with Raj...API integration";
        let index = 0;
        const typeInterval = setInterval(() => {
          if (index <= message.length) {
            setChatText(message.slice(0, index));
            index++;
          } else {
            clearInterval(typeInterval);
          }
        }, 40);
        
        // Hide zone label after 1s
        setTimeout(() => setShowZoneLabel(false), 1000);
      }, 500);

      // Phase 2: Transition to Zones 2 & 3 (3s)
      setTimeout(() => {
        setCurrentPhase(1);
        
        // Start Zone 2 first
        setTimeout(() => {
          setZone2Label(true);
          setShowKnowledgeGraph(true);
          setTimeout(() => setZone2Label(false), 1000);
        }, 200);
        
        // Then Zone 3
        setTimeout(() => {
          setZone3Label(true);
          setShowInsights(true);
          setTimeout(() => setZone3Label(false), 1000);
        }, 1500);
        
      }, 3000);

      // Phase 3: Final message (6s)
      setTimeout(() => {
        setCurrentPhase(2);
        setShowFinalMessage(true);
        const finalMessage = "Asmi connects everything to create deep insights";
        let index = 0;
        const typeInterval = setInterval(() => {
          if (index <= finalMessage.length) {
            setFinalMessageText(finalMessage.slice(0, index));
            index++;
          } else {
            clearInterval(typeInterval);
          }
        }, 60);
      }, 6000);
    };

    runAnimation();
  }, [isVisible]);

  const renderWaveform = () => {
    return (
      <div className="flex items-center space-x-2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 bg-neon-green rounded-full animate-pulse"
            style={{
              height: `${8 + Math.sin(i * 0.8) * 4}px`,
              animationDelay: `${i * 120}ms`
            }}
          />
        ))}
      </div>
    );
  };

  const renderKnowledgeGraph = () => {
    const centerNode = { id: 'raj', label: 'Raj', x: 150, y: 70 };
    const connections = [
      { id: 'api', label: 'API Docs', x: 80, y: 30 },
      { id: 'emails', label: 'Email Thread', x: 220, y: 30 },
      { id: 'meetings', label: 'Past Meetings', x: 150, y: 110 }
    ];

    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-lg text-soft-purple font-medium mb-4">
            Linking relevant context from your data...
          </p>
        </div>
        
        <div className="relative w-full h-36 mx-auto">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 140">
            {connections.map((node, index) => (
              <g key={index}>
                <line
                  x1={centerNode.x}
                  y1={centerNode.y}
                  x2={node.x}
                  y2={node.y}
                  stroke="hsl(var(--neon-green))"
                  strokeWidth="2"
                  className={`transition-all duration-1000 ${
                    showKnowledgeGraph ? 'opacity-80' : 'opacity-0'
                  }`}
                  style={{ 
                    animationDelay: `${index * 300}ms`,
                  }}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="3"
                  fill="hsl(var(--neon-green))"
                  className={`transition-all duration-500 ${
                    showKnowledgeGraph ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 300 + 200}ms` }}
                />
              </g>
            ))}
          </svg>

          {/* Center node - Raj (prominent) */}
          <div
            className={`absolute text-lg font-bold text-white bg-neon-green/20 px-5 py-3 rounded-full border-2 border-neon-green transition-all duration-500 ${
              showKnowledgeGraph ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{
              left: `${centerNode.x}px`,
              top: `${centerNode.y}px`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {centerNode.label}
          </div>

          {/* Connected data sources */}
          {connections.map((node, index) => (
            <div
              key={node.id}
              className={`absolute text-base text-white bg-black/90 px-4 py-2 rounded border border-soft-purple/50 transition-all duration-500 ${
                showKnowledgeGraph ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${index * 400 + 500}ms`,
                maxWidth: '100px'
              }}
            >
              {node.label}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderInsights = () => {
    const insights = [
      "CTO at TechCorp",
      "Decision maker for $50K+ deals",
      "Best contact time: 2-4 PM",
      "Prefers technical demos"
    ];

    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-lg text-neon-green font-medium mb-4">
            Generating actionable insights...
          </p>
        </div>
        
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                showInsights ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
              style={{ animationDelay: `${index * 250}ms` }}
            >
              <div className="flex items-center gap-4 text-base text-white">
                <span className="text-neon-green font-bold text-lg">→</span>
                <span className={index === 0 ? 'font-bold text-neon-green' : ''}>{insight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <MobileOptimizedSection maxWidth="sm" padding="sm">
      <div ref={sectionRef} className="space-y-8">
        
        {/* PHASE 1: Zone 1 Only */}
        {currentPhase === 0 && (
          <div className="min-h-[400px] flex flex-col justify-center space-y-6">
            {/* Zone Label */}
            {showZoneLabel && (
              <div className="text-center animate-fade-in">
                <h2 className="text-xl font-bold text-neon-green mb-3">Step 1: Voice Captured</h2>
                <Mic size={24} className="text-neon-green mx-auto" />
              </div>
            )}
            
            <div className="space-y-6">
              {/* Mic and Waveform */}
              <div className="flex items-center justify-center space-x-4">
                <div className="animate-pulse">
                  <Mic size={28} className="text-neon-green" />
                </div>
                {renderWaveform()}
              </div>
              
              {/* WhatsApp Chat Bubble */}
              {showTypewriter && (
                <div className="flex justify-center animate-fade-in">
                  <div className="bg-gray-800/90 border border-gray-600/50 rounded-2xl rounded-bl-md p-6 max-w-sm backdrop-blur-sm">
                    <p className="text-lg text-white font-medium">
                      "{chatText}"
                    </p>
                  </div>
                </div>
              )}
              
              <div className="text-center">
                <p className="text-base text-gray-300">
                  Asmi listens and processes your voice input...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PHASE 2: Zones 2 & 3 Together */}
        {currentPhase === 1 && (
          <div className="space-y-8 animate-fade-in">
            {/* Zone 2 - Link */}
            <div className="min-h-[200px]">
              {zone2Label && (
                <div className="text-center mb-4 animate-fade-in">
                  <h2 className="text-xl font-bold text-soft-purple mb-3">Step 2: Context Linked</h2>
                  <Link2 size={24} className="text-soft-purple mx-auto" />
                </div>
              )}
              {renderKnowledgeGraph()}
            </div>

            {/* Zone 3 - Act */}
            <div className="min-h-[160px]">
              {zone3Label && (
                <div className="text-center mb-4 animate-fade-in">
                  <h2 className="text-xl font-bold text-neon-green mb-3">Step 3: Deep Insights</h2>
                  <Target size={24} className="text-neon-green mx-auto" />
                </div>
              )}
              {renderInsights()}
            </div>
          </div>
        )}

        {/* PHASE 3: Final Message */}
        {currentPhase === 2 && showFinalMessage && (
          <div className="min-h-[400px] flex flex-col justify-center animate-fade-in">
            <div className="bg-gradient-to-r from-neon-green/10 to-soft-purple/10 border border-neon-green/30 rounded-xl p-8 text-center backdrop-blur-sm">
              <p className="text-xl font-bold text-white leading-relaxed">
                {finalMessageText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-base text-gray-300">
                This is how Asmi creates intelligent connections
              </p>
            </div>
          </div>
        )}
      </div>
    </MobileOptimizedSection>
  );
};

export default ProcessAnimationSection;