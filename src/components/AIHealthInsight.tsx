import { Sparkles, Brain, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const AIHealthInsight = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-info/5 to-success/5 rounded-2xl p-6 border border-primary/10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-info/10 rounded-full blur-2xl" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 health-gradient rounded-xl">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">AI Health Insights</h3>
            <p className="text-sm text-muted-foreground">Powered by Machine Learning</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 bg-card/80 backdrop-blur-sm rounded-xl">
            <div className="p-1.5 bg-success/10 rounded-lg mt-0.5">
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Cardiovascular Health Improving</p>
              <p className="text-xs text-muted-foreground">Your heart rate variability has increased by 15% this month</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-card/80 backdrop-blur-sm rounded-xl">
            <div className="p-1.5 bg-warning/10 rounded-lg mt-0.5">
              <AlertCircle className="w-4 h-4 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Stress Levels Elevated</p>
              <p className="text-xs text-muted-foreground">Consider adding 10 minutes of meditation to your routine</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-card/80 backdrop-blur-sm rounded-xl">
            <div className="p-1.5 bg-info/10 rounded-lg mt-0.5">
              <Brain className="w-4 h-4 text-info" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Sleep Pattern Analysis</p>
              <p className="text-xs text-muted-foreground">Deep sleep increased by 20 minutes on average</p>
            </div>
          </div>
        </div>

        <Button variant="gradient" className="w-full">
          <Sparkles className="w-4 h-4" />
          Get Full AI Analysis
        </Button>
      </div>
    </div>
  );
};

export default AIHealthInsight;
