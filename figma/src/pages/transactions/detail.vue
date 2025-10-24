<template>
  <view class="detail-page" :class="{ dark: isDarkMode }">
    <scroll-view scroll-y class="scroll-container" v-if="transaction">
      <view class="content">
        <!-- 基本信息 -->
        <view class="info-card">
          <view class="card-header">
            <view class="header-info">
              <view class="badge" :class="transaction.type">
                {{ transaction.type === 'buy' ? '买入' : '卖出' }}
              </view>
              <text class="stock-name">{{ transaction.stockName }}</text>
              <text class="stock-code">{{ transaction.stockCode }}</text>
            </view>
          </view>

          <view class="metrics">
            <view class="metric-item">
              <text class="metric-label">成交价格</text>
              <text class="metric-value">¥{{ transaction.price.toFixed(2) }}</text>
            </view>
            <view class="metric-item">
              <text class="metric-label">成交数量</text>
              <text class="metric-value">{{ transaction.quantity }}股</text>
            </view>
            <view class="metric-item full-width">
              <text class="metric-label">成交金额</text>
              <text class="metric-value">¥{{ (transaction.price * transaction.quantity).toFixed(2) }}</text>
            </view>
          </view>

          <view class="divider"></view>
          <text class="date">{{ transaction.date }}</text>
        </view>

        <!-- 策略设定 -->
        <view v-if="transaction.targetPrice || transaction.stopLoss" class="info-card">
          <text class="card-title">策略设定</text>
          <view class="strategy-grid">
            <view v-if="transaction.targetPrice" class="strategy-item">
              <view class="strategy-header">
                <uni-icons type="arrow-up" size="16" color="#8E8E93"></uni-icons>
                <text class="strategy-label">目标止盈价</text>
              </view>
              <text class="strategy-value up">¥{{ transaction.targetPrice.toFixed(2) }}</text>
            </view>
            <view v-if="transaction.stopLoss" class="strategy-item">
              <view class="strategy-header">
                <uni-icons type="arrow-down" size="16" color="#8E8E93"></uni-icons>
                <text class="strategy-label">止损价</text>
              </view>
              <text class="strategy-value down">¥{{ transaction.stopLoss.toFixed(2) }}</text>
            </view>
          </view>
        </view>

        <!-- 决策依据 -->
        <view v-if="transaction.tags.length > 0" class="info-card">
          <text class="card-title">决策依据</text>
          <view class="tags">
            <view v-for="tag in transaction.tags" :key="tag" class="tag">
              {{ tag }}
            </view>
          </view>
        </view>

        <!-- 详细记录 -->
        <view v-if="transaction.notes" class="info-card">
          <text class="card-title">详细记录</text>
          <text class="notes">{{ transaction.notes }}</text>
        </view>

        <!-- 情绪状态 -->
        <view class="info-card">
          <text class="card-title">情绪状态</text>
          <view class="emotion">
            <text class="emotion-emoji">{{ currentEmotion.emoji }}</text>
            <view class="emotion-info">
              <text class="emotion-label">{{ currentEmotion.label }}</text>
              <text class="emotion-value">情绪指数: {{ transaction.emotion }}/100</text>
            </view>
          </view>
        </view>

        <!-- 情景分析 -->
        <view class="info-card">
          <text class="card-title">情景分析</text>
          <view class="scenarios">
            <view class="scenario-item">
              <text class="scenario-label">假如持有一周</text>
              <text class="scenario-value up">+¥120.50 (+2.4%)</text>
            </view>
            <view class="scenario-item">
              <text class="scenario-label">假如持有一月</text>
              <text class="scenario-value down">-¥85.20 (-1.7%)</text>
            </view>
            <view class="scenario-item">
              <text class="scenario-label">持有至今</text>
              <text class="scenario-value up">+¥340.00 (+6.8%)</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed, onLoad } from '@dcloudio/uni-app'
import { useTransactionStore, useSettingsStore } from '@/store'

const transactionStore = useTransactionStore()
const settingsStore = useSettingsStore()

const isDarkMode = computed(() => settingsStore.isDarkMode)
const transactionId = ref('')
const transaction = computed(() => transactionStore.getTransactionById(transactionId.value))

const emotions = [
  { value: 0, label: '极度恐慌', emoji: '😱' },
  { value: 25, label: '担忧', emoji: '😰' },
  { value: 50, label: '理性', emoji: '😐' },
  { value: 75, label: '乐观', emoji: '😊' },
  { value: 100, label: '极度贪婪', emoji: '🤑' }
]

const currentEmotion = computed(() => {
  if (!transaction.value) return emotions[2]
  return emotions.reduce((prev, curr) => 
    Math.abs(curr.value - transaction.value.emotion) < Math.abs(prev.value - transaction.value.emotion) 
      ? curr 
      : prev
  )
})

onLoad((options) => {
  if (options.id) {
    transactionId.value = options.id
  }
})
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.detail-page {
  min-height: 100vh;
  background-color: #1A1A1A;
}

.scroll-container {
  height: 100vh;
}

.content {
  padding: 32rpx;
  padding-bottom: 100rpx;
}

.info-card {
  background-color: #2C2C2E;
  border-radius: 32rpx;
  padding: 32rpx;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 24rpx;
}

.card-header {
  margin-bottom: 32rpx;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.badge {
  padding: 12rpx 24rpx;
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
  font-size: 32rpx;
  font-weight: 600;
  color: #FFFFFF;
}

.stock-code {
  font-size: 28rpx;
  color: #8E8E93;
}

.metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32rpx;
}

.metric-item {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  
  &.full-width {
    grid-column: 1 / -1;
  }
}

.metric-label {
  font-size: 28rpx;
  color: #8E8E93;
}

.metric-value {
  font-size: 36rpx;
  font-weight: 600;
  color: #FFFFFF;
}

.divider {
  height: 1rpx;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 32rpx 0;
}

.date {
  font-size: 28rpx;
  color: #8E8E93;
}

.card-title {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 24rpx;
}

.strategy-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32rpx;
}

.strategy-item {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.strategy-header {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.strategy-label {
  font-size: 28rpx;
  color: #8E8E93;
}

.strategy-value {
  font-size: 36rpx;
  font-weight: 600;
  
  &.up {
    color: #FF3B30;
  }
  
  &.down {
    color: #34C759;
  }
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.tag {
  padding: 16rpx 24rpx;
  border-radius: 999rpx;
  background-color: #0A84FF;
  color: #FFFFFF;
  font-size: 26rpx;
}

.notes {
  font-size: 28rpx;
  color: #FFFFFF;
  line-height: 1.8;
  white-space: pre-wrap;
}

.emotion {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.emotion-emoji {
  font-size: 80rpx;
}

.emotion-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.emotion-label {
  font-size: 32rpx;
  color: #FFFFFF;
}

.emotion-value {
  font-size: 28rpx;
  color: #8E8E93;
}

.scenarios {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.scenario-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx;
  background-color: #3A3A3C;
  border-radius: 16rpx;
}

.scenario-label {
  font-size: 28rpx;
  color: #8E8E93;
}

.scenario-value {
  font-size: 28rpx;
  
  &.up {
    color: #FF3B30;
  }
  
  &.down {
    color: #34C759;
  }
}
</style>
