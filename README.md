<div align="center">

<img src="docs/cover-banner.jpg" alt="人生平行宇宙实验室" width="100%">

# 人生平行宇宙实验室

### AI 人生决策成长平台

基于 DeepSeek 大模型，模拟不同选择下的平行宇宙未来轨迹

[功能演示](#核心功能) · [快速开始](#快速开始) · [技术架构](#技术架构) · [创新点](#四大创新点) · [比赛文档](#比赛材料)

</div>

---

## 项目简介

人生平行宇宙实验室是一个 AI 驱动的人生决策模拟与成长平台。用户输入人生参数和正在犹豫的决定，AI 会生成四个平行宇宙的未来推演，帮助用户预见不同选择的人生轨迹。

**核心理念**：人生没有标准答案，但 AI 可以帮你预见可能。

### 解决什么问题

87% 的年轻人在面临重大人生决策时感到焦虑——考研还是就业？留在大厂还是出去创业？留在北京还是回老家？这些决定可能改变未来十年的人生轨迹，但做决定之前，永远看不到另一条路上会发生什么。

### 怎么解决

用户输入年龄、学历、城市、职业、收入、存款和正在犹豫的决定，AI 基于 DeepSeek 大模型生成四个维度的平行宇宙推演：

| 宇宙 | 策略 | 说明 |
|------|------|------|
| 安稳宇宙 | 延续当前轨迹 | 不做改变，稳中求进 |
| 突破宇宙 | 坚定执行决定 | 果断行动，破局重生 |
| 成长宇宙 | 渐进转型路径 | 平衡中求发展 |
| 创新宇宙 | 差异化路线 | 探索另类可能 |

每个宇宙包含未来图景、5年时间线、收入变化曲线和幸福指数评估。

---

## 核心功能

### 四重平行宇宙推演

输入 7 项人生参数，AI 生成 4 个平行宇宙的完整未来推演，每个宇宙包含未来图景描述、时间线、收入变化和幸福指数。

### AI 深度分析（8 项）

| 功能 | 说明 |
|------|------|
| AI 决策树 | 树状图展示未来可能路径和概率 |
| 风险预警 | 分析可能后悔的关键节点 |
| AI 未来来信 | 3/5/10 年后的自己写给现在的你 |
| 后悔指数 | 量化不行动的代价 |
| 人生价值雷达 | 财富/健康/家庭/自由/成长/幸福六维对比 |
| AI 案例库 | 相似用户案例匹配 |
| AI 未来采访 | 问答形式呈现未来视角 |
| PDF 报告导出 | 一键生成完整报告 |

### 决策成长闭环

从推演到成长的完整生命周期：

```
推演 → 执行 → 复盘 → 档案 → 体检
```

- **决策复盘**：30/90/180 天三阶段复盘，AI 对比原始预测与实际结果
- **决策档案**：时间轴展示所有历史决策
- **AI 决策体检**：六维决策能力量化评估 + 决策人格标签
- **AI 人生地图**：16 节点可交互树状图谱

### 数据驾驶舱

5 项核心指标 + 折线图/柱状图/环形图三种动态图表 + 实时活动流，专为比赛演示设计。

### 比赛演示模式

5 分钟路演专用页面，全屏滚动展示项目价值、核心创新、技术架构和应用场景。

---

## 四大创新点

### 1. 四重平行宇宙推演引擎

独创"安稳/突破/成长/创新"四维推演模型。基于 DeepSeek 大模型，结合用户人生参数深度推演，每个宇宙生成未来图景、时间线、收入变化与幸福指数。

### 2. 决策全生命周期闭环

从"推演 → 执行 → 复盘 → 档案 → 体检"完整闭环。30/90/180 天三阶段复盘机制，AI 对比原始预测与实际结果，持续优化决策能力。

### 3. 六维决策能力体检系统

风险承受力、执行力、长期主义、学习力、创新力、成长欲六维度量化评估，生成决策人格标签（探索型/创业型/成长型/稳健型）。

### 4. AI 人生地图可视化

将人生路径抽象为可交互的树状图谱，16 个节点、5 种类型，贝塞尔曲线连接，点击展开每个节点的可能未来。

---

## 技术架构

```
┌─────────────────────────────────────────────┐
│              前端展示层                       │
│  Vue 3 · Vite · Vue Router · ECharts       │
│  html2canvas · jsPDF · 玻璃拟态UI           │
└──────────────────┬──────────────────────────┘
                   │ HTTP / Axios
┌──────────────────┴──────────────────────────┐
│              API 接口层                       │
│  Express.js · RESTful API · CORS            │
│  15+ 端点 · 统一错误处理 · Mock 数据兜底      │
└──────┬──────────────────────┬───────────────┘
       │                      │
┌──────┴──────────┐  ┌───────┴──────────────┐
│   AI 推演层      │  │      数据层           │
│  DeepSeek 大模型 │  │  MySQL · localStorage │
│  Prompt Eng.    │  │  历史记录 · 跨页传参    │
└─────────────────┘  └──────────────────────┘
```

### 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端框架 | Vue 3 | Composition API |
| 构建工具 | Vite | 开发服务器 + 打包 |
| 路由 | Vue Router | 10 个页面路由 |
| 图表 | ECharts | 折线图/柱状图/环形图/雷达图 |
| 导出 | html2canvas + jsPDF | 海报/PDF 报告 |
| 后端框架 | Express.js | RESTful API |
| AI 引擎 | DeepSeek | 大模型推理 |
| 数据库 | MySQL | 历史记录持久化 |
| 本地存储 | localStorage/sessionStorage | 跨页传参 |

---

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9
- MySQL >= 8.0（可选）
- DeepSeek API Key（可选）

### 1. 克隆项目

```bash
git clone https://github.com/your-username/parallel-universe-lab.git
cd parallel-universe-lab
```

### 2. 启动后端

```bash
cd backend
npm install

# 配置环境变量（可选）
cp .env.example .env
# 编辑 .env 填入 DeepSeek API Key 和 MySQL 配置

npm start
```

后端运行在 http://localhost:3000

> 不配置 API Key 和 MySQL 也能运行，后端自动使用 Mock 数据，所有 UI 功能可正常体验。

### 3. 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端运行在 http://localhost:5173

### 4. 配置（可选）

#### DeepSeek AI

在 `backend/.env` 中配置：

```env
DEEPSEEK_API_KEY=你的API密钥
DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions
DEEPSEEK_MODEL=deepseek-chat
```

> 不配置则使用 Mock 数据，UI 功能完整可体验。

#### MySQL 数据库

```bash
mysql -u root -p < backend/src/db/init.sql
```

在 `backend/.env` 中配置数据库连接：

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=parallel_universe_lab
```

> 不配置数据库也能运行，模拟功能正常，仅历史记录持久化不可用。

---

## 项目结构

```
parallel-universe-lab/
├── frontend/                    # 前端
│   ├── src/
│   │   ├── views/               # 页面（10个）
│   │   │   ├── Home.vue         # 首页
│   │   │   ├── Create.vue       # 创建模拟
│   │   │   ├── Analysis.vue     # AI预分析
│   │   │   ├── Result.vue       # 结果展示
│   │   │   ├── Review.vue       # 决策复盘
│   │   │   ├── Archive.vue      # 决策档案
│   │   │   ├── LifeMap.vue      # AI人生地图
│   │   │   ├── Checkup.vue      # 决策体检
│   │   │   ├── Dashboard.vue    # 数据驾驶舱
│   │   │   └── Demo.vue         # 比赛演示模式
│   │   ├── components/           # 组件（7个）
│   │   │   ├── UniverseCard.vue
│   │   │   ├── DecisionTree.vue
│   │   │   ├── RiskWarning.vue
│   │   │   ├── FutureLetter.vue
│   │   │   ├── CaseLibrary.vue
│   │   │   ├── ValueRadar.vue
│   │   │   └── FutureInterview.vue
│   │   ├── api/                 # API 请求
│   │   ├── router/              # 路由
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css            # 全局样式
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/                     # 后端
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js      # MySQL 配置
│   │   ├── services/
│   │   │   ├── deepseekService.js  # DeepSeek API
│   │   │   └── mockService.js      # Mock 数据
│   │   ├── routes/              # API 路由（15个）
│   │   │   ├── simulate.js      # 平行宇宙推演
│   │   │   ├── analyze.js       # AI预分析
│   │   │   ├── decisionTree.js
│   │   │   ├── riskWarning.js
│   │   │   ├── futureLetter.js
│   │   │   ├── caseLibrary.js
│   │   │   ├── regretIndex.js
│   │   │   ├── valueRadar.js
│   │   │   ├── futureInterview.js
│   │   │   ├── review.js
│   │   │   ├── archive.js
│   │   │   ├── lifeMap.js
│   │   │   ├── checkup.js
│   │   │   ├── dashboard.js
│   │   │   └── history.js
│   │   ├── db/
│   │   │   └── init.sql         # 数据库初始化
│   │   └── app.js               # 入口
│   ├── .env.example
│   └── package.json
├── docs/                        # 比赛材料
│   ├── 01-项目介绍文档.html
│   ├── 02-技术架构图.html
│   ├── 03-功能结构图.html
│   ├── 04-数据流程图.html
│   ├── 05-创新点说明.html
│   ├── 06-竞赛答辩稿.html
│   ├── 07-项目演示脚本.html
│   ├── 08-PPT大纲.html
│   ├── 09-5分钟比赛演示脚本.html
│   └── cover-banner.jpg         # 项目封面图
├── .gitignore
├── LICENSE
└── README.md
```

---

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/simulate | 四重平行宇宙推演 |
| POST | /api/analyze | AI 预分析 |
| POST | /api/decision-tree | AI 决策树 |
| POST | /api/risk-warning | 风险预警 |
| POST | /api/future-letter | AI 未来来信 |
| POST | /api/case-library | AI 案例库 |
| POST | /api/regret-index | 后悔指数 |
| POST | /api/value-radar | 人生价值雷达 |
| POST | /api/future-interview | AI 未来采访 |
| POST | /api/review | 决策复盘 |
| GET | /api/archive | 决策档案 |
| POST | /api/life-map | AI 人生地图 |
| POST | /api/checkup | AI 决策体检 |
| GET | /api/dashboard | 数据驾驶舱 |
| GET | /api/history | 历史记录列表 |
| GET | /api/history/:id | 历史记录详情 |
| DELETE | /api/history/:id | 删除历史记录 |
| GET | /api/health | 健康检查 |

---

## 应用场景

- **毕业生职业选择**：考研、就业、创业间的决策
- **职场转型决策**：跳槽、转行、gap year 的风险评估
- **城市迁移规划**：一线城市 vs 回老家发展
- **教育规划**：考研、留学、考证的长期回报分析
- **企业人才发展**：员工职业规划辅助工具
- **心理咨询辅助**：帮助来访者理清决策困惑

---

## 比赛材料

`docs/` 目录包含完整的比赛材料，均为自包含 HTML 文件，双击即可打开：

| 文件 | 内容 |
|------|------|
| 01-项目介绍文档 | 项目概述、背景、方案、功能、技术、价值 |
| 02-技术架构图 | 可视化分层架构图 |
| 03-功能结构图 | 树形功能结构图 |
| 04-数据流程图 | 4 条数据流程可视化 |
| 05-创新点说明 | 四大创新点详解 |
| 06-竞赛答辩稿 | 5 分钟路演 + 3 分钟答辩稿 |
| 07-项目演示脚本 | 8 步操作演示脚本 |
| 08-PPT大纲 | 15 页 PPT 内容大纲 |
| 09-5分钟比赛演示脚本 | 按分钟划分的演示脚本 |

---

## License

[MIT](LICENSE)
