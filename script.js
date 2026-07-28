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

let isPaused = false;

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
const countDown = function () {
  if (!isPaused) {
    timeLeft -= 1000;

    remainingTime = getRemainingDate(timeLeft);
    console.log(timeLeft);
    displayTimeLeft();
  }
  if (timeLeft <= 1000) {
    timeLeft = 0;
    console.log(timeLeft);
    clearInterval(intervalId);
    btnVisibility(true);
  }
};

const btnVisibility = function (bool) {
  //Enable buttons
  pauseBtn.disabled = bool;
  resetBtn.disabled = bool;
};

startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  isPaused = false;
  if (!targetDateInput.value) {
    return;
  }
  clearInterval(intervalId);
  targetDate = new Date(targetDateInput.value);
  now = new Date();

  timeLeft = calcRemainingTime(targetDate, now);
  remainingTime = getRemainingDate(timeLeft);
  intervalId = setInterval(countDown, 1000);

  // Display Remaining date
  displayTimeLeft();

  btnVisibility(false);
});

pauseBtn.addEventListener("click", function () {
  isPaused = true;
});
