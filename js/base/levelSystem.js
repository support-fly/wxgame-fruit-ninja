/**
 * 关卡系统
 */

export default class LevelSystem {
  constructor() {
    this.currentLevel = 1
    this.score = 0
    
    // 关卡定义
    this.levels = [
      {
        level: 1,
        name: '新手',
        scoreTarget: 100,
        spawnInterval: 60,
        bombChance: 0.15,
        powerupChance: 0.05
      },
      {
        level: 2,
        name: '初级',
        scoreTarget: 300,
        spawnInterval: 55,
        bombChance: 0.18,
        powerupChance: 0.06
      },
      {
        level: 3,
        name: '中级',
        scoreTarget: 600,
        spawnInterval: 50,
        bombChance: 0.20,
        powerupChance: 0.07
      },
      {
        level: 4,
        name: '高级',
        scoreTarget: 1000,
        spawnInterval: 45,
        bombChance: 0.22,
        powerupChance: 0.08
      },
      {
        level: 5,
        name: '专家',
        scoreTarget: 1500,
        spawnInterval: 40,
        bombChance: 0.25,
        powerupChance: 0.10
      },
      {
        level: 6,
        name: '大师',
        scoreTarget: 2500,
        spawnInterval: 35,
        bombChance: 0.28,
        powerupChance: 0.12
      },
      {
        level: 7,
        name: '传奇',
        scoreTarget: 5000,
        spawnInterval: 30,
        bombChance: 0.30,
        powerupChance: 0.15
      },
      {
        level: 8,
        name: '至尊',
        scoreTarget: Infinity,
        spawnInterval: 25,
        bombChance: 0.32,
        powerupChance: 0.18
      }
    ]
  }
  
  /**
   * 获取当前关卡配置
   */
  getCurrentLevel() {
    return this.levels[this.currentLevel - 1] || this.levels[0]
  }
  
  /**
   * 更新分数并检查升级
   */
  updateScore(score) {
    this.score = score
    const currentLevelConfig = this.getCurrentLevel()
    
    // 检查是否达到升级条件
    if (score >= currentLevelConfig.scoreTarget && this.currentLevel < this.levels.length) {
      this.levelUp()
      return true
    }
    
    return false
  }
  
  /**
   * 升级
   */
  levelUp() {
    if (this.currentLevel < this.levels.length) {
      this.currentLevel++
      return true
    }
    return false
  }
  
  /**
   * 获取升级进度（0-1）
   */
  getProgress() {
    const currentLevelConfig = this.getCurrentLevel()
    
    if (currentLevelConfig.scoreTarget === Infinity) {
      return 1
    }
    
    // 计算上一关的目标分数
    const prevTarget = this.currentLevel > 1 
      ? this.levels[this.currentLevel - 2].scoreTarget 
      : 0
    
    const progress = (this.score - prevTarget) / (currentLevelConfig.scoreTarget - prevTarget)
    return Math.max(0, Math.min(1, progress))
  }
  
  /**
   * 获取到下一级的分数差
   */
  getScoreToNext() {
    const currentLevelConfig = this.getCurrentLevel()
    
    if (currentLevelConfig.scoreTarget === Infinity) {
      return 0
    }
    
    return Math.max(0, currentLevelConfig.scoreTarget - this.score)
  }
  
  /**
   * 重置关卡
   */
  reset() {
    this.currentLevel = 1
    this.score = 0
  }
  
  /**
   * 获取关卡总数
   */
  getTotalLevels() {
    return this.levels.length
  }
  
  /**
   * 获取关卡名称
   */
  getLevelName() {
    return this.getCurrentLevel().name
  }
  
  /**
   * 获取生成间隔
   */
  getSpawnInterval() {
    return this.getCurrentLevel().spawnInterval
  }
  
  /**
   * 获取炸弹概率
   */
  getBombChance() {
    return this.getCurrentLevel().bombChance
  }
  
  /**
   * 获取道具概率
   */
  getPowerupChance() {
    return this.getCurrentLevel().powerupChance
  }
}
