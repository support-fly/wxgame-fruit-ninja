/**
 * 背景类
 */
export default class Background {
  constructor(ctx) {
    this.ctx = ctx
    this.img = new Image()
    this.img.src = 'images/bg.jpg'
  }
  
  render() {
    const { windowWidth, windowHeight } = wx.getSystemInfoSync()
    this.ctx.drawImage(this.img, 0, 0, windowWidth, windowHeight)
  }
}
