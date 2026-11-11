# Nihongo Seekho 🇯🇵

Japanese seekhne ki website, Hinglish mein. Zero se N5 level tak, bolne aur sunne pe focus.
Backend nahi hai: sirf HTML, CSS aur JavaScript. GitHub Pages pe free host hoti hai.

## Features
- 📖 **Learn**: 9 levels (awaazein → Hiragana → Katakana → 728 words → phrases → grammar → conversations → kanji)
- 👂 **Listen**: awaaz suno, sahi matlab chuno
- 🎤 **Speak**: mic se bolo aur check karo, Shadowing, Role-play
- 🔁 **Translate**: English/Hinglish ↔ Japanese (Hinglish dictionary + 22,000 words wali badi dictionary)
- ✍️ **Scribble**: ungli ya mouse se likhna seekho
- 🧠 **Tricks**: study techniques (spaced repetition, active recall, shadowing), roz ka plan, roadmap,
  aur Japanese shortcuts (word endings, katakana rules, verb endings decoder, kanji radicals). Har trick apne level mein bhi hai.
- 🔁 **Revision**: flashcards/quiz ke cards spaced repetition se sahi din pe wapas aate hain (browser mein save)

## Local chalana
`index.html` ko Chrome, Edge ya Brave mein double-click karke kholo.

## Browser support
| Feature | Chrome / Edge | Brave | Safari (iPhone/Mac) | Firefox |
|---|---|---|---|---|
| Learn, Listen, Translate, Scribble | ✅ | ✅ | ✅ | ✅ |
| 🔊 Japanese awaaz | ✅ | ⚠️ Shields down karna pad sakta hai | ✅ (Kyoko voice) | ✅ |
| 🎤 Mic se automatic check | ✅ (internet chahiye) | ❌ (self-check chalta hai) | ⚠️ iOS version pe depend | ❌ |

## Folder structure
```
index.html, learn.html, listen.html, speak.html, translate.html, scribble.html, tricks.html
css/style.css
js/common.js        navbar, awaaz, mic, progress
js/content.js       saare data ko common format mein badalta hai + spaced repetition
js/tricks-ui.js     tricks ke sections (Learn aur Tricks page dono use karte hain)
js/data/tricks.js   tricks ka data (sources ke saath)
js/*.js             har page ka code
js/data/*.js        learning content (words, phrases, grammar, kanji...)
js/data/jmdict/     badi dictionary (JMdict) + uska license
tools/              JMdict data banane ki script
```

## Credits / License
- Learning content (Hinglish words, grammar, conversations): is project ke liye likha gaya.
- Badi dictionary (`js/data/jmdict/jmdict-common.js`): **JMdict** © [EDRDG](https://www.edrdg.org/),
  [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), [jmdict-simplified](https://github.com/scriptin/jmdict-simplified) ke through.
  Data chhota kiya gaya hai aur romaji joda gaya hai. Details: `js/data/jmdict/LICENSE.md`.

## Badi dictionary update karna (optional)
1. https://github.com/scriptin/jmdict-simplified/releases se `jmdict-eng-common-*.json.zip` download karke unzip karo
2. `node tools/build-jmdict.js path/to/jmdict-eng-common-X.json`
