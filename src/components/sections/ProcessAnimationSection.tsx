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
      // Screen 1: Voice Capture & Context Linking (0-4s)
      setTimeout(() => {
        setCurrentScreen(0);
        setShowWaveform(true);
        
        // Type out voice message
        const message = "Great call with Raj";
        let index = 0;
        const typeInterval = setInterval(() => {
          if (index <= message.length) {
            setVoiceText(message.slice(0, index));
            index++;
          } else {
            clearInterval(typeInterval);
            // Show connections after voice text completes
            setTimeout(() => setShowConnections(true), 500);
          }
        }, 80);
      }, 500);

      // Screen 2: Intelligence Generation (4-8s)
      setTimeout(() => {
        setCurrentScreen(1);
        setShowNeural(true);
        
        // Show insights sequentially
        const insightList = ["CTO at TechCorp", "$50K+ decision maker", "Best time: 2-4 PM"];
        insightList.forEach((insight, index) => {
          setTimeout(() => {
            setInsights(prev => [...prev, insight]);
          }, index * 800 + 1000);
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
    const centerNode = { x: 120, y: 60 };
    const dataPoints = [
      { label: 'Emails', x: 60, y: 30 },
      { label: 'Calendar', x: 180, y: 30 },
      { label: 'Meetings', x: 120, y: 90 }
    ];

    return (
      <div className="relative w-full h-32 mx-auto">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 120">
          {dataPoints.map((point, index) => (
            <line
              key={index}
              x1={centerNode.x}
              y1={centerNode.y}
              x2={point.x}
              y2={point.y}
              stroke="hsl(var(--accent-positive))"
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
              fill="hsl(var(--accent-positive))"
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
      <div ref={sectionRef} className="max-h-[400px] space-y-8">
        
        {/* Screen 1: Voice Capture & Context Linking */}
        {currentScreen === 0 && (
          <div className="flex flex-col justify-center space-y-6">
            {/* Voice input */}
            <div className="text-center space-y-3">
              <p className="text-xs text-white font-medium">Voice captured</p>
              <div className="flex items-center justify-center space-x-3">
                <Mic size={16} className="text-white" />
                {showWaveform && renderWaveform()}
              </div>
              {voiceText && (
                <p className="text-sm text-white font-normal">"{voiceText}"</p>
              )}
            </div>
            
            {/* Memory connections */}
            {showConnections && (
              <div className="space-y-3">
                <p className="text-xs text-center text-white/70">Linking to Raj's context</p>
                {renderConnectionsNetwork()}
              </div>
            )}
          </div>
        )}

        {/* Screen 2: Intelligence Generation */}
        {currentScreen === 1 && (
          <div className="flex flex-col justify-center space-y-6">
            {/* Neural processing */}
            <div className="space-y-3">
              <p className="text-xs text-center text-white font-medium">Generating insights</p>
              {renderNeuralNetwork()}
            </div>
            
            {/* Key insights */}
            {showInsights && (
              <div className="space-y-2">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className="text-xs text-white transition-all duration-300"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <span className="text-accent-positive">• </span>{insight}
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