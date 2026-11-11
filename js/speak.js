// Speak page: 3 modes
//  check  = item dikhao, user bole, browser check kare
//  shadow = app bole, user turant dohraye (hands-free)
//  role   = conversation mein ek character ban ke bolo

const panel = document.getElementById("speak-panel");
let runToken = 0; // naya mode/start hone pe purana loop band karne ke liye

function renderSupportWarning() {
  const box = document.getElementById("support-warning");
  if (speechRecognitionSupported()) { box.innerHTML = ""; return; }
  box.innerHTML = IS_BRAVE
    ? `<div class="tip-box warn">🦁 <b>Brave browser</b> mic se bola hua Japanese check nahi kar sakta (Brave Google ki speech service use nahi karta).
       Baaki sab chalega: 🔊 suno, 🎤 dabake zor se bolo aur khud match karo, Shadowing aur Role-play ("Bol diya" button) bhi.
       Mic se automatic check ke liye <b>Chrome ya Edge</b> mein kholo.</div>`
    : `<div class="tip-box warn">⚠️ Ye browser mic se Japanese check nahi kar sakta. <b>Chrome ya Edge</b> use karo (internet ke saath).
       Tab tak Shadowing mode use karo, ya khud check karke aage badho.</div>`;
}
renderSupportWarning();
document.addEventListener("brave-detected", renderSupportWarning);

// ---------- Speech scoring ----------
function scoreSpeech(alts, it) {
  const targets = [it.jp, it.kana].map(normJP).filter(Boolean);
  let best = 0, heard = alts[0] || "";
  for (const a of alts) {
    const n = normJP(a);
    for (const t of targets) {
      let s = similarity(n, t);
      if (t.length >= 2 && n.includes(t)) s = Math.max(s, 0.95);
      if (s > best) { best = s; heard = a; }
    }
  }
  return { score: best, heard };
}

function resultHtml(r) {
  const pct = Math.round(r.score * 100);
  let msg, cls;
  if (!r.heard) { msg = "🤫 Kuch sunai nahi diya. Mic ke paas thoda zor se bolo."; cls = "bad"; }
  else if (r.score >= 0.8) { msg = "🎉 Perfect! Bilkul sahi bola!"; cls = "ok"; }
  else if (r.score >= 0.5) { msg = "👍 Kaafi close! Ek baar 🐢 dheere suno aur phir dohrao."; cls = "mid"; }
  else { msg = "🔁 Phir se try karo. Pehle 🔊 suno, phir same tune mein bolo."; cls = "bad"; }
  return `
    <div class="feedback ${cls}">${msg}</div>
    ${r.heard ? `
      <div class="score-bar"><div style="width:${pct}%"></div></div>
      <p class="muted center">Browser ne suna: «<b>${esc(r.heard)}</b>» · Match: ${pct}%</p>
      <p class="muted center small">Note: kabhi browser kanji mein likh deta hai, isliye sahi bolne pe bhi score kam aa sakta hai. Tension mat lo 😄</p>` : ""}`;
}

// Mic button dabane pe: suno → score → result dikhao
async function doMic(it, resultEl, btn) {
  if (!speechRecognitionSupported()) {
    resultEl.innerHTML = `<div class="feedback mid">🎤 Zor se bolo, phir khud socho: kya 🔊 jaisa hi bola? Haan to aage badho!</div>`;
    return { score: 1, heard: "", self: true };
  }
  const label = btn.textContent;
  btn.disabled = true;
  btn.classList.add("listening");
  btn.textContent = "👂 Sun raha hoon... bolo!";
  let r = null;
  try {
    const alts = await recognizeOnce();
    r = scoreSpeech(alts, it);
    resultEl.innerHTML = resultHtml(r);
  } catch (err) {
    resultEl.innerHTML = `<div class="feedback bad">${esc(micErrorMessage(err))}</div>`;
  } finally {
    btn.disabled = false;
    btn.classList.remove("listening");
    btn.textContent = label.includes("Phir") ? label : "🎤 Phir se bolo";
  }
  return r;
}

const wait = ms => new Promise(r => setTimeout(r, ms));

