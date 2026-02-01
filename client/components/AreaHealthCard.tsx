import { TrendingUp } from "lucide-react";
import { AreaHealthItem } from "@shared/api";

interface AreaHealthCardProps extends AreaHealthItem {}

export default function AreaHealthCard({
  area,
  health_score,
  color,
  total_issues,
  resolved_issues,
}: AreaHealthCardProps) {
  const colorClasses = {
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      badge: "bg-green-100",
    },
    yellow: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-700",
      badge: "bg-yellow-100",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      badge: "bg-red-100",
    },
  };

  const colors = colorClasses[color];

  return (
    <div className={`border rounded-lg p-4 sm:p-6 ${colors.bg} ${colors.border}`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className={`font-semibold text-sm sm:text-base ${colors.text}`}>
            {area}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">Area Health Score</p>
        </div>
        <div className={`${colors.badge} ${colors.text} font-bold text-lg sm:text-2xl px-3 py-2 rounded-lg`}>
          {health_score}%
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className={`font-semibold ${colors.text}`}>
            {resolved_issues} / {total_issues}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              color === "green"
                ? "bg-green-500"
                : color === "yellow"
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
            style={{ width: `${Math.min(health_score, 100)}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1 mt-4 text-xs">
        <TrendingUp className="w-4 h-4" />
        <span className="text-muted-foreground">
          {total_issues > 0
            ? `${resolved_issues > 0 ? "Some issues resolved" : "Issues pending resolution"}`
            : "No issues reported"}
        </span>
      </div>
    </div>
  );
}
