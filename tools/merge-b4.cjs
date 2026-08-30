// 把 extra-qs4.js 中挂在无效 key（a1b/a2b/…）下的题合并进父课程（一次性维护脚本）
const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "..", "js", "data", "extra-qs4.js");
let s = fs.readFileSync(file, "utf8");
const moves = [["a1b", "a1"], ["a2b", "a2"], ["a3b", "a3"], ["a4b", "a4"], ["a5b", "a5"], ["a10b", "a10"]];
let moved = 0;
for (const [from, to] of moves) {
  const fromStart = s.indexOf("  " + from + ": [");
  if (fromStart === -1) { console.log("未找到:", from); continue; }
  const fromEnd = s.indexOf("],", fromStart);
  // 提取数组内部内容（去掉 "  aXb: [" 与 "],")
  const inner = s.slice(s.indexOf("[", fromStart) + 1, fromEnd).trim();
  const parentStart = s.indexOf("  " + to + ": [");
  if (parentStart === -1) { console.log("未找到父课程:", to); continue; }
  const parentEnd = s.indexOf("],", parentStart);
  // 插入父课程数组末尾
  s = s.slice(0, parentEnd) + (s.slice(parentEnd - 1, parentEnd) === "," ? "" : ",") + "\n    " + inner + s.slice(parentEnd);
  // 删除原块（含前导换行）
  const delStart = s.indexOf("  " + from + ": [");
  const delEnd = s.indexOf("],", delStart) + 3;
  s = s.slice(0, delStart) + s.slice(delEnd);
  moved++;
}
fs.writeFileSync(file, s);
console.log("moved:", moved);
