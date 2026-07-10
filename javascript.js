// input html elementer
const saveExercise = document.getElementById("save-exercise");
const exerciseInput = document.getElementById("exercise-input");
const sessions = document.getElementById("sessions");
const durationInput = document.getElementById("duration-input");

const showFavorites = document.getElementById("show-favorites");

// progress bar html elementer
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");
const target = document.getElementById("target");

let savedExercise = JSON.parse(localStorage.getItem("savedExercise")) || [];

saveExercise.addEventListener("click", () => {
  const exerciseValue = exerciseInput.value.trim();
  const durationValue = durationInput.value.trim();

  // deler på 60 og gjør om til timer og minutter
  const hours = Math.floor(durationValue / 60);
  const mins = durationValue % 60;

  // visst exercise value og duration value ikke er tom
  if (exerciseValue !== "" && durationValue !== "") {
    const session = document.createElement("div");
    session.classList.add("session");

    const exercise = document.createElement("input");
    exercise.classList.add("exercise");
    exercise.readOnly = true;
    exercise.value = exerciseValue;

    // tags
    const tags = document.createElement("p");
    tags.textContent = "tags";
    tags.classList.add("tags");

    // bytter tags content ut i fra exercise value
    if (exerciseValue === "Running") {
      tags.textContent = "Cardio";
    } else if (exerciseValue === "Lifting") {
      tags.textContent = "Strength ";
    } else if (exerciseValue === "Cycling") {
      tags.textContent = "Endurance ";
    } else if (exerciseValue === "Mountain-Hiking") {
      tags.textContent = "Endurance";
    }

    const duration = document.createElement("input");
    duration.value = `${hours}h ${mins}m`;
    duration.classList.add("duration");
    duration.readOnly = true;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.id = "edit";
    editBtn.addEventListener("click", () => {
      if (editBtn.textContent === "Edit") {
        exercise.readOnly = false;
        duration.readOnly = false;

        editBtn.textContent = "Save";
      } else {
        exercise.readOnly = true;
        duration.readOnly = true;

        editBtn.textContent = "Edit";
      }

      updateProgress();
    });

    const favoritesBtn = document.createElement("button");
    favoritesBtn.textContent = "Add to favorites";
    favoritesBtn.id = "favorites";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.id = "delete";

    deleteBtn.addEventListener("click", () => {
      const index = savedExercise.findIndex(
        (item) =>
          item.exercise === exerciseValue &&
          item.duration === Number(durationValue),
      );

      // Visst index ikke er -1, remove fra savedExercise
      if (index !== -1) {
        savedExercise.splice(index, 1);
        localStorage.setItem("savedExercise", JSON.stringify(savedExercise));
      }

      updateProgress();
      session.remove();
    });

    // pushes to savedExercise with the value/input of exercise && duration
    savedExercise.push({
      exercise: exerciseValue,
      duration: Number(durationValue),
      timestamp: new Date(),
      favorites: false,
    });

    localStorage.setItem("savedExercise", JSON.stringify(savedExercise));

    updateProgress();

    session.append(exercise, duration, editBtn, favoritesBtn, deleteBtn, tags);
    sessions.appendChild(session);

    // fjerner input value etter save
    exerciseInput.value = "";
    durationInput.value = "";
  }
});

// oppdaterer progressbaren vidje ut i fra prostenten !!!MÅÅÅÅÅ!!! calles etter endringer i saveExercise delte, edit / save
function updateProgress() {
  const goalMinutes = 600;
  target.textContent = `${goalMinutes}`;

  const totalMinutes = savedExercise.reduce((total, session) => {
    return total + Number(session.duration);
  }, 0);

  const percent = Math.min((totalMinutes / goalMinutes) * 100, 100);

  console.log(savedExercise);
  console.log(totalMinutes);
  console.log(percent);

  progressBar.style.width = `${percent}%`;
}
