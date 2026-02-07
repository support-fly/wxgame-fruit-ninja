/**
 * 水果类
 */
import Sprite from '../base/sprite'

const FRUIT_TYPES = [
  'apple', 'banana', 'watermelon', 'orange', 'strawberry', 'grape'
]

export default class Fruit extends Sprite {
  constructor(ctx, x, y, speedX, speedY) {
    super(ctx, x, y, 60, 60)
    
    this.speedX = speedX
    this.speedY = speedY
    this.gravity = 0.5
    this.rotation = 0
    this.rotationSpeed = (Math.random() - 0.5) * 0.2
    this.isAlive = true
    this.isSliced = false
    
    // 随机水果类型
    this.type = FRUIT_TYPES[Math.floor(Math.random() * FRUIT_TYPES.length)]
    
    // 加载图片
    this.img = new Image()
    this.img.src = `images/fruits/${this.type}.png`
    
    // 粒子效果
    this.particles = []
  }
  
  /**
   * 更新位置
   */
  update() {
    if (!this.isAlive && this.particles.length === 0) return
    
    // 物理运动
    this.speedY += this.gravity
    this.x += this.speedX
    this.y += this.speedY
    this.rotation += this.rotationSpeed
    
    // 更新粒子
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.5
      p.life--
      
      if (p.life <= 0) {
        this.particles.splice(i, 1)
      }
    }
  }
  
  /**
   * 渲染
   */
  render() {
    if (!this.visible) return
    
    this.ctx.save()
    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
    this.ctx.rotate(this.rotation)
    
    if (this.isSliced) {
      // 渲染粒子
      this.particles.forEach(p => {
        this.ctx.fillStyle = p.color
        this.ctx.beginPath()
        this.ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
        this.ctx.fill()
      })
    } else {
      // 渲染水果
      this.ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height)
    }
    
    this.ctx.restore()
  }
  
  /**
   * 切开水果
   */
  slice() {
    this.isAlive = false
    this.isSliced = true
    
    // 生成粒子
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4ecdc4']
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 30 + Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
  }
}
