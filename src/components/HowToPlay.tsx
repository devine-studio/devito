import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Eye, Hash, Shuffle, Trophy, Users } from "lucide-react";
import { PLAYER_COLORS } from "../types/game";

interface HowToPlayProps {
  onBackToSetup: () => void;
}

export const HowToPlay = ({ onBackToSetup }: HowToPlayProps) => {
  const steps = [
    {
      icon: Users,
      title: "1) Preparação",
      description:
        "Crie a sala, escolha um tema em comum (ex.: ‘Pimentas mais apimentadas’) e adicione de 2 a 8 jogadores com nomes únicos.",
      color: PLAYER_COLORS[0],
    },
    {
      icon: Hash,
      title: "2) Números Secretos",
      description:
        "Cada jogador recebe um número aleatório de 1 a 100. O número representa ‘o quão forte’ você é no tema. Memorize e mantenha em segredo.",
      color: PLAYER_COLORS[1],
    },
    {
      icon: Eye,
      title: "3) Dica",
      description:
        "Todos dão UMA dica relacionada ao tema, tentando refletir a posição do seu número SEM dizer valores, sequências (‘baixo/médio/alto’ só se o grupo permitir) ou pistas óbvias.",
      color: PLAYER_COLORS[2],
    },
    {
      icon: Shuffle,
      title: "4) Debate & Organização",
      description:
        "Com base nas dicas, conversem e arrastem os jogadores para montar a fila do menor para o maior. É cooperativo: decidam juntos!",
      color: PLAYER_COLORS[3],
    },
    {
      icon: Trophy,
      title: "5) Revelar & Pontuar",
      description:
        "Revelem a ordem. Se estiver correta, ponto/estrela para o grupo! Se errarem, o host pode decidir perder ‘vidas’ ou apenas tentar de novo com novo tema.",
      color: PLAYER_COLORS[4],
    },
  ];

  const rules = [
    "Não revele seu número, nem use palavras que denunciem valor (ex.: ‘50’, ‘metade’, ‘quase 100’).",
    "A dica deve se conectar ao tema (ex.: se o tema é ‘Pimentas’, use pimentas reais ou comparações culinárias).",
    "Cooperação > competição: todo mundo discute e decide a ordem final juntos.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8 md:mb-12 animate-slide-up">
          <h1 className="font-orbitron text-4xl md:text-6xl font-black mb-3 bg-primary bg-clip-text text-transparent">
            COMO JOGAR
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-inter px-4">
            Ordenem-se do <span className="font-semibold">1 ao 100</span> usando <span className="font-semibold">dicas temáticas</span> — sem revelar números.
          </p>
        </div>

        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.05s" }}>
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-border/30">
            <h2 className="text-xl md:text-3xl font-orbitron font-bold text-foreground mb-6 text-center">
              FLUXO DA RODADA
            </h2>
            <div className="grid gap-4 md:gap-6">
              {steps.map((step, i) => (
                <Card key={i} className="bg-background/50 border-border/30">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: step.color }}>
                        <step.icon className="w-5 h-5 text-background" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-orbitron font-bold text-lg md:text-xl text-foreground">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground font-inter text-sm md:text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-border/30">
            <h2 className="text-xl md:text-3xl font-orbitron font-bold text-foreground mb-6 text-center">
              REGRAS E BOAS PRÁTICAS
            </h2>
            <div className="grid gap-3 md:gap-4">
              {rules.map((rule, index) => (
                <div key={index} className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-background/30 border border-border/30">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-orbitron font-bold text-xs md:text-sm">{index + 1}</span>
                  </div>
                  <p className="text-foreground font-inter text-sm md:text-base">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center animate-slide-up" style={{ animationDelay: "0.25s" }}>
          <Button
            onClick={onBackToSetup}
            size="lg"
            className="w-full max-w-sm px-6 md:px-12 py-4 md:py-6 text-base md:text-xl font-orbitron font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg rounded-xl"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
            VOLTAR PARA O JOGO
          </Button>
        </div>
      </div>
    </div>
  );
};
