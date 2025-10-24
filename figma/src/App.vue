<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { ref } from 'vue'

onLaunch(() => {
  console.log('App Launch')
  // 初始化深色模式
  const isDarkMode = uni.getStorageSync('isDarkMode') ?? true
  if (isDarkMode) {
    uni.setTabBarStyle({
      backgroundColor: '#2C2C2E',
      borderStyle: 'white'
    })
  }
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
@import './uni.scss';
@import './styles/globals.css';

page {
  background-color: var(--background);
  color: var(--foreground);
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
}
</style>
