<template>
  <div class="checkup-page">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="container nav-inner">
        <div class="logo" @click="$router.push('/')">
          <span class="logo-icon">🌌</span>
          <span class="logo-text">平行宇宙实验室</span>
        </div>
        <div class="nav-actions">
          <router-link to="/" class="btn btn-secondary nav-btn">返回首页</router-link>
        </div>
      </div>
    </nav>

    <!-- 加载状态 -->
    <section v-if="loading" class="loading-section">
      <div class="container">
        <div class="glass-card loading-card">
          <div class="loading-spinner"></div>
          <p class="loading-text">AI 正在进行决策体检，请稍候...</p>
          <p class="loading-subtext">正在分析你的六大决策能力维度</p>
        </div>
      </div>
    </section>

    <!-- 主内容 -->
    <div v-else-if="checkupData" class="checkup-content">
      <!-- 页面标题 -->
      <section class="page-header fade-in-up">
        <div class="container">
          <h1 class="page-title">AI 决策体检</h1>
          <p class="page-subtitle">六大维度全面诊断你的决策能力，发现你的决策人格</p>
        </div>
      </section>

      <!-- 综合评分卡 -->
      <section class="score-section">
        <div class="container">
          <div class="glass-card score-card fade-in-up">
            <div class="score-main">
              <div class="score-number-area">
                <div class="score-number" :class="levelClass">{{ checkupData.overallScore }}</div>
                <div class="score-unit">分</div>
              </div>
              <div class="score-info">
                <div class="level-badge" :class="levelClass">{{ checkupData.overallLevel }}</div>
                <div class="score-label">综合决策能力评分</div>
                <div class="score-desc">满分 100 分 · 六维综合评估</div>
              </div>
              <div class="personality-tag" :style="{ borderColor: checkupData.personality.color, color: checkupData.personality.color }">
                <span class="personality-tag-icon">{{ checkupData.personality.icon }}</span>
                <span class="personality-tag-label">{{ checkupData.personality.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 决策人格描述卡 -->
      <section class="personality-section">
        <div class="container">
          <div class="glass-card personality-card fade-in-up">
            <div class="personality-header">
              <div class="personality-avatar" :style="{ background: checkupData.personality.color + '22', borderColor: checkupData.personality.color }">
                <span class="personality-avatar-icon">{{ checkupData.personality.icon }}</span>
              </div>
              <div class="personality-meta">
                <div class="personality-type-label">你的决策人格</div>
                <h2 class="personality-name" :style="{ color: checkupData.personality.color }">{{ checkupData.personality.label }}</h2>
              </div>
            </div>
            <p class="personality-desc">{{ checkupData.personality.description }}</p>
          </div>
        </div>
      </section>

      <!-- 雷达图 -->
      <section class="chart-section">
        <div class="container">
          <div class="glass-card chart-card fade-in-up">
            <h3 class="chart-title">六维能力雷达图</h3>
            <p class="chart-subtitle">直观展示各维度能力的均衡程度</p>
            <div ref="radarChartRef" class="chart-container"></div>
          </div>
        </div>
      </section>

      <!-- 维度详情卡片 -->
      <section class="dimensions-section">
        <div class="container">
          <h2 class="section-title fade-in-up">维度详情</h2>
          <p class="section-subtitle fade-in-up">六大决策能力维度的逐项分析</p>
          <div class="dimensions-grid">
            <div
              v-for="(dim, i) in checkupData.dimensions"
              :key="dim.key"
              class="glass-card dimension-card fade-in-up"
              :style="{ animationDelay: `${i * 0.08}s` }"
            >
              <div class="dimension-header">
                <span class="dimension-name">{{ dim.name }}</span>
                <span class="dimension-score" :style="{ color: scoreColor(dim.score) }">{{ dim.score }}</span>
              </div>
              <div class="dimension-bar-wrapper">
                <div
                  class="dimension-bar"
                  :style="{ width: dim.score + '%', background: `linear-gradient(90deg, ${scoreColor(dim.score)}, ${scoreColor(dim.score)}aa)` }"
                ></div>
              </div>
              <p class="dimension-description">{{ dim.description }}</p>
              <div class="dimension-analysis">
                <span class="analysis-icon">💡</span>
                <span class="analysis-text">{{ dim.analysis }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 优势与短板 -->
      <section class="sw-section">
        <div class="container">
          <div class="sw-grid">
            <!-- 优势 -->
            <div class="glass-card sw-card strengths-card fade-in-up">
              <div class="sw-card-header">
                <span class="sw-icon">💪</span>
                <h3 class="sw-title">核心优势</h3>
              </div>
              <div v-if="checkupData.strengths && checkupData.strengths.length" class="sw-tags">
                <span v-for="s in checkupData.strengths" :key="s" class="sw-tag strength-tag">{{ s }}</span>
              </div>
              <p v-else class="sw-empty">暂无突出优势维度，继续努力提升</p>
            </div>
            <!-- 短板 -->
            <div class="glass-card sw-card weaknesses-card fade-in-up">
              <div class="sw-card-header">
                <span class="sw-icon">⚠️</span>
                <h3 class="sw-title">待提升短板</h3>
              </div>
              <div v-if="checkupData.weaknesses && checkupData.weaknesses.length" class="sw-tags">
                <span v-for="w in checkupData.weaknesses" :key="w" class="sw-tag weakness-tag">{{ w }}</span>
              </div>
              <p v-else class="sw-empty">各维度发展均衡，无明显短板</p>
            </div>
          </div>
        </div>
      </section>

      <!-- AI 建议 -->
      <section class="advice-section">
        <div class="container">
          <div class="glass-card advice-card fade-in-up">
            <div class="advice-header">
              <span class="advice-icon">🤖</span>
              <h3 class="advice-title">AI 综合建议</h3>
            </div>
            <p class="advice-text">{{ checkupData.aiAdvice }}</p>
          </div>
        </div>
      </section>

      <!-- 行动建议网格 -->
      <section class="recommendations-section">
        <div class="container">
          <h2 class="section-title fade-in-up">行动建议</h2>
          <p class="section-subtitle fade-in-up">基于体检结果的四步行动指南</p>
          <div class="recommendations-grid">
            <div
              v-for="(rec, i) in checkupData.recommendations"
              :key="i"
              class="glass-card recommendation-card fade-in-up"
              :style="{ animationDelay: `${i * 0.1}s` }"
            >
              <div class="rec-icon">{{ rec.icon }}</div>
              <h4 class="rec-title">{{ rec.title }}</h4>
              <p class="rec-text">{{ rec.text }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 底部操作 -->
      <section class="bottom-actions">
        <div class="container">
          <div class="action-buttons">
            <router-link to="/create" class="btn btn-primary action-btn">🔄 重新模拟</router-link>
            <router-link to="/" class="btn btn-secondary action-btn">返回首页</router-link>
          </div>
          <p class="disclaimer">⚠️ 以上内容由 AI 生成，仅供娱乐参考，人生没有标准答案</p>
        </div>
      </section>
    </div>

    <!-- 错误状态 -->
    <section v-else class="error-section">
      <div class="container">
        <div class="glass-card error-card">
          <div class="error-icon">😵</div>
          <h2>体检生成失败</h2>
          <p>请先完成一次平行宇宙模拟，或稍后重试</p>
          <router-link to="/create" class="btn btn-primary">去创建模拟</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { getDecisionCheckup } from '../api'

const loading = ref(true)
const checkupData = ref(null)
const radarChartRef = ref(null)
let radarChart = null

const levelClass = ref('')

const computeLevelClass = (level) => {
  if (level === '优秀') return 'level-excellent'
  if (level === '良好') return 'level-good'
  return 'level-poor'
}

const scoreColor = (score) => {
  if (score >= 75) return '#4ade80'
  if (score >= 60) return '#4a9eff'
  if (score >= 45) return '#ffa500'
  return '#ff6b9d'
}

const initChart = () => {
  if (!radarChartRef.value || !checkupData.value) return

  const dims = checkupData.value.dimensions
  const scores = checkupData.value.scores

  radarChart = echarts.init(radarChartRef.value)
  radarChart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      backgroundColor: 'rgba(20, 20, 45, 0.9)',
      borderColor: 'rgba(138, 99, 255, 0.3)',
      borderWidth: 1,
      textStyle: { color: '#e8e8f5', fontSize: 13 },
      formatter: (params) => {
        const values = params.value
        let html = `<div style="font-weight:600;margin-bottom:6px;">${params.name}</div>`
        dims.forEach((d, i) => {
          html += `<div style="display:flex;justify-content:space-between;gap:16px;font-size:12px;">
            <span style="color:#9999bb;">${d.name}</span>
            <span style="color:#e8e8f5;font-weight:600;">${values[i]}</span>
          </div>`
        })
        return html
      }
    },
    radar: {
      indicator: dims.map(d => ({ name: d.name, max: d.max || 100 })),
      center: ['50%', '52%'],
      radius: '68%',
      axisName: {
        color: '#9999bb',
        fontSize: 13,
        fontWeight: 500
      },
      splitLine: {
        lineStyle: { color: 'rgba(138, 99, 255, 0.15)' }
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(138, 99, 255, 0.03)', 'rgba(138, 99, 255, 0.06)']
        }
      },
      axisLine: {
        lineStyle: { color: 'rgba(138, 99, 255, 0.2)' }
      }
    },
    series: [{
      name: '决策能力',
      type: 'radar',
      data: [{
        value: dims.map(d => scores[d.key] ?? d.score),
        name: '我的决策能力',
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: {
          color: '#8a63ff',
          borderColor: '#fff',
          borderWidth: 2
        },
        lineStyle: {
          color: '#8a63ff',
          width: 2
        },
        areaStyle: {
          color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.8, [
            { offset: 0, color: 'rgba(138, 99, 255, 0.05)' },
            { offset: 1, color: 'rgba(74, 158, 255, 0.35)' }
          ])
        }
      }]
    }]
  })
}

