// 主应用：路由 + 视图渲染
(function () {
  const S = window.Store;
  const app = document.getElementById("app");
  const WEEK = ["", "周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  const CATS = { cs: "🎯 C#", u: "🎮 Unity", other: "📖 其他" };

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
    const hero = el("div", "hero");
    const greet = el("div", "greet");
    greet.append(el("h1", "", "今日训练营"));
    const wd = WEEK[S.weekday()];
    greet.append(el("p", "sub", `${wd} · 每天进步一点点，连击不断才是真本事`));
    hero.append(greet);
    page.append(hero);

    // 数据条
    const stats = el("div", "stats");
    const st = (e, v, t) => { const d = el("div", "stat"); d.append(el("div", "stat-v", e + " " + v), el("div", "stat-t", t)); return d; };
    stats.append(st("🔥", S.streak.count, "连续天数"), st("⚡", S.xp, "总经验"), st("🏅", "Lv." + S.level(), "等级"));
    page.append(stats);

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
      const btn = el("button", "btn primary", "开始学习：" + next.title);
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
      q("🎯", "C# 课程", "从变量到 LINQ", "#/learn/cs"),
      q("🎮", "Unity 课程", "从编辑器到实战", "#/learn/u"),
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

  async function openPdf(id) {
    try {
      const rec = await S.getPdf(id);
      if (!rec) return toast("找不到 PDF 文件");
      const url = URL.createObjectURL(rec.blob);
      const modal = el("div", "modal");
      const box = el("div", "modal-box pdf-box");
      const bar = el("div", "modal-bar");
      bar.append(el("span", "modal-title", "📄 " + rec.name));
      const close = el("button", "btn tiny", "关闭");
      close.onclick = () => { URL.revokeObjectURL(url); modal.remove(); };
      bar.append(close);
      const frame = el("iframe", "pdf-frame");
      frame.src = url;
      box.append(bar, frame);
      modal.append(box);
      modal.onclick = (e) => { if (e.target === modal) { URL.revokeObjectURL(url); modal.remove(); } };
      document.body.appendChild(modal);
    } catch (e) { toast("打开失败：" + e); }
  }

  // ---------- 课程列表 ----------
  function renderLearn(trackId) {
    const page = el("div", "page");
    page.append(el("h1", "", "课程闯关"));
    page.append(el("p", "sub muted", "按顺序闯关：完成上一课自动解锁下一课。学完知识点后答题，全部课程共 " + S.allLessons().length + " 节。"));

    const tabs = el("div", "tabs");
    [window.CSHARP_COURSE, window.UNITY_COURSE].forEach(c => {
      const t = el("button", "tab" + (c.id === trackId ? " active" : ""), `${c.emoji} ${c.short}`);
      t.onclick = () => { location.hash = "#/learn/" + c.id; };
      tabs.append(t);
    });
    page.append(tabs);

    const course = trackId === "cs" ? window.CSHARP_COURSE : window.UNITY_COURSE;
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
    LP = {
      review: !!reviewList,
      list: reviewList || [{ lesson, q: null }],  // review: [{lesson,q,qi}]
      qi: 0,
      stage: "cards",
      correct: 0,
      answered: false
    };
    if (LP.review) LP.stage = "quiz";
    renderLP();
  }

  function renderLP() {
    const page = el("div", "page");
    if (!LP) { location.hash = "#/learn/cs"; return; }

    const headLesson = LP.list[0].lesson;          // 复习模式取第一条的所属课
    const item = LP.review ? LP.list[LP.qi] : null;
    const lesson = LP.review ? item.lesson : headLesson;
    const totalSteps = LP.review ? LP.list.length : lesson.qs.length;

    // 顶部：返回 + 进度
    const top = el("div", "lp-top");
    const back = el("button", "icon-btn", "←");
    back.onclick = () => location.hash = LP.review ? "#/review" : "#/learn/" + headLesson.track.id;
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
        page.append(card);
      });

      const start = el("button", "btn primary big", "开始答题 🚀");
      start.onclick = () => { LP.stage = "quiz"; LP.qi = 0; LP.correct = 0; renderLP(); };
      page.append(start);
      app.replaceChildren(page);
      return;
    }

    if (LP.stage === "quiz") {
      const q = LP.review ? item.q : lesson.qs[LP.qi];
      const step = LP.qi + 1;
      page.append(progressBar(step, totalSteps));
      page.append(el("p", "lp-count muted small", LP.review ? `错题重练 ${step}/${totalSteps}` : `第 ${step} 题 / 共 ${totalSteps} 题`));
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
          if (right) { b.classList.add("right"); LP.correct++; if (LP.review) S.removeWrong(item.lesson.id, item.qi); }
          else {
            b.classList.add("wrong");
            if (!LP.review) S.addWrong(lesson.id, LP.qi);
            opts.children[q.a].classList.add("right");
          }
          feedback.append(el("p", right ? "fb ok" : "fb no", (right ? "✅ 答对了！ " : "❌ 答错了。 ") + q.ex));
          const nxt = el("button", "btn primary", LP.qi + 1 >= totalSteps ? "查看结果" : "下一题");
          nxt.onclick = () => {
            if (LP.qi + 1 >= totalSteps) finishQuiz();
            else { LP.qi++; renderLP(); }
          };
          feedback.append(nxt);
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
    card.append(el("div", "result-emoji", lessonRes.correct === totalSteps ? "🏆" : lessonRes.correct * 2 >= totalSteps ? "🎉" : "💪"));
    card.append(el("h1", "", lessonRes.correct === totalSteps ? "完美通关！" : "本次训练完成"));
    card.append(el("p", "muted", `答对 ${lessonRes.correct}/${totalSteps} 题 · 获得 ⚡${lessonRes.xp} XP${LP.review ? "（错题答对已移出错题本）" : ""}`));
    const btns = el("div", "result-btns");
    const again = el("button", "btn ghost", "再练一次");
    again.onclick = () => { startLesson(LP.result.id, LP.review ? collectReview() : null); };
    const home = el("button", "btn primary", LP.review ? "返回错题本" : "返回课程");
    home.onclick = () => location.hash = LP.review ? "#/review" : "#/learn/" + lessonRes.trackId;
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
    const total = LP.review ? LP.list.length : LP.list[0].lesson.qs.length;
    if (LP.review) {
      LP.result = { correct: LP.correct, xp: LP.correct * 5, trackId: "cs", id: null };
    } else {
      const lesson = LP.list[0].lesson;
      const first = !(S.lessons[lesson.id] && S.lessons[lesson.id].done);
      const xp = S.completeLesson(lesson.id, LP.correct, total, first);
      LP.result = { correct: LP.correct, xp, trackId: lesson.track.id, id: lesson.id };
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

  // ---------- 错题本 ----------
  function renderReview() {
    const page = el("div", "page");
    page.append(el("h1", "", "错题重练"));
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
      default: renderHome();
    }
    // 底栏高亮
    const map = { "": "home", learn: "learn", lesson: "learn", schedule: "schedule", review: "review", resources: "resources" };
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.page === map[parts[0]]));
  }
  function render() { route(); }
  window.addEventListener("hashchange", route);

  // 底部导航
  const nav = document.getElementById("nav");
  const items = [["home", "🏠", "今日"], ["learn", "📚", "课程"], ["schedule", "🗓️", "课表"], ["review", "🔁", "复习"], ["resources", "🌐", "资源"]];
  items.forEach(([k, e, t]) => {
    const b = el("button", "nav-btn", "");
    b.dataset.page = k;
    b.append(el("span", "nav-emoji", e), el("span", "nav-txt", t));
    b.onclick = () => location.hash = { home: "#/", learn: "#/learn/cs", schedule: "#/schedule", review: "#/review", resources: "#/resources" }[k];
    nav.append(b);
  });

  route();
})();
