import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Hand, Leaf, Recycle, Trash2, RotateCcw, Trophy, Mail, Video, Bot, FileText, Archive } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameItem {
  id: string;
  type: "email" | "video" | "ai" | "file";
  x: number;
  y: number;
  correctBin: "delete" | "archive" | "recycle";
  isDragging: boolean;
  isVisible: boolean;
}

interface GameState {
  score: number;
  pollutionLevel: number;
  itemsCleared: number;
  isGameActive: boolean;
  timeLeft: number;
  gameResult: "none" | "win" | "lose";
}

const GAME_ITEMS: Omit<GameItem, "x" | "y" | "isDragging" | "isVisible">[] = [
  { id: "spam-email", type: "email", correctBin: "delete" },
  { id: "old-video", type: "video", correctBin: "archive" },
  { id: "ai-query", type: "ai", correctBin: "recycle" },
  { id: "duplicate-file", type: "file", correctBin: "delete" },
  { id: "newsletter", type: "email", correctBin: "delete" },
  { id: "backup-video", type: "video", correctBin: "archive" },
  { id: "ai-model", type: "ai", correctBin: "recycle" },
  { id: "temp-file", type: "file", correctBin: "delete" },
];

export default function MiniGame() {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    pollutionLevel: 50,
    itemsCleared: 0,
    isGameActive: false,
    timeLeft: 60,
    gameResult: "none",
  });

  const [gameItems, setGameItems] = useState<GameItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomPosition = () => ({
    x: Math.random() * 300 + 50,
    y: Math.random() * 200 + 50,
  });

  const initializeGame = () => {
    const items: GameItem[] = GAME_ITEMS.map((item) => ({
      ...item,
      ...getRandomPosition(),
      isDragging: false,
      isVisible: true,
    }));
    setGameItems(items);
    setGameState({
      score: 0,
      pollutionLevel: 50,
      itemsCleared: 0,
      isGameActive: true,
      timeLeft: 60,
      gameResult: "none",
    });
  };

  const startGame = () => {
    initializeGame();
    startTimer();
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeLeft <= 1) {
          endGame();
          return { ...prev, timeLeft: 0, isGameActive: false };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  };

  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState((prev) => ({
      ...prev,
      isGameActive: false,
      gameResult: prev.pollutionLevel < 30 ? "win" : prev.pollutionLevel > 70 ? "lose" : "win",
    }));
  };

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    setGameItems((prev) =>
      prev.map((item) => ({
        ...item,
        isDragging: item.id === itemId,
      }))
    );
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setGameItems((prev) =>
      prev.map((item) => ({
        ...item,
        isDragging: false,
      }))
    );
  };

  const handleDrop = (e: React.DragEvent, binType: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    const draggedItemData = gameItems.find((item) => item.id === draggedItem);
    if (!draggedItemData) return;

    const isCorrect = draggedItemData.correctBin === binType;
    const points = isCorrect ? 10 : -5;
    const pollutionChange = isCorrect ? -5 : 8;

    setGameState((prev) => ({
      ...prev,
      score: prev.score + points,
      pollutionLevel: Math.max(0, Math.min(100, prev.pollutionLevel + pollutionChange)),
      itemsCleared: prev.itemsCleared + 1,
    }));

    setGameItems((prev) =>
      prev.map((item) =>
        item.id === draggedItem ? { ...item, isVisible: false } : item
      )
    );

    // Check if all items are cleared
    const remainingItems = gameItems.filter((item) => item.isVisible && item.id !== draggedItem);
    if (remainingItems.length === 0) {
      endGame();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const getPollutionColor = () => {
    if (gameState.pollutionLevel < 30) return "bg-green-400";
    if (gameState.pollutionLevel < 70) return "bg-yellow-400";
    return "bg-red-400";
  };

  const getPollutionText = () => {
    if (gameState.pollutionLevel < 30) return "Low";
    if (gameState.pollutionLevel < 70) return "Medium";
    return "High";
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-6 w-6" />;
      case "video":
        return <Video className="h-6 w-6" />;
      case "ai":
        return <Bot className="h-6 w-6" />;
      case "file":
        return <FileText className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case "email":
        return "text-red-400";
      case "video":
        return "text-blue-400";
      case "ai":
        return "text-purple-400";
      case "file":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Server Clean-up Mini-Game
      </h2>

      <Card className="shadow-lg mb-8">
        <CardContent className="p-8">
          {/* Game Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Score</div>
              <div className="text-xl font-bold text-blue-600">{gameState.score}</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Items Cleared</div>
              <div className="text-xl font-bold text-green-600">{gameState.itemsCleared}</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Time Left</div>
              <div className="text-xl font-bold text-purple-600">{gameState.timeLeft}s</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Pollution</div>
              <div className={cn("text-xl font-bold", 
                gameState.pollutionLevel < 30 ? "text-green-600" :
                gameState.pollutionLevel < 70 ? "text-yellow-600" : "text-red-600"
              )}>
                {getPollutionText()}
              </div>
            </div>
          </div>

          {/* Game Area */}
          <div 
            ref={gameAreaRef}
            className="relative bg-gray-900 rounded-lg h-96 mb-6 overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-purple-900"></div>

            {/* Planet in center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className={cn(
                "w-32 h-32 rounded-full shadow-lg animate-pulse-slow relative transition-all duration-500",
                getPollutionColor()
              )}>
                <div className="absolute inset-2 rounded-full bg-white opacity-20"></div>
                <div className="absolute top-6 left-6 w-4 h-4 rounded-full bg-white opacity-30"></div>
                <div className="absolute bottom-8 right-8 w-6 h-6 rounded-full bg-white opacity-30"></div>
              </div>
            </div>

            {/* Game Items */}
            {gameState.isGameActive && gameItems.map((item) => (
              item.isVisible && (
                <div
                  key={item.id}
                  className={cn(
                    "absolute cursor-move animate-float transition-all duration-300",
                    item.isDragging ? "scale-110 z-10" : "scale-100"
                  )}
                  style={{
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  onDragEnd={handleDragEnd}
                >
                  <div className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow">
                    <div className={getItemColor(item.type)}>
                      {getItemIcon(item.type)}
                    </div>
                  </div>
                </div>
              )
            ))}

            {/* Bins */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-6">
              <div
                className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors"
                onDrop={(e) => handleDrop(e, "delete")}
                onDragOver={handleDragOver}
              >
                <Trash2 className="text-white h-8 w-8" />
                <div className="absolute -bottom-8 text-white text-xs">Delete</div>
              </div>
              <div
                className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
                onDrop={(e) => handleDrop(e, "archive")}
                onDragOver={handleDragOver}
              >
                <Archive className="text-white h-8 w-8" />
                <div className="absolute -bottom-8 text-white text-xs">Archive</div>
              </div>
              <div
                className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-700 transition-colors"
                onDrop={(e) => handleDrop(e, "recycle")}
                onDragOver={handleDragOver}
              >
                <Recycle className="text-white h-8 w-8" />
                <div className="absolute -bottom-8 text-white text-xs">Recycle</div>
              </div>
            </div>
          </div>

          {/* Game Result */}
          {gameState.gameResult !== "none" && (
            <div className="mb-6 p-4 rounded-lg bg-gray-50">
              <div className="flex items-center justify-center mb-2">
                <Trophy className={cn("h-8 w-8 mr-2", 
                  gameState.gameResult === "win" ? "text-yellow-500" : "text-gray-400"
                )} />
                <h3 className="text-2xl font-bold">
                  {gameState.gameResult === "win" ? "Planet Saved!" : "Game Over"}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {gameState.gameResult === "win" 
                  ? "Great job! You've reduced digital pollution and saved the planet!"
                  : "The planet is too polluted! Try again to improve your digital habits."
                }
              </p>
              <p className="text-sm text-gray-500">
                Final Score: {gameState.score} | Items Cleared: {gameState.itemsCleared}
              </p>
            </div>
          )}

          {/* Game Controls */}
          <div className="text-center">
            {!gameState.isGameActive && gameState.gameResult === "none" && (
              <Button
                onClick={startGame}
                size="lg"
                className="bg-pollution-green hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Game
              </Button>
            )}

            {gameState.gameResult !== "none" && (
              <Button
                onClick={startGame}
                size="lg"
                className="bg-cloud-blue hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Play Again
              </Button>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-8 text-left">
            <h3 className="text-xl font-semibold mb-4 text-center">How to Play</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Hand className="text-cloud-blue mr-2 h-5 w-5" />
                  Drag & Drop
                </h4>
                <p className="text-sm text-gray-600">
                  Drag the floating items into the correct bins to clean up digital waste.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Leaf className="text-green-500 mr-2 h-5 w-5" />
                  Save the Planet
                </h4>
                <p className="text-sm text-gray-600">
                  Each correct action reduces pollution. Wrong moves increase it!
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Trophy className="text-yellow-500 mr-2 h-5 w-5" />
                  Win Condition
                </h4>
                <p className="text-sm text-gray-600">
                  Clear all items before time runs out while keeping pollution low.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
