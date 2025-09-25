import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { GameState } from '@/types/game';

interface NumberDistributionProps {
  gameState: GameState;
  onNumberSeen: () => void;
}

export const NumberDistribution = ({ gameState, onNumberSeen }: NumberDistributionProps) => {
  const [numberVisible, setNumberVisible] = useState(false);
  
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const isLastPlayer = gameState.currentPlayerIndex === gameState.players.length - 1;

  const showNumber = () => {
    setNumberVisible(true);
  };

  const confirmSeen = () => {
    setNumberVisible(false);
    onNumberSeen();
  };

  return (
    <div className="animate-slide-up">
      <Card className="game-card max-w-lg mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            Tema: <span className="gradient-accent bg-clip-text text-transparent">{gameState.theme}</span>
          </CardTitle>
          <p className="text-muted-foreground">
            Distribuição dos números secretos
          </p>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="p-6 rounded-lg border-2 border-dashed border-border">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-white/20"
              style={{ backgroundColor: currentPlayer.color }}
            />
            <h3 className="text-xl font-semibold mb-2">{currentPlayer.name}</h3>
            <p className="text-muted-foreground mb-4">
              É a sua vez de ver o seu número
            </p>

            {!numberVisible ? (
              <Button onClick={showNumber} size="lg" className="gradient-primary">
                <Eye className="w-5 h-5 mr-2" />
                Ver Meu Número
              </Button>
            ) : (
              <div className="space-y-6">
                <div className="animate-bounce-in">
                  <div className="text-6xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                    {currentPlayer.number}
                  </div>
                  <p className="text-sm text-muted-foreground">Memorize este número!</p>
                </div>
                
                <Button 
                  onClick={confirmSeen} 
                  size="lg" 
                  variant="outline"
                  className="border-2"
                >
                  <EyeOff className="w-5 h-5 mr-2" />
                  Já Vi!
                </Button>
              </div>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            {isLastPlayer 
              ? "Após confirmar, o jogo começará!"
              : `Aguardando ${gameState.players.length - gameState.currentPlayerIndex - 1} jogador(es)`
            }
          </div>

          <div className="flex justify-center gap-2">
            {gameState.players.map((player, index) => (
              <div
                key={player.id}
                className={`w-3 h-3 rounded-full transition-all ${
                  index < gameState.currentPlayerIndex 
                    ? 'bg-success' 
                    : index === gameState.currentPlayerIndex
                    ? 'bg-primary animate-pulse'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};