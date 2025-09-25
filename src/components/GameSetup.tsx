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
    <div className="animate-slide-up">
      <Card className="game-card max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold" style={{ color: 'hsl(var(--soft-pink))' }}>
            Jogo da Memória Sequencial
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            {existingPlayers ? 'Escolha um novo tema para a próxima partida' : 'Configure o tema e os jogadores para começar'}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="theme" className="text-lg">Tema do Jogo</Label>
            <Input
              id="theme"
              placeholder="Ex: Animais, Cores, Países..."
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="text-lg p-3"
            />
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lightbulb className="w-4 h-4" />
                <span>Sugestões de temas:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {THEME_SUGGESTIONS.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme(suggestion)}
                    className="text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg">Jogadores ({players.length})</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removePlayer.bind(null, players[players.length - 1]?.id)}
                  disabled={players.length <= 2}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addPlayer}
                  disabled={players.length >= 8}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-3">
              {players.map((player, index) => (
                <div key={player.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/50">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white/20"
                    style={{ backgroundColor: player.color }}
                  />
                  <Input
                    placeholder={`Nome do Jogador ${index + 1}`}
                    value={player.name}
                    onChange={(e) => updatePlayer(player.id, 'name', e.target.value)}
                    className="flex-1"
                  />
                  <input
                    type="color"
                    value={player.color}
                    onChange={(e) => updatePlayer(player.id, 'color', e.target.value)}
                    className="w-12 h-8 rounded border-0 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleStart}
            size="lg"
            className="w-full btn-primary text-lg py-6 hover:scale-105 transition-transform"
          >
            <Play className="w-5 h-5 mr-2" />
            {existingPlayers ? 'Nova Partida' : 'Começar Jogo'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};