/**
 * 音效管理器
 * 统一管理所有音效的播放、停止、音量控制
 */

export default class AudioManager {
  constructor() {
    this.sounds = {}
    this.music = null
    this.soundEnabled = true
    this.musicEnabled = true
    this.soundVolume = 1.0
    this.musicVolume = 0.5
    
    // 预加载音效
    this.preload()
  }
  
  /**
   * 预加载音效
   */
  preload() {
    const soundList = [
      { name: 'slice', path: 'audio/slice.mp3', loop: false },
      { name: 'bomb', path: 'audio/bomb.mp3', loop: false },
      { name: 'combo', path: 'audio/combo.mp3', loop: false },
      { name: 'miss', path: 'audio/miss.mp3', loop: false },
      { name: 'powerup', path: 'audio/powerup.mp3', loop: false }
    ]
    
    soundList.forEach(sound => {
      this.sounds[sound.name] = {
        path: sound.path,
        loop: sound.loop,
        instances: []
      }
    })
    
    // 背景音乐
    this.musicPath = 'audio/bgm.mp3'
  }
  
  /**
   * 播放音效
   */
  playSound(name) {
    if (!this.soundEnabled || !this.sounds[name]) return
    
    try {
      const audio = wx.createInnerAudioContext()
      audio.src = this.sounds[name].path
      audio.volume = this.soundVolume
      audio.loop = this.sounds[name].loop
      
      // 播放完成后销毁
      audio.onEnded(() => {
        audio.destroy()
        this.removeInstance(name, audio)
      })
      
      // 播放失败时降级（不影响游戏）
      audio.onError((err) => {
        console.warn(`Audio ${name} play failed:`, err)
        audio.destroy()
        this.removeInstance(name, audio)
      })
      
      audio.play()
      this.sounds[name].instances.push(audio)
      
    } catch (err) {
      console.warn(`Failed to play sound ${name}:`, err)
    }
  }
  
  /**
   * 停止音效
   */
  stopSound(name) {
    if (!this.sounds[name]) return
    
    this.sounds[name].instances.forEach(audio => {
      audio.stop()
      audio.destroy()
    })
    
    this.sounds[name].instances = []
  }
  
  /**
   * 移除音效实例
   */
  removeInstance(name, audio) {
    if (!this.sounds[name]) return
    
    const index = this.sounds[name].instances.indexOf(audio)
    if (index > -1) {
      this.sounds[name].instances.splice(index, 1)
    }
  }
  
  /**
   * 播放背景音乐
   */
  playMusic() {
    if (!this.musicEnabled || this.music) return
    
    try {
      this.music = wx.createInnerAudioContext()
      this.music.src = this.musicPath
      this.music.volume = this.musicVolume
      this.music.loop = true
      
      this.music.onError((err) => {
        console.warn('Music play failed:', err)
        this.music = null
      })
      
      this.music.play()
      
    } catch (err) {
      console.warn('Failed to play music:', err)
    }
  }
  
  /**
   * 停止背景音乐
   */
  stopMusic() {
    if (this.music) {
      this.music.stop()
      this.music.destroy()
      this.music = null
    }
  }
  
  /**
   * 暂停背景音乐
   */
  pauseMusic() {
    if (this.music) {
      this.music.pause()
    }
  }
  
  /**
   * 恢复背景音乐
   */
  resumeMusic() {
    if (this.music) {
      this.music.play()
    }
  }
  
  /**
   * 设置音效开关
   */
  setSoundEnabled(enabled) {
    this.soundEnabled = enabled
    if (!enabled) {
      // 停止所有音效
      Object.keys(this.sounds).forEach(name => {
        this.stopSound(name)
      })
    }
  }
  
  /**
   * 设置音乐开关
   */
  setMusicEnabled(enabled) {
    this.musicEnabled = enabled
    if (!enabled) {
      this.stopMusic()
    } else {
      this.playMusic()
    }
  }
  
  /**
   * 设置音效音量
   */
  setSoundVolume(volume) {
    this.soundVolume = Math.max(0, Math.min(1, volume))
  }
  
  /**
   * 设置音乐音量
   */
  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume))
    if (this.music) {
      this.music.volume = this.musicVolume
    }
  }
  
  /**
   * 停止所有音频
   */
  stopAll() {
    Object.keys(this.sounds).forEach(name => {
      this.stopSound(name)
    })
    this.stopMusic()
  }
  
  /**
   * 销毁管理器
   */
  destroy() {
    this.stopAll()
    this.sounds = {}
    this.music = null
  }
}
