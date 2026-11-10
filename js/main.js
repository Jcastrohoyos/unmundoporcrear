// ===== Cookie Banner / Consentimiento =====
const COOKIE_KEY = 'crear_consentimiento';
const COOKIE_VERSION = 'v1';

const readConsent = () => {
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || data.version !== COOKIE_VERSION) return null;
    return data;
  } catch (e) {
    return null;
  }
};

const saveConsent = (consent) => {
  try {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({
      version: COOKIE_VERSION,
      analytics: !!consent.analytics,
      ads: !!consent.ads,
      date: new Date().toISOString()
    }));
  } catch (e) {
    // modo privado o almacenamiento bloqueado: el banner sigue funcionando en memoria
  }
};

const loadAnalytics = (consent) => {
  const config = window.CREAR_ANALYTICS || {};
  const isValid = (id) => id && id.indexOf('XXXXX') === -1;

  if (!consent || !consent.analytics) return;
  if (typeof window.gtag === 'function') return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());

  if (isValid(config.ga4Id)) {
    gtag('config', config.ga4Id, { anonymize_ip: true });
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.ga4Id)}`;
    document.head.appendChild(s);
  }

  if (consent.ads && isValid(config.adsId)) {
    gtag('config', config.adsId);
  }
};

const initCookieBanner = () => {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;

  const prefs = document.getElementById('cookiePrefs');
  const analyticsBox = document.getElementById('cookieAnalytics');
  const adsBox = document.getElementById('cookieAds');
  const customizeBtn = document.getElementById('cookieCustomize');
  const savePrefsBtn = document.getElementById('cookieSavePrefs');
  const acceptAllBtn = document.getElementById('cookieAcceptAll');
  const necessaryBtn = document.getElementById('cookieNecessary');

  const showBanner = () => {
    banner.hidden = false;
    document.body.classList.add('cookie-banner-open');
    requestAnimationFrame(() => banner.classList.add('is-visible'));
  };

  const hideBanner = () => {
    banner.classList.remove('is-visible');
    document.body.classList.remove('cookie-banner-open');
    setTimeout(() => { banner.hidden = true; }, 450);
  };

  const applyConsent = (consent) => {
    saveConsent(consent);
    loadAnalytics(consent);
    hideBanner();
  };

  acceptAllBtn.addEventListener('click', () => applyConsent({ analytics: true, ads: true }));
  necessaryBtn.addEventListener('click', () => applyConsent({ analytics: false, ads: false }));

  customizeBtn.addEventListener('click', () => {
    const open = prefs.hidden;
    prefs.hidden = !open;
    savePrefsBtn.hidden = !open;
    customizeBtn.setAttribute('aria-expanded', String(open));
    customizeBtn.textContent = open ? 'Cerrar' : 'Personalizar';
  });

  savePrefsBtn.addEventListener('click', () => {
    applyConsent({ analytics: !!(analyticsBox && analyticsBox.checked), ads: !!(adsBox && adsBox.checked) });
  });

  const existing = readConsent();
  if (existing) {
    loadAnalytics(existing);
  } else {
    showBanner();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCookieBanner);
} else {
  initCookieBanner();
}

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const navbarEl = document.getElementById('navbar');

if (hamburger && mobileMenu) {
  const setMenuState = (isActive) => {
    hamburger.classList.toggle('active', isActive);
    mobileMenu.classList.toggle('active', isActive);
    hamburger.setAttribute('aria-expanded', String(isActive));
    hamburger.setAttribute('aria-label', isActive ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    mobileMenu.setAttribute('aria-hidden', String(!isActive));
    document.body.style.overflow = isActive ? 'hidden' : '';
    // El navbar sube por encima del overlay para que la "X" siga siendo clicable
    if (navbarEl) navbarEl.classList.toggle('menu-open', isActive);
  };

  hamburger.addEventListener('click', () => {
    setMenuState(!mobileMenu.classList.contains('active'));
  });

  // Close mobile menu when clicking any link inside
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuState(false));
  });

  // Close when clicking the overlay background (outside the links)
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) setMenuState(false);
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      setMenuState(false);
      hamburger.focus();
    }
  });
}

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Hero Carousel (diferenciales) =====
const heroCarousel = document.getElementById('heroCarousel');
if (heroCarousel) {
  const slides = Array.from(heroCarousel.querySelectorAll('.hero-carousel-slide'));
  const dots = Array.from(heroCarousel.querySelectorAll('[data-carousel-dot]'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intervalMs = 3800;
  let current = 0;
  let timer = null;
  let paused = false;

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('is-active', active);
      if (active) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });
  };

  const start = () => {
    if (prefersReducedMotion || paused || timer || slides.length < 2) return;
    timer = setInterval(() => showSlide(current + 1), intervalMs);
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      stop();
      showSlide(Number(dot.dataset.carouselDot));
    });
  });

  heroCarousel.addEventListener('mouseenter', () => {
    paused = true;
    stop();
  });

  heroCarousel.addEventListener('mouseleave', () => {
    paused = false;
    start();
  });

  heroCarousel.addEventListener('focusin', () => {
    paused = true;
    stop();
  });

  heroCarousel.addEventListener('focusout', (e) => {
    if (!heroCarousel.contains(e.relatedTarget)) {
      paused = false;
      start();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  showSlide(0);
  start();
}

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navbar = document.getElementById('navbar');
      const offset = navbar ? navbar.getBoundingClientRect().height + 12 : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      // Al llegar al formulario, el foco queda en el primer campo para escribir de una
      if (targetId === '#contactForm') {
        setTimeout(() => {
          const field = document.getElementById('contact-name');
          if (field) field.focus({ preventScroll: true });
        }, 700);
      }
    }
  });
});

// ===== Active Link Highlight on Scroll =====
const sections = document.querySelectorAll('section[id]');
function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const navbar = document.getElementById('navbar');
    const sectionTop = section.offsetTop - (navbar ? navbar.getBoundingClientRect().height + 12 : 120);
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.navbar-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// ===== Back to Top Button =====
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Toast Notification System =====
function showToast(message, type = 'success', duration = 5000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'false');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icons = {
    success: '<i class="ph ph-check-circle ph-fill"></i>',
    error: '<i class="ph ph-x-circle ph-fill"></i>',
    info: '<i class="ph ph-info ph-fill"></i>'
  };

  toast.innerHTML = `
    <span class="toast-icon" aria-hidden="true">${icons[type] || icons.success}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" aria-label="Cerrar notificación"><i class="ph ph-x"></i></button>
  `;

  container.appendChild(toast);

  // Force reflow then show
  requestAnimationFrame(() => {
    toast.classList.add('visible');
  });

  const hide = () => {
    toast.classList.remove('visible');
    toast.classList.add('hiding');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  };

  // Auto-hide
  const timer = setTimeout(hide, duration);

  // Manual close
  toast.querySelector('.toast-close').addEventListener('click', () => {
    clearTimeout(timer);
    hide();
  });

  // Pause on hover
  toast.addEventListener('mouseenter', () => clearTimeout(timer));
  toast.addEventListener('mouseleave', () => setTimeout(hide, 1500));
}

// ===== Contact Form -> Structured WhatsApp Message + mailto fallback =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const inputs = contactForm.querySelectorAll('.form-input, .form-select');
  
  // Honeypot field
  const honeypot = contactForm.querySelector('#website');

  // Real-time validation feedback
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.hasAttribute('aria-invalid')) {
        validateField(input);
      }
    });
  });

  function validateField(field) {
    const hintId = field.getAttribute('aria-describedby') || `${field.id}-hint`;
    const hint = hintId ? document.getElementById(hintId) : null;
    let isValid = true;
    let message = '';

    if (field.required && !field.value.trim()) {
      isValid = false;
      message = 'Este campo es obligatorio';
    } else if (field.type === 'tel' && field.value.trim()) {
      const phone = field.value.trim();
      const allowedChars = /^[\d\s\-\+\(\)]+$/.test(phone);
      const digitCount = (phone.match(/\d/g) || []).length;
      if (!allowedChars || digitCount < 7 || digitCount > 15) {
        isValid = false;
        message = 'Ingresa un número de teléfono válido (7 a 15 dígitos)';
      }
    }

    field.setAttribute('aria-invalid', !isValid);
    
    if (hint) {
      hint.textContent = message;
      hint.className = 'form-hint';
      if (message) {
        hint.classList.add(isValid ? 'success' : 'error');
      }
    }

    return isValid;
  }

  function openMailtoFallback(name, phone, childAge, level, message) {
    const subject = encodeURIComponent('Solicitud de información - Jardín Infantil CREAR');
    const body = encodeURIComponent(
      `¡Hola Jardín Infantil CREAR!\n\n` +
      `Me gustaría solicitar información para admisiones:\n\n` +
      `Nombre del Acudiente: ${name}\n` +
      `Teléfono: ${phone}\n` +
      `Edad del Niño/a: ${childAge}\n` +
      `Nivel de Interés: ${level}\n` +
      `Mensaje: ${message}`
    );
    window.location.href = `mailto:unmundoporcrear@gmail.com?subject=${subject}&body=${body}`;
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Honeypot check - if filled, it's likely a bot
    if (honeypot && honeypot.value.trim()) {
      // Silently fail for bots, but show success to not reveal the trap
      showToast('¡Gracias! Te contactaremos pronto por WhatsApp.', 'success');
      contactForm.reset();
      if (honeypot) honeypot.value = '';
      return;
    }
    
    // Validate all fields
    let allValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        allValid = false;
      }
    });

    if (!allValid) {
      const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const navbar = document.getElementById('navbar');
        if (navbar) {
          window.scrollBy(0, -(navbar.getBoundingClientRect().height + 16));
        }
      }
      showToast('Por favor completa los campos requeridos', 'error');
      return;
    }
    
    const name = document.getElementById('contact-name')?.value.trim() || '';
    const phone = document.getElementById('contact-phone')?.value.trim() || '';
    const childAge = document.getElementById('contact-age')?.value.trim() || 'No especificada';
    const level = document.getElementById('contact-level')?.value || 'Por definir';
    const message = 'Deseo recibir información general y disponibilidad de cupos.';
    
    if (!name || !phone) {
      showToast('Por favor completa tu nombre y número de teléfono', 'error');
      return;
    }
    
    const whatsappText = `¡Hola Jardín Infantil CREAR! 👋\n` +
      `Me gustaría solicitar información para admisiones :\n\n` +
      `👤 *Nombre del Acudiente:* ${name}\n` +
      `📱 *Teléfono:* ${phone}\n` +
      `👶 *Edad del Niño/a:* ${childAge}\n` +
      `🎓 *Nivel de Interés:* ${level}\n` +
      `💬 *Mensaje:* ${message}`;
    
    const whatsappUrl = `https://wa.me/573104711322?text=${encodeURIComponent(whatsappText)}`;

    // Open WhatsApp. NOTE: no usamos 'noopener' en features porque entonces
    // window.open() devuelve null y no podemos detectar si el popup fue
    // bloqueado. En su lugar abrimos la ventana y cortamos opener manualmente.
    let whatsappWindow = null;
    try {
      whatsappWindow = window.open(whatsappUrl, '_blank');
      if (whatsappWindow) {
        whatsappWindow.opener = null;
      }
    } catch (e) {
      whatsappWindow = null;
    }

    const popupBlocked = !whatsappWindow;

    setTimeout(() => {
      if (popupBlocked) {
        // Popup bloqueado: usamos mailto como alternativa
        openMailtoFallback(name, phone, childAge, level, message);
        showToast('Se abrió tu cliente de correo. Si no abre, escríbenos al 310 471 13 22', 'info', 9000);
      } else {
        showToast('¡Perfecto! Se abrió WhatsApp con tu mensaje listo para enviar', 'success');
      }
    }, 1000);

    // Si el popup se abrió correctamente, limpiamos el formulario.
    // Si todo falló, conservamos los datos para que el usuario pueda reintentar.
    if (!popupBlocked) {
      setTimeout(() => {
        contactForm.reset();
        inputs.forEach(input => {
          input.removeAttribute('aria-invalid');
          const hintId = input.getAttribute('aria-describedby') || `${input.id}-hint`;
          const hint = hintId ? document.getElementById(hintId) : null;
          if (hint) {
            hint.textContent = '';
            hint.className = 'form-hint';
          }
        });
      }, 3000);
    }
  });
}

