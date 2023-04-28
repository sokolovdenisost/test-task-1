const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const getTime = (seconds) => {
  const hh = String(Math.floor(seconds / 60 / 60)).padStart(2, '0');
  const mm = String(Math.floor(seconds / 60) - (hh * 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return `${hh}:${mm}:${ss}`
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let interval;
  return (seconds) => {
    if (interval) {
      clearInterval(interval);
    }

    timerEl.innerText = getTime(seconds);

    let isStop = false;
    interval = setInterval(() => {
      if (seconds === 0) {
        isStop = true;
        return;
      }

      if (isStop) {
        clearInterval(interval)
        return;
      }

      seconds -= 1;
      timerEl.innerText = getTime(seconds);
    }, 1000)
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.replace(/[^0-9]/g,"");
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
