const pptxgen = require("pptxgenjs");
const pres = new pptxgen();

pres.layout = "LAYOUT_WIDE"; // 13.33" x 7.5"
pres.author = "人生平行宇宙实验室";
pres.title = "人生平行宇宙实验室 - AI人生决策成长平台";

// ===== 色彩系统 =====
const C = {
  bg: "0A0A1A",
  bgCard: "12122A",
  purple: "8A63FF",
  blue: "4A9EFF",
  cyan: "00E5FF",
  pink: "FF6B9D",
  green: "4ADE80",
  orange: "FFA500",
  white: "F0F0FA",
  textSec: "C8C8E8",
  muted: "8A8AAA",
  border: "2A2A4A",
};

// ===== 辅助函数 =====
function addDarkBg(slide) {
  slide.background = { color: C.bg };
}

function addCard(slide, x, y, w, h, opts = {}) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: opts.fill || C.bgCard },
    line: { color: opts.border || C.border, width: 1 },
    rectRadius: 0.05,
  });
  if (opts.accent) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.06, h,
      fill: { color: opts.accent },
      line: { width: 0 },
    });
  }
}

function addPageNum(slide, num) {
  slide.addText(String(num).padStart(2, "0"), {
    x: 12.3, y: 7.0, w: 0.8, h: 0.35,
    fontSize: 10, color: C.textSec, align: "right", fontFace: "Consolas",
  });
}

function addTopBar(slide) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 13.33, h: 0.04,
    fill: { color: C.purple }, line: { width: 0 },
  });
}

// ===== Slide 1: 封面 =====
{
  const s = pres.addSlide();
  addDarkBg(s);
  // 装饰圆
  s.addShape(pres.shapes.OVAL, { x: 8.5, y: -1.5, w: 6, h: 6, fill: { color: C.purple, transparency: 90 }, line: { width: 0 } });
  s.addShape(pres.shapes.OVAL, { x: -2, y: 3.5, w: 5, h: 5, fill: { color: C.blue, transparency: 92 }, line: { width: 0 } });
  // 标题
  s.addText("人生平行宇宙实验室", {
    x: 1, y: 2.0, w: 11, h: 1.2,
    fontSize: 44, bold: true, color: C.white, fontFace: "Arial Black",
    align: "center", charSpacing: 2,
  });
  // 副标题
  s.addText("AI 人生决策成长平台", {
    x: 1, y: 3.2, w: 11, h: 0.6,
    fontSize: 22, color: C.cyan, fontFace: "Arial",
    align: "center", charSpacing: 3,
  });
  // 分割线
  s.addShape(pres.shapes.RECTANGLE, { x: 5.17, y: 4.0, w: 3, h: 0.03, fill: { color: C.purple }, line: { width: 0 } });
  // 标签
  s.addText("DeepSeek AI  ·  Vue 3  ·  ECharts  ·  Express.js", {
    x: 1, y: 4.3, w: 11, h: 0.4,
    fontSize: 13, color: C.textSec, fontFace: "Consolas",
    align: "center", charSpacing: 1,
  });
  // 底部
  s.addText("2026 创新竞赛", {
    x: 1, y: 6.5, w: 11, h: 0.4,
    fontSize: 12, color: C.textSec, align: "center",
  });
}

// ===== Slide 2: 项目背景 =====
{
  const s = pres.addSlide();
  addDarkBg(s); addTopBar(s);
  s.addText("项目背景", { x: 0.8, y: 0.4, w: 6, h: 0.7, fontSize: 32, bold: true, color: C.white, fontFace: "Arial" });
  s.addText("PROJECT BACKGROUND", { x: 0.8, y: 1.0, w: 6, h: 0.3, fontSize: 11, color: C.textSec, fontFace: "Consolas", charSpacing: 2 });
  // 大数字
  addCard(s, 0.8, 1.6, 3.5, 2.2, { accent: C.pink });
  s.addText("87%", { x: 0.8, y: 1.8, w: 3.5, h: 1.0, fontSize: 56, bold: true, color: C.pink, align: "center", fontFace: "Arial Black" });
  s.addText("年轻人面临重大决策\n时感到焦虑", { x: 1.0, y: 2.8, w: 3.1, h: 0.8, fontSize: 12, color: C.textSec, align: "center", lineSpacingMultiple: 1.3 });
  // 右侧文字
  s.addText([
    { text: "如果当初做了另一个选择，你的人生会怎样？", options: { fontSize: 18, bold: true, color: C.cyan, breakLine: true } },
    { text: "", options: { breakLine: true, fontSize: 8 } },
    { text: "考研还是就业？留在大厂还是创业？留在北京还是回老家？", options: { fontSize: 14, color: C.white, breakLine: true } },
    { text: "这些决定可能改变未来十年的人生轨迹。", options: { fontSize: 14, color: C.white, breakLine: true } },
    { text: "但做决定之前，永远看不到另一条路上会发生什么。", options: { fontSize: 14, color: C.textSec, breakLine: true } },
  ], { x: 4.8, y: 1.6, w: 7.5, h: 2.2, lineSpacingMultiple: 1.5 });
  // 底部三个痛点
  const pains = [
    { icon: "?", title: "缺乏科学工具", desc: "传统决策靠经验和直觉" },
    { icon: "!", title: "无法预见未来", desc: "看不到另一条路的结果" },
    { icon: "x", title: "决策后无法复盘", desc: "没有对比和成长追踪" },
  ];
  pains.forEach((p, i) => {
    const x = 0.8 + i * 4.1;
    addCard(s, x, 4.2, 3.8, 2.2, { accent: [C.purple, C.blue, C.cyan][i] });
    s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: 4.5, w: 0.6, h: 0.6, fill: { color: [C.purple, C.blue, C.cyan][i] }, line: { width: 0 } });
    s.addText(p.icon, { x: x + 0.3, y: 4.5, w: 0.6, h: 0.6, fontSize: 20, bold: true, color: C.bg, align: "center", valign: "middle" });
    s.addText(p.title, { x: x + 1.1, y: 4.5, w: 2.5, h: 0.35, fontSize: 14, bold: true, color: C.white });
    s.addText(p.desc, { x: x + 1.1, y: 4.85, w: 2.5, h: 0.3, fontSize: 11, color: C.textSec });
  });
  addPageNum(s, 2);
}

