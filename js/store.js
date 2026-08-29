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
    goal: 2,             // 每日目标：完成 N 节课
    freeUnlock: false
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
    S.streak.last = t;
    S.days[t] = true;
    save();
  };
  S.addXp = function (n) { S.xp += n; save(); };
  S.level = function () { return Math.floor(S.xp / 100) + 1; };
  S.levelProgress = function () { return (S.xp % 100) / 100; };

  // 今日已完成课程数
  S.doneToday = function () {
    let n = 0;
    for (const id in S.lessons) if (S.lessons[id].done && S.lessons[id].date === today()) n++;
    return n;
  };

  // ---------- 课程进度 ----------
  S.allLessons = function () {
    return [window.CSHARP_COURSE, window.UNITY_COURSE].flatMap(c => c.lessons.map(l => Object.assign({ track: c }, l)));
  };
  S.findLesson = function (id) { return S.allLessons().find(l => l.id === id); };

  S.isUnlocked = function (lesson) {
    if (S.freeUnlock) return true;
    const all = S.allLessons();
    const i = all.findIndex(l => l.id === lesson.id);
    return i === 0 || (S.lessons[all[i - 1].id] && S.lessons[all[i - 1].id].done);
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
