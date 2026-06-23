<template>
  <div class="analysis-page">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="container nav-inner">
        <div class="logo" @click="$router.push('/')">
          <span class="logo-icon">🌌</span>
          <span class="logo-text">平行宇宙实验室</span>
        </div>
      </div>
    </nav>

    <div class="container analysis-container">
      <!-- 顶部状态 -->
      <div class="status-header fade-in">
        <div class="ai-indicator" :class="{ pulsing: !allDone }">
          <span class="ai-dot"></span>
          <span class="ai-text">{{ statusText }}</span>
        </div>
      </div>

      <!-- 分析维度列表 -->
      <div class="dimensions-list">
        <div
          v-for="(dim, index) in dimensions"
          :key="dim.id"
          class="glass-card dimension-card"
          :class="{
            'is-active': index === activeIndex && !dim.revealed,
            'is-revealed': dim.revealed
          }"
        >
          <!-- 序号 -->
          <div class="dim-number" :style="{ color: dim.color }">
            <span class="dim-num-circle" :style="{ borderColor: dim.color }">{{ index + 1 }}</span>
          </div>

          <!-- 内容区 -->
          <div class="dim-content">
            <div class="dim-header">
              <span class="dim-icon">{{ dim.icon }}</span>
              <span class="dim-label">{{ dim.label }}</span>
            </div>

            <!-- 分数展示 -->
            <div class="dim-score-area" v-if="dim.revealed">
              <div class="dim-score-row">
                <div class="dim-score-bar-wrapper">
                  <div
                    class="dim-score-bar"
                    :style="{
                      width: dim.displayScore + '%',
                      background: `linear-gradient(90deg, ${dim.color}, ${dim.color}aa)`
                    }"
                  ></div>
                </div>
                <div class="dim-score-value" :style="{ color: dim.color }">
                  <span class="score-num">{{ dim.score }}</span>
                  <span class="score-unit">{{ dim.isPercent ? '%' : '分' }}</span>
                </div>
              </div>
              <div class="dim-reason">
                <span class="reason-label">原因：</span>
                <span class="reason-text">{{ dim.reason }}</span>
              </div>
            </div>

            <!-- 加载中 -->
            <div class="dim-loading" v-else-if="index === activeIndex">
              <div class="loading-dots">
                <span></span><span></span><span></span>
              </div>
              <span class="loading-text">AI 正在评估...</span>
            </div>

            <!-- 待评估 -->
            <div class="dim-pending" v-else>
              <span class="pending-text">等待评估...</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 城市发展数据模型 -->
      <transition name="slide-up">
        <div v-if="allDone && cityData" class="city-data-section">
          <div class="glass-card city-card">
            <div class="city-header">
              <span class="city-icon">🏙️</span>
              <div>
                <h3 class="city-title">{{ cityName }} · 城市发展数据模型</h3>
                <p class="city-subtitle">城市数据已参与AI推演计算</p>
              </div>
            </div>
            <div class="city-metrics">
              <div class="city-metric" v-for="metric in cityMetrics" :key="metric.key">
                <div class="city-metric-label">{{ metric.label }}</div>
                <div class="city-metric-bar-wrapper">
                  <div class="city-metric-bar" :style="{ width: cityData[metric.key] + '%', background: metric.gradient }"></div>
                </div>
                <div class="city-metric-value" :style="{ color: metric.color }">{{ cityData[metric.key] }}</div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- 综合推演完成 -->
      <transition name="slide-up">
        <div v-if="allDone" class="completion-area">
          <div class="glass-card completion-card">
            <div class="completion-icon">✨</div>
            <h2 class="completion-title">综合推演完成</h2>
            <p class="completion-desc">AI 已完成对你当前状况的多维度评估</p>
            <div class="overall-score">
              <span class="overall-label">综合评分</span>
              <span class="overall-value">{{ overallScore }}<span class="overall-unit">分</span></span>
            </div>
            <button class="btn btn-primary proceed-btn" @click="proceedToSimulate" :disabled="simulating">
              <span v-if="!simulating">🚀 开始生成平行宇宙</span>
              <span v-else class="loading-text">
                <span class="mini-spinner"></span>
                正在生成四重宇宙...
              </span>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { analyzeSimulation, createSimulation } from '../api'

const router = useRouter()

const dimensions = ref([
  { id: 'career', label: '当前职业稳定性', icon: '💼', color: '#8a63ff', score: 0, displayScore: 0, reason: '', revealed: false },
  { id: 'financial', label: '财务抗风险能力', icon: '💰', color: '#4a9eff', score: 0, displayScore: 0, reason: '', revealed: false },
  { id: 'success', label: '创业成功率参考', icon: '🎯', color: '#ff6b9d', score: 0, displayScore: 0, reason: '', revealed: false, isPercent: true },
  { id: 'industry', label: '行业发展指数', icon: '📈', color: '#4ade80', score: 0, displayScore: 0, reason: '', revealed: false }
])

