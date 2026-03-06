import React from 'react';
import Card from '../components/ui/Card';
import { Terminal, Database, Server, Layout } from 'lucide-react';
import FlowingMenu from '../components/ui/FlowingMenu';

const About = () => {
    const flowingItems = [
        { link: '#', text: 'React.js', image: 'https://picsum.photos/600/400?random=1' },
        { link: '#', text: 'Node.js', image: 'https://picsum.photos/600/400?random=2' },
        { link: '#', text: 'TailwindCSS', image: 'https://picsum.photos/600/400?random=3' },
        { link: '#', text: 'MongoDB', image: 'https://picsum.photos/600/400?random=4' },
        { link: '#', text: 'Next.js', image: 'https://picsum.photos/600/400?random=5' },
    ];
    const skills = [
        { category: 'Frontend', icon: <Layout size={24} />, items: ['React', 'Tailwind CSS', 'Next.js', 'Vite'] },
        { category: 'Backend', icon: <Server size={24} />, items: ['Node.js', 'Express', 'REST APIs', 'WebSockets'] },
        { category: 'Database', icon: <Database size={24} />, items: ['MongoDB', 'PostgreSQL', 'Mongoose', 'Prisma'] },
        { category: 'Tools', icon: <Terminal size={24} />, items: ['Git', 'Docker', 'Linux', 'Vercel/Render'] },
    ];

    return (
        <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full animate-fade-in">
            <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                    System <span className="neon-text">Profile</span>
                </h1>
                <p className="text-zinc-400 text-lg max-w-3xl leading-relaxed">
                    Mission-driven full stack developer focusing on clean, scalable architectures and engaging futuristic user experiences.
                    I specialize in the MERN stack and write robust, modular code, treating every project like an industry-grade application.
                </p>
            </div>

            <div className="mb-16">
                {/* Animated Flowing Menu representing the continuous tech flow */}
                <div className="mb-16 w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-zinc-800/50 bg-[#060010]">
                    <FlowingMenu items={flowingItems} />
                </div>

                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                    <span className="text-cyan-400">&gt;</span> Technical Arsenal
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                        <Card key={index} className="p-6">
                            <div className="flex items-center gap-3 mb-4 text-cyan-400">
                                {skill.icon}
                                <h3 className="text-xl font-bold text-slate-100">{skill.category}</h3>
                            </div>
                            <ul className="space-y-2">
                                {skill.items.map((item, i) => (
                                    <li key={i} className="text-zinc-400 flex items-center gap-2 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 block"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
