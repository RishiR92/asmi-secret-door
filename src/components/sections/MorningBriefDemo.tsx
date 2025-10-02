
import { useState, useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import PhoneHeader from './morning-brief-demo/PhoneHeader';
import ChatMessage from './morning-brief-demo/ChatMessage';
import EmailActionCard from './morning-brief-demo/EmailActionCard';
import DraftReplyCard from './morning-brief-demo/DraftReplyCard';
import TypingIndicator from './morning-brief-demo/TypingIndicator';

const MorningBriefDemo = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const messages = [
    { type: 'user', text: 'Show me today\'s priorities', delay: 520 },
    { type: 'typing', delay: 390 },
    { type: 'asmi', text: 'Here are your urgent action items:', delay: 520 },
    { type: 'typing', delay: 390 },
    { 
      type: 'email1',
      sender: 'Michael Zhang - Sequoia Capital',
      subject: 'Re: Investment Discussion Follow-up',
      snippet: 'I wanted to circle back on our conversation about the Series A round. Would love to...',
      daysOverdue: 3,
      priority: 'high' as const,
      delay: 1040
    },
    { type: 'typing', delay: 390 },
    { type: 'asmi', text: 'I can draft a reply for you:', delay: 520 },
    { type: 'typing', delay: 390 },
    { 
      type: 'draft',
      text: 'Hi Michael, apologies for the delay. I\'d love to continue our discussion about the Series A. How does Thursday at 2pm work for a call? Looking forward to exploring this further.',
      delay: 1560
    },
    { type: 'typing', delay: 390 },
    { 
      type: 'email2',
      sender: 'Sarah Chen - Partner at TechVentures',
      subject: 'Partnership Proposal - Follow-up',
      snippet: 'Following up on our discussion about the strategic partnership. Would love to...',
      priority: 'medium' as const,
      delay: 1040
    },
    { type: 'typing', delay: 390 },
    { 
      type: 'email3',
      sender: 'Contract Deadline - Acme Corp',
      subject: 'Client Contract Review Needed',
      snippet: 'The revised contract needs your final approval before we can proceed. Due today...',
      priority: 'high' as const,
      delay: 1040
    }
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

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (messagesEndRef.current && scrollContainerRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [currentMessage]);

  return (
    <div id="morning-brief-demo" className="min-h-screen w-full flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-[400px] mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-high)' }}>Inbox → Actionable Updates</h2>
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

            <EmailActionCard 
              sender={messages[4].sender}
              subject={messages[4].subject}
              snippet={messages[4].snippet}
              daysOverdue={messages[4].daysOverdue}
              priority={messages[4].priority}
              isVisible={currentMessage >= 5} 
            />

            <TypingIndicator isVisible={isTyping && currentMessage >= 5 && currentMessage < 7} />

            <ChatMessage 
              type="asmi" 
              text={messages[6].text} 
              isVisible={currentMessage >= 7} 
            />

            <TypingIndicator isVisible={isTyping && currentMessage >= 7 && currentMessage < 9} />

            <DraftReplyCard 
              draftText={messages[8].text}
              isVisible={currentMessage >= 9} 
            />

            <TypingIndicator isVisible={isTyping && currentMessage >= 9 && currentMessage < 11} />

            <EmailActionCard 
              sender={messages[10].sender}
              subject={messages[10].subject}
              snippet={messages[10].snippet}
              priority={messages[10].priority}
              isVisible={currentMessage >= 11} 
            />

            <TypingIndicator isVisible={isTyping && currentMessage >= 11 && currentMessage < 13} />

            <EmailActionCard 
              sender={messages[12].sender}
              subject={messages[12].subject}
              snippet={messages[12].snippet}
              priority={messages[12].priority}
              isVisible={currentMessage >= 13} 
            />

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />

            {/* Floating action indicators */}
            {currentMessage >= 3 && (
              <div className="absolute bottom-4 right-4 space-y-2">
                <div className="bg-green-500/20 border border-green-400/40 rounded-full p-2">
                  <MessageCircle size={12} className="text-green-400" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center mt-6">
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            Draft replies and send directly from the same interface
          </p>
        </div>
      </div>
    </div>
  );
};

export default MorningBriefDemo;
