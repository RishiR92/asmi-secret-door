import { TrendingUp, DollarSign } from 'lucide-react';

interface FundingCardProps {
  amount: string;
  round: string;
  lead: string;
}

const FundingCard = ({ amount, round, lead }: FundingCardProps) => {
  return (
    <div className="border rounded-xl p-3" style={{ backgroundColor: 'rgba(55, 214, 122, 0.1)', borderColor: 'var(--accent-positive)' }}>
      <div className="flex items-start space-x-2 mb-2">
        <div className="p-1.5 rounded-lg" style={{ backgroundColor: 'rgba(55, 214, 122, 0.2)' }}>
          <TrendingUp size={14} style={{ color: 'var(--accent-positive)' }} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium" style={{ color: 'var(--accent-positive)' }}>Just Raised</p>
          <div className="flex items-baseline space-x-1 mt-1">
            <DollarSign size={16} style={{ color: 'var(--accent-positive)' }} />
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
