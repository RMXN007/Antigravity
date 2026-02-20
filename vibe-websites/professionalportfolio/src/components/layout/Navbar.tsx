import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, SquareTerminal } from 'lucide-react';

import useSound from 'use-sound';

const Navbar: React.FC = () => {
    const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.1 });

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 bg-glass backdrop-blur-md border-b border-white/10"
        >
            <div className="text-2xl font-bold font-serif tracking-wider text-white flex items-center gap-2">
                <SquareTerminal className="text-primary" />
                <span>PORTFOLIO</span>
            </div>

            <div className="flex gap-6">
                <a href="#welcome" onMouseEnter={() => playHover()} className="hover:text-primary transition-colors">Home</a>
                <a href="#about" onMouseEnter={() => playHover()} className="hover:text-primary transition-colors">About</a>
                <a href="#projects" onMouseEnter={() => playHover()} className="hover:text-primary transition-colors">Projects</a>
                <a href="#journey" onMouseEnter={() => playHover()} className="hover:text-primary transition-colors">Journey</a>
            </div>

            <div className="flex gap-4 text-gray-400">
                <a href="#" className="hover:text-white transition-colors hover:scale-110"><Github size={20} /></a>
                <a href="#" className="hover:text-white transition-colors hover:scale-110"><Linkedin size={20} /></a>
                <a href="#" className="hover:text-white transition-colors hover:scale-110"><Twitter size={20} /></a>
            </div>
        </motion.nav>
    );
};

export default Navbar;
