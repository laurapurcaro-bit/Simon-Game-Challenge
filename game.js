// Arrays
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
// listen to keyboard press
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function playSound(color) {
  // Create an audio element
  // let audioElement = document.createElement("audio");
  // audioElement.setAttribute("src", `sounds/${color}.mp3`);
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

// generate random number
function nextSequence() {
  // Increase level
  level++;
  $("h1").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);

  // select random color based on random number
  let randomChosenColour = buttonColours[randomNumber];

  // Append to array
  gamePattern.push(randomChosenColour);

  // Select the random ID
  // Animate a flash button
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  // Call function
  playSound(randomChosenColour);
}

$(".btn").click(function () {
  // Get ID of user chosen colour
  let userChosenColour = $(this).attr("id");
  // Append selected color to the array
  userClickedPattern.push(userChosenColour);
  // Call function
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  console.log(gamePattern);
  console.log(userClickedPattern);
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      // empty array to re-initialize the array
      userClickedPattern.splice(0, userClickedPattern.length);
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // Game over
    console.log("wrong");
    // play sound wrong
    playSound("wrong");
    // modify body colour to red
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    // Change title to Gamve over
    $("h1").text("Game Over, Press Any Key to Restart");
    // call function
    startOver();
  }
}

function startOver() {
  // re-initialize everything
  userClickedPattern.splice(0, userClickedPattern.length);
  gamePattern.splice(0, gamePattern.length);
  started = false;
  level = 0;
}
