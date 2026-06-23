<template>
  <div class="universe-card glass-card" :class="{ 'is-best': isBest }">
    <!-- 卡片头部 -->
    <div class="card-header" :style="{ background: universe.theme.gradient }">
      <div class="card-badge">{{ universe.label }}</div>
      <div class="card-title-area">
        <h3 class="card-title">{{ universe.title }}</h3>
        <p class="card-subtitle">{{ universe.subtitle }}</p>
      </div>
      <div v-if="isBest" class="best-tag">推荐</div>
    </div>

    <!-- 卡片内容 -->
    <div class="card-body">
      <!-- 指标网格 -->
      <div class="metrics-grid">
        <div class="metric-item">
          <div class="metric-icon">💰</div>
          <div class="metric-info">
            <div class="metric-label">收入变化</div>
            <div class="metric-value" :class="incomeClass">
              {{ universe.incomeChange }}
            </div>
          </div>
        </div>
        <div class="metric-item">
          <div class="metric-icon">⚠️</div>
          <div class="metric-info">
            <div class="metric-label">风险指数</div>
            <div class="metric-value">
              <span class="risk-bar">
                <span class="risk-fill" :style="{ width: universe.risk + '%', background: riskColor }"></span>
              </span>
              <span class="risk-text">{{ universe.risk }}/100</span>
            </div>
          </div>
        </div>
        <div class="metric-item">
          <div class="metric-icon">😊</div>
          <div class="metric-info">
            <div class="metric-label">幸福指数</div>
            <div class="metric-value">
              <span class="score-bar">
                <span class="score-fill" :style="{ width: universe.happiness + '%' }"></span>
              </span>
              <span class="score-text">{{ universe.happiness }}/100</span>
            </div>
          </div>
        </div>
        <div class="metric-item">
          <div class="metric-icon">📈</div>
          <div class="metric-info">
            <div class="metric-label">成长指数</div>
            <div class="metric-value">
              <span class="score-bar">
                <span class="score-fill score-growth" :style="{ width: universe.growth + '%' }"></span>
              </span>
              <span class="score-text">{{ universe.growth }}/100</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 时间线 -->
      <div class="timeline">
        <div class="timeline-title">未来轨迹</div>
        <div class="timeline-items">
          <div class="timeline-item" v-for="(item, i) in universe.timeline" :key="i">
            <div class="timeline-dot" :style="{ background: universe.theme.gradient }"></div>
            <div class="timeline-content">
              <span class="timeline-year">{{ item.year }}</span>
              <span class="timeline-event">{{ item.event }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 建议 -->
      <div class="advice">
        <div class="advice-icon">💡</div>
        <div class="advice-content">
          <div class="advice-label">AI 建议</div>
          <p class="advice-text">{{ universe.advice }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  universe: {
    type: Object,
    required: true
  },
  isBest: {
    type: Boolean,
    default: false
  }
})

const incomeClass = computed(() => {
  const change = props.universe.incomeChange || ''
  if (change.startsWith('+')) return 'positive'
  if (change.startsWith('-')) return 'negative'
  return 'neutral'
})

const riskColor = computed(() => {
  const risk = props.universe.risk || 0
  if (risk < 30) return 'linear-gradient(90deg, #4ade80, #4ade80)'
  if (risk < 60) return 'linear-gradient(90deg, #ffa500, #ffa500)'
  return 'linear-gradient(90deg, #ff6b6b, #ff6b6b)'
})
</script>

<style scoped>
.universe-card {
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.universe-card:hover {
  transform: translateY(-6px);
}

.universe-card.is-best {
  border-color: rgba(74, 222, 128, 0.4);
  box-shadow: 0 0 30px rgba(74, 222, 128, 0.15), var(--shadow-card);
}

.universe-card.is-best:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 40px rgba(74, 222, 128, 0.2);
}

/* 卡片头部 */
.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 22px 24px;
  position: relative;
}

.card-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
}

.card-badge {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 800;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 0 12px rgba(255, 255, 255, 0.1);
}

.card-title-area {
  flex: 1;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 2px;
  letter-spacing: 0.3px;
}

.card-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
}

.best-tag {
  padding: 5px 14px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-pill);
  font-size: 12px;
  font-weight: 600;
  color: white;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 卡片内容 */
.card-body {
  padding: 24px;
}

/* 指标网格 */
.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

.metric-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  transition: background 0.3s ease;
}

.metric-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.metric-icon {
  font-size: 20px;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.metric-info {
  flex: 1;
  min-width: 0;
}

.metric-label {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 4px;
  letter-spacing: 0.3px;
}

.metric-value {
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.metric-value.positive {
  color: var(--accent-green);
}

.metric-value.negative {
  color: #ff6b6b;
}

.metric-value.neutral {
  color: var(--text-primary);
}

/* 进度条 */
.risk-bar,
.score-bar {
  display: inline-block;
  width: 60px;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.risk-fill,
.score-fill {
  display: block;
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s ease;
}

.score-fill {
  background: linear-gradient(90deg, #8a63ff, #4a9eff);
}

.score-growth {
  background: linear-gradient(90deg, #4ade80, #00e5ff);
}

.risk-text,
.score-text {
  font-size: 13px;
  color: var(--text-secondary);
}

/* 时间线 */
.timeline {
  margin-bottom: 24px;
}

.timeline-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.timeline-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 4px;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 4px;
  flex-shrink: 0;
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.timeline-year {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent-purple);
}

.timeline-event {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.5;
}

/* 建议 */
.advice {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: rgba(138, 99, 255, 0.08);
  border-radius: 12px;
  border: 1px solid rgba(138, 99, 255, 0.15);
}

.advice-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.advice-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent-purple);
  margin-bottom: 4px;
}

.advice-text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-primary);
}
</style>
