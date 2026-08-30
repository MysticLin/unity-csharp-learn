// 题库扩充包 2 —— 36 题，每道可执行题带 tag 供 tools/verify-qs.mjs 自动验证
window.EXTRA_QS2 = {
  cs1: [
    { tag: "cs1_charplus", q: "以下代码输出？", code: "Debug.Log('A' + 1);", opts: ["A1", "66", "B", "98"], a: 1, ex: "char 参与算术运算时被提升为 int（'A' = 65），65+1=66，结果是 int。想得到 'B' 要写 (char)('A' + 1)。" }
  ],
  cs2: [
    { tag: "cs2_indexof", q: "以下代码输出？", code: "Debug.Log(\"hello world\".IndexOf(\"o\"));", opts: ["4", "7", "0", "-1"], a: 0, ex: "IndexOf 返回第一个匹配的下标：hello 的下标 4 处是 o。找不到返回 -1；找最后一个用 LastIndexOf。" }
  ],
  cs3: [
    { tag: "cs3_while", q: "以下代码打印的内容是？", code: "int i = 3;\nwhile (i > 0) {\n    Debug.Log(i);\n    i -= 2;\n}", opts: ["打印 3 和 1", "打印 3、2、1", "只打印 3", "死循环"], a: 0, ex: "i=3 打印后减 2 变 1，再打印 1 后变 -1，条件不成立退出。共两行：3、1。" }
  ],
  cs4: [
    { tag: "cs4_indexofcontains", q: "以下代码输出？", code: "var list = new List<int> { 5, 10, 15 };\nDebug.Log(list.IndexOf(10) + \"/\" + list.Contains(20));", opts: ["1/False", "2/True", "1/True", "2/False"], a: 0, ex: "IndexOf(10) 返回下标 1；Contains(20) 是 False——20 不在列表里。注意 C# 的 bool 打出来是首字母大写的 True/False。" }
  ],
  cs5: [
    { tag: "cs5_swapref", q: "x=1、y=2，调用 Swap(ref x, ref y) 之后 x 和 y 是？", code: "void Swap(ref int a, ref int b) {\n    int t = a; a = b; b = t;\n}", opts: ["x=1, y=2", "x=2, y=1", "x=2, y=2", "编译错误"], a: 1, ex: "ref 传的是变量本身，方法内的交换直接同步到外部——这是 ref 和普通按值传参的本质区别。" }
  ],
  cs6: [
    { tag: "cs6_staticcount", q: "new Enemy() 执行 3 次后，Enemy.Count 的值是？", code: "class Enemy {\n    public static int Count;\n    public Enemy() { Count++; }\n}", opts: ["0", "1", "3", "每次调用都不同"], a: 2, ex: "static 成员属于类本身，所有实例共享同一份；构造执行 3 次就累加到 3。常用于统计存活敌人数量。" }
  ],
  cs7: [
    { tag: "cs7_base", q: "以下代码输出？", code: "class Hero {\n    public virtual string Title() => \"勇士\";\n}\nclass Knight : Hero {\n    public override string Title() => base.Title() + \"·骑士\";\n}\nDebug.Log(new Knight().Title());", opts: ["勇士", "勇士·骑士", "骑士·勇士", "编译错误"], a: 1, ex: "base.Title() 先拿父类结果再拼接自己的部分——重写时复用父类逻辑的标准姿势。" }
  ],
  cs8: [
    { q: "把对象声明为接口类型（IDamageable d = new Slime();）后，d 能调用什么？", opts: ["Slime 的所有成员", "只有 IDamageable 里声明的方法", "什么都不能调用", "只能调用 static 方法"], a: 1, ex: "接口类型变量只能看到契约内的成员；编译器按\"声明类型\"检查。想访问 Slime 特有成员需要 is/as 判断后强转。" }
  ],
  cs9: [
    { tag: "cs9_clamp", q: "执行 player.Hp = -5; 之后再读取 Hp，结果是？", code: "private int hp;\npublic int Hp {\n    get { return hp; }\n    set { hp = Math.Max(0, value); }\n}", opts: ["-5", "0", "5", "运行时报错"], a: 1, ex: "setter 里的 Math.Max(0, value) 把负数拦下存成 0——属性 setter 是加校验逻辑的天然位置。" }
  ],
  cs10: [
    { q: "通用工具 T Get<T>() where T : Component，在方法体内能直接访问 T 的哪些成员？", opts: ["任何成员，没有限制", "只有 object 的成员", "Component 的成员（如 gameObject、transform）", "只能 new T()"], a: 2, ex: "约束让编译器知道 T 一定是 Component，因此 transform、gameObject 等成员都能安全访问——约束越强，泛型代码能力越多。" }
  ],
  cs11: [
    { tag: "cs11_minus", q: "以下代码输出？", code: "Action a = () => Debug.Log(\"1\");\nAction b = () => Debug.Log(\"2\");\na += b;\na -= b;\na();", opts: ["1 然后 2", "2", "1", "什么都不输出"], a: 2, ex: "+= 订阅、-= 退订。b 刚被 += 又被 -=，调用时只剩第一个订阅，输出 1。" }
  ],
  cs12: [
    { tag: "cs12_orderdesc", q: "以下 LINQ 代码输出？", code: "int[] n = { 3, 1, 2 };\nDebug.Log(n.OrderByDescending(x => x).First());", opts: ["1", "2", "3", "6"], a: 2, ex: "OrderByDescending 从大到小排 {3,2,1}，First 取第一个即最大值 3——一行顶一个手写循环。" }
  ],

  u1: [
    { q: "选中物体后按哪个键，Scene 视图会立刻聚焦到它？", opts: ["F（Frame Selected）", "G", "空格", "Ctrl+F"], a: 0, ex: "F 键把视野居中到选中物体，层级深、场景大时是效率神器；双击物体名也有同样效果。" }
  ],
  u2: [
    { q: "想输出黄色警告日志（提示可能有问题但不致命），用？", opts: ["Debug.LogWarning", "Debug.LogError", "Debug.Log(\"黄色\")", "throw new Exception"], a: 0, ex: "LogWarning 黄色、LogError 红色，两者都只是标记级别不中断程序；普通信息用 Log。" }
  ],
  u3: [
    { q: "物体 A 和物体 B 各挂一个脚本，它们的 Awake 与 Start 执行顺序是？", opts: ["A 的全部函数跑完才轮到 B", "所有 Awake 都先于所有 Start 执行", "Start 先于 Awake", "完全随机无法总结"], a: 1, ex: "引擎先把所有物体的 Awake（含 OnEnable）跑完，再统一执行所有 Start——这正是\"Awake 里准备、Start 里使用\"的依据。" }
  ],
  u4: [
    { tag: "u4_magnitude", q: "以下代码输出？", code: "Debug.Log(new Vector3(3, 4, 0).magnitude);", opts: ["7", "5", "25", "3.5"], a: 1, ex: "magnitude 是向量长度 = √(3²+4²) = 5。距离判断、速度大小都靠它；只比方向不比长度用 normalized。" }
  ],
  u5: [
    { q: "GetComponentInParent<Rigidbody>() 的查找范围是？", opts: ["整个场景", "从自身沿父级向上（含自身）", "只在子物体里找", "只在 Play 模式生效"], a: 1, ex: "从自身沿父级向上找最近的一个；向下版本是 GetComponentInChildren。方向记反了就找不到。" }
  ],
  u6: [
    { q: "按住 D 键时，Input.GetAxisRaw(\"Horizontal\") 返回？", opts: ["1", "0.5（平滑渐变中）", "-1", "每帧递增"], a: 0, ex: "Raw 没有平滑：按下瞬间输出 1、松开瞬间归 0；要渐变手感用 GetAxis。" }
  ],
  u7: [
    { q: "2D 项目里让物体参与物理（受重力、可碰撞），正确的组件组合是？", opts: ["Rigidbody + OnTriggerEnter", "Rigidbody2D + Collider2D（回调用 OnTriggerEnter2D）", "直接给 3D 组件也能用于精灵", "只要 Collider2D 不需要刚体"], a: 1, ex: "2D 物理是独立一套：组件与回调都带 2D 后缀，和 3D 组件互不相通，混用没有物理效果。" }
  ],
  u8: [
    { q: "关于这段代码，说法正确的是？", code: "var b = Instantiate(bulletPrefab, pos, rot);\nb.GetComponent<Rigidbody>().AddForce(Vector3.forward * 10f);", opts: ["Instantiate 同步返回实例引用，同一帧就能取组件使用", "必须等一帧才能 GetComponent", "AddForce 应该写在 Update 里", "Instantiate 返回的是 Prefab 本体"], a: 0, ex: "克隆是同步完成的，返回的引用立刻可用；真正的物理移动由引擎在物理帧处理。" }
  ],
  u9: [
    { tag: "u9_nested", q: "启动 Outer 协程后，日志顺序是？", code: "IEnumerator Inner() {\n    Debug.Log(\"I\");\n    yield break;\n}\nIEnumerator Outer() {\n    Debug.Log(\"A\");\n    yield return Inner();\n    Debug.Log(\"B\");\n}", opts: ["A、B、I", "A、I、B", "I、A、B", "只输出 A"], a: 1, ex: "yield return 另一个协程会等它跑完再继续：A → I → B。协程嵌套是编排序列动画的基础。" }
  ],
  u10: [
    { q: "想让 TMP 文本里的 \"HP\" 显示为红色，文本内容应写成？", opts: ["<color=red>HP</color>", "[red]HP[/red]", "**HP**", "文本无法局部变色，只能整体 tmp.color"], a: 0, ex: "TMP 支持富文本标签：<color>、<b>、<i>、<size> 等；整体变色才用 tmp.color 属性。" }
  ],
  u11: [
    { q: "这行代码输出？", code: "Debug.Log(SceneManager.GetActiveScene().name);", opts: ["当前激活场景的名字", "场景文件的完整路径", "场景的 Build 索引数字", "游戏窗口标题"], a: 0, ex: "GetActiveScene() 返回 Scene 结构体，.name 是场景名——判断\"现在在哪个关卡\"最常用的写法。" }
  ],
  u12: [
    { q: "胜利面板弹出后玩家还能继续移动，最直接的修复是？", opts: ["加一个 bool 输入锁：胜利时置 true，移动代码开头判断直接 return", "删除玩家的移动脚本", "把玩家物体藏起来", "重写整个输入系统"], a: 0, ex: "一个 inputLock 布尔就是最简单的\"状态门禁\"；状态多了再升级成正式状态机（Playing/Won/Failed）。" }
  ],

  a1: [
    { tag: "a1_binsearch1000", q: "在 1~1000 的有序数组中二分查找任意一个数，最多比较几次？", opts: ["10", "100", "500", "约 1000"], a: 0, ex: "2¹⁰ = 1024 ≥ 1000，每比较一次范围减半，10 次足以覆盖。二分的力量就是把 1000 压成 10。" }
  ],
  a2: [
    { tag: "a2_palnum", q: "用双指针判断 \"12321\" 是否回文，结果是？", opts: ["True，首尾逐对相等", "False，中间的 3 没被比较", "True，因为全是数字", "无法用双指针判断数字"], a: 0, ex: "比较 (0,4) 和 (1,3) 两对都相等后 i、j 相遇结束；奇数长度中间那位不用比。" }
  ],
  a3: [
    { tag: "a3_banana", q: "以下代码输出？", code: "string s = \"banana\";\nvar count = new Dictionary<char, int>();\nforeach (char c in s) {\n    if (!count.ContainsKey(c)) count[c] = 0;\n    count[c]++;\n}\nDebug.Log(count['a']);", opts: ["1", "2", "3", "6"], a: 2, ex: "banana 里 a 出现 3 次、n 两次、b 一次——一次遍历的计数器就能统计所有频率。" }
  ],
  a4: [
    { tag: "a4_removeval", q: "用快慢指针原地移除 {1, 2, 2, 3} 中所有等于 2 的元素后，返回的新长度是？", opts: ["1", "2", "3", "4"], a: 1, ex: "快指针读、慢指针写：留下 1 和 3，新长度 2，数组前两位是 {1,3}，后面的内容无所谓。" }
  ],
  a5: [
    { tag: "a5_queue", q: "以下代码输出？", code: "var q = new Queue<int>();\nq.Enqueue(1); q.Enqueue(2); q.Enqueue(3);\nq.Dequeue();\nq.Dequeue();\nDebug.Log(q.Peek());", opts: ["1", "2", "3", "报错"], a: 2, ex: "先出队 1 再出队 2，队列里剩 3，Peek 看队头是 3。FIFO 的顺序从没变过。" }
  ],
  a6: [
    { q: "链表 1→2→3→2（尾节点接回第二个节点形成环），快慢指针从头出发会？", opts: ["快指针先走到尾结束，判定无环", "快慢指针一定在环内相遇", "慢指针永远追不上快指针", "必须用哈希表才能判环"], a: 1, ex: "只要有环，快指针每轮多走一步、相对每轮逼近慢指针一格，必然在环内重合——Floyd 判圈的核心。" }
  ],
  a7: [
    { tag: "a7_memo", q: "用记忆化优化的斐波那契（fib(1)=1，fib(2)=1），fib(6) 的值是？", opts: ["6", "8", "13", "21"], a: 1, ex: "序列 1,1,2,3,5,8。记忆化后每个 fib(k) 只计算一次，复杂度从 O(2ⁿ) 降到 O(n)。" }
  ],
  a8: [
    { tag: "a8_bubble", q: "对 {5, 1, 4, 2} 做一轮冒泡（从左到右相邻比较、逆序就交换），结束时数组是？", opts: ["{1, 2, 4, 5}", "{1, 4, 2, 5}", "{1, 2, 5, 4}", "{4, 1, 2, 5}"], a: 1, ex: "(5,1)换→{1,5,4,2}；(5,4)换→{1,4,5,2}；(5,2)换→{1,4,2,5}。一轮只保证最大值 5 归位到末尾。" }
  ],
  a9: [
    { tag: "a9_3step", q: "爬楼梯变体：每次可以跨 1、2 或 3 阶，上到第 4 阶共有几种走法？", opts: ["4", "6", "7", "13"], a: 2, ex: "f(n)=f(n-1)+f(n-2)+f(n-3)：f(1)=1、f(2)=2、f(3)=4，f(4)=4+2+1=7。三递推和是 DP 的常见变体。" }
  ],
  a10: [
    { tag: "a10_prefix", q: "数组 {1, 2, 3, 4} 的前缀和数组 P（P[i] = a[0..i] 之和），求区间 a[1..3]（即 2+3+4）的算式是？", opts: ["P[3] - P[0] = 10 - 1 = 9", "P[3] = 10", "P[2] + P[1] = 9", "P[3] - P[1] = 7"], a: 0, ex: "前缀和把区间和变成一次减法：sum(1..3) = P[3] - P[0] = 9。O(n) 预处理换 O(1) 区间查询。" }
  ]
};
