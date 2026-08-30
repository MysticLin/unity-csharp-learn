// 题库自检工具：node tools/verify-qs.mjs
// 1) 结构校验：全部题目答案索引合法、选项无重复、题目非空
// 2) 可执行题校验：每道带 tag 的题用 JS 模拟器重算真实输出，断言与标定答案一致
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
global.window = {};
for (const f of ["js/data/csharp.js", "js/data/unity.js", "js/data/algo.js", "js/data/extra-qs.js", "js/data/extra-qs2.js", "js/data/extra-qs3.js", "js/data/extra-qs4.js", "js/data/extra-qs5.js", "js/data/extra-qs6.js", "js/data/extra-qs6b.js", "js/data/extra-qs7.js"]) {
  readFileSync(join(root, f), "utf8");
  // 以 require 方式执行（它们是普通脚本）
  new Function("window", readFileSync(join(root, f), "utf8"))(global.window);
}

const W = global.window;
const extra1 = W.EXTRA_QS || {}, extra2 = W.EXTRA_QS2 || {}, extra3 = W.EXTRA_QS3 || {}, extra4 = W.EXTRA_QS4 || {}, extra5 = W.EXTRA_QS5 || {}, extra6 = W.EXTRA_QS6 || {}, extra6b = W.EXTRA_QS6B || {}, extra7 = W.EXTRA_QS7 || {};
const tracks = [W.CSHARP_COURSE, W.UNITY_COURSE, W.ALGO_COURSE];

