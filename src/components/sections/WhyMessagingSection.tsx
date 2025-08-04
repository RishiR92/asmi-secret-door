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
    },
    {
      icon: <TrendingUp className="text-purple-400" size={24} />,
      title: "Faster growth with viral hooks",
      description: "Share experiences naturally within conversations"
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
    }, 2000);

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
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-gray-900/50 border rounded-2xl p-6 backdrop-blur-sm transition-all duration-700 ${
                  currentBenefit >= index 
                    ? 'border-white/20 opacity-100 scale-100' 
                    : 'border-gray-700/30 opacity-40 scale-95'
                }`}
              >
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Section */}
          {showNext && (
            <div className="animate-fade-in space-y-4 pt-8 border-t border-gray-800">
              <h3 className="text-xl font-semibold text-green-400">
                Next: High frequency channels
              </h3>
              
              <div className="flex justify-center space-x-6">
                {nextChannels.map((channel, index) => (
                  <div
                    key={channel.name}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-900/50 border border-gray-700 animate-fade-in`}
                    style={{ animationDelay: `${index * 200}ms` }}
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
          )}

          {/* Visual Enhancement */}
          <div className="flex justify-center space-x-8 pt-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">📱</span>
            </div>
          </div>
        </div>
      </MobileOptimizedSection>
    </div>
  );
};

export default WhyMessagingSection;