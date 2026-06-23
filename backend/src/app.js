import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { initDatabase, isDbAvailable } from './config/database.js'
import { isDeepSeekAvailable as checkDeepSeek } from './services/deepseekService.js'
import simulateRouter from './routes/simulate.js'
import analyzeRouter from './routes/analyze.js'
import decisionTreeRouter from './routes/decisionTree.js'
import riskWarningRouter from './routes/riskWarning.js'
import futureLetterRouter from './routes/futureLetter.js'
import caseLibraryRouter from './routes/caseLibrary.js'
import regretIndexRouter from './routes/regretIndex.js'
import valueRadarRouter from './routes/valueRadar.js'
import futureInterviewRouter from './routes/futureInterview.js'
import reviewRouter from './routes/review.js'
import archiveRouter from './routes/archive.js'
import lifeMapRouter from './routes/lifeMap.js'
import checkupRouter from './routes/checkup.js'
import historyRouter from './routes/history.js'
import dashboardRouter from './routes/dashboard.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 中间件
app.use(cors())
app.use(express.json({ limit: '10mb' }))

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    deepseek: checkDeepSeek() ? 'available' : 'unavailable (using mock)',
    database: 'check logs'
  })
})

// 路由
app.use('/api/simulate', simulateRouter)
app.use('/api/analyze', analyzeRouter)
app.use('/api/decision-tree', decisionTreeRouter)
app.use('/api/risk-warning', riskWarningRouter)
app.use('/api/future-letter', futureLetterRouter)
app.use('/api/case-library', caseLibraryRouter)
app.use('/api/regret-index', regretIndexRouter)
app.use('/api/value-radar', valueRadarRouter)
app.use('/api/future-interview', futureInterviewRouter)
app.use('/api/review', reviewRouter)
app.use('/api/archive', archiveRouter)
app.use('/api/life-map', lifeMapRouter)
app.use('/api/checkup', checkupRouter)
app.use('/api/history', historyRouter)
app.use('/api/dashboard', dashboardRouter)

// 生产环境：托管前端静态文件
const frontendDist = path.join(__dirname, '../../frontend/dist')
app.use(express.static(frontendDist))

// SPA 回退：所有非 API 路由返回 index.html
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(frontendDist, 'index.html'))
  }
})

// 启动服务（Vercel 环境下跳过）
const start = async () => {
  await initDatabase()

  app.listen(PORT, () => {
    console.log('\n========================================')
    console.log('  🌌 人生平行宇宙实验室 - 后端服务')
    console.log('========================================')
    console.log(`  🚀 服务地址: http://localhost:${PORT}`)
    console.log(`  🤖 DeepSeek API: ${checkDeepSeek() ? '✅ 已配置' : '⚠️  未配置（使用Mock数据）'}`)
    console.log(`  💾 MySQL数据库: ${isDbAvailable() ? '✅ 已连接' : '⚠️  未连接'}`)
    console.log('========================================\n')
    if (!checkDeepSeek()) {
      console.log('  提示: 在 backend/.env 中配置 DEEPSEEK_API_KEY 以启用AI推演')
      console.log('  当前使用 Mock 数据，UI功能可正常体验\n')
    }
  })
}

if (!process.env.VERCEL) {
  start()
}

export default app
