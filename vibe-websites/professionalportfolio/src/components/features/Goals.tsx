import React from 'react';
import { motion } from 'framer-motion';

const goals = [
    "Master Three.js Shaders",
    "Contribute to React Core",
    "Launch a SaaS Product",
    "Mentor Junior Devs"
];

const Goals: React.FC = () => {
    return (
        <div className="py-20 px-8 text-center">
            <h2 className="text-4xl font-serif font-bold mb-12">2026 Missions</h2>
            <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
                {goals.map((goal, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-6 py-3 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-sm hover:bg-primary hover:text-white transition-colors cursor-crosshair"
                    >
                        {goal}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Goals;
