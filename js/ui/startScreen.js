/**
 * 开始界面
 */

export default class StartScreen {
  constructor(ctx) {
    this.ctx = ctx
    const { windowWidth, windowHeight } = wx.getSystemInfoSync()
    this.width = windowWidth
    this.height = windowHeight
    
    // 标题动画
    this.titleY = -100
    this.titleTargetY = this.height / 3
    
    // 按钮
    this.btnWidth = 200
    this.btnHeight = 60
    this.btnX = (this.width - this.btnWidth) / 2
    this.btnY = this.height / 2 + 50
    
    // 粒子背景
    this.particles = []
    this.initParticles()
  }
  
  /**
   * 初始化粒子
   */
  initParticles() {
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: ['#ff6b6b', '#ffd93d', '#4ecdc4', '#a55eea'][Math.floor(Math.random() * 4)]
      })
    }
  }
  
  /**
   * 更新
   */
  update() {
    // 标题滑入动画
    if (this.titleY < this.titleTargetY) {
      this.titleY += (this.titleTargetY - this.titleY) * 0.1
    }
    
    // 更新粒子
    this.particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      
      // 边界反弹
      if (p.x < 0 || p.x > this.width) p.vx *= -1
      if (p.y < 0 || p.y > this.height) p.vy *= -1
    })
  }
  
  /**
   * 渲染
   */
  render() {
    this.ctx.save()
    
    // 渲染粒子背景
    this.particles.forEach(p => {
      this.ctx.fillStyle = p.color
      this.ctx.globalAlpha = 0.5
      this.ctx.beginPath()
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      this.ctx.fill()
    })
    
    this.ctx.globalAlpha = 1
    
    // 游戏标题
    this.ctx.fillStyle = '#fff'
    this.ctx.font = 'bold 60px Arial'
    this.ctx.textAlign = 'center'
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
    this.ctx.shadowBlur = 10
    this.ctx.fillText('🍉', this.width / 2, this.titleY - 30)
    
    this.ctx.font = 'bold 50px Arial'
    this.ctx.fillStyle = '#ffd93d'
    this.ctx.fillText('水果忍者', this.width / 2, this.titleY + 30)
    
    this.ctx.font = '18px Arial'
    this.ctx.fillStyle = '#fff'
    this.ctx.fillText('Fruit Ninja', this.width / 2, this.titleY + 60)
    
    this.ctx.shadowBlur = 0
    
    // 开始按钮
    const gradient = this.ctx.createLinearGradient(
      this.btnX, this.btnY,
      this.btnX, this.btnY + this.btnHeight
    )
    gradient.addColorStop(0, '#4ecdc4')
    gradient.addColorStop(1, '#44a08d')
    
    this.ctx.fillStyle = gradient
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
    this.ctx.shadowBlur = 10
    this.ctx.beginPath()
    this.ctx.roundRect(this.btnX, this.btnY, this.btnWidth, this.btnHeight, 10)
    this.ctx.fill()
    
    this.ctx.fillStyle = '#fff'
    this.ctx.font = 'bold 28px Arial'
    this.ctx.fillText('开始游戏', this.width / 2, this.btnY + 38)
    
    // 提示文字
    this.ctx.shadowBlur = 0
    this.ctx.font = '16px Arial'
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
    this.ctx.fillText('触摸屏幕开始切水果', this.width / 2, this.height - 80)
    
    this.ctx.textAlign = 'left'
    this.ctx.restore()
  }
  
  /**
   * 检查是否点击开始按钮
   */
  checkStartButton(x, y) {
    return x > this.btnX && 
           x < this.btnX + this.btnWidth &&
           y > this.btnY && 
           y < this.btnY + this.btnHeight
  }
  
  /**
   * 重置动画
   */
  reset() {
    this.titleY = -100
  }
}