// ======================= Mode 1: Bolo & Check =======================
function renderCheck() {
  panel.innerHTML = `
    <div class="form-row">
      <label>Level: <select id="sp-level">${levelOptions(getParam("level") ?? "5")}</select></label>
      <label><input type="checkbox" id="sp-hard"> 🔥 Hard mode: Japanese chhupao, sirf meaning dekh ke bolo</label>
    </div>
    <div id="sp-card"></div>`;
  const sel = panel.querySelector("#sp-level");
  const hard = panel.querySelector("#sp-hard");
  const cardEl = panel.querySelector("#sp-card");
  let items = [], idx = 0;

  const load = () => { items = shuffle(getSpeakItems(sel.value)); idx = 0; show(); };

  function show() {
    const it = items[idx];
    cardEl.innerHTML = `
      <p class="muted center">${idx + 1} / ${items.length} · ${esc(levelTitle(sel.value))}</p>
      <div class="speak-target ${hard.checked ? "hide-text" : ""}">${itemCard(it)}</div>
      ${hard.checked ? `<div class="btn-row center"><button class="btn small" id="sp-reveal">👀 Japanese dikhao</button></div>` : ""}
      <div class="btn-row center">
        <button class="btn" id="sp-listen">🔊 Pehle suno</button>
        <button class="btn primary mic" id="sp-mic">🎤 Ab bolo</button>
      </div>
      <div id="sp-result"></div>
      <div class="btn-row center">
        <button class="btn" id="sp-prev" ${idx === 0 ? "disabled" : ""}>← Pichhla</button>
        <button class="btn" id="sp-next">Agla →</button>
      </div>`;
    const reveal = cardEl.querySelector("#sp-reveal");
    if (reveal) reveal.onclick = () => cardEl.querySelector(".speak-target").classList.remove("hide-text");
    cardEl.querySelector("#sp-listen").onclick = () => speakJP(it.say);
    cardEl.querySelector("#sp-mic").onclick = e => doMic(it, cardEl.querySelector("#sp-result"), e.currentTarget);
    cardEl.querySelector("#sp-prev").onclick = () => { idx = Math.max(0, idx - 1); show(); };
    cardEl.querySelector("#sp-next").onclick = () => { idx = (idx + 1) % items.length; show(); };
  }

  sel.onchange = load;
  hard.onchange = show;
  load();
}

// ======================= Mode 2: Shadowing =======================
function renderShadow() {
  panel.innerHTML = `
    ${`<div class="tip-box">💡 <b>Shadowing</b> = jaise hi awaaz sunoge, turant waisa hi bolo. Ye bolne ki speed aur accent ke liye sabse best tareeka hai. Earphones lagao aur hands-free practice karo (walk karte hue bhi!).</div>`}
    <div class="form-row">
      <label>Level: <select id="sh-level">${levelOptions(getParam("level") ?? "5")}</select></label>
      <label>Bolne ka time: <select id="sh-gap"><option value="2">2 sec</option><option value="3" selected>3 sec</option><option value="5">5 sec</option></select></label>
      <label>Har item: <select id="sh-rep"><option value="1">1 baar</option><option value="2" selected>2 baar</option></select></label>
    </div>
    <div class="btn-row">
      <button class="btn primary" id="sh-start">▶️ Start</button>
      <button class="btn" id="sh-stop">⏹ Stop</button>
    </div>
    <div id="sh-display"></div>`;
  const display = panel.querySelector("#sh-display");

  panel.querySelector("#sh-start").onclick = async () => {
    const token = ++runToken;
    const items = shuffle(getSpeakItems(panel.querySelector("#sh-level").value));
    const gap = Number(panel.querySelector("#sh-gap").value);
    const rep = Number(panel.querySelector("#sh-rep").value);
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      for (let r = 0; r < rep; r++) {
        if (token !== runToken) return;
        display.innerHTML = `<p class="muted center">${i + 1} / ${items.length}</p>${itemCard(it)}<div class="shadow-status">🔊 Suno...</div>`;
        await speakAsync(it.say);
        for (let s = gap; s > 0; s--) {
          if (token !== runToken) return;
          display.querySelector(".shadow-status").innerHTML = `🗣️ <b>Ab aap bolo!</b> ${s}`;
          await wait(1000);
        }
      }
    }
    if (token === runToken) display.innerHTML = `<div class="feedback ok">🎉 Round complete! Shabaash!</div>`;
  };
  panel.querySelector("#sh-stop").onclick = () => {
    runToken++;
    stopSpeaking();
    display.innerHTML = `<p class="muted center">⏹ Ruk gaya. ▶️ Start dabao phir se shuru karne ke liye.</p>`;
  };
}

