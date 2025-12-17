import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface HealthMetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  status: "normal" | "warning" | "critical";
  trend: string;
  color: string;
  delay?: number;
}

const HealthMetricCard = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  status, 
  trend,
  color,
  delay = 0 
}: HealthMetricCardProps) => {
  const statusColors = {
    normal: "text-success",
    warning: "text-warning",
    critical: "text-destructive",
  };

  const bgColors: Record<string, string> = {
    primary: "bg-primary/10",
    success: "bg-success/10",
    info: "bg-info/10",
    warning: "bg-warning/10",
  };

  const iconColors: Record<string, string> = {
    primary: "text-primary",
    success: "text-success",
    info: "text-info",
    warning: "text-warning",
  };

  const trendValue = parseFloat(trend);
  const TrendIcon = trendValue > 0 ? TrendingUp : trendValue < 0 ? TrendingDown : Minus;

  return (
    <div 
      className="bg-card rounded-2xl p-5 card-shadow hover:card-shadow-hover transition-all duration-300 animate-slide-up group"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 ${bgColors[color]} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${iconColors[color]}`} />
        </div>
        <div className={`flex items-center gap-1 text-sm ${statusColors[status]}`}>
          <TrendIcon className="w-4 h-4" />
          <span>{trend}</span>
        </div>
      </div>
      
      <h4 className="text-sm text-muted-foreground mb-1">{title}</h4>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-display font-bold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
      
      <div className="mt-3 pt-3 border-t border-border">
        <span className={`text-xs font-medium capitalize ${statusColors[status]}`}>
          ● Status: {status}
        </span>
      </div>
    </div>
  );
};

export default HealthMetricCard;
