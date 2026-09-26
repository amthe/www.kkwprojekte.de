const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const isEnglish = document.documentElement.lang === 'en';
const heroVideo = document.querySelector('.hero-media video');
const videoReplay = document.querySelector('.video-replay');

if (heroVideo && videoReplay) {
  let startTimer;

  const playHeroAnimation = () => {
    window.clearTimeout(startTimer);
    heroVideo.pause();
    heroVideo.currentTime = 0;
    startTimer = window.setTimeout(async () => {
      try {
        await heroVideo.play();
      } catch (_) {
        // The replay button remains available if a browser blocks playback.
      }
    }, 1000);
  };

  if (heroVideo.readyState >= 1) {
    playHeroAnimation();
  } else {
    heroVideo.addEventListener('loadedmetadata', playHeroAnimation, { once: true });
  }

  videoReplay.addEventListener('click', playHeroAnimation);
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

document.querySelectorAll('a[href^="http"]').forEach((link) => {
  const destination = new URL(link.href, window.location.href);
  if (destination.origin !== window.location.origin) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
});
