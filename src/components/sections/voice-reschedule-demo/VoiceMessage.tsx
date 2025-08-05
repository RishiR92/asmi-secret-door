
import { Mic } from 'lucide-react';

interface VoiceMessageProps {
  text: string;
  isRecording: boolean;
  audioWaves: number[];
  isVisible: boolean;
}

const VoiceMessage = ({ text, isRecording, audioWaves, isVisible }: VoiceMessageProps) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-end animate-slide-in-right">
      <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 px-4 py-4 rounded-2xl rounded-tr-sm max-w-xs shadow-lg backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-2">
          <div className="relative">
            <Mic size={16} className={`text-red-300 transition-all duration-300 ${isRecording ? 'text-red-400 drop-shadow-sm' : ''}`} />
            {isRecording && (
              <div className="absolute inset-0 rounded-full bg-red-400/20 animate-ping"></div>
            )}
          </div>
          <span className="text-red-100 text-sm font-light">{text}</span>
        </div>
        {isRecording && (
          <div className="flex items-center justify-center space-x-1 mt-3 px-2">
            {audioWaves.map((height, index) => (
              <div
                key={index}
                className="w-0.5 bg-gradient-to-t from-red-400/60 to-red-300/80 rounded-full transition-all duration-200 ease-out shadow-sm"
                style={{ 
                  height: `${Math.max(height * 3, 8)}px`,
                  animationDelay: `${index * 50}ms`,
                  filter: 'drop-shadow(0 0 2px rgba(248, 113, 113, 0.3))'
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceMessage;
