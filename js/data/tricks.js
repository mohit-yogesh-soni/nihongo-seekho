// 🧠 Jaldi seekhne ki tricks: techniques, patterns, shortcuts.
// Example rows ka format words.js jaisa hai: [Japanese, kana, romaji, English, Hinglish]
// Sources (research) har section ke "src" mein hain.

// ===================== 1. Seekhne ke tareeke (study methods) =====================
const STUDY_METHODS = [
  { icon: "🔁", title: "Spaced repetition (bhoolne se pehle dohrao)",
    text: "Dimaag naya word 1-2 din mein bhool jaata hai. Agar theek bhoolne se pehle dohraoge (1 din, 3 din, 1 hafta, 2 hafte...), to word lambe time tak yaad rehta hai. Is website ka 🔁 Revision button yahi karta hai: jo word yaad tha wo der se wapas aata hai, jo bhool gaye wo jaldi.",
    where: "learn.html?revise=1", whereLabel: "🔁 Aaj ka revision",
    src: [["Ek study: roz ~3 minute spaced practice se lambe time ki vocabulary retention lagbhag 3 guna hui", "https://files.eric.ed.gov/fulltext/EJ1143520.pdf"]] },
  { icon: "🎯", title: "Active recall (khud ko test karo, sirf padho mat)",
    text: "Baar baar padhne se zyada faayda khud se yaad karne mein hai. Flashcard pe pehle khud socho, phir jawaab dekho. Listen quiz bhi yahi karta hai. Galat hona bhi theek hai, wahi yaad ko mazboot banata hai.",
    where: "listen.html", whereLabel: "👂 Listen quiz",
    src: [["Retrieval practice (yaad karke nikaalna) se words zyada yaad rehte hain", "https://pmc.ncbi.nlm.nih.gov/articles/PMC8126157/"]] },
  { icon: "🗣️", title: "Shadowing (suno aur turant saath mein bolo)",
    text: "Awaaz sunte hi uske peeche-peeche wahi bolo, same speed aur tune mein. Isse accent, speed aur 'tune' (intonation) sudharti hai. Research kehta hai ye kaafi madad karta hai, lekin akela jaadu nahi hai: saath mein words aur grammar bhi chahiye.",
    where: "speak.html?mode=shadow", whereLabel: "🔁 Shadowing",
    src: [["Oxford review: shadowing pe 44 studies", "https://ora.ox.ac.uk/objects/uuid:3104cae1-3a6b-400a-b173-de44384238d2/files/r1z40kv86w"],
          ["Video shadowing se intonation mein sudhaar", "http://files.eric.ed.gov/fulltext/EJ1459868.pdf"]] },
  { icon: "📦", title: "Akele words nahi, poore chunks yaad karo",
    text: "\"いただきます\", \"だいじょうぶ？\", \"ちょっと まって\" jaise poore phrases ek saath yaad karo, jaise bachpan mein 'How are you?' yaad kiya tha. Bolte waqt sochna nahi padta, seedha muh se nikalta hai.",
    where: "learn.html?level=5", whereLabel: "Level 5: Phrases" },
  { icon: "🖼️", title: "Picture aur kahaani se yaad karo (mnemonics)",
    text: "Har letter aur kanji ke saath ek chhoti si kahaani ya picture jodo: き chaabi (key) jaisa dikhta hai, 休 = insaan (亻) ped (木) ke saath aaraam kar raha hai. Ajeeb ya funny kahaani zyada yaad rehti hai. Website pe har letter ke saath 🧠 trick di hai.",
    src: [["Memory techniques milake use karne se L2 words zyada seekhe aur yaad rahe", "https://journals.sagepub.com/doi/10.1177/13621688211053525"]] },
  { icon: "⏱️", title: "Roz thoda, hafte mein ek baar bahut nahi",
    text: "Roz 15 minute, hafte ke ek din 2 ghante se kahin better hai. Streak mat todo: busy din pe sirf 3 minute revision bhi chalega." },
  { icon: "📢", title: "Zor se bolo, man mein nahi",
    text: "Muh ki muscles ko bhi practice chahiye. Har 🔊 ke baad 2-3 baar zor se bolo. Akele ho to apne din ke baare mein Japanese mein bolo: \"いま、ごはんを たべます\"." },
  { icon: "🎌", title: "Anime ka sahi istemaal",
    text: "Sirf English subtitles se anime dekhne se Japanese nahi aati. Better tareeka: (1) chhota scene chuno, (2) pehle English subs ke saath samjho, (3) phir Japanese subs ya bina subs dobara dekho, (4) 2-3 lines pause karke shadow karo. Ek hi episode kai baar dekhna naye episode se zyada sikhata hai. Yaad rakho: anime ki language casual aur dramatic hoti hai, dukaan/office mein polite です/ます bolo.",
    where: "learn.html?level=7", whereLabel: "Level 7: Conversations",
    src: [["Anime ke saath active techniques (shadowing, lookup) zaroori hain", "https://www.italki.com/en/blog/how-to-learn-japanese-through-anime"],
          ["Japanese subs, pause, repeat; anime casual hota hai", "https://www.japannakama.co.uk/language/anime-to-learn-japanese/"]] },
  { icon: "🆓", title: "Katakana = muft ki vocabulary",
    text: "Hazaaron Japanese words English se aaye hain: テレビ (TV), コーヒー (coffee), スマホ (smartphone). Katakana ke conversion rules seekh lo (Level 3), to bahut saare words bina ratt ke samajh aa jaayenge.",
    where: "learn.html?level=3", whereLabel: "Level 3: Katakana rules",
    src: [["English words katakana mein predictable patterns se badalte hain", "https://jpyokoso.com/katakana-words-english-speakers/"]] },
  { icon: "🧩", title: "Kanji ke tukde (radicals) pehchano",
    text: "Kanji random nahi hote. Unke andar chhote tukde (radicals) matlab ka hint dete hain: 氵 = paani (海 samundar, 泳 tairna). Ek count ke hisaab se sirf 20 radicals ~51% common (jouyou) kanji mein radical ke roop mein aate hain.",
    where: "learn.html?level=8", whereLabel: "Level 8: Radicals",
    src: [["20 radicals ≈ 51% jouyou kanji", "https://my-senpai.com/insights/kanji-radicals/"]] },
  { icon: "😅", title: "Galti se mat daro",
    text: "Goal perfect bolna nahi, samjha dena hai. Japanese log foreigners ki koshish ki bahut tareef karte hain (\"にほんご じょうず！\"). Galat bolke seekhna, chup rehne se better hai." }
];

