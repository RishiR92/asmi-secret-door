import { LucideIcon } from 'lucide-react';

interface HiringMetricCardProps {
  title: string;
  value?: string | number;
  details: string;
  icon: LucideIcon;
  priority: 'success' | 'warning' | 'alert';
  isVisible: boolean;
}

const HiringMetricCard = ({ title, value, details, icon: Icon, priority, isVisible }: HiringMetricCardProps) => {
  if (!isVisible) return null;

  const priorityColors = {
    success: { border: 'rgba(46, 197, 106, 0.3)', accent: 'var(--accent-positive)' },
    warning: { border: 'rgba(251, 191, 36, 0.3)', accent: '#FBB024' },
    alert: { border: 'rgba(239, 68, 68, 0.3)', accent: '#EF4444' }
  };

  const colors = priorityColors[priority];

  return (
    <div className="flex justify-start animate-scale-in">
      <div 
        className="backdrop-blur-sm px-4 py-4 rounded-2xl border-l-2 max-w-sm shadow-lg" 
        style={{ 
          backgroundColor: 'rgba(31, 31, 35, 0.8)', 
          borderLeft: `2px solid ${colors.border}`,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <Icon size={16} style={{ color: colors.accent }} />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline space-x-2">
                <p className="text-sm font-semibold" style={{ color: 'var(--text-high)' }}>
                  {title}
                </p>
                {value && (
                  <p className="text-lg font-bold" style={{ color: colors.accent }}>
                    {value}
                  </p>
                )}
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                {details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringMetricCard;
