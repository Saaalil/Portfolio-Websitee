"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Smartphone,
  Server,
  Moon,
  Sun,
  Menu,
  X,
  ArrowRight,
  Download,
  MapPin,
  Phone,
  Zap,
  Rocket,
  Star,
  Coffee,
  Terminal,
  Database,
  Globe,
  Cpu,
  TrendingUp,
  Shield,
  Brain,
  Building,
  GraduationCap,
  BarChart3,
  CheckCircle,
  Award,
  Users,
  BookOpen,
} from "lucide-react";

// Performance optimized data
const TYPING_WORDS = [
  "Software Engineer",
  "SAP enthusiast",
  "ML Engineer",
  "IoT Developer",
  "Data Scientist",
  "PowerBI Analyst",
];

const SKILLS_DATA = [
  { name: "Python", icon: Code, color: "from-blue-500 to-cyan-500" },
  { name: "Java", icon: Coffee, color: "from-orange-500 to-red-500" },
  { name: "JavaScript", icon: Globe, color: "from-yellow-500 to-orange-500" },
  { name: "React.JS", icon: Zap, color: "from-cyan-500 to-blue-500" },
  { name: "SAP FI/CO", icon: Building, color: "from-purple-500 to-pink-500" },
  { name: "MongoDB", icon: Database, color: "from-green-500 to-emerald-500" },
  { name: "Docker", icon: Server, color: "from-blue-600 to-purple-600" },
  { name: "Machine Learning", icon: Brain, color: "from-pink-500 to-rose-500" },
  { name: "PowerBI", icon: TrendingUp, color: "from-indigo-500 to-purple-500" },
  { name: "Socket.io", icon: Cpu, color: "from-teal-500 to-blue-500" },
  {
    name: "Shell Scripting",
    icon: Terminal,
    color: "from-gray-600 to-gray-800",
  },
  {
    name: "Embedded Systems",
    icon: Smartphone,
    color: "from-red-500 to-pink-500",
  },
  { name: "Linux", icon: Terminal, color: "from-green-600 to-teal-600" },
  { name: "Networking", icon: Globe, color: "from-blue-500 to-indigo-500" },
  {
    name: "Google Cloud Platform",
    icon: Server,
    color: "from-orange-400 to-yellow-500",
  },
  { name: "Git", icon: Code, color: "from-red-600 to-pink-600" },
  { name: "Node.js", icon: Zap, color: "from-green-500 to-lime-500" },
  { name: "Firmware Design", icon: Code, color: "from-blue-600 to-cyan-600" },
];

const PROJECTS_DATA = [
  {
    title: "ML Implementation for Advanced Flight Radar Receiver",
    description:
      "Advanced flight radar receiver designed for LCA Tejas aircraft with ML models for identifying unknown radar frequency signals and objects. Manages 30+ attributes and factors for accurate threat detection.",
    tech: [
      "Python",
      "TensorFlow",
      "Machine Learning",
      "Radar Systems",
      "Signal Processing",
    ],
    image:
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "https://github.com/Saaalil",
    featured: true,
    achievements: [
      "30+ parameter analysis",
      "Real-time threat detection",
      "Military-grade accuracy",
      "Deployed on proprietary flight rig",
    ],
  },
  {
    title: "MediCure - AI Health Companion",
    description:
      "Generative AI-powered healthcare chatbot providing preliminary medical guidance based on user symptoms with 70% load reduction on LLM through custom agent architecture.",
    tech: ["Python", "Flask", "LLMs", "Custom Agent", "ResNet", "Medical AI"],
    image:
      "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "https://github.com/Saaalil",
    featured: true,
    achievements: [
      "70% LLM load reduction",
      "Medical scan analysis",
      "Safe preliminary guidance",
      "ResNet integration for X-rays/MRI",
    ],
  },
  {
    title: "AI-Powered Analytics Engine for Sales Forecasting",
    description:
      "Modular AI system achieving 92%+ R² accuracy in sales forecasting using SHAP-enhanced deep neural networks across multiple market segments.",
    tech: ["Python", "TensorFlow", "SHAP", "BiLSTM", "Flask", "Optuna"],
    image:
      "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "https://github.com/Saaalil",
    featured: true,
    achievements: [
      "92%+ R² accuracy",
      "2× engagement potential discovered",
      "50+ engineered features",
      "Enterprise workflow modeling",
    ],
  },
  {
    title: "Blockchain IoT Communication System",
    description:
      "Published research on blockchain-based optimization algorithm for secure IoT communication using AMQP with ML-based anomaly detection.",
    tech: [
      "Blockchain",
      "IoT",
      "AMQP",
      "Machine Learning",
      "Python",
      "Security",
    ],
    image:
      "https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=600",
    link: "https://ieeexplore.ieee.org/document/10957190",
    featured: false,
    achievements: [
      "IEEE Publication",
      "Lightweight encryption",
      "Dynamic consensus",
      "Industrial IoT applications",
    ],
  },
];

