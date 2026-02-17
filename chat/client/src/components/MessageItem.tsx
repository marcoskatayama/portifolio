import type { MessageItemProps } from '../types/types';

export const MessageItem = ({ msg, isMe }: MessageItemProps) => {
  const formattedTime = new Date(msg.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2 shadow-sm sm:max-w-[70%] ${
          isMe
            ? 'rounded-tr-none bg-blue-600 text-white'
            : 'rounded-tl-none border border-slate-100 bg-white text-slate-800'
        } `}
      >
        {!isMe && <span className="mb-1 block text-[10px] font-bold text-blue-500 uppercase">{msg.author}</span>}
        <p className="text-sm leading-relaxed">{msg.text}</p>
        <span className={`mt-1 block text-[9px] opacity-70 ${isMe ? 'text-right' : ''}`}>{formattedTime}</span>
      </div>
    </div>
  );
};
