import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Activity, Shield, Zap, ArrowRight, CheckCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Track your vitals including blood pressure, sugar levels, and heart rate in real-time.",
    },
    {
      icon: Zap,
      title: "ML-Powered Predictions",
      description: "Advanced algorithms analyze your health data to predict potential risks.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your health data is encrypted and protected with industry-leading security.",
    },
  ];

  const benefits = [
    "Personalized health recommendations",
    "Daily reminders for medications & check-ups",
    "Comprehensive health score tracking",
    "Historical data analysis & trends",
    "Easy-to-use intuitive interface",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 health-gradient rounded-xl">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-foreground">Data-Driven Health Predictor</span>
            </div>
            <Button variant="gradient" onClick={() => navigate("/auth")}>
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 health-gradient-soft opacity-50" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-info/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              AI-Powered Health Intelligence
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
              Predict & Protect Your{" "}
              <span className="text-primary">Health</span> with Data
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Leverage machine learning algorithms to analyze your vitals and get personalized health 
              predictions. Take control of your wellness journey with data-driven insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="xl" onClick={() => navigate("/auth")}>
                Start Free Analysis <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="xl" onClick={() => navigate("/auth")}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Powerful Features for Your Health
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to monitor, predict, and improve your health outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="bg-background rounded-2xl p-8 card-shadow hover:card-shadow-hover transition-all duration-300 animate-slide-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Why Choose NextGen?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of users who trust our platform to monitor and improve their health.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={benefit}
                    className="flex items-center gap-4 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-1 bg-success/10 rounded-full">
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button variant="gradient" size="lg" className="mt-8" onClick={() => navigate("/auth")}>
                Get Started Now <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="relative animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="bg-card rounded-3xl p-8 card-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full health-gradient flex items-center justify-center">
                    <Heart className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-foreground">Health Score</h4>
                    <p className="text-sm text-muted-foreground">Updated just now</p>
                  </div>
                </div>
                
                <div className="text-center py-8">
                  <span className="text-7xl font-display font-bold text-foreground">85</span>
                  <p className="text-success font-medium mt-2">Excellent Health</p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  {[
                    { label: "BP", value: "120/80" },
                    { label: "Sugar", value: "95" },
                    { label: "Heart", value: "72" },
                  ].map(stat => (
                    <div key={stat.label} className="text-center">
                      <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -z-10 top-8 left-8 right-8 bottom-0 bg-primary/5 rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="health-gradient rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
                Ready to Take Control of Your Health?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Start your health journey today with our free analysis tool. No credit card required.
              </p>
              <Button 
                size="xl" 
                className="bg-card text-foreground hover:bg-card/90"
                onClick={() => navigate("/auth")}
              >
                Start Free Analysis <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-foreground">Data-Driven Health Predictor</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Data-Driven Health Predictor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
