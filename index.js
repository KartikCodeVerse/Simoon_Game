let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;



nextSequence = () => {
  userClickedPattern = [];
  level++;
  document.querySelector("h1").innerHTML = "Level " + level;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
};

$(".box").click(function () {
  let userChoosenColour = $(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  playSound(userChoosenColour);
  animatePress(userChoosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

playSound = (name) => {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

animatePress = (currentColour) => {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

$(document).keypress(function () {
  if (!started) {
    document.querySelector("h1").innerHTML = "Level " + level;
    nextSequence();
    started = true;
  }
});

checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Correct");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong")
    document.querySelector("h1").innerHTML =
      "Game Over, Press Any Key to Restart";
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
  console.log(userClickedPattern, gamePattern);
};

startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
