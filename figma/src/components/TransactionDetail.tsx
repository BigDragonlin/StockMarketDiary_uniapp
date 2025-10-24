import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from './ui/button';

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  stockCode: string;
  stockName: string;
  price: number;
  quantity: number;
  tags: string[];
  notes: string;
  emotion: number;
  targetPrice?: number;
  stopLoss?: number;
  date: string;
}

interface TransactionDetailProps {
  transaction: Transaction;
  onBack: () => void;
}

const emotions = [
  { value: 0, label: '极度恐慌', emoji: '😱' },
  { value: 25, label: '担忧', emoji: '😰' },
  { value: 50, label: '理性', emoji: '😐' },
  { value: 75, label: '乐观', emoji: '😊' },
  { value: 100, label: '极度贪婪', emoji: '🤑' }
];

export function TransactionDetail({ transaction, onBack }: TransactionDetailProps) {
  const isBuy = transaction.type === 'buy';
  const typeColor = isBuy ? 'text-[#FF3B30]' : 'text-[#34C759]';
  const typeBg = isBuy ? 'bg-[#FF3B30]/10' : 'bg-[#34C759]/10';
  
  const currentEmotion = emotions.reduce((prev, curr) => 
    Math.abs(curr.value - transaction.emotion) < Math.abs(prev.value - transaction.emotion) ? curr : prev
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2>交易详情</h2>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Basic Info */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full ${typeBg} ${typeColor}`}>
                {isBuy ? '买入' : '卖出'}
              </span>
              <h3>{transaction.stockName}</h3>
              <span className="text-muted-foreground">{transaction.stockCode}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-muted-foreground mb-1">成交价格</div>
              <div className="text-xl">¥{transaction.price.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">成交数量</div>
              <div className="text-xl">{transaction.quantity}股</div>
            </div>
            <div className="col-span-2">
              <div className="text-muted-foreground mb-1">成交金额</div>
              <div className="text-xl">¥{(transaction.price * transaction.quantity).toFixed(2)}</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-muted-foreground">{formatDate(transaction.date)}</div>
          </div>
        </div>

        {/* Strategy Settings */}
        {(transaction.targetPrice || transaction.stopLoss) && (
          <div className="bg-card rounded-2xl p-4 border border-border">
            <h3 className="mb-3">策略设定</h3>
            <div className="grid grid-cols-2 gap-4">
              {transaction.targetPrice && (
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>目标止盈价</span>
                  </div>
                  <div className="text-xl text-[#FF3B30]">¥{transaction.targetPrice.toFixed(2)}</div>
                </div>
              )}
              {transaction.stopLoss && (
                <div>
                  <div className="flex items-center gap-1 text-muted-foreground mb-1">
                    <TrendingDown className="w-4 h-4" />
                    <span>止损价</span>
                  </div>
                  <div className="text-xl text-[#34C759]">¥{transaction.stopLoss.toFixed(2)}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Decision Tags */}
        {transaction.tags.length > 0 && (
          <div className="bg-card rounded-2xl p-4 border border-border">
            <h3 className="mb-3">决策依据</h3>
            <div className="flex flex-wrap gap-2">
              {transaction.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Notes */}
        {transaction.notes && (
          <div className="bg-card rounded-2xl p-4 border border-border">
            <h3 className="mb-3">详细记录</h3>
            <p className="text-foreground whitespace-pre-wrap">{transaction.notes}</p>
          </div>
        )}

        {/* Emotion */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <h3 className="mb-3">情绪状态</h3>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{currentEmotion.emoji}</span>
            <div>
              <div>{currentEmotion.label}</div>
              <div className="text-muted-foreground">情绪指数: {transaction.emotion}/100</div>
            </div>
          </div>
        </div>

        {/* Scenario Analysis Placeholder */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <h3 className="mb-3">情景分析</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-muted-foreground">假如持有一周</span>
              <span className="text-[#FF3B30]">+¥120.50 (+2.4%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-muted-foreground">假如持有一月</span>
              <span className="text-[#34C759]">-¥85.20 (-1.7%)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-muted-foreground">持有至今</span>
              <span className="text-[#FF3B30]">+¥340.00 (+6.8%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
