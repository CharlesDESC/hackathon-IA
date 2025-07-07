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
    title = "Excellent Digital Habits!";
    description = "You have low digital pollution impact";
  } else if (scorePercentage < 65) {
    grade = "B";
    level = "medium";
    title = "Good Digital Habits";
    description = "You have moderate digital pollution impact";
  } else {
    grade = "C";
    level = "high";
    title = "Room for Improvement";
    description = "You have high digital pollution impact";
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
      title: "Email Management",
      text: "Set up a weekly email cleanup routine. Unsubscribe from newsletters you don't read.",
      color: "text-red-500",
    });
  }

  if (videoQuality >= 1) {
    advice.push({
      icon: "fas fa-video",
      title: "Video Streaming",
      text: "Lower streaming quality when possible. Download content for offline viewing.",
      color: "text-blue-500",
    });
  }

  if (cloudStorage >= 1) {
    advice.push({
      icon: "fas fa-cloud",
      title: "Cloud Storage",
      text: "Organize your cloud storage regularly. Delete unnecessary files and photos.",
      color: "text-purple-500",
    });
  }

  if (fileCleanup >= 1) {
    advice.push({
      icon: "fas fa-folder",
      title: "File Management",
      text: "Schedule monthly file cleanup sessions. Archive old documents properly.",
      color: "text-green-500",
    });
  }

  if (recycleBin >= 1) {
    advice.push({
      icon: "fas fa-trash",
      title: "Digital Waste",
      text: "Empty your recycle bin weekly. Permanently delete unnecessary files.",
      color: "text-gray-500",
    });
  }

  // Add general advice if specific areas are good
  if (advice.length < 3) {
    advice.push({
      icon: "fas fa-leaf",
      title: "Keep It Up!",
      text: "You're doing great! Share these habits with friends and family.",
      color: "text-green-500",
    });
  }

  return advice;
}
