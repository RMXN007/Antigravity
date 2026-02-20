import React from 'react';
import { motion } from 'framer-motion';

const projects = [
    { id: 1, title: "AI Assistant", category: "Machine Learning", color: "from-blue-500 to-purple-500" },
    { id: 2, title: "Crypto Dashboard", category: "Finance", color: "from-green-400 to-blue-500" },
    { id: 3, title: "Neural Art", category: "Creative Coding", color: "from-pink-500 to-rose-500" },
    { id: 4, title: "Space Explorer", category: "Three.js", color: "from-indigo-400 to-cyan-400" },
];

const Projects: React.FC = () => {
    return (
        <div id="projects" className="min-h-screen py-20 px-8">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-4xl font-serif font-bold mb-12 text-center"
            >
                Selected Works
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, rotateY: 5 }}
                        className={`h-80 rounded-2xl bg-gradient-to-br ${project.color} p-8 flex flex-col justify-end relative overflow-hidden group cursor-pointer`}
                    >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="relative z-10">
                            <span className="text-sm font-bold opacity-70 mb-2 block">{project.category}</span>
                            <h3 className="text-3xl font-bold">{project.title}</h3>
                        </div>
                        <motion.div
                            className="absolute top-4 right-4 text-2xl font-bold opacity-0 group-hover:opacity-100"
                            initial={{ x: 20 }}
                            whileHover={{ x: 0 }}
                        >
                            →
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
