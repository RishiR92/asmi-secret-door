import { useState, useEffect, useRef } from 'react';
import { Mic, Link2, Target } from 'lucide-react';

const ProcessAnimationSection = () => {
  const [currentZone, setCurrentZone] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showZoneLabel, setShowZoneLabel] = useState(false);
  const [chatText, setChatText] = useState('');
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showKnowledgeGraph, setShowKnowledgeGraph] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [finalMessageText, setFinalMessageText] = useState('');
  const [animationComplete, setAnimationComplete] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const zones = [
    { label: "Capture", duration: 2500 },
    { label: "Link", duration: 5500 },
    { label: "Act", duration: 5500 }
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
      // Zone 1: Capture (0-2.5s)
      setTimeout(() => {
        setCurrentZone(0);
        setShowZoneLabel(true);
        setShowTypewriter(true);
        // Type out WhatsApp message (faster)
        const message = "Great call with Raj...interested in API integration";
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

      // Zone 2: Link (2.5-8s)
      setTimeout(() => {
        setCurrentZone(1);
        setShowZoneLabel(true);
        setShowKnowledgeGraph(true);
        // Hide zone label after 1s
        setTimeout(() => setShowZoneLabel(false), 1000);
      }, 3000);

      // Zone 3: Act (8-13.5s)
      setTimeout(() => {
        setCurrentZone(2);
        setShowZoneLabel(true);
        setShowInsights(true);
        // Hide zone label after 1s
        setTimeout(() => setShowZoneLabel(false), 1000);
      }, 8000);

      // Final typewriter message (13.5s+)
      setTimeout(() => {
        setShowFinalMessage(true);
        const finalMessage = "This is how Asmi works in the backend - connecting everything to create in-depth insights on each user/conversation";
        let index = 0;
        const typeInterval = setInterval(() => {
          if (index <= finalMessage.length) {
            setFinalMessageText(finalMessage.slice(0, index));
            index++;
          } else {
            clearInterval(typeInterval);
            // Show all zones at once after completion
            setTimeout(() => {
              setAnimationComplete(true);
            }, 1000);
          }
        }, 50);
      }, 13500);
    };

    runAnimation();
  }, [isVisible]);

  const renderWaveform = () => {
    return (
      <div className="flex items-center space-x-1 ml-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`w-1 bg-neon-green rounded-full transition-all duration-300 ${
              currentZone === 0 ? 'animate-pulse' : 'opacity-30'
            }`}
            style={{
              height: `${6 + Math.sin(i * 0.8) * 3}px`,
              animationDelay: `${i * 120}ms`
            }}
          />
        ))}
      </div>
    );
  };

  const renderKnowledgeGraph = () => {
    const centerNode = { id: 'raj', label: 'Raj', x: 150, y: 80 };
    const connections = [
      { id: 'partnership', label: 'Partnership', x: 50, y: 40 },
      { id: 'api', label: 'API', x: 250, y: 40 },
      { id: 'roadmap', label: 'Your roadmap', x: 250, y: 120 },
      { id: 'discussions', label: 'Previous technical discussions', x: 50, y: 120 },
      { id: 'emails', label: 'Email thread about API specs', x: 20, y: 80 },
      { id: 'calendar', label: 'Calendar meetings with Raj', x: 280, y: 80 }
    ];

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-sm font-medium text-soft-purple mb-2">Step 2: Context linked</h3>
          <Link2 size={16} className="text-soft-purple mx-auto" />
        </div>
        
        <div className="relative w-full h-40 mx-auto">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 160">
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
                    animationDelay: `${index * 400}ms`,
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
                  style={{ animationDelay: `${index * 400 + 200}ms` }}
                />
              </g>
            ))}
          </svg>

          {/* Center node - Raj (prominent) */}
          <div
            className={`absolute text-sm font-bold text-white bg-neon-green/20 px-4 py-2 rounded-full border-2 border-neon-green transition-all duration-500 ${
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
              className={`absolute text-xs text-white bg-black/90 px-2 py-1 rounded border border-soft-purple/50 transition-all duration-500 ${
                showKnowledgeGraph ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${index * 400 + 500}ms`,
                maxWidth: '80px',
                fontSize: '10px'
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
      "Raj (CTO at TechCorp)",
      "Met 3x this quarter",
      "Always asks about scalability",
      "Prefers technical demos", 
      "Decision maker for $50K+ deals",
      "Best contact time: 2-4 PM",
      "Responds well to data-driven pitches"
    ];

    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-sm font-medium text-neon-green mb-2">Step 3: Deep insights generated</h3>
          <Target size={16} className="text-neon-green mx-auto" />
        </div>
        
        <div className="space-y-2">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                showInsights ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
              style={{ animationDelay: `${index * 350}ms` }}
            >
              <div className="flex items-center gap-2 text-xs text-white">
                {index < insights.length - 1 && (
                  <span className="text-neon-green">→</span>
                )}
                {index === insights.length - 1 && (
                  <span className="text-neon-green font-bold">→</span>
                )}
                <span className={index === 0 ? 'font-bold text-neon-green' : ''}>{insight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-black flex flex-col justify-center py-8 px-4">
      <div className="w-full max-w-sm mx-auto space-y-8">
        
        {/* TOP ZONE - Capture */}
        <div className="relative min-h-[140px]">
          {/* Zone Label */}
          {((currentZone === 0 && showZoneLabel) || animationComplete) && (
            <div className="text-center mb-3">
              <h3 className="text-sm font-medium text-neon-green">Step 1: Voice captured</h3>
              <Mic size={16} className="text-neon-green mx-auto mt-1" />
            </div>
          )}
          
          <div className={`space-y-3 transition-all duration-500 ${
            animationComplete ? 'opacity-100' : (currentZone === 0 ? 'opacity-100' : 'opacity-30')
          }`}>
            {/* Mic and Waveform */}
            <div className="flex items-center justify-center">
              <div className={`transition-all duration-300 ${
                (currentZone === 0 || animationComplete) ? 'animate-pulse' : 'opacity-30'
              }`}>
                <Mic size={18} className="text-neon-green" />
              </div>
              
              <div className={`transition-all duration-300 ${
                (currentZone === 0 || animationComplete) ? 'opacity-100' : 'opacity-30'
              }`}>
                {renderWaveform()}
              </div>
            </div>
            
            {/* Voice Note Label */}
            <div className="text-center">
              <div className="inline-block bg-gray-700/50 text-white text-xs px-2 py-1 rounded-full border border-gray-600/50">
                Voice Note
              </div>
            </div>
            
            {/* WhatsApp Chat Bubble */}
            {showTypewriter && (
              <div className="flex justify-center">
                <div className="bg-gray-800/80 border border-gray-600/50 rounded-2xl rounded-bl-md p-3 max-w-xs backdrop-blur-sm">
                  <p className="text-sm text-white">
                    "{chatText}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MIDDLE ZONE - Link */}
        <div className="relative min-h-[180px]">
          <div className={`transition-all duration-500 ${
            animationComplete ? 'opacity-100' : (currentZone === 1 ? 'opacity-100' : 'opacity-30')
          }`}>
            {renderKnowledgeGraph()}
          </div>
        </div>

        {/* BOTTOM ZONE - Act */}
        <div className="relative min-h-[200px]">
          <div className={`transition-all duration-500 ${
            animationComplete ? 'opacity-100' : (currentZone === 2 ? 'opacity-100' : 'opacity-30')
          }`}>
            {renderInsights()}
          </div>
        </div>

        {/* FINAL TYPEWRITER MESSAGE */}
        {showFinalMessage && (
          <div className="text-center animate-fade-in pt-6">
            <div className="bg-gradient-to-r from-neon-green/10 to-soft-purple/10 border border-neon-green/30 rounded-xl p-6 text-center backdrop-blur-sm">
              <p className="text-lg font-bold text-white leading-tight">
                {finalMessageText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessAnimationSection;