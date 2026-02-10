// Game State
const state = {
    size: 9,
    boxSize: 3, // sqrt of size
    board: [], // Current state of the board
    solution: [], // The full solved board
    initialBoard: [], // The starting state (to know which are fixed)
    selectedCell: null, // {row, col}
    timer: 0,
    timerInterval: null,
    isPlaying: false
};

// DOM Elements
const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-screen')
};
const boardEl = document.getElementById('sudoku-board');
const numpadEl = document.querySelector('.numpad');
const timerEl = document.querySelector('.timer');
const difficultyDisplay = document.querySelector('.difficulty-display');

// Event Listeners for Start Screen
document.querySelectorAll('.btn-size').forEach(btn => {
    btn.addEventListener('click', () => {
        const size = parseInt(btn.dataset.size);
        startGame(size);
    });
});

document.getElementById('btn-back').addEventListener('click', showStartScreen);
document.getElementById('btn-new-game').addEventListener('click', () => startGame(state.size));
document.getElementById('btn-check').addEventListener('click', checkSolution);
document.getElementById('btn-restart').addEventListener('click', () => {
    document.getElementById('victory-modal').classList.add('hidden');
    showStartScreen();
});

// Navigation Functions
function showStartScreen() {
    stopTimer();
    screens.game.classList.add('hidden');
    screens.game.classList.remove('active');

    screens.start.classList.remove('hidden');
    setTimeout(() => screens.start.classList.add('active'), 10);
    state.isPlaying = false;
}

function showGameScreen() {
    screens.start.classList.add('hidden');
    screens.start.classList.remove('active');

    screens.game.classList.remove('hidden');
    setTimeout(() => screens.game.classList.add('active'), 10);
}

// Game Logic
function startGame(size) {
    state.size = size;
    state.boxSize = Math.sqrt(size);
    state.isPlaying = true;
    difficultyDisplay.textContent = `${size}x${size} Grid`;

    showGameScreen();
    resetTimer();
    startTimer();

    generateBoard(size);
    renderBoard();
    renderNumpad();
}

function generateBoard(size) {
    // 1. Create empty board
    const board = Array(size).fill().map(() => Array(size).fill(0));

    // 2. Fill diagonal boxes (independent, so safe to fill randomly)
    fillDiagonalBoxes(board, size, state.boxSize);

    // 3. Solve the rest to create a full valid board
    solveSudoku(board, size, state.boxSize);

    // Save the solution
    state.solution = board.map(row => [...row]);

    // 4. Remove digits to create the puzzle
    // Difficulty: remove key counts. 4x4: remove ~8. 9x9: remove ~40.
    const attempts = size === 9 ? 45 : 8;
    removeDigits(board, size, attempts);

    // Save initial state
    state.initialBoard = board.map(row => [...row]);

    // Set current board state
    state.board = board.map(row => [...row]);
}

function fillDiagonalBoxes(board, size, boxSize) {
    for (let i = 0; i < size; i += boxSize) {
        fillBox(board, i, i, size, boxSize);
    }
}

function fillBox(board, row, col, size, boxSize) {
    let num;
    for (let i = 0; i < boxSize; i++) {
        for (let j = 0; j < boxSize; j++) {
            do {
                num = Math.floor(Math.random() * size) + 1;
            } while (!isSafeInBox(board, row, col, num, boxSize));
            board[row + i][col + j] = num;
        }
    }
}

function isSafeInBox(board, rowStart, colStart, num, boxSize) {
    for (let i = 0; i < boxSize; i++) {
        for (let j = 0; j < boxSize; j++) {
            if (board[rowStart + i][colStart + j] === num) {
                return false;
            }
        }
    }
    return true;
}

