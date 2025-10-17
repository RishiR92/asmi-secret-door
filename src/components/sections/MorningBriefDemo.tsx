
import { useEffect, useRef, useState } from 'react';
import { Briefcase, Clock, TrendingUp } from 'lucide-react';
import ChatMessage from './morning-brief-demo/ChatMessage';
import TypingIndicator from './morning-brief-demo/TypingIndicator';

type MorningBriefDemoProps = {
  isActive?: boolean;
};

const MorningBriefDemo = ({ isActive = false }: MorningBriefDemoProps) => {
  // Step flow: 0=user msg, 1=typing, 2=intro msg, 3=typing, 4=metrics card, 5=typing, 6=final msg
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Content
  const userMessage =
    "For the next 7 days, send me a daily 6 PM hiring update — how many offers we rolled out, for which roles, compensation bands, and any pending approvals.";
  const asmiIntro = "Here's your Day 3 hiring update:";
  const offersDetails = '3 Backend @ $140K, 2 Design @ $110K, 2 Ops @ $95K';
  const approvalsDetails = 'Growth + Marketing roles — waiting on finance sign-off';
  const marketDetails = "AI PM offers are now trending +12% in SF — you're below median.";
  const finalMessage = 'Want me to send a note for finance to expedite approvals?';

  // Timings
  const TYPING_MS = 600;
  const MESSAGE_MS = 900;
  const LOOP_PAUSE_MS = 1800;

  // Reset when slide becomes inactive; start fresh when active
  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsTyping(false);
      setStep(0);
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      return;
    }
    // When activated, ensure we start from the beginning
    setIsTyping(false);
    setStep(0);
  }, [isActive]);

  // Scheduler for step progression
  useEffect(() => {
    if (!isActive) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    // Typing steps
    if (step === 1 || step === 3 || step === 5) {
      setIsTyping(true);
      timerRef.current = setTimeout(() => {
        setIsTyping(false);
        setStep((s) => s + 1);
      }, TYPING_MS);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    // Non-typing steps: show content, then advance
    const delay = step === 6 ? LOOP_PAUSE_MS : MESSAGE_MS;
    timerRef.current = setTimeout(() => {
      if (step === 6) {
        // Loop back after short pause
        setStep(0);
        if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      } else {
        setStep((s) => s + 1);
      }
    }, step === 0 ? MESSAGE_MS : delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, step]);

  // Auto-scroll within the container
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [step, isTyping]);

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
              <p className="text-xs text-gray-400">{isTyping ? 'typing...' : 'online'}</p>
            </div>
          </div>

          {/* Messages - WhatsApp style */}
          <div
            ref={scrollContainerRef}
            className="p-4 space-y-3 h-[500px] relative overflow-y-auto scroll-smooth"
            style={{ backgroundColor: '#0B141A' }}
          >
            {/* 0: User message */}
            <ChatMessage type="user" text={userMessage} isVisible={isActive && step >= 0} />

            {/* 1: Typing */}
            <TypingIndicator isVisible={isActive && isTyping && step === 1} />

            {/* 2: Asmi intro */}
            <ChatMessage type="asmi" text={asmiIntro} isVisible={isActive && step >= 2} />

            {/* 3: Typing */}
            <TypingIndicator isVisible={isActive && isTyping && step === 3} />

            {/* 4: Metrics card */}
            {isActive && step >= 4 && (
              <div className="flex justify-start animate-scale-in">
                <div className="rounded-lg p-4 max-w-[85%] space-y-3" style={{ backgroundColor: '#1F2C34' }}>
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
                      <p className="text-xs text-gray-400 mt-0.5">{offersDetails}</p>
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
                      <p className="text-xs text-gray-400 mt-0.5">{approvalsDetails}</p>
                    </div>
                  </div>

                  {/* Market Alert */}
                  <div className="flex items-start space-x-2">
                    <TrendingUp size={14} style={{ color: '#EF4444', flexShrink: 0 }} className="mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">Market Alert</p>
                      <p className="text-xs text-gray-400 mt-0.5">{marketDetails}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5: Typing */}
            <TypingIndicator isVisible={isActive && isTyping && step === 5} />

            {/* 6: Final message */}
            <ChatMessage type="asmi" text={finalMessage} isVisible={isActive && step >= 6} />

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
