// 知识点详解库 —— key = 课程id_知识点序号，内容：more 深入讲解 / pit 常见坑 / tip 实战建议
window.KP_DETAILS = {
  // ================= C# 基础 =================
  cs1_0: {
    more: [
      "值类型（int/float/bool/char/结构体）直接存数据，赋值时复制一份；引用类型（string/类/数组）存的是内存地址，赋值时共享同一份。这解释了为什么把一个类对象传给方法改属性，原对象也会变。",
      "float 精度约 7 位有效数字，double 约 15 位。游戏开发里位置、速度用 float 足够且更快（GPU 就是 float 世界），金额等精确计算才考虑 decimal。",
      "int 和 float 混算要注意：5 / 2 = 2（整数除法丢小数），5f / 2 = 2.5。血量百分比算错九成是这个原因。",
      "string 的不可变性：每次\"修改\"其实是创建新字符串，所以高频拼接要用 StringBuilder。"
    ],
    pit: "写 0.5 这种小数字面量默认是 double，直接赋给 float 会编译报错，必须写 0.5f。",
    tip: "Unity 里速度、距离、百分比一律 float + f 后缀，和引擎 API 保持一致，避免隐式转换。"
  },
  cs1_1: {
    more: [
      "var 不是\"无类型\"，也不是动态类型（那是 dynamic），只是让编译器帮你推断——var x = 5; 之后 x 就永远是 int，再赋 \"abc\" 会直接报错。",
      "var 的价值：类型名太长时（Dictionary<string, List<int>>）大幅简化书写；但类型不明显时（var r = Get()）会降低可读性，团队里一般约定\"右侧能一眼看出类型才用 var\"。",
      "const 是编译期常量，值被直接写进 IL 代码；如果常量可能随配置变化，应该用 static readonly（运行时初始化）。"
    ],
    pit: "var 声明时必须初始化（编译器要靠它推断类型），var a; 直接报错。",
    tip: "Unity 里 MaxHp、最大速度这类\"规则上限\"用 const，从 Inspector 读的配置用普通字段。"
  },
  cs2_0: {
    more: [
      "x++ 与 ++x 的区别：前者\"先返回原值再自增\"，后者\"先自增再返回新值\"。单独一行写 x++ 和 ++x 效果一样，混在表达式里才天差地别。",
      "为了可读性，很多团队规范禁止在复杂表达式里使用 x++，宁可拆成两行——数清楚 y = x++ + ++x - x-- 这种题是面试乐子，实际代码里是事故。",
      "复合赋值 +=、-=、*= 还有一点隐藏福利：对事件来说 score += 10 与 score = score + 10 等价，但 event 的 +=/-= 是订阅语法，别弄混两个语境。"
    ],
    pit: "Unity 里在 Update 用 frame++ 计帧没问题，但用 float 计时时要写 timer += Time.deltaTime，直接 timer++ 记的是帧数不是秒。",
    tip: "计分、计时、连击数都放心用 +=，语义比长赋值式清晰得多。"
  },
  cs2_1: {
    more: [
      "插值字符串 $\"...\" 里可以放任意表达式：$\"得分：{score * 2}\"，也可以带格式化：$\"{hp:F0}\"（保留 0 位小数）、$\"{time:0.0}s\"。",
      "C# 11 之后支持原始字符串与多行插值，但 Unity 至今用的 C# 版本偏保守，$\"{}\" 是最稳的写法。",
      "调试时还想看变量名本身，可以用 $\"{nameof(score)}={score}\" 输出 score=100，日志更好排查。"
    ],
    pit: "忘了写 $ 前缀，{level} 会被当成普通文字原样输出——日志里出现大括号八成是这个原因。",
    tip: "UI 文本刷新（分数、倒计时）全部用插值，比 + 拼接可读性强一个档次。"
  },
  cs3_0: {
    more: [
      "if 的条件必须是 bool，不像 C/C++ 能写 if (hp) —— C# 强制你表达清楚 hp > 0 还是 hp == 0，消灭一整类歧义 bug。",
      "switch 在 C# 8+ 还有\"表达式形式\"：string label = state switch { \"idle\" => \"待机\", \"run\" => \"奔跑\", _ => \"未知\" };Unity 较新版本已支持，状态机文案转换特别好用。",
      "多个 else if 判断同一变量的区间时，从最特殊到最一般排列，否则会被前面的宽条件\"截胡\"。"
    ],
    pit: "把 if (x = 5) 写成赋值——C# 里这是编译错误（if 要 bool），反而是好事；真正的坑是 if (x == 5); 后面多了个分号导致语句体为空。",
    tip: "敌人 AI 状态判断超过 3 种时，用 switch 或枚举 + switch，比一长串 if-else 好维护。"
  },
  cs3_1: {
    more: [
      "for 和 while 本质相同，for 把\"初始化/条件/步进\"收在一行，适合已知次数；foreach 底层调用迭代器，不能在遍历中增删集合元素（会抛 InvalidOperationException）。",
      "需要提前退出用 break；只跳过本轮用 continue；嵌套循环里要直接跳出多层，可以把逻辑抽成方法用 return，比 flag 变量干净。",
      "Unity 中每帧 Update 里的循环要控制规模：对几千个敌人做 O(n²) 双重循环，帧率会当场去世。"
    ],
    pit: "while (true) 忘写 break/return = 死循环，编辑器直接假死，只能强杀进程。",
    tip: "遍历 List/数组一律 foreach 或 for；要边遍历边删除时，倒序 for（i 从后往前）是标准解法。"
  },
  cs4_0: {
    more: [
      "数组是连续内存，随机访问 O(1)，但长度天生固定——想\"加一个\"只能新建更大数组再整体复制，这就是 List<T> 诞生的原因。",
      "多维数组 int[,] 与交错数组 int[][] 是两种东西：前者矩形，后者是\"数组的数组\"，每行可以不一样长。游戏地图网格常用 int[,]。",
      "Array 类提供了大量静态工具：Array.Sort 排序、Array.Reverse 反转、Array.IndexOf 查找、Array.Copy 复制，先查库再手写。"
    ],
    pit: "访问 arr[arr.Length] 会越界（下标最大是 Length-1），越界抛 IndexOutOfRangeException，Unity 里会在 Console 直接红字。",
    tip: "游戏关卡数据（波次、掉落表）用数组或二维数组表达最直观，配 foreach 消费。"
  },
  cs4_1: {
    more: [
      "List<T> 内部也是数组，容量不够时自动扩容（翻倍复制）。能预估大小时 new List<T>(1000) 预分配容量，可避免反复扩容产生的 GC 压力——Unity 里 GC 卡顿就是性能杀手。",
      "常用方法速记：Add 加、Remove 按对象删、RemoveAt 按下标删、Insert 插入、Contains 是否包含、IndexOf 找位置、Sort 排序、Clear 清空。",
      "Remove 是 O(n)（要移动后续元素），高频删除场景考虑 HashSet（无序）或 LinkedList；倒序遍历删除是 List 的经典姿势。"
    ],
    pit: "遍历时 foreach 里 Remove 会直接抛异常；另外 Count 是个数，Length 是数组用的，混写会编译错误。",
    tip: "背包、敌人波次、技能冷却列表全用 List<T>；成员固定且不增删时再退回数组省一点内存。"
  },
  cs4_2: {
    more: [
      "Dictionary 内部是哈希表：键经过哈希函数定位桶，查找接近 O(1)。代价是无序（遍历顺序不保证与插入一致）和键必须正确实现 GetHashCode/Equals。",
      "读不存在的键直接抛 KeyNotFoundException，安全姿势有两种：TryGetValue 一次拿值+判断，或 ContainsKey 先判断（会查两次，略慢）。",
      "游戏里最经典用途：以 string/枚举为键的配置表（敌人类型→属性）、计数器（每个 Tag 出现次数）、物品 id→物品数据。"
    ],
    pit: "用可变对象当键（比如改了字段的对象），哈希变了就再也取不出来——键请用 string、枚举、int 这类不可变类型。",
    tip: "TryGetValue 的 out 写法一行搞定查找+取值，是面试和实战都爱的惯用法。"
  },
  cs5_0: {
    more: [
      "参数传递默认是\"值拷贝\"：传 int 改的是副本；传类对象改的是副本指向的对象属性（会影响原对象），但让副本指向新对象不影响原引用——理解这句，引用类型传参就通透了。",
      "方法签名 = 名称 + 参数列表。返回值不算签名，所以 int Get() 和 string Get() 不能共存。",
      "Unity 的生命周期方法（Start/Update）由引擎按名字反射调用，写错名字（比如手滑 Start1）不报错但不执行，是新手最迷惑的坑之一。"
    ],
    pit: "想修改传入的 int 参数并在外面生效，必须用 ref/out，直接改形参是改了个寂寞。",
    tip: "方法超过 30 行就该考虑拆分；一个方法只做一件事，命名用动词（TakeDamage、SpawnEnemy）。"
  },
  cs5_1: {
    more: [
      "ref：变量必须已初始化，方法里可读可写，用于\"双向传递\"；out：方法内必须赋值，调用方可以现声明变量，用于\"多返回值\"。",
      "C# 7+ 有更优雅的语法糖：元组 (int hp, int mp) GetStatus() 配合解构 var (hp, mp) = GetStatus();，很多 out 场景可以退休。",
      "Unity 里的实际用例：Physics.Raycast(ray, out RaycastHit hit) —— 用 out 把命中信息\"带出来\"，这是引擎 API 的常见设计。"
    ],
    pit: "out 参数在方法内所有路径都必须赋值，漏赋值编译不过；ref 调用方也必须写 ref 关键字，两处都不能省。",
    tip: "Raycast 类 API 的 out 参数配合 var 一起用：if (Physics.Raycast(ray, out var hit)) { hit.point... }。"
  },
  cs5_2: {
    more: [
      "重载解析按\"参数类型与个数\"在编译期决定调用谁，与返回值无关。可选参数（void Fire(int count = 1)）也能起到类似重载的效果，两者别堆在一起用，容易歧义。",
      "Unity 源码里到处是重载：Instantiate 有 1/2/3 参数版本、Debug.Log 可传 object——好 API 让简单场景零成本调用。",
      "重载不是重复：共享逻辑应抽成私有方法，各重载只做参数归一化，否则改一处漏三处。"
    ],
    pit: "两个重载只有 int 和 float 参数区别时，传字面量 1 可能有歧义；显式写 1f 或 1 选择版本。",
    tip: "给常用方法加\"便捷重载\"（默认参数版），核心逻辑放在参数最全的那一个里。"
  },
  cs6_0: {
    more: [
      "类成员四类：字段（存数据）、属性（受控读写）、方法（行为）、构造函数（出生逻辑）。this 指当前实例，用于区分同名字段与参数。",
      "static 成员属于类本身而非实例：Math.Clamp 不用 new Math 就能用。游戏里 GameManager.Instance、工具类方法都靠 static。",
      "对象什么时候被销毁？没有任何引用指向它时交给 GC。Unity 里要额外注意：Destroy 销毁的是引擎侧物体，C# 包装对象要等 GC——所以空引用判断（== null）Unity 做了特殊重载。"
    ],
    pit: "字段命名冲突：构造函数参数叫 name，直接 name = name 是自己赋值给自己，要写 this.name = name。",
    tip: "Enemy、Bullet 这类\"会有很多实例\"的类，字段里别塞大数组，公共数据抽成共享的配置类。"
  },
  cs6_1: {
    more: [
      "不写构造函数时编译器自动送一个无参构造；一旦手写了带参构造，无参的就没了，new Enemy() 会报错——需要时必须手动补写。",
      "构造函数重载链：: this(...) 或 : base(...) 可以复用别的构造逻辑，避免复制粘贴初始化代码。",
      "Unity 的特殊性：MonoBehaviour 挂载由引擎负责，不能用 new 创建，初始化逻辑写 Awake/Start 而不是构造函数——构造时机不受你控制，且序列化发生在构造之后。"
    ],
    pit: "在 MonoBehaviour 的构造函数里访问 GameObject/Transform 会得到意外结果甚至报错，初始化请进 Awake。",
    tip: "纯数据类（伤害公式、配置）随便用构造函数；继承 MonoBehaviour 的类永远用 Awake/Start。"
  },
  cs7_0: {
    more: [
      "继承表达\"is-a\"：Dragon is a Monster。子类自动拥有父类的字段方法，构造时先执行父类构造再执行子类构造。",
      "sealed 关键字禁止再被继承；protected 让成员\"家族内部可见\"——父类留的\"钩子\"常用 protected virtual。",
      "Unity 里你已经在用继承：MonoBehaviour 本身就是庞大的继承链，每个自定义脚本都是它的子类，引擎通过基类引用统一管理成千上万个组件。"
    ],
    pit: "继承是为复用与多态，不是为了\"代码放一起\"——强行让 Player 继承 Enemy 这种\"为复用而继承\"是典型的设计坏味道。",
    tip: "继承层次尽量浅（2~3 层以内），\"敌人→远程敌人→狙击手\"这种自然分层最健康。"
  },
  cs7_1: {
    more: [
      "多态三要素：父类引用、子类对象、虚方法重写。好处是\"新增一种敌人，调用代码一行不改\"——switch(敌人类型) 全删掉。",
      "abstract 方法 = \"子类必须实现\"；virtual 方法 = \"子类可选重写\"。重写时用 override，隐藏时用 new（危险，容易造成两个版本行为不一致）。",
      "Unity 的 OnTriggerEnter/Update 全是 virtual，你每天都在 override 引擎的虚方法——这就是框架用多态倒过来调用你的代码（控制反转）。"
    ],
    pit: "用 new 隐藏而非 override 重写时，通过父类引用调用走的是父类版本，出现\"明明改了却没生效\"的灵异现象。",
    tip: "伤害计算、AI 决策这类\"每种敌人不一样\"的逻辑做成 virtual，是最容易体会多态价值的练习。"
  },
  cs8_0: {
    more: [
      "接口只声明\"能做什么\"，不写\"怎么做\"。C# 8 后接口可以有默认实现，但 Unity 环境版本较旧，按\"纯契约\"理解最稳。",
      "一个类可实现多个接口：class Boss : MonoBehaviour, IDamageable, IDroppable —— 多重\"能力\"靠接口组合，这正是 C# 用接口替代多继承的思路。",
      "Unity 实战名场面：foreach (var d in collided.GetComponents<IDamageable>()) d.TakeDamage(10); —— 不管撞到的是敌人还是木箱，有接口就处理。"
    ],
    pit: "接口变量可以调用接口成员，但不能访问实现类的其他成员；需要的话先 as/as-is 判断再强转。",
    tip: "给\"可受伤、可拾取、可交互\"建 IDamageable/IPickable/IInteractable 三个接口，代码立刻解耦。"
  },
  cs8_1: {
    more: [
      "抽象类 = 部分实现的模板：公共代码写好，变化的部分留 abstract 给子类。子类必须实现所有抽象成员，否则自己也得声明为抽象类。",
      "抽象类可以有字段、构造函数、普通方法；接口（传统上）只有方法签名与属性声明。抽象类是\"是什么\"，接口是\"能做什么\"。",
      "Unity 常见模式：abstract class EnemyBase : MonoBehaviour { public abstract void Attack(); protected virtual void Die() {...} }——公共血量逻辑写一次，每种敌人只写攻击。"
    ],
    pit: "抽象类不能 new；\"忘了实现某个抽象方法\"在编译期就会报错，所以放心重构。",
    tip: "当两个类有一大段相同代码但另一部分完全不同时，就是抽抽象类的信号。"
  },
  cs8_2: {
    more: [
      "经验法则：为\"跨家族的能力\"用接口（敌人和宝箱都能被伤害）；为\"同家族的共性实现\"用抽象类（所有敌人共享移动逻辑）。",
      "多个抽象类不能同时继承，但接口可以叠很多个——需要\"多身份\"时接口是唯一出路。",
      "重构路径：先写重复代码→抽抽象类→发现某块能力别的家族也要→再把那块提成接口。不要一开始过度设计。"
    ],
    pit: "接口里放实现细节字段（传统接口不能有字段）会设计卡壳，说明该用抽象类了。",
    tip: "命名 IDamageable 以 -able/-ible 结尾读起来最自然：IInteractable、IDestructible。"
  },
  cs9_0: {
    more: [
      "属性是\"穿马甲的方法\"：get/set 里可以加校验、事件通知、懒加载。调用方感觉像字段，类内部保持完全控制——封装的精髓。",
      "自动属性 { get; set; } 背后是编译器生成的隐藏字段；init（C# 9）让属性只能在初始化时赋值，适合配置数据。",
      "计算属性不存值：public bool IsDead => hp <= 0; 每次访问现算，永远和 hp 一致，避免了\"忘记同步 bool\"的经典 bug。"
    ],
    pit: "在 get 里做重活（遍历、查找）会被当成\"字段访问\"频繁触发，性能炸裂还不易察觉——重计算请用 GetXxx() 方法，名字上提醒调用方。",
    tip: "Player.Hp、GameTime 这类对外状态用属性，配合 setter 里的事件通知实现 UI 自动刷新。"
  },
  cs9_1: {
    more: [
      "六个常用级别从开放到封闭：public > protected internal > internal > protected > private protected > private。记住四个主力：public、private、protected、internal 就够用。",
      "默认值规则：类成员不写修饰符默认 private；顶层类默认 internal。\"按需开放\"是铁律，先全 private，谁要用再升。",
      "Unity 的 SerializeField 体系与访问级别配合：private + [SerializeField] 给编辑器，public readonly 给运行时只读访问。"
    ],
    pit: "为了\"方便调试\"把字段全设 public，三个月后没人知道谁在改它——排查逻辑 bug 时 public 裸字段是灾难。",
    tip: "暴露只读视图：private 字段 + public 只读属性（get 或 => ），写入只走方法（TakeDamage）。"
  },
  cs9_2: {
    more: [
      "[SerializeField] 是 Unity 序列化系统的\"后门\"：默认只序列化 public 字段，加上它后 private 字段也会进 Inspector 和场景存档。",
      "反向操作 [System.NonSerialized]：public 字段不想被 Inspector 显示和存档时用它，否则重进场景字段值会被序列化值覆盖。",
      "[Header(\"移动参数\")][Range(0,10)] 这些配套特性能把 Inspector 打理成专业工具面板，给策划调参极大减负。"
    ],
    pit: "private + [SerializeField] 的字段在代码里改名，Inspector 里已拖的引用会丢（序列化按名字匹配），改名字段要重新拖。",
    tip: "团队规范推荐：所有 Inspector 字段一律 private + [SerializeField]，需要外部读的再加只读属性。"
  },
  cs10_0: {
    more: [
      "泛型在编译期确定类型，运行时没有装箱拆箱开销：List<int> 存的就是 int 数组，而 ArrayList 存 object 装 int 要装箱，性能差一截。",
      "写一个泛型方法顶过去十份复制粘贴：T Max<T>(T a, T b) where T : IComparable => a.CompareTo(b) > 0 ? a : b; —— int、float、string 通吃。",
      "Unity 里泛型无处不在：GetComponent<T>()、EventSystem 泛型回调、对象池 Pool<T>——学会\"把类型当参数\"是迈向框架级代码的第一步。"
    ],
    pit: "泛型类里不能写 T[] arr = new T[100]（编译器不知道 T 长啥样），要用 Array.CreateInstance 或 List<T> 变通。",
    tip: "发现自己在复制粘贴只有类型不同的两个方法时，立刻改写成泛型。"
  },
  cs10_1: {
    more: [
      "常用约束：where T : class / struct（引用或值类型）、where T : Component（Unity 组件）、where T : new()（有无参构造）、where T : ISerializable（接口）。",
      "约束越具体，泛型代码里能调用的成员越多：约束到 Component 后就能直接访问 transform、gameObject。",
      "通用对象池签名：T Get<T>() where T : Component —— 一个池子系统服务所有组件类型，这就是约束带来的表达力。"
    ],
    pit: "约束写太多会让调用方永远凑不齐条件，\"够用就好\"，先写最少必要约束。",
    tip: "工具类方法（GetOrAdd、EnsureComponent）加 where T : Component 约束，Unity 项目必备工具箱。"
  },
  cs11_0: {
    more: [
      "委托三步：声明类型 delegate void Handler(int)、创建实例 Handler h = 方法或 Lambda、调用 h(5)。调用前判空 h?.Invoke(5) 防止没人订阅时炸。",
      "多播委托：h += a; h += b; 调用一次俩都执行，返回值取最后一个。-= 移除指定订阅。",
      "内置三兄弟：Action（无返回）、Func<T,TResult>（有返回）、Predicate<T>（返回 bool），90% 场景不用自己声明委托类型。"
    ],
    pit: "多播委托异常会中断后续调用；把方法名当变量传时写错了名字（方法组）有时报错晦涩，优先用 Lambda。",
    tip: "把\"打完一枪后做什么\"设计成 Action 参数，技能系统立刻灵活：Fire(() => PlaySound(), () => SpawnFx())。"
  },
  cs11_1: {
    more: [
      "事件模型三角色：发布者（Player 声明 event Action<int> OnDied）、订阅者（UI、音效、成就系统各自 += 回调）、触发（OnDied?.Invoke(hp)）。",
      "订阅是引用，别忘了退订：场景切换后旧对象还订阅着事件，回调里访问已销毁对象 = MissingReferenceException。标准做法 OnEnable += / OnDisable -=。",
      "静态事件（public static event）全局可见最方便也最危险，谁都能订阅也谁都不退订，注意生命周期。"
    ],
    pit: "在 Lambda 订阅里用了 this，却没在 OnDisable 里退订——对象销毁后事件再触发就引用已销毁的 Unity 对象。",
    tip: "事件命名用过去时表达\"已发生\"：OnDied、OnScoreChanged、OnLevelLoaded，订阅方语义一目了然。"
  },
  cs11_2: {
    more: [
      "解耦收益实例：玩家血量变化时 UI、成就、音效都要响应——用事件，玩家类一行都不用改；直接在玩家里写 UI 更新，三者就焊死了。",
      "事件驱动的代价：执行顺序不可控、调用链不再直观。简单小项目里\"直接引用调用\"更直白，别为了模式而模式。",
      "Unity 官方新方案 UnityEvent（按钮 onClick 就是它）：可在 Inspector 里拖拽绑定，适合策划配置；纯代码系统内用 C# event 更轻量。"
    ],
    pit: "把所有通信都改成事件会让流程\"满天飞\"难调试——高频且必须有顺序的调用（每帧移动逻辑）走直接引用。",
    tip: "玩家/游戏状态这类\"一变多处响应\"用事件；一次性的流程调用（开门、生成敌人）直接方法调用。"
  },
  cs12_0: {
    more: [
      "Lambda 闭包会\"捕获\"外部变量本身而不是值：for 里 10 个 Lambda 共享同一个 i，全输出最终值——想各自捕获要局部变量复制一份（for 里声明 int copy = i）。",
      "Lambda 可以转委托也可以转表达式树（LINQ to SQL 用），游戏开发里只关心委托形态。",
      "Unity 事件订阅 + Lambda 是黄金组合：btn.onClick.AddListener(() => StartGame(difficulty)); 捕获参数比写独立方法灵活。"
    ],
    pit: "订阅了 Lambda 就没法 -= 退订（每次都是新实例），需要退订的场景要保存委托实例或用具名方法。",
    tip: "一行逻辑用 Lambda，超过三行用具名方法——代码可读性优先。"
  },
  cs12_1: {
    more: [
      "LINQ 是\"声明式\"：你描述要什么，怎么遍历引擎决定。Where 筛选、Select 变换、OrderBy 排序、First/FirstOrDefault 取头、Any 存在判断、Count 计数。",
      "LINQ 是惰性的：Where 不立刻执行，到 ToList()/First() 才真正跑。好处是能链式组装，坏处是同一查询被枚举两次就跑两遍。",
      "性能警报：LINQ 有委托与分配开销，Update 每帧对大集合 LINQ 会狂产生 GC。每帧热路径用 for，冷路径（初始化、点击事件）放心 LINQ。"
    ],
    pit: "First() 找不到元素直接抛异常，拿不准就用 FirstOrDefault() 判 null——线上崩溃常客。",
    tip: "配置过滤、排序背包展示这类低频操作用 LINQ 极爽；每帧的战斗计算用普通循环。"
  },
  cs12_2: {
    more: [
      "async/await 的本质是状态机：await 处挂起方法、记录后续，任务完成后恢复。它不创建新线程，等待 IO 时线程被释放去干别的。",
      "Unity 的坑：await 后默认回到 Unity 主线程同步上下文，可以安全碰 GameObject；但若配置了 ConfigureAwait(false) 或线程池任务，就不能直接操作 Unity API。",
      "游戏里的典型场景：登录服请求、读存档、下载资源。期间 UI 显示转圈，完成后 await 下方代码继续更新 UI。"
    ],
    pit: "async void 无法被等待且异常会崩出调用栈——除了事件处理器，一律返回 Task/Task<T>。",
    tip: "Unity 中带超时的网络请求可用 CancellationTokenSource 配合 Task.WhenAny 实现，防止服务器无响应卡逻辑。"
  },

  // ================= Unity 核心 =================
  u1_0: {
    more: [
      "Scene 与 Game 是同一世界的两个视角：Scene 是\"上帝视角随便摆\"，Game 是\"某台相机的取景\"。Game 视图顶部可切换显示分辨率，模拟手机竖屏比例。",
      "Hierarchy 支持搜索与拖拽成父子层级；物体多了用空 GameObject 当\"文件夹\"（如 Enemies、UI）分区管理，是团队项目的 hygiene。",
      "Console 的报错点开有堆栈，双击跳转代码行；出现红字时游戏逻辑多半已断，先清零再运行是基本功。"
    ],
    pit: "在 Game 视图里点选物体容易误以为能编辑——它只是预览，摆场景请回 Scene 视图。",
    tip: "Layout 布局切成 2 by 3，Scene 与 Game 同屏，改一处立刻看效果。"
  },
  u1_1: {
    more: [
      "组件化的本质是组合优于继承：不做\"会飞的敌人\"继承链，而是给物体挂 Rigidbody（物理）+ 自定义 Fly 脚本（行为），能力像乐高一样拼装。",
      "每个物体必有 Transform（位置/旋转/缩放）；勾掉组件左上角开关可临时停用它（脚本停用后 Update 不再执行，但 OnEnable/OnDisable 会触发）。",
      "Add Component 菜单就是你的\"能力库\"：物理、音频、粒子、导航，以及你自己写的所有脚本。"
    ],
    pit: "删组件（Remove Component）和禁用是两码事：禁用可随时恢复，删除数据就没了。",
    tip: "看不懂别人项目时，先读物体上的组件清单——组件列表就是这个物体的\"简历\"。"
  },
  u1_2: {
    more: [
      "Prefab 三大好处：复用（拖 100 个敌人）、批量修改（改模板全同步）、运行时实例化（Instantiate 的源）。",
      "嵌套 Prefab 与 Prefab Variant（变体）：Variant 继承母体并覆盖差异，比如\"精英怪 = 普通怪变体 + 血量翻倍 + 换颜色\"。",
      "场景实例上改了属性，Inspector 会显示覆盖标记（蓝条/小箭头），可单独 Overrides 覆盖或 Revert 还原到模板。"
    ],
    pit: "直接把场景物体拖到 Project 里时若同名 Prefab 已存在会变成覆盖操作，注意别把模板覆盖了。",
    tip: "子弹、特效、掉落物、敌人——凡是运行时会复数出现的物体，一律先做成 Prefab 再说。"
  },
  u2_0: {
    more: [
      "MonoBehaviour 是引擎与你的代码之间的契约：引擎在恰当时机调用你重写的生命周期方法，你的代码通过 GetComponent/transform 等成员访问引擎能力。",
      "两个容易忽略的成员：gameObject（当前物体）、transform（当前物体的 Transform 组件，高频到引擎给了快捷属性）。",
      "不继承 MonoBehaviour 的普通 C# 类（数据类、工具类、状态机逻辑）不能挂物体，但性能更好、可自由 new——\"能用普通类就别继承 MonoBehaviour\"是进阶共识。"
    ],
    pit: "类名与文件名不一致时，挂载报\"can't be added\"——Unity 靠文件名定位类。",
    tip: "一个脚本只负责一个职责：PlayerMovement 只管移动，PlayerCombat 只管战斗，别写成千行大杂烩。"
  },
  u2_1: {
    more: [
      "挂载方式三种：拖脚本文件到物体、物体 Inspector 的 Add Component 搜名字、代码 AddComponent<T>()（运行时）。",
      "运行时验证：点击 Play 后 Inspector 字段修改会实时生效，但退出 Play 全部还原——这是测试极限数值的利器，也是\"改了半天白改了\"的惨案高发区。",
      "日志分级：Debug.Log 普通、LogWarning 黄色、LogError 红色；发布版可用条件编译或日志开关统一关闭。"
    ],
    pit: "Play 模式下做的场景改动退出后全部还原；辛苦调了半小时布局，退出编辑器全丢——调完记得退出 Play 再正式保存。",
    tip: "用 [ContextMenu(\"TestFire\")] 给方法加右键菜单，编辑器里不运行也能单测逻辑。"
  },
  u2_2: {
    more: [
      "Inspector 能显示的字段类型：基础类型、Vector2/3、Color、枚举、GameObject/Component 引用（拖拽）、这些类型的数组与 List。",
      "拖拽引用比代码查找好得多：编译期安全（改名自动同步）、零查找开销、依赖一目了然。",
      "字段命名与分组的最佳实践：speed、jumpForce 小驼峰 + [Header(\"Movement\")] 分组 + Tooltip 特性写说明。"
    ],
    pit: "public List<GameObject> 拖引用时，Inspector 显示的是运行时也会保留的序列化值，数组元素拖错物体不易察觉。",
    tip: "把所有可调参数集中放脚本顶部并用 Header 分组，策划和你自己都会感谢这份整洁。"
  },
  u3_0: {
    more: [
      "Awake：保证在任何 Start 之前执行，且对未激活脚本也调用（物体激活时）；适合做引用缓存与自身初始化。Start：保证所有 Awake 已完成，适合访问别家数据。",
      "OnEnable/OnDisable 与激活状态绑定，一对儿适合注册/退订事件——切场景、开关物体都自动成对执行。",
      "Update 每渲染帧一次（帧率越高跑越勤），LateUpdate 在全部 Update 之后（相机跟随专用），OnDestroy 销毁时（退订事件、保存数据）。"
    ],
    pit: "在 Awake 里访问别的物体（可能还没 Awake）会空引用；跨对象初始化一律放 Start。",
    tip: "记住口诀：自己的事 Awake，别人的事 Start，每帧的事 Update，跟在别人后面的事 LateUpdate。"
  },
  u3_1: {
    more: [
      "FixedUpdate 默认每 0.02 秒一次（Edit→Project Settings→Time 可调），与渲染帧率解耦——60 帧和 144 帧显示器上物理行为一致的关键。",
      "Rigidbody 的力、速度修改写在 FixedUpdate；而 Input.GetKey 这类\"当帧输入\"在 FixedUpdate 里可能漏检（同一物理帧可能跑 0~N 次），惯用做法是 Update 里读输入存成变量，FixedUpdate 里用力。",
      "Time.deltaTime 在 Update 里是\"上一渲染帧时长\"，在 FixedUpdate 里是固定步长——统一用 deltaTime 写移动逻辑，两种循环都不怕。"
    ],
    pit: "把 AddForce 写在 Update 且没乘 deltaTime，帧率高的设备上物体飞得更快——\"我电脑上没事，他手机上飞了\"的元凶。",
    tip: "物理调试看 Window→Analysis→Physics Debugger，能可视化所有碰撞体与关节。"
  },
  u4_0: {
    more: [
      "Vector3 是结构体（值类型），transform.position += new Vector3(1,0,0) 合法，但 transform.position.x = 5 不行（position 返回副本）——必须整体赋回。",
      "Translate 默认沿自身坐标（Space.Self），加 Space.World 参数改世界坐标；Rotate 同理。要不要乘 Time.deltaTime 取决于是不是每帧持续运动。",
      "LookAt 让 Z 轴指向目标（2D 项目注意 Z 轴朝里，常用 LookAt(target, Vector3.forward) 变通或直接操作 rotation.z）。"
    ],
    pit: "transform.position.x = 5; 编译错误\"Cannot modify a value type return value\"——这是值类型语义造成的，新手第一大编译坑。",
    tip: "平滑移动公式背下来：transform.position = Vector3.MoveTowards(当前位置, 目标, 速度 * deltaTime);"
  },
  u4_1: {
    more: [
      "父子继承的是 Transform 的位移旋转缩放：父转 90 度，子跟着转。localPosition/localRotation/localScale 是相对值，position 系列是世界值。",
      "SetParent(parent, false) 的 false 表示\"保持本地坐标不变\"，常用于把 UI 元素挂到新面板且不跳位；默认 true 会保留世界坐标导致位置跳变。",
      "实战：武器挂在手部骨骼下、UI 血条挂在敌人头顶、特效挂在枪口——都是父子关系的经典应用。"
    ],
    pit: "子弹生成后忘了 SetParent(null)（脱离父物体），父物体销毁时子弹跟着全没。",
    tip: "层级深了找东西麻烦：Hierarchy 搜索框支持按名字/类型过滤，配合命名规范（Enemy/Ironclad）效率极高。"
  },
  u4_2: {
    more: [
      "查找 API 性能从优到劣：拖拽引用 > transform.Find（仅子树）> FindWithTag（全局标签表）> GameObject.Find（全场景按名，最慢）。",
      "Find 系列只能找激活物体，找不到未激活的——要引用未激活物体（如对象池里的备用子弹），只能拖拽或提前缓存。",
      "Tag 要先在 Tags & Layers 里创建再使用；CompareTag(other.tag) 比 other.tag == \"Player\" 写法性能略好且打错名字编译不报错的风险更小（字符串拼错运行时才发现）。"
    ],
    pit: "GameObject.Find(\"Hero\") 在物体改名后返回 null，静默失败产生空引用——字符串查找请少用。",
    tip: "把常用引用做成 [SerializeField] 拖拽，或单例 Manager 提供 static 访问点，项目中 99% 场景不需要 Find。"
  },
  u5_0: {
    more: [
      "GetComponent 有多个变体：GetComponentInParent（向上含自身）、GetComponentInChildren（向下含自身，深度优先）、GetComponents（取全部）。",
      "性能真相：GetComponent 有开销但没那么恐怖，\"千万别用\"是以讹传讹；正确姿势是高频路径（Update/每发子弹）不重复获取，低频路径随取随用。",
      "TryGetComponent(out var rb)（Unity 2020+）避免 null 判断的分配，是现代写法。"
    ],
    pit: "GetComponent<T>() 找不到返回 null，直接用就 NullReferenceException；判空或 RequireComponent 双保险。",
    tip: "建立自己的工具类：public static T GetOrAdd<T>(this GameObject go) where T : Component —— 扩展方法写一次用整项目。"
  },
  u5_1: {
    more: [
      "RequireComponent 只保证\"组件存在\"，不保证顺序——依赖另一个组件的初始化数据时，还得靠 Awake/Start 的执行阶段约定。",
      "它对策划特别友好：往物体上挂你的脚本，Rigidbody 自动出现，忘加组件这类低级问题从根上消失。",
      "同类思路还有 [DisallowMultipleComponent]（禁止重复挂载），配合使用让脚本组件像正规模块。"
    ],
    pit: "RequireComponent 不会在移除被依赖组件时阻止你——删除 Rigidbody 时 Unity 会提示关联脚本也会被移除。",
    tip: "凡是在代码里 GetComponent 且找不到就废的依赖，统统加 RequireComponent 声明出来。"
  },
  u6_0: {
    more: [
      "三兄弟记忆法：Down 按下那一帧、Key 按住的每一帧、Up 松开那一帧。Jump 必然用 Down（不然按住键疯狂跳），移动用 Key。",
      "KeyCode 枚举覆盖全键盘；老式 Input Manager 还支持自定义轴（Edit→Project Settings→Input Manager），把 W/A/S/D 和方向键映射到同一轴上，一套代码双操作。"
    ],
    pit: "GetKeyDown 在 FixedUpdate 里可能漏帧（物理帧不与输入帧对齐），输入检测放 Update。",
    tip: "键位配置文件 + 重映射系统是商业游戏标配，学习项目至少用 Input Manager 轴做一套 WASD+方向键兼容。"
  },
  u6_1: {
    more: [
      "GetAxis 的平滑来自\"按键时间越久值越接近 1\"的渐入曲线，模拟真实加速；GetAxisRaw 是瞬间 ±1/0，像素级精准但生硬。",
      "手柄摇杆天然输出连续值，GetAxis 直接兼容——这也是它比 GetKey 更\"通用\"的原因。",
      "组合技：移动用 GetAxis，跳跃判定用 GetKeyDown(\"Jump\" 轴)，一个输入方案同时服务键鼠与手柄。"
    ],
    pit: "GetAxis 平滑导致松键后还会滑行几帧，做\"急停\"手感时要么用 Raw，要么自己插值控制曲线。",
    tip: "2D 平台跳跃常用 GetAxisRaw + 自定义加速度，可控性远好于默认平滑。"
  },
  u6_2: {
    more: [
      "移动端触控：Input.touchCount 判断手指数量、GetTouch(i) 取每个手指（position/deltaPosition/tapCount），双指缩放就靠两个 touch 的距离差。",
      "新 Input System 包（Package Manager 安装）用事件驱动：InputAction 注册回调，跨平台自动映射键鼠/手柄/触屏，是官方未来方向。",
      "移动端交互设计：按钮用 UI Button（自带触摸），拖拽用 IPointerDragHandler 接口，只有 3D 场景点击才需要射线检测。"
    ],
    pit: "OnMouseDown 在移动端部分平台表现不稳，正式手游项目建议统一用射线检测或 UI 事件系统。",
    tip: "做手游第一件事：Game 视图切到手机分辨率 + Development Build 真机测试，模拟器手感骗人。"
  },
  u7_0: {
    more: [
      "Rigidbody 属性速览：mass 质量、drag 空气阻力、angularDrag 旋转阻力、useGravity 重力、isKinematic 关闭物理模拟（由代码直接控制位置，但仍触发碰撞事件）。",
      "移动方式选择：AddForce（推力，有加速感）、velocity 直接设置（即时响应，2D 平台常用）、MovePosition（Kinematic 平滑传送）。",
      "碰撞体类型：Box/Sphere/Capsule 基础体（性能好）、MeshCollider 精确网格（贵，凸包Convex 才能参与物理）、复合碰撞体拼形状。"
    ],
    pit: "两个都没有 Rigidbody 的 Collider 相撞不会产生物理回调；至少一方要有刚体（静方可用 Static Collider）。",
    tip: "角色碰撞体首选 Capsule（胶囊）：上圆下圆不卡台阶，几乎所有 3D 角色的默认选择。"
  },
  u7_1: {
    more: [
      "触发器事件三连：OnTriggerEnter 进入、OnTriggerStay 每物理帧停留、OnTriggerExit 离开。持续伤害区域用 Stay（注意配计时器）。",
      "触发器的分层过滤：Layer Collision Matrix（Project Settings→Physics）可以设置哪些层与哪些层互交互，性能与逻辑双收益。",
      "捡金币模板：金币 Collider 勾 IsTrigger + Tag=Coin；玩家 OnTriggerEnter 里 CompareTag(\"Coin\") → 计分 → Destroy/回收进对象池。"
    ],
    pit: "OnTriggerStay 参数也是 Collider，别和 OnCollisionStay(Collision) 弄混——一个拿碰撞体一个拿碰撞信息。",
    tip: "机关区域（毒圈、buff 区）用触发器 + Layer 过滤，代码里只写业务，不用 if 层层判断类型。"
  },
  u7_2: {
    more: [
      "Collision 参数：collision.contacts[0].point 接触点（放打击特效）、relativeVelocity 相对速度（撞击力度→伤害/音量）、collision.rigidbody 对方刚体。",
      "OnControllerColliderHit 是 CharacterController 专用回调；用 CharacterController 就收不到 OnCollisionEnter——两者是两套移动方案。",
      "物理材质（Physic Material）：摩擦与弹性系数。弹球 = 高 bounciness，冰面 = 零摩擦，不用写一行代码。"
    ],
    pit: "撞击伤害用相对速度时注意方向碰撞（迎面相撞 vs 同向追尾）数值差异巨大，通常取 relativeVelocity.magnitude 再乘系数。",
    tip: "落地点检测（着地音效/尘土）用 contacts[0].normal.y > 0.5 判断是\"踩到地面\"而非撞墙。"
  },
  u8_0: {
    more: [
      "Instantiate 克隆的是 Prefab 的完整拷贝（含子物体与组件），第二个参数是位置、第三个是旋转；返回克隆体引用，立刻可 GetComponent 改属性。",
      "Destroy 是\"延迟到帧末\"执行，当场引用还在；DestroyImmediate 立即删（编辑器脚本用，运行时慎用）。Destroy(this) 只删组件，Destroy(gameObject) 删物体。",
      "生成后初始化两段式：Enemy e = Instantiate(prefab, pos, rot); e.Init(hp, level); —— Instantiate 不支持传参，Init 方法补齐配置。"
    ],
    pit: "生成后立刻 Destroy(e, 2f) 又同时改它的属性没问题，但 Destroy(e) 后同一帧再访问组件会 missing。",
    tip: "生成位置常用组合：自身位置 + transform.forward * 距离（枪口前方）、Random.insideUnitCircle（随机范围）。"
  },
  u8_1: {
    more: [
      "Prefab Overrides 窗口（Inspector 顶部）列出实例与模板的所有差异，可逐条 Apply 或 Revert——比肉眼对比可靠。",
      "Unpack（解包）把实例与模板断开关系变普通物体；适合\"这一关的 Boss 要魔改到面目全非\"的场景。",
      "版本管理提醒：Prefab 是 YAML 文本，合并冲突可手动改；但 .unity 场景文件冲突很痛，团队约定\"同一场景同一时间只有一个人改\"。"
    ],
    pit: "把 Prefab 拖进场景后又在代码里 DestroyImmediate 模板相关资源，会破坏 Assets——运行时只用 Destroy。",
    tip: "建 Prefab 文件夹分门别类（Enemies/Projectiles/FX），项目一大找资源全靠目录纪律。"
  },
  u9_0: {
    more: [
      "yield return 家族：null（等一帧）、WaitForSeconds(t)（游戏时间 t 秒）、WaitForSecondsRealtime（真实时间，不受暂停影响）、WaitUntil(() => 条件)（条件成立继续）、嵌套 yield return 另一协程。",
      "协程跟着物体走：物体销毁或禁用（MonoBehaviour 上）协程自动停止——Boss 血条消失时它的连招协程也自然终止。",
      "典型应用：技能连招（前摇→判定的等待→后摇）、开场动画序列、延迟刷怪波次、渐隐渐显（每帧改 alpha 再 yield null）。"
    ],
    pit: "StartCoroutine 字符串版本有反射开销且不支持带参重载，一律用方法调用版 StartCoroutine(MyRoutine(3f))。",
    tip: "把\"流程\"写成协程最符合人类直觉：跳过大量状态机样板代码，剧情脚本系统就是它的豪华版。"
  },
  u9_1: {
    more: [
      "Invoke(\"方法名\", 秒) 只支持无参方法且字符串易拼错；InvokeRepeating 每 n 秒重复（首次也是延时 n），CancelInvoke 全停本物体。",
      "时间缩放关系：Invoke/InvokeRepeating/WaitForSeconds 都受 timeScale 影响，做\"暂停时依然倒计时\"的功能用协程 + WaitForSecondsRealtime。",
      "需要传参、需要条件等待、需要循环中穿插等待——这些场景 Invoke 表达不了，直接上协程。"
    ],
    pit: "InvokeRepeating 一旦启动无法改间隔，只能 Cancel 后重开；高频重复逻辑（每 0.1 秒）用协程 while 循环更可控。",
    tip: "简单一次性延迟（3 秒后开门）用 Invoke 无可厚非；超过一处调用立刻迁移到协程统一管理。"
  },
  u10_0: {
    more: [
      "Canvas 渲染模式三选：Screen Space-Overlay（最常用，UI 永远盖在最上）、Screen Space-Camera（可加相机特效、受相机影响）、World Space（世界中的 3D UI，如血条浮字）。",
      "Canvas Scaler 组件做分辨率适配：Scale With Screen Size + Reference Resolution(如 1920x1080) + Match 0.5（宽高各半权重），一套 UI 全机型通吃。",
      "锚点预设在 RectTransform 左上角的小方格里：四角锁定（全屏拉伸）、边中锁定（跟随边缘）、中心锁定——每个 UI 元素都该想清楚\"它相对谁定位\"。"
    ],
    pit: "所有 UI 挤在一个 Canvas，一个元素变化整个 Canvas 重建（Rebuild），卡顿常客——动态元素（血条、飘字）拆分到子 Canvas。",
    tip: "先定 Reference Resolution 再摆 UI，后期适配的成本几乎为零；后期再改锚点等于重摆。"
  },
  u10_1: {
    more: [
      "TMP 首次使用：Window→TextMeshPro→Import TMP Essential Resources 导入基础资源，否则文本显示为方块。",
      "TMP 富文本标签直接写在文本里：<color=red>-5 HP</color>、<b>加粗</b>、<size=20>大字</size>——伤害飘字、对话高亮全靠它。",
      "Button 交互反馈：Transition 选 Color Tint 设置 Pressed 颜色，加 onClick 音效，手感立刻提升。"
    ],
    pit: "旧 Text 与 TMP 文本混用导致字体风格割裂，新项目全量 TMP（旧 Text 已标记 Legacy）。",
    tip: "Slider/ProgressBar 做血条：fillRect 拖引用，代码只改 value，0~1 归一化最省心。"
  },
  u10_2: {
    more: [
      "onClick.AddListener 三种写法：传具名方法（可退订）、Lambda（带参数）、Inspector 拖拽（策划友好）。同一个按钮可订阅多个回调。",
      "UI 事件接口全家桶：IPointerClickHandler、IDragHandler、IPointerEnterHandler…… 实现接口即可让任意物体接收 UI 事件（需 EventSystem 存在）。",
      "动态列表（背包格子）：实例化 Button 后 AddListener(() => OnItemClick(index))，注意闭包捕获 index 要用局部变量复制。"
    ],
    pit: "AddListener 的 Lambda 无法 -= 移除；需要动态移除订阅时保存 UnityEvent 用 RemoveAllListeners 或用具名方法。",
    tip: "所有按钮点击加统一音效：写个 UIButtonSound 组件自动 AddListener，不用逐个手挂。"
  },
  u11_0: {
    more: [
      "LoadSceneAsync 异步加载模板：开始协程 → AsyncOperation op = SceneManager.LoadSceneAsync(n); → while (!op.isDone) { 进度条 = op.progress; yield return null; }。配合 op.allowSceneActivation 在 0.9 处暂停做\"按任意键继续\"。",
      "Additive 模式（LoadSceneMode.Additive）叠加加载：大厅常驻，战斗关卡动态加载卸载，是模块化场景架构的入门钥匙。",
      "场景间传数据：静态类缓存、DontDestroyOnLoad 单例、或把数据存进即将加载场景的物体（麻烦不推荐）。"
    ],
    pit: "加载场景时场景里未标 DontDestroyOnLoad 的对象全部销毁，事件订阅没退订就会 MissingReferenceException。",
    tip: "加载进度条显示 op.progress * 100 会卡在 90%——因为最后 10% 是激活场景瞬间完成的，配合 allowSceneActivation 平滑到 100%。"
  },
  u11_1: {
    more: [
      "DontDestroyOnLoad 只对\"根物体\"生效：挂在子物体上无效，常见做法是把管理器物体放场景根级。",
      "全局管理器典型阵容：AudioManager（音乐音效）、GameManager（分数/状态）、SaveManager（存档）。各自独立物体+各自脚本，别捏成一个巨型 Manager。",
      "重进场景时 Awake 再次执行，单例要防重复：if (Instance != null) { Destroy(gameObject); return; }。"
    ],
    pit: "DontDestroyOnLoad 的物体在编辑器反复 Play 时残留（Domain Reload 关闭时），调试发现\"怎么有两个 AudioListener\"就是它。",
    tip: "新建空场景专门放所有 Manager 作为启动场景（Build 索引 0），架构立刻清爽。"
  },
  u11_2: {
    more: [
      "单例完整写法五件套：静态属性、Awake 防重、DontDestroyOnLoad、公共访问方法、OnDestroy 清引用。少一件都会在某个场景切换后炸。",
      "服务定位器/依赖注入是单例的进阶替代，学习项目用单例完全够；但要克制数量，全局单例超过 5 个时想想是不是都在偷懒。",
      "跨场景数据（玩家等级、金币）放单例的属性里，配合 PlayerPrefs/文件做持久化，重启游戏也不丢。"
    ],
    pit: "单例的 OnDestroy 里访问已销毁的实例（退出 Play 顺序不确定），加 null 判断防 Application Quit 时的报错。",
    tip: "GameManager.Instance.Score += 10 的写法让所有系统都依赖全局——读写尽量收敛在 Manager 自己的方法里。"
  },
  u12_0: {
    more: [
      "把 Roll-a-Ball 的知识点连成线：输入（GetAxis）→ 物理（AddForce）→ 触发（OnTriggerEnter）→ UI（TMP 计分）→ 场景（胜利切换），这就是完整的\"游戏循环\"认知模型。",
      "官方教程之外的四步扩展路径：加音效反馈→加计时挑战→加关卡选择菜单→把数值抽成 ScriptableObject 配置。每一步都练一个新知识点。",
      "动手前先列\"功能清单\"再排序，比上来就写代码强十倍——这也是做任何游戏的正确开局。"
    ],
    pit: "教程代码照抄能跑，但换个玩法就傻眼——通关的标准是\"不看教程能自己加一个新功能\"。",
    tip: "做完立刻发布一个 WebGL/安卓包给朋友玩，反馈带来的迭代动力远超自己憋。"
  },
  u12_1: {
    more: [
      "相机跟随进阶：Lerp 插值（缓动）→ Cinemachine（FreeLook、VirtualCamera、Dead Zone，专业方案零代码）。学习项目手写，商业项目上 Cinemachine。",
      "2D 与 3D 相机差异：2D 相机只动 X/Y（正交尺寸控制视野），3D 相机还要处理遮挡（图层遮挡淡出）与角度跟随。",
      "跟随抖动根源：相机 Update 跟、玩家 LateUpdate 动（或反之）错帧导致。统一原则：被跟随者 Update 动，相机 LateUpdate 跟。"
    ],
    pit: "相机 Lerp 系数直接写 0.1 不乘 deltaTime，帧率不同平滑度不同——写成 1 - Mathf.Exp(-damping * deltaTime) 帧率无关。",
    tip: "加一个 Dead Zone（死区）：玩家在中心小范围内移动时相机不动，镜头立刻\"高级\"起来。"
  },
  u12_2: {
    more: [
      "拾取物三种处理方式：Destroy（最简单）、SetActive(false) + 对象池（高频刷新）、SortedOut 回收站场景（大型项目）。学习期 Destroy 足够。",
      "计分架构：拾取物只广播事件（OnPicked），GameManager 订阅后加分并刷新 UI——比\"拾取物直接找 UI 文本改\"的写法可扩展性强得多。",
      "胜利流程：分数达标 → 延迟 1 秒（协程）→ 播放胜利音效 → 显示结算面板 → 按键进下一关。把流程写成协程最清晰。"
    ],
    pit: "胜利瞬间玩家还能继续操控，开场动画被干扰——加个 inputLock 布尔在移动脚本里判断。",
    tip: "结算面板数据（用时、拾取数、评分星级）统一用结构体传递，下个游戏复用这套结算流程。"
  },
  u12_3: {
    more: [
      "音频三件套：AudioSource（播放器）、AudioClip（素材）、AudioMixer（混音台，分组控制音量）。背景音乐循环 + 音效 PlayOneShot 是最小组合。",
      "练手项目升级建议顺序：加存档（PlayerPrefs 记最高分）→ 加开始菜单 → 加多关卡 → 发布 itch.io。每个台阶都有明确的\"毕业感\"。",
      "长期路线图：C# 深入（接口/事件/泛型）→ Unity 系统课（动画/导航/UI Toolkit）→ 小游戏三连 → 团队项目/作品集。走完你就是\"能干活\"的开发者。"
    ],
    pit: "囤教程不动手是最大的坑：教程完成度 80% 就开始魔改，比看完 5 个教程不写一行强。",
    tip: "给自己定一个\"两周小游戏\"节奏：第 1 周原型，第 2 周打磨发布——数量堆出手感，手感堆出质量。"
  }
};
