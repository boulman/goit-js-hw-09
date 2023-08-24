function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const selectors = {
  body: document.querySelector('body'),
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

let interval;

let isSwitching = false;
selectors.stop.disabled = true;

selectors.stop.addEventListener('click', handleStop);
selectors.start.addEventListener('click', handleStart);

function handleStart() {
  selectors.body.style.backgroundColor = getRandomHexColor();
  interval = setInterval(() => {
    selectors.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  selectors.stop.disabled = false;
  selectors.start.disabled = true;
}

function handleStop() {
  clearInterval(interval);
  selectors.stop.disabled = true;
  selectors.start.disabled = false;
}
