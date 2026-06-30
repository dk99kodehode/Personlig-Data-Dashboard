const submitExercise = document.getElementById("submit-exercise");
const exerciseInput = document.getElementById("exercise-input");
const sessions = document.getElementById("sessions");
const durationInput = document.getElementById("duration-input");

let savedExercise = JSON.parse(localStorage.getItem("savedExercise")) || [];

/*--------SHOUT OUT SANDER TODO LOCAL STORAGE LIST && Our Awesome Game -------- */
submitExercise.addEventListener("click", () => {
  const exerciseValue = exerciseInput.value.trim();
  const durationValue = durationInput.value.trim();

  if (exerciseValue !== "" && durationValue !== "") {
    const session = document.createElement("div");
    session.classList.add("session");

    const exercise = document.createElement("input");
    exercise.value = exerciseValue;
    exercise.classList.add("exercise");
    exercise.readOnly = true;

    const duration = document.createElement("input");
    duration.value = `${durationValue} min(s)`;
    duration.classList.add("duration");
    duration.readOnly = true;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.id = "edit";

    const favoritesBtn = document.createElement("button");
    favoritesBtn.textContent = "Add to favorites";
    favoritesBtn.id = "favorites";

    /*----pushes to savedExercise with the value/input of exercise && duration */
    savedExercise.push({
      exercise: exerciseValue,
      duration: durationValue,
      timestamp: new Date(),
      favorites: false,
    });

    localStorage.setItem("savedExercise", JSON.stringify(savedExercise));

    sessions.append(session, exercise, duration, editBtn, favoritesBtn);

    exerciseInput.value = "";
    durationInput.value = "";
  }
});

/*session.textContent = `${exerciseValue} - for ${durationValue} min(s) -  on ${new Date()} `;*/
