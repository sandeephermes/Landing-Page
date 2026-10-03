/* Hermes landing page — theme toggle, copy button, reveal, sticky nav.
   Vanilla JS, no dependencies. Theme is applied pre-paint by an inline
   script in <head>; this file only handles user interaction. */
(function () {
  'use strict';

  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');

  /* ── Theme ────────────────────────────────────────────────────────
     Stored choice wins; otherwise the OS preference (already applied
     by the head script).                                          */
  if (toggle) {
    var syncLabel = function () {
      var dark = root.getAttribute('data-theme') === 'dark';
      toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    };

    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('lp-theme', next); } catch (e) {}
      syncLabel();
    });

    syncLabel();
  }

  /* ── Copy install command ───────────────────────────────────────── */
  var copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    var CMD = 'curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash';

    var flash = function (btn, text, ms) {
      var original = btn.textContent;
      btn.textContent = text;
      btn.disabled = true;
      setTimeout(function () { btn.textContent = original; btn.disabled = false; }, ms);
    };

    var legacyCopy = function () {
      var ta = document.createElement('textarea');
      ta.value = CMD;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-1000px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      if (ok) flash(copyBtn, 'Copied', 1800);
    };

    copyBtn.addEventListener('click', function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(CMD).then(
          function () { flash(copyBtn, 'Copied', 1800); },
          legacyCopy
        );
      } else {
        legacyCopy();
      }
    });
  }

  /* ── Reveal on scroll ───────────────────────────────────────────── */
  var items = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !('IntersectionObserver' in window)) {
    for (var i = 0; i < items.length; i++) items[i].classList.add('in');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    for (var j = 0; j < items.length; j++) io.observe(items[j]);
  }

  /* ── Sticky nav border on scroll ────────────────────────────────── */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();