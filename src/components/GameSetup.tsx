import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus, Play, Lightbulb } from 'lucide-react';
import { Player, PLAYER_COLORS } from '@/types/game';
import { toast } from '@/hooks/use-toast';

interface GameSetupProps {
  onStartGame: (theme: string, players: Player[]) => void;
  existingPlayers?: Omit<Player, 'number'>[];
}

const THEME_SUGGESTIONS = [
  'Salgadinhos gostosos',
  'Super heróis mais picas', 
  'Desenhos animados mais legais',
  'Países do mundo',
  'Frutas tropicais',
  'Carros esportivos',
  'Filmes de terror',
  'Comidas japonesas',
  'Animais fofos',
  'Bandas de rock'
];

export const GameSetup = ({ onStartGame, existingPlayers }: GameSetupProps) => {
  const [theme, setTheme] = useState('');
  const [players, setPlayers] = useState<Omit<Player, 'number'>[]>(
    existingPlayers || [
      { id: '1', name: '', color: PLAYER_COLORS[0] },
      { id: '2', name: '', color: PLAYER_COLORS[1] },
    ]
  );

  const addPlayer = () => {
    if (players.length < 8) {
      setPlayers([
        ...players,
        {
          id: Date.now().toString(),
          name: '',
          color: PLAYER_COLORS[players.length],
        },
      ]);
    }
  };

  const removePlayer = (id: string) => {
    if (players.length > 2) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  const updatePlayer = (id: string, field: keyof Omit<Player, 'number'>, value: string) => {
    setPlayers(players.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleStart = () => {
    if (!theme.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um tema para o jogo.",
        variant: "destructive",
      });
      return;
    }

    const validPlayers = players.filter(p => p.name.trim());
    if (validPlayers.length < 2) {
      toast({
        title: "Erro",
        description: "O jogo precisa de pelo menos 2 jogadores com nomes.",
        variant: "destructive",
      });
      return;
    }

    onStartGame(theme, validPlayers as Player[]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="font-orbitron text-6xl font-black mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            MEMORY SEQUENCE
          </h1>
          <p className="text-lg text-muted-foreground font-inter">
            {existingPlayers ? 'Escolha um novo tema para a próxima partida' : 'Configure o tema e os jogadores para começar'}
          </p>
        </div>

        {/* Theme Section */}
        <div className="mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/30">
            <Label htmlFor="theme" className="text-2xl font-orbitron font-bold text-foreground block mb-4">
              TEMA DO JOGO
            </Label>
            <Input
              id="theme"
              placeholder="Ex: Animais, Cores, Países..."
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="text-xl p-4 font-inter bg-background/50 border border-border/50 rounded-xl"
            />
            
            <div className="mt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Lightbulb className="w-4 h-4" />
                <span className="font-inter">Sugestões de temas:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {THEME_SUGGESTIONS.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme(suggestion)}
                    className="text-xs font-inter bg-background/30 hover:bg-primary/20 border-border/50"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Players Section */}
        <div className="mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/30">
            <div className="flex items-center justify-between mb-6">
              <Label className="text-2xl font-orbitron font-bold text-foreground">
                JOGADORES ({players.length})
              </Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removePlayer.bind(null, players[players.length - 1]?.id)}
                  disabled={players.length <= 2}
                  className="bg-background/30 hover:bg-destructive/20"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addPlayer}
                  disabled={players.length >= 8}
                  className="bg-background/30 hover:bg-secondary/20"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {players.map((player, index) => (
                <div key={player.id} className="flex items-center gap-4 p-4 rounded-xl bg-background/30 border border-border/30">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-foreground/20 flex items-center justify-center font-orbitron font-bold text-foreground"
                    style={{ backgroundColor: player.color }}
                  >
                    {index + 1}
                  </div>
                  <Input
                    placeholder={`Nome do Jogador ${index + 1}`}
                    value={player.name}
                    onChange={(e) => updatePlayer(player.id, 'name', e.target.value)}
                    className="flex-1 font-inter bg-background/50 border-border/50"
                  />
                  <input
                    type="color"
                    value={player.color}
                    onChange={(e) => updatePlayer(player.id, 'color', e.target.value)}
                    className="w-12 h-10 rounded-lg border-2 border-border/50 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Button
            onClick={handleStart}
            size="lg"
            className="px-12 py-4 text-xl font-orbitron font-bold btn-primary hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <Play className="w-6 h-6 mr-3" />
            {existingPlayers ? 'NOVA PARTIDA' : 'COMEÇAR JOGO'}
          </Button>
        </div>
      </div>
    </div>
  );
};