// Tricks ko HTML mein dikhane ke helpers. Learn page (har level mein) aur tricks.html dono use karte hain.
// Data: js/data/tricks.js. Items: content.js ka TRICK_GROUPS.

// ---------- Common UI helpers (learn.js bhi use karta hai) ----------
// Tabs helper: [{id, title}] → click pe onSelect(id, body)
function tabs(container, list, onSelect) {
  container.innerHTML = `<div class="tabs">${list.map((t, i) =>
    `<button class="chip ${i === 0 ? "active" : ""}" data-tab="${esc(t.id)}">${esc(t.title)}</button>`).join("")}</div>
    <div class="tab-body"></div>`;
  const body = container.querySelector(".tab-body");
  const bar = container.querySelector(".tabs");
  bar.addEventListener("click", e => {
    const b = e.target.closest("[data-tab]");
    if (!b) return;
    bar.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === b));
    onSelect(b.dataset.tab, body);
  });
  onSelect(list[0].id, body);
}

function cardsGrid(items) {
  return `<div class="grid cards">${items.map(it => itemCard(it)).join("")}</div>`;
}

function tipBox(html) {
  return `<div class="tip-box">${html}</div>`;
}

const srcLinks = src => src && src.length
  ? `<p class="src">📚 Source: ${src.map(s => `<a href="${esc(s[1])}" target="_blank" rel="noopener noreferrer">${esc(s[0])}</a>`).join(" · ")}</p>`
  : "";

const exCards = rows => `<div class="grid cards">${rows.map(r => itemCard(wordItem(r, null))).join("")}</div>`;

// Khulne-band hone wala trick box. id = tricks.html se link karne ke liye anchor.
function trickBox(id, title, inner, open = false) {
  return `<details class="trick" id="${esc(id)}" ${open ? "open" : ""}><summary>🧠 ${title}</summary><div class="trick-body">${inner}</div></details>`;
}

// ---------- Mini quiz (patterns se andaaza lagao) ----------
// items: list, label(it) = sawaal ka HTML, answer(it) = sahi jawaab text
function miniQuiz(box, items, { label, answer, title = "🎯 Andaaza lagao" }) {
  let score = 0, total = 0;
  function ask() {
    const q = items[Math.floor(Math.random() * items.length)];
    const correct = answer(q);
    const wrong = shuffle([...new Set(items.map(answer).filter(a => a !== correct))]).slice(0, 3);
    const opts = shuffle([correct, ...wrong]);
    box.innerHTML = `
      <div class="mini-quiz">
        <div class="mq-head"><b>${title}</b> <span class="muted">Score: ${score} / ${total}</span></div>
        <div class="mq-q">${label(q)} ${sayBtns(q.say)}</div>
        <div class="options">${opts.map((o, i) => `<button class="btn option" data-i="${i}">${esc(o)}</button>`).join("")}</div>
        <div class="mq-fb"></div>
      </div>`;
    box.querySelectorAll(".option").forEach(b => b.onclick = () => {
      const ok = opts[Number(b.dataset.i)] === correct;
      total++; if (ok) score++;
      box.querySelectorAll(".option").forEach(x => {
        x.disabled = true;
        if (opts[Number(x.dataset.i)] === correct) x.classList.add("correct");
      });
      if (!ok) b.classList.add("wrong");
      speakJP(q.say);
      box.querySelector(".mq-fb").innerHTML = `
        <div class="feedback ${ok ? "ok" : "bad"}">${ok ? "✅ Sahi! Pattern kaam kar gaya 💡" : "❌ Sahi jawaab: " + esc(correct)}</div>
        ${itemCard(q)}
        <div class="btn-row center"><button class="btn primary mq-next">Agla →</button></div>`;
      box.querySelector(".mq-next").onclick = ask;
    });
  }
  box.innerHTML = `<div class="mini-quiz"><b>${title}</b><p class="muted">Pattern yaad hai? Naye words ka matlab andaaze se nikaalo!</p>
    <button class="btn primary mq-start">▶️ Quiz shuru karo</button></div>`;
  box.querySelector(".mq-start").onclick = ask;
}

// ======================= Sections =======================

