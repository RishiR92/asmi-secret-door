
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
        <div className="px-4 py-3 rounded-lg rounded-tl-sm max-w-[85%]" style={{ backgroundColor: '#1F2C34' }}>
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-2.5 h-2.5 border-2 rounded-full animate-spin" style={{ borderColor: '#00A884', borderTopColor: 'transparent' }}></div>
            <span className="text-xs font-medium" style={{ color: '#00A884' }}>Processing</span>
          </div>
          <span className="text-sm text-white">{text}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start animate-scale-in">
      <div className="px-4 py-3 rounded-lg rounded-tl-sm max-w-[85%]" style={{ backgroundColor: '#1F2C34' }}>
        <div className="flex items-center space-x-2 mb-1">
          <CheckCircle size={12} style={{ color: '#00A884' }} />
          <span className="text-xs font-medium" style={{ color: '#00A884' }}>Success</span>
        </div>
        <span className="text-sm text-white">{text}</span>
      </div>
    </div>
  );
};

export default ProcessingMessage;
