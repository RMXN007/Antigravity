import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        fullName: '',
        username: '',
        password: ''
    })
    const [avatar, setAvatar] = useState(null)
    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            // Simulate signup for demo
            navigate('/login')

            // const data = new FormData()
            // data.append('email', formData.email)
            // data.append('fullName', formData.fullName)
            // data.append('username', formData.username)
            // data.append('password', formData.password)
            // if (avatar) data.append('avatar', avatar)
            // const res = await axios.post('/api/v1/users/register', data) // Proxy handles host
            // if (res.data.success) {
            //     navigate('/login')
            // }
        } catch (err) {
            alert("Signup Failed")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)] px-4 py-8">
            <div className="flex flex-col gap-3 w-full max-w-[350px]">
                <div className="bg-[var(--bg-elevated)] p-8 border border-[var(--border-color)] flex flex-col items-center">
                    <h1 className="text-5xl font-cursive font-bold mb-4 text-[var(--text-primary)] tracking-tight">InstaClone</h1>
                    <p className="text-[var(--text-tertiary)] font-semibold text-center mb-4 text-base leading-5">Sign up to see photos and videos from your friends.</p>

                    <button className="bg-[#0095f6] text-white text-sm font-semibold py-1.5 rounded-md w-full mb-4 hover:bg-[#1877f2] transition-colors">
                        Log in with Facebook
                    </button>

                    <div className="flex items-center mb-4 w-full">
                        <div className="h-[1px] bg-[var(--border-color)] flex-1"></div>
                        <span className="text-xs text-[var(--text-tertiary)] font-semibold px-4">OR</span>
                        <div className="h-[1px] bg-[var(--border-color)] flex-1"></div>
                    </div>

                    <form onSubmit={handleSignup} className="flex flex-col gap-2 w-full">
                        <input
                            type="email"
                            placeholder="Mobile Number or Email"
                            className="input-field bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-primary)] text-xs rounded-sm p-2.5 w-full focus:border-[var(--text-tertiary)] outline-none"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="input-field bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-primary)] text-xs rounded-sm p-2.5 w-full focus:border-[var(--text-tertiary)] outline-none"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            className="input-field bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-primary)] text-xs rounded-sm p-2.5 w-full focus:border-[var(--text-tertiary)] outline-none"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input-field bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-primary)] text-xs rounded-sm p-2.5 w-full focus:border-[var(--text-tertiary)] outline-none"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <div className='text-xs text-[var(--text-tertiary)]'>
                            Upload Avatar:
                            <input
                                type="file"
                                className="text-xs mt-1"
                                onChange={(e) => setAvatar(e.target.files[0])}
                            />
                        </div>

                        <p className="text-xs text-center text-[var(--text-tertiary)] my-2">
                            People who use our service may have uploaded your contact information to Instagram. <a href="#" className="font-semibold text-[#00376b]">Learn More</a>
                        </p>
                        <p className="text-xs text-center text-[var(--text-tertiary)] mb-4">
                            By signing up, you agree to our <a href="#" className="font-semibold text-[#00376b]">Terms</a> , <a href="#" className="font-semibold text-[#00376b]">Privacy Policy</a> and <a href="#" className="font-semibold text-[#00376b]">Cookies Policy</a> .
                        </p>

                        <button type="submit" className="bg-[#0095f6] text-white text-sm font-semibold py-1.5 rounded-md hover:bg-[#1877f2] transition-colors">
                            Sign up
                        </button>
                    </form>
                </div>

                <div className="bg-[var(--bg-elevated)] p-4 border border-[var(--border-color)] text-center">
                    <span className="text-sm text-[var(--text-primary)]">Have an account? </span>
                    <Link to="/login" className="text-[#0095f6] text-sm font-semibold">Log in</Link>
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
    )
}

export default Signup
