// Learn page: har level ka lesson. URL: learn.html?level=0 ... 8

const root = document.getElementById("learn-root");

// ---------- Level picker (jab ?level nahi diya) ----------
function renderPicker() {
  const next = SYLLABUS.find(s => !isDone("level-" + s.level)) || SYLLABUS[0];
  root.innerHTML = `
    <div class="level-head">
      <h1>📖 Learn</h1>
      <p class="muted">Level 0 se shuru karo aur order mein aage badho. Har level ke end mein Listen aur Speak practice zaroor karo.</p>
      <div class="btn-row">
        <a class="btn primary" href="learn.html?level=${next.level}">▶️ Aage badho: Level ${next.level}</a>
        <a class="btn" href="tricks.html">🧠 Jaldi seekhne ki tricks</a>
      </div>
    </div>
    ${revisionPanel()}
    <div class="grid">
      ${SYLLABUS.map(s => `
        <a class="card ${isDone("level-" + s.level) ? "done" : ""}" href="learn.html?level=${s.level}">
          <div class="card-top">
            <span class="badge">Level ${s.level}</span>
            <span class="tag ${s.focus}">${s.focus === "speak" ? "🗣️ Bolna/Sunna" : "✍️ Likhna"}</span>
          </div>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.desc)}</p>
        </a>`).join("")}
    </div>`;
}

// ---------- 🔁 Spaced repetition revision ----------
function revisionPanel() {
  const s = srsStats();
  if (!s.seen) {
    return `<div class="tip-box">🔁 <b>Revision (spaced repetition):</b> kisi bhi level mein 🃏 Flashcards karo.
      Jo cards aapne dekhe, wo sahi din pe yahan dohraane ke liye wapas aayenge (yaad tha → der se, bhool gaye → kal).</div>`;
  }
  return `<div class="panel revision">
    <h2>🔁 Aaj ka revision</h2>
    <p>${s.due ? `<b>${s.due}</b> cards aaj dohraane hain.` : "🎉 Aaj ke liye koi card baaki nahi!"}
      <span class="muted">· Dekhe hue cards: ${s.seen} · Pakke yaad (box 3+): ${s.strong}</span></p>
    ${s.due ? `<a class="btn primary" href="learn.html?revise=1">▶️ Revision shuru karo</a>` : ""}
  </div>`;
}

function renderRevision() {
  const due = getDueItems();
  root.innerHTML = `
    <div class="level-head">
      <a href="learn.html" class="back">← Saare levels</a>
      <h1>🔁 Aaj ka revision</h1>
      <p class="muted">Spaced repetition: har card bhoolne se theek pehle wapas aata hai. Yaad tha → agli baar ${SRS_DAYS.slice(1, 4).join(", ")}... din baad. Bhool gaye → kal phir.</p>
    </div>
    <div id="rev-body"></div>`;
  const body = document.getElementById("rev-body");
  if (!due.length) {
    body.innerHTML = `<div class="feedback ok">🎉 Aaj ka revision khatam! Kal phir aana.</div>
      <div class="btn-row center"><a class="btn primary" href="learn.html">📖 Naya lesson karo</a></div>`;
    return;
  }
  flashcards(body, due.slice(0, 30));
}

// ---------- Level page ----------
function renderLevel(level) {
  const s = SYLLABUS.find(x => x.level === level);
  root.innerHTML = `
    <div class="level-head">
      <a href="learn.html" class="back">← Saare levels</a>
      <h1>Level ${level}: ${esc(s.title)}</h1>
      <p class="muted">${esc(s.desc)}</p>
    </div>
    <div id="level-body"></div>
    ${levelFooter(level)}`;
  RENDERERS[level](document.getElementById("level-body"));
  bindFooter(level);
  // tricks.html se #anchor wala link aaya ho to wo box kholo aur wahan scroll karo
  const target = location.hash && document.getElementById(location.hash.slice(1));
  if (target) {
    if (target.tagName === "DETAILS") target.open = true;
    target.scrollIntoView({ block: "start" });
  } else window.scrollTo(0, 0);
}

function levelFooter(level) {
  const next = SYLLABUS.find(x => x.level === level + 1);
  const scribbleSet = { 1: "h-basic", 3: "k-basic", 8: "kanji" }[level];
  return `
    <section class="level-footer">
      <h2>Practice karo 💪</h2>
      <p class="muted">Sirf padhne se yaad nahi hota. Suno, bolo, test karo!</p>
      <div class="btn-row">
        <a class="btn" href="listen.html?level=${level}">👂 Listen quiz</a>
        <a class="btn" href="speak.html?level=${level}">🎤 Bolne ki practice</a>
        ${level === 7 ? `<a class="btn" href="speak.html?mode=role">🎭 Role-play</a>` : ""}
        ${scribbleSet ? `<a class="btn" href="scribble.html?set=${scribbleSet}">✍️ Likhna seekho</a>` : ""}
        <button class="btn ${isDone("level-" + level) ? "" : "primary"}" id="mark-done">
          ${isDone("level-" + level) ? "✅ Complete ho gaya" : "✅ Level complete mark karo"}
        </button>
        ${next ? `<a class="btn" href="learn.html?level=${next.level}">Next: Level ${next.level} →</a>` : `<span class="muted">🎉 Ye last level hai!</span>`}
      </div>
    </section>`;
}

