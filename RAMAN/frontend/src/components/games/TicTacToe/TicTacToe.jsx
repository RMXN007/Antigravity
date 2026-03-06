import React, { useState, useEffect } from 'react';
import { checkWinner } from './ticLogic';
import { useTimer } from '../../../hooks/useTimer';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import { RotateCcw, Trophy, Clock } from 'lucide-react';

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winnerInfo, setWinnerInfo] = useState(null);
    const { formattedTime, isActive, start, stop, reset } = useTimer(0);

    // Initialize Game
    useEffect(() => {
        start();
        return () => stop();
        // eslint-disable-next-line
    }, []);

    const handleClick = (index) => {
        if (board[index] || winnerInfo) return;

        if (!isActive) start();

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);

        const matchInfo = checkWinner(newBoard);
        if (matchInfo) {
            setWinnerInfo(matchInfo);
            stop();
        }
    };

    const handleRestart = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinnerInfo(null);
        reset();
        start();
    };

    const renderSquare = (index) => {
        const isWinningSquare = winnerInfo?.line?.includes(index);
        const value = board[index];
        const colorClass = value === 'X' ? 'text-cyan-400' : 'text-blue-500';

        return (
            <button
                onClick={() => handleClick(index)}
                className={`h-24 sm:h-32 w-full bg-zinc-900/50 border border-zinc-700/50 rounded-lg text-4xl sm:text-5xl font-bold flex items-center justify-center transition-all duration-300
          ${!value && !winnerInfo ? 'hover:bg-zinc-800/80 hover:border-cyan-500/30' : ''}
          ${isWinningSquare ? 'bg-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.5)] border-cyan-400 scale-105 z-10' : ''}
        `}
                disabled={!!winnerInfo}
            >
                <span className={colorClass}>{value}</span>
            </button>
        );
    };

    return (
        <div className="py-20 px-4 md:px-8 max-w-4xl mx-auto w-full flex flex-col items-center animate-fade-in">
            <div className="text-center mb-10 w-full flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold mb-2">Tic Tac Toe</h1>
                    <p className="text-zinc-400">Can you beat the clock?</p>
                </div>

                <div className="flex gap-4">
                    <Card className="px-5 py-3 flex items-center gap-3">
                        <Clock size={20} className="text-cyan-400" />
                        <span className="text-xl font-mono text-slate-100">{formattedTime}</span>
                    </Card>
                </div>
            </div>

            <div className="w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-lg font-medium">
                        {winnerInfo ? (
                            winnerInfo.winner === 'Draw' ? (
                                <span className="text-yellow-400">It's a Draw!</span>
                            ) : (
                                <span className="flex items-center gap-2 text-cyan-400">
                                    <Trophy size={20} /> Winner: {winnerInfo.winner}
                                </span>
                            )
                        ) : (
                            <span className="text-zinc-300">
                                Next Player: <span className={isXNext ? 'text-cyan-400 font-bold' : 'text-blue-400 font-bold'}>{isXNext ? 'X' : 'O'}</span>
                            </span>
                        )}
                    </div>

                    <Button onClick={handleRestart} variant="outline" className="flex items-center gap-2 py-1.5 px-4">
                        <RotateCcw size={16} /> Restart
                    </Button>
                </div>

                <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-950/50 border border-zinc-800/50 rounded-2xl backdrop-blur-md shadow-2xl">
                    {board.map((_, index) => (
                        <React.Fragment key={index}>
                            {renderSquare(index)}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TicTacToe;