// ===== Slide 3: 用户痛点 =====
{
  const s = pres.addSlide();
  addDarkBg(s); addTopBar(s);
  s.addText("用户痛点", { x: 0.8, y: 0.4, w: 6, h: 0.7, fontSize: 32, bold: true, color: C.white });
  s.addText("USER PAIN POINTS", { x: 0.8, y: 1.0, w: 6, h: 0.3, fontSize: 11, color: C.textSec, fontFace: "Consolas", charSpacing: 2 });
  const pains = [
    { num: "01", title: "决策焦虑", desc: "面对考研、就业、创业等重大选择时，87%的年轻人感到焦虑和迷茫，缺乏科学依据支撑决策。", color: C.purple },
    { num: "02", title: "信息不对称", desc: "无法同时走两条路，无法预知另一条路的终点。传统方式只能靠问朋友、查资料，停留在经验层面。", color: C.blue },
    { num: "03", title: "缺乏个性化", desc: "市面上的职业规划工具只提供性格测试，告诉你适合做什么，但人生不是性格测试。", color: C.cyan },
    { num: "04", title: "无成长追踪", desc: "做完决定后没有复盘机制，无法对比预测与实际，决策能力无法量化提升。", color: C.pink },
  ];
  pains.forEach((p, i) => {
    const y = 1.6 + i * 1.35;
    addCard(s, 0.8, y, 11.5, 1.15, { accent: p.color });
    s.addText(p.num, { x: 1.1, y: y + 0.15, w: 1.0, h: 0.8, fontSize: 36, bold: true, color: p.color, fontFace: "Arial Black", valign: "middle" });
    s.addText(p.title, { x: 2.3, y: y + 0.15, w: 2.5, h: 0.4, fontSize: 16, bold: true, color: C.white, valign: "middle" });
    s.addText(p.desc, { x: 2.3, y: y + 0.55, w: 9.5, h: 0.5, fontSize: 12, color: C.textSec, valign: "middle" });
  });
  addPageNum(s, 3);
}

// ===== Slide 4: 解决方案 =====
{
  const s = pres.addSlide();
  addDarkBg(s); addTopBar(s);
  s.addText("解决方案", { x: 0.8, y: 0.4, w: 6, h: 0.7, fontSize: 32, bold: true, color: C.white });
  s.addText("OUR SOLUTION", { x: 0.8, y: 1.0, w: 6, h: 0.3, fontSize: 11, color: C.textSec, fontFace: "Consolas", charSpacing: 2 });
  s.addText("用 AI 帮你预见不同选择下的人生轨迹", { x: 0.8, y: 1.5, w: 11, h: 0.5, fontSize: 18, color: C.cyan, bold: true });
  // 四个宇宙卡片
  const universes = [
    { letter: "A", name: "安稳宇宙", desc: "延续当前轨迹\n稳中求进", color: C.green },
    { letter: "B", name: "突破宇宙", desc: "坚定执行决定\n破局重生", color: C.pink },
    { letter: "C", name: "成长宇宙", desc: "渐进转型路径\n平衡发展", color: C.blue },
    { letter: "D", name: "创新宇宙", desc: "差异化路线\n探索可能", color: C.cyan },
  ];
  universes.forEach((u, i) => {
    const x = 0.8 + i * 3.05;
    addCard(s, x, 2.3, 2.8, 3.0, { accent: u.color });
    s.addShape(pres.shapes.OVAL, { x: x + 0.95, y: 2.6, w: 0.9, h: 0.9, fill: { color: u.color }, line: { width: 0 } });
    s.addText(u.letter, { x: x + 0.95, y: 2.6, w: 0.9, h: 0.9, fontSize: 32, bold: true, color: C.bg, align: "center", valign: "middle" });
    s.addText(u.name, { x: x + 0.2, y: 3.65, w: 2.4, h: 0.4, fontSize: 16, bold: true, color: C.white, align: "center" });
    s.addText(u.desc, { x: x + 0.2, y: 4.1, w: 2.4, h: 0.8, fontSize: 12, color: C.textSec, align: "center", lineSpacingMultiple: 1.3 });
  });
  // 底部流程
  s.addText("输入人生参数  →  AI 推演四重宇宙  →  深度分析  →  决策成长闭环", {
    x: 0.8, y: 5.7, w: 11.5, h: 0.5, fontSize: 13, color: C.cyan, align: "center", bold: true, fontFace: "Consolas",
  });
  addPageNum(s, 4);
}

