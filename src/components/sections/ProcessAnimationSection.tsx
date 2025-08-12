import { useState, useEffect, useRef } from 'react';
import { Mic, Link2, Target } from 'lucide-react';

const ProcessAnimationSection = () => {
  const [currentZone, setCurrentZone] = useState(-1); // -1 = not started, 0-2 = zones, 3 = summary
  const [isVisible, setIsVisible] = useState(false);
  const [chatText, setChatText] = useState('');
  const [showKnowledgeGraph, setShowKnowledgeGraph] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [finalMessageText, setFinalMessageText] = useState('');
  const [knowledgeConnections, setKnowledgeConnections] = useState<number[]>([]);
  const [visibleInsights, setVisibleInsights] = useState<number[]>([]);
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
      // Zone 1: Capture (0-2.5s) - Full screen
      setTimeout(() => {
        setCurrentZone(0);
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
      }, 500);

      // Zone 2: Link (2.5-8s) - Full screen
      setTimeout(() => {
        setCurrentZone(1);
        setChatText(''); // Clear previous content
        setShowKnowledgeGraph(true);
        
        // Animate connections sequentially
        const connections = [0, 1, 2, 3, 4, 5];
        connections.forEach((connectionIndex, i) => {
          setTimeout(() => {
            setKnowledgeConnections(prev => [...prev, connectionIndex]);
          }, i * 500);
        });
      }, 3000);

      // Zone 3: Act (8-13.5s) - Full screen
      setTimeout(() => {
        setCurrentZone(2);
        setShowKnowledgeGraph(false);
        setKnowledgeConnections([]);
        setShowInsights(true);
        
        // Animate insights sequentially (slower for reading)
        const insights = [0, 1, 2, 3, 4, 5, 6];
        insights.forEach((insightIndex, i) => {
          setTimeout(() => {
            setVisibleInsights(prev => [...prev, insightIndex]);
          }, i * 400);
        });
      }, 8000);

      // Final Summary (13.5s+) - All zones condensed
      setTimeout(() => {
        setCurrentZone(3);
        setShowInsights(false);
        setVisibleInsights([]);
        
        // Typewriter for final message
        const finalMessage = "This is how Asmi connects everything";
        let index = 0;
        const typeInterval = setInterval(() => {
          if (index <= finalMessage.length) {
            setFinalMessageText(finalMessage.slice(0, index));
            index++;
          } else {
            clearInterval(typeInterval);
          }
        }, 50);
      }, 13500);
    };

    runAnimation();
  }, [isVisible]);

  const renderFullScreenCapture = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neon-green mb-2">Voice Captured</h1>
          <p className="text-white/70 text-lg">Step 1 of 3</p>
        </div>
        
        <div className="flex flex-col items-center space-y-6">
          {/* Large Mic with Pulse */}
          <div className="relative">
            <div className="absolute inset-0 bg-neon-green/20 rounded-full animate-ping"></div>
            <div className="relative bg-neon-green/10 p-8 rounded-full border-2 border-neon-green">
              <Mic size={48} className="text-neon-green" />
            </div>
          </div>
          
          {/* Enhanced Waveform */}
          <div className="flex items-center space-x-2">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-2 bg-neon-green rounded-full animate-pulse"
                style={{
                  height: `${12 + Math.sin(i * 0.8) * 8}px`,
                  animationDelay: `${i * 150}ms`
                }}
              />
            ))}
          </div>
          
          {/* Voice Note Label */}
          <div className="bg-gray-800/80 text-white px-4 py-2 rounded-full border border-gray-600/50">
            <span className="text-sm font-medium">Voice Note Recording</span>
          </div>
        </div>
        
        {/* WhatsApp Message */}
        {chatText && (
          <div className="max-w-sm mx-auto">
            <div className="bg-gray-800/90 border border-gray-600/50 rounded-2xl rounded-bl-md p-4 backdrop-blur-sm">
              <p className="text-white text-base leading-relaxed">
                "{chatText}"
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderFullScreenLink = () => {
    const centerNode = { id: 'raj', label: 'Raj', x: 150, y: 120 };
    const connections = [
      { id: 'partnership', label: 'Partnership discussions', x: 75, y: 60 },
      { id: 'api', label: 'API documentation', x: 225, y: 60 },
      { id: 'roadmap', label: 'Your product roadmap', x: 225, y: 180 },
      { id: 'discussions', label: 'Previous technical calls', x: 75, y: 180 },
      { id: 'emails', label: 'Email threads about API specs', x: 40, y: 120 },
      { id: 'calendar', label: 'Calendar meetings with Raj', x: 260, y: 120 }
    ];

    return (
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-soft-purple mb-2">Context Linked</h1>
          <p className="text-white/70 text-lg">Step 2 of 3</p>
        </div>
        
        <div className="relative w-full max-w-sm mx-auto">
          <div className="text-center mb-6">
            <Link2 size={32} className="text-soft-purple mx-auto mb-2" />
            <p className="text-white/80 text-sm">Connecting all relevant data sources</p>
          </div>
          
          <div className="relative h-64">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 240">
              {connections.map((node, index) => (
                <g key={index}>
                  <line
                    x1={centerNode.x}
                    y1={centerNode.y}
                    x2={node.x}
                    y2={node.y}
                    stroke="hsl(var(--neon-green))"
                    strokeWidth="3"
                    className={`transition-all duration-1000 ${
                      knowledgeConnections.includes(index) ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ 
                      strokeDasharray: knowledgeConnections.includes(index) ? 'none' : '10,5',
                      animation: knowledgeConnections.includes(index) ? 'none' : 'pulse 2s infinite'
                    }}
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="4"
                    fill="hsl(var(--neon-green))"
                    className={`transition-all duration-500 ${
                      knowledgeConnections.includes(index) ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </g>
              ))}
            </svg>

            {/* Center node - Raj (prominent) */}
            <div
              className="absolute text-lg font-bold text-white bg-neon-green/20 px-6 py-3 rounded-full border-2 border-neon-green"
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
                className={`absolute text-xs text-white bg-black/95 px-3 py-2 rounded-lg border border-soft-purple/50 transition-all duration-500 ${
                  knowledgeConnections.includes(index) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  transform: 'translate(-50%, -50%)',
                  maxWidth: '100px',
                  fontSize: '10px',
                  textAlign: 'center'
                }}
              >
                {node.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderFullScreenAct = () => {
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
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neon-green mb-2">Deep Insights Generated</h1>
          <p className="text-white/70 text-lg">Step 3 of 3</p>
        </div>
        
        <div className="text-center mb-6">
          <Target size={32} className="text-neon-green mx-auto mb-2" />
          <p className="text-white/80 text-sm">AI-powered insights about Raj</p>
        </div>
        
        <div className="w-full max-w-sm space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                visibleInsights.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="flex items-center gap-3 bg-gray-800/50 border border-gray-600/30 rounded-lg p-4 backdrop-blur-sm">
                <span className="text-neon-green text-lg">→</span>
                <span className={`text-sm ${index === 0 ? 'font-bold text-neon-green' : 'text-white'}`}>
                  {insight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        {/* Condensed 3-step flow */}
        <div className="flex items-center justify-between w-full max-w-xs space-x-4">
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-neon-green/20 p-3 rounded-full border border-neon-green">
              <Mic size={20} className="text-neon-green" />
            </div>
            <span className="text-xs text-white/70">Capture</span>
          </div>
          
          <div className="flex-1 h-px bg-gradient-to-r from-neon-green to-soft-purple"></div>
          
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-soft-purple/20 p-3 rounded-full border border-soft-purple">
              <Link2 size={20} className="text-soft-purple" />
            </div>
            <span className="text-xs text-white/70">Link</span>
          </div>
          
          <div className="flex-1 h-px bg-gradient-to-r from-soft-purple to-neon-green"></div>
          
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-neon-green/20 p-3 rounded-full border border-neon-green">
              <Target size={20} className="text-neon-green" />
            </div>
            <span className="text-xs text-white/70">Act</span>
          </div>
        </div>
        
        {/* Final message */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-neon-green/10 to-soft-purple/10 border border-neon-green/30 rounded-xl p-6 backdrop-blur-sm">
            <p className="text-2xl font-bold text-white leading-tight">
              {finalMessageText}
              <span className="animate-pulse">|</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto h-[80vh] relative">
        
        {/* Zone 1 - Full Screen Capture */}
        {currentZone === 0 && (
          <div className="absolute inset-0 animate-fade-in">
            {renderFullScreenCapture()}
          </div>
        )}

        {/* Zone 2 - Full Screen Link */}
        {currentZone === 1 && (
          <div className="absolute inset-0 animate-fade-in">
            {renderFullScreenLink()}
          </div>
        )}

        {/* Zone 3 - Full Screen Act */}
        {currentZone === 2 && (
          <div className="absolute inset-0 animate-fade-in">
            {renderFullScreenAct()}
          </div>
        )}

        {/* Summary Screen */}
        {currentZone === 3 && (
          <div className="absolute inset-0 animate-fade-in">
            {renderSummary()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessAnimationSection;