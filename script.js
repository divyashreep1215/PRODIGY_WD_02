const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("lapsList");
const stopwatch = document.querySelector(".stopwatch");

let startTime = 0;
let elapsedTime = 0;
let interval;
let running = false;
let lapCounter = 0;
let lastLapTime = 0;

function formatTime(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = time % 1000;

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + ":" +
        String(milliseconds).padStart(3, "0")
    );
}

function update() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener("click", () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(update, 10);
        running = true;

        stopwatch.classList.add("running");

        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
});

pauseBtn.addEventListener("click", () => {
    clearInterval(interval);
    running = false;
    stopwatch.classList.remove("running");

    startBtn.disabled = false;
    pauseBtn.disabled = true;
});

resetBtn.addEventListener("click", () => {
    clearInterval(interval);
    running = false;
    stopwatch.classList.remove("running");

    elapsedTime = 0;
    lapCounter = 0;
    lastLapTime = 0;

    display.textContent = "00:00:00:000";
    lapsList.innerHTML = "";

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
});

lapBtn.addEventListener("click", () => {
    if (running) {
        lapCounter++;

        const lapTime = elapsedTime;
        const diff = lapTime - lastLapTime;
        lastLapTime = lapTime;

        const li = document.createElement("li");
        li.innerHTML = `
            <span>Lap ${lapCounter}</span>
            <span>${formatTime(lapTime)}</span>
            <span style="color:#ff4d4d;">+${formatTime(diff)}</span>
        `;
        lapsList.prepend(li);
    }
});