const loadCheckup = async () => {
  loading.value = true
  try {
    const stored = sessionStorage.getItem('simulationResult')
    const userData = stored ? JSON.parse(stored) : {}
    const res = await getDecisionCheckup(userData)
    checkupData.value = res.data
    levelClass.value = computeLevelClass(res.data.overallLevel)
    loading.value = false
    await nextTick()
    initChart()
  } catch (err) {
    console.error('决策体检加载失败:', err)
    checkupData.value = null
  } finally {
    loading.value = false
  }
}

const handleResize = () => {
  radarChart?.resize()
}

onMounted(() => {
  loadCheckup()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  radarChart?.dispose()
  radarChart = null
})
</script>

<style scoped>
.checkup-page {
  min-height: 100vh;
  padding-bottom: 40px;
}

/* 加载状态 */
.loading-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 40px 0;
}

.loading-card {
  padding: 60px 40px;
  text-align: center;
}

.loading-spinner {
  width: 56px;
  height: 56px;
  margin: 0 auto 24px;
  border: 4px solid rgba(138, 99, 255, 0.15);
  border-top-color: var(--accent-purple);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.loading-subtext {
  font-size: 14px;
  color: var(--text-secondary);
}

/* 页面标题 */
.page-header {
  padding: 40px 0 24px;
  text-align: center;
}

.page-title {
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 15px;
  color: var(--text-secondary);
}

/* 综合评分卡 */
.score-section {
  padding: 12px 0 24px;
}

.score-card {
  padding: 36px 40px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.score-card:hover {
  transform: translateY(-4px);
}

.score-main {
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
}

.score-number-area {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.score-number {
  font-size: 80px;
  font-weight: 800;
  line-height: 1;
  background: var(--gradient-nebula);
  background-size: 200% auto;
  animation: gradient-shift 4s ease infinite;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.score-number.level-excellent {
  background: linear-gradient(135deg, #4ade80 0%, #00e5ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.score-number.level-good {
  background: linear-gradient(135deg, #4a9eff 0%, #8a63ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.score-number.level-poor {
  background: linear-gradient(135deg, #ffa500 0%, #ff6b9d 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.score-unit {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-secondary);
}

.score-info {
  flex: 1;
  min-width: 200px;
}

.level-badge {
  display: inline-block;
  padding: 6px 18px;
  border-radius: var(--radius-pill);
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

.level-badge.level-excellent {
  background: rgba(74, 222, 128, 0.15);
  color: var(--accent-green);
  border: 1px solid rgba(74, 222, 128, 0.4);
}

.level-badge.level-good {
  background: rgba(74, 158, 255, 0.15);
  color: var(--accent-blue);
  border: 1px solid rgba(74, 158, 255, 0.4);
}

.level-badge.level-poor {
  background: rgba(255, 165, 0, 0.15);
  color: var(--accent-orange);
  border: 1px solid rgba(255, 165, 0, 0.4);
}

.score-label {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.score-desc {
  font-size: 13px;
  color: var(--text-muted);
}

.personality-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 2px solid;
  border-radius: 24px;
  font-weight: 700;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.3s ease;
}

.personality-tag:hover {
  transform: scale(1.05);
}

.personality-tag-icon {
  font-size: 22px;
}

.personality-tag-label {
  font-size: 16px;
}

/* 决策人格描述卡 */
.personality-section {
  padding: 12px 0 24px;
}

.personality-card {
  padding: 32px 36px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.personality-card:hover {
  transform: translateY(-4px);
}

.personality-header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 20px;
}

.personality-avatar {
  width: 64px;
  height: 64px;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  flex-shrink: 0;
}

.personality-avatar-icon {
  font-size: 34px;
}

.personality-type-label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.personality-name {
  font-size: 26px;
  font-weight: 700;
}

.personality-desc {
  font-size: 15px;
  line-height: 1.9;
  color: var(--text-primary);
}

/* 雷达图 */
.chart-section {
  padding: 12px 0 24px;
}

.chart-card {
  padding: 28px 32px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.chart-card:hover {
  transform: translateY(-4px);
}

.chart-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}

.chart-subtitle {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.chart-container {
  width: 100%;
  height: 440px;
}

/* 维度详情 */
.dimensions-section {
  padding: 24px 0;
}

.section-title {
  text-align: center;
  margin-bottom: 6px;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 50px;
  height: 3px;
  background: var(--gradient-nebula);
  border-radius: 2px;
  margin: 10px auto 0;
}

.section-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 28px;
  font-size: 14px;
}

.dimensions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.dimension-card {
  padding: 24px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.dimension-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(138, 99, 255, 0.2), 0 0 30px rgba(138, 99, 255, 0.15);
}

.dimension-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.dimension-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.dimension-score {
  font-size: 26px;
  font-weight: 800;
}

.dimension-bar-wrapper {
  height: 8px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 14px;
}

.dimension-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.dimension-description {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 12px;
}

.dimension-analysis {
  display: flex;
  gap: 8px;
  padding: 10px 12px;
  background: rgba(138, 99, 255, 0.06);
  border-radius: 10px;
  border: 1px solid rgba(138, 99, 255, 0.1);
}

.analysis-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.analysis-text {
  font-size: 13px;
  color: var(--text-primary);
  line-height: 1.6;
}

/* 优势与短板 */
.sw-section {
  padding: 24px 0;
}

.sw-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.sw-card {
  padding: 28px 32px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.sw-card:hover {
  transform: translateY(-4px);
}

.sw-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.sw-icon {
  font-size: 24px;
}

.sw-title {
  font-size: 18px;
  font-weight: 700;
}

.strengths-card {
  border-left: 3px solid var(--accent-green);
}

.weaknesses-card {
  border-left: 3px solid var(--accent-orange);
}

.sw-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.sw-tag {
  padding: 8px 18px;
  border-radius: var(--radius-pill);
  font-size: 14px;
  font-weight: 600;
}

.strength-tag {
  background: rgba(74, 222, 128, 0.12);
  color: var(--accent-green);
  border: 1px solid rgba(74, 222, 128, 0.3);
}

.weakness-tag {
  background: rgba(255, 165, 0, 0.12);
  color: var(--accent-orange);
  border: 1px solid rgba(255, 165, 0, 0.3);
}

.sw-empty {
  font-size: 14px;
  color: var(--text-muted);
  font-style: italic;
}

/* AI 建议 */
.advice-section {
  padding: 12px 0 24px;
}

.advice-card {
  padding: 32px 36px;
  background: rgba(138, 99, 255, 0.06);
  border: 1px solid rgba(138, 99, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.advice-card:hover {
  transform: translateY(-4px);
}

.advice-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.advice-icon {
  font-size: 26px;
}

.advice-title {
  font-size: 20px;
  font-weight: 700;
}

.advice-text {
  font-size: 15px;
  line-height: 1.9;
  color: var(--text-primary);
}

/* 行动建议 */
.recommendations-section {
  padding: 24px 0;
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.recommendation-card {
  padding: 28px 24px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.recommendation-card:hover {
  transform: translateY(-6px);
}

.rec-icon {
  font-size: 40px;
  margin-bottom: 14px;
  transition: transform 0.3s ease;
}

.recommendation-card:hover .rec-icon {
  transform: scale(1.15);
}

.rec-title {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--text-primary);
}

.rec-text {
  font-size: 13px;
  line-height: 1.7;
  color: var(--text-secondary);
}

/* 底部操作 */
.bottom-actions {
  padding: 40px 0 20px;
  text-align: center;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.action-btn {
  padding: 14px 28px;
}

.disclaimer {
  font-size: 13px;
  color: var(--text-muted);
}

/* 错误状态 */
.error-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 40px 0;
}

.error-card {
  padding: 60px 40px;
  text-align: center;
}

.error-icon {
  font-size: 56px;
  margin-bottom: 16px;
}

.error-card h2 {
  font-size: 22px;
  margin-bottom: 8px;
}

.error-card p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

/* 响应式 */
@media (max-width: 992px) {
  .dimensions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .recommendations-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }
  .score-card {
    padding: 28px 24px;
  }
  .score-main {
    gap: 20px;
  }
  .score-number {
    font-size: 60px;
  }
  .personality-card,
  .chart-card,
  .advice-card {
    padding: 24px 20px;
  }
  .dimensions-grid {
    grid-template-columns: 1fr;
  }
  .sw-grid {
    grid-template-columns: 1fr;
  }
  .recommendations-grid {
    grid-template-columns: 1fr;
  }
  .chart-container {
    height: 340px;
  }
  .nav-btn {
    padding: 6px 14px;
    font-size: 13px;
  }
}
</style>
