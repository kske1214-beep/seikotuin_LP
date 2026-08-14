(() => {
  'use strict';

  const config = window.SITE_CONFIG || {};

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const text = (selector, value, root = document) => {
    const el = qs(selector, root);
    if (el && value !== undefined && value !== null) el.textContent = value;
  };
  const html = (selector, value, root = document) => {
    const el = qs(selector, root);
    if (el && value !== undefined && value !== null) el.innerHTML = value;
  };
  const attr = (selector, name, value, root = document) => {
    const el = qs(selector, root);
    if (el && value) el.setAttribute(name, value);
  };

  function applyMeta() {
    if (config.meta?.title) document.title = config.meta.title;
    const metaDescription = qs('meta[name="description"]');
    if (metaDescription && config.meta?.description) {
      metaDescription.setAttribute('content', config.meta.description);
    }
  }

  function applyClinicInfo() {
    const clinic = config.clinic || {};

    qsa('.brand-copy strong').forEach(el => {
      if (clinic.brand) el.textContent = clinic.brand;
    });
    qsa('.brand-copy small').forEach(el => {
      if (clinic.subBrand) el.textContent = clinic.subBrand;
    });

    qsa('a[href^="tel:"]').forEach(el => {
      if (clinic.phoneHref) el.setAttribute('href', clinic.phoneHref);
    });

    text('.hero-actions .btn-secondary', clinic.phoneDisplay);
    const phoneButton = qs('.hero-actions .btn-secondary');
    if (phoneButton && clinic.phoneDisplay) {
      phoneButton.innerHTML = `<span>お電話でのご予約</span>${clinic.phoneDisplay}`;
    }

    const accessRows = qsa('.clinic-info dl');
    const clinicValues = [clinic.name, clinic.address, clinic.access, clinic.hours, clinic.closed];
    accessRows.forEach((row, index) => {
      const dd = qs('dd', row);
      if (dd && clinicValues[index]) dd.textContent = clinicValues[index];
    });

    const mapLink = qs('.access-copy .text-link');
    if (mapLink && clinic.mapUrl) mapLink.setAttribute('href', clinic.mapUrl);

    text('.map-label strong', clinic.brand);
    text('.map-label small', clinic.access);

    const lineButton = qs('.reserve-btn.line');
    if (lineButton && clinic.lineUrl) {
      lineButton.setAttribute('href', clinic.lineUrl);
      if (clinic.lineUrl !== '#') lineButton.removeAttribute('onclick');
    }

    const webButton = qs('.reserve-btn.web');
    if (webButton && clinic.webBookingUrl) webButton.setAttribute('href', clinic.webBookingUrl);

    const headerCta = qs('.header-cta');
    if (headerCta && clinic.webBookingUrl) headerCta.setAttribute('href', clinic.webBookingUrl);

    const heroWebCta = qs('.hero-actions .btn-primary');
    if (heroWebCta && clinic.webBookingUrl) heroWebCta.setAttribute('href', clinic.webBookingUrl);

    const offerCta = qs('.offer-panel .btn-primary');
    if (offerCta && clinic.webBookingUrl) offerCta.setAttribute('href', clinic.webBookingUrl);

    const reserveTel = qs('.reserve-btn.tel');
    if (reserveTel && clinic.phoneHref) reserveTel.setAttribute('href', clinic.phoneHref);
    text('.reserve-btn.tel strong', clinic.phoneDisplay);

    const mobileTel = qs('.mobile-tel');
    if (mobileTel && clinic.phoneHref) mobileTel.setAttribute('href', clinic.phoneHref);
    text('.mobile-tel strong', clinic.phoneDisplay);

    const mobileWeb = qs('.mobile-web');
    if (mobileWeb && clinic.webBookingUrl) mobileWeb.setAttribute('href', clinic.webBookingUrl);

    if (clinic.director) {
      text('.staff-caption strong', clinic.director);
      const signature = qs('.signature');
      if (signature) {
        signature.innerHTML = `${clinic.name || ''} <strong>院長 ${clinic.director}</strong>`;
      }
    }

    if (clinic.since) html('.hero-stamp', `SINCE<br><strong>${clinic.since}</strong>`);

    const copyright = qs('.copyright');
    if (copyright && clinic.brand) {
      copyright.textContent = `© ${new Date().getFullYear()} ${clinic.brand}. All Rights Reserved.`;
    }
  }

  function applyHero() {
    const hero = config.hero || {};
    const eyebrow = qs('.hero .eyebrow');
    if (eyebrow && hero.eyebrow) eyebrow.innerHTML = `<span></span> ${hero.eyebrow}`;
    text('.hero-kicker', hero.kicker);
    html('.hero h1', hero.titleHtml);
    html('.hero-lead', hero.leadHtml);

    qsa('.hero-badges div').forEach((item, index) => {
      const label = hero.badges?.[index];
      const span = qs('span', item);
      if (span && label) span.textContent = label;
    });

    text('.offer-label', hero.offerLabel);
    text('.hero-offer .offer-price > span', hero.offerName);
    text('.hero-offer .offer-price strong', hero.offerPrice);
    text('.hero-offer .offer-price small', hero.offerTax);
    text('.hero-offer > p', hero.offerNote);
    text('.microcopy', hero.microcopy);

    attr('.hero-photo-card img', 'src', hero.image);
    attr('.hero-photo-card img', 'alt', hero.imageAlt);
    text('.floating-card--top strong', hero.floatingTopTitle);
    text('.floating-card--top span', hero.floatingTopText);
    text('.floating-card--bottom strong', hero.floatingBottomTitle);
    text('.floating-card--bottom span', hero.floatingBottomText);
  }

  function applyTrust() {
    qsa('.trust-grid > div').forEach((item, index) => {
      const source = config.trust?.[index];
      if (!source) return;
      text('strong', source.title, item);
      text('p', source.text, item);
    });
  }

  function applyWorries() {
    const section = config.worries || {};
    html('.worries .section-heading h2', section.headingHtml);
    text('.worries .section-heading p', section.lead);
    qsa('.worry-card').forEach((card, index) => {
      const source = section.items?.[index];
      if (!source) return;
      text('.icon', source.icon, card);
      text('h3', source.title, card);
      text('p', source.text, card);
    });
    html('.worries-message p', section.messageHtml);
  }

  function applyConcept() {
    const section = config.concept || {};
    html('.concept-copy h2', section.headingHtml);
    text('.concept-copy .lead', section.lead);
    const paragraphs = qsa('.concept-copy > p');
    if (paragraphs[1] && section.body) paragraphs[1].textContent = section.body;
    qsa('.concept-copy .check-list li').forEach((item, index) => {
      if (section.checks?.[index]) item.textContent = section.checks[index];
    });
    attr('.concept-image img', 'src', section.image);
    attr('.concept-image img', 'alt', section.imageAlt);
  }

  function applyStrengths() {
    const section = config.strengths || {};
    html('.strengths .section-heading h2', section.headingHtml);
    qsa('.strength-item').forEach((item, index) => {
      const source = section.items?.[index];
      if (!source) return;
      text('.mini-label', source.label, item);
      text('.strength-copy h3', source.title, item);
      text('.strength-copy p', source.text, item);
      attr('.strength-media img', 'src', source.image, item);
      attr('.strength-media img', 'alt', source.imageAlt, item);
    });
  }

  function applyMenu() {
    const section = config.menu || {};
    html('.menu .section-heading h2', section.headingHtml);
    text('.menu .section-heading p', section.lead);
    qsa('.menu-card').forEach((card, index) => {
      const source = section.items?.[index];
      if (!source) return;
      text('h3', source.title, card);
      text('p', source.text, card);
      qsa('li', card).forEach((item, bulletIndex) => {
        if (source.bullets?.[bulletIndex]) item.textContent = source.bullets[bulletIndex];
      });
    });
    text('.menu-note', section.note);
  }

  function applyFirstOffer() {
    const section = config.firstOffer || {};
    html('.offer-panel-copy h2', section.headingHtml);
    text('.offer-panel-copy p', section.text);
    text('.offer-panel-price > span', section.regularPrice);
    text('.offer-panel-price strong', section.price);
    text('.offer-panel-price > p', section.note);
    const cta = qs('.offer-panel .btn-primary');
    if (cta && section.cta) cta.innerHTML = `${section.cta} <i>→</i>`;
  }

  function applyFlow() {
    qsa('.flow-grid article').forEach((item, index) => {
      const source = config.flow?.[index];
      if (!source) return;
      text('.flow-icon', source.icon, item);
      text('h3', source.title, item);
      text('p', source.text, item);
    });
  }

  function applyVoices() {
    const section = config.voices || {};
    text('.voice .section-heading p', section.note);
    qsa('.voice-card').forEach((card, index) => {
      const source = section.items?.[index];
      if (!source) return;
      text('.avatar', source.age, card);
      text('.voice-meta strong', source.profile, card);
      text('.voice-meta span', source.sub, card);
      text('h3', source.title, card);
      text('p', source.text, card);
    });
  }

  function applyStaff() {
    const section = config.staff || {};
    html('.staff-copy h2', section.headingHtml);
    const paragraphs = qsa('.staff-copy > p');
    if (paragraphs[0] && section.body1) paragraphs[0].textContent = section.body1;
    if (paragraphs[1] && section.body2) paragraphs[1].textContent = section.body2;
    attr('.staff-photo img', 'src', section.image);
    attr('.staff-photo img', 'alt', section.imageAlt);
  }

  function applyFaq() {
    qsa('.faq-list details').forEach((item, index) => {
      const source = config.faq?.[index];
      if (!source) return;
      const summary = qs('summary', item);
      if (summary) summary.innerHTML = `<span>Q</span>${source.q}`;
      const answer = qs('.faq-answer', item);
      if (answer) answer.innerHTML = `<span>A</span><p>${source.a}</p>`;
    });
  }

  function applyReservation() {
    const section = config.reservation || {};
    html('.reserve-copy h2', section.headingHtml);
    text('.reserve-copy p', section.text);
    text('.reserve-btn.line strong', section.lineLabel);
    text('.reserve-btn.web strong', section.webLabel);
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
        if (!detail.open) return;
        details.forEach(other => {
          if (other !== detail) other.open = false;
        });
      });
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      qsa('.worry-card,.strength-item,.menu-card,.flow-grid article,.voice-card,.offer-panel').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyMeta();
    applyClinicInfo();
    applyHero();
    applyTrust();
    applyWorries();
    applyConcept();
    applyStrengths();
    applyMenu();
    applyFirstOffer();
    applyFlow();
    applyVoices();
    applyStaff();
    applyFaq();
    applyReservation();
    initInteractions();
  });
})();
