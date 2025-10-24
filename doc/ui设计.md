* Figma 结构（Frame、Component、命名规范）
* 中保真每个主界面（布局 + 样式 + 交互说明）
* 组件库（颜色/字体/间距/图标/组件变体）——适合在 Figma 中建立 Design System
* 用户流程图（文字版节点 + 可在 Figma 中绘制的流程图结构）
* 对应 uniapp 页面路由映射 + 推荐的组件/交互实现提示
* unicloud 后端数据模型与云函数（API）说明，含必要的索引与权限建议
* 交付给 UI/UX 与前端开发的「交接清单」与导入建议（如何在 Figma 中组织文件、导出切图/切片、与开发对接）

我已按模块分节，便于直接复制到 Figma 的页面说明或交接文档。下面开始（中文）。

---

# 一、工程与画板基础（Figma Frame 基准）

* 目标设备：**移动竖屏**
* 命名约定示例：`[Screen] / Home / Overview`、`[Component] / Button / Primary / Filled`、`[Page] / IA`
* 页面组织（Figma 文件结构建议）：

  * `00_Docs`：设计说明、色彩、字体、组件使用规范（tokens）
  * `01_IA_Flows`：信息架构图与用户流程（Flow frames）
  * `02_Screens`：按模块分类的各屏 Frame（Home、Decision Log、Dashboard、Detail 等）
  * `03_Components`：组件库（Atoms → Molecules → Organisms）
  * `04_Assets`：图标、emoji、占位图、svg 等
  * `05_Prototypes`：交互原型（链接与过渡）

---

# 二、信息架构（IA）——层级树（文本版，可在 Figma 中用树状图绘制）

```
App (Root)
├─ Launch / Onboarding (可选)
├─ Home (Overview Dashboard)
│   ├─ Performance Curve (chart)
│   ├─ Summary KPIs (总盈亏, 胜率, 盈亏比, 对标收益)
│   ├─ Smart Insight Cards (🏆 ⚠️ 🗺️ 💡)
├─ Decision Log
│   ├─ Log List (filter: 时间 / 标签 / 股票)
│   ├─ Log Detail (完整决策日志)
│   └─ Add/Edit Log (Full-screen Modal)
├─ Analysis (L2 Deep Dive)
│   ├─ Decision Tag Analysis (按标签归因)
│   ├─ Sector / Stock Performance
│   └─ Opportunity Cost Analysis (平行时空)
├─ 记一笔
├─ Trade Explorer (L3 Evidence)
│   └─ Filtered trade list -> Log Detail
```

---

# 四、用户流程（User Flow） —— 关键路径节点（文字流程 + 可导入 Figma 的节点）

我列出 4 条主流用户路径，方便在 Figma 做交互原型：

## 路径 A：记录一笔（核心行为）

1. Home 屏幕 → 点击 `+ 记录一笔`
2. 弹出 `Add Log` 全屏模态（底部上滑）
3. 填写 `What`（股票、买/卖、数量、价格）
4. 填写 `Why`（标签云 + 详细文字/语音/图片）
5. 可选填情绪滑条(0-100) + 目标止盈/止损
6. 点击 `保存` → 返回 Home 并触发成功反馈（微动效 & 文本）

交互要点：

* 在输入价格时提供“获取市价”快捷按钮；价格/数量自动计算持仓金额
* 保存后触发立即更新仪表盘（局部刷新）

## 路径 B：通过洞察卡进入专项复盘

1. Home → 点击洞察卡（如“⚠️ 追高热门股”）
2. 进入 `Decision Tag Analysis`（按标签排序）
3. 点击某条条目 → 展示该标签下的交易列表（可批量筛选）
4. 点击某笔交易 → 跳转 `Log Detail`（并在图上展示情景分析入口）

交互要点：

* 洞察卡显示关键指标 + > 进入 L2

## 路径 C：进入“平行时空”情景分析

