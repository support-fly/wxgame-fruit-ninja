/**
 * 精灵基类
 */
export default class Sprite {
  constructor(ctx, x = 0, y = 0, width = 0, height = 0) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.visible = true
  }
  
  /**
   * 绘制图片
   */
  drawImage(img, x, y, width, height) {
    if (!this.visible) return
    
    this.ctx.drawImage(
      img,
      x || this.x,
      y || this.y,
      width || this.width,
      height || this.height
    )
  }
  
  /**
   * 简单碰撞检测（圆形）
   */
  checkHit(x, y, radius = 30) {
    const dx = x - (this.x + this.width / 2)
    const dy = y - (this.y + this.height / 2)
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    return distance < radius + this.width / 2
  }
}
