// 给第一批已人工/模拟验证的可执行题补 tag（一次性维护脚本）
const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "..", "js", "data", "extra-qs.js");
let s = fs.readFileSync(file, "utf8");
const tags = [
  ["cs3", "以下代码打印几个 * ？", "cs3_deadbreak"],
  ["cs6", "以下代码输出？", "cs6_reftypeshare"],
  ["cs12", "以下 LINQ 代码输出？", "cs12_linqsum"],
  ["a2", "以下代码输出？", "a2_palstr"],
  ["a3", "以下代码输出？", "a3_firstdup"],
  ["a5", "以下代码输出？", "a5_peek"],
  ["a7", "以下代码输出？", "a7_fact4"],
  ["a8", "对 {5,2,8,1} 排序后二分查找 8", "a8_sortmid"],
  ["a10", "以下代码输出？", "a10_hashsetcount"]
];
let n = 0;
for (const [key, marker, tag] of tags) {
  const segStart = s.indexOf(key + ": [");
  if (segStart === -1) { console.log("未找到课程段:", key); continue; }
  const segEnd = s.indexOf("],", segStart);
  const seg = s.slice(segStart, segEnd);
  const at = seg.indexOf('{ q: "' + marker);
  if (at === -1) { console.log("未找到题目:", key, marker); continue; }
  const abs = segStart + at + 1; // 跳过 "{"
  if (s.slice(abs, abs + 6) === " tag:") { console.log("已有 tag:", key); continue; }
  s = s.slice(0, abs) + ' tag: "' + tag + '",' + s.slice(abs + 1);
  n++;
}
fs.writeFileSync(file, s);
console.log("补 tag 完成:", n, "处");
