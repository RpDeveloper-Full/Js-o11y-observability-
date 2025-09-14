// script.js — observabilidad básica (o11y demo)
(function () {
  const loadTimeEl = document.getElementById('loadTime');
  const fpsEl = document.getElementById('fps');
  const memoryEl = document.getElementById('memory');
  const logsEl = document.getElementById('logs');

  /* -------------------
     Métricas
  ------------------- */
  // Tiempo de carga
  window.addEventListener('load', () => {
    const t = performance.now().toFixed(0);
    loadTimeEl.textContent = t;
    logEvent(`Página cargada en ${t} ms`);
  });

  // FPS aproximado
  let frames = 0;
  let lastTime = performance.now();
  function loop() {
    frames++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
      fpsEl.textContent = frames;
      frames = 0;
      lastTime = now;
    }
    requestAnimationFrame(loop);
  }
  loop();

  // Memoria (si el navegador lo soporta)
  function updateMemory() {
    if (performance.memory) {
      const used = (performance.memory.usedJSHeapSize / 1048576).toFixed(1);
      const total = (performance.memory.totalJSHeapSize / 1048576).toFixed(1);
      memoryEl.textContent = `${used} / ${total} MB`;
    } else {
      memoryEl.textContent = 'No soportado';
    }
  }
  setInterval(updateMemory, 2000);

  /* -------------------
     Logs de usuario
  ------------------- */
  function logEvent(msg) {
    const div = document.createElement('div');
    div.className = 'log-entry';
    const time = new Date().toLocaleTimeString();
    div.innerHTML = `<span class="log-time">[${time}]</span><span class="log-msg">${msg}</span>`;
    logsEl.prepend(div); // más nuevo arriba
  }

  // Clicks
  document.addEventListener('click', (e) => {
    logEvent(`Click en <${e.target.tagName.toLowerCase()}>`);
  });

  // Teclas
  document.addEventListener('keydown', (e) => {
    logEvent(`Tecla presionada: "${e.key}"`);
  });

})();