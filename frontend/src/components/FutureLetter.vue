<template>
  <div class="future-letter">
    <!-- 加载状态 -->
    <div class="letter-loading" v-if="loading">
      <div class="loading-stamp">
        <span class="stamp-icon">✉️</span>
      </div>
      <div class="loading-dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <p class="loading-text">未来的你正在写信...</p>
    </div>

    <!-- 信件内容 -->
    <div class="letter-paper float-anim" v-else-if="letter && hasContent">
      <!-- 邮戳风格标记 -->
      <div class="postmark">
        <div class="postmark-circle">
          <span class="postmark-year">{{ letter.year }}</span>
          <span class="postmark-label">FUTURE MAIL</span>
        </div>
      </div>

      <!-- 信件正文区 -->
      <div class="letter-content">
        <!-- 称呼 -->
        <p class="letter-greeting">{{ letter.greeting }}</p>

        <!-- 正文段落 -->
        <div class="letter-body">
          <p
            v-for="(paragraph, i) in paragraphs"
            :key="i"
            class="letter-paragraph"
          >
            {{ paragraph }}
          </p>
        </div>

        <!-- 高亮金句 -->
        <blockquote class="letter-highlight" v-if="letter.highlight">
          <span class="quote-mark">“</span>
          <p class="highlight-text">{{ letter.highlight }}</p>
          <span class="quote-mark end">”</span>
        </blockquote>

        <!-- 落款 -->
        <div class="letter-signature">
          <span class="signature-line">—— {{ letter.year }}</span>
        </div>

        <!-- 心情标签 -->
        <div class="mood-tag" v-if="letter.mood">
          <span class="mood-icon">🌙</span>
          <span class="mood-text">{{ letter.mood }}</span>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div class="letter-empty" v-else>
      <span class="empty-icon">📭</span>
      <p class="empty-text">尚未收到未来的来信</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  letter: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  }
})

// 将正文按换行符拆分为段落
const paragraphs = computed(() => {
  if (!props.letter?.content) return []
  return props.letter.content
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length > 0)
})

const hasContent = computed(() => {
  return props.letter && (props.letter.content || props.letter.greeting || props.letter.highlight)
})
</script>

<style scoped>
.future-letter {
  --fl-bg: #0a0a1a;
  --fl-paper-bg: rgba(30, 30, 60, 0.75);
  --fl-text-primary: #e8e8f5;
  --fl-text-secondary: #9999bb;
  --fl-text-muted: #6a6a8a;
  --fl-purple: #8a63ff;
  --fl-blue: #4a9eff;
  --fl-pink: #ff6b9d;
  --fl-green: #4ade80;
  --fl-gold: #ffd700;
  width: 100%;
  display: flex;
  justify-content: center;
}

/* ===== 加载状态 ===== */
.letter-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px 20px;
  width: 100%;
  max-width: 640px;
}

.loading-stamp {
  margin-bottom: 24px;
  animation: stampPulse 2s ease-in-out infinite;
}

.stamp-icon {
  font-size: 48px;
  filter: drop-shadow(0 0 12px rgba(138, 99, 255, 0.6));
}

@keyframes stampPulse {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.1); opacity: 1; }
}

.loading-dots {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--fl-purple);
  animation: dotBounce 1.4s ease-in-out infinite;
}

.dot:nth-child(1) {
  animation-delay: 0s;
  background: var(--fl-purple);
}
.dot:nth-child(2) {
  animation-delay: 0.2s;
  background: var(--fl-blue);
}
.dot:nth-child(3) {
  animation-delay: 0.4s;
  background: var(--fl-pink);
}

@keyframes dotBounce {
  0%, 80%, 100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  40% {
    transform: translateY(-14px);
    opacity: 1;
  }
}

.loading-text {
  font-size: 15px;
  color: var(--fl-text-secondary);
  letter-spacing: 1px;
}

/* ===== 信纸 ===== */
.letter-paper {
  position: relative;
  width: 100%;
  max-width: 640px;
  padding: 48px 52px 40px;
  background:
    /* 纸张纹理：细微的横线 + 噪点感渐变 */
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 31px,
      rgba(138, 99, 255, 0.04) 31px,
      rgba(138, 99, 255, 0.04) 32px
    ),
    /* 光泽渐变模拟纸张质感 */
    linear-gradient(135deg, rgba(40, 40, 75, 0.85) 0%, rgba(28, 28, 55, 0.9) 50%, rgba(35, 35, 68, 0.85) 100%);
  border: 1px solid rgba(138, 99, 255, 0.35);
  border-radius: 8px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(138, 99, 255, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

/* 信纸折角效果 */
.letter-paper::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 28px 28px 0;
  border-color: transparent rgba(138, 99, 255, 0.15) transparent transparent;
}

/* 信纸边缘微光 */
.letter-paper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at top, rgba(138, 99, 255, 0.06) 0%, transparent 60%);
  pointer-events: none;
}

