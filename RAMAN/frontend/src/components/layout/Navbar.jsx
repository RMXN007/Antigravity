import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Gamepad2, Code2, Home, User } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/', icon: <Home size={18} /> },
        { name: 'Games', path: '/games', icon: <Gamepad2 size={18} /> },
        { name: 'Projects', path: '/projects', icon: <Code2 size={18} /> },
        { name: 'About', path: '/about', icon: <User size={18} /> },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-xl font-bold tracking-tighter neon-text flex items-center gap-2">
                            <span className="text-cyan-400">⚡</span> RMXN
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${location.pathname === link.path
                                        ? 'text-cyan-400 bg-cyan-500/10'
                                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                    }`}
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        ))}

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-zinc-800/50 text-zinc-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
