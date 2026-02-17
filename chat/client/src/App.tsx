import { Hash, Menu, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MessageItem } from './components/MessageItem';
import { Sidebar } from './components/Sidebar';
import { useChat } from './hooks/useChat';

function App() {
  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('general');
  const [messageInput, setMessageInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { chatLog, isTypingRemote, sendMessage, sendTypingStatus, setChatLog } = useChat(userName, room);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleSend = () => {
    if (messageInput.trim()) {
      sendMessage(messageInput);
      setMessageInput('');
      sendTypingStatus(false);
    }
  };

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-white font-sans text-slate-900">
      {/* Overlay Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        currentRoom={room}
        userName={userName}
        setUserName={setUserName}
        onJoinRoom={(r: string) => {
          setRoom(r);
          setChatLog([]);
          setIsSidebarOpen(false);
        }}
      />

      <main className="flex min-w-0 flex-1 flex-col bg-slate-50/50">
        {/* Header Moderno */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-1 text-slate-400">
              <Hash size={18} />
              <h2 className="text-base font-semibold tracking-tight text-slate-800 uppercase">{room}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden text-xs font-medium text-slate-400 uppercase sm:block">Status:</span>
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
          </div>
        </header>

        {/* Lista de Mensagens */}
        <section ref={scrollRef} className="flex-1 space-y-6 overflow-y-auto scroll-smooth p-4">
          {chatLog.map((msg) => (
            <MessageItem key={msg.id} msg={msg} isMe={msg.author === userName} />
          ))}

          {isTypingRemote && (
            <div className="ml-2 flex items-center gap-2 text-xs font-medium text-slate-400">
              <div className="flex gap-0.5">
                <span className="h-1 w-1 animate-bounce rounded-full bg-indigo-400"></span>
                <span className="h-1 w-1 animate-bounce rounded-full bg-indigo-400 [animation-delay:0.2s]"></span>
                <span className="h-1 w-1 animate-bounce rounded-full bg-indigo-400 [animation-delay:0.4s]"></span>
              </div>
              {isTypingRemote.user} está escrevendo...
            </div>
          )}
        </section>

        {/* Input Moderno */}
        <footer className="border-t border-slate-200 bg-white p-4">
          <div className="mx-auto flex max-w-5xl items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 shadow-sm transition-all focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50">
            <input
              className="flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-slate-400"
              value={messageInput}
              placeholder={`Enviar mensagem para #${room}`}
              onChange={(e) => {
                setMessageInput(e.target.value);
                sendTypingStatus(e.target.value.length > 0);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={!messageInput.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md transition-all hover:bg-indigo-700 active:scale-95 disabled:opacity-50 disabled:grayscale"
            >
              <Send size={18} />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
