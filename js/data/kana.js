// Hiragana + Katakana data.
// Har entry: [letter, romaji, example word, word romaji, English meaning, Hinglish meaning]
// null = chart mein khaali jagah (jaise や row mein sirf 3 letters hain)

const HIRAGANA = {
  basic: [
    [["あ","a","あめ","ame","rain","Baarish ☔"],["い","i","いぬ","inu","dog","Kutta 🐶"],["う","u","うみ","umi","sea","Samundar 🌊"],["え","e","えき","eki","station","Railway station 🚉"],["お","o","おちゃ","ocha","green tea","Japanese chai 🍵"]],
    [["か","ka","かさ","kasa","umbrella","Chhatri ☂️"],["き","ki","きつね","kitsune","fox","Lomdi 🦊 (Naruto ka Kurama yaad karo)"],["く","ku","くるま","kuruma","car","Gaadi 🚗"],["け","ke","けしごむ","keshigomu","eraser","Rubber"],["こ","ko","こども","kodomo","child","Bachcha 👶"]],
    [["さ","sa","さかな","sakana","fish","Machhli 🐟"],["し","shi","しろ","shiro","white","Safed ⚪"],["す","su","すし","sushi","sushi","Sushi 🍣 (chawal + machhli)"],["せ","se","せんせい","sensei","teacher","Teacher / Guru 👨‍🏫"],["そ","so","そら","sora","sky","Aasmaan ☁️"]],
    [["た","ta","たまご","tamago","egg","Anda 🥚"],["ち","chi","ちず","chizu","map","Naksha 🗺️"],["つ","tsu","つき","tsuki","moon","Chaand 🌙"],["て","te","て","te","hand","Haath ✋"],["と","to","とり","tori","bird","Chidiya 🐦"]],
    [["な","na","なつ","natsu","summer","Garmi ka mausam ☀️"],["に","ni","にく","niku","meat","Meat 🍖"],["ぬ","nu","ぬいぐるみ","nuigurumi","stuffed toy","Teddy bear 🧸"],["ね","ne","ねこ","neko","cat","Billi 🐱"],["の","no","のみもの","nomimono","drink","Peene ki cheez 🥤"]],
    [["は","ha","はな","hana","flower / nose","Phool 🌸 (naak ko bhi はな kehte hain)"],["ひ","hi","ひと","hito","person","Insaan 🧍"],["ふ","fu","ふね","fune","boat","Naav ⛵"],["へ","he","へや","heya","room","Kamra 🚪"],["ほ","ho","ほし","hoshi","star","Taara ⭐"]],
    [["ま","ma","まど","mado","window","Khidki 🪟"],["み","mi","みず","mizu","water","Paani 💧"],["む","mu","むし","mushi","insect","Keeda 🐛"],["め","me","め","me","eye","Aankh 👁️"],["も","mo","もも","momo","peach","Aadu 🍑"]],
    [["や","ya","やま","yama","mountain","Pahad ⛰️"],null,["ゆ","yu","ゆき","yuki","snow","Barf ❄️"],null,["よ","yo","よる","yoru","night","Raat 🌃"]],
    [["ら","ra","らくだ","rakuda","camel","Oont 🐫"],["り","ri","りんご","ringo","apple","Seb 🍎 (R for Ringo = A for Apple!)"],["る","ru","はる","haru","spring (season)","Basant ka mausam 🌷 (る yahan end mein hai)"],["れ","re","れいぞうこ","reizouko","fridge","Fridge 🧊"],["ろ","ro","ろうそく","rousoku","candle","Mombatti 🕯️"]],
    [["わ","wa","わたし","watashi","I / me","Main 🙋"],null,null,null,["を","o","ほんを よむ","hon o yomu","read a book","Kitaab padhna 📖 (を sirf grammar ka particle hai)"]],
    [["ん","n","ほん","hon","book","Kitaab 📕 (ん word ki shuruaat mein kabhi nahi aata)"],null,null,null,null]
  ],
  dakuten: [
    [["が","ga","がっこう","gakkou","school","School 🏫"],["ぎ","gi","ぎんこう","ginkou","bank","Bank 🏦"],["ぐ","gu","かぐ","kagu","furniture","Furniture 🪑"],["げ","ge","げんき","genki","healthy / energetic","Tandurust, energy se bhara 💪"],["ご","go","ごはん","gohan","rice / meal","Chawal / khana 🍚"]],
    [["ざ","za","ざっし","zasshi","magazine","Magazine 📰"],["じ","ji","じかん","jikan","time","Samay ⏰"],["ず","zu","みず","mizu","water","Paani (ず beech mein hai)"],["ぜ","ze","ぜんぶ","zenbu","all","Sab kuch"],["ぞ","zo","ぞう","zou","elephant","Haathi 🐘"]],
    [["だ","da","だいじょうぶ","daijoubu","okay","Theek hai 👍"],["ぢ","ji","はなぢ","hanaji","nosebleed","Naak se khoon (anime mein jab koi sharma jaye 😳). Rare letter"],["づ","zu","つづく","tsuzuku","to be continued","Anime episode ke end mein aata hai. Rare letter"],["で","de","でんしゃ","densha","train","Train 🚆"],["ど","do","どこ","doko","where?","Kahan? 🤔"]],
    [["ば","ba","ばか","baka","idiot","Bewakoof 🤪 (rude hai, sirf dosto ke saath mazaak mein)"],["び","bi","えび","ebi","shrimp","Jhinga 🦐"],["ぶ","bu","ぶた","buta","pig","Suar 🐷"],["べ","be","べんきょう","benkyou","study","Padhai 📚"],["ぼ","bo","ぼく","boku","I (boys)","Main (ladke bolte hain)"]],
    [["ぱ","pa","かんぱい","kanpai","cheers!","Cheers! 🥂"],["ぴ","pi","ぴかぴか","pikapika","sparkly","Chamakdaar ✨ (Pikachu yaad karo!)"],["ぷ","pu","てんぷら","tenpura","tempura","Pakode jaisa fried khana 🍤"],["ぺ","pe","ぺこぺこ","pekopeko","very hungry","Bahut bhookh lagi 😋"],["ぽ","po","さんぽ","sanpo","a walk","Tehelna 🚶"]]
  ],
  combo: [
    ["きゃ","kya","きゃく","kyaku","guest","Mehmaan"],
    ["きゅ","kyu","きゅうり","kyuuri","cucumber","Kheera 🥒"],
    ["きょ","kyo","きょう","kyou","today","Aaj 📅"],
    ["しゃ","sha","しゃしん","shashin","photo","Photo 📷"],
    ["しゅ","shu","しゅくだい","shukudai","homework","Homework 📝"],
    ["しょ","sho","しょくどう","shokudou","canteen","Canteen 🍱"],
    ["ちゃ","cha","おちゃ","ocha","green tea","Chai 🍵"],
    ["ちゅ","chu","ちゅうい","chuui","caution","Dhyaan do ⚠️"],
    ["ちょ","cho","ちょっと","chotto","a little","Thoda sa 🤏"],
    ["にゃ","nya","にゃあ","nyaa","meow","Billi ki awaaz 🐱"],
    ["ひゃ","hya","ひゃく","hyaku","hundred","Sau (100) 💯"],
    ["みゃ","mya","みゃく","myaku","pulse","Nabz ❤️"],
    ["りょ","ryo","りょこう","ryokou","travel","Ghoomna / travel ✈️"],
    ["ぎゅ","gyu","ぎゅうにゅう","gyuunyuu","milk","Doodh 🥛"],
    ["じゃ","ja","じゃあね","jaa ne","bye!","Chal bye 👋"],
    ["じゅ","ju","じゅぎょう","jugyou","class / lesson","Class / lecture"],
    ["じょ","jo","じょうず","jouzu","skilled","Expert / badhiya 👏"]
  ]
};