// ===== Slide 5: 核心功能 =====
{
  const s = pres.addSlide();
  addDarkBg(s); addTopBar(s);
  s.addText("核心功能", { x: 0.8, y: 0.4, w: 6, h: 0.7, fontSize: 32, bold: true, color: C.white });
  s.addText("CORE FEATURES · 14项", { x: 0.8, y: 1.0, w: 6, h: 0.3, fontSize: 11, color: C.textSec, fontFace: "Consolas", charSpacing: 2 });
  const features = [
    { name: "四重宇宙推演", cat: "核心" }, { name: "AI 决策树", cat: "分析" },
    { name: "风险预警", cat: "分析" }, { name: "AI 未来来信", cat: "分析" },
    { name: "后悔指数", cat: "分析" }, { name: "人生价值雷达", cat: "分析" },
    { name: "AI 案例库", cat: "分析" }, { name: "AI 未来采访", cat: "分析" },
    { name: "决策复盘", cat: "成长" }, { name: "决策档案", cat: "成长" },
    { name: "AI 人生地图", cat: "成长" }, { name: "AI 决策体检", cat: "成长" },
    { name: "PDF 报告导出", cat: "工具" }, { name: "数据驾驶舱", cat: "工具" },
  ];
  const catColors = { "核心": C.purple, "分析": C.blue, "成长": C.cyan, "工具": C.green };
  features.forEach((f, i) => {
    const col = i % 7;
    const row = Math.floor(i / 7);
    const x = 0.8 + col * 1.72;
    const y = 1.6 + row * 1.7;
    const cc = catColors[f.cat];
    addCard(s, x, y, 1.55, 1.45, { accent: cc });
    s.addText(String(i + 1).padStart(2, "0"), { x: x + 0.15, y: y + 0.1, w: 0.5, h: 0.3, fontSize: 10, color: C.textSec, fontFace: "Consolas" });
    s.addText(f.name, { x: x + 0.1, y: y + 0.4, w: 1.35, h: 0.6, fontSize: 12, bold: true, color: C.white, valign: "top" });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.15, y: y + 1.05, w: 0.5, h: 0.2, fill: { color: cc }, line: { width: 0 } });
    s.addText(f.cat, { x: x + 0.7, y: y + 1.05, w: 0.7, h: 0.2, fontSize: 9, color: C.textSec, valign: "middle" });
  });
  addPageNum(s, 5);
}

// ===== Slide 6: AI能力 =====
{
  const s = pres.addSlide();
  addDarkBg(s); addTopBar(s);
  s.addText("AI 能力", { x: 0.8, y: 0.4, w: 6, h: 0.7, fontSize: 32, bold: true, color: C.white });
  s.addText("AI CAPABILITIES", { x: 0.8, y: 1.0, w: 6, h: 0.3, fontSize: 11, color: C.textSec, fontFace: "Consolas", charSpacing: 2 });
  // DeepSeek 核心
  addCard(s, 0.8, 1.6, 5.3, 5.0, { accent: C.purple });
  s.addText("DeepSeek", { x: 1.1, y: 1.9, w: 4.7, h: 0.6, fontSize: 28, bold: true, color: C.purple, fontFace: "Arial Black" });
  s.addText("大模型推理引擎", { x: 1.1, y: 2.5, w: 4.7, h: 0.4, fontSize: 14, color: C.cyan });
  const aiFeatures = [
    "四重平行宇宙推演 — 生成四个维度的完整未来图景",
    "AI 决策树 — 树状图展示路径和概率",
    "AI 未来来信 — 3/5/10年后的自己写信",
    "AI 未来采访 — 问答形式呈现未来视角",
    "AI 案例库 — 相似用户案例匹配",
    "AI 决策体检 — 六维能力量化评估",
    "Prompt Engineering — 结构化JSON输出",
  ];
  aiFeatures.forEach((f, i) => {
    s.addText([{ text: f, options: { bullet: { code: "25CF" }, color: C.textSec } }], {
      x: 1.1, y: 3.1 + i * 0.45, w: 4.7, h: 0.4, fontSize: 12, color: C.textSec, lineSpacingMultiple: 1.2,
    });
  });
  // 右侧能力矩阵
  const abilities = [
    { label: "推演维度", value: "4 重宇宙", color: C.purple },
    { label: "分析模块", value: "8 项深度分析", color: C.blue },
    { label: "时间跨度", value: "5 年轨迹", color: C.cyan },
    { label: "评估维度", value: "6 维能力", color: C.green },
    { label: "API 端点", value: "15 个", color: C.pink },
    { label: "人格标签", value: "4 种类型", color: C.orange },
  ];
  abilities.forEach((a, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 6.5 + col * 3.0;
    const y = 1.6 + row * 1.65;
    addCard(s, x, y, 2.8, 1.45, { accent: a.color });
    s.addText(a.value, { x: x + 0.2, y: y + 0.2, w: 2.4, h: 0.6, fontSize: 22, bold: true, color: a.color, fontFace: "Arial Black" });
    s.addText(a.label, { x: x + 0.2, y: y + 0.85, w: 2.4, h: 0.35, fontSize: 12, color: C.textSec });
  });
  addPageNum(s, 6);
}

