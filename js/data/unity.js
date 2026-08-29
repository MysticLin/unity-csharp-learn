// Unity 核心课程数据 —— 学习路线参考 GitHub 仓库 AwesomeUnityTutorial、UnityPath-DiDiao、unity-learning-path
window.UNITY_COURSE = {
  id: "u",
  title: "Unity 游戏开发核心",
  short: "Unity 核心",
  emoji: "🎮",
  color: "#ff9600",
  desc: "编辑器 → 脚本 → 物理 → UI → 实战，跟着做就能做出自己的小游戏。",
  lessons: [
    {
      id: "u1", title: "编辑器与核心概念", mins: 12,
      kps: [
        { t: "五大窗口", d: "Scene 场景搭建、Game 玩家视角预览、Hierarchy 场景物体列表、Inspector 属性面板、Project 资源库。Console 查看日志与报错。" },
        { t: "GameObject 与 Component", d: "Unity 中\"一切皆 GameObject\"，但 GameObject 只是空壳，功能全部由挂在上面的 Component 提供：Transform 位置、MeshRenderer 显示、Rigidbody 物理、脚本逻辑……" },
        { t: "Prefab 预制体", d: "把配置好的物体存成 Assets 里的模板，可反复实例化；改模板则所有实例同步更新，是复用的核心机制。" }
      ],
      qs: [
        { q: "GameObject 与 Component 的关系是？", opts: ["物体是组件的容器，功能由组件提供", "组件包含多个物体", "两者是同一个概念", "物体必须依赖脚本才能显示"], a: 0, ex: "Transform、Renderer、脚本……都是挂在物体上的组件。" },
        { q: "Prefab（预制体）的作用是？", opts: ["可复用的物体模板", "保存场景的文件", "音频资源格式", "项目备份包"], a: 0, ex: "改一处模板，所有实例同步，非常适合子弹、敌人。" },
        { q: "手动摆放物体位置，在哪个视图最直观？", opts: ["Scene 视图", "Game 视图", "Project 视图", "Console 视图"], a: 0, ex: "Scene 是编辑视图；Game 是运行时玩家看到的画面。" }
      ]
    },
    {
      id: "u2", title: "第一个脚本", mins: 12,
      kps: [
        { t: "MonoBehaviour", d: "继承 MonoBehaviour 的类才能作为组件挂到物体上。新建脚本自带 Start 和 Update 两个空方法。", c: "public class HelloWorld : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log(\"游戏开始！\");\n    }\n\n    void Update()\n    {\n        // 每帧执行一次\n    }\n}" },
        { t: "挂载与调试", d: "把脚本文件拖到 Hierarchy 的物体上（或 Add Component），运行后日志显示在 Console。脚本文件名必须与类名一致，否则无法挂载。" },
        { t: "Inspector 里调参数", d: "public 字段或 [SerializeField] 私有字段会出现在 Inspector，可以拖拽赋值、运行时调参，避免写死数值。" }
      ],
      qs: [
        { q: "自定义脚本默认继承哪个类？", opts: ["MonoBehaviour", "Object", "Script", "Component"], a: 0, ex: "继承 MonoBehaviour 才能作为组件挂载并享受生命周期。" },
        { q: "输出日志到 Console 用？", opts: ["Debug.Log()", "System.out.println()", "echo", "printf"], a: 0, ex: "print() 也能用（是 Debug.Log 的简写），但 Debug.Log 更标准。" },
        { q: "关于脚本文件名，正确的是？", opts: ["必须与类名一致才能挂到物体上", "随便取名", "必须全小写", "必须与场景同名"], a: 0, ex: "Unity 按文件名反序列化组件，类名文件名不一致会报错。" }
      ]
    },
    {
      id: "u3", title: "生命周期函数", mins: 12,
      kps: [
        { t: "执行顺序", d: "Awake（物体激活时，先于所有 Start）→ OnEnable → Start（首次 Update 前，仅一次）→ Update（每帧）→ LateUpdate（所有 Update 之后）→ OnDestroy（销毁时）。", c: "void Awake()  { } // 初始化引用、缓存组件\nvoid Start()  { } // 使用其他对象初始化后的数据\nvoid Update() { } // 每帧：输入、移动\nvoid LateUpdate() { } // 相机跟随最合适\nvoid OnDestroy() { } // 清理" },
        { t: "FixedUpdate", d: "物理更新按固定时间步执行（默认 0.02s），对刚体施力必须写在 FixedUpdate 里，否则物理结果不稳定。" }
      ],
      qs: [
        { q: "每帧调用一次的函数是？", opts: ["Update", "Start", "Awake", "OnDestroy"], a: 0, ex: "Update 每渲染帧执行，帧率越高调用越频繁。" },
        { q: "对 Rigidbody 施加作用力应写在？", opts: ["FixedUpdate", "Update", "LateUpdate", "OnGUI"], a: 0, ex: "物理引擎按固定时间步模拟，力的施加要放进 FixedUpdate。" },
        { q: "Awake 和 Start 的区别是？", opts: ["Awake 在激活时先调用，Start 在首次 Update 前调用", "没有区别", "Start 先执行", "Awake 每帧执行"], a: 0, ex: "Awake 保证\"最早\"，Start 保证\"其他对象已就绪\"，顺序 Awake→OnEnable→Start。" },
        { q: "相机平滑跟随玩家，最好写在？", opts: ["LateUpdate", "FixedUpdate", "Awake", "OnDestroy"], a: 0, ex: "LateUpdate 在所有 Update 后执行，避免玩家移动后相机慢一帧的抖动。" }
      ]
    },
    {
      id: "u4", title: "Transform 与物体操作", mins: 12,
      kps: [
        { t: "位置/旋转/缩放", d: "Transform 是每个物体必有的组件：position（世界坐标）、localPosition（相对父物体）、localScale、localEulerAngles。", c: "transform.position = new Vector3(0, 5, 0);\ntransform.Translate(Vector3.forward * speed * Time.deltaTime);\ntransform.Rotate(0, 90f * Time.deltaTime, 0);\ntransform.localScale = Vector3.one * 2f;" },
        { t: "父子关系", d: "Hierarchy 里拖成层级后，子物体跟随父物体。代码：transform.SetParent(parent)；本地坐标即相对父物体。" },
        { t: "查找物体", d: "transform.Find(\"子物体名\")、GameObject.FindWithTag(\"Player\")；高频查找很费性能，要缓存引用。", c: "GameObject player = GameObject.FindWithTag(\"Player\");\nTransform gun = transform.Find(\"Hand/Gun\");" }
      ],
      qs: [
        { q: "让物体每帧朝前移动的常见写法是？", opts: ["transform.Translate(Vector3.forward * speed * Time.deltaTime)", "object.Move(forward)", "transform.Translate(forward)", "transform.Goto(0,0,1)"], a: 0, ex: "乘 Time.deltaTime 使移动速度与帧率无关。" },
        { q: "position 与 localPosition 的区别？", opts: ["localPosition 是相对父物体的坐标", "完全相同", "localPosition 是世界坐标", "position 是只读的"], a: 0, ex: "没有父物体时两者相同；有父物体时 localPosition 是相对值。" },
        { q: "关于 GameObject.FindWithTag，说法正确的是？", opts: ["可用但应缓存结果，避免每帧查找", "每帧调用没有任何开销", "只能找自己", "已废弃无法使用"], a: 0, ex: "字符串查找有开销，一般在 Start 里查一次存到字段。" }
      ]
    },
    {
      id: "u5", title: "组件交互", mins: 10,
      kps: [
        { t: "GetComponent 家族", d: "GetComponent<T>() 取同物体上的组件，GetComponentInParent / GetComponentInChildren 向上/下找。找不到返回 null，常在 Awake/Start 缓存。", c: "Rigidbody rb;\nvoid Awake() {\n    rb = GetComponent<Rigidbody>();\n    rb.mass = 2f;\n}" },
        { t: "[RequireComponent]", d: "声明依赖：挂脚本时自动补上所需组件，防止忘加。", c: "[RequireComponent(typeof(Rigidbody))]\npublic class Ball : MonoBehaviour { }" }
      ],
      qs: [
        { q: "获取同物体上 Rigidbody 组件的写法是？", opts: ["GetComponent<Rigidbody>()", "GetRigidbody()", "Find<Rigidbody>()", "new Rigidbody()"], a: 0, ex: "泛型版最常用；组件获取后建议存字段复用。" },
        { q: "同一个物体上能挂多个同类型脚本组件吗？", opts: ["可以", "不行", "最多两个", "只有 UI 物体可以"], a: 0, ex: "同一脚本类可以重复挂载，各自独立运行（Transform 这类唯一组件除外）。" },
        { q: "[RequireComponent(typeof(Rigidbody))] 的作用是？", opts: ["挂载时自动添加所需组件", "删除指定组件", "给脚本重命名", "禁用脚本"], a: 0, ex: "声明\"我依赖这个组件\"，Unity 自动补齐。" }
      ]
    },
    {
      id: "u6", title: "输入与角色控制", mins: 12,
      kps: [
        { t: "键盘输入三兄弟", d: "GetKey 按住持续为真；GetKeyDown 只在按下瞬间为真；GetKeyUp 只在松开瞬间为真。", c: "void Update() {\n    if (Input.GetKey(KeyCode.W)) Move();       // 持续\n    if (Input.GetKeyDown(KeyCode.Space)) Jump(); // 单次\n    if (Input.GetKeyUp(KeyCode.E)) Close();\n}" },
        { t: "轴输入 GetAxis", d: "Horizontal/Vertical 返回 -1~1 的平滑值，自带缓动，做移动手感更好；GetAxisRaw 则是生硬的 -1/0/1。", c: "float h = Input.GetAxis(\"Horizontal\");\nfloat v = Input.GetAxis(\"Vertical\");\nVector3 dir = new Vector3(h, 0, v);\nrb.AddForce(dir * force);" },
        { t: "鼠标与触屏", d: "Input.GetMouseButtonDown(0) 左键；移动端用 Input.touchCount / Input.GetTouch(0)。新项目也可用官方 Input System 包。" }
      ],
      qs: [
        { q: "持续检测\"按住 W 键\"应该用？", opts: ["Input.GetKey(KeyCode.W)", "Input.GetKeyDown(KeyCode.W)", "Input.GetKeyUp(KeyCode.W)", "Input.anyKeyDown"], a: 0, ex: "*Down/*Up 只触发瞬间一帧，按住要用 GetKey。" },
        { q: "Input.GetAxis(\"Horizontal\") 的返回值范围？", opts: ["-1 到 1 的平滑值", "0 或 1", "像素坐标", "布尔值"], a: 0, ex: "平滑过渡的手感更好，GetAxisRaw 才是 -1/0/1。" },
        { q: "关于移动端触屏，正确的是？", opts: ["老输入用 Input.touchCount，也可换用 Input System 包", "完全不支持", "只有安卓支持", "必须写 Java 代码"], a: 0, ex: "跨平台输入新方案是官方 Input System 包。" }
      ]
    },
    {
      id: "u7", title: "物理系统", mins: 14,
      kps: [
        { t: "Rigidbody 与 Collider", d: "Rigidbody 让物体受重力/力作用；Collider 定义碰撞形状。两者配合才有物理效果；碰撞回调里至少一方要有 Rigidbody。", c: "rb.AddForce(Vector3.up * 5f, ForceMode.Impulse);\nrb.velocity = new Vector3(0, rb.velocity.y, 0);" },
        { t: "Trigger 触发器", d: "Collider 勾选 IsTrigger 后不再产生实体碰撞，只触发事件——适合拾取金币、进入区域。", c: "void OnTriggerEnter(Collider other) {\n    if (other.CompareTag(\"Coin\")) {\n        score++;\n        Destroy(other.gameObject);\n    }\n}" },
        { t: "碰撞 vs 触发", d: "OnCollisionEnter(Collision)：实体碰撞，参数含接触点，适合撞击伤害；OnTriggerEnter(Collider)：穿过检测，适合拾取、机关。" }
      ],
      qs: [
        { q: "让物体受重力和力作用，必须添加？", opts: ["Rigidbody", "只加 Collider 就够", "MeshRenderer", "AudioSource"], a: 0, ex: "Collider 决定形状，Rigidbody 决定物理行为。" },
        { q: "Collider 勾选 IsTrigger 后？", opts: ["不再实体碰撞，但触发 OnTriggerEnter", "变得更硬", "无法再移动", "自动受重力"], a: 0, ex: "触发器用于\"穿过检测\"，如金币、传送门。" },
        { q: "OnCollisionEnter 的触发条件是？", opts: ["双方有 Collider 且至少一方有 Rigidbody（非 Trigger）", "任意两个物体靠近", "鼠标点击物体", "只在 2D 项目生效"], a: 0, ex: "纯 Collider 对 Collider（无刚体）不会走物理回调。" },
        { q: "给物体施加爆炸冲力用哪个方法？", opts: ["rb.AddForce(..., ForceMode.Impulse)", "transform.AddForce", "rb.SetForce", "rigid.Force()"], a: 0, ex: "AddForce 在 FixedUpdate 中调用，Impulse 模式适合瞬间冲击。" }
      ]
    },
    {
      id: "u8", title: "Prefab 与实例化", mins: 12,
      kps: [
        { t: "运行时生成", d: "Instantiate 克隆 Prefab 或物体，常用于子弹、敌人、特效；Destroy 销毁，可带延迟参数。", c: "public GameObject bulletPrefab;\n\nvoid Fire() {\n    GameObject b = Instantiate(\n        bulletPrefab,\n        transform.position + transform.forward,\n        transform.rotation);\n    Destroy(b, 3f);   // 3 秒后自动销毁\n}" },
        { t: "Prefab 工作流", d: "场景物体拖回 Project 即成 Prefab；双击进入 Prefab 模式修改，所有实例同步；场景实例上的修改可在 Inspector 里 Apply/Revert。" }
      ],
      qs: [
        { q: "运行时按模板生成子弹的 API 是？", opts: ["Instantiate(prefab, pos, rot)", "Create(prefab)", "Spawn.New(prefab)", "Copy.Make(prefab)"], a: 0, ex: "Instantiate 返回克隆出来的实例引用。" },
        { q: "销毁游戏物体的正确写法？", opts: ["Destroy(gameObject)", "Delete(gameObject)", "gameObject.Remove()", "Kill(gameObject)"], a: 0, ex: "Destroy(obj, t) 还能延迟销毁。" },
        { q: "想一次修改让所有 Prefab 实例都生效，应该？", opts: ["进入 Prefab 模式修改模板", "逐个修改场景实例", "每次运行时用代码改", "Prefab 无法修改"], a: 0, ex: "Prefab 模式（或覆盖 Apply）保证模板与实例同步。" }
      ]
    },
    {
      id: "u9", title: "协程与延时", mins: 12,
      kps: [
        { t: "协程 Coroutine", d: "用 yield return 把方法\"切成多帧执行\"：分帧、延时、序列化流程，不阻塞主线程。启动用 StartCoroutine，停止用 StopCoroutine/StopAllCoroutines。", c: "IEnumerator Respawn() {\n    yield return new WaitForSeconds(3f); // 等 3 秒\n    transform.position = spawnPoint;\n    yield return null;                   // 下一帧继续\n}\n\nvoid Start() { StartCoroutine(Respawn()); }" },
        { t: "Invoke 与 InvokeRepeating", d: "简单延时调用：Invoke(\"方法名\", 延时)；重复调用 InvokeRepeating；取消 CancelInvoke。需要传参或精细控制时用协程。" }
      ],
      qs: [
        { q: "启动协程的正确写法？", opts: ["StartCoroutine(MyRoutine())", "Run(MyRoutine)", "Start(MyRoutine())", "Invoke.Coroutine()"], a: 0, ex: "参数传方法调用或方法名字符串，返回 Coroutine 引用可用来停止。" },
        { q: "协程中等待 3 秒的写法？", opts: ["yield return new WaitForSeconds(3f)", "Wait(3)", "sleep(3)", "yield return 3"], a: 0, ex: "受 Time.timeScale 影响；要真实时间用 WaitForSecondsRealtime。" },
        { q: "协程的主要价值是？", opts: ["分帧/延时执行逻辑而不阻塞主线程", "真正的多线程并行计算", "替代 Update 的唯一方式", "只能用于播放动画"], a: 0, ex: "协程仍在主线程，是\"时间维度上的切片\"，不是并行。" }
      ]
    },
    {
      id: "u10", title: "UI 与事件", mins: 12,
      kps: [
        { t: "Canvas 与 RectTransform", d: "所有 UI 元素必须是 Canvas 的子物体；Canvas 有 Screen Space - Overlay（覆盖屏幕）等渲染模式；UI 位置尺寸由 RectTransform 描述，用 Anchor 锚点适配不同分辨率。" },
        { t: "常用控件", d: "TextMeshPro（推荐文本，比旧 Text 更清晰）、Button、Image、Slider、Toggle、InputField。创建 TMP 文本首次会提示导入 TMP Essentials。" },
        { t: "代码绑定事件", d: "Button 用 onClick.AddListener 订阅，可传 Lambda；Inspector 里也能拖拽绑定。", c: "public Button startBtn;\npublic TMP_Text scoreText;\n\nvoid Start() {\n    startBtn.onClick.AddListener(() => {\n        Debug.Log(\"开始游戏\");\n    });\n    scoreText.text = \"分数：0\";\n}" }
      ],
      qs: [
        { q: "UI 元素必须放在哪个物体下？", opts: ["Canvas", "Camera", "Light", "任意空物体"], a: 0, ex: "没有 Canvas 的 UI 不参与 UI 渲染。" },
        { q: "代码里给按钮绑定点击事件用？", opts: ["btn.onClick.AddListener(方法)", "btn.onTouch += 方法", "btn.Press(方法)", "btn.Click()"], a: 0, ex: "onClick 是 UnityEvent，AddListener 可订阅多个回调。" },
        { q: "推荐使用的文本组件是？", opts: ["TextMeshPro (TMP)", "旧版 Text", "Label", "MessageBox"], a: 0, ex: "TMP 用 SDF 渲染，更清晰、功能更强，官方推荐。" }
      ]
    },
    {
      id: "u11", title: "场景切换与全局数据", mins: 12,
      kps: [
        { t: "SceneManager", d: "LoadScene 按名称或索引加载场景；场景必须在 Build Settings 列表里。单例加载 vs additive 叠加加载。", c: "using UnityEngine.SceneManagement;\n\nSceneManager.LoadScene(\"Level2\");\nSceneManager.LoadScene(0);\nint current = SceneManager.GetActiveScene().buildIndex;" },
        { t: "DontDestroyOnLoad", d: "让物体在换场景时不被销毁——全局管理器（音频、分数、存档）的标准做法。", c: "void Awake() {\n    DontDestroyOnLoad(gameObject);\n}" },
        { t: "单例模式入门", d: "全局唯一的 Manager：静态 Instance 供其他脚本访问。", c: "public static GameManager Instance { get; private set; }\nvoid Awake() {\n    if (Instance != null) { Destroy(gameObject); return; }\n    Instance = this;\n    DontDestroyOnLoad(gameObject);\n}" }
      ],
      qs: [
        { q: "切换到名为 Level2 的场景用？", opts: ["SceneManager.LoadScene(\"Level2\")", "Scene.Go(\"Level2\")", "Load.Scene(\"Level2\")", "Application.ChangeScene()"], a: 0, ex: "需 using UnityEngine.SceneManagement。" },
        { q: "DontDestroyOnLoad(gameObject) 的效果是？", opts: ["切换场景时该物体保留", "物体永不被玩家删除", "隐藏物体", "复制一份场景"], a: 0, ex: "全局音乐、管理器靠它存活。" },
        { q: "要让场景能被 LoadScene 加载，必须？", opts: ["在 Build Settings/Build Profiles 中加入该场景", "什么都不用做", "把场景设为只读", "删除其他场景"], a: 0, ex: "未加入构建列表的场景运行时无法加载。" }
      ]
    },
    {
      id: "u12", title: "综合实战：Roll-a-Ball", mins: 20,
      kps: [
        { t: "玩法拆解", d: "官方入门小游戏：小球吃金币。用到的全是前面所学——这是检验学习成果的分水岭。" },
        { t: "移动与相机", d: "玩家：GetAxis 读输入 + Rigidbody.AddForce（FixedUpdate）；相机：LateUpdate 里保持与玩家的固定偏移。", c: "void FixedUpdate() {\n    float h = Input.GetAxis(\"Horizontal\");\n    float v = Input.GetAxis(\"Vertical\");\n    rb.AddForce(new Vector3(h, 0, v) * speed);\n}" },
        { t: "拾取与胜利", d: "金币设为 IsTrigger；OnTriggerEnter 检测 Tag 是 Player 就计分+销毁；分数>=总数时显示胜利文本/加载新场景。", c: "void OnTriggerEnter(Collider other) {\n    if (!other.CompareTag(\"PickUp\")) return;\n    other.gameObject.SetActive(false);\n    count++;\n    scoreText.text = $\"分数：{count}\";\n    if (count >= total) winText.gameObject.SetActive(true);\n}" },
        { t: "下一步", d: "完成后可挑战：加音效（AudioSource）、计时器（协程）、主菜单（SceneManager）——逐步把它变成你自己的游戏。" }
      ],
      qs: [
        { q: "Roll-a-Ball 中玩家移动的实现组合是？", opts: ["Input.GetAxis 读输入 + Rigidbody.AddForce", "纯 Transform.position 赋值", "UI 按钮拖动", "相机带着玩家飞"], a: 0, ex: "物理小球用刚体施力最自然，写在 FixedUpdate。" },
        { q: "计分 UI 应该在什么时机更新？", opts: ["拾取触发（OnTriggerEnter）时更新文本", "每秒自动刷新", "游戏结束后统一算", "不需要更新"], a: 0, ex: "事件发生时更新，逻辑直观且省性能。" },
        { q: "判断胜利的典型做法是？", opts: ["分数达到总数后显示胜利 UI / 切换场景", "重启编辑器", "等待 24 小时", "Unity 自动判断"], a: 0, ex: "简单 if 判断 + SetActive(true) 就是你的第一个游戏流程控制。" }
      ]
    }
  ]
};
