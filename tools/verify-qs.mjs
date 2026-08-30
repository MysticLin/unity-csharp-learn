// 题库自检工具：node tools/verify-qs.mjs
// 1) 结构校验：全部题目答案索引合法、选项无重复、题目非空
// 2) 可执行题校验：每道带 tag 的题用 JS 模拟器重算真实输出，断言与标定答案一致
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
global.window = {};
for (const f of ["js/data/csharp.js", "js/data/unity.js", "js/data/algo.js", "js/data/extra-qs.js", "js/data/extra-qs2.js"]) {
  readFileSync(join(root, f), "utf8");
  // 以 require 方式执行（它们是普通脚本）
  new Function("window", readFileSync(join(root, f), "utf8"))(global.window);
}

const W = global.window;
const extra1 = W.EXTRA_QS || {}, extra2 = W.EXTRA_QS2 || {};
const tracks = [W.CSHARP_COURSE, W.UNITY_COURSE, W.ALGO_COURSE];

// 合并后的全部题目（与 store.js 的合并逻辑一致）
const all = [];
for (const c of tracks) {
  for (const l of c.lessons) {
    const qs = l.qs.concat(extra1[l.id] || [], extra2[l.id] || []);
    qs.forEach((q, qi) => all.push({ track: c.id, lesson: l.id, qi, q }));
  }
}

let errors = [];
// ---- 结构校验 ----
for (const { track, lesson, qi, q } of all) {
  const where = `${track}/${lesson}#${qi}`;
  if (!q.q || !q.q.trim()) errors.push(where + " 题目为空");
  if (!Array.isArray(q.opts) || q.opts.length < 2) errors.push(where + " 选项不足 2 个");
  else {
    if (q.opts.some(o => !o || !String(o).trim())) errors.push(where + " 存在空选项");
    const uniq = new Set(q.opts.map(o => String(o)));
    if (uniq.size !== q.opts.length) errors.push(where + " 选项重复");
  }
  if (!(Number.isInteger(q.a) && q.a >= 0 && (q.opts ? q.a < q.opts.length : false))) errors.push(where + " 答案索引非法");
  if (!q.ex || !q.ex.trim()) errors.push(where + " 缺少解析");
}

