const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusElement = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
};

const handleCellPlayed = (clickedCell, clickedCellIndex) => {
    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
};

const handleResultValidation = () => {
    let roundWon = false;
    let winningLine = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = boardState[winCondition[0]];
        let b = boardState[winCondition[1]];
        let c = boardState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winningLine = winCondition;
            break;
        }
    }

    if (roundWon) {
        statusElement.innerHTML = `Player <span class="winner-text">${currentPlayer}</span> Wins!`;
        const winnerColor = currentPlayer === 'X' ? 'var(--x-color)' : 'var(--o-color)';
        statusElement.querySelector('.winner-text').style.color = winnerColor;

        highlightWinningCells(winningLine);
        gameActive = false;
        return;
    }

    let roundDraw = !boardState.includes("");
    if (roundDraw) {
        statusElement.innerText = "Game ended in a Draw!";
        gameActive = false;
        return;
    }

    handlePlayerChange();
};

const highlightWinningCells = (winningLine) => {
    winningLine.forEach(index => {
        cells[index].classList.add('win-highlight');
    });
};

const handlePlayerChange = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.innerHTML = `Player <span class="turn-indicator">${currentPlayer}</span>'s Turn`;

    // Update turn indicator color dynamically
    const turnSpan = statusElement.querySelector('.turn-indicator');
    turnSpan.style.color = currentPlayer === 'X' ? 'var(--x-color)' : 'var(--o-color)';
};

const handleRestartGame = () => {
    gameActive = true;
    currentPlayer = "X";
    boardState = ['', '', '', '', '', '', '', '', ''];
    statusElement.innerHTML = `Player <span class="turn-indicator">X</span>'s Turn`;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o', 'win-highlight');
    });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', handleRestartGame);
