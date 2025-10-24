import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { TransactionItem } from './TransactionItem';

interface TransactionListProps {
  title: string;
  transactions: any[];
  onBack: () => void;
  onTransactionClick: (id: string) => void;
}

export function TransactionList({ title, transactions, onBack, onTransactionClick }: TransactionListProps) {
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
            <p className="text-muted-foreground">{transactions.length} 笔交易</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            stockCode={transaction.stockCode}
            stockName={transaction.stockName}
            type={transaction.type}
            price={transaction.price}
            quantity={transaction.quantity}
            date={new Date(transaction.date).toLocaleDateString('zh-CN')}
            profit={transaction.profit}
            tags={transaction.tags}
            onClick={() => onTransactionClick(transaction.id)}
          />
        ))}
      </div>
    </div>
  );
}
