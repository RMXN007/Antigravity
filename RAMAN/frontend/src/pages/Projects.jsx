import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import { ArrowRight, Github, ExternalLink, LoaderCircle } from 'lucide-react';
import axios from 'axios';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Still fetching dummy data from backend as per user's earlier setup,
    // but keeping frontend resilient.
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/projects');
                setProjects(res.data);
            } catch (err) {
                console.error("Failed to fetch projects, using fallbacks:", err);
                setProjects([
                    {
                        id: 1,
                        title: 'Minimalist Portfolio Page',
                        description: 'A sleek, fast, and responsive portfolio built with MERN stack featuring a dark futuristic aesthetic.',
                        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600',
                        link: '#'
                    },
                    {
                        id: 2,
                        title: 'Full-Scale Platform',
                        description: 'Complex logic, routing, context management, and clean React component architecture.',
                        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
                        link: '#'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="flex-grow flex justify-center items-center min-h-[50vh]">
                <LoaderCircle className="animate-spin text-cyan-500" size={40} />
            </div>
        );
    }

    return (
        <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full animate-fade-in">
            <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Project <span className="neon-text">Logs</span>
                </h1>
                <p className="text-zinc-400 text-lg">
                    A showcase of systems, applications, and architectures I've engineered.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                    <Card key={project.id} className="flex flex-col overflow-hidden" style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="h-48 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                            <p className="text-zinc-400 mb-6 flex-grow">{project.description}</p>

                            <div className="flex gap-4 border-t border-zinc-800/50 pt-4 mt-auto">
                                <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium">
                                    <ExternalLink size={16} /> Live Demo
                                </a>
                                <a href="#" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium">
                                    <Github size={16} /> Source Code
                                </a>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Projects;
