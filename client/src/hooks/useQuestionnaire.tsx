import { useState, useCallback } from "react";

export interface QuestionData {
  id: number;
  question: string;
  options: Array<{
    text: string;
    value: number;
  }>;
}

export const questions: QuestionData[] = [
  {
    id: 1,
    question: "Nettoyez-vous régulièrement votre boîte mail ?",
    options: [
      { text: "Oui, je la nettoie chaque semaine", value: 0 },
      { text: "Parfois, peut-être chaque mois", value: 1 },
      { text: "Rarement ou jamais", value: 2 },
    ],
  },
  {
    id: 2,
    question: "À quelle fréquence regardez-vous des vidéos en 4K ?",
    options: [
      { text: "Jamais ou rarement", value: 0 },
      { text: "Parfois", value: 1 },
      { text: "Quotidiennement ou fréquemment", value: 2 },
    ],
  },
  {
    id: 3,
    question: "Utilisez-vous le stockage cloud pour vos photos et vidéos ?",
    options: [
      { text: "Non, je stocke localement", value: 0 },
      { text: "Oui, mais j'organise régulièrement", value: 1 },
      { text: "Oui, je télécharge tout automatiquement", value: 2 },
    ],
  },
  {
    id: 4,
    question: "Supprimez-vous les anciens fichiers de vos appareils ?",
    options: [
      { text: "Oui, régulièrement", value: 0 },
      { text: "Parfois", value: 1 },
      { text: "Rarement ou jamais", value: 2 },
    ],
  },
  {
    id: 5,
    question: "Combien d'emails non lus avez-vous ?",
    options: [
      { text: "Moins de 50", value: 0 },
      { text: "50-500", value: 1 },
      { text: "Plus de 500", value: 2 },
    ],
  },
  {
    id: 6,
    question: "Utilisez-vous quotidiennement des outils IA comme ChatGPT ou Copilot ?",
    options: [
      { text: "Non, je les utilise rarement", value: 0 },
      { text: "Parfois, pour des tâches spécifiques", value: 1 },
      { text: "Oui, plusieurs fois par jour", value: 2 },
    ],
  },
  {
    id: 7,
    question: "Archivez-vous les documents dont vous n'avez plus besoin ?",
    options: [
      { text: "Oui, je les archive ou les supprime", value: 0 },
      { text: "Parfois", value: 1 },
      { text: "Non, je garde tout", value: 2 },
    ],
  },
  {
    id: 8,
    question: "Sauvegardez-vous vos données chaque semaine ?",
    options: [
      { text: "Oui, automatiquement", value: 0 },
      { text: "Oui, manuellement", value: 1 },
      { text: "Non, je sauvegarde rarement", value: 2 },
    ],
  },
  {
    id: 9,
    question: "À quelle fréquence videz-vous votre corbeille ?",
    options: [
      { text: "Chaque semaine ou plus souvent", value: 0 },
      { text: "Chaque mois", value: 1 },
      { text: "Rarement ou jamais", value: 2 },
    ],
  },
  {
    id: 10,
    question: "Optimisez-vous le stockage de votre smartphone ?",
    options: [
      { text: "Oui, je nettoie et optimise régulièrement", value: 0 },
      { text: "Parfois quand le stockage est plein", value: 1 },
      { text: "Non, je ne gère pas le stockage", value: 2 },
    ],
  },
  {
    id: 11,
    question: "Combien de services de streaming utilisez-vous activement ?",
    options: [
      { text: "1-2 services", value: 0 },
      { text: "3-5 services", value: 1 },
      { text: "Plus de 5 services", value: 2 },
    ],
  },
  {
    id: 12,
    question: "Téléchargez-vous du contenu pour le regarder hors ligne ?",
    options: [
      { text: "Oui, pour réduire le streaming", value: 0 },
      { text: "Parfois", value: 1 },
      { text: "Non, je regarde toujours en streaming", value: 2 },
    ],
  },
];

export default function useQuestionnaire() {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const answerQuestion = useCallback((questionId: number, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }, []);

  const getAnswer = useCallback(
    (questionId: number) => {
      return answers[questionId];
    },
    [answers]
  );

  const getTotalScore = useCallback(() => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  }, [answers]);

  const getAnsweredCount = useCallback(() => {
    return Object.keys(answers).length;
  }, [answers]);

  const getProgress = useCallback(() => {
    return (getAnsweredCount() / questions.length) * 100;
  }, [getAnsweredCount]);

  const getPollutionLevel = useCallback(() => {
    const answeredCount = getAnsweredCount();
    if (answeredCount === 0) return "low";

    const averageScore = getTotalScore() / answeredCount;
    
    if (averageScore < 0.7) return "low";
    if (averageScore < 1.3) return "medium";
    return "high";
  }, [getTotalScore, getAnsweredCount]);

  const isComplete = useCallback(() => {
    return getAnsweredCount() === questions.length;
  }, [getAnsweredCount]);

  const resetAnswers = useCallback(() => {
    setAnswers({});
  }, []);

  return {
    questions,
    answers,
    answerQuestion,
    getAnswer,
    getTotalScore,
    getAnsweredCount,
    getProgress,
    getPollutionLevel,
    isComplete,
    resetAnswers,
  };
}
