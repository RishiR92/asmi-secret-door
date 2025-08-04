
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
      <div className="bg-purple-900/30 border border-purple-400/30 px-4 py-4 rounded-2xl max-w-xs shadow-lg backdrop-blur-sm">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Calendar size={14} className="text-purple-400" />
            <span className="text-purple-200 text-xs font-medium">Meeting Updated</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Was:</span>
              <span className="text-gray-400 line-through">{data.original}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-purple-200">Now:</span>
              <span className="text-purple-200 font-medium">{data.new}</span>
            </div>
            <div className="pt-2 border-t border-purple-400/20 space-y-1">
              <span className="text-purple-300 text-xs">{data.attendees}</span>
              {data.location && (
                <div className="text-purple-300 text-xs">📍 {data.location}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;
