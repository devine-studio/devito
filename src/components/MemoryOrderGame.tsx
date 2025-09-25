import { useState } from 'react';
import { GameSetup } from './GameSetup';
import { NumberDistribution } from './NumberDistribution';
import { GameArea } from './GameArea';
import { GameState, Player } from '@/types/game';

const MemoryOrderGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    theme: '',
    players: [],
    currentPhase: 'setup',
    currentPlayerIndex: 0,
    revealedNumbers: [],
    cardsOrder: [],
    gameWon: null,
  });

  const startGame = (theme: string, players: Player[]) => {
    // Generate random numbers for each player
    const usedNumbers = new Set<number>();
    const playersWithNumbers = players.map(player => {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * 100) + 1;
      } while (usedNumbers.has(randomNumber));
      usedNumbers.add(randomNumber);
      
      return {
        ...player,
        number: randomNumber,
      };
    });

    setGameState({
      theme,
      players: playersWithNumbers,
      currentPhase: 'distribution',
      currentPlayerIndex: 0,
      revealedNumbers: new Array(playersWithNumbers.length).fill(false),
      cardsOrder: playersWithNumbers.map(p => p.id),
      gameWon: null,
    });
  };

  const markNumberSeen = () => {
    const newRevealedNumbers = [...gameState.revealedNumbers];
    newRevealedNumbers[gameState.currentPlayerIndex] = true;
    
    const nextPlayerIndex = gameState.currentPlayerIndex + 1;
    
    if (nextPlayerIndex >= gameState.players.length) {
      // All players have seen their numbers, start the game
      setGameState(prev => ({
        ...prev,
        currentPhase: 'playing',
        revealedNumbers: newRevealedNumbers,
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        currentPlayerIndex: nextPlayerIndex,
        revealedNumbers: newRevealedNumbers,
      }));
    }
  };

  const updateCardsOrder = (newOrder: string[]) => {
    setGameState(prev => ({
      ...prev,
      cardsOrder: newOrder,
    }));
  };

  const revealResult = () => {
    // Check if the order is correct
    const correctOrder = [...gameState.players]
      .sort((a, b) => a.number - b.number)
      .map(p => p.id);
    
    const isCorrect = JSON.stringify(gameState.cardsOrder) === JSON.stringify(correctOrder);
    
    setGameState(prev => ({
      ...prev,
      currentPhase: 'finished',
      gameWon: isCorrect,
    }));
  };

  const resetGame = () => {
    setGameState({
      theme: '',
      players: [],
      currentPhase: 'setup',
      currentPlayerIndex: 0,
      revealedNumbers: [],
      cardsOrder: [],
      gameWon: null,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        {gameState.currentPhase === 'setup' && (
          <GameSetup onStartGame={startGame} />
        )}
        
        {gameState.currentPhase === 'distribution' && (
          <NumberDistribution
            gameState={gameState}
            onNumberSeen={markNumberSeen}
          />
        )}
        
        {(gameState.currentPhase === 'playing' || gameState.currentPhase === 'finished') && (
          <GameArea
            gameState={gameState}
            onUpdateCardsOrder={updateCardsOrder}
            onRevealResult={revealResult}
            onResetGame={resetGame}
          />
        )}
      </div>
    </div>
  );
};

export default MemoryOrderGame;