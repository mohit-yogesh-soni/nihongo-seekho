// Listen quiz: awaaz suno → 4 options mein se sahi matlab chuno

const setupEl = document.getElementById("setup");
const quizEl = document.getElementById("quiz");
const levelSelect = document.getElementById("level-select");

levelSelect.innerHTML = levelOptions(getParam("level") ?? "1");

let state = null;

// Wrong options (distractors): same type ke items, alag jawaab wale
function makeOptions(item, pool) {
  const correct = answerOf(item);
  // Same awaaz wale words (jaise かみ = baal / kaagaz / bhagwan) option mein mat do, warna sunke pehchaan hi nahi sakte
  const sameType = pool.filter(p => (p.type === "kana") === (item.type === "kana") &&
    answerOf(p) !== correct && normJP(p.kana) !== normJP(item.kana));
  const wrong = [];
  for (const p of shuffle(sameType)) {
    if (!wrong.some(w => answerOf(w) === answerOf(p))) wrong.push(p);
    if (wrong.length === 3) break;
  }
  return shuffle([item, ...wrong]);
}

function startQuiz() {
  const level = levelSelect.value;
  const pool = level === "all" ? getAllItems() : getLevelItems(level);
  const count = Math.min(Number(document.getElementById("count-select").value), pool.length);
  state = {
    level, pool, showText: document.getElementById("show-text").checked,
    questions: shuffle(pool).slice(0, count), idx: 0, score: 0, wrongList: []
  };
  setupEl.classList.add("hidden");
  quizEl.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = state.questions[state.idx];
  const options = makeOptions(q, state.pool);
  state.correctIdx = options.indexOf(q);
  state.answered = false;
  quizEl.innerHTML = `
    <div class="quiz-top">
      <span>Sawaal ${state.idx + 1} / ${state.questions.length}</span>
      <span>⭐ Score: ${state.score}</span>
    </div>
    <div class="progress"><div style="width:${(state.idx / state.questions.length) * 100}%"></div></div>
    <div class="listen-box">
      <button class="big-play" id="play">🔊</button>
      <div class="btn-row center">
        <button class="btn small" id="play-slow">🐢 Dheere suno</button>
        <button class="btn small" id="hint">👀 Hint: text dikhao</button>
      </div>
      <div class="jp big ${state.showText ? "" : "hidden"}" id="q-text">${esc(q.kana || q.jp)}</div>
    </div>
    <p class="center muted">${q.type === "kana" ? "Ye kaunsi awaaz hai?" : "Iska matlab kya hai?"}</p>
    <div class="options">
      ${options.map((o, i) => `<button class="btn option" data-i="${i}"><span class="num">${i + 1}</span> ${esc(answerOf(o))}</button>`).join("")}
    </div>
    <div id="feedback"></div>`;

  const play = rate => speakJP(q.say, rate);
  // Chrome bina user click ke awaaz nahi chalne deta. Pehle click tak 🔊 button ko chamkao.
  const canAutoplay = !navigator.userActivation || navigator.userActivation.hasBeenActive;
  if (canAutoplay) play();
  else {
    const btn = quizEl.querySelector("#play");
    btn.classList.add("pulse");
    quizEl.querySelector(".listen-box").insertAdjacentHTML("beforeend", `<p class="muted" id="tap-hint">👆 🔊 dabao aur suno</p>`);
    btn.addEventListener("click", () => {
      btn.classList.remove("pulse");
      quizEl.querySelector("#tap-hint")?.remove();
    }, { once: true });
  }
  quizEl.querySelector("#play").onclick = () => play();
  quizEl.querySelector("#play-slow").onclick = () => speakSlow(q.say);
  quizEl.querySelector("#hint").onclick = () => quizEl.querySelector("#q-text").classList.remove("hidden");
  quizEl.querySelectorAll(".option").forEach(b => {
    b.onclick = () => answer(options[Number(b.dataset.i)], q, b);
  });
}

function answer(chosen, q, btn) {
  if (state.answered) return;
  state.answered = true;
  const ok = answerOf(chosen) === answerOf(q);
  srsUpdate(q, ok); // 🔁 Revision ke liye yaad rakho
  if (ok) state.score++;
  else state.wrongList.push(q);
  btn.classList.add(ok ? "correct" : "wrong");
  quizEl.querySelectorAll(".option").forEach(b => {
    if (Number(b.dataset.i) === state.correctIdx) b.classList.add("correct");
    b.disabled = true;
  });
  quizEl.querySelector("#q-text").classList.remove("hidden");
  quizEl.querySelector("#feedback").innerHTML = `
    <div class="feedback ${ok ? "ok" : "bad"}">${ok ? "✅ Sahi jawaab! Shabaash!" : "❌ Koi baat nahi, ye yaad rakho:"}</div>
    ${itemCard(q)}
    <div class="btn-row center"><button class="btn primary" id="next">${state.idx + 1 < state.questions.length ? "Agla sawaal →" : "Result dekho 🏁"}</button></div>`;
  quizEl.querySelector("#next").onclick = next;
  quizEl.querySelector("#next").focus();
}

function next() {
  state.idx++;
  if (state.idx < state.questions.length) showQuestion();
  else showResult();
}

function showResult() {
  const pct = Math.round((state.score / state.questions.length) * 100);
  const key = "listen-best-" + state.level;
  const best = Math.max(getProgress()[key] || 0, pct);
  setProgress(key, best);
  const msg = pct >= 90 ? "🏆 Kamaal! Tumhare kaan Japanese samajhne lage hain!"
            : pct >= 70 ? "👏 Bahut badhiya! Thodi aur practice aur perfect."
            : pct >= 40 ? "👍 Achhi shuruaat! Galat wale dobara Learn page pe suno."
            : "💪 Ghabrao mat, sab aise hi shuru karte hain. Pehle Learn page pe suno, phir wapas aao.";
  quizEl.innerHTML = `
    <div class="center">
      <h2>${msg}</h2>
      <p class="score-big">${state.score} / ${state.questions.length} (${pct}%)</p>
      <p class="muted">${esc(levelTitle(state.level))} · Best score: ${best}%</p>
    </div>
    ${state.wrongList.length ? `<h3>❌ Ye galat hue (inhe phir se suno):</h3><div class="grid cards">${state.wrongList.map(w => itemCard(w)).join("")}</div>` : ""}
    <div class="btn-row center">
      <button class="btn primary" id="again">🔁 Phir se khelo</button>
      <button class="btn" id="change">⚙️ Level badlo</button>
      ${state.level !== "all" ? `<a class="btn" href="learn.html?level=${state.level}">📖 Lesson pe jao</a>` : ""}
    </div>`;
  quizEl.querySelector("#again").onclick = startQuiz;
  quizEl.querySelector("#change").onclick = () => {
    quizEl.classList.add("hidden");
    setupEl.classList.remove("hidden");
  };
}

document.getElementById("start-btn").onclick = startQuiz;

// Keyboard: 1-4 = option, Enter = next
document.addEventListener("keydown", e => {
  if (!state || quizEl.classList.contains("hidden")) return;
  if (["1", "2", "3", "4"].includes(e.key)) {
    const b = quizEl.querySelector(`.option[data-i="${Number(e.key) - 1}"]`);
    if (b) b.click();
  } else if (e.key === "Enter" && state.answered) {
    const n = quizEl.querySelector("#next");
    if (n) { e.preventDefault(); n.click(); }
  }
});

if (getParam("level") !== null) startQuiz();
