import { useState, useEffect, useRef } from 'react';
import { Mic, Lock } from 'lucide-react';

const ProcessAnimationSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const steps = [
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

    const cycleSteps = () => {
      let stepIndex = 0;
      
      const nextStep = () => {
        setCurrentStep(stepIndex);
        
        if (stepIndex === steps.length - 1) {
          setTimeout(() => {
            setShowEndMessage(true);
          }, steps[stepIndex].duration - 1000);
        }
        
        stepIndex = (stepIndex + 1) % (steps.length + 1); // +1 for end message
        
        if (stepIndex === 0) {
          setShowEndMessage(false);
        }
        
        setTimeout(nextStep, stepIndex === 0 ? 2000 : steps[stepIndex === steps.length ? 0 : stepIndex].duration);
      };
      
      nextStep();
    };

    const timer = setTimeout(cycleSteps, 500);
    return () => clearTimeout(timer);
  }, [isVisible, steps.length]);

  const renderWaveform = () => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-neon-green rounded-full animate-pulse"
            style={{
              height: `${8 + Math.sin(i * 0.5) * 4}px`,
              animationDelay: `${i * 100}ms`
            }}
          />
        ))}
      </div>
    );
  };

  const renderKnowledgeGraph = () => {
    const nodes = [
      { id: 'raj', label: 'Raj', x: 50, y: 50 },
      { id: 'partnership', label: 'Partnership', x: 120, y: 30 },
      { id: 'api', label: 'API', x: 180, y: 50 },
      { id: 'roadmap', label: 'Roadmap', x: 120, y: 80 },
      { id: 'emails', label: 'Emails', x: 60, y: 90 },
      { id: 'calendar', label: 'Calendar', x: 180, y: 90 }
    ];

    const edges = [
      { from: 'raj', to: 'partnership' },
      { from: 'raj', to: 'api' },
      { from: 'raj', to: 'roadmap' },
      { from: 'raj', to: 'emails' },
      { from: 'raj', to: 'calendar' }
    ];

    return (
      <div className="relative w-full h-32">
        <svg className="absolute inset-0 w-full h-full">
          {edges.map((edge, index) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            
            return (
              <line
                key={index}
                x1={fromNode?.x}
                y1={fromNode?.y}
                x2={toNode?.x}
                y2={toNode?.y}
                stroke="hsl(var(--neon-green))"
                strokeWidth="1"
                strokeDasharray="4 4"
                className={`transition-all duration-300 ${
                  currentStep === 1 ? 'opacity-80 animate-pulse' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              />
            );
          })}
        </svg>

        {nodes.map((node, index) => (
          <div
            key={node.id}
            className={`absolute text-xs text-white bg-gray-800/80 px-2 py-1 rounded border border-neon-green/30 transition-all duration-300 ${
              currentStep === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${index * 150}ms`
            }}
          >
            {node.label}
          </div>
        ))}

        {/* Security Lock Animation */}
        {currentStep === 1 && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-fade-in">
            <Lock size={12} className="text-neon-green/70" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="h-screen bg-black-matte flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-sm mx-auto space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-400">See how it flows.</p>
          <h1 className="text-2xl font-bold text-white leading-tight">
            From Brief to Brilliance.
          </h1>
        </div>

        {/* Process Steps */}
        <div className="space-y-8">
          
          {/* Step 1: Capture */}
          <div className="relative">
            {/* Micro Label */}
            <div className={`text-xs font-medium text-neon-green mb-2 transition-all duration-300 ${
              currentStep === 0 ? 'opacity-100' : 'opacity-30'
            }`}>
              Capture
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Pulsing Mic */}
              <div className={`transition-all duration-300 ${
                currentStep === 0 ? 'animate-pulse' : 'opacity-30'
              }`}>
                <Mic size={20} className="text-neon-green" />
              </div>
              
              {/* Waveform */}
              <div className={`transition-all duration-300 ${
                currentStep === 0 ? 'opacity-100' : 'opacity-30'
              }`}>
                {renderWaveform()}
              </div>
            </div>
            
            {/* WhatsApp Chat Bubble */}
            <div className={`mt-3 transition-all duration-300 ${
              currentStep === 0 ? 'animate-typing-bubble' : 'opacity-30'
            }`}>
              <div className="bg-gray-800 border border-gray-600 rounded-2xl rounded-bl-md p-3 max-w-xs">
                <p className="text-sm text-white">
                  "Great call with Raj… API integration."
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Link */}
          <div className="relative">
            {/* Micro Label */}
            <div className={`text-xs font-medium text-soft-purple mb-2 transition-all duration-300 ${
              currentStep === 1 ? 'opacity-100' : 'opacity-30'
            }`}>
              Link
            </div>
            
            {/* Knowledge Graph */}
            <div className={`transition-all duration-300 ${
              currentStep === 1 ? 'opacity-100' : 'opacity-30'
            }`}>
              {renderKnowledgeGraph()}
            </div>
          </div>

          {/* Step 3: Act */}
          <div className="relative">
            {/* Micro Label */}
            <div className={`text-xs font-medium text-neon-green mb-2 transition-all duration-300 ${
              currentStep === 2 ? 'opacity-100' : 'opacity-30'
            }`}>
              Act
            </div>
            
            {/* Floating Cards */}
            <div className="space-y-3">
              <div className={`transition-all duration-300 ${
                currentStep === 2 ? 'animate-card-float-in opacity-100' : 'opacity-30'
              }`} style={{ animationDelay: '0ms' }}>
                <div className="bg-gray-800/80 border border-gray-600 rounded-xl p-3">
                  <p className="text-sm text-white font-medium">Best time: 2–4 PM</p>
                </div>
              </div>
              
              <div className={`transition-all duration-300 ${
                currentStep === 2 ? 'animate-card-float-in opacity-100' : 'opacity-30'
              }`} style={{ animationDelay: '200ms' }}>
                <div className="bg-gray-800/80 border border-gray-600 rounded-xl p-3">
                  <p className="text-sm text-white font-medium">Decision-maker ($50k+)</p>
                </div>
              </div>
              
              {/* CTA Pill */}
              <div className={`transition-all duration-300 ${
                currentStep === 2 ? 'animate-card-float-in opacity-100' : 'opacity-30'
              }`} style={{ animationDelay: '400ms' }}>
                <div className="bg-neon-green/20 border border-neon-green rounded-full px-4 py-2 text-center">
                  <p className="text-sm text-white font-bold">Send data-driven pitch?</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* End Message */}
        {showEndMessage && (
          <div className="text-center animate-fade-in">
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-center">
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