function bindFooter(level) {
  document.getElementById("mark-done").addEventListener("click", e => {
    markDone("level-" + level);
    e.target.textContent = "✅ Complete ho gaya";
    e.target.classList.remove("primary");
  });
}

// ---------- List / Flashcard mode switch ----------
function withModes(container, items, renderList) {
  container.innerHTML = `
    <div class="mode-bar">
      <button class="chip active" data-mode="list">📋 Sab dekho</button>
      <button class="chip" data-mode="flash">🃏 Flashcards (khud ko test karo)</button>
    </div>
    <div class="mode-body"></div>`;
  const body = container.querySelector(".mode-body");
  const modeBar = container.querySelector(".mode-bar");
  const show = mode => {
    modeBar.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.mode === mode));
    if (mode === "list") renderList(body);
    else flashcards(body, typeof items === "function" ? items() : items);
  };
  modeBar.addEventListener("click", e => {
    const btn = e.target.closest("[data-mode]");
    if (btn) show(btn.dataset.mode);
  });
  show("list");
}

// Flashcard: Japanese dikhao + suno → yaad hai ya nahi?
function flashcards(container, items) {
  let queue = shuffle(items), idx = 0, known = 0, forgot = [];

  function show() {
    if (idx >= queue.length) return summary();
    const it = queue[idx];
    container.innerHTML = `
      <div class="flash-wrap">
        <div class="flash-progress">Card ${idx + 1} / ${queue.length} · ✅ ${known} · ❌ ${forgot.length}</div>
        <div class="flashcard" id="fc">
          <div class="jp big">${esc(it.kana || it.jp)}</div>
          ${isHomophone(it) ? `<div class="kanji-form center">Is awaaz ke kai matlab hain. Hint: ${esc(it.jp)}</div>` : ""}
          <div class="muted">🤔 Iska matlab kya hai? Socho, phir tap karo</div>
          <div class="flash-back hidden">${itemCard(it)}</div>
        </div>
        <div class="btn-row center">
          ${sayBtns(it.say)}
          <button class="btn hidden" id="fc-no">❌ Bhool gaya</button>
          <button class="btn primary hidden" id="fc-yes">✅ Yaad tha</button>
        </div>
      </div>`;
    speakJP(it.say);
    const reveal = () => {
      container.querySelector(".flash-back").classList.remove("hidden");
      container.querySelector("#fc .muted").classList.add("hidden");
      container.querySelectorAll("#fc-no, #fc-yes").forEach(b => b.classList.remove("hidden"));
    };
    container.querySelector("#fc").addEventListener("click", e => {
      if (!e.target.closest("[data-say]")) reveal();
    });
    // Spaced repetition: jawaab yaad rakho, taaki sahi din pe card wapas aaye
    container.querySelector("#fc-yes").addEventListener("click", () => { srsUpdate(it, true); known++; idx++; show(); });
    container.querySelector("#fc-no").addEventListener("click", () => { srsUpdate(it, false); forgot.push(it); idx++; show(); });
  }

  function summary() {
    container.innerHTML = `
      <div class="flash-wrap center">
        <h2>${forgot.length === 0 ? "🎉 Sab yaad tha! Zabardast!" : "👍 Round khatam!"}</h2>
        <p>✅ Yaad tha: ${known} · ❌ Bhool gaye: ${forgot.length}</p>
        <div class="btn-row center">
          ${forgot.length ? `<button class="btn primary" id="fc-retry">🔁 Bhoole hue phir se</button>` : ""}
          <button class="btn" id="fc-all">🔀 Sab phir se</button>
        </div>
      </div>`;
    const retry = container.querySelector("#fc-retry");
    if (retry) retry.addEventListener("click", () => flashcards(container, forgot));
    container.querySelector("#fc-all").addEventListener("click", () => flashcards(container, items));
  }

  show();
}

// tabs(), cardsGrid(), tipBox(): js/tricks-ui.js mein hain

// ======================= Level renderers =======================

