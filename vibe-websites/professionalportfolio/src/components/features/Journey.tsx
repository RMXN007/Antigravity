import React from 'react';
import { motion } from 'framer-motion';

const events = [
    { year: "2024", title: "Senior Developer", desc: "Leading frontend architecture at TechCorp." },
    { year: "2022", title: "Full Stack Engineer", desc: "Built scalable storage solutions for startups." },
    { year: "2020", title: "Freelance", desc: "Delivered 20+ web projects for global clients." },
    { year: "2018", title: "Hello World", desc: "Wrote my first line of code." },
];

const Journey: React.FC = () => {
    return (
        <div id="journey" className="py-20 max-w-4xl mx-auto px-8">
            <h2 className="text-4xl font-serif font-bold mb-16 text-center">My Journey</h2>

            <div className="relative border-l-2 border-white/10 ml-4 md:ml-0">
                {events.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="mb-12 ml-8 md:ml-12 relative"
                    >
                        <div className="absolute -left-[43px] md:-left-[51px] w-6 h-6 bg-primary rounded-full border-4 border-black" />
                        <span className="text-primary font-mono text-sm mb-2 block">{event.year}</span>
                        <h3 className="text-2xl font-bold mb-1">{event.title}</h3>
                        <p className="text-gray-400">{event.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Journey;
