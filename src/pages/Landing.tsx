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
  Sparkles,
  Brain,
  TrendingUp,
  Target,
  Heart,
  Cpu,
  Microscope,
  PlayCircle,
  Quote,
  Star,
  Upload,
  ScanLine,
  BarChart3,
  Download
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

  const howItWorks = [
    {
      step: "1",
      icon: Upload,
      title: "Upload Images",
      description: "Capture or upload multi-angle photos of your cattle using any device"
    },
    {
      step: "2",
      icon: ScanLine,
      title: "AI Analysis",
      description: "Our AI detects 65+ keypoints and analyzes body measurements instantly"
    },
    {
      step: "3",
      icon: BarChart3,
      title: "Get Insights",
      description: "Receive detailed ATC scores, health alerts, and breeding recommendations"
    },
    {
      step: "4",
      icon: Download,
      title: "Track & Export",
      description: "Monitor progress over time and export reports for government schemes"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Dairy Farmer, Punjab",
      avatar: "👨‍🌾",
      quote: "PashuMitra AI has revolutionized how I manage my herd. The accuracy is incredible!"
    },
    {
      name: "Dr. Priya Sharma",
      role: "Veterinarian, Maharashtra",
      avatar: "👩‍⚕️",
      quote: "Early disease detection has saved countless animals. This technology is game-changing."
    },
    {
      name: "Arun Patel",
      role: "Cattle Breeder, Gujarat",
      avatar: "🧑‍🌾",
      quote: "The bull matching feature helped me improve my herd's genetics significantly."
    }
  ];

  const techHighlights = [
    { icon: Brain, label: "Advanced AI Models", color: "text-blue-500" },
    { icon: Cpu, label: "Edge Computing", color: "text-purple-500" },
    { icon: Microscope, label: "Computer Vision", color: "text-green-500" },
    { icon: TrendingUp, label: "Predictive Analytics", color: "text-orange-500" }
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
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-20 left-10 w-16 h-16 bg-primary/10 rounded-2xl blur-xl"
          />
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute bottom-20 right-10 w-24 h-24 bg-primary/10 rounded-full blur-xl"
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-8"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">95% Accurate</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-info/10 text-info px-4 py-2 rounded-full">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Real-time Results</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
            >
              The Future of
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Cattle Intelligence
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto"
            >
              Harness the power of advanced AI to revolutionize livestock management. 
              From precise trait analysis to disease prediction—all in seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button 
                size="lg" 
                onClick={() => navigate('/login')}
                className="text-lg group"
              >
                <PlayCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Get Started 
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg"
              >
                See How It Works
              </Button>
            </motion.div>

            {/* Tech Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-border/50"
            >
              {techHighlights.map((tech, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2"
                >
                  <tech.icon className={`w-5 h-5 ${tech.color}`} />
                  <span className="text-sm text-muted-foreground">{tech.label}</span>
                </motion.div>
              ))}
            </motion.div>
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

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple. Fast. Accurate.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started with cattle evaluation in four easy steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Lines for Desktop */}
            <div className="hidden lg:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="h-full p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                        <step.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm shadow-md">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trusted by Farmers Across India
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our users have to say about their experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 hover:shadow-elegant transition-all duration-300">
                  <div className="flex flex-col h-full">
                    <Quote className="w-8 h-8 text-primary/30 mb-4" />
                    <p className="text-foreground mb-6 flex-grow italic">
                      &quot;{testimonial.quote}&quot;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-2xl">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-primary rounded-3xl p-12 md:p-16 text-center overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-primary-foreground/20 text-primary-foreground px-4 py-2 rounded-full mb-6"
              >
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">Join 500+ Happy Users</span>
              </motion.div>

              <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
                Ready to Revolutionize
                <br />
                Your Cattle Management?
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
                Experience the power of AI-driven livestock evaluation. 
                Start making smarter decisions today.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/login')}
                className="text-lg group shadow-xl hover:shadow-2xl transition-all"
              >
                Get Started Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
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
