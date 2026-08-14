(() => {
  'use strict';

  function boot() {
    const config = window.SITE_CONFIG || {};
    const qs = (selector, root = document) => root.querySelector(selector);
    const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
    const setText = (selector, value, root = document) => {
      const el = qs(selector, root);
      if (el && value !== undefined && value !== null) el.textContent = value;
    };
    const setHtml = (selector, value, root = document) => {
      const el = qs(selector, root);
      if (el && value !== undefined && value !== null) el.innerHTML = value;
    };
    const setAttr = (selector, name, value, root = document) => {
      const el = qs(selector, root);
      if (el && value) el.setAttribute(name, value);
    };

    function applyContent() {
      if (config.meta?.title) document.title = config.meta.title;
      const metaDescription = qs('meta[name="description"]');
      if (metaDescription && config.meta?.description) metaDescription.content = config.meta.description;

      const clinic = config.clinic || {};
      qsa('.brand-copy strong').forEach(el => clinic.brand && (el.textContent = clinic.brand));
      qsa('.brand-copy small').forEach(el => clinic.subBrand && (el.textContent = clinic.subBrand));
      qsa('a[href^="tel:"]').forEach(el => clinic.phoneHref && el.setAttribute('href', clinic.phoneHref));

      const heroPhone = qs('.hero-actions .btn-secondary');
      if (heroPhone && clinic.phoneDisplay) heroPhone.innerHTML = `<span>お電話でのご予約</span>${clinic.phoneDisplay}`;

      const accessRows = qsa('.clinic-info dl');
      [clinic.name, clinic.address, clinic.access, clinic.hours, clinic.closed].forEach((value, i) => {
        const dd = accessRows[i]?.querySelector('dd');
        if (dd && value) dd.textContent = value;
      });
      setText('.map-label strong', clinic.brand);
      setText('.map-label small', clinic.access);
      setAttr('.access-copy .text-link', 'href', clinic.mapUrl);

      const bookingSelectors = ['.header-cta', '.hero-actions .btn-primary', '.offer-panel .btn-primary', '.reserve-btn.web', '.mobile-web'];
      bookingSelectors.forEach(selector => setAttr(selector, 'href', clinic.webBookingUrl));
      setAttr('.reserve-btn.line', 'href', clinic.lineUrl);
      if (clinic.lineUrl && clinic.lineUrl !== '#') qs('.reserve-btn.line')?.removeAttribute('onclick');
      setAttr('.reserve-btn.tel', 'href', clinic.phoneHref);
      setAttr('.mobile-tel', 'href', clinic.phoneHref);
      setText('.reserve-btn.tel strong', clinic.phoneDisplay);
      setText('.mobile-tel strong', clinic.phoneDisplay);

      if (clinic.director) {
        setText('.staff-caption strong', clinic.director);
        setHtml('.signature', `${clinic.name || ''} <strong>院長 ${clinic.director}</strong>`);
      }
      if (clinic.since) setHtml('.hero-stamp', `SINCE<br><strong>${clinic.since}</strong>`);
      if (clinic.brand) setText('.copyright', `© ${new Date().getFullYear()} ${clinic.brand}. All Rights Reserved.`);

      const hero = config.hero || {};
      if (hero.eyebrow) setHtml('.hero .eyebrow', `<span></span> ${hero.eyebrow}`);
      setText('.hero-kicker', hero.kicker);
      setHtml('.hero h1', hero.titleHtml);
      setHtml('.hero-lead', hero.leadHtml);
      qsa('.hero-badges div').forEach((item, i) => {
        const label = hero.badges?.[i];
        if (label) setText('span', label, item);
      });
      setText('.offer-label', hero.offerLabel);
      setText('.hero-offer .offer-price > span', hero.offerName);
      setText('.hero-offer .offer-price strong', hero.offerPrice);
      setText('.hero-offer .offer-price small', hero.offerTax);
      setText('.hero-offer > p', hero.offerNote);
      setText('.microcopy', hero.microcopy);
      setAttr('.hero-photo-card img', 'src', hero.image);
      setAttr('.hero-photo-card img', 'alt', hero.imageAlt);
      setText('.floating-card--top strong', hero.floatingTopTitle);
      setText('.floating-card--top span', hero.floatingTopText);
      setText('.floating-card--bottom strong', hero.floatingBottomTitle);
      setText('.floating-card--bottom span', hero.floatingBottomText);

      qsa('.trust-grid > div').forEach((item, i) => {
        const source = config.trust?.[i];
        if (!source) return;
        setText('strong', source.title, item);
        setText('p', source.text, item);
      });

      const worries = config.worries || {};
      setHtml('.worries .section-heading h2', worries.headingHtml);
      setText('.worries .section-heading p', worries.lead);
      qsa('.worry-card').forEach((card, i) => {
        const source = worries.items?.[i];
        if (!source) return;
        setText('.icon', source.icon, card);
        setText('h3', source.title, card);
        setText('p', source.text, card);
      });
      setHtml('.worries-message p', worries.messageHtml);

      const concept = config.concept || {};
      setHtml('.concept-copy h2', concept.headingHtml);
      setText('.concept-copy .lead', concept.lead);
      const conceptPs = qsa('.concept-copy > p');
      if (conceptPs[1] && concept.body) conceptPs[1].textContent = concept.body;
      qsa('.concept-copy .check-list li').forEach((item, i) => concept.checks?.[i] && (item.textContent = concept.checks[i]));
      setAttr('.concept-image img', 'src', concept.image);
      setAttr('.concept-image img', 'alt', concept.imageAlt);

      const strengths = config.strengths || {};
      setHtml('.strengths .section-heading h2', strengths.headingHtml);
      qsa('.strength-item').forEach((item, i) => {
        const source = strengths.items?.[i];
        if (!source) return;
        setText('.mini-label', source.label, item);
        setText('.strength-copy h3', source.title, item);
        setText('.strength-copy p', source.text, item);
        setAttr('.strength-media img', 'src', source.image, item);
        setAttr('.strength-media img', 'alt', source.imageAlt, item);
      });

      const menu = config.menu || {};
      setHtml('.menu .section-heading h2', menu.headingHtml);
      setText('.menu .section-heading p', menu.lead);
      qsa('.menu-card').forEach((card, i) => {
        const source = menu.items?.[i];
        if (!source) return;
        setText('h3', source.title, card);
        setText('p', source.text, card);
        qsa('li', card).forEach((li, j) => source.bullets?.[j] && (li.textContent = source.bullets[j]));
      });
      setText('.menu-note', menu.note);

      const firstOffer = config.firstOffer || {};
      setHtml('.offer-panel-copy h2', firstOffer.headingHtml);
      setText('.offer-panel-copy p', firstOffer.text);
      setText('.offer-panel-price > span', firstOffer.regularPrice);
      setText('.offer-panel-price strong', firstOffer.price);
      setText('.offer-panel-price > p', firstOffer.note);
      if (firstOffer.cta) setHtml('.offer-panel .btn-primary', `${firstOffer.cta} <i>→</i>`);

      qsa('.flow-grid article').forEach((item, i) => {
        const source = config.flow?.[i];
        if (!source) return;
        setText('.flow-icon', source.icon, item);
        setText('h3', source.title, item);
        setText('p', source.text, item);
      });

      const voices = config.voices || {};
      setText('.voice .section-heading p', voices.note);
      qsa('.voice-card').forEach((card, i) => {
        const source = voices.items?.[i];
        if (!source) return;
        setText('.avatar', source.age, card);
        setText('.voice-meta strong', source.profile, card);
        setText('.voice-meta span', source.sub, card);
        setText('h3', source.title, card);
        setText('p', source.text, card);
      });

      const staff = config.staff || {};
      setHtml('.staff-copy h2', staff.headingHtml);
      const staffPs = qsa('.staff-copy > p');
      if (staffPs[0] && staff.body1) staffPs[0].textContent = staff.body1;
      if (staffPs[1] && staff.body2) staffPs[1].textContent = staff.body2;
      setAttr('.staff-photo img', 'src', staff.image);
      setAttr('.staff-photo img', 'alt', staff.imageAlt);

      qsa('.faq-list details').forEach((item, i) => {
        const source = config.faq?.[i];
        if (!source) return;
        const summary = qs('summary', item);
        const answer = qs('.faq-answer', item);
        if (summary) summary.innerHTML = `<span>Q</span>${source.q}`;
        if (answer) answer.innerHTML = `<span>A</span><p>${source.a}</p>`;
      });

      const reservation = config.reservation || {};
      setHtml('.reserve-copy h2', reservation.headingHtml);
      setText('.reserve-copy p', reservation.text);
      setText('.reserve-btn.line strong', reservation.lineLabel);
      setText('.reserve-btn.web strong', reservation.webLabel);
    }

    function initInteractions() {
      qsa('a[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
          const id = link.getAttribute('href');
          if (!id || id === '#') return;
          const target = qs(id);
          if (!target) return;
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });

      const details = qsa('.faq-list details');
      details.forEach(detail => {
        detail.addEventListener('toggle', () => {
          if (detail.open) details.forEach(other => other !== detail && (other.open = false));
        });
      });

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        }, { threshold: 0.12 });
        qsa('.worry-card,.strength-item,.menu-card,.flow-grid article,.voice-card,.offer-panel').forEach(el => {
          el.classList.add('reveal');
          observer.observe(el);
        });
      }
    }

    const init = () => {
      applyContent();
      initInteractions();
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
  }

  if (window.SITE_CONFIG) {
    boot();
  } else {
    const configScript = document.createElement('script');
    configScript.src = 'site-config.js';
    configScript.onload = boot;
    configScript.onerror = boot;
    document.head.appendChild(configScript);
  }
})();