1. 在 `Log Detail` 点击 `情景分析` 按钮
2. 显示交互 K 线（操作点标记）与情景选项（观望 1 周 / 1 月 / 后续高点卖出等）
3. 用户切换情景 → 卡片动态显示对应收益/回撤数据
4. 提供“按计划执行 vs 实际”对比视图

交互要点：

* K 线支持长按查看数值、缩放、拖动
* 情景切换即时在图上绘制虚线/标注

# 五、中保真原型说明（主界面逐页说明：布局 + 交互 + Figma Frame 结构）

> 每一屏建议在 Figma 建立一个 Frame，命名格式：`[Screen] / <ScreenName> / <Variant>`。下面给出各 Frame 的元素分层（可直接在 Figma 中复刻）。

## 1) Home / Overview（Frame: 390x844）

* 顶部条：用户头像（左） + 日期范围筛选（中） + 设置图标（右）
* KPI 横条（卡片）：总盈亏（大） | 交易胜率 | 盈亏比 | vs 沪深300（小卡） — 卡片间距 12rpx
* 业绩曲线（大图）：可切换“收益/净值/指数对比”标签，图下方放置时间缩放（1M/3M/YTD/All）
* 洞察卡片区（滚动横向卡片）：每张卡 16px 圆角，卡片内有 emoji + 标题 + 摘要 + `>`

交互：

* 点击洞察卡进入 L2
* KPI 点击展开解释弹窗

## 2) Add / Edit Decision Log（全屏 Modal）

* Header：`[买入 | 卖出]` 分段控件（红/绿颜色）
* 区块：

  1. 股票选择栏（支持代码/拼音搜索 + 推荐自选）
  2. 价格 / 数量 / 市价按钮 / 持仓金额自动计算行
  3. 快捷标签云（分组：技术面 / 基本面 / 消息面 / 情绪面；支持多选）
  4. 详细记录（多行文本，支持语音输入按钮与上传图片按钮）
  5. 情绪滑条（恐慌 → 贪婪，带数值）
  6. 策略设定（目标止盈价 / 止损价）
* 底部常驻按钮：`保存记录`（全宽，品牌色）

交互：

* 标签选中变为品牌色填充
* 语音输入展开实时转写并可编辑
* 上传图片：允许多张，缩略显示触发放大查看

## 3) Decision Log List（筛选页面）

* 顶部筛选器：时间 / 标签 / 股票 / 盈亏方向
* 列表项：左侧股票代码 + 名称，中间标签云，右侧盈亏与百分比（颜色区分）
* 支持按标签聚合（Group By）和导出

交互：

* 列表项滑动支持：`标记为已复盘` / `删除` / `编辑`

## 4) Log Detail（决策详情 + 平行时空）

* Header：股票基本信息 + 当前价格 + 操作时间
* 决策卡片：展示“What / Why / 情绪值 / 策略设定”
* K 线交互区（中）：标注操作点，底部是情景分析卡片行（短期 / 拐点 / 策略对比）
* 底部操作：`再复盘`、`导出`、`标记学习点`按钮

交互：

* 点击情景卡切换并重新计算收益显示（即时反馈）

## 5) Analysis（L2）

* 右侧或下拉分区展示标签统计（表格 + 图表）
* 可按亏损额、胜率、次数排序
* 每个分析项可 Drill Down 到交易列表（L3）

---

# 六、组件库（Component / Variants）——供 Figma 建立 Component 使用

建议构建以下组件并在 Figma 中建立 Variants：

### Atoms

* Buttons：Primary Filled / Primary Outline / Secondary / Icon Button（有 Press / Disabled 状态）
* Inputs：Text input（single-line）, Number input（含市价快捷），Textarea（多行）
* Segmented Control（[买入|卖出]）带 haptic 说明
* Tag / Pill（default / selected / disabled）
* Icon（24px/20px/16px）集合（search, settings, upload, mic, chart）
* Emojis / Insight Badges（🏆 ⚠️ 🗺️ 💡）— 统一样式卡片

### Molecules

