<template>
  <view class="list-page" :class="{ dark: isDarkMode }">
    <view class="header">
      <text class="page-title">{{ filterTag }} 相关交易</text>
      <text class="page-count">{{ filteredTransactions.length }} 笔交易</text>
    </view>

    <view class="content">
      <view 
        v-for="item in filteredTransactions" 
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
        
        <text class="transaction-date">{{ item.date }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onLoad } from '@dcloudio/uni-app'
import { useTransactionStore, useSettingsStore } from '@/store'

const transactionStore = useTransactionStore()
const settingsStore = useSettingsStore()

const isDarkMode = computed(() => settingsStore.isDarkMode)
const filterTag = ref('')

const filteredTransactions = computed(() => {
  return transactionStore.getTransactionsByTag(filterTag.value)
})

onLoad((options) => {
  if (options.tag) {
    filterTag.value = options.tag
  }
})

function navigateToDetail(id) {
  uni.navigateTo({
    url: `/pages/transactions/detail?id=${id}`
  })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.list-page {
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

.page-count {
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

.transaction-date {
  font-size: 24rpx;
  color: #8E8E93;
}
</style>
