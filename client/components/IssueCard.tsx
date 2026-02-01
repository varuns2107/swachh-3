import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { PriorityLevel, IssueCategory } from "@shared/api";

interface IssueCardProps {
  id: number;
  category: IssueCategory;
  priority: PriorityLevel;
  supporters: number;
  message?: string;
  onResolve?: (id: number) => void;
  isResolved?: boolean;
}

const categoryIcons: Record<IssueCategory, string> = {
  waste: "🗑️",
  water: "💧",
  air: "💨",
  transport: "🚗",
  energy: "⚡",
  sanitation: "🧹",
  noise: "🔊",
};

const categoryLabels: Record<IssueCategory, string> = {
  waste: "Waste Management",
  water: "Water",
  air: "Air Quality",
  transport: "Transport",
  energy: "Energy",
  sanitation: "Sanitation",
  noise: "Noise Pollution",
};

export default function IssueCard({
  id,
  category,
  priority,
  supporters,
  message,
  onResolve,
  isResolved,
}: IssueCardProps) {
  const priorityColors = {
    low: "bg-blue-50 border-blue-200 text-blue-700",
    medium: "bg-warning/10 border-warning/20 text-warning",
    high: "bg-danger/10 border-danger/20 text-danger",
  };

  const priorityBadgeColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-warning/20 text-warning",
    high: "bg-danger/20 text-danger",
  };

  return (
    <div
      className={`border rounded-lg p-4 ${priorityColors[priority]} transition-shadow hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{categoryIcons[category]}</span>
            <h3 className="font-semibold text-sm sm:text-base">
              {categoryLabels[category]}
            </h3>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${priorityBadgeColors[priority]}`}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
          </div>
          {message && <p className="text-sm opacity-90 mb-2">{message}</p>}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              <span>ID: {id}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{supporters} supporter{supporters !== 1 ? "s" : ""}</span>
            </div>
          </div>
        </div>
        {onResolve && !isResolved && (
          <button
            onClick={() => onResolve(id)}
            className="flex items-center gap-1 px-3 py-1 rounded bg-success text-white text-xs font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <CheckCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Resolve</span>
          </button>
        )}
        {isResolved && (
          <div className="flex items-center gap-1 px-3 py-1 rounded bg-success/20 text-success text-xs font-medium whitespace-nowrap">
            <CheckCircle className="w-4 h-4" />
            <span>Resolved</span>
          </div>
        )}
      </div>
    </div>
  );
}
