// Translate page: dictionary search (EN→JP, JP→EN) + translation quiz

const trPanel = document.getElementById("tr-panel");
const DICT = getDictionary();

// Search ke liye pehle se normalized text bana ke rakho (fast search)
const DICT_INDEX = DICT.map(it => ({
  it,
  en: (it.en + " " + (it.hi || "")).toLowerCase(),
  jp: normJP(it.jp) + " " + normJP(it.kana),
  ro: normRomaji(it.romaji)
}));

const TYPE_LABEL = { word: "Word", phrase: "Phrase", sentence: "Sentence", line: "Conversation", jmdict: "JMdict" };

// ---------- Badi dictionary (JMdict, ~22,000 words) ----------
// <script> tag se load karte hain (fetch file:// pe nahi chalta). Sirf is page pe, background mein.
let JM_INDEX = null;
let jmLoading = null;

function loadJmdict() {
  if (jmLoading) return jmLoading;
  jmLoading = new Promise(resolve => {
    const s = document.createElement("script");
    s.src = "js/data/jmdict/jmdict-common.js";
    s.onload = () => {
      // Jo words hamari Hinglish dictionary mein already hain, unhe JMdict se mat dikhao (duplicate)
      const ours = new Set(DICT.map(it => normJP(it.kana)));
      JM_INDEX = (window.JMDICT || [])
        .filter(e => !ours.has(normJP(e[1])))
        .map(e => {
          const it = { type: "jmdict", jp: e[0], kana: e[1], romaji: e[2], en: e[3], hi: "", say: e[1] };
          return { it, en: e[3].toLowerCase(), jp: normJP(e[0]) + " " + normJP(e[1]), ro: normRomaji(e[2]),
                   first: e[3].toLowerCase().split(/[;,]/)[0].trim() };
        });
      resolve(true);
    };
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });
  return jmLoading;
}

