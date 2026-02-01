import { CheckCircle } from "lucide-react";
import { IssueCategory } from "@shared/api";

interface ActionGuideProps {
  category: IssueCategory;
  actions: string[];
}

const categoryTitles: Record<IssueCategory, string> = {
  waste: "Waste Management Steps",
  water: "Water Issue Steps",
  air: "Air Quality Steps",
  transport: "Transport Problem Steps",
  energy: "Energy Safety Steps",
  sanitation: "Sanitation Steps",
  noise: "Noise Issue Steps",
};

export default function ActionGuide({ category, actions }: ActionGuideProps) {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4 sm:p-6">
      <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">
        {categoryTitles[category]}
      </h3>
      <ul className="space-y-3">
        {actions.map((action, index) => (
          <li key={index} className="flex gap-3 text-sm">
            <div className="flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            </div>
            <span className="text-muted-foreground">{action}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
