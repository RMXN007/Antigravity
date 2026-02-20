import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Monitor, Mouse, Keyboard, Speaker, HardDrive } from 'lucide-react';

const gear = [
    { icon: Cpu, name: "Ryzen 9 5900X", type: "CPU" },
    { icon: Monitor, name: "LG Ultragear 27\"", type: "Display" },
    { icon: Mouse, name: "Logitech G Pro X", type: "Mouse" },
    { icon: Keyboard, name: "Keychron Q1", type: "Keyboard" },
    { icon: Speaker, name: "Audioengine A2+", type: "Audio" },
    { icon: HardDrive, name: "Samsung 980 Pro", type: "Storage" },
];

const GamingSetup: React.FC = () => {
    return (
        <div className="py-20 px-4">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-4xl font-serif font-bold mb-12 text-center"
            >
                Command Center
            </motion.h2>

            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
                {gear.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col items-center gap-4 hover:bg-white/10 transition-colors backdrop-blur-sm"
                    >
                        <item.icon size={40} className="text-primary" />
                        <div className="text-center">
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-xs text-gray-400 uppercase tracking-widest">{item.type}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default GamingSetup;
