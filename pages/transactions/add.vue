<template>
  <view class="add-transaction-page" :class="{ dark: isDarkMode }">
    <scroll-view scroll-y class="scroll-container">
      <view class="content">
        <!-- 买入/卖出切换 -->
        <view class="type-toggle">
          <view 
            class="toggle-btn buy"
            :class="{ active: formData.type === 'buy' }"
            @tap="formData.type = 'buy'"
          >
            买入
          </view>
          <view 
            class="toggle-btn sell"
            :class="{ active: formData.type === 'sell' }"
            @tap="formData.type = 'sell'"
          >
            卖出
          </view>
        </view>

        <!-- 股票信息 -->
        <view class="form-section">
          <view class="form-row">
            <view class="form-item">
              <text class="label">股票代码</text>
              <input 
                class="input" 
                v-model="formData.stockCode"
                placeholder="如: 600519"
                placeholder-class="placeholder"
              />
            </view>
            <view class="form-item">
              <text class="label">股票名称</text>
              <input 
                class="input" 
                v-model="formData.stockName"
                placeholder="如: 贵州茅台"
                placeholder-class="placeholder"
              />
            </view>
          </view>

          <view class="form-row">
            <view class="form-item">
              <text class="label">价格 (¥)</text>
              <input 
                class="input" 
                v-model="formData.price"
                type="digit"
                placeholder="0.00"
                placeholder-class="placeholder"
              />
            </view>
            <view class="form-item">
              <text class="label">数量 (股)</text>
              <input 
                class="input" 
                v-model="formData.quantity"
                type="number"
                placeholder="100"
                placeholder-class="placeholder"
              />
            </view>
          </view>

          <!-- 策略设定 (仅买入时显示) -->
          <view v-if="formData.type === 'buy'" class="form-row">
            <view class="form-item">
              <text class="label">目标止盈价</text>
              <input 
                class="input" 
                v-model="formData.targetPrice"
                type="digit"
                placeholder="可选"
                placeholder-class="placeholder"
              />
            </view>
            <view class="form-item">
              <text class="label">止损价</text>
              <input 
                class="input" 
                v-model="formData.stopLoss"
                type="digit"
                placeholder="可选"
                placeholder-class="placeholder"
              />
            </view>
          </view>
        </view>

        <!-- 决策依据 -->
        <view class="form-section">
          <text class="section-title">决策依据</text>
          <view 
            v-for="(group, index) in tagGroups" 
            :key="index"
            class="tag-group"
          >
            <text class="tag-group-title">{{ group.category }}</text>
            <view class="tags">
              <view 
                v-for="tag in group.tags" 
                :key="tag"
                class="tag-btn"
                :class="{ selected: formData.tags.includes(tag) }"
                @tap="toggleTag(tag)"
              >
                {{ tag }}
              </view>
            </view>
          </view>
        </view>

        <!-- 详细记录 -->
        <view class="form-section">
          <text class="section-title">详细记录</text>
          <textarea 
            class="textarea" 
            v-model="formData.notes"
            placeholder="记录你的分析思路、关键指标、市场环境等..."
            placeholder-class="placeholder"
            :maxlength="-1"
          />
        </view>

        <!-- 情绪标记 -->
        <view class="form-section">
          <text class="section-title">情绪标记</text>
          <view class="emotion-slider">
            <view class="emotion-labels">
              <text class="emotion-label">恐慌</text>
              <view class="emotion-current">
                <text class="emotion-emoji">{{ currentEmotion.emoji }}</text>
                <text class="emotion-text">{{ currentEmotion.label }}</text>
              </view>
              <text class="emotion-label">贪婪</text>
            </view>
            <slider 
              :value="formData.emotion" 
              @change="handleEmotionChange"
              min="0"
              max="100"
              activeColor="#0A84FF"
              backgroundColor="#3A3A3C"
              block-size="20"
            />
          </view>
        </view>

        <!-- 保存按钮 -->
        <button 
          class="save-btn"
          :class="{ disabled: !isFormValid }"
          :disabled="!isFormValid"
          @tap="handleSave"
        >
          保存记录
        </button>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTransactionStore, useSettingsStore } from '@/store'

const transactionStore = useTransactionStore()
const settingsStore = useSettingsStore()

const isDarkMode = computed(() => settingsStore.isDarkMode)

const formData = ref({
  type: 'buy',
  stockCode: '',
  stockName: '',
  price: '',
  quantity: '',
  targetPrice: '',
  stopLoss: '',
  tags: [],
  notes: '',
  emotion: 50
})

const buyTagGroups = [
  {
    category: '技术面',
    tags: ['突破关键阻力', '金叉信号', '超跌反弹', '成交量放大', '形态突破']
  },
  {
    category: '基本面',
    tags: ['财报超预期', '行业景气上升', '估值合理', '业绩增长', '新产品发布']
  },
  {
    category: '消息面',
    tags: ['政策利好', '行业利好', '机构看好', '重组并购', '股东增持']
  },
  {
    category: '情绪面',
    tags: ['市场情绪好', '板块轮动', '热点概念', '跟风操作', 'FOMO心态']
  }
]

