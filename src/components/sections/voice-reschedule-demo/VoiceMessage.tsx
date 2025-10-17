
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
      <div className="px-4 py-3 rounded-lg rounded-tr-sm max-w-[85%]" style={{ backgroundColor: '#005C4B' }}>
        <div className="flex items-center space-x-2 mb-2">
          <Mic size={14} className={`text-white transition-all ${isRecording ? 'animate-pulse' : ''}`} />
          <span className="text-sm text-white">{text}</span>
        </div>
        {isRecording && (
          <div className="flex items-center justify-center space-x-1 mt-2">
            {audioWaves.map((height, index) => (
              <div
                key={index}
                className="w-0.5 rounded-full transition-all duration-200"
                style={{ 
                  height: `${Math.max(height * 3, 8)}px`,
                  backgroundColor: '#25D366'
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
