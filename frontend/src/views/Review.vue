<template>
  <div class="review-page">
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

    <!-- 空状态 -->
    <div v-if="!hasSimulation && !loading" class="empty-result">
      <div class="glass-card empty-card">
        <div class="empty-icon">🌌</div>
        <h2>暂无模拟数据</h2>
        <p>请先完成一次平行宇宙模拟，再进行决策复盘</p>
        <router-link to="/create" class="btn btn-primary">去创建模拟</router-link>
      </div>
    </div>

    <!-- 主内容 -->
    <div v-else class="review-container">
      <!-- 页面标题 -->
      <section class="page-header fade-in-up">
        <div class="container">
          <h1 class="page-title">决策复盘系统</h1>
          <p class="page-subtitle">回顾你的决定，对比 AI 推演，在行动中校准方向</p>
        </div>
      </section>

      <!-- 复盘周期选择 -->
      <section class="period-section">
        <div class="container">
          <div class="period-tabs">
            <button
              v-for="p in periods"
              :key="p.days"
              class="period-tab"
              :class="{ active: selectedDays === p.days }"
              :disabled="loading"
              @click="selectPeriod(p.days)"
            >
              <span class="period-tab-icon">{{ p.icon }}</span>
              <span class="period-tab-text">{{ p.label }}</span>
            </button>
          </div>
        </div>
      </section>

      <!-- 加载状态 -->
      <section v-if="loading" class="loading-section">
        <div class="container">
          <div class="glass-card loading-card">
            <div class="loading-spinner"></div>
            <p class="loading-text">AI 正在生成 {{ currentStageLabel }} 报告...</p>
            <p class="loading-subtext">回顾行动轨迹，对比当初推演</p>
          </div>
        </div>
      </section>

      <!-- 复盘报告 -->
      <div v-else-if="review" class="review-content">
        <!-- 复盘阶段头部 -->
        <section class="stage-section">
          <div class="container">
            <div class="glass-card stage-card fade-in-up">
              <div class="stage-badge">{{ review.stage }}</div>
              <h2 class="stage-label">{{ review.stageLabel }}</h2>
              <div class="stage-focus">
                <span class="focus-icon">🎯</span>
                <span class="focus-text">{{ review.focus }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 满意度与后悔指数 -->
        <section class="scores-section">
          <div class="container">
            <div class="scores-grid">
              <!-- 满意度 -->
              <div class="glass-card score-card satisfaction-card fade-in-up">
                <div class="score-header">
                  <span class="score-icon">😊</span>
                  <span class="score-name">满意度</span>
                </div>
                <div class="score-body">
                  <div class="score-bar-wrapper">
                    <div
                      class="score-bar satisfaction-bar"
                      :style="{ width: (review.satisfaction * 10) + '%' }"
                    ></div>
                  </div>
                  <div class="score-value satisfaction-value">
                    <span class="score-num">{{ review.satisfaction }}</span>
                    <span class="score-unit">/ 10</span>
                  </div>
                </div>
                <p class="score-hint">对当前决策结果的满意程度</p>
              </div>

              <!-- 后悔指数 -->
              <div class="glass-card score-card regret-score-card fade-in-up">
                <div class="score-header">
                  <span class="score-icon">😔</span>
                  <span class="score-name">后悔指数</span>
                </div>
                <div class="score-body">
                  <div class="score-bar-wrapper">
                    <div
                      class="score-bar regret-bar"
                      :style="{ width: (review.regret * 10) + '%' }"
                    ></div>
                  </div>
                  <div class="score-value regret-value">
                    <span class="score-num">{{ review.regret }}</span>
                    <span class="score-unit">/ 10</span>
                  </div>
                </div>
                <p class="score-hint">对当初决定的后悔程度</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 执行状态 -->
        <section class="execution-section">
          <div class="container">
            <div class="glass-card execution-card fade-in-up">
              <div class="execution-header">
                <span class="execution-icon">📍</span>
                <span class="execution-title">执行状态</span>
              </div>
              <p class="execution-text">{{ review.execution }}</p>
            </div>
          </div>
        </section>

        <!-- 成就与挑战 -->
        <section class="ac-section">
          <div class="container">
            <div class="ac-grid">
              <!-- 成就 -->
              <div class="glass-card ac-card achievements-card fade-in-up">
                <div class="ac-card-header">
                  <span class="ac-card-icon">✅</span>
                  <h3 class="ac-card-title">阶段成就</h3>
                </div>
                <ul class="ac-list">
                  <li
                    v-for="(item, i) in review.achievements"
                    :key="'a' + i"
                    class="ac-item achievement-item"
                  >
                    <span class="ac-item-icon">✅</span>
                    <span class="ac-item-text">{{ item }}</span>
                  </li>
                </ul>
              </div>

              <!-- 挑战 -->
              <div class="glass-card ac-card challenges-card fade-in-up">
                <div class="ac-card-header">
                  <span class="ac-card-icon">⚠️</span>
                  <h3 class="ac-card-title">面临挑战</h3>
                </div>
                <ul class="ac-list">
                  <li
                    v-for="(item, i) in review.challenges"
                    :key="'c' + i"
                    class="ac-item challenge-item"
                  >
                    <span class="ac-item-icon">⚠️</span>
                    <span class="ac-item-text">{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 最大收获与最大遗憾 -->
        <section class="highlight-section">
          <div class="container">
            <div class="highlight-grid">
              <!-- 最大收获 -->
              <div class="glass-card highlight-card gain-card fade-in-up">
                <div class="highlight-icon">🏆</div>
                <div class="highlight-label">最大收获</div>
                <p class="highlight-text">{{ review.biggestGain }}</p>
              </div>

              <!-- 最大遗憾 -->
              <div class="glass-card highlight-card regret-highlight-card fade-in-up">
                <div class="highlight-icon">💭</div>
                <div class="highlight-label">最大遗憾</div>
                <p class="highlight-text">{{ review.biggestRegret }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- AI 对比分析 -->
        <section class="ai-section">
          <div class="container">
            <div class="glass-card ai-card ai-comparison-card fade-in-up">
              <div class="ai-card-header">
                <span class="ai-card-icon">🤖</span>
                <h3 class="ai-card-title">AI 推演对比</h3>
              </div>
              <p class="ai-card-text">{{ review.aiComparison }}</p>
            </div>
          </div>
        </section>

        <!-- AI 建议 -->
        <section class="ai-section">
          <div class="container">
            <div class="glass-card ai-card ai-suggestion-card fade-in-up">
              <div class="ai-card-header">
                <span class="ai-card-icon">💡</span>
                <h3 class="ai-card-title">AI 行动建议</h3>
              </div>
              <p class="ai-card-text">{{ review.aiSuggestion }}</p>
            </div>
          </div>
        </section>

        <!-- 底部操作 -->
        <section class="bottom-actions">
          <div class="container">
            <p class="disclaimer">⚠️ 以上内容由 AI 生成，仅供娱乐参考，人生没有标准答案</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getReview } from '../api'

const periods = [
  { days: 30, label: '30天复盘', icon: '🌱' },
  { days: 90, label: '90天复盘', icon: '🌿' },
  { days: 180, label: '180天复盘', icon: '🌳' }
]

const selectedDays = ref(30)
const loading = ref(false)
const review = ref(null)
const hasSimulation = ref(false)

// 当前阶段标签（用于加载提示）
const currentStageLabel = ref('30天复盘')

// 从 sessionStorage 读取的决策信息
let decision = ''
let chosenUniverse = ''

const selectPeriod = (days) => {
  if (loading.value) return
  selectedDays.value = days
  const found = periods.find(p => p.days === days)
  currentStageLabel.value = found ? found.label : '复盘'
  loadReview()
}

const loadReview = async () => {
  loading.value = true
  review.value = null
  try {
    const res = await getReview({
      decision,
      chosenUniverse,
      daysPassed: selectedDays.value
    })
    review.value = res.data
  } catch (err) {
    console.error('复盘报告加载失败：', err)
    alert('复盘报告加载失败：' + (err.message || '未知错误'))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // 从 sessionStorage 获取模拟结果
  const stored = sessionStorage.getItem('simulationResult')
  if (stored) {
    try {
      const data = JSON.parse(stored)
      decision = data.decision || ''
      chosenUniverse = data.chosenUniverse || ''
      hasSimulation.value = !!decision
    } catch (e) {
      hasSimulation.value = false
    }
  }

  if (hasSimulation.value) {
    loadReview()
  }
})
</script>

<style scoped>
.review-page {
  min-height: 100vh;
  padding-bottom: 40px;
}

/* 空状态 */
.empty-result {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
}

.empty-card {
  padding: 60px 40px;
  text-align: center;
}

.empty-icon {
  font-size: 56px;
  margin-bottom: 16px;
}

.empty-card h2 {
  font-size: 22px;
  margin-bottom: 8px;
}

.empty-card p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

/* 页面标题 */
.page-header {
  padding: 48px 0 24px;
  text-align: center;
}

.page-title {
  margin-bottom: 10px;
}

.page-subtitle {
  font-size: 15px;
  color: var(--text-secondary);
}

/* 复盘周期选择 */
.period-section {
  padding: 8px 0 32px;
}

.period-tabs {
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
}

.period-tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  background: rgba(138, 99, 255, 0.08);
  border: 1px solid var(--border-glow);
  border-radius: 24px;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: inherit;
}

.period-tab:hover:not(:disabled) {
  background: rgba(138, 99, 255, 0.15);
  color: var(--text-primary);
  transform: translateY(-2px);
}

.period-tab.active {
  background: var(--gradient-nebula);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 20px rgba(138, 99, 255, 0.4), 0 0 30px rgba(138, 99, 255, 0.2);
}

.period-tab:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.period-tab-icon {
  font-size: 18px;
}

/* 加载状态 */
.loading-section {
  padding: 40px 0;
}

.loading-card {
  padding: 60px 40px;
  text-align: center;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  margin: 0 auto 24px;
  border: 4px solid rgba(138, 99, 255, 0.2);
  border-top-color: var(--accent-purple);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.loading-subtext {
  font-size: 14px;
  color: var(--text-secondary);
}

/* 复盘阶段头部 */
.stage-section {
  padding: 8px 0 20px;
}

.stage-card {
  padding: 36px 32px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.stage-card:hover {
  transform: translateY(-4px);
}

.stage-badge {
  display: inline-block;
  padding: 6px 18px;
  background: rgba(138, 99, 255, 0.15);
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-pill);
  font-size: 14px;
  color: var(--accent-purple);
  margin-bottom: 16px;
  font-weight: 600;
}

.stage-label {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 14px;
  letter-spacing: 1px;
  background: var(--gradient-nebula);
  background-size: 200% auto;
  animation: gradient-shift 4s ease infinite;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stage-focus {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: rgba(74, 158, 255, 0.1);
  border: 1px solid rgba(74, 158, 255, 0.2);
  border-radius: var(--radius-pill);
  font-size: 14px;
  color: var(--accent-blue);
}

.focus-icon {
  font-size: 16px;
}

/* 满意度与后悔指数 */
.scores-section {
  padding: 12px 0;
}

.scores-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.score-card {
  padding: 26px 28px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.score-card:hover {
  transform: translateY(-4px);
}

.score-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.score-icon {
  font-size: 24px;
}

.score-name {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.5px;
}

.score-body {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.score-bar-wrapper {
  flex: 1;
  height: 12px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  overflow: hidden;
}

.score-bar {
  height: 100%;
  border-radius: 6px;
  transition: width 0.8s ease;
}

.satisfaction-bar {
  background: linear-gradient(90deg, var(--accent-green), #22c55e);
  box-shadow: 0 0 16px rgba(74, 222, 128, 0.6), 0 0 30px rgba(74, 222, 128, 0.25);
}

.regret-bar {
  background: linear-gradient(90deg, var(--accent-orange), #ef4444);
  box-shadow: 0 0 16px rgba(255, 165, 0, 0.6), 0 0 30px rgba(255, 165, 0, 0.25);
}

.score-value {
  display: flex;
  align-items: baseline;
  gap: 2px;
  flex-shrink: 0;
  min-width: 64px;
  justify-content: flex-end;
}

.score-num {
  font-size: 30px;
  font-weight: 800;
  line-height: 1;
}

.satisfaction-value .score-num {
  color: var(--accent-green);
}

.regret-value .score-num {
  color: var(--accent-orange);
}

.score-unit {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
}

.score-hint {
  font-size: 13px;
  color: var(--text-muted);
}

/* 执行状态 */
.execution-section {
  padding: 12px 0;
}

.execution-card {
  padding: 24px 28px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.execution-card:hover {
  transform: translateY(-4px);
}

.execution-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.execution-icon {
  font-size: 22px;
}

.execution-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.5px;
}

.execution-text {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-primary);
  padding: 14px 18px;
  background: rgba(74, 158, 255, 0.08);
  border-left: 3px solid var(--accent-blue);
  border-radius: 8px;
}

/* 成就与挑战 */
.ac-section {
  padding: 12px 0;
}

.ac-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.ac-card {
  padding: 26px 28px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.ac-card:hover {
  transform: translateY(-4px);
}

.ac-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-glow);
}

.ac-card-icon {
  font-size: 22px;
}

.ac-card-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.5px;
}

.achievements-card .ac-card-header {
  border-bottom-color: rgba(74, 222, 128, 0.2);
}

.challenges-card .ac-card-header {
  border-bottom-color: rgba(255, 165, 0, 0.2);
}

.ac-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.ac-item {
  display: flex;
  gap: 10px;
  font-size: 14px;
  line-height: 1.6;
}

.ac-item-icon {
  flex-shrink: 0;
  font-size: 16px;
}

.achievement-item .ac-item-text {
  color: var(--text-primary);
}

.challenge-item .ac-item-text {
  color: var(--text-primary);
}

.achievements-card {
  border-color: rgba(74, 222, 128, 0.2);
}

.challenges-card {
  border-color: rgba(255, 165, 0, 0.2);
}

/* 最大收获与最大遗憾 */
.highlight-section {
  padding: 12px 0;
}

.highlight-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.highlight-card {
  padding: 30px 28px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.highlight-card:hover {
  transform: translateY(-4px);
}

.gain-card {
  border-color: rgba(74, 222, 128, 0.3);
  background: linear-gradient(135deg, rgba(74, 222, 128, 0.08), var(--bg-card));
  box-shadow: 0 0 24px rgba(74, 222, 128, 0.12);
}

.regret-highlight-card {
  border-color: rgba(255, 107, 157, 0.3);
  background: linear-gradient(135deg, rgba(255, 107, 157, 0.08), var(--bg-card));
  box-shadow: 0 0 24px rgba(255, 107, 157, 0.12);
}

.highlight-icon {
  font-size: 40px;
  margin-bottom: 14px;
}

.highlight-label {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 14px;
  text-transform: uppercase;
}

.gain-card .highlight-label {
  color: var(--accent-green);
}

.regret-highlight-card .highlight-label {
  color: var(--accent-pink, #ff6b9d);
}

.highlight-text {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-primary);
}

/* AI 区块 */
.ai-section {
  padding: 12px 0;
}

.ai-card {
  padding: 28px 32px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.ai-card:hover {
  transform: translateY(-4px);
}

.ai-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.ai-card-icon {
  font-size: 24px;
}

.ai-card-title {
  font-size: 19px;
  font-weight: 700;
  color: var(--text-primary);
}

.ai-comparison-card {
  border-color: rgba(138, 99, 255, 0.25);
  background: linear-gradient(135deg, rgba(138, 99, 255, 0.06), var(--bg-card));
}

.ai-suggestion-card {
  border-color: rgba(255, 165, 0, 0.25);
  background: linear-gradient(135deg, rgba(255, 165, 0, 0.06), var(--bg-card));
}

.ai-card-text {
  font-size: 15px;
  line-height: 1.85;
  color: var(--text-primary);
  white-space: pre-line;
}

/* 底部 */
.bottom-actions {
  padding: 32px 0 8px;
  text-align: center;
}

.disclaimer {
  font-size: 13px;
  color: var(--text-muted);
}

/* 响应式 */
@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }

  .stage-label {
    font-size: 22px;
  }

  .scores-grid,
  .ac-grid,
  .highlight-grid {
    grid-template-columns: 1fr;
  }

  .period-tabs {
    gap: 10px;
  }

  .period-tab {
    padding: 10px 20px;
    font-size: 14px;
  }

  .score-card,
  .ac-card,
  .highlight-card,
  .ai-card,
  .execution-card,
  .stage-card {
    padding: 22px 20px;
  }

  .score-num {
    font-size: 26px;
  }

  .nav-btn {
    padding: 6px 14px;
    font-size: 13px;
  }
}
</style>
