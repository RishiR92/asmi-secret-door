import { useState, useEffect } from 'react';
import { Users, Zap, TrendingUp, Mail, MessageSquare, Slack } from 'lucide-react';
import MobileOptimizedSection from './MobileOptimizedSection';

const WhyMessagingSection = () => {
  const [currentBenefit, setCurrentBenefit] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const benefits = [
    {
      icon: <Users className="text-green-400" size={32} />,
      title: "Massive existing reach",
      description: "Billions of users already on these platforms"
    },
    {
      icon: <Zap className="text-blue-400" size={32} />,
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

          {/* Main Benefits - Mobile Optimized Grid */}
          <div className="grid grid-cols-1 gap-8 max-w-sm mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-gray-900/60 to-gray-800/40 border rounded-3xl p-8 backdrop-blur-sm transition-all duration-1000 ease-out ${
                  currentBenefit >= index 
                    ? 'border-white/30 opacity-100 scale-100 shadow-2xl shadow-white/10' 
                    : 'border-gray-700/30 opacity-30 scale-95'
                }`}
                style={{
                  animationDelay: `${index * 300}ms`,
                  transform: currentBenefit >= index ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight">
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

          {/* Next Section - Redesigned */}
          {showNext && (
            <div className="animate-fade-in space-y-6 pt-12">
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-6 border border-green-400/20">
                <h3 className="text-2xl font-bold text-green-400 mb-4">
                  Next: High frequency channels
                </h3>
                
                <div className="grid grid-cols-1 gap-3 max-w-xs mx-auto">
                  {nextChannels.map((channel, index) => (
                    <div
                      key={channel.name}
                      className={`flex items-center justify-center space-x-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-gray-900/70 to-gray-800/50 border border-gray-600/30 animate-scale-in hover:scale-105 transition-all duration-300`}
                      style={{ animationDelay: `${index * 300}ms` }}
                    >
                      <span className={`${channel.color} drop-shadow-lg`}>
                        {channel.icon}
                      </span>
                      <span className="text-white text-lg font-semibold">
                        {channel.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Enhancement - Centered */}
              <div className="flex justify-center space-x-6 pt-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500/30 to-green-600/20 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-3xl">💬</span>
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-full flex items-center justify-center animate-pulse" style={{ animationDelay: '500ms' }}>
                  <span className="text-3xl">📱</span>
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