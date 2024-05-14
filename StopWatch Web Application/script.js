let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapNumber = 1;

function startPause() {
  const startPauseButton = document.getElementById("startPause");

  if (!isRunning) {
    startPauseButton.textContent = "Pause";
    startTime = new Date().getTime() - elapsedTime;
    updateDisplay();
    timerInterval = setInterval(updateDisplay, 10);
  } else {
    startPauseButton.textContent = "Resume";
    clearInterval(timerInterval);
  }

  isRunning = !isRunning;
}

function reset() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  lapNumber = 1;
  document.getElementById("startPause").textContent = "Start";
  updateDisplay();
  document.getElementById("lapList").innerHTML = "";
}

function lap() {
  if (isRunning) {
    const lapTime = new Date().getTime() - startTime;
    const formattedLapTime = formatTime(lapTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapNumber}: ${formattedLapTime}`;
    document.getElementById("lapList").appendChild(lapItem);
    lapNumber++;
  }
}

function updateDisplay() {
  const currentTime = isRunning
    ? new Date().getTime() - startTime
    : elapsedTime;

  document.getElementById("display").textContent = formatTime(currentTime);
}

function formatTime(time) {
  const date = new Date(time);
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const milliseconds = Math.floor(date.getUTCMilliseconds() / 10)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}:${milliseconds}`;
}
