// Saare data files ko ek common format mein badalta hai, taaki har page (Learn, Listen, Speak,
// Translate) same tarah se use kar sake.
// Item format: { type, jp, kana, romaji, en, hi, say, level }
//   type: "kana" (ek letter), "word", "phrase", "sentence", "line" (conversation)
//   say:  jo text bola jayega (kana, taaki reading sahi rahe)

const toKana = a => a && ({ kana: a[0], romaji: a[1], word: a[2], wordRomaji: a[3], en: a[4], hi: a[5] });

function kanaTip(k) {
  if (k.kana === "を" || k.kana === "ヲ") return KANA_TIPS.o_particle;
  // "は = wa / へ = e" wala particle rule sirf hiragana pe lagta hai
  if (k.kana === "ハ" || k.kana === "ヘ") return "";
  return KANA_TIPS[k.romaji] || "";
}

function kanaCharItem(k, level) {
  const tip = kanaTip(k);
  return {
    type: "kana", level, jp: k.kana, kana: k.kana, romaji: k.romaji,
    en: `"${k.romaji}" ki awaaz`,
    hi: (tip ? tip + " " : "") + `Example: ${k.word} (${k.wordRomaji}) = ${k.hi}`,
    say: k.kana, word: k
  };
}

function kanaWordItem(k, level) {
  return { type: "word", level, jp: k.word, kana: k.word, romaji: k.wordRomaji, en: k.en, hi: k.hi, say: k.word, letter: k.kana };
}

// Chart ko flat list mein badlo (null hatao)
function flatKana(rows) {
  return rows.flat().filter(Boolean).map(toKana);
}

const HIRA_ALL = [...flatKana(HIRAGANA.basic), ...flatKana(HIRAGANA.dakuten), ...HIRAGANA.combo.map(toKana)];
const KATA_ALL = [...flatKana(KATAKANA.basic), ...flatKana(KATAKANA.dakuten)];

// Level 0: Intro ke sounds
const INTRO_ITEMS = [
  { type: "kana", jp: "あ", kana: "あ", romaji: "a", en: '"a" ki awaaz', hi: "'आ' jaisa, lekin chhota", say: "あ" },
  { type: "kana", jp: "い", kana: "い", romaji: "i", en: '"i" ki awaaz', hi: "'इ' jaisa", say: "い" },
  { type: "kana", jp: "う", kana: "う", romaji: "u", en: '"u" ki awaaz', hi: "'उ' jaisa", say: "う" },
  { type: "kana", jp: "え", kana: "え", romaji: "e", en: '"e" ki awaaz', hi: "'ए' jaisa", say: "え" },
  { type: "kana", jp: "お", kana: "お", romaji: "o", en: '"o" ki awaaz', hi: "'ओ' jaisa", say: "お" },
  { type: "word", jp: "おばさん", kana: "おばさん", romaji: "obasan", en: "aunt / middle-aged lady", hi: "Aunty. Chhota 'ba'", say: "おばさん" },
  { type: "word", jp: "おばあさん", kana: "おばあさん", romaji: "obaasan", en: "grandmother", hi: "Daadi/Naani. Lamba 'baa'! Galat bola to aunty naraz 😄", say: "おばあさん" },
  { type: "word", jp: "来て", kana: "きて", romaji: "kite", en: "come!", hi: "Aao!", say: "きて" },
  { type: "word", jp: "切手", kana: "きって", romaji: "kitte", en: "postage stamp", hi: "Daak ticket. っ = chhota pause: ki-(ruko)-te", say: "きって" }
].map(it => ({ ...it, level: 0 }));

function wordItem(w, level, type = "word") {
  return { type, level, jp: w[0], kana: w[1], romaji: w[2], en: w[3], hi: w[4], say: w[1] };
}

const WORD_ITEMS = WORD_CATEGORIES.flatMap(c => c.words.map(w => ({ ...wordItem(w, 4), category: c.id })));
const PHRASE_ITEMS = PHRASE_GROUPS.flatMap(g => g.phrases.map(p => ({ ...wordItem(p, 5, "phrase"), category: g.id })));
const GRAMMAR_ITEMS = GRAMMAR.flatMap((g, gi) => g.examples.map(e => ({ ...wordItem(e, 6, "sentence"), lesson: gi })));
const CONVO_ITEMS = CONVERSATIONS.flatMap((c, ci) => c.lines.map(l => ({
  type: "line", level: 7, who: l[0], jp: l[1], kana: l[2], romaji: l[3], en: l[4], hi: l[5], say: l[2], convo: ci
})));
const KANJI_LIST = KANJI.map(k => ({ kanji: k[0], readings: k[1], en: k[2], hi: k[3], exJp: k[4], exKana: k[5], exRomaji: k[6], exEn: k[7] }));
const KANJI_ITEMS = KANJI_LIST.map(k => ({
  type: "word", level: 8, jp: k.exJp, kana: k.exKana, romaji: k.exRomaji, en: k.exEn,
  hi: `${k.kanji} = ${k.hi}`, say: k.exKana, kanji: k.kanji
}));

// Har level ke practice items
function getLevelItems(level) {
  switch (Number(level)) {
    case 0: return INTRO_ITEMS;
    case 1: return HIRA_ALL.map(k => kanaCharItem(k, 1));
    case 2: return HIRA_ALL.map(k => kanaWordItem(k, 2));
    case 3: return [...KATA_ALL.map(k => kanaCharItem(k, 3)),
                    ...KATA_ALL.filter(k => k.word !== k.kana).map(k => kanaWordItem(k, 3))];
    case 4: return WORD_ITEMS;
    case 5: return PHRASE_ITEMS;
    case 6: return GRAMMAR_ITEMS;
    case 7: return CONVO_ITEMS;
    case 8: return KANJI_ITEMS;
    default: return getAllItems();
  }
}

