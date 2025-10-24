<template>
  <view class="transactions-page" :class="{ dark: isDarkMode }">
    <view class="content">
      <view 
        v-for="item in transactions" 
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
          <text v-for="(tag, idx) in item.tags" :key="idx" class="tag">
            {{ tag }}
          </text>
        </view>
        
        <text class="transaction-date">{{ item.date }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { useTransactionStore, useSettingsStore } from '@/store'

const transactionStore = useTransactionStore()
const settingsStore = useSettingsStore()

const isDarkMode = computed(() => settingsStore.isDarkMode)
const transactions = computed(() => transactionStore.transactions)

function navigateToDetail(id) {
  uni.navigateTo({
    url: `/pages/transactions/detail?id=${id}`
  })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.transactions-page {
  min-height: 100vh;
  background-color: #1A1A1A;
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
</style>
