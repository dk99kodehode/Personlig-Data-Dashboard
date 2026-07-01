const submitExercise = document.getElementById("submit-exercise");
const exerciseInput = document.getElementById("exercise-input");
const sessions = document.getElementById("sessions");
const durationInput = document.getElementById("duration-input");

const showFavorites = document.getElementById("show-favorites");

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

    /*----------TAGS------*/
    const tags = document.createElement("p");
    tags.textContent = "tags";
    tags.classList.add("tags");

    if (exerciseValue === "Running") {
      tags.textContent = "Cardio";
    } else if (exerciseValue === "Lifting") {
      tags.textContent = "Strength ";
    } else if (exerciseValue === "Cycling") {
      tags.textContent = "Cardio / Endurance ";
    } else if (exerciseValue === "Mountain-Hiking") {
      tags.textContent = "Endurance / stability";
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
          item.exercise === exerciseValue && item.duration === durationValue,
      );

      if (index !== -1) {
        savedExercise.splice(index, 1);
        localStorage.setItem("savedExercise", JSON.stringify(savedExercise));
      }

      session.remove();
    });

    /*----pushes to savedExercise with the value/input of exercise && duration */
    savedExercise.push({
      exercise: exerciseValue,
      duration: durationValue,
      timestamp: new Date(),
      favorites: false,
    });

    localStorage.setItem("savedExercise", JSON.stringify(savedExercise));

    session.append(exercise, duration, editBtn, favoritesBtn, deleteBtn, tags);
    sessions.appendChild(session);

    exerciseInput.value = "";
    durationInput.value = "";
  }
});
