import { createPinia } from 'pinia'

const pinia = createPinia()

export default pinia

export { useTransactionStore } from './transaction'
export { useSettingsStore } from './settings'
