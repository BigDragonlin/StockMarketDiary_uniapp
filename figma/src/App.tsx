import { useState, useEffect } from "react";
import {
  Plus,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Dashboard } from "./components/Dashboard";
import { AddTransactionModal } from "./components/AddTransactionModal";
import { TransactionDetail } from "./components/TransactionDetail";
import { DeepDiveAnalysis } from "./components/DeepDiveAnalysis";
import { TransactionList } from "./components/TransactionList";

type View =
  | "dashboard"
  | "transactions"
  | "analysis"
  | "settings";
type Screen =
  | { type: "main"; view: View }
  | { type: "transaction-detail"; id: string }
  | { type: "deep-dive"; analysisType: string }
  | { type: "transaction-list"; filterTag: string };

// Mock transactions data
const mockTransactions = [
  {
    id: "1",
    type: "buy" as const,
    stockCode: "600519",
    stockName: "贵州茅台",
    price: 1680.5,
    quantity: 100,
    tags: ["财报超预期", "估值合理", "市场情绪好"],
    notes:
      "三季报业绩超预期，市场情绪回暖，技术面突破关键阻力位。",
    emotion: 65,
    targetPrice: 1850,
    stopLoss: 1600,
    date: new Date("2024-10-15").toISOString(),
    profit: 3420,
  },
  {
    id: "2",
    type: "sell" as const,
    stockCode: "000858",
    stockName: "五粮液",
    price: 145.2,
    quantity: 200,
    tags: ["达到止盈目标", "高位滞涨"],
    notes: "股价已达目标位，成交量萎缩，选择止盈离场。",
    emotion: 50,
    date: new Date("2024-10-18").toISOString(),
    profit: 2150,
  },
  {
    id: "3",
    type: "buy" as const,
    stockCode: "300750",
    stockName: "宁德时代",
    price: 182.3,
    quantity: 50,
    tags: ["行业景气上升", "新产品发布", "热点概念"],
    notes: "新一代电池技术发布，行业景气度提升。",
    emotion: 75,
    targetPrice: 210,
    stopLoss: 170,
    date: new Date("2024-11-05").toISOString(),
    profit: -580,
  },
  {
    id: "4",
    type: "sell" as const,
    stockCode: "601012",
    stockName: "隆基绿能",
    price: 18.65,
    quantity: 500,
    tags: ["触及止损线", "恐慌性卖出"],
    notes: "跌破重要支撑位，止损离场。事后看是恐慌性操作。",
    emotion: 25,
    date: new Date("2024-11-08").toISOString(),
    profit: -1250,
  },
  {
    id: "5",
    type: "buy" as const,
    stockCode: "688981",
    stockName: "中芯国际",
    price: 42.8,
    quantity: 100,
    tags: ["政策利好", "机构看好", "突破关键阻力"],
    notes: "国产替代政策支持，多家机构上调评级。",
    emotion: 60,
    targetPrice: 50,
    stopLoss: 39,
    date: new Date("2024-11-12").toISOString(),
    profit: 890,
  },
];

// Mock analysis data
const mockAnalysisData = {
  "top-strategy": [
    {
      tag: "财报超预期",
      count: 8,
      winRate: 87.5,
      totalProfit: 6580,
      profitRatio: 3.2,
    },
    {
      tag: "估值合理",
      count: 12,
      winRate: 75.0,
      totalProfit: 4230,
      profitRatio: 2.1,
    },
    {
      tag: "行业景气上升",
      count: 6,
      winRate: 66.7,
      totalProfit: 3150,
      profitRatio: 1.8,
    },
  ],
  "worst-strategy": [
    {
      tag: "追高热门股",
      count: 15,
      winRate: 26.7,
      totalProfit: -4820,
      profitRatio: 0.4,
    },
    {
      tag: "FOMO心态",
      count: 10,
      winRate: 30.0,
      totalProfit: -2560,
      profitRatio: 0.5,
    },
    {
      tag: "恐慌性卖出",
      count: 8,
      winRate: 25.0,
      totalProfit: -1890,
      profitRatio: 0.3,
    },
  ],
  sectors: [
    {
      tag: "新能源",
      count: 18,
      winRate: 72.2,
      totalProfit: 8920,
      profitRatio: 2.5,
    },
    {
      tag: "消费",
      count: 14,
      winRate: 64.3,
      totalProfit: 5340,
      profitRatio: 1.9,
    },
    {
      tag: "科技",
      count: 20,
      winRate: 55.0,
      totalProfit: 3780,
      profitRatio: 1.4,
    },
  ],
  "opportunity-cost": [
    {
      tag: "过早卖出",
      count: 22,
      winRate: 45.5,
      totalProfit: -3240,
      profitRatio: 0.8,
    },
    {
      tag: "止损不及时",
      count: 12,
      winRate: 33.3,
      totalProfit: -2890,
      profitRatio: 0.6,
    },
    {
      tag: "未按计划执行",
      count: 16,
      winRate: 37.5,
      totalProfit: -1950,
      profitRatio: 0.7,
    },
  ],
};

