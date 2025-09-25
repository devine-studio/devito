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
  '#FFB3BA', // Rosa pastel
  '#BAFFC9', // Verde pastel
  '#BAE1FF', // Azul pastel
  '#FFFFBA', // Amarelo pastel
  '#FFDFBA', // Pêssego pastel
  '#E0BBE4', // Roxo pastel
  '#FFDAC1', // Coral pastel
  '#B5EAD7', // Menta pastel
];