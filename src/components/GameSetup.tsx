import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Player, PLAYER_COLORS } from "@/types/game";
import { Dices, Minus, Play, Plus } from "lucide-react";
import { useState } from "react";

interface GameSetupProps {
  onStartGame: (theme: string, players: Player[]) => void;
  existingPlayers?: Omit<Player, "number">[];
}

const THEME_SUGGESTIONS = [
  "Salgadinhos gostosos",
  "Super heróis mais picas",
  "Desenhos animados mais legais",
  "Países do mundo",
  "Frutas tropicais",
  "Carros esportivos",
  "Filmes de terror",
  "Comidas japonesas",
  "Animais fofos",
  "Bandas de rock",
];

export const GameSetup = ({ onStartGame, existingPlayers }: GameSetupProps) => {
  const [theme, setTheme] = useState("");
  const [players, setPlayers] = useState<Omit<Player, "number">[]>(
    existingPlayers || [
      { id: "1", name: "", color: PLAYER_COLORS[0] },
      { id: "2", name: "", color: PLAYER_COLORS[1] },
    ]
  );

  const getRandomTheme = () => {
    const availableThemes = THEME_SUGGESTIONS.filter(
      (suggestion) => suggestion !== theme
    );
    if (availableThemes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableThemes.length);
    setTheme(availableThemes[randomIndex]);
  };

  const addPlayer = () => {
    if (players.length < 8) {
      const usedColors = players.map((p) => p.color);
      const availableColor =
        PLAYER_COLORS.find((color) => !usedColors.includes(color)) ||
        PLAYER_COLORS[0];

      setPlayers([
        ...players,
        {
          id: Date.now().toString(),
          name: "",
          color: availableColor,
        },
      ]);
    }
  };

  const removePlayer = (id: string) => {
    if (players.length > 2) {
      setPlayers(players.filter((p) => p.id !== id));
    }
  };

  const updatePlayer = (
    id: string,
    field: keyof Omit<Player, "number">,
    value: string
  ) => {
    setPlayers(
      players.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const updatePlayerColor = (playerId: string, newColor: string) => {
    const colorInUse = players.some(
      (p) => p.id !== playerId && p.color === newColor
    );
    if (colorInUse) {
      toast({
        title: "Cor já em uso",
        description: "Esta cor já foi escolhida por outro jogador.",
        variant: "destructive",
      });
      return;
    }

    updatePlayer(playerId, "color", newColor);
  };

  const getAvailableColors = (currentPlayerId: string) => {
    const usedColors = players
      .filter((p) => p.id !== currentPlayerId)
      .map((p) => p.color);
    return PLAYER_COLORS.filter((color) => !usedColors.includes(color));
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

    const validPlayers = players.filter((p) => p.name.trim());
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-slide-up">
          <h1 className="font-orbitron text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            DEVITO
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-inter px-4">
            {existingPlayers
              ? "Escolha um novo tema para a próxima partida"
              : "Configure o tema e os jogadores para começar"}
          </p>
        </div>

        {/* Theme Section */}
        <div
          className="mb-8 md:mb-10 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-border/30">
            <Label
              htmlFor="theme"
              className="text-lg md:text-2xl font-orbitron font-bold text-foreground block mb-4"
            >
              TEMA DO JOGO
            </Label>
            <div className="flex gap-3">
              <Input
                id="theme"
                placeholder="Ex: Animais, Cores, Países..."
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="text-lg md:text-xl p-3 md:p-4 font-inter bg-background/50 border border-border/50 rounded-xl flex-1"
              />
              <Button
                onClick={getRandomTheme}
                size="lg"
                variant="outline"
                className="h-10 px-4 py-3 md:px-6 md:py-4 bg-background/30 hover:bg-primary/20 border-border/50 hover:border-primary/50 transition-all duration-200 hover:scale-105"
                title="Clique para sortear um tema aleatório"
              >
                <Dices className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Players Section */}
        <div
          className="mb-8 md:mb-10 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-border/30">
            <div className="flex items-center justify-between mb-6">
              <Label className="text-lg md:text-2xl font-orbitron font-bold text-foreground">
                JOGADORES ({players.length})
              </Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removePlayer.bind(
                    null,
                    players[players.length - 1]?.id
                  )}
                  disabled={players.length <= 2}
                  className="bg-background/30 hover:bg-destructive/20 p-2 md:px-3"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addPlayer}
                  disabled={players.length >= 8}
                  className="bg-background/30 hover:bg-secondary/20 p-2 md:px-3"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 md:p-4 rounded-xl bg-background/30 border border-border/30"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-foreground/20 flex items-center justify-center font-orbitron font-bold text-foreground text-sm md:text-base flex-shrink-0"
                      style={{ backgroundColor: player.color }}
                    >
                      {index + 1}
                    </div>
                    <Input
                      placeholder={`Jogador ${index + 1}`}
                      value={player.name}
                      onChange={(e) =>
                        updatePlayer(player.id, "name", e.target.value)
                      }
                      className="flex-1 font-inter bg-background/50 border-border/50 text-sm md:text-base"
                    />
                  </div>
                  <div className="grid grid-cols-6 sm:flex sm:flex-wrap gap-1.5 sm:gap-1 justify-center sm:justify-end">
                    {PLAYER_COLORS.map((color) => {
                      const isSelected = player.color === color;
                      const isAvailable =
                        getAvailableColors(player.id).includes(color) ||
                        isSelected;

                      return (
                        <button
                          key={color}
                          onClick={() => updatePlayerColor(player.id, color)}
                          disabled={!isAvailable}
                          className={`w-7 h-7 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full border-2 transition-all duration-200 ${
                            isSelected
                              ? "border-foreground scale-110 shadow-lg"
                              : isAvailable
                              ? "border-border/50 hover:border-foreground/70 hover:scale-105"
                              : "border-border/30 opacity-50 cursor-not-allowed"
                          }`}
                          style={{ backgroundColor: color }}
                          title={
                            isAvailable
                              ? "Clique para selecionar"
                              : "Cor já em uso"
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div
          className="text-center animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Button
            onClick={handleStart}
            size="lg"
            className="w-full max-w-sm px-6 md:px-12 py-4 md:py-6 text-base md:text-xl font-orbitron font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg rounded-xl"
          >
            <Play className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
            {existingPlayers ? "NOVA PARTIDA" : "COMEÇAR JOGO"}
          </Button>
        </div>
      </div>
    </div>
  );
};
