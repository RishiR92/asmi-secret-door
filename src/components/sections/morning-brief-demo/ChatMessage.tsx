
interface ChatMessageProps {
  type: 'user' | 'asmi';
  text: string;
  isVisible: boolean;
}

const ChatMessage = ({ type, text, isVisible }: ChatMessageProps) => {
  if (!isVisible) return null;

  if (type === 'user') {
    return (
      <div className="flex justify-end animate-slide-in-right">
        <div className="px-4 py-3 rounded-2xl rounded-tr-sm max-w-xs shadow-lg" style={{ background: 'linear-gradient(135deg, var(--accent-positive), #2EC56A)' }}>
          <span className="text-sm font-light" style={{ color: 'var(--bg-primary)' }}>{text}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start animate-scale-in">
      <div className="backdrop-blur-sm px-4 py-3 rounded-2xl rounded-tl-sm border max-w-sm shadow-lg" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'rgba(255,255,255,0.1)' }}>
        <span className="text-sm font-light" style={{ color: 'var(--text-high)' }}>{text}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