// ===== Slide 7: 技术架构 =====
{
  const s = pres.addSlide();
  addDarkBg(s); addTopBar(s);
  s.addText("技术架构", { x: 0.8, y: 0.4, w: 6, h: 0.7, fontSize: 32, bold: true, color: C.white });
  s.addText("TECH ARCHITECTURE", { x: 0.8, y: 1.0, w: 6, h: 0.3, fontSize: 11, color: C.textSec, fontFace: "Consolas", charSpacing: 2 });
  // 三层架构
  const layers = [
    { name: "前端展示层", tech: "Vue 3 · Vite · Vue Router · ECharts · html2canvas · jsPDF", desc: "10 页面 · 7 组件 · 玻璃拟态UI · 响应式设计", color: C.purple, y: 1.5 },
    { name: "API 接口层", tech: "Express.js · RESTful API · CORS · Axios", desc: "15 个端点 · 统一错误处理 · Mock 数据兜底", color: C.blue, y: 3.2 },
  ];
  layers.forEach(l => {
    addCard(s, 1.5, l.y, 10.3, 1.4, { accent: l.color });
    s.addText(l.name, { x: 1.8, y: l.y + 0.15, w: 3, h: 0.4, fontSize: 16, bold: true, color: l.color });
    s.addText(l.tech, { x: 1.8, y: l.y + 0.55, w: 9.7, h: 0.35, fontSize: 12, color: C.white, fontFace: "Consolas" });
    s.addText(l.desc, { x: 1.8, y: l.y + 0.9, w: 9.7, h: 0.35, fontSize: 11, color: C.textSec });
  });
  // 箭头
  s.addShape(pres.shapes.RECTANGLE, { x: 6.4, y: 2.95, w: 0.5, h: 0.25, fill: { color: C.textSec }, line: { width: 0 } });
  // 底层双栏
  addCard(s, 1.5, 4.9, 5.0, 1.7, { accent: C.cyan });
  s.addText("AI 推演层", { x: 1.8, y: 5.05, w: 4.4, h: 0.4, fontSize: 16, bold: true, color: C.cyan });
  s.addText("DeepSeek 大模型", { x: 1.8, y: 5.45, w: 4.4, h: 0.35, fontSize: 12, color: C.white, fontFace: "Consolas" });
  s.addText("Prompt Engineering · 结构化JSON", { x: 1.8, y: 5.8, w: 4.4, h: 0.35, fontSize: 11, color: C.textSec });
  s.addText("容错降级 · Mock 数据兜底", { x: 1.8, y: 6.15, w: 4.4, h: 0.35, fontSize: 11, color: C.textSec });
  addCard(s, 6.8, 4.9, 5.0, 1.7, { accent: C.green });
  s.addText("数据层", { x: 7.1, y: 5.05, w: 4.4, h: 0.4, fontSize: 16, bold: true, color: C.green });
  s.addText("MySQL · localStorage · sessionStorage", { x: 7.1, y: 5.45, w: 4.4, h: 0.35, fontSize: 12, color: C.white, fontFace: "Consolas" });
  s.addText("历史记录持久化 · 跨页传参", { x: 7.1, y: 5.8, w: 4.4, h: 0.35, fontSize: 11, color: C.textSec });
  s.addText("用户偏好 · 决策档案", { x: 7.1, y: 6.15, w: 4.4, h: 0.35, fontSize: 11, color: C.textSec });
  addPageNum(s, 7);
}

