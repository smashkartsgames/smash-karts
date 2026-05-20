// Mobile nav
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle && navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks && navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// FAQ accordion
document.querySelectorAll('.faq-list').forEach(list => {
  list.querySelectorAll('details').forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) list.querySelectorAll('details').forEach(o => { if (o !== d) o.open = false; });
    });
  });
});

// YouTube facade: load iframe only on click
document.querySelectorAll('.yt-facade').forEach(facade => {
  const load = () => {
    const id = facade.dataset.videoId;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    iframe.title = facade.querySelector('img')?.alt || 'YouTube video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    iframe.style.cssText = 'width:100%;height:100%;border:0;display:block;';
    facade.replaceWith(iframe);
  };
  facade.querySelector('.yt-play').addEventListener('click', load);
});

// Game play button (preview → loading → playing)
document.querySelectorAll('.game-play-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const cover = btn.closest('.game-cover');
    const frame = btn.closest('.embed-frame');
    const loading = frame.querySelector('.game-loading');
    cover.style.display = 'none';
    loading.style.display = 'flex';
    const iframe = document.createElement('iframe');
    iframe.src = frame.dataset.src;
    iframe.title = frame.dataset.title || 'Game';
    iframe.allow = 'fullscreen';
    iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;';
    iframe.onload = () => { loading.style.display = 'none'; };
    frame.appendChild(iframe);
  });
});

// Fullscreen button
document.querySelectorAll('.btn-fullscreen').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById('play');
    if (!target) return;
    const req = target.requestFullscreen
      || target.webkitRequestFullscreen
      || target.mozRequestFullScreen
      || target.msRequestFullscreen;
    req && req.call(target);
  });
});
