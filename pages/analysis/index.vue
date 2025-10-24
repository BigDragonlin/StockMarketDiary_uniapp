<template>
  <view class="analysis-page" :class="{ dark: isDarkMode }">
    <view class="content">
      <view 
        v-for="item in analysisItems" 
        :key="item.type"
        class="analysis-card"
        @tap="navigateToDetail(item.type)"
      >
        <text class="analysis-title">{{ item.title }}</text>
        <text class="analysis-desc">{{ item.description }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/store'

const settingsStore = useSettingsStore()
const isDarkMode = computed(() => settingsStore.isDarkMode)

const analysisItems = [
  {
    type: 'top-strategy',
    title: '决策模式分析',
    description: '分析各种决策依据的效果'
  },
  {
    type: 'sectors',
    title: '板块能力圈',
    description: '发现你的优势领域'
  },
  {
    type: 'opportunity-cost',
    title: '机会成本分析',
    description: '评估错过的机会'
  }
]

function navigateToDetail(type) {
  uni.navigateTo({
    url: `/pages/analysis/detail?type=${type}`
  })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.analysis-page {
  min-height: 100vh;
  background-color: #1A1A1A;
}

.content {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.analysis-card {
  background-color: #2C2C2E;
  border-radius: 24rpx;
  padding: 32rpx;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.analysis-title {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 8rpx;
}

.analysis-desc {
  display: block;
  font-size: 28rpx;
  color: #8E8E93;
}
</style>
