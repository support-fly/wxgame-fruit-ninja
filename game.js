/**
 * 游戏主文件
 * 水果忍者 - Fruit Ninja
 */

import Background from './js/runtime/background'
import Fruit from './js/runtime/fruit'
import Bomb from './js/runtime/bomb'
import PowerUp from './js/runtime/powerup'
import Blade from './js/player/blade'
import Score from './js/ui/score'
import GameOver from './js/ui/gameOver'
import StartScreen from './js/ui/startScreen'
import AudioManager from './js/base/audioManager'
import PowerUpManager from './js/base/powerupManager'
import LevelSystem from './js/base/levelSystem'
import EffectsManager from './js/base/effectsManager'

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
    this.powerups = []
    this.blade = new Blade(ctx)
    this.scoreUI = new Score(ctx)
    this.gameOverUI = new GameOver(ctx)
    this.startScreen = new StartScreen(ctx)
    this.audioManager = new AudioManager()
    this.powerupManager = new PowerUpManager()
    this.levelSystem = new LevelSystem()
    this.effectsManager = new EffectsManager(ctx)
    
    // 生成水果的定时器
    this.spawnTimer = 0
    this.spawnInterval = this.levelSystem.getSpawnInterval()
    
    // 升级提示
    this.levelUpMessage = null
    this.levelUpTimer = 0
    
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
    
    // 刀光粒子
    if (Math.random() < 0.3) {
      this.effectsManager.createSlashParticles(touch.clientX, touch.clientY, 3)
    }
    
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
        
        // 爆炸特效
        this.effectsManager.createExplosion(
          fruit.x + fruit.width / 2,
          fruit.y + fruit.height / 2,
          15
        )
        
        // 震动反馈
        this.effectsManager.vibrate()
        
        this.fruits.splice(i, 1)
        
        // 播放音效
        this.audioManager.playSound('slice')
        
        // 连击音效
        if (this.combo >= 3) {
          this.audioManager.playSound('combo')
        }
      }
    }
    
    // 检查道具
    for (let i = this.powerups.length - 1; i >= 0; i--) {
      const powerup = this.powerups[i]
      if (powerup.isAlive && powerup.checkHit(x, y)) {
        powerup.collect()
        this.activatePowerUp(powerup.type)
        
        // 道具特效
        const colors = {
          freeze: '#4ecdc4',
          double: '#ffd93d',
          frenzy: '#ff6b6b'
        }
        this.effectsManager.createPowerUpEffect(
          powerup.x + powerup.width / 2,
          powerup.y + powerup.height / 2,
          colors[powerup.type]
        )
        
        this.powerups.splice(i, 1)
        
        // 播放道具音效
        this.audioManager.playSound('powerup')
      }
    }
    
    // 检查炸弹
    for (let i = this.bombs.length - 1; i >= 0; i--) {
      const bomb = this.bombs[i]
      if (bomb.isAlive && bomb.checkHit(x, y)) {
        bomb.explode()
        
        // 大爆炸特效
        this.effectsManager.createExplosion(
          bomb.x + bomb.width / 2,
          bomb.y + bomb.height / 2,
          30,
          ['#ff6b6b', '#ff4757', '#2c3e50']
        )
        
        // 强震动
        this.effectsManager.vibrateHeavy()
        
        this.gameOver()
        
        // 播放爆炸音效
        this.audioManager.playSound('bomb')
      }
    }
  }
  
  /**
   * 激活道具效果
   */
  activatePowerUp(type) {
    this.powerupManager.activate(type, 5000) // 5秒
    
    // 根据道具类型显示提示
    const messages = {
      freeze: '⏱️ 时间减速！',
      double: '×2 双倍分数！',
      frenzy: '⚡ 水果狂暴！'
    }
    
    console.log(messages[type])
  }
  
  /**
   * 添加分数
   */
  addScore(points) {
    // 连击加成
    const bonus = Math.floor(this.combo / 3)
    // 道具加成
    const multiplier = this.powerupManager.getScoreMultiplier()
    
    this.score += (points + bonus) * multiplier
    this.scoreUI.update(this.score, this.combo)
    
    // 检查升级
    if (this.levelSystem.updateScore(this.score)) {
      this.showLevelUpMessage()
      // 更新生成间隔
      this.spawnInterval = this.levelSystem.getSpawnInterval()
    }
  }
  
  /**
   * 显示升级提示
   */
  showLevelUpMessage() {
    const level = this.levelSystem.getCurrentLevel()
    this.levelUpMessage = `🎉 Level ${level.level}: ${level.name}！`
    this.levelUpTimer = 120 // 2秒（60fps）
    this.audioManager.playSound('powerup') // 复用道具音效
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
    this.powerups = []
    this.spawnTimer = 0
    this.scoreUI.reset()
    this.levelSystem.reset()
    this.spawnInterval = this.levelSystem.getSpawnInterval()
    this.levelUpMessage = null
    this.levelUpTimer = 0
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
   * 生成道具
   */
  spawnPowerUp() {
    const types = ['freeze', 'double', 'frenzy']
    const type = types[Math.floor(Math.random() * types.length)]
    
    const x = Math.random() * windowWidth
    const powerup = new PowerUp(ctx, x, windowHeight, type)
    this.powerups.push(powerup)
  }
  
  /**
  /**
  /**
   * 更新游戏逻辑
   */
  update() {
    if (this.state === GAME_STATE.READY) {
      // 开始界面动画
      this.startScreen.update()
      return
    }
    
    if (this.state !== GAME_STATE.PLAYING) return
    
    // 更新道具管理器
    this.powerupManager.update()
    
    // 更新升级提示计时器
    if (this.levelUpTimer > 0) {
      this.levelUpTimer--
      if (this.levelUpTimer === 0) {
        this.levelUpMessage = null
      }
    }
    
    // 获取时间缩放（冰冻效果）
    const timeScale = this.powerupManager.getTimeScale()
    
    // 生成水果和炸弹
    this.spawnTimer++
    
    // 狂暴模式加速生成
    const spawnMultiplier = this.powerupManager.getSpawnSpeedMultiplier()
    const effectiveInterval = this.spawnInterval / spawnMultiplier
    
    if (this.spawnTimer >= effectiveInterval) {
      this.spawnTimer = 0
      
      // 从关卡系统获取概率
      const bombChance = this.levelSystem.getBombChance()
      const powerupChance = this.levelSystem.getPowerupChance()
      
      const rand = Math.random()
      if (rand < powerupChance) {
        // 道具
        this.spawnPowerUp()
      } else if (rand < powerupChance + bombChance) {
        // 炸弹
        this.spawnBomb()
      } else {
        // 水果
        this.spawnFruit()
      }
    }
    
    // 更新水果
    for (let i = this.fruits.length - 1; i >= 0; i--) {
      const fruit = this.fruits[i]
      fruit.speedY += fruit.gravity * timeScale
      fruit.x += fruit.speedX * timeScale
      fruit.y += fruit.speedY * timeScale
      fruit.rotation += fruit.rotationSpeed * timeScale
      
      // 更新粒子
      for (let j = fruit.particles.length - 1; j >= 0; j--) {
        const p = fruit.particles[j]
        p.x += p.vx * timeScale
        p.y += p.vy * timeScale
        p.vy += 0.5 * timeScale
        p.life -= timeScale
        
        if (p.life <= 0) {
          fruit.particles.splice(j, 1)
        }
      }
      
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
      bomb.speedY += bomb.gravity * timeScale
      bomb.x += bomb.speedX * timeScale
      bomb.y += bomb.speedY * timeScale
      bomb.rotation += bomb.rotationSpeed * timeScale
      
      // 移除屏幕外的炸弹
      if (bomb.y > windowHeight + 100) {
        this.bombs.splice(i, 1)
      }
    }
    
    // 更新道具
    for (let i = this.powerups.length - 1; i >= 0; i--) {
      const powerup = this.powerups[i]
      powerup.speedY += powerup.gravity * timeScale
      powerup.x += powerup.speedX * timeScale
      powerup.y += powerup.speedY * timeScale
      powerup.rotation += powerup.rotationSpeed * timeScale
      
      // 移除屏幕外的道具
      if (powerup.y > windowHeight + 100) {
        this.powerups.splice(i, 1)
      }
    }
    
    // 更新刀光
    this.blade.update()
    
    // 更新特效
    this.effectsManager.update()
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
    
    // 渲染道具
    this.powerups.forEach(powerup => powerup.render())
    
    // 渲染特效
    this.effectsManager.render()
    
    // 渲染刀光
    this.blade.render()
    
    // 渲染UI
    if (this.state === GAME_STATE.PLAYING) {
      this.scoreUI.render()
      
      // 显示漏掉的水果数
      ctx.fillStyle = '#fff'
      ctx.font = '20px Arial'
      ctx.fillText(`Miss: ${this.missedFruits}/${this.maxMissed}`, 10, 60)
      
      // 显示关卡信息
      const level = this.levelSystem.getCurrentLevel()
      ctx.fillStyle = '#ffd93d'
      ctx.font = 'bold 22px Arial'
      ctx.textAlign = 'right'
      ctx.fillText(`Lv.${level.level} ${level.name}`, windowWidth - 10, 40)
      
      // 显示升级进度条
      if (level.scoreTarget !== Infinity) {
        const barWidth = 200
        const barHeight = 8
        const barX = windowWidth - barWidth - 10
        const barY = 50
        
        // 背景
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.fillRect(barX, barY, barWidth, barHeight)
        
        // 进度
        const progress = this.levelSystem.getProgress()
        ctx.fillStyle = '#4ecdc4'
        ctx.fillRect(barX, barY, barWidth * progress, barHeight)
        
        // 目标分数
        ctx.fillStyle = '#fff'
        ctx.font = '14px Arial'
        const scoreToNext = this.levelSystem.getScoreToNext()
        ctx.fillText(`${scoreToNext}`, windowWidth - 10, 70)
      }
      
      ctx.textAlign = 'left'
      
      // 显示激活的道具
      const activePowerUps = this.powerupManager.getActivePowerUps()
      if (activePowerUps.length > 0) {
        let yOffset = 90
        activePowerUps.forEach(powerup => {
          const icons = {
            freeze: '❄️',
            double: '×2',
            frenzy: '⚡'
          }
          const colors = {
            freeze: '#4ecdc4',
            double: '#ffd93d',
            frenzy: '#ff6b6b'
          }
          
          ctx.fillStyle = colors[powerup.type]
          ctx.font = 'bold 25px Arial'
          ctx.fillText(`${icons[powerup.type]} ${powerup.remainingSeconds}s`, 10, yOffset)
          yOffset += 35
        })
      }
      
      // 显示升级提示
      if (this.levelUpMessage) {
        ctx.save()
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect(0, windowHeight / 2 - 50, windowWidth, 100)
        
        ctx.fillStyle = '#ffd93d'
        ctx.font = 'bold 40px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(this.levelUpMessage, windowWidth / 2, windowHeight / 2 + 10)
        ctx.textAlign = 'left'
        ctx.restore()
      }
    } else if (this.state === GAME_STATE.OVER) {
      this.gameOverUI.render()
    } else if (this.state === GAME_STATE.READY) {
      // 渲染开始界面
      this.startScreen.render()
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