const KATAKANA = {
  basic: [
    [["ア","a","アイス","aisu","ice cream","Ice cream 🍦"],["イ","i","インド","indo","India","India 🇮🇳"],["ウ","u","ウイルス","uirusu","virus","Virus 🦠"],["エ","e","エアコン","eakon","air conditioner","AC ❄️"],["オ","o","オレンジ","orenji","orange","Santra 🍊"]],
    [["カ","ka","カメラ","kamera","camera","Camera 📷"],["キ","ki","キロ","kiro","kilo","Kilo ⚖️"],["ク","ku","クラス","kurasu","class","Class 🏫"],["ケ","ke","ケーキ","keeki","cake","Cake 🎂"],["コ","ko","コーヒー","koohii","coffee","Coffee ☕"]],
    [["サ","sa","サッカー","sakkaa","soccer","Football ⚽"],["シ","shi","シール","shiiru","sticker","Sticker 🏷️"],["ス","su","スマホ","sumaho","smartphone","Mobile phone 📱"],["セ","se","セーター","seetaa","sweater","Sweater 🧶"],["ソ","so","ソファ","sofa","sofa","Sofa 🛋️"]],
    [["タ","ta","タクシー","takushii","taxi","Taxi 🚕"],["チ","chi","チーズ","chiizu","cheese","Cheese 🧀"],["ツ","tsu","ツアー","tsuaa","tour","Tour 🧳"],["テ","te","テレビ","terebi","TV","TV 📺"],["ト","to","トマト","tomato","tomato","Tamatar 🍅"]],
    [["ナ","na","ナイフ","naifu","knife","Chaaku 🔪"],["ニ","ni","テニス","tenisu","tennis","Tennis 🎾"],["ヌ","nu","カヌー","kanuu","canoe","Naav 🛶"],["ネ","ne","ネクタイ","nekutai","necktie","Tie 👔"],["ノ","no","ノート","nooto","notebook","Copy / notebook 📓"]],
    [["ハ","ha","ハンバーガー","hanbaagaa","hamburger","Burger 🍔"],["ヒ","hi","ヒーロー","hiiroo","hero","Hero 🦸"],["フ","fu","フランス","furansu","France","France 🇫🇷"],["ヘ","he","ヘリコプター","herikoputaa","helicopter","Helicopter 🚁"],["ホ","ho","ホテル","hoteru","hotel","Hotel 🏨"]],
    [["マ","ma","マンガ","manga","manga (comics)","Japanese comics 📚"],["ミ","mi","ミルク","miruku","milk","Doodh 🥛"],["ム","mu","ゲーム","geemu","game","Game 🎮 (ム end mein)"],["メ","me","メール","meeru","email","Email 📧"],["モ","mo","メモ","memo","memo","Note 📝"]],
    [["ヤ","ya","タイヤ","taiya","tyre","Tyre 🛞"],null,["ユ","yu","ユーチューブ","yuuchuubu","YouTube","YouTube ▶️"],null,["ヨ","yo","ヨーグルト","yooguruto","yogurt","Dahi 🥣"]],
    [["ラ","ra","ラーメン","raamen","ramen","Ramen noodles 🍜"],["リ","ri","リモコン","rimokon","remote control","TV remote"],["ル","ru","ルール","ruuru","rule","Rule / niyam"],["レ","re","レストラン","resutoran","restaurant","Restaurant 🍽️"],["ロ","ro","ロボット","robotto","robot","Robot 🤖"]],
    [["ワ","wa","ワイン","wain","wine","Wine 🍷"],null,null,null,["ヲ","o","ヲ","o","(rare)","Almost kabhi use nahi hota, bas pehchaan lo"]],
    [["ン","n","パン","pan","bread","Bread 🍞"],null,null,null,null]
  ],
  dakuten: [
    [["ガ","ga","ガム","gamu","chewing gum","Chewing gum"],["ギ","gi","ギター","gitaa","guitar","Guitar 🎸"],["グ","gu","グラス","gurasu","glass","Glass 🥛"],["ゲ","ge","ゲーム","geemu","game","Game 🎮"],["ゴ","go","ゴール","gooru","goal","Goal 🥅"]],
    [["ザ","za","ピザ","piza","pizza","Pizza 🍕"],["ジ","ji","ジーンズ","jiinzu","jeans","Jeans 👖"],["ズ","zu","ズボン","zubon","trousers","Pant 👖"],["ゼ","ze","ゼロ","zero","zero","Zero 0️⃣"],["ゾ","zo","ゾンビ","zonbi","zombie","Zombie 🧟"]],
    [["ダ","da","ダンス","dansu","dance","Dance 💃"],null,null,["デ","de","デザート","dezaato","dessert","Meetha 🍨"],["ド","do","ドア","doa","door","Darwaaza 🚪"]],
    [["バ","ba","バス","basu","bus","Bus 🚌"],["ビ","bi","ビル","biru","building","Building 🏢"],["ブ","bu","ブログ","burogu","blog","Blog ✍️"],["ベ","be","ベッド","beddo","bed","Bed 🛏️"],["ボ","bo","ボール","booru","ball","Ball ⚽"]],
    [["パ","pa","パーティー","paatii","party","Party 🎉"],["ピ","pi","ピアノ","piano","piano","Piano 🎹"],["プ","pu","プール","puuru","swimming pool","Swimming pool 🏊"],["ペ","pe","ペン","pen","pen","Pen 🖊️"],["ポ","po","ポケモン","pokemon","Pokémon","Pokémon ⚡"]]
  ]
};

