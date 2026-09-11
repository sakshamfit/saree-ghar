/* ═══════════════════════════════════════════════
   contact — the closing section of the main
   experience. Brand config, honest form handling
   (prefilled email handoff; no fake submissions),
   and the established scroll-reveal grammar.
   ═══════════════════════════════════════════════ */

import { t as translate } from './i18n.js';
import { registerReveal } from './scroll.js';

/* every piece of contact data lives here — update once, applies everywhere.
   Source: the shop's verified Google Business Profile
   ("Saree Ghar | Best Saree Shop", Gorakhpur, Uttar Pradesh). */
export const BRAND = {
  name: 'Saree Ghar | Best Saree Shop',
  email: null,                       /* no inbox on the Google listing — form falls back to phone/Instagram */
  instagram: 'sareeghar_gkp',
  instagramUrl: 'https://www.instagram.com/sareeghar_gkp/',
  phone: '+91 87951 19537',          /* listed on the Google profile */
  location: 'Ground Floor, Harbans Complex, Vijay Chowk, near Vijay Cinemas, Gorakhpur, Uttar Pradesh 273001, India',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Saree Ghar, Ground Floor, Harbans Complex, Vijay Chowk, near Vijay Cinemas, Gorakhpur, Uttar Pradesh 273001'),
  /* Google rating as published on the business profile */
  rating: { value: '4.8', count: 394 },
  reviewsUrl: 'https://www.google.com/search?ludocid=296183324800323483' +
    '#lrd=0x3991446883ee437d:0x41c412a271e0f9b,1',
};

function applyBrand() {
  const email = document.getElementById('ctEmail');
  if (email && BRAND.email) {
    email.href = 'mailto:' + BRAND.email;
    email.textContent = BRAND.email;
  }

  document.getElementById('ctDirections').href = BRAND.mapsUrl;
  document.getElementById('ctOpenMaps').href = BRAND.mapsUrl;
  document.getElementById('ctInstagram').href = BRAND.instagramUrl;

  const handle = document.getElementById('ctIgHandle');
  if (handle) handle.textContent = '@' + BRAND.instagram;

  const reviews = document.getElementById('ctReviews');
  if (reviews) reviews.href = BRAND.reviewsUrl;

  if (BRAND.phone) {
    const p = document.getElementById('ctPhone');
    p.removeAttribute('data-i18n');
    p.innerHTML = `<a class="ci-link" href="tel:${BRAND.phone.replace(/\s+/g, '')}">${BRAND.phone}</a>`;
  }
}

/* ---------- form ---------- */

function fieldError(row, msg) {
  row.classList.toggle('is-error', !!msg);
  row.querySelector('.cf-err').textContent = msg || '';
  const field = row.querySelector('input, select, textarea');
  if (msg) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
}

function wireForm() {
  const form = document.getElementById('ctForm');
  const send = document.getElementById('cfSend');
  const sendLabel = send.querySelector('span');
  const status = document.getElementById('cfStatus');
  const rows = {
    name: document.getElementById('cfName').closest('.cf-row'),
    email: document.getElementById('cfEmail').closest('.cf-row'),
    subject: document.getElementById('cfSubject').closest('.cf-row'),
    message: document.getElementById('cfMessage').closest('.cf-row'),
  };

  const err = {
    name: 'ct.err.name', email: 'ct.err.email',
    subject: 'ct.err.subject', message: 'ct.err.message',
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value;
    const message = form.message.value.trim();

    let firstBad = null;
    const check = (ok, key) => {
      fieldError(rows[key], ok ? '' : translate(err[key]));
      if (!ok && !firstBad) firstBad = rows[key];
      return ok;
    };
    const okName = check(name.length >= 2, 'name');
    const okEmail = check(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email), 'email');
    const okSubject = check(subject !== '', 'subject');
    const okMessage = check(message.length >= 10, 'message');

    if (!(okName && okEmail && okSubject && okMessage)) {
      firstBad.querySelector('input, select, textarea').focus();
      return;
    }

    if (BRAND.email) {
      /* hand off honestly to the visitor's email app, prefilled and
         addressed to the real brand inbox */
      const topicText = form.subject.options[form.subject.selectedIndex].textContent;
      const mail = `mailto:${BRAND.email}` +
        `?subject=${encodeURIComponent('[Saree Ghar] ' + topicText)}` +
        `&body=${encodeURIComponent(`${message}\n\n— ${name}\n${email}`)}`;

      send.disabled = true;
      sendLabel.textContent = translate('ct.sending');
      window.location.href = mail;

      setTimeout(() => {
        sendLabel.textContent = translate('ct.send');
        send.disabled = false;
        status.textContent = translate('ct.sent');
      }, 1400);
    } else {
      /* no published inbox yet — point visitors at the phone line and
         Instagram instead of pretending a message went anywhere */
      status.textContent = translate('ct.noEmail');
    }
  });

  for (const row of Object.values(rows)) {
    row.querySelector('input, select, textarea').addEventListener('input', () => {
      fieldError(row, '');
    });
  }
}

