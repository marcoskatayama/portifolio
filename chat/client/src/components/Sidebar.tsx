import type { SidebarProps } from '../types/types';

const ROOMS = [
  { id: 'general', name: 'Geral', icon: '🌍' },
  { id: 'devs', name: 'Devs', icon: '💻' },
  { id: 'vendas', name: 'Vendas', icon: '💰' },
  { id: 'suporte', name: 'Suporte', icon: '🛠️' },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentRoom, onJoinRoom, isOpen, userName, setUserName }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      } `}
    >
      <div className="border-b border-slate-800 p-6">
        <h3 className="flex items-center gap-2 text-xl font-bold italic">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500 text-xs not-italic">K</div>
          KralenChat
        </h3>
      </div>

      <div className="p-4">
        <label className="mb-2 block text-[10px] font-bold tracking-widest text-slate-500 uppercase">Seu Perfil</label>
        <input
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm transition-colors outline-none focus:border-indigo-500"
          placeholder="Seu nome..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        <label className="mb-2 block px-4 text-[10px] font-bold tracking-widest text-slate-500 uppercase">Canais</label>
        {ROOMS.map((room) => (
          <button
            key={room.id}
            onClick={() => onJoinRoom(room.id)}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors ${
              currentRoom === room.id
                ? 'bg-indigo-600 font-medium text-white shadow-lg shadow-indigo-900/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <span>{room.icon}</span> {room.name}
          </button>
        ))}
      </nav>
    </aside>
  );
};
