// 主应用：路由 + 视图渲染
(function () {
  const S = window.Store;
  const app = document.getElementById("app");
  const WEEK = ["", "周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  const CATS = { cs: "🎯 C#", u: "🎮 Unity", other: "📖 其他" };

  // 每日励志语录（按天轮换）
  const QUOTES = [
    { t: "种一棵树最好的时间是十年前，其次是现在。", a: "谚语" },
    { t: "不积跬步，无以至千里；不积小流，无以成江海。", a: "荀子" },
    { t: "Talk is cheap. Show me the code.", a: "Linus Torvalds" },
    { t: "每一个大神玩家，都曾是新手村的小白。", a: "玩家语录" },
    { t: "业精于勤，荒于嬉；行成于思，毁于随。", a: "韩愈" },
    { t: "宝剑锋从磨砺出，梅花香自苦寒来。", a: "《警世贤文》" },
    { t: "先让它跑起来，再让它跑得对，最后让它跑得快。", a: "Kent Beck" },
    { t: "世上无难事，只怕有心人。", a: "谚语" },
    { t: "任何傻瓜都能写出机器能懂的代码，好程序员写出人能懂的代码。", a: "Martin Fowler" },
    { t: "千里之行，始于足下。", a: "老子" },
    { t: "你打怪升级的样子，就是学习该有的样子。", a: "训练营" },
    { t: "绳锯木断，水滴石穿。", a: "《汉书》" },
    { t: "简单是可靠的前提。", a: "Dijkstra" },
    { t: "学而不思则罔，思而不学则殆。", a: "孔子" },
    { t: "今天的 Bug，是明天经验的城墙。", a: "程序员语录" },
    { t: "冰冻三尺，非一日之寒。", a: "谚语" },
    { t: "过早的优化是万恶之源。", a: "Donald Knuth" },
    { t: "重复是学习之母。", a: "狄慈根" },
    { t: "通关的秘密只有一个：再来一次。", a: "训练营" },
    { t: "书山有路勤为径，学海无涯苦作舟。", a: "韩愈" },
    { t: "程序是写给人看的，顺便让机器执行。", a: "《SICP》" },
    { t: "只要功夫深，铁杵磨成针。", a: "谚语" },
    { t: "没有量变，哪来的质变？练级也是如此。", a: "训练营" },
    { t: "学如逆水行舟，不进则退。", a: "《增广贤文》" },
    { t: "第一次做不出来很正常，大神只是比你好得多而已。", a: "训练营" },
    { t: "温故而知新，可以为师矣。", a: "孔子" },
    { t: "经验值 +1 的日子，就是好日子。", a: "训练营" },
    { t: "黑发不知勤学早，白首方悔读书迟。", a: "颜真卿" },
    { t: "代码如诗，勤写如练。", a: "程序员语录" },
    { t: "欲穷千里目，更上一层楼。", a: "王之涣" },
    { t: "失败不是反例，是注释掉的进度条。", a: "训练营" },
    { t: "工欲善其事，必先利其器。", a: "孔子" }
  ];

  function dailyQuote() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const day = Math.floor((now - start) / 86400000);
    return QUOTES[day % QUOTES.length];
  }

  function quoteCard() {
    let idx = QUOTES.indexOf(dailyQuote());
    const card = el("div", "card quote-card");
    card.append(el("div", "quote-mark", "❝"));
    const qt = el("p", "quote-text", QUOTES[idx].t);
    const by = el("p", "quote-by", "—— " + QUOTES[idx].a);
    const refresh = el("button", "quote-refresh", "🔄 换一句");
    refresh.onclick = () => {
      idx = (idx + 1 + Math.floor(Math.random() * (QUOTES.length - 1))) % QUOTES.length;
      qt.textContent = QUOTES[idx].t;
      by.textContent = "—— " + QUOTES[idx].a;
      card.classList.remove("pop");
      void card.offsetWidth;
      card.classList.add("pop");
    };
    const bottom = el("div", "quote-bottom");
    bottom.append(by, refresh);
    card.append(qt, bottom);
    return card;
  }

  // ---------- 工具 ----------
  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function icon(emoji) { return el("span", "emoji", emoji); }
  function toast(msg) {
    const t = el("div", "toast", msg);
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 1800);
  }

  // 跳转：目标与当前相同时强制重渲染（避免结算页卡住）
  function go(h) {
    if (location.hash === h) render();
    else location.hash = h;
  }

  // 合成音效（无音频文件）
  let audioCtx = null;
  function sfx(kind) {
    if (!S.sound) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === "suspended") audioCtx.resume();
      const t0 = audioCtx.currentTime;
      const play = (f, st, dur, type, vol) => {
        const o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.type = type || "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(vol || 0.1, t0 + st);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + st + dur);
        o.connect(g); g.connect(audioCtx.destination);
        o.start(t0 + st); o.stop(t0 + st + dur);
      };
      if (kind === "ok") { play(880, 0, .1); play(1318, .09, .16); }
      else if (kind === "no") { play(196, 0, .22, "square", .06); }
      else if (kind === "done") { play(523, 0, .14); play(659, .12, .14); play(784, .24, .3); }
    } catch (e) { /* 无声环境忽略 */ }
  }
  function buzz(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {} }

  function confetti(container) {
    const colors = ["#58cc02", "#1cb0f6", "#ff9600", "#ff4b4b", "#ce82ff", "#ffc800"];
    for (let i = 0; i < 28; i++) {
      const p = el("div", "confetti");
      p.style.left = Math.random() * 100 + "%";
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = (Math.random() * 0.5) + "s";
      p.style.animationDuration = (1.2 + Math.random() * 0.9) + "s";
      container.appendChild(p);
    }
    setTimeout(() => container.querySelectorAll(".confetti").forEach(c => c.remove()), 2800);
  }
  function ring(pct, label, sub) {
    const wrap = el("div", "ring-box");
    const size = 120, r = 52, c = 2 * Math.PI * r;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
    svg.classList.add("ring");
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    bg.setAttribute("cx", size / 2); bg.setAttribute("cy", size / 2); bg.setAttribute("r", r);
    bg.setAttribute("class", "ring-bg");
    const fg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    fg.setAttribute("cx", size / 2); fg.setAttribute("cy", size / 2); fg.setAttribute("r", r);
    fg.setAttribute("class", "ring-fg");
    fg.style.strokeDasharray = c;
    fg.style.strokeDashoffset = c * (1 - pct);
    svg.append(bg, fg);
    const center = el("div", "ring-center");
    center.append(el("div", "ring-num", label), el("div", "ring-sub", sub));
    wrap.append(svg, center);
    return wrap;
  }

  // ---------- 今日 ----------
  function renderHome() {
    const page = el("div", "page");
    const hero = el("div", "hero hero-row");
    const greet = el("div", "greet");
    greet.append(el("h1", "", "今日训练营"));
    const wd = WEEK[S.weekday()];
    greet.append(el("p", "sub", `${wd} · 每天进步一点点，坚持就是胜利`));
    hero.append(greet);
    const snd = el("button", "icon-btn sound-btn", S.sound ? "🔊" : "🔇");
    snd.title = "音效开关";
    snd.onclick = () => { S.sound = !S.sound; S.save(); if (S.sound) sfx("ok"); render(); };
    hero.append(snd);
    page.append(hero);

    // 每日励志
    page.append(quoteCard());

    // 数据条
    const stats = el("div", "stats");
    const st = (e, v, t) => { const d = el("div", "stat"); d.append(el("div", "stat-v", e + " " + v), el("div", "stat-t", t)); return d; };
    stats.append(st("🔥", S.streak.count, "连续天数"), st("⚡", S.xp, "总经验"), st("🏅", "Lv." + S.level(), "等级"));
    page.append(stats);

    // 连击日历（近 7 天）
    const strip = el("div", "card strip-card");
    const stripHead = el("div", "strip-head");
    stripHead.append(el("span", "", "📅 近 7 天"), el("span", "muted small", `最长连击 ${S.streakBest} 天`));
    strip.append(stripHead);
    const dots = el("div", "strip-dots");
    for (let d = 6; d >= 0; d--) {
      const dt = new Date(); dt.setDate(dt.getDate() - d);
      const key = dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
      const cell = el("div", "strip-cell" + (S.days[key] ? " on" : "") + (d === 0 ? " today" : ""));
      cell.append(el("span", "strip-mark", S.days[key] ? "✅" : "·"), el("span", "strip-lab", "日一二三四五六"[dt.getDay()]));
      dots.append(cell);
    }
    strip.append(dots);
    page.append(strip);

    // 每日任务
    const dq = S.quest();
    const qcard = el("div", "card quest-card");
    qcard.append(el("h3", "", "🎯 今日任务" + (dq.q1 && dq.q2 && dq.q3 ? " · 全部完成 🎉" : "")));
    [["q1", "完成 1 节课程", 5, "#/learn/cs"], ["q2", "单次练习连对 5 题", 10, "#/review"], ["q3", "一节课全对通关", 10, "#/learn/cs"]].forEach(([k, txt, bonus, dest]) => {
      const row = el("div", "quest-row" + (dq[k] ? " done" : ""));
      row.append(el("span", "quest-mark", dq[k] ? "✅" : "⬜"), el("span", "quest-txt", txt), el("span", "quest-xp", "+" + bonus + " XP"));
      if (!dq[k]) {
        row.style.cursor = "pointer";
        row.title = "点击去完成";
        row.onclick = () => go(dest);
      }
      qcard.append(row);
    });
    page.append(qcard);

    // 近 7 天经验图
    const chart = el("div", "card chart-card");
    chart.append(el("h3", "", "📊 近 7 天经验"));
    const bars = el("div", "xp-bars");
    const vals = [];
    for (let d = 6; d >= 0; d--) {
      const dt = new Date(); dt.setDate(dt.getDate() - d);
      const key = dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
      vals.push({ label: "日一二三四五六"[dt.getDay()], v: S.xpByDay[key] || 0, today: d === 0 });
    }
    const maxV = Math.max.apply(null, vals.map(v => v.v).concat([1]));
    vals.forEach(v => {
      const col = el("div", "xp-col");
      const bar = el("div", "xp-bar" + (v.today ? " now" : ""));
      bar.style.height = Math.max(4, Math.round(v.v / maxV * 64)) + "px";
      bar.title = v.v + " XP";
      col.append(bar, el("span", "xp-lab", v.label));
      bars.append(col);
    });
    chart.append(bars);
    page.append(chart);

    // 每日目标环
    const done = S.doneToday(), goal = S.goal;
    const goalCard = el("div", "card goal-card");
    goalCard.append(ring(Math.min(done / goal, 1), `${Math.min(done, goal)}/${goal}`, "今日课程目标"));
    const goalInfo = el("div", "goal-info");
    const remain = Math.max(goal - done, 0);
    goalInfo.append(el("h3", "", done >= goal ? "今日目标达成！🎉" : `还差 ${remain} 节课达标`));
    goalInfo.append(el("p", "muted", `完成任意 ${goal} 节课程即视为达标，完成课程会自动打卡。`));
    const next = S.nextLesson();
    if (next && S.isUnlocked(next)) {
      const all2 = S.allLessons().filter(l => l.track.id === next.track.id);
      const pos = all2.findIndex(l => l.id === next.id) + 1;
      const btn = el("button", "btn primary", `继续：${next.title}（第 ${pos}/${all2.length} 课）`);
      btn.onclick = () => location.hash = "#/lesson/" + next.id;
      goalInfo.append(btn);
    }
    goalCard.append(goalInfo);
    page.append(goalCard);

    // 今日打卡
    const checkCard = el("div", "card check-card");
    const checked = S.days[S.today()];
    const cb = el("button", "btn " + (checked ? "ghost done" : "accent"));
    cb.textContent = checked ? "✅ 今日已打卡" : "签到打卡 (+10 XP)";
    cb.disabled = !!checked;
    cb.onclick = () => { S.addXp(10); S.markToday(); toast("打卡成功 +10 XP ⚡"); render(); };
    checkCard.append(cb);
    const sub = el("p", "muted small", checked ? "保持下去，明天继续加油 🔥" : "今天还没打卡，点一下证明你来过。");
    checkCard.append(sub);
    page.append(checkCard);

    // 今日课表
    page.append(sectionTitle("🗓️ 今天的课", "#/schedule", "管理课表"));
    const list = S.coursesToday();
    if (!list.length) {
      const empty = el("div", "card empty", "今天没有排课，自由安排：去「课程」闯一关，或在「课表」里添加今日课程。");
      page.append(empty);
    } else {
      list.forEach(c => page.append(courseCard(c, true)));
    }

    // 快捷入口
    page.append(sectionTitle("🚀 快速开始"));
    const quick = el("div", "quick-grid");
    const q = (emoji, t, d, hash) => {
      const c = el("div", "card quick");
      c.append(el("div", "q-emoji", emoji), el("h4", "", t), el("p", "muted small", d));
      c.onclick = () => location.hash = hash;
      return c;
    };
    quick.append(
      q("🎯", "C# 基础", "从变量到 LINQ", "#/learn/cs"),
      q("🎮", "Unity 核心", "从编辑器到实战", "#/learn/u"),
      q("🧮", "算法题库", "10 专题 50 题", "#/learn/algo"),
      q("🗂️", "我的课程", "自建学习内容", "#/custom"),
      q("🔁", "错题重练", `错题 ${Object.keys(S.wrong).length} 道`, "#/review"),
      q("🌐", "GitHub 资源", "更多学习仓库", "#/resources")
    );
    page.append(quick);
    app.replaceChildren(page);
  }

  function sectionTitle(text, hash, linkText) {
    const row = el("div", "sec-row");
    row.append(el("h2", "sec-title", text));
    if (hash) { const a = el("a", "sec-link", linkText); a.href = hash; row.append(a); }
    return row;
  }

  function courseCard(c, today) {
    const card = el("div", "card course-item");
    const top = el("div", "ci-top");
    top.append(el("span", "badge cat-" + c.cat, CATS[c.cat] || c.cat));
    if (c.time) top.append(el("span", "ci-time", "⏰ " + c.time));
    card.append(top);
    const left = el("div", "ci-main");
    left.append(el("h4", "", c.title));
    if (c.note) left.append(el("p", "muted small", c.note));
    card.append(left);
    const actions = el("div", "ci-actions");
    if (c.pdf) {
      const pdfBtn = el("button", "btn tiny pdf-btn", "📄 " + c.pdf.name);
      pdfBtn.onclick = () => openPdf(c.pdf.id);
      actions.append(pdfBtn);
    }
    const del = el("button", "icon-btn", "🗑");
    del.title = "删除";
    del.onclick = (e) => {
      e.stopPropagation();
      if (confirm(`删除课程「${c.title}」？`)) { S.removeCourse(c.id); toast("已删除"); render(); }
    };
    actions.append(del);
    card.append(actions);
    return card;
  }

  async function openMedia(id, name, kind) {
    try {
      const rec = await S.getPdf(id);
      if (!rec) return toast("找不到文件");
      const url = URL.createObjectURL(rec.blob);
      const modal = el("div", "modal");
      const box = el("div", "modal-box pdf-box");
      const bar = el("div", "modal-bar");
      bar.append(el("span", "modal-title", "📄 " + (rec.name || name)));
      const close = el("button", "btn tiny", "关闭");
      close.onclick = () => { URL.revokeObjectURL(url); modal.remove(); };
      bar.append(close);
      let frame;
      if (kind === "video") {
        frame = el("video", "pdf-frame");
        frame.controls = true;
        frame.src = url;
      } else {
        frame = el("iframe", "pdf-frame");
        frame.src = url;
      }
      box.append(bar, frame);
      modal.append(box);
      modal.onclick = (e) => { if (e.target === modal) { URL.revokeObjectURL(url); modal.remove(); } };
      document.body.appendChild(modal);
    } catch (e) { toast("打开失败：" + e); }
  }

  async function openPdf(id) { return openMedia(id, "", "pdf"); }

  // ---------- 课程列表 ----------
  function renderLearn(trackId) {
    const page = el("div", "page");
    page.append(el("h1", "", "课程闯关"));
    page.append(el("p", "sub muted", "按顺序闯关：完成上一课自动解锁下一课。学完知识点后答题，全部课程共 " + S.allLessons().length + " 节。"));

    const tabs = el("div", "tabs");
    [window.CSHARP_COURSE, window.UNITY_COURSE, window.ALGO_COURSE].forEach(c => {
      const t = el("button", "tab" + (c.id === trackId ? " active" : ""), `${c.emoji} ${c.short}`);
      t.onclick = () => { location.hash = "#/learn/" + c.id; };
      tabs.append(t);
    });
    page.append(tabs);

    const course = trackId === "cs" ? window.CSHARP_COURSE : trackId === "u" ? window.UNITY_COURSE : window.ALGO_COURSE;
    const info = el("div", "card track-info");
    info.append(el("h3", "", `${course.emoji} ${course.title}`), el("p", "muted small", course.desc));
    const doneN = course.lessons.filter(l => S.lessons[l.id] && S.lessons[l.id].done).length;
    const barWrap = el("div", "track-bar");
    const bar = el("div", "track-bar-fg");
    bar.style.width = (doneN / course.lessons.length * 100) + "%";
    barWrap.append(bar);
    info.append(barWrap, el("p", "muted small", `${doneN}/${course.lessons.length} 已完成`));
    page.append(info);

    const path = el("div", "path");
    const all = S.allLessons().filter(l => l.track.id === trackId);
    all.forEach((l, i) => {
      const rec = S.lessons[l.id];
      const unlocked = S.isUnlocked(l);
      const node = el("div", "node " + (rec && rec.done ? "done" : unlocked ? "current" : "locked"));
      const ball = el("div", "node-ball");
      ball.textContent = rec && rec.done ? "✓" : unlocked ? (i + 1) : "🔒";
      const txt = el("div", "node-txt");
      txt.append(el("div", "node-title", l.title), el("div", "muted small", `约 ${l.mins} 分钟 · ${l.qs.length} 题` + (rec ? ` · 最佳 ${rec.score} 分` : "")));
      node.append(ball, txt);
      if (unlocked) node.onclick = () => location.hash = "#/lesson/" + l.id;
      path.append(node);
    });
    page.append(path);

    const unlockRow = el("div", "unlock-row");
    const ub = el("button", "btn ghost tiny", S.freeUnlock ? "🔓 已开启自由模式（点击关闭）" : "🔒 顺序闯关中（点击开启自由模式）");
    ub.onclick = () => { S.freeUnlock = !S.freeUnlock; S.save(); render(); };
    unlockRow.append(ub);
    page.append(unlockRow);
    app.replaceChildren(page);
  }

  // ---------- 课程学习/答题 ----------
  let LP = null; // 当前课程会话

  function startLesson(id, reviewList) {
    if (reviewList && !reviewList.length) { location.hash = "#/review"; return; }
    const lesson = reviewList ? null : S.findLesson(id);
    if (!reviewList && S.getHearts() === 0) {
      showHeartsFail(() => startLesson(id, null));
      return;
    }
    LP = {
      review: !!reviewList,
      list: reviewList || [{ lesson, q: null }],  // review: [{lesson,q,qi}]
      qi: 0,
      stage: (reviewList || (lesson && !lesson.kps)) ? "quiz" : "cards",
      correct: 0,
      streak: 0,
      answered: false
    };
    renderLP();
  }

  // 红心耗尽弹窗
  function showHeartsFail(onContinue) {
    if (document.querySelector(".hearts-modal")) return;
    const modal = el("div", "modal hearts-modal");
    const box = el("div", "modal-box heart-box");
    box.append(el("div", "result-emoji", "💔"));
    box.append(el("h2", "", "红心用完啦"));
    box.append(el("p", "muted", "答错扣一颗心，等待回血、做错题练习或用经验补满。"));
    const mins = Math.max(1, Math.ceil(S.nextHeartMs() / 60000));
    box.append(el("p", "muted small", `下一颗心约 ${mins} 分钟后回复`));
    const buy = el("button", "btn primary big", "用 20 XP 补满红心");
    if (S.xp < 20) { buy.disabled = true; buy.textContent = `用 20 XP 补满（当前 ${S.xp} XP）`; }
    buy.onclick = () => { if (S.spendXp(20)) { S.refillHearts(); modal.remove(); toast("❤️ 红心已回满"); if (onContinue) onContinue(); } };
    const review = el("button", "btn accent big", "🔁 去错题练习，完成即回满");
    review.onclick = () => { modal.remove(); LP = null; location.hash = "#/review"; };
    const quit = el("button", "btn ghost big", "退出本次练习");
    quit.onclick = () => { modal.remove(); LP = null; location.hash = "#/learn/cs"; };
    box.append(buy, review, quit);
    modal.append(box);
    document.body.appendChild(modal);
  }

  function renderLP() {
    const page = el("div", "page");
    if (!LP) { location.hash = "#/learn/cs"; return; }

    const headLesson = LP.list[0].lesson;          // 复习/练习模式取第一条的所属课
    const mixed = LP.review || LP.practice;
    const item = mixed ? LP.list[LP.qi] : null;
    const lesson = mixed ? item.lesson : headLesson;
    const totalSteps = mixed ? LP.list.length : lesson.qs.length;

    // 顶部：返回 + 进度
    const top = el("div", "lp-top");
    const back = el("button", "icon-btn", "←");
    back.onclick = () => go(LP.practice || LP.review ? "#/review" : "#/learn/" + headLesson.track.id);
    top.append(back);
    page.append(top);

    if (LP.stage === "cards") {
      page.append(el("div", "lp-head"));
      page.append(el("h1", "", lesson.title));
      page.append(el("p", "muted", `${lesson.track.emoji} ${lesson.track.title} · 约 ${lesson.mins} 分钟 · ${lesson.kps.length} 个知识点`));

      lesson.kps.forEach((kp, i) => {
        const card = el("div", "card kp");
        card.append(el("div", "kp-num", String(i + 1)));
        card.append(el("h3", "", kp.t));
        card.append(el("p", "kp-desc", kp.d));
        if (kp.c) {
          const pre = el("pre", "code");
          pre.append(el("code", "", kp.c));
          card.append(pre);
        }
        const det = (window.KP_DETAILS || {})[lesson.id + "_" + i];
        if (det && (det.more || det.pit || det.tip)) {
          const d = document.createElement("details");
          d.className = "kp-more";
          const sum = document.createElement("summary");
          sum.append(icon("📖"), el("span", "", " 深入了解（原理 · 避坑 · 实战）"));
          d.append(sum);
          (det.more || []).forEach(m => d.append(el("p", "kp-more-p", m)));
          if (det.pit) d.append(el("p", "kp-pit", "⚠️ 常见坑：" + det.pit));
          if (det.tip) d.append(el("p", "kp-tip", "💡 实战建议：" + det.tip));
          card.append(d);
        }
        page.append(card);
      });

      const start = el("button", "btn primary big", "开始答题 🚀");
      start.onclick = () => { LP.stage = "quiz"; LP.qi = 0; LP.correct = 0; renderLP(); };
      page.append(start);
      app.replaceChildren(page);
      return;
    }

    if (LP.stage === "quiz") {
      const q = mixed ? item.q : lesson.qs[LP.qi];
      const step = LP.qi + 1;
      page.append(progressBar(step, totalSteps));
      page.append(el("p", "lp-count muted small", LP.review ? `错题重练 ${step}/${totalSteps}` : LP.practice ? `综合练习 ${step}/${totalSteps}` : `第 ${step} 题 / 共 ${totalSteps} 题`));
      const card = el("div", "card quiz-card");
      card.append(el("h3", "q-title", q.q));
      if (q.code) {
        const pre = el("pre", "code");
        pre.append(el("code", "", q.code));
        card.append(pre);
      }
      const opts = el("div", "opts");
      const feedback = el("div", "feedback");
      let picked = false;
      q.opts.forEach((opt, oi) => {
        const b = el("button", "opt");
        b.append(el("span", "opt-key", String.fromCharCode(65 + oi)), el("span", "opt-text", opt));
        b.onclick = () => {
          if (picked) return;
          picked = true;
          const right = oi === q.a;
          const noHearts = LP.review || LP.practice;
          if (right) {
            b.classList.add("right"); LP.correct++; LP.streak++;
            sfx("ok");
            if (noHearts) S.removeWrong(item.lesson.id, item.qi);
            if (LP.streak >= 5 && S.completeQuest("q2", 10)) toast("🏆 任务达成：连对 5 题 +10 XP");
          } else {
            b.classList.add("wrong");
            opts.children[q.a].classList.add("right");
            LP.streak = 0;
            sfx("no"); buzz(60);
            if (!LP.review) S.addWrong(lesson.id, LP.qi);
            if (!noHearts && S.loseHeart() === 0) LP.dead = true;
          }
          const hNow = S.getHearts();
          const heartTxt = noHearts || right ? "" : `${hNow}/${S.MAX_HEARTS} ` + "❤️".repeat(hNow) + "🖤".repeat(S.MAX_HEARTS - hNow);
          feedback.append(el("p", right ? "fb ok" : "fb no", (right ? "✅ 答对了！ " : "❌ 答错了。 ") + q.ex));
          const last = LP.qi + 1 >= totalSteps;
          const nxt = el("button", "btn primary", last ? "查看结果" : "下一题");
          nxt.onclick = () => {
            if (!noHearts && S.getHearts() === 0) { showHeartsFail(() => renderLP()); return; }
            if (last) finishQuiz();
            else { LP.qi++; renderLP(); }
          };
          feedback.append(nxt);
          const hb = el("div", "q-hearts", heartTxt.trim() ? "红心 " + heartTxt.trim() : "");
          feedback.append(hb);
          [...opts.children].forEach(c => c.disabled = true);
        };
        opts.append(b);
      });
      card.append(opts, feedback);
      page.append(card);
      app.replaceChildren(page);
      return;
    }

    // 结果页
    const lessonRes = LP.result;
    const card = el("div", "card result-card");
    confetti(card);
    sfx("done"); buzz(30);
    card.append(el("div", "result-emoji", lessonRes.correct === totalSteps ? "🏆" : lessonRes.correct * 2 >= totalSteps ? "🎉" : "💪"));
    card.append(el("h1", "", LP.practice ? "练习完成！" : lessonRes.correct === totalSteps ? "完美通关！" : "本次训练完成"));
    card.append(el("div", "result-xp", "+" + lessonRes.xp + " XP"));
    card.append(el("p", "muted", `答对 ${lessonRes.correct}/${totalSteps} 题` + (lessonRes.first ? " · 首次通关奖励已含" : "")));
    if (LP.practice) card.append(el("p", "muted small", "🧪 综合练习 · 每答对 1 题 +5 XP，不扣红心"));
    if (LP.review) card.append(el("p", "muted small", "❤️ 错题练习完成，红心已回满"));
    // 直达下一课（同赛道下一节未完成课）
    if (!LP.practice && !LP.review && lessonRes.id) {
      const tList = S.allLessons().filter(l => l.track.id === lessonRes.trackId);
      const idx = tList.findIndex(l => l.id === lessonRes.id);
      const next = tList[idx + 1];
      if (next && S.isUnlocked(next)) {
        const nx = el("button", "btn accent big", "下一课 → " + next.title);
        nx.onclick = () => go("#/lesson/" + next.id);
        card.append(nx);
      }
    }
    const btns = el("div", "result-btns");
    const again = el("button", "btn ghost", "再练一次");
    again.onclick = () => {
      if (LP.practice) startPractice(LP.result.trackId);
      else startLesson(LP.result.id, LP.review ? collectReview() : null);
    };
    const home = el("button", "btn primary", LP.practice || LP.review ? "返回复习" : "返回课程");
    home.onclick = () => go((LP.practice || LP.review) ? "#/review" : "#/learn/" + lessonRes.trackId);
    btns.append(again, home);
    card.append(btns);
    page.append(card);
    app.replaceChildren(page);
  }

  function collectReview() {
    const list = S.wrongList().map(w => ({ lesson: w.lesson, q: w.q, qi: w.qi }));
    for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [list[i], list[j]] = [list[j], list[i]]; }
    return list;
  }

  function finishQuiz() {
    const total = LP.review || LP.practice ? LP.list.length : LP.list[0].lesson.qs.length;
    if (LP.practice) {
      const xp = LP.correct * 5;
      S.addXp(xp);
      S.markToday();
      LP.result = { correct: LP.correct, xp, practice: true, trackId: LP.trackId };
    } else if (LP.review) {
      S.refillHearts();
      LP.result = { correct: LP.correct, xp: LP.correct * 5, trackId: "cs", id: null, refilled: true };
    } else {
      const lesson = LP.list[0].lesson;
      const first = !(S.lessons[lesson.id] && S.lessons[lesson.id].done);
      const xp = S.completeLesson(lesson.id, LP.correct, total, first);
      if (S.completeQuest("q1", 5)) toast("🏆 任务达成：完成 1 节课 +5 XP");
      if (LP.correct === total && S.completeQuest("q3", 10)) toast("🏆 任务达成：全对通关 +10 XP");
      LP.result = { correct: LP.correct, xp, trackId: lesson.track.id, id: lesson.id, first };
    }
    LP.stage = "done";
    renderLP();
  }

  function progressBar(step, total) {
    const w = el("div", "pbar");
    const f = el("div", "pbar-fg");
    f.style.width = (step / total * 100) + "%";
    w.append(f);
    return w;
  }

  // ---------- 课表 ----------
  function renderSchedule() {
    const page = el("div", "page");
    page.append(el("h1", "", "我的课表"));
    page.append(el("p", "sub muted", "自由添加课程与附件，随时查看每天要上的课。"));

    // 添加表单
    const formCard = el("div", "card form-card");
    const title = el("input"); title.placeholder = "课程名称，如：Unity 物理系统";
    const row1 = el("div", "form-row");
    const cat = el("select");
    Object.entries(CATS).forEach(([k, v]) => { const o = el("option", "", v); o.value = k; cat.append(o); });
    const wd = el("select");
    for (let i = 1; i <= 7; i++) { const o = el("option", "", WEEK[i]); o.value = String(i); wd.append(o); }
    wd.value = String(S.weekday());
    const time = el("input"); time.type = "time"; time.value = "20:00";
    row1.append(cat, wd, time);
    const note = el("input"); note.placeholder = "备注（可选）：本章重点 / 作业";
    const pdfInput = el("input"); pdfInput.type = "file"; pdfInput.accept = "application/pdf,.pdf";
    const pdfLabel = el("label", "pdf-label", "📎 选择 PDF 课件（可选）");
    pdfLabel.onclick = () => pdfInput.click();
    pdfInput.onchange = () => { pdfLabel.textContent = pdfInput.files[0] ? "📄 " + pdfInput.files[0].name : "📎 选择 PDF 课件（可选）"; };
    const add = el("button", "btn primary big", "＋ 添加到课表");
    add.onclick = async () => {
      if (!title.value.trim()) return toast("请先填写课程名称");
      const item = { title: title.value.trim(), cat: cat.value, wd: Number(wd.value), time: time.value, note: note.value.trim(), pdf: null };
      const f = pdfInput.files[0];
      if (f) {
        if (f.size > 100 * 1024 * 1024) return toast("PDF 不能超过 100MB");
        const pid = S.uuid() + ".pdf";
        await S.savePdf({ id: pid, name: f.name, blob: f });
        item.pdf = { id: pid, name: f.name };
      }
      S.addCourse(item);
      toast("已加入课表 ✅");
      render();
    };
    formCard.append(el("h3", "", "添加课程"), title, row1, note, pdfInput, pdfLabel, add);
    page.append(formCard);

    // 今天
    page.append(sectionTitle("⭐ 今天要上的课"));
    const todayList = S.coursesToday();
    if (!todayList.length) page.append(el("div", "card empty", "今天没有排课～"));
    todayList.forEach(c => page.append(courseCard(c)));

    // 本周
    page.append(sectionTitle("📅 本周安排"));
    for (let d = 1; d <= 7; d++) {
      const list = S.coursesAt(d);
      const group = el("div", "day-group" + (d === S.weekday() ? " today" : ""));
      const head = el("div", "day-head");
      head.append(el("span", "day-name", WEEK[d] + (d === S.weekday() ? " · 今天" : "")), el("span", "muted small", `${list.length} 节`));
      group.append(head);
      if (!list.length) {
        group.append(el("p", "muted small day-empty", "—"));
      } else list.forEach(c => group.append(courseCard(c)));
      page.append(group);
    }
    app.replaceChildren(page);
  }

  // ---------- 综合练习 ----------
  function practicePool(trackId) {
    let pool = S.allLessons().filter(l => S.lessons[l.id] && S.lessons[l.id].done);
    if (pool.length < 4) pool = S.allLessons().filter(l => S.isUnlocked(l));
    if (trackId) pool = pool.filter(l => l.track.id === trackId);
    const qs = [];
    pool.forEach(l => l.qs.forEach((q, qi) => qs.push({ lesson: l, q, qi })));
    for (let i = qs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [qs[i], qs[j]] = [qs[j], qs[i]];
    }
    return qs.slice(0, 8);
  }

  function startPractice(trackId) {
    const list = practicePool(trackId);
    if (list.length < 4) return toast("已学题目还不够，先去闯几关吧");
    LP = { practice: true, review: false, trackId: trackId || null, list, qi: 0, stage: "quiz", correct: 0, streak: 0 };
    renderLP();
  }

  // ---------- 错题本 ----------
  function renderReview() {
    const page = el("div", "page");
    page.append(el("h1", "", "复习与练习"));
    page.append(el("p", "sub muted", "错题消灭 + 随机混考，双管齐下记得牢。"));

    // 综合练习
    const prac = el("div", "card form-card");
    prac.append(el("h3", "", "🧪 综合练习"));
    prac.append(el("p", "muted small", "从已学课程随机抽 8 题混考：答对每题 +5 XP，不扣红心，答错自动进错题本。"));
    const prow = el("div", "btn-row wrap");
    [["🌈 全部", null], ["🎯 C#", "cs"], ["🎮 Unity", "u"], ["🧮 算法", "algo"]].forEach(([txt, tid]) => {
      const b = el("button", "btn accent tiny", txt);
      b.onclick = () => startPractice(tid);
      prow.append(b);
    });
    prac.append(prow);
    page.append(prac);

    // 错题本
    page.append(sectionTitle("🔁 错题本"));
    const list = S.wrongList();
    const card = el("div", "card review-card");
    card.append(el("div", "result-emoji", list.length ? "🔁" : "🌈"));
    if (!list.length) {
      card.append(el("h3", "", "错题本空空如也"), el("p", "muted", "答题时选错的题会自动收进这里，供你反复消灭。"));
      const go = el("button", "btn primary", "去闯关答题");
      go.onclick = () => location.hash = "#/learn/cs";
      card.append(go);
    } else {
      card.append(el("h3", "", `还有 ${list.length} 道错题待消灭`), el("p", "muted", "重练答对即可移出错题本，全部消灭有额外奖励。"));
      const go = el("button", "btn primary big", "开始重练");
      go.onclick = () => { const l = collectReview(); if (l.length) startLesson(null, l); };
      card.append(go);
      const table = el("div", "wrong-list");
      list.forEach(w => {
        const row = el("div", "wrong-row");
        row.append(el("span", "badge", w.lesson.title), el("span", "wrong-q", w.q.q));
        table.append(row);
      });
      card.append(table);
    }
    page.append(card);
    app.replaceChildren(page);
  }

  // ---------- 我的课程（自建内容） ----------
  const BLOCK_KINDS = { text: "📝 文字", code: "💻 代码", video: "🎬 视频", link: "🔗 链接", quiz: "❓ 自测题" };
  let builder = null;      // { trackId, title, blocks: [] }
  let importInput = null;

  function parseVideo(url) {
    url = (url || "").trim();
    let m;
    if ((m = url.match(/bilibili\.com\/video\/(BV\w+)/i)) || (m = url.match(/^(BV\w+)$/i)))
      return { type: "iframe", src: "https://player.bilibili.com/player.html?bvid=" + m[1] + "&autoplay=0" };
    if ((m = url.match(/youtube\.com\/watch\?v=([\w-]+)/i)) || (m = url.match(/youtu\.be\/([\w-]+)/i)))
      return { type: "iframe", src: "https://www.youtube.com/embed/" + m[1] };
    if (/^https?:\/\/.+\.(mp4|webm|m4v|mov)(\?|#|$)/i.test(url)) return { type: "file", src: url };
    if (/^https?:\/\//.test(url)) return { type: "iframe", src: url };
    return null;
  }

  function copyText(text, btn) {
    const ok = () => { btn.textContent = "✅ 已复制"; setTimeout(() => btn.textContent = "复制", 1500); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok).catch(() => fallback());
    } else fallback();
    function fallback() {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); ok(); } catch (e) { toast("复制失败，请手动复制"); }
      ta.remove();
    }
  }

  function renderCustom(trackId, lessonId) {
    if (trackId && lessonId) return renderCustomLesson(trackId, lessonId);
    if (trackId) return renderTrackDetail(trackId);
    return renderCustomHome();
  }

  function renderCustomHome() {
    const page = el("div", "page");
    page.append(el("h1", "", "我的课程"));
    page.append(el("p", "sub muted", "想学什么自己加：文字、代码、视频、链接和自测题，内容保存在本设备。"));

    // 新建课程包
    const form = el("div", "card form-card");
    const name = el("input"); name.placeholder = "课程包名称，如：Three.js 入门";
    const emoji = el("input"); emoji.placeholder = "图标（一个 emoji，默认 📗）"; emoji.maxLength = 4;
    const add = el("button", "btn primary big", "＋ 新建课程包");
    add.onclick = () => {
      if (!name.value.trim()) return toast("先给课程包起个名字");
      const t = S.addTrack(name.value.trim(), emoji.value.trim() || "📗");
      toast("已创建 ✅");
      location.hash = "#/custom/" + t.id;
    };
    form.append(el("h3", "", "新建课程包"), name, emoji, add);
    page.append(form);

    // 课程包列表
    if (S.customTracks.length) {
      page.append(sectionTitle("📚 已有课程包"));
      S.customTracks.forEach(t => {
        const card = el("div", "card course-item");
        const main = el("div", "ci-main");
        main.style.cursor = "pointer";
        main.onclick = () => location.hash = "#/custom/" + t.id;
        const top = el("div", "ci-top");
        top.append(el("span", "badge", `${t.emoji} ${t.name}`));
        top.append(el("span", "ci-time", `${t.lessons.length} 节课`));
        main.append(top);
        main.append(el("h4", "", t.name));
        const doneN = t.lessons.filter(l => { const r = S.lessons["x_" + l.id]; return r && r.done; }).length;
        main.append(el("p", "muted small", `已完成 ${doneN}/${t.lessons.length}`));
        card.append(main);
        const del = el("button", "icon-btn", "🗑");
        del.onclick = (e) => {
          e.stopPropagation();
          if (confirm(`删除课程包「${t.name}」及其全部课程？`)) { S.removeTrack(t.id); toast("已删除"); render(); }
        };
        card.append(del);
        page.append(card);
      });
    } else {
      page.append(el("div", "card empty", "还没有自建课程，先新建一个课程包吧～"));
    }

    // 数据管理
    const data = el("div", "card form-card");
    data.append(el("h3", "", "数据备份"));
    const row = el("div", "btn-row");
    const exp = el("button", "btn accent", "⬇ 导出备份");
    exp.onclick = () => {
      const blob = new Blob([S.exportData()], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "uclearn-backup-" + S.today() + ".json";
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      toast("备份已下载 ✅");
    };
    const imp = el("button", "btn ghost", "⬆ 导入备份");
    imp.onclick = () => {
      if (!importInput) {
        importInput = el("input"); importInput.type = "file"; importInput.accept = ".json,application/json";
        importInput.style.display = "none";
        importInput.onchange = () => {
          const f = importInput.files[0]; if (!f) return;
          const r = new FileReader();
          r.onload = () => {
            try {
              JSON.parse(r.result);
            } catch (e) { return toast("文件不是有效的备份"); }
            if (!confirm("导入会覆盖当前的学习进度和自建课程，继续？")) return;
            S.importData(r.result);
            toast("导入成功 ✅");
            render();
          };
          r.readAsText(f);
        };
        document.body.appendChild(importInput);
      }
      importInput.click();
    };
    row.append(exp, imp);
    data.append(row);
    data.append(el("p", "muted small", "备份包含进度、课表与自建课程；PDF/视频附件体积大，不参与备份，需重新上传。"));
    page.append(data);

    // 资源入口
    const res = el("div", "card course-item");
    const rm = el("div", "ci-main"); rm.style.cursor = "pointer";
    rm.onclick = () => location.hash = "#/resources";
    rm.append(el("h4", "", "🌐 GitHub 学习资源"));
    rm.append(el("p", "muted small", "精选开源教程仓库与官方文档"));
    res.append(rm);
    page.append(res);
    app.replaceChildren(page);
  }

  function renderTrackDetail(tid) {
    const track = S.getTrack(tid);
    if (!track) { location.hash = "#/custom"; return; }
    const page = el("div", "page");
    const head = el("div", "lp-top");
    const back = el("button", "icon-btn", "←");
    back.onclick = () => location.hash = "#/custom";
    head.append(back);
    page.append(head);
    page.append(el("h1", "", `${track.emoji} ${track.name}`));
    page.append(el("p", "sub muted", "点击课程开始学习；用下方编辑器添加新课程。"));

    // 课程列表
    if (track.lessons.length) {
      track.lessons.forEach(l => {
        const rec = S.lessons["x_" + l.id];
        const card = el("div", "card course-item");
        const main = el("div", "ci-main");
        main.style.cursor = "pointer";
        main.onclick = () => location.hash = `#/custom/${tid}/${l.id}`;
        const top = el("div", "ci-top");
        top.append(el("span", "badge", rec && rec.done ? "✅ 已学" : "未学"));
        const icons = l.blocks.map(b => BLOCK_KINDS[b.t][0]).join(" ");
        if (icons) top.append(el("span", "ci-time", icons));
        main.append(top);
        main.append(el("h4", "", l.title));
        main.append(el("p", "muted small", l.blocks.length + " 个内容模块"));
        card.append(main);
        const del = el("button", "icon-btn", "🗑");
        del.onclick = (e) => {
          e.stopPropagation();
          if (confirm(`删除课程「${l.title}」？`)) { S.removeCustomLesson(tid, l.id); toast("已删除"); render(); }
        };
        card.append(del);
        page.append(card);
      });
    } else {
      page.append(el("div", "card empty", "这个课程包还是空的，添加第一节课程吧～"));
    }

    // 编辑器
    if (builder && builder.trackId === tid) page.append(renderBuilder(tid));
    else {
      const newBtn = el("button", "btn primary big", "＋ 添加一节课");
      newBtn.onclick = () => { builder = { trackId: tid, title: "", blocks: [newBlock("text")] }; render(); };
      page.append(newBtn);
    }
    app.replaceChildren(page);
  }

  function newBlock(type) {
    const base = { t: type };
    if (type === "text") Object.assign(base, { title: "", body: "" });
    if (type === "code") Object.assign(base, { title: "", code: "" });
    if (type === "video") Object.assign(base, { url: "", blobId: null, name: "" });
    if (type === "link") Object.assign(base, { url: "", label: "" });
    if (type === "quiz") Object.assign(base, { q: "", opts: ["", "", "", ""], a: 0, ex: "" });
    return base;
  }

  function renderBuilder(tid) {
    const card = el("div", "card form-card builder");
    card.append(el("h3", "", "✏️ 编辑新课程"));
    const title = el("input");
    title.placeholder = "课程标题，如：第一节 · 变量与类型";
    title.value = builder.title;
    title.oninput = () => builder.title = title.value;
    card.append(title);

    builder.blocks.forEach((b, i) => {
      const bc = el("div", "block-editor");
      const head = el("div", "block-head");
      const sel = el("select");
      Object.entries(BLOCK_KINDS).forEach(([k, v]) => { const o = el("option", "", v); o.value = k; if (k === b.t) o.selected = true; sel.append(o); });
      sel.onchange = () => { builder.blocks[i] = newBlock(sel.value); render(); };
      const rm = el("button", "icon-btn", "✖");
      rm.onclick = () => { builder.blocks.splice(i, 1); render(); };
      head.append(sel, rm);
      bc.append(head);

      const inp = (placeholder, val, cb, ta) => {
        const e = ta ? document.createElement("textarea") : el("input");
        if (ta) e.rows = 3;
        e.placeholder = placeholder;
        e.value = val || "";
        e.oninput = () => cb(e.value);
        return e;
      };

      if (b.t === "text") {
        bc.append(inp("小标题（可选）", b.title, v => b.title = v));
        bc.append(inp("正文内容", b.body, v => b.body = v, true));
      } else if (b.t === "code") {
        bc.append(inp("代码说明（可选）", b.title, v => b.title = v));
        bc.append(inp("粘贴代码", b.code, v => b.code = v, true));
      } else if (b.t === "video") {
        const fileLabel = el("label", "pdf-label", b.blobId ? "🎬 已选本地视频：" + b.name + "（点击更换）" : "🎬 上传本地视频文件（mp4/webm，最大 200MB，点击选择）");
        const file = el("input"); file.type = "file"; file.accept = "video/mp4,video/webm,video/mp4";
        file.style.display = "none";
        file.onchange = () => {
          const f = file.files[0]; if (!f) return;
          if (f.size > 200 * 1024 * 1024) { toast("视频不能超过 200MB"); return; }
          b._file = f; b.blobId = null; b.name = f.name;
          fileLabel.textContent = "🎬 已选本地视频：" + f.name + "（保存时上传）";
        };
        fileLabel.onclick = () => file.click();
        bc.append(inp("视频链接：B站BV号/链接、YouTube 链接或 mp4 直链", b.url, v => b.url = v));
        bc.append(el("p", "muted small", "填了链接就不用上传文件；二选一即可。B站视频请在 App 里点「分享→复制链接」后粘贴。"));
        bc.append(file, fileLabel);
      } else if (b.t === "link") {
        bc.append(inp("网址 https://...", b.url, v => b.url = v));
        bc.append(inp("显示名称（可选）", b.label, v => b.label = v));
      } else if (b.t === "quiz") {
        bc.append(inp("问题", b.q, v => b.q = v, true));
        b.opts.forEach((o, oi) => {
          bc.append(inp(`选项 ${String.fromCharCode(65 + oi)}`, o, v => b.opts[oi] = v));
        });
        const ans = el("select");
        b.opts.forEach((_, oi) => { const o = el("option", "", "正确答案：" + String.fromCharCode(65 + oi)); o.value = String(oi); if (b.a === oi) o.selected = true; ans.append(o); });
        ans.onchange = () => b.a = Number(ans.value);
        bc.append(ans);
        bc.append(inp("解析（选填）", b.ex, v => b.ex = v));
      }
      card.append(bc);
    });

    // 添加模块按钮
    const addRow = el("div", "btn-row wrap");
    Object.entries(BLOCK_KINDS).forEach(([k, v]) => {
      const btn = el("button", "btn ghost tiny", "＋ " + v);
      btn.onclick = () => { builder.blocks.push(newBlock(k)); render(); };
      addRow.append(btn);
    });
    card.append(addRow);

    const save = el("button", "btn primary big", "💾 保存课程");
    save.onclick = async () => {
      if (!builder.title.trim()) return toast("请填写课程标题");
      if (!builder.blocks.length) return toast("至少添加一个内容模块");
      const blocks = [];
      for (const b of builder.blocks) {
        const c = Object.assign({}, b);
        delete c._file;
        if (b.t === "video" && b._file) {
          const pid = "vid_" + S.uuid();
          await S.savePdf({ id: pid, name: b._file.name, blob: b._file });
          c.blobId = pid; c.name = b._file.name; c.url = "";
        }
        blocks.push(c);
      }
      S.addCustomLesson(tid, { title: builder.title.trim(), blocks });
      builder = null;
      toast("课程已保存 ✅");
      render();
    };
    const cancel = el("button", "btn ghost big", "取消");
    cancel.onclick = () => { builder = null; render(); };
    card.append(save, cancel);
    return card;
  }

  function renderCustomLesson(tid, lid) {
    const track = S.getTrack(tid);
    const lesson = track && track.lessons.find(l => l.id === lid);
    if (!lesson) { location.hash = "#/custom/" + tid; return; }
    const page = el("div", "page");
    const head = el("div", "lp-top");
    const back = el("button", "icon-btn", "←");
    back.onclick = () => location.hash = "#/custom/" + tid;
    head.append(back);
    page.append(head);
    page.append(el("h1", "", lesson.title));
    page.append(el("p", "sub muted", `${track.emoji} ${track.name} · ${lesson.blocks.length} 个模块`));

    const quizBlocks = lesson.blocks.filter(b => b.t === "quiz");
    let quizCorrect = 0;

    lesson.blocks.forEach(b => {
      if (b.t === "text") {
        const card = el("div", "card kp");
        card.append(el("h3", "", b.title || "📝 笔记"));
        card.append(el("p", "kp-desc prewrap", b.body));
        page.append(card);
      } else if (b.t === "code") {
        const card = el("div", "card kp");
        const row = el("div", "code-row");
        row.append(el("h3", "", b.title || "💻 代码"));
        const cp = el("button", "btn tiny ghost", "复制");
        cp.onclick = () => copyText(b.code, cp);
        row.append(cp);
        card.append(row);
        const pre = el("pre", "code");
        pre.append(el("code", "", b.code));
        card.append(pre);
        page.append(card);
      } else if (b.t === "video") {
        const card = el("div", "card");
        card.append(el("h3", "", "🎬 视频"));
        if (b.blobId) {
          const btn = el("button", "btn accent big", "▶ 播放本地视频：" + b.name);
          btn.onclick = () => openMedia(b.blobId, b.name, "video");
          card.append(btn);
        } else {
          const v = parseVideo(b.url);
          if (!v) {
            card.append(el("p", "muted small", "视频链接无效，请编辑后重新填写。"));
          } else if (v.type === "file") {
            const video = el("video", "video-file");
            video.controls = true;
            video.src = v.src;
            video.style.width = "100%";
            card.append(video);
          } else {
            const wrap = el("div", "video-wrap");
            const ifr = el("iframe");
            ifr.src = v.src;
            ifr.allowFullscreen = true;
            ifr.setAttribute("allowfullscreen", "");
            wrap.append(ifr);
            const vrow = el("div", "btn-row");
            const openBtn = el("a", "btn tiny ghost", "↗ 新窗口打开视频");
            openBtn.href = b.url.startsWith("http") ? b.url : "https://www.bilibili.com/video/" + b.url;
            openBtn.target = "_blank"; openBtn.rel = "noopener";
            openBtn.style.textDecoration = "none";
            vrow.append(openBtn);
            card.append(wrap, vrow);
            card.append(el("p", "muted small", "若内嵌视频无法播放，点上面的按钮到平台观看。"));
          }
        }
        page.append(card);
      } else if (b.t === "link") {
        const a = el("a", "card res-card");
        a.href = b.url; a.target = "_blank"; a.rel = "noopener";
        a.append(el("h4", "", "🔗 " + (b.label || b.url)));
        a.append(el("p", "muted small", b.url));
        page.append(a);
      } else if (b.t === "quiz") {
        const card = el("div", "card quiz-card");
        card.append(el("h3", "q-title", b.q));
        const opts = el("div", "opts");
        const feedback = el("div", "feedback");
        const qi = quizBlocks.indexOf(b);
        let picked = false;
        b.opts.forEach((opt, oi) => {
          if (!opt) return;
          const btn = el("button", "opt");
          btn.append(el("span", "opt-key", String.fromCharCode(65 + oi)), el("span", "opt-text", opt));
          btn.onclick = () => {
            if (picked) return;
            picked = true;
            const right = oi === b.a;
            if (right) { btn.classList.add("right"); quizCorrect++; sfx("ok"); S.removeWrong("x_" + lesson.id, qi); }
            else {
              btn.classList.add("wrong"); opts.children[b.a].classList.add("right");
              sfx("no"); buzz(60);
              S.addWrong("x_" + lesson.id, qi);
              if (S.loseHeart() === 0) toast("💔 红心用完了，去「复习」做错题可回满");
            }
            feedback.append(el("p", right ? "fb ok" : "fb no", (right ? "✅ 答对了！ " : "❌ 答错了。 ") + (b.ex || "")));
            [...opts.children].forEach(c => c.disabled = true);
          };
          opts.append(btn);
        });
        card.append(opts, feedback);
        page.append(card);
      }
    });

    const done = el("button", "btn primary big", "✅ 完成本次学习 (+15 XP)");
    const rec = S.lessons["x_" + lesson.id];
    if (rec && rec.done) done.textContent = "✅ 已完成（可重复学习）";
    done.onclick = () => {
      const xp = S.completeCustom(lesson.id);
      toast(xp ? `完成！+${xp} XP ⚡` : "已记录，温故而知新 📖");
      location.hash = "#/custom/" + tid;
    };
    page.append(done);
    app.replaceChildren(page);
  }

  // ---------- 资源 ----------
  function renderResources() {
    const page = el("div", "page");
    page.append(el("h1", "", "GitHub 学习资源"));
    page.append(el("p", "sub muted", "本站知识点整理自以下优质开源仓库与官方文档，点击直达。"));
    const RES = [
      ["⭐ AwesomeUnityTutorial", "chutianshu1981/AwesomeUnityTutorial", "中文社区精选 Unity 官方教程与学习路线，入门首选", "https://github.com/chutianshu1981/AwesomeUnityTutorial"],
      ["🗺️ UnityPath-DiDiao", "jlgulu/UnityPath-DiDiao", "Unity3D 书籍推荐 + 完整学习路线 + 视频教程", "https://github.com/jlgulu/UnityPath-DiDiao"],
      ["🛤️ unity-learning-path", "MetaZhi/unity-learning-path", "知乎大智「不走弯路」Unity 主程方向学习路线", "https://github.com/MetaZhi/unity-learning-path"],
      ["📚 DotNetGuide", "YSGStudyHards/DotNetGuide", "C#/.NET 学习、工作、面试指南（中文）", "https://github.com/YSGStudyHards/DotNetGuide"],
      ["🧮 algorithm-pattern-CSharp", "tpxxn/algorithm-pattern-CSharp", "C# 版算法模板，LeetCode 刷题与复习指南", "https://github.com/tpxxn/algorithm-pattern-CSharp"],
      ["📖 Hello 算法", "krahets/hello-algo", "动画图解的数据结构与算法教程，支持 C#", "https://github.com/krahets/hello-algo"],
      ["📜 代码随想录", "youngyangyang04/leetcode-master", "循序渐进的刷题计划，图文题解", "https://github.com/youngyangyang04/leetcode-master"],
      ["📖 微软 C# 官方文档", "learn.microsoft.com/dotnet/csharp", "C# 语言权威参考与交互式教程", "https://learn.microsoft.com/zh-cn/dotnet/csharp/"],
      ["📖 Unity 官方中文手册", "docs.unity3d.com", "Unity 全量 API 与功能手册（中文）", "https://docs.unity3d.com/cn/current/Manual/index.html"],
      ["🎓 Unity Learn 官方教程", "learn.unity.com", "官方免费 pathway 课程与实战项目", "https://learn.unity.com/"]
    ];
    RES.forEach(([t, repo, d, url]) => {
      const a = el("a", "card res-card");
      a.href = url; a.target = "_blank"; a.rel = "noopener";
      a.append(el("h4", "", t), el("p", "mono small", repo), el("p", "muted small", d));
      page.append(a);
    });
    app.replaceChildren(page);
  }

  // ---------- 路由 ----------
  function route() {
    const hash = location.hash || "#/";
    const parts = hash.slice(2).split("/");
    window.scrollTo(0, 0);
    switch (parts[0]) {
      case "": renderHome(); break;
      case "learn": renderLearn(parts[1] || "cs"); break;
      case "lesson": if (parts[1]) startLesson(parts[1]); else renderLearn("cs"); break;
      case "schedule": renderSchedule(); break;
      case "review": renderReview(); break;
      case "resources": renderResources(); break;
      case "custom": renderCustom(parts[1], parts[2]); break;
      default: renderHome();
    }
    // 底栏高亮
    const map = { "": "home", learn: "learn", lesson: "learn", schedule: "schedule", review: "review", resources: "resources", custom: "custom" };
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.page === map[parts[0]]));
  }
  function render() { route(); }
  window.addEventListener("hashchange", route);

  // 底部导航
  const nav = document.getElementById("nav");
  const items = [["home", "🏠", "今日"], ["learn", "📚", "课程"], ["schedule", "🗓️", "课表"], ["review", "🔁", "复习"], ["custom", "🗂️", "我的"]];
  items.forEach(([k, e, t]) => {
    const b = el("button", "nav-btn", "");
    b.dataset.page = k;
    b.append(el("span", "nav-emoji", e), el("span", "nav-txt", t));
    b.onclick = () => location.hash = { home: "#/", learn: "#/learn/cs", schedule: "#/schedule", review: "#/review", custom: "#/custom" }[k];
    nav.append(b);
  });

  route();
})();
