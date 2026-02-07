/**
 * 道具基类
 */
import Sprite from '../base/sprite'

export default class PowerUp extends Sprite {
  constructor(ctx, x, y, type) {
    super(ctx, x, y, 40, 40)
    
    this.type = type // freeze, double, frenzy
    this.speedX = (Math.random() - 0.5) * 8
    this.speedY = -12 - Math.random() * 3
    this.gravity = 0.5
    this.rotation = 0
    this.rotationSpeed = 0.15
    this.isAlive = true
    this.isCollected = false
    
    // 道具颜色
    this.colors = {
      freeze: '#4ecdc4',    // 蓝色 - 冰冻
      double: '#ffd93d',    // 黄色 - 双倍
      frenzy: '#ff6b6b'     // 红色 - 狂暴
    }
    
    // 道具图标（emoji 或符号）
    this.icons = {
      freeze: '❄️',
      double: '×2',
      frenzy: '⚡'
    }
  }
  
  /**
   * 更新位置
   */
  update() {
    this.speedY += this.gravity
    this.x += this.speedX
    this.y += this.speedY
    this.rotation += this.rotationSpeed
  }
  
  /**
   * 渲染
   */
  render() {
    if (!this.visible) return
    
    this.ctx.save()
    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
    this.ctx.rotate(this.rotation)
    
    // 外圈发光
    const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, this.width / 2)
    gradient.addColorStop(0, this.colors[this.type])
    gradient.addColorStop(0.7, this.colors[this.type])
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)')
    
    this.ctx.fillStyle = gradient
    this.ctx.beginPath()
    this.ctx.arc(0, 0, this.width / 2, 0, Math.PI * 2)
    this.ctx.fill()
    
    // 边框
    this.ctx.strokeStyle = '#fff'
    this.ctx.lineWidth = 2
    this.ctx.stroke()
    
    // 图标
    this.ctx.fillStyle = '#fff'
    this.ctx.font = 'bold 20px Arial'
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillText(this.icons[this.type], 0, 0)
    
    this.ctx.restore()
  }
  
  /**
   * 收集道具
   */
  collect() {
    this.isAlive = false
    this.isCollected = true
    this.visible = false
  }
}
