/**
 * 游戏主文件
 * 水果忍者 - Fruit Ninja
 */

import Background from './js/runtime/background'
import Fruit from './js/runtime/fruit'
import Bomb from './js/runtime/bomb'
import Blade from './js/player/blade'
import Score from './js/ui/score'
import GameOver from './js/ui/gameOver'
import AudioManager from './js/base/audioManager'

const ctx = canvas.getContext('2d')
const { windowWidth, windowHeight } = wx.getSystemInfoSync()

// 游戏状态
const GAME_STATE = {
  READY: 'ready',
  PLAYING: 'playing',
  OVER: 'over'
}

export default class Main {
  constructor() {
    this.state = GAME_STATE.READY
    this.score = 0
    this.combo = 0
    this.missedFruits = 0
    this.maxMissed = 3 // 最多漏掉3个水果
    
    // 游戏对象
    this.background = new Background(ctx)
    this.fruits = []
    this.bombs = []
    this.blade = new Blade(ctx)
    this.scoreUI = new Score(ctx)
    this.gameOverUI = new GameOver(ctx)
    this.audioManager = new AudioManager()
    
    // 生成水果的定时器
    this.spawnTimer = 0
    this.spawnInterval = 60 // 每60帧生成一次
    
    // 触摸事件
    this.touchStartX = 0
    this.touchStartY = 0
    
    this.bindEvents()
    this.restart()
  }
  
  /**
   * 绑定触摸事件
   */
  bindEvents() {
    canvas.addEventListener('touchstart', this.onTouchStart.bind(this))
    canvas.addEventListener('touchmove', this.onTouchMove.bind(this))
    canvas.addEventListener('touchend', this.onTouchEnd.bind(this))
  }
  
  /**
   * 触摸开始
   */
  onTouchStart(e) {
    e.preventDefault()
    const touch = e.touches[0]
    this.touchStartX = touch.clientX
    this.touchStartY = touch.clientY
    
    if (this.state === GAME_STATE.READY) {
      this.start()
    } else if (this.state === GAME_STATE.OVER) {
      // 检查是否点击重新开始
      if (this.gameOverUI.checkRestart(touch.clientX, touch.clientY)) {
        this.restart()
      }
    } else if (this.state === GAME_STATE.PLAYING) {
      this.blade.start(touch.clientX, touch.clientY)
    }
  }
  
  /**
   * 触摸移动
   */
  onTouchMove(e) {
    e.preventDefault()
    if (this.state !== GAME_STATE.PLAYING) return
    
    const touch = e.touches[0]
    this.blade.move(touch.clientX, touch.clientY)
    
    // 检测切割
    this.checkSlice(touch.clientX, touch.clientY)
  }
  
  /**
   * 触摸结束
   */
  onTouchEnd(e) {
    e.preventDefault()
    if (this.state === GAME_STATE.PLAYING) {
      this.blade.end()
    }
  }
  
  /**
   * 检测切割
   */
  checkSlice(x, y) {
    // 检查水果
    for (let i = this.fruits.length - 1; i >= 0; i--) {
      const fruit = this.fruits[i]
      if (fruit.isAlive && fruit.checkHit(x, y)) {
        fruit.slice()
        this.addScore(10)
        this.combo++
        this.fruits.splice(i, 1)
        
        // 播放音效
        this.audioManager.playSound('slice')
        
        // 连击音效
        if (this.combo >= 3) {
          this.audioManager.playSound('combo')
        }
      }
    }
    
    // 检查炸弹
    for (let i = this.bombs.length - 1; i >= 0; i--) {
      const bomb = this.bombs[i]
      if (bomb.isAlive && bomb.checkHit(x, y)) {
        bomb.explode()
        this.gameOver()
        
        // 播放爆炸音效
        this.audioManager.playSound('bomb')
      }
    }
  }
  
  /**
   * 添加分数
   */
  addScore(points) {
    // 连击加成
    const bonus = Math.floor(this.combo / 3)
    this.score += points + bonus
    this.scoreUI.update(this.score, this.combo)
  }
  
