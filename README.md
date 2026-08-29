# 🎓 Unity & C# 训练营

一个"多邻国式"的 C#/Unity 每日学习网站：闯关答题、连击打卡、XP 升级，还带可以自由添加课程、上传 PDF 课件的课表。手机电脑都能用。

## 启动

双击 `启动学习网站.bat`（需要已安装 Node.js），或命令行运行：

```bash
node server.js
```

启动后会打印两个地址：

- 本机访问：http://localhost:8080
- 手机访问：http://<电脑局域网IP>:8080（手机与电脑连同一个 Wi-Fi，用手机浏览器打开即可）

## 功能

| 页面 | 功能 |
|------|------|
| 🏠 今日 | 连击/XP/等级、每日目标环、签到打卡、今天要上的课 |
| 📚 课程 | C# 12 课 + Unity 12 课，顺序闯关（完成上一课解锁下一课），知识点卡片 + 选择题 |
| 🗓️ 课表 | 自由添加课程（科目/星期/时间/备注），可上传 PDF 课件并在线预览 |
| 🔁 复习 | 错题本：答错的题自动收录，重练答对即移出 |
| 🌐 资源 | GitHub 优质学习仓库直达（AwesomeUnityTutorial、DotNetGuide 等） |

## 数据说明

- 学习进度存于浏览器 localStorage，PDF 课件存于 IndexedDB，全部只在你自己的设备上
- 换设备/清浏览器数据会丢失进度；课程内容与代码在本目录
- 想改课程内容：编辑 `js/data/csharp.js` 和 `js/data/unity.js`，按现有格式加课即可
- 首页"开始学习"按钮永远指向下一节未完成的课

## 知识点来源

课程大纲与知识点整理自：[AwesomeUnityTutorial](https://github.com/chutianshu1981/AwesomeUnityTutorial)、[UnityPath-DiDiao](https://github.com/jlgulu/UnityPath-DiDiao)、[unity-learning-path](https://github.com/MetaZhi/unity-learning-path)、[DotNetGuide](https://github.com/YSGStudyHards/DotNetGuide)、微软 C# 文档与 Unity 官方手册。
