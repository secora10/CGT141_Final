const MODES = {
    'pomodoro': 25,
    'short-break': 5,
    'long-break': 15
};

let currentMode = 'pomodoro';
let timeLeft = MODES[currentMode] * 60; // Time in seconds
let timerInterval = null;
let isRunning = false;
let sessionCount = 0;

const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-button');
const sessionCounter = document.getElementById('session-counter');
const messageBox = document.getElementById('message-box');

function updateTimeDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function showMessage(message) {
    messageBox.textContent = message;
    messageBox.style.display = 'block';
    // Hide the message after 3 seconds
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000);
}

// Function to switch between modes (Pomodoro, Short Break, Long Break)
function switchMode(newMode) {
    if (isRunning && !confirm('A timer is currently running. Are you sure you want to switch and reset it?')) {
        return; // Stop if the user cancels
    }

    // Stop any running timer
    clearInterval(timerInterval);
    isRunning = false;
    startButton.textContent = 'START';

    // Update the mode and time
    currentMode = newMode;
    timeLeft = MODES[currentMode] * 60;
    
    // Update the active button class
    document.querySelectorAll('.mode-button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(newMode).classList.add('active');

    updateTimeDisplay();
}

// Main timer logic
function startPauseTimer() {
    if (isRunning) {
        // PAUSE
        clearInterval(timerInterval);
        startButton.textContent = 'START';
        isRunning = false;
    } else {
        // START
        startButton.textContent = 'PAUSE';
        isRunning = true;
        
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimeDisplay();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                startButton.textContent = 'START';
                
                // Logic for when the timer finishes
                if (currentMode === 'pomodoro') {
                    sessionCount++;
                    sessionCounter.textContent = sessionCount;
                    showMessage('Pomodoro session finished! Time for a break.');
                    // Auto-switch to break mode (optional, you can prompt the user instead)
                    switchMode(sessionCount % 4 === 0 ? 'long-break' : 'short-break');
                } else {
                    showMessage('Break finished! Time to focus!');
                    // Auto-switch back to Pomodoro
                    switchMode('pomodoro');
                }
            }
        }, 1000);
    }
}

// Function to reset the timer to the current default time
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startButton.textContent = 'START';
    timeLeft = MODES[currentMode] * 60;
    updateTimeDisplay();
    showMessage('Timer has been reset.');
}


// Initialize the display when the script loads
document.addEventListener('DOMContentLoaded', updateTimeDisplay);