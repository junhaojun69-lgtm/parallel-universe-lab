<template>
  <div class="create-page">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="container nav-inner">
        <div class="logo" @click="$router.push('/')">
          <span class="logo-icon">🌌</span>
          <span class="logo-text">平行宇宙实验室</span>
        </div>
        <div class="nav-actions">
          <button class="btn btn-secondary nav-btn" @click="$router.push('/')">返回首页</button>
        </div>
      </div>
    </nav>

    <div class="container form-container">
      <div class="form-header fade-in-up">
        <div class="step-badge">步骤 1 / 2</div>
        <h1 class="form-title page-title">输入你的人生参数</h1>
        <p class="form-subtitle">AI 将基于这些信息为你推演四重平行宇宙</p>
      </div>

      <form class="glass-card form-card fade-in-up" @submit.prevent="handleSubmit" style="animation-delay: 0.1s">
        <!-- 基本信息组 -->
        <div class="form-section">
          <div class="section-label">
            <span class="section-icon">👤</span>
            <span>基本信息</span>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">年龄<span class="required">*</span></label>
              <input
                v-model.number="form.age"
                type="number"
                class="form-input"
                placeholder="例如：28"
                min="16"
                max="80"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">学历<span class="required">*</span></label>
              <select v-model="form.education" class="form-select" required>
                <option value="">请选择</option>
                <option value="高中及以下">高中及以下</option>
                <option value="大专">大专</option>
                <option value="本科">本科</option>
                <option value="硕士">硕士</option>
                <option value="博士">博士</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">所在城市<span class="required">*</span></label>
              <input
                v-model="form.city"
                type="text"
                class="form-input"
                placeholder="例如：北京"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">当前职业<span class="required">*</span></label>
              <input
                v-model="form.career"
                type="text"
                class="form-input"
                placeholder="例如：前端工程师"
                required
              />
            </div>
          </div>
        </div>

        <!-- 经济状况组 -->
        <div class="form-section">
          <div class="section-label">
            <span class="section-icon">💰</span>
            <span>经济状况</span>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">月收入（元）<span class="required">*</span></label>
              <input
                v-model.number="form.income"
                type="number"
                class="form-input"
                placeholder="例如：15000"
                min="0"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">存款（元）<span class="required">*</span></label>
              <input
                v-model.number="form.savings"
                type="number"
                class="form-input"
                placeholder="例如：100000"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        <!-- 决定组 -->
        <div class="form-section">
          <div class="section-label">
            <span class="section-icon">🎯</span>
            <span>你的决定</span>
          </div>
          <div class="form-group">
            <label class="form-label">想做的决定<span class="required">*</span></label>
            <textarea
              v-model="form.decision"
              class="form-textarea"
              placeholder="描述你正在犹豫或想做的决定，例如：辞职创业做独立开发者、考研转行、搬到另一个城市等"
              required
            ></textarea>
            <div class="form-hint">描述越具体，AI 推演的平行宇宙越精准</div>
          </div>

          <!-- 快捷选项 -->
          <div class="quick-options">
            <span class="quick-label">试试这些：</span>
            <button
              type="button"
              class="quick-chip"
              v-for="opt in quickOptions"
              :key="opt"
              @click="form.decision = opt"
            >{{ opt }}</button>
          </div>
        </div>

        <!-- 提交 -->
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="$router.push('/')">取消</button>
          <button type="submit" class="btn btn-primary submit-btn" :disabled="submitting">
            <span v-if="!submitting">🚀 启动平行宇宙模拟</span>
            <span v-else class="loading-text">
              <span class="mini-spinner"></span>
              AI 正在推演中...
            </span>
          </button>
        </div>
      </form>

      <!-- 提示信息 -->
      <div class="tips fade-in-up" style="animation-delay: 0.2s">
        <div class="tip-item">
          <span class="tip-icon">💡</span>
          <span>AI 将生成 4 个平行宇宙：保持现状、执行目标、以及 2 个替代方案</span>
        </div>
        <div class="tip-item">
          <span class="tip-icon">🔒</span>
          <span>你的数据仅用于本次模拟，不会用于其他用途</span>
        </div>
      </div>
    </div>

    <!-- 跳转过渡遮罩 -->
    <div v-if="submitting" class="loading-overlay">
      <div class="loading-modal">
        <div class="loading-orbs">
          <div class="loading-orb orb-1">A</div>
          <div class="loading-orb orb-2">B</div>
          <div class="loading-orb orb-3">C</div>
          <div class="loading-orb orb-4">D</div>
        </div>
        <h3 class="loading-title">正在启动 AI 分析</h3>
        <p class="loading-desc">准备评估你的人生参数...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  age: null,
  education: '',
  city: '',
  career: '',
  income: null,
  savings: null,
  decision: ''
})

