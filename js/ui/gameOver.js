/**
 * 游戏结束UI
 */
export default class GameOver {
  constructor(ctx) {
    this.ctx = ctx
    this.score = 0
    this.visible = false
    this.alpha = 0
    
    const { windowWidth, windowHeight } = wx.getSystemInfoSync()
    this.centerX = windowWidth / 2
    this.centerY = windowHeight / 2
    
    // 重新开始按钮
    this.btnWidth = 200
    this.btnHeight = 60
    this.btnX = this.centerX - this.btnWidth / 2
    this.btnY = this.centerY + 120
  }
  
  show(score) {
    this.score = score
    this.visible = true
    this.alpha = 0
  }
  
  hide() {
    this.visible = false
  }
  
  checkRestart(x, y) {
    return x > this.btnX && 
           x < this.btnX + this.btnWidth &&
           y > this.btnY && 
           y < this.btnY + this.btnHeight
  }
  
  render() {
    if (!this.visible) return
    
    // 淡入动画
    if (this.alpha < 1) {
      this.alpha += 0.05
    }
    
    this.ctx.save()
    this.ctx.globalAlpha = this.alpha
    
    // 半透明背景
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
    this.ctx.fillRect(0, 0, this.centerX * 2, this.centerY * 2)
    
    // Game Over 文字带阴影
    this.ctx.fillStyle = '#ff6b6b'
    this.ctx.font = 'bold 60px Arial'
    this.ctx.textAlign = 'center'
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
    this.ctx.shadowBlur = 20
    this.ctx.fillText('GAME OVER', this.centerX, this.centerY - 80)
    
    // 分数面板
    this.ctx.shadowBlur = 10
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
    this.ctx.fillRect(this.centerX - 150, this.centerY - 30, 300, 80)
    
    this.ctx.shadowBlur = 0
    this.ctx.fillStyle = '#fff'
    this.ctx.font = '24px Arial'
    this.ctx.fillText('最终分数', this.centerX, this.centerY)
    
    this.ctx.font = 'bold 50px Arial'
    this.ctx.fillStyle = '#ffd93d'
    this.ctx.fillText(this.score, this.centerX, this.centerY + 45)
    
    // 重新开始按钮
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
    
    this.ctx.shadowBlur = 0
    this.ctx.fillStyle = '#fff'
    this.ctx.font = 'bold 28px Arial'
    this.ctx.fillText('重新开始', this.centerX, this.btnY + 38)
    
    this.ctx.textAlign = 'left'
    this.ctx.globalAlpha = 1
    this.ctx.restore()
  }
}
