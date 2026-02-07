/**
 * 分数UI
 */
export default class Score {
  constructor(ctx) {
    this.ctx = ctx
    this.score = 0
    this.combo = 0
  }
  
  update(score, combo) {
    this.score = score
    this.combo = combo
  }
  
  reset() {
    this.score = 0
    this.combo = 0
  }
  
  render() {
    this.ctx.save()
    this.ctx.fillStyle = '#fff'
    this.ctx.font = 'bold 30px Arial'
    this.ctx.fillText(`Score: ${this.score}`, 10, 40)
    
    if (this.combo > 1) {
      this.ctx.fillStyle = '#ffd93d'
      this.ctx.font = 'bold 25px Arial'
      this.ctx.fillText(`Combo x${this.combo}`, 10, 80)
    }
    
    this.ctx.restore()
  }
}
