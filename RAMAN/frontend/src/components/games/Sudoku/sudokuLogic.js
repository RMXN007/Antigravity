// Helper to generate a basic valid Sudoku board (simplified for portfolio)
export const getSudokuBoard = (difficulty = 'easy') => {
    // A complete valid Sudoku board
    const solution = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];

    // Number of cells to remove based on difficulty
    let cellsToRemove = 30; // easy
    if (difficulty === 'medium') cellsToRemove = 45;
    if (difficulty === 'hard') cellsToRemove = 60;

    // Clone solution
    const puzzle = solution.map(row => [...row]);

    // Remove cells randomly to construct puzzle
    let removed = 0;
    while (removed < cellsToRemove) {
        const r = Math.floor(Math.random() * 9);
        const c = Math.floor(Math.random() * 9);
        if (puzzle[r][c] !== 0) {
            puzzle[r][c] = 0; // 0 means empty cell
            removed++;
        }
    }

    // Formatting for frontend: { value, isInitial, isWrong }
    const formattedBoard = puzzle.map((row, r) =>
        row.map((val, c) => ({
            value: val,
            isInitial: val !== 0,
            isWrong: false,
            solutionValue: solution[r][c]
        }))
    );

    return formattedBoard;
};

// Check if entire board is valid and complete
export const checkSudokuWin = (board) => {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c].value === 0 || board[r][c].value !== board[r][c].solutionValue) {
                return false;
            }
        }
    }
    return true;
};
