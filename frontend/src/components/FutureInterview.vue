<template>
  <div class="future-interview">
    <div class="interview-header">
      <h3 class="chart-title">🎙️ AI未来采访</h3>
      <p class="interview-subtitle">如果未来的你坐在面前，你会问什么？</p>
    </div>

    <!-- 年份切换 -->
    <div class="interview-tabs">
      <button
        v-for="y in [3, 5, 10]"
        :key="y"
        class="interview-tab"
        :class="{ active: year === y }"
        @click="$emit('change', y)"
      >
        {{ y }}年后
      </button>
    </div>

    <!-- 加载中 -->
    <div v-if="loading" class="interview-loading">
      <div class="loading-mic">🎙️</div>
      <div class="loading-dots">
        <span></span><span></span><span></span>
      </div>
      <p class="loading-text">正在连接{{ year }}年后的你...</p>
    </div>

    <!-- 采访内容 -->
    <div v-else-if="interview" class="interview-content">
      <!-- 采访信息 -->
      <div class="interview-info-bar">
        <div class="info-item">
          <span class="info-icon">👤</span>
          <span class="info-text">{{ interview.year }}</span>
        </div>
        <div class="info-item">
          <span class="info-icon">🎭</span>
          <span class="info-text">{{ interview.mood }}</span>
        </div>
        <div class="info-item">
          <span class="info-icon">📍</span>
          <span class="info-text">{{ interview.location }}</span>
        </div>
      </div>

      <!-- 采访录音指示器 -->
      <div class="recording-indicator">
        <span class="rec-dot"></span>
        <span class="rec-text">采访进行中</span>
        <span class="rec-time">● {{ interview.qa.length }} 个问题</span>
      </div>

      <!-- Q&A 列表 -->
      <div class="qa-list">
        <div
          class="qa-item fade-in-up"
          v-for="(qa, i) in interview.qa"
          :key="i"
          :style="{ animationDelay: `${i * 0.15}s` }"
        >
          <!-- Question -->
          <div class="question-bubble">
            <div class="bubble-avatar q-avatar">📝</div>
            <div class="bubble-content">
              <div class="bubble-label">采访者</div>
              <div class="bubble-text">{{ qa.question }}</div>
            </div>
          </div>

          <!-- Answer -->
          <div class="answer-bubble">
            <div class="bubble-avatar a-avatar">🗣️</div>
            <div class="bubble-content">
              <div class="bubble-label">{{ interview.year }}</div>
              <div class="bubble-text answer-text">{{ qa.answer }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 采访结束语 -->
      <div class="interview-end">
        <div class="end-line"></div>
        <span class="end-text">采访结束</span>
        <div class="end-line"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  interview: {
    type: Object,
    default: null
  },
  year: {
    type: Number,
    default: 3
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['change'])
</script>

<style scoped>
.future-interview {
  width: 100%;
}

.interview-header {
  margin-bottom: 20px;
}

.interview-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 4px;
}

/* Tabs */
.interview-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.interview-tab {
  padding: 10px 24px;
  background: rgba(138, 99, 255, 0.08);
  border: 1px solid var(--border-glow);
  border-radius: 24px;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.interview-tab:hover {
  background: rgba(138, 99, 255, 0.15);
  color: var(--text-primary);
}

.interview-tab.active {
  background: var(--gradient-nebula);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(138, 99, 255, 0.3);
}

/* Loading */
.interview-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 60px 20px;
}

.loading-mic {
  font-size: 48px;
  animation: pulse-mic 1.5s ease-in-out infinite;
}

@keyframes pulse-mic {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.7; }
}

.loading-dots {
  display: flex;
  gap: 6px;
}

.loading-dots span {
  width: 10px;
  height: 10px;
  background: var(--accent-purple);
  border-radius: 50%;
  animation: bounce-dot 1.4s ease-in-out infinite;
}

.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce-dot {
  0%, 80%, 100% { transform: scale(0.5); opacity: 0.3; }
  40% { transform: scale(1); opacity: 1; }
}

.loading-text {
  font-size: 15px;
  color: var(--text-muted);
}

/* 采访信息 */
.interview-info-bar {
  display: flex;
  gap: 20px;
  padding: 14px 20px;
  background: rgba(138, 99, 255, 0.08);
  border-radius: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.info-icon {
  font-size: 16px;
}

.info-text {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

/* 录音指示器 */
.recording-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  margin-bottom: 20px;
}

.rec-dot {
  width: 10px;
  height: 10px;
  background: #ff6b6b;
  border-radius: 50%;
  animation: rec-pulse 1.5s ease-in-out infinite;
}

@keyframes rec-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.4); }
  50% { opacity: 0.6; box-shadow: 0 0 0 6px rgba(255, 107, 107, 0); }
}

.rec-text {
  font-size: 13px;
  color: #ff6b6b;
  font-weight: 600;
}

.rec-time {
  font-size: 12px;
  color: var(--text-muted);
  margin-left: auto;
}

/* Q&A */
.qa-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.qa-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.question-bubble,
.answer-bubble {
  display: flex;
  gap: 12px;
  max-width: 90%;
}

.answer-bubble {
  margin-left: auto;
  flex-direction: row-reverse;
}

.bubble-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.q-avatar {
  background: rgba(138, 99, 255, 0.15);
}

.a-avatar {
  background: rgba(74, 222, 128, 0.15);
}

.bubble-content {
  padding: 14px 18px;
  border-radius: 16px;
  flex: 1;
}

.question-bubble .bubble-content {
  background: rgba(138, 99, 255, 0.1);
  border: 1px solid rgba(138, 99, 255, 0.15);
  border-top-left-radius: 4px;
}

.answer-bubble .bubble-content {
  background: rgba(74, 222, 128, 0.08);
  border: 1px solid rgba(74, 222, 128, 0.15);
  border-top-right-radius: 4px;
}

.bubble-label {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
}

.question-bubble .bubble-label {
  color: var(--accent-purple);
}

.answer-bubble .bubble-label {
  color: var(--accent-green);
}

.bubble-text {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-primary);
}

.answer-text {
  font-size: 14.5px;
}

/* 采访结束 */
.interview-end {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 28px;
  opacity: 0.5;
}

.end-line {
  flex: 1;
  height: 1px;
  background: var(--border-glow);
}

.end-text {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}

/* 响应式 */
@media (max-width: 768px) {
  .interview-info-bar {
    flex-direction: column;
    gap: 8px;
  }
  .question-bubble,
  .answer-bubble {
    max-width: 95%;
  }
  .interview-tabs {
    gap: 8px;
  }
  .interview-tab {
    padding: 8px 18px;
    font-size: 14px;
  }
}
</style>
