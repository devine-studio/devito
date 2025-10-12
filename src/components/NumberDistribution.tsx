import { Button } from '@/components/ui/button';
import { CircularTimer } from '@/components/ui/circular-timer';
import { GameState } from '@/types/game';
import { Clock, Eye, EyeOff } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface NumberDistributionProps {
  gameState: GameState;
  onNumberSeen: () => void;
}

export const NumberDistribution = ({
  gameState,
  onNumberSeen
}: NumberDistributionProps) => {
  const [numberVisible, setNumberVisible] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const autoAdvance = gameState.autoAdvance;
  const timerRef = useRef<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const isLastPlayer =
    gameState.currentPlayerIndex === gameState.players.length - 1;

  const showNumber = () => {
    setNumberVisible(true);
  };

  const confirmSeen = useCallback(() => {
    setNumberVisible(false);
    onNumberSeen();
  }, [onNumberSeen]);

  // Auto-advance timer: apenas quando o número estiver visível
  useEffect(() => {
    if (!autoAdvance) {
      setTimerActive(false);
      return;
    }

    // Clear any pending timer first
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (numberVisible) {
      // Só ativar timer quando número estiver visível
      setTimerActive(true);
      
      // Number visible: wait 5s, then confirm
      timerRef.current = window.setTimeout(() => {
        confirmSeen();
      }, 5000);
    } else {
      // Desativar timer quando número não estiver visível
      setTimerActive(false);
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (!numberVisible) {
        setTimerActive(false);
      }
    };
  }, [autoAdvance, numberVisible, gameState.currentPlayerIndex, confirmSeen]);

  // Callbacks para o timer
  const handleTimerComplete = useCallback(() => {
    confirmSeen();
  }, [confirmSeen]);

  // Auto-focus no botão quando componente carrega
  useEffect(() => {
    if (!numberVisible && buttonRef.current) {
      // Pequeno delay para garantir que o elemento está renderizado
      const timeout = setTimeout(() => {
        buttonRef.current?.focus();
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [numberVisible, gameState.currentPlayerIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      <div className="w-full max-w-3xl text-center min-w-0">
        {/* Header */}
        <div className="mb-8 md:mb-12 animate-slide-up space-y-4">
          <h1 className="font-orbitron text-lg md:text-2xl font-black text-foreground opacity-80">
            TEMA:
          </h1>
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-primary break-words leading-none mx-auto max-w-full overflow-hidden text-ellipsis">
            {gameState.theme.toUpperCase()}
          </h2>
          <div className="pt-2">
            <p className="text-sm md:text-lg font-inter text-muted-foreground">
              Distribuição dos números secretos
            </p>
            {autoAdvance && (
              <p className="text-xs mt-2 text-primary font-medium">
                ⏱️ Modo automático ativo
              </p>
            )}
          </div>
        </div>

        {/* Player Section */}
        <div
          className="mb-8 md:mb-12 animate-slide-up"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-12 border border-border/30">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full border-4 border-foreground/30 flex items-center justify-center font-orbitron font-black text-base sm:text-lg md:text-2xl text-foreground shadow-lg flex-shrink-0"
                style={{ backgroundColor: currentPlayer.color }}
              >
                {gameState.currentPlayerIndex + 1}
              </div>
              <div className="text-center sm:text-left min-w-0 flex-1">
                <h3 className="font-orbitron text-lg sm:text-xl md:text-3xl font-bold text-foreground mb-2 break-words">
                  {currentPlayer.name.toUpperCase()}
                </h3>
                <p className="text-xs sm:text-sm md:text-lg font-inter text-muted-foreground">
                  É a sua vez de ver o seu número
                </p>
              </div>
            </div>

            {!numberVisible ? (
              <Button
                ref={buttonRef}
                onClick={showNumber}
                size="lg"
                className="w-full max-w-sm px-6 md:px-12 py-4 md:py-6 text-base md:text-xl font-orbitron font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg rounded-xl focus:ring-4 focus:ring-primary/50"
              >
                <Eye className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                VER MEU NÚMERO
              </Button>
            ) : (
              <div className="space-y-6 md:space-y-8">
                <div className="animate-bounce-in">
                  <div className="bg-primary/20 rounded-2xl p-4 md:p-8 border-2 border-primary/30 mb-4 md:mb-6">
                    <h4 className="font-orbitron text-lg md:text-2xl font-bold text-foreground mb-3 md:mb-4">
                      SEU NÚMERO É:
                    </h4>
                    <div className="font-orbitron text-6xl md:text-9xl font-black text-primary mb-3 md:mb-4">
                      {currentPlayer.number}
                    </div>
                    <p className="font-inter text-sm md:text-lg text-muted-foreground">
                      Memorize este número!
                    </p>
                  </div>
                </div>

                {/* Timer e Botão lado a lado */}
                <div className="flex items-center justify-center gap-6 md:gap-8">
                  <Button
                    onClick={confirmSeen}
                    size="lg"
                    className="px-6 md:px-12 py-4 md:py-6 text-base md:text-xl font-orbitron font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105 transition-all duration-300 rounded-xl"
                  >
                    <EyeOff className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                    JÁ VI!
                  </Button>

                  {/* Timer - só aparece quando auto-advance está ativo */}
                  {autoAdvance && (
                    <div className="animate-fade-in">
                      <CircularTimer
                        duration={5}
                        isActive={timerActive}
                        onComplete={handleTimerComplete}
                        size={80}
                        strokeWidth={6}
                        color="hsl(var(--secondary))"
                        className={timerActive ? 'animate-timer-pulse' : ''}
                      >
                        <div className="text-center">
                          <div className="font-orbitron text-sm font-bold text-foreground mb-1">
                            {/* Tempo será mostrado automaticamente pelo CircularTimer */}
                          </div>
                          <div className="font-inter text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 mx-auto mb-1" />
                            AUTO
                          </div>
                        </div>
                      </CircularTimer>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress and Info */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-sm md:text-lg font-inter text-muted-foreground mb-4 md:mb-6 px-4">
            {isLastPlayer
              ? 'Após confirmar, o jogo começará!'
              : `Aguardando ${
                  gameState.players.length - gameState.currentPlayerIndex - 1
                } jogador(es)`}
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
