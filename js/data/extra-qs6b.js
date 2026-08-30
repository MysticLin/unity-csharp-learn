// Unity 补充包 —— 补足批次 6 到 100 题（12 道去重后新增）
window.EXTRA_QS6B = {
  u1: [
    { q: "Unity 里\"播放\"状态下 Inspector 的标题栏会提示什么，帮你区分编辑/运行改动？", opts: ["会显示播放状态提示，退出后改动还原", "没有任何提示", "自动保存", "弹出弹窗"], a: 0, ex: "Play 模式的改动不落盘。改参数回非 Play 状态确认，或用 Play Mode 数据保存工具。" }
  ],
  u2: [
    { q: "脚本里 Debug.Log 太多影响性能时，合理的做法是？", opts: ["用条件编译/开关统一关闭，或按级别保留", "不管它", "全部删掉", "改用 print"], a: 0, ex: "日志字符串拼接本身有成本。封装 Logger 类带开关，发布版一键静默。" }
  ],
  u3: [
    { q: "协程里想\"每帧跟随某个目标点移动\"，应该？", opts: ["yield return null 后用 Time.deltaTime 移动，循环", "只用 while(true) 不 yield", "在 Update 里写", "用 InvokeRepeating"], a: 0, ex: "协程里 while + yield return null 就是\"自定义的 Update\"，适合一段连续的流程动画。" }
  ],
  u4: [
    { q: "Vector3.Lerp(a, b, 0.5f) 的结果是？", opts: ["a 与 b 的中点", "b", "a", "报错"], a: 0, ex: "t=0.5 取中点；t 由 0 渐增到 1 就实现了 a→b 的插值动画。" }
  ],
  u5: [
    { q: "想获取\"其他物体\"上的组件（已知那个物体的引用），写法是？", opts: ["otherObject.GetComponent<Health>()", "GetComponent<Health>() 会自动找别的物体", "GetOtherComponent<Health>()", "只能在同一物体上找"], a: 0, ex: "GetComponent 只搜自己；别的物体就用它的引用点出来。跨物体访问都是\"先拿物体引用，再点组件\"。" }
  ],
  u6: [
    { q: "检测\"玩家按住鼠标拖拽\"（持续状态），应该用？", opts: ["Input.GetMouseButton(0)（按住期间每帧 true）", "GetMouseButtonDown(0)", "GetMouseButtonUp(0)", "GetKey"], a: 0, ex: "三兄弟区别同键盘：Down 按下帧、按住持续、Up 抬起帧。拖拽 = Down 开始 + 按住更新 + Up 结束。" }
  ],
  u7: [
    { q: "物体从高处落到地面想\"压扁一点\"再恢复（果冻感），最适合监听？", opts: ["OnCollisionEnter 里根据 relativeVelocity 缩放形变", "OnTriggerEnter", "Update", "OnEnable"], a: 0, ex: "撞击瞬间按 relativeVelocity 大小做 Squash & Stretch，挤压动画立刻有生命感。" }
  ],
  u8: [
    { q: "对象池里的对象\"用完忘记回收\"会发生的现象是？", opts: ["池子越来越空，最后新请求拿不到对象", "游戏崩溃", "对象自动回收", "没有影响"], a: 0, ex: "池耗尽时只能扩容或等待。回收逻辑与获取逻辑成对出现（try/finally 思维）最稳。" }
  ],
  u9: [
    { q: "想\"每 0.5 秒生成一个敌人，共生成 10 个\"，最清晰的实现是？", opts: ["协程 for 循环 + WaitForSeconds(0.5f)", "Update 里计时", "InvokeRepeating 10 次后手动停", "十行 Invoke"], a: 0, ex: "协程把\"重复 N 次带延时\"写成直观的循环，比 InvokeRepeating 更好控制次数与收尾。" }
  ],
  u10: [
    { q: "UI 文本被旁边的元素遮住，控制 2D UI 叠放顺序的是？", opts: ["同 Canvas 下的Sibling 顺序 / Sorting Order", "Z 轴坐标", "物体大小", "创建时间"], a: 0, ex: "同 Canvas 内按 Hierarchy 顺序渲染（下面的在上）；跨 Canvas 按 Sort Order。" }
  ],
  u11: [
    { q: "把关卡做成独立场景 Additive 加载的最大好处是？", opts: ["多人协作互不冲突 + 按需加载省内存", "场景更漂亮", "加载更快一定", "不需要保存"], a: 0, ex: "模块化场景：常驻系统 + 动态关卡。团队分工、内存、加载时间三赢。" }
  ],
  u12: [
    { q: "想\"按任意键继续\"的标题画面，检测输入用？", opts: ["Input.anyKeyDown", "Input.GetAxis", "OnMouseDown", "轮询每个键"], a: 0, ex: "anyKeyDown 一行搞定；要区分具体按键再读取 inputString 或 GetKeyDown。" }
  ]
};