const DAILY_ROUTINE = [
  ["3 min", "🔁 Revision", "Purane cards dohrao (spaced repetition)", "learn.html?revise=1"],
  ["5 min", "📖 Naya lesson", "5-10 naye words ya 1 grammar pattern. Har ek ko 🔊 suno aur zor se bolo", "learn.html"],
  ["4 min", "🗣️ Shadowing", "Aaj ke words/phrases ki shadowing, earphones lagake", "speak.html?mode=shadow"],
  ["3 min", "👂 Listen quiz", "10 sawaal. Ya ek anime scene ki 2-3 lines repeat karo", "listen.html"]
];

const ROADMAP = [
  ["Hafta 1", "Level 0 + Hiragana ki pehli 5 lines (あ se な tak)", "learn.html?level=1"],
  ["Hafta 2", "Baaki Hiragana + ゛゜ + Level 2 (A for Apple words)", "learn.html?level=2"],
  ["Hafta 3-4", "Katakana + English → Katakana rules", "learn.html?level=3"],
  ["Hafta 5-8", "Level 4 words (~100 per hafta) + Level 5 phrases", "learn.html?level=4"],
  ["Hafta 9-10", "Level 6 grammar (2-3 patterns per hafta) + verb endings decoder", "learn.html?level=6"],
  ["Hafta 11-12", "Level 7 conversations, role-play, anime scenes Japanese subs ke saath", "learn.html?level=7"],
  ["Uske baad", "Level 8 kanji + Scribble, aur roz revision chalu rakho", "learn.html?level=8"]
];

// ===================== 2. Pronunciation tricks (Level 0) =====================
const PRONUNCIATION_TRICKS = [
  { title: "Chupke se gaayab 'u' aur 'i' (devoicing)",
    text: "Jab い ya う do 'bina awaaz' wale consonants (k, s, t, h, p) ke beech ya end mein aate hain, to wo almost whisper ho jaate hain. です = 'des', します = 'shimas', すき = 'ski'. Isse aapka Japanese natural lagega.",
    src: [["Silent vowels guide", "https://jpyokoso.com/japanese-pronunciation-silent-vowels/"]],
    examples: [["です","です","desu","is / am (polite)","Bolo: 'des' (u halka)"],
               ["します","します","shimasu","(I) do","Bolo: 'shimas'"],
               ["好き","すき","suki","like","Bolo: 'ski'"]] },
  { title: "ou = lamba 'o', ei = lamba 'e'",
    text: "Likhte おう hain, bolte lamba 'oo'. Likhte えい hain, bolte lamba 'ee'. Lamba-chhota galat bola to matlab badal sakta hai.",
    examples: [["先生","せんせい","sensei","teacher","Bolo: 'sen-see'"],
               ["学校","がっこう","gakkou","school","Bolo: 'gak-koo'"],
               ["おばあさん","おばあさん","obaasan","grandmother","Lamba 'baa' = daadi. Chhota (おばさん) = aunty"]] },
  { title: "ん ki awaaz badalti hai",
    text: "ん agle letter ke hisaab se badalta hai. b/p/m se pehle 'm' jaisa: さんぽ = 'sampo', しんぶん = 'shimbun'. k/g se pehle 'ng' jaisa: りんご = 'ringo'. Ye khud ho jaata hai, bas suno.",
    examples: [["散歩","さんぽ","sanpo","a walk","Bolo: 'sampo'"],
               ["新聞","しんぶん","shinbun","newspaper","Bolo: 'shimbun'"],
               ["りんご","りんご","ringo","apple","'ng' jaisa"]] },
  { title: "Tune (pitch) se matlab badalta hai",
    text: "Kuch words ek jaise likhe jaate hain par tune alag hoti hai: はし = pul (bridge) ya chopsticks. Shuru mein pitch ki tension mat lo, context se samajh aa jaata hai. Bas 🔊 ki tune copy karo.",
    examples: [["橋","はし","hashi","bridge","Pul"],["箸","はし","hashi","chopsticks","Chopsticks"],["雨","あめ","ame","rain","Baarish (飴 あめ = toffee bhi!)"]] },
  { title: "Particles ki ulti padhai: は = wa, へ = e, を = o",
    text: "Jab ye letters grammar ke particle hon: は 'wa' padhte hain (わたしは = watashi wa), へ 'e' (にほんへ = nihon e), を 'o' (みずを = mizu o). Normal word mein normal: はな = hana.",
    examples: [["私は","わたしは","watashi wa","I (topic)","は = 'wa'"],["日本へ","にほんへ","nihon e","to Japan","へ = 'e'"],["水を","みずを","mizu o","water (object)","を = 'o'"]] },
  { title: "Do words jude to awaaz bhaari (rendaku)",
    text: "Jab do words jud ke naya word bante hain, to doosre word ki pehli awaaz aksar bhaari ho jaati hai (゛ lag jaata hai): ひと + ひと = ひとびと, はな + ひ = はなび. Isliye ガンジスがわ mein か 'ga' ban gaya.",
    src: [["Rendaku explained", "https://www.tofugu.com/japanese/rendaku/"]],
    examples: [["人々","ひとびと","hitobito","people","ひと + ひと → ひと'び'と"],
               ["花火","はなび","hanabi","fireworks","はな (phool) + ひ (aag) → はな'び'. Aag ke phool!"],
               ["折り紙","おりがみ","origami","origami","おり (modna) + かみ (kaagaz) → おり'が'み"],
               ["青空","あおぞら","aozora","blue sky","あお (neela) + そら (aasmaan) → あお'ぞ'ら"]] }
];

