import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");

    const onSubmit = async (data) => {
        setServerError("");
        // API expects email or username. We can send username field as email or username
        // For simplicity, let's assume the user enters either in the 'username' field of logic
        // But our UI asks for Email or Username.
        // Let's just pass both fields if possible or check input type.
        // The backend check: $or: [{username}, {email}]
        // So we can send the input value as both 'username' and 'email' or just rely on backend to check one against both?
        // Actually backend code: const {email, username, password} = req.body; if (!username && !email) ...

        // Let's send the input value as 'username' and 'email' just to be safe or adjust backend?
        // Easier: Send to both fields or let backend handle one field?
        // App backend logic: const user = await User.findOne({ $or: [{username}, {email}] })
        // So if we send { username: "input", email: "input" }, it will match.

        const result = await login(data.identifier, data.identifier, data.password);
        if (result.success) {
            navigate("/");
        } else {
            setServerError(result.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f] text-white">
            <div className="w-full max-w-md p-8 bg-[#1e1e1e] rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Log in to VideoTube</h2>

                {serverError && (
                    <div className="p-3 mb-4 text-sm text-red-500 bg-red-900/20 rounded-lg">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">Username or Email</label>
                        <input
                            type="text"
                            {...register("identifier", { required: "Username or Email is required" })}
                            className="w-full p-2.5 bg-[#121212] border border-[#303030] rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
                            placeholder="Enter username or email"
                        />
                        {errors.identifier && <span className="text-xs text-red-500">{errors.identifier.message}</span>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full p-2.5 bg-[#121212] border border-[#303030] rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
                            placeholder="********"
                        />
                        {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium"
                    >
                        Log In
                    </button>
                </form>

                <p className="mt-4 text-sm text-center text-gray-400">
                    Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
