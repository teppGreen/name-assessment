'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment-button');
const resultDiv = document.getElementById('result-area');
const shareDiv = document.getElementById('share-area');

assessmentButton.addEventListener(
  'click', 
  () => {
    console.log('Button clicked.');
    const userName = userNameInput.value;

    if (userName.length === 0) {
      console.log('userNameが入力されていません。');
      return;
    }

    console.log(`userName: ${userName}`);
    const answer = assesment(userName);

    resultDiv.innerText = '';
    let header = document.createElement('h2');
    header.innerText = '診断結果';
    resultDiv.appendChild(header);
    
    let paragraph = document.createElement('p');
    const result = assesment(userName);
    paragraph.innerText = result;
    resultDiv.appendChild(paragraph);

    // Xポストボタン
    shareDiv.innerText = '';
    const hashtag = 'あなたのいいところ'
    const anchor = document.createElement('a');
    const hrefValue = `https://twitter.com/intent/tweet?button_hashtag=${encodeURIComponent(hashtag)}&ref_src=twsrc%5Etfw`;
    anchor.setAttribute('href', hrefValue);
    anchor.setAttribute('class', 'twitter-hashtag-button');
    anchor.setAttribute('data-text', encodeURIComponent(result));
    anchor.setAttribute('data-url', 'https://tepp.green');
    anchor.setAttribute('data-lang', 'ja');
    anchor.setAttribute('data-show-count', 'false');
    anchor.innerText = `#${hashtag} をポスト`;
    shareDiv.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    script.setAttribute('charset', 'utf-8');

    shareDiv.appendChild(script);
  }
)

userNameInput.addEventListener(
  'keydown',
  event => {
    if(event.code === 'Enter') {
      assessmentButton.dispatchEvent(new Event('click'))
    }
  }
)

/**
 * ユーザー名を渡すと診断結果が返ってくる関数
 * @param {string} userName ユーザー名
 * @returns {string} 診断結果
 */

function assesment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }
  
  // 文字のコード番号の合計を診断結果のパターン数で割って添え字の数字を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];
  result = result.replaceAll('###userName###', userName);
  
  return result;
}

const answers = [
  `###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。`,
  `###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。`,
  `###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。`,
  `###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。`,
  `###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。`,
  `###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。`,
  `###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。`,
  `###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。`,
  `###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。`,
  `###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。`,
  `###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。`,
  `###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。`,
  `###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。`,
  `###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。`,
  `###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。`,
  `###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。`
]