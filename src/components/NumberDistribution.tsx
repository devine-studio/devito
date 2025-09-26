import { Button } from '@/components/ui/button';
import { GameState } from '@/types/game';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-3xl text-center">
        {/* Header */}
        <div className="mb-8 md:mb-12 animate-slide-up">
          <h1 className="font-orbitron text-2xl md:text-4xl font-black mb-2 text-foreground">TEMA:</h1>
          <h2 className="font-orbitron text-4xl md:text-6xl font-black text-primary mb-6 md:mb-8">{gameState.theme.toUpperCase()}</h2>
          <p className="text-sm md:text-lg font-inter text-muted-foreground px-4">
            Distribuição dos números secretos
          </p>
        </div>

        {/* Player Section */}
        <div className="mb-8 md:mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 md:p-12 border border-border/30">
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-6 md:mb-8">
              <div
                className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-foreground/30 flex items-center justify-center font-orbitron font-black text-lg md:text-2xl text-foreground shadow-lg"
                style={{ backgroundColor: currentPlayer.color }}
              >
                {gameState.currentPlayerIndex + 1}
              </div>
              <div className="text-left">
                <h3 className="font-orbitron text-xl md:text-3xl font-bold text-foreground mb-2">
                  {currentPlayer.name.toUpperCase()}
                </h3>
                <p className="text-sm md:text-lg font-inter text-muted-foreground">
                  É a sua vez de ver o seu número
                </p>
              </div>
            </div>

            {!numberVisible ? (
              <Button 
                onClick={showNumber} 
                size="lg" 
                className="w-full max-w-sm px-6 md:px-12 py-4 md:py-6 text-base md:text-xl font-orbitron font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg rounded-xl"
              >
                <Eye className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                VER MEU NÚMERO
              </Button>
            ) : (
              <div className="space-y-6 md:space-y-8">
                <div className="animate-bounce-in">
                  <div className="bg-primary/20 rounded-2xl p-4 md:p-8 border-2 border-primary/30 mb-4 md:mb-6">
                    <h4 className="font-orbitron text-lg md:text-2xl font-bold text-foreground mb-3 md:mb-4">SEU NÚMERO É:</h4>
                    <div className="font-orbitron text-6xl md:text-9xl font-black text-primary mb-3 md:mb-4">
                      {currentPlayer.number}
                    </div>
                    <p className="font-inter text-sm md:text-lg text-muted-foreground">
                      Memorize este número!
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={confirmSeen} 
                  size="lg" 
                  className="w-full max-w-sm px-6 md:px-12 py-4 md:py-6 text-base md:text-xl font-orbitron font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105 transition-all duration-300 rounded-xl"
                >
                  <EyeOff className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                  JÁ VI!
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Progress and Info */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm md:text-lg font-inter text-muted-foreground mb-4 md:mb-6 px-4">
            {isLastPlayer 
              ? "Após confirmar, o jogo começará!"
              : `Aguardando ${gameState.players.length - gameState.currentPlayerIndex - 1} jogador(es)`
            }
          </p>

          <div className="flex justify-center gap-2 md:gap-3">
            {gameState.players.map((player, index) => (
              <div
                key={player.id}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all ${
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