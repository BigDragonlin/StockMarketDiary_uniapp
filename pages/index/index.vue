<template>
  <view class="dashboard-page" :class="{ dark: isDarkMode }">
    <!-- 自定义导航栏 -->
    <view class="custom-navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="navbar-content">
        <text class="navbar-title">投资复盘</text>
        <text class="navbar-subtitle">让数据说话，用理性投资</text>
      </view>
    </view>

    <scroll-view scroll-y class="scroll-container">
      <view class="content">
        <!-- 时间范围选择 -->
        <view class="time-range">
          <view 
            v-for="range in timeRanges" 
            :key="range.key"
            class="time-btn"
            :class="{ active: selectedRange === range.key }"
            @tap="selectedRange = range.key"
          >
            {{ range.label }}
          </view>
        </view>

        <!-- 核心指标 -->
        <view class="metrics-grid">
          <view class="metric-card">
            <text class="metric-label">总盈亏</text>
            <view class="metric-value-row">
              <text class="metric-value up">+¥5,680</text>
              <text class="metric-change up">+11.3%</text>
            </view>
          </view>
          <view class="metric-card">
            <text class="metric-label">交易胜率</text>
            <view class="metric-value-row">
              <text class="metric-value">62.5%</text>
              <text class="metric-change up">+5.2%</text>
            </view>
          </view>
          <view class="metric-card">
            <text class="metric-label">盈亏比</text>
            <text class="metric-value">1.85</text>
          </view>
          <view class="metric-card">
            <text class="metric-label">跑赢沪深300</text>
            <text class="metric-value up">+6.1%</text>
          </view>
        </view>

        <!-- 业绩曲线 -->
        <view class="section">
          <text class="section-title">业绩曲线</text>
          <view class="chart-card">
            <text class="chart-placeholder">图表占位</text>
            <text class="chart-hint">使用 uCharts 或 ECharts 实现</text>
          </view>
        </view>

        <!-- 智能洞察 -->
        <view class="section">
          <text class="section-title">智能洞察</text>
          <view class="insights">
            <view 
              v-for="insight in insights" 
              :key="insight.type"
              class="insight-card"
              @tap="navigateToAnalysis(insight.type)"
            >
              <view class="insight-content">
                <text class="insight-icon">{{ insight.icon }}</text>
                <view class="insight-text">
                  <text class="insight-title">{{ insight.title }}</text>
                  <text class="insight-desc">{{ insight.description }}</text>
                </view>
                <uni-icons type="right" size="20" color="#8E8E93"></uni-icons>
              </view>
            </view>
          </view>
        </view>

        <!-- 最近交易 -->
        <view class="section">
          <view class="section-header">
            <text class="section-title">最近交易</text>
            <text class="section-more" @tap="viewAllTransactions">查看全部</text>
          </view>
          <view class="transactions">
            <view 
              v-for="item in recentTransactions" 
              :key="item.id"
              class="transaction-item"
              @tap="navigateToDetail(item.id)"
            >
              <view class="transaction-header">
                <view class="transaction-info">
                  <view class="transaction-badge" :class="item.type">
                    {{ item.type === 'buy' ? '买入' : '卖出' }}
                  </view>
                  <text class="stock-name">{{ item.stockName }}</text>
                  <text class="stock-code">{{ item.stockCode }}</text>
                </view>
                <uni-icons type="right" size="16" color="#8E8E93"></uni-icons>
              </view>
              <view class="transaction-body">
                <text class="transaction-detail">¥{{ item.price.toFixed(2) }} × {{ item.quantity }}股</text>
                <text class="transaction-profit" :class="item.profit >= 0 ? 'up' : 'down'">
                  {{ item.profit >= 0 ? '+' : '' }}¥{{ item.profit.toFixed(2) }}
                </text>
              </view>
              <view class="transaction-tags">
                <text v-for="(tag, idx) in item.tags.slice(0, 2)" :key="idx" class="tag">
                  {{ tag }}
                </text>
              </view>
              <text class="transaction-date">{{ item.date }}</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 悬浮添加按钮 -->
    <view class="fab" @tap="navigateToAdd">
      <uni-icons type="plus" size="32" color="#FFFFFF"></uni-icons>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTransactionStore, useSettingsStore } from '@/store'

const transactionStore = useTransactionStore()
const settingsStore = useSettingsStore()

const statusBarHeight = ref(0)
const selectedRange = ref('3m')
const isDarkMode = computed(() => settingsStore.isDarkMode)

const timeRanges = [
  { key: '1m', label: '近一月' },
  { key: '3m', label: '近三月' },
  { key: 'ytd', label: '今年以来' },
  { key: 'all', label: '全部' }
]

