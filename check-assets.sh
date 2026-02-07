#!/bin/bash
# 素材集成脚本
# 用于批量下载和处理游戏素材

echo "🎨 水果忍者 - 素材集成工具"
echo "================================"

PROJECT_DIR="/home/janify/wxgame-fruit-ninja"
IMAGES_DIR="$PROJECT_DIR/images"
AUDIO_DIR="$PROJECT_DIR/audio"

# 创建目录
mkdir -p "$IMAGES_DIR/fruits"
mkdir -p "$IMAGES_DIR/effects"
mkdir -p "$AUDIO_DIR"

echo ""
echo "📁 目录结构已准备好"
echo ""

# 检查素材文件
echo "📋 检查素材文件..."
echo ""

FRUITS=("apple" "banana" "watermelon" "orange" "strawberry" "grape")
MISSING_FRUITS=()

for fruit in "${FRUITS[@]}"; do
    if [ -f "$IMAGES_DIR/fruits/${fruit}.png" ]; then
        echo "  ✅ ${fruit}.png 已存在"
    else
        echo "  ❌ ${fruit}.png 缺失"
        MISSING_FRUITS+=("$fruit")
    fi
done

echo ""

# 炸弹
if [ -f "$IMAGES_DIR/bomb.png" ]; then
    echo "  ✅ bomb.png 已存在"
else
    echo "  ❌ bomb.png 缺失"
fi

# 背景
if [ -f "$IMAGES_DIR/bg.jpg" ]; then
    echo "  ✅ bg.jpg 已存在"
else
    echo "  ❌ bg.jpg 缺失"
fi

echo ""
echo "🔊 检查音频文件..."
echo ""

# 音效
SOUNDS=("slice" "bomb" "bgm")
MISSING_SOUNDS=()

for sound in "${SOUNDS[@]}"; do
    if [ -f "$AUDIO_DIR/${sound}.mp3" ]; then
        echo "  ✅ ${sound}.mp3 已存在"
    else
        echo "  ❌ ${sound}.mp3 缺失"
        MISSING_SOUNDS+=("$sound")
    fi
done

echo ""
echo "================================"
echo ""

# 统计
TOTAL_FRUITS=${#FRUITS[@]}
MISSING_FRUITS_COUNT=${#MISSING_FRUITS[@]}
FOUND_FRUITS=$((TOTAL_FRUITS - MISSING_FRUITS_COUNT))

TOTAL_SOUNDS=${#SOUNDS[@]}
MISSING_SOUNDS_COUNT=${#MISSING_SOUNDS[@]}
FOUND_SOUNDS=$((TOTAL_SOUNDS - MISSING_SOUNDS_COUNT))

echo "📊 素材统计："
echo "  图片: $FOUND_FRUITS/$TOTAL_FRUITS 水果"
echo "  音频: $FOUND_SOUNDS/$TOTAL_SOUNDS 音效"

echo ""

if [ ${#MISSING_FRUITS[@]} -gt 0 ] || [ ${#MISSING_SOUNDS[@]} -gt 0 ]; then
    echo "⚠️  还需要准备以下素材："
    echo ""
    
    if [ ${#MISSING_FRUITS[@]} -gt 0 ]; then
        echo "  水果图片："
        for fruit in "${MISSING_FRUITS[@]}"; do
            echo "    - ${fruit}.png"
        done
        echo ""
    fi
    
    if [ ${#MISSING_SOUNDS[@]} -gt 0 ]; then
        echo "  音效文件："
        for sound in "${MISSING_SOUNDS[@]}"; do
            echo "    - ${sound}.mp3"
        done
        echo ""
    fi
    
    echo "💡 提示: 查看 RESOURCES.md 获取素材下载链接"
else
    echo "🎉 所有素材已准备完成！"
    echo ""
    echo "✅ 可以开始游戏了！"
fi

echo ""
echo "================================"
