"use strict";
const daysHtmlEl = document.querySelector("#days");
const hoursHtmlEl = document.querySelector("#hours");
const minutesHtmlEl = document.querySelector("#minutes");
const secondsHtmlEl = document.querySelector("#seconds");

const targetDateInput = document.querySelector("#targetDate");
const finishedMsg = document.querySelector("#finishedMsg");
const error = document.querySelector("#error");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let timeLeft;
let remainingTime;
let intervalId;

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
    clearInterval(intervalId);
    btnVisibility(true);
    finishedMsg.classList.remove("hidden");
  } else {
    finishedMsg.classList.add("hidden");
  }
};

const btnVisibility = function (bool) {
  //Enable buttons
  pauseBtn.disabled = bool;
  resetBtn.disabled = bool;
};

startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const targetDate = new Date(targetDateInput.value);
  const now = new Date();

  timeLeft = calcRemainingTime(targetDate, now);
  if (!targetDateInput.value) {
    return;
  } else if (timeLeft <= 0) {
    error.classList.remove("hidden");
    error.textContent = "The selected date/time has passed!";
    return;
  } else {
    error.classList.add("hidden");
  }
  clearInterval(intervalId);
  isPaused = false;

  remainingTime = getRemainingDate(timeLeft);
  intervalId = setInterval(countDown, 1000);

  // Display Remaining date
  displayTimeLeft();

  btnVisibility(false);
});

pauseBtn.addEventListener("click", function () {
  isPaused = true;
});

resetBtn.addEventListener("click", function () {
  timeLeft = 0;
  remainingTime = getRemainingDate(timeLeft);

  clearInterval(intervalId);

  targetDateInput.value = "";
  finishedMsg.classList.add("hidden");
  btnVisibility(true);
  displayTimeLeft();
});
