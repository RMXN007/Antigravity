import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Play } from 'lucide-react';

const Games = () => {
    const gamesList = [
        {
            id: 'sudoku',
            name: 'Sudoku',
            description: 'A classic logic-based number-placement puzzle. Train your brain.',
            icon: '🧩',
            path: '/games/sudoku',
            color: 'text-cyan-400'
        },
        {
            id: 'tictactoe',
            name: 'Tic Tac Toe',
            description: 'The timeless paper-and-pencil game, now digitized.',
            icon: '❌⭕',
            path: '/games/tictactoe',
            color: 'text-blue-400'
        }
    ];

    return (
        <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full animate-fade-in">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    The <span className="neon-text">Arcade</span>
                </h1>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                    Take a break from exploring and challenge yourself. Choose a game below to begin.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {gamesList.map((game, idx) => (
                    <Card key={game.id} className="p-8 flex flex-col" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-4xl">{game.icon}</span>
                            <h2 className={`text-2xl font-bold ${game.color}`}>{game.name}</h2>
                        </div>

                        <p className="text-zinc-400 mb-8 flex-grow">
                            {game.description}
                        </p>

                        <Link to={game.path} className="w-full">
                            <Button className="w-full flex justify-center items-center gap-2">
                                <Play size={18} fill="currentColor" /> Play {game.name}
                            </Button>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Games;
