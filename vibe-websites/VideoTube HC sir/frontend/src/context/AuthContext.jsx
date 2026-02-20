import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in (e.g., check local storage or hit an endpoint)
        const checkUser = async () => {
            try {
                // Optional: Implement a /me endpoint or check cookies
                // For now, we rely on login setting the state
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Auth check failed", error);
            } finally {
                setLoading(false);
            }
        }
        checkUser();
    }, []);

    const login = async (email, username, password) => {
        try {
            const response = await axios.post('/api/v1/users/login', {
                email,
                username,
                password
            });

            const userData = response.data.data.user;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Login failed"
            };
        }
    };

    const register = async (data) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (key === 'avatar' || key === 'coverImage') {
                    if (data[key][0]) {
                        formData.append(key, data[key][0]);
                    }
                } else {
                    formData.append(key, data[key]);
                }
            });

            await axios.post('/api/v1/users/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return { success: true };

        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Registration failed"
            };
        }
    }

    const logout = async () => {
        try {
            await axios.post('/api/v1/users/logout');
            setUser(null);
            localStorage.removeItem('user');
        } catch (error) {
            console.error("Logout failed", error);
            // Force logout on client side even if server fails
            setUser(null);
            localStorage.removeItem('user');
        }
    };

    const value = {
        user,
        login,
        logout,
        register,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
