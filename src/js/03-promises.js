import Notiflix from 'notiflix';

const formEl = document.querySelector(`.form`);
const inputDelay = document.querySelector(`[name=delay]`);
const inputStep = document.querySelector(`[name=step]`);
const inputAmount = document.querySelector(`[name=amount]`);
const btnSubmit = document.querySelector(`button`);

formEl.addEventListener(`click`, (evn) => {
  evn.preventDefault();

  let delay = Number(inputDelay.value);
  let step = Number(inputStep.value);
  let amount = Number(inputAmount.value);

  for (let position = 1; position <= amount; position += 1) {
  createPromise(position, delay)
  .then(({ position, delay }) => {
     Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
})

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  
}
