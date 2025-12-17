import { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

interface RecommendationCardProps {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  icon: LucideIcon;
  delay?: number;
}

const RecommendationCard = ({ 
  title, 
  description, 
  priority, 
  icon: Icon,
  delay = 0 
}: RecommendationCardProps) => {
  const priorityStyles = {
    high: {
      bg: "bg-destructive/10",
      icon: "text-destructive",
      badge: "bg-destructive/20 text-destructive",
    },
    medium: {
      bg: "bg-warning/10",
      icon: "text-warning",
      badge: "bg-warning/20 text-warning",
    },
    low: {
      bg: "bg-success/10",
      icon: "text-success",
      badge: "bg-success/20 text-success",
    },
  };

  const styles = priorityStyles[priority];

  return (
    <div 
      className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`p-2 ${styles.bg} rounded-xl shrink-0`}>
        <Icon className={`w-5 h-5 ${styles.icon}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-foreground truncate">{title}</h4>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${styles.badge}`}>
            {priority}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
    </div>
  );
};

export default RecommendationCard;
