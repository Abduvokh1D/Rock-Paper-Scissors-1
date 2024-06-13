let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();
// if (!score) {
//   score = {
//     wins: 0,
//     losses: 0,
//     ties: 0,
//   };
// }
// Reset Score button
function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}
const resetButtonElem = document.querySelector(".js-reset-score-button");
resetButtonElem.addEventListener("click", () => {
  // Displaying Message
  const parElem = document.querySelector(".js-displaying-message");

  parElem.innerHTML = `Are you sure you want to reset the score? <button class="js-button-yes message-button">Yes</button> <button class="js-button-no message-button">No</button>`;
  document.querySelector(".js-button-yes").addEventListener("click", () => {
    resetScore();
    parElem.innerHTML = "";
  });
  document.querySelector(".js-button-no").addEventListener("click", () => {
    parElem.innerHTML = "";
  });

  ////
});

//Auto play button

const autoPlayButton = document.querySelector(".js-auto-play-button");
autoPlayButton.addEventListener("click", () => {
  autoPlay();
  autoPlayButton.innerHTML = "Stop Playing";

  autoPlayButton.addEventListener("click", () => {
    if (autoPlayButton.innerHTML === "Stop Playing") {
      autoPlayButton.innerHTML = "Auto Play";
    } else {
      autoPlayButton.innerHTML = "Stop Playing";
    }
  });
});

// Keypress

document.body.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    autoPlay();

    autoPlayButton.innerHTML = "Stop Playing";
  } else if (event.key === "s") {
    if (autoPlayButton.innerHTML === "Stop Playing") {
      autoPlayButton.innerHTML = "Auto Play";
    } else {
      autoPlayButton.innerHTML = "Stop Playing";
    }
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
});

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("Rock");
});
document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("Paper");
});
document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("Scissors");
});
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("Rock");
  } else if (event.key === "p") {
    playGame("Paper");
  } else if (event.key === "s") {
    playGame("Scissors");
  } else if (event.key === "m") {
    resetScore();
  }
});
function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";
  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You loose";
    } else if (computerMove === "Paper") {
      result = "You Win";
    } else if (computerMove === "Scissors") {
      result = "Tie";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You Win";
    } else if (computerMove === "Paper") {
      result = "Tie";
    } else if (computerMove === "Scissors") {
      result = "You loose";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie";
    } else if (computerMove === "Paper") {
      result = "You loose";
    } else if (computerMove === "Scissors") {
      result = "You Win";
    }
  }
  if (result === "You Win") {
    score.wins = score.wins += 1;
  } else if (result === "You loose") {
    score.losses = score.losses += 1;
  } else if (result === "Tie") {
    score.ties = score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateScoreElement();
  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(
    ".js-moves"
  ).innerHTML = ` You <img src="images/${playerMove}-emoji.png" class="move-icon" />
<img src="images/${computerMove}-emoji.png" class="move-icon" />Computer`;
}

function updateScoreElement() {
  document.querySelector(".js-score").innerHTML = `
Wins: ${score.wins}, Losses ${score.losses}, Ties: ${score.ties}
    `;
}

function pickComputerMove() {
  let computerMove = "";
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissors";
  }
  return computerMove;
}
// Resetting Yes/No buttons
