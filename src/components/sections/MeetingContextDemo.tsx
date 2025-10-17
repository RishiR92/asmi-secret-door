
import { useState, useEffect } from 'react';
import TypingIndicator from './morning-brief-demo/TypingIndicator';

const MeetingContextDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTyping, setShowTyping] = useState(false);

  const contextData = {
    meeting: "Board meeting with Pat Grady from Sequoia at 4pm today",
    insights: [
      { icon: "⚡", text: "Agenda: Q3 results, fundraising timeline, product roadmap review", label: "Today's focus" },
      { icon: "📊", text: "Last meeting: Expressed concerns about burn rate, wants path to profitability", label: "Previous feedback" },
      { icon: "🎯", text: "Focus areas: Growth metrics, unit economics, competitive positioning", label: "Board priorities" },
      { icon: "🔑", text: "Secret to win: Reference Sequoia's recent AI portfolio wins & position your growth as similar trajectory", label: "Winning strategy" }
    ]
  };

  // Auto-play demo flow
  useEffect(() => {
    const stepTimings = [
      { step: 0, delay: 1000, action: () => { setShowTyping(true); } },
      { step: 1, delay: 2000, action: () => { setShowTyping(false); } },
      { step: 2, delay: 3000, action: () => {} },
      { step: 3, delay: 5000, action: () => { setCurrentStep(0); setShowTyping(false); } }
    ];

    const currentTiming = stepTimings[currentStep];
    if (currentTiming) {
      const timer = setTimeout(() => {
        currentTiming.action();
        if (currentStep < stepTimings.length - 1) {
          setCurrentStep(prev => prev + 1);
        }
      }, currentTiming.delay);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-[400px] mx-auto py-8">
        {/* WhatsApp-style chat interface */}
        <div 
          className="rounded-2xl overflow-hidden shadow-2xl w-full"
          style={{ backgroundColor: '#0B141A' }}
        >
          {/* WhatsApp Header */}
          <div className="px-4 py-3 flex items-center space-x-3" style={{ backgroundColor: '#202C33' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: '#00A884' }}>
              A
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-sm">Asmi</h3>
              <p className="text-xs text-gray-400">online</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-4 space-y-3 min-h-[500px]" style={{ backgroundColor: '#0B141A' }}>
            {/* User Message */}
            <div className="flex justify-end animate-slide-in-right">
              <div className="px-4 py-2.5 rounded-lg rounded-tr-sm max-w-[85%]" style={{ backgroundColor: '#005C4B' }}>
                <span className="text-sm text-white">
                  Help me prepare before every imp investor meeting
                </span>
              </div>
            </div>

            {/* Typing Indicator */}
            <TypingIndicator isVisible={showTyping} />

            {/* Asmi Response - Meeting Info */}
            {currentStep >= 1 && (
              <div className="flex justify-start animate-scale-in">
                <div className="px-4 py-2.5 rounded-lg rounded-tl-sm max-w-[85%]" style={{ backgroundColor: '#1F2C34' }}>
                  <span className="text-sm text-white font-medium">{contextData.meeting}</span>
                </div>
              </div>
            )}

            {/* Context Brief Card */}
            {currentStep >= 2 && (
              <div className="flex justify-start animate-scale-in">
                <div className="px-4 py-3 rounded-lg rounded-tl-sm max-w-[85%]" style={{ backgroundColor: '#1F2C34' }}>
                  <div className="space-y-3">
                    {contextData.insights.map((insight, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-start space-x-2">
                          <span className="text-base">{insight.icon}</span>
                          <div className="flex-1">
                            <p className="text-xs font-medium mb-0.5" style={{ color: '#00A884' }}>
                              {insight.label}
                            </p>
                            <p className="text-sm text-white leading-relaxed">
                              {insight.text}
                            </p>
                          </div>
                        </div>
                        {index < contextData.insights.length - 1 && (
                          <div className="h-px my-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-center mt-6" style={{ color: 'var(--text-secondary)' }}>
          Context pulled from emails, calendar & past meetings
        </p>
      </div>
    </div>
  );
};

export default MeetingContextDemo;
