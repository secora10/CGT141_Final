const HABITS = [
  "Drink 8 cups of water",
  "Exercise for 20 minutes",
  "Make your bed",
  "Eat a healthy meal",
  "Meditate for 5 minutes",
  "Go outside for fresh air",
  "Journal for 5 minutes"
];

const habitList = document.getElementById("habitList");
const progressBar = document.getElementById("progressBar");
const saveBtn = document.getElementById("saveHabitsBtn");
const resetBtn = document.getElementById("resetBtn");

let dailyHabits = [];

document.addEventListener("DOMContentLoaded", init);

function init(){
  setupDropdowns();
  attachButtons();
}

function setupDropdowns(){
  for(let i = 1; i <= 3; i++){
    const dropdown = document.getElementById(`habitDropdown${i}`);
    const customInput = document.getElementById(`custom${i}`);

    dropdown.innerHTML = `
      <option value="">-- Select a Habit --</option>
      <option value="custom">Custom Habit</option>
    `;

    HABITS.forEach(habit => {
      const option = document.createElement("option");
      option.value = habit;
      option.textContent = habit;
      dropdown.appendChild(option);
    });

    dropdown.addEventListener("change", () => {
      customInput.style.display =
        dropdown.value === "custom" ? "block" : "none";
    });
  }
}

function attachButtons(){
  saveBtn.addEventListener("click", saveHabits);
  resetBtn.addEventListener("click", resetAll);
}

function saveHabits(){
  habitList.innerHTML = "";
  dailyHabits = [];

  for(let i = 1; i <= 3; i++){
    const dropdown = document.getElementById(`habitDropdown${i}`);
    const customInput = document.getElementById(`custom${i}`);

    let habit = dropdown.value;

    if(habit === "custom"){
      habit = customInput.value.trim();
    }

    if(habit){
      dailyHabits.push({ name: habit, completed: false });
    }
  }

  renderHabits();
  updateProgress();
}

function renderHabits(){
  habitList.innerHTML = "";

  dailyHabits.forEach((habit, index) => {
    const item = document.createElement("div");
    item.className = "habit-item";
    item.textContent = habit.name;

    item.addEventListener("click", () => {
      habit.completed = !habit.completed;
      item.classList.toggle("completed");
      updateProgress();
    });

    habitList.appendChild(item);
  });
}

function updateProgress(){
  const completed = dailyHabits.filter(h => h.completed).length;
  progressBar.textContent = `Progress: ${completed} / ${dailyHabits.length} habits completed`;
}

function resetAll(){
  dailyHabits = [];
  habitList.innerHTML = "";
  updateProgress();

  for(let i = 1; i <= 3; i++){
    document.getElementById(`habitDropdown${i}`).value = "";
    document.getElementById(`custom${i}`).value = "";
    document.getElementById(`custom${i}`).style.display = "none";
  }
}
