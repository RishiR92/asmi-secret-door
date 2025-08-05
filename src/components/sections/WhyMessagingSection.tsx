import { useState, useEffect } from 'react';
import { Users, Zap, Mail, MessageSquare, Slack, ArrowRight } from 'lucide-react';

const WhyMessagingSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const benefits = [
    {
      icon: <Users className="text-emerald-400" size={20} />,
      title: "Billions already here",
      description: "No downloads needed"
    },
    {
      icon: <Zap className="text-amber-400" size={20} />,
      title: "Instant adoption",
      description: "Zero friction setup"
    }
  ];

  const nextChannels = [
    { icon: <Mail size={16} />, name: "Mail", color: "text-rose-400" },
    { icon: <Slack size={16} />, name: "Slack", color: "text-violet-400" },
    { icon: <MessageSquare size={16} />, name: "Teams", color: "text-cyan-400" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('why-messaging-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const sequence = async () => {
      // Show title first
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentStep(1);
      
      // Show first benefit
      await new Promise(resolve => setTimeout(resolve, 800));
      setCurrentStep(2);
      
      // Show second benefit
      await new Promise(resolve => setTimeout(resolve, 800));
      setCurrentStep(3);
      
      // Show next channels
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentStep(4);
    };

    sequence();
  }, [isVisible]);

  return (
    <div id="why-messaging-section" className="min-h-screen bg-black flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm mx-auto space-y-8">
        {/* Title */}
        <div className={`text-center transition-all duration-800 ${
          currentStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h2 className="text-2xl font-bold text-white mb-2">
            Why messaging?
          </h2>
          <p className="text-gray-400 text-sm">
            Start where people already are
          </p>
        </div>

        {/* Benefits */}
        <div className="space-y-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                currentStep >= index + 2 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-6 scale-95'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-base mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Channels */}
        <div className={`transition-all duration-800 ${
          currentStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-400/20 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-emerald-400 font-semibold text-sm">
                Coming next
              </h3>
              <ArrowRight className="text-emerald-400" size={16} />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {nextChannels.map((channel, index) => (
                <div
                  key={channel.name}
                  className={`bg-black/20 border border-white/10 rounded-xl p-3 text-center animate-fade-in hover:scale-105 transition-all duration-300`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`${channel.color} mb-2 flex justify-center`}>
                    {channel.icon}
                  </div>
                  <span className="text-white text-xs font-medium">
                    {channel.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className={`flex justify-center transition-all duration-800 ${
          currentStep >= 4 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default WhyMessagingSection;