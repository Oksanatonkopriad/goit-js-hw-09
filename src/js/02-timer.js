// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputDate = document.querySelector(`#datetime-picker`);
const btnStart = document.querySelector(`[data-start]`);

const daysNumber = document.querySelector(`[data-days]`);
const hoursNumber = document.querySelector(`[data-hours]`);
const minutesNumber = document.querySelector(`[data-minutes]`);
const secondsNumber = document.querySelector(`[data-seconds]`);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {

        if (selectedDates[0] <= Date.now()) {
            Notiflix.Notify.failure("Please choose a date in the future");

            return;
        }

        btnStart.addEventListener(`click`, () => {
    timer.start();
});
  },
};

const fp = flatpickr(inputDate, options);


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function pad(value) {
    return String(value).padStart(2, '0')
};
class Timer {
    constructor() {
        this.isActive = false;
    }

    start() {
        this.intervalId = null;
        btnStart.disabled = true;
        inputDate.disabled = true;
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        this.intervalId = setInterval(() => {
            const deltaTime = fp.selectedDates[0] - Date.now();
            const { days, hours, minutes, seconds } = convertMs(deltaTime);

            if (deltaTime <= 1000) {
                clearInterval(this.intervalId);
            }

        daysNumber.textContent = `${pad(days)}`
        hoursNumber.textContent = `${pad(hours)}`
        minutesNumber.textContent = `${pad(minutes)}`
        secondsNumber.textContent = `${pad(seconds)}`

        }, 1000);
    }
};

const timer = new Timer();

