import { useState, useEffect, useRef } from 'react';
import { Mic } from 'lucide-react';
import MobileOptimizedSection from './MobileOptimizedSection';

const ProcessAnimationSection = () => {
  const [currentScreen, setCurrentScreen] = useState(0); // 0: Screen1, 1: Screen2, 2: Screen3
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
  const [centerNodeScale, setCenterNodeScale] = useState(1);
  const [particleCount, setParticleCount] = useState(0);
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
      // Reset all states
      setCurrentScreen(0);
      setShowWaveform(false);
      setVoiceText('');
      setShowConnections(false);
      setShowDataFetching(false);
      setInsights([]);
      setActions([]);
      setShowInsights(false);
      setShowActions(false);
      setActiveConnection(0);
      setActiveFetchingSource(0);
      setCenterNodeScale(1);
      setParticleCount(0);

      // Screen 1: Voice Processing & Memory Activation (0-4s)
      setTimeout(() => {
        setCurrentScreen(0);
        setShowWaveform(true);
        
        // Type out shorter, more natural voice message
        const message = "Asmi, I just had a great call with Raj about our API solutions. Help me prepare a follow-up.";
        let index = 0;
        const typeInterval = setInterval(() => {
          if (index <= message.length) {
            setVoiceText(message.slice(0, index));
            index++;
          } else {
            clearInterval(typeInterval);
            // Show memory connections after voice text completes with viewing time
            setTimeout(() => setShowConnections(true), 1500);
          }
        }, 80);
      }, 500);

      // Screen 2: Intelligence Generation & Actionable Output (10s - with 2s gap)
      setTimeout(() => {
        setCurrentScreen(1);
        
        // Phase 1: Data Fetching Animation (3s duration)
        setShowDataFetching(true);
        setCenterNodeScale(1.2);
        
        const dataFetchingInterval = setInterval(() => {
          setActiveFetchingSource(prev => (prev + 1) % 4);
          setParticleCount(prev => prev + 1);
        }, 500);
        
        setTimeout(() => {
          clearInterval(dataFetchingInterval);
          setShowDataFetching(false);
          setCenterNodeScale(1.4);
          
          // Phase 2: Smart Insights Generation (slower reveal + viewing time)
          const insightsList = [
            "Raj is CTO at TechCorp",
            "Last mail: shared $50K+ budget range",
            "Loves technical demos. I am creating a detailed script for you"
          ];
          
          insightsList.forEach((insight, index) => {
            setTimeout(() => {
              setInsights(prev => [...prev, insight]);
            }, index * 600);
          });
          
          setTimeout(() => setShowInsights(true), 100);
          
          // Phase 3: Dynamic Actions Taken (slower reveal + viewing time)
          setTimeout(() => {
            const actionsList = [
              "Sent follow-up with technical demo link and API docs",
              "Scheduled next meeting \"API architecture deep-dive\" on Monday 2PM at Raj's office in Palo Alto"
            ];
            
            actionsList.forEach((action, index) => {
              setTimeout(() => {
                setActions(prev => [...prev, action]);
              }, index * 800);
            });
            
            setShowActions(true);
          }, 2000);
        }, 3000);
      }, 10000);

      // Loop the animation
      setTimeout(() => {
        runAnimation();
      }, 20000); // 20s total cycle for proper viewing time
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
      { type: "Emails", position: { x: 25, y: 25 }, color: "bg-green-400", strokeColor: "#22c55e", label: "Emails" },
      { type: "Calendar", position: { x: 75, y: 25 }, color: "bg-blue-400", strokeColor: "#3b82f6", label: "Calendar" },
      { type: "Meetings", position: { x: 25, y: 75 }, color: "bg-purple-400", strokeColor: "#8b5cf6", label: "Meetings" },
      { type: "Conversations", position: { x: 75, y: 75 }, color: "bg-yellow-400", strokeColor: "#eab308", label: "Conversations" }
    ];

    return (
      <div className="relative h-32 mb-4">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            {dataPoints.map((point, index) => (
              <linearGradient key={index} id={`flow-gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={point.strokeColor} stopOpacity="0">
                  <animate attributeName="stop-opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin={`${index * 0.2}s`} />
                </stop>
                <stop offset="50%" stopColor={point.strokeColor} stopOpacity="1">
                  <animate attributeName="stop-opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" begin={`${index * 0.2}s`} />
                </stop>
                <stop offset="100%" stopColor={point.strokeColor} stopOpacity="0">
                  <animate attributeName="stop-opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" begin={`${index * 0.2}s`} />
                </stop>
              </linearGradient>
            ))}
          </defs>
          
          {/* Enhanced connections with multiple particles */}
          {dataPoints.map((point, index) => (
            <g key={index}>
              <line
                x1={point.position.x}
                y1={point.position.y}
                x2="50"
                y2="50"
                stroke={point.strokeColor}
                strokeWidth={activeConnection === index ? "2" : "1"}
                strokeOpacity={showConnections ? (activeConnection === index ? "0.9" : "0.3") : "0"}
                className="transition-all duration-500"
              />
              
              {activeConnection === index && showConnections && (
                <>
                  {/* Multiple flowing particles */}
                  {[0, 0.3, 0.6, 0.9].map((delay, particleIndex) => (
                    <circle key={particleIndex} r="1.5" fill={point.strokeColor} className="opacity-80">
                      <animateMotion dur="2s" repeatCount="indefinite" begin={`${delay}s`}>
                        <mpath xlinkHref={`#connection-path-${index}`} />
                      </animateMotion>
                    </circle>
                  ))}
                  <path id={`connection-path-${index}`} d={`M${point.position.x},${point.position.y} L50,50`} className="opacity-0" />
                  
                  {/* Enhanced flow line */}
                  <line
                    x1={point.position.x}
                    y1={point.position.y}
                    x2="50"
                    y2="50"
                    stroke={`url(#flow-gradient-${index})`}
                    strokeWidth="3"
                  />
                </>
              )}
            </g>
          ))}
        </svg>

        {/* Data Points with enhanced energy rings */}
        {dataPoints.map((point, index) => (
          <div
            key={index}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
              activeConnection === index && showConnections
                ? 'scale-125 z-10' 
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
                  {/* Multiple pulsing energy rings */}
                  <div className={`absolute inset-0 rounded-full ${point.color} opacity-40 animate-ping scale-150`}></div>
                  <div className={`absolute inset-0 rounded-full ${point.color} opacity-30 animate-ping scale-200`} style={{ animationDelay: '0.3s' }}></div>
                  <div className={`absolute inset-0 rounded-full ${point.color} opacity-20 animate-ping scale-250`} style={{ animationDelay: '0.6s' }}></div>
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

        {/* Enhanced Center Asmi Node with dynamic glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div 
            className={`bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-1000 ${
              showConnections ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
            style={{
              width: '32px',
              height: '32px',
              transform: `scale(${centerNodeScale})`,
              boxShadow: showConnections ? '0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.3), 0 0 60px rgba(34, 197, 94, 0.1)' : '0 0 15px rgba(34, 197, 94, 0.3)'
            }}
          >
            <span className="text-black font-bold text-xs">Asmi</span>
            {showConnections && (
              <>
                <div className="absolute inset-0 rounded-full bg-green-400/20 animate-pulse scale-150"></div>
                <div className="absolute inset-0 rounded-full bg-green-400/10 animate-pulse scale-200" style={{ animationDelay: '0.5s' }}></div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderDataFetchingAnimation = () => {
    const dataPoints = [
      { type: "Emails", position: { x: 25, y: 25 }, color: "bg-green-400", strokeColor: "#22c55e", label: "Emails", data: "Previous emails with Raj" },
      { type: "Calendar", position: { x: 75, y: 25 }, color: "bg-blue-400", strokeColor: "#3b82f6", label: "Calendar", data: "Upcoming meetings" },
      { type: "Meetings", position: { x: 25, y: 75 }, color: "bg-purple-400", strokeColor: "#8b5cf6", label: "Meetings", data: "Past meeting notes" },
      { type: "Conversations", position: { x: 75, y: 75 }, color: "bg-yellow-400", strokeColor: "#eab308", label: "Conversations", data: "Chat history" }
    ];

    return (
      <div className="relative h-32 mb-4">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            {dataPoints.map((point, index) => (
              <linearGradient key={index} id={`data-flow-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={point.strokeColor} stopOpacity="0.8" />
                <stop offset="50%" stopColor={point.strokeColor} stopOpacity="1" />
                <stop offset="100%" stopColor={point.strokeColor} stopOpacity="0.8" />
              </linearGradient>
            ))}
            <radialGradient id="glow-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#22c55e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Enhanced animated data flow lines */}
          {dataPoints.map((point, index) => (
            <g key={index}>
              <line
                x1={point.position.x}
                y1={point.position.y}
                x2="50"
                y2="50"
                stroke={point.strokeColor}
                strokeWidth={activeFetchingSource === index ? "3" : "1"}
                strokeOpacity={showDataFetching ? (activeFetchingSource === index ? "1" : "0.2") : "0"}
                className="transition-all duration-300"
              />
              
              {/* Enhanced flowing particles with staggered timing */}
              {activeFetchingSource === index && showDataFetching && (
                <>
                  {/* Multiple particles with different sizes and timing */}
                  {[
                    { delay: 0, size: 1.5, opacity: 0.9 },
                    { delay: 0.2, size: 1.2, opacity: 0.7 },
                    { delay: 0.4, size: 1.8, opacity: 0.8 },
                    { delay: 0.6, size: 1.3, opacity: 0.6 },
                    { delay: 0.8, size: 1.6, opacity: 0.75 }
                  ].map((particle, particleIndex) => (
                    <circle 
                      key={particleIndex} 
                      r={particle.size} 
                      fill={point.strokeColor} 
                      opacity={particle.opacity}
                    >
                      <animateMotion dur="1.5s" repeatCount="indefinite" begin={`${particle.delay}s`}>
                        <mpath xlinkHref={`#data-path-${index}`} />
                      </animateMotion>
                    </circle>
                  ))}
                  <path id={`data-path-${index}`} d={`M${point.position.x},${point.position.y} L50,50`} className="opacity-0" />
                  
                  {/* Multiple expanding energy rings with different timing */}
                  <circle 
                    cx={point.position.x} 
                    cy={point.position.y} 
                    r="3" 
                    fill="none" 
                    stroke={point.strokeColor} 
                    strokeWidth="1.5" 
                    opacity="0.8"
                    className="animate-ping"
                  />
                  <circle 
                    cx={point.position.x} 
                    cy={point.position.y} 
                    r="5" 
                    fill="none" 
                    stroke={point.strokeColor} 
                    strokeWidth="1" 
                    opacity="0.6"
                    className="animate-ping"
                    style={{ animationDelay: '0.3s' }}
                  />
                  <circle 
                    cx={point.position.x} 
                    cy={point.position.y} 
                    r="7" 
                    fill="none" 
                    stroke={point.strokeColor} 
                    strokeWidth="0.5" 
                    opacity="0.4"
                    className="animate-ping"
                    style={{ animationDelay: '0.6s' }}
                  />
                </>
              )}
            </g>
          ))}
        </svg>

        {/* Enhanced Data Points */}
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
                  <div className={`absolute inset-0 rounded-full ${point.color} opacity-30 animate-ping scale-200`} style={{ animationDelay: '0.2s' }}></div>
                  <div className={`absolute inset-0 rounded-full ${point.color} opacity-20 animate-ping scale-250`} style={{ animationDelay: '0.4s' }}></div>
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

        {/* Enhanced Center Asmi Node with dynamic energy accumulation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div 
            className={`bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-500 ${
              showDataFetching ? 'opacity-100' : 'opacity-80'
            }`}
            style={{
              width: '32px',
              height: '32px',
              transform: `scale(${centerNodeScale})`,
              boxShadow: showDataFetching 
                ? `0 0 30px rgba(34, 197, 94, ${0.7 + particleCount * 0.05}), 0 0 60px rgba(34, 197, 94, ${0.4 + particleCount * 0.03}), 0 0 90px rgba(34, 197, 94, ${0.2 + particleCount * 0.02})` 
                : '0 0 15px rgba(34, 197, 94, 0.3)'
            }}
          >
            <span className="text-black font-bold text-xs">Asmi</span>
            {showDataFetching && (
              <>
                {/* Multiple rotating energy fields */}
                <div 
                  className="absolute inset-0 rounded-full bg-green-400/20 animate-pulse scale-150"
                  style={{ animationDuration: '2s' }}
                ></div>
                <div 
                  className="absolute inset-0 rounded-full bg-green-400/15 animate-pulse scale-200" 
                  style={{ animationDelay: '0.5s', animationDuration: '2.5s' }}
                ></div>
                <div 
                  className="absolute inset-0 rounded-full bg-green-400/10 animate-pulse scale-250" 
                  style={{ animationDelay: '1s', animationDuration: '3s' }}
                ></div>
                {/* Rotating energy field */}
                <div 
                  className="absolute inset-0 rounded-full border border-green-400/30 animate-spin" 
                  style={{ animationDuration: '4s' }}
                ></div>
              </>
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
            
            {/* Phase 2: Smart Insights - Fixed positioning container */}
            {showInsights && (
              <div className="space-y-3">
                <p className="text-sm text-white font-inter mb-3">Smart Insights Generated:</p>
                <div className="relative min-h-[120px]">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className="absolute top-0 left-0 right-0 bg-white/5 rounded-lg p-3 border border-white/10 transition-all duration-500 animate-fade-in opacity-0"
                      style={{ 
                        animationDelay: `${index * 400}ms`,
                        animationFillMode: 'forwards',
                        top: `${index * 40}px`
                      }}
                    >
                      <div className="flex items-start space-x-2">
                        <span className="text-[#37D67A] text-sm">•</span>
                        <p className="text-xs text-white font-inter leading-relaxed">"{insight}"</p>
                      </div>
                    </div>
                  ))}
                </div>
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