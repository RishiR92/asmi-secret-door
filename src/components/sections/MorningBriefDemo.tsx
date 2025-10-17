
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

    const timer = setTimeout(() => {
      if (currentMessage < messages.length) {
        const currentMsg = messages[currentMessage];
        
        if (currentMsg.type === 'typing') {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setCurrentMessage(prev => prev + 1);
          }, 500);
        } else {
          setCurrentMessage(prev => prev + 1);
        }
      } else {
        // Loop back to start after a pause
        setTimeout(() => {
          setCurrentMessage(0);
          setIsComplete(false);
          // Scroll to top when restarting
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
          }
        }, 2000);
      }
    }, (messages[currentMessage]?.delay || 300) * 0.8);

    return () => clearTimeout(timer);
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
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-high)' }}>Asmi turns your 7-day hiring sprint into one clean daily dashboard — inside chat.</h2>
        </div>

        {/* Phone mockup - Mobile optimized */}
        <div className="rounded-3xl border overflow-hidden shadow-2xl w-full mx-auto" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'rgba(255, 255, 255, 0.12)' }}>
          <PhoneHeader isTyping={isTyping} />

          {/* Messages - Mobile optimized height */}
          <div 
            ref={scrollContainerRef}
            className="p-4 space-y-4 bg-gradient-to-b from-[#121214] to-[#1F1F23] h-[500px] relative overflow-y-auto scroll-smooth"
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

            <HiringMetricCard 
              title={messages[4].title}
              value={messages[4].value}
              details={messages[4].details}
              icon={Briefcase}
              priority={messages[4].priority}
              isVisible={currentMessage >= 5} 
            />

            <TypingIndicator isVisible={isTyping && currentMessage >= 5 && currentMessage < 7} />

            <HiringMetricCard 
              title={messages[6].title}
              value={messages[6].value}
              details={messages[6].details}
              icon={Clock}
              priority={messages[6].priority}
              isVisible={currentMessage >= 7} 
            />

            <TypingIndicator isVisible={isTyping && currentMessage >= 7 && currentMessage < 9} />

            <HiringMetricCard 
              title={messages[8].title}
              value={messages[8].value}
              details={messages[8].details}
              icon={TrendingUp}
              priority={messages[8].priority}
              isVisible={currentMessage >= 9} 
            />

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