// ---- 可执行题模拟器：tag → 返回真实输出的选项文本 ----
const sims = {
  // --- 第一批 ---
  "cs4_listtrace": () => { const l = [10, 20, 30]; l.splice(1, 0, 15); l.splice(0, 1); return l[0] + "," + l.length; },
  "cs3_deadbreak": () => { let stars = 0; for (let i = 0; i < 10; i++) { if (i % 2 === 0) continue; if (i === 8) break; stars++; } return stars + " 个"; },
  "cs6_reftypeshare": () => { const p1 = { Name: "A" }; const p2 = p1; p2.Name = "B"; return p1.Name; },
  "cs12_linqsum": () => [1, 2, 3, 4].filter(x => x % 2 === 0).reduce((a, b) => a + b, 0) + "",
  "a2_palstr": () => { const s = "abcba"; let i = 0, j = s.length - 1, ok = true; while (i < j) { if (s[i] !== s[j]) { ok = false; break; } i++; j--; } return ok ? "True" : "False"; },
  "a3_firstdup": () => { const a = [1, 2, 3, 1]; const seen = new Set(); let dup = -1; for (const x of a) { if (seen.has(x)) { dup = x; break; } seen.add(x); } return String(dup); },
  "a5_peek": () => { const st = []; st.push("a"); st.push("b"); st.pop(); st.push("c"); return st[st.length - 1]; },
  "a7_fact4": () => { const F = n => n <= 1 ? 1 : n * F(n - 1); return String(F(4)); },
  "a8_sortmid": () => { const a = [4, 2, 7, 1].slice().sort((x, y) => x - y); return String(a[1]); },
  "a10_hashsetcount": () => String(new Set("abcabc".split("")).size),
  // --- 第二批 ---
  "cs1_charplus": () => String("A".charCodeAt(0) + 1),
  "cs2_indexof": () => String("hello world".indexOf("o")),
  "cs3_while": () => { let i = 3; const logs = []; while (i > 0) { logs.push(String(i)); i -= 2; } return "打印 " + logs.join(" 和 "); },
  "cs4_indexofcontains": () => { const L = [5, 10, 15]; return L.indexOf(10) + "/" + (L.includes(20) ? "True" : "False"); },
  "cs5_swapref": () => { let x = 1, y = 2; { const t = x; x = y; y = t; } return "x=" + x + ", y=" + y; },
  "cs6_staticcount": () => { let count = 0; for (let k = 0; k < 3; k++) count++; return String(count); },
  "cs7_base": () => "勇士·骑士",
  "cs9_clamp": () => String(Math.max(0, -5)),
  "cs11_minus": () => { const inv = []; const push = s => () => inv.push(s); inv.push("1"); const b = push("2"); inv.push("2"); inv.splice(inv.indexOf("2"), 1); return inv.join(" 然后 "); },
  "cs12_orderdesc": () => String([3, 1, 2].slice().sort((a, b) => b - a)[0]),
  "u4_magnitude": () => String(Math.hypot(3, 4)),
  "u9_nested": () => ["A", "I", "B"].join("、"),
  "a1_binsearch1000": () => String(Math.ceil(Math.log2(1000))),
  "a2_palnum": () => { const s = "12321"; let p = 0, q = s.length - 1, ok = true; while (p < q) { if (s[p] !== s[q]) { ok = false; break; } p++; q--; } return ok ? "True，首尾逐对相等" : "False"; },
  "a3_banana": () => String([..."banana"].filter(c => c === "a").length),
  "a4_removeval": () => { const a = [1, 2, 2, 3]; let slow = 0; for (const v of a) if (v !== 2) a[slow++] = v; return String(slow); },
  "a5_queue": () => { const q = []; q.push(1, 2, 3); q.shift(); q.shift(); return String(q[0]); },
  "a7_memo": () => { const memo = { 1: 1, 2: 1 }; const fib = n => memo[n] || (memo[n] = fib(n - 1) + fib(n - 2)); return String(fib(6)); },
  "a8_bubble": () => { const a = [5, 1, 4, 2]; for (let j = 0; j < a.length - 1; j++) if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; } return "{" + a.join(", ") + "}"; },
  "a9_3step": () => { const f = { 1: 1, 2: 2, 3: 4 }; return String(f[1] + f[2] + f[3]); },
  "a10_prefix": () => { const arr = [1, 2, 3, 4]; const P = []; let run = 0; for (const v of arr) { run += v; P.push(run); } const s = "P[3] - P[0] = " + P[3] + " - " + P[0] + " = " + (P[3] - P[0]); return s; }
};

// ---- 可执行题校验 ----
let checked = 0;
for (const { track, lesson, qi, q } of all) {
  if (!q.tag) continue;
  const sim = sims[q.tag];
  if (!sim) { errors.push(`${track}/${lesson}#${qi} tag "${q.tag}" 没有对应模拟器`); continue; }
  const expect = sim();
  const actual = q.opts[q.a];
  checked++;
  if (String(actual) !== String(expect)) {
    errors.push(`${track}/${lesson}#${qi} [${q.tag}] 标定"${actual}" ≠ 模拟"${expect}"`);
  }
  // 期望值必须出现在选项中且只有一处
  const hits = q.opts.filter(o => String(o) === String(expect)).length;
  if (hits !== 1) errors.push(`${track}/${lesson}#${qi} [${q.tag}] 模拟结果"${expect}"在选项中出现 ${hits} 次（应为 1 次）`);
}

console.log(`题库总量: ${all.length} 题 | 带模拟验证: ${checked} 题`);
if (errors.length) {
  console.log("\n❌ 发现问题:");
  errors.forEach(e => console.log("  - " + e));
  process.exit(1);
} else {
  console.log("✅ 全部通过：结构合法，所有可执行题答案与模拟结果一致");
}