* KPI Card（value + label）
* Insight Card（emoji + title + summary + chevron）
* Trade List Item（stock info + tags + pnl）
* Modal Shell（Header + content + bottom sticky action）

### Organisms

* Dashboard Header + KPI Row + Chart Block + Insight Carousel
* Decision Log Form（组合：inputs + tags + attachments + footer）

命名规范：`[Component] / <Name> / <Variant> / <State>`（例如 `Button / Primary / Filled / Pressed`）

---

# 七、交互与动效（中保真可描述，不做复杂动画）

* 页面切换：常规 Slide Up（Modal）或 Push（Screen）
* Button 点击：Scale 0.98（快速） + Haptic（移动端）
* Card hover / press：微阴影提升（mobile press）
* 图表交互：长按显示 tooltip（数值）与竖线标注；情景线用虚线 + 渐变填充

---

# 八、与 uniapp 的映射（前端页面与组件实现建议）

> 下面给出 uniapp 页面路由命名与主要组件对应关系，方便前端工程师建立页面结构。

## 页面路由（pages.json 路由示例）

```
/pages/home/home               -> Home (Overview)
/pages/logs/list              -> Decision Log List
/pages/logs/detail            -> Log Detail
/pages/logs/edit              -> Add/Edit Log (modal could be a page with animation)
/pages/analysis/overview      -> Analysis L1
/pages/analysis/tag           -> Decision Tag Analysis L2
/pages/profile/settings       -> Profile / Settings
```

## 组件实现建议（uniapp）

* 悬浮按钮：`<view>` + `@tap` + `position: fixed;`
* Segmented Control：用自定义组件（两个 button 切换样式）
* 标签云：可复用组件（props: options, selected[]）
* 语音输入：调用 `uni.getRecorderManager()`（或平台差异处理）进行录音并后端转写（unicloud 云函数调用语音转文字服务）
* 图片上传：使用 `uni.chooseImage()` + 上传到 unicloud 存储（或 OSS），在日志记录中保存 URL
* K 线图：使用第三方图表库（如 `uCharts`、`wx-charts`、`ECharts` for uniapp）嵌入并提供交互回调（onPress 返回时间点与价格）

---

# 九、unicloud 后端：数据模型与云函数（建议表结构与 API）

> 使用 unicloud 的数据库（类似 MongoDB 风格集合），下面是建议集合设计（字段/索引/权限说明）。

## 集合：users

```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "createdAt": "datetime",
  "profile": { "nickname": "string", "avatar": "url" },
  "settings": { ... }
}
```

* 索引：`email` 唯一索引

## 集合：trades (决策日志)

