interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
}

export function MetricCard({ label, value, change, changeType = 'neutral' }: MetricCardProps) {
  const getChangeColor = () => {
    if (changeType === 'up') return 'text-[#FF3B30]';
    if (changeType === 'down') return 'text-[#34C759]';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-2xl p-4 border border-border">
      <div className="text-muted-foreground mb-1">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className="text-[28px] font-semibold">{value}</span>
        {change && (
          <span className={`${getChangeColor()}`}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
