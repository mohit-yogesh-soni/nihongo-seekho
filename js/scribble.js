// Scribble: canvas pe likho, peeche faded guide letter. Check = aapki lines guide se kitni match karti hain.

const SIZE = 300;
const FONT = `220px "Klee", "UD Digi Kyokasho N-R", "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif`;
const PEN = 14;

const guideCv = document.getElementById("sc-guide");
const drawCv = document.getElementById("sc-draw");
const g = guideCv.getContext("2d");
const d = drawCv.getContext("2d");

// Har set ke characters: { ch, title, info (HTML), say }
function kanaSet(list) {
  return list.map(k => ({
    ch: k.kana,
    title: k.romaji,
    say: k.kana,
    info: `<p><b>${esc(k.kana)}</b> for <b>${esc(k.word)}</b> <span class="romaji">(${esc(k.wordRomaji)})</span> = ${esc(k.en)} · ${esc(k.hi)}</p>`,
    wordSay: k.word
  }));
}

const SETS = {
  "h-basic": kanaSet(flatKana(HIRAGANA.basic)),
  "h-dakuten": kanaSet(flatKana(HIRAGANA.dakuten)),
  "k-basic": kanaSet(flatKana(KATAKANA.basic)),
  "k-dakuten": kanaSet(flatKana(KATAKANA.dakuten)),
  "kanji": KANJI_LIST.map(k => ({
    ch: k.kanji,
    title: k.en,
    say: k.exKana,
    info: `<p>📖 ${esc(k.readings)}</p><p>💡 ${esc(k.hi)}</p><p>Example: <b>${esc(k.exJp)}</b> = ${esc(k.exKana)} <span class="romaji">(${esc(k.exRomaji)})</span> = ${esc(k.exEn)}</p>`,
    wordSay: k.exKana
  }))
};

let setId = SETS[getParam("set")] ? getParam("set") : "h-basic";
let list = SETS[setId];
let idx = Math.max(0, list.findIndex(c => c.ch === getParam("char")));
let strokes = [];      // har stroke = points ki list
let current = null;
let showGuide = true;

// ---------- Drawing ----------
function drawGuide() {
  g.clearRect(0, 0, SIZE, SIZE);
  // Grid lines (beech ki dotted lines, jaise practice copy mein)
  g.strokeStyle = "#f0d9d9";
  g.lineWidth = 1;
  g.setLineDash([6, 6]);
  g.beginPath();
  g.moveTo(SIZE / 2, 0); g.lineTo(SIZE / 2, SIZE);
  g.moveTo(0, SIZE / 2); g.lineTo(SIZE, SIZE / 2);
  g.stroke();
  g.setLineDash([]);
  if (!showGuide) return;
  g.fillStyle = "rgba(215, 38, 61, 0.15)";
  g.font = FONT;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(list[idx].ch, SIZE / 2, SIZE / 2 + 8);
}

function redraw() {
  d.clearRect(0, 0, SIZE, SIZE);
  d.strokeStyle = "#222";
  d.lineWidth = PEN;
  d.lineCap = "round";
  d.lineJoin = "round";
  for (const s of strokes) {
    d.beginPath();
    s.forEach((p, i) => (i ? d.lineTo(p.x, p.y) : d.moveTo(p.x, p.y)));
    if (s.length === 1) d.lineTo(s[0].x + 0.1, s[0].y);
    d.stroke();
  }
}

function pointFromEvent(e) {
  const r = drawCv.getBoundingClientRect();
  return { x: ((e.clientX - r.left) / r.width) * SIZE, y: ((e.clientY - r.top) / r.height) * SIZE };
}

drawCv.addEventListener("pointerdown", e => {
  e.preventDefault();
  drawCv.setPointerCapture(e.pointerId);
  current = [pointFromEvent(e)];
  strokes.push(current);
  redraw();
});
drawCv.addEventListener("pointermove", e => {
  if (!current) return;
  e.preventDefault();
  current.push(pointFromEvent(e));
  redraw();
});
["pointerup", "pointercancel", "pointerleave"].forEach(ev =>
  drawCv.addEventListener(ev, () => { current = null; }));

// ---------- Check (score) ----------
// Offscreen canvas pe kuch draw karke "kaunse pixels bhare hain" ki list nikaalo
function mask(drawFn) {
  const c = document.createElement("canvas");
  c.width = c.height = SIZE;
  const x = c.getContext("2d");
  drawFn(x);
  const data = x.getImageData(0, 0, SIZE, SIZE).data;
  const m = new Uint8Array(SIZE * SIZE);
  for (let i = 0; i < m.length; i++) m[i] = data[i * 4 + 3] > 40 ? 1 : 0;
  return m;
}

function textMask(extraWidth) {
  return mask(x => {
    x.fillStyle = x.strokeStyle = "#000";
    x.font = FONT;
    x.textAlign = "center";
    x.textBaseline = "middle";
    x.fillText(list[idx].ch, SIZE / 2, SIZE / 2 + 8);
    if (extraWidth) {
      x.lineWidth = extraWidth;
      x.lineJoin = "round";
      x.strokeText(list[idx].ch, SIZE / 2, SIZE / 2 + 8);
    }
  });
}