```json
{
  "_id": "string",
  "userId": "string",            // 关联 users._id
  "stockCode": "string",        // 代码
  "stockName": "string",
  "action": "buy|sell",
  "price": "number",
  "quantity": "number",
  "amount": "number",
  "timestamp": "datetime",      // 操作时间
  "tags": ["string"],           // 标签 id 或 name
  "why_text": "string",
  "attachments": ["url"],       // 图片等
  "emotion": "number",          // 0-100 或 -50..+50
  "target_take_profit": "number",
  "target_stop_loss": "number",
  "source": "manual|sync",
  "status": "open|closed",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

* 推荐索引：`userId`, `stockCode`, `tags`, `timestamp`

## 集合：tags（系统与用户自定义标签）

```json
{
  "_id": "string",
  "userId": "string",       // null 表示系统标签
  "name": "string",
  "category": "technical|fundamental|news|emotion",
  "createdAt":"datetime"
}
```

## 集合：insights（AI/规则生成的洞察）

```json
{
  "_id": "string",
  "userId": "string",
  "type": "opportunity|risk|strength",
  "summary": "string",
  "payload": { ... },     // 引用统计数据
  "createdAt":"datetime"
}
```

### 推荐云函数（unicloud）

* `trade.add`：新增交易（验证 userId，写入 trades）
* `trade.update`：更新（检查权限）
* `trade.list`：按筛选条件分页查询（支持 tags、时间范围、stockCode）
* `trade.detail`：获取单笔交易详情（并计算是否触及止盈/止损）
* `tag.list` / `tag.add` / `tag.sync`：管理标签
* `insights.generate`：定期（或按需）运行的洞察生成任务（可在云端批处理）
* `sync.broker`：券商同步入口（接收第三方回调或按用户 API Key 拉取数据）
* `export.csv`：导出筛选结果（权限控制）

### 权限 & 安全

* 所有云函数必须校验 `userId` 与 token（JWT 或 unicloud 自带鉴权）
* 敏感数据（如券商 API key）只存加密字段或由用户本地存储，建议走 OAuth 授权流程（不直接存储明文）
* 数据导出需用户确认并写入导出日志（防止滥用）

---

# 十、后端算法 / 洞察（实现建议）

* 洞察引擎基于 trades 数据定期聚合（按用户）计算：

  * 每个标签的 `count`、`winRate`、`totalPnL`、`avgPnL`
  * 机会成本：对每笔交易，基于后续区间（1w/1m/3m）计算“若持有/若卖出”差异
  * “按计划执行”评估：比较 target_take_profit/stop_loss 是否曾被触及，并统计执行与非执行导致的收益差异
* 这些计算可放在 `insights.generate` 云函数，由定时任务触发（例如每天夜间跑批）

---

# 十一、导出给 UI/UX 与前端的交接清单（Immediate Deliverables）

1. **Figma 文件结构与页面**（按上文 00~05 文件夹分）
2. **组件库**：建立 Components 页面（Atoms→Molecules→Organisms）并输出 Variants
3. **Tokens**：色彩、字体、间距在 Figma Tokens 插件中配置并导出 JSON（提供给前端）
4. **交互说明**：每条用户流程用 Figma Prototype link 连接（Modal 动画、页面转场）
5. **前端实现文档**（给开发）：

   * pages.json 路由示例
   * 组件到 uniapp 对应实现建议（语音、图表、图片上传）
   * unicloud 云函数与数据模型说明（包含字段与索引）
6. **API 文档草稿**（云函数接口列表、请求参数、返回示例）
7. **交付物格式**：PNG 切图（@1x/@2x）、SVG 图标、Tokens JSON、组件清单、prototype 链接

---

# 十二、样例 API 文档片段（便于立刻开发）

### POST `/trade/add` (cloud function: trade.add)

**请求 body**

```json
{
  "token":"<user token>",
  "payload":{
    "stockCode":"000001",
    "stockName":"平安银行",
    "action":"buy",
    "price":12.3,
    "quantity":100,
    "tags":["technical_breakout","news"],
    "why_text":"技术突破且财报预期良好",
    "emotion": 30,
    "target_take_profit":14.0,
    "target_stop_loss":11.0,
    "attachments": ["url1","url2"]
  }
}
```

**返回**

```json
{ "code":0, "data":{ "tradeId":"xxxx"}, "msg":"ok" }
```

（其他接口同理：`trade.list` 支持分页 & filters）

---

# 十三、交互优先级与 MVP 建议

**MVP（最小可行产品）建议功能集合**：

* Add Log（手动记录）+ List + Detail
* Home Overview（基础 KPI + 曲线 + 洞察卡片的简单规则）
* 标签系统 + 导入/上传图片 + 语音录入（转写）
* 简单的情景分析（观望 1 周 / 1 月 的收益对比）
* unicloud：trade CRUD + insights 基础规则（单用户批量计算）

其余高级（券商自动同步、复杂归因/高级情景）作为后续版本 1.1 / 1.2。

---

# 十四、后续我可以直接为你输出（任选其一或多个）

* 将上述 Figma 结构**转成可复制到 Figma 的结构化文本**（包含 Frame 尺寸、图层名称、组件树），便于你通过插件或手工建模；
* 直接生成 `pages.json` 路由 + uniapp 组件代码模板（示例页面 Vue 单文件）；
* 生成完整的 `unicloud` 云函数伪代码（Node 风格云函数），含示例聚合查询与洞察计算逻辑。