const activeIndex = ref(-1)
const allDone = ref(false)
const simulating = ref(false)
const formData = ref(null)
const cityData = ref(null)
const cityName = ref('')
let timers = []

const statusText = computed(() => {
  if (allDone.value) return '分析完成'
  if (activeIndex.value === -1) return 'AI 正在分析...'
  return `正在评估：${dimensions.value[activeIndex.value]?.label || ''}`
})

const overallScore = computed(() => {
  if (!allDone.value) return 0
  return Math.round(dimensions.value.reduce((sum, d) => sum + d.score, 0) / dimensions.value.length)
})

const cityMetrics = [
  { key: 'employmentIndex', label: '就业指数', color: '#8a63ff', gradient: 'linear-gradient(90deg, #8a63ff, #6366f1)' },
  { key: 'salaryIndex', label: '薪资指数', color: '#4a9eff', gradient: 'linear-gradient(90deg, #4a9eff, #00e5ff)' },
  { key: 'startupIndex', label: '创业指数', color: '#ff6b9d', gradient: 'linear-gradient(90deg, #ff6b9d, #ffa500)' },
  { key: 'growthIndex', label: '发展指数', color: '#4ade80', gradient: 'linear-gradient(90deg, #4ade80, #00e5ff)' },
  { key: 'costIndex', label: '生活成本', color: '#ffa500', gradient: 'linear-gradient(90deg, #ffa500, #ff6b6b)' }
]

const revealDimension = (index, allData) => {
  if (index >= dimensions.value.length) {
    allDone.value = true
    return
  }

  const dim = dimensions.value[index]
  const data = allData[index]
  activeIndex.value = index

  // 模拟评估延迟
  const delay = 800 + Math.random() * 600
  const t = setTimeout(() => {
    // 填充数据
    dim.score = data.score
    dim.reason = data.reason
    if (data.isPercent) dim.isPercent = true
    dim.revealed = true

    // 分数动画
    let current = 0
    const target = data.score
    const step = Math.max(1, Math.ceil(target / 30))
    const animTimer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(animTimer)
      }
      dim.displayScore = current
    }, 30)

    // 下一个维度
    const nextDelay = setTimeout(() => {
      revealDimension(index + 1, allData)
    }, 1000)

    timers.push(nextDelay)
  }, delay)

  timers.push(t)
}

const startAnalysis = async () => {
  // 从 sessionStorage 获取表单数据
  const stored = sessionStorage.getItem('simulationForm')
  if (!stored) {
    router.push('/create')
    return
  }

  formData.value = JSON.parse(stored)

  try {
    // 调用分析接口
    const res = await analyzeSimulation(formData.value)
    const analysisData = res.data

    // 存储城市数据
    if (analysisData.cityData) {
      cityData.value = analysisData.cityData
      cityName.value = analysisData.cityName || formData.value.city
    }

    // 从第一个维度开始逐个展示
    revealDimension(0, analysisData.dimensions)

  } catch (err) {
    // 失败时使用默认数据
    const fallbackData = {
      dimensions: [
        { id: 'career', label: '当前职业稳定性', score: 75, icon: '💼', color: '#8a63ff', reason: '岗位有一定需求，但竞争在增加' },
        { id: 'financial', label: '财务抗风险能力', score: 65, icon: '💰', color: '#4a9eff', reason: '存款可支撑一段时间，但需谨慎规划' },
        { id: 'success', label: '创业成功率参考', score: 30, isPercent: true, icon: '🎯', color: '#ff6b9d', reason: '根据公开创业统计数据' },
        { id: 'industry', label: '行业发展指数', score: 72, icon: '📈', color: '#4ade80', reason: '行业整体保持增长态势' }
      ]
    }
    revealDimension(0, fallbackData.dimensions)
  }
}

const proceedToSimulate = async () => {
  simulating.value = true

  try {
    const res = await createSimulation(formData.value)
    const resultData = {
      ...formData.value,
      universes: res.data.universes,
      summary: res.data.summary,
      id: res.data.id
    }
    sessionStorage.setItem('simulationResult', JSON.stringify(resultData))
    router.push('/result')
  } catch (err) {
    simulating.value = false
    alert('模拟请求失败，请检查后端服务是否启动。错误：' + (err.message || '未知错误'))
  }
}

onMounted(() => {
  startAnalysis()
})

onUnmounted(() => {
  timers.forEach(t => clearTimeout(t))
  timers = []
})
</script>

<style scoped>
.analysis-page {
  min-height: 100vh;
  padding-bottom: 60px;
}

/* 分析容器 */
.analysis-container {
  max-width: 720px;
  padding-top: 40px;
}

/* 城市数据模型 */
.city-data-section {
  margin-top: 24px;
}

.city-card {
  padding: 24px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.city-card:hover {
  transform: translateY(-3px);
}

.city-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
}

.city-icon {
  font-size: 28px;
}

.city-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
  letter-spacing: 0.5px;
}

.city-subtitle {
  font-size: 13px;
  color: var(--text-muted);
}

