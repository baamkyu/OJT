export const BoomAni = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
) => {
  let cw = width;
  let cx = x;
  let ch = height;
  let cy = y;
  ctx.strokeStyle = "#fff";

  let requestId: number | null = null;
  let rad = Math.PI / 180;

  let colors: string[] = [
    "#6A0000",
    "#900000",
    "#902B2B",
    "#A63232",
    "#A62626",
    "#FD5039",
    "#C12F2A",
    "#FF6540",
    "#f93801",
  ];

  let spring = 1 / 10;
  let friction = 0.85;
  let explosions: Explosion[] = [];

  class Particle {
    decay: number = 0.95;
    r: number;
    R: number;
    angle: number;
    center: { x: number; y: number };
    pos: { x: number; y: number };
    dest: { x: number; y: number };
    color: string;
    vel: { x: number; y: number };
    acc: { x: number; y: number };

    constructor(o: { x: number; y: number }) {
      this.r = randomIntFromInterval(10, 70);
      this.R = 100 - this.r;
      this.angle = Math.random() * 2 * Math.PI;
      this.center = o;
      this.pos = {
        x: this.center.x + this.r * Math.cos(this.angle),
        y: this.center.y + this.r * Math.sin(this.angle),
      };
      this.dest = {
        x: this.center.x + this.R * Math.cos(this.angle),
        y: this.center.y + this.R * Math.sin(this.angle),
      };
      this.color = colors[~~(Math.random() * colors.length)];
      this.vel = { x: 0, y: 0 };
      this.acc = { x: 0, y: 0 };
    }

    update() {
      let dx = this.dest.x - this.pos.x;
      let dy = this.dest.y - this.pos.y;

      this.acc.x = dx * spring;
      this.acc.y = dy * spring;
      this.vel.x += this.acc.x;
      this.vel.y += this.acc.y;

      this.vel.x *= friction;
      this.vel.y *= friction;

      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;

      if (this.r > 0) this.r *= this.decay;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  class Explosion {
    pos: { x: number; y: number };
    particles: Particle[];

    constructor() {
      this.pos = {
        x: Math.random() * cw,
        y: Math.random() * ch,
      };
      this.particles = [];
      for (let i = 0; i < 50; i++) {
        this.particles.push(new Particle(this.pos));
      }
    }

    update() {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].update();
        if (this.particles[i].r < 0.5) {
          this.particles.splice(i, 1);
        }
      }
    }

    draw() {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].draw();
      }
    }
  }

  function Draw() {
    requestId = window.requestAnimationFrame(Draw);
    ctx.clearRect(0, 0, cw, ch);
    ctx.globalCompositeOperation = "lighter";
    if (Math.random() < 0.1) {
      explosions.push(new Explosion());
    }

    for (let j = 0; j < explosions.length; j++) {
      explosions[j].update();
      explosions[j].draw();
    }
  }

  const Init = () => {
    if (requestId) {
      window.cancelAnimationFrame(requestId);
      requestId = null;
    }
    cw = width;
    cx = x;
    ch = height;
    cy = y;

    Draw();
  };

  window.setTimeout(() => {
    Init();
    window.addEventListener("resize", Init, false);
  }, 15);

  function randomIntFromInterval(mn: number, mx: number) {
    return Math.floor(Math.random() * (mx - mn + 1) + mn);
  }
};
