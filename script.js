/* ============================================================
   HKB AUTOMATIONS — LUXURY JS
============================================================ */

/* ── BACKGROUND LINES ── */
(function() {
  var bg = document.getElementById('bgCanvas');
  if (!bg) return;
  for (var i = 0; i < 12; i++) {
    var line = document.createElement('div');
    line.className = 'bg-line';
    var w = Math.random() * 300 + 80;
    line.style.cssText = [
      'width:' + w + 'px',
      'left:' + Math.random() * 100 + '%',
      'animation-duration:' + (12 + Math.random() * 20) + 's',
      'animation-delay:' + (Math.random() * 15) + 's'
    ].join(';');
    bg.appendChild(line);
  }
  for (var j = 0; j < 3; j++) {
    var orb = document.createElement('div');
    orb.className = 'bg-orb';
    var size = 200 + Math.random() * 400;
    orb.style.cssText = [
      'width:' + size + 'px',
      'height:' + size + 'px',
      'left:' + Math.random() * 90 + '%',
      'top:' + Math.random() * 90 + '%',
      'animation-duration:' + (6 + Math.random() * 8) + 's',
      'animation-delay:' + Math.random() * 4 + 's'
    ].join(';');
    bg.appendChild(orb);
  }
})();

/* ── INTRO ── */
window.addEventListener('load', function() {
  setTimeout(function() {
    var intro = document.getElementById('intro');
    if (intro) {
      intro.classList.add('hide');
      setTimeout(function() { intro.remove(); }, 1300);
    }
  }, 3500);
});

/* ── NAV SCROLL STYLE ── */
window.addEventListener('scroll', function() {
  var nav = document.querySelector('nav');
  if (!nav) return;
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(7,5,14,0.98)';
    nav.style.borderBottomColor = 'rgba(245,200,66,0.2)';
  } else {
    nav.style.background = 'rgba(7,5,14,0.88)';
    nav.style.borderBottomColor = 'rgba(245,200,66,0.14)';
  }
});

/* ── HAMBURGER ── */
function toggleMenu() {
  var h = document.getElementById('hamburger');
  var nl = document.getElementById('navLinks');
  if (!h || !nl) return;
  h.classList.toggle('open');
  nl.classList.toggle('open');
  document.body.style.overflow = nl.classList.contains('open') ? 'hidden' : '';
}
function closeMenu() {
  var h = document.getElementById('hamburger');
  var nl = document.getElementById('navLinks');
  if (!h || !nl) return;
  h.classList.remove('open');
  nl.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('click', function(e) {
  var nav = document.querySelector('nav');
  if (nav && !nav.contains(e.target)) closeMenu();
});

/* ── SCROLL REVEAL ── */
var allSr = document.querySelectorAll('.sr, .sr-left, .sr-right');
var srObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      srObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
allSr.forEach(function(el) { srObs.observe(el); });

/* ── COUNTERS ── */
function animateCounter(el) {
  var target = +el.getAttribute('data-target');
  var suffix = el.getAttribute('data-suffix') || '';
  var prefix = el.getAttribute('data-prefix') || '';
  var duration = 1800;
  var start = performance.now();
  function tick(now) {
    var elapsed = now - start;
    var progress = Math.min(elapsed / duration, 1);
    var ease = 1 - Math.pow(1 - progress, 3);
    var val = Math.floor(ease * target);
    el.textContent = prefix + val + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = prefix + target + suffix;
  }
  requestAnimationFrame(tick);
}
var counterObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('.counter').forEach(function(el) {
  counterObs.observe(el);
});

/* ── PROCESS ── */
var processSection = document.querySelector('#process');
if (processSection) {
  new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        var fill = document.querySelector('.process-line-fill');
        if (fill) fill.style.width = '100%';
        document.querySelectorAll('.process-step').forEach(function(s, i) {
          setTimeout(function() { s.classList.add('active'); }, i * 300);
        });
      }
    });
  }, { threshold: 0.2 }).observe(processSection);
}

/* ── PRICING ── */
var pricingSection = document.querySelector('#pricing');
if (pricingSection) {
  new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        document.querySelectorAll('.pricing-card').forEach(function(c, i) {
          setTimeout(function() { c.classList.add('active'); }, i * 180);
        });
      }
    });
  }, { threshold: 0.1 }).observe(pricingSection);
}

/* ── MODAL ── */
function openModal(src) {
  var m = document.getElementById('modal');
  var mi = document.getElementById('modalImg');
  if (!m || !mi) return;
  mi.src = src;
  m.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  var m = document.getElementById('modal');
  if (!m) return;
  m.style.display = 'none';
  document.body.style.overflow = '';
}
var modal = document.getElementById('modal');
if (modal) {
  modal.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
}

/* ── SMOOTH CURSOR GLOW (desktop) ── */
if (window.innerWidth > 768) {
  var glow = document.createElement('div');
  glow.style.cssText = [
    'position:fixed', 'pointer-events:none', 'z-index:9995',
    'width:400px', 'height:400px', 'border-radius:50%',
    'background:radial-gradient(circle,rgba(245,200,66,0.04),transparent 70%)',
    'transform:translate(-50%,-50%)', 'transition:left 0.8s ease,top 0.8s ease',
    'top:50%', 'left:50%'
  ].join(';');
  document.body.appendChild(glow);
  document.addEventListener('mousemove', function(e) {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}