// ---------- Level 0: Intro ----------
function renderIntro(c) {
  const say = (t, label) => `<button class="btn small" data-say="${esc(t)}">🔊 ${esc(label || t)}</button>`;
  c.innerHTML = `
    <section class="lesson">
      <h2>1. Japanese mein 3 tarah ke letters hote hain</h2>
      <p>Ghabrao mat! Shuru mein sirf pehla wala chahiye.</p>
      <div class="grid three">
        <div class="item-card"><div class="jp">ひらがな</div><div class="romaji">hiragana</div><div class="hi">💬 Japanese ki apni ABC. Sabse pehle ye seekhenge. Gol-gol letters.</div></div>
        <div class="item-card"><div class="jp">カタカナ</div><div class="romaji">katakana</div><div class="hi">💬 Same awaazein, lekin foreign words ke liye (jaise コーヒー = coffee). Seedhe-tedhe letters.</div></div>
        <div class="item-card"><div class="jp">漢字</div><div class="romaji">kanji</div><div class="hi">💬 Chinese se aaye picture-letters. Har kanji ka ek matlab hota hai (山 = pahad). Ye sabse last mein.</div></div>
      </div>
      <p>Ek sentence mein teeno aate hain: <b>私はインドのカレーが好きです</b> = "Mujhe India ki curry pasand hai". ${say("わたしは インドの カレーが すき です", "Suno")}</p>
    </section>

    <section class="lesson">
      <h2>2. Sirf 5 vowels: a, i, u, e, o</h2>
      <p>Hindi bolne walon ke liye achhi khabar: Japanese ki zyada tar awaazein Hindi se milti-julti hain! Har button dabao aur zor se bolo.</p>
      <div class="vowel-row">
        ${[["あ","a","आ (lekin chhota)"],["い","i","इ"],["う","u","उ (hothon ko gol mat karo)"],["え","e","ए"],["お","o","ओ"]].map(v => `
          <button class="vowel" data-say="${v[0]}"><span class="k">${v[0]}</span><span class="romaji">${v[1]}</span><small>${v[2]}</small></button>`).join("")}
      </div>
    </section>

    <section class="lesson">
      <h2>3. Awaaz judti hai, lekin letter ki shape nahi judti!</h2>
      <p><b>Awaaz</b> ka pattern Hindi barakhadi jaisa hai: k + a = <b>ka</b>, k + i = <b>ki</b>, k + u = <b>ku</b>...</p>
      <p>Lekin <b>likhawat</b> mein bada farak hai. Hindi mein क ke saath maatra judti hai, isliye क har jagah dikhta rehta hai.
        Japanese mein <b>har awaaz ka apna alag, poora letter hota hai</b>. か (ka) mein na "k" chhupa hai na あ (a). Ye bas ek naya chitra hai.</p>
      <div class="table-wrap"><table class="compare">
        <tr><th></th><th>+a</th><th>+i</th><th>+u</th><th>+e</th><th>+o</th></tr>
        <tr><td class="lbl">🇮🇳 Hindi: क + maatra<br><small class="muted">(क dikhta rehta hai ✅)</small></td><td>का</td><td>कि</td><td>कु</td><td>के</td><td>को</td></tr>
        <tr><td class="lbl">🇯🇵 Japanese: k + vowel<br><small class="muted">(har letter alag shape ❗)</small></td><td>か</td><td>き</td><td>く</td><td>け</td><td>こ</td></tr>
        <tr><td class="lbl">Vowels akele</td><td>あ</td><td>い</td><td>う</td><td>え</td><td>お</td></tr>
      </table></div>
      ${tipBox("💡 <b>Matlab:</b> Japanese ki ABC mein 46 'letters' hain, aur har letter = ek poori awaaz (ka, ki, ku...). Inhe tukdon mein todke nahi, ek-ek picture ki tarah yaad karte hain. Isliye Level 1 mein har letter ke saath 🧠 picture-trick di hai (き = chaabi 🔑).")}
      <p><b>Sirf 3 jagah</b> shape sach mein judti hai (inhe Level 1 mein detail mein seekhoge):</p>
      <ul>
        <li><b>゛ (do dots)</b> = awaaz bhaari: か ka → が <b>ga</b> ${say("か、が", "か → が")}</li>
        <li><b>゜ (chhota gola)</b> = 'p' awaaz: は ha → ぱ <b>pa</b> ${say("は、ぱ", "は → ぱ")}</li>
        <li><b>Chhota ゃ ゅ ょ</b> = do letter milke ek awaaz: き ki + ゃ ya = きゃ <b>kya</b> ${say("き、や、きゃ", "き + ゃ → きゃ")}</li>
      </ul>
      <h3>🧪 Khud try karo: consonant + vowel chuno</h3>
      <div id="sound-builder"></div>
    </section>

    <section class="lesson">
      <h2>4. Lambi awaaz se matlab badal jaata hai!</h2>
      <p>Japanese mein vowel ko lamba kheenchne se word badal jaata hai. Dhyaan se suno:</p>
      <div class="grid two">
        ${itemCard(INTRO_ITEMS[5])}${itemCard(INTRO_ITEMS[6])}
      </div>
    </section>

    <section class="lesson">
      <h2>5. Chhota っ = chhota sa pause</h2>
      <p>Chhota っ (tsu) bola nahi jaata. Ye agle sound se pehle ek chhota sa break deta hai, jaise Hindi "pakka" mein.</p>
      <div class="grid two">
        ${itemCard(INTRO_ITEMS[7])}${itemCard(INTRO_ITEMS[8])}
      </div>
    </section>

    <section class="lesson">
      <h2>6. Kuch aur zaroori baatein</h2>
      <ul>
        <li><b>Flat bolo:</b> English jaisa zor (stress) nahi dete. Har syllable barabar time.</li>
        <li><b>Romaji</b> = Japanese ko English letters mein likhna (konnichiwa). Shuru mein help ke liye hai. Upar navbar mein ON/OFF kar sakte ho.</li>
        <li><b>Polite vs casual:</b> です/ます (desu/masu) wali language polite hai. Anime mein zyada casual style hota hai. Hum dono seekhenge.</li>
        <li><b>Hindi jaisa order:</b> Japanese mein verb end mein aata hai. "Main khana khaata hoon" = "Watashi wa gohan o tabemasu".</li>
      </ul>
    </section>

    <section class="lesson">
      <h2>7. 🗣️ Pronunciation ki tricks</h2>
      <p>Ye chhoti baatein aapke Japanese ko natural banayengi. Har box kholo aur examples suno.</p>
      ${pronunciationHtml()}
    </section>

    <section class="lesson">
      <h2>🎧 Mini test: kaan kitne tez hain?</h2>
      <p>Awaaz suno aur batao kaunsa word tha.</p>
      <div id="ear-test"></div>
    </section>

    <section class="lesson">
      <h2>🧠 Jaldi kaise seekhein? (sabse zaroori!)</h2>
      <p>Research se saabit tareeke. Inhe roz use karo, aur poori list (sources ke saath) <a href="tricks.html">🧠 Tricks page</a> pe hai.</p>
      ${trickBox("intro-routine", "Roz ka 15 minute plan", dailyRoutineHtml(), true)}
      ${trickBox("intro-methods", "Seekhne ke tareeke (techniques)", studyMethodsHtml(true))}
    </section>`;
  earTest(c.querySelector("#ear-test"));
  soundBuilder(c.querySelector("#sound-builder"));
}

