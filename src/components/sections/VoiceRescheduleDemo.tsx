
import { useState, useEffect } from 'react';
import { Mic } from 'lucide-react';
import MobileOptimizedSection from './MobileOptimizedSection';
import VoiceMessage from './voice-reschedule-demo/VoiceMessage';
import ProcessingMessage from './voice-reschedule-demo/ProcessingMessage';
import MeetingDetails from './voice-reschedule-demo/MeetingDetails';
import PhoneStatusBar from './voice-reschedule-demo/PhoneStatusBar';
import ChatHeader from './voice-reschedule-demo/ChatHeader';
import TypingIndicator from './voice-reschedule-demo/TypingIndicator';

const VoiceRescheduleDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioWaves, setAudioWaves] = useState<number[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [showVoiceMessage, setShowVoiceMessage] = useState(true);
  const [showTextMessage, setShowTextMessage] = useState(false);

  // Generate random audio wave heights
  useEffect(() => {
    const generateWaves = () => {
      const waves = Array.from({ length: 12 }, () => Math.random() * 6 + 2);
      setAudioWaves(waves);
    };

    let waveInterval: NodeJS.Timeout;
    if (isRecording) {
      generateWaves();
      waveInterval = setInterval(generateWaves, 150);
    }

    return () => {
      if (waveInterval) clearInterval(waveInterval);
    };
  }, [isRecording]);

  // Demo flow control
  useEffect(() => {
    const stepTimings = [
      { step: 0, delay: 1000, action: () => { setIsRecording(true); } },
      { step: 1, delay: 3000, action: () => { setIsRecording(false); } },
      { step: 2, delay: 800, action: () => { setShowVoiceMessage(false); setShowTextMessage(true); setShowTyping(true); } },
      { step: 3, delay: 1500, action: () => { setShowTyping(false); } },
      { step: 4, delay: 3000, action: () => {} },
      { step: 5, delay: 4000, action: () => { setCurrentStep(0); setShowVoiceMessage(true); setShowTextMessage(false); } }
    ];

    const currentTiming = stepTimings[currentStep];
    if (currentTiming) {
      const timer = setTimeout(() => {
        currentTiming.action();
        if (currentStep < stepTimings.length - 1) {
          setCurrentStep(prev => prev + 1);
        }
      }, currentTiming.delay);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const meetingData = {
    original: "TBD",
    new: "7:00 PM - 8:00 PM", 
    attendees: "You, Sam Peterson",
    location: "State Bird Provisions, SF"
  };

  return (
    <MobileOptimizedSection maxWidth="xs" padding="sm">
      <div className="space-y-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <Mic className="text-red-400" size={16} />
          </div>
          <h2 className="text-xl font-bold text-white leading-tight">
            Just speak. It's done.
          </h2>
        </div>

        {/* Phone Demo */}
        <div className="bg-gray-900 rounded-2xl overflow-hidden mx-auto max-w-[280px] shadow-xl">
          {/* Status Bar */}
          <PhoneStatusBar isRecording={isRecording} />
          
          {/* Chat Header */}
          <ChatHeader isRecording={isRecording} />

          {/* Chat Messages */}
          <div className="bg-black min-h-[320px] p-3 space-y-3">
            {/* Voice Message */}
            <VoiceMessage 
              text="Meeting with Sam over dinner. Find a good place in Downtown SF & block 1 hour."
              isRecording={isRecording}
              audioWaves={audioWaves}
              isVisible={showVoiceMessage && currentStep >= 0}
            />

            {/* Text Message (converted from voice) */}
            {showTextMessage && (
              <div className="flex justify-end animate-slide-in-right">
                <div className="bg-blue-600 px-4 py-3 rounded-2xl rounded-tr-sm max-w-xs">
                  <span className="text-white text-sm">Meeting with Sam over dinner. Find a good place in Downtown SF & block 1 hour.</span>
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            <TypingIndicator isVisible={showTyping} />

            {/* Success Message */}
            <ProcessingMessage 
              type="confirmation" 
              text="Perfect! Found 3 great spots. Booked table at State Bird Provisions for 7PM. Sam confirmed & calendar updated."
              isVisible={currentStep >= 3}
            />

            {/* Meeting Details */}
            <MeetingDetails 
              data={meetingData}
              isVisible={currentStep >= 4}
            />
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-gray-400 text-xs text-center font-light">
          Voice → Understanding → Action in seconds
        </p>
      </div>
    </MobileOptimizedSection>
  );
};

export default VoiceRescheduleDemo;
