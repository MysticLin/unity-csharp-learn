// C# 基础课程数据 —— 知识点整理自 GitHub 优质学习仓库（DotNetGuide、微软 C# 文档等）
window.CSHARP_COURSE = {
  id: "cs",
  title: "C# 编程基础",
  short: "C# 基础",
  emoji: "🎯",
  color: "#1cb0f6",
  desc: "为 Unity 游戏开发打地基：从变量到面向对象，从委托到 LINQ。",
  lessons: [
    {
      id: "cs1", title: "变量与数据类型", mins: 10,
      kps: [
        { t: "常用数据类型", d: "int 整数、float/double 小数、bool 真假、string 文本、char 单字符。Unity 中速度等小数习惯用 float，并给字面量加 f 后缀。", c: "int hp = 100;\nfloat speed = 3.5f;\ndouble pi = 3.14159;\nbool isAlive = true;\nstring name = \"Hero\";\nchar grade = 'A';" },
        { t: "var 与 const", d: "var 让编译器自动推断类型；const 声明编译期常量，声明时必须初始化且之后不可修改。", c: "var score = 0;        // 自动推断为 int\nconst int MaxHp = 100; // 常量必须赋初值" }
      ],
      qs: [
        { q: "以下哪个是合法的变量名？", opts: ["3speed", "_speed", "float", "my speed"], a: 1, ex: "变量不能以数字开头、不能含空格、不能用关键字 float。" },
        { q: "float f = 3.14f; 中后缀 f 的作用是？", opts: ["表示字符串", "表示这是 float 类型字面量", "没有意义", "强制四舍五入"], a: 1, ex: "C# 的小数字面量默认是 double，直接赋给 float 会报错，加 f 才行。" },
        { q: "string 是值类型还是引用类型？", opts: ["值类型", "引用类型", "两者都是", "都不是"], a: 1, ex: "string 是引用类型，但它的 == 比较的是内容，用起来像值类型。" },
        { q: "哪个常量声明是正确的？", opts: ["const int a = 5;", "const int a;", "int const a = 5;", "constant int a = 5;"], a: 0, ex: "const 写在类型前，且必须在声明时初始化。" }
      ]
    },
    {
      id: "cs2", title: "运算符与字符串", mins: 10,
      kps: [
        { t: "自增与复合赋值", d: "x++ 先用后加，++x 先加后用；+=、-= 是复合赋值。游戏里常用来计分、计时。", c: "int x = 7;\nint y = x++ + 2;  // y=9，之后 x=8\nint z = ++x + 2;  // x 先变 9，z=11\nscore += 10;      // 等价 score = score + 10" },
        { t: "字符串插值", d: "用 $\"...{变量}...\" 把变量嵌进字符串，比 + 拼接更清晰。", c: "int level = 5;\nstring msg = $\"当前等级：{level}\";" }
      ],
      qs: [
        { q: "int x = 7; int y = x++ + 2; 之后 y 和 x 是？", opts: ["y=8, x=9", "y=9, x=8", "y=10, x=7", "y=9, x=9"], a: 1, ex: "x++ 先取值 7 参与加法得 y=9，然后 x 才自增为 8。" },
        { q: "$\"Level {lv}\" 这种写法叫？", opts: ["字符串插值", "字符串常量", "注释", "转义字符"], a: 0, ex: "$ 开头 + 花括号内嵌变量，就是字符串插值。" },
        { q: "\"abc\".ToUpper() 的结果是？", opts: ["ABC", "abc", "AbC", "编译报错"], a: 0, ex: "ToUpper() 返回全大写的新字符串，原字符串不变。" }
      ]
    },
    {
      id: "cs3", title: "流程控制", mins: 12,
      kps: [
        { t: "分支：if / switch", d: "if-else 处理区间判断；switch 适合等值分支，C# 不允许分支贯穿（每个分支都要 break）。", c: "if (hp <= 0) {\n    Debug.Log(\"游戏结束\");\n} else if (hp < 30) {\n    Debug.Log(\"危险！\");\n}\n\nswitch (state) {\n    case \"idle\":  Walk(); break;\n    case \"run\":   Run();  break;\n    default:      Idle(); break;\n}" },
        { t: "循环：for / while / foreach", d: "for 知道次数；while 按条件；foreach 遍历集合最方便。break 跳出循环，continue 跳过本轮。", c: "for (int i = 0; i < 3; i++) Debug.Log(i); // 0,1,2\n\nforeach (int item in items) {\n    if (item < 0) continue;\n    total += item;\n}" }
      ],
      qs: [
        { q: "for (int i = 0; i < 3; i++) 循环体执行几次？", opts: ["2 次", "3 次", "4 次", "1 次"], a: 1, ex: "i 取 0、1、2 三次，i=3 时条件不成立退出。" },
        { q: "switch 分支里不写 break 会怎样？", opts: ["编译错误（除非分支为空）", "自动继续下一个分支", "死循环", "运行时才报错"], a: 0, ex: "C# 禁止贯穿，除空分支外每个 case 必须以 break/return 等结束。" },
        { q: "while (false) { ... } 中的循环体执行几次？", opts: ["0 次", "1 次", "无限次", "2 次"], a: 0, ex: "条件先判断后执行，false 直接跳过。" }
      ]
    },
    {
      id: "cs4", title: "数组与集合", mins: 12,
      kps: [
        { t: "数组", d: "定长、同类型。Length 是长度，下标从 0 开始。", c: "int[] scores = new int[3];      // 3 个 0\nint[] nums = { 1, 2, 3 };\nscores[0] = 100;                 // 第一个元素\nDebug.Log(scores.Length);        // 3" },
        { t: "List<T> 动态列表", d: "长度可增减，Add/Remove/Contains，游戏里管理背包、敌人列表首选。", c: "List<string> bag = new List<string>();\nbag.Add(\"剑\");\nbag.Remove(\"盾\");\nDebug.Log(bag.Count);            // 注意是 Count 不是 Length" },
        { t: "Dictionary<K,V> 字典", d: "键值对存储，按键快速查找；键不能重复。", c: "Dictionary<string, int> hp = new Dictionary<string, int>();\nhp[\"hero\"] = 100;\nif (hp.TryGetValue(\"hero\", out int v)) Debug.Log(v);" }
      ],
      qs: [
        { q: "int[] arr = new int[3]; 则 arr.Length 是？", opts: ["2", "3", "4", "0"], a: 1, ex: "new int[3] 分配 3 个元素，默认值都是 0。" },
        { q: "从 List 中删除元素用哪个方法？", opts: ["Delete()", "Remove()", "Erase()", "Drop()"], a: 1, ex: "List<T>.Remove(item) 按内容删，RemoveAt(i) 按下标删。" },
        { q: "Dictionary 的键可以重复吗？", opts: ["可以", "不能", "最多重复一次", "看情况"], a: 1, ex: "键必须唯一，重复赋值是\"修改\"而不是新增。" }
      ]
    },
    {
      id: "cs5", title: "方法与参数", mins: 10,
      kps: [
        { t: "方法定义", d: "访问修饰符 + 返回类型 + 名称 + 参数。void 表示无返回值，return 提前结束并返回。", c: "int Add(int a, int b) {\n    return a + b;\n}\n\nvoid TakeDamage(int dmg) {\n    hp -= dmg;\n    if (hp < 0) hp = 0;   // void 可以只写 return;\n}" },
        { t: "ref 与 out", d: "都按引用传参。ref 要求先初始化；out 用于\"额外返回\"，必须在方法内赋值。", c: "void GetBoth(out int a, out int b) {\n    a = 1; b = 2;          // out 必须赋值\n}\nGetBoth(out int x, out int y);" },
        { t: "重载 Overload", d: "同名方法不同参数列表（个数或类型不同），返回值类型不同不算重载。", c: "void Fire(Bullet b) { }\nvoid Fire(Bullet b, int count) { }  // 合法重载" }
      ],
      qs: [
        { q: "ref 和 out 的区别是？", opts: ["ref 需先初始化，out 必须在方法内赋值", "两者完全一样", "out 要求先初始化", "ref 只能用于 int"], a: 0, ex: "ref 是\"带值进带值出\"，out 是\"空手进带值出\"。" },
        { q: "方法重载指的是？", opts: ["同名不同参数列表", "同名同参数", "不同名同参数", "同名但返回值类型不同"], a: 0, ex: "仅返回值类型不同不能构成重载。" },
        { q: "方法中提前结束并返回值用哪个关键字？", opts: ["return", "yield", "break", "exit"], a: 0, ex: "return 返回对应类型的值；void 方法可写 return; 直接结束。" }
      ]
    },
    {
      id: "cs6", title: "类与对象", mins: 12,
      kps: [
        { t: "类的定义与实例化", d: "类是模板，对象是实例。new 在堆上分配并调用构造函数。字段未初始化时 int 等数值默认 0，引用类型默认 null。", c: "class Enemy {\n    public string name;\n    public int hp;\n\n    public Enemy(string name, int hp) {  // 构造函数\n        this.name = name;\n        this.hp = hp;\n    }\n\n    public void Hit(int dmg) { hp -= dmg; }\n}\n\nEnemy goblin = new Enemy(\"哥布林\", 50);" },
        { t: "构造函数", d: "与类同名、不写返回类型，创建对象时自动调用，可重载。", c: "class Enemy {\n    public Enemy() : this(\"无名\", 10) { }   // 链式调用\n    public Enemy(string n, int h) { }\n}" }
      ],
      qs: [
        { q: "new 关键字的作用是？", opts: ["分配内存并初始化对象", "删除对象", "复制一个类", "声明命名空间"], a: 0, ex: "new 创建实例并调用构造函数；对象销毁由 GC 自动管理。" },
        { q: "构造函数的特点是？", opts: ["与类同名且无返回值", "必须返回 int", "不能带参数", "会被子类继承"], a: 0, ex: "构造函数不写返回类型，可以重载、可以带参数。" },
        { q: "字段 int hp 未初始化时默认值是？", opts: ["0", "null", "-1", "未定义"], a: 0, ex: "数值类型默认 0，bool 默认 false，引用类型默认 null。" }
      ]
    },
    {
      id: "cs7", title: "继承与多态", mins: 12,
      kps: [
        { t: "继承", d: "子类自动获得父类成员，用 base 访问父类。C# 类只支持单继承，但接口可以实现多个。", c: "class Monster {\n    protected int hp = 100;          // protected: 子类可访问\n    public virtual void Roar() {     // virtual 允许重写\n        Debug.Log(\"吼！\");\n    }\n}\n\nclass Dragon : Monster {\n    public override void Roar() {    // 重写\n        base.Roar();                 // 复用父类逻辑\n        Debug.Log(\"喷火！\");\n    }\n}" },
        { t: "多态", d: "父类引用指向子类对象，调用的是子类重写后的方法——同一行为不同表现。", c: "Monster m = new Dragon();\nm.Roar();   // 调用 Dragon 的 Roar，输出两行" }
      ],
      qs: [
        { q: "virtual / override 的目的是？", opts: ["允许子类重写方法实现多态", "定义接口", "隐藏字段", "创建线程"], a: 0, ex: "父类 virtual 标记可重写，子类 override 提供新实现。" },
        { q: "base 关键字用于？", opts: ["访问父类成员", "访问子类成员", "声明基类", "泛型约束"], a: 0, ex: "base.方法() 调用父类实现，base(...) 调用父类构造函数。" },
        { q: "C# 关于继承的说法正确的是？", opts: ["类不支持多继承，但可实现多个接口", "完全支持多继承", "接口也只能继承一个", "类可以继承多个类"], a: 0, ex: "C# 用接口弥补单继承的限制：class A : B, I1, I2。" }
      ]
    },
    {
      id: "cs8", title: "接口与抽象类", mins: 12,
      kps: [
        { t: "接口 interface", d: "一份\"能力契约\"：实现类必须提供所有成员。类可实现多个接口，接口成员默认 public。命名习惯以 I 开头。", c: "interface IDamageable {\n    void TakeDamage(int dmg);\n}\n\nclass Enemy : MonoBehaviour, IDamageable {\n    public void TakeDamage(int dmg) { hp -= dmg; }\n}" },
        { t: "抽象类 abstract", d: "不能被实例化的\"半成品基类\"，可同时包含普通实现和抽象成员（子类必须实现）。", c: "abstract class Weapon {\n    public string name;\n    public abstract void Attack();   // 必须由子类实现\n    public void Show() { Debug.Log(name); }  // 普通方法也可有\n}" },
        { t: "怎么选？", d: "表达\"是什么\"（共性+部分实现）用抽象类；表达\"能做什么\"（跨类能力）用接口。Unity 中 IDamageable、IPickable 这类接口非常常用。" }
      ],
      qs: [
        { q: "接口成员的默认访问级别是？", opts: ["public", "private", "protected", "internal"], a: 0, ex: "接口就是对外契约，成员默认 public。" },
        { q: "抽象类里可以写普通实现的方法吗？", opts: ["可以，也能混着写抽象成员", "不可以，只能全抽象", "只能包含属性", "只能写一个方法"], a: 0, ex: "抽象类 = 共享实现 + 抽象成员，这正是它与接口的主要区别。" },
        { q: "想给\"敌人、木箱、墙\"都加上\"可受伤\"能力，最佳做法是？", opts: ["定义 IDamageable 接口让它们实现", "都继承同一个抽象类", "复制粘贴代码", "用 static 变量"], a: 0, ex: "跨类型的能力用接口最灵活，Unity 里还能配合 GetComponent<IDamageable>() 使用。" }
      ]
    },
    {
      id: "cs9", title: "属性与封装", mins: 10,
      kps: [
        { t: "属性 property", d: "带 get/set 的\"智能字段\"，可在读写时加逻辑；{ get; set; } 是自动属性。", c: "class Player {\n    private int hp;\n    public int Hp {\n        get { return hp; }\n        set { hp = Mathf.Clamp(value, 0, 100); } // Unity 的 Clamp\n    }\n    public string Name { get; set; }          // 自动属性\n    public int Age { get; private set; }      // 外部只读\n}" },
        { t: "访问修饰符", d: "public 全开放，private 仅本类（默认），protected 本类+子类，internal 同程序集。" },
        { t: "Unity 常用：[SerializeField]", d: "private 字段本不出现在 Inspector，加 [SerializeField] 可显示并拖拽赋值——既封装又方便配置。", c: "[SerializeField] private float speed = 5f;\npublic float Speed => speed;   // 表达式体只读属性" }
      ],
      qs: [
        { q: "属性的主要作用是？", opts: ["封装字段并控制读写逻辑", "让代码运行更快", "替代方法参数", "定义常量"], a: 0, ex: "属性本质是两个方法（get/set），是面向对象的封装手段。" },
        { q: "public int HP { get; private set; } 表示？", opts: ["外部可读、仅类内部可写", "外部只能写", "完全只读的常量", "谁都能读都能写"], a: 0, ex: "get 公开、set 私有，典型如血量对外展示、内部修改。" },
        { q: "[SerializeField] 的用途是？", opts: ["让 private 字段显示在 Inspector 中", "加密字段", "把 public 变私有", "自动删除字段"], a: 0, ex: "序列化私有的 Enemy 数据，同时保持封装。" }
      ]
    },
    {
      id: "cs10", title: "泛型入门", mins: 10,
      kps: [
        { t: "泛型类型/方法", d: "T 是类型参数，写一次代码适配多种类型：类型安全 + 复用，避免 object 装箱拆箱。", c: "List<int> nums = new List<int>();\nDictionary<string, int> hpMap = new Dictionary<string, int>();\n\nT FirstOf<T>(List<T> list) { return list[0]; }" },
        { t: "泛型约束 where", d: "where T : Component 限定 T 必须是某种类型（或接口），约束越强能调用的成员越多。", c: "T GetOrAdd<T>(GameObject go) where T : Component {\n    var c = go.GetComponent<T>();\n    return c != null ? c : go.AddComponent<T>();\n}" }
      ],
      qs: [
        { q: "List<T> 中的 T 表示？", opts: ["类型参数", "线程 Thread", "模板文件", "异常类型"], a: 0, ex: "T 在使用时被替换为具体类型，如 List<int>。" },
        { q: "泛型的主要优点是？", opts: ["类型安全且可复用，避免装箱", "让网络更快", "减少内存泄漏", "自动生成注释"], a: 0, ex: "编译期检查类型 + 一份代码多用。" },
        { q: "Dictionary<string,int> 中 Add(\"hp\", 1) 时键 \"hp\" 已存在会？", opts: ["抛出异常", "直接覆盖", "静默忽略", "返回 false"], a: 0, ex: "新增重复键抛异常；想覆盖就写 map[\"hp\"] = 1；安全做法是 TryAdd/TryGetValue。" }
      ]
    },
    {
      id: "cs11", title: "委托与事件", mins: 12,
      kps: [
        { t: "委托 delegate", d: "委托是\"能装方法的类型\"，把方法当变量传来传去。系统内置 Action（无返回值）和 Func（有返回值）。", c: "delegate void OnDead(string msg);\n\nOnDead dead = (msg) => Debug.Log(msg);   // Lambda 赋值\ndead(\"英雄倒下了\");\n\nAction<int> onScore = (s) => Debug.Log($\"得分 {s}\");\nFunc<int, int, int> add = (a, b) => a + b;" },
        { t: "事件 event", d: "event 是受保护的委托字段：外部只能 += 订阅、-= 退订，不能直接赋值或调用——典型的发布/订阅模式。", c: "public class Player : MonoBehaviour {\n    public event Action<int> OnHpChanged;\n    void TakeDamage(int d) {\n        hp -= d;\n        OnHpChanged?.Invoke(hp);   // 安全调用\n    }\n}" },
        { t: "在 Unity 中的用途", d: "UI 刷新、成就触发、AudioManager 播音……事件让系统解耦：玩家只管\"广播\"，谁关心谁订阅。" }
      ],
      qs: [
        { q: "委托 delegate 的本质是？", opts: ["可以持有方法的类型", "类的集合", "一种接口", "一种枚举"], a: 0, ex: "委托让方法能作为参数传递、存储和调用。" },
        { q: "Action<int> 表示什么签名？", opts: ["无返回值、一个 int 参数", "返回 int 的方法", "无参数方法", "返回 bool 的方法"], a: 0, ex: "Action 无返回值；有返回值用 Func<int, TResult>。" },
        { q: "event 字段与普通 public 委托字段的区别？", opts: ["外部只能 +=/-=，不能直接赋值或调用", "执行更快", "只能静态使用", "没有任何区别"], a: 0, ex: "event 防止外部覆盖整条订阅链或冒充发布者触发。" }
      ]
    },
    {
      id: "cs12", title: "Lambda、LINQ 与异步", mins: 14,
      kps: [
        { t: "Lambda 表达式", d: "(参数) => 表达式，匿名方法的简写。C# 里随处可见，也是理解协程回调、事件订阅的基础。", c: "Action say = () => Debug.Log(\"hi\");\nFunc<int, int> square = x => x * x;\nbtn.onClick.AddListener(() => OpenBag());  // Unity 常用" },
        { t: "LINQ 快速查询", d: "对集合做 Where 筛选、Select 变换、OrderBy 排序等，链式书写，返回惰性序列。", c: "var strong = enemies\n    .Where(e => e.hp > 100)\n    .OrderBy(e => e.hp)\n    .Select(e => e.name)\n    .ToList();\nvar first = enemies.FirstOrDefault(e => e.isBoss);" },
        { t: "async/await", d: "异步不阻塞：await 时把控制权还给调用者，完成后再继续。游戏服务器请求、文件读写常用；Unity 主线程逻辑仍多用协程。", c: "async Task<string> LoadNameAsync() {\n    var data = await FetchAsync();\n    return data.name;\n}" }
      ],
      qs: [
        { q: "enemies.Where(e => e.hp > 100) 返回什么？", opts: ["筛选后的 IEnumerable 序列", "一个 bool", "int 数量", "void"], a: 0, ex: "Where 返回满足条件的元素序列，常用 ToList() 立即执行。" },
        { q: "async 方法的推荐返回类型是？", opts: ["Task 或 Task<T>", "只能是 void", "int", "string"], a: 0, ex: "void async 仅供事件处理器，无法等待其完成，一般应返回 Task。" },
        { q: "await 的作用是？", opts: ["异步等待结果完成且不阻塞调用线程", "暂停整个游戏", "强制立即完成", "同步阻塞主线程"], a: 0, ex: "await 挂起当前方法、让出线程，任务完成后再恢复执行。" }
      ]
    }
  ]
};
