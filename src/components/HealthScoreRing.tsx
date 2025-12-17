import { Heart } from "lucide-react";

interface HealthScoreRingProps {
  score: number;
}

const HealthScoreRing = ({ score }: HealthScoreRingProps) => {
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "stroke-success";
    if (score >= 60) return "stroke-warning";
    return "stroke-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Attention";
  };

  return (
    <div className="bg-card rounded-2xl p-6 card-shadow animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-xl">
          <Heart className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-display font-semibold text-foreground">Health Score</h3>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="relative w-44 h-44">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-muted"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-display font-bold text-foreground">{score}</span>
            <span className="text-sm text-muted-foreground">out of 100</span>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <span className={`text-lg font-semibold ${
            score >= 80 ? "text-success" : score >= 60 ? "text-warning" : "text-destructive"
          }`}>
            {getScoreLabel(score)}
          </span>
          <p className="text-sm text-muted-foreground mt-1">
            Based on your latest health data
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthScoreRing;
