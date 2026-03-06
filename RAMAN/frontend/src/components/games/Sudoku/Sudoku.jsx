import React, { useState, useEffect } from 'react';
import { getSudokuBoard, checkSudokuWin } from './sudokuLogic';
import { useTimer } from '../../../hooks/useTimer';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import { RotateCcw, Clock, Trophy } from 'lucide-react';

const Sudoku = () => {
    const [board, setBoard] = useState([]);
    const [difficulty, setDifficulty] = useState('easy');
    const [selectedCell, setSelectedCell] = useState(null);
    const [isWon, setIsWon] = useState(false);
    const { formattedTime, isActive, start, stop, reset } = useTimer(0);

    // Initialize Board
    const initializeGame = (diff) => {
        setBoard(getSudokuBoard(diff));
        setIsWon(false);
        setSelectedCell(null);
        reset();
        start();
    };

    useEffect(() => {
        initializeGame(difficulty);
        return () => stop();
        // eslint-disable-next-line
    }, [difficulty]);

    const handleCellClick = (r, c) => {
        if (isWon || board[r][c].isInitial) return;
        if (!isActive) start();
        setSelectedCell({ r, c });
    };

    const handleNumberInput = (num) => {
        if (!selectedCell || isWon) return;

        const { r, c } = selectedCell;
        if (board[r][c].isInitial) return;

        const newBoard = [...board];
        newBoard[r][c].value = num;

        // Check if input is correct based on solution
        newBoard[r][c].isWrong = newBoard[r][c].solutionValue !== num && num !== 0;

        setBoard(newBoard);

        if (checkSudokuWin(newBoard)) {
            setIsWon(true);
            stop();
        }
    };

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
                handleNumberInput(parseInt(e.key));
            } else if (e.key === 'Backspace' || e.key === 'Delete') {
                handleNumberInput(0);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedCell, board, isWon]);

    return (
        <div className="py-20 px-4 md:px-8 max-w-5xl mx-auto w-full flex flex-col items-center animate-fade-in">
            <div className="text-center mb-10 w-full flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-left">
                    <h1 className="text-4xl font-extrabold mb-2">Sudoku</h1>
                    <p className="text-zinc-400">Flex your logic circuits. Use numbers 1-9.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex bg-zinc-900/50 p-1 rounded-lg border border-zinc-800/50">
                        {['easy', 'medium', 'hard'].map((diff) => (
                            <button
                                key={diff}
                                onClick={() => setDifficulty(diff)}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${difficulty === diff
                                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                                        : 'text-zinc-400 hover:text-white'
                                    }`}
                            >
                                {diff}
                            </button>
                        ))}
                    </div>

                    <Card className="px-5 py-2 flex items-center gap-3 border-cyan-500/20">
                        <Clock size={20} className="text-cyan-400" />
                        <span className="text-xl font-mono text-slate-100">{formattedTime}</span>
                    </Card>
                </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-8 justify-center items-start">
                {/* Sudoku Board */}
                <div className="bg-zinc-950/80 p-2 sm:p-4 rounded-xl border-2 border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    {board.length > 0 && (
                        <div className="grid grid-cols-9 gap-[1px] bg-zinc-700 border-2 border-zinc-600">
                            {board.map((row, r) =>
                                row.map((cell, c) => {
                                    const isSelected = selectedCell?.r === r && selectedCell?.c === c;
                                    const borderRight = c === 2 || c === 5 ? 'border-r-2 border-r-zinc-500' : '';
                                    const borderBottom = r === 2 || r === 5 ? 'border-b-2 border-b-zinc-500' : '';

                                    return (
                                        <div
                                            key={`${r}-${c}`}
                                            onClick={() => handleCellClick(r, c)}
                                            className={`
                        w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-2xl font-medium cursor-pointer transition-colors
                        ${cell.isInitial ? 'bg-zinc-800 text-zinc-300 font-bold' : 'bg-zinc-900 text-cyan-400 hover:bg-zinc-800'}
                        ${isSelected ? 'bg-cyan-900/40 outline outline-2 outline-cyan-500 z-10' : ''}
                        ${cell.isWrong ? 'text-red-400 bg-red-900/20' : ''}
                        ${borderRight} ${borderBottom}
                      `}
                                        >
                                            {cell.value !== 0 ? cell.value : ''}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>

                {/* Controls Panel */}
                <div className="w-full lg:w-48 flex flex-col gap-6">
                    {isWon && (
                        <div className="bg-green-500/20 border border-green-500/50 text-green-400 p-4 rounded-xl flex flex-col items-center justify-center gap-2 animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                            <Trophy size={32} />
                            <span className="font-bold text-center">Puzzle Solved!</span>
                        </div>
                    )}

                    <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <button
                                key={num}
                                onClick={() => handleNumberInput(num)}
                                disabled={isWon || !selectedCell || board[selectedCell.r][selectedCell.c].isInitial}
                                className="bg-zinc-800/80 hover:bg-cyan-500/20 text-xl font-bold rounded-lg aspect-square text-slate-200 border border-zinc-700 hover:border-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {num}
                            </button>
                        ))}
                        <button
                            onClick={() => handleNumberInput(0)}
                            disabled={isWon || !selectedCell || board[selectedCell.r][selectedCell.c].isInitial}
                            className="bg-zinc-800/80 hover:bg-red-500/20 col-span-3 text-sm font-bold rounded-lg py-3 text-slate-200 border border-zinc-700 transition-all disabled:opacity-50"
                        >
                            Clear Cell
                        </button>
                    </div>

                    <Button onClick={() => initializeGame(difficulty)} variant="outline" className="flex items-center justify-center gap-2 py-3 w-full">
                        <RotateCcw size={18} /> Restart Game
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Sudoku;
