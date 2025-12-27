// 时间检测与入口控制
const NEW_YEAR_TIME = new Date('2025-01-01T00:00:00');
const ENTRY_OPEN_TIME = new Date(NEW_YEAR_TIME.getTime() - 60*60*1000);

function checkEntryPermission() {
  const now = new Date();
  const hasBlessing = localStorage.getItem('userBlessing');
  const isTimeValid = now >= ENTRY_OPEN_TIME;
  
  document.getElementById('enter-main-btn').disabled = 
    !(hasBlessing && isTimeValid);
}

// 动态背景系统
class DynamicBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.timeOfDay = this.getTimeOfDay();
    this.particles = [];
    this.init();
  }
  
  getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) return 'day';
    if (hour === 18) return 'dusk';
    return 'night';
  }
  
  init() {
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.createParticles();
    this.animate();
  }
  
  createParticles() {
    const count = this.timeOfDay === 'night' ? 200 : 
                  this.timeOfDay === 'dusk' ? 150 : 100;
    
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }
  
  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 绘制基础背景
    this.drawBaseBackground();
    
    // 绘制粒子
    this.drawParticles();
  }
}
