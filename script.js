"use strict";
const daysHtmlEl = document.querySelector("#days");
const hoursHtmlEl = document.querySelector("#hours");
const minutesHtmlEl = document.querySelector("#minutes");
const secondsHtmlEl = document.querySelector("#seconds");

const targetDateInput = document.querySelector("#targetDate");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

const now = new Date();

const calcRemainingTime = function (target, now) {
  return target.getTime() - now.getTime();
};
const getRemainingDate = function (milliSec) {
  return {
    day: Math.floor(milliSec / (1000 * 60 * 60 * 24)),
    hour: Math.floor((milliSec / (1000 * 60 * 60)) % 24),
    minute: Math.floor((milliSec / (1000 * 60)) % 60),
    second: Math.floor((milliSec / 1000) % 60),
  };
};

startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const targetDate = new Date(targetDateInput.value);
  const timeLeft = calcRemainingTime(targetDate, now);
  const remainingTime = getRemainingDate(timeLeft);

  // Display Remaining date
  daysHtmlEl.innerHTML = String(remainingTime.day).padStart(2, "0");
  hoursHtmlEl.innerHTML = String(remainingTime.hour).padStart(2, "0");
  minutesHtmlEl.innerHTML = String(remainingTime.minute).padStart(2, "0");
  secondsHtmlEl.innerHTML = String(remainingTime.second).padStart(2, "0");
});
