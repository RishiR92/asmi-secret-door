
import { Calendar } from 'lucide-react';

interface MeetingDetailsProps {
  data: {
    original: string;
    new: string;
    attendees: string;
    location?: string;
  };
  isVisible: boolean;
}

const MeetingDetails = ({ data, isVisible }: MeetingDetailsProps) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start animate-scale-in">
      <div className="px-4 py-3 rounded-lg rounded-tl-sm max-w-[85%]" style={{ backgroundColor: '#1F2C34' }}>
        <div className="space-y-2.5">
          <div className="flex items-center space-x-2">
            <Calendar size={12} style={{ color: '#00A884' }} />
            <span className="text-xs font-medium" style={{ color: '#00A884' }}>Meeting Updated</span>
          </div>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Was:</span>
              <span className="text-gray-400 line-through">{data.original}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white">Now:</span>
              <span className="text-white font-medium">{data.new}</span>
            </div>
            <div className="pt-2 border-t space-y-1" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <span className="text-gray-300 text-xs">{data.attendees}</span>
              {data.location && (
                <div className="text-gray-300 text-xs">📍 {data.location}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;
