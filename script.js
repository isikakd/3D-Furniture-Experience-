/* script.js — Ev Atölyesi */

/* ── Yardımcı: scroll ── */
function goTo(sel) {
  const el = document.querySelector(sel);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ── Hamburger ── */
const hbg = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hbg.addEventListener('click', () => {
  hbg.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hbg.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── Scroll Reveal ── */
const ro = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80);
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* ═══════════════════════════════════════════
   THREE.JS YARDIMCILAR
═══════════════════════════════════════════ */
function mkMesh(geo, mat, x, y, z) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  return m;
}
function gndShadow(r) {
  const m = new THREE.Mesh(
    new THREE.CircleGeometry(r, 32),
    new THREE.MeshStandardMaterial({ color: 0x8B6343, transparent: true, opacity: 0.12 })
  );
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.001;
  return m;
}
function M(color, rough, metal) {
  return new THREE.MeshStandardMaterial({ color: color, roughness: rough || 0.7, metalness: metal || 0 });
}
function addLights(scene) {
  scene.add(new THREE.AmbientLight(0xfff8f0, 0.65));
  const d = new THREE.DirectionalLight(0xfffaf0, 1.2);
  d.position.set(5, 8, 5);
  scene.add(d);
  const f = new THREE.DirectionalLight(0xc4956a, 0.3);
  f.position.set(-5, 2, -3);
  scene.add(f);
}

/* ═══════════════════════════════════════════
   3D MODELLER
═══════════════════════════════════════════ */

function buildBerjer() {
  var g = new THREE.Group();
  var wood = M(0x9C6B3C, 0.6), fab = M(0x5C4A3A, 0.95), lt = M(0x8A7060, 0.95);

  g.add(mkMesh(new THREE.CylinderGeometry(0.38, 0.35, 0.12, 32), fab, 0, 0.42, 0));
  g.add(mkMesh(new THREE.CylinderGeometry(0.36, 0.38, 0.10, 32), lt, 0, 0.52, 0));

  var back = mkMesh(new THREE.BoxGeometry(0.68, 0.70, 0.14), fab, 0, 0.93, -0.22);
  back.rotation.x = 0.18;
  g.add(back);

  var bTop = mkMesh(new THREE.CylinderGeometry(0.34, 0.34, 0.14, 24, 1, false, 0, Math.PI), fab, 0, 1.28, -0.22);
  bTop.rotation.z = Math.PI / 2;
  bTop.rotation.y = Math.PI / 2;
  g.add(bTop);

  [-0.34, 0.34].forEach(function(x) {
    g.add(mkMesh(new THREE.BoxGeometry(0.09, 0.07, 0.55), lt, x, 0.68, 0.02));
    g.add(mkMesh(new THREE.BoxGeometry(0.07, 0.22, 0.07), wood, x, 0.52, 0.24));
    g.add(mkMesh(new THREE.CylinderGeometry(0.025, 0.03, 0.44, 10), wood, x, 0.22, 0.26));
  });
  [-0.26, 0.26].forEach(function(x) {
    g.add(mkMesh(new THREE.CylinderGeometry(0.025, 0.03, 0.50, 10), wood, x, 0.22, -0.30));
  });

  var frame = mkMesh(new THREE.TorusGeometry(0.32, 0.025, 8, 32), wood, 0, 0.38, 0);
  frame.rotation.x = Math.PI / 2;
  g.add(frame);

  var pillow = mkMesh(new THREE.BoxGeometry(0.42, 0.30, 0.10), lt, 0, 0.88, -0.17);
  pillow.rotation.x = 0.18;
  g.add(pillow);

  g.add(gndShadow(0.52));
  return g;
}

function buildSofa() {
  var g = new THREE.Group();
  var wood = M(0x4A2C17, 0.5), fab = M(0x3D3028, 1.0), lt = M(0x8A7060, 0.95), metal = M(0x2A2A2A, 0.3, 0.8);

  g.add(mkMesh(new THREE.BoxGeometry(1.80, 0.20, 0.72), wood, 0, 0.20, 0));

  [-0.56, 0, 0.56].forEach(function(x) {
    g.add(mkMesh(new THREE.BoxGeometry(0.54, 0.16, 0.58), fab, x, 0.38, 0.04));
  });

  g.add(mkMesh(new THREE.BoxGeometry(1.80, 0.58, 0.16), fab, 0, 0.70, -0.28));
  [-0.56, 0, 0.56].forEach(function(x) {
    g.add(mkMesh(new THREE.BoxGeometry(0.54, 0.50, 0.12), fab, x, 0.70, -0.23));
  });

  [-0.90, 0.90].forEach(function(x) {
    g.add(mkMesh(new THREE.BoxGeometry(0.18, 0.52, 0.72), fab, x, 0.52, 0));
    g.add(mkMesh(new THREE.BoxGeometry(0.20, 0.06, 0.72), lt, x, 0.78, 0));
  });

  [[-0.76,-0.28],[0.76,-0.28],[-0.76,0.28],[0.76,0.28]].forEach(function(p) {
    g.add(mkMesh(new THREE.BoxGeometry(0.06, 0.20, 0.06), metal, p[0], 0.10, p[1]));
  });

  g.add(gndShadow(1.15));
  return g;
}

function buildWardrobe() {
  var g = new THREE.Group();
  var wood = M(0x9C6B3C, 0.6), dark = M(0x6B4226, 0.55), white = M(0xEFEBE3, 0.7), metal = M(0x2A2A2A, 0.3, 0.8);

  g.add(mkMesh(new THREE.BoxGeometry(1.60, 1.90, 0.54), wood, 0, 0.95, 0));
  g.add(mkMesh(new THREE.BoxGeometry(1.66, 0.06, 0.58), dark, 0, 1.93, 0));
  g.add(mkMesh(new THREE.BoxGeometry(1.66, 0.06, 0.58), dark, 0, 0.03, 0));
  g.add(mkMesh(new THREE.BoxGeometry(0.04, 1.90, 0.52), dark, 0, 0.95, 0));

  [-0.40, 0.40].forEach(function(x, i) {
    g.add(mkMesh(new THREE.BoxGeometry(0.74, 1.80, 0.04), white, x, 0.96, 0.29));
    g.add(mkMesh(new THREE.BoxGeometry(0.76, 1.82, 0.02), dark, x, 0.96, 0.27));
    g.add(mkMesh(new THREE.BoxGeometry(0.58, 0.80, 0.01), wood, x, 1.12, 0.32));
    g.add(mkMesh(new THREE.BoxGeometry(0.58, 0.60, 0.01), wood, x, 0.52, 0.32));
    var hx = (i === 0) ? x + 0.28 : x - 0.28;
    var handle = mkMesh(new THREE.CylinderGeometry(0.012, 0.012, 0.12, 10), metal, hx, 0.96, 0.32);
    handle.rotation.z = Math.PI / 2;
    g.add(handle);
  });

  g.add(gndShadow(1.0));
  return g;
}

function buildBed() {
  var g = new THREE.Group();
  var wood = M(0x9C6B3C, 0.6), fab = M(0x5C4A3A, 0.95), lt = M(0x8A7060, 0.95), white = M(0xEFEBE3, 0.7);

  g.add(mkMesh(new THREE.BoxGeometry(1.70, 0.22, 2.10), wood, 0, 0.18, 0));
  g.add(mkMesh(new THREE.BoxGeometry(1.62, 0.22, 1.95), white, 0, 0.40, -0.02));
  g.add(mkMesh(new THREE.BoxGeometry(1.60, 0.12, 1.40), lt, 0, 0.52, 0.24));

  [-0.38, 0.38].forEach(function(x) {
    g.add(mkMesh(new THREE.BoxGeometry(0.62, 0.12, 0.40), white, x, 0.53, -0.72));
  });

  g.add(mkMesh(new THREE.BoxGeometry(1.70, 0.90, 0.10), wood, 0, 0.82, -1.04));
  g.add(mkMesh(new THREE.BoxGeometry(1.74, 0.06, 0.12), wood, 0, 1.26, -1.04));
  g.add(mkMesh(new THREE.BoxGeometry(1.50, 0.70, 0.06), fab, 0, 0.80, -0.99));
  g.add(mkMesh(new THREE.BoxGeometry(1.70, 0.40, 0.08), wood, 0, 0.50, 1.04));

  [[-0.76,-0.98],[0.76,-0.98],[-0.76,0.98],[0.76,0.98]].forEach(function(p) {
    g.add(mkMesh(new THREE.BoxGeometry(0.08, 0.18, 0.08), wood, p[0], 0.07, p[1]));
  });

  g.add(gndShadow(1.2));
  return g;
}

function buildDesk() {
  var g = new THREE.Group();
  var wood = M(0x4A2C17, 0.5), metal = M(0x2A2A2A, 0.3, 0.8);

  g.add(mkMesh(new THREE.BoxGeometry(1.60, 0.06, 0.72), wood, 0, 0.74, 0));
  g.add(mkMesh(new THREE.BoxGeometry(1.30, 0.04, 0.50), wood, 0, 0.28, 0.02));

  [-0.68, 0.68].forEach(function(x) {
    g.add(mkMesh(new THREE.BoxGeometry(0.04, 0.74, 0.04), metal, x, 0.37, 0.32));
    g.add(mkMesh(new THREE.BoxGeometry(0.04, 0.74, 0.04), metal, x, 0.37, -0.30));
    g.add(mkMesh(new THREE.BoxGeometry(0.04, 0.04, 0.64), metal, x, 0.04, 0.01));
  });
  g.add(mkMesh(new THREE.BoxGeometry(1.36, 0.04, 0.04), metal, 0, 0.04, 0.32));
  g.add(mkMesh(new THREE.BoxGeometry(1.36, 0.04, 0.04), metal, 0, 0.04, -0.30));
  g.add(mkMesh(new THREE.BoxGeometry(0.38, 0.14, 0.48), wood, 0.56, 0.57, 0.01));
  g.add(mkMesh(new THREE.BoxGeometry(0.18, 0.02, 0.02), metal, 0.56, 0.57, 0.26));

  g.add(gndShadow(1.0));
  return g;
}

function buildBookcase() {
  var g = new THREE.Group();
  var wood = M(0x9C6B3C, 0.6), dark = M(0x6B4226, 0.55);
  var bColors = [0x8B3A3A, 0x2E5B8A, 0x3A7A3A, 0xA0782A, 0x5A3A8A, 0x8A5A2A, 0x2A6A6A];

  [-0.75, 0.75].forEach(function(x) {
    g.add(mkMesh(new THREE.BoxGeometry(0.04, 2.00, 0.36), dark, x, 1.00, 0));
  });
  g.add(mkMesh(new THREE.BoxGeometry(1.50, 2.00, 0.02), wood, 0, 1.00, -0.17));
  g.add(mkMesh(new THREE.BoxGeometry(1.56, 0.04, 0.38), dark, 0, 2.00, 0));
  g.add(mkMesh(new THREE.BoxGeometry(1.56, 0.04, 0.38), dark, 0, 0.02, 0));

  [0.38, 0.75, 1.12, 1.49, 1.86].forEach(function(y, si) {
    g.add(mkMesh(new THREE.BoxGeometry(1.50, 0.03, 0.36), dark, 0, y, 0));
    var cx = -0.68;
    for (var i = 0; i < 7; i++) {
      var bw = 0.065 + (si * 3 + i) % 3 * 0.02;
      var bh = 0.22 + (si + i) % 4 * 0.05;
      var book = mkMesh(
        new THREE.BoxGeometry(bw, bh, 0.22),
        M(bColors[(si * 7 + i) % bColors.length], 0.8),
        cx + bw / 2, y + 0.03 + bh / 2, 0.02
      );
      g.add(book);
      cx += bw + 0.01;
      if (cx > 0.64) break;
    }
  });

  g.add(gndShadow(0.9));
  return g;
}

function buildModel(idx) {
  if (idx === 0) return buildBerjer();
  if (idx === 1) return buildSofa();
  if (idx === 2) return buildWardrobe();
  if (idx === 3) return buildBed();
  if (idx === 4) return buildDesk();
  if (idx === 5) return buildBookcase();
  return buildBerjer();
}

/* ═══════════════════════════════════════════
   KAMERA ORBIT YARDIMCISI
═══════════════════════════════════════════ */
function makeOrbit(canvas, onDrag) {
  var drag = false, px = 0, py = 0;
  canvas.addEventListener('mousedown', function(e) { drag = true; px = e.clientX; py = e.clientY; });
  window.addEventListener('mouseup', function() { drag = false; });
  window.addEventListener('mousemove', function(e) {
    if (!drag) return;
    onDrag(e.clientX - px, e.clientY - py);
    px = e.clientX; py = e.clientY;
  });
  canvas.addEventListener('touchstart', function(e) { px = e.touches[0].clientX; py = e.touches[0].clientY; }, { passive: true });
  canvas.addEventListener('touchmove', function(e) {
    onDrag(e.touches[0].clientX - px, e.touches[0].clientY - py);
    px = e.touches[0].clientX; py = e.touches[0].clientY;
  }, { passive: true });
}

/* ═══════════════════════════════════════════
   HERO VIEWER
═══════════════════════════════════════════ */
(function() {
  var wrap = document.getElementById('hero-viewer-wrap');
  var canvas = document.getElementById('hero-canvas');

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  addLights(scene);

  var model = buildModel(0);
  scene.add(model);

  var rotY = 0, rotX = 0.28, zoom = 1;

  makeOrbit(canvas, function(dx, dy) {
    rotY += dx * 0.011;
    rotX = Math.max(-0.45, Math.min(0.75, rotX + dy * 0.006));
  });
  canvas.addEventListener('wheel', function(e) {
    zoom = Math.max(0.5, Math.min(2.5, zoom + e.deltaY * 0.001));
  }, { passive: true });

  window.heroZoom = function(d) { zoom = Math.max(0.5, Math.min(2.5, zoom + d * 0.2)); };
  window.heroReset = function() { rotY = 0; rotX = 0.28; zoom = 1; };

  function resize() {
    var w = wrap.clientWidth, h = wrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);

  (function loop() {
    requestAnimationFrame(loop);
    resize();
    model.rotation.y = rotY + performance.now() * 0.0003;
    var r = 3.6 * zoom;
    camera.position.set(
      Math.sin(rotY) * r * Math.cos(rotX),
      r * Math.sin(rotX) + 1,
      Math.cos(rotY) * r * Math.cos(rotX)
    );
    camera.lookAt(0, 0.5, 0);
    renderer.render(scene, camera);
  })();
})();

/* ═══════════════════════════════════════════
   THUMBNAIL VIEWER'LAR
═══════════════════════════════════════════ */
var camCfg = [
  { d: 2.8, rx: 0.32, ly: 0.45 },
  { d: 3.8, rx: 0.28, ly: 0.50 },
  { d: 3.2, rx: 0.25, ly: 0.95 },
  { d: 3.8, rx: 0.30, ly: 0.40 },
  { d: 3.2, rx: 0.28, ly: 0.35 },
  { d: 3.4, rx: 0.28, ly: 1.00 },
];

document.querySelectorAll('.thumb-canvas').forEach(function(canvas) {
  var idx = parseInt(canvas.dataset.idx);
  var wrap = canvas.parentElement;
  var cfg = camCfg[idx] || camCfg[0];

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  addLights(scene);

  var model = buildModel(idx);
  scene.add(model);
  var t0 = performance.now();

  function resize() {
    var w = wrap.clientWidth, h = wrap.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);

  (function loop() {
    requestAnimationFrame(loop);
    resize();
    var t = (performance.now() - t0) * 0.0003;
    model.rotation.y = t;
    var r = cfg.d;
    camera.position.set(
      Math.sin(t) * r * Math.cos(cfg.rx),
      r * Math.sin(cfg.rx) + 0.2,
      Math.cos(t) * r * Math.cos(cfg.rx)
    );
    camera.lookAt(0, cfg.ly * 0.5, 0);
    renderer.render(scene, camera);
  })();
});

/* ═══════════════════════════════════════════
   MODAL VIEWER
═══════════════════════════════════════════ */
var mScene = null, mModel = null, mRotY = 0, mRotX = 0.28, mZoom = 1;

(function() {
  var canvas = document.getElementById('modal-canvas');
  var wrap = canvas.parentElement;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0xF6F1E9);

  mScene = new THREE.Scene();
  mScene.background = new THREE.Color(0xF6F1E9);
  var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  addLights(mScene);

  mModel = buildModel(0);
  mScene.add(mModel);

  makeOrbit(canvas, function(dx, dy) {
    mRotY += dx * 0.011;
    mRotX = Math.max(-0.45, Math.min(0.75, mRotX + dy * 0.006));
  });
  canvas.addEventListener('wheel', function(e) {
    mZoom = Math.max(0.5, Math.min(2.5, mZoom + e.deltaY * 0.001));
  }, { passive: true });

  function resize() {
    var w = wrap.clientWidth, h = Math.max(wrap.clientHeight, 300);
    if (!w) return;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);

  (function loop() {
    requestAnimationFrame(loop);
    resize();
    if (mModel) mModel.rotation.y = mRotY + performance.now() * 0.00035;
    var r = 3.6 * mZoom;
    camera.position.set(
      Math.sin(mRotY) * r * Math.cos(mRotX),
      r * Math.sin(mRotX) + 1,
      Math.cos(mRotY) * r * Math.cos(mRotX)
    );
    camera.lookAt(0, 0.5, 0);
    renderer.render(mScene, camera);
  })();
})();

