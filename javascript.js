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

    /*----pushes to savedExercise with the value/input of exercise && duration */
    savedExercise.push({
      exercise: exerciseValue,
      duration: durationValue,
      timestamp: new Date(),
      favorites: false,
    });

    localStorage.setItem("savedExercise", JSON.stringify(savedExercise));

    session.textContent = `${exerciseValue} - for ${durationValue} min(s) -  on ${new Date()} `;
    sessions.append(session);

    exerciseInput.value = "";
    durationInput.value = "";

    edi;
  }
});
