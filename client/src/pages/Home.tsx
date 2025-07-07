import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, HelpCircle, Gamepad2, Lightbulb } from "lucide-react";

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
