import { Stethoscope, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const linkList = (items) =>
  items.map((item, i) => (
    <li key={i}>
      <Link to={item.to || '/'} className="hover:text-white transition-colors">{item.label}</Link>
    </li>
  ))

const patientLinks = [
  { label: 'Book Appointment' },
  { label: 'View Medicines' },
  { label: 'Prescription History' },
  { label: 'Medicare Info' },
]

const clinicLinks = [
  { label: 'Doctor Dashboard' },
  { label: 'Appointment Queue' },
  { label: 'Medicine Inventory' },
  { label: 'Billing & Reports' },
]

const contactItems = [
  {
    icon: MapPin,
    wrapperClass: 'items-start',
    content: (
      <a href="https://maps.google.com/?q=Faislabad+Jarawala+Road+209+Patak" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
        Faislabad Jarawala Road, 209 Patak
      </a>
    ),
  },
  {
    icon: Phone,
    wrapperClass: 'items-center',
    content: <a href="#" className="hover:text-white transition-colors">+91 12345 67890</a>,
  },
  {
    icon: Mail,
    wrapperClass: 'items-center',
    content: <a href="#" className="hover:text-white transition-colors">contact@careplus.in</a>,
  },
  {
    icon: Clock,
    wrapperClass: 'items-start',
    content: <span>Mon &ndash; Sat: 9 AM &ndash; 8 PM<br />Sun: 9 AM &ndash; 2 PM</span>,
  },
]

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-rose-500">
              <Stethoscope className="w-6 h-6" />
              CarePlus
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              Clinic management platform for appointments, medicines, and medicare billing.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Patients</h3>
            <ul className="mt-4 space-y-2.5 text-sm">{linkList(patientLinks)}</ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Clinic</h3>
            <ul className="mt-4 space-y-2.5 text-sm">{linkList(clinicLinks)}</ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {contactItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <li key={i} className={`flex gap-2 ${item.wrapperClass === 'items-start' ? 'items-start' : 'items-center'}`}>
                    <Icon className={`w-4 h-4 shrink ${item.wrapperClass === 'items-start' ? 'mt-0.5' : ''}`} />
                    {item.content}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} CarePlus. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
