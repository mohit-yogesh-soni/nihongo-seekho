// Common helpers: navbar, settings, Japanese voice (TTS), progress, text utils.
// Har page pe ye file load hoti hai.

const NAV_ITEMS = [
  { href: "index.html",     label: "🏠 Home" },
  { href: "learn.html",     label: "📖 Learn" },
  { href: "listen.html",    label: "👂 Listen" },
  { href: "speak.html",     label: "🎤 Speak" },
  { href: "translate.html", label: "🔁 Translate" },
  { href: "scribble.html",  label: "✍️ Scribble" },
  { href: "tricks.html",    label: "🧠 Tricks" }
];

// ---------- Settings (romaji dikhana, awaaz ki speed) ----------
const SETTINGS_KEY = "nihongo-settings-v1";

// voice: Japanese voice ka naam ("" = automatic), pitch: 0.6 bhaari (bass) ... 1.3 patli
const DEFAULT_SETTINGS = { romaji: true, rate: 0.8, voice: "", pitch: 1 };

function getSettings() {
  try {
    return Object.assign({}, DEFAULT_SETTINGS, JSON.parse(localStorage.getItem(SETTINGS_KEY)));
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(s) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  applySettings();
}

function applySettings() {
  document.body.classList.toggle("hide-romaji", !getSettings().romaji);
}

// ---------- Navbar ----------
function renderNav() {
  const header = document.getElementById("site-nav");
  if (!header) return;
  const current = location.pathname.split("/").pop() || "index.html";
  const s = getSettings();
  const links = NAV_ITEMS.map(item => {
    const active = item.href === current ? ' class="active"' : "";
    return `<a href="${item.href}"${active}>${item.label}</a>`;
  }).join("");
  header.innerHTML = `
    <div class="nav-inner">
      <a class="brand" href="index.html">日本語 <span>Nihongo Seekho</span></a>
      <button class="nav-toggle" aria-label="Menu">☰</button>
      <nav class="nav-links">
        ${links}
        <div class="nav-settings">
          <label title="English letters mein Japanese dikhao"><input type="checkbox" id="set-romaji" ${s.romaji ? "checked" : ""}> Romaji</label>
          <button class="nav-voice-btn" id="voice-btn" title="Awaaz ki settings">⚙️ Awaaz</button>
        </div>
      </nav>
    </div>
    <div class="voice-panel hidden" id="voice-panel" role="dialog" aria-label="Awaaz ki settings">
      <div class="vp-head"><b>🔊 Awaaz ki settings</b><button class="sheet-close vp-close" aria-label="Band karo">✕</button></div>
      <label>🗣️ Voice (aadmi / aurat)<select id="set-voice"></select></label>
      <p class="muted small" id="voice-note"></p>
      <label>🎚️ Awaaz ka tone
        <select id="set-pitch">
          <option value="0.6">🔈 Bahut bhaari (deep bass)</option>
          <option value="0.8">🔉 Bhaari (bass)</option>
          <option value="1">🔊 Normal</option>
          <option value="1.3">🎵 Patli (high)</option>
        </select>
      </label>
      <label>⏩ Speed
        <select id="set-rate">
          <option value="0.5">🐌 Bahut dheere</option>
          <option value="0.65">🐢 Dheere</option>
          <option value="0.8">🚶 Medium</option>
          <option value="1">🏃 Normal (asli speed)</option>
        </select>
      </label>
      <div class="btn-row"><button class="btn primary small" id="voice-test-btn">▶️ Test: こんにちは、げんきですか？</button></div>
    </div>`;
  // Purani saved value (jaise 0.6) list mein na ho to sabse paas wala option chuno
  const nearest = (val, opts) => opts.reduce((a, b) => Math.abs(b - val) < Math.abs(a - val) ? b : a);
  header.querySelector("#set-rate").value = String(nearest(s.rate, [0.5, 0.65, 0.8, 1]));
  header.querySelector("#set-pitch").value = String(nearest(s.pitch, [0.6, 0.8, 1, 1.3]));
  header.querySelector(".nav-toggle").addEventListener("click", () => {
    header.querySelector(".nav-links").classList.toggle("open");
  });
  header.querySelector("#set-romaji").addEventListener("change", e => {
    saveSettings({ ...getSettings(), romaji: e.target.checked });
  });
  const panel = header.querySelector("#voice-panel");
  header.querySelector("#voice-btn").addEventListener("click", () => { fillVoiceSelect(); panel.classList.toggle("hidden"); });
  header.querySelector(".vp-close").addEventListener("click", () => panel.classList.add("hidden"));
  header.querySelector("#set-rate").addEventListener("change", e => {
    saveSettings({ ...getSettings(), rate: parseFloat(e.target.value) });
  });
  header.querySelector("#set-pitch").addEventListener("change", e => {
    saveSettings({ ...getSettings(), pitch: parseFloat(e.target.value) });
    speakJP("こんにちは");
  });
  header.querySelector("#set-voice").addEventListener("change", e => {
    saveSettings({ ...getSettings(), voice: e.target.value });
    jpVoice = null;
    loadJapaneseVoice();
    speakJP("こんにちは");
  });
  header.querySelector("#voice-test-btn").addEventListener("click", () => speakJP("こんにちは、げんきですか？"));
}

// Voice ke naam se andaaza: aadmi ya aurat (browser ye info nahi deta, isliye naam ki list)
const MALE_VOICES = /otoya|hattori|ichiro|keita|naoki|daichi|takumi|kenji|male|男性/i;
const FEMALE_VOICES = /kyoko|o-ren|haruka|ayumi|nanami|mayu|sayaka|shiori|aoi|mizuki|google|female|女性/i;

function voiceGender(v) {
  if (MALE_VOICES.test(v.name)) return "male";
  if (FEMALE_VOICES.test(v.name)) return "female";
  return "";
}

function japaneseVoices() {
  return window.speechSynthesis
    ? speechSynthesis.getVoices().filter(v => v.lang && v.lang.toLowerCase().replace("_", "-").startsWith("ja"))
    : [];
}

function fillVoiceSelect() {
  const sel = document.getElementById("set-voice");
  if (!sel) return;
  const voices = japaneseVoices();
  const label = v => `${{ male: "👨", female: "👩" }[voiceGender(v)] || "🙂"} ${v.name}${v.localService ? "" : " (online)"}`;
  sel.innerHTML = `<option value="">Automatic</option>` + voices.map(v => `<option value="${esc(v.name)}">${esc(label(v))}</option>`).join("");
  sel.value = voices.some(v => v.name === getSettings().voice) ? getSettings().voice : "";
  const hasMale = voices.some(v => voiceGender(v) === "male");
  const ua = navigator.userAgent;
  const howTo = /Mac/i.test(ua) && !/iPhone|iPad/i.test(ua)
    ? "Mac: System Settings → Accessibility → Spoken Content → System Voice → Manage Voices → Japanese → <b>Otoya</b> (aadmi) download karo, phir browser restart karo."
    : /Windows/i.test(ua) ? "Windows: Settings → Time & Language → Speech → Add voices → Japanese (Ichiro / Keita aadmi wali awaaz)."
    : /Android/i.test(ua) ? "Android: Settings → Text-to-speech → Google engine ⚙️ → Japanese → alag voices (I, II, III, IV) mein se chuno."
    : /iPhone|iPad/i.test(ua) ? "iPhone: Settings → Accessibility → Spoken Content → Voices → Japanese → Otoya download karo."
    : "Apne device ki Text-to-speech settings mein Japanese voice install karo.";
  document.getElementById("voice-note").innerHTML = !voices.length
    ? "😕 Koi Japanese voice nahi mili. " + howTo
    : `${voices.length} Japanese voice mili. ` + (hasMale ? "" : "👨 Aadmi wali voice nahi hai. Tab tak 'Bhaari (bass)' tone use karo, ya install karo: " + howTo);
}

// ---------- Japanese voice (browser ka built-in Text-to-Speech) ----------
let jpVoice = null;

function loadJapaneseVoice() {
  const voices = japaneseVoices();
  const wanted = getSettings().voice;
  jpVoice = (wanted && voices.find(v => v.name === wanted)) ||
            voices.find(v => v.lang === "ja-JP" && v.localService) || voices[0] || null;
  return jpVoice;
}

// Conversation mein doosre insaan ke liye alag voice (ho sake to opposite gender wali)
function altVoice() {
  const main = jpVoice || loadJapaneseVoice();
  const others = japaneseVoices().filter(v => !main || v.name !== main.name);
  if (!others.length) return null;
  const g = main ? voiceGender(main) : "";
  return others.find(v => g && voiceGender(v) && voiceGender(v) !== g) || others[0];
}

if (window.speechSynthesis) {
  loadJapaneseVoice();
  // Voices kabhi kabhi der se load hote hain, isliye event pe dobara check
  speechSynthesis.onvoiceschanged = () => { loadJapaneseVoice(); fillVoiceSelect(); };
}

function hasJapaneseVoice() {
  return !!(jpVoice || loadJapaneseVoice());
}

// Bolo aur khatam hone pe Promise resolve karo (sequence mein bolne ke liye)
function speakAsync(text, opts = {}) {
  return new Promise(resolve => {
    if (!window.speechSynthesis) {
      alert("Aapka browser sound support nahi karta. Chrome ya Edge use karo.");
      return resolve();
    }
    if (!opts.queue) speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    const s = getSettings();
    u.rate = opts.rate || s.rate;
    // opts.alt = conversation ka doosra insaan: alag voice mile to wo, warna patli tone
    const alt = opts.alt ? altVoice() : null;
    const pitch = s.pitch * (opts.alt && !alt ? 1.3 : 1);
    u.pitch = Math.max(0.1, Math.min(2, pitch));
    if (alt) u.voice = alt;
    else if (jpVoice || loadJapaneseVoice()) u.voice = jpVoice;
    // Chrome bug: kabhi kabhi "onend" event nahi aata. Isliye timeout bhi lagaya,
    // taaki Shadowing/Role-play beech mein atke nahi.
    let done = false;
    const finish = () => { if (!done) { done = true; resolve(); } };
    const maxMs = 2000 + String(text).length * 250 / u.rate;
    setTimeout(finish, maxMs);
    u.onend = finish;
    u.onerror = finish;
    speakAsync._current = u; // reference rakho, warna Chrome utterance ko garbage-collect kar deta hai
    speechSynthesis.speak(u);
  });
}

function speakJP(text, rate) {
  speakAsync(text, { rate });
}

// 🐢 Dheere: sirf rate kam karna kaafi nahi (Mac Chrome pe kuch Japanese voices rate ko theek se
// follow nahi karti). Isliye text ko tod ke beech mein pause (、) daalte hain:
//   chhota word:  くじゃく → く、じゃ、く   (har syllable alag)
//   sentence:     わたしは モヒト です → わたしは、 モヒト、 です   (har word ke baad pause)
const ATTACH_TO_PREV = "ゃゅょぁぃぅぇぉャュョァィゥェォっッーんン？！?!。、…";

function slowText(text) {
  const t = String(text || "").trim();
  if (/\s/.test(t)) return t.split(/\s+/).join("、 ").replace(/([、。！？])、/g, "$1");
  const parts = [];
  for (const c of t) {
    if (parts.length && ATTACH_TO_PREV.includes(c)) parts[parts.length - 1] += c;
    else parts.push(c);
  }
  return parts.length > 1 && parts.length <= 10 ? parts.join("、") : t;
}

// 🐢 hamesha aapki chuni hui speed se bhi dheere (max 0.5)
function speakSlow(text) {
  return speakAsync(slowText(text), { rate: Math.min(0.5, getSettings().rate * 0.75) });
}

function stopSpeaking() {
  if (window.speechSynthesis) speechSynthesis.cancel();
}

// Kisi bhi button pe data-say="..." lagao, click pe bolega. data-slow="1" = 🐢 tod-tod ke dheere.
document.addEventListener("click", e => {
  const el = e.target.closest("[data-say]");
  if (!el) return;
  e.stopPropagation();
  if (el.dataset.slow) speakSlow(el.dataset.say);
  else speakJP(el.dataset.say);
});

// ---------- Brave browser detect ----------
// Brave mein mic wala speech check (Google ki service) band hota hai, aur kabhi kabhi voices bhi nahi milti.
let IS_BRAVE = false;
if (navigator.brave && typeof navigator.brave.isBrave === "function") {
  navigator.brave.isBrave().then(v => {
    IS_BRAVE = !!v;
    document.dispatchEvent(new Event("brave-detected"));
  }).catch(() => {});
}

// ---------- Mic se sunna (Speech Recognition, sirf Chrome/Edge) ----------
function speechRecognitionSupported() {
  return !IS_BRAVE && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

// Ek baar suno aur jo suna uski list (alternatives) return karo
function recognizeOnce() {
  return new Promise((resolve, reject) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return reject(new Error("unsupported"));
    stopSpeaking();
    const r = new SR();
    r.lang = "ja-JP";
    r.interimResults = false;
    r.maxAlternatives = 5;
    let finished = false;
    // Safety: 10 second mein kuch na aaye to band karo, taaki button atke nahi
    const timer = setTimeout(() => {
      if (finished) return;
      finished = true;
      try { r.abort(); } catch {}
      reject(new Error("no-speech"));
    }, 10000);
    r.onresult = e => {
      if (finished) return;
      finished = true; clearTimeout(timer);
      resolve(Array.from(e.results[0]).map(a => a.transcript));
    };
    r.onerror = e => {
      if (finished) return;
      finished = true; clearTimeout(timer);
      reject(new Error(e.error));
    };
    r.onend = () => { if (!finished) { finished = true; clearTimeout(timer); resolve([]); } };
    try { r.start(); } catch (err) { finished = true; clearTimeout(timer); reject(new Error("aborted")); }
  });
}

function micErrorMessage(err) {
  const code = err && err.message;
  if (code === "not-allowed" || code === "service-not-allowed")
    return "🎤 Mic ki permission nahi mili. Address bar mein 🔒/ⓘ icon pe click karke Microphone 'Allow' karo." +
      (location.protocol === "file:" ? " Agar phir bhi na chale: GitHub Pages wale link pe kholo (wahan mic theek chalta hai)." : "");
  if (code === "no-speech") return "🤫 Kuch sunai nahi diya. Thoda zor se aur mic ke paas bolo.";
  if (code === "network") return "🌐 Internet chahiye. Chrome awaaz ko check karne ke liye online service use karta hai. (Brave/Opera jaise browsers mein ye service band hoti hai, wahan Chrome ya Edge use karo.)";
  if (code === "unsupported") return "😕 Ye browser mic support nahi karta. Chrome ya Edge use karo.";
  return "Kuch gadbad hui (" + code + "). Phir se try karo.";
}

// ---------- Text helpers ----------
function kataToHira(s) {
  return String(s || "").replace(/[\u30a1-\u30f6]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
}

// Japanese text ko compare karne layak banao: katakana → hiragana, spaces/punctuation hatao
function normJP(s) {
  return kataToHira(s).replace(/[\s、。，．,.！？!?…・「」『』〜~（）()]/g, "");
}

// Romaji ko compare karne layak banao: "Arigatou" aur "arigato" dono match ho
function normRomaji(s) {
  return String(s || "").toLowerCase()
    .replace(/[^a-z]/g, "")
    .replace(/ou/g, "o")
    .replace(/([aiueo])\1+/g, "$1");
}

// Do strings mein kitna farak hai (Levenshtein distance)
function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
}

function similarity(a, b) {
  if (!a || !b) return 0;
  if (a === b) return 1;
  return 1 - editDistance(a, b) / Math.max(a.length, b.length);
}

// Romaji → Hiragana (typing help ke liye): "neko" → "ねこ"
const R2K = {
  a:"あ",i:"い",u:"う",e:"え",o:"お",
  ka:"か",ki:"き",ku:"く",ke:"け",ko:"こ", ga:"が",gi:"ぎ",gu:"ぐ",ge:"げ",go:"ご",
  sa:"さ",shi:"し",si:"し",su:"す",se:"せ",so:"そ", za:"ざ",ji:"じ",zi:"じ",zu:"ず",ze:"ぜ",zo:"ぞ",
  ta:"た",chi:"ち",ti:"ち",tsu:"つ",tu:"つ",te:"て",to:"と", da:"だ",de:"で",do:"ど",
  na:"な",ni:"に",nu:"ぬ",ne:"ね",no:"の",
  ha:"は",hi:"ひ",fu:"ふ",hu:"ふ",he:"へ",ho:"ほ",
  ba:"ば",bi:"び",bu:"ぶ",be:"べ",bo:"ぼ", pa:"ぱ",pi:"ぴ",pu:"ぷ",pe:"ぺ",po:"ぽ",
  ma:"ま",mi:"み",mu:"む",me:"め",mo:"も",
  ya:"や",yu:"ゆ",yo:"よ",
  ra:"ら",ri:"り",ru:"る",re:"れ",ro:"ろ",
  wa:"わ",wo:"を",
  kya:"きゃ",kyu:"きゅ",kyo:"きょ", gya:"ぎゃ",gyu:"ぎゅ",gyo:"ぎょ",
  sha:"しゃ",shu:"しゅ",sho:"しょ", ja:"じゃ",ju:"じゅ",jo:"じょ",
  cha:"ちゃ",chu:"ちゅ",cho:"ちょ", nya:"にゃ",nyu:"にゅ",nyo:"にょ",
  hya:"ひゃ",hyu:"ひゅ",hyo:"ひょ", bya:"びゃ",byu:"びゅ",byo:"びょ",
  pya:"ぴゃ",pyu:"ぴゅ",pyo:"ぴょ", mya:"みゃ",myu:"みゅ",myo:"みょ",
  rya:"りゃ",ryu:"りゅ",ryo:"りょ"
};

function romajiToHiragana(input) {
  const s = String(input || "").toLowerCase();
  let out = "", i = 0;
  while (i < s.length) {
    const c = s[i], next = s[i + 1];
    if (c === "n" && (next === undefined || !"aiueoy".includes(next))) {
      out += "ん";
      i += (next === "n" && !"aiueoy".includes(s[i + 2] || "x")) || next === "'" ? 2 : 1;
      continue;
    }
    if (c === next && /[bcdfghjkmpqrstvwxyz]/.test(c)) { out += "っ"; i++; continue; }
    let matched = false;
    for (const len of [3, 2, 1]) {
      const part = s.substr(i, len);
      if (R2K[part]) { out += R2K[part]; i += len; matched = true; break; }
    }
    if (!matched) { out += c === "-" ? "ー" : c; i++; }
  }
  return out;
}

function isLatin(s) {
  return /^[\sa-zA-Z'\-]+$/.test(s);
}

// ---------- Misc ----------
function esc(str) {
  return String(str ?? "").replace(/[&<>"']/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

// 🔊 aur 🐢 buttons
function sayBtns(text) {
  return `<button class="say" data-say="${esc(text)}" title="Suno">🔊</button>` +
         `<button class="say" data-say="${esc(text)}" data-slow="1" title="Tod-tod ke dheere suno">🐢</button>`;
}

// Ek word/phrase ka card: kana bada, kanji chhota, romaji, English, Hinglish
function itemCard(it, extra = "") {
  const showKanji = it.jp && it.kana && normJP(it.jp) !== normJP(it.kana);
  return `<div class="item-card">
    <div class="jp">${esc(it.kana || it.jp)}</div>
    ${showKanji ? `<div class="kanji-form">Kanji mein: ${esc(it.jp)}</div>` : ""}
    <div class="romaji">${esc(it.romaji)}</div>
    <div class="en">${esc(it.en)}</div>
    ${it.hi ? `<div class="hi">💬 ${esc(it.hi)}</div>` : ""}
    <div class="actions">${sayBtns(it.say)}${extra}</div>
  </div>`;
}

// ---------- Progress (browser ke localStorage mein save) ----------
const PROGRESS_KEY = "nihongo-progress-v1";

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
  } catch {
    return {};
  }
}

function setProgress(key, value) {
  const p = getProgress();
  p[key] = value;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

function markDone(key) { setProgress(key, true); }
function isDone(key) { return !!getProgress()[key]; }

// ---------- Japanese voice nahi mili? Kaise theek karein ----------
function showVoiceHelp() {
  if (!window.speechSynthesis || hasJapaneseVoice() || sessionStorage.getItem("voice-help-closed")) return;
  if (document.getElementById("voice-help")) return;
  const main = document.querySelector("main");
  if (!main) return;
  const ua = navigator.userAgent;
  const tips = [];
  if (IS_BRAVE) tips.push("🦁 <b>Brave:</b> address bar mein Brave Shields (sher wala icon) dabao → is site ke liye <b>Shields down</b> karo → page reload karo. Na chale to Chrome ya Edge use karo.");
  if (/Android/i.test(ua)) tips.push("📱 <b>Android:</b> Settings → Text-to-speech → Google engine → Japanese voice install karo.");
  else if (/iPhone|iPad/i.test(ua)) tips.push("📱 <b>iPhone:</b> Settings → Accessibility → Spoken Content → Voices → Japanese → Kyoko download karo.");
  else if (/Mac/i.test(ua)) tips.push("💻 <b>Mac:</b> System Settings → Accessibility → Spoken Content → System Voice → Manage Voices → Japanese (Kyoko) install karo, phir browser restart karo.");
  else tips.push("💻 <b>Windows:</b> Settings → Time & Language → Speech → Add voices → Japanese install karo, phir browser restart karo.");
  main.insertAdjacentHTML("afterbegin", `
    <div class="tip-box warn" id="voice-help">
      <b>🔇 Japanese awaaz nahi mili.</b> 🔊 buttons tab tak sahi nahi bolenge.<br>${tips.join("<br>")}
      <div><button class="btn small" id="voice-help-close">Theek hai, band karo</button></div>
    </div>`);
  document.getElementById("voice-help-close").onclick = () => {
    sessionStorage.setItem("voice-help-closed", "1");
    document.getElementById("voice-help").remove();
  };
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  applySettings();
  // Voices der se load hoti hain, isliye thoda ruk ke check
  setTimeout(showVoiceHelp, 2000);
});
