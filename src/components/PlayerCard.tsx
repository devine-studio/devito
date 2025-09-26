import { Player } from '@/types/game';

interface PlayerCardProps {
  player: Player;
  showNumber?: boolean;
  isCorrectPosition?: boolean;
}

export const PlayerCard = ({ player, showNumber = false, isCorrectPosition }: PlayerCardProps) => {
  return (
    <div 
      className={`w-24 h-32 md:w-36 md:h-48 rounded-xl border-2 border-foreground/20 cursor-grab active:cursor-grabbing transition-all duration-200 bg-card/80 backdrop-blur-sm ${
        isCorrectPosition ? 'ring-4 ring-secondary' : ''
      } ${showNumber ? 'animate-flip' : ''} hover:shadow-lg`}
    >
      <div className="p-2 md:p-4 h-full flex flex-col items-center justify-center text-center">
        <div
          className="w-14 h-14 md:w-20 md:h-20 rounded-full mb-2 md:mb-4 border-3 border-foreground/30 flex items-center justify-center transition-all duration-300 shadow-md"
          style={{ backgroundColor: player.color }}
        >
          {showNumber && (
            <span className="font-orbitron font-black text-lg md:text-2xl text-foreground">
              {player.number}
            </span>
          )}
        </div>
        <h3 className="font-inter font-bold text-sm md:text-lg leading-tight text-foreground mb-1 md:mb-2">{player.name}</h3>
        {showNumber && (
          <div className="font-orbitron text-xs md:text-sm text-muted-foreground">
            #{player.number}
          </div>
        )}
      </div>
    </div>
  );
};