('use strict');

const body = document.querySelector('body');
const p = document.createElement('p');
const container = document.querySelector('#container');
const btn1Yes = document.createElement('button');
const btn2No = document.createElement('button');
const btn3Draw = document.createElement('button');
const btn4Stay = document.createElement('button');

let currentPlayerScore = 0;
let currentComputerScore = 0;
let roundCount = 1;
let cardIndex, cardChoice;
let playerDone = false;
let computerDone = false;
let playing = true;
let cardList = [
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  10,
  10,
  10,
  'A',
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  10,
  10,
  10,
  'A',
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  10,
  10,
  10,
  'A',
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  10,
  10,
  10,
  'A',
];

const newLine = function (message) {
  const p = document.createElement('p');
  p.innerText = message;
  body.append(p);
};

const newBtnLineYesNo = function (
  message,
  btn1Text,
  btn1Class,
  btn2Text,
  btn2Class
) {
  const p = document.createElement('p');
  p.innerText = message;
  btn1Yes.innerText = btn1Text;
  btn1Yes.className = btn1Class;
  btn2No.innerText = btn2Text;
  btn2No.className = btn2Class;

  p.append(btn1Yes);
  p.append(btn2No);
  body.append(p);
};

const newBtnLineDrawStay = function (
  message,
  btn3Text,
  btn3Class,
  btn4Text,
  btn4Class
) {
  const p = document.createElement('p');
  p.innerText = message;
  btn3Draw.innerText = btn3Text;
  btn3Draw.className = btn3Class;
  btn4Stay.innerText = btn4Text;
  btn4Stay.className = btn4Class;

  p.append(btn3Draw);
  p.append(btn4Stay);
  body.append(p);
};
const deleteButtons = function () {
  btn1Yes.remove();
  btn2No.remove();
  btn3Draw.remove();
  btn4Stay.remove();
};

const endGame = function () {
  if (currentPlayerScore > 21) {
    newLine(
      `You went over 21! with a score of ${currentPlayerScore} You Lose! ಥ_ಥ`
    );
    playing = false;
    noGame();
  } else if (currentComputerScore > 21) {
    newLine(
      `You Win! (⌐■_■) Computer went over 21 with a score of ${currentComputerScore}.`
    );
    playing = false;
    noGame();
  } else if (computerDone === true && playerDone === true) {
    if (currentPlayerScore > currentComputerScore) {
      newLine(
        `You Win! (⌐■_■)  - Final player score of ${currentPlayerScore} BEATS computer score of ${currentComputerScore}.`
      );
      playing = false;
      noGame();
    } else if (currentPlayerScore < currentComputerScore) {
      newLine(
        `You Lose! ಥ_ಥ  - Final computerscore of ${currentComputerScore} BEATS player score of ${currentPlayerScore}.`
      );
      playing = false;
      noGame();
    } else if (currentPlayerScore === currentComputerScore) {
      newLine(
        `It's a draw! (ˉ﹃ˉ) - Player and computer both had score of ${currentComputerScore}.`
      );
      playing = false;
      noGame();
    }
  }
};
const drawCard = function () {
  cardIndex = Math.trunc(Math.random() * cardList.length);
  cardChoice = cardList.splice([cardIndex], 1);
  return cardChoice;
};
const computerTurn = function () {
  if (currentComputerScore >= 17) {
    computerDone = true;
    newLine(`Computer Holds at score of ${currentComputerScore}`);
    endGame();
  } else if (currentComputerScore > 21) {
    endGame();
  } else if (currentComputerScore < 17) {
    cardChoice = drawCard();

    if (cardChoice == 'A') {
      if (currentComputerScore > 12) {
        cardChoice = Number(10);
      } else {
        cardChoice = Number(1);
      }
    }
    currentComputerScore += Number(cardChoice);
    newLine(
      `Computer drew a ${cardChoice}. Computers new total score is ${currentComputerScore}`
    );
    if (currentComputerScore > 21) {
      endGame();
    } else playerGameLoop();
  }
};
const playerDrawAction = function () {
  deleteButtons();
  cardChoice = drawCard();
  if (cardChoice == 'A') {
    if (currentPlayerScore > 12) {
      cardChoice = Number(10);
    } else cardChoice = Number(1);
  }
  currentPlayerScore += Number(cardChoice);
  newLine(
    `You drew a ${cardChoice}. Your new total score is ${currentPlayerScore}`
  );
  if (currentPlayerScore > 21 || currentPlayerScore === 0) {
    endGame();
  } else {
    computerTurn();
  }
};

const playerStayAction = function () {
  playerDone = true;
  deleteButtons();
  endGame();
  computerTurn();
};

const playerGameLoop = function () {
  setTimeout(function () {
    newLine(
      `
          ----- Round #${roundCount}  -  Current Score - Player: ${currentPlayerScore} | Computer:${currentComputerScore} -----`
    );
    roundCount++;
    newBtnLineDrawStay(
      `Your current score is ${currentPlayerScore}`,
      '( Draw /',
      'btnDraw',
      ' Stay )',
      'btnStay'
    );
  }, 300);
  btn3Draw.addEventListener('click', playerDrawAction);
  btn4Stay.addEventListener('click', playerStayAction);
};

const removeAllChildNodes = function (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const yesGame = function () {
  deleteButtons();
  removeAllChildNodes(container);

  setTimeout(function () {
    newLine(`Rules: Draw cards against the computer. Whoever gets closer to 21 without going over wins!
      Hint: Computer will stay if it reaches 17 or better. 
      Also: Aces count as 10 if current score is less than 12, otherwise Aces count as 1.`);
    playing = true;
    currentPlayerScore = 0;
    currentComputerScore = 0;
    roundCount = 1;
    playerGameLoop();
  }, 300);
};

const noGame = function () {
  setTimeout(function () {
    newBtnLineYesNo(
      "I'm going to ask again, Do you want to play game of BlackJack?",
      '( Yes /',
      'btnYes',
      ' No )',
      'btnNo'
    );
  }, 300);
  btn1Yes.addEventListener('click', yesGame);
  btn2No.addEventListener('click', noGame);
};

const init = function () {
  newBtnLineYesNo(
    'Would you like to play a game of BlackJack?',
    '( Yes /',
    'btnYes',
    ' No )',
    'btnNo'
  );
  btn1Yes.addEventListener('click', yesGame);
  btn2No.addEventListener('click', noGame);
};

init();
