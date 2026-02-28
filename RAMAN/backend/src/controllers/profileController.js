export const getProfile = (req, res) => {
    const profileData = {
        name: 'Raman',
        role: 'Full Stack Developer',
        bio: 'I build minimalist, high-performance web applications using modern technologies.',
        contact: 'thanksbreakfast@gmail.com',
        socials: {
            email: 'mailto:thanksbreakfast@gmail.com',
            github: 'https://github.com/RMXN007',
            linkedin: 'https://www.linkedin.com/in/raman-pawar-824483377/',
            instagram: 'https://instagram.com/ramanpawar_1008'
        }
    };

    res.json(profileData);
};
