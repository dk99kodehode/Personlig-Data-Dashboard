const submitExercise = document.getElementById("submit-exercise");
const exerciseInput = document.getElementById("exercise-input");
const sessions = document.getElementById("sessions");
const durationInput = document.getElementById("duration-input");

let savedExercise = JSON.parse(localStorage.getItem("savedExercise")) || [];

/*--------SHOUT OUT SANDER TODO LOCAL STORAGE LIST && Our Awesome Game -------- */
submitExercise.addEventListener("click", () => {
  const exerciseValue = exerciseInput.value.trim();
  const durationValue = durationInput.value.trim();

  /*----DIVEDE THE HOURS BY 60 AND CONVER THE LEFT OVER IN DURATION FROM DIVIDING IT BY 60 AND TURNING INTO MINTUES*/
  const hours = Math.floor(durationValue / 60);
  const mins = durationValue % 60;

  if (exerciseValue !== "" && durationValue !== "") {
    const session = document.createElement("div");
    session.classList.add("session");

    const exercise = document.createElement("input");
    exercise.classList.add("exercise");
    exercise.readOnly = true;
    exercise.value = exerciseValue;

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
    });

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
