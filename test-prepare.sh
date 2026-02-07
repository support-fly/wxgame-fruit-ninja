#!/bin/bash
# 测试准备脚本

echo "🧪 水果忍者游戏测试准备"
echo "================================"
echo ""

# 检查文件完整性
echo "📁 检查文件结构..."
required_files=(
  "game.js"
  "game.json"
  "project.config.json"
  "js/base/sprite.js"
  "js/base/pool.js"
  "js/base/audioManager.js"
  "js/base/powerupManager.js"
  "js/base/levelSystem.js"
  "js/base/effectsManager.js"
  "js/runtime/background.js"
  "js/runtime/fruit.js"
  "js/runtime/bomb.js"
  "js/runtime/powerup.js"
  "js/player/blade.js"
  "js/ui/score.js"
  "js/ui/gameOver.js"
  "js/ui/startScreen.js"
)

missing_files=()
for file in "${required_files[@]}"; do
  if [ ! -f "$file" ]; then
    missing_files+=("$file")
  fi
done

if [ ${#missing_files[@]} -eq 0 ]; then
  echo "✅ 所有核心文件完整"
else
  echo "❌ 缺少文件："
  for file in "${missing_files[@]}"; do
    echo "   - $file"
  done
fi

echo ""

# 检查语法错误
echo "🔍 检查JavaScript语法..."
syntax_errors=0
for file in $(find . -name "*.js" -not -path "./node_modules/*"); do
  if ! node --check "$file" 2>/dev/null; then
    echo "❌ 语法错误: $file"
    ((syntax_errors++))
  fi
done

if [ $syntax_errors -eq 0 ]; then
  echo "✅ 无语法错误"
else
  echo "❌ 发现 $syntax_errors 个文件有语法错误"
fi

echo ""

# 检查音频文件
echo "🔊 检查音频文件..."
audio_files=(
  "audio/slice.mp3"
  "audio/bomb.mp3"
  "audio/combo.mp3"
  "audio/miss.mp3"
  "audio/powerup.mp3"
  "audio/bgm.mp3"
)

missing_audio=0
for file in "${audio_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "⚠️  缺少: $file"
    ((missing_audio++))
  fi
done

if [ $missing_audio -eq 0 ]; then
  echo "✅ 所有音频文件就绪"
else
  echo "⚠️  缺少 $missing_audio 个音频文件（游戏会自动降级为静音模式）"
fi

echo ""

# 检查图片素材
echo "🖼️  检查图片素材..."
if [ -d "images" ]; then
  image_count=$(find images -name "*.png" -o -name "*.jpg" | wc -l)
  echo "✅ 找到 $image_count 个图片文件"
else
  echo "⚠️  images目录不存在（游戏会使用占位符）"
fi

echo ""
echo "================================"
echo "📊 测试准备报告"
echo "================================"
echo "核心文件: ${#missing_files[@]} 缺少"
echo "语法错误: $syntax_errors 个"
echo "音频文件: $missing_audio 缺少"
echo ""

if [ ${#missing_files[@]} -eq 0 ] && [ $syntax_errors -eq 0 ]; then
  echo "✅ 游戏可以开始测试！"
  echo ""
  echo "🚀 下一步："
  echo "1. 打开微信开发者工具"
  echo "2. 导入项目目录: $(pwd)"
  echo "3. 点击编译"
  echo "4. 开始测试！"
  echo ""
  echo "📝 参考测试清单: TESTING.md"
else
  echo "❌ 请先修复上述问题"
fi

echo ""
