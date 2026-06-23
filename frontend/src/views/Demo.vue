<template>
  <div class="demo-page">
    <!-- 固定导航栏 -->
    <nav class="navbar">
      <div class="container nav-inner">
        <div class="logo" @click="$router.push('/')">
          <span class="logo-icon">🌌</span>
          <span class="logo-text">平行宇宙实验室</span>
        </div>
        <div class="nav-actions">
          <div class="progress-indicator">
            <span class="progress-dot" :class="{ active: currentSection >= 0 }"></span>
            <span class="progress-dot" :class="{ active: currentSection >= 1 }"></span>
            <span class="progress-dot" :class="{ active: currentSection >= 2 }"></span>
            <span class="progress-dot" :class="{ active: currentSection >= 3 }"></span>
            <span class="progress-dot" :class="{ active: currentSection >= 4 }"></span>
          </div>
          <router-link to="/" class="btn btn-secondary nav-btn">退出演示</router-link>
        </div>
      </div>
    </nav>

    <!-- 滚动容器 -->
    <div class="demo-scroll" @scroll="handleScroll" ref="scrollContainer">
      <!-- Section 0: 封面 -->
      <section class="demo-section section-cover" ref="section0">
        <div class="section-inner">
          <div class="cover-badge fade-in-up">🏆 决赛演示模式 · 5分钟路演</div>
          <h1 class="cover-title fade-in-up" style="animation-delay: 0.1s">
            人生平行宇宙实验室
          </h1>
          <p class="cover-subtitle fade-in-up" style="animation-delay: 0.2s">
            AI 人生决策成长平台
          </p>
          <div class="cover-tags fade-in-up" style="animation-delay: 0.3s">
            <span class="cover-tag">DeepSeek AI</span>
            <span class="cover-tag">四重宇宙推演</span>
            <span class="cover-tag">决策全生命周期</span>
            <span class="cover-tag">Vue 3 + ECharts</span>
          </div>
          <div class="scroll-hint fade-in-up" style="animation-delay: 0.5s">
            <span class="scroll-text">向下滚动开始</span>
            <span class="scroll-arrow">↓</span>
          </div>
        </div>
      </section>

      <!-- Section 1: 项目价值 -->
      <section class="demo-section" ref="section1">
        <div class="section-inner">
          <div class="section-number">01</div>
          <h2 class="demo-section-title fade-in-up">项目价值</h2>
          <p class="demo-section-desc fade-in-up" style="animation-delay: 0.1s">
            解决真实痛点，创造长期价值
          </p>
          <div class="value-grid">
            <div class="glass-card value-card fade-in-up" style="animation-delay: 0.2s">
              <div class="value-icon">😰</div>
              <h3 class="value-name">决策焦虑</h3>
              <p class="value-text">87%的年轻人面临重大人生决策时感到焦虑，缺乏科学决策工具</p>
              <div class="value-stat">87%</div>
              <div class="value-stat-label">受决策焦虑困扰</div>
            </div>
            <div class="glass-card value-card fade-in-up" style="animation-delay: 0.3s">
              <div class="value-icon">🔮</div>
              <h3 class="value-name">未来预见</h3>
              <p class="value-text">通过AI模拟四重平行宇宙，让用户提前"体验"不同选择的人生轨迹</p>
              <div class="value-stat">4</div>
              <div class="value-stat-label">重平行宇宙推演</div>
            </div>
            <div class="glass-card value-card fade-in-up" style="animation-delay: 0.4s">
              <div class="value-icon">📈</div>
              <h3 class="value-name">持续成长</h3>
              <p class="value-text">不止于推演，更陪伴决策全生命周期：复盘、档案、体检、地图</p>
              <div class="value-stat">14</div>
              <div class="value-stat-label">项核心功能</div>
            </div>
            <div class="glass-card value-card fade-in-up" style="animation-delay: 0.5s">
              <div class="value-icon">🎯</div>
              <h3 class="value-name">科学决策</h3>
              <p class="value-text">六维决策能力评估 + AI案例库 + 后悔指数，量化决策质量</p>
              <div class="value-stat">6</div>
              <div class="value-stat-label">维决策能力模型</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: 核心创新 -->
      <section class="demo-section" ref="section2">
        <div class="section-inner">
          <div class="section-number">02</div>
          <h2 class="demo-section-title fade-in-up">核心创新</h2>
          <p class="demo-section-desc fade-in-up" style="animation-delay: 0.1s">
            四大创新点，重新定义AI辅助决策
          </p>
          <div class="innovation-list">
            <div class="glass-card innovation-card fade-in-up" style="animation-delay: 0.2s">
              <div class="innovation-left">
                <div class="innovation-num">01</div>
                <div class="innovation-icon">🌌</div>
              </div>
              <div class="innovation-right">
                <h3 class="innovation-title">四重平行宇宙推演引擎</h3>
                <p class="innovation-text">独创"安稳/突破/成长/创新"四维推演模型，基于DeepSeek大模型深度分析用户人生参数，生成四个维度的未来图景、时间线、收入变化与幸福指数</p>
                <div class="innovation-tags">
                  <span class="innovation-tag">DeepSeek AI</span>
                  <span class="innovation-tag">四维模型</span>
                  <span class="innovation-tag">未来时间线</span>
                </div>
              </div>
            </div>
            <div class="glass-card innovation-card fade-in-up" style="animation-delay: 0.3s">
              <div class="innovation-left">
                <div class="innovation-num">02</div>
                <div class="innovation-icon">🔄</div>
              </div>
              <div class="innovation-right">
                <h3 class="innovation-title">决策全生命周期闭环</h3>
                <p class="innovation-text">从"推演 → 执行 → 复盘 → 档案 → 体检"完整闭环，30/90/180天三阶段复盘机制，AI对比原始预测与实际结果，持续优化决策能力</p>
                <div class="innovation-tags">
                  <span class="innovation-tag">三阶段复盘</span>
                  <span class="innovation-tag">AI对比分析</span>
                  <span class="innovation-tag">决策档案</span>
                </div>
              </div>
            </div>
            <div class="glass-card innovation-card fade-in-up" style="animation-delay: 0.4s">
              <div class="innovation-left">
                <div class="innovation-num">03</div>
                <div class="innovation-icon">🩺</div>
              </div>
              <div class="innovation-right">
                <h3 class="innovation-title">六维决策能力体检系统</h3>
                <p class="innovation-text">风险承受力、执行力、长期主义、学习力、创新力、成长欲六维度量化评估，生成决策人格标签（探索型/创业型/成长型/稳健型），AI个性化建议</p>
                <div class="innovation-tags">
                  <span class="innovation-tag">六维雷达</span>
                  <span class="innovation-tag">人格标签</span>
                  <span class="innovation-tag">AI建议</span>
                </div>
              </div>
            </div>
            <div class="glass-card innovation-card fade-in-up" style="animation-delay: 0.5s">
              <div class="innovation-left">
                <div class="innovation-num">04</div>
                <div class="innovation-icon">🗺️</div>
              </div>
              <div class="innovation-right">
                <h3 class="innovation-title">AI人生地图可视化</h3>
                <p class="innovation-text">将人生路径抽象为可交互的树状图谱，16个节点、5种类型（起点/决策/事件/里程碑/终点），贝塞尔曲线连接，点击展开每个节点的可能未来</p>
                <div class="innovation-tags">
                  <span class="innovation-tag">SVG可视化</span>
                  <span class="innovation-tag">16节点</span>
                  <span class="innovation-tag">交互式探索</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: 技术架构 -->
      <section class="demo-section" ref="section3">
        <div class="section-inner">
          <div class="section-number">03</div>
          <h2 class="demo-section-title fade-in-up">技术架构</h2>
          <p class="demo-section-desc fade-in-up" style="animation-delay: 0.1s">
            前后端分离 · AI驱动 · 数据可视化
          </p>
          <div class="arch-container fade-in-up" style="animation-delay: 0.2s">
            <!-- 前端层 -->
            <div class="glass-card arch-layer">
              <div class="arch-layer-header">
                <span class="arch-layer-icon">🎨</span>
                <span class="arch-layer-name">前端展示层</span>
              </div>
              <div class="arch-techs">
                <span class="arch-tech">Vue 3</span>
                <span class="arch-tech">Vite</span>
                <span class="arch-tech">Vue Router</span>
                <span class="arch-tech">ECharts</span>
                <span class="arch-tech">html2canvas</span>
                <span class="arch-tech">jsPDF</span>
              </div>
              <div class="arch-desc">Composition API · 响应式设计 · 玻璃拟态UI · 动画系统</div>
            </div>
            <!-- 连接箭头 -->
            <div class="arch-arrow">↓</div>
            <!-- API层 -->
            <div class="glass-card arch-layer">
              <div class="arch-layer-header">
                <span class="arch-layer-icon">🔗</span>
                <span class="arch-layer-name">API 接口层</span>
              </div>
              <div class="arch-techs">
                <span class="arch-tech">Express.js</span>
                <span class="arch-tech">RESTful API</span>
                <span class="arch-tech">Axios</span>
                <span class="arch-tech">CORS</span>
              </div>
              <div class="arch-desc">15+ API端点 · 统一错误处理 · Mock数据兜底</div>
            </div>
            <!-- 连接箭头 -->
            <div class="arch-arrow">↓</div>
            <!-- AI + 数据层 -->
            <div class="arch-layer-row">
              <div class="glass-card arch-layer arch-layer-half">
                <div class="arch-layer-header">
                  <span class="arch-layer-icon">🤖</span>
                  <span class="arch-layer-name">AI 推演层</span>
                </div>
                <div class="arch-techs">
                  <span class="arch-tech">DeepSeek</span>
                  <span class="arch-tech">Prompt Engineering</span>
                </div>
                <div class="arch-desc">大模型推理 · 四宇宙生成 · 智能分析</div>
              </div>
              <div class="glass-card arch-layer arch-layer-half">
                <div class="arch-layer-header">
                  <span class="arch-layer-icon">💾</span>
                  <span class="arch-layer-name">数据层</span>
                </div>
                <div class="arch-techs">
                  <span class="arch-tech">MySQL</span>
                  <span class="arch-tech">localStorage</span>
                  <span class="arch-tech">sessionStorage</span>
                </div>
                <div class="arch-desc">历史记录 · 决策保存 · 跨页传参</div>
              </div>
            </div>
          </div>
          <div class="arch-stats fade-in-up" style="animation-delay: 0.4s">
            <div class="arch-stat">
              <div class="arch-stat-value">15+</div>
              <div class="arch-stat-label">API端点</div>
            </div>
            <div class="arch-stat">
              <div class="arch-stat-value">10</div>
              <div class="arch-stat-label">页面路由</div>
            </div>
            <div class="arch-stat">
              <div class="arch-stat-value">14</div>
              <div class="arch-stat-label">核心功能</div>
            </div>
            <div class="arch-stat">
              <div class="arch-stat-value">3</div>
              <div class="arch-stat-label">图表类型</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: 应用场景 -->
      <section class="demo-section" ref="section4">
        <div class="section-inner">
          <div class="section-number">04</div>
          <h2 class="demo-section-title fade-in-up">应用场景</h2>
          <p class="demo-section-desc fade-in-up" style="animation-delay: 0.1s">
            从个人决策到企业赋能，多场景落地
          </p>
          <div class="scenario-grid">
            <div class="glass-card scenario-card fade-in-up" style="animation-delay: 0.2s">
              <div class="scenario-icon">🎓</div>
              <h3 class="scenario-name">毕业生职业选择</h3>
              <p class="scenario-text">应届生在考研、就业、创业间犹豫时，AI推演三条路径的未来发展，辅助科学决策</p>
              <div class="scenario-users">目标用户：高校毕业生 · 职场新人</div>
            </div>
            <div class="glass-card scenario-card fade-in-up" style="animation-delay: 0.3s">
              <div class="scenario-icon">💼</div>
              <h3 class="scenario-name">职场转型决策</h3>
              <p class="scenario-text">大厂员工考虑跳槽创业、转行AI、gap year时，量化风险与收益，预见平行未来</p>
              <div class="scenario-users">目标用户：3-10年职场人</div>
            </div>
            <div class="glass-card scenario-card fade-in-up" style="animation-delay: 0.4s">
              <div class="scenario-icon">🏠</div>
              <h3 class="scenario-name">城市迁移规划</h3>
              <p class="scenario-text">考虑搬到一线城市或回老家发展时，AI结合城市数据模型分析就业、薪资、生活成本</p>
              <div class="scenario-users">目标用户：城市漂泊者 · 家庭决策者</div>
            </div>
            <div class="glass-card scenario-card fade-in-up" style="animation-delay: 0.5s">
              <div class="scenario-icon">📚</div>
              <h3 class="scenario-name">教育规划</h3>
              <p class="scenario-text">考研、留学、考证等教育投资决策，AI推演长期回报与机会成本</p>
              <div class="scenario-users">目标用户：学生 · 终身学习者</div>
            </div>
            <div class="glass-card scenario-card fade-in-up" style="animation-delay: 0.6s">
              <div class="scenario-icon">🏢</div>
              <h3 class="scenario-name">企业人才发展</h3>
              <p class="scenario-text">企业内训场景，帮助员工做职业规划决策，提升员工满意度与留存率</p>
              <div class="scenario-users">目标用户：HR · 企业培训师</div>
            </div>
            <div class="glass-card scenario-card fade-in-up" style="animation-delay: 0.7s">
              <div class="scenario-icon">🧠</div>
              <h3 class="scenario-name">心理咨询辅助</h3>
              <p class="scenario-text">心理咨询师辅助工具，帮助来访者理清决策困惑，量化决策能力维度</p>
              <div class="scenario-users">目标用户：心理咨询师 · 来访者</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 5: 结尾 -->
      <section class="demo-section section-end" ref="section4">
        <div class="section-inner">
          <h2 class="end-title fade-in-up">让每一个选择<br/>都有平行宇宙的答案</h2>
          <p class="end-subtitle fade-in-up" style="animation-delay: 0.1s">
            人生没有标准答案，但AI可以帮你预见可能
          </p>
          <div class="end-actions fade-in-up" style="animation-delay: 0.2s">
            <router-link to="/create" class="btn btn-primary end-btn">🚀 立即体验</router-link>
            <router-link to="/dashboard" class="btn btn-secondary end-btn">📊 查看数据</router-link>
            <router-link to="/" class="btn btn-secondary end-btn">🏠 返回首页</router-link>
          </div>
          <div class="end-footer fade-in-up" style="animation-delay: 0.3s">
            人生平行宇宙实验室 · AI人生决策成长平台 · 2026
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const scrollContainer = ref(null)
const currentSection = ref(0)

