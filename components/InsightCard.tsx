import { ChevronRight } from 'lucide-react';

interface InsightCardProps {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export function InsightCard({ icon, title, description, onClick }: InsightCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-2xl p-4 border border-border text-left hover:bg-accent/50 transition-colors"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl mt-0.5">{icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="mb-1">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
      </div>
    </button>
  );
}
