import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Camera, 
  LineChart, 
  Shield, 
  Zap, 
  Users, 
  Award,
  MapPin,
  MessageSquare,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Camera,
      title: "AI-Powered Analysis",
      description: "Advanced computer vision for precise cattle trait detection with 65+ keypoints"
    },
    {
      icon: LineChart,
      title: "Comprehensive Scoring",
      description: "Detailed ATC scoring across multiple parameters with visual insights"
    },
    {
      icon: Shield,
      title: "Disease Detection",
      description: "Early identification of health issues through image analysis"
    },
    {
      icon: Zap,
      title: "Real-time Results",
      description: "Instant evaluation reports with actionable recommendations"
    },
    {
      icon: Users,
      title: "Bull Matching",
      description: "Smart breeding recommendations based on genetic compatibility"
    },
    {
      icon: MapPin,
      title: "Geo Mapping",
      description: "Track cattle distribution and performance across regions"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Cattle Evaluated" },
    { value: "95%", label: "Accuracy Rate" },
    { value: "500+", label: "Active Users" },
    { value: "24/7", label: "AI Support" }
  ];

  const benefits = [
    "Improve breeding decisions with data-driven insights",
    "Reduce manual evaluation time by 80%",
    "Access comprehensive health monitoring",
    "Get expert recommendations instantly",
    "Track performance across your herd",
    "Integrate with government schemes seamlessly"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">PashuMitra AI</span>
          </div>
          <Button onClick={() => navigate('/login')} variant="outline">
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Revolutionary AI Technology</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Transform Cattle Evaluation with{" "}
              <span className="text-primary">Artificial Intelligence</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              PashuMitra AI brings precision, speed, and expertise to livestock management. 
              Evaluate cattle traits, detect diseases, and make informed breeding decisions—all powered by advanced AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/login')}
                className="text-lg"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Modern Farming
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage, evaluate, and improve your livestock
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose PashuMitra AI?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of farmers, researchers, and veterinarians who trust 
                PashuMitra AI for accurate cattle evaluation and management.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6">
                  <Award className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Award Winning</h3>
                  <p className="text-sm text-muted-foreground">Recognized by agricultural authorities</p>
                </Card>
                <Card className="p-6 mt-8">
                  <MessageSquare className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">AI Assistant</h3>
                  <p className="text-sm text-muted-foreground">24/7 expert guidance available</p>
                </Card>
                <Card className="p-6">
                  <BookOpen className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Learn & Grow</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive tutorials included</p>
                </Card>
                <Card className="p-6 mt-8">
                  <Shield className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Secure & Private</h3>
                  <p className="text-sm text-muted-foreground">Your data is protected</p>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-primary rounded-2xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Livestock Management?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join PashuMitra AI today and experience the future of cattle evaluation
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/login')}
              className="text-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-2">
            &copy; 2025 PashuMitra AI. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with passion by <span className="font-semibold text-primary">Team MiraeNova</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;