const sectionRefs = [
  ref(null), ref(null), ref(null), ref(null), ref(null)
]

// 使用模板引用
const section0 = ref(null)
const section1 = ref(null)
const section2 = ref(null)
const section3 = ref(null)
const section4 = ref(null)

const handleScroll = () => {
  if (!scrollContainer.value) return
  const scrollTop = scrollContainer.value.scrollTop
  const winHeight = scrollContainer.value.clientHeight
  const sectionIndex = Math.round(scrollTop / winHeight)
  currentSection.value = Math.min(Math.max(0, sectionIndex), 4)
}

const scrollToSection = (index) => {
  if (!scrollContainer.value) return
  const winHeight = scrollContainer.value.clientHeight
  scrollContainer.value.scrollTo({
    top: index * winHeight,
    behavior: 'smooth'
  })
}

// 键盘导航
const handleKeydown = (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault()
    const next = Math.min(currentSection.value + 1, 4)
    scrollToSection(next)
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault()
    const prev = Math.max(currentSection.value - 1, 0)
    scrollToSection(prev)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.demo-page {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 导航栏 */
.navbar {
  position: relative;
  z-index: 100;
  flex-shrink: 0;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* 进度指示器 */
.progress-indicator {
  display: flex;
  gap: 8px;
  align-items: center;
}

.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-block;
}

.progress-dot.active {
  background: var(--accent-purple);
  box-shadow: 0 0 12px rgba(138, 99, 255, 0.6);
  transform: scale(1.3);
}

/* 滚动容器 */
.demo-scroll {
  flex: 1;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.demo-scroll::-webkit-scrollbar {
  width: 4px;
}

.demo-scroll::-webkit-scrollbar-thumb {
  background: rgba(138, 99, 255, 0.3);
  border-radius: 2px;
}

/* 每个 section */
.demo-section {
  min-height: 100%;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 60px;
  position: relative;
}

.section-inner {
  max-width: 1100px;
  width: 100%;
}

/* 区块编号 */
.section-number {
  font-size: 80px;
  font-weight: 900;
  background: var(--gradient-nebula);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 4s ease infinite;
  line-height: 1;
  margin-bottom: 12px;
  opacity: 0.3;
}

/* 区块标题 */
.demo-section-title {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.demo-section-desc {
  font-size: 16px;
  color: var(--text-secondary);
  letter-spacing: 0.3px;
  margin-bottom: 40px;
}

/* ===== 封面 ===== */
.section-cover {
  text-align: center;
}

.cover-badge {
  display: inline-block;
  padding: 8px 24px;
  background: rgba(138, 99, 255, 0.12);
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-pill);
  font-size: 14px;
  font-weight: 600;
  color: var(--accent-purple);
  letter-spacing: 0.5px;
  margin-bottom: 24px;
}

.cover-title {
  font-size: 56px;
  font-weight: 900;
  letter-spacing: 2px;
  background: var(--gradient-nebula);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 4s ease infinite;
  margin-bottom: 16px;
  line-height: 1.2;
}

.cover-subtitle {
  font-size: 22px;
  color: var(--text-secondary);
  letter-spacing: 1px;
  margin-bottom: 32px;
}

.cover-tags {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;
}

.cover-tag {
  padding: 8px 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill);
  font-size: 14px;
  color: var(--text-secondary);
  letter-spacing: 0.3px;
}

.scroll-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  animation: float 2s ease-in-out infinite;
}

.scroll-text {
  font-size: 13px;
  letter-spacing: 1px;
}

.scroll-arrow {
  font-size: 24px;
}

/* ===== 项目价值 ===== */
.value-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.value-card {
  padding: 28px 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.value-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.value-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.value-text {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
}

.value-stat {
  font-size: 40px;
  font-weight: 900;
  background: var(--gradient-nebula);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 4s ease infinite;
  line-height: 1;
}

.value-stat-label {
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.3px;
  margin-top: 4px;
}

/* ===== 核心创新 ===== */
.innovation-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.innovation-card {
  padding: 28px 32px;
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.innovation-left {
  flex-shrink: 0;
  text-align: center;
  width: 80px;
}

.innovation-num {
  font-size: 28px;
  font-weight: 900;
  color: var(--accent-purple);
  opacity: 0.4;
  margin-bottom: 8px;
}

.innovation-icon {
  font-size: 40px;
  filter: drop-shadow(0 0 12px rgba(138, 99, 255, 0.3));
}

.innovation-right {
  flex: 1;
}

.innovation-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.innovation-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 14px;
}

.innovation-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.innovation-tag {
  padding: 4px 14px;
  background: rgba(138, 99, 255, 0.1);
  border: 1px solid rgba(138, 99, 255, 0.2);
  border-radius: var(--radius-pill);
  font-size: 12px;
  color: var(--accent-purple);
  letter-spacing: 0.3px;
}

/* ===== 技术架构 ===== */
.arch-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.arch-layer {
  padding: 24px 32px;
  width: 100%;
  max-width: 700px;
}

.arch-layer-half {
  flex: 1;
}

.arch-layer-row {
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 700px;
}

.arch-layer-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.arch-layer-icon {
  font-size: 22px;
}

.arch-layer-name {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.5px;
}

.arch-techs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.arch-tech {
  padding: 5px 14px;
  background: rgba(74, 158, 255, 0.1);
  border: 1px solid rgba(74, 158, 255, 0.2);
  border-radius: var(--radius-pill);
  font-size: 12px;
  color: var(--accent-blue);
  letter-spacing: 0.3px;
}

.arch-desc {
  font-size: 13px;
  color: var(--text-muted);
  letter-spacing: 0.2px;
}

.arch-arrow {
  font-size: 24px;
  color: var(--accent-purple);
  opacity: 0.5;
  margin: 8px 0;
  animation: float 2s ease-in-out infinite;
}

.arch-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-top: 36px;
}

.arch-stat {
  text-align: center;
}

.arch-stat-value {
  font-size: 36px;
  font-weight: 900;
  background: var(--gradient-nebula);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 4s ease infinite;
  line-height: 1;
}

.arch-stat-label {
  font-size: 13px;
  color: var(--text-muted);
  letter-spacing: 0.3px;
  margin-top: 6px;
}

/* ===== 应用场景 ===== */
.scenario-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.scenario-card {
  padding: 28px 24px;
}

.scenario-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.scenario-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.scenario-text {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 16px;
}

.scenario-users {
  font-size: 12px;
  color: var(--text-muted);
  letter-spacing: 0.3px;
  padding-top: 12px;
  border-top: 1px solid var(--border-subtle);
}

/* ===== 结尾 ===== */
.section-end {
  text-align: center;
}

.end-title {
  font-size: 42px;
  font-weight: 800;
  letter-spacing: 1px;
  background: var(--gradient-nebula);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 4s ease infinite;
  margin-bottom: 20px;
  line-height: 1.4;
}

.end-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  letter-spacing: 0.5px;
  margin-bottom: 40px;
}

