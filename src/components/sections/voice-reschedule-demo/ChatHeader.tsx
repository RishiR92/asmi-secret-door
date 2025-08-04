
import { Mic } from 'lucide-react';

interface ChatHeaderProps {
  isRecording: boolean;
}

const ChatHeader = ({ isRecording }: ChatHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-red-800/40 to-red-900/40 px-4 py-4 flex items-center space-x-3 border-b border-white/10 backdrop-blur-sm">
      <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-black font-bold text-sm">A</span>
      </div>
      <div className="flex-1">
        <h3 className="text-white font-medium text-sm">Asmi</h3>
      </div>
      {isRecording && (
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          <span className="text-red-400 text-xs">Listening</span>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