// ===== Slide 8: 创新点 =====
{
  const s = pres.addSlide();
  addDarkBg(s); addTopBar(s);
  s.addText("创新点", { x: 0.8, y: 0.4, w: 6, h: 0.7, fontSize: 32, bold: true, color: C.white });
  s.addText("FOUR INNOVATIONS", { x: 0.8, y: 1.0, w: 6, h: 0.3, fontSize: 11, color: C.textSec, fontFace: "Consolas", charSpacing: 2 });
  const innovations = [
    { num: "01", title: "四重平行宇宙推演引擎", desc: "独创安稳/突破/成长/创新四维模型，基于DeepSeek大模型深度推演，每宇宙含未来图景、时间线、收入变化与幸福指数。", color: C.purple },
    { num: "02", title: "决策全生命周期闭环", desc: "推演到体检五阶段闭环，30/90/180天三阶段复盘，AI对比原始预测与实际结果，持续优化决策能力。", color: C.blue },
    { num: "03", title: "六维决策能力体检系统", desc: "风险承受力、执行力、长期主义、学习力、创新力、成长欲六维量化评估，生成决策人格标签。", color: C.cyan },
    { num: "04", title: "AI人生地图可视化", desc: "16节点5类型树状图谱，贝塞尔曲线连接，点击展开每个节点的可能未来，交互式探索。", color: C.pink },
  ];
  innovations.forEach((inn, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.8 + col * 5.9;
    const y = 1.5 + row * 2.7;
    addCard(s, x, y, 5.6, 2.4, { accent: inn.color });
    s.addText(inn.num, { x: x + 0.3, y: y + 0.2, w: 1.2, h: 0.7, fontSize: 36, bold: true, color: inn.color, fontFace: "Arial Black" });
    s.addText(inn.title, { x: x + 1.5, y: y + 0.25, w: 3.8, h: 0.6, fontSize: 15, bold: true, color: C.white, valign: "middle" });
    s.addText(inn.desc, { x: x + 0.3, y: y + 1.1, w: 5.0, h: 1.1, fontSize: 12, color: C.textSec, lineSpacingMultiple: 1.4 });
  });
  addPageNum(s, 8);
}

// ===== Slide 9: 商业模式 =====
{
  const s = pres.addSlide();
  addDarkBg(s); addTopBar(s);
  s.addText("商业模式", { x: 0.8, y: 0.4, w: 6, h: 0.7, fontSize: 32, bold: true, color: C.white });
  s.addText("BUSINESS MODEL", { x: 0.8, y: 1.0, w: 6, h: 0.3, fontSize: 11, color: C.textSec, fontFace: "Consolas", charSpacing: 2 });
  const models = [
    { tag: "B2C", title: "个人订阅", price: "9.9", unit: "元/月", desc: "面向20-35岁面临人生决策的年轻用户。基础版免费（Mock数据），Pro版提供真实AI推演、决策体检和PDF导出。", color: C.purple, users: "目标用户: 2000万+" },
    { tag: "B2B", title: "企业服务", price: "定制", unit: "年费", desc: "面向企业HR和培训部门，提供员工职业规划辅助工具。帮助人才发展决策，提升员工满意度和留存率。", color: C.blue, users: "目标客户: 中大型企业" },
    { tag: "B2G", title: "高校合作", price: "合作", unit: "项目", desc: "面向高校就业指导中心，作为就业辅导工具部署。帮助毕业生科学规划职业路径，提升就业质量。", color: C.cyan, users: "目标机构: 高校就业中心" },
  ];
  models.forEach((m, i) => {
    const x = 0.8 + i * 4.1;
    addCard(s, x, 1.5, 3.8, 5.0, { accent: m.color });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.3, y: 1.8, w: 1.0, h: 0.35, fill: { color: m.color }, line: { width: 0 } });
    s.addText(m.tag, { x: x + 0.3, y: 1.8, w: 1.0, h: 0.35, fontSize: 12, bold: true, color: C.bg, align: "center", valign: "middle" });
    s.addText(m.title, { x: x + 0.3, y: 2.3, w: 3.2, h: 0.5, fontSize: 20, bold: true, color: C.white });
    s.addText(m.price, { x: x + 0.3, y: 2.9, w: 3.2, h: 0.8, fontSize: 40, bold: true, color: m.color, fontFace: "Arial Black" });
    s.addText(m.unit, { x: x + 0.3, y: 3.7, w: 3.2, h: 0.35, fontSize: 14, color: C.textSec });
    s.addText(m.desc, { x: x + 0.3, y: 4.3, w: 3.2, h: 1.5, fontSize: 12, color: C.textSec, lineSpacingMultiple: 1.4 });
    s.addText(m.users, { x: x + 0.3, y: 5.9, w: 3.2, h: 0.35, fontSize: 11, color: m.color, bold: true });
  });
  s.addText("C端口碑  →  B端变现  →  G端背书  ·  三轮驱动商业飞轮", {
    x: 0.8, y: 6.7, w: 11.5, h: 0.4, fontSize: 13, color: C.cyan, align: "center", bold: true,
  });
  addPageNum(s, 9);
}

