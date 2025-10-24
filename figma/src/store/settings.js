import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    isDarkMode: true,
    enableNotifications: true
  }),

  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      uni.setStorageSync('isDarkMode', this.isDarkMode)
      
      // 更新 TabBar 样式
      uni.setTabBarStyle({
        backgroundColor: this.isDarkMode ? '#2C2C2E' : '#FFFFFF',
        borderStyle: this.isDarkMode ? 'white' : 'black',
        color: this.isDarkMode ? '#8E8E93' : '#999999',
        selectedColor: '#0A84FF'
      })
    },

    loadFromStorage() {
      const darkMode = uni.getStorageSync('isDarkMode')
      if (darkMode !== undefined && darkMode !== null) {
        this.isDarkMode = darkMode
      }
      
      const notifications = uni.getStorageSync('enableNotifications')
      if (notifications !== undefined && notifications !== null) {
        this.enableNotifications = notifications
      }
    }
  }
})
