let startTime = 0;
let elapsedTime = 0;

let timerInterval = null;

let running = false;

let lapNumber = 0;


/* Get HTML elements */

const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

const lapList = document.getElementById("lapList");


/* Format time */

function formatTime(time) {

    let milliseconds = time % 1000;

    let totalSeconds = Math.floor(time / 1000);

    let seconds = totalSeconds % 60;

    let totalMinutes = Math.floor(totalSeconds / 60);

    let minutes = totalMinutes % 60;

    let hours = Math.floor(totalMinutes / 60);


    milliseconds = String(milliseconds).padStart(3, "0");

    seconds = String(seconds).padStart(2, "0");

    minutes = String(minutes).padStart(2, "0");

    hours = String(hours).padStart(2, "0");


    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}


/* Update display */

function updateDisplay() {

    elapsedTime = Date.now() - startTime;

    display.textContent = formatTime(elapsedTime);
}


/* Start stopwatch */

startBtn.addEventListener("click", function () {

    if (!running) {

        startTime = Date.now() - elapsedTime;

        timerInterval = setInterval(updateDisplay, 10);

        running = true;
    }

});


/* Pause stopwatch */

pauseBtn.addEventListener("click", function () {

    if (running) {

        clearInterval(timerInterval);

        elapsedTime = Date.now() - startTime;

        running = false;
    }

});


/* Reset stopwatch */

resetBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    startTime = 0;

    elapsedTime = 0;

    running = false;

    lapNumber = 0;

    display.textContent = "00:00:00.000";

    lapList.innerHTML = "";

});


/* Lap button */

lapBtn.addEventListener("click", function () {

    if (!running) {
        return;
    }

    lapNumber++;

    const lap = document.createElement("li");

    lap.textContent =
        `Lap ${lapNumber} — ${formatTime(elapsedTime)}`;

    lapList.appendChild(lap);

});