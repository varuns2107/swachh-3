import { useState, useEffect } from "react";
import {
  AlertCircle,
  MapPin,
  Loader,
  AlertTriangle,
  Shield,
  CheckCircle,
} from "lucide-react";
import Header from "@/components/Header";
import ActionGuide from "@/components/ActionGuide";
import IssueCard from "@/components/IssueCard";
import { PredictResponse, IssueCategory } from "@shared/api";
import { API_ENDPOINTS } from "@/config";

export default function Report() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState("");
  const [geoLoading, setGeoLoading] = useState(false);

  // Get user's location on mount
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
          // Default to Delhi center if location denied
          setLocation({ lat: 28.6139, lon: 77.209 });
          setGeoLoading(false);
        },
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!description.trim()) {
      setError("Please describe the issue");
      return;
    }

    if (!location) {
      setError("Location not available. Please enable location access.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.predict, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: description,
          location: `${location.lat},${location.lon}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit issue");
      }

      const data: PredictResponse = await response.json();
      setResult(data);
      setDescription("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred. Please check your connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gradient-to-br from-green-50 via-white to-blue-50 min-h-[calc(100vh-64px)]">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border-2 border-gray-100 p-6 sm:p-10 shadow-xl">
              <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-2">
                Report a Civic Issue
              </h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Help make Delhi cleaner and safer. Describe any civic
                sustainability issue and get actionable guidance.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Location Display */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-primary/30 rounded-2xl p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground">
                        Current Location
                      </p>
                    </div>
                  </div>
                  {geoLoading ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground ml-8">
                      <Loader className="w-4 h-4 animate-spin" />
                      Getting location...
                    </div>
                  ) : location ? (
                    <p className="text-sm text-foreground font-semibold ml-8">
                      Lat: {location.lat.toFixed(4)}, Lon:{" "}
                      {location.lon.toFixed(4)}
                    </p>
                  ) : (
                    <p className="text-sm text-danger ml-8">
                      Location not available
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">
                    Describe the Issue
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Be detailed: What's the problem? Where exactly? Why is it urgent?..."
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none text-foreground"
                    rows={6}
                    disabled={loading || geoLoading}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Include specific details and landmarks. Mention safety
                    concerns if any.
                  </p>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-danger">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || geoLoading || !location}
                  className="w-full py-4 bg-gradient-to-r from-primary to-emerald-600 text-white font-bold rounded-2xl hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-lg shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Analyzing Issue...
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5" />
                      Submit Report
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Result Display */}
            {result && (
              <div className="mt-8 space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 flex gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground">
                      {result.message}
                    </p>
                    {result.duplicate && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Your support has been recorded. The issue priority is
                        now:{" "}
                        <span className="font-semibold capitalize">
                          {result.priority}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Emergency Alert */}
                {result.priority === "high" && (
                  <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-danger rounded-xl p-6 flex gap-4">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-danger animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-bold text-danger text-lg mb-2">
                        🚨 EMERGENCY – Immediate Attention Required
                      </h3>
                      <p className="text-sm text-danger mb-3">
                        This issue has been marked as HIGH PRIORITY due to
                        safety concerns. Authorities have been notified
                        immediately.
                      </p>
                      <p className="text-sm font-semibold">
                        Emergency Hotline:{" "}
                        <a
                          href="tel:112"
                          className="text-danger hover:underline"
                        >
                          112
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                <IssueCard
                  id={result.id}
                  category={result.category}
                  priority={result.priority}
                  supporters={result.supporters}
                  message={`Assigned to: ${result.authority}`}
                />

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-foreground">Issue Details</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Category</p>
                      <p className="font-semibold text-foreground capitalize">
                        {result.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">
                        Assigned Authority
                      </p>
                      <p className="font-semibold text-foreground">
                        {result.authority}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Priority Level</p>
                      <p
                        className={`font-semibold capitalize ${
                          result.priority === "high"
                            ? "text-danger"
                            : result.priority === "medium"
                              ? "text-secondary"
                              : "text-blue-600"
                        }`}
                      >
                        {result.priority}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Trust Level</p>
                      <p className="font-semibold text-foreground capitalize">
                        {result.trust_level}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Guide Sidebar */}
          {result && (
            <div className="lg:col-span-1">
              <ActionGuide
                category={result.category}
                actions={result.actions}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