const insights = [
  {
    type: 'top-strategy',
    icon: '🏆',
    title: '王牌策略',
    description: '基于「财报超预期」的决策为你带来了最大收益'
  },
  {
    type: 'worst-strategy',
    icon: '⚠️',
    title: '警惕陷阱',
    description: '「追高热门股」是你的最大亏损源'
  },
  {
    type: 'sectors',
    icon: '🗺️',
    title: '能力圈',
    description: '你在「新能源」板块的投资表现最佳'
  },
  {
    type: 'opportunity-cost',
    icon: '💡',
    title: '机会成本',
    description: '60%的卖出决策过早，未能持有至后续高点'
  }
]

const recentTransactions = computed(() => {
  return transactionStore.transactions.slice(0, 5)
})

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0
  
  settingsStore.loadFromStorage()
  transactionStore.loadFromStorage()
})

function navigateToAnalysis(type) {
  uni.navigateTo({
    url: `/pages/analysis/detail?type=${type}`
  })
}

function navigateToDetail(id) {
  uni.navigateTo({
    url: `/pages/transactions/detail?id=${id}`
  })
}

function navigateToAdd() {
  uni.navigateTo({
    url: '/pages/transactions/add'
  })
}

function viewAllTransactions() {
  uni.switchTab({
    url: '/pages/transactions/list'
  })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.dashboard-page {
  min-height: 100vh;
  background-color: #1A1A1A;
}

.custom-navbar {
  background-color: #2C2C2E;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar-content {
  padding: 32rpx;
}

.navbar-title {
  display: block;
  font-size: 40rpx;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 8rpx;
}

.navbar-subtitle {
  display: block;
  font-size: 28rpx;
  color: #8E8E93;
}

.scroll-container {
  height: calc(100vh - 200rpx);
}

.content {
  padding: 32rpx;
  padding-bottom: 200rpx;
}

.time-range {
  display: flex;
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.time-btn {
  padding: 12rpx 24rpx;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12rpx;
  font-size: 28rpx;
  color: #8E8E93;
  
  &.active {
    background-color: #0A84FF;
    color: #FFFFFF;
    border-color: #0A84FF;
  }
}

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24rpx;
  margin-bottom: 48rpx;
}

.metric-card {
  background-color: #2C2C2E;
  border-radius: 32rpx;
  padding: 32rpx;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.metric-label {
  display: block;
  font-size: 28rpx;
  color: #8E8E93;
  margin-bottom: 8rpx;
}

.metric-value-row {
  display: flex;
  align-items: baseline;
  gap: 16rpx;
}

.metric-value {
  font-size: 56rpx;
  font-weight: 600;
  color: #FFFFFF;
  
  &.up {
    color: #FF3B30;
  }
  
  &.down {
    color: #34C759;
  }
}

.metric-change {
  font-size: 28rpx;
  
  &.up {
    color: #FF3B30;
  }
  
  &.down {
    color: #34C759;
  }
}

.section {
  margin-bottom: 48rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #FFFFFF;
}

.section-more {
  font-size: 28rpx;
  color: #0A84FF;
}

.chart-card {
  background-color: #2C2C2E;
  border-radius: 32rpx;
  padding: 64rpx 32rpx;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.chart-placeholder {
  font-size: 32rpx;
  color: #8E8E93;
  margin-bottom: 16rpx;
}

.chart-hint {
  font-size: 24rpx;
  color: #6C6C70;
}

.insights {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.insight-card {
  background-color: #2C2C2E;
  border-radius: 32rpx;
  padding: 32rpx;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.insight-content {
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
}

.insight-icon {
  font-size: 48rpx;
  margin-top: 4rpx;
}

.insight-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.insight-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #FFFFFF;
}

.insight-desc {
  font-size: 28rpx;
  color: #8E8E93;
  line-height: 1.5;
}

.transactions {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.transaction-item {
  background-color: #2C2C2E;
  border-radius: 24rpx;
  padding: 32rpx;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.transaction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.transaction-info {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.transaction-badge {
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  
  &.buy {
    background-color: rgba(255, 59, 48, 0.1);
    color: #FF3B30;
  }
  
  &.sell {
    background-color: rgba(52, 199, 89, 0.1);
    color: #34C759;
  }
}

.stock-name {
  font-size: 28rpx;
  color: #FFFFFF;
}

.stock-code {
  font-size: 28rpx;
  color: #8E8E93;
}

.transaction-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.transaction-detail {
  font-size: 28rpx;
  color: #8E8E93;
}

.transaction-profit {
  font-size: 28rpx;
  
  &.up {
    color: #FF3B30;
  }
  
  &.down {
    color: #34C759;
  }
}

.transaction-tags {
  display: flex;
  gap: 12rpx;
  margin-bottom: 16rpx;
  flex-wrap: wrap;
}

.tag {
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  background-color: #3A3A3C;
  color: #8E8E93;
  font-size: 24rpx;
}

.transaction-date {
  font-size: 24rpx;
  color: #8E8E93;
}

.fab {
  position: fixed;
  bottom: 180rpx;
  right: 32rpx;
  width: 112rpx;
  height: 112rpx;
  background-color: #0A84FF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 32rpx rgba(10, 132, 255, 0.4);
  z-index: 100;
}
</style>
