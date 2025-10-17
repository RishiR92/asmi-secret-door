import { MessageCircle } from 'lucide-react';

const AIChiefOfStaffSection = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4" style={{ backgroundColor: '#000000' }}>
      <div className="w-full max-w-[800px] mx-auto space-y-8">
        {/* Current Wedge Badge */}
        <div className="flex justify-center">
          <div 
            className="px-6 py-2 rounded-full text-black font-medium text-lg"
            style={{ backgroundColor: '#00D96F' }}
          >
            Current Wedge
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-white text-4xl md:text-5xl font-bold text-center leading-tight">
          AI Chief of Staff
        </h1>

        {/* Messaging Apps */}
        <div className="flex items-center justify-center space-x-4">
          <span className="text-gray-400 text-lg">Within</span>
          <div className="flex items-center space-x-3">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle size={28} color="#fff" fill="#fff" />
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#34C759' }}
            >
              <MessageCircle size={28} color="#fff" fill="#fff" />
            </div>
          </div>
        </div>

        {/* Simple Text */}
        <div className="text-center">
          <p className="text-white text-2xl md:text-3xl font-medium">
            Get Things Done - Simplest User Prompts → AI agents
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChiefOfStaffSection;
