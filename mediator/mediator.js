'use strict';

class Player {
  construct(mediator, name) {
    this._mediator = mediator;
    this._points = 0;
    this._name = name;
  }

  get points() {
    return this._points;
  }

  play() {
    this._points += 1;
    this._mediator.played(); // ここでメディエータにアクションを伝える
  }
}

class scoreboard {
  construct() {
  }

  update(score) {
    let i, msg = ``;
    for (i in score) {
      msg = `${msg}${i}: ${score[i]}\n`;
    }
    console.log(msg);
  }
}

class Mediator {
  construct() {
    this._players = {};
    this._players.home = new Player(this, 'Home');
    this._players.guest = new Player(this, 'Guest');

    this._scoreboard = new scoreboard();
  };

  played() {
    score = {
      Home : this._players.home.points,
      Guest: this._players.guest.points
    };

    this._scoreboard.update(score);
  };

  //todo この辺りをreadlineモジュールに変更する
  keypress(e) {
    e = e || window.event; // ID
    if (e.which === 49){ // key "1"
      this._players.home.play();
      return;
    }
    if (e.which === 48){ // key "0"
      this._players.guest.play();
      return;
    }
  };
};

const _m = new Mediator(); // ゲーム開始
setTimeout(() => {
  console.log(`Time Up!`);
}, 5000);