const sellTagGroups = [
  {
    category: '技术面',
    tags: ['跌破支撑', '死叉信号', '高位滞涨', '量价背离', '形态破位']
  },
  {
    category: '基本面',
    tags: ['财报不及预期', '行业景气下降', '估值过高', '业绩下滑', '负面新闻']
  },
  {
    category: '策略执行',
    tags: ['达到止盈目标', '触及止损线', '仓位调整', '换股操作', '资金需求']
  },
  {
    category: '情绪面',
    tags: ['恐慌性卖出', '获利了结', '市场转弱', '担心回撤', '冲动决策']
  }
]

const emotions = [
  { value: 0, label: '极度恐慌', emoji: '😱' },
  { value: 25, label: '担忧', emoji: '😰' },
  { value: 50, label: '理性', emoji: '😐' },
  { value: 75, label: '乐观', emoji: '😊' },
  { value: 100, label: '极度贪婪', emoji: '🤑' }
]

const tagGroups = computed(() => {
  return formData.value.type === 'buy' ? buyTagGroups : sellTagGroups
})

const currentEmotion = computed(() => {
  return emotions.reduce((prev, curr) => 
    Math.abs(curr.value - formData.value.emotion) < Math.abs(prev.value - formData.value.emotion) 
      ? curr 
      : prev
  )
})

const isFormValid = computed(() => {
  return formData.value.stockCode && 
         formData.value.stockName && 
         formData.value.price && 
         formData.value.quantity
})

function toggleTag(tag) {
  const index = formData.value.tags.indexOf(tag)
  if (index > -1) {
    formData.value.tags.splice(index, 1)
  } else {
    formData.value.tags.push(tag)
  }
}

function handleEmotionChange(e) {
  formData.value.emotion = e.detail.value
}

function handleSave() {
  if (!isFormValid.value) return

  const transaction = {
    type: formData.value.type,
    stockCode: formData.value.stockCode,
    stockName: formData.value.stockName,
    price: parseFloat(formData.value.price),
    quantity: parseInt(formData.value.quantity),
    tags: formData.value.tags,
    notes: formData.value.notes,
    emotion: formData.value.emotion,
    targetPrice: formData.value.targetPrice ? parseFloat(formData.value.targetPrice) : undefined,
    stopLoss: formData.value.stopLoss ? parseFloat(formData.value.stopLoss) : undefined,
    date: new Date().toISOString().split('T')[0],
    profit: 0
  }

  transactionStore.addTransaction(transaction)

  uni.showToast({
    title: '保存成功',
    icon: 'success'
  })

  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.add-transaction-page {
  min-height: 100vh;
  background-color: #1A1A1A;
}

.scroll-container {
  height: 100vh;
}

.content {
  padding: 32rpx;
  padding-bottom: 200rpx;
}

.type-toggle {
  display: flex;
  gap: 16rpx;
  padding: 8rpx;
  background-color: #3A3A3C;
  border-radius: 16rpx;
  margin-bottom: 48rpx;
}

.toggle-btn {
  flex: 1;
  padding: 24rpx;
  border-radius: 12rpx;
  text-align: center;
  font-size: 28rpx;
  color: #FFFFFF;
  transition: all 0.3s;
  
  &.buy.active {
    background-color: #FF3B30;
  }
  
  &.sell.active {
    background-color: #34C759;
  }
}

.form-section {
  margin-bottom: 48rpx;
}

.form-row {
  display: flex;
  gap: 24rpx;
  margin-bottom: 32rpx;
}

.form-item {
  flex: 1;
}

.label {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 16rpx;
}

.input {
  width: 100%;
  padding: 24rpx;
  background-color: #2C2C2E;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  color: #FFFFFF;
  font-size: 28rpx;
}

.textarea {
  width: 100%;
  min-height: 200rpx;
  padding: 24rpx;
  background-color: #2C2C2E;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  color: #FFFFFF;
  font-size: 28rpx;
  line-height: 1.6;
}

.placeholder {
  color: #6C6C70;
}

.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 24rpx;
}

.tag-group {
  margin-bottom: 32rpx;
}

.tag-group-title {
  display: block;
  font-size: 28rpx;
  color: #8E8E93;
  margin-bottom: 16rpx;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.tag-btn {
  padding: 16rpx 24rpx;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999rpx;
  font-size: 26rpx;
  color: #FFFFFF;
  background-color: #2C2C2E;
  transition: all 0.3s;
  
  &.selected {
    background-color: #0A84FF;
    border-color: #0A84FF;
  }
}

.emotion-slider {
  padding: 32rpx;
  background-color: #2C2C2E;
  border-radius: 24rpx;
}

.emotion-labels {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
}

.emotion-label {
  font-size: 28rpx;
  color: #8E8E93;
}

.emotion-current {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
}

.emotion-emoji {
  font-size: 48rpx;
}

.emotion-text {
  font-size: 28rpx;
  color: #FFFFFF;
}

.save-btn {
  width: 100%;
  padding: 32rpx;
  background-color: #0A84FF;
  color: #FFFFFF;
  border-radius: 16rpx;
  font-size: 32rpx;
  font-weight: 600;
  border: none;
  
  &.disabled {
    opacity: 0.5;
  }
}
</style>