/* ═══════════════════════════════════════════
   ÜRÜN VERİLERİ
═══════════════════════════════════════════ */
var PRODUCTS = [
  { cat: 'Oturma Odası', name: 'Meşe Berjer', price: '₺12.500', desc: 'El işçiliğiyle şekillendirilmiş bu berjer, masif meşe iskelet ve yüksek yoğunluklu köpük dolgu ile üretilmiştir. Kadife kumaş seçenekleriyle her ortama uyum sağlar.', mat: 'Masif Meşe + Kadife', dim: '75 × 85 × 95 cm', col: 'Doğal Meşe / Gri' },
  { cat: 'Oturma Odası', name: 'Ceviz Koltuk Takımı', price: '₺48.900', desc: '3+2+1 koltuk takımı. Masif ceviz ayaklar ve premium kumaş kaplama. Çıkarılabilir kılıflar ile kolay temizlik sağlar.', mat: 'Masif Ceviz + Kumaş', dim: '220 × 95 × 80 cm', col: 'Ceviz / Antrasit' },
  { cat: 'Yatak Odası', name: 'Masif Gardırop', price: '₺28.700', desc: 'Özel ölçü seçeneği ile her odaya uygun masif ahşap gardırop. İç bölümlendirme tamamen özelleştirilebilir.', mat: 'Masif Meşe', dim: '180 × 60 × 210 cm', col: 'Doğal / Beyaz' },
  { cat: 'Yatak Odası', name: 'Ahşap Başlıklı Yatak', price: '₺19.200', desc: 'Masif meşe başlık ve yatak çerçevesi. 160×200 cm standart ölçü, özel ölçü seçeneği mevcuttur.', mat: 'Masif Meşe', dim: '175 × 215 × 100 cm', col: 'Doğal Meşe' },
  { cat: 'Ofis', name: 'Ceviz Çalışma Masası', price: '₺15.600', desc: 'Masif ceviz levha üzerine metal ayaklar. Kablo yönetim sistemi ve çekmece entegre edilmiştir.', mat: 'Masif Ceviz + Metal', dim: '160 × 80 × 75 cm', col: 'Ceviz / Siyah Metal' },
  { cat: 'Salon', name: 'Kitaplık — Özel Ölçü', price: '₺22.400', desc: 'Duvar boyu kitaplık. Meşe veya ceviz seçeneği. Tam ölçü ve yerleştirme hizmeti mevcuttur.', mat: 'Masif Meşe', dim: 'Özel Ölçü', col: 'Doğal / Boyalı' },
];

