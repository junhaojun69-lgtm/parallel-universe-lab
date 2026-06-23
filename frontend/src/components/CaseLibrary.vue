<template>
  <div class="case-library">
    <div class="library-header">
      <h3 class="chart-title">📚 AI真实案例库</h3>
      <p class="library-subtitle">基于真实用户数据，为你匹配相似案例与规律分析</p>
    </div>

    <!-- Tab 切换 -->
    <div class="case-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="case-tab"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- 相似案例 -->
    <div v-if="activeTab === 'similar'" class="tab-content">
      <div
        class="glass-card case-card fade-in-up"
        v-for="(item, i) in data.similarCases"
        :key="item.id"
        :style="{ animationDelay: `${i * 0.1}s` }"
      >
        <div class="case-card-header">
          <div class="case-avatar">{{ item.avatar }}</div>
          <div class="case-info">
            <div class="case-name">{{ item.name }} · {{ item.age }}岁</div>
            <div class="case-meta">{{ item.city }} · {{ item.career }}</div>
          </div>
          <div class="similarity-badge">
            <div class="similarity-ring" :style="{ '--p': item.similarity }">
              <span>{{ item.similarity }}%</span>
            </div>
            <span class="similarity-label">相似度</span>
          </div>
        </div>
        <div class="case-body">
          <div class="case-tags">
            <span class="case-tag" :class="item.outcome === '成功' ? 'tag-success' : 'tag-fail'">{{ item.outcome }}</span>
            <span class="case-tag tag-universe">{{ item.chosen }}</span>
          </div>
          <div class="case-income">
            <div class="income-item">
              <span class="income-label">转型前</span>
              <span class="income-value">¥{{ formatMoney(item.incomeBefore) }}</span>
            </div>
            <div class="income-arrow">→</div>
            <div class="income-item">
              <span class="income-label">转型后</span>
              <span class="income-value highlight">¥{{ formatMoney(item.incomeAfter) }}</span>
            </div>
          </div>
          <div class="case-timeline">
            <span class="timeline-icon">⏱️</span>
            {{ item.timeline }}
          </div>
          <p class="case-summary">{{ item.summary }}</p>
        </div>
      </div>
    </div>

    <!-- 成功案例 -->
    <div v-if="activeTab === 'success'" class="tab-content">
      <div
        class="glass-card success-card fade-in-up"
        v-for="(item, i) in data.successCases"
        :key="item.id"
        :style="{ animationDelay: `${i * 0.1}s` }"
      >
        <div class="success-header">
          <div class="case-avatar">{{ item.avatar }}</div>
          <div>
            <div class="case-name">{{ item.name }}</div>
            <div class="case-meta">{{ item.background }}</div>
          </div>
          <div class="growth-badge">+{{ item.incomeGrowth }}</div>
        </div>
        <div class="success-body">
          <div class="success-row">
            <span class="success-label">策略</span>
            <span class="success-text">{{ item.strategy }}</span>
          </div>
          <div class="success-row">
            <span class="success-label">关键因素</span>
            <span class="success-text">{{ item.keyFactor }}</span>
          </div>
          <div class="success-advice">
            <span class="advice-icon">💡</span>
            {{ item.advice }}
          </div>
        </div>
      </div>
    </div>

    <!-- 失败案例 -->
    <div v-if="activeTab === 'failure'" class="tab-content">
      <div
        class="glass-card failure-card fade-in-up"
        v-for="(item, i) in data.failureCases"
        :key="item.id"
        :style="{ animationDelay: `${i * 0.1}s` }"
      >
        <div class="failure-header">
          <div class="case-avatar">{{ item.avatar }}</div>
          <div>
            <div class="case-name">{{ item.name }}</div>
            <div class="case-meta">{{ item.background }}</div>
          </div>
        </div>
        <div class="failure-body">
          <div class="failure-row">
            <span class="failure-label">策略</span>
            <span class="failure-text">{{ item.strategy }}</span>
          </div>
          <div class="failure-row">
            <span class="failure-label">失败原因</span>
            <span class="failure-text danger">{{ item.failureReason }}</span>
          </div>
          <div class="failure-row">
            <span class="failure-label">损失</span>
            <span class="failure-text">{{ item.loss }}</span>
          </div>
          <div class="failure-lesson">
            <span class="lesson-icon">📝</span>
            {{ item.lesson }}
          </div>
        </div>
      </div>
    </div>

    <!-- AI规律 -->
    <div v-if="activeTab === 'patterns'" class="tab-content">
      <div class="patterns-section">
        <div class="pattern-group">
          <h4 class="pattern-group-title success">✅ 成功规律</h4>
          <div
            class="glass-card pattern-card fade-in-up"
            v-for="(p, i) in data.patterns.successPatterns"
            :key="'s' + i"
            :style="{ animationDelay: `${i * 0.1}s` }"
          >
            <div class="pattern-header">
              <span class="pattern-name">{{ p.pattern }}</span>
              <span class="pattern-freq">{{ p.frequency }}%</span>
            </div>
            <div class="pattern-bar-wrapper">
              <div class="pattern-bar pattern-bar-success" :style="{ width: p.frequency + '%' }"></div>
            </div>
            <p class="pattern-desc">{{ p.description }}</p>
          </div>
        </div>

        <div class="pattern-group">
          <h4 class="pattern-group-title danger">❌ 失败规律</h4>
          <div
            class="glass-card pattern-card fade-in-up"
            v-for="(p, i) in data.patterns.failurePatterns"
            :key="'f' + i"
            :style="{ animationDelay: `${i * 0.1}s` }"
          >
            <div class="pattern-header">
              <span class="pattern-name">{{ p.pattern }}</span>
              <span class="pattern-freq">{{ p.frequency }}%</span>
            </div>
            <div class="pattern-bar-wrapper">
              <div class="pattern-bar pattern-bar-fail" :style="{ width: p.frequency + '%' }"></div>
            </div>
            <p class="pattern-desc">{{ p.description }}</p>
          </div>
        </div>
      </div>

      <div class="glass-card ai-summary-card fade-in-up">
        <div class="ai-summary-header">
          <span class="ai-summary-icon">🤖</span>
          <span class="ai-summary-title">AI 规律总结</span>
        </div>
        <p class="ai-summary-text">{{ data.patterns.aiSummary }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const activeTab = ref('similar')

const tabs = [
  { key: 'similar', label: '相似案例', icon: '🎯' },
  { key: 'success', label: '成功案例', icon: '✅' },
  { key: 'failure', label: '失败案例', icon: '⚠️' },
  { key: 'patterns', label: 'AI规律', icon: '🧠' }
]

const formatMoney = (val) => {
  if (!val) return '0'
  if (val >= 10000) return (val / 10000).toFixed(1) + '万'
  return val.toLocaleString()
}
</script>

<style scoped>
.case-library {
  width: 100%;
}

.library-header {
  margin-bottom: 20px;
}

.library-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 4px;
}

