import { UserPlus, Briefcase } from 'lucide-react';

interface COOHireCardProps {
  name: string;
  previousRole: string;
}

const COOHireCard = ({ name, previousRole }: COOHireCardProps) => {
  return (
    <div className="border rounded-xl p-3" style={{ backgroundColor: 'rgba(55, 214, 122, 0.1)', borderColor: 'var(--accent-positive)' }}>
      <div className="flex items-start space-x-2">
        <div className="p-1.5 rounded-lg" style={{ backgroundColor: 'rgba(55, 214, 122, 0.2)' }}>
          <UserPlus size={14} style={{ color: 'var(--accent-positive)' }} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium" style={{ color: 'var(--accent-positive)' }}>New COO Hired</p>
          <p className="text-sm font-semibold mt-1" style={{ color: 'var(--text-high)' }}>{name}</p>
          <div className="flex items-center space-x-1 mt-1">
            <Briefcase size={10} style={{ color: 'var(--text-secondary)' }} />
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{previousRole}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default COOHireCard;
