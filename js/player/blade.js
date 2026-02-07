/**
 * 刀光效果
 */
export default class Blade {
  constructor(ctx) {
    this.ctx = ctx
    this.points = [] // 轨迹点
    this.maxPoints = 10
    this.isDrawing = false
  }
  
  start(x, y) {
    this.isDrawing = true
    this.points = [{x, y}]
  }
  
  move(x, y) {
    if (!this.isDrawing) return
    
    this.points.push({x, y})
    
    // 限制点数
    if (this.points.length > this.maxPoints) {
      this.points.shift()
    }
  }
  
  end() {
    this.isDrawing = false
  }
  
  update() {
    // 淡出效果
    if (!this.isDrawing && this.points.length > 0) {
      this.points.shift()
    }
  }
  
  render() {
    if (this.points.length < 2) return
    
    this.ctx.save()
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
    this.ctx.lineWidth = 3
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
    
    // 绘制轨迹
    this.ctx.beginPath()
    this.ctx.moveTo(this.points[0].x, this.points[0].y)
    
    for (let i = 1; i < this.points.length; i++) {
      this.ctx.lineTo(this.points[i].x, this.points[i].y)
    }
    
    this.ctx.stroke()
    this.ctx.restore()
  }
}
