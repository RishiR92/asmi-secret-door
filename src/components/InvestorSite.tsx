import { useState, useEffect } from 'react';
import SwipeableContainer from './SwipeableContainer';
import InteractiveHeroSection from './sections/InteractiveHeroSection';
import AsmiIntroSection from './sections/AsmiIntroSection';
import MorningBriefDemo from './sections/MorningBriefDemo';
import MeetingContextDemo from './sections/MeetingContextDemo';
import PersonBackgroundDemo from './sections/PersonBackgroundDemo';
import VoiceRescheduleDemo from './sections/VoiceRescheduleDemo';
import MemoryEngineSection from './sections/MemoryEngineSection';
import TimelineHowItWorks from './sections/TimelineHowItWorks';
import FounderSectionNew from './sections/FounderSectionNew';
import TractionSectionNew from './sections/TractionSectionNew';
import VoiceToOSSection from './sections/VoiceToOSSection';
import WhyMessagingSection from './sections/WhyMessagingSection';
import PersonalOSTimelineSection from './sections/PersonalOSTimelineSection';
import BuiltForEveryoneSection from './sections/BuiltForEveryoneSection';
import FinalCTASectionNew from './sections/FinalCTASectionNew';

const InvestorSite = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const sections = [
    { component: InteractiveHeroSection, title: 'Hero' },
    { component: AsmiIntroSection, title: 'Asmi Intro' },
    { component: MorningBriefDemo, title: 'Morning Brief' },
    { component: MeetingContextDemo, title: 'Meeting Context' },
    { component: PersonBackgroundDemo, title: 'Person Background' },
    { component: VoiceRescheduleDemo, title: 'Voice Reschedule' },
    { component: MemoryEngineSection, title: 'Memory Engine' },
    { component: TimelineHowItWorks, title: 'How It Works' },
    { component: FounderSectionNew, title: 'Founders' },
    { component: TractionSectionNew, title: 'Traction' },
    { component: WhyMessagingSection, title: 'Why Messaging' },
    { component: PersonalOSTimelineSection, title: 'Personal OS Timeline' },
    { component: VoiceToOSSection, title: 'Voice to OS' },
    { component: BuiltForEveryoneSection, title: 'Built for Everyone' },
    { component: FinalCTASectionNew, title: 'CTA' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSectionChange = (index: number) => {
    setCurrentSection(index);
  };

  return (
    <div className={`bg-black text-white overflow-hidden font-inter transition-all duration-1000 ${
      isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
    }`}>
      {/* Smooth entrance overlay */}
      <div className={`fixed inset-0 bg-gradient-to-br from-green-900/20 via-black to-purple-900/20 z-50 transition-all duration-1000 pointer-events-none ${
        isLoaded ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-2 border-green-400 rounded-full animate-spin mb-4 mx-auto"></div>
            <p className="text-green-400 text-lg font-light">Entering the future...</p>
          </div>
        </div>
      </div>

      <SwipeableContainer onSectionChange={handleSectionChange}>
        {sections.map((Section, index) => (
          <div key={index} className="w-full h-full">
            <Section.component />
          </div>
        ))}
      </SwipeableContainer>
    </div>
  );
};

export default InvestorSite;