// ===================== 3. Kana tricks (Level 1 & 3) =====================
// Har letter ki picture-kahaani (mnemonic), Hinglish mein
const KANA_MNEMONIC = {
  "あ":"Cross (+) ke neeche ek gol chakkar: andar ek cursive 'a' chhupa hai. A for あ!",
  "い":"Do seedhi lines jaise do 'i' ek saath khade: ii.",
  "う":"Upar chhota dash, neeche mudi line: jaise side se dekha 'u'.",
  "え":"Upar topi, neeche zig-zag pair: koi 'Eh!' bolke bhaag raha hai.",
  "お":"あ jaisa, lekin side mein ek extra boond: 'O!' kuch gir gaya.",
  "か":"Ek aadmi aur side mein ek dash: 'Ka'. か mein side dash hota hai, カ mein nahi.",
  "き":"Chaabi (key) 🔑 jaisa dikhta hai: KEY = ki.",
  "く":"Koyal ki khuli choonch '<': ku-ku!",
  "け":"Kele ka ped 🍌: left mein tana, right mein patte. Kela = ke.",
  "こ":"Do lines aamne-saamne, jaise do koyle (coal) ke tukde: ko.",
  "さ":"Upar cross, neeche mud: jhuki daadhi wala saadhu: sa.",
  "し":"Machhli ka kaanta (hook) 🪝: shikaar = shi.",
  "す":"Rassi mein gaanth aur latka jhoola: swing = su.",
  "せ":"Muh khola aur ek daant bahar: selfie smile = se.",
  "そ":"Zig-zag mudi line: soya hua saanp = so.",
  "た":"Left mein 't', right mein 'a' jaisa: t + a = ta.",
  "ち":"Number 5 jaisa dikhta hai: 5 chidiyaan = chi.",
  "つ":"Samundar ki ek leher 🌊: tsunami = tsu.",
  "て":"Mudi hui 'T': te.",
  "と":"Pair ke angoothe (toe) mein kaanta chubha: toe = to.",
  "な":"Cross, side mein boond, neeche gaanth: nadi mein naav ki rassi = na.",
  "に":"Left mein line, right mein こ: ghutna (knee) mod ke baitha aadmi = ni.",
  "ぬ":"Chopsticks pe lipte noodles 🍜 (neeche loop): noodles = nu. め mein loop nahi.",
  "ね":"Billi (ねこ) ki ghoomti poonch, neeche loop: neko = ne.",
  "の":"Bada gol 'No!' 🚫 sign: no.",
  "は":"Ek line aur saath mein 'ha' jaisa hissa: hansta hua 'ha ha'.",
  "ひ":"Muskurata muh 😁: hi hi hi!",
  "ふ":"Mount Fuji 🗻 ke upar baadal: Fuji = fu.",
  "へ":"Chhota pahad ^: upar chadhne ke liye 'help' = he. Hiragana-katakana dono same!",
  "ほ":"は jaisa, ek extra line: Santa extra hansta hai 'ho ho ho'.",
  "ま":"Cross ke neeche loop: maa ki choti (hair bun) = ma.",
  "み":"21 likha jaisa dikhta hai: 21 minute = mi.",
  "む":"Gaay ka chehra aur seeng: 'moo' = mu 🐄.",
  "め":"ぬ jaisa bina loop. め ka matlab hi aankh (eye) hai 👁️: me.",
  "も":"Machhli ka kaanta, aur zyada kaante: 'more' = mo.",
  "や":"Yak 🐃 ke seeng: yak = ya.",
  "ゆ":"Machhli U-turn le rahi: U-turn = yu.",
  "よ":"Yo-yo ki dori ghoom rahi: yo-yo = yo.",
  "ら":"Khargosh (rabbit) 🐰 ka kaan aur gol pet: rabbit = ra.",
  "り":"Do lines jaise nadi (river) ke do kinare: ri.",
  "る":"Neeche chhota loop: rassi (rope) mein gaanth = ru. ろ mein loop nahi hota.",
  "れ":"ね jaisa, lekin poonch loop banaye bina bahar nikal jaati hai: re.",
  "ろ":"る bina loop: seedhi road = ro.",
  "わ":"Poonch andar mud gayi (ね/れ se alag): 'Wah!' = wa.",
  "を":"Ek aadmi jhuk ke cheez utha raha hai: object utha raha hai, aur を object ka particle hai: o.",
  "ん":"Chhota likha hua 'n' jaisa: n.",
  // Katakana
  "ア":"Kulhaadi (axe) 🪓 ka sira: Axe = a.",
  "イ":"Jhuka hua insaan (亻 jaisa): insaan = i.",
  "ウ":"う ko topi pehnaa di: u.",
  "エ":"Elevator ka I-beam khamba: elevator = e.",
  "オ":"Plus (+) ke saath jhuki line: opera singer haath faila ke 'Oh!' = o.",
  "カ":"か jaisa, bina side dash: ka.",
  "キ":"き wali chaabi, bina neeche ke gol: ki.",
  "ク":"Upar se dekhi koyal ki choonch: ku.",
  "ケ":"'K' jaisa dikhta hai: ke.",
  "コ":"Box ka kona (corner): kona = ko.",
  "サ":"Do khambe aur ek mudi line: sabzi ki tokri = sa.",
  "シ":"Do boondein LEFT side, lambi line NEECHE se UPAR: smile = shi. ツ se ulta!",
  "ス":"Khadi sui aur latka dhaaga: sui = su.",
  "セ":"せ jaisa: se.",
  "ソ":"Ek boond aur lambi line UPAR se NEECHE: so. ン mein neeche se upar.",
  "タ":"ク ke andar ek line: ta.",
  "チ":"ち jaisa, upar ek dash: chi.",
  "ツ":"Do boondein UPAR, lambi line UPAR se NEECHE: tsunami ki leher upar se girti = tsu.",
  "テ":"て ke upar ek line: te.",
  "ト":"Khamba aur ek kaanta: totem pole = to.",
  "ナ":"Cross ki ek line mud gayi: naav ka mast = na.",
  "ニ":"Do lines = 2. Aur 二 (ni) ka matlab bhi do hai!",
  "ヌ":"Noodles pe crossed chopsticks ✕: noodles = nu.",
  "ネ":"Topi wala aadmi necktie 👔 pehne: necktie = ne.",
  "ノ":"Bas ek akeli line: 'No', aur kuch nahi = no.",
  "ハ":"Do lines khulti hui, jaise hansi 'ha': ha. (八 = 8 jaisa)",
  "ヒ":"ひ ka chhota, seedha version: hi.",
  "フ":"ふ ka upar wala hissa / adha Fuji: fu.",
  "ヘ":"へ jaisa, bilkul same: he.",
  "ホ":"ほ ka right hissa: holy cross = ho.",
  "マ":"Ulti 7 aur andar dash: mama ki naak = ma.",
  "ミ":"Teen lines = みっつ (teen cheezein) ka 'mi'.",
  "ム":"Gaay ki naak jaisa triangle: moo = mu.",
  "メ":"✕ cross: 'meh', galat nishaan = me.",
  "モ":"も jaisa: mo.",
  "ヤ":"や jaisa, yak ke seeng: ya.",
  "ユ":"U-turn: yu.",
  "ヨ":"Ulta 'E': yo.",
  "ラ":"ら jaisa, upar line: ra.",
  "リ":"り jaisa: ri.",
  "ル":"Do pair, ek mud ke bhaag raha: run = ru.",
  "レ":"'L' jaisa! Japanese 'r' = r/l: re.",
  "ロ":"Box ⬜ = room = ro (口 kanji = muh bhi aisa hi).",
  "ワ":"ウ bina topi: wa.",
  "ヲ":"フ ke beech mein line. Bahut rare hai: o.",
  "ン":"Ek boond aur line NEECHE se UPAR: n. ソ se ulta!"
};

