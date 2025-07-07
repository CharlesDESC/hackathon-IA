import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, HelpCircle, Gamepad2, Lightbulb, Play, Video } from "lucide-react";

export default function Home() {
  return (
    <div className="text-center">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden mb-8 h-96 bg-gradient-to-r from-green-400 to-blue-500">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Secret Data Waste</h1>
            <p className="text-xl md:text-2xl mb-8">Clean Your Invisible Cloud!</p>
            <Link href="/questionnaire">
              <Button size="lg" className="bg-pollution-green hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105">
                Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="mb-12">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="mb-6">
              <Video className="h-12 w-12 text-cloud-blue mb-4 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Learn About Digital Pollution
              </h2>
              <p className="text-gray-600 text-lg">
                Watch this video to understand the environmental impact of our digital habits
              </p>
            </div>
            
            <div className="relative bg-gray-900 rounded-xl overflow-hidden h-64 md:h-96 flex items-center justify-center">
              {/* Video placeholder with play button */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-80"></div>
              
              {/* Floating digital elements */}
              <div className="absolute top-4 left-4 animate-float">
                <div className="bg-white bg-opacity-20 rounded-full p-2">
                  <HelpCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="absolute top-8 right-8 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="bg-white bg-opacity-20 rounded-full p-2">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="absolute bottom-4 left-8 animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-white bg-opacity-20 rounded-full p-2">
                  <Gamepad2 className="h-6 w-6 text-white" />
                </div>
              </div>
              
              {/* Play button */}
              <div className="relative z-10 text-center">
                <Button 
                  size="lg" 
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-2 border-white hover:border-opacity-80 rounded-full p-6 transition-all transform hover:scale-105"
                  onClick={() => {
                    // This would open a video modal or redirect to video URL
                    alert('Video player would open here. You can replace this with your actual video URL or embed code.');
                  }}
                >
                  <Play className="h-8 w-8 ml-1" />
                </Button>
                <p className="text-white text-sm mt-4 font-medium">
                  Click to watch video
                </p>
              </div>
              
              {/* Cloud elements */}
              <div className="absolute bottom-8 right-4 animate-bounce-slow">
                <div className="bg-white bg-opacity-10 rounded-full p-3">
                  <div className="w-8 h-8 bg-white bg-opacity-30 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              <p>
                <strong>Video placeholder:</strong> Replace the onClick handler above with your actual video URL or embed code. 
                You can use YouTube, Vimeo, or any other video platform.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card className="card-hover">
          <CardContent className="p-6">
            <HelpCircle className="h-12 w-12 text-cloud-blue mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Digital Pollution Quiz</h3>
            <p className="text-gray-600">
              Assess your digital footprint with our comprehensive questionnaire
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <Gamepad2 className="h-12 w-12 text-green-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Server Clean-up Game</h3>
            <p className="text-gray-600">
              Learn through interactive gameplay about digital waste management
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <Lightbulb className="h-12 w-12 text-yellow-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Personalized Tips</h3>
            <p className="text-gray-600">
              Get tailored advice to reduce your digital environmental impact
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
