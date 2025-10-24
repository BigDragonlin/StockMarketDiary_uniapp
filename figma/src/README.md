# 投资复盘 - UniApp 版本

一款基于 UniApp + Vue 3 + UniUI 开发的 A股投资者个人投资教练应用。

## 功能特性

### 1. 决策日志
- 📝 完整的交易记录表单
- 🏷️ 智能标签分类（技术面、基本面、消息面、情绪面）
- 😊 情绪指数滑动条
- 🎯 止盈止损策略设定

### 2. 三层复盘仪表盘
- **L1 总览**：核心指标展示、业绩曲线、智能洞察卡片
- **L2 深度分析**：决策模式分析、板块能力圈、机会成本分析
- **L3 交易列表**：可追溯到原始决策日志

### 3. 智能洞察
- 🏆 王牌策略：识别你的最优决策模式
- ⚠️ 警惕陷阱：发现导致亏损的决策陷阱
- 🗺️ 能力圈：分析不同板块的投资表现
- 💡 机会成本：评估决策时机和执行纪律

### 4. 情景分析
- 多维度持有期分析
- 策略执行对比
- 机会成本量化

## 技术栈

- **框架**: UniApp
- **前端**: Vue 3 (Composition API)
- **UI组件**: UniUI
- **状态管理**: Pinia
- **样式**: SCSS + UniApp 样式系统
- **图表**: 支持 uCharts 或 ECharts（需自行集成）

## 项目结构

```
├── pages/                  # 页面目录
│   ├── index/             # 仪表盘首页
│   ├── transactions/      # 交易相关页面
│   │   ├── list.vue      # 交易列表
│   │   ├── detail.vue    # 交易详情
│   │   └── add.vue       # 添加交易
│   ├── analysis/          # 分析页面
│   │   ├── index.vue     # 分析首页
│   │   ├── detail.vue    # 深度分析
│   │   └── list.vue      # 筛选列表
│   └── settings/          # 设置页面
│       └── index.vue
├── store/                 # 状态管理
│   ├── index.js          # Store 入口
│   ├── transaction.js    # 交易数据
│   └── settings.js       # 设置
├── static/                # 静态资源
│   └── tabbar/           # TabBar 图标
├── App.vue                # 应用入口
├── pages.json             # 页面配置
├── manifest.json          # 应用配置
├── uni.scss              # 全局样式变量
└── package.json          # 依赖配置
```

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
yarn install
```

### 2. 运行项目

#### 微信小程序
```bash
npm run dev:mp-weixin
```

#### H5
```bash
npm run dev:h5
```

#### App
```bash
npm run dev:app
```

### 3. 构建生产版本

```bash
npm run build:mp-weixin  # 微信小程序
npm run build:h5          # H5
npm run build:app         # App
```

## 配置说明

### TabBar 图标
请在 `static/tabbar/` 目录下放置以下图标（推荐尺寸 81x81px）：
- dashboard.png / dashboard-active.png
- transactions.png / transactions-active.png
- analysis.png / analysis-active.png
- settings.png / settings-active.png

### 主题色
在 `uni.scss` 中可以自定义颜色：
- 主题色：`$uni-color-primary`
- 上涨色：`$stock-up-color` (红色)
- 下跌色：`$stock-down-color` (绿色)

## 核心特性

### 深色模式
- 默认启用深色模式
- 支持一键切换浅色/深色模式
- 自动同步 TabBar 样式

### 数据持久化
- 使用 `uni.setStorageSync` 本地存储
- 交易数据自动保存
- 设置项同步存储

### 中国股市特色
- 红色代表上涨/盈利
- 绿色代表下跌/亏损
- 符合国内用户习惯

## 待实现功能

- [ ] 图表集成（uCharts/ECharts）
- [ ] 图片上传功能
- [ ] 语音输入功能
- [ ] 数据导出功能
- [ ] 云端同步
- [ ] 券商API集成

## 兼容性

- ✅ 微信小程序
- ✅ H5
- ✅ iOS App
- ✅ Android App
- ✅ 支付宝小程序
- ✅ 百度小程序

## 开发建议

1. 建议使用 HBuilderX 开发
2. 图表功能推荐使用 `@qiun/ucharts` 或 `echarts-for-weixin`
3. 生产环境请在 `manifest.json` 中配置正确的 appid

## License

MIT

## 作者

投资复盘团队

---

**注意**: 本应用仅供个人学习和投资复盘使用，不构成任何投资建议。投资有风险，入市需谨慎。
