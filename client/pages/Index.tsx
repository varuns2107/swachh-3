import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Mic,
  AlertTriangle,
  TrendingUp,
  Users,
  Clock,
  Leaf,
  ChevronRight,
  ChevronLeft,
  Droplet,
  Wind,
  Zap,
  Trash2,
  Waves,
  Gauge,
  Volume2,
  Trees,
} from "lucide-react";
import Header from "@/components/Header";

export default function Index() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [geoLoading, setGeoLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setGeoLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setGeoLoading(false);
        },
        () => {
          setLocation({ lat: 28.6139, lon: 77.209 });
          setGeoLoading(false);
        },
      );
    }
  }, []);

  const handleDetectLocation = () => {
    setGeoLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setGeoLoading(false);
        },
        () => {
          alert("Could not access your location. Using Delhi center.");
          setLocation({ lat: 28.6139, lon: 77.209 });
          setGeoLoading(false);
        },
      );
    }
  };

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice input not supported on your browser");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.language = "en-IN";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");
      setDescription(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleReportSubmit = () => {
    if (!description.trim()) {
      alert("Please describe the issue");
      return;
    }
    if (!location) {
      alert("Location not available");
      return;
    }
    window.location.href = `/report?description=${encodeURIComponent(description)}&lat=${location.lat}&lon=${location.lon}`;
  };

  const steps = [
    {
      number: "01",
      title: "Report",
      description:
        "Describe any civic issue—waste, water, air, transport, or energy problems in detail",
      icon: <AlertTriangle className="w-12 h-12" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      number: "02",
      title: "Auto-Analyze",
      description:
        "Our AI identifies the issue type and assigns it to the appropriate municipal authority",
      icon: <Gauge className="w-12 h-12" />,
      color: "from-orange-500 to-red-600",
    },
    {
      number: "03",
      title: "Track & Resolve",
      description:
        "Monitor real-time progress and connect with your community on civic improvements",
      icon: <TrendingUp className="w-12 h-12" />,
      color: "from-blue-500 to-cyan-600",
    },
  ];

  const categories = [
    {
      name: "Waste",
      icon: <Trash2 className="w-8 h-8" />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      name: "Water",
      icon: <Droplet className="w-8 h-8" />,
      color: "from-blue-400 to-cyan-500",
    },
    {
      name: "Air Quality",
      icon: <Wind className="w-8 h-8" />,
      color: "from-gray-400 to-slate-500",
    },
    {
      name: "Transport",
      icon: <Gauge className="w-8 h-8" />,
      color: "from-purple-400 to-indigo-500",
    },
    {
      name: "Energy",
      icon: <Zap className="w-8 h-8" />,
      color: "from-yellow-500 to-orange-600",
    },
    {
      name: "Sanitation",
      icon: <Waves className="w-8 h-8" />,
      color: "from-teal-400 to-green-500",
    },
    {
      name: "Noise",
      icon: <Volume2 className="w-8 h-8" />,
      color: "from-pink-400 to-red-500",
    },
    {
      name: "Other",
      icon: <Trees className="w-8 h-8" />,
      color: "from-green-400 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 w-96 h-96 bg-green-200 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-200 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground leading-tight mb-6">
              Your Voice for a{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Sustainable
              </span>
              <br />
              <span className="bg-gradient-to-r from-secondary via-orange-500 to-red-500 bg-clip-text text-transparent">
                Delhi
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Report civic issues with voice or text. Get actionable guidance
              and track resolution in real-time.
            </p>
          </div>

          {/* Report Card */}
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-10 space-y-6 backdrop-blur-sm">
            {/* Location Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-bold text-foreground">
                  Your Location
                </label>
                <button
                  onClick={handleDetectLocation}
                  disabled={geoLoading}
                  className="text-sm font-bold text-primary hover:text-primary/80 disabled:opacity-50 flex items-center gap-1"
                >
                  <MapPin className="w-4 h-4" />
                  {geoLoading ? "Detecting..." : "Detect"}
                </button>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-primary/30 rounded-2xl p-4 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                {location ? (
                  <span className="text-sm text-foreground">
                    <span className="font-bold">
                      {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
                    </span>
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Click detect to get your location
                  </span>
                )}
              </div>
            </div>

            {/* Description Input */}
            <div>
              <label className="text-sm font-bold text-foreground mb-3 block">
                Describe the Issue
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the civic issue..."
                  className="flex-1 px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary font-medium"
                />
                <button
                  onClick={handleVoiceInput}
                  disabled={isListening}
                  className={`p-4 rounded-2xl font-bold flex items-center justify-center transition-all border-2 ${
                    isListening
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-green-50 text-primary hover:bg-green-100 border-primary/30"
                  }`}
                  title="Use voice to describe issue"
                >
                  <Mic
                    className={`w-5 h-5 ${isListening ? "animate-pulse" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Report Button */}
            <button
              onClick={handleReportSubmit}
              disabled={!location || !description.trim()}
              className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 text-lg shadow-lg"
            >
              <AlertTriangle className="w-5 h-5" />
              Report Issue Now
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            <StatItem value="5K+" label="Issues Reported" />
            <StatItem value="87%" label="Resolution Rate" />
            <StatItem value="24/7" label="Support" />
          </div>
        </div>
      </section>

      {/* How It Works - Carousel Section */}
      <section className="py-16 sm:py-24 bg-white border-t-2 border-b-2 border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
              How{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                Swachh Saathi
              </span>{" "}
              Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple 3-step process to report and track civic issues
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {steps.map((step, idx) => (
                  <div key={idx} className="min-w-full px-4 py-12">
                    <div
                      className={`bg-gradient-to-br ${step.color} rounded-3xl p-12 sm:p-16 text-white shadow-2xl`}
                    >
                      <div className="flex items-start justify-between mb-8">
                        <div className="text-6xl sm:text-7xl font-black opacity-20">
                          {step.number}
                        </div>
                        <div className="opacity-80">{step.icon}</div>
                      </div>
                      <h3 className="text-4xl sm:text-5xl font-black mb-4">
                        {step.title}
                      </h3>
                      <p className="text-lg sm:text-xl opacity-90 leading-relaxed max-w-2xl">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() =>
                  setCurrentSlide(
                    (prev) => (prev - 1 + steps.length) % steps.length,
                  )
                }
                className="p-3 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex gap-2">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-3 rounded-full transition-all ${
                      idx === currentSlide
                        ? "bg-primary w-12"
                        : "bg-gray-300 w-3"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % steps.length)
                }
                className="p-3 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Issues We Handle - Professional Grid */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-4">
              Issues We{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                Handle
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Report any civic sustainability issue across Delhi
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-6 sm:p-8 border-2 border-gray-100 hover:border-primary/50 hover:shadow-xl transition-all cursor-pointer"
              >
                <div
                  className={`bg-gradient-to-br ${cat.color} w-16 h-16 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  {cat.icon}
                </div>
                <p className="font-bold text-foreground text-center sm:text-left">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-primary via-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Start Making Delhi Sustainable Today
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Every report brings us closer to a cleaner, safer, and more
            sustainable city for everyone.
          </p>
          <Link
            to="/report"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-2xl hover:shadow-2xl transition-all text-lg"
          >
            <AlertTriangle className="w-5 h-5" />
            Report an Issue
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg">Swachh Saathi</h3>
                  <p className="text-sm text-gray-400">Sustainability</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 max-w-xs">
                Empowering citizens to report and track civic sustainability
                issues in Delhi.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/report" className="hover:text-white transition">
                    Report Issue
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:text-white transition">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Get in Touch</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="mailto:swachh_saathi@gmail.com"
                    className="hover:text-white transition"
                  >
                    swachh_saathi@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:112"
                    className="hover:text-white transition font-semibold text-green-400"
                  >
                    Emergency: 112
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2026 Swachh Saathi. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">Made by Grim Reapers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-gray-100 text-center hover:shadow-xl hover:border-primary/50 transition-all">
      <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
        {value}
      </div>
      <p className="text-muted-foreground font-bold">{label}</p>
    </div>
  );
}
