// ШУМ* — интерактив лендинга: меню, аккордеон, счётчики, reveal, валидация формы
(function () {
  'use strict';

  /* ---------- Мобильное меню ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.classList.contains('nav__link')) {
        nav.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Аккордеон услуг (одна открыта за раз) ---------- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.acc__item'));

  function setBodyHeight(item, open) {
    var body = item.querySelector('.acc__body');
    body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
  }

  items.forEach(function (item) {
    var head = item.querySelector('.acc__head');
    head.addEventListener('click', function () {
      var willOpen = !item.classList.contains('is-open');

      items.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.acc__head').setAttribute('aria-expanded', 'false');
        setBodyHeight(other, false);
      });

      if (willOpen) {
        item.classList.add('is-open');
        head.setAttribute('aria-expanded', 'true');
        setBodyHeight(item, true);
      }
    });
  });

  // пересчёт высоты открытой панели при ресайзе
  window.addEventListener('resize', function () {
    items.forEach(function (item) {
      if (item.classList.contains('is-open')) setBodyHeight(item, true);
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Счётчики ---------- */
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1200;
    var start = null;

    function tick(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      // easeOutCubic — быстрый старт, мягкий финиш
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  var counters = document.querySelectorAll('[data-counter]');

  if ('IntersectionObserver' in window && counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = el.getAttribute('data-target') + (el.getAttribute('data-suffix') || '');
    });
  }

  /* ---------- Валидация формы заявки ---------- */
  var form = document.getElementById('lead-form');

  if (form) {
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function setError(input, message) {
      var field = input.closest('.field');
      var errorEl = field.querySelector('.field__error');
      field.classList.toggle('has-error', Boolean(message));
      if (errorEl) errorEl.textContent = message || '';
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    function validateName(input) {
      var value = input.value.trim();
      if (value.length < 2) {
        setError(input, 'Введите имя — минимум 2 символа');
        return false;
      }
      setError(input, '');
      return true;
    }

    function validateContact(input) {
      var value = input.value.trim();
      var digits = value.replace(/\D/g, '');

      if (!value) {
        setError(input, 'Укажите телефон или email для связи');
        return false;
      }
      if (value.indexOf('@') !== -1 && !EMAIL_RE.test(value)) {
        setError(input, 'Похоже, в email опечатка');
        return false;
      }
      if (value.indexOf('@') === -1 && digits.length < 10) {
        setError(input, 'Введите телефон полностью или укажите email');
        return false;
      }
      setError(input, '');
      return true;
    }

    var nameInput = form.querySelector('#f-name');
    var contactInput = form.querySelector('#f-contact');
    var budgetSelect = form.querySelector('#f-budget');

    nameInput.addEventListener('blur', function () { validateName(nameInput); });
    contactInput.addEventListener('blur', function () { validateContact(contactInput); });

    // ошибка снимается, как только пользователь начинает исправлять
    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field');
      if (field && field.classList.contains('has-error')) setError(e.target, '');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var okName = validateName(nameInput);
      var okContact = validateContact(contactInput);

      if (!okName) { nameInput.focus(); return; }
      if (!okContact) { contactInput.focus(); return; }

      // Здесь мог бы быть fetch() на бэкенд — для демо просто показываем успех
      form.querySelector('.form__body').hidden = true;
      form.querySelector('.form__success').hidden = false;
      form.querySelector('.form__success').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    var resetBtn = document.getElementById('form-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        form.reset();
        form.querySelector('.form__success').hidden = true;
        form.querySelector('.form__body').hidden = false;
        nameInput.focus();
      });
    }
  }

  /* ---------- Год в футере ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
