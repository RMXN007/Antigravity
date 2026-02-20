import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Home: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current!.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            id="welcome"
            className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-20 perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={ref}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative p-12"
            >
                <h2 className="text-xl md:text-2xl text-primary font-light mb-4 tracking-[0.2em] uppercase translate-z-20">
                    Welcome to the Future
                </h2>
                <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 translate-z-40">
                    The Architect
                </h1>
                <p className="max-w-xl mx-auto text-gray-400 text-lg leading-relaxed translate-z-10">
                    Crafting digital experiences that merge purpose, aesthetics, and technology.
                    Enter the universe of professional web development.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="mt-16 animate-bounce-slow"
            >
                <span className="text-sm uppercase tracking-widest text-gray-500">Explore</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent mx-auto mt-4"></div>
            </motion.div>
        </div>
    );
};

export default Home;
