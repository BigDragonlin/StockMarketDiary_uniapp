<template>
  <view class="analysis-detail-page" :class="{ dark: isDarkMode }">
    <view class="header">
      <text class="page-title">{{ pageTitle }}</text>
      <text class="page-desc">{{ pageDescription }}</text>
    </view>

    <view class="content">
      <view 
        v-for="item in analysisData" 
        :key="item.tag"
        class="analysis-item"
        @tap="navigateToList(item.tag)"
      >
        <view class="item-header">
          <text class="item-title">{{ item.tag }}</text>
          <text class="item-profit" :class="item.totalProfit >= 0 ? 'up' : 'down'">
            {{ item.totalProfit >= 0 ? '+' : '' }}¥{{ item.totalProfit.toFixed(2) }}
          </text>
        </view>

        <view class="item-metrics">
          <view class="metric">
            <text class="metric-label">交易次数</text>
            <text class="metric-value">{{ item.count }}次</text>
          </view>
          <view class="metric">
            <text class="metric-label">胜率</text>
            <text class="metric-value" :class="item.winRate >= 50 ? 'up' : 'down'">
              {{ item.winRate.toFixed(1) }}%
            </text>
          </view>
          <view class="metric">
            <text class="metric-label">盈亏比</text>
            <text class="metric-value" :class="item.profitRatio >= 1 ? 'up' : 'down'">
              {{ item.profitRatio.toFixed(2) }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onLoad } from '@dcloudio/uni-app'
import { useSettingsStore } from '@/store'

const settingsStore = useSettingsStore()
const isDarkMode = computed(() => settingsStore.isDarkMode)

const analysisType = ref('')

const mockAnalysisData = {
  'top-strategy': [
    { tag: '财报超预期', count: 8, winRate: 87.5, totalProfit: 6580, profitRatio: 3.2 },
    { tag: '估值合理', count: 12, winRate: 75.0, totalProfit: 4230, profitRatio: 2.1 },
    { tag: '行业景气上升', count: 6, winRate: 66.7, totalProfit: 3150, profitRatio: 1.8 }
  ],
  'worst-strategy': [
    { tag: '追高热门股', count: 15, winRate: 26.7, totalProfit: -4820, profitRatio: 0.4 },
    { tag: 'FOMO心态', count: 10, winRate: 30.0, totalProfit: -2560, profitRatio: 0.5 },
    { tag: '恐慌性卖出', count: 8, winRate: 25.0, totalProfit: -1890, profitRatio: 0.3 }
  ],
  'sectors': [
    { tag: '新能源', count: 18, winRate: 72.2, totalProfit: 8920, profitRatio: 2.5 },
    { tag: '消费', count: 14, winRate: 64.3, totalProfit: 5340, profitRatio: 1.9 },
    { tag: '科技', count: 20, winRate: 55.0, totalProfit: 3780, profitRatio: 1.4 }
  ],
  'opportunity-cost': [
    { tag: '过早卖出', count: 22, winRate: 45.5, totalProfit: -3240, profitRatio: 0.8 },
    { tag: '止损不及时', count: 12, winRate: 33.3, totalProfit: -2890, profitRatio: 0.6 },
    { tag: '未按计划执行', count: 16, winRate: 37.5, totalProfit: -1950, profitRatio: 0.7 }
  ]
}

const titles = {
  'top-strategy': '王牌策略',
  'worst-strategy': '警惕陷阱',
  'sectors': '能力圈分析',
  'opportunity-cost': '机会成本分析'
}

const descriptions = {
  'top-strategy': '这些决策依据为你带来了最多收益',
  'worst-strategy': '这些决策模式导致了最大亏损',
  'sectors': '你在各个板块的投资表现',
  'opportunity-cost': '分析决策时机和执行纪律'
}

const pageTitle = computed(() => titles[analysisType.value] || '')
const pageDescription = computed(() => descriptions[analysisType.value] || '')
const analysisData = computed(() => mockAnalysisData[analysisType.value] || [])

onLoad((options) => {
  if (options.type) {
    analysisType.value = options.type
  }
})

function navigateToList(tag) {
  uni.navigateTo({
    url: `/pages/analysis/list?tag=${tag}`
  })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.analysis-detail-page {
  min-height: 100vh;
  background-color: #1A1A1A;
}

.header {
  padding: 32rpx;
  background-color: #2C2C2E;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.page-title {
  display: block;
  font-size: 40rpx;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 8rpx;
}

.page-desc {
  display: block;
  font-size: 28rpx;
  color: #8E8E93;
}

.content {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.analysis-item {
  background-color: #2C2C2E;
  border-radius: 24rpx;
  padding: 32rpx;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.item-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #FFFFFF;
}

.item-profit {
  font-size: 36rpx;
  font-weight: 600;
  
  &.up {
    color: #FF3B30;
  }
  
  &.down {
    color: #34C759;
  }
}

.item-metrics {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 32rpx;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.metric-label {
  font-size: 24rpx;
  color: #8E8E93;
}

.metric-value {
  font-size: 28rpx;
  color: #FFFFFF;
  
  &.up {
    color: #FF3B30;
  }
  
  &.down {
    color: #34C759;
  }
}
</style>
