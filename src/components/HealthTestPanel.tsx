import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Activity, Gauge, Droplets, Heart, Zap, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { toast } from "sonner";

interface HealthTestPanelProps {
  onClose: () => void;
  onUpdateScore: (score: number) => void;
}

const HealthTestPanel = ({ onClose, onUpdateScore }: HealthTestPanelProps) => {
  const [formData, setFormData] = useState({
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    bloodSugar: "",
    heartRate: "",
    oxygenLevel: "",
    age: "",
    weight: "",
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    status: "healthy" | "moderate" | "attention";
    insights: string[];
  } | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const analyzeHealth = () => {
    // Validate inputs
    const values = Object.values(formData);
    if (values.some(v => !v)) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsAnalyzing(true);

    // Simulate ML analysis
    setTimeout(() => {
      const bpSystolic = parseInt(formData.bloodPressureSystolic);
      const bpDiastolic = parseInt(formData.bloodPressureDiastolic);
      const sugar = parseInt(formData.bloodSugar);
      const heartRate = parseInt(formData.heartRate);
      const oxygen = parseInt(formData.oxygenLevel);

      // Simple scoring algorithm (in production, this would be ML-based)
      let score = 100;
      const insights: string[] = [];

      // Blood Pressure Analysis
      if (bpSystolic > 140 || bpDiastolic > 90) {
        score -= 20;
        insights.push("High blood pressure detected. Consider lifestyle changes and consult a doctor.");
      } else if (bpSystolic < 90 || bpDiastolic < 60) {
        score -= 15;
        insights.push("Low blood pressure detected. Stay hydrated and monitor closely.");
      } else {
        insights.push("Blood pressure is within normal range. Great job!");
      }

      // Blood Sugar Analysis
      if (sugar > 126) {
        score -= 25;
        insights.push("Elevated blood sugar levels. Please consult an endocrinologist.");
      } else if (sugar < 70) {
        score -= 15;
        insights.push("Low blood sugar. Consider eating regular balanced meals.");
      } else {
        insights.push("Blood sugar levels are healthy.");
      }

      // Heart Rate Analysis
      if (heartRate > 100) {
        score -= 10;
        insights.push("Elevated heart rate. Practice relaxation and avoid caffeine.");
      } else if (heartRate < 60) {
        score -= 5;
        insights.push("Low heart rate detected. This may be normal if you're athletic.");
      } else {
        insights.push("Heart rate is optimal.");
      }

      // Oxygen Level Analysis
      if (oxygen < 95) {
        score -= 20;
        insights.push("Low oxygen saturation. Seek medical attention if persistent.");
      } else {
        insights.push("Oxygen levels are excellent.");
      }

      score = Math.max(0, Math.min(100, score));

      const status = score >= 80 ? "healthy" : score >= 60 ? "moderate" : "attention";

      setResult({ score, status, insights });
      onUpdateScore(score);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "healthy":
        return { icon: CheckCircle, color: "text-success", bg: "bg-success/10", label: "Healthy" };
      case "moderate":
        return { icon: Info, color: "text-warning", bg: "bg-warning/10", label: "Moderate Risk" };
      case "attention":
        return { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", label: "Needs Attention" };
      default:
        return { icon: Info, color: "text-muted-foreground", bg: "bg-muted", label: "Unknown" };
    }
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto card-shadow animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 health-gradient rounded-xl">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl text-foreground">Health Analysis Test</h2>
              <p className="text-sm text-muted-foreground">Enter your vitals for ML-powered prediction</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!result ? (
            <div className="space-y-6">
              {/* Blood Pressure */}
              <div className="bg-muted/30 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Gauge className="w-5 h-5 text-primary" />
                  <span className="font-medium text-foreground">Blood Pressure</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Systolic (mmHg)</Label>
                    <Input
                      type="number"
                      placeholder="120"
                      value={formData.bloodPressureSystolic}
                      onChange={(e) => handleChange("bloodPressureSystolic", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Diastolic (mmHg)</Label>
                    <Input
                      type="number"
                      placeholder="80"
                      value={formData.bloodPressureDiastolic}
                      onChange={(e) => handleChange("bloodPressureDiastolic", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Other Metrics */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-info" />
                    <Label className="text-foreground font-medium">Blood Sugar (mg/dL)</Label>
                  </div>
                  <Input
                    type="number"
                    placeholder="95"
                    value={formData.bloodSugar}
                    onChange={(e) => handleChange("bloodSugar", e.target.value)}
                  />
                </div>

                <div className="bg-muted/30 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-destructive" />
                    <Label className="text-foreground font-medium">Heart Rate (BPM)</Label>
                  </div>
                  <Input
                    type="number"
                    placeholder="72"
                    value={formData.heartRate}
                    onChange={(e) => handleChange("heartRate", e.target.value)}
                  />
                </div>

                <div className="bg-muted/30 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-success" />
                    <Label className="text-foreground font-medium">Oxygen Level (%)</Label>
                  </div>
                  <Input
                    type="number"
                    placeholder="98"
                    value={formData.oxygenLevel}
                    onChange={(e) => handleChange("oxygenLevel", e.target.value)}
                  />
                </div>

                <div className="bg-muted/30 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-warning" />
                    <Label className="text-foreground font-medium">Age (years)</Label>
                  </div>
                  <Input
                    type="number"
                    placeholder="35"
                    value={formData.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-muted/30 rounded-xl p-5 space-y-3">
                <Label className="text-foreground font-medium">Weight (kg)</Label>
                <Input
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                />
              </div>

              <Button
                variant="gradient"
                size="lg"
                className="w-full"
                onClick={analyzeHealth}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Analyzing with ML...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Analyze My Health
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Score Display */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full health-gradient mb-4">
                  <span className="text-5xl font-display font-bold text-primary-foreground">{result.score}</span>
                </div>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getStatusConfig(result.status).bg}`}>
                  {(() => {
                    const StatusIcon = getStatusConfig(result.status).icon;
                    return <StatusIcon className={`w-5 h-5 ${getStatusConfig(result.status).color}`} />;
                  })()}
                  <span className={`font-medium ${getStatusConfig(result.status).color}`}>
                    {getStatusConfig(result.status).label}
                  </span>
                </div>
              </div>

              {/* Insights */}
              <div className="space-y-3">
                <h3 className="font-display font-semibold text-foreground">Health Insights</h3>
                {result.insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">{index + 1}</span>
                    </div>
                    <p className="text-foreground">{insight}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setResult(null)}>
                  Test Again
                </Button>
                <Button variant="gradient" className="flex-1" onClick={onClose}>
                  Save & Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthTestPanel;
