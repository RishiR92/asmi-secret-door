import { useState, useEffect, useRef } from 'react';
import { Mic } from 'lucide-react';
import MobileOptimizedSection from './MobileOptimizedSection';

const ProcessAnimationSection = () => {
  const [currentScreen, setCurrentScreen] = useState(0); // 0: Screen1, 1: Screen2
  const [isVisible, setIsVisible] = useState(false);
  const [showWaveform, setShowWaveform] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [showConnections, setShowConnections] = useState(false);
  const [showDataFetching, setShowDataFetching] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const [actions, setActions] = useState<string[]>([]);
  const [showInsights, setShowInsights] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [activeConnection, setActiveConnection] = useState(0);
  const [activeFetchingSource, setActiveFetchingSource] = useState(0);
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
        
        // Phase 1: Data Fetching Animation (4-6s)
        setShowDataFetching(true);
        const dataFetchingInterval = setInterval(() => {
          setActiveFetchingSource(prev => (prev + 1) % 4);
        }, 500);
        
        setTimeout(() => {
          clearInterval(dataFetchingInterval);
          setShowDataFetching(false);
          
          // Phase 2: Smart Insights Generation (6-7s)
          const insightsList = [
            "Raj is CTO at TechCorp",
            "Last mail: shared $50K+ budget range",
            "Loves technical demos. I am creating a detailed script for you"
          ];
          
          insightsList.forEach((insight, index) => {
            setTimeout(() => {
              setInsights(prev => [...prev, insight]);
            }, index * 400);
          });
          
          setTimeout(() => setShowInsights(true), 100);
          
          // Phase 3: Dynamic Actions Taken (7-8s)
          setTimeout(() => {
            const actionsList = [
              "Sent follow-up with technical demo link and API docs",
              "Scheduled next meeting \"API architecture deep-dive\" on Monday 2PM at Raj's office in Palo Alto"
            ];
            
            actionsList.forEach((action, index) => {
              setTimeout(() => {
                setActions(prev => [...prev, action]);
              }, index * 600);
            });
            
            setShowActions(true);
          }, 1200);
        }, 2000); // Data fetching lasts 2 seconds
      }, 4000);
    };

    runAnimation();
  }, [isVisible]);

  // Handle connections animation cycle
  useEffect(() => {
    if (!showConnections) return;
    
    const interval = setInterval(() => {
      setActiveConnection(prev => (prev + 1) % 4); // 4 data points
    }, 800);

    return () => clearInterval(interval);
  }, [showConnections]);

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

  const renderDataFetchingAnimation = () => {
    const dataPoints = [
      { type: "Emails", position: { x: 25, y: 25 }, color: "bg-green-400", label: "Emails", data: "Previous emails with Raj" },
      { type: "Calendar", position: { x: 75, y: 25 }, color: "bg-blue-400", label: "Calendar", data: "Upcoming meetings" },
      { type: "Meetings", position: { x: 25, y: 75 }, color: "bg-purple-400", label: "Meetings", data: "Past meeting notes" },
      { type: "Conversations", position: { x: 75, y: 75 }, color: "bg-yellow-400", label: "Conversations", data: "Chat history" }
    ];

    return (
      <div className="relative h-32 mb-4">
        {/* Connection Lines with flowing data */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="data-flow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          {/* Animated data flow lines */}
          {dataPoints.map((point, index) => (
            <g key={index}>
              <line
                x1={point.position.x}
                y1={point.position.y}
                x2="50"
                y2="50"
                stroke="#22c55e"
                strokeWidth={activeFetchingSource === index ? "3" : "1"}
                strokeOpacity={showDataFetching ? (activeFetchingSource === index ? "1" : "0.2") : "0"}
                className="transition-all duration-300"
              />
              
              {/* Enhanced flowing particles */}
              {activeFetchingSource === index && showDataFetching && (
                <>
                  {/* Multiple particles for more scientific effect */}
                  {[0, 0.3, 0.6].map((delay, particleIndex) => (
                    <circle key={particleIndex} r="1.5" fill="#22c55e" className="opacity-80">
                      <animateMotion dur="1.2s" repeatCount="indefinite" begin={`${delay}s`}>
                        <mpath xlinkHref={`#path-${index}`} />
                      </animateMotion>
                    </circle>
                  ))}
                  <path id={`path-${index}`} d={`M${point.position.x},${point.position.y} L50,50`} className="opacity-0" />
                  
                  {/* Energy ring around active source */}
                  <circle 
                    cx={point.position.x} 
                    cy={point.position.y} 
                    r="4" 
                    fill="none" 
                    stroke="#22c55e" 
                    strokeWidth="1" 
                    opacity="0.6"
                    className="animate-ping"
                  />
                </>
              )}
            </g>
          ))}
        </svg>

        {/* Data Points */}
        {dataPoints.map((point, index) => (
          <div
            key={index}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              activeFetchingSource === index && showDataFetching
                ? 'scale-125 z-10' 
                : 'scale-100 opacity-70'
            }`}
            style={{
              left: `${point.position.x}%`,
              top: `${point.position.y}%`
            }}
          >
            <div className={`w-3 h-3 ${point.color} rounded-full flex items-center justify-center relative shadow-lg`}>
              {activeFetchingSource === index && showDataFetching && (
                <>
                  <div className={`absolute inset-0 rounded-full ${point.color} opacity-40 animate-ping scale-150`}></div>
                  <div className={`absolute inset-0 rounded-full ${point.color} opacity-20 animate-ping scale-200`} style={{ animationDelay: '0.2s' }}></div>
                </>
              )}
            </div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <span className={`text-xs whitespace-nowrap transition-all duration-300 ${
                activeFetchingSource === index && showDataFetching
                  ? 'text-white font-semibold' 
                  : 'text-gray-400'
              }`}>
                {point.label}
              </span>
            </div>
          </div>
        ))}

        {/* Center Asmi Node with enhanced glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div 
            className={`bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-500 ${
              showDataFetching ? 'scale-110 opacity-100' : 'scale-100 opacity-80'
            }`}
            style={{
              width: '32px',
              height: '32px',
              boxShadow: showDataFetching ? '0 0 25px rgba(34, 197, 94, 0.7), 0 0 45px rgba(34, 197, 94, 0.3)' : '0 0 15px rgba(34, 197, 94, 0.3)'
            }}
          >
            <span className="text-black font-bold text-xs">Asmi</span>
            {showDataFetching && (
              <div className="absolute inset-0 rounded-full bg-green-400/20 animate-pulse scale-150"></div>
            )}
          </div>
        </div>
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
            
            {/* Phase 1: Data Fetching Animation */}
            {showDataFetching && (
              <div className="space-y-4">
                <p className="text-sm text-center text-white font-semibold font-inter">Intelligence Generation</p>
                <p className="text-xs text-center text-white/70">Fetching context from memory sources</p>
                {renderDataFetchingAnimation()}
              </div>
            )}
            
            {/* Phase 2: Smart Insights */}
            {showInsights && insights.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm text-white font-inter mb-3">Smart Insights Generated:</p>
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg p-3 border border-white/10 transition-all duration-500 animate-fade-in"
                    style={{ animationDelay: `${index * 400}ms` }}
                  >
                    <div className="flex items-start space-x-2">
                      <span className="text-[#37D67A] text-sm">•</span>
                      <p className="text-xs text-white font-inter leading-relaxed">"{insight}"</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Phase 3: Dynamic Actions Taken */}
            {showActions && actions.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm text-white font-inter mb-3">Actions Taken by Asmi:</p>
                {actions.map((action, index) => (
                  <div
                    key={index}
                    className="bg-[#37D67A]/15 rounded-lg p-3 border border-[#37D67A]/30 transition-all duration-500 animate-fade-in relative"
                    style={{ animationDelay: `${index * 600}ms` }}
                  >
                    <div className="flex items-start space-x-2">
                      <span className="text-[#37D67A] text-sm animate-pulse">✓</span>
                      <p className="text-xs text-white font-inter leading-relaxed font-medium">{action}</p>
                    </div>
                    {/* Completion pulse effect */}
                    <div 
                      className="absolute inset-0 bg-[#37D67A]/10 rounded-lg opacity-0 animate-ping"
                      style={{ 
                        animationDelay: `${index * 600 + 300}ms`,
                        animationDuration: '1s',
                        animationIterationCount: '2'
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </MobileOptimizedSection>
  );
};

export default ProcessAnimationSection;