const LOOKALIKES = [
  { a: "さ", b: "ち", tip: "さ (sa) ka mod RIGHT ki taraf khulta, ち (chi) ka LEFT ki taraf (number 5 jaisa)." },
  { a: "ぬ", b: "め", tip: "ぬ (nu) ke neeche loop hai (noodles lipte), め (me) mein nahi." },
  { a: "ね", b: "れ / わ", tip: "ね (ne) loop banata, れ (re) poonch bahar, わ (wa) poonch andar gol." },
  { a: "る", b: "ろ", tip: "る (ru) neeche loop, ろ (ro) seedha." },
  { a: "は", b: "ほ", tip: "ほ (ho) mein upar ek extra line (Santa ka extra 'ho')." },
  { a: "い", b: "り", tip: "い (i) ki dono lines barabar chhoti, り (ri) ki right line lambi." },
  { a: "シ", b: "ツ", tip: "シ (shi): boondein left side, line neeche se upar. ツ (tsu): boondein upar, line upar se neeche." },
  { a: "ソ", b: "ン", tip: "ソ (so): line upar se neeche. ン (n): line neeche se upar (jaise シ)." },
  { a: "ク", b: "タ / ケ", tip: "タ (ta) = ク + andar ek line. ケ (ke) = 'K' jaisa dikhta hai." },
  { a: "ウ", b: "ワ / フ", tip: "ウ (u) mein topi, ワ (wa) mein topi nahi, フ (fu) mein khamba bhi nahi." },
  { a: "コ", b: "ユ / ロ", tip: "コ (ko) ki dono lines barabar. ユ (yu) ki neeche wali line lambi aur bahar nikli. ロ (ro) poora band box." },
  { a: "ノ", b: "メ", tip: "ノ (no) ek line, メ (me) do lines ✕." }
];

const SAME_SHAPE_PAIRS = [
  ["か","カ"],["き","キ"],["へ","ヘ"],["り","リ"],["せ","セ"],["も","モ"],["や","ヤ"],["こ","コ"],["に","ニ"]
];

// ===================== 4. Katakana conversion rules (Level 3) =====================
const KATAKANA_RULES = [
  { title: "Har consonant ke baad vowel lagta hai", text: "Japanese mein (ん ke alaawa) har awaaz vowel pe khatam hoti hai. Isliye end mein 'u' jud jaata hai, aur t/d ke baad 'o'.",
    examples: [["ゲーム","ゲーム","geemu","game","game → gee-mu"],["テスト","テスト","tesuto","test","t-e-s-t → te-su-to"],["ベッド","ベッド","beddo","bed","d ke baad 'o': bed-do"]] },
  { title: "End ka -er / -or / -ar = lamba 'aa' (ー)", text: "English ke end wala 'er' Japanese mein ー (lambi awaaz) ban jaata hai.",
    examples: [["コンピューター","コンピューター","konpyuutaa","computer","compu-ter → kon-pyuu-taa"],["エレベーター","エレベーター","erebeetaa","elevator","ele-va-tor → e-re-bee-taa"],["サッカー","サッカー","sakkaa","soccer","soc-cer → sak-kaa"]] },
  { title: "L → R", text: "Japanese mein 'L' nahi hai, isliye 'r' (jo r/l ke beech hai) use hota hai.",
    examples: [["レモン","レモン","remon","lemon","lemon → remon"],["ホテル","ホテル","hoteru","hotel","hotel → hoteru"],["ルール","ルール","ruuru","rule","rule → ruuru"]] },
  { title: "V → B", text: "'V' ki awaaz bhi nahi hoti, to 'b' ban jaati hai.",
    examples: [["テレビ","テレビ","terebi","TV","television → terebi"],["ビデオ","ビデオ","bideo","video","video → bideo"],["バイオリン","バイオリン","baiorin","violin","violin → baiorin"]] },
  { title: "TH → S / Z", text: "'th' ki jagah 's' ya 'z'.",
    examples: [["サンキュー","サンキュー","sankyuu","thank you","thank you → san-kyuu"],["マラソン","マラソン","marason","marathon","marathon → marason"]] },
  { title: "Chhota vowel + consonant = chhota ッ (pause)", text: "English mein jahan chhota, jhatke wala vowel ho (bed, cup, bag), wahan ッ lagta hai.",
    examples: [["カップ","カップ","kappu","cup","cup → kap-pu"],["バッグ","バッグ","baggu","bag","bag → bag-gu"],["チケット","チケット","chiketto","ticket","ticket → chi-ket-to"]] },
  { title: "Lambe words chhote kar dete hain", text: "Japanese log lambe English words ko kaat ke chhota kar dete hain. Pehla hissa + doosre ka pehla hissa.",
    examples: [["スマホ","スマホ","sumaho","smartphone","SMArt-PHOne → suma-ho"],["パソコン","パソコン","pasokon","PC (personal computer)","PerSOnal COMputer → paso-kon"],["コンビニ","コンビニ","konbini","convenience store","CONVENIence → konbini"],["リモコン","リモコン","rimokon","remote control","REMOte CONtrol → rimo-kon"]] },
  { title: "⚠️ Made-in-Japan English (matlab alag!)", text: "Kuch katakana words English jaise lagte hain par matlab alag hai (wasei-eigo). Inse dhoka mat khaana!",
    examples: [["マンション","マンション","manshon","apartment / flat","'Mansion' nahi, normal flat 🏢"],["カンニング","カンニング","kanningu","cheating (in an exam)","'Cunning' se bana, matlab exam mein nakal"],["サラリーマン","サラリーマン","sarariiman","office worker","'Salary man' = naukri-pesha aadmi"],["ペットボトル","ペットボトル","pettobotoru","plastic bottle","PET bottle = plastic ki bottle"]] }
];