// ===== Counter Animation for Stats =====
function animateCounter(element, target, duration = 1600) {
  let start = 0;
  const stepTime = 16;
  const steps = duration / stepTime;
  const increment = target / steps;
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, stepTime);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numberEl = entry.target.querySelector('.stat-number[data-target]');
      if (numberEl) {
        const target = parseInt(numberEl.getAttribute('data-target'), 10);
        if (!isNaN(target)) {
          animateCounter(numberEl, target);
        }
      }
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// Observe stats in both sections
document.querySelectorAll('.about-stats .stat-item, .why-stats .stat-item').forEach(stat => {
  if (stat.querySelector('[data-target]')) {
    statsObserver.observe(stat);
  }
});

// ===== Blog Card Expand/Collapse =====
const expandButtons = document.querySelectorAll('.expand-btn');

expandButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const article = btn.closest('.blog-card');
    const content = article.querySelector('.blog-card-content');
    const expandText = btn.querySelector('.expand-text');
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      // Collapse
      content.classList.add('collapsed');
      content.style.maxHeight = '180px';
      btn.setAttribute('aria-expanded', 'false');
      if (expandText) expandText.textContent = 'Leer más';
    } else {
      // Expand
      content.classList.remove('collapsed');
      content.style.maxHeight = content.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
      if (expandText) expandText.textContent = 'Leer menos';
    }
  });
});