const EXPERIENCE_DATA = [
  {
    role: "Software Intern",
    company: "Irillic (Motherson Health Medical)",
    period: "June 2025 - Present",
    location: "Bengaluru, KA",
    description:
      "Working on PID controller optimization for flagship 4K laparoscopy machine under ISO13485:2016 standards",
    achievements: [
      "Improved response time of Auto exposure and Auto gain control by 15%",
      "Enhanced PID controller reliability and speed for medical equipment",
      "Developed sophisticated software testing jig for 10+ parameters with automated reporting",
      "Contributed to flagship product l.nm 4k laparoscopy machine enhancement",
    ],
    icon: Rocket,
    type: "current",
  },
  {
    role: "PowerBI Intern",
    company: "Celebal Technologies",
    period: "June 2025 - Present",
    location: "Remote",
    description:
      "Developing business intelligence solutions and advanced data visualization projects for enterprise clients",
    achievements: [
      "Created interactive dashboards for business intelligence solutions",
      "Improved data processing efficiency through optimized PowerBI models",
      "Collaborated on client projects delivering actionable business insights",
      "Developed advanced DAX formulas and Power Query transformations",
    ],
    icon: BarChart3,
    type: "current",
  },
  {
    role: "Project Intern",
    company: "DRDO - Combat Aircraft System Development",
    period: "May 2024 - Aug 2024",
    location: "Bengaluru, KA",
    description:
      "Multi-model software solution development for LCA Tejas radar warning receiver system",
    achievements: [
      "Developed radar warning receiver using multiple ML algorithms and frameworks",
      "Analyzed 30+ parameters for most accurate threat detection readings",
      "Contributed to initial planning for Advanced Radar Frequency Detection system",
      "Deployed entire architecture on proprietary flight testing rig",
    ],
    icon: Shield,
    type: "internship",
  },
  {
    role: "Network & Satellite Intern",
    company: "HCL Infosystems",
    period: "May 2023 - Jul 2023",
    location: "New Delhi, DL",
    description:
      "Networking and satellite division experience with VSAT and radar systems",
    achievements: [
      "Gained comprehensive knowledge of VSAT components and radar connections",
      "Connected and managed 80+ remote regions through satellite networks",
      "Experience with Cisco Packet Tracer for network planning",
      "Planned and designed network maps for 5+ enterprise clients",
    ],
    icon: Globe,
    type: "internship",
  },
];

