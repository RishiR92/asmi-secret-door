import { useState, useEffect, useRef } from 'react';
import { Mic, Lock } from 'lucide-react';

const ProcessAnimationSection = () => {
  const [currentZone, setCurrentZone] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showZoneLabel, setShowZoneLabel] = useState(false);
  const [chatText, setChatText] = useState('');
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showKnowledgeGraph, setShowKnowledgeGraph] = useState(false);
  const [showFloatingCards, setShowFloatingCards] = useState(false);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const zones = [
    { label: "Capture", duration: 3000 },
    { label: "Link", duration: 3000 },
    { label: "Act", duration: 3000 }
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
      // Zone 1: Capture (0-3s)
      setTimeout(() => {
        setCurrentZone(0);
        setShowZoneLabel(true);
        setShowTypewriter(true);
        // Type out WhatsApp message
        const message = "Great call with Raj… API integration.";
        let index = 0;
        const typeInterval = setInterval(() => {
          if (index <= message.length) {
            setChatText(message.slice(0, index));
            index++;
          } else {
            clearInterval(typeInterval);
          }
        }, 80);
        
        // Hide zone label after 1s
        setTimeout(() => setShowZoneLabel(false), 1000);
      }, 500);

      // Zone 2: Link (3-6s)
      setTimeout(() => {
        setCurrentZone(1);
        setShowZoneLabel(true);
        setShowKnowledgeGraph(true);
        // Hide zone label after 1s
        setTimeout(() => setShowZoneLabel(false), 1000);
      }, 3500);

      // Zone 3: Act (6-9s)
      setTimeout(() => {
        setCurrentZone(2);
        setShowZoneLabel(true);
        setShowFloatingCards(true);
        // Hide zone label after 1s
        setTimeout(() => setShowZoneLabel(false), 1000);
      }, 6500);

      // End message and show all zones (9s+)
      setTimeout(() => {
        setAnimationComplete(true);
        setShowEndMessage(true);
      }, 9500);
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
    const centerNode = { id: 'raj', label: 'Raj', x: 60, y: 50 };
    const nodes = [
      { id: 'partnership', label: 'Partnership', emoji: '🤝', x: 100, y: 20 },
      { id: 'api', label: 'API', emoji: '⚡', x: 130, y: 50 },
      { id: 'roadmap', label: 'Roadmap', emoji: '🗺️', x: 100, y: 80 },
      { id: 'emails', label: 'Emails', emoji: '📧', x: 20, y: 80 },
      { id: 'calendar', label: 'Calendar', emoji: '📅', x: 20, y: 20 }
    ];

    return (
      <div className="relative w-full h-28 mx-auto max-w-sm">
        <svg className="absolute inset-0 w-full h-full">
          {nodes.map((node, index) => (
            <line
              key={index}
              x1={centerNode.x}
              y1={centerNode.y}
              x2={node.x}
              y2={node.y}
              stroke="hsl(var(--neon-green))"
              strokeWidth="2"
              className={`transition-all duration-500 ${
                showKnowledgeGraph || animationComplete ? 'opacity-80' : 'opacity-0'
              }`}
              style={{ 
                animationDelay: `${index * 200}ms`
              }}
            />
          ))}
        </svg>

        {/* Center node - Raj (Prominent) */}
        <div
          className={`absolute text-sm font-bold text-black bg-neon-green px-4 py-2 rounded-full border-2 border-white shadow-lg shadow-neon-green/50 transition-all duration-500 ${
            showKnowledgeGraph || animationComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            left: `${centerNode.x}px`,
            top: `${centerNode.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {centerNode.label}
        </div>

        {/* Connected nodes */}
        {nodes.map((node, index) => (
          <div
            key={node.id}
            className={`absolute text-xs text-white bg-black/80 px-2 py-1 rounded-lg border border-neon-green/30 transition-all duration-500 flex items-center gap-1 ${
              showKnowledgeGraph || animationComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${index * 200 + 300}ms`
            }}
          >
            <span className="text-xs">{node.emoji}</span>
            <span>{node.label}</span>
          </div>
        ))}

        {/* Privacy lock animation */}
        {(showKnowledgeGraph || animationComplete) && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-fade-in">
            <Lock size={10} className="text-neon-green/70 animate-pulse" />
          </div>
        )}
      </div>
    );
  };

  const renderFloatingCards = () => {
    const insightCards = [
      { 
        title: "Optimal Timing", 
        value: "2–4 PM", 
        detail: "87% response rate",
        emoji: "🕒", 
        delay: 0 
      },
      { 
        title: "Decision Authority", 
        value: "$50k+ budget", 
        detail: "VP level contact",
        emoji: "🎯", 
        delay: 200 
      },
      { 
        title: "Engagement Score", 
        value: "94/100", 
        detail: "High interest signals",
        emoji: "📈", 
        delay: 300 
      }
    ];

    return (
      <div className="space-y-3">
        {insightCards.map((card, index) => (
          <div
            key={index}
            className={`transition-all duration-500 ${
              showFloatingCards || animationComplete ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-8'
            }`}
            style={{ animationDelay: `${card.delay}ms` }}
          >
            <div className="bg-black/70 border border-gray-600/50 rounded-xl p-3 backdrop-blur-sm shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{card.emoji}</span>
                  <div>
                    <p className="text-xs text-gray-400">{card.title}</p>
                    <p className="text-sm text-white font-bold">{card.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-300">{card.detail}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Enhanced Action CTA */}
        <div
          className={`transition-all duration-500 ${
            showFloatingCards || animationComplete ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-8'
          }`}
          style={{ animationDelay: '500ms' }}
        >
          <div className="bg-gradient-to-r from-neon-green/20 to-soft-purple/20 border border-neon-green/50 rounded-2xl p-4 text-center backdrop-blur-sm shadow-lg shadow-neon-green/20">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg">🚀</span>
                <p className="text-sm text-white font-bold">Send AI-crafted pitch</p>
              </div>
              <p className="text-xs text-gray-300">Personalized for Raj's context & timing</p>
              <div className="flex justify-center gap-4 text-xs text-gray-400">
                <span>• 94% match</span>
                <span>• Optimal timing</span>
                <span>• Data-driven</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-black flex flex-col justify-center py-8 px-4">
      <div className="w-full max-w-sm mx-auto space-y-8">
        
        {/* TOP ZONE - Capture */}
        <div className="relative min-h-[120px]">
          {/* Zone Label */}
          {(currentZone === 0 && showZoneLabel) || animationComplete && (
            <div className="absolute top-0 left-0 text-xs font-medium text-neon-green animate-fade-in">
              Capture
            </div>
          )}
          
          <div className="pt-6 space-y-3">
            {/* Mic and Waveform */}
            <div className="flex items-center">
              <div className={`transition-all duration-300 ${
                currentZone === 0 || animationComplete ? 'animate-pulse' : 'opacity-30'
              }`}>
                <Mic size={18} className="text-neon-green" />
              </div>
              
              <div className={`transition-all duration-300 ${
                currentZone === 0 || animationComplete ? 'opacity-100' : 'opacity-30'
              }`}>
                {renderWaveform()}
              </div>
            </div>
            
            {/* Voice Note Label */}
            <div className={`transition-all duration-300 ${
              currentZone === 0 || animationComplete ? 'opacity-100' : 'opacity-30'
            }`}>
              <div className="inline-block bg-gray-700/50 text-white text-xs px-2 py-1 rounded-full border border-gray-600/50">
                Voice Note
              </div>
            </div>
            
            {/* WhatsApp Chat Bubble */}
            {showTypewriter && (
              <div className={`transition-all duration-500 ${
                currentZone === 0 || animationComplete ? 'opacity-100' : 'opacity-30'
              }`}>
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
        <div className="relative min-h-[120px]">
          {/* Zone Label */}
          {(currentZone === 1 && showZoneLabel) || animationComplete && (
            <div className="absolute top-0 left-0 text-xs font-medium text-soft-purple animate-fade-in">
              Link
            </div>
          )}
          
          <div className={`pt-6 transition-all duration-500 ${
            currentZone === 1 || animationComplete ? 'opacity-100' : 'opacity-30'
          }`}>
            {renderKnowledgeGraph()}
          </div>
        </div>

        {/* BOTTOM ZONE - Act */}
        <div className="relative min-h-[160px]">
          {/* Zone Label */}
          {(currentZone === 2 && showZoneLabel) || animationComplete && (
            <div className="absolute top-0 left-0 text-xs font-medium text-neon-green animate-fade-in">
              Act
            </div>
          )}
          
          <div className={`pt-6 transition-all duration-500 ${
            currentZone === 2 || animationComplete ? 'opacity-100' : 'opacity-30'
          }`}>
            {renderFloatingCards()}
          </div>
        </div>

        {/* END MESSAGE */}
        {showEndMessage && (
          <div className="text-center animate-fade-in pt-4">
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-6 text-center backdrop-blur-sm">
              <p className="text-lg font-bold text-white leading-tight">
                Compounds daily to become your high-agency self.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessAnimationSection;