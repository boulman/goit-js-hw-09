import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const selectors = {
  //   input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

selectors.startBtn.disabled = true;
let seletedTime;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    seletedTime = selectedDates[0];
    if (seletedTime.getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    selectors.startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

selectors.startBtn.addEventListener('click', handleStart);
let interval;

function handleStart() {
  let diff = new Date(seletedTime.getTime() - Date.now());

  if (!diff) {
    Notify.failure('Please choose a date in the future');
    return;
  }
  setText(diff);
  interval = setInterval(() => {
    setText(diff);
    diff = new Date(seletedTime.getTime() - Date.now());
    if (seletedTime.getTime() < Date.now()) {
      clearInterval(interval);
    }
  }, 1000);
}

function setText(diff) {
  selectors.seconds.textContent = addLeadingZero(diff.getUTCSeconds());
  selectors.minutes.textContent = addLeadingZero(diff.getUTCMinutes());
  selectors.hours.textContent = addLeadingZero(diff.getUTCHours());
  selectors.days.textContent = addLeadingZero(
    Math.floor(diff.getTime() / 1000 / 60 / 60 / 24)
  );
}

function addLeadingZero(num) {
  return num.toString().padStart(2, '0');
}
