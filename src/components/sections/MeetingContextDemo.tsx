
import { useState, useEffect } from 'react';
import { Clock, User, ArrowRight } from 'lucide-react';
import MobileOptimizedSection from './MobileOptimizedSection';

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
    meeting: "Board meeting with Pat Grady from Sequoia at 2pm tomorrow:",
    insights: [
      { icon: "📊", text: "Last meeting: Expressed concerns about burn rate, wants path to profitability", time: "Previous feedback" },
      { icon: "🎯", text: "Focus areas: Growth metrics, unit economics, competitive positioning", time: "Board priorities" },
      { icon: "💼", text: "Sequoia portfolio: Prefers data-driven founders, scalable business models", time: "Investment style" },
      { icon: "⚡", text: "Agenda: Q3 results, fundraising timeline, product roadmap review", time: "Today's focus" }
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
    <MobileOptimizedSection maxWidth="sm">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="text-blue-400" size={20} />
          </div>
          <h2 className="text-2xl font-bold text-white leading-tight">
            {steps[currentStep].title}
          </h2>
        </div>

        {/* Phone Demo */}
        <div 
          className="bg-gray-900 rounded-3xl p-4 mx-auto max-w-xs cursor-pointer transition-all duration-300 hover:scale-105"
          onClick={handleCardTap}
        >
          {/* Status Bar */}
          <div className="flex justify-between items-center text-white text-xs mb-4">
            <span>1:45</span>
            <div className="text-blue-400 text-xs">
              <Clock size={12} className="inline mr-1" />
              25 hours until meeting
            </div>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>

          {currentStep === 0 ? (
            // Message Input Step
            <div className="space-y-4 animate-fade-in">
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-3">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">A</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Asmi</p>
                    <p className="text-blue-300 text-xs">Meeting prep assistant</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500 rounded-2xl p-3">
                <p className="text-white text-sm">
                  {typedText}
                  {typedText.length < steps[0].message.length && <span className="animate-pulse">|</span>}
                </p>
              </div>

              {typedText.length === steps[0].message.length && (
                <div className="bg-gray-800 rounded-xl p-3 animate-fade-in">
                  <p className="text-gray-300 text-sm">{contextData.meeting}</p>
                  <div className="mt-2 text-center">
                    <button className="text-blue-400 text-xs underline">Tap to continue →</button>
                  </div>
                </div>
              )}
            </div>
          ) : currentStep === 1 ? (
            // Context Step
            <div className="space-y-3 animate-fade-in">
              <div className="bg-gray-800 rounded-xl p-3">
                <p className="text-white text-xs font-medium mb-2">{contextData.meeting}</p>
              </div>

              <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-3 space-y-2">
                {contextData.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 bg-white/5 rounded-lg">
                    <span className="text-xs">{insight.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium leading-tight mb-1">
                        {insight.text}
                      </p>
                      <p className="text-blue-300 text-xs">{insight.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-green-300 text-xs font-medium">Context Brief Ready</p>
                </div>
              </div>
            </div>
          ) : (
            // Ready Step
            <div className="space-y-4 animate-fade-in text-center">
              <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-4">
                <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-black text-lg font-bold">✓</span>
                </div>
                <p className="text-green-300 text-sm font-medium mb-2">
                  You're prepared for Pat!
                </p>
                <p className="text-gray-300 text-xs">
                  Board context loaded. Ready to impress Sequoia.
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-2 text-gray-400 text-xs">
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
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep ? 'bg-blue-400 w-6' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        <p className="text-gray-500 text-xs text-center">
          Tap demo to interact
        </p>
      </div>
    </MobileOptimizedSection>
  );
};

export default MeetingContextDemo;
