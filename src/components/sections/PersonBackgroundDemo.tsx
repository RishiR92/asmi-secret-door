import { useState, useEffect, useRef } from 'react';
import { Calendar, FileText, CreditCard } from 'lucide-react';

const PersonBackgroundDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-start when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.4 }
    );

    const currentElement = document.getElementById('person-background-demo');
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Animation sequence
  useEffect(() => {
    if (!hasStarted) return;

    let timer: NodeJS.Timeout;

    const runSequence = async () => {
      // Step 0: User message appears
      setCurrentStep(0);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 1: Show typing
      setShowTyping(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 2: School header
      setShowTyping(false);
      setCurrentStep(1);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Step 3: Show typing
      setShowTyping(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 4: Homework
      setShowTyping(false);
      setCurrentStep(2);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Step 5: Show typing
      setShowTyping(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 6: Fee payment
      setShowTyping(false);
      setCurrentStep(3);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Step 7: Show typing
      setShowTyping(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 8: PTM
      setShowTyping(false);
      setCurrentStep(4);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Step 9: Show typing
      setShowTyping(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Step 10: Reminder question
      setShowTyping(false);
      setCurrentStep(5);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Loop back
      setCurrentStep(-1);
      setShowTyping(false);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      await new Promise(resolve => setTimeout(resolve, 500));
      runSequence();
    };

    runSequence();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [hasStarted]);

  // Auto-scroll
  useEffect(() => {
    if (scrollContainerRef.current && currentStep >= 0) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [currentStep, showTyping]);

  return (
    <div id="person-background-demo" className="min-h-screen w-full flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
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
              <p className="text-xs text-gray-400">{showTyping ? 'typing...' : 'online'}</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div 
            ref={scrollContainerRef}
            className="p-4 space-y-3 h-[500px] overflow-y-auto scroll-smooth" 
            style={{ backgroundColor: '#0B141A' }}
          >
            {/* User Message */}
            {currentStep >= 0 && (
              <div className="flex justify-end animate-slide-in-right">
                <div className="px-4 py-2.5 rounded-lg rounded-tr-sm max-w-[85%]" style={{ backgroundColor: '#005C4B' }}>
                  <span className="text-sm text-white">
                    Send me my kid's school updates every Saturday at 11 AM. If anything urgent — like fees, missed homework, or schedule changes — tell me right away.
                  </span>
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {showTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-1.5 px-3 py-2 rounded-lg" style={{ backgroundColor: '#1F2C34' }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#8696A0' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#8696A0', animationDelay: '0.1s' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#8696A0', animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}

            {/* Asmi Message 1 - Header */}
            {currentStep >= 1 && (
              <div className="flex justify-start animate-scale-in">
                <div className="px-4 py-2.5 rounded-lg rounded-tl-sm max-w-[85%]" style={{ backgroundColor: '#1F2C34' }}>
                  <span className="text-sm text-white font-medium">🏫 Greenfield School Weekly Update</span>
                </div>
              </div>
            )}

            {/* Asmi Message 2 - Homework */}
            {currentStep >= 2 && (
              <div className="flex justify-start animate-scale-in">
                <div className="px-4 py-2.5 rounded-lg rounded-tl-sm max-w-[85%]" style={{ backgroundColor: '#1F2C34' }}>
                  <div className="flex items-start space-x-2">
                    <FileText size={16} style={{ color: '#00A884', flexShrink: 0 }} className="mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white">2 homeworks due</p>
                      <p className="text-xs text-gray-400 mt-0.5">Math worksheet & Science project</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Asmi Message 3 - Fee Payment (with link) */}
            {currentStep >= 3 && (
              <div className="flex justify-start animate-scale-in">
                <div className="px-4 py-2.5 rounded-lg rounded-tl-sm max-w-[85%]" style={{ backgroundColor: '#1F2C34' }}>
                  <div className="flex items-start space-x-2">
                    <CreditCard size={16} style={{ color: '#EF4444', flexShrink: 0 }} className="mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white">Fee payment</p>
                      <p className="text-xs text-gray-400 mt-0.5">Deadline - 28th Oct</p>
                      <a href="#" className="text-xs mt-1 inline-block" style={{ color: '#00A884' }}>
                        pay.greenfieldschool.edu/fee2024
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Asmi Message 4 - PTM */}
            {currentStep >= 4 && (
              <div className="flex justify-start animate-scale-in">
                <div className="px-4 py-2.5 rounded-lg rounded-tl-sm max-w-[85%]" style={{ backgroundColor: '#1F2C34' }}>
                  <div className="flex items-start space-x-2">
                    <Calendar size={16} style={{ color: '#FBB024', flexShrink: 0 }} className="mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white">1 PTM on Tuesday</p>
                      <p className="text-xs text-gray-400 mt-0.5">Parent-Teacher Meeting at 4:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Asmi Message 5 - Reminder Text */}
            {currentStep >= 5 && (
              <div className="flex justify-start animate-scale-in">
                <div className="px-4 py-2.5 rounded-lg rounded-tl-sm max-w-[85%]" style={{ backgroundColor: '#1F2C34' }}>
                  <p className="text-sm text-white">Want me to set a reminder for Monday?</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs text-center mt-6" style={{ color: 'var(--text-secondary)' }}>
          Auto-compiled from school emails and calendar
        </p>
      </div>
    </div>
  );
};

export default PersonBackgroundDemo;
