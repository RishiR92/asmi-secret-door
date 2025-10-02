
import { MessageCircle } from 'lucide-react';

interface PhoneHeaderProps {
  isTyping: boolean;
}

const PhoneHeader = ({ isTyping }: PhoneHeaderProps) => {
  return (
    <>
      {/* Status bar */}
      <div className="px-4 py-2 flex justify-between items-center text-xs" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)' }}>
        <span>9:41</span>
        <div className="flex space-x-1">
          <div className="w-4 h-2 border rounded-sm" style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
            <div className="w-3/4 h-full rounded-sm" style={{ backgroundColor: 'var(--accent-positive)' }}></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 py-4 flex items-center space-x-3 border-b backdrop-blur-sm" style={{ backgroundColor: 'rgba(31, 31, 35, 0.4)', borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, var(--accent-positive), #2EC56A)' }}>
          <span className="font-bold text-sm" style={{ color: 'var(--bg-primary)' }}>A</span>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm" style={{ color: 'var(--text-high)' }}>Asmi</h3>
          <div className="text-xs flex items-center space-x-1" style={{ color: 'var(--text-secondary)' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent-positive)' }}></div>
            <span>Your AI Chief of Staff</span>
          </div>
        </div>
        {isTyping && (
          <div className="text-xs animate-pulse" style={{ color: 'var(--text-secondary)' }}>typing...</div>
        )}
      </div>
    </>
  );
};

export default PhoneHeader;
