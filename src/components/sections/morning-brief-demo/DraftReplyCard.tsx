import { Send, Edit } from 'lucide-react';

interface DraftReplyCardProps {
  draftText: string;
  isVisible: boolean;
}

const DraftReplyCard = ({ draftText, isVisible }: DraftReplyCardProps) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start animate-scale-in">
      <div className="bg-blue-900/40 backdrop-blur-sm px-4 py-4 rounded-2xl text-white border border-blue-400/30 max-w-sm shadow-lg">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Edit size={14} className="text-blue-400" />
            <span className="text-xs font-medium text-blue-400">Draft Reply</span>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-sm text-gray-300 leading-relaxed">{draftText}</p>
          </div>

          <div className="flex space-x-2">
            <button className="flex-1 bg-green-500/20 hover:bg-green-500/30 border border-green-400/40 rounded-lg px-3 py-2 flex items-center justify-center space-x-2 transition-colors">
              <Send size={12} className="text-green-400" />
              <span className="text-xs text-green-400 font-medium">Send</span>
            </button>
            <button className="flex-1 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 flex items-center justify-center space-x-2 transition-colors">
              <Edit size={12} className="text-gray-300" />
              <span className="text-xs text-gray-300 font-medium">Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftReplyCard;
