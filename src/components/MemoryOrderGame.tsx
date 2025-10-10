import { GameState, Player } from '@/types/game';
import { useState } from 'react';
import { GameArea } from './GameArea';
import { GameSetup } from './GameSetup';
import { HowToPlay } from './HowToPlay';
import { NumberDistribution } from './NumberDistribution';

const MemoryOrderGame = () => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    theme: '',
    players: [],
    currentPhase: 'setup',
    currentPlayerIndex: 0,
    revealedNumbers: [],
    cardsOrder: [],
    gameWon: null,
    autoAdvance: false
  });

  const startGame = (
    theme: string,
    players: Player[],
    autoAdvance: boolean
  ) => {
    // Generate random numbers for each player
    const usedNumbers = new Set<number>();
    const playersWithNumbers = players.map((player) => {
      let randomNumber;
      do {
        randomNumber = Math.floor(Math.random() * 100) + 1;
      } while (usedNumbers.has(randomNumber));
      usedNumbers.add(randomNumber);

      return {
        ...player,
        number: randomNumber
      };
    });

    setGameState({
      theme,
      players: playersWithNumbers,
      currentPhase: 'distribution',
      currentPlayerIndex: 0,
      revealedNumbers: new Array(playersWithNumbers.length).fill(false),
      cardsOrder: playersWithNumbers.map((p) => p.id),
      gameWon: null,
      autoAdvance
    });
  };

  const markNumberSeen = () => {
    const newRevealedNumbers = [...gameState.revealedNumbers];
    newRevealedNumbers[gameState.currentPlayerIndex] = true;

    const nextPlayerIndex = gameState.currentPlayerIndex + 1;

    if (nextPlayerIndex >= gameState.players.length) {
      setGameState((prev) => ({
        ...prev,
        currentPhase: 'playing',
        revealedNumbers: newRevealedNumbers
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        currentPlayerIndex: nextPlayerIndex,
        revealedNumbers: newRevealedNumbers
      }));
    }
  };

  const updateCardsOrder = (newOrder: string[]) => {
    setGameState((prev) => ({
      ...prev,
      cardsOrder: newOrder
    }));
  };

  const revealResult = () => {
    const correctOrder = [...gameState.players]
      .sort((a, b) => a.number - b.number)
      .map((p) => p.id);

    const isCorrect =
      JSON.stringify(gameState.cardsOrder) === JSON.stringify(correctOrder);

    setGameState((prev) => ({
      ...prev,
      currentPhase: 'finished',
      gameWon: isCorrect
    }));
  };

  const resetGame = () => {
    setGameState((prev) => ({
      theme: '',
      players: [],
      currentPhase: 'setup',
      currentPlayerIndex: 0,
      revealedNumbers: [],
      cardsOrder: [],
      gameWon: null,
      autoAdvance: prev.autoAdvance
    }));
  };

  const startNewGameWithSamePlayers = () => {
    setGameState((prev) => ({
      ...prev,
      theme: '',
      currentPhase: 'setup',
      currentPlayerIndex: 0,
      revealedNumbers: [],
      cardsOrder: [],
      gameWon: null,
      autoAdvance: prev.autoAdvance
    }));
  };

  const setAutoAdvance = (value: boolean) => {
    setGameState((prev) => ({
      ...prev,
      autoAdvance: value
    }));
  };

  const showInstructions = () => {
    setShowHowToPlay(true);
  };

  const backToSetup = () => {
    setShowHowToPlay(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        {showHowToPlay ? (
          <HowToPlay onBackToSetup={backToSetup} />
        ) : (
          <>
            {gameState.currentPhase === 'setup' && (
              <GameSetup
                onStartGame={startGame}
                onShowInstructions={showInstructions}
                existingPlayers={
                  gameState.players.length > 0
                    ? gameState.players.map(({ number, ...player }) => player)
                    : undefined
                }
              />
            )}

            {gameState.currentPhase === 'distribution' && (
              <NumberDistribution
                gameState={gameState}
                onNumberSeen={markNumberSeen}
              />
            )}

            {(gameState.currentPhase === 'playing' ||
              gameState.currentPhase === 'finished') && (
              <GameArea
                gameState={gameState}
                onUpdateCardsOrder={updateCardsOrder}
                onRevealResult={revealResult}
                onResetGame={resetGame}
                onNewGameWithSamePlayers={startNewGameWithSamePlayers}
                onSetAutoAdvance={setAutoAdvance}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MemoryOrderGame;
