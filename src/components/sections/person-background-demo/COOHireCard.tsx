import { UserPlus, Briefcase } from 'lucide-react';

interface COOHireCardProps {
  name: string;
  previousRole: string;
}

const COOHireCard = ({ name, previousRole }: COOHireCardProps) => {
  return (
    <div className="bg-purple-900/30 border border-purple-400/30 rounded-xl p-3">
      <div className="flex items-start space-x-2">
        <div className="p-1.5 rounded-lg bg-purple-500/20">
          <UserPlus size={14} className="text-purple-400" />
        </div>
        <div className="flex-1">
          <p className="text-purple-300 text-xs font-medium">New COO Hired</p>
          <p className="text-white text-sm font-semibold mt-1">{name}</p>
          <div className="flex items-center space-x-1 mt-1">
            <Briefcase size={10} className="text-gray-400" />
            <p className="text-gray-400 text-xs">{previousRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default COOHireCard;