// Consonant + vowel chuno → kaunsa letter banta hai (Hiragana chart ki rows/columns)
function soundBuilder(box) {
  const CONS = [["", "(kuch nahi)"], ["k"], ["s"], ["t"], ["n"], ["h"], ["m"], ["y"], ["r"], ["w"]];
  const VOWELS = ["a", "i", "u", "e", "o"];
  let row = 1, col = 0;
  box.innerHTML = `
    <div class="builder-row"><b>Consonant:</b> ${CONS.map((c, i) => `<button class="chip" data-row="${i}">${esc(c[1] || c[0])}</button>`).join("")}</div>
    <div class="builder-row"><b>Vowel:</b> ${VOWELS.map((v, i) => `<button class="chip" data-col="${i}">${v}</button>`).join("")}</div>
    <div class="builder-out" id="builder-out"></div>`;
  function show(speak) {
    box.querySelectorAll("[data-row]").forEach(b => b.classList.toggle("active", Number(b.dataset.row) === row));
    box.querySelectorAll("[data-col]").forEach(b => b.classList.toggle("active", Number(b.dataset.col) === col));
    const cell = HIRAGANA.basic[row][col];
    const out = box.querySelector("#builder-out");
    const sound = (CONS[row][0] || "") + VOWELS[col];
    if (!cell) {
      out.innerHTML = `<div class="builder-eq">${esc(CONS[row][0])} + ${VOWELS[col]} = ❌</div>
        <p class="muted">Ye awaaz aaj ke Japanese chart mein nahi hai. Isliye chart mein yahan khaali jagah hai.</p>`;
      return;
    }
    const k = toKana(cell);
    const irregular = k.romaji !== sound ? `<p class="muted">⚠️ Dhyaan do: "${esc(sound)}" nahi, <b>"${esc(k.romaji)}"</b> bolte hain. Ye ${["shi","chi","tsu","fu"].includes(k.romaji) ? "4 khaas awaazon (shi, chi, tsu, fu)" : "khaas letter"} mein se hai.</p>` : "";
    out.innerHTML = `
      <div class="builder-eq">${CONS[row][0] ? `<b>${esc(CONS[row][0])}</b> + ` : ""}<b>${VOWELS[col]}</b> = <b>${esc(k.romaji)}</b></div>
      <div class="big-kana">${esc(k.kana)}</div>
      <div>
        <p>Naya letter, apni alag shape. 🧠 ${esc(kanaMnemonic(k.kana))}</p>
        ${irregular}
        <p>Example: <b>${esc(k.word)}</b> (${esc(k.wordRomaji)}) = ${esc(k.hi)}</p>
        <div class="btn-row">${sayBtns(k.kana)}<button class="btn small" data-say="${esc(k.word)}">🔊 Word</button></div>
      </div>`;
    if (speak) speakJP(k.kana);
  }
  box.addEventListener("click", e => {
    const r = e.target.closest("[data-row]"), c = e.target.closest("[data-col]");
    if (r) row = Number(r.dataset.row);
    else if (c) col = Number(c.dataset.col);
    else return;
    show(true);
  });
  show(false);
}

