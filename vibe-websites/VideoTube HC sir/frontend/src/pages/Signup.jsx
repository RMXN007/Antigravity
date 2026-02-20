import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");

    const onSubmit = async (data) => {
        setServerError("");
        const result = await registerUser(data);
        if (result.success) {
            navigate("/login");
        } else {
            setServerError(result.message);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f] text-white py-10">
            <div className="w-full max-w-md p-8 bg-[#1e1e1e] rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

                {serverError && (
                    <div className="p-3 mb-4 text-sm text-red-500 bg-red-900/20 rounded-lg">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">Full Name</label>
                        <input
                            type="text"
                            {...register("fullName", { required: "Full name is required" })}
                            className="w-full p-2.5 bg-[#121212] border border-[#303030] rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
                            placeholder="John Doe"
                        />
                        {errors.fullName && <span className="text-xs text-red-500">{errors.fullName.message}</span>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">Username</label>
                        <input
                            type="text"
                            {...register("username", { required: "Username is required" })}
                            className="w-full p-2.5 bg-[#121212] border border-[#303030] rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
                            placeholder="johndoe123"
                        />
                        {errors.username && <span className="text-xs text-red-500">{errors.username.message}</span>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full p-2.5 bg-[#121212] border border-[#303030] rounded-lg focus:ring-blue-500 focus:border-blue-500 text-white"
                            placeholder="john@example.com"
                        />
                        {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
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

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">Avatar</label>
                        <input
                            type="file"
                            {...register("avatar", { required: "Avatar is required" })}
                            className="w-full text-sm text-gray-400 border border-[#303030] rounded-lg cursor-pointer bg-[#121212] focus:outline-none"
                        />
                        {errors.avatar && <span className="text-xs text-red-500">{errors.avatar.message}</span>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-300">Cover Image (Optional)</label>
                        <input
                            type="file"
                            {...register("coverImage")}
                            className="w-full text-sm text-gray-400 border border-[#303030] rounded-lg cursor-pointer bg-[#121212] focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-800 font-medium"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-sm text-center text-gray-400">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup
