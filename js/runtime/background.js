/**
 * 背景类
 */
import PlaceholderRenderer from '../base/placeholder'

export default class Background {
  constructor(ctx) {
    this.ctx = ctx
    this.img = new Image()
    this.img.src = 'images/bg.jpg'
    this.imgLoaded = false
    this.img.onload = () => { this.imgLoaded = true }
    this.img.onerror = () => { this.imgLoaded = false }
  }
  
  render() {
    const { windowWidth, windowHeight } = wx.getSystemInfoSync()
    
    if (this.imgLoaded && this.img.complete) {
      this.ctx.drawImage(this.img, 0, 0, windowWidth, windowHeight)
    } else {
      // 使用占位符渐变背景
      PlaceholderRenderer.drawBackground(this.ctx, windowWidth, windowHeight)
    }
  }
}
