var colorButtons = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var playerSequence = [];

var level = 0;
var gameStarted = false;

$(document).keydown(function() {
  if (gameStarted == false) {
    gameSequence();
    $("h1").text("Level " + level);
    gameStarted = true;
  }
});

$(".btn").click(function() {

  var playerClickedButton = this.id;
  playerSequence.push(playerClickedButton);
  playSound(playerClickedButton);
  animatePress(this.id);

  checkAnswer(playerSequence.length - 1);

});

function checkAnswer(currentLevel) {
  if (playerSequence[currentLevel] === gamePattern[currentLevel]) {
    console.log("success!");
    if (playerSequence.length === gamePattern.length) {
      console.log("sequence is finished");
      setTimeout(function() {
        gameSequence();
      }, 1000);
    }
  } else {
    console.log("wrong!");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 1000);
    $("h1").text("Game Over! Press Any Key To Restart!");
    startOver();

  }
}

function gameSequence() {
  playerSequence = [];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomButton = colorButtons[randomNumber];
  gamePattern.push(randomButton);

  $("#" + randomButton).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomButton);
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}




function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(lastPressedColour) {
  $("#" + lastPressedColour).addClass("pressed");

  setTimeout(function() {
    $("#" + lastPressedColour).removeClass("pressed");
  }, 100);
}