export default function App() {
  const [currentView, setCurrentView] =
    useState<View>("dashboard");
  const [screenStack, setScreenStack] = useState<Screen[]>([
    { type: "main", view: "dashboard" },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactions, setTransactions] =
    useState(mockTransactions);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const currentScreen = screenStack[screenStack.length - 1];

  const pushScreen = (screen: Screen) => {
    setScreenStack([...screenStack, screen]);
  };

  const popScreen = () => {
    if (screenStack.length > 1) {
      setScreenStack(screenStack.slice(0, -1));
      if (screenStack[screenStack.length - 2].type === "main") {
        setCurrentView(
          screenStack[screenStack.length - 2].view,
        );
      }
    }
  };

  const handleSaveTransaction = (transaction: any) => {
    setTransactions([transaction, ...transactions]);
  };

  const handleInsightClick = (type: string) => {
    pushScreen({ type: "deep-dive", analysisType: type });
  };

  const handleTransactionClick = (id: string) => {
    pushScreen({ type: "transaction-detail", id });
  };

  const handleAnalysisItemClick = (tag: string) => {
    pushScreen({ type: "transaction-list", filterTag: tag });
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    setScreenStack([{ type: "main", view }]);
  };

  const renderScreen = () => {
    switch (currentScreen.type) {
      case "main":
        switch (currentScreen.view) {
          case "dashboard":
            return (
              <Dashboard
                onAddTransaction={() => setShowAddModal(true)}
                onInsightClick={handleInsightClick}
                onTransactionClick={handleTransactionClick}
                transactions={transactions}
              />
            );
          case "transactions":
            return (
              <div className="min-h-screen bg-background p-4 pb-20">
                <h1 className="mb-4">所有交易</h1>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      onClick={() =>
                        handleTransactionClick(transaction.id)
                      }
                      className="cursor-pointer"
                    >
                      <div className="bg-card rounded-xl p-4 border border-border">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={
                                  transaction.type === "buy"
                                    ? "text-[#FF3B30]"
                                    : "text-[#34C759]"
                                }
                              >
                                {transaction.type === "buy"
                                  ? "买入"
                                  : "卖出"}
                              </span>
                              <span>
                                {transaction.stockName}
                              </span>
                              <span className="text-muted-foreground">
                                {transaction.stockCode}
                              </span>
                            </div>
                            <div className="text-muted-foreground text-sm">
                              {new Date(
                                transaction.date,
                              ).toLocaleDateString("zh-CN")}
                            </div>
                          </div>
                          {transaction.profit !== undefined && (
                            <div
                              className={
                                transaction.profit >= 0
                                  ? "text-[#FF3B30]"
                                  : "text-[#34C759]"
                              }
                            >
                              {transaction.profit >= 0
                                ? "+"
                                : ""}
                              ¥{transaction.profit.toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "analysis":
            return (
              <div className="min-h-screen bg-background p-4 pb-20">
                <h1 className="mb-4">深度分析</h1>
                <div className="space-y-3">
                  <button
                    onClick={() =>
                      handleInsightClick("top-strategy")
                    }
                    className="w-full bg-card rounded-xl p-4 border border-border text-left"
                  >
                    <h3>决策模式分析</h3>
                    <p className="text-muted-foreground">
                      分析各种决策依据的效果
                    </p>
                  </button>
                  <button
                    onClick={() =>
                      handleInsightClick("sectors")
                    }
                    className="w-full bg-card rounded-xl p-4 border border-border text-left"
                  >
                    <h3>板块能力圈</h3>
                    <p className="text-muted-foreground">
                      发现你的优势领域
                    </p>
                  </button>
                  <button
                    onClick={() =>
                      handleInsightClick("opportunity-cost")
                    }
                    className="w-full bg-card rounded-xl p-4 border border-border text-left"
                  >
                    <h3>机会成本分析</h3>
                    <p className="text-muted-foreground">
                      评估错过的机会
                    </p>
                  </button>
                </div>
              </div>
            );
          case "settings":
            return (
              <div className="min-h-screen bg-background p-4 pb-20">
                <h1 className="mb-4">设置</h1>
                <div className="space-y-3">
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3>深色模式</h3>
                        <p className="text-muted-foreground">
                          保持冷静理性的分析氛围
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setIsDarkMode(!isDarkMode)
                        }
                        className={`w-12 h-6 rounded-full transition-colors ${
                          isDarkMode ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full transition-transform ${
                            isDarkMode
                              ? "translate-x-6"
                              : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="bg-card rounded-xl p-4 border border-border">
                    <h3>关于</h3>
                    <p className="text-muted-foreground mt-1">
                      投资复盘 v1.0.0
                    </p>
                    <p className="text-muted-foreground mt-2">
                      一款帮助A股投资者养成投资纪律、训练决策逻辑的个人投资教练应用
                    </p>
                  </div>
                </div>
              </div>
            );
        }
        break;

      case "transaction-detail":
        const transaction = transactions.find(
          (t) => t.id === currentScreen.id,
        );
        if (!transaction) return <div>交易不存在</div>;
        return (
          <TransactionDetail
            transaction={transaction}
            onBack={popScreen}
          />
        );

      case "deep-dive":
        const analysisData =
          mockAnalysisData[
            currentScreen.analysisType as keyof typeof mockAnalysisData
          ] || [];
        const titles = {
          "top-strategy": "王牌策略",
          "worst-strategy": "警惕陷阱",
          sectors: "能力圈分析",
          "opportunity-cost": "机会成本分析",
        };
        const descriptions = {
          "top-strategy": "这些决策依据为你带来了最多收益",
          "worst-strategy": "这些决策模式导致了最大亏损",
          sectors: "你在各个板块的投资表现",
          "opportunity-cost": "分析决策时机和执行纪律",
        };
        return (
          <DeepDiveAnalysis
            title={
              titles[
                currentScreen.analysisType as keyof typeof titles
              ]
            }
            description={
              descriptions[
                currentScreen.analysisType as keyof typeof descriptions
              ]
            }
            data={analysisData}
            onBack={popScreen}
            onItemClick={handleAnalysisItemClick}
          />
        );

      case "transaction-list":
        const filteredTransactions = transactions.filter((t) =>
          t.tags.includes(currentScreen.filterTag),
        );
        return (
          <TransactionList
            title={`${currentScreen.filterTag} 相关交易`}
            transactions={filteredTransactions}
            onBack={popScreen}
            onTransactionClick={handleTransactionClick}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderScreen()}

      {/* Floating Add Button - only show on main dashboard */}
      {currentScreen.type === "main" &&
        currentScreen.view === "dashboard" && (
          <button
            onClick={() => setShowAddModal(true)}
            className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-20"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}

      {/* Bottom Navigation */}
      {currentScreen.type === "main" && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-10">
          <div className="flex items-center justify-around p-2">
            <button
              onClick={() => handleViewChange("dashboard")}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                currentView === "dashboard"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs">仪表盘</span>
            </button>
            <button
              onClick={() => handleViewChange("transactions")}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                currentView === "transactions"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <FileText className="w-6 h-6" />
              <span className="text-xs">交易</span>
            </button>
            <button
              onClick={() => handleViewChange("analysis")}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                currentView === "analysis"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs">分析</span>
            </button>
            <button
              onClick={() => handleViewChange("settings")}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                currentView === "settings"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Settings className="w-6 h-6" />
              <span className="text-xs">设置</span>
            </button>
          </div>
        </div>
      )}

      {/* Add Transaction Modal */}
      <AddTransactionModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSave={handleSaveTransaction}
      />
    </div>
  );
}