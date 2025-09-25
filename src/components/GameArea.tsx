import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayerCard } from './PlayerCard';
import { GameState } from '@/types/game';
import { RotateCcw, Eye, Trophy, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GameAreaProps {
  gameState: GameState;
  onUpdateCardsOrder: (newOrder: string[]) => void;
  onRevealResult: () => void;
  onResetGame: () => void;
}

export const GameArea = ({ 
  gameState, 
  onUpdateCardsOrder, 
  onRevealResult, 
  onResetGame 
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
    <div className="animate-slide-up space-y-6">
      <Card className="game-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">
            Tema: <span className="gradient-accent bg-clip-text text-transparent">{gameState.theme}</span>
          </CardTitle>
          <p className="text-muted-foreground">
            {isFinished 
              ? (gameState.gameWon ? "🎉 Parabéns! Vocês venceram!" : "😔 Que pena! Tente novamente!")
              : "Clique em uma carta e use as setas para organizá-las em ordem crescente"
            }
          </p>
        </CardHeader>
      </Card>

      <Card className="game-card">
        <CardContent className="p-6">
          <div className="flex gap-4 justify-center flex-wrap">
            {gameState.cardsOrder.map((playerId, index) => {
              const player = gameState.players.find(p => p.id === playerId)!;
              const isCorrectPosition = isFinished && correctOrder[index] === playerId;
              const isSelected = selectedCardIndex === index;
              
              return (
                <div key={playerId} className="relative">
                  <div
                    className={`transition-all cursor-pointer ${
                      isSelected ? 'ring-4 ring-primary scale-105' : ''
                    } ${isCorrectPosition ? 'ring-2 ring-success animate-pulse' : ''}`}
                    onClick={() => !isFinished && setSelectedCardIndex(isSelected ? null : index)}
                  >
                    <PlayerCard
                      player={player}
                      showNumber={isFinished}
                      isCorrectPosition={isCorrectPosition}
                    />
                  </div>
                  
                  {isSelected && !isFinished && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveCard(index, index - 1)}
                        disabled={index === 0}
                        className="w-8 h-8 p-0"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveCard(index, index + 1)}
                        disabled={index === gameState.cardsOrder.length - 1}
                        className="w-8 h-8 p-0"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="text-center mt-2 text-sm text-muted-foreground">
                    {index + 1}º
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        {!isFinished ? (
          <Button 
            onClick={onRevealResult} 
            size="lg" 
            className="gradient-primary px-8"
          >
            <Eye className="w-5 h-5 mr-2" />
            Revelar Resultado
          </Button>
        ) : (
          <div className="flex gap-4 items-center">
            {gameState.gameWon && (
              <div className="flex items-center gap-2 text-success font-semibold text-lg">
                <Trophy className="w-6 h-6" />
                Vitória!
              </div>
            )}
            {!gameState.gameWon && (
              <div className="flex items-center gap-2 text-destructive font-semibold text-lg">
                <X className="w-6 h-6" />
                Derrota!
              </div>
            )}
            <Button 
              onClick={onResetGame} 
              size="lg" 
              variant="outline"
              className="border-2"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Novo Jogo
            </Button>
          </div>
        )}
      </div>

      {isFinished && (
        <Card className="game-card animate-bounce-in">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Ordem Correta:</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {correctOrder.map((playerId, index) => {
                const player = gameState.players.find(p => p.id === playerId)!;
                return (
                  <div key={playerId} className="text-center">
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-white/20 flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: player.color }}
                    >
                      {player.number}
                    </div>
                    <p className="text-sm font-medium">{player.name}</p>
                    <p className="text-xs text-muted-foreground">{index + 1}º lugar</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};