// ===================== 5. Word endings & beginnings (Level 4) =====================
// Ek ending seekho → dus words samjho
const SUFFIXES = [
  { part: "〜人", read: "じん", meaning: "us desh ka insaan", hi: "Desh ke naam ke baad 人 (jin) = us desh ka aadmi.",
    examples: [["日本人","にほんじん","nihonjin","Japanese (person)","Japani"],["インド人","インドじん","indojin","Indian (person)","Hindustani"],["アメリカ人","アメリカじん","amerikajin","American (person)","Amreeki"]] },
  { part: "〜語", read: "ご", meaning: "bhasha", hi: "Desh ke naam ke baad 語 (go) = us desh ki bhasha.",
    examples: [["日本語","にほんご","nihongo","Japanese language","Japani bhasha"],["英語","えいご","eigo","English language","Angrezi"],["フランス語","フランスご","furansugo","French language","French bhasha"]] },
  { part: "〜屋", read: "や", meaning: "dukaan / dukaan wala", hi: "Cheez ke naam ke baad 屋 (ya) = us cheez ki dukaan.",
    examples: [["本屋","ほんや","hon'ya","bookstore","Kitaab ki dukaan"],["パン屋","パンや","pan'ya","bakery","Bread ki dukaan"],["花屋","はなや","hanaya","flower shop","Phool ki dukaan"],["ラーメン屋","ラーメンや","raamen'ya","ramen shop","Ramen ki dukaan"]] },
  { part: "〜者", read: "しゃ", meaning: "(kaam karne wala) insaan", hi: "者 (sha) = wo insaan jo ye kaam karta hai.",
    examples: [["医者","いしゃ","isha","doctor","Ilaaj (医) karne wala"],["学者","がくしゃ","gakusha","scholar","Vidwaan"],["記者","きしゃ","kisha","reporter","Patrakaar"]] },
  { part: "〜員", read: "いん", meaning: "member / staff", hi: "員 (in) = kisi jagah ka staff ya member.",
    examples: [["店員","てんいん","ten'in","shop staff","Dukaan ka staff"],["会社員","かいしゃいん","kaishain","office worker","Company ka member"],["駅員","えきいん","ekiin","station staff","Station ka staff"]] },
  { part: "〜家", read: "か", meaning: "expert / kalaakaar", hi: "家 (ka) = kisi kala ka expert. (Akela 家 = ghar, いえ)",
    examples: [["作家","さっか","sakka","writer","Lekhak"],["画家","がか","gaka","painter","Chitrakaar"],["音楽家","おんがくか","ongakuka","musician","Sangeetkaar"]] },
  { part: "〜生", read: "せい", meaning: "student", hi: "生 (sei) = padhne wala.",
    examples: [["学生","がくせい","gakusei","student","Student"],["大学生","だいがくせい","daigakusei","university student","College student"],["高校生","こうこうせい","koukousei","high school student","High school student"]] },
  { part: "〜館", read: "かん", meaning: "badi building", hi: "館 (kan) = public building.",
    examples: [["図書館","としょかん","toshokan","library","Kitaabon ki building"],["映画館","えいがかん","eigakan","cinema","Film ki building"],["大使館","たいしかん","taishikan","embassy","Doota-vaas"]] },
  { part: "〜室", read: "しつ", meaning: "kamra", hi: "室 (shitsu) = room.",
    examples: [["教室","きょうしつ","kyoushitsu","classroom","Padhaai ka kamra"],["会議室","かいぎしつ","kaigishitsu","meeting room","Meeting ka kamra"]] },
  { part: "〜場", read: "じょう", meaning: "jagah", hi: "場 (jou) = kisi kaam ki jagah.",
    examples: [["駐車場","ちゅうしゃじょう","chuushajou","parking lot","Gaadi khadi karne ki jagah"],["会場","かいじょう","kaijou","venue","Event ki jagah"]] },
  { part: "〜中", read: "ちゅう", meaning: "...chal raha hai", hi: "中 (chuu) = abhi wo kaam chal raha hai. Darwaze pe board dikhte hain!",
    examples: [["仕事中","しごとちゅう","shigotochuu","at work / working","Kaam chal raha hai"],["会議中","かいぎちゅう","kaigichuu","in a meeting","Meeting chal rahi hai"],["勉強中","べんきょうちゅう","benkyouchuu","studying","Padhaai chal rahi hai (aap abhi!)"]] },
  { part: "〜達", read: "たち", meaning: "log (plural)", hi: "達 (tachi) = log. Japanese mein normally plural nahi hota, ye ek tareeka hai.",
    examples: [["私達","わたしたち","watashitachi","we","Hum log"],["子供達","こどもたち","kodomotachi","children","Bachche log"]] },
  { part: "〜方", read: "かた", meaning: "...karne ka tareeka", hi: "Verb ke ます hata ke 方 (kata) = 'karne ka tareeka'.",
    examples: [["食べ方","たべかた","tabekata","way of eating","Khaane ka tareeka"],["読み方","よみかた","yomikata","way of reading","Padhne ka tareeka (kanji ki reading)"],["使い方","つかいかた","tsukaikata","how to use","Istemaal ka tareeka"]] },
  { part: "〜長", read: "ちょう", meaning: "head / mukhiya", hi: "長 (chou) = sabse bada (head).",
    examples: [["社長","しゃちょう","shachou","company president","Company ka head"],["校長","こうちょう","kouchou","principal","School ka head"]] },
  { part: "〜的", read: "てき", meaning: "-ish / ke type ka", hi: "的 (teki) = English '-al / -ic' jaisa.",
    examples: [["日本的","にほんてき","nihonteki","Japanese-style","Japani tarah ka"],["個人的","こじんてき","kojinteki","personal","Nijee (personally)"]] },
  { part: "〜目", read: "め", meaning: "...waan (number)", hi: "Number ke baad 目 (me) = pehla, doosra (order).",
    examples: [["一つ目","ひとつめ","hitotsume","the first one","Pehla wala"],["二回目","にかいめ","nikaime","the second time","Doosri baar"]] }
];

