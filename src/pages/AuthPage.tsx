import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Activity, Shield, ArrowRight, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill in all fields");
      return;
    }
    // Simulate auth - in production, connect to Supabase
    localStorage.setItem("healthUser", JSON.stringify({ email, name: name || "User" }));
    toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 health-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-info/20" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <div className="animate-slide-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-primary-foreground/20 rounded-2xl backdrop-blur-sm">
                <Heart className="w-10 h-10" />
              </div>
              <span className="text-3xl font-display font-bold">HealthPredict</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
              Your Personal Health Intelligence Platform
            </h1>
            <p className="text-xl opacity-90 mb-12 leading-relaxed">
              Leverage AI-powered predictions to understand your health better. 
              Track vitals, get personalized recommendations, and take control of your wellness journey.
            </p>

            <div className="space-y-6">
              {[
                { icon: Activity, text: "Real-time health monitoring & predictions" },
                { icon: Shield, text: "Secure data with privacy-first approach" },
                { icon: Heart, text: "Personalized wellness recommendations" },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="p-2 bg-primary-foreground/20 rounded-xl">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <span className="text-lg">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-primary-foreground/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-32 right-40 w-48 h-48 bg-info/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="p-3 health-gradient rounded-2xl">
              <Heart className="w-8 h-8 text-primary-foreground" />
            </div>
            <span className="text-2xl font-display font-bold text-foreground">HealthPredict</span>
          </div>

          <div className="bg-card rounded-2xl p-8 card-shadow">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-muted-foreground">
                {isLogin ? "Sign in to access your health dashboard" : "Start your health journey today"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-11"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11"
                  />
                </div>
              </div>

              <Button type="submit" variant="gradient" size="lg" className="w-full">
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-medium hover:underline"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
