import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Gamepad2, Code2, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen text-slate-100">

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center py-32 px-4 text-center animate-fade-in">
                <div className="inline-block mb-4 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium tracking-wide">
                    Full Stack Developer & Game Enthusiast
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
                    Welcome to the <span className="neon-text block mt-2">Cyberspace</span>
                </h1>
                <p className="text-xl text-zinc-400 max-w-2xl mb-10">
                    I build minimalist, high-performance web applications and interactive modular games using modern technologies.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/games">
                        <Button className="flex items-center gap-2 text-lg px-8 py-3">
                            <Gamepad2 size={20} /> Explore Games
                        </Button>
                    </Link>
                    <Link to="/projects">
                        <Button variant="outline" className="flex items-center gap-2 text-lg px-8 py-3">
                            <Code2 size={20} /> View Projects
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                    <span className="text-cyan-400">⚡</span> Quick Access
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <Card className="p-8 flex flex-col items-start text-left">
                        <div className="p-3 rounded-lg bg-cyan-500/10 text-cyan-400 mb-6">
                            <Gamepad2 size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Game Hub</h3>
                        <p className="text-zinc-400 mb-6 flex-grow">
                            Challenge yourself with classic games built entirely as modular React components. Test your logic with Sudoku or play a quick match of Tic Tac Toe.
                        </p>
                        <Link to="/games" className="text-cyan-400 font-medium flex items-center gap-2 hover:gap-3 transition-all">
                            Play Now <ArrowRight size={18} />
                        </Link>
                    </Card>

                    <Card className="p-8 flex flex-col items-start text-left">
                        <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 mb-6">
                            <Code2 size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Portfolio Projects</h3>
                        <p className="text-zinc-400 mb-6 flex-grow">
                            Explore my latest web development projects. From e-commerce dashboards to full-stack social applications, see what I've been building.
                        </p>
                        <Link to="/projects" className="text-blue-400 font-medium flex items-center gap-2 hover:gap-3 transition-all">
                            View Work <ArrowRight size={18} />
                        </Link>
                    </Card>

                </div>
            </section>

        </div>
    );
};

export default Home;
