import { useState } from 'react';
import { MetricCard } from './MetricCard';
import { InsightCard } from './InsightCard';
import { PerformanceChart } from './PerformanceChart';
import { TransactionItem } from './TransactionItem';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface DashboardProps {
  onAddTransaction: () => void;
  onInsightClick: (type: string) => void;
  onTransactionClick: (id: string) => void;
  transactions: any[];
}

// Mock data
const performanceData = [
  { date: '10/01', portfolio: 0, benchmark: 0 },
  { date: '10/08', portfolio: 2.5, benchmark: 1.2 },
  { date: '10/15', portfolio: 5.8, benchmark: 2.1 },
  { date: '10/22', portfolio: 4.2, benchmark: 2.8 },
  { date: '10/29', portfolio: 7.5, benchmark: 3.5 },
  { date: '11/05', portfolio: 9.2, benchmark: 4.1 },
  { date: '11/12', portfolio: 8.1, benchmark: 4.6 },
  { date: '11/19', portfolio: 11.3, benchmark: 5.2 }
];

export function Dashboard({ onAddTransaction, onInsightClick, onTransactionClick, transactions }: DashboardProps) {
  const [timeRange, setTimeRange] = useState('3m');

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="p-4">
          <h1>投资复盘</h1>
          <p className="text-muted-foreground">让数据说话，用理性投资</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Time Range Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { key: '1m', label: '近一月' },
            { key: '3m', label: '近三月' },
            { key: 'ytd', label: '今年以来' },
            { key: 'all', label: '全部' }
          ].map(range => (
            <Button
              key={range.key}
              variant={timeRange === range.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range.key)}
            >
              {range.label}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            label="总盈亏"
            value="+¥5,680"
            change="+11.3%"
            changeType="up"
          />
          <MetricCard
            label="交易胜率"
            value="62.5%"
            change="+5.2%"
            changeType="up"
          />
          <MetricCard
            label="盈亏比"
            value="1.85"
            changeType="neutral"
          />
          <MetricCard
            label="跑赢沪深300"
            value="+6.1%"
            changeType="up"
          />
        </div>

        {/* Performance Chart */}
        <div>
          <h3 className="mb-3">业绩曲线</h3>
          <PerformanceChart data={performanceData} />
        </div>

        {/* Insight Cards */}
        <div>
          <h3 className="mb-3">智能洞察</h3>
          <div className="space-y-3">
            <InsightCard
              icon="🏆"
              title="王牌策略"
              description="基于「财报超预期」的决策为你带来了最大收益"
              onClick={() => onInsightClick('top-strategy')}
            />
            <InsightCard
              icon="⚠️"
              title="警惕陷阱"
              description="「追高热门股」是你的最大亏损源"
              onClick={() => onInsightClick('worst-strategy')}
            />
            <InsightCard
              icon="🗺️"
              title="能力圈"
              description="你在「新能源」板块的投资表现最佳"
              onClick={() => onInsightClick('sectors')}
            />
            <InsightCard
              icon="💡"
              title="机会成本"
              description="60%的卖出决策过早，未能持有至后续高点"
              onClick={() => onInsightClick('opportunity-cost')}
            />
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3>最近交易</h3>
            <Button variant="ghost" size="sm">查看全部</Button>
          </div>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <TransactionItem
                key={transaction.id}
                stockCode={transaction.stockCode}
                stockName={transaction.stockName}
                type={transaction.type}
                price={transaction.price}
                quantity={transaction.quantity}
                date={new Date(transaction.date).toLocaleDateString('zh-CN')}
                profit={transaction.profit}
                tags={transaction.tags.slice(0, 2)}
                onClick={() => onTransactionClick(transaction.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
