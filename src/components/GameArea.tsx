import { Button } from '@/components/ui/button';
import { GameState } from '@/types/game';
import { ChevronLeft, ChevronRight, Eye, RotateCcw, Trophy, X } from 'lucide-react';
import { useState } from 'react';
import { PlayerCard } from './PlayerCard';

interface GameAreaProps {
  gameState: GameState;
  onUpdateCardsOrder: (newOrder: string[]) => void;
  onRevealResult: () => void;
  onResetGame: () => void;
  onNewGameWithSamePlayers: () => void;
}

export const GameArea = ({ 
  gameState, 
  onUpdateCardsOrder, 
  onRevealResult, 
  onResetGame,
  onNewGameWithSamePlayers
}: GameAreaProps) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  const moveCard = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= gameState.cardsOrder.length) return;
    
    const items = Array.from(gameState.cardsOrder);
    const [reorderedItem] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, reorderedItem);
    
    onUpdateCardsOrder(items);
    setSelectedCardIndex(toIndex);
  };

  const isFinished = gameState.currentPhase === 'finished';
  const correctOrder = [...gameState.players]
    .sort((a, b) => a.number - b.number)
    .map(p => p.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-slide-up">
          <h1 className="font-orbitron text-xl md:text-3xl font-black mb-2 text-foreground">TEMA:</h1>
          <h2 className="font-orbitron text-3xl md:text-5xl font-black text-primary mb-4">{gameState.theme.toUpperCase()}</h2>
          <p className="text-sm md:text-lg font-inter text-foreground px-4">
            {isFinished 
              ? (gameState.gameWon ? "🎉 PARABÉNS! VOCÊS VENCERAM!" : "😢 QUE PENA! TENTEM NOVAMENTE!")
              : "Clique em uma carta e use as setas para organizá-las em ordem crescente"
            }
          </p>
        </div>

        {/* Game Board */}
        <div className="mb-8 md:mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-4 md:p-8 border border-border/30">
            <div className="flex gap-3 md:gap-6 justify-center flex-wrap">
              {gameState.cardsOrder.map((playerId, index) => {
                const player = gameState.players.find(p => p.id === playerId)!;
                const isCorrectPosition = isFinished && correctOrder[index] === playerId;
                const isSelected = selectedCardIndex === index;
                
                return (
                  <div key={playerId} className="relative">
                    <div
                      className={`transition-all duration-200 cursor-pointer ${
                        isSelected ? 'transform scale-110' : 'hover:scale-105'
                      } ${isCorrectPosition ? 'animate-pulse' : ''}`}
                      onClick={() => !isFinished && setSelectedCardIndex(isSelected ? null : index)}
                    >
                      <PlayerCard
                        player={player}
                        showNumber={isFinished}
                        isCorrectPosition={isCorrectPosition}
                      />
                      {isSelected && !isFinished && (
                        <div className="absolute inset-0 border-4 border-primary rounded-xl"></div>
                      )}
                    </div>
                    
                    {isSelected && !isFinished && (
                      <div className="absolute -top-12 md:-top-16 left-1/2 transform -translate-x-1/2 flex gap-1 md:gap-2">
                        <Button
                          size="sm"
                          onClick={() => moveCard(index, index - 1)}
                          disabled={index === 0}
                          className="w-8 h-8 md:w-10 md:h-10 p-0 bg-primary/80 hover:bg-primary/20 border border-border/50"
                        >
                          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => moveCard(index, index + 1)}
                          disabled={index === gameState.cardsOrder.length - 1}
                          className="w-8 h-8 md:w-10 md:h-10 p-0 bg-primary/80 hover:bg-primary/20 border border-border/50"
                        >
                          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                        </Button>
                      </div>
                    )}
                    
                    <div className="text-center mt-2 md:mt-4">
                      <span className="font-orbitron font-bold text-sm md:text-lg text-foreground bg-background/50 px-2 md:px-3 py-1 rounded-full">
                        {index + 1}º
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mb-8 md:mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {!isFinished ? (
            <Button 
              onClick={onRevealResult} 
              size="lg" 
              className="w-full max-w-sm px-6 md:px-12 py-4 md:py-6 text-base md:text-xl font-orbitron font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg rounded-xl"
            >
              <Eye className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
              REVELAR RESULTADO
            </Button>
          ) : (
            <div className="flex gap-3 md:gap-6 items-center justify-center flex-wrap">
              {gameState.gameWon && (
                <div className="flex items-center gap-2 md:gap-3 text-secondary font-orbitron font-bold text-lg md:text-2xl">
                  <Trophy className="w-6 h-6 md:w-8 md:h-8" />
                  VITÓRIA!
                </div>
              )}
              {!gameState.gameWon && (
                <div className="flex items-center gap-2 md:gap-3 text-destructive font-orbitron font-bold text-lg md:text-2xl">
                  <X className="w-6 h-6 md:w-8 md:h-8" />
                  DERROTA!
                </div>
              )}
              <Button 
                onClick={onResetGame} 
                size="lg" 
                variant="outline"
                className="px-3 md:px-8 py-3 md:py-4 text-sm md:text-lg font-orbitron font-bold border-2 border-border/50 bg-background/50 hover:bg-background/80 rounded-xl"
              >
                <RotateCcw className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                NOVO JOGO
              </Button>
              <Button 
                onClick={onNewGameWithSamePlayers} 
                size="lg" 
                className="px-3 md:px-8 py-3 md:py-4 text-sm md:text-lg font-orbitron font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105 transition-all duration-300 rounded-xl"
              >
                <Trophy className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                MESMOS JOGADORES
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        {isFinished && (
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-4 md:p-8 border border-border/30">
              <h3 className="text-lg md:text-2xl font-orbitron font-bold mb-6 md:mb-8 text-center text-foreground">ORDEM CORRETA:</h3>
              <div className="flex justify-center gap-3 md:gap-6 flex-wrap">
                {correctOrder.map((playerId, index) => {
                  const player = gameState.players.find(p => p.id === playerId)!;
                  return (
                    <div key={playerId} className="text-center">
                      <div
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto mb-2 md:mb-3 border-2 border-foreground/20 flex items-center justify-center font-orbitron font-black text-lg md:text-xl text-foreground"
                        style={{ backgroundColor: player.color }}
                      >
                        {player.number}
                      </div>
                      <p className="text-sm md:text-lg font-inter font-bold text-foreground">{player.name}</p>
                      <p className="text-xs md:text-sm font-orbitron text-muted-foreground">{index + 1}º LUGAR</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};