const PREFIXES = [
  { part: "お〜 / ご〜", meaning: "polite / izzat wala", hi: "Word ke aage お ya ご lagane se polite ho jaata hai. Japanese words pe お, Chinese wale pe ご (zyadatar).",
    examples: [["お茶","おちゃ","ocha","tea (polite)","Chai"],["お金","おかね","okane","money","Paisa"],["ご家族","ごかぞく","gokazoku","(your) family","Aapka parivaar"]] },
  { part: "毎〜", meaning: "har", hi: "毎 (mai) = har.",
    examples: [["毎日","まいにち","mainichi","every day","Har din"],["毎朝","まいあさ","maiasa","every morning","Har subah"],["毎週","まいしゅう","maishuu","every week","Har hafte"]] },
  { part: "今〜 / 来〜 / 先〜", meaning: "yeh / agla / pichhla", hi: "今 (kon) = is, 来 (rai) = agle, 先 (sen) = pichhle. 週 (hafta) aur 月 (mahina) ke saath.",
    examples: [["今週","こんしゅう","konshuu","this week","Is hafte"],["来週","らいしゅう","raishuu","next week","Agle hafte"],["先週","せんしゅう","senshuu","last week","Pichhle hafte"],["来月","らいげつ","raigetsu","next month","Agle mahine"]] },
  { part: "不〜", meaning: "a- / un- (ulta)", hi: "不 (fu) = nahi / ulta. Jaise Hindi mein 'a-' (asambhav).",
    examples: [["不便","ふべん","fuben","inconvenient","Asuvidha"],["不安","ふあん","fuan","anxiety / uneasy","Bechaini"]] },
  { part: "大〜", meaning: "bada / bahut", hi: "大 (dai) = bada ya bahut.",
    examples: [["大好き","だいすき","daisuki","love (like a lot)","Bahut pasand ❤️"],["大事","だいじ","daiji","important","Bahut zaroori"]] }
];

const WORD_PATTERNS = [
  { title: "い pe khatam = adjective (zyadatar)", text: "おいしい, たかい, おおきい: い pe khatam hone wale describing words. Negative: い → くない. Past: い → かった. (Dhyaan: きれい aur きらい い wale nahi, な wale hain.)",
    examples: [["高い","たかい","takai","expensive","Mehenga"],["高くない","たかくない","takakunai","not expensive","Mehenga nahi"],["高かった","たかかった","takakatta","was expensive","Mehenga tha"]] },
  { title: "な wale adjectives", text: "しずか, げんき, すき: noun se pehle な lagta hai. しずかな へや = shaant kamra.",
    examples: [["静かな部屋","しずかな へや","shizuka na heya","a quiet room","Shaant kamra"],["好きな食べ物","すきな たべもの","suki na tabemono","favourite food","Pasandida khaana"]] },
  { title: "Noun + する = naya verb", text: "Ek rule, sainkdon verbs! Kisi bhi 'kaam wale' noun ke baad する (karna) lagao. English words ke saath bhi chalta hai.",
    examples: [["勉強する","べんきょう する","benkyou suru","to study","Padhaai karna"],["電話する","でんわ する","denwa suru","to phone","Phone karna"],["コピーする","コピー する","kopii suru","to copy","Copy karna"]] },
  { title: "Adjective ka い → さ = noun", text: "たかい (ooncha) → たかさ (oonchaai). Size, lambai, garmi sab aise banta hai.",
    examples: [["高さ","たかさ","takasa","height","Oonchaai"],["大きさ","おおきさ","ookisa","size","Size"]] },
  { title: "〜すぎる = zarurat se zyada", text: "Verb ka ます hatao ya adjective ka い hatao, phir すぎる: 'bahut zyada'.",
    examples: [["食べすぎる","たべすぎる","tabesugiru","to overeat","Zyada kha lena 🤢"],["高すぎる","たかすぎる","takasugiru","too expensive","Bahut zyada mehenga"]] },
  { title: "〜やすい / 〜にくい = aasaan / mushkil", text: "Verb ka ます hata ke やすい = karna aasaan, にくい = karna mushkil.",
    examples: [["読みやすい","よみやすい","yomiyasui","easy to read","Padhne mein aasaan"],["分かりにくい","わかりにくい","wakarinikui","hard to understand","Samajhne mein mushkil"]] },
  { title: "〜そう = lag raha hai", text: "Adjective ka い hata ke そう = 'aisa lag raha hai'. Khana dekh ke bolo: おいしそう!",
    examples: [["美味しそう","おいしそう","oishisou","looks delicious","Tasty lag raha hai! 🤤"],["楽しそう","たのしそう","tanoshisou","looks fun","Mazedaar lag raha hai"]] }
];

// Ginti ke shabd (counters). Cheez ki shape ke hisaab se alag!
const COUNTERS = [
  { part: "〜人 (にん)", meaning: "log ginna", hi: "1 aur 2 alag hain: ひとり, ふたり. Phir number + にん (4 = よにん).",
    examples: [["一人","ひとり","hitori","one person","Ek aadmi"],["二人","ふたり","futari","two people","Do log"],["三人","さんにん","sannin","three people","Teen log"],["四人","よにん","yonin","four people","Chaar log"]] },
  { part: "〜つ", meaning: "koi bhi cheez (1-10)", hi: "Shape na pata ho to ye use karo! ひとつ, ふたつ, みっつ... sab cheezon pe chalta hai.",
    examples: [["一つ","ひとつ","hitotsu","one (thing)","Ek cheez"],["三つ","みっつ","mittsu","three (things)","Teen cheezein"]] },
  { part: "〜本 (ほん)", meaning: "lambi patli cheezein", hi: "Pen, bottle, ped, chhatri. Awaaz badalti hai: いっぽん, にほん, さんぼん.",
    examples: [["一本","いっぽん","ippon","one (long thing)","Ek (pen/bottle)"],["三本","さんぼん","sanbon","three (long things)","Teen (pen/bottle)"]] },
  { part: "〜枚 (まい)", meaning: "patli chapti cheezein", hi: "Kaagaz, shirt, ticket, plate.",
    examples: [["一枚","いちまい","ichimai","one (flat thing)","Ek (kaagaz/shirt)"],["二枚","にまい","nimai","two (flat things)","Do (kaagaz/shirt)"]] },
  { part: "〜匹 (ひき)", meaning: "chhote janwar", hi: "Billi, kutta, machhli. いっぴき, にひき, さんびき.",
    examples: [["一匹","いっぴき","ippiki","one (small animal)","Ek (billi/kutta)"],["三匹","さんびき","sanbiki","three (small animals)","Teen (billi/kutta)"]] },
  { part: "〜回 (かい)", meaning: "kitni baar", hi: "いっかい = ek baar, にかい = do baar.",
    examples: [["一回","いっかい","ikkai","once","Ek baar"],["二回","にかい","nikai","twice","Do baar"]] },
  { part: "〜歳 (さい)", meaning: "umar", hi: "Number + さい. Special: 20 saal = はたち.",
    examples: [["三歳","さんさい","sansai","three years old","Teen saal ka"],["二十歳","はたち","hatachi","twenty years old","Bees saal ka (special word!)"]] },
  { part: "〜時 / 〜分", meaning: "baje / minute", hi: "Dhyaan: 4 baje = よじ (yonji nahi), 9 baje = くじ. Minute: いっぷん, にふん, さんぷん.",
    examples: [["四時","よじ","yoji","four o'clock","4 baje"],["九時","くじ","kuji","nine o'clock","9 baje"],["一分","いっぷん","ippun","one minute","1 minute"],["五分","ごふん","gofun","five minutes","5 minute"]] }
];