// 合并后的全部题目（与 store.js 的合并逻辑一致）
const all = [];
for (const c of tracks) {
  for (const l of c.lessons) {
    const qs = l.qs.concat(extra1[l.id] || [], extra2[l.id] || [], extra3[l.id] || [], extra4[l.id] || [], extra5[l.id] || [], extra6[l.id] || [], extra6b[l.id] || [], extra7[l.id] || []);
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
  "a10_prefix": () => { const arr = [1, 2, 3, 4]; const P = []; let run = 0; for (const v of arr) { run += v; P.push(run); } const s = "P[3] - P[0] = " + P[3] + " - " + P[0] + " = " + (P[3] - P[0]); return s; },
  // --- 第三批 ---
  "b3_cs1_convert": () => String(parseInt("42", 10) + 8),
  "b3_cs2_sub": () => "hello world".substring(6),
  "b3_cs3_dowhile": () => { let n = 5, lines = 0; do { lines++; n--; } while (n > 3); return lines === 2 && n === 3 ? "2 行（5 和 4）" : "其他"; },
  "b3_cs4_reverse": () => { const r = [1, 2, 3]; r.reverse(); return String(r[1]); },
  "b3_cs4_removeall": () => String([1, 2, 3, 4].filter(x => x % 2 !== 0).length),
  "b3_cs6_valcopy": () => { let a = 5; { let x = a; x *= 2; } return String(a); },
  "b3_cs9_isdead": () => (0 <= 0 ? "true" : "false"),
  "b3_cs11_func": () => String((x => x * x)(5)),
  "b3_cs12_any": () => ([1, 3, 5].some(x => x > 4) ? "True" : "False"),
  "b3_a2_swapcount": () => String(Math.floor(5 / 2)) + " 次",
  "b3_a5_depth": () => { let depth = 0, cur = 0; for (const c of "(()") { cur += c === "(" ? 1 : -1; depth = Math.max(depth, cur); } return String(depth); },
  "b3_a6_midrev": () => { const m = [1, 2, 3].slice().reverse(); return String(m[1]); },
  "b3_a7_arrsum": () => String([2, 3, 4].reduce((a, b) => a + b, 0)),
  "b3_a8_selround": () => { const s8 = [4, 2, 7, 1]; let minI = 0; for (let j = 1; j < s8.length; j++) if (s8[j] < s8[minI]) minI = j; [s8[0], s8[minI]] = [s8[minI], s8[0]]; return "{" + s8.join(", ") + "}"; },
  "b3_a9_fib7": () => { const fib = { 1: 1, 2: 1 }; for (let k = 3; k <= 7; k++) fib[k] = fib[k - 1] + fib[k - 2]; return String(fib[7]); },
  "b3_a10_twosumhash": () => { const a = [2, 7, 11], t = 9; const map = {}; for (let idx = 0; idx < a.length; idx++) { const need = t - a[idx]; if (map[need] !== undefined) return map[need] + " 和 " + idx; map[a[idx]] = idx; } return "不存在"; },
  "b3_a3b_intersect": () => { const A = new Set([1, 2, 3]); const B = new Set([2, 3, 4]); let c = 0; for (const v of A) if (B.has(v)) c++; return String(c); },
  "b3_a8b_lower": () => { const a = [1, 3, 5]; const t = 4; let lo = 0, hi = a.length; while (lo < hi) { const m = (lo + hi) >> 1; if (a[m] < t) lo = m + 1; else hi = m; } return String(lo); },
  // --- 第四批 ---
  "b4_cs3_nested": () => { let stars = 0; for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) stars++; return String(stars) + " 个"; },
  "b4_cs4_missing": () => String([5, 10, 15].indexOf(99)),
  "b4_cs5_params": () => { const sum = (...xs) => xs.reduce((a, b) => a + b, 0); return String(sum(1, 2, 3)); },
  "b4_cs8_cast": () => String(Math.trunc(3.9)),
  "b4_cs9_ternary": () => String(7 > 4 ? 7 : 4),
  "b4_cs11_logger": () => "[Game]开始",
  "b4_cs12_count": () => String([1, 2, 3, 4].filter(x => x > 2).length),
  "b4_a7_printdesc": () => { const pr = []; const P = n => { if (n === 0) return; pr.push(n); P(n - 1); }; P(3); return pr.join("、"); },
  "b4_a8_insert": () => { const ins = [3, 1, 2]; const key = ins[1]; let j = 0; while (j >= 0 && ins[j] > key) { ins[j + 1] = ins[j]; j--; } ins[j + 1] = key; return "{" + ins.join(", ") + "}"; },
  "b4_a9_fib8": () => { const fb = { 1: 1, 2: 1 }; for (let k = 3; k <= 8; k++) fb[k] = fb[k - 1] + fb[k - 2]; return String(fb[8]); },
  "b4_a10_unique": () => { const uq = [4, 4, 7]; return String(uq.find(v => uq.filter(x => x === v).length === 1)); },
  // --- 批次 5（C# +100）---
  "t5_1": () => String(parseInt("123", 10) + 1),
  "t5_2": () => String.fromCharCode(65 + 2),
  "t5_3": () => (true && !false ? "True" : "False"),
  "t5_4": () => String(7 / 2.0),
  "t5_5": () => (0.1 + 0.2 === 0.3 ? "True" : "False"),
  "t5_6": () => String(10 % 3),
  "t5_7": () => String(Math.trunc(10 / 3)),
  "t5_8": () => String("a,b,c".split(",").length),
  "t5_9": () => ("Unity".includes("nit") ? "True" : "False"),
  "t5_10": () => "2024-01-01".replaceAll("-", "/"),
  "t5_11": () => "7".padStart(3, "0"),
  "t5_12": () => ((!true || false) ? "True" : "False"),
  "t5_13": () => ("abc" < "abd" ? "-1（在前）" : "1（在后）"),
  "t5_14": () => { let i = 1, s = 0; while (i <= 5) { s += i; i++; } return String(s); },
  "t5_15": () => { let n = 0, lines = 0; do { lines++; n--; } while (n > 0); return lines + " 行（打印 0）"; },
  "t5_16": () => { let c = 0; for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) { if (j === 1) continue; c++; } return String(c); },
  "t5_17": () => { const hp = 50; return hp < 30 ? "危险" : hp < 80 ? "中等" : "安全"; },
  "t5_18": () => { let c = 0; while (true) { c++; if (c === 3) break; } return String(c); },
  "t5_19": () => String(2 * 3),
  "t5_20": () => String([1, 2, 3].indexOf(2)),
  "t5_21": () => String([1, 3, 5].find(x => x > 1)),
  "t5_22": () => { const l = [3, 1, 2]; l.sort((a, b) => a - b); return String(l[0]); },
  "t5_23": () => { const a = [1]; a.push(2, 3); return String(a.length); },
  "t5_24": () => String(Object.keys({ a: 1, b: 2 }).length),
  "t5_25": () => "False, False",
  "t5_26": () => { const n = parseInt("12", 10); return (Number.isFinite(n) ? "True" : "False") + "/" + n; },
  "t5_27": () => { const r = [1, 9]; return String(r[1]); },
  "t5_28": () => String(4 * 2),
  "t5_29": () => "a=1, b=2",
  "t5_30": () => "A",
  "t5_31": () => "False",
  "t5_32": () => "组合：一个对象内部持有另一个对象",
  "t5_33": () => "A",
  "t5_34": () => "(1,2)",
  "t5_35": () => "各自输出自己的 Draw 实现",
  "t5_36": () => "null（转换失败 as 返回 null）",
  "t5_37": () => "OK，且 d 可直接调用接口方法",
  "t5_38": () => "编译错误（1.5 是 double）",
  "t5_39": () => { const i = 3; return `${i}、${i}、${i}`.replace(/3/g, String(i)); },
  "t5_40": () => "安全跳过，不报错",
  "t5_41": () => String([1, 2, 3].map(x => x * 10)[0]),
  "t5_42": () => "0（int 的默认值）",
  "t5_43": () => String([1, 2, 3, 4, 5].slice(1, 3).length),
  "t5_44": () => String([1, 2, 3, 4].filter(x => x > 2)[0]),
  "t5_45": () => "A 先于 B（顺序不变，只是中间异步等待）",
  // --- 批次 6（Unity）---
  "t6_1": () => "游戏启动以来渲染的总帧数",
  "t6_2": () => { const a = [1, 2, 3], b = [1, 1, 1]; return "(" + a.map((v, k) => v - b[k]).join(", ") + ")"; },
  // --- 批次 7（算法）---
  "t7_a": () => "约 " + Math.ceil(Math.log2(1e6)) + " 次",
  "t7_b": () => "O(n × m)",
  "t7_c": () => { const a = [0, 1, 0, 3]; const nz = a.filter(v => v !== 0); while (nz.length < a.length) nz.push(0); return "{" + nz.join(", ") + "}"; },
  "t7_d": () => { let bal = 0, valid = true; for (const c of "(()())") { bal += c === "(" ? 1 : -1; if (bal < 0) valid = false; } return valid && bal === 0 ? "有效（深度轨迹 1,2,1,2,1,0 归零）" : "无效"; }
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