function getAllItems() {
  return SYLLABUS.flatMap(s => getLevelItems(s.level));
}

// Speak page: ek akela letter mic se pehchaanna mushkil hai, isliye letter ki jagah uska example word bulwao
function getSpeakItems(level) {
  const items = level === "all" ? getAllItems() : getLevelItems(level);
  return items
    .map(it => (it.type === "kana" && it.word && it.word.word !== it.kana ? kanaWordItem(it.word, it.level) : it))
    .filter((it, i, arr) => arr.findIndex(x => x.jp === it.jp) === i);
}

// Quiz ka jawab: letter ke liye romaji, baaki ke liye meaning
function answerOf(it) {
  return it.type === "kana" ? it.romaji : it.en;
}

// Translate page ki dictionary: saare words, phrases, sentences (duplicate hata ke)
function getDictionary() {
  const all = [
    ...WORD_ITEMS, ...PHRASE_ITEMS,
    ...HIRA_ALL.map(k => kanaWordItem(k, 2)),
    ...KATA_ALL.filter(k => k.word !== k.kana).map(k => kanaWordItem(k, 3)),
    ...KANJI_ITEMS, ...TRICK_ITEMS, ...GRAMMAR_ITEMS, ...CONVO_ITEMS
  ];
  const seen = new Set();
  return all.filter(it => {
    const key = normJP(it.kana) + "|" + it.en.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ---------- Tricks ke examples bhi normal items (🔊, flashcards, dictionary, revision mein) ----------
const trickItem = (e, group) => ({ ...wordItem(e, null), type: "word", group });
const TRICK_GROUPS = {
  pron: PRONUNCIATION_TRICKS.flatMap(t => t.examples.map(e => trickItem(e, "pron"))),
  kataRules: KATAKANA_RULES.flatMap(t => t.examples.map(e => trickItem(e, "kataRules"))),
  suffix: SUFFIXES.flatMap(s => s.examples.map(e => ({ ...trickItem(e, "suffix"), part: s.part }))),
  prefix: PREFIXES.flatMap(s => s.examples.map(e => ({ ...trickItem(e, "prefix"), part: s.part }))),
  patterns: WORD_PATTERNS.flatMap(t => t.examples.map(e => trickItem(e, "patterns"))),
  counters: COUNTERS.flatMap(s => s.examples.map(e => ({ ...trickItem(e, "counters"), part: s.part }))),
  endings: VERB_ENDINGS.map(v => ({ ...trickItem(v.ex, "endings"), part: v.end, partMeaning: v.meaning })),
  animeSpeech: ANIME_SPEECH.map(e => trickItem(e, "animeSpeech"))
};
const TRICK_ITEMS = Object.values(TRICK_GROUPS).flat();

// ---------- Spaced repetition (Leitner boxes) ----------
// Har card ka "box" (0-5). Yaad tha → agla box (der se wapas aayega). Bhool gaye → box 0 (kal wapas).
const SRS_KEY = "nihongo-srs-v1";
const SRS_DAYS = [1, 2, 4, 7, 15, 30];
const today = () => Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
const srsKey = it => `${it.type}:${it.jp}|${it.en}`;

function getSrs() {
  try { return JSON.parse(localStorage.getItem(SRS_KEY)) || {}; } catch { return {}; }
}

function srsUpdate(it, remembered) {
  const all = getSrs();
  const cur = all[srsKey(it)] || { box: 0 };
  const box = remembered ? Math.min(cur.box + 1, SRS_DAYS.length - 1) : 0;
  all[srsKey(it)] = { box, due: today() + SRS_DAYS[box] };
  localStorage.setItem(SRS_KEY, JSON.stringify(all));
}

// Aaj dohraane wale cards (jo pehle dekhe the aur jinka time aa gaya)
function getDueItems() {
  const all = getSrs();
  const t = today();
  const byKey = {};
  [...getAllItems(), ...TRICK_ITEMS].forEach(it => { byKey[srsKey(it)] = it; });
  return Object.entries(all)
    .filter(([k, v]) => v.due <= t && byKey[k])
    .sort((a, b) => a[1].box - b[1].box)
    .map(([k]) => byKey[k]);
}

function srsStats() {
  const all = Object.values(getSrs());
  return { seen: all.length, due: getDueItems().length, strong: all.filter(v => v.box >= 3).length };
}

// Homophones: ek hi kana, alag matlab (はな = phool / naak). Flashcard pe kanji hint dikhane ke liye.
const KANA_COUNT = {};
[...WORD_ITEMS, ...PHRASE_ITEMS].forEach(w => {
  const k = normJP(w.kana);
  KANA_COUNT[k] = (KANA_COUNT[k] || 0) + 1;
});
function isHomophone(it) {
  return (KANA_COUNT[normJP(it.kana)] || 0) > 1;
}

function levelTitle(level) {
  const s = SYLLABUS.find(x => x.level === Number(level));
  return s ? `Level ${s.level}: ${s.title}` : "Sab levels mix";
}

// Level select dropdown ke options
function levelOptions(selected, includeAll = true) {
  const opts = SYLLABUS.map(s =>
    `<option value="${s.level}" ${String(selected) === String(s.level) ? "selected" : ""}>Level ${s.level}: ${esc(s.title)}</option>`);
  if (includeAll) opts.push(`<option value="all" ${selected === "all" ? "selected" : ""}>🔀 Sab levels mix</option>`);
  return opts.join("");
}
