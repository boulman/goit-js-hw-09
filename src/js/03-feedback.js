var throttle = require('lodash.throttle');

const FEEDBACK_FORM_STATE = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

const previousState = localStorage.getItem(FEEDBACK_FORM_STATE);
if (previousState) {
  const { email, message } = JSON.parse(previousState);
  form.elements.email.value = email;
  form.elements.message.value = message;
}

form.addEventListener('input', throttle(handleInput, 500));

function handleInput() {
  localStorage.setItem(
    FEEDBACK_FORM_STATE,
    JSON.stringify({
      email: form.elements.email.value,
      message: form.elements.message.value,
    })
  );
}

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  console.log({
    email: e.currentTarget.elements.email.value,
    message: e.currentTarget.elements.message.value,
  });
  localStorage.removeItem(FEEDBACK_FORM_STATE);
  e.currentTarget.elements.email.value = '';
  e.currentTarget.elements.message.value = '';
}
