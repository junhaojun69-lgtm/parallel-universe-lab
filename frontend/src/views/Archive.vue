<template>
  <div class="archive-page">
    <!-- Navbar -->
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

    <!-- Loading -->
    <div v-if="loading" class="loading-wrap">
      <div class="loader-orbit"></div>
      <p class="loading-text">正在加载你的平行决策档案...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="error-wrap glass-card">
      <p class="error-text">⚠️ {{ error }}</p>
    </div>

    <!-- Content -->
    <div v-else class="archive-content">
      <!-- Header -->
      <header class="page-header fade-in-up">
        <h1 class="page-title">我的决策档案</h1>
        <p class="page-subtitle">回望每一个平行宇宙中的自己，记录每一次选择的回响</p>
      </header>

      <!-- Stats Summary -->
      <section class="stats-row fade-in-up" v-if="stats">
        <div class="stat-card glass-card">
          <div class="stat-icon">🗂️</div>
          <div class="stat-value">{{ stats.totalDecisions }}</div>
          <div class="stat-label">决策总数</div>
        </div>
        <div class="stat-card glass-card">
          <div class="stat-icon">✅</div>
          <div class="stat-value">{{ stats.completedReviews }}</div>
          <div class="stat-label">已复盘</div>
        </div>
        <div class="stat-card glass-card">
          <div class="stat-icon">😊</div>
          <div class="stat-value">{{ stats.avgSatisfaction?.toFixed(1) }}</div>
          <div class="stat-label">平均满意度</div>
        </div>
        <div class="stat-card glass-card">
          <div class="stat-icon">💔</div>
          <div class="stat-value">{{ stats.avgRegret?.toFixed(1) }}</div>
          <div class="stat-label">平均遗憾度</div>
        </div>
      </section>

      <!-- Universe Distribution -->
      <section class="universe-distribution glass-card fade-in-up" v-if="stats?.universeDistribution?.length">
        <h2 class="section-title">🌌 平行宇宙分布</h2>
        <div class="universe-dots">
          <div
            v-for="uni in stats.universeDistribution"
            :key="uni.name"
            class="universe-dot-item"
          >
            <span class="universe-dot" :style="{ background: uni.color, boxShadow: `0 0 12px ${uni.color}` }"></span>
            <span class="universe-name">{{ uni.name }}</span>
            <span class="universe-count">{{ uni.count }}</span>
          </div>
        </div>
      </section>

      <!-- Timeline -->
      <section class="timeline-section fade-in-up">
        <h2 class="section-title">⏳ 决策时间线</h2>
        <div class="timeline">
          <div
            v-for="(item, index) in timeline"
            :key="item.id"
            class="timeline-item"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="timeline-marker">
              <span class="timeline-dot" :style="{ borderColor: item.color }">{{ item.icon }}</span>
            </div>
            <div class="timeline-card glass-card">
              <div class="timeline-card-header">
                <span class="timeline-date">{{ formatDotDate(item.date) }}</span>
                <span class="type-tag">{{ item.type }}</span>
              </div>

              <h3 class="decision-text">{{ item.decision }}</h3>

              <div class="badges-row">
                <span class="universe-badge" :style="{ background: item.color + '22', color: item.color, borderColor: item.color }">
                  <span class="universe-badge-label">{{ item.chosenLabel }}</span>
                  {{ item.chosenUniverse }}
                </span>
                <span class="status-badge" :class="statusClass(item.status)">{{ item.status }}</span>
              </div>

              <!-- Scores (if reviewed) -->
              <div class="scores-block" v-if="item.reviewCompleted">
                <div class="score-row">
                  <span class="score-label">满意度</span>
                  <div class="score-bar-wrap">
                    <div class="score-bar satisfaction-bar" :style="{ width: (item.satisfaction / 10) * 100 + '%' }"></div>
                  </div>
                  <span class="score-value">{{ item.satisfaction }}/10</span>
                </div>
                <div class="score-row">
                  <span class="score-label">遗憾度</span>
                  <div class="score-bar-wrap">
                    <div class="score-bar regret-bar" :style="{ width: (item.regret / 10) * 100 + '%' }"></div>
                  </div>
                  <span class="score-value">{{ item.regret }}/10</span>
                </div>
              </div>

              <p class="outcome-text">
                <span class="outcome-label">结果：</span>{{ item.outcome }}
              </p>

              <div class="review-date" v-if="item.reviewCompleted">
                <span>📅 复盘于 {{ formatDotDate(item.reviewDate) }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- AI Insights -->
      <section class="insights-card glass-card fade-in-up" v-if="insights">
        <div class="insights-header">
          <span class="insights-icon">🤖</span>
          <h2 class="section-title">AI 决策洞察</h2>
        </div>
        <p class="insights-text">{{ insights }}</p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getArchive } from '../api'

