import { Card, CardContent } from '@/components/ui/card';
import { Player } from '@/types/game';

interface PlayerCardProps {
  player: Player;
  showNumber?: boolean;
  isCorrectPosition?: boolean;
}

export const PlayerCard = ({ player, showNumber = false, isCorrectPosition }: PlayerCardProps) => {
  return (
    <Card 
      className={`game-card w-32 h-40 cursor-grab active:cursor-grabbing transition-all duration-300 ${
        isCorrectPosition ? 'ring-2 ring-success animate-pulse' : ''
      } ${showNumber ? 'animate-flip' : ''}`}
    >
      <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center">
        <div
          className="w-16 h-16 rounded-full mb-3 border-4 border-white/20 flex items-center justify-center transition-all duration-300"
          style={{ backgroundColor: player.color }}
        >
          {showNumber && (
            <span className="text-white font-bold text-xl">
              {player.number}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-sm leading-tight">{player.name}</h3>
        {showNumber && (
          <div className="mt-2 text-xs text-muted-foreground">
            Número: {player.number}
          </div>
        )}
      </CardContent>
    </Card>
  );
};