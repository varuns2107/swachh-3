import { useState, useEffect } from "react";
import {
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import Header from "@/components/Header";
import AreaHealthCard from "@/components/AreaHealthCard";
import { AreaHealthItem, AdminStatsResponse } from "@shared/api";
import { API_ENDPOINTS } from "@/config";

export default function Dashboard() {
  const [areas, setAreas] = useState<AreaHealthItem[]>([]);
  const [stats, setStats] = useState<AdminStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const [statsRes, areasRes] = await Promise.all([
        fetch(API_ENDPOINTS.adminStats),
        fetch(API_ENDPOINTS.areaHealth),
      ]);

      if (!statsRes.ok || !areasRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const statsData: AdminStatsResponse = await statsRes.json();
      const areasData: AreaHealthItem[] = await areasRes.json();

      setStats(statsData);
      setAreas(areasData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Civic Health Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Track reported issues and area health across Delhi
            </p>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-emerald-600 text-white rounded-2xl hover:shadow-xl disabled:opacity-50 transition-all font-bold whitespace-nowrap shadow-lg"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={<AlertTriangle className="w-6 h-6" />}
              label="Total Issues"
              value={stats.total_issues}
              subtext="Reported"
              color="text-danger"
            />
            <StatCard
              icon={<CheckCircle className="w-6 h-6" />}
              label="Resolved"
              value={stats.resolved_issues}
              subtext={`${stats.total_issues > 0 ? Math.round((stats.resolved_issues / stats.total_issues) * 100) : 0}% success`}
              color="text-success"
            />
            <StatCard
              icon={<TrendingUp className="w-6 h-6" />}
              label="Open Issues"
              value={stats.open_issues}
              subtext="In progress"
              color="text-secondary"
            />
            <StatCard
              icon={<AlertCircle className="w-6 h-6" />}
              label="High Priority"
              value={stats.high_priority_issues}
              subtext="Need immediate attention"
              color="text-danger"
            />
          </div>
        )}

        {/* Last Updated */}
        {lastUpdated && (
          <p className="text-xs text-muted-foreground mb-6">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
            <p className="text-sm text-danger">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && areas.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-6 h-6 text-muted-foreground animate-spin" />
            <span className="ml-3 text-muted-foreground">
              Loading area data...
            </span>
          </div>
        ) : areas.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">
              No areas with reported issues yet.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Be the first to report a civic issue and help improve Delhi!
            </p>
          </div>
        ) : (
          <>
            {/* Areas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {areas.map((area) => (
                <AreaHealthCard key={area.area} {...area} />
              ))}
            </div>

            {/* Legend */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
              <h3 className="font-bold text-foreground mb-6 text-lg">
                How to Read Health Scores
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-green-700 text-sm">
                      70-100%: Good
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Most issues have been resolved
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-yellow-700 text-sm">
                      40-69%: Moderate
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Some issues are still pending
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-red-700 text-sm">
                      0-39%: Critical
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Many issues unresolved - needs attention
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  subtext: string;
  color: string;
}

function StatCard({ icon, label, value, subtext, color }: StatCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
      <div className={`${color} mb-4`}>{icon}</div>
      <p className="text-muted-foreground text-sm font-medium">{label}</p>
      <p className="text-3xl sm:text-4xl font-black text-foreground mt-2">
        {value}
      </p>
      <p className="text-xs text-muted-foreground mt-2">{subtext}</p>
    </div>
  );
}
