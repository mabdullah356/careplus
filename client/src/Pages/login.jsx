import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Stethoscope, Mail, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format'
    if (!form.password) errs.password = 'Password is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setError('')
    try {
      const res = await axios.post('/api/v1/users/login', {
        email: form.email.trim(),
        password: form.password,
      })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify({ email: form.email.trim() }))
      toast.success(res.data.message || 'Login successful!')
      navigate('/')
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto min-h-[calc(100vh-140px)] grid md:grid-cols-2">
        <div className="hidden md:block relative bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-900/80 via-rose-800/60 to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-between p-12">
            <Link to="/" className="flex items-center gap-2 text-white">
              <Stethoscope className="w-6 h-6" />
              <span className="text-lg font-bold">CarePlus</span>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white leading-tight">
                Welcome back.
              </h1>
              <p className="mt-3 text-rose-100/80 text-sm max-w-sm leading-relaxed">
                Sign in to manage appointments, track medicines, and access your clinic dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 md:py-0">
          <div className="w-full max-w-sm">
            <div className="md:hidden mb-8">
              <Link to="/" className="inline-flex items-center gap-2 text-rose-600 font-bold text-lg">
                <Stethoscope className="w-6 h-6" />
                CarePlus
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
            <p className="mt-1 text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-rose-600 font-medium hover:underline">Create one</Link>
            </p>

            {error && (
              <h2 className="mt-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium">
                {error}
              </h2>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="dr.sharma@clinic.com"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm outline-none transition-colors ${
                      errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-rose-400'
                    }`}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm outline-none transition-colors ${
                      errors.password ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-rose-400'
                    }`}
                  />
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
              >
                {loading ? 'Signing in...' : 'Sign in'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
