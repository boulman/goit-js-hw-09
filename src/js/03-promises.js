import { Notify } from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    return new Promise((res, rej) => {
      setTimeout(() => res({ position, delay }), delay);
    });
  } else {
    return new Promise((res, rej) => {
      setTimeout(() => rej({ position, delay }), delay);
    });
  }
}

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const values = {
    firstDelay: Number(e.currentTarget.elements.delay.value),
    step: Number(e.currentTarget.elements.step.value),
    amount: Number(e.currentTarget.elements.amount.value),
  };
  for (let i = 0; i < values.amount; i++) {
    const prom = createPromise(i, values.step * i + values.firstDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