.city-metrics {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.city-metric {
  display: flex;
  align-items: center;
  gap: 14px;
}

.city-metric-label {
  width: 80px;
  font-size: 14px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.city-metric-bar-wrapper {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  overflow: hidden;
}

.city-metric-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.city-metric-value {
  width: 36px;
  text-align: right;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
}

/* 状态头部 */
.status-header {
  text-align: center;
  margin-bottom: 40px;
}

.ai-indicator {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 24px;
  background: rgba(138, 99, 255, 0.12);
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-pill, 999px);
  font-size: 15px;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.ai-dot {
  width: 10px;
  height: 10px;
  background: var(--accent-purple);
  border-radius: 50%;
  flex-shrink: 0;
}

.ai-indicator.pulsing .ai-dot {
  animation: pulse-dot 1.2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(138, 99, 255, 0.5); }
  50% { opacity: 0.6; box-shadow: 0 0 0 8px rgba(138, 99, 255, 0); }
}

/* 维度列表 */
.dimensions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dimension-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: 0.5;
}

.dimension-card.is-active {
  opacity: 1;
  border-color: var(--accent-purple);
  box-shadow: 0 0 20px rgba(138, 99, 255, 0.2);
}

.dimension-card.is-revealed {
  opacity: 1;
}

.dimension-card.is-revealed:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card-hover);
}

/* 序号 */
.dim-number {
  flex-shrink: 0;
}

.dim-num-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 2px solid;
  border-radius: 50%;
  font-size: 16px;
  font-weight: 700;
  transition: transform 0.3s ease;
}

.dimension-card:hover .dim-num-circle {
  transform: scale(1.1);
}

/* 内容区 */
.dim-content {
  flex: 1;
  min-width: 0;
}

.dim-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.dim-icon {
  font-size: 22px;
}

.dim-label {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.5px;
}

/* 分数区 */
.dim-score-area {
  animation: fadeInUp 0.4s ease forwards;
}

.dim-score-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
}

.dim-score-bar-wrapper {
  flex: 1;
  height: 10px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 5px;
  overflow: hidden;
}

.dim-score-bar {
  height: 100%;
  border-radius: 5px;
  transition: width 0.8s ease;
  box-shadow: 0 0 8px rgba(138, 99, 255, 0.4);
}

.dim-score-value {
  display: flex;
  align-items: baseline;
  gap: 2px;
  flex-shrink: 0;
  min-width: 70px;
  justify-content: flex-end;
}

.score-num {
  font-size: 28px;
  font-weight: 800;
  line-height: 1;
}

.score-unit {
  font-size: 14px;
  font-weight: 600;
  opacity: 0.7;
}

/* 原因 */
.dim-reason {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
}

.reason-label {
  color: var(--text-muted);
  font-weight: 600;
}

/* 加载中 */
.dim-loading {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
}

.loading-dots {
  display: flex;
  gap: 4px;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  background: var(--accent-purple);
  border-radius: 50%;
  animation: bounce-dot 1.4s ease-in-out infinite;
}

.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce-dot {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}

.loading-text {
  font-size: 14px;
  color: var(--text-muted);
}

/* 待评估 */
.dim-pending {
  padding: 8px 0;
}

.pending-text {
  font-size: 14px;
  color: var(--text-muted);
  opacity: 0.5;
}

/* 完成区 */
.completion-area {
  margin-top: 32px;
}

.completion-card {
  padding: 40px 32px;
  text-align: center;
  border-color: rgba(74, 222, 128, 0.3);
  box-shadow: 0 0 30px rgba(74, 222, 128, 0.15);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.completion-icon {
  font-size: 48px;
  margin-bottom: 16px;
  animation: float 2s ease-in-out infinite;
}

.completion-title {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 1px;
  background: linear-gradient(135deg, #4ade80, #00e5ff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 4s ease infinite;
}

.completion-desc {
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.overall-score {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 12px;
  margin-bottom: 28px;
  padding: 20px;
  background: rgba(74, 222, 128, 0.08);
  border-radius: 16px;
  border: 1px solid rgba(74, 222, 128, 0.15);
}

.overall-label {
  font-size: 15px;
  color: var(--text-secondary);
}

.overall-value {
  font-size: 42px;
  font-weight: 800;
  color: var(--accent-green);
  line-height: 1;
  letter-spacing: 0.5px;
}

.overall-unit {
  font-size: 18px;
  font-weight: 600;
  opacity: 0.7;
  margin-left: 2px;
}

.proceed-btn {
  min-width: 260px;
  padding: 16px 36px;
  font-size: 17px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.mini-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin-right: 8px;
  vertical-align: middle;
}

/* 过渡动画 */
.slide-up-enter-active {
  transition: all 0.5s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

/* 响应式 */
@media (max-width: 768px) {
  .dimension-card {
    padding: 18px;
    gap: 14px;
  }
  .dim-num-circle {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }
  .dim-label {
    font-size: 15px;
  }
  .score-num {
    font-size: 22px;
  }
  .overall-value {
    font-size: 34px;
  }
  .proceed-btn {
    width: 100%;
  }
}
</style>
