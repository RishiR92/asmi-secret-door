
import { useState, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';

const MeetingContextDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false); // Changed to false

  const steps = [
    {
      title: "Win every meeting.",
      content: "prep",
      message: "Help me prep for board meeting with Pat"
    },
    {
      title: "Win every meeting.",
      content: "context",
      message: ""
    },
    {
      title: "Win every meeting.",
      content: "ready",
      message: ""
    }
  ];

  const contextData = {
    meeting: "Board meeting with Pat Grady from Sequoia at 4pm today:",
    insights: [
      { icon: "⚡", text: "Agenda: Q3 results, fundraising timeline, product roadmap review", time: "Today's focus" },
      { icon: "📊", text: "Last meeting: Expressed concerns about burn rate, wants path to profitability", time: "Previous feedback" },
      { icon: "🎯", text: "Focus areas: Growth metrics, unit economics, competitive positioning", time: "Board priorities" },
      { icon: "🔑", text: "Secret to win: Reference Sequoia's recent AI portfolio wins & position your growth as similar trajectory", time: "Winning strategy" }
    ]
  };

  // Manual typing effect only for first step
  useEffect(() => {
    if (currentStep === 0 && !typedText) {
      const message = steps[0].message;
      let i = 0;
      setTypedText('');
      
      const typeInterval = setInterval(() => {
        if (i < message.length) {
          setTypedText(message.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    }
  }, [currentStep]);

  const handleCardTap = () => {
    if (currentStep === 2) {
      setCurrentStep(0);
      setTypedText('');
    } else {
      setCurrentStep(prev => prev + 1);
      if (currentStep === 0) {
        setTypedText('');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px] space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
            <Clock style={{ color: 'var(--text-secondary)' }} size={20} />
          </div>
          <h2 className="text-2xl font-bold leading-tight" style={{ color: 'var(--text-high)' }}>
            {steps[currentStep].title}
          </h2>
        </div>

        {/* Phone Demo */}
        <div 
          className="backdrop-blur-sm rounded-3xl p-4 cursor-pointer transition-all duration-300 hover:scale-105"
          style={{ 
            backgroundColor: 'rgba(31, 31, 35, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
          onClick={handleCardTap}
        >
          {/* Status Bar */}
          <div className="flex justify-between items-center text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
            <span>1:45</span>
            <div className="flex items-center space-x-1">
              <Clock size={12} />
              <span>25h until meeting</span>
            </div>
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--text-secondary)' }}></div>
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--text-secondary)' }}></div>
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--text-secondary)' }}></div>
            </div>
          </div>

          {currentStep === 0 ? (
            // Message Input Step
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--accent-positive)' }}>
                    <span className="text-white text-sm font-bold">A</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-high)' }}>Asmi</p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Meeting prep assistant</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-3" style={{ backgroundColor: 'var(--accent-positive)' }}>
                <p className="text-white text-sm">
                  {typedText}
                  {typedText.length < steps[0].message.length && <span className="animate-pulse">|</span>}
                </p>
              </div>

              {typedText.length === steps[0].message.length && (
                <div className="rounded-xl p-3 animate-fade-in" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{contextData.meeting}</p>
                  <div className="mt-2 text-center">
                    <button className="text-xs underline" style={{ color: 'var(--accent-positive)' }}>Tap to continue →</button>
                  </div>
                </div>
              )}
            </div>
          ) : currentStep === 1 ? (
            // Context Step
            <div className="space-y-3 animate-fade-in">
              <div className="rounded-xl p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-high)' }}>{contextData.meeting}</p>
              </div>

              <div className="rounded-xl p-3 space-y-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                {contextData.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                    <span className="text-xs">{insight.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium leading-tight mb-1" style={{ color: 'var(--text-high)' }}>
                        {insight.text}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{insight.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-positive)' }}></div>
                  <p className="text-xs font-medium" style={{ color: 'var(--accent-positive)' }}>Context Brief Ready</p>
                </div>
              </div>
            </div>
          ) : (
            // Ready Step
            <div className="space-y-4 animate-fade-in text-center">
              <div className="rounded-xl p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: 'var(--accent-positive)' }}>
                  <span className="text-white text-lg font-bold">✓</span>
                </div>
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--accent-positive)' }}>
                  You're prepared for Pat!
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Board context loaded. Ready to impress Sequoia.
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <span>Tap to restart</span>
                <ArrowRight size={12} />
              </div>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentStep(index);
                if (index === 0) setTypedText('');
              }}
              className="w-2 h-2 rounded-full transition-all"
              style={{ 
                backgroundColor: index === currentStep ? 'var(--accent-positive)' : 'rgba(255, 255, 255, 0.2)',
                width: index === currentStep ? '1.5rem' : '0.5rem'
              }}
            />
          ))}
        </div>

        <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
          Tap demo to interact
        </p>
      </div>
    </div>
  );
};

export default MeetingContextDemo;
