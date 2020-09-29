let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('button');
const form = document.querySelector('#custom');

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayEndTime(then);
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const displayTime = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  timerDisplay.textContent = displayTime;
  document.title = `Time left - ${displayTime}`;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const AMPM = hour > 12 ? 'pm' : 'am';
  const minutes = end.getMinutes();

  endTime.textContent = `End time: ${adjustedHour}:${
    minutes < 10 ? '0' : ''
  }${minutes} ${AMPM}`;
}

function toggleTimer() {
  timer(this.dataset.time);
}

function formCustomTimer(e) {
  e.preventDefault();
  const seconds = e.target.minutes.value * 60;
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener('click', toggleTimer));
form.addEventListener('submit', formCustomTimer);
