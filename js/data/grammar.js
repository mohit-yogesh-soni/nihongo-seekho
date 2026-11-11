// Level 6: Basic grammar. Har lesson ek sentence pattern hai.
// Examples: [asli Japanese (kanji ke saath), kana (spaces ke saath, beginners ke liye), romaji, English, Hinglish]
// Note: Japanese bachchon ki books bhi aise hi spaces ke saath hiragana mein likhi hoti hain.

const GRAMMAR = [
  { title: "Main ___ hoon", pattern: "X は Y です  (X wa Y desu)",
    explain: "Sabse pehla aur sabse useful pattern. は (particle) ko yahan 'wa' padhte hain. です (desu) = 'hai/hoon' (polite), aur 'u' almost silent hai: 'des'. Good news: Japanese mein verb end mein aata hai, bilkul Hindi jaisa! 'Main Mohit hoon' = 'Watashi wa Mohit desu'.",
    examples: [
      ["私はモヒトです。","わたしは モヒト です。","watashi wa Mohito desu.","I am Mohit.","Main Mohit hoon."],
      ["これは本です。","これは ほん です。","kore wa hon desu.","This is a book.","Ye kitaab hai."],
      ["私はインド人です。","わたしは インドじん です。","watashi wa Indojin desu.","I am Indian.","Main Indian hoon. (desh + じん = us desh ka insaan)"]
    ]},
  { title: "Main ___ nahi hoon", pattern: "X は Y じゃないです  (ja nai desu)",
    explain: "Negative ke liye です ki jagah じゃないです lagao. Formal version: ではありません (dewa arimasen). Anime/dosto mein sirf じゃない (ja nai).",
    examples: [
      ["私は日本人じゃないです。","わたしは にほんじん じゃないです。","watashi wa nihonjin ja nai desu.","I am not Japanese.","Main Japanese nahi hoon."],
      ["これは水じゃないです。","これは みず じゃないです。","kore wa mizu ja nai desu.","This is not water.","Ye paani nahi hai."],
      ["先生じゃない。","せんせい じゃない。","sensei ja nai.","(I'm) not a teacher.","Teacher nahi hoon (casual)."]
    ]},
  { title: "Sawaal poochhna (?)", pattern: "~ ですか？  (desu ka?)",
    explain: "Sentence ke end mein か (ka) lagao, sawaal ban jaayega. Hindi ke 'kya' jaisa, bas end mein aata hai. Jawaab: はい (haan) ya いいえ (nahi).",
    examples: [
      ["学生ですか。","がくせい ですか？","gakusei desu ka?","Are you a student?","Kya aap student ho?"],
      ["はい、学生です。","はい、がくせい です。","hai, gakusei desu.","Yes, I am a student.","Haan, main student hoon."],
      ["これは何ですか。","これは なん ですか？","kore wa nan desu ka?","What is this?","Ye kya hai?"]
    ]},
  { title: "Ye / Wo / Kaunsa", pattern: "これ・それ・あれ・どれ  (kore, sore, are, dore)",
    explain: "これ (kore) = ye (mere paas). それ (sore) = wo (tumhare paas). あれ (are) = wo (door wala). どれ (dore) = kaunsa?",
    examples: [
      ["それは何ですか。","それは なん ですか？","sore wa nan desu ka?","What is that?","Wo (tumhare paas) kya hai?"],
      ["あれは富士山です。","あれは ふじさん です。","are wa Fujisan desu.","That (over there) is Mt. Fuji.","Wo (door) Fuji pahad hai."],
      ["どれですか。","どれ ですか？","dore desu ka?","Which one?","Kaunsa wala?"]
    ]},
  { title: "Mera / Dost ka (ka/ki/ke)", pattern: "A の B  (A no B)",
    explain: "の (no) = Hindi ka 'ka/ki/ke'. Order bhi Hindi jaisa hai: わたしの ほん = meri kitaab.",
    examples: [
      ["私の本","わたしの ほん","watashi no hon","my book","Meri kitaab"],
      ["友達の猫","ともだちの ねこ","tomodachi no neko","friend's cat","Dost ki billi"],
      ["日本のアニメ","にほんの アニメ","nihon no anime","Japanese anime","Japan ka anime"]
    ]},
  { title: "Verbs: polite form", pattern: "~ます / ~ません / ~ました",
    explain: "Polite verb ke 4 roop: たべます (khata hoon / khaunga), たべません (nahi khata), たべました (khaya), たべませんでした (nahi khaya). Bas end badlo!",
    examples: [
      ["毎日ご飯を食べます。","まいにち ごはんを たべます。","mainichi gohan o tabemasu.","I eat rice every day.","Main roz khana khaata hoon."],
      ["肉を食べません。","にくを たべません。","niku o tabemasen.","I don't eat meat.","Main meat nahi khaata."],
      ["昨日アニメを見ました。","きのう アニメを みました。","kinou anime o mimashita.","I watched anime yesterday.","Kal maine anime dekha."]
    ]},
  { title: "Kis cheez ko (object)", pattern: "~ を + verb  (o)",
    explain: "Jis cheez pe kaam ho raha hai, uske baad を lagao. Bolte 'o' hain. Hindi 'ko' jaisa socho: 'paani (ko) peeta hoon'.",
    examples: [
      ["水を飲みます。","みずを のみます。","mizu o nomimasu.","I drink water.","Main paani peeta hoon."],
      ["日本語を勉強します。","にほんごを べんきょう します。","nihongo o benkyou shimasu.","I study Japanese.","Main Japanese padhta hoon."],
      ["音楽を聞きます。","おんがくを ききます。","ongaku o kikimasu.","I listen to music.","Main music sunta hoon."]
    ]},
  { title: "Kahan jaana / Kab (direction, time)", pattern: "~ に  (ni)",
    explain: "に (ni) = 'ko / par / mein'. Jagah ki taraf jaana: がっこうに いきます (school jaata hoon). Time: しちじに (7 baje).",
    examples: [
      ["学校に行きます。","がっこうに いきます。","gakkou ni ikimasu.","I go to school.","Main school jaata hoon."],
      ["七時に起きます。","しちじに おきます。","shichiji ni okimasu.","I wake up at 7.","Main 7 baje uthta hoon."],
      ["家に帰ります。","いえに かえります。","ie ni kaerimasu.","I go home.","Main ghar jaata hoon."]
    ]},
  { title: "Kahan karna / Kisse (place, means)", pattern: "~ で  (de)",
    explain: "で (de) = 'mein' (jahan kaam ho raha hai) ya 'se' (kis cheez se). いえで = ghar mein. でんしゃで = train se.",
    examples: [
      ["家でテレビを見ます。","いえで テレビを みます。","ie de terebi o mimasu.","I watch TV at home.","Main ghar mein TV dekhta hoon."],
      ["電車で行きます。","でんしゃで いきます。","densha de ikimasu.","I go by train.","Main train se jaata hoon."],
      ["日本語で話してください。","にほんごで はなして ください。","nihongo de hanashite kudasai.","Please speak in Japanese.","Japanese mein boliye please."]
    ]},
  { title: "Mujhe ___ pasand hai", pattern: "~ が すきです  (ga suki desu)",
    explain: "すき (suki) = pasand. だいすき (daisuki) = bahut pasand. Anime mein 'すきだ!' (suki da!) = 'Tum mujhe pasand ho' (confession 💘).",
    examples: [
      ["アニメが好きです。","アニメが すき です。","anime ga suki desu.","I like anime.","Mujhe anime pasand hai."],
      ["猫が大好きです。","ねこが だいすき です。","neko ga daisuki desu.","I love cats.","Mujhe billiyan bahut pasand hain."],
      ["何が好きですか。","なにが すき ですか？","nani ga suki desu ka?","What do you like?","Aapko kya pasand hai?"]
    ]},
  { title: "Main ___ karna chahta hoon", pattern: "verb ~たい  (tai)",
    explain: "Verb ka ます hatao aur たい lagao: たべます → たべたい (khaana chahta hoon). いきます → いきたい (jaana chahta hoon).",
    examples: [
      ["日本に行きたいです。","にほんに いきたい です。","nihon ni ikitai desu.","I want to go to Japan.","Main Japan jaana chahta hoon. 🇯🇵"],
      ["ラーメンが食べたい！","ラーメンが たべたい！","raamen ga tabetai!","I want to eat ramen!","Mujhe ramen khaani hai! 🍜"],
      ["何をしたいですか。","なにを したい ですか？","nani o shitai desu ka?","What do you want to do?","Aap kya karna chahte ho?"]
    ]},
  { title: "Please ___ kijiye", pattern: "verb (て-form) + ください  (te kudasai)",
    explain: "て-form + ください = 'please ... kijiye'. て-form banana thoda tricky hai, abhi bas ye yaad karo: たべて, みて, まって, きいて, いって, はなして, して, きて. Anime mein ください hata dete hain: まって! = Ruko!",
    examples: [
      ["待ってください。","まって ください。","matte kudasai.","Please wait.","Please rukiye."],
      ["見てください。","みて ください。","mite kudasai.","Please look.","Please dekhiye."],
      ["ゆっくり話してください。","ゆっくり はなして ください。","yukkuri hanashite kudasai.","Please speak slowly.","Please dheere boliye."]
    ]},
  { title: "Chalo ___ karte hain", pattern: "verb ~ましょう  (mashou)",
    explain: "ます hatao, ましょう lagao = 'chalo ... karte hain'. Anime casual: いこう! (ikou!), たべよう! (tabeyou!)",
    examples: [
      ["行きましょう！","いきましょう！","ikimashou!","Let's go!","Chalo chalte hain!"],
      ["食べましょう。","たべましょう。","tabemashou.","Let's eat.","Chalo khaate hain."],
      ["一緒に勉強しましょう。","いっしょに べんきょう しましょう。","issho ni benkyou shimashou.","Let's study together.","Chalo saath mein padhte hain."]
    ]},
  { title: "Ye ___ hai (describing)", pattern: "X は adjective です",
    explain: "Adjective + です. い wale adjective ka negative: last い hatao, くない lagao: おいしい → おいしくない (tasty nahi). Exception: いい → よくない.",
    examples: [
      ["このラーメンは美味しいです。","この ラーメンは おいしい です。","kono raamen wa oishii desu.","This ramen is tasty.","Ye ramen tasty hai."],
      ["今日は暑いです。","きょうは あつい です。","kyou wa atsui desu.","Today is hot.","Aaj garmi hai."],
      ["美味しくないです。","おいしくない です。","oishikunai desu.","It's not tasty.","Tasty nahi hai."]
    ]},
  { title: "___ hai / hota hai (exists)", pattern: "~ が います / あります",
    explain: "います (imasu) = zinda cheez ke liye (insaan, janwar). あります (arimasu) = bejaan cheez ke liye (kitaab, time, paisa). Negative: いません / ありません.",
    examples: [
      ["猫がいます。","ねこが います。","neko ga imasu.","There is a cat.","Ek billi hai."],
      ["時間がありません。","じかんが ありません。","jikan ga arimasen.","I don't have time.","Time nahi hai."],
      ["お金がありますか。","おかねが ありますか？","okane ga arimasu ka?","Do you have money?","Paise hain?"]
    ]},
  { title: "Aur / Ke saath", pattern: "A と B  (to)",
    explain: "と (to) = 'aur' ya 'ke saath'. パンと たまご = bread aur anda. ともだちと = dost ke saath.",
    examples: [
      ["友達と行きます。","ともだちと いきます。","tomodachi to ikimasu.","I'll go with a friend.","Main dost ke saath jaaunga."],
      ["パンと卵を食べます。","パンと たまごを たべます。","pan to tamago o tabemasu.","I eat bread and eggs.","Main bread aur anda khaata hoon."],
      ["母と話します。","ははと はなします。","haha to hanashimasu.","I talk with my mom.","Main mummy se baat karta hoon."]
    ]},
  { title: "Na? / Yaar! (sentence endings)", pattern: "~ ね / ~ よ  (ne / yo)",
    explain: "ね (ne) = 'na?' (saamne wale se agree karwana). よ (yo) = 'yaar, sach mein' (kuch batana). Ye feelings dete hain, anime mein har jagah hain!",
    examples: [
      ["いいですね。","いい ですね。","ii desu ne.","That's nice, isn't it?","Achha hai na!"],
      ["暑いですね。","あつい ですね。","atsui desu ne.","It's hot, right?","Garmi hai na?"],
      ["大丈夫だよ。","だいじょうぶ だよ。","daijoubu da yo.","It's okay, really.","Theek hai yaar, tension mat le."]
    ]},
  { title: "Casual style (anime wala)", pattern: "ます → dictionary form, です → だ",
    explain: "Dosto aur anime mein polite ending hata dete hain: たべます → たべる, いきます → いく, です → だ (ya kuch nahi). Sawaal mein bas awaaz upar karo: いく? ↗️",
    examples: [
      ["行く？","いく？","iku?","Are you going?","Chalega? / Ja raha hai?"],
      ["うん、行く。","うん、いく。","un, iku.","Yeah, I'm going.","Haan, ja raha hoon."],
      ["本当だ。","ほんとう だ。","hontou da.","It's true.","Sach hai."]
    ]},
  { title: "Abhi ___ kar raha hoon", pattern: "verb (て-form) + います  (te imasu)",
    explain: "て-form + います = 'kar raha hoon' (abhi chal raha hai). Casual mein: たべてる (tabeteru), してる (shiteru).",
    examples: [
      ["今、食べています。","いま、たべて います。","ima, tabete imasu.","I'm eating now.","Main abhi kha raha hoon."],
      ["何をしていますか。","なにを して いますか？","nani o shite imasu ka?","What are you doing?","Aap kya kar rahe ho?"],
      ["雨が降っています。","あめが ふって います。","ame ga futte imasu.","It's raining.","Baarish ho rahi hai."]
    ]},
  { title: "Kyunki ___ (because)", pattern: "reason + から  (kara)",
    explain: "から (kara) = 'kyunki / isliye'. Pehle reason, phir から, phir result. (から ka matlab 'se' bhi hota hai: インドから = India se.)",
    examples: [
      ["寒いから、行きません。","さむいから、いきません。","samui kara, ikimasen.","It's cold, so I won't go.","Thand hai, isliye nahi jaaunga."],
      ["好きだから。","すき だから。","suki dakara.","Because I like it.","Kyunki mujhe pasand hai."],
      ["時間がないから、早く！","じかんが ないから、はやく！","jikan ga nai kara, hayaku!","There's no time, hurry!","Time nahi hai, jaldi karo!"]
    ]}
];