// ======================= Mode 3: Role-play =======================
function renderRole() {
  const convoParam = Number(getParam("convo")) || 0;
  panel.innerHTML = `
    <div class="tip-box">💡 Conversation mein ek character chuno. Doosra character app bolega, aapki baari aane pe aap bologe. Ye real conversation ki practice hai! 🎭</div>
    <div class="form-row">
      <label>Conversation: <select id="rp-convo">${CONVERSATIONS.map((c, i) => `<option value="${i}" ${i === convoParam ? "selected" : ""}>${esc(c.title)}</option>`).join("")}</select></label>
      <label>Aap kaun: <select id="rp-role"></select></label>
      <label><input type="checkbox" id="rp-hard"> 🔥 Hard mode: apni lines ka Japanese chhupao</label>
    </div>
    <div class="btn-row"><button class="btn primary" id="rp-start">▶️ Shuru karo</button></div>
    <div class="chat" id="rp-chat"></div>`;
  const convoSel = panel.querySelector("#rp-convo");
  const roleSel = panel.querySelector("#rp-role");
  const chat = panel.querySelector("#rp-chat");

  const fillRoles = () => {
    const cv = CONVERSATIONS[Number(convoSel.value)];
    roleSel.innerHTML = cv.speakers.map(s => `<option>${esc(s)}</option>`).join("");
  };
  convoSel.onchange = () => { fillRoles(); runToken++; stopSpeaking(); chat.innerHTML = ""; };
  fillRoles();

  panel.querySelector("#rp-start").onclick = async () => {
    const token = ++runToken;
    const ci = Number(convoSel.value);
    const cv = CONVERSATIONS[ci];
    const me = roleSel.value;
    const hard = panel.querySelector("#rp-hard").checked;
    const lines = CONVO_ITEMS.filter(l => l.convo === ci);
    chat.innerHTML = `<p class="muted center">${esc(cv.situation)}</p>`;

    for (const line of lines) {
      if (token !== runToken) return;
      const side = cv.speakers.indexOf(line.who) === 0 ? "left" : "right";
      const b = document.createElement("div");
      b.className = `bubble ${side}`;
      if (line.who !== me) {
        b.innerHTML = bubbleInner(line, false);
        chat.appendChild(b);
        b.scrollIntoView({ behavior: "smooth", block: "nearest" });
        await speakAsync(line.say, { alt: side !== "left" });
        await wait(300);
      } else {
        b.classList.add("my-turn");
        b.innerHTML = `<div class="who">🫵 Aapki baari! (${esc(me)})</div>
          <div class="${hard ? "hide-text" : ""}">${bubbleInner(line, true)}</div>
          <div class="btn-row">
            <button class="btn small" data-act="hint">🔊 Hint suno</button>
            <button class="btn small primary mic" data-act="mic">🎤 Bolo</button>
            <button class="btn small" data-act="next">⏭️ Bol diya, aage</button>
          </div>
          <div class="rp-result"></div>`;
        chat.appendChild(b);
        b.scrollIntoView({ behavior: "smooth", block: "nearest" });
        await new Promise(resolve => {
          b.querySelector('[data-act="hint"]').onclick = () => {
            b.querySelector(".hide-text")?.classList.remove("hide-text");
            speakJP(line.say);
          };
          b.querySelector('[data-act="next"]').onclick = resolve;
          b.querySelector('[data-act="mic"]').onclick = async e => {
            const r = await doMic(line, b.querySelector(".rp-result"), e.currentTarget);
            if (r && r.score >= 0.6) setTimeout(resolve, 1500);
          };
        });
        b.querySelectorAll("button").forEach(x => { x.disabled = true; });
        b.classList.remove("my-turn");
        b.querySelector(".hide-text")?.classList.remove("hide-text");
      }
    }
    if (token !== runToken) return;
    const end = document.createElement("div");
    end.className = "center";
    end.innerHTML = `<div class="feedback ok">🎉 Conversation complete! Aapne Japanese mein baat ki!</div>
      <p class="muted">Ab role badal ke try karo, ya 🔥 Hard mode on karo.</p>`;
    chat.appendChild(end);
    end.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
}

function bubbleInner(line, mine) {
  return `${mine ? "" : `<div class="who">${esc(line.who)}</div>`}
    <div class="jp">${esc(line.kana)}</div>
    <div class="kanji-form">${esc(line.jp)}</div>
    <div class="romaji">${esc(line.romaji)}</div>
    <div class="en">${esc(line.en)}</div>
    <div class="hi">💬 ${esc(line.hi)}</div>`;
}

// ---------- Mode switch ----------
const MODES = { check: renderCheck, shadow: renderShadow, role: renderRole };

function showMode(mode) {
  runToken++;
  stopSpeaking();
  document.querySelectorAll("#speak-modes .chip").forEach(c => c.classList.toggle("active", c.dataset.mode === mode));
  MODES[mode]();
}

document.getElementById("speak-modes").addEventListener("click", e => {
  const b = e.target.closest("[data-mode]");
  if (b) showMode(b.dataset.mode);
});

showMode(MODES[getParam("mode")] ? getParam("mode") : "check");
