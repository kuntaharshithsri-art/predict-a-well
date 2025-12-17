import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Heart, ArrowLeft, User, Mail, Calendar, 
  Ruler, Weight, Phone, MapPin, Save,
  Activity, TrendingUp, Award, Target
} from "lucide-react";
import { toast } from "sonner";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    address: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("healthUser");
    if (!storedUser) {
      navigate("/auth");
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);
    setProfile(prev => ({
      ...prev,
      name: userData.name,
      email: userData.email,
    }));
  }, [navigate]);

  const handleSave = () => {
    localStorage.setItem("healthUser", JSON.stringify({ name: profile.name, email: profile.email }));
    toast.success("Profile updated successfully!");
  };

  const healthStats = [
    { label: "Tests Completed", value: "12", icon: Activity, color: "primary" },
    { label: "Health Score Avg", value: "78", icon: TrendingUp, color: "success" },
    { label: "Streak Days", value: "14", icon: Award, color: "warning" },
    { label: "Goals Met", value: "8/10", icon: Target, color: "info" },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 health-gradient rounded-xl">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-foreground">Profile & Health Insights</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 card-shadow animate-slide-up text-center">
              <div className="w-24 h-24 mx-auto rounded-full health-gradient flex items-center justify-center text-4xl font-display font-bold text-primary-foreground mb-4">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-display font-bold text-foreground mb-1">{profile.name || "Your Name"}</h2>
              <p className="text-muted-foreground mb-6">{profile.email || "your@email.com"}</p>
              
              <div className="grid grid-cols-2 gap-4">
                {healthStats.map((stat) => {
                  const colorClasses: Record<string, string> = {
                    primary: "bg-primary/10 text-primary",
                    success: "bg-success/10 text-success",
                    warning: "bg-warning/10 text-warning",
                    info: "bg-info/10 text-info",
                  };
                  return (
                    <div key={stat.label} className="bg-muted/50 rounded-xl p-4">
                      <div className={`w-10 h-10 mx-auto rounded-xl ${colorClasses[stat.color]} flex items-center justify-center mb-2`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl p-6 card-shadow animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-lg font-display font-semibold text-foreground mb-6">Personal Information</h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" /> Full Name
                  </Label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" /> Email
                  </Label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" /> Phone
                  </Label>
                  <Input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 234 567 890"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" /> Date of Birth
                  </Label>
                  <Input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => setProfile(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-muted-foreground" /> Height (cm)
                  </Label>
                  <Input
                    type="number"
                    value={profile.height}
                    onChange={(e) => setProfile(prev => ({ ...prev, height: e.target.value }))}
                    placeholder="175"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Weight className="w-4 h-4 text-muted-foreground" /> Weight (kg)
                  </Label>
                  <Input
                    type="number"
                    value={profile.weight}
                    onChange={(e) => setProfile(prev => ({ ...prev, weight: e.target.value }))}
                    placeholder="70"
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" /> Address
                  </Label>
                  <Input
                    value={profile.address}
                    onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="123 Health Street, Wellness City"
                  />
                </div>
              </div>

              <Button variant="gradient" size="lg" className="w-full mt-8" onClick={handleSave}>
                <Save className="w-5 h-5" />
                Save Changes
              </Button>
            </div>

            {/* Health History Summary */}
            <div className="bg-card rounded-2xl p-6 card-shadow mt-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-lg font-display font-semibold text-foreground mb-4">Recent Health History</h3>
              <div className="space-y-4">
                {[
                  { date: "Dec 15, 2024", score: 82, bp: "118/78", sugar: "92" },
                  { date: "Dec 10, 2024", score: 78, bp: "122/82", sugar: "98" },
                  { date: "Dec 5, 2024", score: 75, bp: "125/85", sugar: "105" },
                ].map((entry, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                    <div>
                      <p className="font-medium text-foreground">{entry.date}</p>
                      <p className="text-sm text-muted-foreground">BP: {entry.bp} • Sugar: {entry.sugar} mg/dL</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-semibold ${
                      entry.score >= 80 ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                    }`}>
                      Score: {entry.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
