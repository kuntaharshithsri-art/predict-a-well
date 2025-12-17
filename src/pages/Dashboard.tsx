import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, Activity, Droplets, Gauge, 
  Bell, TrendingUp, User, LogOut, 
  ChevronRight, Stethoscope, AlertCircle,
  CheckCircle, Clock, Zap
} from "lucide-react";
import { toast } from "sonner";
import HealthMetricCard from "@/components/HealthMetricCard";
import HealthTestPanel from "@/components/HealthTestPanel";
import HealthScoreRing from "@/components/HealthScoreRing";
import RecommendationCard from "@/components/RecommendationCard";
import RemindersList from "@/components/RemindersList";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [healthScore, setHealthScore] = useState(78);
  const [showTestPanel, setShowTestPanel] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("healthUser");
    if (!storedUser) {
      navigate("/auth");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("healthUser");
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const metrics = [
    { 
      title: "Blood Pressure", 
      value: "120/80", 
      unit: "mmHg", 
      icon: Gauge, 
      status: "normal" as const,
      trend: "+2%",
      color: "primary"
    },
    { 
      title: "Blood Sugar", 
      value: "95", 
      unit: "mg/dL", 
      icon: Droplets, 
      status: "normal" as const,
      trend: "-5%",
      color: "success"
    },
    { 
      title: "Heart Rate", 
      value: "72", 
      unit: "BPM", 
      icon: Heart, 
      status: "normal" as const,
      trend: "0%",
      color: "info"
    },
    { 
      title: "Oxygen Level", 
      value: "98", 
      unit: "%", 
      icon: Activity, 
      status: "normal" as const,
      trend: "+1%",
      color: "primary"
    },
  ];

  const recommendations = [
    { 
      title: "Increase Water Intake", 
      description: "Based on your activity level, aim for 8-10 glasses daily",
      priority: "medium" as const,
      icon: Droplets
    },
    { 
      title: "Morning Walk Recommended", 
      description: "30 minutes of walking can improve your heart health score",
      priority: "high" as const,
      icon: Activity
    },
    { 
      title: "Sleep Pattern Optimal", 
      description: "Great job! Your 7.5 hours average is within healthy range",
      priority: "low" as const,
      icon: CheckCircle
    },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 health-gradient rounded-xl">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-foreground">NEXTGEn Health Predictor</span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button className="text-foreground font-medium flex items-center gap-2 hover:text-primary transition-colors">
                <Activity className="w-4 h-4" /> Dashboard
              </button>
              <button 
                onClick={() => navigate("/profile")}
                className="text-muted-foreground font-medium flex items-center gap-2 hover:text-primary transition-colors"
              >
                <User className="w-4 h-4" /> Profile
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center">3</span>
              </Button>
              <div className="hidden md:flex items-center gap-3 pl-4 border-l border-border">
                <div className="w-9 h-9 rounded-full health-gradient flex items-center justify-center text-primary-foreground font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-foreground">{user.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Good Morning, {user.name.split(" ")[0]}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's your health overview for today
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Health Score & Test Button */}
            <div className="grid md:grid-cols-2 gap-6">
              <HealthScoreRing score={healthScore} />
              
              <div className="bg-card rounded-2xl p-6 card-shadow animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Stethoscope className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground">Quick Health Test</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Enter your current vitals to get an instant health prediction powered by ML algorithms.
                </p>
                <Button 
                  variant="gradient" 
                  className="w-full"
                  onClick={() => setShowTestPanel(true)}
                >
                  <Zap className="w-5 h-5" />
                  Start Health Test
                </Button>
              </div>
            </div>

            {/* Health Metrics Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <HealthMetricCard key={metric.title} {...metric} delay={index * 0.1} />
              ))}
            </div>

            {/* Recommendations */}
            <div className="bg-card rounded-2xl p-6 card-shadow animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/10 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-success" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg">Health Recommendations</h3>
                </div>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <RecommendationCard key={rec.title} {...rec} delay={index * 0.1} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Reminders */}
          <div className="space-y-6">
            <RemindersList />
          </div>
        </div>
      </main>

      {/* Health Test Panel Modal */}
      {showTestPanel && (
        <HealthTestPanel 
          onClose={() => setShowTestPanel(false)} 
          onUpdateScore={setHealthScore}
        />
      )}
    </div>
  );
};

export default Dashboard;
