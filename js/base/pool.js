/**
 * 对象池
 */
export default class Pool {
  constructor(initSize = 10) {
    this.pool = []
    this.initSize = initSize
  }
  
  init(createFunc) {
    for (let i = 0; i < this.initSize; i++) {
      this.pool.push(createFunc())
    }
  }
  
  get() {
    return this.pool.shift()
  }
  
  recycle(obj) {
    this.pool.push(obj)
  }
}
