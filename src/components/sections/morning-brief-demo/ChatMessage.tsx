
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
        <div className="px-4 py-2.5 rounded-lg rounded-tr-sm max-w-[85%]" style={{ backgroundColor: '#005C4B' }}>
          <span className="text-sm text-white">{text}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start animate-scale-in">
      <div className="px-4 py-2.5 rounded-lg rounded-tl-sm max-w-[85%]" style={{ backgroundColor: '#1F2C34' }}>
        <span className="text-sm text-white">{text}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
