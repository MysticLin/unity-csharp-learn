// 题库扩充包 6 —— Unity +100 题
window.EXTRA_QS6 = {
  u1: [
    { q: "Unity 播放/停止游戏的快捷键是？", opts: ["Ctrl+P", "Ctrl+S", "F5", "Ctrl+B"], a: 0, ex: "Ctrl 一键播放/停止；空格在 Scene 视图是聚焦，别搞混。" },
    { q: "Scene 视图里的 Gizmos 按钮的作用是？", opts: ["开关图标与辅助线显示（图标太乱时可隐藏）", "切换 2D/3D", "保存场景", "播放动画"], a: 0, ex: "灯光图标、音频范围、OnDrawGizmos 画的辅助线都受它控制。" },
    { q: "Hierarchy 里把物体 A 拖到物体 B 上会发生？", opts: ["A 变成 B 的子物体", "A 被 B 替换", "删除 A", "交换名字"], a: 0, ex: "拖拽 = 建立父子关系；同层级排序是拖到蓝线位置。" },
    { q: "Inspector 默认只显示 public 字段，调试私有字段可以？", opts: ["Inspector 右上角 ⋮ 菜单切 Debug 模式", "改代码全部 public", "删除字段", "只能打印日志"], a: 0, ex: "Debug 模式显示私有字段与原始序列化数据，排查引用神器。" },
    { q: "安装官方插件（输入系统、TMP 等）的入口是？", opts: ["Window → Package Manager", "Edit → Preferences", "File → Build", "Assets → Import"], a: 0, ex: "Package Manager 管理官方/自定义包；第三方 .unitypackage 走 Assets → Import。" },
    { q: "新建 Tag（标签）的入口是？", opts: ["Inspector → Tag 下拉 → Add Tag", "GameObject 菜单", "Project 右键", "Scene 视图右键"], a: 0, ex: "内置标签有限，自定义标签先在这里加才能用。" },
    { q: "Tag 和 Layer 的核心区别是？", opts: ["Tag 用于逻辑识别（字符串），Layer 用于物理/渲染分组（位掩码）", "完全一样", "Layer 是 Tag 的别名", "Tag 更省性能"], a: 0, ex: "逻辑判断用 Tag；物理碰撞矩阵、相机剔除用 Layer——两套体系各司其职。" },
    { q: "Scene 视图切换 2D/3D 模式的按钮在？", opts: ["Scene 视图工具栏", "Game 视图", "Project 设置", "Inspector"], a: 0, ex: "2D 模式正交视角，排 UI/2D 游戏更顺手。" }
  ],
  u2: [
    { q: "想让脚本 A 一定在脚本 B 之前执行 Update，应该？", opts: ["Project Settings → Script Execution Order 设置", "改脚本文件名", "同时挂两份", "没办法控制"], a: 0, ex: "Execution Order 给脚本定相对顺序；能靠架构解耦就别依赖它。" },
    { q: "代码里让编辑器暂停在当前帧（配合调试），调用？", opts: ["Debug.Break()", "Debug.Pause()", "Application.Pause()", "Time.Stop()"], a: 0, ex: "Debug.Break() 下一帧暂停编辑器，配合画线/日志定位特定帧问题。" },
    { q: "两个程序集里同名类冲突，解决方案是？", opts: ["用命名空间 namespace 区分", "删除一个类", "改名 Class1/Class2", "用 var 调用"], a: 0, ex: "namespace 是 C# 的\"文件夹\"，同名类只要命名空间不同就能共存。" },
    { q: "Inspector 字段显示 None (Missing)，最可能的原因是？", opts: ["引用的物体/资源被删除", "字段名太长", "忘记编译", "Unity 版本问题"], a: 0, ex: "引用丢失重新拖拽即可；脚本 Missing 检查文件名与类名是否一致。" },
    { q: "把组件归类到自定义菜单路径（如 Tools/我的组件），特性是？", opts: ["[AddComponentMenu(\"Tools/MyComp\")]", "[Header(\"Tools\")]", "[Tooltip]", "[SerializeField]"], a: 0, ex: "AddComponentMenu 自定义 Add Component 菜单里的分组路径，项目一大特别整洁。" },
    { q: "一个脚本同时管移动、战斗、背包，最好的重构是？", opts: ["拆成三个职责单一的组件脚本", "注释掉不用的部分", "复制成三个完整脚本", "全部写成 static"], a: 0, ex: "组合式设计：每个组件只管一件事，按需挂载。组件模式天然支持这种拆分。" },
    { q: "运行时动态添加组件的代码是？", opts: ["gameObject.AddComponent<MyScript>()", "gameObject.Append<MyScript>()", "Instantiate<MyScript>()", "new MyScript() 直接挂上"], a: 0, ex: "AddComponent 泛型版返回新组件引用，可立刻配置属性。" },
    { q: "注释掉 [SerializeField] 后，之前拖的引用会？", opts: ["丢失（字段不再被序列化）", "自动变成 public", "永远保留", "自动迁移"], a: 0, ex: "序列化按字段名匹配，结构变化（改名/删除/去特性）都会让引用清空。" }
  ],
  u3: [
    { tag: "t6_1", q: "Time.frameCount 的含义是？", opts: ["游戏启动以来渲染的总帧数", "当前秒的帧数", "固定帧率 60", "协程计数"], a: 0, ex: "全局帧编号，可做\"每 N 帧执行一次\"：if (Time.frameCount % 10 == 0)。" },
    { q: "Update 里的计时器模式，正确的写法是？", code: "// timer 为字段", opts: ["timer += Time.deltaTime; if (timer >= 3) { Do(); timer = 0; }", "timer++; if (timer == 3) Do();", "timer = Time.time; Do();", "不需要计时器字段"], a: 0, ex: "deltaTime 累加到阈值再清零——帧率无关的重复计时；倒计时同理做减法。" },
    { q: "OnValidate() 的特殊之处是？", opts: ["编辑器里 Inspector 数值改变时即时调用", "运行时每帧调用", "只在打包后调用", "Unity 不支持"], a: 0, ex: "在 OnValidate 里 Clamp 数值，策划手输 9999 也会被自动纠正。" },
    { q: "Unity API（如 transform）能不能在子线程调用？", opts: ["不能，Unity API 只能在主线程调用", "可以随便调", "只有 Update 能调", "安卓可以"], a: 0, ex: "子线程算数据（寻路、解析），结果回主线程应用——线程分工基本规则。" },
    { q: "\"每帧可能跑 0 次或多次\"的生命周期是？", opts: ["FixedUpdate（物理帧与渲染帧不对齐）", "Update（每渲染帧必跑）", "Start", "OnDestroy"], a: 0, ex: "FixedUpdate 按固定时间步补偿，一帧内可能 0~N 次——输入检测别放物理循环。" },
    { q: "脚本 enabled=false 后再次 true，会触发？", opts: ["OnEnable（Start 不会重复执行）", "Awake 和 Start 都重跑", "什么都不触发", "脚本被销毁"], a: 0, ex: "Awake/Start 一生一次；OnEnable/OnDisable 每次切换成对触发——恢复逻辑放 OnEnable。" },
    { q: "\"等某条件成立后继续\"的协程写法是？", opts: ["yield return new WaitUntil(() => isReady);", "yield return isReady;", "Wait(isReady);", "while (isReady) { }"], a: 0, ex: "WaitUntil 每帧检查谓词，成立继续；反面是 WaitWhile。" },
    { q: "协程推荐的启动位置是？", opts: ["Start 或按需（事件里）启动", "Awake 里全部启动", "OnValidate", "构造函数"], a: 0, ex: "协程依附 MonoBehaviour 存活；按需启动比\"全塞 Awake\"更可控。" }
  ],
  u4: [
    { tag: "t6_2", q: "Vector3 a = (1,2,3)，b = (1,1,1)，则 a - b 是？", opts: ["(0, 1, 2)", "(2, 3, 4)", "(1, 1, 1)", "(0, 0, 0)"], a: 0, ex: "Vector3 重载了加减与数乘：逐分量运算。B 指向 A 的向量 = A - B。" },
    { q: "Quaternion 的正确用法是？", opts: ["用 Quaternion.Euler(0, 90, 0) 构造，别手改 xyzw 分量", "直接设 x=0 y=90 z=0", "用三个 float 保存", "和欧拉角完全等价"], a: 0, ex: "四元数分量没有直观几何意义，手改会歪斜翻滚；欧拉转换交给 Quaternion.Euler。" },
    { q: "一步完成\"位置+旋转\"设置的方法是？", opts: ["transform.SetPositionAndRotation(pos, rot)", "只能分两行写", "transform.Move(pos, rot)", "transform.TP(pos)"], a: 0, ex: "合成方法一次矩阵更新；分两行也没错，物理插值场景合成更稳。" },
    { q: "transform.right 表示？", opts: ["物体自身坐标系的红轴方向（世界向量）", "世界坐标 X 轴", "屏幕右边", "永远等于 (1,0,0)"], a: 0, ex: "自身右 = right，前 = forward，上 = up。\"朝自身前方移动\"全靠它们。" },
    { q: "Vector3(3, 4, 0) 方向上的单位向量约是？", opts: ["(0.6, 0.8, 0)", "(3, 4, 0)", "(0.75, 1, 0)", "(1, 1, 0)"], a: 0, ex: "normalized = 各分量除以长度 5。\"方向不变、长度归一\"用于纯方向移动。" },
    { q: "2D 游戏里物体的 Z 坐标通常？", opts: ["保持 0（层叠用 Sorting Layer/Order）", "随便设", "必须是 -1000", "越大越靠前"], a: 0, ex: "2D 用 X/Y 平面 + Sorting 控制层级，Z 不参与 2D 排序（默认设置下）。" },
    { q: "只比较距离远近（不看具体数值），更省性能的写法是？", opts: ["sqrMagnitude 比较（免开方）", "Distance 必须用", "magnitude 必须用", "没有区别"], a: 0, ex: "(a - b).sqrMagnitude < range * range 等价于距离判断，省掉开方。" },
    { q: "把世界坐标点转成本地坐标（判断目标在\"我\"的哪边），用？", opts: ["transform.InverseTransformPoint(worldPos)", "transform.TransformPoint(localPos)", "Vector3.Distance", "transform.localPosition = worldPos"], a: 0, ex: "Inverse 是\"世界→本地\"，TransformPoint 是\"本地→世界\"。方向判断常用。" }
  ],
  u5: [
    { q: "GetComponents<AudioSource>() 返回的是？", opts: ["该物体上所有该类型组件的数组", "单个组件", "子物体的组件", "null"], a: 0, ex: "复数版本拿数组——一个物体挂多个同名组件（如多个音源）时用。" },
    { q: "禁用脚本 enabled 与禁用物体 SetActive(false) 的关系是？", opts: ["两级开关：物体关了脚本必然不跑；物体开着脚本还能单独关", "完全等价", "脚本 enabled 能关物体", "没有关系"], a: 0, ex: "物体是总闸、组件是分闸。任一关闭 Update 都不执行。" },
    { q: "找场景里所有带 \"Enemy\" 标签的物体（多个），用？", opts: ["GameObject.FindGameObjectsWithTag(\"Enemy\")", "FindWithTag（单个）", "Find(\"Enemy\")", "CompareTag"], a: 0, ex: "复数版返回数组；单数版只返回一个。敌人管理器靠复数版。" },
    { q: "脚本字段引用的物体被 Destroy 后，字段会？", opts: ["变成 fake null（== null 为 true，但不是 C# 真 null）", "自动清空", "指向新物体", "可继续正常使用"], a: 0, ex: "Unity 重载了 == 判断\"已销毁\"。判空用 if (obj == null)，别用 ReferenceEquals。" },
    { q: "AddComponent<T>() 的返回值是？", opts: ["新添加的组件实例（T 类型）", "GameObject", "bool", "void"], a: 0, ex: "返回引用可立刻配置：var rb = go.AddComponent<Rigidbody>(); rb.mass = 2;" },
    { q: "字段改名后不想丢 Inspector 引用，配合 [SerializeField] 使用的特性是？", opts: ["[FormerlySerializedAs(\"旧名\")]", "[Tooltip]", "[Header]", "[Range]"], a: 0, ex: "序列化按字段名匹配，改名时用旧名标注（UnityEngine.Serialization），引用不丢。" },
    { q: "HideInInspector 特性的作用是？", opts: ["public 字段也不显示在 Inspector（引用保留）", "显示隐藏字段", "加密字段", "删除字段"], a: 0, ex: "与 [SerializeField] 相反：公开但不进面板。内部链接字段常用它保持界面干净。" },
    { q: "两个组件互相引用对方（A 取 B、B 取 A），这种设计？", opts: ["要小心循环依赖，尽量用事件或中间类解耦", "完全没问题", "编译必报错", "Unity 禁止"], a: 0, ex: "循环引用能跑但耦合高。加\"事件枢纽\"或配置类解耦是常见做法。" }
  ],
  u6: [
    { q: "移动端手指\"刚按下屏幕\"那一瞬间，Input.GetTouch(0).phase 是？", opts: ["TouchPhase.Began", "TouchPhase.Moved", "TouchPhase.Ended", "TouchPhase.Stationary"], a: 0, ex: "Began 按下、Moved 移动、Stationary 按住、Ended 抬起、Canceled 打断——五态记牢。" },
    { q: "判断\"当前有手指按在屏幕上\"，用？", opts: ["Input.touchCount > 0", "Input.touches.Length == 0", "Input.GetKey(Touch)", "Input.mousePresent"], a: 0, ex: "touchCount 是触点数量：大于 0 就有手指按着；GetTouch(i) 拿详情。" },
    { q: "按键触发单次跳跃，正确的检测是？", opts: ["Input.GetKeyDown(KeyCode.Space)", "Input.GetKey(KeyCode.Space)", "Input.GetKeyUp(KeyCode.Space)", "Input.anyKey"], a: 0, ex: "Jump 用 Down 触发一次；GetKey 按住会每帧跳成\"火箭\"。" },
    { q: "检测\"任意键刚刚按下\"（按任意键开始游戏），用？", opts: ["Input.anyKeyDown", "Input.GetKey", "Input.inputString", "轮询所有键"], a: 0, ex: "anyKeyDown 在任意键/鼠标按下的那一帧为 true，开始界面神器。" },
    { q: "Input.GetMouseButton(1) 检测的是？", opts: ["鼠标右键", "鼠标左键", "中键", "双击"], a: 0, ex: "0 左键、1 右键、2 中键——数字即键位。" },
    { q: "读取鼠标滚轮滚动的输入是？", opts: ["Input.mouseScrollDelta.y", "Input.GetAxis(\"Scroll\")", "Input.scroll", "没有滚轮输入"], a: 0, ex: "mouseScrollDelta.y 上滚为正、下滚为负，缩放地图/切换武器常用。" },
    { q: "移动端追踪\"具体是哪根手指\"（多点触控区分），用触点的？", opts: ["fingerId", "position", "phase", "tapCount"], a: 0, ex: "fingerId 在按下到抬起期间保持不变——双指手势靠它区分两根手指的轨迹。" },
    { q: "旧输入系统里自定义\"水平轴\"绑定了 A/D 和左右方向键，读取统一输入用？", opts: ["Input.GetAxis(\"Horizontal\")", "分别读四个键再合并", "GetKey(\"A\")", "GetAxisRaw 只能读内置轴"], a: 0, ex: "Input Manager 里把多个按键映射到同一轴名，代码只读轴值，一套逻辑兼容多设备。" }
  ],
  u7: [
    { q: "场景里一大块永不移动的地面，性能最优的做法是？", opts: ["只放 Collider 不加 Rigidbody（静态碰撞体）", "每个都加 Rigidbody", "每帧改它的位置", "用 MeshCollider 且不开 Convex"], a: 0, ex: "静态碰撞体不参与刚体模拟，省开销；会动的才需要 Rigidbody。" },
    { q: "给物体施加\"旋转力\"（让它转起来），刚体方法是？", opts: ["rb.AddTorque(...)", "rb.AddForce(...)", "rb.velocity = ...", "rb.AddSpin(...)"], a: 0, ex: "AddTorque 施加扭矩，配合 angularDrag 控制旋转衰减；同样写在 FixedUpdate。" },
    { q: "想让物体\"不受物理模拟、完全由代码摆布但仍触发触发器\"，设置？", opts: ["isKinematic = true", "useGravity = false", "mass = 0", "Sleep()"], a: 0, ex: "运动学刚体不吃力/重力，但移动时会触发碰撞回调——电梯、移动平台标配。" },
    { q: "长时间静止的刚体会被物理引擎\"休眠\"省性能，唤醒它的方式是？", opts: ["被碰撞/移动/施力时自动唤醒（也可 WakeUp()）", "永远醒不来", "重启游戏", "删除刚体"], a: 0, ex: "休眠是优化特性。被休眠物体挡住的子弹照样触发碰撞并唤醒它。" }
  ],
  u8: [
    { q: "从对象池取出一个休眠对象时，除了改位置还必须？", opts: ["gameObject.SetActive(true)", "重新 Instantiate", "Destroy 再新建", "改它的名字"], a: 0, ex: "池化对象用 SetActive(true/false) 启停——复用的本质就是\"隐藏着，用的时候叫醒\"。" },
    { q: "Instantiate 的第五个参数（Transform parent）的作用是？", opts: ["让新物体直接成为指定物体的子物体", "设置旋转", "设置颜色", "延迟生成"], a: 0, ex: "生成时直接挂父级（UI 列表项挂 Content），省去一行 SetParent。" },
    { q: "Random.Range(0, 2)（整数重载）的可能返回值是？", opts: ["0 或 1（上界不含）", "0、1、2", "只有 0", "2"], a: 0, ex: "整数版上界不含：Range(0,2) 是\"抛硬币\"；浮点版上界包含。两版规则不同。" },
    { q: "随机在 x∈[-8,8]、y∈[-5,5] 范围生成敌人（2D），正确写法是？", opts: ["new Vector3(Random.Range(-8f, 8f), Random.Range(-5f, 5f), 0)", "Random.Range(-8, 8), Random.Range(-5, 5)", "Random.Vector()", "Random(-8,8)"], a: 0, ex: "浮点版上下界都含；2D 项目 Z 保持 0。" },
    { q: "对象池\"池子空了\"（所有对象都在用）时，常见处理是？", opts: ["动态扩容新建几个 / 或复用最旧的对象", "直接崩溃", "永久卡死", "删掉玩家"], a: 0, ex: "扩容或复用最旧是两种策略；核心是\"绝不 Instantiate\"——否则池化失去意义。" },
    { q: "把实例从场景\"收回\"对象池的动作是？", opts: ["SetActive(false) 并清空状态（血量、速度）", "Destroy(gameObject)", "移出场景", "改 Tag"], a: 0, ex: "回收 = 隐藏 + 重置状态，下次取出才是\"全新\"的。忘重置状态是对象池最常见 bug。" },
    { q: "Unity 内置的\"随机数\"每次运行游戏结果都一样吗？", opts: ["默认种子固定（可在 Inspector/代码设 Random.InitState 换种子）", "永远随机", "每次不同且无法控制", "只有真机才随机"], a: 0, ex: "固定种子让随机可复现（调试、录像回放）；正式游戏用 InitState(时间) 增加变化。" }
  ],
  u9: [
    { q: "在物体 X 上调用 StopAllCoroutines()，影响范围是？", opts: ["只停止 X 上运行的全部协程", "停止全场景所有协程", "停止整个游戏的 Update", "只停止第一个启动的协程"], a: 0, ex: "范围是\"调用者所在物体\"。精准停某一个：保存 StartCoroutine 返回的引用再 StopCoroutine。" },
    { q: "给协程传参数的正确方式是？", opts: ["StartCoroutine(Respawn(3f))（方法调用带参）", "协程不能带参数", "用全局变量传", "StartCoroutine(\"3\")"], a: 0, ex: "协程方法就是普通方法签名，参数写在 IEnumerator 方法里，启动时传入。" },
    { q: "暂停界面显示\"真实时间倒计时\"（不受慢动作影响），协程里用？", opts: ["yield return new WaitForSecondsRealtime(t)", "WaitForSeconds(t)", "yield return null", "Time.deltaTime"], a: 0, ex: "Realtime 版按真实时钟等待，timeScale=0 也照走——暂停 UI、网络超时用它。" },
    { q: "InvokeRepeating(\"Tick\", 2f, 1f) 的含义是？", opts: ["2 秒后首次调用 Tick，之后每 1 秒重复", "每 2 秒调用一次", "1 秒后调用一次", "2 秒内每帧调用"], a: 0, ex: "第一参数首次延迟、第二参数重复间隔。取消用 CancelInvoke(\"Tick\")。" },
    { q: "协程体内抛出未捕获异常，结果是？", opts: ["该协程立即终止，之后代码不执行", "游戏崩溃", "自动重试", "跳到下一帧继续"], a: 0, ex: "异常终止当前协程且不自动恢复，Console 有红字——协程里判空别偷懒。" },
    { q: "做\"慢动作\"效果（世界变慢），修改？", opts: ["Time.timeScale（0~1 调节）", "Time.fixedDeltaTime", "Camera.fieldOfView", "帧率设置"], a: 0, ex: "timeScale 影响 deltaTime/物理/协程等待；UI 动画想不受影响用 unscaledTime。" },
    { q: "截图这类\"渲染完最后一帧再执行\"的逻辑，协程里写？", opts: ["yield return new WaitForEndOfFrame();", "yield return null;", "WaitForSeconds(0);", "yield break;"], a: 0, ex: "WaitForEndOfFrame 在相机与 UI 全部渲染完后——EncodeToPNG 截图的标配。" }
  ],
  u10: [
    { q: "UI 按钮点了没反应，排查时第一个该确认的是？", opts: ["场景里有没有 EventSystem 物体", "按钮颜色对不对", "Canvas 够不够大", "游戏帧率"], a: 0, ex: "EventSystem 是 UI 事件中枢，误删后所有按钮/触摸失灵——删掉它 Unity 不会提醒。" },
    { q: "Slider 拖动时实时更新音量，应订阅的事件是？", opts: ["onValueChanged（参数 float 0~1）", "onClick", "onDrag", "onSelect"], a: 0, ex: "slider.onValueChanged.AddListener(v => SetVolume(v)); 直接把当前值传进来。" },
    { q: "CanvasGroup 组件能一次性控制一批 UI 的？", opts: ["透明度 alpha、可交互 interactable、是否阻挡射线", "只有颜色", "只有位置", "字体大小"], a: 0, ex: "面板整体淡入淡出、暂时禁用整块操作——父物体挂 CanvasGroup 全搞定。" },
    { q: "Button 想显示\"置灰不可点\"状态，设置？", opts: ["interactable = false（自动套禁用过渡色）", "enabled = false", "删除组件", "改文字"], a: 0, ex: "interactable=false 保留按钮但不可交互并套用禁用色；enabled=false 是组件整体失效。" },
    { q: "TMP 文本对齐方式（左/中/右、上/中/下）在哪个属性里设置？", opts: ["TMP 的 alignment（Alignment 按钮）", "transform.position", "字体文件", "Canvas 设置"], a: 0, ex: "alignment 是九宫格对齐；配合 RectTransform 锚点才是完整的 UI 排版。" },
    { q: "滚动列表（背包、排行榜）用哪个组件承载？", opts: ["ScrollRect（Viewport + Content）", "Canvas Group", "Slider", "RawImage"], a: 0, ex: "ScrollRect + Content 上挂 Layout Group 自动排列，配合 Mask 裁剪出滚动窗口。" },
    { q: "带刘海屏的手机上 UI 被刘海挡住，解决方案是？", opts: ["用 SafeArea 脚本把根面板缩进安全区", "把所有 UI 缩小一半", "换竖屏", "无法解决"], a: 0, ex: "Screen.safeArea 提供安全区矩形，启动时把根 Canvas 对齐进去，全机型适配。" },
    { q: "背包格子自动从左到右、自动换行排列，用？", opts: ["Grid Layout Group", "Horizontal Layout Group", "Anchor", "ScrollRect 自带"], a: 0, ex: "Layout Group 家族（水平/垂直/网格）自动排子物体，增删格子自动重排。" }
  ],
  u11: [
    { q: "同步 SceneManager.LoadScene 加载大场景时会卡顿，根本原因是？", opts: ["加载在主线程一次性完成，期间无法渲染", "显卡过热", "场景太大存不下", "代码写错了"], a: 0, ex: "主线程被加载占住就渲染不了画面 → 白屏卡死感。异步加载让主线程穿插渲染进度条。" },
    { q: "卸载一个叠加加载（Additive）的场景，用？", opts: ["SceneManager.UnloadSceneAsync(\"场景名\")", "Destroy(场景)", "LoadScene 反着调", "无法卸载"], a: 0, ex: "UnloadSceneAsync 卸载指定场景并销毁其中物体；卸载前处理跨场景引用。" },
    { q: "判断\"当前激活场景\"的名字，代码是？", opts: ["SceneManager.GetActiveScene().name", "Application.sceneName", "LoadScene 返回值", "gameObject.scene"], a: 0, ex: "常用于判断当前关卡、按场景名切换音乐。" },
    { q: "叠加加载多场景后，新创建的物体会归属？", opts: ["当前激活场景（Set Active Scene 决定）", "第一个加载的场景", "随机场景", "不归属任何场景"], a: 0, ex: "多场景编辑时新物体进激活场景；光照烘焙也按激活场景来。" },
    { q: "场景加载进度条会卡在 90% 左右，原因是？", opts: ["最后 10% 是\"激活场景\"瞬间完成的（progress 最多到 0.9）", "加载失败", "进度条算错", "Unity bug"], a: 0, ex: "配合 allowSceneActivation 控制激活时机，把进度平滑推到 100% 再切换。" },
    { q: "订阅\"某场景加载完成\"事件（而非轮询），用？", opts: ["SceneManager.sceneLoaded += 回调", "Update 里每帧查", "协程轮询", "OnLevelWasLoaded（已废弃）"], a: 0, ex: "sceneLoaded 事件带回场景参数，统一管理\"每个场景加载后做什么\"。" },
    { q: "叠加加载了音乐场景和战斗场景，两个场景各有一个 AudioListener，会？", opts: ["Unity 警告\"场景中有 2 个 AudioListener\"，声音可能异常", "自动禁用一个", "声音叠加变响", "没有影响"], a: 0, ex: "全场景只能有一个有效 AudioListener。多场景架构里把它放常驻管理器，场景内的删掉。" }
  ],
  u12: [
    { q: "敌人被销毁时要播放死亡音效，正确的做法是？", opts: ["AudioSource.PlayClipAtPoint(clip, 位置)（自建独立播放器）", "在敌人自己的 AudioSource 上播（会一起被销毁）", "音效没法在销毁时播放", "把敌人禁用再播"], a: 0, ex: "敌人 Destroy 后它身上的 AudioSource 也没了，声音会被掐断；PlayClipAtPoint 自建临时播放器播完自毁。" },
    { q: "保存\"最高分\"这种简单数据（重启游戏还在），最快的方法是？", opts: ["PlayerPrefs.SetInt(\"Best\", score); / GetInt(\"Best\")", "写进场景", "Debug.Log 保存", "不存在这种方案"], a: 0, ex: "PlayerPrefs 是键值对本地存储（注册表/plist），适合分数与设置；大数据用文件。" },
    { q: "2D 游戏中控制\"视野显示范围大小\"的相机属性是？", opts: ["orthographicSize（正交半高）", "fieldOfView", "nearClipPlane", "backgroundColor"], a: 0, ex: "正交相机 orthographicSize 是视口半高：值越小看得越近。FOV 是透视相机的对应参数。" },
    { q: "想让游戏\"暂停但 UI 还能点击\"，设置？", opts: ["Time.timeScale = 0，UI 交互不受影响（时间无关）", "Time.frameCount = 0", "销毁玩家", "关闭相机"], a: 0, ex: "timeScale=0 停止物理与 WaitForSeconds；UI 事件照常。恢复改回 1。" },
    { q: "把\"敌人属性表\"（攻防血）做成可配置资产、策划不改代码就能调，用？", opts: ["ScriptableObject 数据资产", "写死在代码里", "存到场景名", "用 Environment 变量"], a: 0, ex: "ScriptableObject 是\"数据容器\"资产：数值与逻辑分离，还能被多个物体共享引用。" },
    { q: "版本管理（Git）中不应该提交的 Unity 文件夹是？", opts: ["Library（本地缓存，可自动重建）", "Assets", "ProjectSettings", "Packages"], a: 0, ex: "Library 是导入缓存，体积巨大且机器相关；配合 .gitignore 提交 Assets/ProjectSettings/Packages 即可。" },
    { q: "第三方相机插件（平滑跟随、镜头震屏）最常用的是？", opts: ["Cinemachine（Unity 官方包）", "手写三行代码", "没有这种插件", "Video Player"], a: 0, ex: "Package Manager 安装 Cinemachine：VirtualCamera 跟随、死区、震屏全内置，商业项目标配。" }
  ]
};
