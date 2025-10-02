import { Send, UserPlus } from 'lucide-react';

const NetworkActions = () => {
  return (
    <div className="space-y-2">
      <button className="w-full hover:opacity-80 border rounded-xl px-4 py-3 flex items-center justify-center space-x-2 transition-opacity" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--accent-positive)' }}>
        <Send size={14} style={{ color: 'var(--accent-positive)' }} />
        <span className="text-sm font-medium" style={{ color: 'var(--accent-positive)' }}>Send Congratulations</span>
      </button>
      <button className="w-full hover:opacity-80 border rounded-xl px-4 py-3 flex items-center justify-center space-x-2 transition-opacity" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--text-secondary)' }}>
        <UserPlus size={14} style={{ color: 'var(--text-secondary)' }} />
        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Request COO Introduction</span>
      </button>
    </div>
  );
};

export default NetworkActions;
