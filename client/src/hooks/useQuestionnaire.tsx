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
    question: "Do you regularly clean your email inbox?",
    options: [
      { text: "Yes, I clean it weekly", value: 0 },
      { text: "Sometimes, maybe monthly", value: 1 },
      { text: "Rarely or never", value: 2 },
    ],
  },
  {
    id: 2,
    question: "How often do you watch videos in 4K?",
    options: [
      { text: "Never or rarely", value: 0 },
      { text: "Sometimes", value: 1 },
      { text: "Daily or frequently", value: 2 },
    ],
  },
  {
    id: 3,
    question: "Do you use cloud storage for photos and videos?",
    options: [
      { text: "No, I store locally", value: 0 },
      { text: "Yes, but I organize regularly", value: 1 },
      { text: "Yes, I upload everything automatically", value: 2 },
    ],
  },
  {
    id: 4,
    question: "Do you delete old files from your devices?",
    options: [
      { text: "Yes, regularly", value: 0 },
      { text: "Sometimes", value: 1 },
      { text: "Rarely or never", value: 2 },
    ],
  },
  {
    id: 5,
    question: "How many unread emails do you have?",
    options: [
      { text: "Less than 50", value: 0 },
      { text: "50-500", value: 1 },
      { text: "More than 500", value: 2 },
    ],
  },
  {
    id: 6,
    question: "Do you use AI tools like ChatGPT or Copilot daily?",
    options: [
      { text: "No, rarely use them", value: 0 },
      { text: "Sometimes, for specific tasks", value: 1 },
      { text: "Yes, multiple times daily", value: 2 },
    ],
  },
  {
    id: 7,
    question: "Do you archive documents you no longer need?",
    options: [
      { text: "Yes, I archive or delete them", value: 0 },
      { text: "Sometimes", value: 1 },
      { text: "No, I keep everything", value: 2 },
    ],
  },
  {
    id: 8,
    question: "Do you backup your data weekly?",
    options: [
      { text: "Yes, automatically", value: 0 },
      { text: "Yes, manually", value: 1 },
      { text: "No, rarely backup", value: 2 },
    ],
  },
  {
    id: 9,
    question: "How often do you empty your recycle bin?",
    options: [
      { text: "Weekly or more often", value: 0 },
      { text: "Monthly", value: 1 },
      { text: "Rarely or never", value: 2 },
    ],
  },
  {
    id: 10,
    question: "Do you optimize your smartphone storage?",
    options: [
      { text: "Yes, regularly clean and optimize", value: 0 },
      { text: "Sometimes when storage is full", value: 1 },
      { text: "No, I don't manage storage", value: 2 },
    ],
  },
  {
    id: 11,
    question: "How many streaming services do you actively use?",
    options: [
      { text: "1-2 services", value: 0 },
      { text: "3-5 services", value: 1 },
      { text: "More than 5 services", value: 2 },
    ],
  },
  {
    id: 12,
    question: "Do you download content for offline viewing?",
    options: [
      { text: "Yes, to reduce streaming", value: 0 },
      { text: "Sometimes", value: 1 },
      { text: "No, I always stream", value: 2 },
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
