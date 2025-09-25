export interface Player {
  id: string;
  name: string;
  color: string;
  number: number;
}

export interface GameState {
  theme: string;
  players: Player[];
  currentPhase: 'setup' | 'distribution' | 'playing' | 'finished';
  currentPlayerIndex: number;
  revealedNumbers: boolean[];
  cardsOrder: string[];
  gameWon: boolean | null;
}

export const PLAYER_COLORS = [
  '#3b82f6', // blue
  '#ef4444', // red
  '#10b981', // green
  '#f59e0b', // yellow
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#84cc16', // lime
];