function studyMethodsHtml(compact = false) {
  return `<div class="grid two">${STUDY_METHODS.map(m => `
    <div class="item-card method">
      <div class="method-title">${m.icon} <b>${esc(m.title)}</b></div>
      <div class="hi">${esc(m.text)}</div>
      ${m.where ? `<div class="actions"><a class="btn small" href="${esc(m.where)}">${esc(m.whereLabel)} →</a></div>` : ""}
      ${compact ? "" : srcLinks(m.src)}
    </div>`).join("")}</div>`;
}

function dailyRoutineHtml() {
  return `<div class="routine">${DAILY_ROUTINE.map((r, i) => `
    <a class="routine-step" href="${esc(r[3])}">
      <div class="rs-top"><span class="rs-num">${i + 1}</span><span class="rs-time">⏱️ ${esc(r[0])}</span></div>
      <div class="rs-title">${esc(r[1])}</div>
      <div class="rs-desc">${esc(r[2])}</div>
      <span class="rs-go">Shuru karo →</span>
    </a>`).join("")}</div>
    <p class="routine-note">⏳ Total ~15 minute. Busy din pe sirf 🔁 Revision (3 min) bhi chalega, bas streak mat todo.</p>`;
}

function roadmapHtml() {
  return `<ol class="roadmap">${ROADMAP.map(r => `<li><b>${esc(r[0])}:</b> <a href="${esc(r[2])}">${esc(r[1])}</a></li>`).join("")}</ol>
    <p class="muted small">Ye ek andaaza hai, race nahi. Apni speed se chalo.</p>`;
}

function pronunciationHtml() {
  return PRONUNCIATION_TRICKS.map((t, i) => trickBox("pron-" + i, esc(t.title),
    `<p>${esc(t.text)}</p>${exCards(t.examples)}${srcLinks(t.src)}`, i === 0)).join("");
}

// script: "h" (hiragana) ya "k" (katakana)
function lookalikesHtml(script) {
  const isKata = s => /[\u30a0-\u30ff]/.test(s);
  const list = LOOKALIKES.filter(l => (script === "k") === isKata(l.a));
  return trickBox(script + "-lookalikes", "Milte-julte letters (confuse mat hona)",
    `<div class="grid two">${list.map(l => `
      <div class="item-card lookalike">
        <div class="jp">${esc(l.a)} <span class="muted">vs</span> ${esc(l.b)}</div>
        <div class="hi">💡 ${esc(l.tip)}</div>
      </div>`).join("")}</div>`);
}

function samePairsHtml() {
  return trickBox("k-same", "Shortcut: ye katakana hiragana jaise hi dikhte hain",
    `<p>Ye letters dono scripts mein lagbhag same hain. Katakana bas thoda seedha/kona-daar hai. Inhe dobara seekhne ki zaroorat nahi!</p>
     <div class="pair-row">${SAME_SHAPE_PAIRS.map(p => `<button class="pair" data-say="${esc(p[0])}"><span>${esc(p[0])}</span> → <span>${esc(p[1])}</span></button>`).join("")}</div>`);
}

function kataRulesHtml() {
  return trickBox("k-rules", "English → Katakana ke rules (muft ki vocabulary!)",
    `<p>English word ko Japanese style mein kaise bolein: ye rules lagbhag har baar kaam karte hain.</p>
     ${KATAKANA_RULES.map(r => `<h4>${esc(r.title)}</h4><p class="muted">${esc(r.text)}</p>${exCards(r.examples)}`).join("")}
     ${srcLinks([["English to Katakana patterns", "https://jlptcards.com/articles/english-to-katakana"], ["Loanword rules", "https://jpyokoso.com/katakana-words-english-speakers/"]])}`, true);
}

function partBlocks(list) {
  return list.map(s => `
    <div class="part-block">
      <div class="part-head"><span class="part">${esc(s.part)}</span>${s.read ? ` <span class="romaji">(${esc(s.read)})</span>` : ""} = <b>${esc(s.meaning)}</b></div>
      <p class="muted">💬 ${esc(s.hi)}</p>
      ${exCards(s.examples)}
    </div>`).join("");
}

