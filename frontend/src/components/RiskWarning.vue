<template>
  <div class="risk-warning">
    <!-- 标题区域 -->
    <div class="rw-header">
      <div class="header-left">
        <span class="rw-icon">🛡️</span>
        <div class="header-titles">
          <h3 class="rw-title">人生风险预警</h3>
          <p class="rw-subtitle">提前洞察未来可能后悔的点与潜在风险</p>
        </div>
      </div>
      <div class="header-right" v-if="riskCount">
        <span class="risk-count">{{ riskCount }} 项预警</span>
      </div>
    </div>

    <!-- 风险类别卡片 -->
    <div class="risk-cards" v-if="risks.length">
      <div
        v-for="(risk, index) in risks"
        :key="risk.id"
        class="risk-card glass-card fade-in-up"
        :style="{
          '--card-delay': index * 0.15 + 's',
          '--level-color': risk.color || levelColor(risk.level),
          animationDelay: index * 0.15 + 's'
        }"
      >
        <!-- 左侧彩色边条 -->
        <div class="level-bar" :style="{ background: risk.color || levelColor(risk.level) }"></div>

        <div class="risk-card-body">
          <!-- 卡片头部 -->
          <div class="risk-card-header">
            <div class="risk-card-title-area">
              <span class="risk-card-icon">{{ risk.icon }}</span>
              <div class="risk-card-titles">
                <h4 class="risk-card-title">{{ risk.title }}</h4>
                <span
                  class="level-badge"
                  :class="'level-' + risk.level"
                  :style="{ borderColor: risk.color || levelColor(risk.level), color: risk.color || levelColor(risk.level) }"
                >
                  {{ risk.levelText || levelText(risk.level) }}
                </span>
              </div>
            </div>
          </div>

          <!-- 风险项列表 -->
          <div class="risk-items">
            <div
              v-for="(item, i) in risk.items"
              :key="i"
              class="risk-item"
              :style="{ animationDelay: index * 0.15 + i * 0.08 + 0.2 + 's' }"
            >
              <div class="risk-item-top">
                <span class="time-tag">
                  <span class="time-icon">⏳</span>
                  {{ item.time }}
                </span>
                <span class="severity-value" :style="{ color: severityColor(item.severity) }">
                  {{ item.severity }}
                </span>
              </div>
              <p class="risk-desc">{{ item.risk }}</p>
              <div class="severity-bar">
                <div
                  class="severity-fill"
                  :style="{
                    width: item.severity + '%',
                    background: severityGradient(item.severity)
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div class="empty-state" v-else-if="!loading">
      <span class="empty-icon">🔍</span>
      <p class="empty-text">暂无风险预警数据</p>
    </div>

    <!-- 综合分析总结 -->
    <div class="summary-box fade-in-up" v-if="summary" :style="{ animationDelay: risks.length * 0.15 + 0.2 + 's' }">
      <div class="summary-icon">📊</div>
      <div class="summary-content">
        <div class="summary-label">综合分析</div>
        <p class="summary-text">{{ summary }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const risks = computed(() => props.data?.risks || [])
const summary = computed(() => props.data?.summary || '')
const riskCount = computed(() => {
  return risks.value.reduce((sum, r) => sum + (r.items?.length || 0), 0)
})

// 根据等级返回颜色
const levelColor = (level) => {
  const map = {
    high: '#ff6b6b',
    medium: '#ffa500',
    low: '#4ade80'
  }
  return map[level] || '#8a63ff'
}

// 根据等级返回文字
const levelText = (level) => {
  const map = {
    high: '高风险',
    medium: '中风险',
    low: '低风险'
  }
  return map[level] || '风险'
}

// 严重程度颜色：0-40 绿色，40-70 橙色，70-100 红色
const severityColor = (severity) => {
  if (severity < 40) return '#4ade80'
  if (severity < 70) return '#ffa500'
  return '#ff6b6b'
}

// 严重程度渐变
const severityGradient = (severity) => {
  if (severity < 40) {
    return 'linear-gradient(90deg, #4ade80, #22c55e)'
  }
  if (severity < 70) {
    return 'linear-gradient(90deg, #ffa500, #ff8c00)'
  }
  return 'linear-gradient(90deg, #ff6b6b, #ef4444)'
}
</script>

<style scoped>
.risk-warning {
  --rw-bg: #0a0a1a;
  --rw-card-bg: rgba(20, 20, 45, 0.6);
  --rw-text-primary: #e8e8f5;
  --rw-text-secondary: #9999bb;
  --rw-text-muted: #6a6a8a;
  --rw-purple: #8a63ff;
  --rw-blue: #4a9eff;
  --rw-pink: #ff6b9d;
  --rw-green: #4ade80;
  --rw-orange: #ffa500;
  --rw-red: #ff6b6b;
  width: 100%;
}

/* ===== 标题区域 ===== */
.rw-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.rw-icon {
  font-size: 30px;
  filter: drop-shadow(0 0 8px rgba(138, 99, 255, 0.5));
}

.header-titles {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rw-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--rw-text-primary);
  letter-spacing: 0.5px;
}