// ===== Slide 10: 社会价值 =====
{
  const s = pres.addSlide();
  addDarkBg(s); addTopBar(s);
  s.addText("社会价值", { x: 0.8, y: 0.4, w: 6, h: 0.7, fontSize: 32, bold: true, color: C.white });
  s.addText("SOCIAL VALUE", { x: 0.8, y: 1.0, w: 6, h: 0.3, fontSize: 11, color: C.textSec, fontFace: "Consolas", charSpacing: 2 });
  const values = [
    { title: "减少决策焦虑", desc: "当用户看到四个平行宇宙的推演结果，焦虑感显著降低。不确定性被具象化，看得见的可能性比看不见的未来更容易接受。", stat: "87%", statLabel: "年轻人决策焦虑比例", color: C.purple },
    { title: "量化决策能力", desc: "六维决策能力体检把抽象概念变成可测量、可追踪的指标。用户知道哪个维度强、哪个弱，有针对性地提升。", stat: "6", statLabel: "维度量化评估", color: C.blue },
    { title: "AI 民主化", desc: "大模型推理能力不应只服务大企业。9.9元/月，低于一杯咖啡，让每个普通人都能获得AI辅助决策的能力。", stat: "9.9", statLabel: "元/月 普惠定价", color: C.cyan },
  ];
  values.forEach((v, i) => {
    const x = 0.8 + i * 4.1;
    addCard(s, x, 1.5, 3.8, 4.5, { accent: v.color });
    s.addText(v.stat, { x: x + 0.3, y: 1.8, w: 3.2, h: 1.0, fontSize: 52, bold: true, color: v.color, fontFace: "Arial Black", align: "center" });
    s.addText(v.statLabel, { x: x + 0.3, y: 2.8, w: 3.2, h: 0.35, fontSize: 12, color: C.textSec, align: "center" });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 1.4, y: 3.3, w: 1.0, h: 0.03, fill: { color: v.color }, line: { width: 0 } });
    s.addText(v.title, { x: x + 0.3, y: 3.5, w: 3.2, h: 0.4, fontSize: 16, bold: true, color: C.white, align: "center" });
    s.addText(v.desc, { x: x + 0.3, y: 4.0, w: 3.2, h: 1.8, fontSize: 12, color: C.textSec, lineSpacingMultiple: 1.4, align: "center" });
  });
  addPageNum(s, 10);
}

// ===== Slide 11: 项目成果 =====
{
  const s = pres.addSlide();
  addDarkBg(s); addTopBar(s);
  s.addText("项目成果", { x: 0.8, y: 0.4, w: 6, h: 0.7, fontSize: 32, bold: true, color: C.white });
  s.addText("PROJECT RESULTS", { x: 0.8, y: 1.0, w: 6, h: 0.3, fontSize: 11, color: C.textSec, fontFace: "Consolas", charSpacing: 2 });
  const stats = [
    { value: "10", label: "页面路由", color: C.purple },
    { value: "7", label: "Vue组件", color: C.blue },
    { value: "15", label: "API端点", color: C.cyan },
    { value: "14", label: "核心功能", color: C.green },
    { value: "1K+", label: "前端模块", color: C.pink },
    { value: "11", label: "比赛文档", color: C.orange },
  ];
  stats.forEach((st, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.8 + col * 4.1;
    const y = 1.5 + row * 1.8;
    addCard(s, x, y, 3.8, 1.55, { accent: st.color });
    s.addText(st.value, { x: x + 0.3, y: y + 0.2, w: 1.8, h: 0.9, fontSize: 40, bold: true, color: st.color, fontFace: "Arial Black", valign: "middle" });
    s.addText(st.label, { x: x + 2.0, y: y + 0.2, w: 1.6, h: 0.9, fontSize: 14, color: C.textSec, valign: "middle" });
  });
  // 底部成果列表
  s.addText([
    { text: "完整覆盖推演到成长的决策全生命周期", options: { bullet: { code: "25CF" }, color: C.white, breakLine: true } },
    { text: "DeepSeek AI + Mock 双模式，无API Key也能完整体验", options: { bullet: { code: "25CF" }, color: C.textSec, breakLine: true } },
    { text: "生产环境单端口部署，PM2 + Nginx + SSL 一键配置", options: { bullet: { code: "25CF" }, color: C.textSec, breakLine: true } },
    { text: "Git 版本管理 v1.0 标签，MIT 开源协议", options: { bullet: { code: "25CF" }, color: C.textSec } },
  ], { x: 0.8, y: 5.3, w: 11.5, h: 1.8, fontSize: 13, lineSpacingMultiple: 1.6 });
  addPageNum(s, 11);
}