function earTest(box) {
  const pairs = [
    [["おばさん", "obasan (aunty)"], ["おばあさん", "obaasan (daadi)"]],
    [["きて", "kite (aao)"], ["きって", "kitte (stamp)"]],
    [["ゆき", "yuki (barf)"], ["ゆうき", "yuuki (himmat)"]],
    [["おじさん", "ojisan (uncle)"], ["おじいさん", "ojiisan (daada)"]]
  ];
  let score = 0, total = 0, answer;
  function ask() {
    const pair = pairs[Math.floor(Math.random() * pairs.length)];
    answer = pair[Math.floor(Math.random() * 2)];
    box.innerHTML = `
      <div class="btn-row">
        <button class="btn" id="ear-play">🔊 Phir se suno</button>
        ${pair.map(p => `<button class="btn option" data-ans="${esc(p[0])}">${esc(p[0])} <small class="romaji">${esc(p[1])}</small></button>`).join("")}
      </div>
      <p class="muted">Score: ${score} / ${total}</p>`;
    speakJP(answer[0]);
    box.querySelector("#ear-play").onclick = () => speakJP(answer[0]);
    box.querySelectorAll("[data-ans]").forEach(b => b.onclick = () => {
      total++;
      const ok = b.dataset.ans === answer[0];
      if (ok) score++;
      b.classList.add(ok ? "correct" : "wrong");
      box.querySelector(".muted").textContent = (ok ? "✅ Sahi! " : `❌ Ye tha: ${answer[0]} (${answer[1]}). `) + `Score: ${score} / ${total}`;
      setTimeout(ask, 1500);
    });
  }
  box.innerHTML = `<button class="btn primary" id="ear-start">▶️ Test shuru karo</button>`;
  box.querySelector("#ear-start").onclick = ask;
}

// ---------- Level 1 & 3: Kana chart ----------
function kanaChart(container, script, prefix) {
  const lookup = {};
  [...script.basic.flat(), ...script.dakuten.flat(), ...(script.combo || [])]
    .filter(Boolean).forEach(a => { lookup[a[0]] = toKana(a); });

  const sections = [
    { id: "basic", title: "Basic (46)" },
    { id: "dakuten", title: "゛゜ Dakuten (bhaari awaaz)" }
  ];
  if (script.combo) sections.push({ id: "combo", title: "Combos (きゃ, しゅ...)" });

  container.innerHTML = `
    <div class="kana-detail empty" id="kana-detail"><p class="muted">👆 Neeche kisi bhi letter pe click karo: awaaz, 🧠 yaad rakhne ki picture-trick aur example word dikhega. ▶ dabao to poori line sunoge.</p></div>
    <div class="kana-tabs"></div>
    ${lookalikesHtml(prefix)}`;
  const detail = container.querySelector("#kana-detail");

  const cell = k => `<button class="kana-cell" data-kana="${esc(k.kana)}"><span class="k">${esc(k.kana)}</span><span class="r romaji">${esc(k.romaji)}</span></button>`;

  tabs(container.querySelector(".kana-tabs"), sections, (id, body) => {
    const setId = `${prefix}-${id}`;
    if (id === "combo") {
      body.innerHTML = tipBox("💡 Letter + chhota ゃ/ゅ/ょ = ek saath milke ek awaaz: き (ki) + ゃ (ya) = きゃ (<b>kya</b>). Do alag awaaz nahi, ek jhatke mein bolo!") +
        `<div class="kana-combo">${script.combo.map(toKana).map(cell).join("")}</div>`;
    } else {
      const tip = id === "dakuten"
        ? tipBox("💡 Do dots (゛) lagane se awaaz bhaari ho jaati hai: か ka → が <b>ga</b>, さ sa → ざ <b>za</b>, た ta → だ <b>da</b>, は ha → ば <b>ba</b>. Chhota gola (゜) sirf は row pe: は ha → ぱ <b>pa</b>.")
        : tipBox("💡 Ek din mein 1-2 line seekho. Pehle ▶ dabake line suno, phir har letter pe click karke uski 🧠 picture-trick padho aur zor se bolo. Chart Hindi barakhadi jaisa hai: a, i, u, e, o. Line yaad ho jaaye to 🃏 Flashcards ya Listen quiz se test karo.");
      body.innerHTML = tip + `<div class="table-wrap"><table class="kana-chart">${script[id].map(row => `
        <tr>
          <td><button class="row-play say" data-say="${esc(row.filter(Boolean).map(a => a[0]).join("、"))}" title="Poori line suno">▶</button></td>
          ${row.map(a => a ? `<td>${cell(toKana(a))}</td>` : `<td class="empty"></td>`).join("")}
        </tr>`).join("")}</table></div>`;
    }
    body.onclick = e => {
      const b = e.target.closest("[data-kana]");
      if (!b) return;
      const k = lookup[b.dataset.kana];
      speakJP(k.kana);
      showKanaDetail(detail, k, id === "combo" ? null : setId);
    };
  });
}

