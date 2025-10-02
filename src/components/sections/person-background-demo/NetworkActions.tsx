import { Send, Users } from 'lucide-react';

const NetworkActions = () => {
  return (
    <div className="space-y-2">
      <button className="w-full hover:opacity-80 border rounded-lg px-3 py-2.5 flex items-center justify-center space-x-2 transition-opacity" style={{ backgroundColor: 'rgba(55, 214, 122, 0.1)', borderColor: 'var(--accent-positive)' }}>
        <Send size={14} style={{ color: 'var(--accent-positive)' }} />
        <span className="text-sm font-medium" style={{ color: 'var(--accent-positive)' }}>Send Congratulations</span>
      </button>
      <button className="w-full hover:opacity-80 border rounded-lg px-3 py-2.5 flex items-center justify-center space-x-2 transition-opacity" style={{ backgroundColor: 'rgba(55, 214, 122, 0.1)', borderColor: 'var(--accent-positive)' }}>
        <Users size={14} style={{ color: 'var(--accent-positive)' }} />
        <span className="text-sm font-medium" style={{ color: 'var(--accent-positive)' }}>Request COO Intro</span>
      </button>
    </div>
  );
};

export default NetworkActions;
