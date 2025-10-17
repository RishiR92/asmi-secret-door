
interface TypingIndicatorProps {
  isVisible: boolean;
}

const TypingIndicator = ({ isVisible }: TypingIndicatorProps) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start">
      <div className="flex space-x-1.5 px-3 py-2 rounded-lg" style={{ backgroundColor: '#1F2C34' }}>
        <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#8696A0' }}></div>
        <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#8696A0', animationDelay: '0.1s' }}></div>
        <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#8696A0', animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
