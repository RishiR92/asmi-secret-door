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
      <div className="backdrop-blur-sm px-4 py-4 rounded-2xl border max-w-sm shadow-lg" style={{ backgroundColor: 'rgba(31, 31, 35, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Mail size={14} style={{ color: 'var(--text-secondary)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                {priority === 'high' ? 'High Priority' : 'Medium Priority'}
              </span>
            </div>
            {daysOverdue && (
              <div className="flex items-center space-x-1">
                <AlertCircle size={12} style={{ color: 'var(--text-secondary)' }} />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{daysOverdue}d overdue</span>
              </div>
            )}
          </div>
          
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-high)' }}>{sender}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{subject}</p>
            <p className="text-xs mt-2 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{snippet}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailActionCard;
