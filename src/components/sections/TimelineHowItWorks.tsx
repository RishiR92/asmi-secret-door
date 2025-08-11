
import { useState, useEffect, useRef } from 'react';
import { Mic, Link, Brain } from 'lucide-react';

const TimelineHowItWorks = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [showHighlight, setShowHighlight] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      step: "Step 1",
      title: "Post meeting brief",
      description: '"Had a great call with Raj about the partnership. He\'s interested in the API integration."',
      icon: <Mic className="text-green-400" size={20} />,
    },
    {
      step: "Step 2",
      title: "Context linked",
      description: "Asmi connects: Raj → Partnership → API → Your roadmap → Previous technical discussions + Email thread about API specs + Calendar meetings with Raj",
      icon: <Link className="text-green-400" size={20} />,
    },
    {
      step: "Step 3",
      title: "Deep insights generated",
      description: "Raj (CTO at TechCorp) → Met 3x this quarter → Always asks about scalability → Prefers technical demos → Decision maker for $50K+ deals → Best contact time: 2-4 PM → Responds well to data-driven pitches",
      icon: <Brain className="text-green-400" size={20} />,
    }
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

    const timer = setTimeout(() => {
      steps.forEach((_, index) => {
        setTimeout(() => {
          setVisibleSteps(prev => [...prev, index]);
        }, index * 600);
      });
      
      // Show highlight after all steps are visible
      setTimeout(() => {
        setShowHighlight(true);
      }, steps.length * 600 + 400);
    }, 300);

    return () => clearTimeout(timer);
  }, [isVisible, steps.length]);

  return (
    <div ref={sectionRef} className="h-screen bg-black flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-sm mx-auto space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-400">See how it flows.</p>
          <h1 className="text-2xl font-bold text-white leading-tight">
            From Brief to Brilliance.
          </h1>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative transition-all duration-700 transform ${
                visibleSteps.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Timeline Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-5 top-12 w-0.5 h-12 bg-green-400/30 z-0" />
              )}
              
              {/* Timeline Item */}
              <div className="relative flex items-start space-x-4">
                {/* Icon Circle */}
                <div className="w-10 h-10 bg-transparent border-2 border-green-400 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                  {step.icon}
                </div>
                
                {/* Content */}
                <div className="text-left space-y-1 pt-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white">{step.step}:</span>
                    <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Highlight */}
        {showHighlight && (
          <div className={`transition-all duration-700 transform ${
            showHighlight ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-center">
              <p className="text-lg font-bold text-white leading-tight">
                Asmi compounds each day to become super-intelligent, high agency version of yourself.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineHowItWorks;
