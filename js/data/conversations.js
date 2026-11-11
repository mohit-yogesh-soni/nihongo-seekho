// Level 7: Conversations (chhote dialogues). Speak page pe inka role-play bhi hota hai.
// Har line: [speaker, asli Japanese, kana (spaces ke saath), romaji, English, Hinglish]

const CONVERSATIONS = [
  { title: "🙋 Apna introduction (Self-intro)", situation: "Pehli baar kisi Japanese insaan se mil rahe ho. Polite style.",
    speakers: ["Mohit", "Tanaka"],
    lines: [
      ["Mohit","はじめまして。私はモヒトです。","はじめまして。わたしは モヒト です。","hajimemashite. watashi wa Mohito desu.","Nice to meet you. I am Mohit.","Pehli baar mil rahe hain. Main Mohit hoon."],
      ["Mohit","インドから来ました。","インドから きました。","Indo kara kimashita.","I came from India.","Main India se aaya hoon."],
      ["Tanaka","はじめまして。田中です。よろしくお願いします。","はじめまして。たなか です。よろしく おねがいします。","hajimemashite. Tanaka desu. yoroshiku onegaishimasu.","Nice to meet you. I'm Tanaka. Pleased to meet you.","Main Tanaka hoon. Aapse milke achha laga."],
      ["Mohit","こちらこそ、よろしくお願いします。","こちらこそ、よろしく おねがいします。","kochira koso, yoroshiku onegaishimasu.","Likewise, pleased to meet you.","Mujhe bhi aapse milke achha laga."],
      ["Tanaka","日本語が上手ですね！","にほんごが じょうず ですね！","nihongo ga jouzu desu ne!","Your Japanese is good!","Aapki Japanese toh badhiya hai!"],
      ["Mohit","いいえ、まだまだです。","いいえ、まだまだ です。","iie, madamada desu.","No, I still have a long way to go.","Nahi nahi, abhi bahut seekhna hai. (Japan mein tareef pe aise hi humble jawaab dete hain 😄)"]
    ]},
  { title: "👫 Dost se milna (casual)", situation: "Subah dost mila. Casual style, anime jaisa.",
    speakers: ["Yuki", "Mohit"],
    lines: [
      ["Yuki","おはよう！元気？","おはよう！げんき？","ohayou! genki?","Morning! How are you?","Good morning! Kaisa hai?"],
      ["Mohit","うん、元気！ゆきは？","うん、げんき！ゆきは？","un, genki! Yuki wa?","Yeah, good! And you, Yuki?","Haan, badhiya! Tu bata?"],
      ["Yuki","まあまあかな。","まあまあ かな。","maamaa kana.","So-so, I guess.","Theek-thaak."],
      ["Mohit","今日、何する？","きょう、なに する？","kyou, nani suru?","What are you doing today?","Aaj kya karna hai?"],
      ["Yuki","一緒にアニメ見ようよ！","いっしょに アニメ みようよ！","issho ni anime miyou yo!","Let's watch anime together!","Chal saath mein anime dekhte hain!"],
      ["Mohit","いいね！","いいね！","ii ne!","Sounds good!","Badhiya idea!"]
    ]},
  { title: "🍜 Restaurant mein", situation: "Ramen shop mein order karna.",
    speakers: ["Staff", "Mohit"],
    lines: [
      ["Staff","いらっしゃいませ！何名様ですか。","いらっしゃいませ！なんめいさま ですか？","irasshaimase! nanmeisama desu ka?","Welcome! How many people?","Swagat hai! Kitne log ho?"],
      ["Mohit","一人です。","ひとり です。","hitori desu.","Just one.","Main akela hoon."],
      ["Staff","ご注文は？","ごちゅうもんは？","gochuumon wa?","What would you like to order?","Kya order karoge?"],
      ["Mohit","ラーメンを一つお願いします。","ラーメンを ひとつ おねがいします。","raamen o hitotsu onegaishimasu.","One ramen, please.","Ek ramen please."],
      ["Staff","お飲み物は？","おのみものは？","onomimono wa?","And to drink?","Peene mein kya loge?"],
      ["Mohit","水でいいです。","みずで いいです。","mizu de ii desu.","Water is fine.","Paani chalega."],
      ["Mohit","美味しかった！ごちそうさまでした。","おいしかった！ごちそうさま でした。","oishikatta! gochisousama deshita.","That was delicious! Thank you for the meal.","Bahut tasty tha! Khaane ke liye shukriya."]
    ]},
  { title: "🛍️ Shopping", situation: "Dukaan mein price poochhna. (Japan mein bargaining normally nahi hoti 😄)",
    speakers: ["Mohit", "Staff"],
    lines: [
      ["Mohit","すみません、これはいくらですか。","すみません、これは いくら ですか？","sumimasen, kore wa ikura desu ka?","Excuse me, how much is this?","Suniye, ye kitne ka hai?"],
      ["Staff","五百円です。","ごひゃく えん です。","gohyaku en desu.","It's 500 yen.","500 yen ka hai."],
      ["Mohit","ちょっと高いですね。","ちょっと たかい ですね。","chotto takai desu ne.","That's a bit expensive.","Thoda mehenga hai na."],
      ["Staff","こちらは三百円です。","こちらは さんびゃく えん です。","kochira wa sanbyaku en desu.","This one is 300 yen.","Ye wala 300 yen ka hai."],
      ["Mohit","じゃあ、これをください。","じゃあ、これを ください。","jaa, kore o kudasai.","Then I'll take this one.","Theek hai, ye de dijiye."],
      ["Staff","ありがとうございます！","ありがとうございます！","arigatou gozaimasu!","Thank you very much!","Bahut shukriya!"]
    ]},
  { title: "🗺️ Rasta poochhna", situation: "Station dhoondh rahe ho.",
    speakers: ["Mohit", "Local"],
    lines: [
      ["Mohit","すみません、駅はどこですか。","すみません、えきは どこ ですか？","sumimasen, eki wa doko desu ka?","Excuse me, where is the station?","Suniye, station kahan hai?"],
      ["Local","まっすぐ行って、右です。","まっすぐ いって、みぎ です。","massugu itte, migi desu.","Go straight, then it's on the right.","Seedha jaao, phir right mein hai."],
      ["Mohit","遠いですか。","とおい ですか？","tooi desu ka?","Is it far?","Door hai kya?"],
      ["Local","いいえ、歩いて五分です。","いいえ、あるいて ごふん です。","iie, aruite gofun desu.","No, it's five minutes on foot.","Nahi, paidal 5 minute hai."],
      ["Mohit","ありがとうございます！","ありがとうございます！","arigatou gozaimasu!","Thank you very much!","Bahut shukriya!"]
    ]},
  { title: "⚔️ Anime battle scene", situation: "Hero zakhmi hai, lekin haar nahi maanta. Casual + josh!",
    speakers: ["Sakura", "Ken"],
    lines: [
      ["Sakura","大丈夫？","だいじょうぶ？","daijoubu?","Are you okay?","Tu theek hai?"],
      ["Ken","ああ…まだ戦える。","ああ…まだ たたかえる。","aa... mada tatakaeru.","Yeah... I can still fight.","Haan... main abhi bhi lad sakta hoon."],
      ["Sakura","無理しないで！","むり しないで！","muri shinaide!","Don't push yourself!","Zyada zor mat laga!"],
      ["Ken","信じて。俺は負けない！","しんじて。おれは まけない！","shinjite. ore wa makenai!","Trust me. I won't lose!","Mujh pe bharosa rakh. Main nahi haarunga!"],
      ["Sakura","…分かった。頑張って！","…わかった。がんばって！","...wakatta. ganbatte!","...Okay. Do your best!","...Theek hai. Laga reh!"],
      ["Ken","行くぞ！","いくぞ！","iku zo!","Here I go!","Chalo! 🔥"]
    ]},
  { title: "📞 Phone pe plan banana", situation: "Dost ne kal movie ke liye call kiya.",
    speakers: ["Mohit", "Yuki"],
    lines: [
      ["Mohit","もしもし？","もしもし？","moshi moshi?","Hello? (on the phone)","Hello? (phone wala hello)"],
      ["Yuki","あ、ゆきです。明日、暇？","あ、ゆき です。あした、ひま？","a, Yuki desu. ashita, hima?","Oh, it's Yuki. Are you free tomorrow?","Main Yuki. Kal free hai?"],
      ["Mohit","うん、暇だよ。","うん、ひま だよ。","un, hima da yo.","Yeah, I'm free.","Haan, free hoon."],
      ["Yuki","一緒に映画を見に行かない？","いっしょに えいがを みに いかない？","issho ni eiga o mi ni ikanai?","Want to go see a movie together?","Saath mein movie dekhne chalein?"],
      ["Mohit","いいね！何時？","いいね！なんじ？","ii ne! nanji?","Nice! What time?","Badhiya! Kitne baje?"],
      ["Yuki","三時はどう？","さんじは どう？","sanji wa dou?","How about three o'clock?","3 baje kaisa rahega?"],
      ["Mohit","オッケー！じゃあ、また明日！","オッケー！じゃあ、また あした！","okkee! jaa, mata ashita!","OK! See you tomorrow!","Done! Kal milte hain!"]
    ]},
  { title: "😅 Samajh nahi aaya (survival)", situation: "Dukaan wala tez bol raha hai aur aapko samajh nahi aaya.",
    speakers: ["Staff", "Mohit"],
    lines: [
      ["Staff","ポイントカードはお持ちですか。","ポイントカードは おもち ですか？","pointo kaado wa omochi desu ka?","Do you have a point card?","Kya aapke paas point card hai?"],
      ["Mohit","すみません、分かりません。","すみません、わかりません。","sumimasen, wakarimasen.","Sorry, I don't understand.","Sorry, samajh nahi aaya."],
      ["Mohit","もう一度、ゆっくりお願いします。","もう いちど、ゆっくり おねがいします。","mou ichido, yukkuri onegaishimasu.","One more time, slowly please.","Ek baar aur, dheere boliye please."],
      ["Staff","ポイントカード、ありますか。","ポイントカード、ありますか？","pointo kaado, arimasu ka?","Point card, do you have one?","Point card hai?"],
      ["Mohit","あ、ないです。","あ、ない です。","a, nai desu.","Oh, I don't.","Achha, nahi hai."],
      ["Staff","分かりました。ありがとうございます。","わかりました。ありがとうございます。","wakarimashita. arigatou gozaimasu.","Understood. Thank you.","Theek hai. Shukriya."]
    ]}
];
