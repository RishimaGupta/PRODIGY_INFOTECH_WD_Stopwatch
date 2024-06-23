// script.js
let startTime, updatedTime, difference, tInterval;
let running = false;
const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
        resetButton.disabled = false;
        lapButton.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00:00:00.0';
    laps.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
}

function lap() {
    const lapTime = display.innerHTML;
    const lapElement = document.createElement('li');
    lapElement.innerText = lapTime;
    laps.appendChild(lapElement);
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const time = new Date(difference);
    const minutes = ('0' + time.getUTCMinutes()).slice(-2);
    const seconds = ('0' + time.getUTCSeconds()).slice(-2);
    const milliseconds = ('0' + Math.floor(time.getUTCMilliseconds() / 100)).slice(-1);
    display.innerHTML = `${minutes}:${seconds}.${milliseconds}`;
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

// Initial state
pauseButton.disabled = true;
resetButton.disabled = true;
lapButton.disabled = true;
