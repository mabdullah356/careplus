import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarCheck, CalendarX, Clock, User, Stethoscope, Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import axios from 'axios'
import { toast } from 'react-toastify'

const api = axios.create()
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const statusBadge = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-green-50 text-green-700 border-green-200',
  completed: 'bg-blue-50 text-blue-700 border-blue-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
}

const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ doctorId: '', date: '', time: '', reason: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (!token || !storedUser) {
      navigate('/login')
      return
    }
    try {
      setUser(JSON.parse(storedUser))
    } catch {
      setUser(storedUser)
    }
  }, [navigate])

  useEffect(() => {
    if (!user) return
    const token = localStorage.getItem('token')
    if (!token) return

    const fetchData = async () => {
      try {
        const [apptRes, docRes] = await Promise.all([
          api.get('/api/v1/appointment'),
          api.get('/api/v1/doctor'),
        ])
        setAppointments(apptRes.data.appointments || [])
        setDoctors(docRes.data.doctors || [])
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          navigate('/login')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user, navigate])

  const handleConfirm = async (id) => {
    try {
      await api.patch(`/api/v1/appointment/${id}/confirm`)
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: 'confirmed' } : a))
      )
      toast.success('Appointment confirmed')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to confirm')
    }
  }

  const handleCancel = async (id) => {
    try {
      await api.patch(`/api/v1/appointment/${id}/cancel`)
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: 'cancelled' } : a))
      )
      toast.success('Appointment cancelled')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel')
    }
  }

  const handleBook = async (e) => {
    e.preventDefault()
    if (!form.doctorId || !form.date || !form.time) return
    setSubmitting(true)
    try {
      const res = await api.post('/api/v1/appointment/book', form)
      setAppointments((prev) => [res.data.appointment, ...prev])
      setShowForm(false)
      setForm({ doctorId: '', date: '', time: '', reason: '' })
      toast.success('Appointment booked!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to book')
    } finally {
      setSubmitting(false)
    }
  }

  if (!user) return null

  const role = user.role || 'patient'

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {appointments.length} appointment{appointments.length !== 1 ? 's' : ''}
            </p>
          </div>
          {role === 'patient' && (
            <Button onClick={() => setShowForm(!showForm)} className="bg-rose-600 hover:bg-rose-700 text-white cursor-pointer">
              <Plus className="w-4 h-4 mr-1" />
              Book Appointment
            </Button>
          )}
        </div>

        {showForm && role === 'patient' && (
          <form onSubmit={handleBook} className="mt-6 p-6 bg-white border border-gray-200 rounded-xl">
            <h3 className="text-base font-semibold text-gray-900 mb-4">New Appointment</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                <select
                  value={form.doctorId}
                  onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-rose-400 transition-colors bg-white"
                  required
                >
                  <option value="">Select doctor</option>
                  {doctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.userId?.name || 'Doctor'} {doc.specialty ? `(${doc.specialty})` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-rose-400 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-rose-400 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason (optional)</label>
                <input
                  type="text"
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  placeholder="Checkup, follow-up..."
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-rose-400 transition-colors"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <Button type="submit" disabled={submitting} className="bg-rose-600 hover:bg-rose-700 text-white cursor-pointer">
                {submitting ? 'Booking...' : 'Book'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="cursor-pointer">
                Cancel
              </Button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="mt-10 flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-rose-500 animate-spin" />
          </div>
        ) : appointments.length === 0 ? (
          <div className="mt-10 text-center py-20 bg-white border border-gray-200 rounded-xl">
            <CalendarCheck className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="mt-3 text-gray-500">No appointments yet.</p>
            {role === 'patient' && (
              <Button onClick={() => setShowForm(true)} className="mt-4 bg-rose-600 hover:bg-rose-700 text-white cursor-pointer">
                Book your first appointment
              </Button>
            )}
          </div>
        ) : (
          <div className="mt-6 bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/80">
                    <th className="text-left px-4 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">
                      {role === 'doctor' ? 'Patient' : 'Doctor'}
                    </th>
                    <th className="text-left px-4 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">Date</th>
                    <th className="text-left px-4 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">Time</th>
                    <th className="text-left px-4 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">Reason</th>
                    <th className="text-left px-4 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">Status</th>
                    <th className="text-right px-4 py-3.5 font-medium text-gray-500 text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {appointments.map((apt) => {
                    const person = role === 'doctor' ? apt.patientId?.userId : apt.doctorId?.userId
                    const personName = role === 'doctor'
                      ? apt.patientId?.userId?.name || 'Patient'
                      : apt.doctorId?.userId?.name || 'Doctor'
                    const specialty = apt.doctorId?.specialty

                    return (
                      <tr key={apt._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center">
                              {role === 'doctor' ? (
                                <User className="w-4 h-4 text-rose-500" />
                              ) : (
                                <Stethoscope className="w-4 h-4 text-rose-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{personName}</p>
                              {specialty && (
                                <p className="text-xs text-gray-400">{specialty}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-gray-700">
                          {new Date(apt.date).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="inline-flex items-center gap-1 text-gray-700">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            {apt.time}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-gray-500 max-w-[160px] truncate">
                          {apt.reason || '—'}
                        </td>
                        <td className="px-4 py-3.5">
                          <Badge variant="outline" className={statusBadge[apt.status] || ''}>
                            {apt.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {role === 'doctor' && apt.status === 'pending' && (
                              <Button
                                size="sm"
                                onClick={() => handleConfirm(apt._id)}
                                className="bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                              >
                                <CalendarCheck className="w-3.5 h-3.5 mr-1" />
                                Confirm
                              </Button>
                            )}
                            {(apt.status === 'pending' || apt.status === 'confirmed') && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCancel(apt._id)}
                                className="border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
                              >
                                <CalendarX className="w-3.5 h-3.5 mr-1" />
                                Cancel
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Dashboard