// Mushkil awaazon ke liye Hinglish tips (romaji ke hisaab se)
const KANA_TIPS = {
  a: "'आ' jaisa, lekin chhota. さくら = 'सा-कु-रा', 'सकुर' nahi.",
  i: "'इ' jaisa.",
  u: "'उ' jaisa, hothon ko gol mat karo. Word ke end mein kabhi kabhi almost silent (です = 'des').",
  e: "'ए' jaisa.",
  o: "'ओ' jaisa.",
  shi: "'Shi' bolo, 'si' nahi.",
  chi: "'Chi' jaise 'chidiya' mein.",
  tsu: "'Ts' jaise English 'cats' mein, phir halka 'u'. Ye Hindi mein nahi hai, practice karo!",
  fu: "'Fu' aur 'hu' ke beech. Hothon se halki hawa nikalo, daant mat lagao.",
  ha: "Normally 'ha'. Lekin particle ho (わたしは) to 'wa' bolte hain.",
  he: "Normally 'he'. Particle ho ('ki taraf' wala) to 'e' bolte hain.",
  n: "Naak se 'n', jaise Hindi 'हूँ' ki bindi.",
  ra: "Japanese 'r' = 'r' aur 'l' ke beech. Hindi 'र' jaisa: jeebh ek baar halka sa upar tap karo. English 'r' ki tarah jeebh mat ghumao.",
  ri: "Japanese 'r' = 'r' aur 'l' ke beech. Halka sa 'ri/li'.",
  ru: "Japanese 'r' = 'r' aur 'l' ke beech. Halka sa 'ru/lu'.",
  re: "Japanese 'r' = 'r' aur 'l' ke beech. Halka sa 're/le'.",
  ro: "Japanese 'r' = 'r' aur 'l' ke beech. Halka sa 'ro/lo'.",
  ji: "'Ji' jaise 'jeet' mein.",
  zu: "'Zu' jaise 'zoo' mein, lekin chhota.",
  o_particle: "Bolte 'o' hain. Ye letter sirf grammar particle ke liye hai."
};
