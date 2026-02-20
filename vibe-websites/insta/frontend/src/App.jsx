import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Profile from './pages/Profile'
import Explore from './pages/Explore'
import Reels from './pages/Reels'
import Messages from './pages/Messages'
import Activity from './pages/Activity'
import TopNav from './components/TopNav'
import BottomNav from './components/BottomNav'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'

function Layout({ children }) {
  const location = useLocation()
  const isAuthPage = ['/login', '/signup'].includes(location.pathname)
  // Reels usually has no top nav or bottom nav overlay on mobile, or specific style. 
  // For simplicity, we keep standard layout but maybe hide BottomNav if needed.
  // Actually Instagram hides TopNav on Reels page often.

  return (
    <div className="pb-[50px] min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {!isAuthPage && <TopNav />}
      <div className={`pt-[60px] ${!isAuthPage ? "" : ""}`}>
        {children}
      </div>
      {!isAuthPage && <BottomNav />}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/reels" element={<Reels />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/activity" element={<Activity />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
