import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from './ui/button';

interface AnalysisItem {
  tag: string;
  count: number;
  winRate: number;
  totalProfit: number;
  profitRatio: number;
}

interface DeepDiveAnalysisProps {
  title: string;
  description: string;
  data: AnalysisItem[];
  onBack: () => void;
  onItemClick: (tag: string) => void;
}

export function DeepDiveAnalysis({ title, description, data, onBack, onItemClick }: DeepDiveAnalysisProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2>{title}</h2>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {data.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onItemClick(item.tag)}
            className="w-full bg-card rounded-xl p-4 border border-border text-left hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <h3>{item.tag}</h3>
              <div className={`text-xl ${item.totalProfit >= 0 ? 'text-[#FF3B30]' : 'text-[#34C759]'}`}>
                {item.totalProfit >= 0 ? '+' : ''}¥{item.totalProfit.toFixed(2)}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-muted-foreground text-sm mb-1">交易次数</div>
                <div>{item.count}次</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm mb-1">胜率</div>
                <div className={item.winRate >= 50 ? 'text-[#FF3B30]' : 'text-[#34C759]'}>
                  {item.winRate.toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm mb-1">盈亏比</div>
                <div className={item.profitRatio >= 1 ? 'text-[#FF3B30]' : 'text-[#34C759]'}>
                  {item.profitRatio.toFixed(2)}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
