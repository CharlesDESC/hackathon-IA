import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Car, Route, Droplets } from "lucide-react";
import { calculatePollutionResults, PollutionResults } from "@/lib/pollutionCalculator";

export default function Results() {
  const [results, setResults] = useState<PollutionResults | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem('pollutionResults');
    if (savedResults) {
      const data = JSON.parse(savedResults);
      const pollutionResults = calculatePollutionResults(
        data.totalScore,
        data.totalQuestions,
        data.answers
      );
      setResults(pollutionResults);
    }
  }, []);

  if (!results) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          No Results Found
        </h2>
        <p className="text-gray-600 mb-8">
          Please complete the questionnaire first to see your results.
        </p>
        <Link href="/questionnaire">
          <Button size="lg" className="bg-cloud-blue hover:bg-blue-600">
            Take Questionnaire
          </Button>
        </Link>
      </div>
    );
  }

  const getScoreColor = () => {
    switch (results.grade) {
      case "A":
        return "bg-pollution-green text-white";
      case "B":
        return "bg-yellow-500 text-white";
      case "C":
        return "bg-pollution-red text-white";
      default:
        return "bg-pollution-green text-white";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your Digital Pollution Results
        </h2>
        <p className="text-gray-600 text-lg">
          Here's your environmental impact assessment
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Score Card */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${getScoreColor()}`}>
                <span className="text-3xl font-bold">{results.grade}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{results.title}</h3>
              <p className="text-gray-600">{results.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Environmental Impact */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Environmental Equivalents</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Car className="text-gray-600 mr-3" />
                  <span className="font-medium">CO2 Emissions</span>
                </div>
                <span className="font-bold text-gray-900">
                  {results.co2Annual} kg/year
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Route className="text-gray-600 mr-3" />
                  <span className="font-medium">Driving Distance</span>
                </div>
                <span className="font-bold text-gray-900">
                  {results.drivingKm} km/year
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Droplets className="text-gray-600 mr-3" />
                  <span className="font-medium">Water Usage</span>
                </div>
                <span className="font-bold text-gray-900">
                  {results.waterLiters} liters/year
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personalized Advice */}
      <Card className="shadow-lg mb-8">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Personalized Recommendations</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {results.advice.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start mb-2">
                  <i className={`${item.icon} ${item.color} mr-3 mt-1`} />
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Link href="/tips">
          <Button size="lg" className="bg-pollution-green hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105">
            Get More Tips <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
