import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface CircularTimerProps {
  duration: number; // duração em segundos
  isActive: boolean; // se o timer está ativo
  onComplete?: () => void; // callback quando completar
  size?: number; // tamanho do círculo
  strokeWidth?: number; // espessura da linha
  className?: string;
  children?: React.ReactNode; // conteúdo interno (como texto)
  color?: string; // cor do progresso
}

export const CircularTimer = ({
  duration,
  isActive,
  onComplete,
  size = 120,
  strokeWidth = 8,
  className,
  children,
  color = 'hsl(var(--primary))'
}: CircularTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(0);

  // Reset quando mudar a duração ou ativar/desativar
  useEffect(() => {
    if (isActive) {
      setTimeLeft(duration);
      setProgress(0);
    }
  }, [isActive, duration]);

  // Timer principal
  useEffect(() => {
    let intervalId: number;

    if (isActive && timeLeft > 0) {
      intervalId = window.setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 0.1; // atualiza a cada 100ms para animação suave
          
          if (newTime <= 0) {
            setProgress(1);
            onComplete?.();
            return 0;
          }
          
          setProgress((duration - newTime) / duration);
          return newTime;
        });
      }, 100);
    }

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [isActive, timeLeft, duration, onComplete]);

  // Configurações do círculo
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress * circumference);

  return (
    <div 
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* Círculo de fundo */}
      <svg
        width={size}
        height={size}
        className="absolute transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          className="opacity-20"
        />
        
        {/* Círculo de progresso com glow */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-100 ease-linear"
          filter="url(#glow)"
          style={{
            filter: `drop-shadow(0 0 12px ${color}60)`
          }}
        />
      </svg>

      {/* Conteúdo interno */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (
          <div className="text-center">
            <div className="font-orbitron text-xl font-bold text-foreground">
              {Math.ceil(timeLeft)}
            </div>
            <div className="font-inter text-xs text-muted-foreground -mt-1">
              seg
            </div>
          </div>
        )}
      </div>

      {/* Efeito de pulso quando ativo */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-full animate-pulse opacity-20"
          style={{
            backgroundColor: color,
            animationDuration: '2s'
          }}
        />
      )}
    </div>
  );
};
