import { Mail, AlertCircle } from 'lucide-react';

interface EmailActionCardProps {
  sender: string;
  subject: string;
  snippet: string;
  daysOverdue?: number;
  priority: 'high' | 'medium';
  isVisible: boolean;
}

const EmailActionCard = ({ sender, subject, snippet, daysOverdue, priority, isVisible }: EmailActionCardProps) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start animate-scale-in">
      <div className="bg-red-900/40 backdrop-blur-sm px-4 py-4 rounded-2xl text-white border border-red-400/30 max-w-sm shadow-lg">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Mail size={14} className="text-red-400" />
              <span className={`text-xs font-medium ${priority === 'high' ? 'text-red-400' : 'text-orange-400'}`}>
                {priority === 'high' ? 'High Priority' : 'Medium Priority'}
              </span>
            </div>
            {daysOverdue && (
              <div className="flex items-center space-x-1">
                <AlertCircle size={12} className="text-red-400" />
                <span className="text-xs text-red-400">{daysOverdue}d overdue</span>
              </div>
            )}
          </div>
          
          <div>
            <p className="text-sm font-medium text-white">{sender}</p>
            <p className="text-xs text-gray-300 mt-1">{subject}</p>
            <p className="text-xs text-gray-400 mt-2 line-clamp-2">{snippet}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailActionCard;
