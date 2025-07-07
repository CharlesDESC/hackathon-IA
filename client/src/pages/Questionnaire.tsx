import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import useQuestionnaire from "@/hooks/useQuestionnaire";

export default function Questionnaire() {
  const [, setLocation] = useLocation();
  const {
    questions,
    answers,
    answerQuestion,
    getAnswer,
    getTotalScore,
    getAnsweredCount,
    getProgress,
    getPollutionLevel,
    isComplete,
  } = useQuestionnaire();

  const handleAnswerChange = (questionId: number, value: string) => {
    answerQuestion(questionId, parseInt(value));
  };

  const handleShowResults = () => {
    // Store results in localStorage for the results page
    localStorage.setItem('pollutionResults', JSON.stringify({
      totalScore: getTotalScore(),
      totalQuestions: questions.length,
      answers: answers,
    }));
    setLocation("/results");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Évaluation de la Pollution Numérique
        </h2>
        <p className="text-gray-600 text-lg">
          Répondez à ces questions pour comprendre votre empreinte numérique
        </p>
      </div>

      <ProgressBar
        progress={getProgress()}
        totalQuestions={questions.length}
        answeredQuestions={getAnsweredCount()}
        pollutionLevel={getPollutionLevel()}
      />

      <div className="space-y-6">
        {questions.map((question) => (
          <Card key={question.id} className="shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {question.question}
              </h3>
              <RadioGroup
                value={getAnswer(question.id)?.toString() || ""}
                onValueChange={(value) => handleAnswerChange(question.id, value)}
              >
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={option.value.toString()}
                        id={`q${question.id}-${index}`}
                      />
                      <Label
                        htmlFor={`q${question.id}-${index}`}
                        className="cursor-pointer"
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={handleShowResults}
          disabled={!isComplete()}
          size="lg"
          className="bg-cloud-blue hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Voir les Résultats <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
