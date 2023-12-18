(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const i of r)
      if (i.type === "childList")
        for (const d of i.addedNodes)
          d.tagName === "LINK" && d.rel === "modulepreload" && s(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const i = {};
    return (
      r.integrity && (i.integrity = r.integrity),
      r.referrerPolicy && (i.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : r.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const i = n(r);
    fetch(r.href, i);
  }
})();
const D = () => {
    const u = document.createElementNS("http://www.w3.org/2000/svg", "g"),
      t = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    t.setAttribute("cx", "200"),
      t.setAttribute("cy", "200"),
      t.setAttribute("r", "100"),
      t.setAttribute("fill", "none"),
      t.setAttribute("stroke", "gray"),
      t.setAttribute("stroke-width", "2"),
      t.setAttribute("stroke-dasharray", "20 8");
    const n = document.createElementNS("http://www.w3.org/2000/svg", "g"),
      s = document.createElementNS("http://www.w3.org/2000/svg", "text");
    s.setAttribute("x", "-24"),
      s.setAttribute("y", "0"),
      s.setAttribute("font-size", "24"),
      (s.textContent = "✏️");
    let r = -24,
      i = 0;
    s.setAttribute("x", r.toString()), s.setAttribute("y", i.toString());
    const d = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animateMotion"
    );
    d.setAttribute("repeatCount", "1"), d.setAttribute("dur", "4s");
    const h = document.createElementNS("http://www.w3.org/2000/svg", "mpath");
    h.setAttribute("href", "#pencilLine"),
      d.appendChild(h),
      s.appendChild(d),
      n.appendChild(s);
    const o = document.createElementNS("http://www.w3.org/2000/svg", "path");
    return (
      o.setAttribute("x", "0"),
      o.setAttribute("y", "0"),
      o.setAttribute("stroke", "#DB555B"),
      o.setAttribute("stroke-linecap", "round"),
      o.setAttribute("stroke-width", "6"),
      o.setAttribute("fill", "none"),
      o.setAttribute(
        "d",
        "M 0 0 a -100, 100 0 1,0 0,200 a 100,-100 0 1,0 0 -200"
      ),
      (o.id = "pencilLine"),
      o.setAttribute("fill", "none"),
      o.classList.add("moving-circle"),
      (o.onanimationend = () => {
        n.removeChild(s);
        const m = document.createElementNS("http://www.w3.org/2000/svg", "g"),
          l = document.createElementNS("http://www.w3.org/2000/svg", "text");
        l.setAttribute("font-size", "36"),
          l.setAttribute("font-weight", "bold"),
          l.setAttribute("fill", "#01B41F"),
          l.setAttribute("x", "320"),
          l.setAttribute("y", "140"),
          (l.textContent = "O");
        const f = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "image"
        );
        f.setAttribute("href", "./assets/speechBubble.png"),
          f.setAttribute("width", "64"),
          f.setAttribute("height", "64"),
          f.setAttribute("x", "302"),
          f.setAttribute("y", "100"),
          m.appendChild(f),
          m.appendChild(l),
          u.appendChild(m),
          window.postMessage({ type: "firstGroupFinish" }, "*"),
          window.parent.postMessage({ type: "ojt2-1 finish" }, "*");
      }),
      n.appendChild(o),
      n.appendChild(s),
      n.setAttribute("transform", "translate(200 100)"),
      u.appendChild(t),
      u.appendChild(n),
      u
    );
  },
  k = document.createElement("style");
k.innerHTML = `
    .moving-circle {
      stroke-dasharray: 628;
      animation: stroke-ani 4s linear; 
    }

    @keyframes stroke-ani {
      from {
        stroke-dashoffset: 628; 
      }
      to {
        stroke-dashoffset: 0;
      }
    }
    `;