function showKanaDetail(detail, k, scribbleSet) {
  const tip = kanaTip(k);
  const memo = kanaMnemonic(k.kana);
  detail.innerHTML = `
    <div class="kana-detail-inner">
      <div class="big-kana">${esc(k.kana)}</div>
      <div>
        <div class="romaji-big">${esc(k.romaji)}</div>
        ${memo ? `<p class="memo">🧠 ${esc(memo)}</p>` : ""}
        ${tip ? `<p>💡 ${esc(tip)}</p>` : ""}
        <p><b>${esc(k.kana)}</b> for <b>${esc(k.word)}</b> <span class="romaji">(${esc(k.wordRomaji)})</span> = ${esc(k.en)} · ${esc(k.hi)}</p>
        <div class="btn-row">
          ${sayBtns(k.kana)}
          <button class="btn small" data-say="${esc(k.word)}">🔊 Word suno</button>
          ${scribbleSet ? `<a class="btn small" href="scribble.html?set=${scribbleSet}&char=${encodeURIComponent(k.kana)}">✍️ Likh ke dekho</a>` : ""}
        </div>
      </div>
    </div>`;
  openDetail(detail);
}

// Detail panel: desktop pe upar sticky, mobile pe neeche se khulne wala sheet (✕ se band).
// Page scroll nahi hota, isliye chart mein apni jagah nahi khote.
function openDetail(detail) {
  if (detail.classList.contains("empty")) detail.dataset.placeholder = detail.innerHTML;
  detail.classList.remove("empty");
  detail.insertAdjacentHTML("afterbegin", `<button class="sheet-close" aria-label="Band karo">✕</button>`);
  detail.querySelector(".sheet-close").onclick = () => {
    detail.innerHTML = detail.dataset.placeholder || "";
    detail.classList.add("empty");
  };
}

function renderHiragana(c) {
  kanaChart(c, HIRAGANA, "h");
}

// ---------- Level 2: A for Apple ----------
function abcCard(it) {
  return `<div class="item-card">
    <div class="abc-line"><span class="abc-letter">${esc(it.letter)}</span> for</div>
    <div class="jp">${esc(it.kana)}</div>
    <div class="romaji">${esc(it.romaji)}</div>
    <div class="en">${esc(it.en)}</div>
    <div class="hi">💬 ${esc(it.hi)}</div>
    <div class="actions">${sayBtns(it.say)}</div>
  </div>`;
}

function renderABC(c) {
  const groups = [
    ["Basic letters", flatKana(HIRAGANA.basic)],
    ["Dakuten letters (゛゜)", flatKana(HIRAGANA.dakuten)],
    ["Combo letters", HIRAGANA.combo.map(toKana)]
  ];
  const items = groups.flatMap(g => g[1]).map(k => kanaWordItem(k, 2));
  c.innerHTML = tipBox("💡 Jaise bachpan mein 'A for Apple' seekha tha, waise hi: <b>あ for あめ (ame = baarish)</b>. Har card pe 🔊 dabao aur word ko 2-3 baar zor se bolo.") + `<div id="abc-modes"></div>`;
  withModes(c.querySelector("#abc-modes"), items, body => {
    body.innerHTML = groups.map(g => `<h3>${g[0]}</h3><div class="grid cards">${g[1].map(k => abcCard(kanaWordItem(k, 2))).join("")}</div>`).join("");
  });
}

