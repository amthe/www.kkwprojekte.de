const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const isEnglish = document.documentElement.lang === 'en';
const heroVideo = document.querySelector('.hero-media video');
const videoReplay = document.querySelector('.video-replay');

if (heroVideo && videoReplay) {
  videoReplay.addEventListener('click', async () => {
    heroVideo.currentTime = 0;
    try {
      await heroVideo.play();
    } catch (_) {
      // The button remains available if a browser blocks playback.
    }
  });
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open
      ? (isEnglish ? 'Close menu' : 'Menü schließen')
      : (isEnglish ? 'Open menu' : 'Menü öffnen'));
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', isEnglish ? 'Open menu' : 'Menü öffnen');
    }
  });
}
