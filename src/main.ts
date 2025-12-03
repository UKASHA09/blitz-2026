// Bootstrap CSS + JS are loaded via imports in Vite entry (ensure package installed)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './style.css';

// Smooth scroll for internal links & mobile UX helpers
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (!target || target === '#' ) return;
      e.preventDefault();
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // If navbar is open on mobile, close it after click
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // @ts-ignore - using bootstrap collapse via data-bs API
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new (bootstrap as any).Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // Info buttons open modal with details
  const infoButtons = document.querySelectorAll<HTMLButtonElement>('.info-btn');
  const infoModalEl = document.getElementById('infoModal') as HTMLElement | null;
  if (infoModalEl) {
    const infoTitle = document.getElementById('infoTitle') as HTMLElement | null;
    const infoBody = document.getElementById('infoBody') as HTMLElement | null;
    let bsModal: any;
    for (const btn of Array.from(infoButtons)) {
    btn.addEventListener('click', () => {
        const t = btn.dataset.title || 'Event';
        const s = btn.dataset.sub || '';
        if (infoTitle) infoTitle.textContent = t;
        if (infoBody) infoBody.innerHTML = `<p class="small text-muted mb-0">Planet: <strong>${s}</strong></p><p class="small text-muted mt-2">Check registration form for details and team rules.</p>`;
        if (!bsModal) {
          // @ts-ignore
          bsModal = new (bootstrap as any).Modal(infoModalEl);
        }
        bsModal.show();
      });
    }
  }

  // Test button if present
  const testBtn = document.getElementById('test-btn');
  if (testBtn) {
    testBtn.addEventListener('click', () => alert('Blitz Multiverse Activated!'));
  }
});
// Typewriter + fade-in for hero (add inside DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {

  // 1) Fade-in wrapper + logo (staggered via CSS)
  const logoWrapper = document.querySelector<HTMLElement>('.hero-logo-wrapper');
  if (logoWrapper) {
    // small timeout so it doesn't race before layout
    setTimeout(() => logoWrapper.classList.add('in'), 180);
  }

  // 2) Typewriter for hero description
  const descEl = document.getElementById('hero-desc') as HTMLElement | null;
  const text = 'Switch Universe, rule them all!';
  const typingSpeed = 60; // ms per character

  // Respect reduced motion: immediately set text and skip animation
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!descEl) return;

  if (reduce) {
    descEl.textContent = text;
    return;
  }

  // Typewriter implementation
  descEl.textContent = ''; // clear
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      descEl.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, typingSpeed);
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".top-brand-bar") as HTMLElement;
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const current = window.scrollY;

    if (current > lastScroll && current > 20) {
      // scrolling down → shrink
      header.classList.add("shrink");
    } else {
      // scrolling up → expand
      header.classList.remove("shrink");
    }

    lastScroll = current;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const mm = document.getElementById("mm-title");
  if (!mm) return;

  const text = "MULTIVERSE MAYHEM";

  // Clear container
  mm.innerHTML = "";

  text.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.innerHTML = char === " " ? "&nbsp;" : char;
    span.classList.add("mm-letter");
    span.style.animationDelay = `${i * 0.09}s`;  // delay for each letter
    mm.appendChild(span);
  });
});
