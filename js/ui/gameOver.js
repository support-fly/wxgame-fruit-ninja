/**
 * 游戏结束UI
 */
export default class GameOver {
  constructor(ctx) {
    this.ctx = ctx
    this.score = 0
    this.visible = false
    
    const { windowWidth, windowHeight } = wx.getSystemInfoSync()
    this.centerX = windowWidth / 2
    this.centerY = windowHeight / 2
    
    // 重新开始按钮
    this.btnWidth = 200
    this.btnHeight = 60
    this.btnX = this.centerX - this.btnWidth / 2
    this.btnY = this.centerY + 100
  }
  
  show(score) {
    this.score = score
    this.visible = true
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
    
    this.ctx.save()
    
    // 半透明背景
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    this.ctx.fillRect(0, 0, this.centerX * 2, this.centerY * 2)
    
    // Game Over 文字
    this.ctx.fillStyle = '#fff'
    this.ctx.font = 'bold 50px Arial'
    this.ctx.textAlign = 'center'
    this.ctx.fillText('GAME OVER', this.centerX, this.centerY - 50)
    
    // 分数
    this.ctx.font = 'bold 35px Arial'
    this.ctx.fillText(`Score: ${this.score}`, this.centerX, this.centerY + 20)
    
    // 重新开始按钮
    this.ctx.fillStyle = '#4ecdc4'
    this.ctx.fillRect(this.btnX, this.btnY, this.btnWidth, this.btnHeight)
    
    this.ctx.fillStyle = '#fff'
    this.ctx.font = 'bold 25px Arial'
    this.ctx.fillText('Restart', this.centerX, this.btnY + 38)
    
    this.ctx.textAlign = 'left'
    this.ctx.restore()
  }
}
