# Project File Structure / 项目文件结构

## Overview / 概览

**Total Files**: 33  
**JavaScript Files**: 16  
**Markdown Files**: 14  
**Configuration Files**: 3

---

## Core Game Files / 核心游戏文件

### Main Entry / 主入口
- `game.js` - Main game logic / 游戏主逻辑 (400+ lines)
- `game.json` - Game configuration / 游戏配置
- `project.config.json` - WeChat project config / 微信项目配置

### Base Systems / 基础系统 (`js/base/`)
1. `sprite.js` - Sprite base class / 精灵基类
2. `pool.js` - Object pool / 对象池
3. `audioManager.js` - Audio system / 音频系统
4. `powerupManager.js` - Power-up management / 道具管理
5. `levelSystem.js` - Level progression / 关卡系统
6. `effectsManager.js` - Particle effects / 粒子特效
7. `placeholder.js` - Placeholder utilities / 占位符工具

### Game Objects / 游戏对象 (`js/runtime/`)
1. `background.js` - Background rendering / 背景渲染
2. `fruit.js` - Fruit entity / 水果实体
3. `bomb.js` - Bomb entity / 炸弹实体
4. `powerup.js` - Power-up entity / 道具实体

### Player Interaction / 玩家交互 (`js/player/`)
1. `blade.js` - Blade trail / 刀光轨迹

### User Interface / 用户界面 (`js/ui/`)
1. `startScreen.js` - Start screen / 开始界面
2. `score.js` - Score display / 分数显示
3. `gameOver.js` - Game over screen / 结束界面

---

## Documentation / 文档文件

### README Files / 说明文件
1. `README.md` - Main README (Chinese) / 主说明（中文）
2. `README_EN.md` - English README / 英文说明
3. `README-local.md` - Local documentation / 本地文档
4. `DESCRIPTION.md` - Project description / 项目描述

### Development Docs / 开发文档
1. `PLAN.md` - Development plan / 开发计划
2. `TESTING.md` - Testing checklist / 测试清单
3. `QUICK-TEST.md` - Quick test guide / 快速测试指南
4. `TEST-REPORT.md` - Test report / 测试报告
5. `ASSETS.md` - Assets checklist / 素材清单
6. `RESOURCES.md` - Resource links / 资源链接
7. `PROJECT-FILES.md` - This file / 本文件

### GitHub Files / GitHub文件
1. `LICENSE` - MIT License / MIT许可证
2. `.github/CONTRIBUTING.md` - Contribution guide / 贡献指南
3. `.github/ISSUE_TEMPLATE.md` - Issue template / Issue模板
4. `.github/PULL_REQUEST_TEMPLATE.md` - PR template / PR模板

---

## Asset Directories / 素材目录

### Audio / 音频
- `audio/` - Audio files directory / 音频文件目录
  - `README.md` - Audio requirements / 音频需求

### Images / 图片
- `images/` - Image assets directory / 图片素材目录
  - Currently empty / 当前为空

---

## Utility Scripts / 工具脚本

1. `test-prepare.sh` - Test preparation script / 测试准备脚本
2. `check-assets.sh` - Assets check script / 素材检查脚本

---

## File Size Overview / 文件大小概览

| Category / 类别 | Files / 文件数 | Approx. Lines / 约行数 |
|-----------------|---------------|----------------------|
| Game Logic / 游戏逻辑 | 16 | 2500+ |
| Documentation / 文档 | 14 | 3000+ |
| Configuration / 配置 | 3 | 50 |
| **Total / 总计** | **33** | **5550+** |

---

## Key Files for Development / 开发关键文件

### Must Read / 必读
1. `README.md` or `README_EN.md` - Project overview / 项目概览
2. `PLAN.md` - Architecture and plan / 架构和计划
3. `game.js` - Core game loop / 核心游戏循环

### For Testing / 测试相关
1. `QUICK-TEST.md` - Testing guide / 测试指南
2. `test-prepare.sh` - Run before testing / 测试前运行
3. `TESTING.md` - Complete checklist / 完整清单

### For Contributors / 贡献者
1. `.github/CONTRIBUTING.md` - How to contribute / 如何贡献
2. `.github/ISSUE_TEMPLATE.md` - Issue format / Issue格式
3. `.github/PULL_REQUEST_TEMPLATE.md` - PR format / PR格式

---

## Version History / 版本历史

- **v1.0-beta** (2026-02-07): Initial release / 初始版本
  - 14 commits / 14次提交
  - 85% complete / 完成度85%
  - Core gameplay ready / 核心玩法就绪

---

**Last Updated / 最后更新**: 2026-02-07