/* Tabs */
.case-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.case-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: rgba(138, 99, 255, 0.08);
  border: 1px solid var(--border-glow);
  border-radius: 24px;
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.case-tab:hover {
  background: rgba(138, 99, 255, 0.15);
  color: var(--text-primary);
}

.case-tab.active {
  background: var(--gradient-nebula);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(138, 99, 255, 0.3);
}

.tab-icon {
  font-size: 16px;
}

/* 相似案例 */
.case-card {
  padding: 20px;
  margin-bottom: 16px;
}

.case-card-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.case-avatar {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(138, 99, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.case-info {
  flex: 1;
}

.case-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.case-meta {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 2px;
}

.similarity-badge {
  text-align: center;
  flex-shrink: 0;
}

.similarity-ring {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: conic-gradient(var(--accent-purple) calc(var(--p) * 1%), rgba(138, 99, 255, 0.1) 0);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.similarity-ring::before {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: var(--bg-card);
}

.similarity-ring span {
  position: relative;
  font-size: 14px;
  font-weight: 700;
  color: var(--accent-purple);
}

.similarity-label {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
  display: block;
}

.case-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.case-tags {
  display: flex;
  gap: 8px;
}

.case-tag {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
}

.tag-success {
  background: rgba(74, 222, 128, 0.15);
  color: var(--accent-green);
}

.tag-fail {
  background: rgba(255, 107, 107, 0.15);
  color: #ff6b6b;
}

.tag-universe {
  background: rgba(74, 158, 255, 0.15);
  color: var(--accent-blue);
}

.case-income {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
}

.income-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.income-label {
  font-size: 12px;
  color: var(--text-muted);
}

.income-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
}

.income-value.highlight {
  color: var(--accent-green);
}

.income-arrow {
  font-size: 20px;
  color: var(--accent-purple);
}

.case-timeline {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
}

.case-summary {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
}

/* 成功案例 */
.success-card {
  padding: 20px;
  margin-bottom: 16px;
  border-left: 3px solid var(--accent-green);
}

.success-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.growth-badge {
  margin-left: auto;
  padding: 6px 16px;
  background: linear-gradient(135deg, #4ade80, #00e5ff);
  border-radius: var(--radius-pill);
  font-size: 16px;
  font-weight: 700;
  color: white;
}

.success-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.success-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.success-label {
  width: 70px;
  font-size: 13px;
  color: var(--text-muted);
  flex-shrink: 0;
  font-weight: 600;
}

.success-text {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.5;
  flex: 1;
}

.success-advice {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(74, 222, 128, 0.08);
  border-radius: 10px;
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.5;
}

/* 失败案例 */
.failure-card {
  padding: 20px;
  margin-bottom: 16px;
  border-left: 3px solid #ff6b6b;
}

.failure-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.failure-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.failure-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.failure-label {
  width: 70px;
  font-size: 13px;
  color: var(--text-muted);
  flex-shrink: 0;
  font-weight: 600;
}

.failure-text {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.5;
  flex: 1;
}

.failure-text.danger {
  color: #ff6b6b;
}

.failure-lesson {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(255, 107, 107, 0.08);
  border-radius: 10px;
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.5;
}

/* 规律 */
.patterns-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 20px;
}

.pattern-group-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
}

.pattern-group-title.success {
  color: var(--accent-green);
}

.pattern-group-title.danger {
  color: #ff6b6b;
}

.pattern-card {
  padding: 16px;
  margin-bottom: 12px;
}

.pattern-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.pattern-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.pattern-freq {
  font-size: 18px;
  font-weight: 700;
  color: var(--accent-purple);
}

.pattern-bar-wrapper {
  height: 6px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.pattern-bar {
  height: 100%;
  border-radius: 3px;
  transition: width 0.8s ease;
}

.pattern-bar-success {
  background: linear-gradient(90deg, #4ade80, #00e5ff);
}

.pattern-bar-fail {
  background: linear-gradient(90deg, #ff6b6b, #ffa500);
}

.pattern-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* AI总结 */
.ai-summary-card {
  padding: 24px;
  border: 1px solid rgba(138, 99, 255, 0.2);
}

.ai-summary-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.ai-summary-icon {
  font-size: 22px;
}

.ai-summary-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--accent-purple);
}

.ai-summary-text {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-primary);
}

/* 响应式 */
@media (max-width: 768px) {
  .patterns-section {
    grid-template-columns: 1fr;
  }
  .case-tabs {
    gap: 6px;
  }
  .case-tab {
    padding: 8px 14px;
    font-size: 13px;
  }
}
</style>