// Level 4: word ke shuru/end se matlab
function wordPartsSection(container) {
  container.innerHTML = trickBox("w-parts", "Word ke tukde: ek ending seekho, dus words samjho",
    `<p>Japanese words aksar Lego jaise jude hote hain. Ending ya shuruaat dekh ke naye word ka matlab andaaze se nikal sakte ho:
       <b>本</b> (kitaab) + <b>屋</b> (dukaan) = 本屋 (kitaab ki dukaan).</p>
     <div id="wp-tabs"></div>
     ${srcLinks([["Japanese word-building suffixes", "https://www.italki.com/en/blog/japanese-suffixes"], ["Wiktionary: Japanese suffixes", "https://en.wiktionary.org/wiki/Appendix:Japanese_suffixes"]])}`, true);
  tabs(container.querySelector("#wp-tabs"), [
    { id: "suffix", title: "🔚 Endings (〜人, 〜屋...)" },
    { id: "prefix", title: "🔜 Shuruaat (お〜, 毎〜...)" },
    { id: "patterns", title: "🧩 Word patterns" },
    { id: "counters", title: "🔢 Ginti ke shabd" },
    { id: "quiz", title: "🎯 Quiz" }
  ], (id, body) => {
    if (id === "suffix") body.innerHTML = partBlocks(SUFFIXES);
    else if (id === "prefix") body.innerHTML = partBlocks(PREFIXES);
    else if (id === "counters") body.innerHTML = tipBox("💡 Japanese mein cheez ginte waqt number ke saath uski <b>shape</b> ka shabd lagta hai (jaise Hindi mein 'do <b>log</b>', 'teen <b>gilaas</b>'). Pakka na pata ho to 〜つ use karo, sab jagah chalta hai.") + partBlocks(COUNTERS);
    else if (id === "patterns") body.innerHTML = WORD_PATTERNS.map(p => `<div class="part-block"><div class="part-head"><b>${esc(p.title)}</b></div><p class="muted">💬 ${esc(p.text)}</p>${exCards(p.examples)}</div>`).join("");
    else miniQuiz(body, [...TRICK_GROUPS.suffix, ...TRICK_GROUPS.prefix], {
      title: "🎯 Ending/shuruaat se matlab nikaalo",
      label: q => `<div class="jp big">${esc(q.jp)}</div><div class="muted center">${esc(q.kana)} · hint: <b>${esc(q.part)}</b></div>`,
      answer: q => q.en
    });
  });
}

