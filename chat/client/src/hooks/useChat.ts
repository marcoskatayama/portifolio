// client/src/hooks/useChat.ts
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import type { Message } from '../types/types';

const socket = io('http://127.0.0.1:3001');

export const useChat = (userName: string, room: string) => {
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [isTypingRemote, setIsTypingRemote] = useState<{ user: string; status: boolean } | null>(null);

  useEffect(() => {
    socket.emit('join_room', room);

    socket.on('load_history', (history: Message[]) => setChatLog(history));
    socket.on('receive_message', (data: Message) => setChatLog((prev) => [...prev, data]));
    socket.on('display_typing', (data) => {
      if (data.isTyping && data.room === room) {
        setIsTypingRemote({ user: data.user, status: true });
      } else {
        setIsTypingRemote(null);
      }
    });

    return () => {
      socket.off('load_history');
      socket.off('receive_message');
      socket.off('display_typing');
    };
  }, [room]);

  const sendMessage = (text: string) => {
    if (!userName) {
      alert('Por favor, digite seu nome no topo do chat!');
      return;
    }

    const messageData = {
      author: userName,
      text,
      room,
    };

    socket.emit('send_message', messageData);
    socket.emit('typing', { room, user: userName, isTyping: false });
  };

  const sendTypingStatus = (isTyping: boolean) => {
    socket.emit('typing', { room, user: userName, isTyping });
  };

  return { chatLog, isTypingRemote, sendMessage, sendTypingStatus, setChatLog };
};
