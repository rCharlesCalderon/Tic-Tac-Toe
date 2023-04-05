//WHERE IT HAPPENDS
const displayControl = (() => {
  const container = document.querySelector(".container");
  for (let i = 0; i < 9; i++) {
    const gridCell = document.createElement("div");
    gridCell.className = "grid-cell";
    container.appendChild(gridCell);
    const p = document.createElement("p");
    gridCell.appendChild(p);
    gridCell.addEventListener("click", (e) => {
      if (gridCell.textContent === "") {
        p.textContent = gameMaster.getPlayer().marker;
        gameBoard.pushIntoArray(
          gamePieceFactory(`box${i}`, gameMaster.getPlayer()),
          `${i}`
        );
        gameMaster.playRound();
        console.log(gameBoard.gameArray);
      }
    });
    //END OF CLICK EVENT
  }
  return { container };
})();

let playerFactory = (name, marker) => {
  return { name, marker };
};

const gameBoard = (() => {
  function pushIntoArray(gamePiece, value) {
    gameBoard.gameArray.splice(value, 1, gamePiece.player.marker);
  }
  let gameArray = ["", "", "", "", "", "", "", "", ""];

  return { gameArray, pushIntoArray };
})();

const gamePieceFactory = (id, player) => {
  return { id, player };
};

const gameMaster = (() => {
  const player1 = playerFactory("playerX", "X");
  const player2 = playerFactory("playerO", "O");

  let currentPlayer = player1;
  function switchPlayers() {
    if (gameMaster.getPlayer() === player1) {
      currentPlayer = player2;
    } else currentPlayer = player1;
    console.log("gameMaster", currentPlayer);
  }

  function getPlayer() {
    return currentPlayer;
  }

  function playRound() {
    if (
      (gameBoard.gameArray[0] === currentPlayer.marker &&
        gameBoard.gameArray[1] === currentPlayer.marker &&
        gameBoard.gameArray[2] === currentPlayer.marker) ||
      //
      (gameBoard.gameArray[3] === currentPlayer.marker &&
        gameBoard.gameArray[4] === currentPlayer.marker &&
        gameBoard.gameArray[5] === currentPlayer.marker) ||
      //
      (gameBoard.gameArray[6] === currentPlayer.marker &&
        gameBoard.gameArray[7] === currentPlayer.marker &&
        gameBoard.gameArray[8] === currentPlayer.marker) ||
      //
      (gameBoard.gameArray[0] === currentPlayer.marker &&
        gameBoard.gameArray[3] === currentPlayer.marker &&
        gameBoard.gameArray[6] === currentPlayer.marker) ||
      //
      (gameBoard.gameArray[1] === currentPlayer.marker &&
        gameBoard.gameArray[4] === currentPlayer.marker &&
        gameBoard.gameArray[7] === currentPlayer.marker) ||
      //
      (gameBoard.gameArray[2] === currentPlayer.marker &&
        gameBoard.gameArray[5] === currentPlayer.marker &&
        gameBoard.gameArray[8] === currentPlayer.marker) ||
      //
      (gameBoard.gameArray[0] === currentPlayer.marker &&
        gameBoard.gameArray[4] === currentPlayer.marker &&
        gameBoard.gameArray[8] === currentPlayer.marker)
    ) {
      resetPopUp(`${currentPlayer.name} WON`);
    } else if (
      gameBoard.gameArray[0] &&
      gameBoard.gameArray[1] &&
      gameBoard.gameArray[2] &&
      gameBoard.gameArray[3] &&
      gameBoard.gameArray[4] &&
      gameBoard.gameArray[5] &&
      gameBoard.gameArray[6] &&
      gameBoard.gameArray[7] &&
      gameBoard.gameArray[8]
    ) {
      resetPopUp("TIE");
    } else {
      switchPlayers();
    }
  }

  function resetPopUp(result) {
    displayControl.container.style.display = "none";

    let grabP = document.querySelectorAll("p");
    grabP.forEach((p) => {
      p.textContent = "";
    });

    let popUp = document.querySelector(".pop-up");
    let results = document.querySelector(".results");

    results.textContent = result;
    popUp.style.display = "flex";

    let restartButton = document.querySelector(".restart");
    restartButton.addEventListener("click", () => {
      gameBoard.gameArray = ["", "", "", "", "", "", "", "", ""];
      displayControl.container.style.display = "grid";
      results.textContent = "";
      popUp.style.display = "none";
    });
  }

  return { currentPlayer, switchPlayers, playRound, getPlayer };
})();
