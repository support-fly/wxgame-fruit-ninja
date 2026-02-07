/**
 * 炸弹类
 */
import Sprite from '../base/sprite'
import PlaceholderRenderer from '../base/placeholder'

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
    this.imgLoaded = false
    this.img.onload = () => { this.imgLoaded = true }
    this.img.onerror = () => { this.imgLoaded = false }
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
    
    if (this.imgLoaded && this.img.complete) {
      this.ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height)
    } else {
      // 使用占位符
      PlaceholderRenderer.drawBomb(this.ctx, 0, 0, this.width)
    }
    
    this.ctx.restore()
  }
  
  explode() {
    this.isAlive = false
    this.visible = false
  }
}
