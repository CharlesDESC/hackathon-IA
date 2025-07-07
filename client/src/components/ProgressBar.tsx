import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  totalQuestions: number;
  answeredQuestions: number;
  pollutionLevel: "low" | "medium" | "high";
}

export default function ProgressBar({
  progress,
  totalQuestions,
  answeredQuestions,
  pollutionLevel,
}: ProgressBarProps) {
  const getProgressColor = () => {
    switch (pollutionLevel) {
      case "low":
        return "bg-pollution-green";
      case "medium":
        return "bg-yellow-500";
      case "high":
        return "bg-pollution-red";
      default:
        return "bg-pollution-green";
    }
  };

  const getPollutionText = () => {
    switch (pollutionLevel) {
      case "low":
        return "Low Digital Pollution";
      case "medium":
        return "Medium Digital Pollution";
      case "high":
        return "High Digital Pollution";
      default:
        return "Low Digital Pollution";
    }
  };

  const getTextColor = () => {
    switch (pollutionLevel) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
      default:
        return "text-green-600";
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Progress</span>
        <span className="text-sm text-gray-600">
          {answeredQuestions}/{totalQuestions}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={cn(
            "h-3 rounded-full transition-all duration-500 ease-out",
            getProgressColor()
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-2 text-center">
        <span className={cn("text-sm font-medium", getTextColor())}>
          {getPollutionText()}
        </span>
      </div>
    </div>
  );
}
