import { defineStore } from 'pinia'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [
      {
        id: '1',
        type: 'buy',
        stockCode: '600519',
        stockName: '贵州茅台',
        price: 1680.50,
        quantity: 100,
        tags: ['财报超预期', '估值合理', '市场情绪好'],
        notes: '三季报业绩超预期，市场情绪回暖，技术面突破关键阻力位。',
        emotion: 65,
        targetPrice: 1850,
        stopLoss: 1600,
        date: '2024-10-15',
        profit: 3420
      },
      {
        id: '2',
        type: 'sell',
        stockCode: '000858',
        stockName: '五粮液',
        price: 145.20,
        quantity: 200,
        tags: ['达到止盈目标', '高位滞涨'],
        notes: '股价已达目标位，成交量萎缩，选择止盈离场。',
        emotion: 50,
        date: '2024-10-18',
        profit: 2150
      },
      {
        id: '3',
        type: 'buy',
        stockCode: '300750',
        stockName: '宁德时代',
        price: 182.30,
        quantity: 50,
        tags: ['行业景气上升', '新产品发布', '热点概念'],
        notes: '新一代电池技术发布，行业景气度提升。',
        emotion: 75,
        targetPrice: 210,
        stopLoss: 170,
        date: '2024-11-05',
        profit: -580
      },
      {
        id: '4',
        type: 'sell',
        stockCode: '601012',
        stockName: '隆基绿能',
        price: 18.65,
        quantity: 500,
        tags: ['触及止损线', '恐慌性卖出'],
        notes: '跌破重要支撑位，止损离场。事后看是恐慌性操作。',
        emotion: 25,
        date: '2024-11-08',
        profit: -1250
      },
      {
        id: '5',
        type: 'buy',
        stockCode: '688981',
        stockName: '中芯国际',
        price: 42.80,
        quantity: 100,
        tags: ['政策利好', '机构看好', '突破关键阻力'],
        notes: '国产替代政策支持，多家机构上调评级。',
        emotion: 60,
        targetPrice: 50,
        stopLoss: 39,
        date: '2024-11-12',
        profit: 890
      }
    ]
  }),

  getters: {
    getTransactionById: (state) => (id) => {
      return state.transactions.find(t => t.id === id)
    },
    
    getTransactionsByTag: (state) => (tag) => {
      return state.transactions.filter(t => t.tags.includes(tag))
    },

    totalProfit: (state) => {
      return state.transactions.reduce((sum, t) => sum + (t.profit || 0), 0)
    },

    winRate: (state) => {
      const profitable = state.transactions.filter(t => (t.profit || 0) > 0).length
      return state.transactions.length > 0 ? (profitable / state.transactions.length) * 100 : 0
    }
  },

  actions: {
    addTransaction(transaction) {
      this.transactions.unshift({
        ...transaction,
        id: Date.now().toString()
      })
      this.saveToStorage()
    },

    updateTransaction(id, transaction) {
      const index = this.transactions.findIndex(t => t.id === id)
      if (index !== -1) {
        this.transactions[index] = { ...this.transactions[index], ...transaction }
        this.saveToStorage()
      }
    },

    deleteTransaction(id) {
      this.transactions = this.transactions.filter(t => t.id !== id)
      this.saveToStorage()
    },

    saveToStorage() {
      uni.setStorageSync('transactions', this.transactions)
    },

    loadFromStorage() {
      const saved = uni.getStorageSync('transactions')
      if (saved && saved.length > 0) {
        this.transactions = saved
      }
    }
  }
})
