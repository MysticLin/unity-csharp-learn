// C# 算法训练营 —— 专题式刷题，路线参考 algorithm-pattern-CSharp、Hello 算法（均支持 C#）
window.ALGO_COURSE = {
  id: "algo",
  title: "C# 算法训练营",
  emoji: "🧮",
  short: "算法题",
  color: "#9b5de5",
  desc: "按专题刷题：复杂度 → 数组 → 哈希 → 双指针 → 栈队列 → 链表 → 递归 → 排序 → DP，全部带解析。",
  lessons: [
    {
      id: "a1", title: "复杂度分析 Big-O", mins: 10,
      kps: [
        { t: "为什么要看复杂度", d: "复杂度衡量\"数据变大时，耗时增长得多快\"。常见级别：O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)。Unity 里每帧执行的代码要控制在 O(n) 以内，避免卡顿。", c: "// O(1)：与数据量无关\nint first = arr[0];\n\n// O(n)：数据翻倍，耗时翻倍\nforeach (var x in arr) sum += x;\n\n// O(n²)：数据翻倍，耗时翻 4 倍\nfor (int i = 0; i < n; i++)\n    for (int j = 0; j < n; j++)\n        Check(i, j);" }
      ],
      qs: [
        { q: "在有序数组中进行二分查找的复杂度是？", opts: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], a: 1, ex: "每次比较都把范围砍一半，n 次折半只需 log n 步。" },
        { q: "两层嵌套 for 循环遍历长度为 n 的数组，复杂度是？", opts: ["O(2n)", "O(n)", "O(n²)", "O(log n)"], a: 2, ex: "外层 n 次 × 内层 n 次 = n²。" },
        { q: "以下复杂度中增长最慢的是？", opts: ["O(n log n)", "O(log n)", "O(n²)", "O(2ⁿ)"], a: 1, ex: "对数级 O(log n) 几乎不增长，是二分查找、平衡树的标志。" },
        { q: "用 foreach 把长度 n 的 List 求和，复杂度是？", opts: ["O(1)", "O(log n)", "O(n)", "O(n²)"], a: 2, ex: "每个元素访问一次，共 n 次。" },
        { q: "朴素的递归斐波那契 fib(n)=fib(n-1)+fib(n-2) 的复杂度约是？", opts: ["O(n)", "O(n log n)", "O(2ⁿ)", "O(n²)"], a: 2, ex: "每个调用分裂成两个，指数级重复计算——这正是后面 DP 要解决的问题。" }
      ]
    },
    {
      id: "a2", title: "数组与字符串", mins: 12,
      kps: [
        { t: "反转与回文", d: "反转数组：头尾交换向中间走。回文串：正读反读一样，用双指针从两端比较即可。", c: "// 原地反转\nfor (int i = 0; i < a.Length / 2; i++) {\n    int t = a[i];\n    a[i] = a[a.Length - 1 - i];\n    a[a.Length - 1 - i] = t;\n}" },
        { t: "字符串拼接陷阱", d: "循环里 s += x 每次都创建新字符串，是 O(n²)。大量拼接用 StringBuilder（O(n)）。", c: "var sb = new StringBuilder();\nfor (int i = 0; i < 10000; i++)\n    sb.Append(i);\nstring result = sb.ToString();" }
      ],
      qs: [
        { q: "int[] a = {1, 2, 3, 4, 5}; 反转后 a[0] 是？", opts: ["1", "2", "5", "4"], a: 2, ex: "反转后原末尾元素到开头：{5,4,3,2,1}。" },
        { q: "以下代码输出什么？", code: "int[] a = {1, 2, 3};\nfor (int i = 0; i < a.Length / 2; i++) {\n    int t = a[i];\n    a[i] = a[a.Length - 1 - i];\n    a[a.Length - 1 - i] = t;\n}\nDebug.Log(string.Join(\",\", a));", opts: ["1,2,3", "3,2,1", "2,1,3", "3,1,2"], a: 1, ex: "长度 3 只需交换 1 次（Length/2=1）：首尾互换得 {3,2,1}，中间不动。" },
        { q: "判断一个字符串是不是回文，最经典的方法是？", opts: ["排序后再比较", "双指针从两端向中间比较", "转成数字再转回来", "递归拆成两半"], a: 1, ex: "左右指针逐对比较，O(n) 时间 O(1) 空间。" },
        { q: "循环中拼接上万次字符串应该用？", opts: ["s = s + x", "StringBuilder.Append", "string.Concat(s, x)", "s.Insert"], a: 1, ex: "字符串不可变，+= 每次都复制整个字符串；StringBuilder 内部维护缓冲区。" },
        { q: "以下哪个不是回文串？", opts: ["level", "abcba", "hello", "racecar"], a: 2, ex: "hello 反过来是 olleh，不相等。" }
      ]
    },
    {
      id: "a3", title: "哈希与计数", mins: 12,
      kps: [
        { t: "用空间换时间", d: "Dictionary/HashSet 能把\"查找是否存在\"从 O(n) 降到 O(1)。统计频率、找重复、两数之和都靠它。", c: "// 统计每个字符出现次数\nvar count = new Dictionary<char, int>();\nforeach (char c in s) {\n    if (!count.ContainsKey(c)) count[c] = 0;\n    count[c]++;\n}\n\n// 去重\nvar set = new HashSet<int>(arr);" }
      ],
      qs: [
        { q: "在无序数组中找\"第一个重复元素\"，最合适的数据结构是？", opts: ["Queue", "HashSet / Dictionary", "Stack", "二维数组"], a: 1, ex: "边遍历边问 HashSet\"见过吗\"，O(1) 查询，总体 O(n)。" },
        { q: "以下代码输出什么？", code: "var count = new Dictionary<char, int>();\nforeach (char c in \"aab\") {\n    if (!count.ContainsKey(c)) count[c] = 0;\n    count[c]++;\n}\nDebug.Log(count['a']);", opts: ["1", "2", "3", "报错"], a: 1, ex: "a 出现 2 次、b 出现 1 次，count['a'] = 2。" },
        { q: "两数之和（无序数组找 a+b=target）的最优解法是？", opts: ["两层循环枚举", "先排序再双指针", "哈希表一遍扫描 O(n)", "递归"], a: 2, ex: "遍历时用 Dictionary 记录\"target-当前值\"是否出现过，一遍 O(n)；两层循环是 O(n²)。" },
        { q: "new HashSet<int>(new[]{1, 2, 2, 3, 3, 3}).Count 的值是？", opts: ["6", "3", "1", "0"], a: 1, ex: "HashSet 自动去重，只剩 {1,2,3}。" },
        { q: "找字符串中第一个不重复字符的高效思路是？", opts: ["对每个字符扫描全串 O(n²)", "先统计频率再遍历找频率为 1 的 O(n)", "排序后找 O(nlogn)", "随机抽取"], a: 1, ex: "两次线性扫描：第一次计数，第二次找 count==1 的第一个。" }
      ]
    },
    {
      id: "a4", title: "双指针", mins: 12,
      kps: [
        { t: "对撞指针与快慢指针", d: "对撞指针：左右两端向中间走（回文、有序两数之和、原地反转）。快慢指针：同向不同速（原地删除元素、找链表中点）。", c: "// 有序数组找两数之和 = target\nint i = 0, j = a.Length - 1;\nwhile (i < j) {\n    int sum = a[i] + a[j];\n    if (sum == target) return true;\n    if (sum < target) i++;   // 太小，左指针右移\n    else j--;                // 太大，右指针左移\n}" }
      ],
      qs: [
        { q: "有序数组中找两数之和等于 target，双指针的时间复杂度是？", opts: ["O(n²)", "O(n log n)", "O(n)", "O(1)"], a: 2, ex: "两指针合计最多走 n 步，每步排除一个元素。" },
        { q: "以下代码执行后数组是？", code: "int[] a = {1, 2, 3, 4, 5};\nint i = 0, j = a.Length - 1;\nwhile (i < j) {\n    int t = a[i]; a[i] = a[j]; a[j] = t;\n    i++; j--;\n}", opts: ["{1,2,3,4,5}", "{5,4,3,2,1}", "{2,1,4,3,5}", "{5,1,3,4,2}"], a: 1, ex: "对撞指针原地反转：交换 2 次后 i、j 相遇。" },
        { q: "用双指针判断回文时，两端字符不相等应该？", opts: ["跳过继续", "返回 false", "交换两个字符", "移动一个指针再试"], a: 1, ex: "只要有一对不等就不是回文，直接 false。" },
        { q: "\"原地移除数组中所有等于 val 的元素\"常用哪种双指针？", opts: ["对撞指针", "快慢指针（读写指针）", "三指针", "随机指针"], a: 1, ex: "快指针负责读、慢指针负责写，把不等于 val 的元素前移。" },
        { q: "有序数组两数之和：当前和太大时应该？", opts: ["左指针右移", "右指针左移", "两个都左移", "结束查找"], a: 1, ex: "和太大说明最大的数太大了，右指针左移换小一点的。" }
      ]
    },
    {
      id: "a5", title: "栈与队列", mins: 12,
      kps: [
        { t: "Stack 后进先出", d: "Push 入栈、Pop 出栈、Peek 看栈顶。括号匹配、撤销操作、浏览器后退都是栈。", c: "var st = new Stack<int>();\nst.Push(1); st.Push(2); st.Push(3);\nDebug.Log(st.Pop());  // 3，最后进的先出\nDebug.Log(st.Peek()); // 2，只看不动" },
        { t: "Queue 先进先出", d: "Enqueue 入队、Dequeue 出队。任务队列、消息排队。BFS 广度优先搜索也靠它。", c: "var q = new Queue<string>();\nq.Enqueue(\"a\"); q.Enqueue(\"b\");\nDebug.Log(q.Dequeue()); // a，先来先走" }
      ],
      qs: [
        { q: "栈（Stack）的特点是？", opts: ["先进先出", "后进先出", "随机访问", "按优先级出"], a: 1, ex: "LIFO——最后 Push 的最先 Pop。" },
        { q: "依次 Push 1、2、3 后 Pop 两次，栈里剩下？", opts: ["1", "2", "3", "空"], a: 0, ex: "Pop 依次弹出 3、2，只剩最先入栈的 1。" },
        { q: "判断括号串是否有效（如 \"({[]})\"）的标准解法用？", opts: ["队列", "栈", "哈希表", "双指针"], a: 1, ex: "左括号入栈，右括号与栈顶配对出栈，最后栈空即有效。" },
        { q: "Enqueue a、b、c 后 Dequeue() 返回？", opts: ["c", "b", "a", "随机"], a: 2, ex: "队列 FIFO，最先入队的 a 先出。" },
        { q: "浏览器的\"后退\"按钮行为最像哪种结构？", opts: ["队列", "栈", "链表", "堆"], a: 1, ex: "每访问一页入栈，后退=出栈回到上一页。" }
      ]
    },
    {
      id: "a6", title: "链表入门", mins: 12,
      kps: [
        { t: "节点与反转", d: "单链表节点 = 值 + 下一个指针。反转三步走：prev/cur/next 三指针逐个调转方向，O(n) 时间 O(1) 空间。", c: "class Node { public int val; public Node next; }\n\nNode prev = null, cur = head;\nwhile (cur != null) {\n    Node next = cur.next; // 先存后继\n    cur.next = prev;      // 调转方向\n    prev = cur;           // prev 前进\n    cur = next;           // cur 前进\n}\n// prev 就是新头" }
      ],
      qs: [
        { q: "反转单链表的时空复杂度通常是？", opts: ["时间 O(n)、空间 O(1)", "时间 O(n)、空间 O(n)", "时间 O(n²)、空间 O(1)", "时间 O(log n)"], a: 0, ex: "遍历一次调转指针，不需要额外数组。" },
        { q: "链表 1→2→3 反转后，新头节点的值是？", opts: ["1", "2", "3", "0"], a: 2, ex: "反转后方向变为 3→2→1，头是原来的尾。" },
        { q: "一次遍历找单链表中间节点，用？", opts: ["对撞指针", "快慢指针（快2慢1）", "栈", "哈希表"], a: 1, ex: "快指针每次走 2 步，慢指针走 1 步，快指针到头时慢指针恰好在中间。" },
        { q: "判断链表是否有环的经典方法是？", opts: ["排序", "快慢指针看是否相遇", "哈希表存值", "双链表"], a: 1, ex: "有环时快指针会在环里\"套圈\"追上慢指针（Floyd 判圈）。" },
        { q: "单链表访问第 i 个元素必须？", opts: ["直接下标访问 O(1)", "从头开始遍历 O(n)", "二分查找 O(logn)", "从尾部倒着找"], a: 1, ex: "链表没有下标，这是它和数组的本质区别——数组随机访问 O(1)，插入删除慢；链表反之。" }
      ]
    },
    {
      id: "a7", title: "递归", mins: 12,
      kps: [
        { t: "递归两要素", d: "基线条件（什么时候停）+ 递归条件（如何缩小问题）。缺基线 = StackOverflowException。", c: "// 阶乘\nint Fact(int n) {\n    if (n <= 1) return 1;      // 基线\n    return n * Fact(n - 1);    // 缩小问题\n}" },
        { t: "递归的代价", d: "每层调用占用栈空间，深递归会爆栈；重复子问题（如朴素斐波那契）慢在重复计算，用记忆化解决。" }
      ],
      qs: [
        { q: "一个正确的递归函数必须包含？", opts: ["循环", "终止条件（基线）", "try-catch", "静态变量"], a: 1, ex: "没有基线就会无限调用直到栈溢出。" },
        { q: "以下代码 F(4) 的返回值是？", code: "int F(int n) {\n    if (n <= 1) return 1;\n    return n * F(n - 1);\n}", opts: ["4", "10", "24", "120"], a: 2, ex: "4×3×2×1 = 24，即 4!。" },
        { q: "递归层数太深会发生？", opts: ["编译错误", "StackOverflowException", "自动转循环", "内存泄漏"], a: 1, ex: "每次调用压栈，栈空间耗尽即溢出。" },
        { q: "朴素递归斐波那契慢的根本原因是？", opts: ["递归本身慢", "大量重复计算同一子问题", "参数太多", "用了乘法"], a: 1, ex: "fib(30) 里 fib(2) 会被算几十万次——记忆化/DP 可降到 O(n)。" },
        { q: "\"用数组把已经算过的递归结果存起来\"这项技术叫？", opts: ["懒加载", "记忆化（Memoization）", "对象池", "协程"], a: 1, ex: "空间换时间，是自顶向下 DP 的写法。" }
      ]
    },
    {
      id: "a8", title: "排序与查找", mins: 12,
      kps: [
        { t: "常用排序", d: "C# 的 Array.Sort / List.Sort 平均 O(n log n)（内省排序）。冒泡这类 O(n²) 排序只适合理解思想。二分查找要求数据有序。", c: "int[] a = {4, 2, 7, 1};\nArray.Sort(a);           // {1,2,4,7}\nint idx = Array.BinarySearch(a, 4); // 2，要求已排序" },
        { t: "二分模板", d: "三个变量 lo/hi/mid，每步范围减半；注意 mid 写法 (lo+hi)/2 在超大数组会溢出，安全写法 lo+(hi-lo)/2。", c: "int lo = 0, hi = a.Length - 1;\nwhile (lo <= hi) {\n    int mid = lo + (hi - lo) / 2;\n    if (a[mid] == target) return mid;\n    if (a[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n}\nreturn -1;" }
      ],
      qs: [
        { q: "Array.Sort 的平均时间复杂度是？", opts: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], a: 1, ex: "内省排序（快排+堆排+插入排序的混合），稳定在 O(n log n)。" },
        { q: "二分查找的前提条件是？", opts: ["数组够长", "数据有序", "数据是整数", "内存充足"], a: 1, ex: "有序才能根据中间值决定往左还是往右。" },
        { q: "在 {1, 3, 5, 7, 9} 中二分查找 7，第二次比较的元素是？", opts: ["1", "5", "7", "9"], a: 2, ex: "第一次 mid=5（下标2），5<7 向右；第二次 mid=7，命中——共比较 2 次。" },
        { q: "冒泡排序在\"数组已经有序\"且带提前退出优化时，复杂度是？", opts: ["O(n²)", "O(n log n)", "O(n)", "O(1)"], a: 2, ex: "一轮扫描无交换即退出，只需 n-1 次比较。" },
        { q: "在 1~100 中二分查找任意一个数，最多比较几次？", opts: ["5", "7", "10", "50"], a: 1, ex: "log₂100 ≈ 6.6，向上取整为 7 次。" }
      ]
    },
    {
      id: "a9", title: "动态规划入门", mins: 14,
      kps: [
        { t: "爬楼梯问题", d: "每次跨 1 或 2 阶，走到第 n 阶的方案数 = f(n-1) + f(n-2)。递归慢在重复计算，DP 用数组自底向上算一遍，O(n)。", c: "int ClimbStairs(int n) {\n    if (n <= 2) return n;\n    int[] dp = new int[n + 1];\n    dp[1] = 1; dp[2] = 2;\n    for (int i = 3; i <= n; i++)\n        dp[i] = dp[i - 1] + dp[i - 2];\n    return dp[n];\n}" },
        { t: "DP 适用信号", d: "问题能拆成相同形状的子问题（最优子结构）+ 子问题会被反复用到（重叠子问题）。关键词：\"最少/最多/多少种方法\"。" }
      ],
      qs: [
        { q: "爬楼梯（每次 1 或 2 阶），上到第 4 阶有几种走法？", opts: ["3", "4", "5", "8"], a: 2, ex: "枚举：1111、112、121、211、22 共 5 种 = f(3)+f(2) = 3+2。" },
        { q: "DP 相比朴素递归的核心改进是？", opts: ["不用函数", "每个子问题只算一次并保存", "一定更快写", "不需要终止条件"], a: 1, ex: "把指数级的重复树压成一条 O(n) 的计算链。" },
        { q: "以下爬楼梯代码 dp[5] 的值是？", code: "dp[1] = 1;\ndp[2] = 2;\nfor (int i = 3; i <= 5; i++)\n    dp[i] = dp[i-1] + dp[i-2];", opts: ["5", "6", "8", "13"], a: 2, ex: "dp[3]=3, dp[4]=5, dp[5]=8（斐波那契数列）。" },
        { q: "适合用 DP 解决的问题特征是？", opts: ["数据必须有序", "重叠子问题 + 最优子结构", "只需要 O(1) 空间", "没有重复计算"], a: 1, ex: "能拆解成子问题且子问题被反复用到，才值得用 DP 换效率。" },
        { q: "\"最少硬币凑出金额\"这类求极值问题，通常适合？", opts: ["贪心随便拿", "动态规划", "冒泡排序", "随机尝试"], a: 1, ex: "贪心在某些面值下会错（如 1,3,4 凑 6），DP 能保证最优。" }
      ]
    },
    {
      id: "a10", title: "综合挑战", mins: 15,
      kps: [
        { t: "滑动窗口", d: "\"最长无重复字符子串\"：右指针扩张、遇重复左指针收缩，窗口内始终合法，O(n)。", c: "int left = 0, best = 0;\nvar seen = new Dictionary<char, int>();\nfor (int right = 0; right < s.Length; right++) {\n    char c = s[right];\n    if (seen.ContainsKey(c) && seen[c] >= left)\n        left = seen[c] + 1;      // 收缩到重复处下一位\n    seen[c] = right;\n    best = Math.Max(best, right - left + 1);\n}" }
      ],
      qs: [
        { q: "\"找出字符串中最长无重复字符子串的长度\"最适合的技巧是？", opts: ["暴力枚举所有子串", "滑动窗口 + 哈希", "排序", "栈"], a: 1, ex: "右指针扩张、左指针收缩，每个字符最多进出各一次，O(n)。" },
        { q: "以下代码输出？", code: "int[] a = {4, 2, 7, 1};\nArray.Sort(a);\nDebug.Log(a[1]);", opts: ["1", "2", "4", "7"], a: 1, ex: "排序后 {1,2,4,7}，下标 1 是 2。" },
        { q: "求两个数组交集（去重）最高效的方式是？", opts: ["双重循环比较", "两个 HashSet 互相 Contains", "都排序后二分", "转成字符串"], a: 1, ex: "一个存入 HashSet，另一个遍历查询，总体 O(n+m)。" },
        { q: "在无序数组中找\"第 K 大的元素\"，平均 O(n) 的经典算法是？", opts: ["冒泡排序 K 次", "快速选择（Quick Select）", "二分查找", "哈希计数"], a: 1, ex: "快排分区思想：只递归 K 所在的一侧，平均 O(n)。" },
        { q: "以下代码输出？", code: "string s = \"abcabc\";\nvar set = new HashSet<char>(s);\nDebug.Log(set.Count);", opts: ["6", "3", "1", "0"], a: 1, ex: "去重后剩 {a,b,c}，Count=3。" }
      ]
    }
  ]
};