// ===================== 6. Grammar shortcuts (Level 6) =====================
const VERB_GROUP_RULE = {
  text: "Japanese verbs ke 3 group hain, aur group se pata chalta hai ending kaise badlegi:",
  steps: [
    "1️⃣ Agar verb る pe khatam NAHI hota (いく, のむ, はなす) → う-verb (Group 1). Pakka.",
    "2️⃣ Agar る se pehle 'a/u/o' awaaz hai (わかる, つくる, とる) → う-verb. Pakka.",
    "3️⃣ Agar る se pehle 'i/e' awaaz hai (たべる, みる, おきる) → zyadatar る-verb (Group 2). Bas ending る hatao aur kuch bhi lagao: たべ+ます, たべ+たい.",
    "⚠️ Exceptions (i/e + る lekin う-verb): かえる (ghar jaana), はいる (andar jaana), はしる (daudna), しる (jaanna), きる (kaatna).",
    "3️⃣ Irregular sirf 2: する (karna) aur くる (aana). Inhe alag se yaad karo."
  ],
  src: [["る-verb ya う-verb kaise pehchaanein", "https://guidetojapanese.org/learn/complete/negativeverbs"]]
};

// Verb ki ending dekh ke matlab samjho (anime decoder!)
const VERB_ENDINGS = [
  { end: "〜ます", meaning: "karta hoon / karunga (polite)", ex: ["食べます","たべます","tabemasu","(I) eat (polite)","Khaata hoon"] },
  { end: "〜ません", meaning: "nahi karta (polite)", ex: ["食べません","たべません","tabemasen","(I) don't eat (polite)","Nahi khaata"] },
  { end: "〜ました", meaning: "kiya (polite, past)", ex: ["食べました","たべました","tabemashita","(I) ate (polite)","Khaaya"] },
  { end: "〜ない", meaning: "nahi (casual)", ex: ["行かない","いかない","ikanai","(I) won't go","Nahi jaaunga"] },
  { end: "〜た / 〜だ", meaning: "kiya (casual, past)", ex: ["食べた","たべた","tabeta","ate","Kha liya"] },
  { end: "〜なかった", meaning: "nahi kiya (casual)", ex: ["見なかった","みなかった","minakatta","didn't see","Nahi dekha"] },
  { end: "〜たい", meaning: "karna chahta hoon", ex: ["行きたい","いきたい","ikitai","want to go","Jaana chahta hoon"] },
  { end: "〜て", meaning: "aur / please (jod)", ex: ["待って","まって","matte","wait! / please wait","Ruko!"] },
  { end: "〜てる / 〜ている", meaning: "kar raha hoon (-ing)", ex: ["食べてる","たべてる","tabeteru","is eating","Kha raha hai"] },
  { end: "〜よう / 〜おう", meaning: "chalo karte hain (casual)", ex: ["行こう","いこう","ikou","let's go","Chalo chalein!"] },
  { end: "〜られる / 〜える", meaning: "kar sakta hoon", ex: ["食べられる","たべられる","taberareru","can eat","Kha sakta hoon"] },
  { end: "〜ろ / 〜え (command)", meaning: "karo! (rough hukum)", ex: ["逃げろ","にげろ","nigero","run away!","Bhaago! (anime mein bahut)"] },
  { end: "dictionary form + な", meaning: "mat karo! (rough)", ex: ["行くな","いくな","iku na","don't go!","Mat jaao! (rough)"] },
  { end: "〜ないで", meaning: "mat karo (soft request)", ex: ["行かないで","いかないで","ikanaide","please don't go","Mat jaao na 🥺"] },
  { end: "〜ちゃう / 〜ちゃった", meaning: "ho gaya (galti se / poora)", ex: ["食べちゃった","たべちゃった","tabechatta","(oops) ate it all","Kha gaya (galti se) 😅"] },
  { end: "〜なきゃ", meaning: "karna hi padega", ex: ["行かなきゃ","いかなきゃ","ikanakya","(I) have to go","Jaana padega"] },
  { end: "〜たら", meaning: "agar / jab", ex: ["勝ったら","かったら","kattara","if (I) win","Agar jeet gaya to"] },
  { end: "〜てもいい", meaning: "kar sakta hoon? (permission)", ex: ["食べてもいい","たべても いい","tabete mo ii","may I eat? / it's ok to eat","Kha sakta hoon?"] },
  { end: "〜ちゃだめ", meaning: "mat karna (mana hai)", ex: ["見ちゃだめ","みちゃ だめ","micha dame","you mustn't look","Dekhna mana hai!"] }
];

// Sentence ke end ke chhote words: feeling batate hain
const SENTENCE_ENDINGS = [
  ["〜ね","ne","na? (agree karwana)","いいね！ = Achha hai na!"],
  ["〜よ","yo","yaar, sach mein (batana)","だいじょうぶだよ = Theek hai yaar"],
  ["〜か","ka","sawaal (?)","ですか？ = Hai kya?"],
  ["〜かな","kana","pata nahi... (sochna)","あめ かな = Baarish hogi kya, pata nahi"],
  ["〜ぞ / 〜ぜ","zo / ze","josh wala (ladke, anime heroes)","いくぞ！ = Chalo! 🔥"],
  ["〜な","na","casual 'na' (ladke)","すごいな = Zabardast hai na"],
  ["〜の","no","soft sawaal / explain","どうしたの？ = Kya hua?"],
  ["〜じゃん","jan","'dekha na!' (casual)","いいじゃん = Achha hai na! (casual slang)"],
  ["〜でしょ / 〜だろ","desho / daro","hai na? (pakka lagta hai)","そうでしょ？ = Aisa hi hai na?"],
  ["〜わ","wa","soft (ladkiyan, anime mein)","いいわ = Theek hai"],
  ["〜っす","ssu","casual です (junior → senior)","そうっす = Haan ji (anime juniors)"]
];

