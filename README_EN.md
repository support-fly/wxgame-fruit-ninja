# 🍉 Fruit Ninja - WeChat Mini Game

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![WeChat MiniGame](https://img.shields.io/badge/WeChat-MiniGame-07C160?logo=wechat)](https://developers.weixin.qq.com/minigame/dev/guide/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://www.ecma-international.org/)
[![Canvas](https://img.shields.io/badge/Canvas-2D-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

> A fully-featured Fruit Ninja WeChat mini game implementation with power-up system, level progression, and rich particle effects.

English | [简体中文](README.md)

---

## ✨ Features

### 🎮 Core Gameplay
- ✅ Touch-to-slice fruit mechanics
- ✅ Smooth blade trail rendering
- ✅ Realistic parabolic physics
- ✅ Combo scoring system
- ✅ Bomb penalty mechanism
- ✅ Missed fruit penalty

### 🎁 Power-Up System
- **❄️ Freeze Time** - Slow down objects by 70%, lasts 5 seconds
- **×2 Double Score** - Double all points, lasts 5 seconds
- **⚡ Fruit Frenzy** - 2x spawn speed, lasts 5 seconds

### 📈 Level System
8 progressively challenging levels:
- Lv.1 Beginner (100 points)
- Lv.2 Novice (300 points)
- Lv.3 Intermediate (600 points)
- Lv.4 Advanced (1000 points)
- Lv.5 Expert (1500 points)
- Lv.6 Master (2500 points)
- Lv.7 Legend (5000 points)
- Lv.8 Supreme (Infinite Challenge)

### ✨ Effects System
- 💥 Fruit explosion particles (15 particles)
- 💣 Bomb blast effect (30 particles)
- ✨ Blade trail particles
- 🎁 Power-up collection glow
- 📳 Haptic feedback

---

## 📸 Preview

> Screenshots coming soon (run in WeChat Developer Tools to capture)

---

## 🚀 Quick Start

### Requirements
- [WeChat Developer Tools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- Node.js (optional, for syntax checking)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/support-fly/wxgame-fruit-ninja.git
cd wxgame-fruit-ninja
```

2. **Run test script**
```bash
./test-prepare.sh
```

3. **Import into WeChat Developer Tools**
- Open WeChat Developer Tools
- Click "Import Project"
- Select project directory
- AppID: Use test account or your own AppID

4. **Compile and Run**
- Click "Compile"
- Test the game in the simulator

---

## 📖 Documentation

- [Quick Test Guide](QUICK-TEST.md)
- [Complete Testing Checklist](TESTING.md)
- [Test Preparation Report](TEST-REPORT.md)
- [Development Plan](PLAN.md)
- [Assets Checklist](ASSETS.md)

---

## 📁 Project Structure

```
wxgame-fruit-ninja/
├── game.js                 # Main game logic
├── game.json              # Game configuration
├── project.config.json    # WeChat project config
│
├── js/
│   ├── base/              # Core systems
│   │   ├── sprite.js          # Sprite base class
│   │   ├── pool.js            # Object pool optimization
│   │   ├── audioManager.js    # Audio manager
│   │   ├── powerupManager.js  # Power-up manager
│   │   ├── levelSystem.js     # Level system
│   │   └── effectsManager.js  # Effects manager
│   │
│   ├── runtime/           # Game objects
│   │   ├── background.js      # Background
│   │   ├── fruit.js           # Fruit entity
│   │   ├── bomb.js            # Bomb entity
│   │   └── powerup.js         # Power-up entity
│   │
│   ├── player/            # Player interaction
│   │   └── blade.js           # Blade trail effect
│   │
│   └── ui/                # User interface
│       ├── startScreen.js     # Start screen
│       ├── score.js           # Score display
│       └── gameOver.js        # Game over screen
│
├── audio/                 # Audio files (to be added)
└── images/                # Image assets (optional)
```

---

## 🎯 Completion Status

- ✅ **Core Gameplay** - 100%
- ✅ **Power-Up System** - 100%
- ✅ **Level System** - 100%
- ✅ **Effects System** - 100%
- ✅ **UI System** - 60%
- ⚠️ **Audio Assets** - 0% (code ready)
- ❌ **Social Features** - Not implemented

**Overall Completion: ~85%**

---

## ⚠️ Known Limitations

1. **Missing Audio Files** - Game auto-degrades to silent mode
   - Required: slice.mp3, bomb.mp3, combo.mp3, miss.mp3, powerup.mp3, bgm.mp3

2. **Placeholder Graphics** - Currently using Canvas-drawn placeholders
   - Game is fully playable, can be enhanced later

3. **Not Implemented**
   - Pause menu
   - Settings screen
   - Leaderboard
   - Social sharing

---

## 🛠️ Tech Stack

- **Framework**: WeChat Mini Game API
- **Rendering**: Canvas 2D
- **Architecture**: Object-Oriented Programming (OOP)
- **Optimization**: Object pooling, particle systems
- **Effects**: Haptic feedback, particle animations

---

## 📊 Code Statistics

```
Files: 16 JavaScript files
Total Lines: ~2500
Core Systems: 8
Game Objects: 4 types
Power-ups: 3 types
Levels: 8
```

---

## 🤝 Contributing

Issues and Pull Requests are welcome!

### Development Workflow
1. Fork this repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 TODO

- [ ] Add audio files
- [ ] Prepare fruit image assets
- [ ] Implement pause feature
- [ ] Add settings screen
- [ ] Implement leaderboard
- [ ] Add tutorial hints
- [ ] Real device testing optimization

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

---

## 👨‍💻 Authors

**Ou Qing & Ou Niyou**

---

## 🙏 Acknowledgments

- WeChat Mini Game Documentation
- Canvas API
- All contributors

---

## 📞 Contact

- Issues: [GitHub Issues](https://github.com/support-fly/wxgame-fruit-ninja/issues)

---

**⭐ If this project helped you, please give it a Star!**

---

Made with ❤️ by Ou Qing