// ===== Gallery Lightbox =====
(function initGalleryLightbox() {
  const lightbox = document.getElementById('galleryLightbox');
  if (!lightbox) return;

  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item[data-fullsrc]'));
  let currentIndex = -1;

  function openLightbox(index) {
    if (index < 0 || index >= galleryItems.length) return;
    currentIndex = index;
    const item = galleryItems[currentIndex];
    const src = item.dataset.fullsrc;
    const caption = item.dataset.caption || '';
    lightboxImage.src = src;
    lightboxImage.alt = caption;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateNavButtons();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImage.src = '';
    lightboxCaption.textContent = '';
    document.body.style.overflow = '';
    currentIndex = -1;
  }

  function navigate(direction) {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < galleryItems.length) {
      openLightbox(newIndex);
    }
  }

  function updateNavButtons() {
    prevBtn.style.display = currentIndex > 0 ? 'flex' : 'none';
    nextBtn.style.display = currentIndex < galleryItems.length - 1 ? 'flex' : 'none';
  }

  // Click on gallery item
  galleryItems.forEach((item, index) => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Ver imagen ampliada: ${item.dataset.caption || 'Imagen de las instalaciones'}`);
  });

  // Close button
  closeBtn.addEventListener('click', closeLightbox);

  // Navigation buttons
  prevBtn.addEventListener('click', () => navigate(-1));
  nextBtn.addEventListener('click', () => navigate(1));

  // Click outside image to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Touch swipe support
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      navigate(diff > 0 ? 1 : -1);
    }
  }, { passive: true });
})();

// ===== Hero Typewriter / Word-Cycling =====
(function initHeroTypewriter() {
  const wrapper = document.querySelector('.hero-typewriter');
  if (!wrapper) return;

  const words = ['imaginación', 'creatividad','exploración',];
  let idx = 0;

  // Respect reduced-motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  function cycleWord() {
    const current = wrapper.querySelector('.typewriter-word');
    if (!current) return;

    // Exit animation
    current.classList.add('tw-exit');

    current.addEventListener('animationend', () => {
      idx = (idx + 1) % words.length;

      const next = document.createElement('span');
      next.className = 'typewriter-word tw-enter';
      next.textContent = words[idx];

      wrapper.replaceChildren(next);

      next.addEventListener('animationend', () => {
        next.classList.remove('tw-enter');
      }, { once: true });
    }, { once: true });
  }

  // Cycle every 2.8 s (exit .35s + enter .45s + display ~2s)
  setInterval(cycleWord, 2800);
})();

// ===== Hero Parallax on mouse move (desktop only) =====
(function initHeroParallax() {
  const hero = document.querySelector('.hero');
  const image = hero && hero.querySelector('.hero-image-card');
  if (!hero || !image) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let raf;
  hero.addEventListener('mousemove', (e) => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;   // -0.5 … +0.5
      const dy = (e.clientY - cy) / rect.height;

      // Subtle tilt on the image card
      image.style.transform = `rotate(${-1 + dy * 2}deg) translate(${dx * -6}px, ${dy * -4}px)`;
    });
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    if (raf) cancelAnimationFrame(raf);
    image.style.transform = 'rotate(-1deg)';
  });
})();
