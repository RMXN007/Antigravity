export const getProjects = (req, res) => {
    const dummyProjects = [
        {
            id: 1,
            title: 'Minimalist Portfolio Page',
            description: 'A sleek, fast, and responsive portfolio built with MERN stack.',
            image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600',
            link: 'https://github.com/raman/portfolio'
        },
        {
            id: 2,
            title: 'E-commerce Dashboard',
            description: 'Analytics and management dashboard for small businesses.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
            link: '#'
        },
        {
            id: 3,
            title: 'Social Media Clone',
            description: 'Full-stack social application with real-time features.',
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600',
            link: '#'
        }
    ];

    res.json(dummyProjects);
};