// ---------- Search ----------
function searchEnglish(q, index = DICT_INDEX, limit = 40) {
  q = q.trim().toLowerCase();
  if (!q) return [];
  const wordRe = new RegExp(`(^|[^a-z])${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z]|$)`);
  return index
    .map(d => {
      const en = d.it.en.toLowerCase();
      let score = 0;
      if (en === q || en === "to " + q || d.first === q || d.first === "to " + q) score = 100;
      else if (wordRe.test(en)) score = d.first !== undefined && wordRe.test(d.first) ? 70 : 60;
      else if (wordRe.test(d.en)) score = 40;
      else if (d.en.includes(q)) score = 10;
      // Chhote items (words) ko sentences se upar dikhao
      if (score && (d.it.type === "word" || d.it.type === "phrase")) score += 5;
      // Chhota meaning = zyada seedha match
      if (score) score -= Math.min(en.length, 100) / 100;
      return { d, score };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.d.it);
}

function searchJapanese(q, index = DICT_INDEX, limit = 40) {
  q = q.trim();
  if (!q) return [];
  const jpQ = normJP(isLatin(q) ? romajiToHiragana(q) : q);
  const roQ = isLatin(q) ? normRomaji(q) : "";
  return index
    .map(d => {
      let score = 0;
      const parts = d.jp.split(" ");
      if (parts.includes(jpQ) || (roQ && d.ro === roQ)) score = 100;
      else if (parts.some(p => p.startsWith(jpQ)) || (roQ && d.ro.startsWith(roQ))) score = 50;
      else if (d.jp.includes(jpQ) || (roQ && roQ.length >= 3 && d.ro.includes(roQ))) score = 10;
      if (score && (d.it.type === "word" || d.it.type === "phrase")) score += 5;
      return { d, score };
    })
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(x => x.d.it);
}

function renderDict() {
  let dir = "en2jp";
  trPanel.innerHTML = `
    <div class="mode-bar small" id="dir-bar">
      <button class="chip active" data-dir="en2jp">🇬🇧 English/Hinglish → 🇯🇵 Japanese</button>
      <button class="chip" data-dir="jp2en">🇯🇵 Japanese/Romaji → 🇬🇧 English</button>
    </div>
    <input type="search" id="tr-input" class="big-input" autocomplete="off">
    <div id="tr-preview" class="muted"></div>
    <div id="tr-suggest" class="btn-row"></div>
    <p id="jm-status" class="muted small">📚 Badi dictionary load ho rahi hai...</p>
    <div id="tr-results"></div>`;
  const input = trPanel.querySelector("#tr-input");
  const results = trPanel.querySelector("#tr-results");
  const preview = trPanel.querySelector("#tr-preview");
  const suggest = trPanel.querySelector("#tr-suggest");

  const SUGGEST = {
    en2jp: ["water", "eat", "thank you", "friend", "khana", "kal", "cute", "help"],
    jp2en: ["neko", "arigatou", "ねこ", "sugoi", "taberu", "daijoubu", "水", "ganbatte"]
  };

  function setDir(d) {
    dir = d;
    trPanel.querySelectorAll("#dir-bar .chip").forEach(c => c.classList.toggle("active", c.dataset.dir === d));
    input.placeholder = d === "en2jp"
      ? "English ya Hinglish likho... (jaise: water, paani, hello)"
      : "Japanese ya romaji likho... (jaise: neko, ねこ, 猫)";
    suggest.innerHTML = "Try karo: " + SUGGEST[d].map(s => `<button class="chip" data-q="${esc(s)}">${esc(s)}</button>`).join("");
    run();
    input.focus();
  }

  const cards = list => `<div class="grid cards">${list.map(it =>
    itemCard(it, `<span class="type-tag">${TYPE_LABEL[it.type] || ""}</span>`)).join("")}</div>`;

  function run() {
    const q = input.value;
    preview.textContent = dir === "jp2en" && q.trim() && isLatin(q) ? `Hiragana mein: ${romajiToHiragana(q.trim())}` : "";
    if (!q.trim()) {
      results.innerHTML = `<p class="muted">👆 Upar kuch likho. Hinglish dictionary mein ${DICT.length} entries hain${JM_INDEX ? `, aur badi dictionary mein ${JM_INDEX.length.toLocaleString("en-IN")} aur words` : ""}.</p>`;
      return;
    }
    const search = dir === "en2jp" ? searchEnglish : searchJapanese;
    const list = search(q);
    // Badi dictionary: sirf tab jab Hinglish wale kam results hon (warna list bahut lambi ho jaati hai)
    const jmList = JM_INDEX ? search(q, JM_INDEX, list.length >= 10 ? 10 : 25) : [];
    const jisho = `<a class="btn small" href="https://jisho.org/search/${encodeURIComponent(q.trim())}" target="_blank" rel="noopener noreferrer">🔎 Jisho.org pe "${esc(q.trim())}" dhoondo ↗</a>`;
    let html = "";
    if (list.length) html += `<h3>💬 Hinglish dictionary (${list.length})</h3>${cards(list)}`;
    if (jmList.length) html += `
      <h3>📚 Badi dictionary se (${jmList.length})</h3>
      <p class="muted small">Inme Hinglish explanation nahi hai, sirf English meaning. Source: JMdict.</p>${cards(jmList)}`;
    if (!html) html = `<p>😕 Kahin nahi mila. Spelling check karo, ya online dictionary mein dekho:</p>`;
    results.innerHTML = html + `<p class="muted">Aur results chahiye? ${jisho}</p>`;
  }

  // Badi dictionary background mein load karo, phir search dobara chalao
  const status = trPanel.querySelector("#jm-status");
  loadJmdict().then(loaded => {
    if (!status.isConnected) return;
    status.innerHTML = loaded
      ? `✅ Badi dictionary ready: ${JM_INDEX.length.toLocaleString("en-IN")} extra words (JMdict)`
      : `⚠️ Badi dictionary load nahi hui. Sirf Hinglish dictionary chal rahi hai.`;
    run();
  });

  trPanel.querySelector("#dir-bar").onclick = e => {
    const b = e.target.closest("[data-dir]");
    if (b) setDir(b.dataset.dir);
  };
  suggest.onclick = e => {
    const b = e.target.closest("[data-q]");
    if (b) { input.value = b.dataset.q; run(); }
  };
  // Har akshar pe 22,000 words search na ho, isliye 150ms ruk ke search
  let timer = null;
  input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(run, 150); });
  setDir("en2jp");
}

