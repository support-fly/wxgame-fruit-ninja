/**
 * 道具效果管理器
 */

export default class PowerUpManager {
  constructor() {
    this.activePowerUps = new Map()
    this.freezeActive = false
    this.doubleScoreActive = false
    this.frenzyActive = false
  }
  
  /**
   * 激活道具
   */
  activate(type, duration = 5000) {
    const endTime = Date.now() + duration
    this.activePowerUps.set(type, endTime)
    
    switch (type) {
      case 'freeze':
        this.freezeActive = true
        break
      case 'double':
        this.doubleScoreActive = true
        break
      case 'frenzy':
        this.frenzyActive = true
        break
    }
    
    return {
      type,
      duration,
      endTime
    }
  }
  
  /**
   * 更新道具状态
   */
  update() {
    const now = Date.now()
    
    for (const [type, endTime] of this.activePowerUps.entries()) {
      if (now >= endTime) {
        this.deactivate(type)
      }
    }
  }
  
  /**
   * 取消道具效果
   */
  deactivate(type) {
    this.activePowerUps.delete(type)
    
    switch (type) {
      case 'freeze':
        this.freezeActive = false
        break
      case 'double':
        this.doubleScoreActive = false
        break
      case 'frenzy':
        this.frenzyActive = false
        break
    }
  }
  
  /**
   * 获取剩余时间（毫秒）
   */
  getRemainingTime(type) {
    const endTime = this.activePowerUps.get(type)
    if (!endTime) return 0
    
    return Math.max(0, endTime - Date.now())
  }
  
  /**
   * 获取剩余时间（秒）
   */
  getRemainingSeconds(type) {
    return Math.ceil(this.getRemainingTime(type) / 1000)
  }
  
  /**
   * 检查道具是否激活
   */
  isActive(type) {
    return this.activePowerUps.has(type)
  }
  
  /**
   * 获取时间减速系数（冰冻时用）
   */
  getTimeScale() {
    return this.freezeActive ? 0.3 : 1.0
  }
  
  /**
   * 获取分数倍数
   */
  getScoreMultiplier() {
    return this.doubleScoreActive ? 2 : 1
  }
  
  /**
   * 获取生成速度倍数（狂暴时用）
   */
  getSpawnSpeedMultiplier() {
    return this.frenzyActive ? 2 : 1
  }
  
  /**
   * 重置所有道具
   */
  reset() {
    this.activePowerUps.clear()
    this.freezeActive = false
    this.doubleScoreActive = false
    this.frenzyActive = false
  }
  
  /**
   * 获取所有激活的道具
   */
  getActivePowerUps() {
    const active = []
    for (const [type, endTime] of this.activePowerUps.entries()) {
      active.push({
        type,
        remainingSeconds: this.getRemainingSeconds(type)
      })
    }
    return active
  }
}
