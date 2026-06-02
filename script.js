(function () {
  var loaderBar = document.getElementById('loaderBar');
  var loader = document.getElementById('loader');
  var progress = 0;
  var interval;

  function dismissLoader() {
    if (loader) {
      loader.style.transition = 'opacity 0.5s ease';
      loader.style.opacity = '0';
      setTimeout(function () {
        loader.style.display = 'none';
      }, 500);
    }
    clearInterval(interval);
  }

  interval = setInterval(function () {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      if (loaderBar) loaderBar.style.width = '100%';
      clearInterval(interval);
      setTimeout(dismissLoader, 300);
    }
    if (loaderBar) {
      loaderBar.style.width = progress + '%';
    }
  }, 120);

  setTimeout(dismissLoader, 1500);

  window.addEventListener('load', function () {
    progress = 100;
    if (loaderBar) loaderBar.style.width = '100%';
    setTimeout(dismissLoader, 200);
  });
})();

function toggleMobileNav() {
  var nav = document.getElementById('mobileNav');
  var hamburger = document.getElementById('hamburger');
  if (!nav || !hamburger) return;
  var isOpen = nav.classList.contains('open');
  if (isOpen) {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    nav.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileNav() {
  var nav = document.getElementById('mobileNav');
  var hamburger = document.getElementById('hamburger');
  if (nav) nav.classList.remove('open');
  if (hamburger) hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', function (e) {
  var nav = document.getElementById('mobileNav');
  var hamburger = document.getElementById('hamburger');
  if (!nav || !hamburger) return;
  if (nav.classList.contains('open')) {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileNav();
    }
  }
});

function switchTab(tabName) {
  document.querySelectorAll('.tab-panel').forEach(function (p) {
    p.classList.remove('on');
  });
  document.querySelectorAll('.tab').forEach(function (t) {
    t.classList.remove('on');
  });
  var panel = document.getElementById('tab-' + tabName);
  if (panel) panel.classList.add('on');
  document.querySelectorAll('.tab').forEach(function (t) {
    if (t.getAttribute('onclick') === "switchTab('" + tabName + "')") {
      t.classList.add('on');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      var headerHeight = document.getElementById('mainHeader').offsetHeight;
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});
  if (!('IntersectionObserver' in window)) return;
  var els = document.querySelectorAll(
    '.pillar, .track-card, .testimonial-card, .syl-item, .loc-item, .founder-inner, .tribute-inner'
  );
  els.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(function (el) {
    observer.observe(el);
  });
});

window.addEventListener('scroll', function () {
  var header = document.getElementById('mainHeader');
  if (!header) return;
  if (window.scrollY > 60) {
    header.style.background = 'rgba(249,246,240,0.99)';
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    header.style.background = 'rgba(249,246,240,0.97)';
    header.style.boxShadow = 'none';
  }
}, { passive: true });

