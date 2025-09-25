import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-6">
      <div className="w-full max-w-3xl text-center">
        {/* Header */}
        <div className="mb-12 animate-slide-up">
          <h1 className="font-orbitron text-4xl font-black mb-2 text-foreground">TEMA:</h1>
          <h2 className="font-orbitron text-6xl font-black text-primary mb-8">{gameState.theme.toUpperCase()}</h2>
          <p className="text-lg font-inter text-muted-foreground">
            Distribuição dos números secretos
          </p>
        </div>

        {/* Player Section */}
        <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-12 border border-border/30">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div
                className="w-24 h-24 rounded-full border-4 border-foreground/30 flex items-center justify-center font-orbitron font-black text-2xl text-foreground shadow-lg"
                style={{ backgroundColor: currentPlayer.color }}
              >
                {gameState.currentPlayerIndex + 1}
              </div>
              <div className="text-left">
                <h3 className="font-orbitron text-3xl font-bold text-foreground mb-2">
                  {currentPlayer.name.toUpperCase()}
                </h3>
                <p className="text-lg font-inter text-muted-foreground">
                  É a sua vez de ver o seu número
                </p>
              </div>
            </div>

            {!numberVisible ? (
              <Button 
                onClick={showNumber} 
                size="lg" 
                className="px-12 py-4 text-xl font-orbitron font-bold btn-primary hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Eye className="w-6 h-6 mr-3" />
                VER MEU NÚMERO
              </Button>
            ) : (
              <div className="space-y-8">
                <div className="animate-bounce-in">
                  <div className="bg-primary/20 rounded-2xl p-8 border-2 border-primary/30 mb-6">
                    <h4 className="font-orbitron text-2xl font-bold text-foreground mb-4">SEU NÚMERO É:</h4>
                    <div className="font-orbitron text-9xl font-black text-primary mb-4">
                      {currentPlayer.number}
                    </div>
                    <p className="font-inter text-lg text-muted-foreground">
                      Memorize este número!
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={confirmSeen} 
                  size="lg" 
                  className="px-12 py-4 text-xl font-orbitron font-bold btn-secondary hover:scale-105 transition-all duration-300"
                >
                  <EyeOff className="w-6 h-6 mr-3" />
                  JÁ VI!
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Progress and Info */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-lg font-inter text-muted-foreground mb-6">
            {isLastPlayer 
              ? "Após confirmar, o jogo começará!"
              : `Aguardando ${gameState.players.length - gameState.currentPlayerIndex - 1} jogador(es)`
            }
          </p>

          <div className="flex justify-center gap-3">
            {gameState.players.map((player, index) => (
              <div
                key={player.id}
                className={`w-4 h-4 rounded-full transition-all ${
                  index < gameState.currentPlayerIndex 
                    ? 'bg-secondary' 
                    : index === gameState.currentPlayerIndex
                    ? 'bg-primary animate-pulse scale-125'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};