export default function Portfolio() {
  // State management
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);

  // Refs
  const heroRef = useRef<HTMLElement>(null);

  // Optimized typing effect
  useEffect(() => {
    const currentWord = TYPING_WORDS[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
      } else {
        setTypedText((prev) =>
          isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentWordIndex]);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    const sections = [
      "hero",
      "about",
      "skills",
      "projects",
      "experience",
      "education",
      "contact",
    ];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          setActiveSection(section);
          break;
        }
      }
    }
  }, []);

  // Initialize effects
  useEffect(() => {
    setIsLoaded(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Handlers
  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  }, [darkMode]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleDownloadResume = useCallback(async () => {
    try {
      const response = await fetch("/salil-cv.pdf");
      if (response.ok) {
        const link = document.createElement("a");
        link.href = "/salil-cv.pdf";
        link.download = "Salil_Hiremath_CV.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        throw new Error("File not found");
      }
    } catch (error) {
      const googleDriveUrl =
        "https://drive.google.com/file/d/1PW3c4VYBMS94o85rWKJXR0OB4-emYXQg/view?usp=sharing";
      window.open(googleDriveUrl, "_blank");
      alert("Opening CV from Google Drive. You can download it from there.");
    }
  }, []);

  const handleSendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.name || !formData.email || !formData.message) {
        alert("Please fill in all fields");
        return;
      }

      setIsSubmitting(true);
      try {
        await emailjs.send(
          "service_2pwin51",
          "template_l2rzyur",
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: "salilhiremath2712@gmail.com",
          },
          "gNkmyFNRETf6V0-GR"
        );

        setFormData({ name: "", email: "", message: "" });
        alert("Message sent successfully! I will get back to you soon.");
      } catch (error) {
        alert(
          "Failed to send message. Please try again or contact me directly at salilhiremath2712@gmail.com"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  // Memoized navigation items
  const navigationItems = useMemo(
    () => [
      "hero",
      "about",
      "skills",
      "projects",
      "experience",
      "education",
      "contact",
    ],
    []
  );

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "dark" : ""
      } ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              <span className="inline-block animate-bounce">S</span>
              <span className="inline-block animate-bounce animation-delay-100">
                H
              </span>
              <span className="inline-block animate-bounce animation-delay-200">
                .
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {navigationItems.map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-200 hover:text-purple-600 hover:scale-110 transform text-sm lg:text-base ${
                    activeSection === section
                      ? "text-purple-600 scale-110 font-semibold"
                      : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {section === "hero" ? "Home" : section}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="hover:bg-purple-100 dark:hover:bg-purple-900 hover:scale-110 transition-all duration-200 h-8 w-8 sm:h-10 sm:w-10"
              >
                {darkMode ? (
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:scale-110 transition-transform duration-200 h-8 w-8 sm:h-10 sm:w-10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl`}
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navigationItems.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left px-4 py-3 capitalize hover:bg-purple-100 dark:hover:bg-purple-900 rounded-lg transition-all duration-200 text-sm"
              >
                {section === "hero" ? "Home" : section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900 dark:to-blue-900 pt-16 sm:pt-20"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>

        {/* Floating Elements - Hidden on mobile for performance */}
        <div className="hidden lg:block absolute top-20 left-10 animate-float">
          <Code className="h-8 w-8 lg:h-12 lg:w-12 text-purple-500/30" />
        </div>
        <div className="hidden lg:block absolute top-40 right-20 animate-float animation-delay-200">
          <Rocket className="h-12 w-12 lg:h-16 lg:w-16 text-blue-500/30" />
        </div>
        <div className="hidden lg:block absolute bottom-40 left-20 animate-float animation-delay-400">
          <Star className="h-8 w-8 lg:h-10 lg:w-10 text-yellow-500/30" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
              <div className="animate-fade-in-up">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  Salil Hiremath
                </h1>

                <div className="h-12 sm:h-14 lg:h-16 flex items-center justify-center lg:justify-start">
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 font-light">
                    I'm a{" "}
                    <span className="text-purple-600 font-semibold border-r-2 border-purple-600 animate-pulse">
                      {typedText}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                    <span>Coimbatore, TN</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                    <span>+91 6358802037</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start items-center animate-fade-in-up animation-delay-400">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-purple-500/25 group"
                  onClick={() => scrollToSection("projects")}
                >
                  <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-spin" />
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transform hover:scale-105 transition-all duration-200 group"
                  onClick={handleDownloadResume}
                >
                  <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce" />
                  Download CV
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start space-x-4 sm:space-x-6 animate-fade-in-up animation-delay-600">
                {[
                  {
                    icon: Github,
                    href: "https://github.com/Saaalil",
                    color: "hover:text-gray-800",
                    label: "GitHub",
                  },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com",
                    color: "hover:text-blue-600",
                    label: "LinkedIn",
                  },
                  {
                    icon: Mail,
                    href: "mailto:salilhiremath2712@gmail.com",
                    color: "hover:text-red-500",
                    label: "Email",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`p-2 sm:p-3 rounded-full bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 text-slate-600 dark:text-slate-300 ${social.color} transform hover:scale-110 hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl`}
                    title={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Code Terminal Animation */}
            <div className="relative animate-fade-in-up animation-delay-200 order-1 lg:order-2">
              <div className="relative w-full max-w-sm sm:max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl sm:rounded-3xl animate-pulse"></div>

                <div className="relative bg-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-slate-700">
                  <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full animate-pulse animation-delay-200"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse animation-delay-400"></div>
                  </div>

                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm font-mono">
                    <div className="text-purple-400 animate-fade-in-up">
                      <span className="text-blue-400">const</span> developer ={" "}
                      {"{"}
                    </div>
                    <div className="text-green-400 ml-2 sm:ml-4 animate-fade-in-up animation-delay-200">
                      name:{" "}
                      <span className="text-yellow-400">'Salil Hiremath'</span>,
                    </div>
                    <div className="text-green-400 ml-2 sm:ml-4 animate-fade-in-up animation-delay-400">
                      skills:{" "}
                      <span className="text-cyan-400">
                        ['AI/ML', 'SAP', 'IoT']
                      </span>
                      ,
                    </div>
                    <div className="text-green-400 ml-2 sm:ml-4 animate-fade-in-up animation-delay-600">
                      passion:{" "}
                      <span className="text-yellow-400">'Innovation'</span>,
                    </div>
                    <div className="text-green-400 ml-2 sm:ml-4 animate-fade-in-up animation-delay-800">
                      status: <span className="text-red-400">'Available'</span>
                    </div>
                    <div className="text-purple-400 animate-fade-in-up animation-delay-1000">
                      {"}"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Passionate software engineer with expertise in AI/ML, SAP
              enthusiast, and IoT development
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Hey there! I’m a software engineer who thrives on turning big ideas into real-world tech—whether.With a solid grip on AI, machine learning, and enterprise systems, I’ve worked on everything from high-stakes defense projects to life-saving medical tech. Currently, I'm juggling roles as a Software Intern at Irillic (Motherson Health Medical) and a Power BI Intern at Celebal Technologies—because why settle for one domain when you can do both?

              </p>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                
At my core, I’m a builder, a problem-solver, and someone who genuinely gets excited about turning complex problems into elegant, efficient solutions.
              </p>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">
                    15+
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Projects Completed
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                    4
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Internships
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">
                  Core Expertise
                </h3>
                <div className="space-y-3">
                  {[
                    "AI/ML Development & Implementation",
                    "SAP FI/CO Consulting & Configuration",
                    "IoT Systems & Embedded Programming",
                    "Full-Stack Web Development",
                    "Data Analytics & Business Intelligence",
                    "Military & Defense System Development",
                  ].map((skill, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Proficient in modern technologies and frameworks across multiple
              domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SKILLS_DATA.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-r ${skill.color}`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">
                        {skill.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Innovative solutions across AI/ML, healthcare, defense, and
              enterprise domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS_DATA.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {project.featured && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      Featured
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 transition-colors duration-300 mb-2 line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tech.length - 3}
                      </Badge>
                    )}
                  </div>

                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Building innovative solutions across healthcare, defense, and
              enterprise domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXPERIENCE_DATA.map((exp, index) => {
              const IconComponent = exp.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm cursor-pointer"
                  onClick={() => setSelectedExperience(exp)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start space-x-3 mb-3">
                      <div
                        className={`p-2 rounded-lg ${
                          exp.type === "current"
                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                            : "bg-gradient-to-r from-purple-500 to-blue-500"
                        }`}
                      >
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1 line-clamp-1">
                              {exp.role}
                            </h3>
                            <p className="text-sm font-semibold text-purple-600 mb-1">
                              {exp.company}
                            </p>
                          </div>
                          {exp.type === "current" && (
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                          <span>{exp.period}</span> •{" "}
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 line-clamp-2">
                      {exp.description}
                    </p>

                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {exp.achievements.length} key achievements
                    </div>

                    <Button
                      size="sm"
                      className="w-full mt-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedExperience(exp);
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Education & Certifications
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Strong academic foundation in computer science and engineering
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                      Bachelor of Technology
                    </h3>
                    <p className="text-lg font-semibold text-purple-600 mb-1">
                      Computer Science & Engineering
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 mb-2">
                      Manipal University Jaipur
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      2022 - 2026 (Expected)
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 dark:text-slate-300">
                      Current CGPA
                    </span>
                    <span className="font-semibold text-purple-600">
                      8.5/10
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 w-[85%]"></div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                    Relevant Coursework:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Data Structures & Algorithms",
                      "Machine Learning",
                      "Database Management",
                      "Software Engineering",
                      "Computer Networks",
                      "Operating Systems",
                      "Linux systems",
                      "Deep learning",
                      "Web Development",
                      "Server Managament",
                      "BLockchain",
                      "Internet of Things",
                      "Embedded systems",
                    ].map((course, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                      Certifications & Publications
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Professional achievements and research
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      IEEE Publication
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                      "Blockchain-based optimization algorithm for secure IoT
                      communication"
                    </p>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Published
                    </Badge>
                  </div>

                  <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      SAP Certification
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                      SAP FI/CO Basics
                    </p>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      In Progress
                    </Badge>
                  </div>

                  <div className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                      Machine Learning
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
                      Deeplearning.ai
                    </p>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      Completed
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900 dark:to-blue-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Ready to collaborate on innovative projects or discuss
              opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <CardContent className="p-6 lg:p-8">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
                    Get In Touch
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          Email
                        </p>
                        <a
                          href="mailto:salilhiremath2712@gmail.com"
                          className="text-purple-600 hover:text-purple-700 transition-colors"
                        >
                          salilhiremath2712@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          Phone
                        </p>
                        <a
                          href="tel:+916358802037"
                          className="text-purple-600 hover:text-purple-700 transition-colors"
                        >
                          +91 6358802037
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">
                          Location
                        </p>
                        <p className="text-slate-600 dark:text-slate-300">
                          Coimbatore, Tamil Nadu, India
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">
                      Follow Me
                    </h4>
                    <div className="flex space-x-4">
                      {[
                        {
                          icon: Github,
                          href: "https://github.com/Saaalil",
                          color: "hover:text-gray-800",
                          label: "GitHub",
                        },
                        {
                          icon: Linkedin,
                          href: "https://linkedin.com",
                          color: "hover:text-blue-600",
                          label: "LinkedIn",
                        },
                        {
                          icon: Mail,
                          href: "mailto:salilhiremath2712@gmail.com",
                          color: "hover:text-red-500",
                          label: "Email",
                        },
                      ].map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ${social.color} transform hover:scale-110 hover:-translate-y-1 transition-all duration-200`}
                          title={social.label}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <social.icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardContent className="p-6 lg:p-8">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
                  Send Message
                </h3>

                <form onSubmit={handleSendMessage} className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full"
                      required
                    />
                  </div>

                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
              Salil Hiremath
            </div>
            <p className="text-slate-400 mb-6">
              Software Engineer • AI/ML Specialist • SAP enthusiast
            </p>
            <div className="flex justify-center space-x-6 mb-6">
              {[
                {
                  icon: Github,
                  href: "https://github.com/Saaalil",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:salilhiremath2712@gmail.com",
                  label: "Email",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-slate-400 hover:text-white transform hover:scale-110 transition-all duration-200"
                  title={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <div className="border-t border-slate-800 pt-6">
              <p className="text-slate-500 text-sm">
                © 2025 Salil Hiremath. All rights reserved. Built with ❤️ and a
                lot of ☕.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-5 w-5" />
              </Button>
              {selectedProject.featured && (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  Featured
                </Badge>
              )}
            </div>

            <div className="p-6 lg:p-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                {selectedProject.title}
              </h2>

              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="mb-6">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                  Key Achievements:
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedProject.achievements.map(
                    (achievement: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-center space-x-2 text-slate-600 dark:text-slate-300"
                      >
                        <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                        <span className="text-sm">{achievement}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3">
                  Technologies Used:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech: string, i: number) => (
                    <Badge key={i} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  onClick={() => window.open(selectedProject.link, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {selectedProject.title.includes("Blockchain IoT") ||
                  selectedProject.description.includes("Published research")
                    ? "View Paper"
                    : "View Project"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {selectedExperience && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 lg:p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-xl ${
                      selectedExperience.type === "current"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : "bg-gradient-to-r from-purple-500 to-blue-500"
                    }`}
                  >
                    <selectedExperience.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                      {selectedExperience.role}
                    </h2>
                    <p className="text-lg font-semibold text-purple-600 mb-2">
                      {selectedExperience.company}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-slate-600 dark:text-slate-400">
                      <span>{selectedExperience.period}</span>
                      <span className="hidden sm:block">•</span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{selectedExperience.location}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {selectedExperience.type === "current" && (
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      Current
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedExperience(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {selectedExperience.description}
              </p>

              <div className="mb-6">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">
                  Key Achievements:
                </h3>
                <ul className="space-y-3">
                  {selectedExperience.achievements.map(
                    (achievement: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start space-x-3 text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSelectedExperience(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
