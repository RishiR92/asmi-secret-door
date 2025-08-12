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
        
        // Type out realistic voice message
        const message = "Hey Asmi, I just had a great call with Raj from TechCorp. He seemed really interested in our API solutions and mentioned they're looking to make a decision by next month. Can you help me prepare for our follow-up?";
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
        
        // Show 5 specific business insights sequentially
        const insightList = [
          "Raj is CTO at TechCorp (from email signature)",
          "Last meeting: discussed $50K+ budget range",
          "Best contact time: 2-4 PM (from calendar patterns)",
          "Send follow-up with technical demo link",
          "Suggested next meeting: API architecture deep-dive"
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
    const centerNode = { x: 120, y: 70 };
    const dataPoints = [
      { label: 'Emails', x: 60, y: 40 },
      { label: 'Calendar', x: 180, y: 40 },
      { label: 'Meetings', x: 60, y: 100 },
      { label: 'Conversations', x: 180, y: 100 }
    ];

    return (
      <div className="relative w-full h-40 mx-auto">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 140">
          {dataPoints.map((point, index) => (
            <line
              key={index}
              x1={centerNode.x}
              y1={centerNode.y}
              x2={point.x}
              y2={point.y}
              stroke="#37D67A"
              strokeWidth="1"
              className={`transition-all duration-500 ${
                showConnections ? 'opacity-60' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            />
          ))}
          
          {/* Center node */}
          <circle
            cx={centerNode.x}
            cy={centerNode.y}
            r="4"
            fill="white"
            className={`transition-all duration-300 ${
              showConnections ? 'opacity-100' : 'opacity-0'
            }`}
          />
          
          {/* Data points */}
          {dataPoints.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="2"
              fill="#37D67A"
              className={`transition-all duration-300 ${
                showConnections ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200 + 100}ms` }}
            />
          ))}
        </svg>
        
        {/* Labels */}
        {dataPoints.map((point, index) => (
          <div
            key={index}
            className={`absolute text-xs text-white transition-all duration-300 ${
              showConnections ? 'opacity-70' : 'opacity-0'
            }`}
            style={{
              left: `${point.x}px`,
              top: `${point.y + 12}px`,
              transform: 'translateX(-50%)',
              animationDelay: `${index * 200 + 200}ms`
            }}
          >
            {point.label}
          </div>
        ))}
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
            
            {/* Actionable Business Insights */}
            {showInsights && (
              <div className="space-y-3">
                <p className="text-sm text-white font-inter mb-3">Actionable Insights:</p>
                {insights.map((insight, index) => (
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
              </div>
            )}
          </div>
        )}
      </div>
    </MobileOptimizedSection>
  );
};

export default ProcessAnimationSection;