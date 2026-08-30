// 游戏设计模式专题 —— 用前两个课程的知识（类/接口/委托/事件/MonoBehaviour）搭建游戏架构
window.PATTERNS_COURSE = {
  id: "dp",
  title: "游戏设计模式",
  short: "设计模式",
  emoji: "🏗️",
  color: "#ce82ff",
  desc: "单例、观察者、状态机、对象池、命令、工厂、策略、数据驱动——商业游戏的真实架构套路，综合运用前两个课程。",
  lessons: [
    {
      id: "dp1", title: "单例模式 Singleton", mins: 12,
      kps: [
        { t: "什么是单例，为什么游戏需要它", d: "单例 = 全局唯一的实例 + 全局访问点。音效管理、存档系统、游戏状态——这些\"全局只能有一份\"的系统都靠它。", c: "public class GameManager : MonoBehaviour {\n    public static GameManager Instance { get; private set; }\n\n    public int Score;\n\n    void Awake() {\n        if (Instance != null) {   // 已有实例\n            Destroy(gameObject);  // 销毁后来者\n            return;\n        }\n        Instance = this;\n        DontDestroyOnLoad(gameObject); // 跨场景存活\n    }\n}\n// 任何地方：GameManager.Instance.Score += 10;" },
        { t: "案例精讲：AudioManager 全局音效", d: "单例最实用的示范：一个 AudioManager 服务全游戏，其他脚本一行代码播音效。", c: "public class AudioManager : MonoBehaviour {\n    public static AudioManager Instance { get; private set; }\n    [SerializeField] private AudioSource sfxSource;\n    [SerializeField] private AudioClip hitClip;\n\n    void Awake() {\n        if (Instance != null) { Destroy(gameObject); return; }\n        Instance = this;\n    }\n\n    public void PlaySfx(string name) {\n        if (name == \"hit\") sfxSource.PlayOneShot(hitClip);\n    }\n}\n// 敌人脚本里：AudioManager.Instance.PlaySfx(\"hit\");" }
      ],
      qs: [
        { q: "单例模式的两大特征是？", opts: ["全局唯一实例 + 全局访问点", "速度极快 + 省内存", "必须继承 MonoBehaviour + 必须静态", "只能有一个方法"], a: 0, ex: "\"只有一个\"和\"随时能拿到\"——这就是单例的全部。" },
        { q: "防止重复实例的标准 Awake 写法是？", code: "void Awake() {\n    if (Instance != null) {\n        Destroy(gameObject);\n        return;\n    }\n    Instance = this;\n}", opts: ["发现已有实例就销毁自己并 return", "销毁已有的实例", "把 Instance 置 null", "什么都不做"], a: 0, ex: "\"后来者自杀\"保住第一个实例（它带着 DontDestroyOnLoad）。" },
        { q: "Instance 属性最常见的声明写法是？", opts: ["public static GameManager Instance { get; private set; }", "public GameManager Instance;", "private static GameManager Instance { get; set; }", "public const GameManager Instance"], a: 0, ex: "public get + private set：外部只能读，只有类内部能设置——封装的单例。" },
        { q: "单例 + DontDestroyOnLoad 组合的效果是？", opts: ["切换场景后实例依然存在，数据不丢", "物体永远无法销毁", "场景加载更快", "自动保存到磁盘"], a: 0, ex: "分数、设置、音频管理器跨场景存活——换关卡不重置。" },
        { q: "滥用单例（什么都做成单例）的主要坏处是？", opts: ["全局耦合严重，难以测试与维护", "运行速度一定变慢", "无法编译", "内存会泄漏"], a: 0, ex: "所有系统都依赖全局单例 = 牵一发动全身。只把\"真正全局唯一\"的系统做成单例。" },
        { q: "敌人脚本想播放受击音效，正确的调用是？", opts: ["AudioManager.Instance.PlaySfx(\"hit\");", "AudioManager.PlaySfx();", "new AudioManager().PlaySfx(\"hit\");", "Instance.PlaySfx();"], a: 0, ex: "通过静态 Instance 访问唯一实例的方法——单例的标准使用姿势。" },
        { q: "多个单例类重复的\"防重 + 存活\"样板代码，进阶解法是？", opts: ["写一个泛型单例基类 Singleton<T> : MonoBehaviour 供继承", "复制粘贴到每个类", "全部删掉 DontDestroyOnLoad", "用接口解决"], a: 0, ex: "abstract class Singleton<T> : MonoBehaviour where T : MonoBehaviour —— 写一次用一辈子。" },
        { q: "应用退出时（Application.Quit），单例的 OnDestroy 里应该？", opts: ["把 Instance 置 null，避免销毁后还被访问", "什么都不用做", "重新 new 一个", "销毁场景"], a: 0, ex: "退出顺序不确定时其他脚本可能还会访问 Instance——置 null 配合判空最安全。" }
      ]
    },
    {
      id: "dp2", title: "观察者模式与事件驱动", mins: 12,
      kps: [
        { t: "观察者模式 = 发布订阅", d: "发布者（玩家）只负责广播\"发生了什么\"，订阅者（UI/音效/成就）各自响应——双方互不认识。", c: "public class Player : MonoBehaviour {\n    public event Action<int> OnHpChanged;\n    public event Action OnDied;\n\n    public void TakeDamage(int dmg) {\n        hp -= dmg;\n        OnHpChanged?.Invoke(hp);   // 广播：血量变了\n        if (hp <= 0) OnDied?.Invoke();\n    }\n}" },
        { t: "案例精讲：玩家死亡通知三大系统", d: "玩家死亡时，UI、音效、成就都要响应——用事件，玩家类一行不改。", c: "void Start() {\n    player.OnDied += ShowDeathUI;\n    player.OnDied += PlayDeathSound;\n    player.OnDied += UnlockAchievement;\n}\n\nvoid ShowDeathUI() { deathPanel.SetActive(true); }\nvoid PlayDeathSound() { audioSource.Play(); }\nvoid UnlockAchievement() { /* 上报成就 */ }" },
        { t: "解耦的收益与代价", d: "收益：新增响应者只需 +=，玩家类零改动。代价：执行顺序不保证、退订要自律。高频连续变化（每帧位置）不适合事件。", c: "// 订阅与退订成对出现\nvoid OnEnable()  { player.OnDied += OnPlayerDied; }\nvoid OnDisable() { player.OnDied -= OnPlayerDied; }" }
      ],
      qs: [
        { q: "观察者模式的角色分工是？", opts: ["发布者广播事件，订阅者响应事件", "发布者调用订阅者的所有方法", "两者互不相干", "订阅者控制发布者"], a: 0, ex: "玩家（发布者）只管喊\"我死了\"，谁听、听完干什么都不关它的事。" },
        { q: "玩家死亡时 UI、音效、成就系统都要响应，用事件的架构优势是？", opts: ["玩家类不依赖任何响应者，新增响应者零改动", "执行顺序完全可控", "性能比直接调用快", "不需要写退订"], a: 0, ex: "对比\"在玩家死亡代码里逐个调用 UI/音效/成就\"——事件让玩家类与它们彻底解耦。" },
        { q: "两个订阅者 A、B 依次 += 到同一事件，触发时执行顺序？", opts: ["按订阅顺序：先 A 后 B", "先 B 后 A", "同时执行", "随机"], a: 0, ex: "多播委托按订阅顺序调用——所以\"依赖顺序的逻辑\"不适合用事件串联。" },
        { q: "订阅事件最规范的配对写法是？", opts: ["OnEnable 里 +=，OnDisable 里 -=", "Start 里 += 就够了", "Awake 里 +=，Update 里 -=", "只用 += 不用退订"], a: 0, ex: "激活/禁用自动成对执行，物体反复开关也不泄漏订阅。" },
        { q: "想让\"多个系统都能监听\"且不需要具体发布者引用，进阶做法是？", opts: ["静态事件总线（如 EventBus.Publish<PlayerDied>()）", "把事件设为 private", "每个系统发自己的事件", "用协程轮询"], a: 0, ex: "静态事件总线让\"任何地方发、任何地方收\"——但生命周期管理要更谨慎。" },
        { q: "按钮 onClick、 TMP 输入变化这些 Unity 自带回调，本质是？", opts: ["UnityEvent——观察者模式的引擎内置实现", "协程", "接口回调", "静态类"], a: 0, ex: "UnityEvent 可以在 Inspector 拖拽绑定（策划友好），C# event 纯代码更轻量。" },
        { q: "订阅了事件却不退订，最可能引发？", opts: ["对象销毁后事件仍触发它，抛 MissingReferenceException", "编译错误", "事件失效", "没有影响"], a: 0, ex: "事件持有订阅者引用导致\"该销毁的销不掉\"——这是事件系统最常见的崩溃来源。" },
        { q: "玩家\"每帧都在变的坐标\"适合用事件广播吗？", opts: ["不适合，高频连续变化用每帧直接读取更合适", "非常适合", "必须用事件", "看编译器"], a: 0, ex: "事件适合\"状态突变\"（死亡、升级）；每帧连续值直接在 LateUpdate 里读，避免海量事件。" }
      ]
    },
    {
      id: "dp3", title: "状态机模式 FSM", mins: 14,
      kps: [
        { t: "什么是状态机", d: "有限状态机（FSM）= 有限的状态 + 明确的转换规则。任何时刻只处于一个状态：敌人\"巡逻/追击/攻击\"、角色\"待机/跑/跳\"。", c: "public enum EnemyState { Patrol, Chase, Attack }\n\nprivate EnemyState state = EnemyState.Patrol;\n\nvoid Update() {\n    switch (state) {\n        case EnemyState.Patrol:  PatrolUpdate();  break;\n        case EnemyState.Chase:   ChaseUpdate();   break;\n        case EnemyState.Attack:  AttackUpdate();  break;\n    }\n}" },
        { t: "案例精讲：敌人 AI 三状态", d: "发现玩家→追击；进入攻击范围→攻击；丢失/太远→回到追击或巡逻。", c: "void PatrolUpdate() {\n    WalkPatrolPath();\n    if (CanSeePlayer()) state = EnemyState.Chase;\n}\n\nvoid ChaseUpdate() {\n    MoveTowards(player.position);\n    if (!CanSeePlayer()) state = EnemyState.Patrol;\n    if (InAttackRange()) state = EnemyState.Attack;\n}\n\nvoid AttackUpdate() {\n    TryAttack();\n    if (!InAttackRange()) state = EnemyState.Chase;\n}" },
        { t: "状态接口进阶（IState）", d: "状态多起来后，把每个状态做成类（实现 IState：Enter/Update/Exit），主类只负责切换——可扩展性质变。", c: "public interface IState {\n    void Enter();\n    void Update();\n    void Exit();\n}\n\n// 每个状态一个类：PatrolState、ChaseState...\n// 当前状态切换时：current.Exit(); current = next; current.Enter();" }
      ],
      qs: [
        { q: "状态机（FSM）的三要素是？", opts: ["有限的状态、明确的转换规则、任一时刻只处于一个状态", "循环、判断、返回", "输入、处理、输出", "数组、循环、条件"], a: 0, ex: "\"有限\"\"规则明确\"\"互斥\"——敌人 AI、角色控制器、游戏流程全是它。" },
        { q: "入门版状态机的标准实现组合是？", opts: ["enum 枚举状态 + switch 分发到对应处理方法", "多个协程", "多个场景", "接口 + 反射"], a: 0, ex: "enum 定义状态集合，Update 的 switch 分发——几十行就能跑的敌人 AI。" },
        { q: "敌人从巡逻→追击→攻击→（脱离）追击，状态转换的触发依据是？", opts: ["可见性、距离等\"条件检测\"写在各状态的 Update 里", "随机切换", "按时间固定轮换", "玩家说了算"], a: 0, ex: "每个状态负责检测\"该去哪\"：巡逻中发现玩家转追击；攻击中超出范围回追击。" },
        { q: "相比大段 if-else，状态机的架构优势是？", opts: ["新增状态不需要修改旧状态的代码", "运行更快", "代码行数一定更少", "不需要测试"], a: 0, ex: "加\"逃跑\"状态 = 新增一个 case/类，已有状态原样不动——开闭原则的体现。" },
        { q: "状态数量继续膨胀（每状态还有子状态）时，进阶方案是？", opts: ["层次状态机（HFSM）或行为树（Behavior Tree）", "无限加 if", "删掉一些状态", "换成数据库"], a: 0, ex: "HFSM 让状态有父子（攻击下分子弹/激光）；行为树是大型 AI 的行业标准。" }
      ,
        { tag: "t8_1", q: "敌人在 Patrol 状态发现玩家转 Chase，追到攻击范围转 Attack，玩家离开范围又回 Chase。当前在 Attack，玩家走远一步后下一状态是？", opts: ["Chase", "Patrol", "保持 Attack", "死亡"], a: 0, ex: "攻击状态检测\"脱离攻击范围 → 回 Chase\"——状态转换规则决定行为。" },
        { q: "Animator 的动画状态机与代码状态机的关系是？", opts: ["思想相同（状态+转换条件），一个管动画一个管逻辑，两者可以联动", "完全是一回事", "毫无关系", "Animator 已废弃"], a: 0, ex: "Animator 参数（bool/trigger）可以被代码状态机驱动——逻辑状态变化驱动动画切换。" },
        { q: "每个状态写成独立类（实现 IState 接口）的最大好处是？", opts: ["状态内部逻辑完全自治，新增/修改状态不影响其他状态", "代码行数最少", "不需要 Update", "运行速度翻倍"], a: 0, ex: "Enter/Update/Exit 三段让\"进入时的初始化、离开时的清理\"有明确的安放位置。" },
        { q: "角色\"跳跃中不能再次跳跃、落地才能走\"这类规则，放在状态机里属于？", opts: ["状态内的转换条件（不满足就不转换）", "全局变量", "渲染逻辑", "物理参数"], a: 0, ex: "Jumping 状态里\"落地事件\"才是转换回 Grounded 的条件——非法转换直接被状态机挡住。" },
        { q: "以下哪个 NOT 适合用状态机建模？", opts: ["连续变化的移动方向（每帧平滑转向）", "敌人巡逻/追击/攻击", "游戏流程：主菜单/游戏中/暂停/结束", "门的开关"], a: 0, ex: "连续量适合插值与物理；\"离散的互斥状态\"才是状态机的主场。" },
        { q: "转换时 Exit() 与 Enter() 的调用顺序惯例是？", opts: ["先旧状态 Exit()，再新状态 Enter()", "先 Enter 再 Exit", "只调 Enter", "同时调用"], a: 0, ex: "先打扫旧房间再搬进新房间——旧状态清理（停协程/退订）不残留。" },
        { q: "游戏总流程（主菜单/对局/结算）与敌人 AI 都可以用状态机，说明它？", opts: ["是与具体领域无关的通用思维模型", "只属于 AI 领域", "只属于 UI", "是 Unity 专属"], a: 0, ex: "FSM 是计算机科学的通用模型：编译器、网络协议、游戏——哪里有\"状态\"哪里就有它。" },
        { q: "switch 版状态机中，\"状态的附加数据\"（如巡逻路径点）应该存？", opts: ["类的字段（与状态机同级），各状态处理方法访问", "switch 的 case 里", "局部变量每次重建", "静态只读"], a: 0, ex: "路径点、巡逻范围这类\"跨帧数据\"是字段；switch 只负责\"当前该执行谁\"。" }
      ]
    },
    {
      id: "dp4", title: "对象池模式 Object Pool", mins: 12,
      kps: [
        { t: "为什么需要对象池", d: "Instantiate/Destroy 有加载与 GC 开销，弹幕游戏一秒几十次就是灾难。池子\"先造好、反复用\"：取出激活、用完隐藏。", c: "public class Pool : MonoBehaviour {\n    [SerializeField] private GameObject prefab;\n    private readonly List<GameObject> pool = new();\n\n    public GameObject Get() {\n        foreach (var obj in pool)\n            if (!obj.activeInHierarchy) { obj.SetActive(true); return obj; }\n        var nova = Instantiate(prefab, transform);\n        pool.Add(nova);\n        return nova;                     // 没有空闲就扩容\n    }\n\n    public void Return(GameObject obj) {\n        obj.SetActive(false);            // \"回收\"= 隐藏 + 重置\n        obj.transform.position = Vector3.zero;\n    }\n}" },
        { t: "案例精讲：开火用池取子弹", d: "开火从池里拿、子弹生命周期结束自动回收——发射一万发也不卡。", c: "[SerializeField] private Pool bulletPool;\n\nvoid Fire() {\n    var bullet = bulletPool.Get();\n    bullet.transform.position = muzzle.position;\n    bullet.transform.rotation = transform.rotation;\n    bullet.GetComponent<Bullet>().Launch(10f);\n}\n\n// Bullet 脚本里：出界/命中时 bulletPool.Return(gameObject);" },
        { t: "回收时的状态重置", d: "\"取出像新的一样\"是池的铁律：回收时重置血量、速度、计时器，否则下一个使用者拿到\"带伤\"的对象——最常见池 bug。", c: "public void Return(GameObject obj) {\n    obj.GetComponent<Bullet>().Reset();  // 清速度、清拖尾\n    obj.SetActive(false);\n}" }
      ],
      qs: [
        { q: "对象池解决的核心问题是？", opts: ["频繁 Instantiate/Destroy 带来的性能开销与 GC", "内存不够", "物体太多看不见", "代码太长"], a: 0, ex: "实例化有加载成本、销毁触发 GC——池子\"一次生成，终身复用\"。" },
        { q: "从池中取出对象的标准动作（缺一不可）是？", opts: ["激活 SetActive(true) + 设置位置状态", "只改位置", "重新加载 Prefab", "改名字"], a: 0, ex: "忘了 SetActive(true) 是池子的头号 bug：子弹\"发射了但看不见\"。" },
        { q: "\"回收时忘记重置状态\"的表现是？", opts: ["下次取出时子弹还带着上次的血量/速度/拖尾", "编译错误", "游戏崩溃", "没有现象"], a: 0, ex: "回收=隐藏+重置。血量不清零的敌人\"复活即残血\"就是这么来的。" },
        { q: "池中所有对象都在使用（池空了），常见策略是？", opts: ["扩容新建几个 / 复用最旧的", "永久等待", "游戏崩溃", "删除玩家"], a: 0, ex: "动态扩容或覆盖最旧——策略按业务选，但\"绝不绕过池直接 Instantiate\"是底线。" },
        { q: "以下最适合进池的是？", opts: ["子弹、伤害飘字、特效", "玩家角色", "Boss", "主菜单背景图"], a: 0, ex: "\"高频、短命、同质\"的对象才值得池化。玩家全游戏就一个，池化没意义。" }
      ,
        { tag: "t8_2", q: "池初始 0 个子弹。开火 3 次（每次 Get），第 1 颗命中回收后，又开火 1 次。池中累计创建过几个？激活中的有几个？", opts: ["创建 3 个，激活 3 个", "创建 4 个，激活 3 个", "创建 3 个，激活 2 个", "创建 2 个，激活 2 个"], a: 0, ex: "回收只是隐藏，创建过 3 个；取出时复用了回收的那颗——激活中的仍是 3。" },
        { q: "泛型对象池 T Get<T>() where T : Component 的好处是？", opts: ["一个池类服务所有组件类型，取出即拿到强类型引用", "能省更多内存", "不需要 Prefab", "自动扩容到无限"], a: 0, ex: "泛型+约束让 Get 直接返回 Bullet/Rigidbody 类型，调用方免强转。" },
        { q: "池的 Prefab 字段与池脚本挂载位置的最佳实践是？", opts: ["池挂独立物体（或 DontDestroyOnLoad 管理），Prefab 拖成字段", "池必须挂在玩家上", "必须放 Resources", "必须代码创建"], a: 0, ex: "独立的\"PoolManager\"统一管理多类池子（子弹池/特效池/飘字池），按名字取池。" },
        { q: "回收的子弹\"速度还没清零\"，下次取出会？", opts: ["带着旧速度飞出去（池 bug 头号来源）", "自动停止", "报错", "消失"], a: 0, ex: "重置 = 位置 + 速度 + 计时器 + 引用清空。Reset 方法写进对象脚本，回收时调用。" }
      ]
    },
    {
      id: "dp5", title: "命令模式 Command", mins: 12,
      kps: [
        { t: "命令 = 把\"操作\"封装成对象", d: "每个操作是一个实现 ICommand（Execute/Undo）的对象。操作可以被排队、记录、撤销、重放——因为它是数据。", c: "public interface ICommand {\n    void Execute();\n    void Undo();\n}\n\npublic class MoveCommand : ICommand {\n    private readonly Player player;\n    private readonly Vector3 dir;\n    public MoveCommand(Player p, Vector3 d) { player = p; dir = d; }\n    public void Execute() { player.transform.Translate(dir); }\n    public void Undo()    { player.transform.Translate(-dir); }\n}" },
        { t: "案例精讲：输入重映射与撤销栈", d: "按键不再写死\"W=前进\"，而是\"按键→命令\"映射表：改键位零改代码；命令进栈还能撤销。", c: "private readonly Stack<ICommand> undoStack = new();\n\nvoid Update() {\n    if (Input.GetKeyDown(KeyCode.W)) Do(new MoveCommand(player, Vector3.forward));\n    if (Input.GetKeyDown(KeyCode.Z)) Undo();\n}\n\nvoid Do(ICommand cmd) { cmd.Execute(); undoStack.Push(cmd); }\nvoid Undo() {\n    if (undoStack.Count == 0) return;\n    var cmd = undoStack.Pop();\n    cmd.Undo();\n}" }
      ],
      qs: [
        { q: "命令模式把\"操作\"封装成对象后，操作就能像数据一样被？", opts: ["存储、排队、撤销、重放、网络传输", "编译优化", "自动并行", "加密"], a: 0, ex: "\"操作变成了数据\"——策略游戏排队指令、录像回放、撤销栈全都因此可行。" },
        { q: "ICommand 接口通常至少包含哪两个方法？", opts: ["Execute 与 Undo", "Start 与 Stop", "Do 与 Delete", "Save 与 Load"], a: 0, ex: "Execute 执行、Undo 反向执行——命令的双面性是撤销功能的基础。" },
        { q: "命令模式实现\"输入重映射\"（换按键不改逻辑）的原理是？", opts: ["按键映射到命令对象，换键=换映射表，命令不变", "删除输入代码", "每个键写一份完整逻辑", "不可能换键"], a: 0, ex: "\"W → MoveForward 命令\"是数据。设置界面改映射表，游戏逻辑零改动。" },
        { tag: "t8_3", q: "依次执行命令 A（写 a）、B（写 b）、C（写 c），然后 Undo() 一次，当前内容是？", opts: ["ab（C 被撤销）", "abc", "a", "c"], a: 0, ex: "撤销弹出并回退最后一条命令——命令栈 LIFO 的直接应用。" },
        { q: "策略游戏的\"录像回放\"功能，基于命令模式的实现思路是？", opts: ["记录每帧玩家执行的命令序列，回放时按序重新 Execute", "录屏视频文件", "保存每帧截图", "重新随机生成"], a: 0, ex: "命令序列 = 完整的历史。体积极小，还能倍速、跳转——格斗游戏回放就这么做。" },
        { q: "命令模式与观察者模式都涉及\"回调\"，区别是？", opts: ["命令关注\"执行与撤销的一次性操作\"，观察者关注\"状态变化的持续广播\"", "完全相同", "命令没有 Execute", "观察者可以撤销"], a: 0, ex: "一个面向\"动作的记录与反做\"，一个面向\"变化的广播\"——意图不同。" },
        { q: "策略游戏里\"移动→攻击→建造\"排成一队依次执行，需要给命令增加？", opts: ["队列排队执行（协程或逐帧检查完成状态）", "随机顺序", "同时全部执行", "删除 Undo"], a: 0, ex: "命令进队列，执行完一个取下一个——RTS 的编队指令就是排队命令。" },
        { q: "以下哪个 NOT 适合命令模式？", opts: ["每帧连续的角度插值（用 Lerp 更自然）", "棋类悔棋", "输入重映射", "关卡编辑器操作历史"], a: 0, ex: "连续量用插值/物理；\"离散、可记录、可撤销\"的操作才是命令的主场。" }
      ]
    },
    {
      id: "dp6", title: "工厂模式 Factory", mins: 10,
      kps: [
        { t: "工厂 = 把 new 的逻辑集中到一处", d: "创建敌人的代码散落各处时，改一次配置要翻遍全项目。工厂把\"怎么造\"收拢：调用方只说\"我要什么\"。", c: "public static class EnemyFactory {\n    public static Enemy Create(string type, Vector3 pos) {\n        var data = EnemyDatabase.Get(type);   // 配置驱动\n        var go = Object.Instantiate(data.prefab, pos, Quaternion.identity);\n        var enemy = go.GetComponent<Enemy>();\n        enemy.Init(data.hp, data.speed);\n        return enemy;\n    }\n}\n// 调用方：EnemyFactory.Create(\"goblin\", spawnPos);" },
        { t: "案例：注册表工厂（开闭原则落地）", d: "新增敌人类型时\"只加不改\"：启动时把 类型→创建函数 注册进字典。", c: "private static readonly Dictionary<string, Func<Vector3, Enemy>> creators = new();\n\npublic static void Register(string type, Func<Vector3, Enemy> creator)\n    => creators[type] = creator;\n\npublic static Enemy Create(string type, Vector3 pos)\n    => creators[type](pos);" }
      ],
      qs: [
        { q: "工厂模式解决的核心问题是？", opts: ["对象创建逻辑散落各处，修改时要全项目翻找", "对象太多占内存", "编译太慢", "代码注释太少"], a: 0, ex: "\"怎么造\"收拢到工厂：改创建逻辑只动一处，调用方只说\"我要什么\"。" },
        { q: "配置驱动的敌人工厂（数据来自 ScriptableObject/表）的最大好处是？", opts: ["策划改数值/外观不改代码，新敌人可能只是新配置", "减少 prefab 数量", "不用写 Init", "编译更快"], a: 0, ex: "\"goblin\" 与 \"eliteGoblin\" 可能只是配置不同——数据驱动的力量。" },
        { q: "注册表工厂（类型→创建函数字典）相对 if-else 工厂的优势是？", opts: ["新增类型只需注册，工厂代码零修改（开闭原则）", "字典更快", "不用写函数", "能省内存"], a: 0, ex: "if-else 每加一种敌人改一次工厂；注册表只在新类里加一行注册。" },
        { q: "工厂与对象池结合的正确姿势是？", opts: ["工厂内部优先从池取，池空才实例化", "两者不能结合", "工厂负责销毁", "池负责创建"], a: 0, ex: "调用方完全无感：拿到的\"新\"对象其实来自池——创建策略再次集中。" }
      ,
        { q: "工厂方法模式（Factory Method）与简单工厂的区别是？", opts: ["工厂方法把创建下放给子类决定，符合开闭原则；简单工厂集中但每加类型要改它", "工厂方法更快", "没有区别", "简单工厂更符合开闭原则"], a: 0, ex: "简单工厂用 if/字典分支；工厂方法让\"每种产品一个创建者\"——大型项目更可扩展。" },
        { q: "调用方直接 new Enemy() 而不是走工厂，最大的坏处是？", opts: ["绕过了初始化约定（Init、池、配置），各处行为不一致", "编译不过", "一定会崩溃", "没有坏处"], a: 0, ex: "创建约定散掉后，\"忘记 Init\"\"忘记进池\"的 bug 就从四面八方冒出来。" },
        { q: "以下哪种情况值得引入工厂？", opts: ["创建流程包含：选配置→实例化→初始化→注册事件，且多处使用", "new 一个只有两个字段的数据类", "创建局部临时变量", "所有 new 都要包一层"], a: 0, ex: "\"创建有仪式感且被多处使用\"才是工厂的用武之地——不要为 new 而工厂。" },
        { q: "敌人工厂创建后忘调 Init(hp, speed)，最可能的现象是？", opts: ["敌人属性全是默认值（一滴血就死、原地不动）", "编译错误", "敌人不生成", "游戏崩溃"], a: 0, ex: "工厂把初始化收进 Create 内部，正是为了杜绝\"忘初始化\"这类事故。" }
      ]
    },
    {
      id: "dp7", title: "策略模式 Strategy", mins: 10,
      kps: [
        { t: "策略 = 可替换的算法族", d: "同一行为有多种做法（物理伤害/魔法伤害/真实伤害），定义统一接口，运行时选择实现——消灭 if-else 大爆炸。", c: "public interface IDamageStrategy {\n    int Calculate(int baseDamage, int defense);\n}\n\npublic class PhysicalDamage : IDamageStrategy {\n    public int Calculate(int atk, int def) => Math.Max(1, atk - def);\n}\npublic class MagicDamage : IDamageStrategy {\n    public int Calculate(int atk, int def) => atk; // 魔法无视防御\n}" },
        { t: "案例：运行时切换策略", d: "武器挂什么策略就出什么伤害；buff\"穿透护甲\"= 换一个策略对象。", c: "public class Weapon {\n    private IDamageStrategy strategy;\n    public Weapon(IDamageStrategy s) => strategy = s;\n    public void Hit(Enemy e) => e.TakeDamage(strategy.Calculate(atk, e.Def));\n}\n\n// 换策略 = 换对象\nweapon.EquipStrategy(new MagicDamage());" }
      ],
      qs: [
        { q: "策略模式的构成是？", opts: ["统一接口 + 多个可互换的实现 + 调用方持有接口引用", "一个巨型 if-else", "继承树", "静态方法集合"], a: 0, ex: "\"定义一族算法、分别封装、可互相替换\"——策略模式三句话。" },
        { q: "游戏中\"武器伤害计算方式\"频繁变化，用策略模式的结构是？", opts: ["IDamageStrategy 接口 + 各计算类，武器持有接口引用", "武器类里写满 if-else", "每种武器一个类继承武器", "把公式存数据库"], a: 0, ex: "新伤害类型 = 新增一个实现类，武器与敌人代码零改动。" },
        { q: "C# 里 List.Sort((a,b) => ...) 传入的比较 Lambda，本质是？", opts: ["策略模式：排序算法使用调用方提供的\"比较策略\"", "匿名类", "闭包 bug", "反射"], a: 0, ex: "排序算法固定、比较规则可替换——你已经天天在用策略模式了。" }
      ,
        { q: "策略模式相比\"继承出物理剑/魔法剑子类\"的优势是？", opts: ["组合：运行时可换策略，且策略可被多种武器复用", "代码一定更短", "不需要接口", "编译更快"], a: 0, ex: "继承是\"是什么\"（编译期定死），策略是\"用什么方式\"（运行时可换）——组合优于继承。" },
        { q: "敌人 AI 在\"巡逻/警戒/战斗\"间切换探测半径与速度，用策略模式的做法是？", opts: ["定义 IBehavior 策略接口，每种行为一个类，敌人持有当前行为", "三个布尔变量控制", "写死在 Update", "每个行为一个场景"], a: 0, ex: "策略切行为参数与逻辑；与状态机配合（状态决定用哪个策略）威力更大。" }
      ],
      qs3: [
        { q: "策略 + 注册表字典（\"策略名 → 策略对象\"）的组合解决了？", opts: ["按配置/名字动态选择策略，且新增策略零改动调用方", "内存泄漏", "编译错误", "性能问题"], a: 0, ex: "配置表写 \"damage\": \"Magic\" → 工厂从注册表取策略——完全数据驱动。" },
        { q: "以下哪个场景 NOT 适合策略模式？", opts: ["只有一种实现且永远不会变的简单计算", "多种伤害类型", "多种寻路算法", "多种存档格式"], a: 0, ex: "策略是为\"变化与选择\"服务的。只有一个实现时接口是过度设计。" },
        { q: "策略对象通常设计为无状态（不存战斗数据），原因是？", opts: ["无状态可全局共享单例复用，切换零成本", "有状态编译不过", "状态会丢失", " Unity 限制"], a: 0, ex: "战斗数据传进 Calculate 参数，策略保持\"纯函数\"——可复用、可测试。" }
      ]
    },
    {
      id: "dp8", title: "组件模式与组合优于继承", mins: 10,
      kps: [
        { t: "Unity 的组件模式就是组合的实践", d: "不做\"会飞的敌人\"继承链，而是\"敌人 + 移动组件 + 飞行组件\"拼装——能力像积木。", c: "// 组合：能力是\"零件\"\nvar enemy = new GameObject(\"Flyer\");\nenemy.AddComponent<Health>();\nenemy.AddComponent<FlyMovement>();\nenemy.AddComponent<EnemyAI>();\n// 想要\"会跑的敌人\"？换掉 FlyMovement 就行" },
        { t: "拆分职责实战：\"万能 Player 脚本\"的重构", d: "移动、战斗、背包、动画全在一个脚本 = 上帝类。拆成组件后，每个都能独立测试与复用。", c: "// ❌ Player.cs（1000 行上帝类）\n// ✅ 拆分后：\n// PlayerMovement.cs  移动\n// PlayerCombat.cs    战斗\n// PlayerInventory.cs 背包\n// PlayerAnimation.cs 动画驱动\n// 它们通过引用/事件协作" }
      ],
      qs: [
        { q: "\"组合优于继承\"在 Unity 中的最佳实践是？", opts: ["用组件拼装能力，而不是设计深层继承树", "多用 MonoBehaviour 继承链", "所有类互相继承", "继承层级越多越好"], a: 0, ex: "飞行的敌人 = 敌人 + 飞行组件。继承树一深，\"既会飞又会远程\"的组合就会爆炸。" },
        { q: "\"上帝类\"（一个脚本干所有事）的问题不包括？", opts: ["编译不过", "改一处动全身", "难以定位 bug", "无法复用单个功能"], a: 0, ex: "上帝类能编译、能运行——问题在维护成本：任何需求都要改这一个大文件。" },
        { q: "组件之间通信的三种常见方式是？", opts: ["直接引用调用、事件广播、Manager 中转", "只有全局变量", "只有序列化", "只能用反射"], a: 0, ex: "按耦合度从高到低选择：简单场景直接引用，跨系统用事件，全局协调用 Manager。" }
      ,
        { q: "移动组件需要通知动画组件\"我在跑\"，解耦的推荐方式是？", opts: ["移动组件发事件（如 OnMoving +=），动画组件订阅", "移动组件直接改 Animator", "两个组件合并", "用全局静态变量"], a: 0, ex: "直接操作让对方依赖自己的内部实现；事件让两边只认\"约定\"。" },
        { q: "[RequireComponent] 在组件化设计中的价值是？", opts: ["声明组件间的依赖关系，防止忘装依赖组件", "加快编译", "自动排序", "生成文档"], a: 0, ex: "\"我的组件依赖 Rigidbody\"写成特性，Unity 自动补齐——依赖关系显式化。" }
      ],
      qs3: [
        { q: "ScriptableObject 在组件架构中的常见角色是？", opts: ["共享的配置/数据资产（多个组件读同一份数据）", "替代 MonoBehaviour 挂场景", "存玩家存档", "替代 Prefab"], a: 0, ex: "移动参数、武器数值做成 SO 资产：调参一处生效，还能被多个角色共享。" },
        { q: "\"玩家\"在纯组件架构下，本质上是一个？", opts: ["空 GameObject + 一组职责组件的集合", "必须有一个 Player 类包含全部逻辑", "单个脚本", "Prefab 名字"], a: 0, ex: "\"玩家\"是设计概念，落地是组件集合——这正是 Unity 的设计哲学。" }
      ]
    },
    {
      id: "dp9", title: "ScriptableObject 数据驱动", mins: 12,
      kps: [
        { t: "SO 是\"设计期数据资产\"", d: "数值与逻辑分离：敌人的血攻速做成 SO 资产，策划改资产不碰代码；多个实例共享同一份数据。", c: "[CreateAssetMenu(menuName = \"Config/Enemy\")]\npublic class EnemyConfig : ScriptableObject {\n    public string displayName;\n    public int hp;\n    public int attack;\n    public float speed;\n}\n\n// Enemy.Init(EnemyConfig cfg) { this.cfg = cfg; }\n// 攻击 = cfg.attack - 防御 …… 数值全来自资产" },
        { t: "案例：武器库配置 + 运行时注意事项", d: "武器列表做成 SO 数组；注意运行时修改 SO 的值在编辑器模式会\"写回资产\"——需要实例数据时用 Instantiate 克隆。", c: "[SerializeField] private EnemyConfig[] enemyTable;\n\n// 运行时修改克隆体（不影响资产）:\nvar runtimeCfg = Instantiate(enemyConfig);\nruntimeCfg.hp *= difficultyMultiplier;" }
      ],
      qs: [
        { q: "ScriptableObject 的定位是？", opts: ["保存数据的资产文件（与逻辑分离）", "另一种 MonoBehaviour", "场景文件", "存档格式"], a: 0, ex: "SO 是\"设计期\"数据：敌人属性、技能表、音频配置——创建后是 Project 里的资产。" },
        { q: "敌人配置做成 SO 资产后，最大的受益者是？", opts: ["策划/你自己：改数值不用动代码、不用重编译", "显卡", "玩家", "服务器"], a: 0, ex: "改 SO 资产即时生效（编辑器模式），调平衡效率飞升。" },
        { q: "多个敌人实例共享同一个 EnemyConfig 资产时，运行时修改 cfg.hp 会？", opts: ["编辑器模式下修改可能写回资产文件，影响所有引用者", "只影响自己", "自动克隆", "报错"], a: 0, ex: "\"需要每实例独立数据\"时用 Instantiate(config) 克隆一份运行时副本。" },
        { q: "SO 适合当\"玩家存档\"吗？", opts: ["不适合——存档是运行期数据，应使用文件/PlayerPrefs", "非常适合", "比 JSON 更适合", "Unity 官方推荐"], a: 0, ex: "SO 是设计期资产（随构建打包）；存档是运行期数据，两者生命周期完全不同。" },
        { q: "[CreateAssetMenu] 特性的作用是？", opts: ["在 Project 右键菜单加入口，一键创建该 SO 资产", "自动创建代码", "创建场景", "导出资产"], a: 0, ex: "菜单名分层（Config/Enemy）让策划的资产目录井井有条。" },
        { q: "SO 进阶玩法\"SO 作事件通道\"的思想是？", opts: ["定义 GameEvent 资产，发布者/订阅者都引用同一资产，实现资产级解耦", "把事件存在文件里", "替代所有代码", "只用于音效"], a: 0, ex: "场景间、预制体间通过共享 SO 事件资产通信——不需要单例事件总线。" },
        { q: "数值配置需要\"运行时根据难度修改\"时，正确姿势是？", opts: ["Instantiate(SO) 克隆运行时副本再修改", "直接改资产文件", "改不了", "重打包游戏"], a: 0, ex: "编辑器模式直接改 SO 会永久写回资产——克隆副本隔离运行时改动。" },
        { q: "武器表 EnemyConfig[] 数组放 SO 里，运行时选择武器是？", opts: ["按索引/名字从数组取资产引用，传给武器逻辑", "复制代码", "重新打包", "随机"], a: 0, ex: "配置数组 + 工厂/策略 = 完全数据驱动的武器系统。" }
      ]
    },
    {
      id: "dp10", title: "分层架构与综合应用", mins: 14,
      kps: [
        { t: "为什么要分层", d: "View（显示）/ Logic（玩法规则）/ Data（数据）各司其职：分数变了（Logic）→ 发事件 → UI 自己刷新（View）。跨层直接调用是耦合灾难的开始。", c: "// ❌ 玩家逻辑里直接改 UI 文本\nscore += 10;\nscoreText.text = \"分数：\" + score;  // 耦合！\n\n// ✅ 逻辑发事件，View 订阅\nscore += 10;\nOnScoreChanged?.Invoke(score);\n// UI 层订阅 OnScoreChanged 自己刷新" },
        { t: "案例精讲：分数的完整链路", d: "拾取金币 → 逻辑层加分 → 事件广播 → UI 刷新 + 存档更新 + 成就检查——每层只做自己的事。", c: "// Logic：Coin\nvoid OnTriggerEnter(Collider other) {\n    if (!other.CompareTag(\"Player\")) return;\n    GameManager.Instance.AddScore(value);\n    gameObject.SetActive(false); // 池化回收\n}\n// Logic：GameManager\npublic void AddScore(int v) {\n    Score += v;\n    ScoreChanged?.Invoke(Score);   // 广播\n    if (Score > Best) Save.Best = Score;\n}\n// View：ScoreUI\nvoid OnEnable()  { GameManager.ScoreChanged += Refresh; }\nvoid Refresh(int s) => scoreText.text = s.ToString();" },
        { t: "GameManager 的边界与反模式", d: "GameManager 只做\"流程调度\"（开始/暂停/结算）。塞进战斗、背包、音效就是新上帝类。判断标准：\"它离开这些职责还会成立吗？\"", c: "// GameManager 合理职责：\n// - 游戏状态（Playing/Paused/Over）\n// - 分数与流程事件\n// - 场景切换调度\n// ❌ 不该出现：移动玩家、算伤害、管音效细节" }
      ],
      qs: [
        { q: "分层的核心目的是？", opts: ["让\"显示、规则、数据\"各自独立演化，改一层不动其他层", "代码更多", "跑得更快", "显得专业"], a: 0, ex: "换 UI 皮肤不动玩法、改数值规则不动存档——分层是可维护性的地基。" },
        { q: "玩家逻辑里直接写 scoreText.text = ... 的问题在于？", opts: ["玩法代码与 UI 耦合，换 UI 系统要改玩法代码", "性能差十倍", "无法编译", "没问题"], a: 0, ex: "逻辑层应该发事件，\"怎么显示\"是 View 层的事——方向别搞反。" },
        { q: "GameManager 的合理职责边界是？", opts: ["游戏状态与流程调度（开始/暂停/结算、分数）", "包含战斗、背包、音效全部逻辑", "只做场景加载", "替代所有 Manager"], a: 0, ex: "\"流程调度\"是它的本职；具体系统各有自己的 Manager/组件。" },
        { tag: "t8_4", q: "按分层架构，\"拾取金币 → 加分 → UI 刷新\"的正确链路是？", opts: ["拾取→逻辑层加分→事件广播→UI 层订阅刷新", "拾取→UI 直接加分", "UI 每帧轮询玩家金币数（必须）", "金币直接改 UI 文本"], a: 0, ex: "逻辑发事件、视图订阅——整条链路没有跨层直接调用。" },
        { q: "Logic 层的正确特征是？", opts: ["不依赖 UI 与 MonoBehaviour 也能运行（纯 C# 可测试）", "必须继承 MonoBehaviour", "必须引用 TMPro", "必须访问场景"], a: 0, ex: "规则与显示分离后，逻辑可以在没有 Unity 的环境跑单元测试——质量飞跃。" },
        { q: "目录结构组织的最佳实践是？", opts: ["按功能模块分（Player/UI/Enemies/Managers/Config），模块内再分脚本与资产", "全部平铺在 Assets 根目录", "按文件类型分（所有脚本一个文件夹）", "随机放"], a: 0, ex: "\"按功能\"组织让定位与复用都容易；\"按类型\"组织在大项目里是灾难。" },
        { q: "逻辑层写成纯 C# 类（不继承 MonoBehaviour）的额外收益是？", opts: ["可单元测试、可在任何环境运行", "运行更快", "能脱离 Unity 发布", "不需要编译"], a: 0, ex: "Update 循环从外部驱动它——逻辑与引擎解耦，测试框架直接调用。" },
        { q: "综合选择：\"敌人受击时飘伤害数字 + 减血 + 死亡掉落\"，这套逻辑最合理的职责分配是？", opts: ["敌人逻辑扣血发事件；伤害数字组件订阅显示；掉落系统订阅生成", "敌人直接生成飘字和掉落物并改 UI", "全放 GameManager", "UI 层扣血"], a: 0, ex: "扣血是逻辑、飘字是表现、掉落是规则产出——各回各层，事件串联。" }
      ]
    }
  ]
};