const submitting = ref(false)

const quickOptions = [
  '辞职创业，做独立开发者',
  '考研深造，转行人工智能',
  '搬到一线城市寻找新机会',
  '辞职gap一年，环游中国',
  '从大厂跳槽到创业公司'
]

const handleSubmit = () => {
  submitting.value = true

  // 存储表单数据到 sessionStorage 供分析页使用
  sessionStorage.setItem('simulationForm', JSON.stringify(form.value))

  // 短暂延迟后跳转到分析页面
  setTimeout(() => {
    router.push('/analysis')
  }, 400)
}

onUnmounted(() => {
})
</script>

<style scoped>
.create-page {
  min-height: 100vh;
  padding-bottom: 60px;
}

/* 表单容器 */
.form-container {
  max-width: 760px;
  padding-top: 48px;
}

.form-header {
  text-align: center;
  margin-bottom: 32px;
}

.step-badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(138, 99, 255, 0.15);
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-pill, 999px);
  font-size: 13px;
  color: var(--accent-purple);
  margin-bottom: 16px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.form-title {
  margin-bottom: 8px;
}

.form-subtitle {
  font-size: 15px;
  color: var(--text-secondary);
}

/* 表单卡片 */
.form-card {
  padding: 40px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.form-section {
  margin-bottom: 36px;
}

.form-section:last-of-type {
  margin-bottom: 24px;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-glow);
  letter-spacing: 0.5px;
}

.section-icon {
  font-size: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-hint {
  margin-top: 8px;
  font-size: 13px;
  color: var(--text-muted);
}

/* 快捷选项 */
.quick-options {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.quick-label {
  font-size: 13px;
  color: var(--text-muted);
}

.quick-chip {
  padding: 6px 14px;
  background: rgba(138, 99, 255, 0.1);
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-pill, 999px);
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: inherit;
}

.quick-chip:hover {
  background: rgba(138, 99, 255, 0.2);
  border-color: var(--accent-purple);
  color: var(--text-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(138, 99, 255, 0.2);
}

/* 表单操作 */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid var(--border-glow);
}

.submit-btn {
  min-width: 220px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.loading-text {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mini-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

/* 提示 */
.tips {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-muted);
  transition: all 0.3s ease;
}

.tip-item:hover {
  transform: translateX(4px);
}

.tip-icon {
  font-size: 18px;
}

/* 加载遮罩 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 26, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

.loading-modal {
  text-align: center;
  max-width: 400px;
  padding: 40px;
}

.loading-orbs {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
}

.loading-orb {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 800;
  color: white;
  animation: float 1.5s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(138, 99, 255, 0.3);
}

.orb-1 {
  background: linear-gradient(135deg, #8a63ff, #6366f1);
  animation-delay: 0s;
}
.orb-2 {
  background: linear-gradient(135deg, #4a9eff, #00e5ff);
  animation-delay: 0.2s;
}
.orb-3 {
  background: linear-gradient(135deg, #ff6b9d, #ffa500);
  animation-delay: 0.4s;
}
.orb-4 {
  background: linear-gradient(135deg, #4ade80, #00e5ff);
  animation-delay: 0.6s;
}

.loading-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
}

.loading-desc {
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 24px;
  min-height: 22px;
}

.loading-progress {
  width: 100%;
  height: 6px;
  background: rgba(138, 99, 255, 0.15);
  border-radius: 3px;
  overflow: hidden;
}

.loading-bar {
  height: 100%;
  background: var(--gradient-nebula);
  border-radius: 3px;
  transition: width 0.5s ease;
}

/* 响应式 */
@media (max-width: 768px) {
  .form-card {
    padding: 24px;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
  .form-title {
    font-size: 24px;
  }
  .form-actions {
    flex-direction: column-reverse;
  }
  .submit-btn {
    width: 100%;
  }
}
</style>