/* ---------- reveals (scroll-triggered, same grammar) ---------- */

function buildReveals() {
  gsap.set(['#contact .ch-shadow', '#contact .ch-florals'], { autoAlpha: 0 });
  gsap.set('#contact .ch-copy > *', { autoAlpha: 0, y: 24 });
  gsap.set('#contact .ch-media', { clipPath: 'inset(0% 0% 0% 100%)' });
  gsap.set('#contact .ch-media img', { scale: 1.06, xPercent: 3 });

  const chTl = gsap.timeline({
    scrollTrigger: { trigger: '#contact .ch', start: 'top 72%', once: true },
    onComplete: () => {
      gsap.to('#contact .ch-shadow', { x: 9, duration: 12, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      gsap.to('#contact .ch-florals', { y: -5, rotation: 1, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1 });
    },
  })
    .to(['#contact .ch-shadow', '#contact .ch-florals'], {
      autoAlpha: 1, duration: 1.1, ease: 'power2.out', stagger: 0.1,
    }, 0)
    .to('#contact .ch-copy > *', {
      autoAlpha: 1, y: 0, duration: 0.95, ease: 'power3.out', stagger: 0.09,
    }, 0.15)
    .to('#contact .ch-media', {
      clipPath: 'inset(0% 0% 0% 0%)', duration: 1.35, ease: 'power2.inOut',
    }, 0.3)
    .to('#contact .ch-media img', {
      scale: 1, xPercent: 0, duration: 1.7, ease: 'power3.out',
    }, 0.3);
  registerReveal('#contact .ch', chTl);

  gsap.set(['.ci-block', '.ci-info .ct-btn', '.ci-social'], { autoAlpha: 0, y: 20 });
  gsap.set('.ci-form', { autoAlpha: 0, y: 24 });
  gsap.set('.ci-quote > *', { autoAlpha: 0, y: 18 });
  const ciTl = gsap.timeline({
    scrollTrigger: { trigger: '.ci', start: 'top 74%', once: true },
  })
    .to(['.ci-block', '.ci-info .ct-btn', '.ci-social'], {
      autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.09,
    }, 0)
    .to('.ci-form', { autoAlpha: 1, y: 0, duration: 0.95, ease: 'power3.out' }, 0.25)
    .to('.ci-quote > *', {
      autoAlpha: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.12,
    }, 0.45);
  registerReveal('.ci', ciTl);

  gsap.set('.cr-head > *', { autoAlpha: 0, y: 18 });
  gsap.set('.cr-card', { autoAlpha: 0, y: 22 });
  const crTl = gsap.timeline({
    scrollTrigger: { trigger: '.cr', start: 'top 76%', once: true },
  })
    .to('.cr-head > *', { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.1 }, 0)
    .to('.cr-card', { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 }, 0.2);
  registerReveal('.cr', crTl);

  gsap.set('.cl-photo', { clipPath: 'inset(0% 100% 0% 0%)' });
  gsap.set('.cl-center > *', { autoAlpha: 0, y: 18 });
  gsap.set('.cl-map', { autoAlpha: 0, y: 20 });
  const clTl = gsap.timeline({
    scrollTrigger: { trigger: '.cl', start: 'top 78%', once: true },
  })
    .to('.cl-photo', {
      clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power2.inOut',
    }, 0)
    .to('.cl-center > *', {
      autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.08,
    }, 0.3)
    .to('.cl-map', { autoAlpha: 1, y: 0, duration: 0.95, ease: 'power3.out' }, 0.45);
  registerReveal('.cl', clTl);
}

/* ---------- init (called from the main boot) ---------- */

export function initContactSection(reducedMotion) {
  applyBrand();
  wireForm();
  if (reducedMotion) return;
  buildReveals();
}
