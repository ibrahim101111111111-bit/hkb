/* ===== FLOATING DOTS ===== */
(function(){
  var bg = document.getElementById('particleBg');
  if(!bg) return;
  for(var i=0;i<28;i++){
    var d=document.createElement('div');
    d.className='dot';
    var size=Math.random()*4+2;
    d.style.cssText='width:'+size+'px;height:'+size+'px;left:'+Math.random()*100+'%;animation-duration:'+(8+Math.random()*18)+'s;animation-delay:'+Math.random()*14+'s;';
    bg.appendChild(d);
  }
})();

/* ===== REMOVE INTRO ===== */
window.addEventListener('load', function(){
  setTimeout(function(){
    var intro = document.getElementById('intro');
    if(intro){
      intro.style.opacity = '0';
      intro.style.pointerEvents = 'none';
      setTimeout(function(){ intro.remove(); }, 900);
    }
  }, 3300);
});

/* ===== SCROLL REVEAL ===== */
var srEls = document.querySelectorAll('.sr');
var srObs = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(e.isIntersecting) e.target.classList.add('in');
  });
}, {threshold:0.1});
srEls.forEach(function(el){ srObs.observe(el); });

/* ===== COUNTERS ===== */
document.querySelectorAll('.counter').forEach(function(el){
  new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var target = +el.getAttribute('data-target');
        var n = 0;
        var tick = function(){
          n += target/70;
          if(n < target){ el.textContent = Math.floor(n); requestAnimationFrame(tick); }
          else el.textContent = target;
        };
        tick();
      }
    });
  },{threshold:0.5}).observe(el);
});

/* ===== PROCESS ===== */
var ps = document.querySelector('.process-section');
if(ps){
  new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        var line = document.querySelector('.process-line');
        if(line) line.style.width = '100%';
        document.querySelectorAll('.process-step').forEach(function(s,i){
          setTimeout(function(){ s.classList.add('active'); }, i*350);
        });
      }
    });
  },{threshold:0.2}).observe(ps);
}

/* ===== PRICING ===== */
var pricingSection = document.querySelector('#pricing');
if(pricingSection){
  new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        document.querySelectorAll('.pricing-card').forEach(function(c,i){
          setTimeout(function(){ c.classList.add('active'); }, i*220);
        });
      }
    });
  },{threshold:0.15}).observe(pricingSection);
}

/* ===== MODAL ===== */
function openModal(src){
  var m = document.getElementById('project-modal');
  document.getElementById('modal-image').src = src;
  m.style.display = 'flex';
}
function closeModal(){
  document.getElementById('project-modal').style.display = 'none';
}
document.getElementById('project-modal').addEventListener('click', function(e){
  if(e.target === this) closeModal();
});

/* ===== HAMBURGER ===== */
function toggleMenu(){
  document.getElementById('hamburger').classList.toggle('open');
  var nl = document.getElementById('nav-links');
  nl.classList.toggle('open');
  document.body.style.overflow = nl.classList.contains('open') ? 'hidden' : '';
}
function closeMenu(){
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('nav-links').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('click', function(e){
  var nav = document.querySelector('nav');
  if(nav && !nav.contains(e.target)) closeMenu();
});
