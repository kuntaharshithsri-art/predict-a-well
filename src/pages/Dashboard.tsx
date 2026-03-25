import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, Activity, Droplets, Gauge, 
  Bell, TrendingUp, User, LogOut, 
  ChevronRight, Stethoscope, 
  CheckCircle, Zap, Settings,
  LayoutDashboard, FileText, Calendar, Home
} from "lucide-react";
import { toast } from "sonner";
import HealthMetricCard from "@/components/HealthMetricCard";
import HealthTestPanel from "@/components/HealthTestPanel";
import HealthScoreRing from "@/components/HealthScoreRing";
import RecommendationCard from "@/components/RecommendationCard";
import RemindersList from "@/components/RemindersList";
import QuickStats from "@/components/QuickStats";
import WeeklyActivityChart from "@/components/WeeklyActivityChart";
import AIHealthInsight from "@/components/AIHealthInsight";
import UpcomingAppointments from "@/components/UpcomingAppointments";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [healthScore, setHealthScore] = useState(78);
  const [showTestPanel, setShowTestPanel] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const storedUser = localStorage.getItem("healthUser");
    if (!storedUser) {
      navigate("/auth");
      return;
    }
    setUser(JSON.parse(storedUser));

    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("healthUser");
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
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
      <header className="bg-card/95 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 health-gradient rounded-xl shadow-md">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-display font-bold text-foreground">Data-Driven Health Predictor</span>
                <p className="text-xs text-muted-foreground hidden sm:block">AI-Powered Health Intelligence</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-6">
              <button className="text-foreground font-medium flex items-center gap-2 hover:text-primary transition-colors">
                <Activity className="w-4 h-4" /> Dashboard
              </button>
              <button 
                onClick={() => navigate("/profile")}
                className="text-muted-foreground font-medium flex items-center gap-2 hover:text-primary transition-colors"
              >
                <User className="w-4 h-4" /> Profile
              </button>
              <button className="text-muted-foreground font-medium flex items-center gap-2 hover:text-primary transition-colors">
                <Settings className="w-4 h-4" /> Settings
              </button>
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-primary" onClick={() => navigate("/")}>
                <Home className="w-4 h-4" />
                <span className="hidden md:inline ml-1">Home</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-foreground hover:text-primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden md:inline ml-1">Dashboard</span>
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" onClick={() => navigate("/profile")}>
                <User className="w-4 h-4" />
                <span className="hidden md:inline ml-1">Profile</span>
              </Button>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-primary" onClick={() => setShowTestPanel(true)}>
                <Stethoscope className="w-4 h-4" />
                <span className="hidden md:inline ml-1">Test</span>
              </Button>

              <div className="w-px h-6 bg-border mx-1" />

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center font-bold animate-pulse">3</span>
              </Button>
              <div className="hidden md:flex items-center gap-3 pl-2 border-l border-border">
                <div className="w-10 h-10 rounded-full health-gradient flex items-center justify-center text-primary-foreground font-bold shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:block">
                  <p className="font-medium text-foreground text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 lg:py-8">
        {/* Welcome Section */}
        <div className="mb-6 animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-1">
                {getGreeting()}, {user.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-muted-foreground">
                {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <Button variant="gradient" onClick={() => setShowTestPanel(true)} className="shrink-0">
              <Stethoscope className="w-5 h-5" />
              Quick Health Test
            </Button>
          </div>
        </div>

        {/* Quick Stats Row */}
        <QuickStats />

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Health Score & AI Insights Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <HealthScoreRing score={healthScore} />
              <AIHealthInsight />
            </div>

            {/* Health Metrics Grid */}
            <div>
              <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Vital Signs Overview
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {metrics.map((metric, index) => (
                  <HealthMetricCard key={metric.title} {...metric} delay={index * 0.1} />
                ))}
              </div>
            </div>

            {/* Weekly Activity Chart */}
            <WeeklyActivityChart />

            {/* Recommendations */}
            <div className="bg-card rounded-2xl p-6 card-shadow animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/10 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-success" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg">Personalized Recommendations</h3>
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

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Test Card */}
            <div className="bg-gradient-to-br from-primary/10 via-info/5 to-success/10 rounded-2xl p-6 border border-primary/20 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 health-gradient rounded-xl">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground">ML Health Analysis</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Enter your vitals for instant AI-powered health predictions and risk assessment.
              </p>
              <Button 
                variant="gradient" 
                className="w-full"
                onClick={() => setShowTestPanel(true)}
              >
                <Stethoscope className="w-5 h-5" />
                Start Analysis
              </Button>
            </div>

            {/* Reminders */}
            <RemindersList />

            {/* Upcoming Appointments */}
            <UpcomingAppointments />
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
