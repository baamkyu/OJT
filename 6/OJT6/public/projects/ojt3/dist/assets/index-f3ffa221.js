var rt = Object.defineProperty;
var ut = (e, t, i) =>
  t in e
    ? rt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i })
    : (e[t] = i);
var s = (e, t, i) => (ut(e, typeof t != "symbol" ? t + "" : t, i), i);
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) o(a);
  new MutationObserver((a) => {
    for (const r of a)
      if (r.type === "childList")
        for (const p of r.addedNodes)
          p.tagName === "LINK" && p.rel === "modulepreload" && o(p);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(a) {
    const r = {};
    return (
      a.integrity && (r.integrity = a.integrity),
      a.referrerPolicy && (r.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : a.crossOrigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function o(a) {
    if (a.ep) return;
    a.ep = !0;
    const r = i(a);
    fetch(a.href, r);
  }
})();
const K = "./assets/plane-aaff9159.png",
  z = "./assets/bomb-c496752b.png",
  N = "./assets/bullet-8e3f2334.png",
  $ = "./assets/money-59b1a0d6.png",
  gt = "./assets/gunshot-66384760.mp3",
  mt = "./assets/gunshot2-db31267a.mp3",
  yt = "./assets/money-d954379a.mp3",
  ft = "./assets/auch-ffe8f3dc.mp3",
  bt = "./assets/endGame-da15372d.mp3";
class Q {
  constructor() {
    s(this, "shotAudio");
    s(this, "hitAudio");
    s(this, "getMoneyAudio");
    s(this, "endGameAudio");
    s(this, "auchAudio");
    (this.shotAudio = new Audio()),
      (this.shotAudio.id = "shotAudio"),
      (this.shotAudio.src = gt),
      (this.hitAudio = new Audio()),
      (this.hitAudio.id = "hitAudio"),
      (this.hitAudio.src = mt),
      (this.getMoneyAudio = new Audio()),
      (this.getMoneyAudio.id = "getMoneyAudio"),
      (this.getMoneyAudio.src = yt),
      (this.endGameAudio = new Audio()),
      (this.endGameAudio.id = "endGameAudio"),
      (this.endGameAudio.src = bt),
      (this.auchAudio = new Audio()),
      (this.auchAudio.id = "auchAudio"),
      (this.auchAudio.src = ft);
  }
  playSound(t) {
    switch (t) {
      case "shot":
        this.shotAudio.play();
        break;
      case "hit":
        this.hitAudio.play();
        break;
      case "auch":
        this.auchAudio.play();
        break;
      case "getMoney":
        this.getMoneyAudio.play();
        break;
      case "endGame":
        this.endGameAudio.play();
        break;
    }
  }
}
const H = new Image();
H.src = N;
const m = class m {
  constructor(t, i) {
    s(this, "ctx");
    s(this, "img");
    s(this, "x");
    s(this, "y");
    s(this, "width");
    s(this, "height");
    s(this, "dx");
    s(this, "dy");
    s(this, "changeDirection");
    (this.ctx = t),
      (this.img = H),
      (this.x = i.x),
      (this.y = i.y),
      (this.width = i.width),
      (this.height = i.height),
      (this.changeDirection = !1),
      (this.dx = Math.random() * (2 - -2) + -2),
      (this.dy = Math.random() * (3 - 1) + 1);
  }
  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  drawAll() {
    for (let t = 0; t < m.objects.length; t++) m.objects[t].draw();
  }
  update(t, i) {
    return (
      (this.x + this.dx > t - 10 || this.x + this.dx < 10) &&
        (this.changeDirection = !this.changeDirection),
      this.changeDirection
        ? ((this.x -= this.dx), (this.y += this.dy))
        : ((this.x += this.dx), (this.y += this.dy)),
      this.y + this.dy > i - 10 &&
        (this.init(100, 0),
        (this.dx = Math.random() * (2 - -2) + -2),
        (this.dy = Math.random() * (3 - 1) + 1)),
      this.draw(),
      { x: this.x, y: this.y }
    );
  }
  static updateAll(t, i) {
    for (let o = 0; o < m.objects.length; o++) m.objects[o].update(t, i);
  }
  static initialize(t) {
    if (m.defaultObject) return;
    const i = { img: H, x: 0, y: 0, width: 56, height: 56 },
      o = new m(t, i);
    (m.defaultObject = o), m.objects.push(o);
  }
  init(t, i) {
    (this.x = t), (this.y = i);
  }
  addObject(t, i) {
    const o = new m(t, i);
    m.objects.push(o);
  }
};
s(m, "objects", []), s(m, "defaultObject", null);
let j = m;
const X = new Image();
X.src = z;
const y = class y {
  constructor(t, i) {
    s(this, "ctx");
    s(this, "img");
    s(this, "x");
    s(this, "y");
    s(this, "width");
    s(this, "height");
    s(this, "dx");
    s(this, "dy");
    s(this, "changeDirection");
    (this.ctx = t),
      (this.img = X),
      (this.x = i.x),
      (this.y = i.y),
      (this.width = i.width),
      (this.height = i.height),
      (this.changeDirection = !1),
      (this.dx = Math.random() * (2 - -2) + -2),
      (this.dy = Math.random() * (3 - 1) + 1);
  }
  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  drawAll() {
    for (let t = 0; t < y.objects.length; t++) y.objects[t].draw();
  }
  update(t, i) {
    return (
      (this.x + this.dx > t - 10 || this.x + this.dx < 10) &&
        (this.changeDirection = !this.changeDirection),
      this.changeDirection
        ? ((this.x -= this.dx), (this.y += this.dy))
        : ((this.x += this.dx), (this.y += this.dy)),
      this.y + this.dy > i - 10 &&
        (this.init(100, 0),
        (this.dx = Math.random() * (2 - -2) + -2),
        (this.dy = Math.random() * (3 - 1) + 1)),
      this.draw(),
      { x: this.x, y: this.y }
    );
  }
  static updateAll(t, i) {
    for (let o = 0; o < y.objects.length; o++) y.objects[o].update(t, i);
  }
  static initialize(t) {
    if (y.defaultObject) return;
    const i = { img: X, x: 0, y: 0, width: 56, height: 56 },
      o = new y(t, i);
    (y.defaultObject = o), y.objects.push(o);
  }
  init(t, i) {
    (this.x = t), (this.y = i);
  }
  addObject(t, i) {
    const o = new y(t, i);
    y.objects.push(o);
  }
};
s(y, "objects", []), s(y, "defaultObject", null);
let M = y;
const Y = new Image();
Y.src = $;
const f = class f {
  constructor(t, i) {
    s(this, "ctx");
    s(this, "img");
    s(this, "x");
    s(this, "y");
    s(this, "width");
    s(this, "height");
    s(this, "dx");
    s(this, "dy");
    s(this, "changeDirection");
    (this.ctx = t),
      (this.img = Y),
      (this.x = i.x),
      (this.y = i.y),
      (this.width = i.width),
      (this.height = i.height),
      (this.changeDirection = !1),
      (this.dx = Math.random() * (2 - -2) + -2),
      (this.dy = Math.random() * (3 - 1) + 1);
  }
  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  drawAll() {
    for (let t = 0; t < f.objects.length; t++) f.objects[t].draw();
  }
  update(t, i) {
    return (
      (this.x + this.dx > t - 10 || this.x + this.dx < 10) &&
        (this.changeDirection = !this.changeDirection),
      this.changeDirection
        ? ((this.x -= this.dx), (this.y += this.dy))
        : ((this.x += this.dx), (this.y += this.dy)),
      this.y + this.dy > i - 10 &&
        (this.init(100, 0),
        (this.dx = Math.random() * (2 - -2) + -2),
        (this.dy = Math.random() * (3 - 1) + 1)),
      this.draw(),
      { x: this.x, y: this.y }
    );
  }
  static updateAll(t, i) {
    for (let o = 0; o < f.objects.length; o++) f.objects[o].update(t, i);
  }
  static initialize(t) {
    if (f.defaultObject) return;
    const i = { img: Y, x: 0, y: 0, width: 56, height: 56 },
      o = new f(t, i);
    (f.defaultObject = o), f.objects.push(o);
  }
  init(t, i) {
    (this.x = t), (this.y = i);
  }
  addObject(t, i) {
    const o = new f(t, i);
    f.objects.push(o);
  }
};
s(f, "objects", []), s(f, "defaultObject", null);
let v = f;
const wt = "./assets/planeBullet-402dd787.png",
  V = new Image();
V.src = K;
const Z = new Image();
Z.src = wt;
const pt = new Q();
let C = 0;
const w = class w {
  constructor(t, i) {
    s(this, "ctx");
    s(this, "x");
    s(this, "y");
    s(this, "width");
    s(this, "height");
    s(this, "isGaming");
    s(this, "bulletTime", 0);
    s(this, "isKeyDown", !1);
    (this.ctx = t),
      (this.x = i.x),
      (this.y = i.y),
      (this.width = i.width),
      (this.height = i.height),
      (this.isGaming = i.isGaming),
      (w.shootedBullets = []),
      this.isGaming &&
        (document.addEventListener("keydown", (o) => {
          o.code === "Space" && (this.isKeyDown = !0);
        }),
        document.addEventListener("keyup", (o) => {
          o.code === "Space" && (this.isKeyDown = !1);
        }));
  }
  draw() {
    for (let t = 0; t < w.shootedBullets.length; t++) {
      if (w.shootedBullets[t].y <= 0) {
        w.shootedBullets.splice(t, 1);
        continue;
      }
      this.ctx.drawImage(
        Z,
        w.shootedBullets[t].x,
        w.shootedBullets[t].y,
        20,
        30
      );
    }
    return (
      this.ctx.drawImage(V, this.x, this.y, this.width, this.height),
      this.x,
      this.y
    );
  }
  move(t) {
    return (this.x += t), this.x;
  }
  update() {
    if (this.isGaming) {
      (this.bulletTime += 1),
        this.bulletTime >= 200 &&
          this.isKeyDown === !0 &&
          (pt.playSound("shot"),
          (C += 1),
          w.shootedBullets.push({ x: this.x + this.width / 2 - 5, y: this.y }),
          (this.bulletTime = 0));
      for (let t = 0; t < w.shootedBullets.length; t++)
        w.shootedBullets[t].y -= 2;
    }
  }
  shooting() {
    this.isGaming
      ? (this.update(), this.draw(), setTimeout(() => this.shooting(), 300))
      : (w.shootedBullets = []);
  }
  setIsGaming(t) {
    this.isGaming = t;
  }
};
s(w, "shootedBullets");
let B = w;
const _ = new Image();
_.src = K;
const tt = new Image();
tt.src = $;
function xt(e, t) {
  let i = 0,
    o = 3;
  return {
    haveMoney: () => (
      e.drawImage(tt, t.moneyX - 45, t.moneyY, 36, 36),
      (e.font = "16px Arial"),
      (e.fillStyle = "black"),
      e.fillText(`x ${i}`, t.moneyX, t.moneyY + 25),
      i
    ),
    haveLives: () => (
      e.drawImage(_, t.liveX - 45, t.liveY, 36, 36),
      (e.font = "16px Arial"),
      (e.fillStyle = "black"),
      e.fillText(`x ${o}`, t.liveX, t.liveY + 25),
      o
    ),
    plusMoney: () => {
      i += 1;
    },
    minusLives: () => {
      o -= 1;
    },
    endGame: () => {
      o = 0;
    },
  };
}
const At = "./assets/background-6465c73a.png",
  It = "./assets/hitRate-5662bae5.png",
  jt = "./assets/getMoney-6293a02a.png",
  et = new Image();
et.src = It;
const it = new Image();
it.src = jt;
const st = new Image();
st.src = N;
const ot = new Image();
ot.src = z;
const nt = new Image();
nt.src = $;
const Mt = (e, t, i, o, a, r, p, S, k) => {
    (e.fillStyle = "rgba(0, 0, 0, 0.5)"), e.fillRect(0, 0, t, i);
    const L = 400,
      u = 400,
      l = (t - L) / 2,
      d = (i - u) / 2;
    (e.fillStyle = "white"),
      e.fillRect(l, d, L, u),
      (e.font = "20px Arial"),
      (e.fillStyle = "black"),
      e.fillText("Game Over", l + 150, d + 40),
      e.fillText("기록", l + 50, d + 85),
      e.drawImage(it, l + 50, d + 110, 40, 40),
      (e.font = "20px Arial"),
      (e.fillStyle = "black"),
      e.fillText(`획득 머니 : ${o}개`, l + 100, d + 134),
      e.drawImage(et, l + 50, d + 170, 40, 40),
      (e.font = "20px Arial"),
      (e.fillStyle = "black"),
      e.fillText(`적중률 : ${a}%`, l + 100, d + 196),
      (e.strokeStyle = "gray"),
      (e.globalAlpha = 0.7),
      e.beginPath(),
      e.moveTo(l + 40, d + 240),
      e.lineTo(l + 360, d + 240),
      e.stroke(),
      (e.globalAlpha = 1),
      e.fillText("파괴 아이템", l + 50, d + 280),
      e.drawImage(st, l + 50, d + 300, 32, 32),
      (e.font = "16px Arial"),
      (e.fillStyle = "black"),
      e.fillText(`x ${r}`, l + 90, d + 322),
      e.drawImage(ot, l + 150, d + 300, 32, 32),
      (e.font = "16px Arial"),
      (e.fillStyle = "black"),
      e.fillText(`x ${p}`, l + 190, d + 322),
      e.drawImage(nt, l + 250, d + 300, 32, 32),
      (e.font = "16px Arial"),
      (e.fillStyle = "black"),
      e.fillText(`x ${S}`, l + 290, d + 322);
    const x = 130,
      D = 40,
      O = l + L / 2 + x,
      P = d + u - 40,
      b = document.createElement("button");
    (b.style.position = "absolute"),
      (b.style.left = `${O}px`),
      (b.style.top = `${P}px`),
      (b.style.width = `${x}px`),
      (b.style.height = `${D}px`),
      (b.style.backgroundColor = "green"),
      (b.style.color = "white"),
      (b.innerHTML = "다시하기"),
      b.addEventListener("click", () => {
        console.log("click restartButton"),
          k(),
          document.body.removeChild(b),
          document.location.reload();
      }),
      document.body.appendChild(b);
  },
  vt = () => {
    const e = document.getElementById("myCanvas"),
      t = e.getContext("2d");
    let i = !0;
    const o = new Q();
    let a = 0,
      r = 0,
      p = 0,
      S = 0,
      k = 0,
      L = 0;
    const u = {
      plane: new Image(),
      bomb: new Image(),
      bullet: new Image(),
      money: new Image(),
      background: new Image(),
    };
    (u.plane.src = K),
      (u.bomb.src = z),
      (u.bullet.src = N),
      (u.money.src = $),
      (u.background.src = At);
    let l = 100,
      d = 80,
      x = (e.width - l) / 2,
      D = e.height - d,
      O = { rightPressed: !1, leftPressed: !1 };
    document.addEventListener("keydown", (n) => P(n), !1),
      document.addEventListener("keyup", (n) => b(n), !1);
    function P(n) {
      n.key === "Right" || n.key === "ArrowRight"
        ? (O.rightPressed = !0)
        : (n.key === "Left" || n.key === "ArrowLeft") && (O.leftPressed = !0);
    }
    function b(n) {
      n.key === "Right" || n.key === "ArrowRight"
        ? (O.rightPressed = !1)
        : (n.key === "Left" || n.key === "ArrowLeft") && (O.leftPressed = !1);
    }
    function ht() {
      O.rightPressed && x < e.width - l + 40
        ? ((x += 7), T.move(7))
        : O.leftPressed && x > -30 && ((x -= 7), T.move(-7));
    }
    const W = new j(t, {
        img: u.bullet,
        x: Math.floor(Math.random() * 601) + 100,
        y: 0,
        height: 56,
        width: 56,
      }),
      q = new M(t, {
        img: u.bomb,
        x: Math.floor(Math.random() * 601) + 100,
        y: 0,
        height: 56,
        width: 56,
      }),
      F = new v(t, {
        img: u.money,
        x: Math.floor(Math.random() * 601) + 100,
        y: 0,
        height: 56,
        width: 56,
      }),
      T = new B(t, { x, y: D, height: l, width: d, isGaming: i }),
      G = xt(t, {
        moneyX: e.width - 60,
        moneyY: 80,
        liveX: e.width - 60,
        liveY: 40,
      });
    W.draw(), q.draw(), F.draw();
    let U = 299;
    function at() {
      const n = [u.bomb, u.bullet, u.money],
        h = n[Math.floor(Math.random() * n.length)];
      (h === u.bomb ? q : h === u.bullet ? W : F).addObject(t, {
        img: h,
        x: Math.random() * e.width,
        y: 0,
        width: 56,
        height: 56,
      });
    }
    function lt() {
      for (let n = 0; n < B.shootedBullets.length; n++) {
        const h = B.shootedBullets[n];
        let A = !1,
          I = !1,
          J = !1;
        for (let g = 0; g < j.objects.length; g++) {
          const c = j.objects[g];
          if (
            h.x < c.x + c.width &&
            h.x + 10 > c.x &&
            h.y < c.y + c.height &&
            h.y + 10 > c.y
          ) {
            j.objects.splice(g, 1),
              o.playSound("hit"),
              (A = !0),
              (k += 1),
              (a += 1),
              console.log("Bullet 적중");
            break;
          }
        }
        for (let g = 0; g < M.objects.length; g++) {
          const c = M.objects[g];
          if (
            h.x < c.x + c.width &&
            h.x + 10 > c.x &&
            h.y < c.y + c.height &&
            h.y + 10 > c.y
          ) {
            o.playSound("hit"),
              M.objects.splice(g, 1),
              (I = !0),
              (k += 1),
              (r += 1),
              console.log("Bomb 적중");
            break;
          }
        }
        for (let g = 0; g < v.objects.length; g++) {
          const c = v.objects[g];
          if (
            h.x < c.x + c.width &&
            h.x + 10 > c.x &&
            h.y < c.y + c.height &&
            h.y + 10 > c.y
          ) {
            v.objects.splice(g, 1),
              (J = !0),
              (k += 1),
              (p += 1),
              console.log("Money 적중");
            break;
          }
        }
        if (A || I || J) {
          B.shootedBullets.splice(n, 1);
          continue;
        }
      }
      L = C ? Math.round((k / C) * 100) : 0;
    }
    function R(n) {
      const h = n.objects;
      if (h.length !== 0)
        for (let A = 0; A < h.length; A++) {
          const I = h[A];
          x < I.x &&
            x + l > I.x &&
            D < I.y &&
            D + d > I.y &&
            (n === j
              ? (I.init(0, 0),
                G.minusLives(),
                h.splice(A, 1),
                G.haveLives() != 1 && o.playSound("auch"))
              : n === M
              ? (o.playSound("endGame"),
                I.init(0, 0),
                G.endGame(),
                h.splice(A, 1))
              : n === v &&
                (h.splice(A, 1),
                G.plusMoney(),
                (S += 1),
                o.playSound("getMoney"),
                console.log("money획득")));
        }
    }
    function dt(n) {
      T.setIsGaming(n);
    }
    function ct() {
      (i = !0), E();
    }
    function E() {
      t.drawImage(u.background, 0, 0, e.width, e.height),
        G.haveMoney(),
        G.haveLives(),
        G.haveLives() <= 0 && (o.playSound("endGame"), G.endGame(), (i = !1)),
        U % 100 === 0 && at(),
        dt(i),
        i &&
          (R(j),
          R(M),
          R(v),
          ht(),
          (U += 1),
          lt(),
          M.updateAll(e.width - 5, e.height - 5),
          j.updateAll(e.width - 5, e.height - 5),
          v.updateAll(e.width - 5, e.height - 5),
          requestAnimationFrame(E),
          T.draw(),
          T.shooting()),
        i ||
          (Mt(t, e.width, e.height, S, L, a, r, p, ct),
          window.parent.postMessage(
            {
              type: "ojt3 finish",
              getMoney: S,
              shootCount: C,
              hitCount: k,
              hitBullet: a,
              hitBomb: r,
              hitMoney: p,
            },
            "*"
          ));
    }
    E();
  },
  kt = () => {
    const e = document.createElement("canvas");
    (e.id = "myCanvas"),
      e.setAttribute("width", "800"),
      e.setAttribute("height", "740"),
      document.body.appendChild(e),
      vt();
  };
kt();
