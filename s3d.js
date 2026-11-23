/* s3d.js - mini WebGL 3D: qumsoat (shisha, qum) va marjon. Tashqi kutubxonasiz. */
(function () {
  "use strict"
  var PI = Math.PI
  // ---------- matematika (column-major)
  function I() { return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]) }
  function mul(a, b) { var o = new Float32Array(16); for (var c = 0; c < 4; c++) for (var r = 0; r < 4; r++) { var s = 0; for (var k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k]; o[c * 4 + r] = s } return o }
  function T(x, y, z) { var m = I(); m[12] = x; m[13] = y; m[14] = z; return m }
  function Sc(x, y, z) { var m = I(); m[0] = x; m[5] = y; m[10] = z; return m }
  function RX(a) { var m = I(), c = Math.cos(a), s = Math.sin(a); m[5] = c; m[6] = s; m[9] = -s; m[10] = c; return m }
  function RY(a) { var m = I(), c = Math.cos(a), s = Math.sin(a); m[0] = c; m[2] = -s; m[8] = s; m[10] = c; return m }
  function RZ(a) { var m = I(), c = Math.cos(a), s = Math.sin(a); m[0] = c; m[1] = s; m[4] = -s; m[5] = c; return m }
  function P(fov, asp, n, f) { var t = 1 / Math.tan(fov / 2), m = new Float32Array(16); m[0] = t / asp; m[5] = t; m[10] = (f + n) / (n - f); m[11] = -1; m[14] = 2 * f * n / (n - f); return m }
  function NM(m) {
    var o = new Float32Array(9), i, l
    for (i = 0; i < 3; i++) { l = Math.hypot(m[i * 4], m[i * 4 + 1], m[i * 4 + 2]) || 1; o[i * 3] = m[i * 4] / l; o[i * 3 + 1] = m[i * 4 + 1] / l; o[i * 3 + 2] = m[i * 4 + 2] / l }
    return o
  }
  function hex(c) { var m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(String(c).trim()); if (m) return [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255]; m = /rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)/.exec(String(c)); return m ? [m[1] / 255, m[2] / 255, m[3] / 255] : [.9, .76, .45] }
  function mix(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t] }

  // ---------- shader
  var VS = "attribute vec3 aP,aN;uniform mat4 uVP,uM;uniform mat3 uNM;varying vec3 vN,vW;void main(){vec4 w=uM*vec4(aP,1.);vW=w.xyz;vN=uNM*aN;gl_Position=uVP*w;}"
  var FS = "precision highp float;varying vec3 vN,vW;uniform vec3 uCam,uCol;uniform float uRough,uMetal,uAlpha,uMode,uEmis;" +
    "float h(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,37.719)))*43758.5453);}" +
    "vec3 env(vec3 d){float y=d.y*.5+.5;vec3 c=mix(vec3(.10,.12,.16),vec3(.78,.88,.98),smoothstep(.15,.95,y));" +
    "c+=vec3(2.6)*smoothstep(.90,.985,dot(d,normalize(vec3(.55,.65,.55))));" +
    "c+=vec3(.7,.9,1.6)*smoothstep(.85,.97,dot(d,normalize(vec3(-.8,.25,.5))));" +
    "c+=vec3(1.8,1.3,.8)*smoothstep(.88,.97,dot(d,normalize(vec3(.1,-.5,-.85))));" +
    "c+=vec3(.5)*smoothstep(.0,.2,-d.y)*.4;return c;}" +
    "void main(){vec3 N=normalize(vN);if(!gl_FrontFacing)N=-N;vec3 V=normalize(uCam-vW);float nv=max(dot(N,V),0.);" +
    "vec3 L=normalize(vec3(.5,.8,.6));vec3 R=reflect(-V,N);vec3 base=pow(uCol,vec3(2.2));" +
    "if(uMode>.5&&uMode<1.5){float g=h(floor(vW*70.));base*=.82+.3*g;if(g>.992)base+=.6;}" +
    "float fres=pow(1.-nv,4.);float sm=1.-uRough;vec3 e=env(R);vec3 F0=mix(vec3(.04),base,uMetal);vec3 F=F0+(1.-F0)*fres*sm;" +
    "float dif=max(dot(N,L),0.)*.75+.28+.12*max(-dot(N,L),0.);vec3 col=base*dif*(1.-uMetal)*(1.-F*.5);col+=e*F*(.35+.65*sm);" +
    "float sp=pow(max(dot(R,L),0.),mix(6.,260.,sm*sm));col+=vec3(1.)*sp*(.25+.9*sm);col+=base*uEmis;float a=uAlpha;" +
    "if(uMode>1.5){float k=clamp(uAlpha*9.,0.,1.);col=(e*(F*1.1+.015)+vec3(sp*1.1))*k+base*.02;a=uAlpha+fres*.22*k+sp*.3*k;}" +
    "col=col/(1.+col*.18);col=pow(col,vec3(1./2.2));gl_FragColor=vec4(uMode>1.5?col:col*a,a);}"

  // ---------- GL konteksti
  function ctx(cv) {
    var gl = null
    try { gl = cv.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true }) || cv.getContext("experimental-webgl", { alpha: true, antialias: true, premultipliedAlpha: true }) } catch (e) {}
    if (!gl) return null
    function sh(t, s) { var o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o }
    var pr = gl.createProgram()
    try { gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr) } catch (e) { return null }
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null
    gl.useProgram(pr)
    var U = {}, nm = ["uVP", "uM", "uNM", "uCam", "uCol", "uRough", "uMetal", "uAlpha", "uMode", "uEmis"]
    nm.forEach(function (n) { U[n] = gl.getUniformLocation(pr, n) })
    var aP = gl.getAttribLocation(pr, "aP"), aN = gl.getAttribLocation(pr, "aN")
    gl.enableVertexAttribArray(aP); gl.enableVertexAttribArray(aN)
    gl.enable(gl.DEPTH_TEST); gl.enable(gl.CULL_FACE); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.enable(gl.BLEND)
    var C = { gl: gl, U: U, VP: I(), cam: [0, 0, 6] }
    C.mesh = function (g, dyn) {
      var m = { p: gl.createBuffer(), n: gl.createBuffer(), i: gl.createBuffer(), c: 0 }
      C.set(m, g, dyn); return m
    }
    C.set = function (m, g, dyn) {
      var u = dyn ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW
      gl.bindBuffer(gl.ARRAY_BUFFER, m.p); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(g.p), u)
      gl.bindBuffer(gl.ARRAY_BUFFER, m.n); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(g.n), u)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m.i); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(g.i), u)
      m.c = g.i.length
    }
    C.draw = function (m, M, o) {
      if (!m.c) return
      gl.uniformMatrix4fv(U.uM, false, M); gl.uniformMatrix3fv(U.uNM, false, o.nm || NM(M))
      gl.uniform3fv(U.uCol, o.col); gl.uniform1f(U.uRough, o.rough == null ? .4 : o.rough); gl.uniform1f(U.uMetal, o.metal || 0)
      gl.uniform1f(U.uAlpha, o.alpha == null ? 1 : o.alpha); gl.uniform1f(U.uMode, o.mode || 0); gl.uniform1f(U.uEmis, o.emis || 0)
      gl.bindBuffer(gl.ARRAY_BUFFER, m.p); gl.vertexAttribPointer(aP, 3, gl.FLOAT, false, 0, 0)
      gl.bindBuffer(gl.ARRAY_BUFFER, m.n); gl.vertexAttribPointer(aN, 3, gl.FLOAT, false, 0, 0)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m.i)
      gl.drawElements(gl.TRIANGLES, m.c, gl.UNSIGNED_SHORT, 0)
    }
    C.frame = function (W, H, fov, D) {
      gl.viewport(0, 0, W, H); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      C.VP = mul(P(fov, W / H, .5, 30), T(0, 0, -D)); C.cam = [0, 0, D]
      gl.uniformMatrix4fv(U.uVP, false, C.VP); gl.uniform3fv(U.uCam, C.cam)
    }
    C.dispose = function () { try { var x = gl.getExtension("WEBGL_lose_context"); if (x) x.loseContext() } catch (e) {} }
    return C
  }

  // ---------- geometriya
  function lathe(prof, seg) {
    var p = [], n = [], ix = [], K = prof.length, j, k, nr, ny, l, dr, dy
    for (j = 0; j <= seg; j++) {
      var ph = j / seg * 2 * PI, c = Math.cos(ph), s = Math.sin(ph)
      for (k = 0; k < K; k++) {
        var a = prof[Math.max(0, k - 1)], b = prof[Math.min(K - 1, k + 1)]
        dr = b[0] - a[0]; dy = b[1] - a[1]; l = Math.hypot(dr, dy) || 1; nr = dy / l; ny = -dr / l
        p.push(prof[k][0] * c, prof[k][1], prof[k][0] * s); n.push(nr * c, ny, nr * s)
      }
    }
    for (j = 0; j < seg; j++) for (k = 0; k < K - 1; k++) {
      var q = j * K + k, w = (j + 1) * K + k
      ix.push(q, q + 1, w, q + 1, w + 1, w)
    }
    return { p: p, n: n, i: ix }
  }
  function sphere() {
    var prof = [], a
    for (a = 0; a <= 18; a++) { var t = -PI / 2 + a / 18 * PI; prof.push([Math.max(.0001, Math.cos(t)), Math.sin(t)]) }
    return lathe(prof, 26)
  }
  function torus(R, r) {
    var p = [], n = [], ix = [], a, b, A = 40, B = 10
    for (a = 0; a <= A; a++) for (b = 0; b <= B; b++) {
      var u = a / A * 2 * PI, v = b / B * 2 * PI, cx = Math.cos(u), sx = Math.sin(u), cv = Math.cos(v), sv = Math.sin(v)
      p.push((R + r * cv) * cx, (R + r * cv) * sx, r * sv); n.push(cv * cx, cv * sx, sv)
    }
    for (a = 0; a < A; a++) for (b = 0; b < B; b++) { var q = a * (B + 1) + b, w = (a + 1) * (B + 1) + b; ix.push(q, w, q + 1, q + 1, w, w + 1) }
    return { p: p, n: n, i: ix }
  }
  function mirror(prof) { return prof.map(function (q) { return [q[0], -q[1]] }).reverse() }

  // ---------- qumsoat profil
  function rOut(y) {
    var a = Math.abs(y), r
    if (a <= .8) r = .085 + (.82 - .085) * Math.pow(Math.sin(a / .8 * PI / 2), .85)
    else { var u = (a - .8) / .2; r = .82 - .3 * u * u }
    return r
  }
  function rIn(y) { return Math.max(.035, rOut(y) - .05) * .97 }
  var VT = [0], VN = 100
  ;(function () { var a, s = 0; for (a = 1; a <= VN; a++) { var y = a / VN, r = rIn(y); s += PI * r * r / VN; VT.push(s) } })()
  var VTOT = VT[VN]
  function invV(v) { var i = 0; while (i < VN && VT[i + 1] < v) i++; var f = (v - VT[i]) / ((VT[i + 1] - VT[i]) || 1); return (i + f) / VN }
  function sandTop(v) { // yuqori kolbadagi qum
    var aL = invV(v * .9 * VTOT), pr = [[0, 0]], N = Math.max(4, Math.round(aL * 40)), k
    for (k = 1; k <= N; k++) { var y = aL * k / N; pr.push([rIn(y) * .98, y]) }
    var rl = rIn(aL) * .98
    for (k = 1; k <= 8; k++) { var s = 1 - k / 8; pr.push([rl * s, aL - .11 * (1 - s * s) * Math.min(1, aL * 6)]) }
    return lathe(pr, 28)
  }
  function sandBot(v) { // pastki kolbadagi qum
    var aL = invV(VTOT - v * .9 * VTOT), pr = [[0, -1]], N = Math.max(4, Math.round((1 - aL) * 40)), k
    pr.push([rIn(1) * .98, -1])
    for (k = 1; k <= N; k++) { var y = 1 - (1 - aL) * k / N; pr.push([rIn(y) * .98, -y]) }
    var rl = rIn(aL) * .98
    for (k = 1; k <= 8; k++) { var s = 1 - k / 8; pr.push([rl * s, -aL + .13 * (1 - s * s * .6) * Math.min(1, v * 4)]) }
    return { g: lathe(pr, 28), top: -aL + .13 * Math.min(1, v * 4) }
  }

  var ok = null
  function supported() {
    if (ok !== null) return ok
    try { var c = document.createElement("canvas"), C = ctx(c); ok = !!C; if (C) C.dispose() } catch (e) { ok = false }
    return ok
  }
  function size(cv, w, h) {
    var d = Math.min(2, window.devicePixelRatio || 1)
    cv.style.width = w + "px"; cv.style.height = h + "px"; cv.width = Math.round(w * d); cv.height = Math.round(h * d)
  }

  // ---------- QUMSOAT
  function glass(cv, o) {
    var C = ctx(cv); if (!C) return null
    var w = o.w || 200, h = o.h || 290
    size(cv, w, h)
    var glassOut = []
    ;(function () { var k; for (k = 0; k <= 60; k++) { var y = -1 + k / 30; glassOut.push([rOut(y) + .0, y]) } })()
    var gl1 = C.mesh(lathe(glassOut, 40)), gl2 = C.mesh(lathe(glassOut.map(function (q) { return [Math.max(.03, q[0] - .045), q[1]] }), 40))
    var capT = [[0, 1.0], [.6, 1.0], [.69, 1.02], [.72, 1.06], [.69, 1.1], [.6, 1.12], [0, 1.12]]
    var cT = C.mesh(lathe(capT, 40)), cB = C.mesh(lathe(mirror(capT), 40))
    var pil = C.mesh(lathe([[0, -1.06], [.032, -1.06], [.032, 1.06], [0, 1.06]], 14))
    var small = C.mesh(sphere()), strm = C.mesh(lathe([[0, 0], [.012, 0], [.012, 1], [0, 1]], 8))
    var sT = C.mesh({ p: [], n: [], i: [] }, true), sB = C.mesh({ p: [], n: [], i: [] }, true)
    var S = { p: o.p0 || 0, t: o.p0 || 0, raf: 0, lt: 0, tt: 0, dead: false, rate: .38, last: -1 }
    var gold = { col: [.93, .72, .3], metal: .95, rough: .22 }
    function colors() { var c = o.colors ? o.colors() : null, a = c ? hex(c[0]) : [.25, .81, .61], b = c ? hex(c[1]) : [.12, .62, .45]; return mix(mix(a, b, .35), [.95, .74, .36], .3) }
    var sandCol = colors()
    function rebuild() {
      if (S.p === S.last) return
      S.last = S.p
      var top = 1 - S.p, bot = S.p
      if (top > .004) C.set(sT, sandTop(top), true); else C.set(sT, { p: [], n: [], i: [] }, true)
      if (bot > .004) { var b = sandBot(bot); S.bTop = b.top; C.set(sB, b.g, true) } else { S.bTop = -1; C.set(sB, { p: [], n: [], i: [] }, true) }
    }
    function frame(ts) {
      if (S.dead) return
      if (!document.body.contains(cv)) { S.dead = true; C.dispose(); return }
      S.raf = requestAnimationFrame(frame)
      if (document.hidden) { S.lt = 0; return }
      var dt = S.lt ? Math.min(.05, (ts - S.lt) / 1000) : .016; S.lt = ts; S.tt += dt
      var d = S.t - S.p
      if (Math.abs(d) > 1e-4) S.p += Math.sign(d) * Math.min(Math.abs(d), S.rate * dt); else S.p = S.t
      rebuild()
      var flow = S.p < S.t - 1e-4 || (S.p > 0 && S.p < 1 && S.flow > 0)
      S.flow = Math.max(0, (S.flow || 0) - dt)
      C.frame(cv.width, cv.height, .52, 5.4)
      var yaw = Math.sin(S.tt * .55) * .32 + (o.yaw ? o.yaw() : 0), G = mul(RX(.12), RY(yaw))
      var gl = C.gl
      gl.disable(gl.BLEND); gl.depthMask(true); gl.cullFace(gl.BACK)
      // metall qismlar
      C.draw(cT, G, gold); C.draw(cB, G, gold)
      for (var k = 0; k < 3; k++) { var a = PI / 2 + k * 2 * PI / 3; C.draw(pil, mul(G, T(Math.cos(a) * .9, 0, Math.sin(a) * .9)), gold) }
      gl.enable(gl.BLEND)
      var sc = { col: sandCol, mode: 1, rough: .85, metal: 0 }
      C.draw(sT, G, sc); C.draw(sB, G, sc)
      if (flow && S.p < 1) {
        var yb = S.bTop == null || S.bTop < -1 ? -.9 : S.bTop
        C.draw(strm, mul(G, mul(T(0, yb, 0), Sc(1, .06 - yb, 1))), { col: sandCol, mode: 1, rough: .8, alpha: .95 })
        for (var q = 0; q < 14; q++) {
          var ph = (S.tt * 1.7 + q / 14) % 1, y = .05 + (yb - .05) * ph * ph, x = Math.sin(q * 7.3 + S.tt * 3) * .018 * (ph + .3)
          C.draw(small, mul(G, mul(T(x, y, Math.cos(q * 5.1) * .018), Sc(.016, .016, .016))), { col: sandCol, mode: 1, rough: .8 })
        }
      }
      gl.depthMask(false)
      var gc = { col: [.82, .95, 1], mode: 2, rough: .04, alpha: .06 }
      gl.cullFace(gl.FRONT); C.draw(gl2, G, { col: gc.col, mode: 2, rough: .1, alpha: .03 }); C.draw(gl1, G, gc)
      gl.cullFace(gl.BACK); C.draw(gl2, G, { col: gc.col, mode: 2, rough: .1, alpha: .03 }); C.draw(gl1, G, gc)
      gl.depthMask(true)
    }
    S.raf = requestAnimationFrame(frame)
    return {
      to: function (p) { S.t = Math.max(0, Math.min(1, p)); S.flow = .6 },
      eta: function () { return Math.max(250, (S.t - S.p) / S.rate * 1000 + 350) },
      stop: function () { S.dead = true; cancelAnimationFrame(S.raf); C.dispose() }
    }
  }

  // ---------- MARJON
  var PAL = [[[.1, .75, .55], .12, .2], [[.95, .62, .18], .15, .25], [[.85, .12, .22], .12, .2], [[.96, .94, .9], .0, .32], [[.42, .27, .17], .0, .55]]
  function beads(cv, o) {
    var C = ctx(cv); if (!C) return null
    var pw = cv.parentNode && cv.parentNode.clientWidth, w = Math.min((pw || window.innerWidth - 32) - 2, 400), h = Math.round(w * 1.02)
    size(cv, w, h)
    var sph = C.mesh(sphere()), tor = C.mesh(torus(1, .012)), tas = C.mesh(lathe([[0, 0], [.03, -.02], [.06, -.12], [.11, -.3], [.13, -.5], [.1, -.62], [.02, -.66], [0, -.66]], 20))
    var capm = C.mesh(lathe([[0, .0], [.07, 0], [.085, -.03], [.07, -.07], [0, -.07]], 16))
    var N = 33, S = { off: 0, tg: 0, yaw: 0, pitch: 0, pop: 0, fl: 0, tt: 0, lt: 0, dead: false, down: false }
    var RXr = 1.12, RYr = 1.28
    function step(kind) { S.tg += 2 * PI / N; S.pop = 1; if (kind === 2) S.fl = 1; else if (kind === 1) S.fl = .6 }
    function frame(ts) {
      if (S.dead) return
      if (!document.body.contains(cv)) { S.dead = true; C.dispose(); return }
      S.raf = requestAnimationFrame(frame)
      if (document.hidden) { S.lt = 0; return }
      var dt = S.lt ? Math.min(.05, (ts - S.lt) / 1000) : .016; S.lt = ts; S.tt += dt
      S.off += (S.tg - S.off) * Math.min(1, dt * 12); S.pop = Math.max(0, S.pop - dt * 4); S.fl = Math.max(0, S.fl - dt * 1.3)
      if (!S.down) S.yaw += (0 - S.yaw) * Math.min(1, dt * 3)
      C.frame(cv.width, cv.height, .56, 6.1)
      var th = o.theme ? o.theme() % PAL.length : 0, pal = PAL[th]
      var G = mul(RX(-.95 + S.pitch), mul(RY(S.yaw + Math.sin(S.tt * .6) * .07), RZ(0)))
      var gl = C.gl; gl.disable(gl.BLEND); gl.depthMask(true); gl.cullFace(gl.BACK)
      // ip
      C.draw(tor, mul(G, Sc(RXr, RYr, 1)), { col: [.35, .28, .2], rough: .7 })
      var best = 0, bd = 9, i, imam = null
      for (i = 0; i < N; i++) {
        var a = -PI / 2 + i * 2 * PI / N - S.off + 0, df = Math.abs(((a + PI / 2 + PI) % (2 * PI) + 2 * PI) % (2 * PI) - PI)
        var front = Math.max(0, 1 - df / (PI / N * .9))
        var x = Math.cos(a) * RXr, y = Math.sin(a) * RYr
        var im = i === 0, r = im ? .125 : .094, pop = front * (S.pop * .14)
        var col = im ? [.96, .82, .48] : pal[0], met = im ? .9 : pal[1], rough = im ? .2 : pal[2]
        var M = mul(G, mul(T(x, y, 0), Sc(r * (1 + pop), r * (1 + pop), r * (1 + pop))))
        C.draw(sph, M, { col: col, metal: met, rough: rough, emis: front * (.12 + S.fl * .5) })
        if (im) imam = mul(G, T(x, y, 0))
      }
      // popuk
      if (imam) {
        var wx = imam[12], wy = imam[13], wz = imam[14], sw = Math.sin(S.tt * 1.3) * .06 + S.yaw * .1
        var Mt = mul(T(wx, wy - .1, wz), RZ(sw))
        C.draw(capm, mul(T(wx, wy - .09, wz), Sc(1, 1, 1)), { col: [.93, .72, .3], metal: .95, rough: .22 })
        C.draw(tas, Mt, { col: [.86, .2, .28], rough: .6 })
      }
    }
    S.raf = requestAnimationFrame(frame)
    // sichqoncha/barmoq: tortib yo'naltirish; bosish yoki surish = 1 qadam
    var sx = 0, sy = 0, mv = 0, acc = 0
    function pd(e) { S.down = true; sx = e.clientX; sy = e.clientY; mv = 0; acc = 0; try { cv.setPointerCapture(e.pointerId) } catch (x) {} e.preventDefault() }
    function pm(e) {
      if (!S.down) return
      var dx = e.clientX - sx, dy = e.clientY - sy; sx = e.clientX; sy = e.clientY; mv += Math.abs(dx) + Math.abs(dy)
      S.yaw = Math.max(-.7, Math.min(.7, S.yaw + dx * .008)); acc += Math.abs(dy)
      while (acc >= 34) { acc -= 34; o.onStep && o.onStep() }
    }
    function pu() { if (!S.down) return; S.down = false; if (mv < 8) o.onStep && o.onStep() }
    cv.addEventListener("pointerdown", pd); cv.addEventListener("pointermove", pm); cv.addEventListener("pointerup", pu); cv.addEventListener("pointercancel", function () { S.down = false })
    return { advance: step, stop: function () { S.dead = true; cancelAnimationFrame(S.raf); C.dispose() } }
  }

  window.S3D = { ok: supported, glass: glass, beads: beads }
})()
