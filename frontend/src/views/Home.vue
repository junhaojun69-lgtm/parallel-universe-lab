<template>
  <div class="home">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="container nav-inner">
        <div class="logo">
          <span class="logo-icon">🌌</span>
          <span class="logo-text">平行宇宙实验室</span>
        </div>
        <div class="nav-actions">
          <router-link to="/demo" class="btn btn-primary nav-btn demo-entry">🏆 演示模式</router-link>
          <router-link to="/create" class="btn btn-secondary nav-btn">开始模拟</router-link>
        </div>
      </div>
    </nav>

    <!-- Hero 区域 -->
    <section class="hero">
      <div class="container">
        <div class="hero-content fade-in-up">
          <div class="hero-badge">AI 驱动 · 人生决策模拟</div>
          <h1 class="hero-title">
            如果当初做了另一个选择<br />
            <span class="gradient-text">你的人生会怎样？</span>
          </h1>
          <p class="hero-desc">
            人生平行宇宙实验室通过 AI 模拟引擎，为你生成不同选择下的平行宇宙发展轨迹。
            输入你的人生参数和正在犹豫的决定，让 AI 帮你预见四种可能的未来。
          </p>
          <div class="hero-actions">
            <router-link to="/create" class="btn btn-primary hero-btn">
              <span>🚀 开启平行宇宙</span>
            </router-link>
            <a href="#features" class="btn btn-secondary">了解更多</a>
          </div>
        </div>

        <!-- 漂浮的宇宙球 -->
        <div class="floating-universes">
          <div class="universe-orb orb-a">A</div>
          <div class="universe-orb orb-b">B</div>
          <div class="universe-orb orb-c">C</div>
          <div class="universe-orb orb-d">D</div>
        </div>
      </div>
    </section>

    <!-- 功能特性 -->
    <section id="features" class="features">
      <div class="container">
        <h2 class="section-title">核心能力</h2>
        <div class="feature-grid">
          <div class="glass-card feature-card fade-in-up" v-for="(f, i) in features" :key="i" :style="{ animationDelay: `${i * 0.1}s` }">
            <div class="feature-icon">{{ f.icon }}</div>
            <h3 class="feature-name">{{ f.name }}</h3>
            <p class="feature-desc">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 平台功能入口 -->
    <section class="platform-section">
      <div class="container">
        <h2 class="section-title">成长平台</h2>
        <p class="section-subtitle">不止于推演，更陪伴你的决策全生命周期</p>
        <div class="platform-grid">
          <router-link to="/review" class="glass-card platform-card fade-in-up" style="animation-delay: 0.1s">
            <div class="platform-icon">📝</div>
            <h3 class="platform-name">决策复盘</h3>
            <p class="platform-desc">30/90/180天后回顾决策，与AI推演结果对比</p>
            <span class="platform-arrow">→</span>
          </router-link>
          <router-link to="/archive" class="glass-card platform-card fade-in-up" style="animation-delay: 0.2s">
            <div class="platform-icon">🗂️</div>
            <h3 class="platform-name">决策档案</h3>
            <p class="platform-desc">时间轴展示所有历史决策与复盘结果</p>
            <span class="platform-arrow">→</span>
          </router-link>
          <router-link to="/life-map" class="glass-card platform-card fade-in-up" style="animation-delay: 0.3s">
            <div class="platform-icon">🗺️</div>
            <h3 class="platform-name">人生地图</h3>
            <p class="platform-desc">可视化人生路径树，展开每个节点的可能未来</p>
            <span class="platform-arrow">→</span>
          </router-link>
          <router-link to="/checkup" class="glass-card platform-card fade-in-up" style="animation-delay: 0.4s">
            <div class="platform-icon">🩺</div>
            <h3 class="platform-name">决策体检</h3>
            <p class="platform-desc">六维决策能力评估，生成决策人格标签</p>
            <span class="platform-arrow">→</span>
          </router-link>
          <router-link to="/dashboard" class="glass-card platform-card fade-in-up" style="animation-delay: 0.5s">
            <div class="platform-icon">📊</div>
            <h3 class="platform-name">数据驾驶舱</h3>
            <p class="platform-desc">平台核心指标全景展示，实时数据可视化</p>
            <span class="platform-arrow">→</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 四宇宙介绍 -->
    <section class="universes-intro">
      <div class="container">
        <h2 class="section-title">四重平行宇宙</h2>
        <p class="section-subtitle">AI 将自动生成四个维度的未来推演</p>
        <div class="universe-grid">
          <div class="glass-card universe-item" v-for="(u, i) in universeTypes" :key="i">
            <div class="universe-badge" :style="{ background: u.color }">{{ u.label }}</div>
            <h3 class="universe-title">{{ u.title }}</h3>
            <p class="universe-desc">{{ u.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 历史记录 -->
    <section class="history-section">
      <div class="container">
        <div class="history-header">
          <h2 class="section-title">历史模拟记录</h2>
          <button v-if="history.length > 0" class="btn btn-secondary btn-sm" @click="refreshHistory">刷新</button>
        </div>

        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>

        <div v-else-if="history.length === 0" class="empty-state glass-card">
          <div class="empty-icon">🌠</div>
          <p class="empty-text">还没有模拟记录</p>
          <p class="empty-hint">开启你的第一次平行宇宙之旅吧</p>
          <router-link to="/create" class="btn btn-primary">立即开始</router-link>
        </div>

        <div v-else class="history-list">
          <div
            class="glass-card history-item"
            v-for="item in history"
            :key="item.id"
            @click="viewHistory(item.id)"
          >
            <div class="history-info">
              <div class="history-decision">{{ item.decision }}</div>
              <div class="history-meta">
                <span>{{ item.age }}岁 · {{ item.city }} · {{ item.career }}</span>
                <span class="history-date">{{ formatDate(item.created_at) }}</span>
              </div>
            </div>
            <div class="history-arrow">→</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <p>人生平行宇宙实验室 · 仅供娱乐参考，人生没有标准答案</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getHistory } from '../api'

const router = useRouter()
const history = ref([])
const loading = ref(true)

const features = [
  { icon: '🧠', name: 'AI 智能推演', desc: '基于 DeepSeek 大模型，结合你的人生参数进行深度推演' },
  { icon: '🌍', name: '四重宇宙', desc: '自动生成安稳、突破、成长、创新四个平行宇宙的未来图景' },
  { icon: '🌳', name: '人生决策树', desc: '树状图展示未来可能发展路径和概率，可视化决策分支' },
  { icon: '⚠️', name: '风险预警', desc: '分析未来可能后悔点和风险点，提前规避人生陷阱' },
  { icon: '✉️', name: 'AI未来来信', desc: '3年、5年、10年后的自己写给现在的你，温暖而深刻' },
  { icon: '📊', name: '后悔指数', desc: '为每个宇宙生成后悔指数，量化分析不行动的代价' },
  { icon: '🎯', name: '人生价值雷达', desc: '财富、健康、家庭、自由、成长、幸福六维度对比' },
  { icon: '📚', name: 'AI案例库', desc: '相似用户案例匹配，成功失败规律分析，真实参考' },
  { icon: '🎙️', name: 'AI未来采访', desc: '采访3/5/10年后的自己，问答形式呈现未来视角' },
  { icon: '📝', name: '决策复盘', desc: '30/90/180天后复盘决策，对比AI推演结果，持续成长' },
  { icon: '🗂️', name: '决策档案', desc: '时间轴展示所有历史决策与复盘结果，记录成长轨迹' },
  { icon: '🗺️', name: 'AI人生地图', desc: '可视化人生路径树，展开每个节点的可能未来' },
  { icon: '🩺', name: 'AI决策体检', desc: '六维决策能力评估，生成决策人格标签与AI建议' },
  { icon: '📄', name: 'PDF报告', desc: '一键生成完整平行宇宙报告，支持导出分享' }
]

const universeTypes = [
  { label: 'A', title: '安稳宇宙', desc: '延续当前人生轨迹，稳中求进的发展推演', color: 'linear-gradient(135deg, #8a63ff, #6366f1)' },
  { label: 'B', title: '突破宇宙', desc: '坚定执行你心中想做的那个决定，破局重生', color: 'linear-gradient(135deg, #4a9eff, #00e5ff)' },
  { label: 'C', title: '成长宇宙', desc: 'AI 推荐的渐进转型路径，平衡中求发展', color: 'linear-gradient(135deg, #ff6b9d, #ffa500)' },
  { label: 'D', title: '创新宇宙', desc: 'AI 推荐的差异化路线，探索另类可能', color: 'linear-gradient(135deg, #4ade80, #00e5ff)' }
]

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

const loadHistory = async () => {
  loading.value = true
  try {
    const res = await getHistory()
    history.value = res.data || []
  } catch (err) {
    // 后端未启动时使用空列表
    history.value = []
  } finally {
    loading.value = false
  }
}

const refreshHistory = () => {
  loadHistory()
}

const viewHistory = (id) => {
  router.push(`/history/${id}`)
}

onMounted(() => {
  loadHistory()
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}

/* 演示模式按钮 */
.demo-entry {
  background: linear-gradient(135deg, #ff6b9d, #8a63ff);
  background-size: 200% 100%;
  box-shadow: 0 4px 20px rgba(255, 107, 157, 0.3), 0 0 0 1px rgba(255, 107, 157, 0.2);
  animation: gradient-shift 3s ease infinite;
}

.demo-entry:hover {
  box-shadow: 0 8px 30px rgba(255, 107, 157, 0.5), 0 0 0 1px rgba(255, 107, 157, 0.3);
}

/* Hero */
.hero {
  position: relative;
  padding: 100px 0 80px;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(138, 99, 255, 0.12) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

.hero-content {
  max-width: 700px;
  position: relative;
  z-index: 2;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 18px;
  background: rgba(138, 99, 255, 0.12);
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 500;
  color: var(--accent-purple);
  margin-bottom: 28px;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
}

.hero-title {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.25;
  margin-bottom: 24px;
  letter-spacing: -0.5px;
}

.gradient-text {
  background: var(--gradient-nebula);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 5s ease infinite;
}

.hero-desc {
  font-size: 17px;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 40px;
  max-width: 580px;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero-btn {
  padding: 16px 40px;
  font-size: 17px;
}

/* 漂浮宇宙球 */
.floating-universes {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 400px;
  height: 400px;
  pointer-events: none;
}

.universe-orb {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
  color: white;
  animation: float 4s ease-in-out infinite;
  box-shadow: 0 0 30px rgba(138, 99, 255, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.15);
}

.universe-orb::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: inherit;
  opacity: 0.3;
  filter: blur(12px);
  z-index: -1;
}

.orb-a {
  background: linear-gradient(135deg, #8a63ff, #6366f1);
  top: 20px;
  right: 120px;
  animation-delay: 0s;
}

.orb-b {
  background: linear-gradient(135deg, #4a9eff, #00e5ff);
  top: 100px;
  right: 20px;
  animation-delay: 0.5s;
}

.orb-c {
  background: linear-gradient(135deg, #ff6b9d, #ffa500);
  bottom: 100px;
  right: 140px;
  animation-delay: 1s;
}

.orb-d {
  background: linear-gradient(135deg, #4ade80, #00e5ff);
  bottom: 20px;
  right: 40px;
  animation-delay: 1.5s;
}

/* 通用 section */
.section-title {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.section-title::after {
  content: '';
  display: block;
  width: 48px;
  height: 3px;
  background: var(--gradient-nebula);
  border-radius: 2px;
  margin: 14px auto 0;
}

.section-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 40px;
  font-size: 15px;
}

/* 功能特性 */
.features {
  padding: 80px 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.feature-card {
  padding: 32px 24px;
  text-align: center;
}

.feature-card:hover .feature-icon {
  transform: scale(1.15) translateY(-4px);
}

.feature-icon {
  font-size: 40px;
  margin-bottom: 16px;
  display: inline-block;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  filter: drop-shadow(0 4px 12px rgba(138, 99, 255, 0.3));
}

.feature-name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  letter-spacing: 0.3px;
}

.feature-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* 平台功能入口 */
.platform-section {
  padding: 80px 0;
}

.platform-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.platform-card {
  padding: 30px 26px;
  text-decoration: none;
  color: inherit;
  position: relative;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: block;
}

.platform-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius);
  padding: 1px;
  background: linear-gradient(135deg, rgba(138, 99, 255, 0.5), transparent);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.platform-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-card-hover), 0 0 30px rgba(138, 99, 255, 0.15);
}

.platform-card:hover::before {
  opacity: 1;
}

.platform-icon {
  font-size: 36px;
  margin-bottom: 14px;
  filter: drop-shadow(0 4px 10px rgba(138, 99, 255, 0.25));
}

.platform-name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
  letter-spacing: 0.3px;
}

.platform-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  padding-right: 24px;
}

.platform-arrow {
  position: absolute;
  top: 30px;
  right: 26px;
  font-size: 20px;
  color: var(--accent-purple);
  transition: transform 0.3s ease;
}

.platform-card:hover .platform-arrow {
  transform: translateX(6px);
}

/* 四宇宙介绍 */
.universes-intro {
  padding: 80px 0;
}

.universe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.universe-item {
  padding: 30px 26px;
  position: relative;
  overflow: hidden;
}

.universe-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.universe-item:hover::after {
  opacity: 1;
}

.universe-item:nth-child(1)::after { background: linear-gradient(90deg, #8a63ff, transparent); }
.universe-item:nth-child(2)::after { background: linear-gradient(90deg, #4a9eff, transparent); }
.universe-item:nth-child(3)::after { background: linear-gradient(90deg, #ff6b9d, transparent); }
.universe-item:nth-child(4)::after { background: linear-gradient(90deg, #4ade80, transparent); }

.universe-badge {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 800;
  color: white;
  margin-bottom: 18px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.universe-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: 0.3px;
}

.universe-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* 历史记录 */
.history-section {
  padding: 80px 0;
}

.history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
}

.history-header .section-title {
  text-align: left;
  margin-bottom: 0;
}

.history-header .section-title::after {
  margin-left: 0;
}

.btn-sm {
  padding: 8px 18px;
  font-size: 13px;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 60px 0;
  color: var(--text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(138, 99, 255, 0.15);
  border-top-color: var(--accent-purple);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.empty-state {
  padding: 64px 24px;
  text-align: center;
}

.empty-icon {
  font-size: 56px;
  margin-bottom: 16px;
  filter: drop-shadow(0 0 20px rgba(138, 99, 255, 0.3));
}

.empty-text {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.empty-hint {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 24px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  cursor: pointer;
}

.history-item:hover {
  transform: translateX(4px);
}

.history-info {
  flex: 1;
  min-width: 0;
}

.history-decision {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.history-meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: var(--text-muted);
  flex-wrap: wrap;
}

.history-arrow {
  font-size: 20px;
  color: var(--accent-purple);
  margin-left: 16px;
  transition: transform 0.3s ease;
}

.history-item:hover .history-arrow {
  transform: translateX(4px);
}

/* 页脚 */
.footer {
  padding: 48px 0;
  text-align: center;
  border-top: 1px solid var(--border-glow);
  color: var(--text-muted);
  font-size: 14px;
  position: relative;
}

.footer::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 2px;
  background: var(--gradient-nebula);
  border-radius: 2px;
}

/* 响应式 */
@media (max-width: 768px) {
  .hero {
    padding: 60px 0 40px;
  }
  .hero-title {
    font-size: 34px;
  }
  .hero-desc {
    font-size: 15px;
  }
  .floating-universes {
    display: none;
  }
  .section-title {
    font-size: 26px;
  }
  .features, .platform-section, .universes-intro, .history-section {
    padding: 50px 0;
  }
}
</style>