document.head.appendChild(k);
const I = () => {
    let u = !1;
    const t = document.createElementNS("http://www.w3.org/2000/svg", "g"),
      n = document.createElementNS("http://www.w3.org/2000/svg", "path");
    n.setAttribute("x", "0"),
      n.setAttribute("y", "0"),
      n.setAttribute("stroke", "gray"),
      n.setAttribute("stroke-linecap", "round"),
      n.setAttribute("stroke-width", "2"),
      n.setAttribute("stroke-dasharray", "10, 10"),
      n.setAttribute("fill", "none"),
      n.setAttribute(
        "d",
        "M 600 100 a -100, 100 0 1,0 0,200 a 100,-100 0 1,0 0 -200"
      ),
      (n.id = "dottedPath");
    const s = document.createElementNS("http://www.w3.org/2000/svg", "path");
    s.setAttribute("x", "0"),
      s.setAttribute("y", "0"),
      s.setAttribute("stroke", "#DB555B"),
      s.setAttribute("stroke-linecap", "round"),
      s.setAttribute("stroke-width", "6"),
      s.setAttribute("fill", "none"),
      s.setAttribute("stroke-dashoffset", "628.4"),
      s.setAttribute("stroke-dasharray", "628.4"),
      s.setAttribute(
        "d",
        "M 600 100 a -100, 100 0 1,0 0,200 a 100,-100 0 1,0 0 -200"
      ),
      (s.id = "drawPath");
    const r = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    r.setAttribute("r", "10"),
      r.setAttribute("cx", "600"),
      r.setAttribute("cy", "100"),
      r.setAttribute("fill", "#DB555B"),
      r.setAttribute("stroke", "#DB555B"),
      r.setAttribute("stroke-width", "1");
    const i = document.createElementNS("http://www.w3.org/2000/svg", "image");
    i.setAttribute("href", "./assets/arrowWhite.png"),
      i.setAttribute("width", "20"),
      i.setAttribute("height", "20"),
      i.setAttribute("x", "590"),
      i.setAttribute("y", "90"),
      window.addEventListener("message", (g) => {
        g.data.type === "firstGroupFinish" &&
          (t.addEventListener("mousedown", N),
          t.addEventListener("mouseup", P),
          t.addEventListener("mousemove", M));
      });
    const d = document.createElementNS("http://www.w3.org/2000/svg", "g"),
      h = document.createElementNS("http://www.w3.org/2000/svg", "text");
    h.setAttribute("font-size", "36"),
      h.setAttribute("font-weight", "bold"),
      h.setAttribute("fill", "#01B41F"),
      h.setAttribute("x", "718"),
      h.setAttribute("y", "140"),
      (h.textContent = "O");
    const o = document.createElementNS("http://www.w3.org/2000/svg", "image");
    o.setAttribute("href", "./assets/speechBubble.png"),
      o.setAttribute("width", "64"),
      o.setAttribute("height", "64"),
      o.setAttribute("x", "700"),
      o.setAttribute("y", "100"),
      d.appendChild(o),
      d.appendChild(h);
    let m = 0,
      l = !1;
    const f = setInterval(() => {
      m += 0.1;
    }, 100);
    function N() {
      l = !0;
    }
    function P() {
      l = !1;
    }
    function B(g, y) {
      const x = g.getTotalLength();
      let A = 8,
        c,
        w,
        b = 1 / 0;
      for (let e, a = 0, p; a <= x; a += A)
        (e = g.getPointAtLength(a)),
          (p = v(e)),
          p < b && ((c = e), (w = a), (b = p));
      for (A /= 2; A > 0.5; ) {
        let e, a, p, S, E, L;
        (p = (w || 0) - A) >= 0 &&
          ((e = g.getPointAtLength(p)),
          (E = v(e)),
          E < b && ((c = e), (w = p), (b = E))),
          (S = (w || 0) + A) <= x &&
            ((a = g.getPointAtLength(S)),
            (L = v(a)),
            L < b && ((c = a), (w = S), (b = L))),
          (A /= 2);
      }
      return (
        c
          ? (c.distance = Math.sqrt(b))
          : ((c = new DOMPoint(0, 0, 0)), (c.distance = 0)),
        (c.length = w),
        { x: c.x, y: c.y, distance: c.distance, length: c.length }
      );
      function v(e) {
        const a = e.x - y[0],
          p = e.y - y[1];
        return a * a + p * p;
      }
    }
    let C = 20;
    function M(g) {
      if (l && !u) {
        const y = document.getElementById("svg"),
          x = g.clientX,
          A = g.clientY,
          c = y.createSVGPoint();
        (c.x = x), (c.y = A);
        const w = c.matrixTransform(y.getScreenCTM().inverse()),
          b = w.x,
          v = w.y;
        let e = B(n, [b, v]);
        if (e.length < C || e.length - C > 50) return;
        if (
          ((C = e.length),
          e.length > 608 &&
            ((u = !0),
            (l = !1),
            t.appendChild(d),
            clearInterval(f),
            window.parent.postMessage(
              { type: "ojt2-2 finish", time: Math.round(m * 10) / 10 },
              "*"
            )),
          e.distance < 40)
        ) {
          if (e.x < 620 && e.x > 608 && e.y < 110 && e.y > 90)
            r.setAttribute("cx", "600"),
              r.setAttribute("cy", "100"),
              i.setAttribute("x", "590"),
              i.setAttribute("y", "90"),
              s.setAttribute("stroke-dashoffset", "0"),
              i.setAttribute("transform", `rotate(0 ${e.x} ${e.y})`);
          else {
            r.setAttribute("cx", e.x.toString()),
              r.setAttribute("cy", e.y.toString());
            let a = -(e.length / 628.4) * 360;
            i.setAttribute("transform", `rotate(${a} ${e.x} ${e.y})`),
              i.setAttribute("x", (e.x - 10).toString()),
              i.setAttribute("y", (e.y - 10).toString()),
              s.setAttribute(
                "stroke-dashoffset",
                (628.4 - e.length).toString()
              );
          }
          s.setAttribute("stroke-dasharray", "628.4");
        }
      }
    }
    return (
      t.appendChild(n), t.appendChild(s), t.appendChild(r), t.appendChild(i), t
    );
  },
  O = () => {
    var n;
    const u = document.createElement("section");
    (u.id = "main-section"),
      (n = document.querySelector("#app")) == null || n.appendChild(u);
    const t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    t.setAttribute("width", "100%"),
      t.setAttribute("height", "100%"),
      t.setAttribute("viewBox", "0 0 1200 800"),
      (t.id = "svg"),
      t.appendChild(D()),
      t.appendChild(I()),
      u.append(t);
  };
O();
