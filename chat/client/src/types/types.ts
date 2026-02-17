export interface Message {
  id: string;
  text: string;
  author: string;
  room: string;
  createdAt: string;
}

export interface MessageItemProps {
  msg: Message;
  isMe: boolean;
}

export interface SidebarProps {
  currentRoom: string;
  onJoinRoom: (roomName: string) => void;
  isOpen: boolean;
  userName: string;
  setUserName: (name: string) => void;
}
