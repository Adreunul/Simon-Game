$("body").keydown(function () {
  $(".square").removeClass("deadsquare");
  $(".guiding-text").fadeOut();
  setTimeout(function () {
    $(".guiding-text").text("Remember the Sequence");
  }, 500);
  setTimeout(function () {
    $(".guiding-text").fadeIn();
  }, 200);
  toggleMenuControls(false);
  setTimeout(() => startGame(), 1000);
});

$("body").click(function () {
  $(".square").removeClass("deadsquare");
  $(".guiding-text").fadeOut();
  setTimeout(function () {
    $(".guiding-text").text("Remember the Sequence");
  }, 500);
  setTimeout(function () {
    $(".guiding-text").fadeIn();
  }, 200);
  toggleMenuControls(false);
  setTimeout(() => startGame(), 1000);
});

$(".square").addClass("deadsquare");

var awaitedSequence = [];
var points = 0;
var bestScore = 0;
var turn = 0;
var difficulty = 2;
var speedOfDrum = 1000;

function startGame() {
  updateText();
  //toggleMenuControls(false);
  awaitedSequence = [];
  turn = 0;

  if ((points % 5 == 0 && points >= 10) || points == 5) {
    difficulty++;
  }

  if ((points % 8 == 0 && points >= 8) && speedOfDrum > 400 || points == 8) {
    speedOfDrum -=150;
  }

  if(points == 30){
    $(".square").addClass("deadsquare");
  }

  getNewSequence();
}

function getNewSequence() {
  for (var i = 0; i < difficulty; i++) {
    var pick = Math.random() * 4 + 1;
    pick = Math.floor(pick);

    switch (pick) {
      case 1:
        setTimeout(() => enlightSquare("red"), speedOfDrum * i);
        awaitedSequence.push("red");
        if (i == difficulty - 1) {
          setTimeout(() => togglePlayerControls(true), 1000);
        }
        break;
      case 2:
        setTimeout(() => enlightSquare("blue"), speedOfDrum * i);
        awaitedSequence.push("blue");
        if (i == difficulty - 1) {
          setTimeout(() => togglePlayerControls(true), 1000);
        }
        break;
      case 3:
        setTimeout(() => enlightSquare("green"), speedOfDrum * i);
        awaitedSequence.push("green");
        if (i == difficulty - 1) {
          setTimeout(() => togglePlayerControls(true), 1000);
        }
        break;
      case 4:
        setTimeout(() => enlightSquare("orange"), speedOfDrum * i);
        awaitedSequence.push("orange");
        if (i == difficulty - 1) {
          setTimeout(() => togglePlayerControls(true), 1000);
        }
        break;
    }
  }
}

function enlightSquare(square) {
  $("." + square).addClass("lit");

  var audio;
  switch (square) {
    case "red":
      audio = new Audio("sounds/red.mp3");
      audio.play();
      break;
    case "blue":
      audio = new Audio("./sounds/blue.mp3");
      audio.play();
      break;
    case "green":
      audio = new Audio("./sounds/green.mp3");
      audio.play();
      break;
    case "orange":
      audio = new Audio("./sounds/orange.mp3");
      audio.play();
      break;
  }

  setTimeout(function () {
    $("." + square).removeClass("lit");
  }, 300);
}

function squareToEnlight(event) {
  if ($(event.target).hasClass("red")) {
    enlightSquare("red");
    return;
  }
  if ($(event.target).hasClass("blue")) {
    enlightSquare("blue");
    return;
  }
  if ($(event.target).hasClass("green")) {
    enlightSquare("green");
    return;
  }
  if ($(event.target).hasClass("orange")) {
    enlightSquare("orange");
    return;
  }
}

function playerPicked(choice, event) {
  squareToEnlight(event);
  if (choice == true) {
    turn++;
  }

  if (choice == false) {
    turn = 0;
    points = 0;
    difficulty = 2;

    togglePlayerControls(false);
    setTimeout(() => toggleMenuControls(true), 1000);

    $(".square").addClass("deadsquare");
  }

  if (turn == awaitedSequence.length) {
    togglePlayerControls(false);

    points++;
    if (points > bestScore) bestScore = points;

    setTimeout(() => startGame(), 1000);
  }
}

function togglePlayerControls(turnTO) {
  if (turnTO) {
    $(".square").click(function (event) {
      var choice = $(event.target).hasClass(awaitedSequence[turn]);
      playerPicked(choice, event);
    });
  } else {
    $(".square").off("click");
  }
}

function toggleMenuControls(turn) {
  if (!turn) {
    $("body").off("click");
    $("body").off("keydown");
  } else {
    $(".guiding-text").text("Press a Key to Start");

    $("body").keydown(function () {
      $(".square").removeClass("deadsquare");
      $(".guiding-text").fadeOut();
      setTimeout(function () {
        $(".guiding-text").text("Remember the Sequence");
      }, 500);
      setTimeout(function () {
        $(".guiding-text").fadeIn();
      }, 200);
      toggleMenuControls(false);
      setTimeout(() => startGame(), 1000);
    });
    $("body").click(function () {
      $(".square").removeClass("deadsquare");
      $(".guiding-text").fadeOut();
      setTimeout(function () {
        $(".guiding-text").text("Remember the Sequence");
      }, 500);
      setTimeout(function () {
        $(".guiding-text").fadeIn();
      }, 200);
      toggleMenuControls(false);
      setTimeout(() => startGame(), 1000);
    });
  }
}

function updateText() {
  $(".scoreboard").text("" + points);
  $(".player-best-score").text("" + bestScore);
}
