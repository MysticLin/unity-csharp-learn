// 数据层：学习进度(localStorage) + PDF 附件(IndexedDB)
(function () {
  const KEY = "uc_state_v1";

  const DEFAULTS = {
    xp: 0,
    streak: { last: null, count: 0 },
    days: {},            // 'YYYY-MM-DD': true   打卡记录
    lessons: {},         // lessonId: { done, score, date }
    wrong: {},           // qkey: { lessonId, qi }
    schedule: [],        // { id, title, cat, wd, time, note, pdf:{id,name}|null }
    customTracks: [],    // 自建课程包 { id, name, emoji, lessons:[{id,title,blocks:[...]}] }
    goal: 2,             // 每日目标：完成 N 节课
    freeUnlock: false,
    hearts: 5, heartTs: 0,                 // 红心（每 20 分钟回复 1 颗，0 表示满）
    xpByDay: {},                           // 每日获得经验 { 'YYYY-MM-DD': n }
    streakBest: 0,                         // 最长连击
    quests: { date: "", q1: false, q2: false, q3: false },  // 每日任务
    sound: true                            // 音效开关
  };

  let state;
  function load() {
    try {
      state = Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(KEY) || "{}"));
    } catch (e) { state = JSON.parse(JSON.stringify(DEFAULTS)); }
    return state;
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

  const S = load();
  S.save = save;

  // ---------- 日期工具 ----------
  function dstr(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function today() { return dstr(new Date()); }
  function yesterday() { const d = new Date(); d.setDate(d.getDate() - 1); return dstr(d); }
  // 1=周一 ... 7=周日
  function weekday() { return ((new Date().getDay() + 6) % 7) + 1; }
  S.today = today; S.weekday = weekday;

  // ---------- 打卡与经验 ----------
  S.markToday = function () {
    const t = today();
    if (S.streak.last === t) return;
    S.streak.count = (S.streak.last === yesterday()) ? S.streak.count + 1 : 1;
    if (S.streak.count > S.streakBest) S.streakBest = S.streak.count;
    S.streak.last = t;
    S.days[t] = true;
    save();
  };
  S.addXp = function (n) {
    S.xp += n;
    S.xpByDay[today()] = (S.xpByDay[today()] || 0) + n;
    save();
  };
  S.spendXp = function (n) { if (S.xp < n) return false; S.xp -= n; save(); return true; };
  S.level = function () { return Math.floor(S.xp / 100) + 1; };
  S.levelProgress = function () { return (S.xp % 100) / 100; };

  // ---------- 红心 ----------
  S.MAX_HEARTS = 5;
  S.REGEN_MS = 20 * 60 * 1000;   // 每 20 分钟回 1 颗
  S.getHearts = function () {
    if (S.hearts >= S.MAX_HEARTS) return S.MAX_HEARTS;
    const gained = Math.floor((Date.now() - S.heartTs) / S.REGEN_MS);
    if (gained <= 0) return S.hearts;
    S.hearts = Math.min(S.MAX_HEARTS, S.hearts + gained);
    S.heartTs = S.hearts >= S.MAX_HEARTS ? 0 : S.heartTs + gained * S.REGEN_MS;
    save();
    return S.hearts;
  };
  S.loseHeart = function () {
    const h = S.getHearts();
    if (h <= 0) return 0;
    S.hearts = h - 1;
    S.heartTs = Date.now();
    save();
    return S.hearts;
  };
  S.refillHearts = function () { S.hearts = S.MAX_HEARTS; S.heartTs = 0; save(); };
  S.nextHeartMs = function () {
    if (S.getHearts() >= S.MAX_HEARTS) return 0;
    return S.REGEN_MS - ((Date.now() - S.heartTs) % S.REGEN_MS);
  };

  // ---------- 每日任务 ----------
  S.quest = function () {
    if (S.quests.date !== today()) {
      S.quests = { date: today(), q1: false, q2: false, q3: false };
      save();
    }
    return S.quests;
  };
  // 首次完成返回 true 并发放奖励 XP
  S.completeQuest = function (k, bonus) {
    const q = S.quest();
    if (q[k]) return false;
    q[k] = true; save();
    if (bonus) S.addXp(bonus);
    return true;
  };

  // 今日已完成课程数
  S.doneToday = function () {
    let n = 0;
    for (const id in S.lessons) if (S.lessons[id].done && S.lessons[id].date === today()) n++;
    return n;
  };

  // ---------- 课程进度 ----------
  S.allLessons = function () {
    const packs = window.EXTRA_PACKS || [window.EXTRA_QS, window.EXTRA_QS2, window.EXTRA_QS3, window.EXTRA_QS4, window.EXTRA_QS5, window.EXTRA_QS6, window.EXTRA_QS6B, window.EXTRA_QS7].filter(Boolean);
    return [window.CSHARP_COURSE, window.UNITY_COURSE, window.ALGO_COURSE].flatMap(c =>
      c.lessons.map(l => {
        const ex = [];
        for (const p of packs) if (p[l.id]) ex.push(...p[l.id]);
        return Object.assign({ track: c }, l, ex.length ? { qs: l.qs.concat(ex) } : null);
      })
    );
  };
  S.findLesson = function (id) {
    return S.allLessons().find(l => l.id === id) || S.customVirtual().find(l => l.id === id) || null;
  };

  S.isUnlocked = function (lesson) {
    if (S.freeUnlock) return true;
    // 按赛道独立解锁：每条线的第一课始终开放
    const list = S.allLessons().filter(l => l.track.id === lesson.track.id);
    const i = list.findIndex(l => l.id === lesson.id);
    return i === 0 || (S.lessons[list[i - 1].id] && S.lessons[list[i - 1].id].done);
  };
  S.nextLesson = function () {
    return S.allLessons().find(l => !(S.lessons[l.id] && S.lessons[l.id].done)) || null;
  };

  S.completeLesson = function (id, correct, total, firstTime) {
    const xpGain = correct * 10 + (firstTime ? 20 : 0);
    const prev = S.lessons[id];
    S.lessons[id] = {
      done: true,
      score: Math.max(prev ? prev.score : 0, Math.round((correct / total) * 100)),
      date: today()
    };
    S.addXp(xpGain);
    S.markToday();
    return xpGain;
  };

  // ---------- 错题本 ----------
  S.wrongKey = (lessonId, qi) => lessonId + ":" + qi;
  S.addWrong = function (lessonId, qi) { S.wrong[S.wrongKey(lessonId, qi)] = { lessonId, qi }; save(); };
  S.removeWrong = function (lessonId, qi) { delete S.wrong[S.wrongKey(lessonId, qi)]; save(); };
  S.wrongList = function () {
    return Object.values(S.wrong)
      .map(w => { const l = S.findLesson(w.lessonId); return l ? { lesson: l, q: l.qs[w.qi], qi: w.qi } : null; })
      .filter(Boolean);
  };

  // ---------- 课表 ----------
  S.uuid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  S.addCourse = function (item) { item.id = S.uuid(); S.schedule.push(item); save(); return item; };
  S.removeCourse = function (id) {
    const it = S.schedule.find(c => c.id === id);
    if (it && it.pdf) idbDelete(it.pdf.id).catch(() => {});
    S.schedule = S.schedule.filter(c => c.id !== id); save();
  };
  S.coursesAt = function (wd) {
    return S.schedule.filter(c => c.wd === wd).sort((a, b) => (a.time || "99:99").localeCompare(b.time || "99:99"));
  };
  S.coursesToday = function () { return S.coursesAt(S.weekday()); };

  // ---------- 自建课程 ----------
  S.addTrack = function (name, emoji) {
    const t = { id: S.uuid(), name, emoji: emoji || "📗", lessons: [] };
    S.customTracks.push(t); save(); return t;
  };
  S.removeTrack = function (id) { S.customTracks = S.customTracks.filter(t => t.id !== id); save(); };
  S.getTrack = function (id) { return S.customTracks.find(t => t.id === id) || null; };
  S.addCustomLesson = function (trackId, lesson) {
    const t = S.getTrack(trackId); if (!t) return null;
    lesson.id = "L" + S.uuid(); t.lessons.push(lesson); save(); return lesson;
  };
  S.removeCustomLesson = function (trackId, lessonId) {
    const t = S.getTrack(trackId); if (!t) return;
    t.lessons = t.lessons.filter(l => l.id !== lessonId); save();
  };
  // 把自建课程映射成与内置课程同构的"虚拟课程"，让答题/错题本/进度体系通用
  S.customVirtual = function () {
    return S.customTracks.flatMap(t => t.lessons.map(l => ({
      id: "x_" + l.id, trackId: t.id, lessonId: l.id, title: l.title, blocks: l.blocks, kps: null,
      track: { id: "x", title: t.name, emoji: t.emoji },
      qs: l.blocks.filter(b => b.t === "quiz").map(b => ({ q: b.q, opts: b.opts, a: b.a, ex: b.ex || "" }))
    })));
  };
  S.completeCustom = function (lessonId) {
    const key = "x_" + lessonId;
    const first = !(S.lessons[key] && S.lessons[key].done);
    S.lessons[key] = { done: true, score: 100, date: today() };
    if (first) S.xp += 15;
    S.markToday(); save();
    return first ? 15 : 0;
  };

  // ---------- 备份导出 / 导入 ----------
  S.exportData = function () {
    return JSON.stringify({
      app: "unity-csharp-learn", v: 1, exportedAt: new Date().toISOString(),
      xp: S.xp, streak: S.streak, days: S.days, lessons: S.lessons, wrong: S.wrong,
      schedule: S.schedule, goal: S.goal, freeUnlock: S.freeUnlock, customTracks: S.customTracks
    });
  };
  S.importData = function (json) {
    const d = JSON.parse(json);
    S.xp = d.xp || 0;
    S.streak = d.streak || { last: null, count: 0 };
    S.days = d.days || {};
    S.lessons = d.lessons || {};
    S.wrong = d.wrong || {};
    S.schedule = d.schedule || [];
    S.goal = d.goal || 2;
    S.freeUnlock = !!d.freeUnlock;
    S.customTracks = d.customTracks || [];
    save();
  };

  // ---------- IndexedDB: PDF 附件 ----------
  const DB_NAME = "uc_files", STORE = "pdfs";
  function openDB() {
    return new Promise((res, rej) => {
      const rq = indexedDB.open(DB_NAME, 1);
      rq.onupgradeneeded = () => rq.result.createObjectStore(STORE, { keyPath: "id" });
      rq.onsuccess = () => res(rq.result);
      rq.onerror = () => rej(rq.error);
    });
  }
  async function idbPut(rec) { const db = await openDB(); return new Promise((res, rej) => { const t = db.transaction(STORE, "readwrite"); t.objectStore(STORE).put(rec); t.oncomplete = res; t.onerror = () => rej(t.error); }); }
  async function idbGet(id) { const db = await openDB(); return new Promise((res, rej) => { const rq = db.transaction(STORE).objectStore(STORE).get(id); rq.onsuccess = () => res(rq.result); rq.onerror = () => rej(rq.error); }); }
  async function idbDelete(id) { const db = await openDB(); return new Promise((res, rej) => { const t = db.transaction(STORE, "readwrite"); t.objectStore(STORE).delete(id); t.oncomplete = res; t.onerror = () => rej(t.error); }); }
  S.savePdf = idbPut; S.getPdf = idbGet; S.deletePdf = idbDelete;

  window.Store = S;
})();
