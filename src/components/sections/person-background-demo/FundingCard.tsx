import { TrendingUp, DollarSign } from 'lucide-react';

interface FundingCardProps {
  amount: string;
  round: string;
  lead: string;
}

const FundingCard = ({ amount, round, lead }: FundingCardProps) => {
  return (
    <div className="bg-green-900/30 border border-green-400/30 rounded-xl p-3">
      <div className="flex items-start space-x-2 mb-2">
        <div className="p-1.5 rounded-lg bg-green-500/20">
          <TrendingUp size={14} className="text-green-400" />
        </div>
        <div className="flex-1">
          <p className="text-green-300 text-xs font-medium">Just Raised</p>
          <div className="flex items-baseline space-x-1 mt-1">
            <DollarSign size={16} className="text-green-400" />
            <span className="text-white text-lg font-bold">{amount}</span>
            <span className="text-gray-400 text-xs">{round}</span>
          </div>
        </div>
      </div>
      <p className="text-gray-400 text-xs">Led by {lead}</p>
    </div>
  );
};

export default FundingCard;
