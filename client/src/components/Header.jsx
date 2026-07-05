import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Stethoscope, LogIn, UserPlus, User, LogOut, LayoutDashboard } from 'lucide-react'

const getUser = () => {
  const User = localStorage.getItem('user')
  if (User) {
    try {
      return JSON.parse(User)
    } catch {
      return User
    }
  }
  return null
}

const Header = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(getUser)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-gray-200">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-rose-600">
        <Stethoscope className="w-7 h-7" />
        CarePlus
      </Link>

      <nav className="flex items-center gap-3">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-50 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <User className="w-5 h-5 text-rose-500" />
              <span>{typeof user === 'object' ? user.name || user.email || JSON.stringify(user) : user}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-50 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
