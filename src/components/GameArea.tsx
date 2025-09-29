import React from "react";
import { Button } from "@/components/ui/button";
import { GameState } from "@/types/game";
import { Eye, RotateCcw, Trophy, X } from "lucide-react";
import { PlayerCard } from "./PlayerCard";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableCardProps {
  player: any;
  index: number;
  isFinished: boolean;
  showNumber: boolean;
  isCorrectPosition: boolean;
}

const SortableCard = ({
  player,
  index,
  isFinished,
  showNumber,
  isCorrectPosition,
}: SortableCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: player.id,
    disabled: isFinished,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        touchAction: "none",
      }}
      {...attributes}
      {...listeners}
      className="relative flex flex-col items-center"
    >
      <div
        className={`transition-all duration-200 select-none ${
          isDragging
            ? "shadow-2xl opacity-95 rotate-1 scale-105"
            : "hover:scale-105 hover:shadow-lg"
        } ${isCorrectPosition ? "animate-pulse" : ""} ${
          !isFinished ? "cursor-grab active:cursor-grabbing touch-none" : ""
        }`}
        style={{ touchAction: "none" }}
      >
        <PlayerCard
          player={player}
          showNumber={showNumber}
          isCorrectPosition={isCorrectPosition}
        />
      </div>

      <div className="text-center mt-2 md:mt-4">
        <span className="font-orbitron font-bold text-sm md:text-lg text-foreground bg-background/50 px-2 md:px-3 py-1 rounded-full">
          {index + 1}º
        </span>
      </div>
    </div>
  );
};

interface GameAreaProps {
  gameState: GameState;
  onUpdateCardsOrder: (newOrder: string[]) => void;
  onRevealResult: () => void;
  onResetGame: () => void;
  onNewGameWithSamePlayers: () => void;
}

export const GameArea = ({
  gameState,
  onUpdateCardsOrder,
  onRevealResult,
  onResetGame,
  onNewGameWithSamePlayers,
}: GameAreaProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = gameState.cardsOrder.indexOf(active.id as string);
      const newIndex = gameState.cardsOrder.indexOf(over?.id as string);

      onUpdateCardsOrder(arrayMove(gameState.cardsOrder, oldIndex, newIndex));
    }
  };

  const isFinished = gameState.currentPhase === "finished";
  const correctOrder = [...gameState.players]
    .sort((a, b) => a.number - b.number)
    .map((p) => p.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 animate-slide-up">
          <h1 className="font-orbitron text-xl md:text-3xl font-black mb-2 text-foreground">
            TEMA:
          </h1>
          <h2 className="font-orbitron text-3xl md:text-5xl font-black text-primary mb-4">
            {gameState.theme.toUpperCase()}
          </h2>
          <p className="text-sm md:text-lg font-inter text-foreground px-4">
            {isFinished
              ? gameState.gameWon
                ? "🎉 PARABÉNS! VOCÊS VENCERAM!"
                : "😢 QUE PENA! TENTEM NOVAMENTE!"
              : "Clique em uma carta e use as setas para organizá-las em ordem crescente"}
          </p>
        </div>

        {/* Game Board */}
        <div
          className="mb-8 md:mb-12 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-4 md:p-8 border border-border/30">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={gameState.cardsOrder}
                strategy={horizontalListSortingStrategy}
              >
                <div
                  className="flex gap-3 md:gap-6 justify-center flex-wrap min-h-[140px] md:min-h-[200px]"
                  style={{ touchAction: "none" }}
                >
                  {gameState.cardsOrder.map((playerId, index) => {
                    const player = gameState.players.find(
                      (p) => p.id === playerId
                    )!;
                    const isCorrectPosition =
                      isFinished && correctOrder[index] === playerId;

                    return (
                      <SortableCard
                        key={playerId}
                        player={player}
                        index={index}
                        isFinished={isFinished}
                        showNumber={isFinished}
                        isCorrectPosition={isCorrectPosition}
                      />
                    );
                  })}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          className="text-center mb-8 md:mb-12 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          {!isFinished ? (
            <Button
              onClick={onRevealResult}
              size="lg"
              className="w-full max-w-sm px-6 md:px-12 py-4 md:py-6 text-base md:text-xl font-orbitron font-bold bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg rounded-xl"
            >
              <Eye className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
              REVELAR RESULTADO
            </Button>
          ) : (
            <div className="flex gap-3 md:gap-6 items-center justify-center flex-wrap">
              {gameState.gameWon && (
                <div className="flex items-center gap-2 md:gap-3 text-secondary font-orbitron font-bold text-lg md:text-2xl">
                  <Trophy className="w-6 h-6 md:w-8 md:h-8" />
                  VITÓRIA!
                </div>
              )}
              {!gameState.gameWon && (
                <div className="flex items-center gap-2 md:gap-3 text-destructive font-orbitron font-bold text-lg md:text-2xl">
                  <X className="w-6 h-6 md:w-8 md:h-8" />
                  DERROTA!
                </div>
              )}
              <Button
                onClick={onResetGame}
                size="lg"
                variant="outline"
                className="px-3 md:px-8 py-3 md:py-4 text-sm md:text-lg font-orbitron font-bold border-2 border-border/50 bg-background/50 hover:bg-background/80 rounded-xl"
              >
                <RotateCcw className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                NOVO JOGO
              </Button>
              <Button
                onClick={onNewGameWithSamePlayers}
                size="lg"
                className="px-3 md:px-8 py-3 md:py-4 text-sm md:text-lg font-orbitron font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105 transition-all duration-300 rounded-xl"
              >
                <Trophy className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                MESMOS JOGADORES
              </Button>
            </div>
          )}
        </div>

        {/* Results */}
        {isFinished && (
          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-4 md:p-8 border border-border/30">
              <h3 className="text-lg md:text-2xl font-orbitron font-bold mb-6 md:mb-8 text-center text-foreground">
                ORDEM CORRETA:
              </h3>
              <div className="flex justify-center gap-3 md:gap-6 flex-wrap">
                {correctOrder.map((playerId, index) => {
                  const player = gameState.players.find(
                    (p) => p.id === playerId
                  )!;
                  return (
                    <div key={playerId} className="text-center">
                      <div
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto mb-2 md:mb-3 border-2 border-foreground/20 flex items-center justify-center font-orbitron font-black text-lg md:text-xl text-foreground"
                        style={{ backgroundColor: player.color }}
                      >
                        {player.number}
                      </div>
                      <p className="text-sm md:text-lg font-inter font-bold text-foreground">
                        {player.name}
                      </p>
                      <p className="text-xs md:text-sm font-orbitron text-muted-foreground">
                        {index + 1}º
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
