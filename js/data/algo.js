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
        { t: "为什么要看复杂度", d: "复杂度衡量\"数据变大时，耗时增长得多快\"。常见级别：O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)。Unity 里每帧执行的代码要控制在 O(n) 以内，避免卡顿。", c: "// O(1)：与数据量无关\nint first = arr[0];\n\n// O(n)：数据翻倍，耗时翻倍\nforeach (var x in arr) sum += x;\n\n// O(n²)：数据翻倍，耗时翻 4 倍\nfor (int i = 0; i < n; i++)\n    for (int j = 0; j < n; j++)\n        Check(i, j);" },
        { t: "常见结构操作复杂度速查", d: "选数据结构前先看操作成本——这张表值得背下来。", c: "//            读/写      查找        插入/删除\n// 数组        O(1)       O(n)        O(n)\n// List<T>    O(1)       O(n)        O(n)（尾部添加均摊 O(1)）\n// LinkedList O(n)       O(n)        O(1)（已知节点）\n// Dictionary O(1)按键取  O(1)按键查   O(1) 均摊\n// HashSet    -          O(1)        O(1)" },
        { t: "案例精讲：找重复——O(n²) 优化成 O(n)", d: "同一问题，换数据结构从 100 亿次操作降到 10 万次——这就是算法的力量。", c: "// ❌ 朴素做法：双重比较，O(n²)\n// 10 万数据 = 100 亿次比较，要跑几十秒\nfor (int i = 0; i < arr.Length; i++)\n    for (int j = i + 1; j < arr.Length; j++)\n        if (arr[i] == arr[j]) return true;\n\n// ✅ 哈希做法：O(n)，10 万数据瞬间完成\nvar seen = new HashSet<int>();\nforeach (var x in arr) {\n    if (!seen.Add(x)) return true; // 已存在 = 重复\n}\nreturn false;" }
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
        { t: "字符串拼接陷阱", d: "循环里 s += x 每次都创建新字符串，是 O(n²)。大量拼接用 StringBuilder（O(n)）。", c: "var sb = new StringBuilder();\nfor (int i = 0; i < 10000; i++)\n    sb.Append(i);\nstring result = sb.ToString();" },
        { t: "案例精讲：回文判断完整实现", d: "双指针判回文的标准三步：首尾指针、逐对比较、相遇即停。", c: "bool IsPalindrome(string s) {\n    int i = 0, j = s.Length - 1;\n    while (i < j) {\n        if (s[i] != s[j]) return false; // 有一对不等就不是回文\n        i++; j--;                       // 双双向中间靠\n    }\n    return true;\n}\n// \"level\" → true；\"hello\" → false（'h' ≠ 'o'）" },
        { t: "同向指针案例：合并两个有序数组", d: "两个指针各管一个数组，每次取较小者——归并排序的 merge 步骤。", c: "int[] Merge(int[] a, int[] b) {\n    var result = new int[a.Length + b.Length];\n    int i = 0, j = 0, k = 0;\n    while (i < a.Length && j < b.Length)\n        result[k++] = a[i] <= b[j] ? a[i++] : b[j++];\n    while (i < a.Length) result[k++] = a[i++]; // 剩余直接搬\n    while (j < b.Length) result[k++] = b[j++];\n    return result;\n}" },
