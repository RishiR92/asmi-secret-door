
interface TypingIndicatorProps {
  isVisible: boolean;
}

const TypingIndicator = ({ isVisible }: TypingIndicatorProps) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start animate-fade-in">
      <div className="backdrop-blur-sm px-4 py-3 rounded-2xl rounded-tl-sm border" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--text-secondary)' }}></div>
          <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--text-secondary)', animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--text-secondary)', animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
