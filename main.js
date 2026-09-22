/**
 * Interações e animações da página.
 * Tudo degrada com elegância: sem JS a página continua legível e completa,
 * e todo movimento respeita prefers-reduced-motion.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Tema claro/escuro --- */
  (function theme() {
    var root = document.documentElement;
    var toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;

    var stored = null;
    try {
      stored = localStorage.getItem('theme');
    } catch (err) {
      stored = null;
    }

    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var current = stored || (systemDark ? 'dark' : 'light');

    var apply = function (value) {
      current = value;
      root.setAttribute('data-theme', value);
      toggle.setAttribute('data-dark', String(value === 'dark'));
      toggle.setAttribute(
        'aria-label',
        value === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'
      );
    };

    apply(current);

    toggle.addEventListener('click', function () {
      var next = current === 'dark' ? 'light' : 'dark';
      apply(next);
      try {
        localStorage.setItem('theme', next);
      } catch (err) {
        /* modo privado: preferência vale só nesta sessão */
      }
    });
  })();

  /* --- Barra de progresso de leitura --- */
  (function progress() {
    var bar = document.querySelector('[data-progress]');
    if (!bar) return;

    var ticking = false;
    var update = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = 'scaleX(' + Math.min(1, Math.max(0, ratio)) + ')';
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      },
      { passive: true }
    );

    update();
  })();

  /* --- Estado "grudado" do cabeçalho --- */
  (function stickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;';
    document.body.prepend(sentinel);

    new IntersectionObserver(function (entries) {
      header.setAttribute('data-stuck', String(!entries[0].isIntersecting));
    }).observe(sentinel);
  })();

  /* --- Menu mobile --- */
  (function mobileNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    var setOpen = function (open) {
      nav.setAttribute('data-open', String(open));
      toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', function () {
      setOpen(nav.getAttribute('data-open') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });
  })();

  /* --- Revelação ao rolar --- */
  (function reveal() {
    var targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  })();

  /* --- Link ativo na navegação --- */
  (function activeSection() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('#site-nav a[href^="#"]')
    );
    if (!links.length || !('IntersectionObserver' in window)) return;

    var byId = {};
    var sections = [];

    links.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (!section) return;
      byId[id] = link;
      sections.push(section);
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (link) {
            link.removeAttribute('aria-current');
          });
          var link = byId[entry.target.id];
          if (link) link.setAttribute('aria-current', 'true');
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  })();

  /* --- Contadores da faixa de métricas --- */
  (function counters() {
    var values = document.querySelectorAll('[data-count-to]');
    if (!values.length) return;

    var render = function (el, value) {
      el.firstChild.nodeValue = value.toLocaleString('pt-BR');
    };

    if (reduceMotion || !('IntersectionObserver' in window)) {
      values.forEach(function (el) {
        render(el, Number(el.getAttribute('data-count-to')));
      });
      return;
    }

    var animate = function (el) {
      var target = Number(el.getAttribute('data-count-to'));
      var duration = 1100;
      var start = null;

      var step = function (timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min(1, (timestamp - start) / duration);
        // easeOutExpo: chega rápido e assenta suave
        var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        render(el, Math.round(target * eased));
        if (progress < 1) window.requestAnimationFrame(step);
      };

      window.requestAnimationFrame(step);
    };

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );

    values.forEach(function (el) {
      render(el, 0);
      observer.observe(el);
    });
  })();

  /* --- Rotação de especialidades no hero --- */
  (function rotator() {
    var el = document.querySelector('[data-rotator]');
    if (!el) return;

    var words = (el.getAttribute('data-rotator') || '')
      .split('|')
      .map(function (word) {
        return word.trim();
      })
      .filter(Boolean);

    if (words.length < 2) return;

    if (reduceMotion) {
      el.textContent = words[0];
      return;
    }

    var wordIndex = 0;
    var charIndex = 0;
    var deleting = false;

    var tick = function () {
      var word = words[wordIndex];
      charIndex += deleting ? -1 : 1;
      el.textContent = word.slice(0, charIndex);

      var delay = deleting ? 35 : 65;

      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 320;
      }

      window.setTimeout(tick, delay);
    };

    tick();
  })();

  /* --- Ano corrente no rodapé --- */
  (function year() {
    var el = document.querySelector('[data-year]');
    if (el) el.textContent = String(new Date().getFullYear());
  })();
})();