/* 浮动动画 */
.float-anim {
  animation: floatLetter 6s ease-in-out infinite;
}

@keyframes floatLetter {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(-0.3deg); }
}

/* ===== 邮戳标记 ===== */
.postmark {
  position: absolute;
  top: 24px;
  right: 32px;
  z-index: 2;
}

.postmark-circle {
  width: 78px;
  height: 78px;
  border: 2px dashed rgba(255, 215, 0, 0.5);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 215, 0, 0.05);
  transform: rotate(-12deg);
  box-shadow: 0 0 16px rgba(255, 215, 0, 0.1);
}

.postmark-year {
  font-size: 13px;
  font-weight: 800;
  color: var(--fl-gold);
  letter-spacing: 0.5px;
  text-shadow: 0 0 6px rgba(255, 215, 0, 0.4);
}

.postmark-label {
  font-size: 7px;
  color: rgba(255, 215, 0, 0.6);
  letter-spacing: 1px;
  margin-top: 3px;
  font-weight: 600;
}

/* ===== 信件正文 ===== */
.letter-content {
  position: relative;
  z-index: 1;
}

.letter-greeting {
  font-family: 'Georgia', 'Times New Roman', 'KaiTi', '楷体', serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--fl-text-primary);
  margin-bottom: 24px;
  letter-spacing: 0.5px;
}

.letter-body {
  margin-bottom: 24px;
}

.letter-paragraph {
  font-family: 'Georgia', 'Times New Roman', 'KaiTi', '楷体', serif;
  font-size: 15.5px;
  line-height: 2;
  color: rgba(232, 232, 245, 0.92);
  margin-bottom: 16px;
  text-indent: 2em;
  letter-spacing: 0.3px;
}

/* ===== 高亮金句 ===== */
.letter-highlight {
  position: relative;
  margin: 28px 0 24px;
  padding: 18px 24px 18px 28px;
  background: linear-gradient(135deg, rgba(138, 99, 255, 0.1) 0%, rgba(255, 107, 157, 0.06) 100%);
  border-left: 4px solid var(--fl-purple);
  border-radius: 0 12px 12px 0;
  box-shadow: 0 4px 20px rgba(138, 99, 255, 0.1);
}

.highlight-text {
  font-family: 'Georgia', 'Times New Roman', 'KaiTi', '楷体', serif;
  font-size: 16px;
  font-weight: 600;
  font-style: italic;
  line-height: 1.8;
  color: var(--fl-text-primary);
  background: linear-gradient(90deg, var(--fl-purple), var(--fl-pink));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.quote-mark {
  position: absolute;
  font-family: 'Georgia', serif;
  font-size: 42px;
  font-weight: 700;
  color: rgba(138, 99, 255, 0.3);
  line-height: 1;
}

.quote-mark:not(.end) {
  top: -6px;
  left: 10px;
}

.quote-mark.end {
  bottom: -20px;
  right: 14px;
}

/* ===== 落款 ===== */
.letter-signature {
  text-align: right;
  margin-top: 28px;
  margin-bottom: 20px;
}

.signature-line {
  font-family: 'Georgia', 'Times New Roman', 'KaiTi', '楷体', serif;
  font-size: 14px;
  font-style: italic;
  color: var(--fl-text-secondary);
}

/* ===== 心情标签 ===== */
.mood-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 107, 157, 0.1);
  border: 1px solid rgba(255, 107, 157, 0.25);
  border-radius: var(--radius-pill);
  margin-top: 8px;
}

.mood-icon {
  font-size: 14px;
}

.mood-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--fl-pink);
  letter-spacing: 0.5px;
}

/* ===== 空状态 ===== */
.letter-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px 20px;
  width: 100%;
  max-width: 640px;
}

.empty-icon {
  font-size: 44px;
  margin-bottom: 14px;
  opacity: 0.5;
}

.empty-text {
  font-size: 14px;
  color: var(--fl-text-muted);
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .letter-paper {
    padding: 40px 28px 32px;
  }

  .postmark {
    top: 18px;
    right: 20px;
  }

  .postmark-circle {
    width: 64px;
    height: 64px;
  }

  .postmark-year {
    font-size: 11px;
  }

  .postmark-label {
    font-size: 6px;
  }

  .letter-greeting {
    font-size: 16px;
  }

  .letter-paragraph {
    font-size: 14.5px;
    line-height: 1.9;
  }

  .highlight-text {
    font-size: 15px;
  }

  .quote-mark {
    font-size: 36px;
  }
}

@media (max-width: 480px) {
  .letter-paper {
    padding: 36px 20px 28px;
  }

  .postmark {
    position: relative;
    top: auto;
    right: auto;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .postmark-circle {
    transform: rotate(-8deg);
  }

  .letter-greeting {
    font-size: 15px;
  }

  .letter-paragraph {
    font-size: 14px;
  }

  .letter-highlight {
    padding: 16px 18px 16px 22px;
  }

  .highlight-text {
    font-size: 14px;
  }
}
</style>