.rw-subtitle {
  font-size: 13px;
  color: var(--rw-text-secondary);
}

.risk-count {
  padding: 6px 14px;
  background: rgba(255, 107, 107, 0.12);
  border: 1px solid rgba(255, 107, 107, 0.25);
  border-radius: var(--radius-pill);
  font-size: 13px;
  color: var(--rw-red);
  font-weight: 600;
  white-space: nowrap;
}

/* ===== 风险卡片 ===== */
.risk-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.risk-card {
  display: flex;
  overflow: hidden;
  opacity: 0;
  position: relative;
}

.risk-card:hover {
  transform: translateY(-3px);
}

/* 左侧彩色边条 */
.level-bar {
  width: 5px;
  flex-shrink: 0;
  box-shadow: 0 0 12px var(--level-color);
}

.risk-card-body {
  flex: 1;
  padding: 22px 24px;
  min-width: 0;
}

/* 卡片头部 */
.risk-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.risk-card-title-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.risk-card-icon {
  font-size: 26px;
  flex-shrink: 0;
}

.risk-card-titles {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.risk-card-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--rw-text-primary);
}

.level-badge {
  padding: 3px 10px;
  border: 1px solid;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.04);
}

.level-badge.level-high {
  background: rgba(255, 107, 107, 0.1);
}
.level-badge.level-medium {
  background: rgba(255, 165, 0, 0.1);
}
.level-badge.level-low {
  background: rgba(74, 222, 128, 0.1);
}

/* ===== 风险项 ===== */
.risk-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.risk-item {
  padding: 14px 16px;
  background: rgba(10, 10, 26, 0.5);
  border: 1px solid rgba(138, 99, 255, 0.12);
  border-radius: 12px;
  transition: all 0.3s ease;
  opacity: 0;
  animation: fadeInUp 0.5s ease forwards;
}

.risk-item:hover {
  background: rgba(10, 10, 26, 0.7);
  border-color: rgba(138, 99, 255, 0.25);
}

.risk-item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.time-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  background: rgba(138, 99, 255, 0.12);
  border: 1px solid rgba(138, 99, 255, 0.2);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--rw-purple);
}

.time-icon {
  font-size: 11px;
}

.severity-value {
  font-size: 18px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.risk-desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--rw-text-primary);
  margin-bottom: 10px;
}

/* 严重程度进度条 */
.severity-bar {
  width: 100%;
  height: 7px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  overflow: hidden;
}

.severity-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 8px currentColor;
}

/* ===== 空状态 ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 40px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.empty-text {
  font-size: 14px;
  color: var(--rw-text-muted);
}

/* ===== 综合分析总结 ===== */
.summary-box {
  display: flex;
  gap: 16px;
  margin-top: 24px;
  padding: 22px 24px;
  background: linear-gradient(135deg, rgba(138, 99, 255, 0.12) 0%, rgba(74, 158, 255, 0.08) 100%);
  border: 1px solid rgba(138, 99, 255, 0.3);
  border-radius: 16px;
  opacity: 0;
  position: relative;
  overflow: hidden;
}

.summary-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--rw-purple), var(--rw-blue), var(--rw-pink));
}

.summary-icon {
  font-size: 28px;
  flex-shrink: 0;
  filter: drop-shadow(0 0 6px rgba(138, 99, 255, 0.5));
}

.summary-content {
  flex: 1;
  min-width: 0;
}

.summary-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--rw-purple);
  margin-bottom: 6px;
  letter-spacing: 0.5px;
}

.summary-text {
  font-size: 14px;
  line-height: 1.7;
  color: var(--rw-text-primary);
}

/* ===== 动画 ===== */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease forwards;
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .rw-title {
    font-size: 19px;
  }

  .rw-subtitle {
    font-size: 12px;
  }

  .risk-card-body {
    padding: 18px 16px;
  }

  .risk-card-title {
    font-size: 15px;
  }

  .risk-item {
    padding: 12px 14px;
  }

  .risk-desc {
    font-size: 13px;
  }

  .severity-value {
    font-size: 16px;
  }

  .summary-box {
    padding: 18px 16px;
  }

  .summary-text {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .header-left {
    gap: 10px;
  }

  .rw-icon {
    font-size: 26px;
  }

  .risk-card-titles {
    gap: 8px;
  }
}
</style>
