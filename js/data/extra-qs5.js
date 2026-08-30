// 题库扩充包 5 —— C# +100 题，tag 由 tools/verify-qs.mjs 模拟验证
window.EXTRA_QS5 = {
  cs1: [
    { tag: "t5_1", q: "以下代码输出？", code: "Debug.Log(int.Parse(\"123\") + 1);", opts: ["1231", "124", "\"124\"", "报错"], a: 1, ex: "int.Parse 把数字字符串解析成 int，123+1=124。非数字字符串会抛 FormatException，拿不准就用 int.TryParse。" },
    { tag: "t5_2", q: "以下代码输出？", code: "Debug.Log((char)('A' + 2));", opts: ["C", "67", "B", "A2"], a: 0, ex: "'A'+2 是 int 67，强转回 char 得 'C'。字母表位移就用这套算术。" },
    { q: "const double PI = 3.14; 之后执行 PI = 3.14159; 会？", opts: ["编译错误（const 不可再赋值）", "PI 变成 3.14159", "运行时报错", "PI 保持不变但编译通过"], a: 0, ex: "const 是编译期常量，赋值后永远不可改。可能变化的值用普通字段或 static readonly。" },
    { tag: "t5_3", q: "以下代码输出？", code: "Debug.Log(true && !false);", opts: ["True", "False", "报错", "1"], a: 0, ex: "!false = true，true && true = true。&& 短路：左边为 false 时右边不执行。" },
    { tag: "t5_4", q: "以下代码输出？", code: "Debug.Log(7 / 2.0);", opts: ["3", "3.5", "4", "2"], a: 1, ex: "除数是 2.0（double），整个表达式按 double 算 = 3.5。两个 int 相除才会丢小数。" },
    { q: "要存 30 亿（超过 int 上限约 21 亿），应该用？", opts: ["long", "short", "byte", "float"], a: 0, ex: "int 上限约 21.4 亿；long 是 64 位整数，上限约 922 亿亿。经验值：总伤害、总金币这类累加值用 long。" },
    { q: "var x = \"5\"; 之后执行 x = 5; 会？", opts: ["编译错误（var 推断后类型固定为 string）", "x 变成 int", "正常运行", "x 变成 \"5\""], a: 0, ex: "var 不是动态类型，推断出的类型终身不变。它只是少打字，不是万能容器。" },
    { q: "字符和字符串的字面量写法，正确的是？", opts: ["char 用单引号 'A'，string 用双引号 \"A\"", "都用单引号", "都用双引号", "char 用双引号"], a: 0, ex: "'A' 是 char（一个字符），\"A\" 是 string。单双引号写反直接编译错误。" },
    { tag: "t5_5", q: "以下代码输出？", code: "Debug.Log(0.1f + 0.2f == 0.3f);", opts: ["True", "False", "报错", "0.3"], a: 1, ex: "浮点数有精度误差，0.1+0.2 ≠ 0.3。浮点比较应该用相减取绝对值 < 一个小阈值。" }
  ],
  cs2: [
    { tag: "t5_6", q: "以下代码输出？", code: "Debug.Log(10 % 3);", opts: ["3", "1", "0", "3.33"], a: 1, ex: "% 取余数：10 = 3×3 + 1。判断奇偶（x%2）、循环轮换（i%n）全靠它。" },
    { tag: "t5_7", q: "以下代码输出？", code: "Debug.Log(10 / 3);", opts: ["3.33", "3", "4", "1"], a: 1, ex: "两个 int 相除结果还是 int，直接丢掉小数（不是四舍五入）。想要 3.33 得把一个数写成 3.0。" },
    { tag: "t5_8", q: "以下代码输出？", code: "Debug.Log(\"a,b,c\".Split(',').Length);", opts: ["1", "2", "3", "6"], a: 2, ex: "Split 按分隔符切分，返回 string 数组，3 段所以 Length=3。CSV、路径解析常用。" },
    { tag: "t5_9", q: "以下代码输出？", code: "Debug.Log(\"Unity\".Contains(\"nit\"));", opts: ["True", "False", "报错", "2"], a: 0, ex: "Contains 判断是否包含子串，区分大小写。不区分大小写要先 ToLower 两边。" },
    { tag: "t5_10", q: "以下代码输出？", code: "Debug.Log(\"2024-01-01\".Replace(\"-\", \"/\"));", opts: ["2024/01/01", "2024-01-01", "20240101", "2024/1/1"], a: 0, ex: "Replace 全部替换。字符串不可变，Replace 返回的是新字符串，必须接住返回值。" },
    { tag: "t5_11", q: "以下代码输出？", code: "Debug.Log(\"7\".PadLeft(3, '0'));", opts: ["007", "700", "7", "07"], a: 0, ex: "PadLeft 左侧补齐到指定长度。关卡编号、倒计时 08:05 这类格式化全靠它。" },
    { tag: "t5_12", q: "以下代码输出？", code: "Debug.Log(!true || false);", opts: ["True", "False", "报错", "true"], a: 1, ex: "!true = false，false || false = false。优先级：! 高于 && 高于 ||。" },
    { q: "比较两个字符串内容是否相同，正确的是？", opts: ["s1 == s2 就行，string 重写了 == 比较内容", "必须用 Equals", "== 比较地址永远 False", "用 = 赋值比较"], a: 0, ex: "string 重载了 ==，按内容比较（这是 string 的特权，普通类 == 比引用）。" },
    { tag: "t5_13", q: "以下代码输出？", code: "Debug.Log(\"abc\".CompareTo(\"abd\"));", opts: ["-1（在前）", "1（在后）", "0（相等）", "报错"], a: 0, ex: "CompareTo 按字典序：前两个字符相等，c < d 决定结果为负。排序的底层就是它。" }
  ],
  cs3: [
    { tag: "t5_14", q: "以下代码输出？", code: "int i = 1, s = 0;\nwhile (i <= 5) {\n    s += i;\n    i++;\n}\nDebug.Log(s);", opts: ["5", "10", "15", "20"], a: 2, ex: "1+2+3+4+5 = 15。累加器模式：循环外声明，循环内 +=。" },
    { tag: "t5_15", q: "n = 0 时，do { Debug.Log(n); } while (n > 0); 打印几行？", opts: ["0 行", "1 行（打印 0）", "死循环", "2 行"], a: 1, ex: "do-while 先执行后判断，保证至少一次——这就是它和 while 的全部区别。" },
    { tag: "t5_16", q: "以下代码结束后 c 的值是？", code: "int c = 0;\nfor (int i = 0; i < 2; i++)\n    for (int j = 0; j < 3; j++) {\n        if (j == 1) continue;\n        c++;\n    }", opts: ["2", "3", "4", "6"], a: 2, ex: "内层 j=1 被 continue 跳过，每轮外层只算 j=0,2 两次，2×2=4。continue 只跳内层当前轮。" },
    { q: "switch 表达式（state switch { ... } 直接返回值）需要哪个 C# 版本起？", opts: ["C# 8.0+", "C# 1.0", "C# 5.0", "任何版本都行"], a: 0, ex: "较新的 Unity 已支持。老版本就用传统 switch + 临时变量，功能等价。" },
    { q: "双层嵌套循环里想直接跳出所有层，最清晰的方式是？", opts: ["把内层封装成方法，用 return", "连写两个 break", "用 goto", "加个变量硬熬"], a: 0, ex: "break 只跳出一层；goto 能跳但被公认难维护。封装方法 + return 是干净做法。" },
    { tag: "t5_17", q: "hp = 50 时，以下代码输出？", code: "if (hp < 30) Debug.Log(\"危险\");\nelse if (hp < 80) Debug.Log(\"中等\");\nelse Debug.Log(\"安全\");", opts: ["危险", "中等", "安全", "全都输出"], a: 1, ex: "else-if 从上往下匹配，命中即停。条件顺序错了会被宽条件截胡——先特殊后一般。" },
    { q: "foreach 遍历时给循环变量赋值（x = 5），会？", opts: ["编译错误（迭代变量不可赋值）", "正常修改数组", "只改当前轮", "运行时报错"], a: 0, ex: "foreach 的变量是只读副本。要改元素请用 for 下标，或直接操作 arr[i]。" },
    { tag: "t5_18", q: "以下代码结束后 c 的值是？", code: "int c = 0;\nwhile (true) {\n    c++;\n    if (c == 3) break;\n}", opts: ["2", "3", "死循环", "0"], a: 1, ex: "c 累加到 3 触发 break。while(true)+break 组合要确保 break 条件必然到达。" },
    { q: "只需要\"取一个值\"（如取两数较大者），推荐用？", opts: ["三元运算符（一行）", "if-else 多行", "switch", "递归"], a: 0, ex: "取值用三元 ?:，执行多个语句才用 if-else。代码是写给人读的。" }
  ],
  cs4: [
    { tag: "t5_19", q: "int[,] grid = new int[2, 3]; 则 grid.Length 是？", opts: ["2", "3", "5", "6"], a: 3, ex: "二维数组 Length 是总元素数 = 2×3 = 6。分别取维度用 GetLength(0)/GetLength(1)。" },
    { tag: "t5_20", q: "以下代码输出？", code: "int[] a = { 1, 2, 3 };\nDebug.Log(Array.IndexOf(a, 2));", opts: ["1", "2", "-1", "0"], a: 0, ex: "Array.IndexOf 返回第一个匹配的下标 1；找不到返回 -1。" },
    { tag: "t5_21", q: "以下代码输出？", code: "var list = new List<int> { 1, 3, 5 };\nDebug.Log(list.Find(x => x > 1));", opts: ["1", "3", "5", "-1"], a: 1, ex: "Find 返回第一个满足条件的元素（3）。找不到返回默认值（int 为 0）。" },
    { tag: "t5_22", q: "以下代码输出？", code: "var list = new List<int> { 3, 1, 2 };\nlist.Sort();\nDebug.Log(list[0]);", opts: ["3", "1", "2", "0"], a: 1, ex: "Sort 原地排序成 {1,2,3}，下标 0 是 1。" },
    { tag: "t5_23", q: "以下代码输出？", code: "var a = new List<int> { 1 };\na.AddRange(new List<int> { 2, 3 });\nDebug.Log(a.Count);", opts: ["1", "2", "3", "4"], a: 2, ex: "AddRange 把另一个集合的所有元素追加进来，1+2=3 个。" },
    { tag: "t5_24", q: "以下代码输出？", code: "var d = new Dictionary<string, int>();\nd[\"a\"] = 1;\nd[\"b\"] = 2;\nDebug.Log(d.Count);", opts: ["1", "2", "3", "0"], a: 1, ex: "Count 是键值对个数，2 对就是 2。" },
    { q: "需要\"按键有序\"的字典，应该用？", opts: ["SortedDictionary", "Dictionary", "List", "HashSet"], a: 0, ex: "SortedDictionary 按键自动排序，代价是操作从 O(1) 变 O(log n)。无序要求就老实用 Dictionary。" },
    { q: "要边遍历边删除 List 元素，正确姿势是？", opts: ["倒序 for（从 Count-1 往 0 走）", "正序 foreach 直接 Remove", "一边遍历一边 Add", "用 while(true)"], a: 0, ex: "正序删除会让后面的元素前移导致跳元素；倒序删除不受影响。foreach 里直接 Remove 直接抛异常。" },
    { tag: "t5_25", q: "new bool[2] 的两个元素默认值是？", opts: ["False, False", "True, True", "null, null", "未定义"], a: 0, ex: "数组创建后自动填默认值：数值 0、bool false、引用 null。" }
  ],
  cs5: [
    { tag: "t5_26", q: "以下代码输出？", code: "bool ok = int.TryParse(\"12\", out int n);\nDebug.Log(ok + \"/\" + n);", opts: ["True/12", "False/0", "True/0", "False/12"], a: 0, ex: "TryParse 成功返回 true 且 n=12；失败返回 false 且 n=0。玩家输入解析必备，永不抛异常。" },
    { tag: "t5_27", q: "以下代码输出？", code: "(int, int) GetMinMax() => (1, 9);\nvar r = GetMinMax();\nDebug.Log(r.Item2);", opts: ["1", "9", "(1, 9)", "报错"], a: 1, ex: "元组一次返回多个值，Item1/Item2 取用；也可以命名 (int Min, int Max) 后用 r.Max。" },
    { q: "方法内想修改外部 int 变量并让外部生效，参数要加？", opts: ["ref（或 out）", "params", "this", "static"], a: 0, ex: "值类型默认拷贝副本；ref 传递变量本身。out 侧重\"方法内必须赋值带出\"。" },
    { q: "可选参数（带默认值）必须放在？", opts: ["必选参数之后", "必选参数之前", "任意位置", "只能单独一个方法"], a: 0, ex: "签名顺序：必选在前、可选在后，否则编译错误。命名参数可以打乱调用顺序。" },
    { tag: "t5_28", q: "以下代码输出？", code: "int Double(int x) => x * 2;\nDebug.Log(Double(4));", opts: ["4", "8", "44", "编译错误"], a: 1, ex: "=> 表达式体方法：单行逻辑的最简写法，等价于 return x * 2。" },
    { q: "static 方法里直接访问实例字段 name，会？", opts: ["编译错误（静态上下文没有实例）", "正常访问", "运行时报错", "自动找第一个实例"], a: 0, ex: "static 属于类，实例字段属于对象——没有对象哪来的字段。要么参数传入，要么也声明成 static。" },
    { q: "两个方法同名同参数、只有返回值类型不同，会？", opts: ["编译错误（返回值不构成重载）", "正常重载", "运行时二选一", "自动合并"], a: 0, ex: "重载只看参数列表。返回值不同不足以区分——调用方根本没法告诉编译器要哪个。" },
    { tag: "t5_29", q: "调用 Stats(out int a, out int b)（方法内 a=1, b=2）后，a 和 b 是？", code: "void Stats(out int a, out int b) {\n    a = 1; b = 2;\n}", opts: ["a=1, b=2", "a=0, b=0", "编译错误", "随机值"], a: 0, ex: "out 参数在方法内赋值后带回外部，一次调用带回多个结果——比全局变量干净得多。" }
  ],
  cs6: [
    { tag: "t5_30", q: "以下代码输出？", code: "var p = new Player { Name = \"A\", Hp = 100 };\nDebug.Log(p.Name);", opts: ["A", "Player", "null", "报错"], a: 0, ex: "对象初始化器在 new 的同时给字段/属性赋值，一行完成构造配置。" },
    { q: "static 方法里直接访问实例字段 name，会？", opts: ["编译错误", "正常访问", "运行时报错", "访问第一个实例"], a: 0, ex: "静态上下文没有 this 实例。要访问得传入对象，或把字段也声明为 static。" },
    { tag: "t5_31", q: "class Player { public bool IsAlive; } 新建 Player 后 IsAlive 的值是？", opts: ["False", "True", "null", "未定义"], a: 0, ex: "字段默认值：bool 是 false。所有字段都有确定默认值，不会是\"随机数\"。" },
    { tag: "t5_32", q: "player.weapon.damage = 10（weapon 是 Player 的字段），这体现了？", opts: ["组合：一个对象内部持有另一个对象", "继承", "多态", "泛型"], a: 0, ex: "\"有一个\"用组合：玩家有一把武器。点链访问成员就是组合的日常形态。" },
    { q: "对象失去所有引用后会？", opts: ["被 GC 在合适时机自动回收（不保证立即）", "立即从内存删除", "永远占着内存", "需要手动 delete"], a: 0, ex: "C# 托管内存靠 GC。Unity 里引擎对象（GameObject）另有生命周期，Destroy 与 GC 是两套系统。" },
    { q: "没有重写 ToString() 时，Debug.Log(player) 输出？", opts: ["类名（如 Player）", "所有字段的值", "null", "内存地址"], a: 0, ex: "默认 ToString 返回类型全名。重写 ToString 后日志立刻可读——调试小技巧。" },
    { q: "var p = new { Name = \"x\" }; 创建的是？", opts: ["匿名类型对象（Name 只读）", "动态类型", "字典", "报错"], a: 0, ex: "匿名类型用于临时打包数据，属性只读。序列化、跨系统传递还是定义正式类更稳。" },
    { q: "构造函数里调用 virtual 方法（子类重写了它）的风险是？", opts: ["子类还没构造完，可能读到未初始化的状态", "没有风险", "一定报错", "会跳过构造"], a: 0, ex: "基类构造先于子类字段初始化执行，虚方法此时分派到子类版本是危险时机。构造里保持\"只初始化自己\"。" }
  ],
  cs7: [
    { tag: "t5_33", q: "class B : A {} 未重写 A 的 virtual string Hi() => \"A\";，则 new B().Hi() 输出？", opts: ["A", "B", "null", "报错"], a: 0, ex: "没重写就继承父类实现——virtual 是\"可以重写\"不是\"必须重写\"。" },
    { q: "protected 成员可以在哪里访问？", opts: ["本类与子类内部", "任何地方", "只有本类", "同一命名空间"], a: 0, ex: "protected 是\"家族可见\"：父类留钩子给子类的标准方式。外界依然看不到。" },
    { tag: "t5_34", q: "重写 ToString 后 Debug.Log(new Point(1, 2)) 输出？", code: "class Point {\n    public int x = 1, y = 2;\n    public override string ToString() => \"(\" + x + \",\" + y + \")\";\n}", opts: ["(1,2)", "Point", "1,2", "null"], a: 0, ex: "Debug.Log 内部调用对象的 ToString。重写它，日志从\"天书\"变\"情报\"。" },
    { q: "创建子类对象时的构造顺序是？", opts: ["先基类构造，再派生类构造", "先派生类构造", "只执行派生类", "随机"], a: 0, ex: "基类部分是\"地基\"，先打好地基再盖楼。: base(...) 可以传参给基类构造。" },
    { tag: "t5_35", q: "List<Shape> 里装了 Circle 和 Square（各自重写 Draw()），foreach 调用 Draw() 会？", code: "foreach (var s in shapes) s.Draw();", opts: ["各自输出自己的 Draw 实现", "全部输出 Shape 的实现", "只输出第一个", "编译错误"], a: 0, ex: "多态的核心收益：调用方写一遍，行为按实际类型自动分派。" },
    { q: "子类构造函数需要给基类构造传参，语法是？", opts: ["public Child(int h) : base(h) { }", "base(h) 单独一行", "this.base(h)", "无法传参"], a: 0, ex: "构造函数后跟 : base(参数) 把数据上传给基类构造，发生在子类构造体执行之前。" },
    { q: "object 类型在 C# 类型系统中的地位是？", opts: ["所有类型的最终基类", "仅表示空值", "接口的别名", "泛型参数"], a: 0, ex: "任何值都能赋给 object（值类型会装箱）。万物之根，也是类型系统统一的支点。" },
    { q: "用 new 隐藏父类方法（而非 override）时，通过父类引用调用会执行？", opts: ["父类版本（隐藏不参与多态）", "子类版本", "两个都执行", "报错"], a: 0, ex: "override 走运行时类型，new 走声明类型。多态需求一律 override。" }
  ],
  cs8: [
    { q: "接口（interface）内部能声明字段吗？", opts: ["不能（可以有属性，不能有字段）", "可以", "只能有 static 字段", "看访问修饰符"], a: 0, ex: "接口是纯契约：方法、属性、事件的签名。数据存储是实现类的事。" },
    { q: "List<IDamageable> 里装了 Slime 和 Crate（各自实现），foreach 调 TakeDamage 会？", opts: ["各自执行自己的实现", "全部执行第一个类的实现", "报错", "只执行显式转换后的"], a: 0, ex: "接口也是多态：同一份遍历代码，行为按实际类型分派。这是\"面向接口编程\"的核心收益。" },
    { tag: "t5_36", q: "object o = 5; 执行 var s = o as string; 后 s 是？", opts: ["null（转换失败 as 返回 null）", "5", "\"5\"", "报错"], a: 0, ex: "as 失败不抛异常而是 null；is 更进一步还能顺带声明变量：if (o is string s)。" },
    { q: "抽象类可以有构造函数吗？", opts: ["可以（供子类 base 调用），但不能直接 new", "不可以", "必须有", "只能是 private"], a: 0, ex: "抽象类的构造函数是给子类继承链用的，本身禁止实例化——\"有出生流程，不出生\"。" },
    { q: "结构体（struct）能继承类吗？", opts: ["不能，但可以实现接口", "可以继承一个类", "可以继承多个类", "什么都不能实现"], a: 0, ex: "struct 隐式继承 System.ValueType，不能再继承类；实现接口没问题。值类型的继承限制。" }
  ],
  cs9: [
    { q: "接口成员能写 public 关键字吗（传统接口声明）？", opts: ["不能写，默认就是 public", "必须写", "默认 private", "写不写都报错"], a: 0, ex: "接口成员天然公开，写了 public 反而是多余/旧式争议写法。实现类里实现成员必须 public。" },
    { q: "属性 setter 写 private set 的含义是？", opts: ["外部只读、类内部可写", "完全只读", "完全可写", "只能初始化一次"], a: 0, ex: "private set 是\"对外只读、对内可控\"的标准封装，比裸 public 字段安全得多。" },
    { q: "属性里做遍历、查找等重活的主要问题是？", opts: ["调用方以为是字段访问，频繁调用造成性能陷阱", "编译不过", "不能有逻辑", "会内存泄漏"], a: 0, ex: "属性语法上像字段，调用方不会想到里面有循环。重计算请用 GetXxx() 方法名提示成本。" },
    { q: "漏写 public 的类成员，默认访问级别是？", opts: ["private（外部访问报编译错）", "public", "protected", "internal"], a: 0, ex: "C# 默认最严格。\"写了半天外部访问不了\"九成是忘了 public——按需开放是封装的正道。" },
    { q: "\"面向接口编程\"最大的好处是？", opts: ["依赖抽象，替换实现不用改调用方", "代码更短", "运行更快", "不用写注释"], a: 0, ex: "调用方只认契约。换实现（如把文件存档换成云存档）时调用代码一行不动。" },
    { tag: "t5_37", q: "以下代码在 o 是 Slime 时输出？", code: "if (o is IDamageable d) {\n    d.TakeDamage(5);\n    Debug.Log(\"OK\");\n}", opts: ["OK，且 d 可直接调用接口方法", "编译错误", "OK 但 d 不可用", "运行报错"], a: 0, ex: "is 模式匹配：判断成功的同时声明强转后的变量，一步到位。" },
    { q: "struct 可以实现接口吗？", opts: ["可以", "不可以", "只有 class 可以实现接口", "只有抽象类可以"], a: 0, ex: "接口对 struct/class 一视同仁。Unity 里自定义 struct 实现 IEquatable 可优化比较性能。" },
    { q: "接口可以继承（扩展）另一个接口吗？", opts: ["可以，并要求实现者提供全部成员", "不可以", "只能继承抽象类", "只能继承两个"], a: 0, ex: "IListable : IEnumerable 这种\"契约叠加\"很常见，实现类要实现所有父接口成员。" },
    { q: "一个类可以同时实现几个接口？", opts: ["任意多个", "只能一个", "最多两个", "最多三个"], a: 0, ex: "class Enemy : MonoBehaviour, IDamageable, IPickable —— 多能力靠接口叠加，弥补类单继承的限制。" },
    { q: "\"能被伤害\"的敌人和木箱，\"会移动\"的只有敌人。怎么设计最合理？", opts: ["IDamageable 给两者实现，IMoveable 只给敌人", "做一个包含所有功能的基类", "全部塞进一个接口", "复制粘贴代码"], a: 0, ex: "按能力拆小接口，类按需实现——接口设计的\"接口隔离\"原则。" },
    { q: "传统接口成员能写方法体（实现代码）吗？", opts: ["不能，接口只有签名", "可以随便写", "只能写一行", "看心情"], a: 0, ex: "传统接口只有\"做什么\"没有\"怎么做\"；实现写在实现类里。新 C# 的默认接口实现 Unity 环境少用。" },
    { q: "游戏存档系统想支持\"本地存档\"和\"云存档\"随时切换，最佳设计是？", opts: ["定义 ISave 接口，两种存档各自实现，调用方只依赖接口", "写两个完全独立的系统", "只用云存档写死", "把两种方式塞进一个方法"], a: 0, ex: "依赖接口 = 依赖抽象。新增\"存档方式\"只是新增一个实现类，调用方零改动。" }
  ],
  cs10: [
    { tag: "t5_38", q: "List<int> list; 执行 list.Add(1.5) 会？", opts: ["编译错误（1.5 是 double）", "自动转成 1", "转成 1.5 存进去", "运行报错"], a: 0, ex: "泛型在编译期锁死元素类型——这正是它比 ArrayList（object 版）安全的原因。" },
    { q: "泛型集合（如 List<int>）比 object 集合（ArrayList）快的原因是？", opts: ["避免装箱拆箱和强制转换", "泛型会预分配内存", "泛型在 GPU 运行", "没有区别"], a: 0, ex: "object 集合装值类型要装箱（堆分配），取出要拆箱。泛型直接存原类型，零开销。" },
    { q: "List<int> 和 int[] 的核心区别是？", opts: ["List 长度可变、封装了增删查方法；数组定长、访问最快", "完全一样", "数组可以动态扩容", "List 不能遍历"], a: 0, ex: "固定不变的数据用数组（省一层封装），频繁增删用 List。两者都能 foreach。" },
    { q: "default(int) 的值是？", opts: ["0", "null", "-1", "未定义"], a: 0, ex: "default(T) 给类型默认值：数值 0、bool false、引用 null。泛型代码里初始化用。" },
    { q: "以下哪个不是常用的泛型集合？", opts: ["ArrayList", "List<T>", "Dictionary<K,V>", "HashSet<T>"], a: 0, ex: "ArrayList 是非泛型老古董（object 装箱），现代 C# 用 List<T> 替代。" },
    { q: "按玩家分数从高到低排序 List<Player>，最合适的 Sort 用法是？", opts: ["list.Sort((a, b) => b.score.CompareTo(a.score));", "list.Sort();", "list.Reverse();", "list.OrderBy();"], a: 0, ex: "Sort 可接收比较器 Lambda；b 在前实现降序。Lambda 比较器是排行榜的标准写法。" },
    { q: "把 List<T> 转成数组用哪个方法？", opts: ["ToArray()", "ToList()", "ToArray 翻转版", "Copy()"], a: 0, ex: "List.ToArray() 返回 T[]；反方向用 new List<T>(array) 或数组.ToList()（需 LINQ）。" },
    { q: "已知要装 5000 个元素，优化 List 的做法是？", opts: ["new List<int>(5000) 预分配容量", "装满再删", "换成数组再说", "不做处理"], a: 0, ex: "预分配容量避免多次扩容复制，减少 GC 压力——Unity 性能优化的常用细节。" }
  ],
  cs11: [
    { q: "Predicate<int> 等价于哪个委托类型？", opts: ["Func<int, bool>", "Action<int>", "Func<bool, int>", "Delegate"], a: 0, ex: "Predicate<T> 是\"收 T 返回 bool\"的判断委托，List.Find/FindAll 就是它。" },
    { q: "Action 和 Func 的核心区别是？", opts: ["Func 有返回值，Action 没有", "Action 更快", "Func 不能带参数", "没有区别"], a: 0, ex: "Action<in T> 纯执行；Func<in T, out TResult> 最后一个类型参数是返回值。" },
    { tag: "t5_39", q: "以下代码依次输出？", code: "var acts = new List<Action>();\nfor (int i = 0; i < 3; i++)\n    acts.Add(() => Debug.Log(i));\nforeach (var a in acts) a();", opts: ["0、1、2", "3、3、3", "0、0、0", "随机"], a: 1, ex: "闭包捕获的是变量 i 本身而非当时的值——循环结束后 i=3，三个 Lambda 全输出 3。想各自捕获要在循环内复制到局部变量。" },
    { tag: "t5_40", q: "event OnHpChanged 为 null（无人订阅）时，OnHpChanged?.Invoke(hp) 会？", opts: ["安全跳过，不报错", "抛空引用异常", "自动调用默认方法", "编译错误"], a: 0, ex: "?. 空条件运算符：null 就整体跳过。事件触发的标准防 crash 写法。" },
    { q: "静态事件（public static event）最大的风险是？", opts: ["订阅者生命周期难管理，容易内存泄漏", "不能被订阅", "执行特别慢", "无法传参数"], a: 0, ex: "静态事件活到游戏结束，订阅者不退订就一直被引用。对策：OnEnable 订阅、OnDisable 退订成对写。" },
    { q: "事件与\"每帧轮询检查\"相比的优势是？", opts: ["变化时才通知，不用每帧空转检查", "代码一定更短", "没有时序问题", "可以代替 Update"], a: 0, ex: "轮询浪费且有时序毛刺，事件\"发生才广播\"。但高频连续变化（每帧位置）用轮询/每帧读取更合适。" },
    { q: "触发事件前写 OnHpChanged?.Invoke(hp) 中 ?. 的作用是？", opts: ["无人订阅时安全跳过", "强制调用", "异步调用", "复制事件"], a: 0, ex: "事件没有订阅者时是 null，直接调用会 NullReferenceException；?. 是标准防写。" }
  ],
  cs12: [
    { tag: "t5_41", q: "以下代码输出？", code: "int[] n = { 1, 2, 3 };\nDebug.Log(n.Select(x => x * 10).First());", opts: ["1", "10", "30", "123"], a: 1, ex: "Select 把每个元素投影成新值 {10,20,30}，First 取第一个 10。" },
    { tag: "t5_42", q: "空数组执行 FirstOrDefault()（int 类型），结果是？", opts: ["0（int 的默认值）", "null", "抛异常", "-1"], a: 0, ex: "FirstOrDefault 空了给默认值；First 直接抛异常。拿不准有没有就用 OrDefault 版。" },
    { tag: "t5_43", q: "以下代码输出？", code: "int[] n = { 1, 2, 3, 4, 5 };\nDebug.Log(n.Skip(1).Take(2).Count());", opts: ["1", "2", "3", "5"], a: 1, ex: "Skip(1) 跳过 {1}，Take(2) 取 {2,3}。Skip/Take 组合就是 LINQ 分页。" },
    { q: "GroupBy 的用途是？", opts: ["按键把元素分成多组", "排序", "去重", "求和"], a: 0, ex: "GroupBy(key) 返回\"组套元素\"结构：如按类型分组敌人、按日期分组日志。" },
    { tag: "t5_44", q: "以下代码输出？", code: "int[] n = { 1, 2, 3, 4 };\nDebug.Log(n.Where(x => x > 2).First());", opts: ["3", "2", "4", "1"], a: 0, ex: "Where 筛出 {3,4}，First 取 3。链式组合是 LINQ 的读法。" },
    { q: "LINQ \"延迟执行\"的含义是？", opts: ["定义查询时不执行，枚举（如 ToList/foreach）时才真正跑", "永远不执行", "编译时执行", "随机执行"], a: 0, ex: "好处是能自由拼接条件；注意同一查询被枚举两次就跑两遍，需要时 ToList 缓存。" },
    { tag: "t5_45", q: "以下代码的输出顺序是？", code: "Debug.Log(\"A\");\nawait Task.Delay(1);\nDebug.Log(\"B\");", opts: ["A 先于 B（顺序不变，只是中间异步等待）", "B 先于 A", "同时输出", "只有 A"], a: 0, ex: "await 之后的代码在等待完成后继续，A/B 顺序不变。异步不改变\"从上到下\"的书写逻辑。" },
    { q: "同时发起多个网络请求，想等它们全部完成后继续，用？", opts: ["await Task.WhenAll(t1, t2)", "await t1; await t2 逐个", "Task.Run", "Thread.Sleep"], a: 0, ex: "WhenAll 并行等待全部；逐个 await 会串行变慢。完成后 Result 依次取结果。" }
  ]
};