function solveSudoku(board, size, boxSize) {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= size; num++) {
                    if (isSafe(board, row, col, num, size, boxSize)) {
                        board[row][col] = num;
                        if (solveSudoku(board, size, boxSize)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isSafe(board, row, col, num, size, boxSize) {
    // Check row
    for (let x = 0; x < size; x++) {
        if (board[row][x] === num) return false;
    }

    // Check col
    for (let x = 0; x < size; x++) {
        if (board[x][col] === num) return false;
    }

    // Check box
    const startRow = row - (row % boxSize);
    const startCol = col - (col % boxSize);
    for (let i = 0; i < boxSize; i++) {
        for (let j = 0; j < boxSize; j++) {
            if (board[startRow + i][startCol + j] === num) return false;
        }
    }

    return true;
}

function removeDigits(board, size, attempts) {
    let count = attempts;
    while (count > 0) {
        let row = Math.floor(Math.random() * size);
        let col = Math.floor(Math.random() * size);
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            count--;
        }
    }
}

function renderBoard() {
    const size = state.size;
    boardEl.innerHTML = '';
    boardEl.className = `board grid-${size}`;

    // Set grid template columns
    boardEl.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    // Adjust gap for subgrids styling
    // This is a simplified approach; complex subgrid borders usually require more CSS or structure

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const cell = document.createElement('div');
            cell.className = `cell size-${size}`;
            cell.dataset.row = r;
            cell.dataset.col = c;

            // Add visual separation for boxes
            const boxSize = state.boxSize;
            if ((c + 1) % boxSize === 0 && c !== size - 1) {
                cell.style.marginRight = '2px';
            }
            if ((r + 1) % boxSize === 0 && r !== size - 1) {
                cell.style.marginBottom = '2px';
            }

            const value = state.board[r][c];
            if (value !== 0) {
                cell.textContent = value;
                if (state.initialBoard[r][c] !== 0) {
                    cell.classList.add('fixed');
                } else {
                    cell.classList.add('user-input');
                }
            }

            cell.addEventListener('click', () => selectCell(r, c));
            boardEl.appendChild(cell);
        }
    }
}

function renderNumpad() {
    numpadEl.innerHTML = '';
    const size = state.size;
    for (let i = 1; i <= size; i++) {
        const btn = document.createElement('button');
        btn.className = 'btn-num';
        btn.textContent = i;
        btn.addEventListener('click', () => inputNumber(i));
        numpadEl.appendChild(btn);
    }
}

function selectCell(row, col) {
    if (state.selectedCell) {
        // Remove previous selection styling
        const prev = getCellEl(state.selectedCell.row, state.selectedCell.col);
        if (prev) prev.classList.remove('selected');

        // Remove related highlighting
        document.querySelectorAll('.cell.related').forEach(el => el.classList.remove('related'));

        // Remove same-number highlighting
        document.querySelectorAll('.cell.highlight-same').forEach(el => el.classList.remove('highlight-same'));
    }

    state.selectedCell = { row, col };

    // Add new selection styling
    const cell = getCellEl(row, col);
    if (cell) cell.classList.add('selected');

    // Highlight related (row/col)
    highlightRelated(row, col);

    // Highlight same numbers
    const val = state.board[row][col];
    if (val !== 0) {
        highlightSameNumber(val);
    }
}

function highlightRelated(row, col) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const r = parseInt(cell.dataset.row);
        const c = parseInt(cell.dataset.col);
        if (r === row || c === col) {
            cell.classList.add('related');
        }
    });
}

function highlightSameNumber(num) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const val = parseInt(cell.textContent);
        if (val === num) {
            cell.classList.add('highlight-same'); // Need to add CSS for this
        }
    });
}

function getCellEl(row, col) {
    return document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
}

function inputNumber(num) {
    if (!state.selectedCell) return;
    const { row, col } = state.selectedCell;

    // Check if fixed
    if (state.initialBoard[row][col] !== 0) return;

    const cell = getCellEl(row, col);

    // Update state
    state.board[row][col] = num;

    // Update UI
    cell.textContent = num;
    cell.classList.add('user-input');
    cell.classList.remove('error'); // Clear previous error

    // Highlight same numbers again
    document.querySelectorAll('.cell.highlight-same').forEach(el => el.classList.remove('highlight-same'));
    highlightSameNumber(num);

    // Check valid immediately (optional, or wait for check button)
    // Here we just accept input
}

function checkSolution() {
    let isCorrect = true;
    let isComplete = true;

    const size = state.size;

    // Validate against solution
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const cell = getCellEl(r, c);
            const val = state.board[r][c];

            if (val === 0) {
                isComplete = false;
                continue;
            }

            if (val !== state.solution[r][c]) {
                isCorrect = false;
                cell.classList.add('error');
            } else {
                cell.classList.remove('error');
            }
        }
    }

    if (isComplete && isCorrect) {
        stopTimer();
        document.getElementById('final-time').textContent = timerEl.textContent;
        document.getElementById('victory-modal').classList.remove('hidden');
    } else if (!isCorrect) {
        // Optional: Shake animation or feedback
    }
}

// Timer
function startTimer() {
    stopTimer();
    state.timerInterval = setInterval(() => {
        state.timer++;
        const mins = Math.floor(state.timer / 60).toString().padStart(2, '0');
        const secs = (state.timer % 60).toString().padStart(2, '0');
        timerEl.textContent = `${mins}:${secs}`;
    }, 1000);
}

function stopTimer() {
    if (state.timerInterval) clearInterval(state.timerInterval);
}

function resetTimer() {
    state.timer = 0;
    timerEl.textContent = '00:00';
}
