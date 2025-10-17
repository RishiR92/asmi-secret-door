
import { useState, useEffect, useRef } from 'react';
import { Briefcase, Clock, TrendingUp } from 'lucide-react';
import PhoneHeader from './morning-brief-demo/PhoneHeader';
import ChatMessage from './morning-brief-demo/ChatMessage';
import HiringMetricCard from './morning-brief-demo/HiringMetricCard';
import TypingIndicator from './morning-brief-demo/TypingIndicator';

const MorningBriefDemo = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const messages = [
    { type: 'user', text: 'For the next 7 days, send me a daily 6 PM hiring update — how many offers we rolled out, for which roles, compensation bands, and any pending approvals.', delay: 520 },
    { type: 'typing', delay: 390 },
    { type: 'asmi', text: 'Here\'s your Day 3 hiring update:', delay: 520 },
    { type: 'typing', delay: 390 },
    { 
      type: 'metric1',
      title: 'Offers Rolled Out',
      value: '7',
      details: '3 Backend @ $140K, 2 Design @ $110K, 2 Ops @ $95K',
      icon: 'Briefcase',
      priority: 'success' as const,
      delay: 1040
    },
    { type: 'typing', delay: 390 },
    { 
      type: 'metric2',
      title: 'Approvals Pending',
      value: '4',
      details: 'Growth + Marketing roles — waiting on finance sign-off',
      icon: 'Clock',
      priority: 'warning' as const,
      delay: 1040
    },
    { type: 'typing', delay: 390 },
    { 
      type: 'metric3',
      title: 'Market Alert',
      value: '',
      details: 'AI PM offers are now trending +12% in SF — you\'re below median.',
      icon: 'TrendingUp',
      priority: 'alert' as const,
      delay: 1040
    },
    { type: 'typing', delay: 390 },
    { type: 'asmi', text: 'Want me to send a note for finance to expedite approvals?', delay: 520 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        });
      },
      { threshold: 0.4 } // More sensitive for mobile
    );

    const currentElement = document.getElementById('morning-brief-demo');
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let timer: NodeJS.Timeout;

    if (currentMessage < messages.length) {
      const currentMsg = messages[currentMessage];
      const delay = currentMsg.type === 'typing' ? 800 : 1500;
      
      timer = setTimeout(() => {
        if (currentMsg.type === 'typing') {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setCurrentMessage(prev => prev + 1);
          }, 800);
        } else {
          setCurrentMessage(prev => prev + 1);
        }
      }, delay);
    } else {
      // Loop back to start after a pause
      timer = setTimeout(() => {
        setIsTyping(false);
        setCurrentMessage(0);
        setIsComplete(false);
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentMessage, hasStarted, messages]);

  // Auto-scroll to bottom when new messages appear (within container only)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [currentMessage]);

  return (
    <div id="morning-brief-demo" className="min-h-screen w-full flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-[400px] mx-auto py-8">
        {/* WhatsApp-style chat interface */}
        <div className="rounded-2xl overflow-hidden shadow-2xl w-full mx-auto" style={{ backgroundColor: '#0B141A' }}>
          {/* WhatsApp Header */}
          <div className="px-4 py-3 flex items-center space-x-3" style={{ backgroundColor: '#202C33' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: '#00A884' }}>
              A
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white text-sm">Asmi</h3>
              <p className="text-xs text-gray-400">
                {isTyping ? 'typing...' : 'online'}
              </p>
            </div>
          </div>

          {/* Messages - WhatsApp style */}
          <div 
            ref={scrollContainerRef}
            className="p-4 space-y-3 h-[500px] relative overflow-y-auto scroll-smooth"
            style={{ backgroundColor: '#0B141A' }}
          >
            <ChatMessage 
              type="user" 
              text={messages[0].text} 
              isVisible={currentMessage >= 1} 
            />

            <TypingIndicator isVisible={isTyping && currentMessage >= 1 && currentMessage < 3} />

            <ChatMessage 
              type="asmi" 
              text={messages[2].text} 
              isVisible={currentMessage >= 3} 
            />

            <TypingIndicator isVisible={isTyping && currentMessage >= 3 && currentMessage < 5} />

            {/* Hiring Report Card */}
            {currentMessage >= 5 && (
              <div className="flex justify-start animate-scale-in">
                <div 
                  className="rounded-lg p-4 max-w-[85%] space-y-3" 
                  style={{ backgroundColor: '#1F2C34' }}
                >
                  <div className="flex items-center space-x-2 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <span className="text-base">📊</span>
                    <h4 className="font-semibold text-sm text-white">Hiring Sprint — Day 3</h4>
                  </div>

                  {/* Offers Rolled Out */}
                  <div className="flex items-start space-x-2">
                    <Briefcase size={14} style={{ color: '#00A884', flexShrink: 0 }} className="mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-baseline space-x-2">
                        <p className="text-sm font-semibold text-white">Offers Rolled Out</p>
                        <p className="text-base font-bold" style={{ color: '#00A884' }}>7</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{messages[4].details}</p>
                    </div>
                  </div>

                  {/* Approvals Pending */}
                  <div className="flex items-start space-x-2">
                    <Clock size={14} style={{ color: '#FBB024', flexShrink: 0 }} className="mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-baseline space-x-2">
                        <p className="text-sm font-semibold text-white">Approvals Pending</p>
                        <p className="text-base font-bold" style={{ color: '#FBB024' }}>4</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{messages[6].details}</p>
                    </div>
                  </div>

                  {/* Market Alert */}
                  <div className="flex items-start space-x-2">
                    <TrendingUp size={14} style={{ color: '#EF4444', flexShrink: 0 }} className="mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">Market Alert</p>
                      <p className="text-xs text-gray-400 mt-0.5">{messages[8].details}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <TypingIndicator isVisible={isTyping && currentMessage >= 9 && currentMessage < 11} />

            <ChatMessage 
              type="asmi" 
              text={messages[10].text} 
              isVisible={currentMessage >= 11} 
            />

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center mt-6">
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Real-time hiring insights compiled from mail, calendar, and market data
          </p>
        </div>
      </div>
    </div>
  );
};

export default MorningBriefDemo;
