// 知识点详解 —— 游戏设计模式专题全覆盖
window.KP_DETAILS = Object.assign(window.KP_DETAILS || {}, {
  dp1_0: {
    more: [
      "单例三问：全局真的只能有一份吗？谁都需要访问它吗？它的生命周期跨场景吗？三问都\"是\"才值得单例。",
      "Awake 防重的顺序细节：先判 Instance 再赋值；被销毁的\"后来者\"要在 return 前完成销毁调用。",
      "Instance 属性用 { get; private set; } 而非 public 字段：外部只能读不能覆盖，单例才有保障。"
    ],
    pit: "在 Awake 里访问 Instance.XXX 时，自己的 Instance 还没赋值（先判重逻辑写反了）——判空与赋值顺序要对。",
    tip: "单例数量控制在 3~5 个核心系统（GameManager/AudioManager/SaveManager），其余用组件与事件组合。"
  },
  dp1_1: {
    more: [
      "AudioManager 的进阶：音效名→Clip 用字典映射，AddListener 的按钮音效统一挂接。",
      "背景音乐与音效分两个 AudioSource（BGM 循环、SFX 叠加 PlayOneShot），音量独立控制。",
      "配合 AudioMixer 可以做\"设置界面的音量滑条\"：暴露 SetBGMVolume/SetSFXVolume 方法。"
    ],
    pit: "在 AudioManager.Awake 里播音乐没问题；但别的脚本在 Start 里调 PlaySfx 时 Instance 可能还没赋值——执行顺序要留意。",
    tip: "Provide PlaySfx(AudioClip, volume) 重载 + 音效名常量表，调用方零魔法字符串。"
  },
  dp2_0: {
    more: [
      "事件本质是\"封装过的多播委托\"：+= 订阅、-= 退订、?.Invoke 触发——观察者模式的 C# 原生实现。",
      "事件的参数设计：Action<int> 传新血量；需要\"旧值+新值\"就用 Action<int, int>——参数即契约。",
      "发布者语义化命名：OnDied/OnHpChanged/OnLevelUp——过去时表示\"已发生\"。"
    ],
    pit: "事件在 Awake/OnDestroy 之外的时机 += 且从不退订，是 Unity 内存泄漏的头号来源。",
    tip: "先写订阅方的处理逻辑，再决定事件要不要带参数——参数按需设计，避免\"万能参数\"。"
  },
  dp2_1: {
    more: [
      "三大系统各自订阅 OnDied：UI 显示结算、音效播放、成就上报——它们互相不知道对方存在。",
      "测试友好：单元测试可以只验证\"事件被触发\"，不需要真的有 UI/音效。",
      "扩展演练：再加\"死亡掉落\"系统——玩家类依旧零改动，这就是解耦的复利。"
    ],
    pit: "三个订阅者如果要求严格顺序（先存档再播动画），事件顺序不保证——改用明确的流程管理。",
    tip: "把 OnDied 处理器写成独立方法而非 Lambda，既可读又能退订。"
  },
  dp2_2: {
    more: [
      "高频事件（每帧位置）会让订阅者疲于奔命——连续量用\"每帧直接读取\"，离散突变才广播。",
      "OnDisable 里退订是黄金法则：物体禁用/销毁都不会泄漏。",
      "调试事件链：在订阅方法首行 Debug.Log(\"[UI] OnDied\")——链路可视化。"
    ],
    pit: "Lambda 订阅无法 -=（每次创建新委托实例）——需要退订的场景必须用具名方法或保存委托实例。",
    tip: "事件处理器方法命名 On + 发布者 + 事件：OnPlayerDied——一眼看懂订阅关系。"
  },
  dp3_0: {
    more: [
      "enum + switch 是状态机的\"脚本版\"：几十行就能跑，学习项目首选。",
      "转换规则写在各状态的 Update 里（发现玩家→追击），让状态自治。",
      "转换用直接赋值 state = EnemyState.Chase——要加\"转换时特效\"就升级到 IState 类版。"
    ],
    pit: "忘记在状态处理方法里 break，或 case 里声明变量不带大括号——switch 的经典编译错误。",
    tip: "先在纸上画状态图（圆圈=状态、箭头=转换+条件），照图写代码零遗漏。"
  },
  dp3_1: {
    more: [
      "三个 Update 方法各自负责\"本状态的行为 + 转换检测\"——职责单一，加状态只加方法与 case。",
      "视野检测 CanSeePlayer 可用 Physics.OverlapSphere 或视锥角度+射线实现。",
      "攻击通常还要加攻击冷却计时器——状态内字段管理本状态的数据。"
    ],
    pit: "状态切换的瞬间（如进入 Attack）需要\"进入动作\"（扑击动画）——switch 版要手动 if (state != lastState) 判断，这正是 IState.Enter 存在的意义。",
    tip: "巡逻路径用 Waypoints 数组 + 下标循环；追击用 NavMeshAgent 更专业。"
  },
  dp3_2: {
    more: [
      "IState 接口三方法：Enter（进入初始化）、Update（每帧行为）、Exit（离开清理）。",
      "主类持有当前 IState 引用，切换时 current.Exit() → current = next → current.Enter()。",
      "状态类可以缓存主类引用（构造传入），访问共享数据（玩家位置等）。"
    ],
    pit: "状态类里 StartCoroutine 要用主类 MonoBehaviour 的引用启动——状态类自己不是 MonoBehaviour。",
    tip: "进阶一步是状态机类（StateMachine 管理 IState 字典），再进一步是 HFSM——按需求逐步升级。"
  },
  dp4_0: {
    more: [
      "池的两种结构：List 遍历找空闲 / Queue 队列弹出——队列版 O(1) 取用。",
      "扩容策略：池空时 Instantiate 新的（池永不拒绝请求）；初始容量按峰值预估减少运行时创建。",
      "池最好挂独立管理器物体并 DontDestroyOnLoad——跨场景的子弹池不随关卡销毁。"
    ],
    pit: "用 activeInHierarchy 判断空闲时，父物体隐藏会导致\"全部视为不可用\"——用 activeSelf 更精确。",
    tip: "池管理器用字典按 Prefab 名字管理多个池：Get(\"bullet\")/Get(\"hitFx\") 一套代码管全部。"
  },
  dp4_1: {
    more: [
      "开火三件套：从池取、设置位置朝向、配置组件（速度/伤害）——顺序不能颠倒。",
      "子弹\"自回收\"设计：Bullet 脚本持有池引用（或全局池单例），生命周期结束自动 Return。",
      "计时回收：Bullet 的 Update 里 timer += deltaTime，超时自动回池——防止永远飞出边界。"
    ],
    pit: "从池取出后立刻 GetComponent 每次都查找——可以在回池时缓存组件，或子弹脚本自己缓存。",
    tip: "回收时把速度/刚体状态清零（velocity = Vector3.zero），否则\"旧弹速\"会带进下一次发射。"
  },
  dp4_2: {
    more: [
      "重置清单：位置、旋转、速度（velocity/angularVelocity）、生命周期计时器、材质/拖尾状态。",
      "SetActive(false) 会触发 OnDisable——协程自动停止正好符合\"回收即清理\"。",
      "伤害数字、掉落物、音效播放器都是池的常见客户——一个池管理器多池字典。"
    ],
    pit: "回收时只 SetActive(false) 不清速度，刚体休眠唤醒后带着旧速度飞——在 Return 里 velocity 清零。",
    tip: "用扩展方法 pool.Return(this) 写进对象脚本，回收动作一行完成且不易漏。"
  },
  dp5_0: {
    more: [
      "命令对象把\"谁、做什么、参数\"打包——执行与撤销封装在一起，这是它与普通回调的区别。",
      "命令可以携带状态：MoveCommand 记录移动方向，Undo 时取反方向——数据进构造函数。",
      "命令也可以做成结构体或纯 Lambda 包装（Action do, Action undo 的元组命令）——轻量场景够用。"
    ],
    pit: "Undo 需要记录\"执行前的状态\"（如移动前的位置）时，命令对象要在 Execute 前保存快照。",
    tip: "策略游戏指令、文本编辑器操作、建造游戏拆除——一切\"可撤销\"需求都是命令模式。"
  },
  dp5_1: {
    more: [
      "输入重映射表：Dictionary<KeyCode, Func<ICommand>>——设置界面改表即改键。",
      "撤销栈配 \"重做栈\"：Undo 时命令压入重做栈，Redo 时再弹回——双栈结构。",
      "栈上限与清空时机：新命令会清空重做栈（时间线分叉）；栈深限制 100 步防内存。"
    ],
    pit: "命令执行失败（如移动被墙挡住）就不该入栈——Execute 返回 bool 成功才 Push。",
    tip: "关卡编辑器的每一步都是命令：放置/删除/移动方块——编辑器 Undo 系统就是这样长出来的。"
  },
  dp6_0: {
    more: [
      "工厂把\"选择配置→实例化→初始化→注册事件\"四步收拢——调用方一行 Create(\"goblin\", pos)。",
      "EnemyDatabase/配置表让\"类型→数据\"数据驱动：新敌人类型可能只是新配置。",
      "工厂返回的引用可继续链式配置：Create(...).SetLevel(3)。"
    ],
    pit: "工厂方法越写越长（if 地狱）是退化信号——拆注册表或按类型分派给子工厂。",
    tip: "波次刷怪器 + 工厂 = 关卡设计数据化：波次表写类型字符串，运行时工厂照单生产。"
  },
  dp6_1: {
    more: [
      "注册表的 Value 是 Func<Vector3, Enemy>（创建函数）——Lambda 让\"怎么造\"也数据化。",
      "启动时注册：EnemyFactory.Register(\"goblin\", pos => CreateGoblin(pos));——注册表是插件化思想。",
      "与 ScriptableObject 结合：注册表 Value 换成\"敌人定义 SO\"，配置即注册。"
    ],
    pit: "字典按字符串类型查找，键拼错运行时才炸——用 const 或枚举常量做键。",
    tip: "注册表模式+配置表是\"数据驱动游戏\"的两大支柱——商业项目几乎必见。"
  },
  dp7_0: {
    more: [
      "策略三件套：统一接口（IDamageStrategy）、多个实现类、调用方持有接口引用。",
      "策略与状态机的配合：状态决定\"当前用哪个策略\"（战斗状态用攻击策略，巡逻用巡逻策略）。",
      "策略也可以是 Lambda/委托的轻量形态——简单策略直接传函数，不必立类。"
    ],
    pit: "策略类持有可变状态会让\"共享单例策略\"出 bug——保持策略无状态（数据走参数）。",
    tip: "伤害公式、寻路算法（A*/Dijkstra）、掉落规则——\"算法可替换\"的场景全是策略。"
  },
  dp7_1: {
    more: [
      "运行时切换 = 换持的引用：weapon.EquipStrategy(new MagicDamage())——buff 系统就是策略热插拔。",
      "与继承对比：物理剑/魔法剑两种子类无法运行时变化，也无法复用\"物理\"给非武器。",
      "多策略组合：武器可同时挂\"基础伤害策略 + 暴击修饰策略\"——装饰器思想顺势引入。"
    ],
    pit: "策略接口设计太宽（一堆不相关方法）会让实现类全是空方法——接口要小而精。",
    tip: "比较器、伤害公式、掉落规则、AI 行为——策略模式在游戏里出现的频率 top 3。"
  },
  dp8_0: {
    more: [
      "Unity 一切皆组件：Transform/Renderer/你写的脚本——引擎本身就是组合模式的教科书。",
      "组合的扩展公式：新能力 = 新组件。\"会飞的敌人\"= 移动组件换成飞行实现。",
      "继承的扩展公式：新能力 = 新子类。\"既会飞又会远程\"需要多重继承——C# 不允许。"
    ],
    pit: "组件间到处 GetComponent 直接引用，拆分了文件却没拆分耦合——用事件或引用注入降低耦合。",
    tip: "重构旧项目第一步：把上帝类的每个 Update 职责拆成独立组件，行为不变。"
  },
  dp8_1: {
    more: [
      "拆分后的协作三方式：直接引用（紧耦合最直白）、事件（松耦合）、Manager 中转（全局协调）。",
      "依赖注入入门：字段 [SerializeField] 拖引用就是最朴素的\"构造注入\"。",
      "测试收益：PlayerCombat 不依赖移动即可单独测试——组件单一职责的额外红利。"
    ],
    pit: "组件 A 在 Update 直接改组件 B 的私有逻辑——拆了文件没拆职责，等于没拆。",
    tip: "每个组件的 Update 只做自己的事；跨组件协作通过事件或显式方法调用（被调用方提供接口）。"
  },
  dp9_0: {
    more: [
      "SO 的三种常见角色：配置表（敌人/武器数值）、能力资产（技能定义）、事件通道（资产级解耦）。",
      "[CreateAssetMenu] 让策划右键创建资产；资产是 Project 里的文件，可进版本管理。",
      "SO 与 Prefab：Prefab 是物体模板，SO 是数据模板——两者配合（Prefab 引用 SO 配置）。"
    ],
    pit: "编辑器模式下运行时修改 SO 字段会永久写回资产文件——\"调个数值把配置改了\"的事故高发。",
    tip: "需要每实例独立数据时 Instantiate(config) 克隆；需要全局共享调参时直接引用资产。"
  },
  dp9_1: {
    more: [
      "克隆副本的代价：运行时 Instantiate 有小开销且修改不进版本管理——明确\"这是运行时数据\"。",
      "SO 数组武器表：策划增删武器只改资产数组——工厂/策略按 SO 内容生产。",
      "SO 也可以存引用：Prefab、AudioClip、其他 SO——资产网络随便连。"
    ],
    pit: "把玩家当前血量存进 SO——所有玩家共享一份血量且重启重置，存档必须用文件/PlayerPrefs。",
    tip: "SO + 工厂 + 策略 = 完全数据驱动的敌人系统：新敌人 = 新配置资产。"
  },
  dp10_0: {
    more: [
      "分层判断标准：\"这行代码改动时，最坏会影响哪些层？\"——跨层影响就是耦合警报。",
      "事件是层间的\"单向通知\"：逻辑层广播，表现层订阅——反向调用（逻辑改 UI）是分层大忌。",
      "分层不必教条：小项目 View 与 Logic 可以在一个 MonoBehaviour 里，但\"数据与显示分离\"的底线要守。"
    ],
    pit: " Logic 层直接 Find(\"ScoreText\") 改 UI——逻辑与场景结构耦合，UI 改名逻辑就崩。",
    tip: "自测标准：把 UI 全删了，游戏逻辑还能跑吗（分数还在涨）？能，说明分层成功。"
  },
  dp10_1: {
    more: [
      "链路逐环看：金币（触发者）→ 逻辑层 AddScore（规则）→ 事件（通知）→ UI/存档/成就（响应者）。",
      "存档属于\"数据层\"：AddScore 顺带更新 Best 是数据层职责，UI 的 Best 显示仍是订阅。",
      "每个环节都可替换：金币换宝箱、UI 换皮肤、存档换云——链路上的节点即插即用。"
    ],
    pit: "事件链路过长（A→B→C→D→E）排查困难——关键流程用显式调用，旁支用事件。",
    tip: "给事件链路加日志前缀（[Score][Logic]）——多系统联调时链路清晰可见。"
  },
  dp10_2: {
    more: [
      "GameManager 的反模式自测：它有没有 import TMPro？有没有 GetComponent<Enemy>?——有就越界了。",
      "GameManager 常见正例：状态枚举、分数属性+事件、场景切换调度、暂停开关。",
      "系统越铺越多时，把 GameManager 拆成 GameFlow（流程）+ ScoreService（分数）+ Config（配置）。"
    ],
    pit: "万事问 GameManager.Instance——所有代码都依赖它，它就成了\"全局变量集中营\"。",
    tip: "新项目目录模板：Scripts/{Core,Player,Enemies,UI,Managers} + Prefabs + ScriptableObjects——结构先行。"
  }
});
