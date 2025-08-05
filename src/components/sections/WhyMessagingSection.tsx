import { useState, useEffect } from 'react';
import { Users, Zap, TrendingUp, Mail, MessageSquare, Slack } from 'lucide-react';
import MobileOptimizedSection from './MobileOptimizedSection';

const WhyMessagingSection = () => {
  const [currentBenefit, setCurrentBenefit] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleChannels, setVisibleChannels] = useState(0);

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
    { icon: <Slack size={20} />, name: "Slack", color: "text-purple-400" }
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

  useEffect(() => {
    if (!showNext) return;

    const channelTimers = [
      setTimeout(() => setVisibleChannels(1), 300),
      setTimeout(() => setVisibleChannels(2), 800)
    ];

    return () => channelTimers.forEach(clearTimeout);
  }, [showNext]);

  return (
    <div id="why-messaging-section" className="h-screen bg-black flex items-center justify-center py-4">
      <div className="px-4 w-full max-w-sm mx-auto">
        <div className="text-center space-y-4">
          {/* Title */}
          <h2 className="text-xl font-bold text-white leading-tight mb-6">
            Why WhatsApp and iMessage
          </h2>

          {/* Main Benefits */}
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r from-gray-900/60 to-gray-800/40 border rounded-2xl p-4 backdrop-blur-sm transition-all duration-1000 transform ${
                  currentBenefit >= index 
                    ? 'border-white/30 opacity-100 scale-100' 
                    : 'border-gray-700/20 opacity-30 scale-95'
                }`}
                style={{
                  animationDelay: `${index * 300}ms`
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-black/70 to-gray-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Section */}
          {showNext && (
            <div className="animate-fade-in space-y-3 pt-6">
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/30 rounded-xl p-4 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-green-400 mb-3">
                  Next: High frequency channels
                </h3>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {nextChannels.map((channel, index) => (
                    <div
                      key={channel.name}
                      className={`flex items-center space-x-1 px-3 py-2 rounded-full bg-black/30 border border-gray-600/50 transition-all duration-300 ${
                        visibleChannels > index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                    >
                      <span className={channel.color}>
                        {channel.icon}
                      </span>
                      <span className="text-white text-xs font-medium">
                        {channel.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhyMessagingSection;
