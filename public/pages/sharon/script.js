// Nav scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Scroll reveal
const reveals = document.querySelectorAll('.section, blockquote, cite');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Network node lines (canvas)
const visual = document.querySelector('.network-visual');
if (visual) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
  visual.prepend(canvas);

  function drawLines() {
    canvas.width = visual.offsetWidth;
    canvas.height = visual.offsetHeight;
    const ctx = canvas.getContext('2d');
    const center = document.querySelector('.center-node');
    const nodes = document.querySelectorAll('.network-node:not(.center-node)');
    if (!center) return;

    const cr = center.getBoundingClientRect();
    const vr = visual.getBoundingClientRect();
    const cx = cr.left - vr.left + cr.width / 2;
    const cy = cr.top - vr.top + cr.height / 2;

    ctx.strokeStyle = 'rgba(201,169,110,0.2)';
    ctx.lineWidth = 1;

    nodes.forEach(node => {
      const nr = node.getBoundingClientRect();
      const nx = nr.left - vr.left + nr.width / 2;
      const ny = nr.top - vr.top + nr.height / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(nx, ny);
      ctx.stroke();
    });
  }

  setTimeout(drawLines, 100);
  window.addEventListener('resize', drawLines);
}
