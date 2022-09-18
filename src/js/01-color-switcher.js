const bodyEl = document.querySelector(`body`);
const btnStart = document.querySelector(`[data-start]`);
const btnStop = document.querySelector(`[data-stop]`);

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener(`click`, () => {
    btnStart.disabled = true;
    btnStop.disabled = false;
    timerId = setInterval(() => {
        bodyEl.style.background = getRandomHexColor();

    }, 1000);
});

btnStop.addEventListener(`click`, () => {
    btnStop.disabled = true;
    btnStart.disabled = false;
    clearInterval(timerId);
});
