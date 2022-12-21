const initApp = () => {
  const cellElements = document.querySelectorAll(".cell");
  const currentPlayerDisplay = document.querySelector(".turns");
  const boardElement = document.querySelector(".board");
  const winningMessageElem = document.querySelector(".winningMessage");
  const restartButton = document.querySelector(".restartButton");

  const X_CLASS = "x";
  const O_CLASS = "circle";
  let oTurn;
  let gameOver = false;
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  boardElement.classList.add(X_CLASS);
  cellElements.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      if (cell.classList.contains(O_CLASS) || cell.classList.contains(X_CLASS))
        return;
      if (winningMessageElem.innerText) return;
      boardElement.classList.remove(X_CLASS);
      const cellSelect = e.target;

      let currentPlayer = oTurn ? O_CLASS : X_CLASS;

      cellSelect.classList.add(currentPlayer);

      if (checkForWinner(currentPlayer)) {
        if (currentPlayer === "circle") {
          winningMessageElem.innerText = "O Wins!";
        } else {
          winningMessageElem.innerText = "X Wins!";
        }
      } else if (isATie()) {
        winningMessageElem.innerText = "Tie Game";
      } else {
        turnsDisplay(oTurn);
        changePlayer();
        setHover();
      }
    });
  });

  const turnsDisplay = (turn) => {
    if (turn) {
      currentPlayerDisplay.innerHTML = `<span class="xPlays">X's</span> Turn`;
    } else {
      currentPlayerDisplay.innerHTML = `<span class="oPlays">O's</span> Turn`;
    }
  };
  const changePlayer = () => {
    oTurn = !oTurn;
  };
  const setHover = () => {
    if (currentPlayerDisplay.innerText === "X's Turn") {
      boardElement.classList.add(X_CLASS);
      boardElement.classList.remove(O_CLASS);
    } else {
      boardElement.classList.add(O_CLASS);
      boardElement.classList.remove(X_CLASS);
    }
  };

  const checkForWinner = (currentPlayer) => {
    return winningCombinations.some((combination) => {
      return combination.every((index) => {
        return cellElements[index].classList.contains(currentPlayer);
      });
    });
  };

  const isATie = () => {
    return [...cellElements].every((index) => {
      return (
        index.classList.contains(X_CLASS) || index.classList.contains(O_CLASS)
      );
    });
  };

  restartButton.addEventListener("click", () => {
    cellElements.forEach((cell) => {
      cell.classList.remove(X_CLASS);
      cell.classList.remove(O_CLASS);
    });
    oTurn = false ? X_CLASS : O_CLASS;
    turnsDisplay(oTurn);
    changePlayer();
    setHover();
    winningMessageElem.innerText = "";
  });
};

document.addEventListener("DOMContentLoaded", initApp);
