// 题库扩充包 —— 运行时按 lesson id 合并到各课程
window.EXTRA_QS = {
  // ---------- C# ----------
  cs1: [
    { q: "float pi = 3.14;（不带 f 后缀）会发生什么？", opts: ["正常编译", "编译错误：double 不能隐式转 float", "运行时报错", "pi 自动变成 double"], a: 1, ex: "小数字面量默认 double，double→float 不能隐式转换，必须写 3.14f。" }
  ],
  cs2: [
    { q: "$\"总分：{a + b}\"（a=3, b=4）的结果是？", opts: ["总分：7", "总分：a + b", "总分：34", "编译错误"], a: 0, ex: "插值的花括号里可以放任意表达式，先求值再嵌入字符串。" }
  ],
  cs3: [
    { q: "以下代码打印几个 * ？", code: "for (int i = 0; i < 10; i++) {\n    if (i % 2 == 0) continue;\n    if (i == 8) break;\n    Debug.Log(\"*\");\n}", opts: ["3 个", "4 个", "5 个", "8 个"], a: 2, ex: "i==8 的 break 是死代码：8 是偶数，会先被 continue 跳过，永远轮不到 break。打印的是奇数 1,3,5,7,9，共 5 个。顺序很重要——break 写在 continue 后面就失效了。" }
  ],
  cs4: [
    { q: "以下代码输出？（提示：Insert(下标, 值) 是插入挤位，不是替换）", code: "var list = new List<int> { 10, 20, 30 };\nlist.Insert(1, 15);\nlist.RemoveAt(0);\nDebug.Log(list[0] + \",\" + list.Count);", opts: ["10,3", "15,3", "15,2", "10,2"], a: 1, ex: "Insert 是插入不是替换：{10,20,30} → {10,15,20,30}（4 个）；RemoveAt(0) 删下标 0 的 10 → {15,20,30}，list[0]=15、Count=3。想替换某位置要用 list[1] = 15，那样才会是 15,2。" }
  ],
  cs5: [
    { q: "以下方法（hp 已是成员变量）哪些调用方式正确？", code: "void Heal(int amount = 10) {\n    hp += amount;\n}", opts: ["Heal();", "Heal(30);", "两种都可以", "都不行"], a: 2, ex: "可选参数有默认值：不传用 10，传了用传入值。" }
  ],
  cs6: [
    { q: "以下代码输出？", code: "class Player { public string Name; }\nvar p1 = new Player();\np1.Name = \"A\";\nvar p2 = p1;\np2.Name = \"B\";\nDebug.Log(p1.Name);", opts: ["A", "B", "null", "编译错误"], a: 1, ex: "类是引用类型，p2 = p1 复制的是引用，两者指向同一对象。" }
  ],
  cs7: [
    { q: "以下代码输出什么？", code: "class A { public virtual string Hi() => \"A\"; }\nclass B : A { public override string Hi() => \"B\"; }\nA obj = new B();\nDebug.Log(obj.Hi());", opts: ["A", "B", "编译错误", "运行时报错"], a: 1, ex: "多态：父类引用指向子类对象，调用的是子类 override 的实现。" }
  ],
  cs8: [
    { q: "以下哪种写法能通过编译（实现接口 IMove）？", code: "interface IMove { void Walk(); }", opts: ["class Dog : IMove { }（空类）", "class Dog : IMove { public void Walk() { } }", "class Dog : IMove { private void Walk() { } }", "不用实现 Walk 也能编译"], a: 1, ex: "实现类必须用 public 实现接口的全部成员，不写修饰符默认是 private。" }
  ],
  cs9: [
    { q: "关于 public int Score { get; set; } 的说法正确的是？", opts: ["Score 是字段", "Score 是属性，编译器自动生成隐藏字段", "Score 是方法", "会报错，必须初始化"], a: 1, ex: "自动属性背后是一个私有隐藏字段 + 两个访问器方法。" }
  ],
  cs10: [
    { q: "对泛型方法 T Pick<T>(T a, T b)，哪些调用方式正确？", opts: ["Pick<int>(2, 3)", "Pick(2, 3)（编译器自动推断）", "两者都可以", "都不行"], a: 2, ex: "类型参数既可以显式指定，也可以从实参自动推断。" }
  ],
  cs11: [
    { q: "以下代码输出？", code: "Action say = () => Debug.Log(\"1\");\nsay += () => Debug.Log(\"2\");\nsay();", opts: ["1", "2", "1 然后 2", "2 然后 1"], a: 2, ex: "多播委托按订阅顺序依次调用全部方法。" }
  ],
  cs12: [
    { q: "以下 LINQ 代码输出？", code: "int[] n = { 1, 2, 3, 4 };\nDebug.Log(n.Where(x => x % 2 == 0).Sum());", opts: ["3", "4", "6", "10"], a: 2, ex: "Where 筛出偶数 2 和 4，Sum 求和 = 6。" }
  ],

  // ---------- Unity ----------
  u1: [
    { q: "关于复制物体的快捷操作，正确的是？", opts: ["Ctrl+D 原位复制，最常用", "Ctrl+V 粘贴会带位置偏移", "两者都可以复制物体", "Unity 无法复制物体"], a: 2, ex: "Ctrl+D 原位复制是日常操作；Ctrl+V 也能贴但位置会偏移一段。" }
  ],
  u2: [
    { q: "Play 模式下修改了 Inspector 里的数值，退出 Play 后会？", opts: ["保留修改", "恢复原值（Play 中的改动不保存）", "自动保存进场景", "弹出保存窗口"], a: 1, ex: "Play 中的改动只在本次运行有效，这是 Unity 最经典的坑之一。" }
  ],
  u3: [
    { q: "物体未激活时（SetActive(false)），挂在上面的脚本？", opts: ["Update 照常执行", "完全不执行，激活时才走 Awake→OnEnable→Start", "只执行 Update 不执行 Start", "直接报错"], a: 1, ex: "未激活物体的所有生命周期都暂停，激活那一帧才补走初始化流程。" }
  ],
  u4: [
    { q: "以下代码的效果是？", code: "transform.localPosition += Vector3.up * Time.deltaTime;", opts: ["沿世界上方移动", "沿父物体坐标系的上方移动", "向下滑动", "编译错误"], a: 1, ex: "localPosition 相对父物体，方向和距离都会被父级变换放大或旋转。" }
  ],
  u5: [
    { q: "以下代码的隐患是？", code: "void Update() {\n    if (GetComponent<Rigidbody>().velocity.y > 5)\n        Debug.Log(\"快\");\n}", opts: ["完全没有隐患", "每帧 GetComponent 有开销，应在 Awake 缓存成字段", "必定空引用", "Rigidbody 没有 velocity 属性"], a: 1, ex: "组件查找有成本，高频路径要缓存：rb = GetComponent<Rigidbody>();" }
  ],
  u6: [
    { q: "以下代码实现的是哪种操作？", code: "if (Input.GetMouseButtonDown(0))\n    Fire();", opts: ["按住左键连续开火", "左键单击瞬间开一枪", "松开左键时开枪", "右键开枪"], a: 1, ex: "GetMouseButtonDown 只在按下那一帧为真；连发要在 Update 里判断按住状态自己控制射速。" }
  ],
  u7: [
    { q: "以下代码的触发时机是？", code: "void OnTriggerEnter(Collider other) {\n    if (other.CompareTag(\"Enemy\"))\n        score += 10;\n}", opts: ["碰到敌方碰撞体的\"进入瞬间\"", "每个物理帧持续触发", "敌人离开范围时触发", "撞墙时触发"], a: 0, ex: "Enter 进入、Stay 持续、Exit 离开——三种触发回调按时机选用。" }
  ],
  u8: [
    { q: "以下代码的作用是？", code: "Destroy(gameObject, 5f);", opts: ["立即销毁物体", "5 秒后销毁该物体", "销毁后 5 秒重生", "只销毁第 5 个子物体"], a: 1, ex: "Destroy 的第二个参数是延迟秒数，子弹和特效的自动清理常用它。" }
  ],
  u9: [
    { q: "以下协程的打印顺序是？", code: "IEnumerator Run() {\n    Debug.Log(\"A\");\n    yield return null;\n    Debug.Log(\"B\");\n}", opts: ["A、B 同一帧连续打印", "打印 A 后，下一帧才打印 B", "只打印 A", "先 B 后 A"], a: 1, ex: "yield return null 把方法挂起到下一帧再继续执行。" }
  ],
  u10: [
    { q: "让 TMP 文本显示分数的正确写法（tmp 是 TMP_Text）是？", opts: ["tmp.text = $\"分数：{score}\";", "tmp.value = score;", "tmp = score;", "TMP 没有设置文本的方法"], a: 0, ex: "TMP 与旧 Text 一样通过 .text 属性设置内容。" }
  ],
  u11: [
    { q: "以下代码的效果是？", code: "IEnumerator Load() {\n    var op = SceneManager.LoadSceneAsync(\"Level2\");\n    while (!op.isDone) {\n        Debug.Log(op.progress);\n        yield return null;\n    }\n}", opts: ["每帧打印一次加载进度直到完成", "不能在协程里加载场景", "progress 直接打印 1", "编译错误"], a: 0, ex: "异步加载 + 协程轮询进度，就是加载界面进度条的标准实现。" }
  ],
  u12: [
    { q: "哪种写法让相机跟随更平滑？", code: "// followTarget 为玩家 Transform", opts: ["transform.position = followTarget.position;", "transform.position = Vector3.Lerp(transform.position, followTarget.position, 0.1f);", "transform.Translate(followTarget.position);", "不需要写代码"], a: 1, ex: "Lerp 每帧只向目标移动一部分距离，产生柔滑的缓动跟随。" }
  ],

  // ---------- 算法 ----------
  a1: [
    { q: "向长度 n 的数组尾部追加一个元素（容量足够），时间复杂度是？", opts: ["O(1)", "O(log n)", "O(n)", "O(n²)"], a: 0, ex: "尾部写入一步到位；只有触发扩容复制时才退化成 O(n)。" }
  ],
  a2: [
    { q: "以下代码输出？", code: "string s = \"abcba\";\nint i = 0, j = s.Length - 1;\nbool ok = true;\nwhile (i < j) {\n    if (s[i] != s[j]) { ok = false; break; }\n    i++; j--;\n}\nDebug.Log(ok);", opts: ["True", "False", "报错", "死循环"], a: 0, ex: "abcba 是回文串，双指针每一对字符都相等。" }
  ],
  a3: [
    { q: "以下代码输出？", code: "int[] a = { 1, 2, 3, 1 };\nvar seen = new HashSet<int>();\nint dup = -1;\nforeach (var x in a) {\n    if (!seen.Add(x)) { dup = x; break; }\n}\nDebug.Log(dup);", opts: ["1", "2", "3", "-1"], a: 0, ex: "HashSet.Add 返回 false 说明元素已存在，第一个重复的是 1。" }
  ],
  a4: [
    { q: "有序数组 {1,3,5,7,9} 用首尾双指针找两数之和等于 4，第一次比较 1+9=10>4，下一步应该？", opts: ["左指针右移", "右指针左移", "两个指针都内移", "直接结束"], a: 1, ex: "和偏大说明右边的数太大，j-- 换个小的。" }
  ],
  a5: [
    { q: "以下代码输出？", code: "var st = new Stack<string>();\nst.Push(\"a\"); st.Push(\"b\");\nst.Pop();\nst.Push(\"c\");\nDebug.Log(st.Peek());", opts: ["a", "b", "c", "bc"], a: 2, ex: "弹出 b 后压入 c，栈顶是 c；Peek 只看不弹。" }
  ],
  a6: [
    { q: "单链表 1→2→3→4 删除头节点后，新的头节点是？", opts: ["2", "1", "4", "3"], a: 0, ex: "头指针后移即可，单链表删头是 O(1)。" }
  ],
  a7: [
    { q: "以下代码输出？", code: "int F(int n) {\n    if (n == 0) return 0;\n    return n + F(n - 1);\n}\nDebug.Log(F(4));", opts: ["4", "6", "10", "24"], a: 2, ex: "4+3+2+1+0=10，递归求 1~n 的和。" }
  ],
  a8: [
    { q: "对 {5,2,8,1} 排序后二分查找 8，依次比较到的元素是？", opts: ["2、8", "2、5、8", "5、8", "8 一次命中"], a: 1, ex: "排序后 {1,2,5,8}：mid=2 → 5 → 8，共比较 3 次。" }
  ],
  a9: [
    { q: "爬楼梯（每次跨 1 或 2 阶），上到第 6 阶共有几种走法？", opts: ["8", "13", "21", "6"], a: 1, ex: "f(6)=f(5)+f(4)=8+5=13，斐波那契数列。" }
  ],
  a10: [
    { q: "以下哪类问题最适合用滑动窗口解决？", opts: ["最长无重复字符子串", "数组求和", "判断质数", "字符串反转"], a: 0, ex: "右指针扩张、左指针收缩，动态维护\"窗口内无重复\"的约束。" }
  ]
};
