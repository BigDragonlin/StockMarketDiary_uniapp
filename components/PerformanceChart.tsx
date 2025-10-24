import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PerformanceChartProps {
  data: Array<{
    date: string;
    portfolio: number;
    benchmark: number;
  }>;
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <div className="w-full h-64 bg-card rounded-2xl p-4 border border-border">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(142, 142, 147, 0.2)" />
          <XAxis 
            dataKey="date" 
            stroke="#8E8E93"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#8E8E93"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '8px'
            }}
            formatter={(value: number) => `${value.toFixed(2)}%`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="portfolio" 
            stroke="#0A84FF" 
            strokeWidth={2}
            name="我的收益"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="benchmark" 
            stroke="#8E8E93" 
            strokeWidth={1.5}
            strokeDasharray="5 5"
            name="沪深300"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