.end-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;
}

.end-btn {
  padding: 14px 32px;
  font-size: 15px;
}

.end-footer {
  font-size: 13px;
  color: var(--text-muted);
  letter-spacing: 0.5px;
}

/* ===== 响应式 ===== */
@media (max-width: 1024px) {
  .value-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .scenario-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .cover-title {
    font-size: 42px;
  }
}

@media (max-width: 768px) {
  .demo-section {
    padding: 60px 16px 40px;
  }
  .section-number {
    font-size: 56px;
  }
  .demo-section-title {
    font-size: 28px;
  }
  .value-grid {
    grid-template-columns: 1fr;
  }
  .scenario-grid {
    grid-template-columns: 1fr;
  }
  .innovation-card {
    flex-direction: column;
    gap: 16px;
    padding: 24px 20px;
  }
  .innovation-left {
    display: flex;
    align-items: center;
    gap: 12px;
    width: auto;
  }
  .innovation-num {
    margin-bottom: 0;
  }
  .arch-layer-row {
    flex-direction: column;
  }
  .arch-stats {
    gap: 24px;
    flex-wrap: wrap;
  }
  .cover-title {
    font-size: 36px;
  }
  .cover-tags {
    gap: 8px;
  }
  .cover-tag {
    padding: 6px 14px;
    font-size: 12px;
  }
  .end-title {
    font-size: 28px;
  }
  .progress-indicator {
    display: none;
  }
}
</style>
