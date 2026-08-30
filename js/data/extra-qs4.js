// 题库扩充包 4 —— 48 题，可执行题带 tag 由 tools/verify-qs.mjs 自动验证
window.EXTRA_QS4 = {
  cs1: [
    { q: "以下代码输出几行内容？", code: "Debug.Log(\"行1\\n行2\");", opts: ["1 行（原样显示 \\n）", "2 行（\\n 是换行符）", "0 行", "报错"], a: 1, ex: "\\n 是换行转义符；常见还有 \\t 制表符、\\\\ 反斜杠本身、\\\" 引号。" },
    { q: "bool 类型的变量可以取哪些值？", opts: ["true 和 false", "0 和 1 也能赋值", "true、false、null", "任意整数"], a: 0, ex: "bool 只有 true/false 两个值；把 1 赋给 bool 会编译错误——C# 不像 C 语言用整数当真假。" }
  ],
  cs2: [
    { q: "以下代码输出？", code: "string s = \"\";\nDebug.Log(string.IsNullOrEmpty(s));", opts: ["True", "False", "null", "报错"], a: 0, ex: "IsNullOrEmpty 对 null 和 \"\" 都返回 True——判空的标准写法，比 s == \"\" 更安全。" },
    { q: "以下代码输出？", code: "Debug.Log(\"  hi  \".Trim());", opts: ["hi", "  hi  ", "hi  ", "  hi"], a: 0, ex: "Trim() 去掉首尾空白（中间的不动）。玩家输入昵称、读配置文件前先 Trim 是好习惯。" }
  ],
  cs3: [
    { tag: "b4_cs3_nested", q: "以下代码打印几个 * ？", code: "for (int r = 0; r < 2; r++) {\n    for (int c = 0; c < 3; c++) {\n        Debug.Log(\"*\");\n    }\n}", opts: ["5 个", "6 个", "2 个", "3 个"], a: 1, ex: "外层 2 轮 × 内层 3 次 = 6 次。嵌套循环总量是各层相乘——游戏网格遍历就是这么算成本。" },
    { q: "以下循环体执行几次？", code: "for (int i = 0; i < 5; i += 2) {\n    Debug.Log(i);\n}", opts: ["5 次", "3 次（0、2、4）", "2 次", "4 次"], a: 1, ex: "i 取 0、2、4 共 3 次，i=6 时越界退出。步进不一定非得 ++。" }
  ],
  cs4: [
    { tag: "cs4_listtrace", q: "以下代码输出？（提示：Insert(下标, 值) 是插入挤位，不是替换）", code: "var list = new List<int> { 10, 20, 30 };\nlist.Insert(1, 15);\nlist.RemoveAt(0);\nDebug.Log(list[0] + \",\" + list.Count);", opts: ["10,3", "15,3", "15,2", "10,2"], a: 1, ex: "Insert 是插入不是替换：{10,20,30} → {10,15,20,30}（4 个）；RemoveAt(0) 删下标 0 的 10 → {15,20,30}，list[0]=15、Count=3。想替换某位置要用 list[1] = 15，那样才会是 15,2。" },
    { tag: "b4_cs4_missing", q: "以下代码输出？", code: "var list = new List<int> { 5, 10, 15 };\nDebug.Log(list.IndexOf(99));", opts: ["99", "-1", "0", "报错"], a: 1, ex: "IndexOf 找不到返回 -1（不是 0，0 是合法下标）。返回值先用 > -1 判断再使用。" }
  ],
  cs5: [
    { tag: "b4_cs5_params", q: "以下代码输出？", code: "int Sum(params int[] nums) {\n    int t = 0;\n    foreach (int n in nums) t += n;\n    return t;\n}\nDebug.Log(Sum(1, 2, 3));", opts: ["3", "6", "123", "编译错误"], a: 1, ex: "params 让调用方传任意个参数，方法内收成数组。1+2+3=6。" }
  ],
  cs6: [
    { q: "以下代码输出？", code: "class Box { public int v; }\nvar b1 = new Box { v = 1 };\nvar b2 = new Box { v = 1 };\nDebug.Log(b1 == b2);", opts: ["True，值相等", "False，== 比较的是引用", "报错", "随机"], a: 1, ex: "两个独立 new 出来的对象地址不同，== 为 False。想按内容比较要重写 Equals 或手动比字段。" }
  ],
  cs7: [
    { q: "被 sealed 修饰的类？", opts: ["不能被继承", "不能被实例化", "不能有方法", "必须静态"], a: 0, ex: "sealed 封死继承链；string 就是 sealed 的。防止别人乱继承破坏设计。" }
  ],
  cs8: [
    { tag: "b4_cs8_cast", q: "以下代码输出？", code: "double d = 3.9;\nDebug.Log((int)d);", opts: ["4", "3", "3.9", "四舍五入为 4"], a: 1, ex: "显式转 int 是直接截断小数（不是四舍五入）。要四舍五入用 Math.Round 再转。" }
  ],
  cs9: [
    { tag: "b4_cs9_ternary", q: "以下代码输出？", code: "int a = 7, b = 4;\nDebug.Log(a > b ? a : b);", opts: ["7", "4", "true", "编译错误"], a: 0, ex: "三元运算符 条件 ? 真值 : 假值，一行取最大。" }
  ],
  cs10: [
    { q: "List<T> 的 Count 和 Capacity 的区别是？", opts: ["Count 是实际元素数，Capacity 是内部数组当前容量", "完全一样", "Capacity 是元素上限不能再大", "Count 是容量"], a: 0, ex: "Count ≤ Capacity；Add 触碰容量上限时自动扩容翻倍——这就是之前说的\"扩容复制\"来源。" }
  ],
  cs11: [
    { tag: "b4_cs11_logger", q: "以下代码输出？", code: "Action<string> log = s => Debug.Log(\"[Game]\" + s);\nlog(\"开始\");", opts: ["开始", "[Game]开始", "[Game]", "编译错误"], a: 1, ex: "委托包一层前缀，游戏里统一日志格式就用这招——所有系统传进来自动带标签。" }
  ],
  cs12: [
    { tag: "b4_cs12_count", q: "以下 LINQ 代码输出？", code: "int[] n = { 1, 2, 3, 4 };\nDebug.Log(n.Count(x => x > 2));", opts: ["2", "3", "4", "10"], a: 0, ex: "带谓词的 Count 直接统计满足条件的个数（3 和 4，共 2 个），不用 Where 再 Count 两段。" }
  ],

  u1: [
    { q: "改了场景但还没保存，哪里能看出来？", opts: ["场景标签页/标题会出现标记，按 Ctrl+S 保存", "看不出，只能靠记忆", "Unity 会自动保存", "Console 会提醒"], a: 0, ex: "未保存的场景会显示星号/标记，养成随手 Ctrl+S 的习惯——Play 退出还原的惨案少一半。" }
  ],
  u2: [
    { q: "[Range(0, 10)] 加在 float 字段上，Inspector 里会变成？", opts: ["一个 0~10 的滑动条", "一个文本框", "一个下拉框", "一个颜色选择器"], a: 0, ex: "Range 把数值字段变成滑条，天然限制范围；常用在透明度、音量、概率这类参数上。" },
    { q: "想给 Inspector 字段加一行鼠标悬停提示文字，用？", opts: ["[Tooltip(\"说明文字\")]", "// 注释就够了", "[Help] 特性", "改字段名"], a: 0, ex: "[Tooltip] 悬停显示说明，配合 [Header] 分组，Inspector 就是一份自带文档的配置面板。" }
  ],
  u3: [
    { q: "用 transform.Translate(dir * Time.deltaTime) 移动物体，在 30 帧和 60 帧设备上速度？", opts: ["一样，deltaTime 抵消了帧率差异", "60 帧快一倍", "30 帧快一倍", "都不动"], a: 0, ex: "deltaTime 是\"这一帧花了多久\"，帧率低单帧补偿多，总速度一致——帧率无关移动的标准答案。" },
    { q: "Time.time 表示的是？", opts: ["游戏启动（Play）以来的总时长", "这一帧的时长", "真实世界当前时间", "上一帧时长"], a: 0, ex: "区分三兄弟：Time.time 总时长、Time.deltaTime 上一帧时长、Time.fixedTime 物理计时。受 timeScale 影响的是缩放时间系。" }
  ],
  u4: [
    { q: "把子物体拽到父物体正中心（本地原点），应设置？", opts: ["child.localPosition = Vector3.zero", "child.position = Vector3.zero", "child.localScale = zero", "child.rotation = zero"], a: 0, ex: "localPosition 归零即对齐父物体原点；position 归零会飞到世界原点（0,0,0）。" }
  ],
  u5: [
    { q: "[DisallowMultipleComponent] 的作用是？", opts: ["禁止同一物体重复挂载该组件", "禁止卸载组件", "禁止复制物体", "禁止修改字段"], a: 0, ex: "像 AudioSource 这种\"一个物体一个就够\"的组件常用它，防止策划手滑挂两份。" },
    { q: "GetComponentsInChildren<AudioSource>(true) 与不带 true 的版本区别是？", opts: ["true 会把未激活的子物体也算进来", "true 只找激活物体", "没有这种重载", "true 表示倒序查找"], a: 0, ex: "bool 参数控制\"是否包含未激活子物体\"——找隐藏 UI 下的组件时常踩这个坑。" }
  ],
  u6: [
    { q: "移动端手指\"刚按下屏幕\"那一瞬间，Input.GetTouch(0).phase 是？", opts: ["TouchPhase.Began", "TouchPhase.Moved", "TouchPhase.Ended", "TouchPhase.Stationary"], a: 0, ex: "Began 按下、Moved 移动、Stationary 按住不动、Ended 抬起、Canceled 系统打断——五态记牢，触摸逻辑不乱。" },
    { q: "判断\"当前有手指按在屏幕上\"，用？", opts: ["Input.touchCount > 0", "Input.touches.Length == 0", "Input.GetKey(Touch)", "Input.mousePresent"], a: 0, ex: "touchCount 是当前触点数量：大于 0 说明有手指按着；配合 GetTouch(i) 拿每个手指的详细数据。" }
  ],
  u7: [
    { q: "场景里一大块永不移动的地面，性能最优的做法是？", opts: ["只放 Collider 不加 Rigidbody（静态碰撞体）", "每个都加 Rigidbody", "每帧改它的位置", "用 MeshCollider 且不开 Convex"], a: 0, ex: "静态碰撞体不参与刚体模拟，省开销；会动的东西才需要 Rigidbody。乱加刚体是物理性能大坑。" }
  ],
  u8: [
    { q: "从对象池取出一个休眠对象时，除了改位置还必须？", opts: ["gameObject.SetActive(true)", "重新 Instantiate", "Destroy 再新建", "改它的名字"], a: 0, ex: "池化对象用 SetActive(true/false) 启停——复用的本质就是\"隐藏着，用的时候叫醒\"。" }
  ],
  u9: [
    { q: "在物体 X 上调用 StopAllCoroutines()，影响范围是？", opts: ["只停止 X 上运行的全部协程", "停止全场景所有协程", "停止整个游戏的 Update", "只停止第一个启动的协程"], a: 0, ex: "范围是\"调用者这个 MonoBehaviour 所在物体\"。要精准停某一个，保存 StartCoroutine 返回的引用再 StopCoroutine。" }
  ],
  u10: [
    { q: "UI 按钮点了没反应，排查时第一个该确认的是？", opts: ["场景里有没有 EventSystem 物体", "按钮颜色对不对", "Canvas 够不够大", "游戏帧率"], a: 0, ex: "EventSystem 是 UI 事件的中枢，误删后所有按钮/触摸全部失灵——Unity 创建 Canvas 时通常会自动配一个，但删掉不会提醒。" }
  ],
  u11: [
    { q: "同步 SceneManager.LoadScene 加载大场景时会卡顿，根本原因是？", opts: ["加载在主线程一次性完成，期间无法渲染", "显卡过热", "场景太大存不下", "代码写错了"], a: 0, ex: "主线程被加载占住就渲染不了任何画面 → 白屏卡死感。异步加载让主线程能穿插渲染进度条。" }
  ],
  u12: [
    { q: "敌人被销毁时要播放死亡音效，正确的做法是？", opts: ["AudioSource.PlayClipAtPoint(clip, 位置)（它自建独立播放器）", "在敌人自己的 AudioSource 上播（会跟着一起被销毁）", "音效没法在销毁时播放", "把敌人禁用再播"], a: 0, ex: "敌人 Destroy 后它身上的 AudioSource 也没了，声音会被掐断；PlayClipAtPoint 自建临时播放器播完自毁。" }
  ],

  a1: [
    { q: "n = 1000 时，双重循环（各层 n 次）大约执行多少次操作？", opts: ["约 2000 次", "约 100 万次", "约 1000 次", "约 10 亿次"], a: 1, ex: "1000 × 1000 = 100 万。O(n²) 的增长速度：n 扩大 10 倍，耗时扩大 100 倍。" },
    { q: "n 很大时，常数项很大的 O(n) 算法和常数很小的 O(n²) 算法相比？", opts: ["O(n) 终将更快，n 越大优势越明显", "O(n²) 永远更快", "两者永远一样", "只看常数就够了"], a: 0, ex: "复杂度决定\"增长的形状\"，常数只影响交叉点。n 足够大时线性必胜平方——这就是先看复杂度的原因。" }
  ],
  a2: [
    { q: "合并两个有序数组（长度 n 和 m）为一个有序数组，双指针做法的复杂度是？", opts: ["O(n + m)", "O(n × m)", "O(n log n)", "O(1)"], a: 0, ex: "两个指针各走各的，总共最多 n+m 步。归并排序的\"合并\"就是这一步。" },
    { q: "反转字符串 \"abc\" 的结果是？", opts: ["cba", "abc", "bca", "acb"], a: 0, ex: "ToCharArray → 双指针交换 → new string(chars)，三步反转法是字符串题的万能起手式。" }
  ],
  a3: [
    { q: "foreach 遍历 Dictionary<string, int> 时，键值对的顺序是？", opts: ["不保证与插入顺序一致", "一定按插入顺序", "一定按字母序", "一定按值排序"], a: 0, ex: "哈希表无序。需要顺序时就排序键，或改用 SortedDictionary（按键有序，代价是 O(log n)）。" },
    { tag: "b4_a10_unique", q: "数组 {4, 4, 7} 中\"只出现一次\"的元素是？", opts: ["4", "7", "不存在", "两个都是"], a: 1, ex: "4 出现两次，7 只出现一次 → 7。哈希计数一遍即可，异或技巧也能秒（成对的互相抵消）。" }
  ],
  a4: [
    { q: "用双指针判断 \"Level\" 是否回文（不忽略大小写），结果是？", opts: ["False，'L' 和 'l' 不相等", "True，忽略大小写", "True，完全对称", "编译错误"], a: 0, ex: "'L' 与 'l' 字符不同 → False。实际项目常先 ToLower() 再比，业务规则决定要不要忽略大小写。" },
    { q: "对 {1, 2, 3, 4} 原地双指针反转后，数组是？", opts: ["{4, 3, 2, 1}", "{1, 2, 3, 4}", "{2, 1, 4, 3}", "{3, 4, 1, 2}"], a: 0, ex: "交换 (1,4) 和 (2,3) 两对即完成，时间 O(n)、空间 O(1)。" }
  ],
  a5: [
    { q: "撤销（Undo）操作序列：依次\"写 a\"、\"写 b\"，然后撤销一次，当前内容是？", opts: ["a（撤销弹出最后写的 b）", "b", "ab", "空"], a: 0, ex: "撤销就是栈的 Pop：最后写的最先被撤掉——这正是栈 LIFO 特性的日常应用。" },
    { q: "括号串 \"(()())\" 是有效括号吗？（栈计数：'(' 加 1，')' 减 1）", opts: ["是，过程中深度不为负且最终归 0", "不是，深度变成负数", "是，因为长度是偶数", "无法判断"], a: 0, ex: "深度轨迹 1,2,1,2,1,0：全程不为负、最终归零 → 有效。两个条件缺一不可。" }
  ],
  a6: [
    { q: "关于数组和链表，说法正确的是？", opts: ["数组随机访问 O(1)，链表插入删除 O(1)（已知位置）", "链表随机访问 O(1)", "数组插入删除 O(1)", "两者所有操作性能一样"], a: 0, ex: "各有所长：数组读快改慢，链表改快读慢。Unity 里 List<T> 是数组封装，所以 Remove 中段元素才慢。" },
    { q: "在长度 n 的数组\"开头\"插入一个元素，平均要移动几个元素？", opts: ["1 个", "n/2 个左右", "n 个左右（全部后移）", "0 个"], a: 2, ex: "开头插入最惨：所有元素都要后移一位，O(n)；结尾插入才是 O(1)。" }
  ],
  a7: [
    { tag: "b4_a7_printdesc", q: "以下代码打印的内容是？", code: "void Print(int n) {\n    if (n == 0) return;\n    Debug.Log(n);\n    Print(n - 1);\n}\n// 调用 Print(3)", opts: ["1、2、3", "3、2、1", "3", "0、1、2、3"], a: 1, ex: "先打印再递归 = 正着数；先递归再打印 = 倒着数。打印语句在递归调用的前后，顺序完全不同。" }
  ],
  a8: [
    { tag: "b4_a8_insert", q: "插入排序处理 {3, 1, 2} 的第二个元素（把 1 插入已排序部分）后，数组是？", opts: ["{1, 3, 2}", "{1, 2, 3}", "{3, 1, 2}", "{2, 1, 3}"], a: 0, ex: "key=1 比 3 小，3 后移，1 插到最前 → {1,3,2}。注意这轮只处理一个元素，全部有序要两轮。" }
  ],
  a9: [
    { tag: "b4_a9_fib8", q: "斐波那契数列（fib(1)=fib(2)=1）第 8 项是？", opts: ["13", "21", "34", "18"], a: 1, ex: "1,1,2,3,5,8,13,21——第 8 项 21。爬楼梯问题就是它，DP 入门必备数列。" }
  ],
  a10: [
    { q: "两数之和的\"双层循环\"暴力解法，n 个元素时的复杂度是？", opts: ["O(n²)", "O(n)", "O(n log n)", "O(1)"], a: 0, ex: "每个元素都要和其余 n-1 个配对检查。哈希表法把它优化到 O(n)——空间换时间的教科书案例。" }
  ]
};