  /**
   * 开���游戏
   */
  start() {
    this.state = GAME_STATE.PLAYING
    this.playSound('bgm', true)
  }
  
  /**
   * 重新开始
   */
  restart() {
    this.state = GAME_STATE.READY
    this.score = 0
    this.combo = 0
    this.missedFruits = 0
    this.fruits = []
    this.bombs = []
    this.spawnTimer = 0
    this.scoreUI.reset()
  }
  
  /**
   * 游戏结束
   */
  gameOver() {
    this.state = GAME_STATE.OVER
    this.gameOverUI.show(this.score)
    this.audioManager.stopMusic()
  }
  
  /**
   * 生成水果
   */
  spawnFruit() {
    const x = Math.random() * windowWidth
    const speedX = (Math.random() - 0.5) * 10
    const speedY = -15 - Math.random() * 5
    
    const fruit = new Fruit(ctx, x, windowHeight, speedX, speedY)
    this.fruits.push(fruit)
  }
  
  /**
   * 生成炸弹
   */
  spawnBomb() {
    const x = Math.random() * windowWidth
    const speedX = (Math.random() - 0.5) * 10
    const speedY = -15 - Math.random() * 5
    
    const bomb = new Bomb(ctx, x, windowHeight, speedX, speedY)
    this.bombs.push(bomb)
  }
  
  /**
  /**
  /**
   * 更新游戏逻辑
   */
  update() {
    if (this.state !== GAME_STATE.PLAYING) return
    
    // 生成水果和炸弹
    this.spawnTimer++
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnTimer = 0
      
      // 80%概率生成水果，20%概率生成炸弹
      if (Math.random() < 0.8) {
        this.spawnFruit()
      } else {
        this.spawnBomb()
      }
    }
    
    // 更新水果
    for (let i = this.fruits.length - 1; i >= 0; i--) {
      const fruit = this.fruits[i]
      fruit.update()
      
      // 移除屏幕外的水果
      if (fruit.y > windowHeight + 100) {
        this.fruits.splice(i, 1)
        
        // 漏掉水果
        if (fruit.isAlive) {
          this.missedFruits++
          this.combo = 0 // 重置连击
          this.audioManager.playSound('miss')
          
          if (this.missedFruits >= this.maxMissed) {
            this.gameOver()
          }
        }
      }
    }
    
    // 更新炸弹
    for (let i = this.bombs.length - 1; i >= 0; i--) {
      const bomb = this.bombs[i]
      bomb.update()
      
      // 移除屏幕外的炸弹
      if (bomb.y > windowHeight + 100) {
        this.bombs.splice(i, 1)
      }
    }
    
    // 更新刀光
    this.blade.update()
  }
  
  /**
   * 渲染游戏
   */
  render() {
    // 清屏
    ctx.clearRect(0, 0, windowWidth, windowHeight)
    
    // 渲染背景
    this.background.render()
    
    // 渲染水果
    this.fruits.forEach(fruit => fruit.render())
    
    // 渲染炸弹
    this.bombs.forEach(bomb => bomb.render())
    
    // 渲染刀光
    this.blade.render()
    
    // 渲染UI
    if (this.state === GAME_STATE.PLAYING) {
      this.scoreUI.render()
      
      // 显示漏掉的水果数
      ctx.fillStyle = '#fff'
      ctx.font = '20px Arial'
      ctx.fillText(`Miss: ${this.missedFruits}/${this.maxMissed}`, 10, 60)
    } else if (this.state === GAME_STATE.OVER) {
      this.gameOverUI.render()
    } else if (this.state === GAME_STATE.READY) {
      // 显示开始提示
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 30px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('Touch to Start', windowWidth / 2, windowHeight / 2)
      ctx.textAlign = 'left'
    }
  }
  
  /**
   * 游戏主循环
   */
  loop() {
    this.update()
    this.render()
    requestAnimationFrame(() => this.loop())
  }
}

// 启动游戏
new Main().loop()
