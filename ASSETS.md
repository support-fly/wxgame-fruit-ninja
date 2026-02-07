# 素材准备指南

## 图片素材规格

### 水果图片 (images/fruits/)
推荐尺寸：200x200 px，PNG 格式，透明背景

需要准备：
- apple.png - 苹果
- banana.png - 香蕉
- watermelon.png - 西瓜
- orange.png - 橙子
- strawberry.png - 草莓
- grape.png - 葡萄

### 其他图片
- bg.jpg - 背景图 (750x1334 px)
- bomb.png - 炸弹 (200x200 px，透明背景)
- slash.png - 刀光特效 (可选)
- explosion.png - 爆炸特效 (可选)

## 音频素材

### 音效
- slice.mp3 - 切水果音效（建议0.3秒以内）
- bomb.mp3- 爆炸音效（建议0.5秒以内）

### 背景音乐
- bgm.mp3 - 背景音乐（建议30秒-1分钟循环）

## 素材来源建议

1. **免费素材网站：**
   - Freepik (https://www.freepik.com/)
   - Flaticon (https://www.flaticon.com/)
   - Pixabay (https://pixabay.com/)

2. **音效网站：**
   - Freesound (https://freesound.org/)
   - Zapsplat (https://www.zapsplat.com/)

3. **自己绘制：**
   - 使用 Procreate、Photoshop 等工具
   - 保持风格一致

## 临时占位素材

在开发阶段，可以先用纯色圆形代替：

```javascript
// 在 Fruit.js 的 render 方法中
ctx.fillStyle = '#ff6b6b' // 红色
ctx.beginPath()
ctx.arc(this.x, this.y, 30, 0, Math.PI * 2)
ctx.fill()
```
