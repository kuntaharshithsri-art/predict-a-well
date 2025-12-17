import { Flame, Footprints, Moon, Droplet } from "lucide-react";

const stats = [
  { 
    icon: Flame, 
    label: "Calories Burned", 
    value: "1,847", 
    unit: "kcal",
    color: "bg-destructive/10 text-destructive",
    progress: 75 
  },
  { 
    icon: Footprints, 
    label: "Steps Today", 
    value: "8,432", 
    unit: "steps",
    color: "bg-primary/10 text-primary",
    progress: 84 
  },
  { 
    icon: Moon, 
    label: "Sleep Quality", 
    value: "7.5", 
    unit: "hours",
    color: "bg-info/10 text-info",
    progress: 90 
  },
  { 
    icon: Droplet, 
    label: "Water Intake", 
    value: "6", 
    unit: "glasses",
    color: "bg-success/10 text-success",
    progress: 60 
  },
];

const QuickStats = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-up" style={{ animationDelay: "0.15s" }}>
      {stats.map((stat, index) => (
        <div 
          key={stat.label}
          className="bg-card rounded-xl p-4 card-shadow hover:card-shadow-hover transition-all duration-300 group"
        >
          <div className={`p-2 ${stat.color} rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-display font-bold text-foreground">{stat.value}</span>
            <span className="text-xs text-muted-foreground">{stat.unit}</span>
          </div>
          <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                stat.progress >= 80 ? 'bg-success' : stat.progress >= 50 ? 'bg-primary' : 'bg-warning'
              }`}
              style={{ width: `${stat.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
