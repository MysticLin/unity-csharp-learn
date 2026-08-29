# 🎓 Unity & C# 训练营

一个"多邻国式"的 C#/Unity 每日学习网站：闯关答题、连击打卡、XP 升级，还带可以自由添加课程、上传 PDF 课件的课表。手机电脑都能用。

## 🌐 在线地址（手机直接用）

**https://mysticlin.github.io/unity-csharp-learn/**

- 手机用流量也能打开（部署在 GitHub Pages，电脑关机也能用）
- 首次打开后自动离线缓存，之后没网也能刷题；建议浏览器菜单里"添加到主屏幕"，像 App 一样用
- 手机和电脑的进度各自独立保存在各自浏览器里
- 更新课程内容后：`git add -A && git commit -m "update" && git push`，Pages 一分钟内自动更新

## 本地启动（可选）

双击 `启动学习网站.bat`（需要已安装 Node.js），或命令行运行：

```bash
node server.js
```

启动后会打印两个地址：

- 本机访问：http://localhost:8080
- 手机访问（同一 Wi-Fi 时）：http://<电脑局域网IP>:8080

## 功能

| 页面 | 功能 |
|------|------|
| 🏠 今日 | 连击/经验/等级、近 7 天打卡日历、**每日任务**（完成 1 课 / 连对 5 题 / 全对通关，奖励 XP）、经验柱状图 |
| 📚 课程 | C# 12 课 + Unity 12 课 + 算法 10 专题（共 **178 题**），顺序闯关（完成上一课解锁下一课），知识点卡片 + 选择题；每个知识点附**「深入了解」详解**（原理、常见坑、实战建议） |
| ❤️ 红心 | 5 颗红心，答错扣 1 颗；耗尽后可用 20 XP 补满、等 20 分钟/颗回血，或做错题练习一次回满 |
| 🔊 反馈 | 答对/答错/通关合成音效 + 手机震动 + 通关撒花，可一键静音 |
| 🗓️ 课表 | 自由添加课程（科目/星期/时间/备注），可上传 PDF 课件并在线预览 |
| 🔁 复习 | **综合练习**：从已学课程随机抽 8 题混考（可按赛道筛选），答对 +5 XP 不扣红心；**错题本**：答错自动收录，重练答对移出并回满红心 |
| 🗂️ 我的 | **自建课程**：文字 / 代码 / 视频（B站、YouTube、本地视频）/ 链接 / 自测题自由组合；数据导出导入备份；GitHub 资源入口 |

## 数据说明

- 学习进度存于浏览器 localStorage，PDF 课件存于 IndexedDB，全部只在你自己的设备上
- 换设备/清浏览器数据会丢失进度；课程内容与代码在本目录
- 想改课程内容：编辑 `js/data/csharp.js` 和 `js/data/unity.js`，按现有格式加课即可
- 首页"开始学习"按钮永远指向下一节未完成的课

## 知识点来源

课程大纲与知识点整理自：[AwesomeUnityTutorial](https://github.com/chutianshu1981/AwesomeUnityTutorial)、[UnityPath-DiDiao](https://github.com/jlgulu/UnityPath-DiDiao)、[unity-learning-path](https://github.com/MetaZhi/unity-learning-path)、[DotNetGuide](https://github.com/YSGStudyHards/DotNetGuide)、微软 C# 文档与 Unity 官方手册。