// ---------- Level 3: Katakana ----------
function renderKatakana(c) {
  const words = KATA_ALL.filter(k => k.word !== k.kana).map(k => kanaWordItem(k, 3));
  c.innerHTML = tipBox(`💡 <b>Katakana kab use hota hai?</b> Foreign words ke liye: コーヒー (coffee), テレビ (TV), インド (India). Awaazein hiragana jaisi hi hain, bas letters alag dikhte hain.<br>
      <b>ー (lambi line)</b> = vowel ko lamba karo: ケーキ = <b>kee</b>ki (cake). <b>Chhota ッ</b> = pause: サッカー = sa<b>k</b>-kaa (soccer).<br>
      Tip: English word socho, phir Japanese style mein bolo: "ice cream" → アイス (aisu)!`) +
    samePairsHtml() +
    `<h2>🔤 Katakana chart</h2><div id="kata-chart"></div>
     <h2>📐 English → Katakana rules</h2>${kataRulesHtml()}
     <h2>🍔 Katakana words (English se aaye)</h2><div id="kata-words"></div>`;
  kanaChart(c.querySelector("#kata-chart"), KATAKANA, "k");
  withModes(c.querySelector("#kata-words"), words, body => {
    body.innerHTML = `<div class="grid cards">${words.map(abcCard).join("")}</div>`;
  });
}

// ---------- Level 4: First words ----------
function renderWords(c) {
  c.innerHTML = tipBox("💡 Category chuno. Pehle 📋 list mein suno aur bolo, phir 🃏 Flashcards se khud ko test karo (wo cards 🔁 Revision mein sahi din pe wapas aayenge). Bade letters kana (padhne wale) hain, neeche kanji (asli likhawat) bhi diya hai. Roz 10-15 naye words kaafi hain.") +
    `<div id="word-parts"></div><h2>📚 Words by category</h2><div id="word-tabs"></div>`;
  wordPartsSection(c.querySelector("#word-parts"));
  tabs(c.querySelector("#word-tabs"), WORD_CATEGORIES.map(w => ({ id: w.id, title: w.title })), (id, body) => {
    const items = WORD_ITEMS.filter(w => w.category === id);
    withModes(body, items, b => { b.innerHTML = cardsGrid(items); });
  });
}

// ---------- Level 5: Phrases ----------
function renderPhrases(c) {
  c.innerHTML = tipBox("💡 Ye phrases poore ke poore yaad karo, jaise 'How are you?' yaad kiya tha. Grammar baad mein samajh aayegi. Anime dekhte waqt inhe pakadne ki koshish karo! 🎌") + `<div id="phrase-tabs"></div>`;
  tabs(c.querySelector("#phrase-tabs"), PHRASE_GROUPS.map(g => ({ id: g.id, title: g.title })), (id, body) => {
    const items = PHRASE_ITEMS.filter(p => p.category === id);
    withModes(body, items, b => { b.innerHTML = cardsGrid(items); });
  });
}

// ---------- Level 6: Grammar ----------
function renderGrammar(c) {
  c.innerHTML = tipBox("💡 Ek din mein 1-2 lessons. Har example ko suno, phir apne words daal ke khud ka sentence banao! Jaise: わたしは <b>[apna naam]</b> です.") +
    `<h2>⚡ Grammar shortcuts</h2><div id="g-shortcuts"></div><h2>📘 Lessons</h2>` +
    GRAMMAR.map((g, i) => `
      <details class="grammar" ${i === 0 ? "open" : ""}>
        <summary><span class="badge">${i + 1}</span> ${esc(g.title)} <code>${esc(g.pattern)}</code></summary>
        <p class="explain">💬 ${esc(g.explain)}</p>
        <div class="grid cards">${GRAMMAR_ITEMS.filter(e => e.lesson === i).map(e => itemCard(e)).join("")}</div>
      </details>`).join("");
  grammarShortcutsSection(c.querySelector("#g-shortcuts"));
}

// ---------- Level 7: Conversations ----------
let convoPlayToken = 0;

