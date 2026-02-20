export const USERS = [
    { username: 'alex_adv', fullName: 'Alex Adventures', avatar: 'https://i.pravatar.cc/150?u=alex_adv', isVerified: true },
    { username: 'bella_eats', fullName: 'Bella Foodie', avatar: 'https://i.pravatar.cc/150?u=bella_eats', isVerified: false },
    { username: 'charlie_codes', fullName: 'Charlie Dev', avatar: 'https://i.pravatar.cc/150?u=charlie_codes', isVerified: true },
    { username: 'diana_designs', fullName: 'Diana Art', avatar: 'https://i.pravatar.cc/150?u=diana_designs', isVerified: false },
    { username: 'ethan_gym', fullName: 'Ethan Fitness', avatar: 'https://i.pravatar.cc/150?u=ethan_gym', isVerified: false },
    { username: 'fiona_travels', fullName: 'Fiona Trips', avatar: 'https://i.pravatar.cc/150?u=fiona_travels', isVerified: true },
    { username: 'george_music', fullName: 'George Beats', avatar: 'https://i.pravatar.cc/150?u=george_music', isVerified: true },
    { username: 'hannah_styles', fullName: 'Hannah Fashion', avatar: 'https://i.pravatar.cc/150?u=hannah_styles', isVerified: false },
    { username: 'ian_tech', fullName: 'Ian Gadgets', avatar: 'https://i.pravatar.cc/150?u=ian_tech', isVerified: false },
    { username: 'julia_yoga', fullName: 'Julia Zen', avatar: 'https://i.pravatar.cc/150?u=julia_yoga', isVerified: false },
    { username: 'kevin_cooks', fullName: 'Kevin Chef', avatar: 'https://i.pravatar.cc/150?u=kevin_cooks', isVerified: true },
    { username: 'luna_pets', fullName: 'Luna The Dog', avatar: 'https://i.pravatar.cc/150?u=luna_pets', isVerified: false },
    { username: 'mike_cars', fullName: 'Mike Motors', avatar: 'https://i.pravatar.cc/150?u=mike_cars', isVerified: false },
    { username: 'nina_nature', fullName: 'Nina Green', avatar: 'https://i.pravatar.cc/150?u=nina_nature', isVerified: false },
    { username: 'oliver_gaming', fullName: 'Oliver Plays', avatar: 'https://i.pravatar.cc/150?u=oliver_gaming', isVerified: true },
];

export const SUGGESTED_USERS = USERS.slice(10, 15).map(u => ({
    ...u,
    followedBy: `Followed by ${USERS[Math.floor(Math.random() * 10)].username} + ${Math.floor(Math.random() * 5)} others`
}));

export const STORIES = [
    { id: 0, username: 'Your Story', avatar: '', isStart: true },
    ...USERS.slice(0, 10).map((u, i) => ({
        id: i + 1,
        username: u.username,
        avatar: u.avatar,
        isSeen: Math.random() > 0.7,
        hasStory: true
    }))
];

const LOCATIONS = ['Paris, France', 'Tokyo, Japan', 'New York, USA', 'Bali, Indonesia', 'London, UK', 'Dubai, UAE', 'Santorini, Greece', 'Los Angeles, USA', 'Rome, Italy', 'Sydney, Australia'];
const CAPTIONS = [
    "Living my best life! ✨ #blessed",
    "Just another day in paradise 🌴",
    "Coffee first, schemes later ☕",
    "Weekends like this ❤️",
    "Can't believe this view! 📸",
    "Work hard, play hard 💪",
    "Throwback to this amazing trip ✈️",
    "Good vibes only ✌️",
    "Food for the soul 🍕",
    "Sunset chaser 🌅",
    "Sunkissed ☀️",
    "Making memories 💭",
    "Dream big ✨",
    "Adventure awaits 🌍",
    "Cozy vibes 🧸"
];

export const POSTS = Array.from({ length: 30 }).map((_, i) => {
    const user = USERS[i % USERS.length];
    return {
        _id: `post_${i}`,
        owner: user,
        image: `https://picsum.photos/seed/${i + 132}/600/600`,
        caption: CAPTIONS[i % CAPTIONS.length],
        likesCount: Math.floor(Math.random() * 1000) + 10,
        commentsCount: Math.floor(Math.random() * 50),
        location: Math.random() > 0.5 ? LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)] : null,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
        isLiked: false,
        isSaved: false
    };
});

export const COMMENTS = [
    { id: 1, user: USERS[2], text: "Amazing! 🔥", time: "2h" },
    { id: 2, user: USERS[4], text: "Love this view 😍", time: "3h" },
    { id: 3, user: USERS[1], text: "So jealous right now!", time: "5h" },
    { id: 4, user: USERS[6], text: "Great shot 📸", time: "1d" },
];

export const NOTIFICATIONS = [
    { id: 1, type: 'like', user: USERS[1], text: 'liked your photo.', time: '2m', postImage: 'https://picsum.photos/seed/10/100/100' },
    { id: 2, type: 'follow', user: USERS[3], text: 'started following you.', time: '1h', isFollowing: false },
    { id: 3, type: 'comment', user: USERS[5], text: 'commented: "Nice!"', time: '3h', postImage: 'https://picsum.photos/seed/15/100/100' },
    { id: 4, type: 'mention', user: USERS[7], text: 'mentioned you in a comment.', time: '1d', postImage: 'https://picsum.photos/seed/20/100/100' },
    { id: 5, type: 'like', user: USERS[2], text: 'liked your reel.', time: '2d', postImage: 'https://picsum.photos/seed/25/100/100' },
];

export const REELS = Array.from({ length: 10 }).map((_, i) => ({
    id: `reel_${i}`,
    url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4', // Placeholder video
    user: USERS[i % USERS.length],
    likes: Math.floor(Math.random() * 5000),
    comments: Math.floor(Math.random() * 200),
    caption: "Wait for it... 😱 #viral #reels"
}));

export const SEARCH_HISTORY = [
    { id: 1, user: USERS[4] },
    { id: 2, user: USERS[8] },
    { id: 3, text: "#photography" },
    { id: 4, text: "travel" }
];
