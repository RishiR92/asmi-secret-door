import { TrendingUp, DollarSign } from 'lucide-react';

interface FundingCardProps {
  amount: string;
  round: string;
  lead: string;
}

const FundingCard = ({ amount, round, lead }: FundingCardProps) => {
  return (
    <div className="border rounded-xl p-3" style={{ backgroundColor: 'var(--bg-primary)', borderColor: '#3B82F6' }}>
      <div className="flex items-start space-x-2 mb-2">
        <div className="p-1.5 rounded-lg" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)' }}>
          <TrendingUp size={14} style={{ color: '#3B82F6' }} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium" style={{ color: '#3B82F6' }}>Just Raised</p>
          <div className="flex items-baseline space-x-1 mt-1">
            <DollarSign size={16} style={{ color: '#3B82F6' }} />
            <span className="text-lg font-bold" style={{ color: 'var(--text-high)' }}>{amount}</span>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{round}</span>
          </div>
        </div>
      </div>
      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Led by {lead}</p>
    </div>
  );
};

export default FundingCard;
