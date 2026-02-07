/**
 * 炸弹类
 */
import Sprite from '../base/sprite'

export default class Bomb extends Sprite {
  constructor(ctx, x, y, speedX, speedY) {
    super(ctx, x, y, 50, 50)
    
    this.speedX = speedX
    this.speedY = speedY
    this.gravity = 0.5
    this.rotation = 0
    this.rotationSpeed = 0.1
    this.isAlive = true
    
    // 加载图片
    this.img = new Image()
    this.img.src = 'images/bomb.png'
  }
  
  update() {
    this.speedY += this.gravity
    this.x += this.speedX
    this.y += this.speedY
    this.rotation += this.rotationSpeed
  }
  
  render() {
    if (!this.visible) return
    
    this.ctx.save()
    this.ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
    this.ctx.rotate(this.rotation)
    this.ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height)
    this.ctx.restore()
  }
  
  explode() {
    this.isAlive = false
    this.visible = false
  }
}
