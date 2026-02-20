import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import VideoDetail from './pages/VideoDetail.jsx'
import History from './pages/History.jsx'
import Subscriptions from './pages/Subscriptions.jsx'
import LikedVideos from './pages/LikedVideos.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "video/:videoId",
        element: <VideoDetail />
      },
      {
        path: "history",
        element: <History />
      },
      {
        path: "subscriptions",
        element: <Subscriptions />
      },
      {
        path: "liked-videos",
        element: <LikedVideos />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
])

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </AuthProvider>
  )
}

export default App