// Level 6: grammar shortcuts
function grammarShortcutsSection(container) {
  container.innerHTML =
    trickBox("g-groups", "Verb ka group 3 second mein pehchano",
      `<p>${esc(VERB_GROUP_RULE.text)}</p><ul>${VERB_GROUP_RULE.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ul>${srcLinks(VERB_GROUP_RULE.src)}`) +
    trickBox("g-endings", "Verb ki ending = matlab (anime decoder!)",
      `<p>Verb ka shuru wala hissa matlab batata hai, aur <b>end</b> batata hai: kiya, nahi kiya, karna chahta, ya hukum. Ye endings pakad li to anime mein aadhi baat samajh aa jaayegi.</p>
       <div class="grid cards">${TRICK_GROUPS.endings.map(it => `
         <div class="item-card">
           <div class="part">${esc(it.part)}</div>
           <div class="en">${esc(it.partMeaning)}</div>
           <div class="jp">${esc(it.kana)}</div>
           <div class="kanji-form">${esc(it.jp)}</div>
           <div class="romaji">${esc(it.romaji)}</div>
           <div class="hi">💬 ${esc(it.en)} · ${esc(it.hi)}</div>
           <div class="actions">${sayBtns(it.say)}</div>
         </div>`).join("")}</div>
       <div id="g-end-quiz"></div>
       ${srcLinks([["Imperative & prohibitive な", "https://elon.io/grammar/japanese/verb-reference/imperative-prohibitive-table"], ["Casual contractions", "https://elon.io/grammar/japanese/pronunciation/contractions-casual"]])}`, true) +
    trickBox("g-final", "Sentence ke end ke chhote words (feelings)",
      `<p>Sentence ke end mein lage ye chhote words matlab nahi, <b>feeling</b> batate hain.</p>
       <div class="table-wrap"><table class="simple">
         <tr><th>Ending</th><th>Romaji</th><th>Feeling</th><th>Example</th></tr>
         ${SENTENCE_ENDINGS.map(r => `<tr><td class="jp-cell">${esc(r[0])}</td><td class="romaji">${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])} <button class="say" data-say="${esc(r[3].split(" = ")[0])}">🔊</button></td></tr>`).join("")}
       </table></div>`) +
    trickBox("g-contract", "Bolte waqt chhote ho jaate hain (casual)",
      `<p>Real baat-cheet aur anime mein lambe forms chhote ho jaate hain. Textbook wala form pata ho to ye pehchaan lo:</p>
       <div class="table-wrap"><table class="simple">
         <tr><th>Rule</th><th>Example</th><th>Matlab</th></tr>
         ${CONTRACTIONS.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])} <button class="say" data-say="${esc(r[1].split(" → ")[1])}">🔊</button></td><td>${esc(r[2])}</td></tr>`).join("")}
       </table></div>`) +
    trickBox("g-anime", "Anime wale 'main' aur 'tu'",
      `<p>Character kaunsa 'main/tu' bolta hai, isse uski personality pata chalti hai. Rude wale sirf samajhne ke liye, real life mein mat bolna! 😅</p>
       ${cardsGrid(TRICK_GROUPS.animeSpeech)}`);
  miniQuiz(container.querySelector("#g-end-quiz"), TRICK_GROUPS.endings, {
    title: "🎯 Ending dekh ke batao: kya ho raha hai?",
    label: q => `<div class="jp big">${esc(q.kana)}</div><div class="muted center">${esc(q.romaji)}</div>`,
    answer: q => q.partMeaning
  });
}

// Level 8: kanji tricks
function kanjiTricksHtml() {
  return trickBox("kj-radicals", "Radicals: kanji ke andar ke hint",
      `<p>Kanji ke andar chhote tukde (radicals) matlab ki category batate hain. Naya kanji dikhe to pehle radical dhoondo: 氵 dikha → paani se juda kuch hoga.</p>
       <div class="table-wrap"><table class="simple">
         <tr><th>Radical</th><th>Naam</th><th>Matlab</th><th>Yaad rakho</th><th>Examples</th></tr>
         ${RADICALS.map(r => `<tr><td class="jp-cell big-cell">${esc(r[0])}</td><td>${esc(r[1])}</td><td><b>${esc(r[2])}</b></td><td>${esc(r[3])}</td><td>${esc(r[4])}</td></tr>`).join("")}
       </table></div>
       ${srcLinks([["Kanji radicals: 20 to learn first", "https://my-senpai.com/insights/kanji-radicals/"], ["Radicals explained", "https://amix-design.com/tl/en/tool-name2kanji/column/kanji-radicals-explained.html"]])}`, true) +
    trickBox("kj-combos", "Kanji = tukde jod ke bani kahaani",
      `<div class="grid cards">${KANJI_COMBOS.map(k => `
        <div class="item-card"><div class="jp big">${esc(k[0])}</div><div class="en center">${esc(k[1])}</div><div class="hi">💬 ${esc(k[2])}</div></div>`).join("")}</div>`) +
    trickBox("kj-reading", "Kaunsi reading kab? (kun'yomi vs on'yomi)",
      `<p>${esc(KANJI_READING_RULE.text)}</p><ul>${KANJI_READING_RULE.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>`);
}

// Kana letter ki 🧠 picture-trick (dakuten letters ke liye base letter se)
function kanaMnemonic(ch) {
  if (KANA_MNEMONIC[ch]) return KANA_MNEMONIC[ch];
  const d = ch.normalize("NFD");
  if (d.length === 2 && (d[1] === "\u3099" || d[1] === "\u309A") && KANA_MNEMONIC[d[0]]) {
    const mark = d[1] === "\u3099" ? "゛ (do dots) = bhaari awaaz" : "゜ (chhota gola) = 'p' awaaz";
    return `${d[0]} + ${mark}. Base letter ki trick: ${KANA_MNEMONIC[d[0]]}`;
  }
  return "";
}
