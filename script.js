"use strict";
const daysHtmlEl = document.querySelector("#days");
const hoursHtmlEl = document.querySelector("#hours");
const minutesHtmlEl = document.querySelector("#minutes");
const secondsHtmlEl = document.querySelector("#seconds");

const targetDateInput = document.querySelector("#targetDate");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let timeLeft;
let remainingTime;
let intervalId;
let now;
let targetDate;

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
const displayTimeLeft = function () {
  daysHtmlEl.innerHTML = String(remainingTime.day).padStart(2, "0");
  hoursHtmlEl.innerHTML = String(remainingTime.hour).padStart(2, "0");
  minutesHtmlEl.innerHTML = String(remainingTime.minute).padStart(2, "0");
  secondsHtmlEl.innerHTML = String(remainingTime.second).padStart(2, "0");
};
const countDown = function (milliSec) {
  timeLeft -= 1000;
  // return timeLeft;

  remainingTime = getRemainingDate(timeLeft);

  displayTimeLeft();
};

startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  clearInterval(intervalId);
  targetDate = new Date(targetDateInput.value);
  now = new Date();

  timeLeft = calcRemainingTime(targetDate, now);
  remainingTime = getRemainingDate(timeLeft);
  intervalId = setInterval(countDown, 1000);

  // Display Remaining date
  displayTimeLeft();
});
