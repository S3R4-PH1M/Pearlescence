(() => {
  const card = document.getElementById('card');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const maxTilt = 18; // degrees

  function updateFromPointer(clientX, clientY) {
    const cardRect = card.getBoundingClientRect();
    const localX = clientX - cardRect.left;
    const localY = clientY - cardRect.top;

    const pointerX = Math.min(Math.max((localX / cardRect.width) * 100, 0), 100);
    const pointerY = Math.min(Math.max((localY / cardRect.height) * 100, 0), 100);

    const tiltY = ((localX / cardRect.width) - 0.5) * maxTilt * 2;
    const tiltX = ((localY / cardRect.height) - 0.5) * -maxTilt * 2;

    const centerOffsetX = (pointerX - 50) / 50;
    const centerOffsetY = (pointerY - 50) / 50;
    const distanceFromCenter = Math.min(Math.sqrt(centerOffsetX * centerOffsetX + centerOffsetY * centerOffsetY), 1);
    const glowIntensity = 1 - distanceFromCenter * 0.6;

    card.style.setProperty('--pointer-x', `${pointerX}%`);
    card.style.setProperty('--pointer-y', `${pointerY}%`);
    card.style.setProperty('--tilt-x', `${tiltX}deg`);
    card.style.setProperty('--tilt-y', `${tiltY}deg`);
    card.style.setProperty('--glow-intensity', glowIntensity.toFixed(2));
  }

  function reset() {
    card.style.setProperty('--pointer-x', '50%');
    card.style.setProperty('--pointer-y', '50%');
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--glow-intensity', '0.5');
  }

  card.addEventListener('pointermove', (pointerEvent) => {
    updateFromPointer(pointerEvent.clientX, pointerEvent.clientY);
  });

  card.addEventListener('pointerleave', reset);

})();