/* ═══════════════════════════════════════════
   MODAL / AR FONKSİYONLARI
═══════════════════════════════════════════ */
var GLB_KEYS = ['berjer','kanepe','gardrop','yatak','masa','kitaplik'];
var currentModalIdx = 0;

function openModal(idx) {
  currentModalIdx = idx;
  var p = PRODUCTS[idx];
  document.getElementById('m-cat').textContent   = p.cat;
  document.getElementById('m-name').textContent  = p.name;
  document.getElementById('m-price').textContent = p.price;
  document.getElementById('m-desc').textContent  = p.desc;
  document.getElementById('m-mat').textContent   = p.mat;
  document.getElementById('m-dim').textContent   = p.dim;
  document.getElementById('m-col').textContent   = p.col;

  // AR modal'daki model-viewer src güncelle
  var mv = document.getElementById('mv');
  if (mv) {
    mv.setAttribute('src', 'images/' + GLB_KEYS[idx] + '.glb');
  }

  // Three.js modal viewer da güncelle
  if (mScene && mModel) mScene.remove(mModel);
  mRotY = 0; mRotX = 0.28; mZoom = 1;
  mModel = buildModel(idx);
  if (mScene) mScene.add(mModel);

  document.getElementById('modal-bg').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-bg').classList.remove('open');
  document.body.style.overflow = '';
}

// AR: model-viewer slot="ar-button" kullanıyor

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

function openARModal() {
  var modal = document.getElementById('arModal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeARModal() {
  var modal = document.getElementById('arModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}