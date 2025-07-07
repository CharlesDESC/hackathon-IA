import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Hand, Leaf, Recycle, Trash2 } from "lucide-react";

export default function MiniGame() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Server Clean-up Mini-Game
      </h2>

      <Card className="shadow-lg mb-8">
        <CardContent className="p-8">
          <div className="relative bg-gray-900 rounded-lg h-96 mb-6 overflow-hidden">
            {/* Game interface mockup */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-purple-900"></div>

            {/* Planet in center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 rounded-full bg-green-400 shadow-lg animate-pulse-slow relative">
                <div className="absolute inset-2 rounded-full bg-green-500 opacity-70"></div>
                <div className="absolute top-6 left-6 w-4 h-4 rounded-full bg-green-600"></div>
                <div className="absolute bottom-8 right-8 w-6 h-6 rounded-full bg-green-600"></div>
              </div>
            </div>

            {/* Floating icons */}
            <div className="absolute top-16 left-16 animate-float">
              <i className="fas fa-envelope text-2xl text-red-400"></i>
            </div>
            <div
              className="absolute top-20 right-20 animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              <i className="fas fa-video text-2xl text-blue-400"></i>
            </div>
            <div
              className="absolute bottom-20 left-20 animate-float"
              style={{ animationDelay: "1s" }}
            >
              <i className="fas fa-robot text-2xl text-purple-400"></i>
            </div>
            <div
              className="absolute bottom-16 right-16 animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <i className="fas fa-file text-2xl text-yellow-400"></i>
            </div>

            {/* Bins at bottom */}
            <div className="absolute bottom-4 left-4 flex space-x-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Recycle className="text-white h-6 w-6" />
              </div>
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <Trash2 className="text-white h-6 w-6" />
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-archive text-white"></i>
              </div>
            </div>

            {/* Score display */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
              <span className="text-sm">
                Pollution Level: <span className="text-green-400">Low</span>
              </span>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">How to Play</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Hand className="text-cloud-blue mr-2 h-5 w-5" />
                  Drag & Drop
                </h4>
                <p className="text-sm text-gray-600">
                  Drag floating icons (emails, videos, AI files) into the correct bins
                  to clean up digital waste.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Leaf className="text-green-500 mr-2 h-5 w-5" />
                  Save the Planet
                </h4>
                <p className="text-sm text-gray-600">
                  Each correct action reduces pollution. Wrong moves increase it. Keep
                  the planet green!
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Recycle className="text-green-600 mr-2 h-5 w-5" />
                  Green Bin
                </h4>
                <p className="text-sm text-gray-600">
                  For recyclable data like old documents and unused files that can be
                  archived.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Trash2 className="text-red-600 mr-2 h-5 w-5" />
                  Red Bin
                </h4>
                <p className="text-sm text-gray-600">
                  For spam emails, duplicate files, and unnecessary data that should be
                  deleted.
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="mt-6 bg-pollution-green hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
            >
              <Play className="mr-2 h-5 w-5" />
              Play Game (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
