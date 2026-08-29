@echo off
chcp 65001 >nul
title Unity ^& C# 训练营
cd /d %~dp0
echo 正在启动学习网站...
node server.js
pause
