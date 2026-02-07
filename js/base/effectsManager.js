/**
 * 特效管理器
 * 管理粒子特效和震动反馈
 */

export default class EffectsManager {
  constructor(ctx) {
    this.ctx = ctx
    this.particles = []
  }
  
  /**
   * 创建爆炸粒子
   */
  createExplosion(x, y, count = 20, colors = ['#ff6b6b', '#ffd93d', '#6bcf7f']) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i
      const speed = 3 + Math.random() * 5
      
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 30 + Math.random() * 20,
        maxLife: 50,
        size: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
  }
  
  /**
   * 创建刀光粒子
   */
  createSlashParticles(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 15 + Math.random() * 10,
        maxLife: 25,
        size: 1 + Math.random() * 2,
        color: 'rgba(255, 255, 255, 0.8)'
      })
    }
  }
  
  /**
   * 创建道具收集特效
   */
  createPowerUpEffect(x, y, color) {
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 2 + Math.random() * 4
      
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 40,
        maxLife: 40,
        size: 3,
        color
      })
    }
  }
  
  /**
   * 更新粒子
   */
  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]
      
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.3 // 重力
      p.life--
      
      if (p.life <= 0) {
        this.particles.splice(i, 1)
      }
    }
  }
  
  /**
   * 渲染粒子
   */
  render() {
    this.ctx.save()
    
    this.particles.forEach(p => {
      const alpha = p.life / p.maxLife
      this.ctx.globalAlpha = alpha
      
      this.ctx.fillStyle = p.color
      this.ctx.shadowColor = p.color
      this.ctx.shadowBlur = 5
      
      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      this.ctx.fill()
    })
    
    this.ctx.globalAlpha = 1
    this.ctx.shadowBlur = 0
    this.ctx.restore()
  }
  
  /**
   * 触发震动
   */
  vibrate(pattern = [10]) {
    try {
      if (wx.vibrateShort) {
        wx.vibrateShort({
          type: 'light'
        })
      }
    } catch (e) {
      // 震动失败不影响游戏
      console.warn('Vibrate failed:', e)
    }
  }
  
  /**
   * 强震动
   */
  vibrateHeavy() {
    try {
      if (wx.vibrateLong) {
        wx.vibrateLong()
      }
    } catch (e) {
      console.warn('Vibrate failed:', e)
    }
  }
  
  /**
   * 清空所有粒子
   */
  clear() {
    this.particles = []
  }
  
  /**
   * 获取粒子数量
   */
  getParticleCount() {
    return this.particles.length
  }
}