// ===== Slide 12: 未来规划 =====
{
  const s = pres.addSlide();
  addDarkBg(s); addTopBar(s);
  s.addText("未来规划", { x: 0.8, y: 0.4, w: 6, h: 0.7, fontSize: 32, bold: true, color: C.white });
  s.addText("ROADMAP", { x: 0.8, y: 1.0, w: 6, h: 0.3, fontSize: 11, color: C.textSec, fontFace: "Consolas", charSpacing: 2 });
  // 时间线
  const phases = [
    { phase: "短期", time: "1-3 个月", title: "优化与增长", items: ["接入真实 DeepSeek API", "优化 AI 推演准确度", "增加用户量到 1000+", "完善移动端体验"], color: C.purple },
    { phase: "中期", time: "3-6 个月", title: "企业版拓展", items: ["推出 B2B 企业版", "增加团队协作功能", "对接高校就业系统", "探索 API 开放平台"], color: C.blue },
    { phase: "长期", time: "6-12 个月", title: "生态构建", items: ["构建人生决策 AI 生态", "开放第三方插件", "多语言国际化", "数据驱动的决策模型"], color: C.cyan },
  ];
  phases.forEach((p, i) => {
    const x = 0.8 + i * 4.1;
    addCard(s, x, 1.5, 3.8, 5.0, { accent: p.color });
    s.addShape(pres.shapes.RECTANGLE, { x: x + 0.3, y: 1.8, w: 1.2, h: 0.35, fill: { color: p.color }, line: { width: 0 } });
    s.addText(p.phase, { x: x + 0.3, y: 1.8, w: 1.2, h: 0.35, fontSize: 12, bold: true, color: C.bg, align: "center", valign: "middle" });
    s.addText(p.time, { x: x + 0.3, y: 2.3, w: 3.2, h: 0.35, fontSize: 12, color: C.textSec, fontFace: "Consolas" });
    s.addText(p.title, { x: x + 0.3, y: 2.7, w: 3.2, h: 0.5, fontSize: 18, bold: true, color: C.white });
    p.items.forEach((item, j) => {
      s.addText([{ text: item, options: { bullet: { code: "25CF" }, color: C.textSec } }], {
        x: x + 0.3, y: 3.4 + j * 0.6, w: 3.2, h: 0.5, fontSize: 12, color: C.textSec, lineSpacingMultiple: 1.3,
      });
    });
  });
  addPageNum(s, 12);
}

// ===== Slide 13: 应用场景 =====
{
  const s = pres.addSlide();
  addDarkBg(s); addTopBar(s);
  s.addText("应用场景", { x: 0.8, y: 0.4, w: 6, h: 0.7, fontSize: 32, bold: true, color: C.white });
  s.addText("USE CASES", { x: 0.8, y: 1.0, w: 6, h: 0.3, fontSize: 11, color: C.textSec, fontFace: "Consolas", charSpacing: 2 });
  const scenes = [
    { icon: "01", title: "毕业生职业选择", desc: "考研、就业、创业间的决策", color: C.purple },
    { icon: "02", title: "职场转型决策", desc: "跳槽、转行、gap year 风险评估", color: C.blue },
    { icon: "03", title: "城市迁移规划", desc: "一线城市 vs 回老家发展", color: C.cyan },
    { icon: "04", title: "教育规划", desc: "考研、留学、考证长期回报", color: C.green },
    { icon: "05", title: "企业人才发展", desc: "员工职业规划辅助工具", color: C.pink },
    { icon: "06", title: "心理咨询辅助", desc: "帮助来访者理清决策困惑", color: C.orange },
  ];
  scenes.forEach((sc, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.8 + col * 4.1;
    const y = 1.5 + row * 2.5;
    addCard(s, x, y, 3.8, 2.2, { accent: sc.color });
    s.addText(sc.icon, { x: x + 0.3, y: y + 0.2, w: 1.0, h: 0.6, fontSize: 28, bold: true, color: sc.color, fontFace: "Arial Black" });
    s.addText(sc.title, { x: x + 1.3, y: y + 0.25, w: 2.3, h: 0.5, fontSize: 15, bold: true, color: C.white, valign: "middle" });
    s.addText(sc.desc, { x: x + 0.3, y: y + 1.0, w: 3.2, h: 0.8, fontSize: 12, color: C.textSec, lineSpacingMultiple: 1.3 });
  });
  addPageNum(s, 13);
}

