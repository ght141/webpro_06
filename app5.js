const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {/////////////////////////////////////
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/pokemon", (req, res) => {///////////////////////////
  let choice = req.query.choice; // ユーザーの選択（ハイパーボール、スーパーボール、モンボ）
  let win = Number(req.query.win); // 捕まえた数
  let total = Number(req.query.total); // 試行回数
  console.log({ choice, win, total });

  // 捕獲確率に基づいた判定
  let judgement = '';
  const random = Math.random(); // 0から1までのランダムな値を生成

  // 捕獲確率の設定
  let winRate = 0;
  if (choice === 'ハイパーボール') {
    winRate = 0.75; // ハイパーボールの捕獲確率75%
  } else if (choice === 'スーパーボール') {
    winRate = 0.50; // スーパーボールの捕獲確率50%
  } else if (choice === 'モンスターボール') {
    winRate = 0.25; // モンスターボールの捕獲確率25%
  }

  // 捕獲確率に基づいて結果を判定
  if (random < winRate) {
    judgement = 'ゲット';
    win += 1;
  } else {
    judgement = '逃げられた';
  }
  total += 1;

  // 結果表示用オブジェクト
  const display = {
    choice: choice,
    judgement: judgement,
    win: win,
    total: total
  };

  // EJSテンプレートで結果をレンダリング
  res.render('game', display);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/janken", (req, res) => {//////////////////////////////////////
  let hand = req.query.hand; // ユーザーの手
  let win = Number(req.query.win); // 勝ち数
  let total = Number(req.query.total); // 総試合数
  console.log({ hand, win, total });

  // CPUの手をランダムに選択
  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num === 1) cpu = 'グー';
  else if (num === 2) cpu = 'チョキ';
  else cpu = 'パー';

  // 勝敗の判定
  let judgement = '';
  if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1;
  } else if (hand === cpu) {
    judgement = '引き分け';
  } else {
    judgement = '負け';
  }
  total += 1;

  // レンダリング用のオブジェクトを準備
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };

  // レンダリング実行
  res.render('janken', display);
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