// "level" → true；"hello" → false（'h' ≠ 'o'）" },
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
        { t: "用空间换时间", d: "Dictionary/HashSet 能把\"查找是否存在\"从 O(n) 降到 O(1)。统计频率、找重复、两数之和都靠它。", c: "// 统计每个字符出现次数\nvar count = new Dictionary<char, int>();\nforeach (char c in s) {\n    if (!count.ContainsKey(c)) count[c] = 0;\n    count[c]++;\n}\n\n// 去重\nvar set = new HashSet<int>(arr);" },
        { t: "案例精讲：两数之和一遍扫描", d: "边遍边查\"搭档是否出现过\"，把 O(n²) 的暴力降到 O(n)。", c: "int[] TwoSum(int[] nums, int target) {\n    var seen = new Dictionary<int, int>(); // 值 → 下标\n    for (int i = 0; i < nums.Length; i++) {\n        int need = target - nums[i];\n        if (seen.ContainsKey(need))\n            return new[] { seen[need], i }; // 搭档出现过！\n        seen[nums[i]] = i;                  // 记录自己\n    }\n    return null;\n}" },
        { t: "案例：词频统计与最高频词", d: "一次计数 + 一次找最大，统计类问题的通用模板。", c: "var count = new Dictionary<string, int>();\nforeach (var w in words) {\n    if (!count.ContainsKey(w)) count[w] = 0;\n    count[w]++;\n}\nstring best = null; int bestN = 0;\nforeach (var kv in count)\n    if (kv.Value > bestN) { bestN = kv.Value; best = kv.Key; }\n// best 就是出现最多的单词" }
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
        { t: "对撞指针与快慢指针", d: "对撞指针：左右两端向中间走（回文、有序两数之和、原地反转）。快慢指针：同向不同速（原地删除元素、找链表中点）。", c: "// 有序数组找两数之和 = target\nint i = 0, j = a.Length - 1;\nwhile (i < j) {\n    int sum = a[i] + a[j];\n    if (sum == target) return true;\n    if (sum < target) i++;   // 太小，左指针右移\n    else j--;                // 太大，右指针左移\n}" },
        { t: "案例精讲：移动零完整实现", d: "读写指针：非零依次前移，末尾补零——一遍 O(n) 且保持顺序。", c: "void MoveZeroes(int[] a) {\n    int slow = 0; // 下一个非零元素的位置\n    for (int fast = 0; fast < a.Length; fast++)\n        if (a[fast] != 0)\n            a[slow++] = a[fast]; // 非零前移\n    while (slow < a.Length)\n        a[slow++] = 0;           // 尾部补零\n}\n// {0,1,0,3} → {1,3,0,0}" },
        { t: "案例：有序数组平方排序", d: "含负数的有序数组平方后，最大值必在两端——双指针从两端向中间填充。", c: "int[] SortedSquares(int[] a) {\n    int[] result = new int[a.Length];\n    int l = 0, r = a.Length - 1, k = a.Length - 1;\n    while (l <= r) {\n        if (Math.Abs(a[l]) > Math.Abs(a[r]))\n            result[k--] = a[l] * a[l++];\n        else\n            result[k--] = a[r] * a[r--];\n    }\n    return result;\n}\n// {-4,-1,0,3} → 平方排序 {0,1,9,16}" }
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
        { t: "Queue 先进先出", d: "Enqueue 入队、Dequeue 出队。任务队列、消息排队。BFS 广度优先搜索也靠它。", c: "var q = new Queue<string>();\nq.Enqueue(\"a\"); q.Enqueue(\"b\");\nDebug.Log(q.Dequeue()); // a，先来先走" },
        { t: "案例精讲：有效括号完整实现", d: "左括号入栈、右括号配对出栈——栈\"最近匹配\"特性的标准应用。", c: "bool IsValid(string s) {\n    var stack = new Stack<char>();\n    foreach (char c in s) {\n        if (c == '(') stack.Push(')');\n        else if (c == '[') stack.Push(']');\n        else if (c == '{') stack.Push('}');\n        else {\n            if (stack.Count == 0 || stack.Pop() != c)\n                return false; // 右括号没有匹配的左括号\n        }\n    }\n    return stack.Count == 0; // 还有剩余左括号也无效\n}" },
        { t: "案例：双栈实现撤销/重做", d: "撤销弹一个、重做存一个——编辑器、绘图软件的核心机制。", c: "var undo = new Stack<Action>();\nvar redo = new Stack<Action>();\n\nvoid Do(Action op)  { op(); undo.Push(op); redo.Clear(); }\nvoid Undo() {\n    if (undo.Count == 0) return;\n    var op = undo.Pop(); redo.Push(op);\n}\nvoid Redo() {\n    if (redo.Count == 0) return;\n    var op = redo.Pop(); op(); undo.Push(op);\n}" }
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
        { t: "节点与反转", d: "单链表节点 = 值 + 下一个指针。反转三步走：prev/cur/next 三指针逐个调转方向，O(n) 时间 O(1) 空间。", c: "class Node { public int val; public Node next; }\n\nNode prev = null, cur = head;\nwhile (cur != null) {\n    Node next = cur.next; // 先存后继\n    cur.next = prev;      // 调转方向\n    prev = cur;           // prev 前进\n    cur = next;           // cur 前进\n}\n// prev 就是新头" },
        { t: "案例精讲：反转链表完整实现（含使用）", d: "面试出现率最高的链表题，必须能脱离资料手写。", c: "// 建链表 1→2→3\nNode head = new Node { val = 1, next =\n         new Node { val = 2, next =\n         new Node { val = 3 } } };\n\nNode newHead = Reverse(head);\n// 遍历验证：3 → 2 → 1\nfor (Node n = newHead; n != null; n = n.next)\n    Debug.Log(n.val);" },
        { t: "案例：快慢指针找中点", d: "快针每次 2 步、慢针 1 步，快针到尾时慢针恰好在中间。", c: "Node FindMiddle(Node head) {\n    Node slow = head, fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;      // 走 1 步\n        fast = fast.next.next; // 走 2 步\n    }\n    return slow;\n}\n// 1→2→3→4→5：slow 停在 3\n// 1→2→3→4  ：slow 停在 3（第二个中点）" }
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
        { t: "递归的代价", d: "每层调用占用栈空间，深递归会爆栈；重复子问题（如朴素斐波那契）慢在重复计算，用记忆化解决。" },
        { t: "案例精讲：斐波那契三种实现对比", d: "同一问题三种复杂度——看清\"重复计算\"如何拖垮朴素递归。", c: "// 1️⃣ 朴素递归：O(2ⁿ)，fib(40) 要数秒\nlong Fib1(int n) => n <= 2 ? 1 : Fib1(n-1) + Fib1(n-2);\n\n// 2️⃣ 记忆化递归：O(n)，用字典缓存结果\nDictionary<int, long> memo = new();\nlong Fib2(int n) {\n    if (n <= 2) return 1;\n    if (memo.ContainsKey(n)) return memo[n];\n    return memo[n] = Fib2(n-1) + Fib2(n-2);\n}\n\n// 3️⃣ 循环制表：O(n) 时间 O(1) 空间，最优\nlong Fib3(int n) {\n    long a = 1, b = 1;\n    for (int i = 3; i <= n; i++) (a, b) = (b, a + b);\n    return b;\n}" },
        { t: "案例：递归调用栈图解", d: "画出调用树，重复与深度一目了然。", c: "// Fact(3) 的调用树：\n// Fact(3)\n// ├─ 3 * Fact(2)\n// │      └─ 2 * Fact(1)\n// │              └─ 1  ← 基线，开始返回\n// 返回顺序：1 → 2 → 6\n// 栈深度 = 递归深度 = 3 层\n// 斐波那契的树会\"分叉\"：同一节点算多次" }
      ],
      qs: [
        { q: "一个正确的递归函数必须包含？", opts: ["循环", "终止条件（基线）", "try-catch", "静态变量"], a: 1, ex: "没有基线就会无限调用直到栈溢出。" },
        { tag: "a7_fact4", q: "以下代码 F(4) 的返回值是？", code: "int F(int n) {\n    if (n <= 1) return 1;\n    return n * F(n - 1);\n}", opts: ["4", "10", "24", "120"], a: 2, ex: "4×3×2×1 = 24，即 4!。" },
        { q: "递归层数太深会发生？", opts: ["编译错误", "StackOverflowException", "自动转循环", "内存泄漏"], a: 1, ex: "每次调用压栈，栈空间耗尽即溢出。" },
        { q: "朴素递归斐波那契慢的根本原因是？", opts: ["递归本身慢", "大量重复计算同一子问题", "参数太多", "用了乘法"], a: 1, ex: "fib(30) 里 fib(2) 会被算几十万次——记忆化/DP 可降到 O(n)。" },
        { q: "\"用数组把已经算过的递归结果存起来\"这项技术叫？", opts: ["懒加载", "记忆化（Memoization）", "对象池", "协程"], a: 1, ex: "空间换时间，是自顶向下 DP 的写法。" }
      ]
    },
    {
      id: "a8", title: "排序与查找", mins: 12,
      kps: [
        { t: "常用排序", d: "C# 的 Array.Sort / List.Sort 平均 O(n log n)（内省排序）。冒泡这类 O(n²) 排序只适合理解思想。二分查找要求数据有序。", c: "int[] a = {4, 2, 7, 1};\nArray.Sort(a);           // {1,2,4,7}\nint idx = Array.BinarySearch(a, 4); // 2，要求已排序" },
        { t: "二分模板", d: "三个变量 lo/hi/mid，每步范围减半；注意 mid 写法 (lo+hi)/2 在超大数组会溢出，安全写法 lo+(hi-lo)/2。", c: "int lo = 0, hi = a.Length - 1;\nwhile (lo <= hi) {\n    int mid = lo + (hi - lo) / 2;\n    if (a[mid] == target) return mid;\n    if (a[mid] < target) lo = mid + 1;\n    else hi = mid - 1;\n}\nreturn -1;" },
        { t: "案例精讲：插入排序完整实现", d: "像整理手牌：新牌与手中牌从右往左比较，插到合适位置。", c: "void InsertionSort(int[] a) {\n    for (int i = 1; i < a.Length; i++) {\n        int key = a[i];       // 摸到的新牌\n        int j = i - 1;\n        while (j >= 0 && a[j] > key) {\n            a[j + 1] = a[j];  // 比新牌大的右移\n            j--;\n        }\n        a[j + 1] = key;       // 插入空位\n    }\n}" },
        { t: "案例：排行榜多关键字排序", d: "先按分数降序，分数相同按名字升序——比较器的组合写法。", c: "players.Sort((a, b) => {\n    int byScore = b.score.CompareTo(a.score); // 分数降序\n    if (byScore != 0) return byScore;\n    return string.Compare(a.name, b.name);    // 同分按名字\n});" }
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
        { t: "DP 适用信号", d: "问题能拆成相同形状的子问题（最优子结构）+ 子问题会被反复用到（重叠子问题）。关键词：\"最少/最多/多少种方法\"。" },
        { t: "案例精讲：打家劫舍完整实现", d: "\"偷或不偷\"两难选择，一行 max 概括——DP 的代表题。", c: "int Rob(int[] money) {\n    if (money.Length == 0) return 0;\n    if (money.Length == 1) return money[0];\n    int[] dp = new int[money.Length];\n    dp[0] = money[0];\n    dp[1] = Math.Max(money[0], money[1]);\n    for (int i = 2; i < money.Length; i++)\n        dp[i] = Math.Max(dp[i-1],            // 不偷这家\n                         dp[i-2] + money[i]); // 偷这家\n    return dp[^1];\n}" },
        { t: "案例：滚动变量空间优化", d: "dp[i] 只依赖前两项，就不需要整个数组——空间从 O(n) 降到 O(1)。", c: "int Rob(int[] money) {\n    int prev = 0, cur = 0;\n    foreach (int m in money) {\n        int best = Math.Max(cur, prev + m);\n        prev = cur;   // 上上家\n        cur = best;   // 上一家\n    }\n    return cur;\n}\n// 同样技巧适用于爬楼梯、斐波那契" }
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
        { t: "滑动窗口", d: "\"最长无重复字符子串\"：右指针扩张、遇重复左指针收缩，窗口内始终合法，O(n)。", c: "int left = 0, best = 0;\nvar seen = new Dictionary<char, int>();\nfor (int right = 0; right < s.Length; right++) {\n    char c = s[right];\n    if (seen.ContainsKey(c) && seen[c] >= left)\n        left = seen[c] + 1;      // 收缩到重复处下一位\n    seen[c] = right;\n    best = Math.Max(best, right - left + 1);\n}" },
        { t: "案例精讲：最长无重复子串完整实现", d: "逐字符走一遍 \"abcabcbb\"，看 left 如何跳跃——滑窗的完整推演。", c: "// s = \"abcabcbb\"\n// right=0 'a' 窗口{a}      best=1\n// right=1 'b' 窗口{ab}     best=2\n// right=2 'c' 窗口{abc}    best=3\n// right=3 'a' 重复！left→1 窗口{bca}\n// right=4 'b' 重复！left→2 窗口{cab}\n// right=5 'c' 重复！left→3 窗口{abc}\n// right=6 'b' 重复！left→5 窗口{cb}\n// ... 最终 best=3（\"abc\"）" },
        { t: "案例：前缀和+哈希求和为K的最长子数组", d: "把\"找区间\"变成\"找值\"——哈希让查找 O(1)，整体 O(n)。", c: "int MaxLen(int[] a, int k) {\n    var firstSeen = new Dictionary<int, int> { [0] = -1 };\n    int sum = 0, best = 0;\n    for (int i = 0; i < a.Length; i++) {\n        sum += a[i];\n        if (firstSeen.ContainsKey(sum - k))\n            best = Math.Max(best, i - firstSeen[sum - k]);\n        if (!firstSeen.ContainsKey(sum))\n            firstSeen[sum] = i; // 只记首次出现（要最长）\n    }\n    return best;\n}" }
      ],
      qs: [
        { q: "\"找出字符串中最长无重复字符子串的长度\"最适合的技巧是？", opts: ["暴力枚举所有子串", "滑动窗口 + 哈希", "排序", "栈"], a: 1, ex: "右指针扩张、左指针收缩，每个字符最多进出各一次，O(n)。" },
        { tag: "a8_sortmid", q: "以下代码输出？", code: "int[] a = {4, 2, 7, 1};\nArray.Sort(a);\nDebug.Log(a[1]);", opts: ["1", "2", "4", "7"], a: 1, ex: "排序后 {1,2,4,7}，下标 1 是 2。" },
        { q: "求两个数组交集（去重）最高效的方式是？", opts: ["双重循环比较", "两个 HashSet 互相 Contains", "都排序后二分", "转成字符串"], a: 1, ex: "一个存入 HashSet，另一个遍历查询，总体 O(n+m)。" },
        { q: "在无序数组中找\"第 K 大的元素\"，平均 O(n) 的经典算法是？", opts: ["冒泡排序 K 次", "快速选择（Quick Select）", "二分查找", "哈希计数"], a: 1, ex: "快排分区思想：只递归 K 所在的一侧，平均 O(n)。" },
        { tag: "a10_hashsetcount", q: "以下代码输出？", code: "string s = \"abcabc\";\nvar set = new HashSet<char>(s);\nDebug.Log(set.Count);", opts: ["6", "3", "1", "0"], a: 1, ex: "去重后剩 {a,b,c}，Count=3。" }
      ]
    }
  ]
};
