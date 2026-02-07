/**
 * 对象池
 * 用于复用游戏对象，减少GC压力
 */
export default class Pool {
  constructor(createFunc, resetFunc, initSize = 10) {
    this.createFunc = createFunc
    this.resetFunc = resetFunc
    this.pool = []
    this.active = []
    
    // 预创建对象
    for (let i = 0; i < initSize; i++) {
      this.pool.push(createFunc())
    }
  }
  
  /**
   * 获取对象
   */
  get(...args) {
    let obj
    
    if (this.pool.length > 0) {
      // 从池中取出
      obj = this.pool.pop()
      this.resetFunc(obj, ...args)
    } else {
      // 池空了，创建新对象
      obj = this.createFunc()
      this.resetFunc(obj, ...args)
    }
    
    this.active.push(obj)
    return obj
  }
  
  /**
   * 回收对象
   */
  recycle(obj) {
    const index = this.active.indexOf(obj)
    if (index > -1) {
      this.active.splice(index, 1)
      this.pool.push(obj)
    }
  }
  
  /**
   * 批量回收
   */
  recycleAll() {
    this.pool.push(...this.active)
    this.active = []
  }
  
  /**
   * 获取活跃对象数
   */
  getActiveCount() {
    return this.active.length
  }
  
  /**
   * 获取池大小
   */
  getPoolSize() {
    return this.pool.length
  }
}
