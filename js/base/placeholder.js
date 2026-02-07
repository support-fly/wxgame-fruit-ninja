/**
 * 占位符渲染工具
 * 用于在没有图片素材时用纯色图形代替
 */

export default class PlaceholderRenderer {
  /**
   * 绘制水果占位符
   */
  static drawFruit(ctx, x, y, size, type) {
    const colors = {
      apple: '#ff6b6b',      // 红色
      banana: '#ffd93d',     // 黄色
      watermelon: '#6bcf7f', // 绿色
      orange: '#ff9f43',     // 橙色
      strawberry: '#ff6348', // 粉红
      grape: '#a55eea'       // 紫色
    }
    
    ctx.save()
    
    // 外圈发光效果
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size / 2)
    gradient.addColorStop(0, colors[type] || '#ff6b6b')
    gradient.addColorStop(0.7, colors[type] || '#ff6b6b')
    gradient.addColorStop(1, 'rgba(255,255,255,0.3)')
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, size / 2, 0, Math.PI * 2)
    ctx.fill()
    
    // 高光
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.beginPath()
    ctx.arc(x - size / 6, y - size / 6, size / 8, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.restore()
  }
  
  /**
   * 绘制炸弹占位符
   */
  static drawBomb(ctx, x, y, size) {
    ctx.save()
    
    // 炸弹主体
    ctx.fillStyle = '#2c3e50'
    ctx.beginPath()
    ctx.arc(x, y, size / 2, 0, Math.PI * 2)
    ctx.fill()
    
    // 导火索
    ctx.strokeStyle = '#e74c3c'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(x, y - size / 2)
    ctx.lineTo(x - 5, y - size / 2 - 10)
    ctx.lineTo(x + 5, y - size / 2 - 20)
    ctx.stroke()
    
    // 火花
    ctx.fillStyle = '#f39c12'
    ctx.beginPath()
    ctx.arc(x + 5, y - size / 2 - 20, 3, 0, Math.PI * 2)
    ctx.fill()
    
    // 骷髅标志（简化版）
    ctx.fillStyle = '#ecf0f1'
    ctx.font = `${size / 3}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('💣', x, y)
    
    ctx.restore()
  }
  
  /**
   * 绘制背景
   */
  static drawBackground(ctx, width, height) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, '#667eea')
    gradient.addColorStop(1, '#764ba2')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
    
    // 添加一些装饰性的圆点
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      const radius = Math.random() * 30 + 10
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  
  /**
   * 绘制切割粒子
   */
  static drawParticle(ctx, x, y, color) {
    ctx.save()
    ctx.fillStyle = color
    ctx.shadowColor = color
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}
