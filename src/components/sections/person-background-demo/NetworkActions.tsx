import { Send, Users } from 'lucide-react';

const NetworkActions = () => {
  return (
    <div className="space-y-2">
      <button className="w-full bg-green-500/20 hover:bg-green-500/30 border border-green-400/40 rounded-lg px-3 py-2.5 flex items-center justify-center space-x-2 transition-colors">
        <Send size={14} className="text-green-400" />
        <span className="text-sm text-green-400 font-medium">Send Congratulations</span>
      </button>
      <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 rounded-lg px-3 py-2.5 flex items-center justify-center space-x-2 transition-colors">
        <Users size={14} className="text-blue-400" />
        <span className="text-sm text-blue-400 font-medium">Request COO Intro</span>
      </button>
    </div>
  );
};

export default NetworkActions;