const timeline = ref([])
const stats = ref(null)
const insights = ref('')
const loading = ref(true)
const error = ref('')

const formatDotDate = (dateStr) => {
  if (!dateStr) return ''
  return dateStr.replace('-', '.')
}

const statusClass = (status) => {
  if (status === '已复盘') return 'status-reviewed'
  if (status === '进行中') return 'status-progress'
  return 'status-pending'
}

onMounted(async () => {
  try {
    loading.value = true
    const res = await getArchive()
    const data = res.data || res
    timeline.value = data.timeline || []
    stats.value = data.stats || null
    insights.value = data.insights || ''
  } catch (e) {
    error.value = e?.message || '加载档案失败，请稍后再试'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.archive-page {
  min-height: 100vh;
  color: var(--text-primary, #e8e8f5);
  padding-bottom: 60px;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

/* Glass card */
.glass-card {
  background: var(--bg-card, rgba(20, 20, 40, 0.6));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-glow, rgba(138, 99, 255, 0.2));
  border-radius: 16px;
}

/* Loading */
.loading-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 20px;
  gap: 24px;
}

.loader-orbit {
  width: 56px;
  height: 56px;
  border: 3px solid rgba(138, 99, 255, 0.2);
  border-top-color: var(--accent-purple, #8a63ff);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  color: var(--text-secondary, #a0a0c0);
  font-size: 15px;
}

/* Error */
.error-wrap {
  max-width: 600px;
  margin: 80px auto;
  padding: 32px;
  text-align: center;
}

.error-text {
  color: var(--accent-pink, #ff63b3);
  font-size: 16px;
}

/* Content */
.archive-content {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 24px 60px;
}

/* Page header */
.page-header {
  text-align: center;
  padding: 48px 20px 32px;
}

.page-subtitle {
  color: var(--text-secondary, #a0a0c0);
  font-size: 15px;
  margin: 0;
}

/* Stats row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  padding: 24px 16px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.stat-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-card-hover, 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(138, 99, 255, 0.2), 0 0 30px rgba(138, 99, 255, 0.15));
}

.stat-icon {
  font-size: 26px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 30px;
  font-weight: 700;
  color: var(--text-primary, #e8e8f5);
  line-height: 1.2;
  letter-spacing: 0.5px;
}

.stat-label {
  font-size: 13px;
  color: var(--text-secondary, #a0a0c0);
  margin-top: 6px;
}

/* Section title */
.section-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 20px;
  color: var(--text-primary, #e8e8f5);
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 50px;
  height: 3px;
  background: var(--gradient-nebula, linear-gradient(135deg, #8a63ff, #63b3ff, #ff63b3));
  border-radius: 2px;
  margin: 10px 0 0;
}

/* Universe distribution */
.universe-distribution {
  padding: 24px 28px;
  margin-bottom: 32px;
}

.universe-dots {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.universe-dot-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s ease;
}

.universe-dot-item:hover {
  transform: translateY(-2px);
  background: rgba(138, 99, 255, 0.1);
  border-color: var(--border-glow, rgba(138, 99, 255, 0.25));
}

.universe-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.universe-name {
  font-size: 14px;
  color: var(--text-primary, #e8e8f5);
}

.universe-count {
  font-size: 13px;
  font-weight: 700;
  color: var(--accent-blue, #63b3ff);
  background: rgba(99, 179, 255, 0.12);
  padding: 1px 10px;
  border-radius: 10px;
}

/* Timeline */
.timeline-section {
  margin-bottom: 32px;
}

.timeline {
  position: relative;
  padding-left: 8px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 27px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: linear-gradient(
    to bottom,
    var(--accent-purple, #8a63ff),
    var(--accent-blue, #63b3ff),
    var(--accent-pink, #ff63b3)
  );
  opacity: 0.4;
}

.timeline-item {
  position: relative;
  display: flex;
  gap: 24px;
  margin-bottom: 28px;
  animation: fade-in-up 0.6s ease both;
}

.timeline-marker {
  flex-shrink: 0;
  width: 56px;
  display: flex;
  justify-content: center;
  z-index: 2;
}

.timeline-dot {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-deep, #0a0a1a);
  border: 2px solid var(--accent-purple, #8a63ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: 0 0 16px rgba(138, 99, 255, 0.4);
  transition: transform 0.3s ease;
}

.timeline-dot:hover {
  transform: scale(1.15);
}

.timeline-card {
  flex: 1;
  padding: 22px 24px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.timeline-card:hover {
  transform: translateX(6px);
  box-shadow: var(--shadow-card-hover, 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(138, 99, 255, 0.2), 0 0 30px rgba(138, 99, 255, 0.15));
}

.timeline-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.timeline-date {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent-blue, #63b3ff);
  letter-spacing: 0.5px;
}

.type-tag {
  font-size: 12px;
  padding: 3px 12px;
  border-radius: 12px;
  background: rgba(138, 99, 255, 0.15);
  color: var(--accent-purple, #8a63ff);
  border: 1px solid rgba(138, 99, 255, 0.3);
}

.decision-text {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 14px;
  color: var(--text-primary, #e8e8f5);
}

.badges-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.universe-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid;
  font-weight: 500;
}

.universe-badge-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: currentColor;
  color: var(--bg-deep, #0a0a1a);
  font-size: 11px;
  font-weight: 700;
}

.universe-badge-label::after {
  content: attr(data-label);
}

.status-badge {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 500;
}

.status-reviewed {
  background: rgba(72, 199, 142, 0.15);
  color: var(--accent-green, #48c78e);
  border: 1px solid rgba(72, 199, 142, 0.3);
}

.status-progress {
  background: rgba(99, 179, 255, 0.15);
  color: var(--accent-blue, #63b3ff);
  border: 1px solid rgba(99, 179, 255, 0.3);
}

.status-pending {
  background: rgba(160, 160, 192, 0.12);
  color: var(--text-secondary, #a0a0c0);
  border: 1px solid rgba(160, 160, 192, 0.25);
}

/* Scores */
.scores-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.score-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.score-label {
  font-size: 13px;
  color: var(--text-secondary, #a0a0c0);
  width: 56px;
  flex-shrink: 0;
}

.score-bar-wrap {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  overflow: hidden;
}

.score-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.satisfaction-bar {
  background: linear-gradient(90deg, var(--accent-green, #48c78e), #5fd9a5);
  box-shadow: 0 0 8px rgba(72, 199, 142, 0.5);
}

.regret-bar {
  background: linear-gradient(90deg, var(--accent-pink, #ff63b3), #ff8fbf);
  box-shadow: 0 0 8px rgba(255, 99, 179, 0.5);
}

.score-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary, #e8e8f5);
  width: 48px;
  text-align: right;
  flex-shrink: 0;
}

/* Outcome */
.outcome-text {
  font-size: 14px;
  color: var(--text-secondary, #a0a0c0);
  margin: 0 0 12px;
  line-height: 1.6;
}

.outcome-label {
  color: var(--text-primary, #e8e8f5);
  font-weight: 600;
}

.review-date {
  font-size: 12px;
  color: var(--accent-green, #48c78e);
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

/* Insights */
.insights-card {
  padding: 28px 32px;
  margin-bottom: 20px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.insights-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card-hover, 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(138, 99, 255, 0.2), 0 0 30px rgba(138, 99, 255, 0.15));
}

.insights-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.insights-icon {
  font-size: 24px;
}

.insights-header .section-title {
  margin: 0;
}

.insights-text {
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-secondary, #a0a0c0);
  margin: 0;
  padding: 16px 20px;
  background: rgba(138, 99, 255, 0.06);
  border-left: 3px solid var(--accent-purple, #8a63ff);
  border-radius: 8px;
  letter-spacing: 0.3px;
}

/* Animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fade-in-up 0.6s ease both;
}

/* Responsive */
@media (max-width: 768px) {
  .archive-content {
    padding: 40px 16px 60px;
  }

  .stats-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .stat-value {
    font-size: 24px;
  }

  .timeline-item {
    gap: 14px;
  }

  .timeline::before {
    left: 19px;
  }

  .timeline-marker {
    width: 40px;
  }

  .timeline-dot {
    width: 32px;
    height: 32px;
    font-size: 15px;
  }

  .timeline-card {
    padding: 18px;
  }

  .decision-text {
    font-size: 16px;
  }

  .insights-card {
    padding: 22px;
  }
}
</style>