function renderConversations(c) {
  c.innerHTML = tipBox("💡 Pehle ▶️ se poori conversation suno. Phir har line pe click karke repeat karo. Last mein 🎭 Role-play mein ek character ban ke bolo!") +
    CONVERSATIONS.map((cv, ci) => `
      <section class="convo" data-convo="${ci}">
        <h3>${esc(cv.title)}</h3>
        <p class="muted">${esc(cv.situation)}</p>
        <div class="btn-row">
          <button class="btn small primary" data-play="${ci}">▶️ Poori conversation suno</button>
          <button class="btn small" data-stop="${ci}">⏹ Stop</button>
          <a class="btn small" href="speak.html?mode=role&convo=${ci}">🎭 Role-play karo</a>
        </div>
        <div class="chat">
          ${CONVO_ITEMS.filter(l => l.convo === ci).map((l, li) => `
            <div class="bubble ${cv.speakers.indexOf(l.who) === 0 ? "left" : "right"}" data-say="${esc(l.say)}" data-line="${li}">
              <div class="who">${esc(l.who)}</div>
              <div class="jp">${esc(l.kana)}</div>
              <div class="kanji-form">${esc(l.jp)}</div>
              <div class="romaji">${esc(l.romaji)}</div>
              <div class="en">${esc(l.en)}</div>
              <div class="hi">💬 ${esc(l.hi)}</div>
            </div>`).join("")}
        </div>
      </section>`).join("");

  c.addEventListener("click", async e => {
    const play = e.target.closest("[data-play]");
    const stop = e.target.closest("[data-stop]");
    if (stop) { convoPlayToken++; stopSpeaking(); clearSpeaking(c); }
    if (!play) return;
    const ci = Number(play.dataset.play);
    const token = ++convoPlayToken;
    const cv = CONVERSATIONS[ci];
    const bubbles = c.querySelectorAll(`[data-convo="${ci}"] .bubble`);
    const lines = CONVO_ITEMS.filter(l => l.convo === ci);
    for (let i = 0; i < lines.length; i++) {
      if (token !== convoPlayToken) return;
      clearSpeaking(c);
      bubbles[i].classList.add("speaking");
      bubbles[i].scrollIntoView({ behavior: "smooth", block: "nearest" });
      // Doosre insaan ke liye alag voice (ya alag tone), taaki do log alag sunai dein
      await speakAsync(lines[i].say, { alt: cv.speakers.indexOf(lines[i].who) !== 0 });
      await new Promise(r => setTimeout(r, 400));
    }
    clearSpeaking(c);
  });
}

function clearSpeaking(c) {
  c.querySelectorAll(".bubble.speaking").forEach(b => b.classList.remove("speaking"));
}

// ---------- Level 8: Kanji ----------
function renderKanji(c) {
  c.innerHTML = tipBox("💡 Kanji ek picture hai jiska matlab hota hai. Har kanji ke saath ek chhoti si kahaani (trick) di hai, use yaad karo. Kanji ki kai readings hoti hain, abhi bas example word yaad karo.") +
    `<h2>🧩 Kanji tricks</h2>${kanjiTricksHtml()}<h2>📚 100 Kanji</h2><div id="kanji-modes"></div>`;
  withModes(c.querySelector("#kanji-modes"), KANJI_ITEMS, body => {
    body.innerHTML = `
      <div class="kana-detail empty" id="kanji-detail"><p class="muted">👆 Kisi bhi kanji pe click karo.</p></div>
      <div class="kanji-grid">${KANJI_LIST.map((k, i) => `<button class="kana-cell kanji" data-k="${i}"><span class="k">${esc(k.kanji)}</span><span class="r">${esc(k.en)}</span></button>`).join("")}</div>`;
    const detail = body.querySelector("#kanji-detail");
    body.querySelector(".kanji-grid").onclick = e => {
      const b = e.target.closest("[data-k]");
      if (!b) return;
      const k = KANJI_LIST[Number(b.dataset.k)];
      speakJP(k.exKana);
      detail.innerHTML = `
        <div class="kana-detail-inner">
          <div class="big-kana">${esc(k.kanji)}</div>
          <div>
            <div class="romaji-big">${esc(k.en)}</div>
            <p>📖 Readings: <b>${esc(k.readings)}</b></p>
            <p>💡 ${esc(k.hi)}</p>
            <p>Example: <b>${esc(k.exJp)}</b> = ${esc(k.exKana)} <span class="romaji">(${esc(k.exRomaji)})</span> = ${esc(k.exEn)}</p>
            <div class="btn-row">
              ${sayBtns(k.exKana)}
              <a class="btn small" href="scribble.html?set=kanji&char=${encodeURIComponent(k.kanji)}">✍️ Likh ke dekho</a>
            </div>
          </div>
        </div>`;
      openDetail(detail);
    };
  });
}

const RENDERERS = {
  0: renderIntro, 1: renderHiragana, 2: renderABC, 3: renderKatakana, 4: renderWords,
  5: renderPhrases, 6: renderGrammar, 7: renderConversations, 8: renderKanji
};

// ---------- Start ----------
(function init() {
  const p = getParam("level");
  const level = p === null ? NaN : Number(p);
  if (getParam("revise")) renderRevision();
  else if (RENDERERS[level]) renderLevel(level);
  else renderPicker();
})();
