
import { useState, useEffect } from 'react';
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

  const messages = [
    { type: 'user', text: 'Show me today\'s priorities', delay: 400 },
    { type: 'typing', delay: 500 },
    { type: 'asmi', text: 'Here are your urgent action items:', delay: 500 },
    { type: 'typing', delay: 500 },
    { 
      type: 'email1',
      sender: 'Michael Zhang - Sequoia Capital',
      subject: 'Re: Investment Discussion Follow-up',
      snippet: 'I wanted to circle back on our conversation about the Series A round. Would love to...',
      daysOverdue: 3,
      priority: 'high' as const,
      delay: 400
    },
    { type: 'typing', delay: 500 },
    { type: 'asmi', text: 'I can draft a reply for you:', delay: 500 },
    { type: 'typing', delay: 500 },
    { 
      type: 'draft',
      text: 'Hi Michael, apologies for the delay. I\'d love to continue our discussion about the Series A. How does Thursday at 2pm work for a call? Looking forward to exploring this further.',
      delay: 400
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
    if (!hasStarted || isComplete) return;

    const timer = setTimeout(() => {
      if (currentMessage < messages.length) {
        const currentMsg = messages[currentMessage];
        
        if (currentMsg.type === 'typing') {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setCurrentMessage(prev => prev + 1);
          }, 700); // Faster typing
        } else {
          setCurrentMessage(prev => prev + 1);
        }
      } else {
        setIsComplete(true);
      }
    }, messages[currentMessage]?.delay || 300);

    return () => clearTimeout(timer);
  }, [currentMessage, hasStarted, isComplete]);

  return (
    <div id="morning-brief-demo" className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="max-w-xs sm:max-w-sm mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="text-yellow-400 mx-auto mb-3 sm:mb-4 text-3xl sm:text-4xl">☀️</div>
          <h2 className="text-xl sm:text-2xl font-light text-white mb-2 px-2">Start your day smart.</h2>
        </div>

        {/* Phone mockup - Fixed size */}
        <div className="bg-black/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-green-400/30 overflow-hidden shadow-2xl relative w-full max-w-[320px] mx-auto">
          <PhoneHeader isTyping={isTyping} />

          {/* Messages - Fixed height container */}
          <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gradient-to-b from-gray-900 to-black h-[400px] sm:h-[450px] relative overflow-hidden">
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

            {/* Floating action indicators */}
            {currentMessage >= 3 && (
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 space-y-2">
                <div className="bg-green-500/20 border border-green-400/40 rounded-full p-1.5 sm:p-2">
                  <MessageCircle size={10} className="text-green-400 sm:w-3 sm:h-3" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center mt-4 sm:mt-6 px-4">
          <span className="text-gray-400 text-xs sm:text-sm font-light">
            Draft replies and send directly from the same interface
          </span>
        </div>
      </div>
    </div>
  );
};

export default MorningBriefDemo;
