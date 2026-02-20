import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            // Simulate login for demo
            localStorage.setItem('accessToken', 'fake-token')
            window.location.href = '/'

            // Real API call
            // const res = await axios.post('/api/v1/users/login', {
            //     email,
            //     password
            // })
            // if (res.data.success) {
            //     localStorage.setItem('accessToken', res.data.data.accessToken)
            //     window.location.href = '/'
            // }
        } catch (err) {
            alert("Login Failed")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)] px-4">
            <div className="flex gap-8 max-w-4xl w-full justify-center items-center">
                {/* Phone Mockup (Hidden on mobile) */}
                <div className="hidden md:block w-[380px] h-[580px] bg-[url('https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones.png?__makehaste_cache_breaker=HOgRclNOskB')] bg-no-repeat bg-[length:468.32px_634.15px] bg-[-46px_0px] relative">
                    <div className="absolute top-[27px] right-[18px] w-[250px] h-[538px] bg-[var(--bg-primary)]">
                        <img src="https://via.placeholder.com/250x538" className="w-full h-full object-cover" alt="screenshot" />
                    </div>
                </div>

                {/* Login Form */}
                <div className="flex flex-col gap-3 w-full max-w-[350px]">
                    <div className="bg-[var(--bg-elevated)] p-8 border border-[var(--border-color)] flex flex-col items-center">
                        <h1 className="text-5xl font-cursive mb-8 font-bold mt-4 text-[var(--text-primary)] tracking-tight">InstaClone</h1>

                        <form onSubmit={handleLogin} className="flex flex-col gap-2 w-full">
                            <input
                                type="text"
                                placeholder="Phone number, username, or email"
                                className="input-field bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-primary)] text-xs rounded-sm p-2.5 w-full focus:border-[var(--text-tertiary)] outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="input-field bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-primary)] text-xs rounded-sm p-2.5 w-full focus:border-[var(--text-tertiary)] outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit" className="bg-[#0095f6] text-white text-sm font-semibold py-1.5 rounded-md mt-2 disabled:opacity-70 hover:bg-[#1877f2] transition-colors">
                                Log in
                            </button>
                        </form>

                        <div className="flex items-center my-4 w-full">
                            <div className="h-[1px] bg-[var(--border-color)] flex-1"></div>
                            <span className="text-xs text-[var(--text-tertiary)] font-semibold px-4">OR</span>
                            <div className="h-[1px] bg-[var(--border-color)] flex-1"></div>
                        </div>

                        <button className="flex items-center gap-2 text-[#385185] font-semibold text-sm">
                            <span className="text-xs">Log in with Facebook</span>
                        </button>

                        <a href="#" className="text-xs text-[#00376b] mt-3">Forgot password?</a>
                    </div>

                    <div className="bg-[var(--bg-elevated)] p-4 border border-[var(--border-color)] text-center">
                        <span className="text-sm text-[var(--text-primary)]">Don't have an account? </span>
                        <Link to="/signup" className="text-[#0095f6] text-sm font-semibold">Sign up</Link>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-[var(--text-primary)] my-3">Get the app.</p>
                        <div className="flex justify-center gap-2">
                            <img src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/Yfc020c87j0.png" alt="App Store" className="h-[40px]" />
                            <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="Google Play" className="h-[40px]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