function strokeMask(width) {
  return mask(x => {
    x.strokeStyle = "#000";
    x.lineWidth = width;
    x.lineCap = x.lineJoin = "round";
    for (const s of strokes) {
      x.beginPath();
      s.forEach((p, i) => (i ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y)));
      if (s.length === 1) x.lineTo(s[0].x + 0.1, s[0].y);
      x.stroke();
    }
  });
}

function checkDrawing() {
  const res = document.getElementById("sc-result");
  if (!strokes.length) {
    res.innerHTML = `<div class="feedback mid">✏️ Pehle box mein kuch likho 😄</div>`;
    return;
  }
  const guide = textMask(0);          // asli letter
  const guideWide = textMask(22);     // thoda mota letter (galti ki chhoot)
  const user = strokeMask(PEN);       // aapne jo likha
  const userWide = strokeMask(34);    // aapka likha, thoda mota

  let userCount = 0, userInside = 0, guideCount = 0, guideCovered = 0;
  for (let i = 0; i < guide.length; i++) {
    if (user[i]) { userCount++; if (guideWide[i]) userInside++; }
    if (guide[i]) { guideCount++; if (userWide[i]) guideCovered++; }
  }
  const precision = userCount ? userInside / userCount : 0;   // kitna likha guide ke andar hai
  const coverage = guideCount ? guideCovered / guideCount : 0; // guide ka kitna hissa cover hua
  const score = Math.round(100 * Math.min(precision, 1) * 0.5 + 100 * Math.min(coverage, 1) * 0.5);

  const msg = score >= 80 ? "🎉 Zabardast! Bilkul sahi likha!"
            : score >= 60 ? "👍 Achha hai! Thoda aur saaf likho."
            : coverage < 0.5 ? "🧩 Kuch hissa chhoot gaya. Poora letter likho."
            : "💪 Phir se try karo. Guide ke upar dheere dheere likho.";
  res.innerHTML = `
    <div class="feedback ${score >= 80 ? "ok" : score >= 60 ? "mid" : "bad"}">${msg}</div>
    <div class="score-bar"><div style="width:${score}%"></div></div>
    <p class="muted center">Score: ${score}% · Shape match: ${Math.round(precision * 100)}% · Poora likha: ${Math.round(coverage * 100)}%</p>
    ${!showGuide && score >= 70 ? `<p class="center">🏆 Bina guide ke itna achha! Ye letter aapko aa gaya!</p>` : ""}`;
  if (score >= 70) setProgress(`scribble-${setId}-${list[idx].ch}`, true);
}

// ---------- UI ----------
function renderStrip() {
  const p = getProgress();
  document.getElementById("sc-strip").innerHTML = list.map((c, i) =>
    `<button class="strip-cell ${i === idx ? "active" : ""} ${p[`scribble-${setId}-${c.ch}`] ? "done" : ""}" data-i="${i}" title="${esc(c.title)}">${esc(c.ch)}</button>`).join("");
}

function renderInfo() {
  const c = list[idx];
  document.getElementById("sc-info").innerHTML = `
    <div class="kana-detail-inner">
      <div class="big-kana">${esc(c.ch)}</div>
      <div>
        <div class="romaji-big">${esc(c.title)}</div>
        ${c.info}
        <div class="btn-row">${sayBtns(c.say)}${c.wordSay !== c.say ? `<button class="btn small" data-say="${esc(c.wordSay)}">🔊 Word suno</button>` : ""}</div>
      </div>
    </div>`;
}

function select(i) {
  idx = (i + list.length) % list.length;
  strokes = [];
  redraw();
  drawGuide();
  renderInfo();
  renderStrip();
  document.getElementById("sc-result").innerHTML = "";
  const active = document.querySelector(".strip-cell.active");
  if (active) active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
}

document.getElementById("sc-set").value = setId;
document.getElementById("sc-set").onchange = e => {
  setId = e.target.value;
  list = SETS[setId];
  select(0);
};
document.getElementById("sc-strip").onclick = e => {
  const b = e.target.closest("[data-i]");
  if (b) select(Number(b.dataset.i));
};
document.getElementById("sc-undo").onclick = () => { strokes.pop(); redraw(); };
document.getElementById("sc-clear").onclick = () => { strokes = []; redraw(); document.getElementById("sc-result").innerHTML = ""; };
document.getElementById("sc-guide-toggle").onclick = () => { showGuide = !showGuide; drawGuide(); };
document.getElementById("sc-check").onclick = checkDrawing;
document.getElementById("sc-prev").onclick = () => select(idx - 1);
document.getElementById("sc-next").onclick = () => select(idx + 1);
document.getElementById("sc-random").onclick = () => select(Math.floor(Math.random() * list.length));

// Fonts load hone ke baad guide dobara banao (warna galat font dikh sakta hai)
if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawGuide);
select(idx);
