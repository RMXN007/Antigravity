export const MOCK_USERS = [
    {
        _id: "user1",
        username: "johndoe",
        fullName: "John Doe",
        avatar: "https://via.placeholder.com/150",
        email: "john@example.com",
        password: "hashedpassword"
    },
    {
        _id: "user2",
        username: "janedoe",
        fullName: "Jane Doe",
        avatar: "https://via.placeholder.com/150",
        email: "jane@example.com",
        password: "hashedpassword"
    }
];

export const MOCK_POSTS = [
    {
        _id: "post1",
        caption: "Beautiful sunset! 🌅",
        image: "https://via.placeholder.com/600",
        owner: MOCK_USERS[0],
        likesCount: 120,
        commentsCount: 5,
        createdAt: new Date().toISOString()
    },
    {
        _id: "post2",
        caption: "Coding all night 💻",
        image: "https://via.placeholder.com/600",
        owner: MOCK_USERS[1],
        likesCount: 45,
        commentsCount: 2,
        createdAt: new Date().toISOString()
    }
];