// ---------- Translation quiz ----------
function renderQuiz() {
  trPanel.innerHTML = `
    <div class="form-row">
      <label>Direction:
        <select id="q-dir">
          <option value="en2jp">🇬🇧 English → 🇯🇵 Japanese</option>
          <option value="jp2en">🇯🇵 Japanese → 🇬🇧 English</option>
        </select>
      </label>
      <label>Level: <select id="q-level">${levelOptions("all")}</select></label>
    </div>
    <button class="btn primary" id="q-start">▶️ Quiz shuru karo</button>
    <div id="q-area"></div>`;
  trPanel.querySelector("#q-start").onclick = startTrQuiz;
}

function startTrQuiz() {
  const dir = trPanel.querySelector("#q-dir").value;
  const level = trPanel.querySelector("#q-level").value;
  let pool = (level === "all" ? getAllItems() : getLevelItems(level)).filter(it => it.type !== "kana");
  if (pool.length < 4) pool = DICT.filter(it => it.type === "word");
  const qs = shuffle(pool).slice(0, 10);
  let idx = 0, score = 0;
  const area = trPanel.querySelector("#q-area");

  function ask() {
    if (idx >= qs.length) return finish();
    const q = qs[idx];
    const wrong = shuffle(pool.filter(p => p.en !== q.en && p.kana !== q.kana && p.type === q.type)).slice(0, 3);
    const opts = shuffle([q, ...wrong]);
    const optLabel = o => dir === "en2jp"
      ? `<span class="jp-opt">${esc(o.kana)}</span> <small class="romaji">${esc(o.romaji)}</small>`
      : esc(o.en);
    area.innerHTML = `
      <div class="quiz-top"><span>Sawaal ${idx + 1} / ${qs.length}</span><span>⭐ ${score}</span></div>
      <div class="progress"><div style="width:${(idx / qs.length) * 100}%"></div></div>
      <div class="listen-box">
        ${dir === "en2jp"
          ? `<div class="prompt-en">${esc(q.en)}</div><div class="hi">💬 ${esc(q.hi)}</div><p class="muted">Japanese mein kya bolenge?</p>`
          : `<div class="jp big">${esc(q.kana)}</div><div class="romaji">${esc(q.romaji)}</div>
             <div class="btn-row center">${sayBtns(q.say)}</div><p class="muted">Iska matlab kya hai?</p>`}
      </div>
      <div class="options">${opts.map((o, i) => `<button class="btn option" data-i="${i}"><span class="num">${i + 1}</span> ${optLabel(o)}</button>`).join("")}</div>
      <div id="q-feedback"></div>`;
    if (dir === "jp2en") speakJP(q.say);
    area.querySelectorAll(".option").forEach(b => b.onclick = () => {
      const chosen = opts[Number(b.dataset.i)];
      const ok = chosen === q;
      if (ok) score++;
      area.querySelectorAll(".option").forEach(x => {
        x.disabled = true;
        if (opts[Number(x.dataset.i)] === q) x.classList.add("correct");
      });
      if (!ok) b.classList.add("wrong");
      speakJP(q.say);
      area.querySelector("#q-feedback").innerHTML = `
        <div class="feedback ${ok ? "ok" : "bad"}">${ok ? "✅ Sahi!" : "❌ Sahi jawaab ye tha:"}</div>
        ${itemCard(q)}
        <div class="btn-row center"><button class="btn primary" id="q-next">Agla →</button></div>`;
      area.querySelector("#q-next").onclick = () => { idx++; ask(); };
    });
  }

  function finish() {
    const pct = Math.round((score / qs.length) * 100);
    area.innerHTML = `<div class="center">
      <h2>${pct >= 80 ? "🏆 Zabardast!" : pct >= 50 ? "👍 Achha hai!" : "💪 Practice karte raho!"}</h2>
      <p class="score-big">${score} / ${qs.length}</p>
      <button class="btn primary" id="q-again">🔁 Phir se</button></div>`;
    area.querySelector("#q-again").onclick = startTrQuiz;
  }

  ask();
}

// ---------- Mode switch ----------
document.getElementById("tr-modes").addEventListener("click", e => {
  const b = e.target.closest("[data-mode]");
  if (!b) return;
  document.querySelectorAll("#tr-modes .chip").forEach(c => c.classList.toggle("active", c === b));
  b.dataset.mode === "dict" ? renderDict() : renderQuiz();
});

renderDict();
