export type GameStatus = 'waiting' | 'active' | 'completed' | 'maintenance';

export interface Game {
  id: string;
  title: string;
  description: string;
  status: GameStatus;
  minPlayers: number;
  maxPlayers: number;
  currentPlayers: number;
  icon: string; // Lucide icon name or emoji representation
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

export interface GameRoom {
  id: string;
  gameId: string;
  hostId: string;
  players: string[]; // User IDs
  status: 'lobby' | 'playing' | 'ended';
  createdAt: string;
}
