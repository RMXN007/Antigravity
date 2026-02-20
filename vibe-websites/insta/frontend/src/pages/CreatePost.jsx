import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'

function CreatePost() {
    const [image, setImage] = useState(null)
    const [caption, setCaption] = useState('')
    const [imagePreview, setImagePreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleShare = async () => {
        if (!image) return alert("Please select an image")

        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('image', image)
            formData.append('caption', caption)

            const res = await axios.post('/api/v1/posts', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            })

            if (res.data.success) {
                navigate('/')
            }
        } catch (err) {
            alert("Failed to share post")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6" /></button>
                <h1 className="font-semibold text-lg">New Post</h1>
                <button
                    onClick={handleShare}
                    className="text-[#0095f6] font-semibold text-sm disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Sharing..." : "Share"}
                </button>
            </div>

            <div className="flex flex-col">
                {imagePreview ? (
                    <div className="w-full aspect-square bg-gray-100">
                        <img src={imagePreview} className="w-full h-full object-cover" alt="preview" />
                    </div>
                ) : (
                    <div className="w-full aspect-square bg-gray-50 flex items-center justify-center">
                        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md font-semibold">
                            Select from Computer
                            <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                        </label>
                    </div>
                )}

                <div className="p-4 border-b border-gray-200">
                    <textarea
                        placeholder="Write a caption..."
                        className="w-full outline-none resize-none text-sm"
                        rows="4"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    ></textarea>
                </div>
            </div>
        </div>
    )
}

export default CreatePost
