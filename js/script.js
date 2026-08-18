/* =============================================================
   David Bâtiment — interactions
   JavaScript natif, sans dépendance ni étape de build.
   1. Année du copyright
   2. Header au défilement
   3. Menu mobile
   4. Apparitions au scroll (IntersectionObserver)
   5. Compteurs animés
   6. Navigation active (scrollspy)
   7. Formulaire de devis (DÉMO : validation client uniquement)
   ============================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     1. Année du copyright
     --------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---------------------------------------------------------
     2. Header : état compact dès qu'on défile
     --------------------------------------------------------- */
  var header = document.getElementById('header');
  var ticking = false;

  function onScroll() {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    }
    updateActiveLink();
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  /* ---------------------------------------------------------
     3. Menu mobile (burger + voile + Échap + clic extérieur)
     --------------------------------------------------------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var backdrop = null;

  function openMenu() {
    if (!nav || !burger) { return; }
    nav.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Fermer le menu de navigation');
    document.body.classList.add('is-locked');

    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
    // force reflow pour déclencher la transition d'opacité
    void backdrop.offsetWidth;
    backdrop.classList.add('is-open');
    backdrop.addEventListener('click', closeMenu);
  }

  function closeMenu() {
    if (!nav || !burger) { return; }
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu de navigation');
    document.body.classList.remove('is-locked');

    if (backdrop) {
      var node = backdrop;
      backdrop = null;
      node.classList.remove('is-open');
      window.setTimeout(function () {
        if (node.parentNode) { node.parentNode.removeChild(node); }
      }, reduceMotion ? 0 : 300);
    }
  }

  function isMenuOpen() {
    return !!nav && nav.classList.contains('is-open');
  }

  if (burger) {
    burger.addEventListener('click', function () {
      if (isMenuOpen()) { closeMenu(); } else { openMenu(); }
    });
  }

  // Fermeture au clic sur un lien du menu
  if (nav) {
    nav.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a') : null;
      if (link && isMenuOpen()) { closeMenu(); }
    });
  }

  // Échap ferme le menu et rend le focus au bouton
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isMenuOpen()) {
      closeMenu();
      if (burger) { burger.focus(); }
    }
  });

  // Retour en desktop : on nettoie l'état mobile
  var desktopQuery = window.matchMedia('(min-width: 901px)');
  var onBreakpoint = function (e) { if (e.matches && isMenuOpen()) { closeMenu(); } };
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener('change', onBreakpoint);
  } else if (desktopQuery.addListener) {
    desktopQuery.addListener(onBreakpoint);
  }

  /* ---------------------------------------------------------
     4. Apparitions au scroll
     --------------------------------------------------------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        var el = entry.target;
        // léger décalage entre éléments frères pour un effet en cascade
        var siblings = Array.prototype.slice.call(el.parentNode.children);
        var index = siblings.indexOf(el);
        el.style.transitionDelay = Math.min(index, 6) * 80 + 'ms';
        el.classList.add('is-visible');
        obs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------------------------------------------------
     5. Compteurs animés (chiffres clés du hero)
     --------------------------------------------------------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) { return; }

    var duration = 1200;
    var start = null;

    function step(timestamp) {
      if (start === null) { start = timestamp; }
      var progress = Math.min((timestamp - start) / duration, 1);
      // easing out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) { window.requestAnimationFrame(step); }
    }

    window.requestAnimationFrame(step);
  }

  if (!reduceMotion && 'IntersectionObserver' in window && counters.length) {
    var countObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* ---------------------------------------------------------
     6. Scrollspy : surligne la section visible dans la nav
     --------------------------------------------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href');
      return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  function updateActiveLink() {
    if (!sections.length) { return; }
    // l'ordre de la nav ne suit pas forcément l'ordre du document : on trie
    var ordered = sections.slice().sort(function (a, b) { return a.offsetTop - b.offsetTop; });
    var offset = window.scrollY + (window.innerHeight * 0.32);
    var currentId = ordered[0].id;

    ordered.forEach(function (section) {
      if (section.offsetTop <= offset) { currentId = section.id; }
    });

    // en bas de page, on force la dernière section de la nav
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
      currentId = ordered[ordered.length - 1].id;
    }

    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === '#' + currentId);
    });
  }

  updateActiveLink();

  /* ---------------------------------------------------------
     7. Formulaire de demande de devis
        ATTENTION — DÉMONSTRATION UNIQUEMENT :
        le site est statique (GitHub Pages), aucun e-mail n'est envoyé.
        Pour le rendre opérationnel, brancher un service tiers
        (Formspree, Web3Forms, Netlify Forms…) sur l'attribut action du <form>.
     --------------------------------------------------------- */
  var form = document.getElementById('quote-form');

  if (form) {
    var status = document.getElementById('form-status');

    var rules = [
      { id: 'f-name',  err: 'err-name',  test: function (v) { return v.length >= 2; },
        msg: 'Merci d\'indiquer votre nom.' },
      { id: 'f-phone', err: 'err-phone', test: function (v) { return /^[0-9+().\s-]{9,20}$/.test(v); },
        msg: 'Merci d\'indiquer un numéro de téléphone valide.' },
      { id: 'f-email', err: 'err-email', optional: true,
        test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); },
        msg: 'Cette adresse e-mail semble incorrecte.' },
      { id: 'f-msg',   err: 'err-msg',   test: function (v) { return v.length >= 10; },
        msg: 'Décrivez votre projet en quelques mots (10 caractères minimum).' }
    ];

    function setFieldError(rule, message) {
      var input = document.getElementById(rule.id);
      var errorEl = document.getElementById(rule.err);
      if (!input || !errorEl) { return; }

      var field = input.closest('.field');
      if (message) {
        if (field) { field.classList.add('has-error'); }
        input.setAttribute('aria-invalid', 'true');
        errorEl.textContent = message;
      } else {
        if (field) { field.classList.remove('has-error'); }
        input.removeAttribute('aria-invalid');
        errorEl.textContent = '';
      }
    }

    function validateRule(rule) {
      var input = document.getElementById(rule.id);
      if (!input) { return true; }
      var value = input.value.trim();

      if (!value) {
        if (rule.optional) { setFieldError(rule, ''); return true; }
        setFieldError(rule, 'Ce champ est obligatoire.');
        return false;
      }
      if (!rule.test(value)) {
        setFieldError(rule, rule.msg);
        return false;
      }
      setFieldError(rule, '');
      return true;
    }

    // Validation à la volée, une fois le champ quitté
    rules.forEach(function (rule) {
      var input = document.getElementById(rule.id);
      if (!input) { return; }
      input.addEventListener('blur', function () { validateRule(rule); });
      input.addEventListener('input', function () {
        var field = input.closest('.field');
        if (field && field.classList.contains('has-error')) { validateRule(rule); }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstInvalid = null;
      rules.forEach(function (rule) {
        var ok = validateRule(rule);
        if (!ok && !firstInvalid) { firstInvalid = document.getElementById(rule.id); }
      });

      if (firstInvalid) {
        if (status) {
          status.textContent = 'Merci de corriger les champs signalés.';
          status.classList.add('is-visible');
        }
        firstInvalid.focus();
        return;
      }

      // --- Démo : aucun envoi réseau n'est effectué ---
      var name = (document.getElementById('f-name') || {}).value || '';
      if (status) {
        status.textContent = 'Merci ' + name.trim().split(' ')[0] +
          ' ! Votre demande a bien été prise en compte (démonstration : aucun message n\'est réellement envoyé). ' +
          'Pour une réponse immédiate, appelez le 06 20 25 94 20.';
        status.classList.add('is-visible');
      }
      form.reset();
    });
  }

})();
