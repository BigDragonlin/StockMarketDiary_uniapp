<template>
  <view class="settings-page" :class="{ dark: isDarkMode }">
    <view class="content">
      <!-- 深色模式 -->
      <view class="setting-card">
        <view class="setting-content">
          <view class="setting-info">
            <text class="setting-title">深色模式</text>
            <text class="setting-desc">保持冷静理性的分析氛围</text>
          </view>
          <switch 
            :checked="isDarkMode" 
            @change="handleDarkModeChange"
            color="#0A84FF"
          />
        </view>
      </view>

      <!-- 关于 -->
      <view class="setting-card">
        <text class="setting-title">关于</text>
        <text class="about-version">投资复盘 v1.0.0</text>
        <text class="about-desc">
          一款帮助A股投资者养成投资纪律、训练决策逻辑的个人投资教练应用
        </text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { useSettingsStore } from '@/store'

const settingsStore = useSettingsStore()
const isDarkMode = computed(() => settingsStore.isDarkMode)

function handleDarkModeChange(e) {
  settingsStore.toggleDarkMode()
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.settings-page {
  min-height: 100vh;
  background-color: #1A1A1A;
}

.content {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.setting-card {
  background-color: #2C2C2E;
  border-radius: 24rpx;
  padding: 32rpx;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.setting-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.setting-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.setting-title {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #FFFFFF;
}

.setting-desc {
  font-size: 28rpx;
  color: #8E8E93;
}

.about-version {
  display: block;
  font-size: 28rpx;
  color: #8E8E93;
  margin-top: 16rpx;
  margin-bottom: 16rpx;
}

.about-desc {
  display: block;
  font-size: 28rpx;
  color: #8E8E93;
  line-height: 1.6;
}
</style>