// Bolte waqt words chhote ho jaate hain (casual contractions)
const CONTRACTIONS = [
  ["〜ている → 〜てる","みている → みてる","dekh raha hoon"],
  ["〜てしまう → 〜ちゃう","たべてしまった → たべちゃった","(galti se) kha gaya"],
  ["〜なければ → 〜なきゃ","いかなければ → いかなきゃ","jaana padega"],
  ["〜ては → 〜ちゃ","みては だめ → みちゃ だめ","dekhna mana hai"],
  ["〜のだ → 〜んだ","いくのだ → いくんだ","jaa raha hoon (explain)"],
  ["〜と言った → 〜って","「すき」と いった → すきって","'pasand hai' bola"],
  ["では → じゃ","にほんじん では ない → にほんじん じゃない","Japanese nahi hai"],
  ["〜ておく → 〜とく","やっておく → やっとく","kar ke rakh dunga"]
];

const ANIME_SPEECH = [
  ["俺","おれ","ore","I (rough, boys)","Main (tough heroes)"],
  ["僕","ぼく","boku","I (soft, boys)","Main (seedha-saadha ladka)"],
  ["あたし","あたし","atashi","I (girls, casual)","Main (ladkiyan, casual)"],
  ["お前","おまえ","omae","you (rough)","Tu"],
  ["貴様","きさま","kisama","you (very rude!)","Tu (dushman ke liye, gaali jaisa) 😠"],
  ["てめえ","てめえ","temee","you (very rude!)","Tu (bahut rude, ladaai mein)"],
  ["あいつ","あいつ","aitsu","that guy","Woh banda"],
  ["こいつ","こいつ","koitsu","this guy","Yeh banda"],
  ["やつ","やつ","yatsu","guy / fellow","Banda"],
  ["くそ","くそ","kuso","damn!","Dhat tere ki! (gussa) 😤"]
];

// ===================== 7. Kanji tricks (Level 8) =====================
const RADICALS = [
  ["氵","さんずい","water / liquid","Paani: 3 boondein","海 (samundar), 池 (talaab), 泳 (tairna), 洗 (dhona), 酒 (sharaab)"],
  ["亻","にんべん","person","Insaan: khada aadmi","休 (aaraam), 体 (shareer), 住 (rehna), 作 (banana), 何 (kya)"],
  ["口","くち","mouth / opening","Muh: box","名 (naam), 右 (right), 味 (swaad), 呼 (bulaana)"],
  ["木","き","tree / wood","Ped","林 (2 ped = jungle), 森 (3 ped = ghana jungle), 校 (school), 本 (jad/kitaab)"],
  ["日","ひ","sun / day","Sooraj ki khidki","明 (sooraj + chaand = roshni), 時 (samay), 晴 (dhoop), 早 (jaldi)"],
  ["言 (訁)","ごんべん","speech / words","Muh se nikalte shabd","語 (bhasha), 話 (baat), 読 (padhna), 説 (samjhana)"],
  ["扌","てへん","hand","Haath","持 (pakadna), 押 (dhakka), 払 (paise dena), 投 (phenkna)"],
  ["艹","くさかんむり","grass / plant","Ghaas (upar)","花 (phool), 草 (ghaas), 茶 (chai), 薬 (dawai)"],
  ["辶","しんにょう","movement / road","Chalta rasta (neeche-left)","道 (rasta), 近 (paas), 遠 (door), 送 (bhejna), 週 (hafta)"],
  ["女","おんなへん","woman","Aurat","好 (aurat + bachcha = pyaar/pasand), 妹 (chhoti behen), 姉 (badi behen)"],
  ["忄 / 心","こころ","heart / feelings","Dil","思 (sochna), 悲 (dukh), 忙 (busy), 怖 (dar)"],
  ["金 (釒)","かねへん","metal / money","Dhaatu / paisa","銀 (chaandi / bank), 鉄 (loha), 鉛 (seesa → pencil)"],
  ["食 (飠)","しょくへん","food","Khaana","飲 (peena), 飯 (khaana/chawal), 館 (building, purane hotel)"],
  ["門","もんがまえ","gate","Darwaaza","間 (darwaaze se sooraj = beech), 聞 (darwaaze pe kaan = sunna), 開 (kholna), 閉 (band karna)"],
  ["雨","あめかんむり","rain / weather","Baarish (upar)","雪 (barf), 雲 (baadal), 電 (bijli), 雷 (garaj)"],
  ["火 / 灬","ひへん","fire","Aag (neeche 4 dots bhi)","焼 (sekna), 熱 (garam), 炎 (2 aag = lapat)"],
  ["宀","うかんむり","roof / house","Chhat","家 (ghar), 安 (chhat ke neeche aurat = shaanti), 室 (kamra), 字 (akshar)"],
  ["糸","いとへん","thread","Dhaaga","紙 (kaagaz), 線 (line), 結 (baandhna → shaadi 結婚)"],
  ["土","つちへん","earth / soil","Mitti","地 (zameen), 場 (jagah), 坂 (dhalaan)"],
  ["彳","ぎょうにんべん","going / road","Aage badhta insaan","行 (jaana), 待 (intezaar), 後 (peeche/baad)"]
];

const KANJI_COMBOS = [
  ["明","日 + 月","sooraj + chaand = roshni / bright"],
  ["好","女 + 子","maa + bachcha = pyaar / pasand"],
  ["休","亻 + 木","insaan ped ke paas = aaraam"],
  ["男","田 + 力","khet + taakat = aadmi"],
  ["森","木 + 木 + 木","teen ped = ghana jungle"],
  ["林","木 + 木","do ped = chhota jungle"],
  ["間","門 + 日","darwaaze se dikhta sooraj = beech (gap)"],
  ["聞","門 + 耳","darwaaze pe kaan = sunna"],
  ["鳴","口 + 鳥","chidiya ka muh = chehakna"],
  ["安","宀 + 女","chhat ke neeche aurat = shaanti / safe"],
  ["炎","火 + 火","do aag = lapat / flame"],
  ["品","口 + 口 + 口","teen box = saamaan (goods)"]
];

const KANJI_READING_RULE = {
  text: "Kanji ki do tarah ki readings hoti hain. Rule of thumb (zyadatar sahi):",
  points: [
    "📗 Kanji akela ho, ya uske baad hiragana ho → Japanese reading (kun'yomi): 山 = やま, 食べる = たべる, 水 = みず.",
    "📘 Do ya zyada kanji saath hon → Chinese reading (on'yomi): 富士山 = ふじ'さん', 食事 = 'しょく'じ, 水曜日 = 'すい'ようび.",
    "💡 Shuru mein readings ratt mat lagao. Words ke saath seekho, reading apne aap aa jaayegi.",
    "⚠️ Exceptions hain (今日 = きょう, 大人 = おとな). Inhe special words maan ke yaad karo."
  ]
};
