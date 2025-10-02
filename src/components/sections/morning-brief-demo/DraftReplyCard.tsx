import { Send, Edit } from 'lucide-react';

interface DraftReplyCardProps {
  draftText: string;
  isVisible: boolean;
}

const DraftReplyCard = ({ draftText, isVisible }: DraftReplyCardProps) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start animate-scale-in">
      <div className="backdrop-blur-sm px-4 py-4 rounded-2xl border max-w-sm shadow-lg" style={{ backgroundColor: 'rgba(31, 31, 35, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Edit size={14} style={{ color: 'var(--text-secondary)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Draft Reply</span>
          </div>
          
          <div className="rounded-lg p-3" style={{ backgroundColor: 'rgba(18, 18, 20, 0.5)' }}>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{draftText}</p>
          </div>

          <div className="flex space-x-2">
            <button className="flex-1 hover:opacity-80 border rounded-lg px-3 py-2 flex items-center justify-center space-x-2 transition-opacity" style={{ backgroundColor: 'transparent', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <Send size={12} style={{ color: 'var(--accent-positive)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--accent-positive)' }}>Send</span>
            </button>
            <button className="flex-1 hover:opacity-80 border rounded-lg px-3 py-2 flex items-center justify-center space-x-2 transition-opacity" style={{ backgroundColor: 'transparent', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <Edit size={12} style={{ color: 'var(--text-secondary)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftReplyCard;