// ===== Slide 14: 团队介绍 =====
{
  const s = pres.addSlide();
  addDarkBg(s); addTopBar(s);
  s.addText("团队介绍", { x: 0.8, y: 0.4, w: 6, h: 0.7, fontSize: 32, bold: true, color: C.white });
  s.addText("TEAM", { x: 0.8, y: 1.0, w: 6, h: 0.3, fontSize: 11, color: C.textSec, fontFace: "Consolas", charSpacing: 2 });
  // 个人开发者
  addCard(s, 0.8, 1.5, 5.3, 5.0, { accent: C.purple });
  s.addShape(pres.shapes.OVAL, { x: 2.5, y: 2.0, w: 1.8, h: 1.8, fill: { color: C.purple, transparency: 70 }, line: { color: C.purple, width: 2 } });
  s.addText("DEV", { x: 2.5, y: 2.0, w: 1.8, h: 1.8, fontSize: 28, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Arial Black" });
  s.addText("个人开发者", { x: 1.1, y: 4.0, w: 4.7, h: 0.5, fontSize: 20, bold: true, color: C.white, align: "center" });
  s.addText("全栈工程师 · 产品设计", { x: 1.1, y: 4.5, w: 4.7, h: 0.35, fontSize: 13, color: C.cyan, align: "center" });
  s.addText("独立完成产品设计、前后端开发、UI设计、AI Prompt工程全流程", { x: 1.1, y: 5.1, w: 4.7, h: 0.8, fontSize: 12, color: C.textSec, align: "center", lineSpacingMultiple: 1.4 });
  s.addText("Vue 3 · Express · DeepSeek · ECharts · MySQL", { x: 1.1, y: 5.9, w: 4.7, h: 0.35, fontSize: 11, color: C.textSec, align: "center", fontFace: "Consolas" });
  // 右侧能力
  const skills = [
    { label: "前端工程化", value: "Vue 3 Composition API + Vite + ECharts", color: C.purple },
    { label: "后端开发", value: "Express.js + RESTful API + MySQL", color: C.blue },
    { label: "AI 工程", value: "DeepSeek Prompt Engineering + 结构化输出", color: C.cyan },
    { label: "产品设计", value: "14项功能 · 10页面 · 4大创新点", color: C.green },
    { label: "部署运维", value: "PM2 + Nginx + SSL + Git 版本管理", color: C.pink },
  ];
  skills.forEach((sk, i) => {
    const y = 1.5 + i * 1.0;
    addCard(s, 6.5, y, 5.8, 0.85, { accent: sk.color });
    s.addText(sk.label, { x: 6.8, y: y + 0.1, w: 2.0, h: 0.35, fontSize: 13, bold: true, color: sk.color });
    s.addText(sk.value, { x: 6.8, y: y + 0.45, w: 5.2, h: 0.3, fontSize: 11, color: C.textSec, fontFace: "Consolas" });
  });
  addPageNum(s, 14);
}

// ===== Slide 15: 总结 =====
{
  const s = pres.addSlide();
  addDarkBg(s);
  // 装饰
  s.addShape(pres.shapes.OVAL, { x: 8.5, y: -1.5, w: 6, h: 6, fill: { color: C.purple, transparency: 90 }, line: { width: 0 } });
  s.addShape(pres.shapes.OVAL, { x: -2, y: 3.5, w: 5, h: 5, fill: { color: C.blue, transparency: 92 }, line: { width: 0 } });
  // 金句
  s.addText("人生没有标准答案", {
    x: 1, y: 1.8, w: 11, h: 0.8,
    fontSize: 36, bold: true, color: C.white, align: "center", fontFace: "Arial",
  });
  s.addText("但 AI 可以帮你预见可能", {
    x: 1, y: 2.7, w: 11, h: 0.8,
    fontSize: 36, bold: true, color: C.cyan, align: "center", fontFace: "Arial",
  });
  // 分割线
  s.addShape(pres.shapes.RECTANGLE, { x: 5.67, y: 3.7, w: 2, h: 0.03, fill: { color: C.purple }, line: { width: 0 } });
  // 核心数据
  const summary = [
    { value: "14", label: "核心功能", color: C.purple },
    { value: "4", label: "创新点", color: C.blue },
    { value: "15", label: "API端点", color: C.cyan },
    { value: "10", label: "页面路由", color: C.green },
  ];
  summary.forEach((su, i) => {
    const x = 1.5 + i * 2.8;
    s.addText(su.value, { x, y: 4.1, w: 2.4, h: 0.7, fontSize: 36, bold: true, color: su.color, align: "center", fontFace: "Arial Black" });
    s.addText(su.label, { x, y: 4.8, w: 2.4, h: 0.35, fontSize: 13, color: C.textSec, align: "center" });
  });
  // 底部
  s.addText("让每一个选择，都有平行宇宙的答案", {
    x: 1, y: 5.6, w: 11, h: 0.6,
    fontSize: 20, color: C.cyan, align: "center", italic: true,
  });
  s.addText("谢谢评委", {
    x: 1, y: 6.5, w: 11, h: 0.5,
    fontSize: 18, color: C.textSec, align: "center", bold: true,
  });
}

// ===== 生成文件 =====
pres.writeFile({ fileName: "c:/Users/lenovo/Desktop/rspxyzsys/docs/人生平行宇宙实验室-比赛PPT.pptx" })
  .then(fileName => console.log("PPT generated: " + fileName))
  .catch(err => console.error("Error:", err));
