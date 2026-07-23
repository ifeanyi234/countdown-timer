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

startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const targetDate = new Date(targetDateInput.value);
  const timeLeft = targetDate.getTime() - now.getTime();
  console.log(timeLeft);
});
