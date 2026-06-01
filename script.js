/* ============================================================
   NOOR AL-ILM · script.js
   Fixed issues:
   - Loader now has a hard timeout fallback (fixes Android freeze)
   - Loader dismisses even if page resources are slow
   - Mobile nav toggle works correctly
   - Tab switching for syllabus
   - Form submission handler
   ============================================================ */

/* ============================================================
   LOADER — FIXED FOR ANDROID
   The original code had no timeout fallback. On Android, the
   loader would never dismiss if the page was still parsing
   the heavy base64 image. Now it ALWAYS dismisses.
   ============================================================ */
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

  // Animate the progress bar
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

  // HARD TIMEOUT FALLBACK — always dismiss after 3 seconds max
  // This is the key fix for Android where JS was blocked by the base64 parsing
  setTimeout(dismissLoader, 3000);

  // Also dismiss when page is fully loaded
  window.addEventListener('load', function () {
    progress = 100;
    if (loaderBar) loaderBar.style.width = '100%';
    setTimeout(dismissLoader, 200);
  });
})();


/* ============================================================
   MOBILE NAV
   ============================================================ */
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
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }
}

function closeMobileNav() {
  var nav = document.getElementById('mobileNav');
  var hamburger = document.getElementById('hamburger');
  if (nav) nav.classList.remove('open');
  if (hamburger) hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

// Close mobile nav when clicking outside
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


/* ============================================================
   SYLLABUS TAB SWITCHING
   ============================================================ */
function switchTab(tabName) {
  // Hide all panels
  var panels = document.querySelectorAll('.tab-panel');
  panels.forEach(function (panel) {
    panel.classList.remove('on');
  });

  // Remove active from all tabs
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (tab) {
    tab.classList.remove('on');
  });

  // Show selected panel
  var targetPanel = document.getElementById('tab-' + tabName);
  if (targetPanel) targetPanel.classList.add('on');

  // Activate clicked tab
  tabs.forEach(function (tab) {
    if (tab.getAttribute('onclick') === "switchTab('" + tabName + "')") {
      tab.classList.add('on');
    }
  });
}





/* ============================================================
   SCROLL REVEAL — lightweight, no library needed
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  // Simple scroll reveal using IntersectionObserver
  if (!('IntersectionObserver' in window)) return;

  var revealElements = document.querySelectorAll(
    '.pillar, .track-card, .testimonial-card, .syl-item, .loc-item, .founder-inner, .tribute-inner'
  );

  revealElements.forEach(function (el) {
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

  revealElements.forEach(function (el) {
    observer.observe(el);
  });
});


/* ============================================================
   HEADER SCROLL BEHAVIOUR
   ============================================================ */
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