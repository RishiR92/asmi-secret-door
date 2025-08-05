
import { CheckCircle } from 'lucide-react';

interface ProcessingMessageProps {
  type: 'processing' | 'confirmation';
  text: string;
  isVisible: boolean;
}

const ProcessingMessage = ({ type, text, isVisible }: ProcessingMessageProps) => {
  if (!isVisible) return null;

  if (type === 'processing') {
    return (
      <div className="flex justify-start animate-scale-in">
        <div className="bg-purple-900/40 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-tl-sm max-w-xs border border-purple-400/30 shadow-lg">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-purple-400 text-xs font-medium">Processing</span>
          </div>
          <span className="text-purple-200 text-sm font-light">{text}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start animate-scale-in">
      <div className="bg-gradient-to-r from-purple-500/30 to-purple-600/30 border border-purple-400/40 px-4 py-3 rounded-2xl rounded-tl-sm max-w-xs shadow-lg backdrop-blur-sm">
        <div className="flex items-center space-x-2 mb-2">
          <CheckCircle size={14} className="text-purple-400" />
          <span className="text-purple-400 text-xs font-medium">Success</span>
        </div>
        <span className="text-purple-200 text-sm font-light">{text}</span>
      </div>
    </div>
  );
};

export default ProcessingMessage;
