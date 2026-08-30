// 核心系统实战专题 —— 游戏开发十大常用系统的完整实现思路
window.SYS_COURSE = {
  id: "sys",
  title: "核心系统实战",
  short: "系统实战",
  emoji: "⚙️",
  color: "#00b8d4",
  desc: "索敌、血量伤害、开火、子弹、背包、合成、商店、存档、波次生成——十大系统完整代码思路，抄走就能用。",
  lessons: [
    {
      id: "s1", title: "索敌系统", mins: 14,
      kps: [
        { t: "最近敌人查找", d: "用 Physics.OverlapSphere 收集范围内碰撞体，按距离取最近——炮塔、自动瞄准的基座。", c: "Transform FindNearest(float range) {\n    var hits = Physics.OverlapSphere(transform.position, range);\n    Transform best = null;\n    float bestDist = float.MaxValue;\n    foreach (var hit in hits) {\n        if (!hit.CompareTag(\"Enemy\")) continue;\n        float d = (hit.transform.position - transform.position).sqrMagnitude;\n        if (d < bestDist) { bestDist = d; best = hit.transform; }\n    }\n    return best; // 没有敌人返回 null\n}" },
        { t: "视野检测：角度 + 遮挡", d: "\"看得见\"= 在视野夹角内 + 中间没有墙（射线检测）。两个条件缺一不可。", c: "bool CanSee(Transform target, float viewAngle, float range) {\n    Vector3 dir = target.position - transform.position;\n    if (dir.sqrMagnitude > range * range) return false;      // 太远\n    if (Vector3.Angle(transform.forward, dir) > viewAngle / 2) return false; // 不在视野锥内\n    return !Physics.Raycast(transform.position, dir.normalized,\n                            dir.magnitude, wallMask);         // 中间没墙\n}" },
        { t: "案例精讲：自动索敌炮塔", d: "每 0.2 秒索敌一次（别每帧全场景扫），锁定后炮口转向并按射速开火。", c: "private Transform target;\nprivate float scanTimer;\n\nvoid Update() {\n    scanTimer += Time.deltaTime;\n    if (scanTimer >= 0.2f) {          // 5 次/秒索敌足够\n        scanTimer = 0;\n        target = FindNearest(15f);\n    }\n    if (target == null) return;\n\n    // 炮口平滑转向目标\n    Vector3 dir = target.position - muzzle.position;\n    muzzle.rotation = Quaternion.Lerp(muzzle.rotation,\n        Quaternion.LookRotation(dir), Time.deltaTime * 8f);\n\n    fireTimer += Time.deltaTime;      // 按射速开火\n    if (fireTimer >= 1f / fireRate && 夹角小于5度()) {\n        fireTimer = 0;\n        Fire();\n    }\n}" }
      ],
      qs: [
        { q: "Physics.OverlapSphere 的返回类型是？", opts: ["Collider[]（范围内的所有碰撞体）", "Transform", "GameObject", "bool"], a: 0, ex: "返回范围内碰撞体数组，配合 LayerMask 参数可以只检测敌人层。" },
        { q: "比较\"最近\"用 sqrMagnitude 的好处是？", opts: ["免开方，性能更好且结果等价", "数值更精确", "可以比较更多物体", "没有好处"], a: 0, ex: "只需要比大小不用真距离时，平方距离省掉开方开销——索敌高频调用必优化。" },
        { q: "视野检测的两个必要条件是？", opts: ["在视野夹角内 + 射线不被墙挡住", "距离够近 + 是敌人", "在屏幕内 + 正对自己", "有 Tag + 有 Collider"], a: 0, ex: "Vector3.Angle 判夹角，Raycast 判遮挡——\"透视墙\"bug 就是漏了射线检测。" },
        { q: "自动索敌炮塔为什么用 0.2 秒间隔而不是每帧索敌？", opts: ["OverlapSphere 全场景扫描有开销，降频足够用", "每帧会报错", "0.2 秒更精准", "没有原因"], a: 0, ex: "索敌不需要 60 次每秒的精度——降频到 5 次/秒，性能省 12 倍，玩家无感。" },
        { q: "目标敌人死亡后，炮塔的 target 引用会？", opts: ["指向已销毁物体（fake null），需要清理或重新索敌", "自动清空", "自动切换新目标", "报错"], a: 0, ex: "用 if (target == null) target = FindNearest(...) 自愈，或敌人死亡时广播事件让炮塔清引用。" },
        { q: "索敌时只检测\"敌人层\"，用什么参数？", opts: ["OverlapSphere 的 layerMask 参数", "改所有敌人 Tag", "遍历后 if 判断 Tag", "无法过滤"], a: 0, ex: "LayerMask 在 Inspector 里可视化配置，把检测范围限制在 Enemy 层，又快又稳。" },
        { q: "炮口转向目标用的 Quaternion.Lerp 第三参数是？", opts: ["插值系数（0~1，越大转得越快）", "角度", "时间秒", "距离"], a: 0, ex: "Lerp 平滑转向比 LookAt 瞬间对齐更有\"机械感\"——塔防游戏手感来源。" },
        { q: "多炮塔共享索敌结果时，索敌逻辑应该放在？", opts: ["独立的 TargetingSystem 单例/管理器，炮塔向它查询", "每个炮塔各自全场景扫描", "玩家脚本里", "UI 层"], a: 0, ex: "索敌作为独立系统供多处查询，避免 N 个炮塔 N 份重复扫描。" }
      ]
    },
    {
      id: "s2", title: "血量与伤害系统", mins: 12,
      kps: [
        { t: "TakeDamage 核心", d: "所有受伤走同一个方法：扣血、钳制、广播事件、判死——外部永远不直接改 hp 字段。", c: "public class Health : MonoBehaviour {\n    [SerializeField] private int maxHp = 100;\n    public int Hp { get; private set; }\n    public bool IsDead => Hp <= 0;\n\n    public event Action<int> OnDamaged;  // 参数：剩余血量\n    public event Action OnDied;\n\n    void Awake() { Hp = maxHp; }\n\n    public void TakeDamage(int dmg) {\n        if (IsDead) return;              // 尸体不再受伤\n        Hp = Mathf.Max(0, Hp - dmg);\n        OnDamaged?.Invoke(Hp);\n        if (Hp == 0) OnDied?.Invoke();\n    }\n\n    public void Heal(int amount) =>\n        Hp = Mathf.Min(maxHp, Hp + amount);\n}" },
        { t: "暴击与伤害浮动", d: "真实感来自随机浮动：基础伤害 ±20% 浮动，25% 概率暴击双倍。", c: "int DealDamage(int baseAtk, float critChance = 0.25f) {\n    float roll = Random.Range(0.8f, 1.2f);        // ±20% 浮动\n    bool isCrit = Random.Range(0f, 100f) < critChance * 100;\n    int dmg = Mathf.RoundToInt(baseAtk * roll * (isCrit ? 2f : 1f));\n    return dmg;\n}" },
        { t: "阵营与误伤防护", d: "敌人不该伤害敌人：用 Layer（物理矩阵）或阵营枚举判断——靠 Tag 逐个比是下策。", c: "public enum Faction { Player, Enemy, Neutral }\npublic Faction faction;\n\n// 伤害入口带来源阵营判断\npublic void TakeDamage(int dmg, Faction source) {\n    if (source == faction) return;    // 友军免疫\n    ...\n}" }
      ],
      qs: [
        { q: "为什么外部不能直接写 enemy.hp -= 10，而必须调 TakeDamage？", opts: ["受伤有钳制、事件广播、死亡判断等统一逻辑，绕过会全部失效", "没有原因", "性能更差", "编译不过"], a: 0, ex: "hp 设 private + TakeDamage 公共入口——\"改血必走门\"是伤害系统的铁律。" },
        { q: "IsDead 守卫（if (IsDead) return;）防止的问题是？", opts: ["死亡后再次受击导致血量为负、事件重复触发", "攻击速度过快", "敌人复活", "编译错误"], a: 0, ex: "多发子弹同帧命中同一目标时，只有第一发会触发 OnDied。" },
        { q: "25% 暴击概率的正确判定写法是？", opts: ["Random.Range(0f, 100f) < 25f", "Random.Range(0, 4) == 0 也可以", "两者都可以（思路：随机值落在暴击区间）", "Random.bool()"], a: 2, ex: "两种都等价：随机数落入 25% 的区间即暴击。选项 2 是\"1/4 概率\"的整数版。" },
        { q: "Heal 用 Mathf.Min(maxHp, Hp + amount) 的原因是？", opts: ["治疗不能超过最大血量上限", "治疗必须为负数", "防止负数", "没有原因"], a: 0, ex: "钳制上限与 TakeDamage 钳制 0 对称——血量永远在 [0, maxHp] 区间。" },
        { q: "防止敌人误伤敌人的推荐方案是？", opts: ["阵营枚举/物理碰撞矩阵过滤", "给每个敌人起不同名字", "降低伤害数值", "无法防止"], a: 0, ex: "Faction 枚举一行判断，或 Physics 层矩阵直接让敌我子弹不检测友军。" },
        { q: "伤害飘字系统想知道\"这次打了多少伤害\"，Health 系统应该？", opts: ["OnDamaged 事件携带数值（甚至带是否暴击）", "让飘字系统每帧读血量差值", "不提供这个信息", "写在 Console"], a: 0, ex: "事件带参数把\"发生了什么\"说清楚——订阅者不需要反推。" },
        { q: "死亡表现（倒地动画、掉落）延迟 2 秒再销毁物体，代码是？", opts: ["OnDied 触发后 StartCoroutine 延迟 Destroy", "立即 Destroy", "不销毁", "SetActive(false) 就够"], a: 0, ex: "死亡不等于立刻消失：先广播事件（表现层响应），协程延时清理（或直接进对象池）。" },
        { q: "受伤还想附加\"无敌帧\"（短暂免伤），在 TakeDamage 开头加？", opts: ["if (Time.time < invincibleUntil) return;", "if (invincible) Destroy(this);", "hp = maxHp;", "没有无敌帧概念"], a: 0, ex: "记录无敌截止时间（Time.time + 0.5f），受伤入口统一判断——受击闪烁同时做。" }
      ]
    },
    {
      id: "s3", title: "开火系统", mins: 14,
      kps: [
        { t: "射速控制：三态输入 + 冷却计时", d: "单击（Down）、按住连发（GetMouseButton）、冷却计时器 fireTimer >= 1/fireRate——三件套构成完整开火。", c: "[SerializeField] private float fireRate = 5f;      // 每秒 5 发\nprivate float fireTimer;\n\nvoid Update() {\n    fireTimer += Time.deltaTime;\n\n    if (Input.GetKeyDown(KeyCode.Space)) Fire();          // 单发\n    if (Input.GetMouseButton(0) && fireTimer >= 1f / fireRate) {\n        Fire();                                           // 按住连发\n        fireTimer = 0;\n    }\n}" },
        { t: "发射方向与散布", d: "从枪口沿朝向发射；加\"随机散布\"让连发有真实感（准星会扩散就是这个原理）。", c: "void Fire() {\n    Vector3 dir = transform.forward;\n    dir += transform.right * Random.Range(-spread, spread);\n    dir += transform.up * Random.Range(-spread, spread);\n    dir.Normalize();\n\n    var bullet = bulletPool.Get();\n    bullet.transform.SetPositionAndRotation(muzzle.position, Quaternion.LookRotation(dir));\n    bullet.GetComponent<Bullet>().Launch(bulletSpeed);\n}" },
        { t: "案例精讲：弹药与换弹", d: "弹匣 30 发、备弹无限或有限；打空自动换弹（协程 2 秒），换弹期间禁止开火。", c: "[SerializeField] private int magSize = 30;\nprivate int ammo;\nprivate bool reloading;\n\nvoid Start() { ammo = magSize; }\n\nvoid Update() {\n    if (reloading) return;\n    if (ammo <= 0 || Input.GetKeyDown(KeyCode.R)) { StartCoroutine(Reload()); return; }\n    if (Input.GetMouseButton(0) && fireTimer >= 1f / fireRate && ammo > 0) {\n        Fire(); ammo--; fireTimer = 0;\n    }\n}\n\nIEnumerator Reload() {\n    reloading = true;\n    yield return new WaitForSeconds(2f);\n    ammo = magSize;\n    reloading = false;\n}" }
      ],
      qs: [
        { q: "fireRate = 5 表示每秒 5 发，两次开火的最小间隔是？", opts: ["1f / fireRate = 0.2 秒", "fireRate 秒", "5 秒", "0.05 秒"], a: 0, ex: "射速取倒数就是冷却时间——fireTimer 与它比较实现射速限制。" },
        { q: "按住鼠标实现\"自动连发\"的输入判断是？", opts: ["Input.GetMouseButton(0)（按住期间每帧 true）+ 冷却计时", "GetMouseButtonDown(0) 每帧触发", "GetMouseButtonUp(0)", "无法实现连发"], a: 0, ex: "Down 系列只在按下瞬间为真；连发 = 按住状态 + 冷却计时器。" },
        { q: "枪口开火方向加随机散布的目的是？", opts: ["模拟真实后坐力与准度限制，连发更真实", "让子弹更慢", "减少伤害", "没有意义"], a: 0, ex: "散布值加在 right/up 轴上再 Normalize——准星扩散 UI 与它数值联动。" },
        { q: "换弹期间禁止开火，用的状态标记是？", opts: ["bool reloading，Update 开头 return", "删除开火代码", "timeScale = 0", "把枪藏起来"], a: 0, ex: "\"状态标记\"是最轻量的流程门禁——更系统的做法并入武器状态机。" },
        { q: "弹匣打空时自动换弹的条件写法是？", opts: ["ammo <= 0 时启动协程 Reload", "ammo < 0 才换", "永远手动换", "无法检测"], a: 0, ex: "ammo <= 0 提前换弹（或留 1 发提示手动按 R）——手感设计决定。" },
        { q: "换弹协程 WaitForSeconds(2f) 期间玩家按下开火键会？", opts: ["被 reloading 标记挡住，不会开火", "照常开火", "取消换弹", "报错"], a: 0, ex: "Update 的 if (reloading) return 是门卫——换弹动画/音效可以同时在播。" }
      ]
    },
    {
      id: "s4", title: "子弹脚本", mins: 12,
      kps: [
        { t: "子弹移动与自动回收", d: "直线飞行的子弹不需要物理力：直接设刚体速度 + 生命周期超时回收（防止永远飞出边界）。", c: "public class Bullet : MonoBehaviour {\n    [SerializeField] private float lifeTime = 3f;\n    private float timer;\n    private Rigidbody rb;\n\n    void Awake() { rb = GetComponent<Rigidbody>(); }\n\n    public void Launch(float speed) {\n        rb.velocity = transform.forward * speed;\n        timer = 0;\n    }\n\n    void Update() {\n        timer += Time.deltaTime;\n        if (timer >= lifeTime) BulletPool.Instance.Return(gameObject);\n    }\n}" },
        { t: "命中处理：别打自己人", d: "OnTriggerEnter 里三件事：排除发射者、判断目标可受击、造成伤害并回收自己。", c: "private Faction faction;        // 发射者阵营\n[SerializeField] private int damage = 10;\n\nvoid OnTriggerEnter(Collider other) {\n    if (other.gameObject == shooter) return;      // 别打自己\n    var health = other.GetComponent<Health>();\n    if (health == null) return;                   // 打到墙等无血量物体\n    health.TakeDamage(damage);\n    BulletPool.Instance.Return(gameObject);       // 命中即回收\n}" },
        { t: "进阶：追踪弹与穿透弹", d: "追踪弹每帧朝目标旋转（转向速度限制转率）；穿透弹命中后不回收，记录已命中列表防重复伤害。", c: "// 追踪：每帧朝目标转向，保持前进速度\nvar dir = target.position - transform.position;\nvar rot = Quaternion.LookRotation(dir);\ntransform.rotation = Quaternion.RotateTowards(\n    transform.rotation, rot, turnSpeed * Time.deltaTime);\nrb.velocity = transform.forward * speed;\n\n// 穿透：HashSet<Collider> hitSet 记录已命中\nif (!hitSet.Add(other)) return; // 已打过就不重复" }
      ],
      qs: [
        { q: "子弹直线飞行的最简实现是？", opts: ["rb.velocity = transform.forward * speed（物理引擎接管）", "Update 里打印坐标", "手动逐帧 SetPosition", "用 NavMesh"], a: 0, ex: "刚体速度交给物理引擎，碰撞、穿透检测全部自动处理。" },
        { q: "子弹需要\"生命周期超时回收\"的原因是？", opts: ["没命中的子弹会永远飞下去累积占用", "子弹会老化", "性能无关", "为了美观"], a: 0, ex: "3 秒没命中就当脱靶回收——对象池配生命周期是标配。" },
        { q: "防止子弹打中发射者自己的方案不包括？", opts: ["把子弹设为敌方 Tag 就不会打自己", "记录 shooter 引用比较", "物理碰撞矩阵忽略发射层", "发射瞬间短暂忽略自身碰撞"], a: 0, ex: "三种都可行；最简单的是碰撞矩阵把\"玩家子弹层\"与\"玩家层\"取消检测。" },
        { q: "追踪弹每帧\"转向目标但保持前进\"的关键 API 是？", opts: ["Quaternion.RotateTowards + transform.forward 速度", "直接 position = target.position", "LookAt 传送", "AddForce 朝目标"], a: 0, ex: "RotateTowards 限制每帧最大转角——转得快就是\"高机动导弹\"，转得慢是\"笨重火箭\"。" },
        { q: "穿透弹防止\"同一目标重复扣血\"的数据结构是？", opts: ["HashSet<Collider> 记录已命中目标", "List 每帧清空", "不用记录", "Dictionary<string>"], a: 0, ex: "Add 返回 false 即已命中——一个 HashSet 解决穿透伤害去重。" },
        { q: "子弹伤害值应该定义在哪里？", opts: ["子弹脚本字段（或引用武器配置），命中时传给 Health.TakeDamage", "硬编码在 Health 里", "写在墙上", "随机数"], a: 0, ex: "伤害属于\"子弹/武器\"的数据——配 [SerializeField] 可在 Inspector 调平衡。" },
        { q: "命中墙（没有 Health 组件）时正确处理是？", opts: ["GetComponent 为 null 就只做命中特效并回收", "报错", "给墙加血量", "忽略所有碰撞"], a: 0, ex: "GetComponent 判空分 流程：能打就扣血，不能打只出特效——两种都要回收子弹。" }
      ]
    },
    {
      id: "s5", title: "背包系统——数据层", mins: 14,
      kps: [
        { t: "数据结构设计", d: "格子制（List<Slot>，槽含物品与数量）是主流：支持堆叠上限与有序摆放。物品用 id 引用配置表。", c: "[Serializable]\npublic class InventorySlot {\n    public string itemId;   // null = 空槽\n    public int count;\n}\n\npublic class Inventory {\n    public List<InventorySlot> slots = new();\n    public int capacity = 20;\n\n    public event Action OnChanged;  // 任何变化通知 UI\n}" },
        { t: "AddItem：堆叠与开新格", d: "先找\"同物品未满的槽\"堆叠，找不到再开新格；背包满返回 false——调用方决定怎么提示。", c: "public bool AddItem(string id, int amount, int stackMax = 99) {\n    // 第一轮：堆到已有的格子\n    foreach (var s in slots)\n        if (s.itemId == id && s.count < stackMax) {\n            int can = Math.Min(stackMax - s.count, amount);\n            s.count += can; amount -= can;\n            if (amount == 0) { OnChanged?.Invoke(); return true; }\n        }\n    // 第二轮：开新格子\n    while (amount > 0) {\n        if (slots.Count >= capacity) { OnChanged?.Invoke(); return false; }\n        int put = Math.Min(stackMax, amount);\n        slots.Add(new InventorySlot { itemId = id, count = put });\n        amount -= put;\n    }\n    OnChanged?.Invoke();\n    return true;\n}" },
        { t: "RemoveItem 与查询", d: "Remove 先校验总量够不够（不够返回 false 一件不动），再倒序逐格扣。HasItem/CountItem 是合成系统的地基。", c: "public int CountItem(string id) => slots\n    .Where(s => s.itemId == id).Sum(s => s.count);\n\npublic bool HasItems(Dictionary<string, int> needs) {\n    foreach (var kv in needs)\n        if (CountItem(kv.Key) < kv.Value) return false;\n    return true;\n}" }
      ],
      qs: [
        { q: "背包数据层最重要的设计原则是？", opts: ["不依赖任何 UI——纯数据类可独立测试", "必须继承 MonoBehaviour", "必须用 Dictionary", "数据与 UI 写在一起"], a: 0, ex: "数据层发 OnChanged 事件，UI 订阅刷新——换 UI 界面数据层零改动（分层复习）。" },
        { q: "堆叠上限 99，已有 90 个药水再 Add 20 个，结果是？", opts: ["该格满 99，剩余 11 开新格（或背包满则失败）", "一格塞 110 个", "丢失 20 个", "报错"], a: 0, ex: "AddItem 的\"先堆叠后开格\"两轮逻辑就是处理这个场景。" },
        { q: "RemoveItem 前先校验总量是否足够的原因是？", opts: ["避免\"扣到一半发现不够\"造成物品凭空消失", "加快速度", "没有原因", "编译要求"], a: 0, ex: "\"先验后扣\"保证操作原子性——合成系统直接复用 HasItems 校验。" },
        { q: "CountItem 的 LINQ 实现（Where + Sum）属于热路径吗？", opts: ["背包操作是低频操作，LINQ 可放心使用", "每帧都会调用", "LINQ 不能用于背包", "必须手写循环"], a: 0, ex: "玩家点击才触发的低频逻辑用 LINQ 简洁；每帧调用的战斗逻辑才需要手写循环。" },
        { q: "同一格子能放\"剑\"和\"药水\"混合吗？", opts: ["不能——格子按 itemId 堆叠，不同物品开不同格子", "可以", "看心情", "数量够就行"], a: 0, ex: "itemId 不同即不同堆叠——这是格子制背包的基本规则。" },
        { q: "背包容量已满时 AddItem 返回 false 的意义是？", opts: ["把\"失败决定权\"交给调用方（弹出提示/掉落地面）", "静默丢弃", "游戏崩溃", "自动扩容"], a: 0, ex: "数据层不做 UI 决策：返回 bool，调用方弹\"背包已满\"提示或让物品掉地上。" },
        { q: "金币这类\"只有一个总数\"的物品，适合放进格子背包吗？", opts: ["更适合独立的 Wallet/金币计数器（无需格子）", "必须占一个格子", "不能存", "要开 100 个格子"], a: 0, ex: "金币是无上限计数资源——独立 Wallet 类 + OnChanged 事件更简洁。" },
        { q: "背包数据想存档，序列化的对象是？", opts: ["slots 列表（itemId + count）转 JSON", "序列化 UI 的 Text", "序列化 GameObject", "无法序列化"], a: 0, ex: "数据层结构天然可序列化——这又是\"数据与 UI 分离\"的红利。" }
      ]
    },
    {
      id: "s6", title: "背包系统——UI 同步", mins: 12,
      kps: [
        { t: "格子生成与刷新", d: "UI 只做一件事：把数据层的 slots 画出来。订阅 OnChanged，变化时重建（或复用）格子。", c: "public class InventoryUI : MonoBehaviour {\n    [SerializeField] private Inventory inventory;\n    [SerializeField] private GameObject slotPrefab;\n    [SerializeField] private Transform grid;\n\n    void OnEnable()  { inventory.OnChanged += Refresh; Refresh(); }\n    void OnDisable() { inventory.OnChanged -= Refresh; }\n\n    void Refresh() {\n        // 简单做法：清空重建（格子少时足够）\n        foreach (Transform c in grid) Destroy(c.gameObject);\n        foreach (var s in inventory.slots) {\n            var cell = Instantiate(slotPrefab, grid).GetComponent<SlotUI>();\n            cell.Bind(s.itemId, s.count);\n        }\n    }\n}" },
        { t: "点击使用：闭包与索引", d: "格子点击回调要\"知道自己是哪一格\"——用闭包捕获下标（或格子对象引用），调用数据层 UseItem。", c: "// 数据层提供\npublic void UseItem(int index) {\n    var s = slots[index];\n    ItemDatabase.Get(s.itemId).Use(player); // 药水回血等\n    s.count--;\n    if (s.count <= 0) slots[index] = new InventorySlot();\n    OnChanged?.Invoke();\n}\n\n// UI 绑定\ncell.GetComponent<Button>().onClick.AddListener(() => {\n    inventory.UseItem(index);   // index 是当轮循环的局部变量\n});" },
        { t: "数量与图标显示", d: "图标来自 ItemDatabase（itemId → 图标/名称/描述）；数量 > 1 才显示数字——格子 UI 的信息层级。", c: "public void Bind(string itemId, int count) {\n    var info = ItemDatabase.Get(itemId);\n    icon.sprite = info.icon;\n    countText.text = count > 1 ? count.ToString() : \"\";\n}" }
      ],
      qs: [
        { q: "InventoryUI 订阅 OnChanged 后，谁负责触发刷新？", opts: ["数据层的每次增删改都会触发事件，UI 自动刷新", "UI 每帧轮询", "手动点按钮刷新", "不需要刷新"], a: 0, ex: "数据驱动的 UI：数据变 → 事件 → 重画。任何系统改背包，界面都自动同步。" }
      ],
      qs2: [
        { q: "格子点击回调捕获循环变量 index 的正确姿势是？", opts: ["在循环体内用局部变量复制后再捕获（或直接捕获槽对象引用）", "直接捕获循环变量 i", "捕获不了", "用全局变量"], a: 0, ex: "经典闭包坑：直接捕获循环变量，所有按钮共用最后一个值。" },
        { q: "\"清空重建\"刷新格子在大背包（100+ 格）时的优化方向是？", opts: ["复用格子对象（只更新内容），或只刷新变化的槽", "增加格子数量", "换更大的屏幕", "没有优化空间"], a: 0, ex: "Instantiate/Destroy 有成本——对象池思想同样适用于 UI 格子。" },
        { q: "物品图标与名称从哪来？", opts: ["ItemDatabase 静态表/配置资产按 itemId 查询", "UI 组件自带", "玩家手输", "随机生成"], a: 0, ex: "itemId 是唯一钥匙，数据库（SO 数组或静态表）按钥匙取图标名称描述。" },
        { q: "数量文本\"count > 1 才显示\"的原因是？", opts: ["1 个物品不需要\"×1\"的噪音信息，界面更干净", "数字会报错", "必须显示", "为了好看"], a: 0, ex: "信息层级：图标为主、数量为辅——细节决定 UI 质感。" },
        { q: "UseItem 里\"数量减到 0 清空槽\"的意义是？", opts: ["itemId 置 null 表示空槽，避免显示幽灵物品", "让数组变短", "没有意义", "触发成就"], a: 0, ex: "格子制背包槽位固定，\"清空\"= 恢复空槽默认值而不是移除格子。" }
      ]
    },
    {
      id: "s7", title: "合成系统", mins: 14,
      kps: [
        { t: "配方定义", d: "配方 = 材料表（itemId→数量）+ 产物（itemId+数量）。做成 ScriptableObject 资产，策划加配方不改代码。", c: "[CreateAssetMenu(menuName = \"Config/Recipe\")]\npublic class Recipe : ScriptableObject {\n    public List<Ingredient> inputs;\n    public string outputId;\n    public int outputCount = 1;\n}\n\n[Serializable]\npublic class Ingredient {\n    public string itemId;\n    public int amount;\n}" },
        { t: "CanCraft 校验 + Craft 执行", d: "先校验全部材料足够（一件不动），再按配方扣材料、加产物——\"先验后做\"保证原子性。", c: "public bool CanCraft(Recipe r) => inventory.HasItems(\n    r.inputs.ToDictionary(i => i.itemId, i => i.amount));\n\npublic bool Craft(Recipe r) {\n    if (!CanCraft(r)) return false;\n    foreach (var ing in r.inputs)\n        inventory.RemoveItem(ing.itemId, ing.amount);\n    inventory.AddItem(r.outputId, r.outputCount);\n    OnCrafted?.Invoke(r);\n    return true;\n}" }
      ],
      qs: [
        { q: "合成校验\"先验后扣\"（先 CanCraft 再逐个扣）的原子性风险是？", opts: ["两次检查之间数据变化可能漏判——单机游戏影响小，联网必须重验", "完全没有风险", "编译错误", "性能问题"], a: 0, ex: "单机版够用；联机时服务端必须再次校验——客户端永远不可信。" },
        { q: "配方做成 ScriptableObject 的好处是？", opts: ["策划在 Project 里加配方资产，不改一行代码", "合成更快", "不需要背包", "自动合成"], a: 0, ex: "新配方 = 新 SO 资产 + 拖材料列表——数据驱动配置的又一次实践。" },
        { q: "Craft 成功后的广播 OnCrafted 事件可以用于？", opts: ["成就（首次合成）、教程引导、统计、音效", "什么都不做", "扣血", "删除存档"], a: 0, ex: "\"合成了什么\"是游戏进程的重要信号——事件让无关系统各取所需。" },
        { q: "材料不足时 UI 的正确反馈是？", opts: ["材料行变红/显示缺少数量，合成按钮置灰", "静默失败", "直接崩溃", "扣血惩罚"], a: 0, ex: "CanCraft 的结果驱动 UI 状态——按钮置灰比点击后报错体验好十倍。" },
        { q: "合成需要\"在合成台附近\"才允许，距离判断写在？", opts: ["CanCraft 的校验链里（距离 + 材料）", "渲染层", "存档里", "配方 SO 里"], a: 0, ex: "校验链可组合：材料够 + 等级够 + 在台子旁——条件集中一处便于维护。" }
      ]
    },
    {
      id: "s8", title: "商店系统", mins: 12,
      kps: [
        { t: "钱包 Wallet", d: "金币与背包不同：无堆叠上限的单一计数器。独立 Wallet 类 + OnChanged 事件——不和格子背包混。", c: "public class Wallet {\n    public int Coins { get; private set; }\n    public event Action<int> OnChanged;\n\n    public bool TrySpend(int amount) {\n        if (Coins < amount) return false;\n        Coins -= amount; OnChanged?.Invoke(Coins);\n        return true;\n    }\n    public void Earn(int amount) {\n        Coins += amount; OnChanged?.Invoke(Coins);\n    }\n}" },
        { t: "买与卖", d: "买入 = 钱够 + 背包装得下（两条件都过才扣钱给货）；卖出 = 有货（按比例折价回收）。", c: "public bool Buy(ItemInfo item, int count = 1) {\n    int cost = item.price * count;\n    if (!wallet.TrySpend(cost)) return false;         // 1. 钱够吗\n    if (!inventory.AddItem(item.id, count)) {          // 2. 装得下吗\n        wallet.Earn(cost);                             // 装不下退钱！\n        return false;\n    }\n    return true;\n}\n\npublic bool Sell(string itemId, int count) {\n    if (!inventory.RemoveItem(itemId, count)) return false;\n    wallet.Earn(item.price / 2 * count);               // 半价回收\n    return true;\n}" }
      ],
      qs: [
        { q: "Buy 里\"扣钱成功但背包装不下\"的处理体现了什么原则？", opts: ["操作失败要完整回滚（退钱），不留半成品状态", "钱就不退了", "背包自动扩容", "直接崩溃"], a: 0, ex: "多步操作的事务性：任何一步失败，前面的步骤全部回退。" },
        { q: "卖出价设为买入价一半，这个设计的作用是？", opts: ["防止\"买了立刻卖\"刷金币的经济漏洞", "没有作用", "让玩家开心", "省内存"], a: 0, ex: "游戏经济系统的基础设计：回收折价维持货币回收，防通货膨胀。" },
        { q: "Wallet 不放进格子背包的原因是？", opts: ["金币是无堆叠上限的单一计数资源，独立计数器更简洁", "金币有毒", "格子放不下", "Unity 限制"], a: 0, ex: "\"计数资源\"与\"格子物品\"是两种模型——分开建模各自的系统才简单。" },
        { q: "商店商品列表来自 ScriptableObject 数组的好处是？", opts: ["策划配置上架商品与价格，不用改商店代码", "运行更快", "不用 UI", "自动打折"], a: 0, ex: "商店 = 展示配置列表 + 交易接口。每日限定商品只是\"换一份配置\"。" }
      ]
    },
    {
      id: "s9", title: "存档系统", mins: 14,
      kps: [
        { t: "JSON 序列化存档", d: "定义 SaveData 类收集需要持久化的数据，JsonUtility 转 JSON 写文件；读档反向。Unity 的持久化路径是 Application.persistentDataPath。", c: "[Serializable]\npublic class SaveData {\n    public int score;\n    public int bestScore;\n    public List<SlotData> slots = new();\n}\n\npublic static class SaveSystem {\n    public static string Path =>\n        Application.persistentDataPath + \"/save.json\";\n\n    public static void Save(SaveData data) {\n        File.WriteAllText(Path, JsonUtility.ToJson(data, true));\n    }\n\n    public static SaveData Load() {\n        if (!File.Exists(Path)) return null;\n        return JsonUtility.FromJson<SaveData>(File.ReadAllText(Path));\n    }\n}" },
        { t: "存档时机与内容取舍", d: "\"自动定期 + 关键节点\"双保险：每 30 秒、通关、购买后。临时状态（当前动画、瞬时 buff）不存——读档回到\"合理状态\"即可。", c: "public SaveData Capture() => new SaveData {\n    score = GameManager.Instance.Score,\n    bestScore = S.streakBest,\n    slots = inventory.slots.Select(s =>\n        new SlotData { itemId = s.itemId, count = s.count }).ToList()\n};\n\n// 三个时机：\n// 1. 定时协程（30 秒）  2. 购买/合成后  3. 退出应用 OnApplicationQuit" }
      ],
      qs: [
        { q: "JsonUtility.ToJson 序列化自定义类，该类必须？", opts: ["标记 [Serializable] 且字段为 public 或 [SerializeField]", "继承 MonoBehaviour", "是 static", "实现接口"], a: 0, ex: "[Serializable] 让类进入序列化系统；Dictionary 不能直接序列化（转 List 存储）。" }
      ],
      qs2: [
        { q: "Unity 的本地持久化目录是？", opts: ["Application.persistentDataPath", "Application.dataPath", "C:\\Windows", "项目 Assets 目录"], a: 0, ex: "persistentDataPath 各平台都可写且不被系统清理——dataPath（安装目录）在手机上只读。" },
        { q: "哪些数据适合存进存档？", opts: ["分数、背包、等级等\"会保留的进度\"；瞬时 buff/当前动画不存", "所有数据无脑全存", "只存最高分", "什么都不存"], a: 0, ex: "存档后回到\"合理状态\"即可：读档在出生点满血，但分数背包都在。" },
        { q: "SaveData 类新增字段后，旧存档读取会？", opts: ["新字段取默认值，旧字段正常读取（向前兼容）", "旧存档作废", "报错", "自动删除"], a: 0, ex: "JsonUtility 按字段名匹配，缺的字段用默认值——所以\"加字段\"安全，\"改字段类型\"危险。" },
        { q: "PlayerPrefs 与 JSON 文件存档的分工是？", opts: ["PlayerPrefs 存设置项与最高分等小数据；完整进度用 JSON 文件", "完全一样", "PlayerPrefs 更强大", "JSON 只能存数字"], a: 0, ex: "音量、画质选 PlayerPrefs；背包、关卡进度用文件——数据量与结构决定工具。" },
        { q: "读档文件损坏（JSON 解析失败）的防御是？", opts: ["try-catch 后返回 null 并回退到\"新游戏\"，重要节点双存档轮换", "让玩家重装游戏", "忽略错误继续", "删除游戏"], a: 0, ex: "存档损坏是差评重灾区：双存档（save.json + save.backup.json）轮换写入最稳。" },
        { q: "OnApplicationQuit 里自动保存的意义是？", opts: ["玩家直接关游戏也不丢最近进度", "没有意义", "会报错", "只在打包后有效"], a: 0, ex: "配合定期自动存档，\"玩家任何方式退出\"都有最近进度兜底。" }
      ]
    },
    {
      id: "s10", title: "波次生成器", mins: 12,
      kps: [
        { t: "波次数据与生成协程", d: "每波定义\"敌人类型、数量、间隔\"；协程外层遍历波次、内层循环生成——流程一目了然。", c: "[Serializable]\npublic class Wave {\n    public string enemyType;\n    public int count = 5;\n    public float interval = 1f;\n}\n\nIEnumerator RunWaves() {\n    foreach (var wave in waves) {\n        currentWave++;\n        OnWaveStarted?.Invoke(currentWave);\n        for (int i = 0; i < wave.count; i++) {\n            SpawnAt(RandomSpawnPoint(), wave.enemyType);\n            alive++;\n            yield return new WaitForSeconds(wave.interval);\n        }\n        yield return new WaitUntil(() => alive <= 0); // 清完再下一波\n    }\n    OnAllWavesCleared?.Invoke();\n}" },
        { t: "生成点与存活计数", d: "生成点用若干预设 Transform 随机选一个（远离玩家更佳）；存活计数由敌人死亡事件递减——波次推进的信号。", c: "[SerializeField] private Transform[] spawnPoints;\n\nVector3 RandomSpawnPoint() {\n    var p = spawnPoints[Random.Range(0, spawnPoints.Length)];\n    return p.position;\n}\n\n// 敌人死亡事件里：alive--;（波次协程正在 WaitUntil 等它归零）" },
        { t: "难度递增与波间休息", d: "波数越高数量越多间隔越短（公式或数组配置）；波与波之间给 5 秒喘息（拾取掉落、加 buff）。", c: "int CountFor(int wave) => 5 + wave * 2;         // 线性增\nfloat IntervalFor(int wave) => Mathf.Max(0.3f, 1.5f - wave * 0.1f);\nint HpFor(int wave) => 50 + wave * 10;           // 血量成长\n\nyield return new WaitForSecondsRealtime(5f);     // 波间休息（不受暂停影响）" }
      ],
      qs: [
        { q: "波次生成器\"清完当前波才进下一波\"的等待写法是？", opts: ["yield return new WaitUntil(() => alive <= 0);", "yield return null 一次", "while(alive > 0) 不 yield（死循环卡死）", "没有这个需求"], a: 0, ex: "WaitUntil 每帧检查条件——注意循环体里必须有 yield，否则卡死主线程。" },
        { q: "敌人死亡的\"存活计数递减\"由谁触发？", opts: ["敌人 OnDied 事件让生成器 alive--", "生成器每帧数一遍场景", "玩家手动报告", "不需要递减"], a: 0, ex: "死亡事件驱动计数——比\"每帧全场景扫描计数\"性能与可靠性都更好。" },
        { q: "难度递增的\"数量/间隔/血量\"随波数变化，推荐的配置方式是？", opts: ["公式（线性/指数）或波次数组配置，都便于调参", "写死在代码里不能改", "完全随机", "由玩家决定"], a: 0, ex: "公式一行调系数；数组一格格精调——两种都是\"数据驱动难度\"。" },
        { q: "生成点选择\"远离玩家更佳\"的意图是？", opts: ["避免敌人在玩家脸上凭空出现，体验差", "性能更好", "必须远离否则报错", "没有意图"], a: 0, ex: "筛选生成点：距玩家 > 10 米的点里随机——细节决定\"公平感\"。" },
        { q: "波间休息用 WaitForSecondsRealtime 而非 WaitForSeconds 的场景是？", opts: ["暂停菜单打开时休息倒计时也要走（或相反按需求）", "没有区别", "必须用 Realtime", "Unity 限制"], a: 0, ex: "timeScale 影响 WaitForSeconds——暂停时休息也该暂停就用普通版；想\"绝对真实时间\"用 Realtime。" },
        { q: "最后一波清完触发胜利，判断写在？", opts: ["波次协程 foreach 结束后（OnAllWavesCleared 事件）", "Update 每帧", "敌人脚本里", "不需要"], a: 0, ex: "波次协程天然知道\"全部波次完成\"——发事件让 GameManager 走胜利流程。" },
        { q: "生成的敌人要\"记录归属\"以便死亡递减，实现方式是？", opts: ["敌人死亡事件由生成器订阅（或传回调引用给敌人）", "敌人自己知道生成器", "不用记录", "静态变量"], a: 0, ex: "回调注入（敌人持 Action 死亡回调）或事件订阅，两种解耦方式均可。" },
        { q: "波次生成器与\"对象池\"\"工厂\"的关系是？", opts: ["生成器调度：通过工厂/池创建敌人——三大模式协作的实战", "互相替代", "毫无关系", "只能选一个"], a: 0, ex: "波次决定\"何时何地多少\"，工厂决定\"怎么造\"，池决定\"从哪来\"——组合拳。" }
      ]
    }
  ]
};
