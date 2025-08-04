
import { useState, useEffect } from 'react';
import MobileOptimizedSection from './MobileOptimizedSection';

const AsmiIntroSection = () => {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showPlatforms, setShowPlatforms] = useState(false);
  const [currentPlatform, setCurrentPlatform] = useState(0);
  const [showTags, setShowTags] = useState(false);
  const [activeTags, setActiveTags] = useState<number[]>([]);

  const fullText = "The Context Layer for Personal Super-intelligence";
  const platforms = ["WhatsApp", "iMessage"];
  const tags = ["Calendar", "Meeting Preps", "Mails"];

  // Typewriter effect
  useEffect(() => {
    setIsTyping(true);
    let i = 0;
    
    const typeInterval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.substring(0, i));
        i++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setShowPlatforms(true);
        
        // Show tags after platforms are visible
        setTimeout(() => {
          setShowTags(true);
        }, 1500);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, []);

  // Platform scroll effect
  useEffect(() => {
    if (showPlatforms) {
      const platformInterval = setInterval(() => {
        setCurrentPlatform(prev => (prev + 1) % platforms.length);
      }, 2000);

      return () => clearInterval(platformInterval);
    }
  }, [showPlatforms]);

  // Tag animation effect
  useEffect(() => {
    if (showTags) {
      tags.forEach((_, index) => {
        setTimeout(() => {
          setActiveTags(prev => [...prev, index]);
        }, index * 500);
      });
    }
  }, [showTags]);

  return (
    <MobileOptimizedSection maxWidth="md">
      <div className="space-y-8 text-center">
        {/* Main Text with Typewriter Effect */}
        <div className="space-y-6">
          <div className="text-3xl md:text-4xl font-space font-bold text-white leading-tight min-h-[120px] flex items-center justify-center">
            <div className="text-center">
              {typedText}
              {isTyping && <span className="animate-pulse text-green-400">|</span>}
            </div>
          </div>

          {/* Visual Enhancement */}
          {showPlatforms && (
            <div className="flex items-center justify-center space-x-4 animate-fade-in">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-green-400 text-2xl">💬</span>
              </div>
              <div className="w-px h-8 bg-gray-600"></div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-blue-400 text-2xl">📱</span>
              </div>
            </div>
          )}
        </div>

        {/* Feature Tags */}
        {showTags && (
          <div className="flex items-center justify-center space-x-4 pt-8">
            {tags.map((tag, index) => (
              <div
                key={tag}
                className={`px-4 py-2 rounded-full border transition-all duration-500 ${
                  activeTags.includes(index)
                    ? 'bg-white/10 border-white/30 text-white animate-pulse'
                    : 'bg-transparent border-gray-600 text-gray-500'
                }`}
              >
                <span className="text-sm font-medium">{tag}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileOptimizedSection>
  );
};

export default AsmiIntroSection;
