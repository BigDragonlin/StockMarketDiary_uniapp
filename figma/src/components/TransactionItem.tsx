import { ChevronRight } from 'lucide-react';

interface TransactionItemProps {
  stockCode: string;
  stockName: string;
  type: 'buy' | 'sell';
  price: number;
  quantity: number;
  date: string;
  profit?: number;
  tags?: string[];
  onClick?: () => void;
}

export function TransactionItem({
  stockCode,
  stockName,
  type,
  price,
  quantity,
  date,
  profit,
  tags,
  onClick
}: TransactionItemProps) {
  const isBuy = type === 'buy';
  const typeColor = isBuy ? 'text-[#FF3B30]' : 'text-[#34C759]';
  const typeBg = isBuy ? 'bg-[#FF3B30]/10' : 'bg-[#34C759]/10';

  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-xl p-4 border border-border text-left hover:bg-accent/50 transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded ${typeBg} ${typeColor}`}>
            {isBuy ? '买入' : '卖出'}
          </span>
          <span>{stockName}</span>
          <span className="text-muted-foreground">{stockCode}</span>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
      
      <div className="flex items-center justify-between mb-2">
        <div className="text-muted-foreground">
          ¥{price.toFixed(2)} × {quantity}股
        </div>
        {profit !== undefined && (
          <div className={profit >= 0 ? 'text-[#FF3B30]' : 'text-[#34C759]'}>
            {profit >= 0 ? '+' : ''}¥{profit.toFixed(2)}
          </div>
        )}
      </div>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="text-muted-foreground text-sm">{date}</div>
    </button>
  );
}
