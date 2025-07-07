export interface PollutionResults {
  grade: "A" | "B" | "C";
  level: "low" | "medium" | "high";
  title: string;
  description: string;
  co2Annual: number;
  drivingKm: number;
  waterLiters: number;
  advice: Array<{
    icon: string;
    title: string;
    text: string;
    color: string;
  }>;
}

export function calculatePollutionResults(
  totalScore: number,
  totalQuestions: number,
  answers: Record<number, number>
): PollutionResults {
  const maxScore = totalQuestions * 2;
  const scorePercentage = (totalScore / maxScore) * 100;

  // Determine grade and level
  let grade: "A" | "B" | "C";
  let level: "low" | "medium" | "high";
  let title: string;
  let description: string;

  if (scorePercentage < 35) {
    grade = "A";
    level = "low";
    title = "Excellentes Habitudes Numériques !";
    description = "Vous avez un faible impact de pollution numérique";
  } else if (scorePercentage < 65) {
    grade = "B";
    level = "medium";
    title = "Bonnes Habitudes Numériques";
    description = "Vous avez un impact modéré de pollution numérique";
  } else {
    grade = "C";
    level = "high";
    title = "Des Améliorations Possibles";
    description = "Vous avez un fort impact de pollution numérique";
  }

  // Calculate environmental equivalents
  const co2Annual = Math.round(20 + (scorePercentage / 100) * 180); // 20-200 kg CO2/year
  const drivingKm = Math.round(co2Annual * 4.5); // Rough conversion
  const waterLiters = Math.round(co2Annual * 15); // Rough conversion

  // Generate personalized advice
  const advice = generatePersonalizedAdvice(answers);

  return {
    grade,
    level,
    title,
    description,
    co2Annual,
    drivingKm,
    waterLiters,
    advice,
  };
}

function generatePersonalizedAdvice(answers: Record<number, number>) {
  const advice = [];

  // Check specific answers and provide targeted advice
  const emailCleanup = answers[1]; // Q1: Email inbox cleaning
  const videoQuality = answers[2]; // Q2: 4K video watching
  const cloudStorage = answers[3]; // Q3: Cloud storage usage
  const fileCleanup = answers[4]; // Q4: File deletion
  const recycleBin = answers[9]; // Q9: Recycle bin emptying

  if (emailCleanup >= 1) {
    advice.push({
      icon: "fas fa-envelope",
      title: "Gestion des Emails",
      text: "Établissez une routine de nettoyage hebdomadaire. Désabonnez-vous des newsletters que vous ne lisez pas.",
      color: "text-red-500",
    });
  }

  if (videoQuality >= 1) {
    advice.push({
      icon: "fas fa-video",
      title: "Streaming Vidéo",
      text: "Diminuez la qualité de streaming quand possible. Téléchargez du contenu pour le regarder hors ligne.",
      color: "text-blue-500",
    });
  }

  if (cloudStorage >= 1) {
    advice.push({
      icon: "fas fa-cloud",
      title: "Stockage Cloud",
      text: "Organisez votre stockage cloud régulièrement. Supprimez les fichiers et photos inutiles.",
      color: "text-purple-500",
    });
  }

  if (fileCleanup >= 1) {
    advice.push({
      icon: "fas fa-folder",
      title: "Gestion des Fichiers",
      text: "Planifiez des sessions mensuelles de nettoyage. Archivez correctement les anciens documents.",
      color: "text-green-500",
    });
  }

  if (recycleBin >= 1) {
    advice.push({
      icon: "fas fa-trash",
      title: "Déchets Numériques",
      text: "Videz votre corbeille chaque semaine. Supprimez définitivement les fichiers inutiles.",
      color: "text-gray-500",
    });
  }

  // Add general advice if specific areas are good
  if (advice.length < 3) {
    advice.push({
      icon: "fas fa-leaf",
      title: "Continuez Ainsi !",
      text: "Vous faites du bon travail ! Partagez ces habitudes avec vos amis et votre famille.",
      color: "text-green-500",
    });
  }

  return advice;
}
