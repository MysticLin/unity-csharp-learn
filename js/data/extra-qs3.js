// 题库扩充包 3 —— 40 题，可执行题带 tag 由 tools/verify-qs.mjs 自动验证
window.EXTRA_QS3 = {
  cs1: [
    { tag: "b3_cs1_convert", q: "以下代码输出？", code: "int n = Convert.ToInt32(\"42\");\nDebug.Log(n + 8);", opts: ["428", "50", "42", "报错"], a: 1, ex: "Convert.ToInt32(\"42\") 把字符串解析成数字 42，n + 8 是整数加法得 50。字符串 + 数字才会拼接。" }
  ],
  cs2: [
    { tag: "b3_cs2_sub", q: "以下代码输出？", code: "Debug.Log(\"hello world\".Substring(6));", opts: ["world", "w", "hello", "orld"], a: 0, ex: "Substring(6) 从下标 6（w）截取到末尾，得到 world。带两个参数 Substring(开始, 长度) 可控制截取长度。" }
  ],
  cs3: [
    { tag: "b3_cs3_dowhile", q: "以下代码打印几行？", code: "int n = 5;\ndo {\n    Debug.Log(n);\n    n--;\n} while (n > 3);", opts: ["1 行", "2 行（5 和 4）", "3 行", "0 行"], a: 1, ex: "do-while 先执行后判断：打印 5（n=4，条件真）、打印 4（n=3，条件假退出）。它保证循环体至少跑一次。" }
  ],
  cs4: [
    { tag: "b3_cs4_reverse", q: "以下代码输出？", code: "var list = new List<int> { 1, 2, 3 };\nlist.Reverse();\nDebug.Log(list[1]);", opts: ["1", "2", "3", "报错"], a: 1, ex: "Reverse() 是原地反转：{3,2,1}，下标 1 是 2。注意与 LINQ 的 Reverse() 区分——那个返回新序列不改原表。" },
    { tag: "b3_cs4_removeall", q: "以下代码输出？", code: "var list = new List<int> { 1, 2, 3, 4 };\nlist.RemoveAll(x => x % 2 == 0);\nDebug.Log(list.Count);", opts: ["1", "2", "3", "4"], a: 1, ex: "RemoveAll 删除所有满足条件的元素：偶数 2 和 4 被删，剩 {1,3}，Count=2。返回值是被删的个数。" }
  ],
  cs5: [
    { q: "方法已有默认参数 void Heal(int amount = 10)，想只改 amount 又不想按位置传参，可以写？", opts: ["Heal(amount: 30);", "Heal{30};", "Heal(30) 不可能更明确", "只能 Heal(30);"], a: 0, ex: "命名参数 amount: 30 按\"参数名\"传值，参数多、多个默认值时最清晰，可读性大增。" }
  ],
  cs6: [
    { tag: "b3_cs6_valcopy", q: "以下代码输出？", code: "void Double(int x) {\n    x *= 2;\n}\nint a = 5;\nDouble(a);\nDebug.Log(a);", opts: ["10", "5", "0", "编译错误"], a: 1, ex: "int 是值类型，Double 拿到的是副本，翻倍的只是副本。想真改外面用 ref 或改成返回值 a = Double(a)。" }
  ],
  cs7: [
    { q: "以下代码的输出是？", code: "var monsters = new List<Monster> { new Goblin(), new Dragon() };\nforeach (var m in monsters)\n    m.Roar();\n// Goblin.Roar 输出 \"叽叽\"，Dragon.Roar 输出 \"轰隆\"", opts: ["叽叽 轰隆", "轰隆 叽叽", "输出两次父类的吼声", "编译错误：List 装不下子类"], a: 0, ex: "多态：List<Monster> 里装子类对象，调用的是各自重写后的实现——新增怪物类型这循环一行不用改。" }
  ],
  cs8: [
    { q: "以下代码中 if 条件的值是？", code: "object o = new Slime();\nif (o is IDamageable) {\n    Debug.Log(\"能打\");\n}", opts: ["True，Slime 实现了该接口", "False，接口不是类", "编译错误", "运行时才决定"], a: 0, ex: "is 检查对象是否兼容目标类型；Slime 实现了 IDamageable 就为 True。搭配 as 或模式匹配 (o is IDamageable d) 使用最顺手。" }
  ],
  cs9: [
    { tag: "b3_cs9_isdead", q: "hp = 0 时，读取 public bool IsDead => hp <= 0; 的值是？", opts: ["true", "false", "null", "编译错误"], a: 0, ex: "=> 表达式体属性每次访问现算，永远与 hp 同步——不用手动维护一个 isDead 布尔，杜绝忘记更新的 bug。" }
  ],
  cs10: [
    { q: "把 int 放进 ArrayList（object 集合）时会发生什么？", opts: ["装箱：值类型包装成 object，取出来还要拆箱", "什么都不会发生", "自动变成引用类型永久存储", "编译错误"], a: 0, ex: "装箱有内存分配和复制开销，高频操作会产生大量 GC。泛型 List<int> 无装箱，这也是泛型更快的原因。" }
  ],
  cs11: [
    { tag: "b3_cs11_func", q: "以下代码输出？", code: "Func<int, int> square = x => x * x;\nDebug.Log(square(5));", opts: ["5", "10", "25", "编译错误"], a: 2, ex: "Func<int, int> 表示\"收一个 int 返回一个 int\"的委托，square(5) 就是 25。" }
  ],
  cs12: [
    { tag: "b3_cs12_any", q: "以下 LINQ 代码输出？", code: "int[] n = { 1, 3, 5 };\nDebug.Log(n.Any(x => x > 4));", opts: ["True", "False", "5", "3"], a: 0, ex: "Any 判断\"是否存在满足条件的元素\"：5 > 4 存在，返回 True。它找到一个就短路返回，比 Count() > 0 高效。" }
  ],

  u1: [
    { q: "Hierarchy 物体太多时，快速定位某个物体的方法是？", opts: ["在 Hierarchy 搜索框按名称/类型过滤", "把所有物体删了重建", "只能在 Game 视图里一个个点", "重启 Unity"], a: 0, ex: "搜索框支持名字模糊匹配和类型过滤（t:script 找脚本组件），配合规范命名效率极高。" }
  ],
  u2: [
    { q: "运行日志太多把有用信息淹没了，可以？", opts: ["在 Console 按日志类型过滤/搜索关键字", "不能过滤只能翻", "删掉所有 Debug.Log", "关闭 Console"], a: 0, ex: "Console 支持按 Log/Warning/Error 类型开关过滤，还有搜索框；日志加统一前缀（如 [Combat]）更好查。" }
  ],
  u3: [
    { q: "事件订阅写 OnEnable、退订写 OnDisable 的最大好处是？", opts: ["激活/禁用自动成对执行，不会漏退订", "代码更短", "运行更快", "可以订阅更多事件"], a: 0, ex: "两者由激活状态保证成对触发，物体反复启用禁用也不泄漏订阅；写在 Start/OnDestroy 就没这保障。" }
  ],
  u4: [
    { q: "计算两物体距离，以下哪组写法等价？", opts: ["Vector3.Distance(a, b) 与 (a - b).magnitude", "Distance(a,b) 与 (a + b).magnitude", "Distance(a,b) 与 a.sqrMagnitude", "完全不等价"], a: 0, ex: "Distance 内部就是差的 magnitude。还有个优化冷知识：只比大小不比数值时用 sqrMagnitude 免开方更省。" }
  ],
  u5: [
    { q: "以下代码的执行结果是？", code: "if (TryGetComponent<Rigidbody>(out var rb))\n    rb.AddForce(Vector3.up);\nelse\n    Debug.Log(\"没有刚体\");", opts: ["有刚体就施力，没有就打日志，不会空引用崩溃", "必定报错", "和 GetComponent 完全一样会抛异常", "TryGetComponent 不存在"], a: 0, ex: "TryGetComponent 用 out 带回组件并返回是否成功，把\"判空 + 使用\"合并成一行，是较新 Unity 的推荐写法。" }
  ],
  u6: [
    { q: "Input.GetMouseButton(0) 与 GetMouseButtonDown(0) 的核心区别是？", opts: ["前者按住期间每帧都为 true，后者只有按下那一帧", "前者是右键后者是左键", "没有区别", "前者只能用于 UI"], a: 0, ex: "不带 Down/Up 的版本是\"按住状态\"——自动连发武器就是按住它 + 射速计时器实现的。" },
    { q: "判断\"当前有手指按在屏幕上\"，用？", opts: ["Input.touchCount > 0", "Input.touches.Length == 0", "Input.GetKey(Touch)", "Input.mousePresent"], a: 0, ex: "touchCount 是当前触点数量：大于 0 说明有手指按着；配合 GetTouch(i) 拿每个手指的详细数据。" }
  ],
  u7: [
    { q: "想做一个\"弹跳蘑菇\"让角色踩上去高高弹起，最省代码的做法是？", opts: ["给蘑菇加高 bounciness 的物理材质", "把角色 gravity 设为 0", "用协程手动往上挪", "加很多 AddForce"], a: 0, ex: "物理材质的 bounciness 组合决定反弹强度，零代码实现弹跳；角色脚下碰撞体进入即可触发。" }
  ],
  u8: [
    { q: "Destroy(this) 和 Destroy(gameObject) 的区别是？", opts: ["this 只销毁当前脚本组件，gameObject 销毁整个物体", "完全一样", "this 销毁整个物体", "gameObject 只销毁脚本"], a: 0, ex: "this 指脚本组件实例。想\"用完自毁逻辑但保留物体\"用 Destroy(this)，清场用 Destroy(gameObject)。" }
  ],
  u9: [
    { q: "在物体 X 上调用 StopAllCoroutines()，影响范围是？", opts: ["只停止 X 上运行的全部协程", "停止全场景所有协程", "停止整个游戏的 Update", "只停止第一个启动的协程"], a: 0, ex: "范围是\"调用者这个 MonoBehaviour 所在物体\"。要精准停某一个，保存 StartCoroutine 返回的引用再 StopCoroutine。" }
  ],
  u10: [
    { q: "血条、伤害飘字频繁变化导致整帧 UI 卡顿，最有效的做法是？", opts: ["把它们拆到独立的子 Canvas", "把 Canvas 删了", "全部用世界坐标文字", "降低帧率"], a: 0, ex: "一个 Canvas 下任何 UI 变化都会触发整块重建；动静分离（动态元素独立子 Canvas）是官方推荐的优化。" }
  ],
  u11: [
    { q: "LoadSceneMode.Additive 的效果是？", opts: ["新场景叠加到当前场景之上，旧场景保留", "替换当前场景", "删除旧场景再加载", "只加载资源不加载物体"], a: 0, ex: "叠加加载是模块化场景架构的基础：大厅常驻，关卡作为\"模块\"动态加载卸载。" }
  ],
  u12: [
    { q: "结算面板要显示用时、拾取数、评级，这些数据最合理的组织方式是？", opts: ["用一个结构体/类打包后传给结算面板的 Show(data)", "每个数据一个全局变量", "写在场景名里", "让面板自己遍历全场景找"], a: 0, ex: "数据打包成 ResultData 一次传递，面板与游戏逻辑解耦，下个游戏直接复用这套结算组件。" }
  ],

  a1: [
    { q: "O(2ⁿ) 和 O(n²) 同时随 n 增大，哪个增长得更快？", opts: ["O(2ⁿ) 指数级远快于平方级", "O(n²) 更快", "两者一样", "看 n 的奇偶"], a: 0, ex: "n=30 时 n²=900，而 2³⁰≈10 亿。朴素递归斐波那契慢就慢在指数级。" },
    { q: "以下复杂度从小到大排列正确的是？", opts: ["O(1) < O(log n) < O(n) < O(n log n)", "O(log n) < O(1) < O(n log n) < O(n)", "O(n) < O(log n) < O(1) < O(n log n)", "O(n log n) < O(n) < O(log n) < O(1)"], a: 0, ex: "常数 < 对数 < 线性 < 线性对数。记住这条尺子，看到代码就能估规模上限。" }
  ],
  a2: [
    { tag: "b3_a2_swapcount", q: "用双指针原地反转 \"abcde\"（5 个字符），需要交换几次？", opts: ["2 次", "3 次", "4 次", "5 次"], a: 0, ex: "n/2 取整 = 2 次：(a,e) 和 (b,d)，中间的 c 不用动。反转的时间复杂度 O(n)。" }
  ],
  a3: [
    { q: "找出数组中\"出现次数最多\"的元素，高效做法是？", opts: ["Dictionary 计数后遍历找最大值", "双重循环两两比较", "随机抽一个", "排序后取中间"], a: 0, ex: "一遍计数 O(n) + 一遍找最大 O(n) = O(n)。排序虽然也行但要多花一个 O(n log n)。" },
    { tag: "b3_a3b_intersect", q: "以下代码输出？", code: "var A = new HashSet<int> { 1, 2, 3 };\nvar B = new HashSet<int> { 2, 3, 4 };\nA.IntersectWith(B);\nDebug.Log(A.Count);", opts: ["1", "2", "3", "4"], a: 1, ex: "IntersectWith 保留交集 {2,3}，Count=2。并集 UnionWith、差集 ExceptWith 同族。" }
  ],
  a4: [
    { q: "用双指针判断长度为 5 的奇数回文串（如 \"abcba\"），最多需要比较几对字符？", opts: ["2 对", "3 对", "4 对", "5 对"], a: 0, ex: "(0,4) 和 (1,3) 两对，中间位不需要和自己比。n 个字符比较 ⌊n/2⌋ 对。" }
  ],
  a5: [
    { tag: "b3_a5_depth", q: "括号串 \"(()\" 的最大嵌套深度是？", code: "// 遍历：'(' 深度+1，')' 深度-1，记录过程中最大值", opts: ["1", "2", "3", "0"], a: 1, ex: "扫描时深度依次 1、2、1，最大 2。这种\"当前状态+记录极值\"的扫描是最简单的计数技巧。" },
    { q: "广度优先搜索（BFS）逐层探索节点，应该借助哪种数据结构？", opts: ["队列（先进先出）", "栈（后进先出）", "哈希表", "二叉树"], a: 0, ex: "BFS 用队列保证\"先发现的先探索\"；DFS 才用栈/递归。记住：队广栈深。" }
  ],
  a6: [
    { tag: "b3_a6_midrev", q: "链表 1→2→3 反转后变成 3→2→1，此时\"中间节点\"的值是？", opts: ["2", "3", "1", "不存在"], a: 0, ex: "反转不改变元素集合，只是方向调头，中间的还是 2。类似地，反转后找尾=原来的头。" }
  ],
  a7: [
    { tag: "b3_a7_arrsum", q: "以下递归代码 Sum({2,3,4}, 3) 的返回值是？", code: "int Sum(int[] a, int n) {\n    if (n == 0) return 0;\n    return a[n - 1] + Sum(a, n - 1);\n}", opts: ["7", "9", "24", "0"], a: 1, ex: "a[2]+a[1]+a[0]+0 = 4+3+2+0 = 9。递归求和是理解\"把问题缩小一圈\"的最小例子。" }
  ],
  a8: [
    { tag: "b3_a8_selround", q: "对 {4, 2, 7, 1} 做一轮选择排序（选出最小值放到最前），结果是？", opts: ["{1, 2, 7, 4}", "{1, 4, 2, 7}", "{2, 4, 7, 1}", "{1, 2, 4, 7}"], a: 0, ex: "第一轮找全局最小 1，与首位交换 → {1,2,7,4}。选择排序每轮固定一个位置，共 n-1 轮。" },
    { tag: "b3_a8b_lower", q: "在有序数组 {1, 3, 5} 中查找 4 的\"插入位置\"（第一个 ≥ 4 的下标），二分结果是？", opts: ["1", "2", "3", "0"], a: 1, ex: "4 比下标 1 的 3 大、比下标 2 的 5 小，应插在下标 2。这就是 C# 里 List.BinarySearch 返回负数时按 ~返回值 插入的原理。" }
  ],
  a9: [
    { tag: "b3_a9_fib7", q: "斐波那契数列（fib(1)=fib(2)=1）的第 7 项是？", opts: ["8", "13", "21", "11"], a: 1, ex: "1,1,2,3,5,8,13。爬楼梯（每次 1/2 阶）的答案序列就是它平移一位——两个模型一个本质。" }
  ],
  a10: [
    { tag: "b3_a10_twosumhash", q: "用哈希表一遍扫描解两数之和：{2, 7, 11}，target=9，返回的下标是？", opts: ["0 和 1", "1 和 2", "0 和 2", "不存在"], a: 0, ex: "扫到 2 记下，扫到 7 时发现 9-7=2 已在表里 → 返回 {0,1}。哈希把\"找搭档\"从 O(n) 降到 O(1)。" }
  ]
};
