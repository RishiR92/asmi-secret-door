import { useState, useEffect, useRef } from 'react';
import { Mic } from 'lucide-react';
import MobileOptimizedSection from './MobileOptimizedSection';

const ProcessAnimationSection = () => {
  const [currentScreen, setCurrentScreen] = useState(0); // 0: Screen1, 1: Screen2
  const [isVisible, setIsVisible] = useState(false);
  const [showWaveform, setShowWaveform] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [showConnections, setShowConnections] = useState(false);
  const [showNeural, setShowNeural] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const [showInsights, setShowInsights] = useState(false);
  const [activeConnection, setActiveConnection] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      // Screen 1: Voice Processing & Memory Activation (0-4s)
      setTimeout(() => {
        setCurrentScreen(0);
        setShowWaveform(true);
        
        // Type out shorter, more natural voice message
        const message = "Asmi, I just had a great call with Raj. He seemed really interested in our API solutions and mentioned they're looking to make a decision by next month. Help me prepare a follow-up.";
        let index = 0;
        const typeInterval = setInterval(() => {
          if (index <= message.length) {
            setVoiceText(message.slice(0, index));
            index++;
          } else {
            clearInterval(typeInterval);
            // Show memory connections after voice text completes
            setTimeout(() => setShowConnections(true), 800);
          }
        }, 50); // Faster typing for longer message
      }, 500);

      // Screen 2: Intelligence Generation & Actionable Output (4-8s)
      setTimeout(() => {
        setCurrentScreen(1);
        setShowNeural(true);
        
        // Show insights and actions Asmi takes
        const insightList = [
          "Raj is CTO at TechCorp",
          "Last mail: shared $50K+ budget range",
          "Loves technical demos. I am creating a detailed script for you",
          "Send follow-up with technical demo link and API docs",
          "Scheduling next meeting \"API architecture deep-dive\" on Monday 2PM at Raj's office in Palo Alto."
        ];
        
        insightList.forEach((insight, index) => {
          setTimeout(() => {
            setInsights(prev => [...prev, insight]);
          }, index * 600 + 1000);
        });
        
        setTimeout(() => setShowInsights(true), 1000);
      }, 4000);
    };

    runAnimation();
  }, [isVisible]);

  const renderWaveform = () => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-0.5 bg-white rounded-full animate-pulse"
            style={{
              height: `${6 + Math.sin(i * 0.8) * 3}px`,
              animationDelay: `${i * 100}ms`
            }}
          />
        ))}
      </div>
    );
  };

  const renderConnectionsNetwork = () => {
    const dataPoints = [
      { type: "Emails", position: { x: 25, y: 25 }, color: "bg-green-400", label: "Emails" },
      { type: "Calendar", position: { x: 75, y: 25 }, color: "bg-blue-400", label: "Calendar" },
      { type: "Meetings", position: { x: 25, y: 75 }, color: "bg-purple-400", label: "Meetings" },
      { type: "Conversations", position: { x: 75, y: 75 }, color: "bg-yellow-400", label: "Conversations" }
    ];

    useEffect(() => {
      if (!showConnections) return;
      
      const interval = setInterval(() => {
        setActiveConnection(prev => (prev + 1) % dataPoints.length);
      }, 800);

      return () => clearInterval(interval);
    }, [showConnections]);

    return (
      <div className="relative h-32 mb-4">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0">
                <animate attributeName="stop-opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8">
                <animate attributeName="stop-opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0">
                <animate attributeName="stop-opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          
          {/* Dynamic connections */}
          {dataPoints.map((point, index) => (
            <g key={index}>
              <line
                x1={point.position.x}
                y1={point.position.y}
                x2="50"
                y2="50"
                stroke="#22c55e"
                strokeWidth={activeConnection === index ? "2" : "1"}
                strokeOpacity={showConnections ? (activeConnection === index ? "0.9" : "0.3") : "0"}
                className="transition-all duration-500"
              />
              
              {activeConnection === index && showConnections && (
                <line
                  x1={point.position.x}
                  y1={point.position.y}
                  x2="50"
                  y2="50"
                  stroke="url(#flow-gradient)"
                  strokeWidth="3"
                  className="animate-pulse"
                />
              )}
            </g>
          ))}
        </svg>

        {/* Data Points with Labels */}
        {dataPoints.map((point, index) => (
          <div
            key={index}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
              activeConnection === index && showConnections
                ? 'animate-pulse scale-125 z-10' 
                : 'scale-100 opacity-70'
            }`}
            style={{
              left: `${point.position.x}%`,
              top: `${point.position.y}%`
            }}
          >
            <div className={`w-3 h-3 ${point.color} rounded-full flex items-center justify-center relative shadow-lg`}>
              {activeConnection === index && showConnections && (
                <>
                  <div className={`absolute inset-0 rounded-full ${point.color} opacity-40 animate-ping scale-150`}></div>
                  <div className={`absolute inset-0 rounded-full ${point.color} opacity-60 animate-ping scale-125 animation-delay-200`}></div>
                </>
              )}
            </div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <span className={`text-xs whitespace-nowrap transition-all duration-300 ${
                activeConnection === index && showConnections
                  ? 'text-white font-semibold scale-110' 
                  : 'text-gray-400'
              }`}>
                {point.label}
              </span>
            </div>
          </div>
        ))}

        {/* Center Asmi Node */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div 
            className={`bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-1000 ${
              showConnections ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
            style={{
              width: '32px',
              height: '32px',
              boxShadow: '0 0 15px rgba(34, 197, 94, 0.3)'
            }}
          >
            <span className="text-black font-bold text-xs">Asmi</span>
          </div>
        </div>
      </div>
    );
  };

  const renderNeuralNetwork = () => {
    return (
      <div className="relative w-full h-24 mx-auto">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 96">
          {/* Neural connections */}
          {[...Array(6)].map((_, i) => (
            <line
              key={i}
              x1={40 + i * 32}
              y1={20}
              x2={60 + i * 28}
              y2={76}
              stroke="white"
              strokeWidth="0.5"
              className={`transition-all duration-500 ${
                showNeural ? 'opacity-30' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
          
          {/* Neural nodes */}
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              cx={30 + i * 26}
              cy={i % 2 === 0 ? 20 : 76}
              r="2"
              fill="white"
              className={`transition-all duration-300 ${
                showNeural ? 'opacity-60' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </svg>
      </div>
    );
  };

  return (
    <MobileOptimizedSection maxWidth="md" padding="sm">
      <div ref={sectionRef} className="max-h-[420px] space-y-8">
        
        {/* Screen 1: Voice Capture & Context Linking */}
        {currentScreen === 0 && (
          <div className="flex flex-col justify-center space-y-6">
            {/* Voice input */}
            <div className="text-center space-y-4">
              <p className="text-sm text-white font-semibold font-inter">Voice Processing</p>
              <div className="flex items-center justify-center space-x-3">
                <Mic size={16} className="text-white" />
                {showWaveform && renderWaveform()}
              </div>
              {voiceText && (
                <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                  <p className="text-sm text-white font-inter leading-relaxed">"{voiceText}"</p>
                </div>
              )}
            </div>
            
            {/* Memory Engine Activation */}
            {showConnections && (
              <div className="space-y-4">
                <p className="text-sm text-center text-white font-inter">Memory Engine Activating</p>
                <p className="text-xs text-center text-white/70">Connecting to Raj's business context</p>
                {renderConnectionsNetwork()}
              </div>
            )}
          </div>
        )}

        {/* Screen 2: Intelligence Generation */}
        {currentScreen === 1 && (
          <div className="flex flex-col justify-center space-y-6">
            {/* Intelligence Synthesis */}
            <div className="space-y-4">
              <p className="text-sm text-center text-white font-semibold font-inter">Intelligence Generation</p>
              {renderNeuralNetwork()}
            </div>
            
            {/* Smart Insights & Actions */}
            {showInsights && (
              <div className="space-y-3">
                <p className="text-sm text-white font-inter mb-3">Smart Insights:</p>
                {insights.slice(0, 3).map((insight, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg p-3 border border-white/10 transition-all duration-500 animate-fade-in"
                    style={{ animationDelay: `${index * 600}ms` }}
                  >
                    <div className="flex items-start space-x-2">
                      <span className="text-[#37D67A] text-sm">•</span>
                      <p className="text-xs text-white font-inter leading-relaxed">{insight}</p>
                    </div>
                  </div>
                ))}
                
                {insights.length > 3 && (
                  <div className="mt-4 space-y-3">
                    <p className="text-sm text-white font-inter mb-3">Actions Taken:</p>
                    {insights.slice(3).map((action, index) => (
                      <div
                        key={index + 3}
                        className="bg-[#37D67A]/10 rounded-lg p-3 border border-[#37D67A]/20 transition-all duration-500 animate-fade-in"
                        style={{ animationDelay: `${(index + 3) * 600}ms` }}
                      >
                        <div className="flex items-start space-x-2">
                          <span className="text-[#37D67A] text-sm">✓</span>
                          <p className="text-xs text-white font-inter leading-relaxed">{action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </MobileOptimizedSection>
  );
};

export default ProcessAnimationSection;