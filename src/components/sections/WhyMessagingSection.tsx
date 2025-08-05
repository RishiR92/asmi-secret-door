import { useState, useEffect } from 'react';
import { Users, Zap, TrendingUp, Mail, MessageSquare, Slack } from 'lucide-react';
import MobileOptimizedSection from './MobileOptimizedSection';

const WhyMessagingSection = () => {
  const [currentBenefit, setCurrentBenefit] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const benefits = [
    {
      icon: <Users className="text-green-400" size={24} />,
      title: "Massive existing reach",
      description: "Billions of users already on these platforms"
    },
    {
      icon: <Zap className="text-blue-400" size={24} />,
      title: "Lowest friction, immediate adoption",
      description: "No app download, instant setup"
    }
  ];

  const nextChannels = [
    { icon: <Mail size={20} />, name: "Mail", color: "text-red-400" },
    { icon: <Slack size={20} />, name: "Slack", color: "text-purple-400" },
    { icon: <MessageSquare size={20} />, name: "Teams", color: "text-blue-400" }
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

    const element = document.getElementById('why-messaging-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentBenefit(prev => {
        if (prev < benefits.length - 1) {
          return prev + 1;
        } else {
          setShowNext(true);
          return prev;
        }
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div id="why-messaging-section" className="min-h-screen bg-black flex items-center py-12">
      <MobileOptimizedSection>
        <div className="text-center space-y-8">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-space font-bold text-white leading-tight">
            Why WhatsApp and iMessage
          </h2>

          {/* Main Benefits */}
          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-gray-900/60 to-gray-800/40 border rounded-3xl p-8 backdrop-blur-sm transition-all duration-1000 transform ${
                  currentBenefit >= index 
                    ? 'border-white/30 opacity-100 scale-100 shadow-2xl shadow-white/10' 
                    : 'border-gray-700/20 opacity-30 scale-95'
                }`}
                style={{
                  animationDelay: `${index * 300}ms`
                }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`w-16 h-16 bg-gradient-to-br from-black/70 to-gray-900/50 rounded-full flex items-center justify-center transition-all duration-700 ${
                    currentBenefit >= index ? 'animate-pulse' : ''
                  }`}>
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Section */}
          {showNext && (
            <div className="animate-fade-in space-y-6 pt-12">
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-green-400 mb-4">
                  Next: High frequency channels
                </h3>
                
                <div className="flex flex-wrap justify-center gap-3">
                  {nextChannels.map((channel, index) => (
                    <div
                      key={channel.name}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-full bg-black/30 border border-gray-600/50 animate-scale-in hover:scale-105 transition-all duration-300`}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <span className={channel.color}>
                        {channel.icon}
                      </span>
                      <span className="text-white text-sm font-medium">
                        {channel.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </MobileOptimizedSection>
    </div>
  );
};

export default WhyMessagingSection;