// 正文与图解均为静态 HTML；滚动进度仅增强阅读体验。
const progress = document.querySelector('.reading-progress span');
if (progress) {
  let queued = false;
  const update = () => {
    const range = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)) : 0;
    progress.style.transform = `scaleX(${fraction})`;
    queued = false;
  };
  const schedule = () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  update();
}
