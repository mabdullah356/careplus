import { CalendarCheck, CalendarX, Pill, ClipboardList, ShieldCheck, ArrowRight, Clock, Syringe, Package, AlertTriangle, Search, Building, Tag, FlaskConical, Eye, Archive, DollarSign } from 'lucide-react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <main>
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-28 md:py-36">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight">
            Your clinic. Less paperwork, more care.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
            CarePlus handles appointments, confirmations, medicine tracking, and medicare billing &mdash; so your team
            spends time with patients, not on spreadsheets.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 transition-colors shadow-sm"
            >
              Start free trial
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Sign in
            </Link>
          </div>
          <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
              Used by 40+ clinics
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
              12k appointments processed
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
              99.9% uptime
            </span>
          </div>
        </div>
      </section>

      {/* For Patients */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-28">
          <div className="max-w-xl">
            <span className="text-sm font-semibold text-rose-600 uppercase tracking-widest">Patients</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Book, cancel, stay informed.
            </h2>
            <p className="mt-3 text-gray-500 text-lg">
              No phone tag. No showing up to find the doctor is booked solid.
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-2 gap-12">
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <CalendarCheck className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Book online</h3>
                <p className="mt-1.5 text-gray-500 leading-relaxed">
                  See real-time availability and pick a slot that works for you. No account needed to browse doctors.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <CalendarX className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Cancel anytime</h3>
                <p className="mt-1.5 text-gray-500 leading-relaxed">
                  Plans change. Cancel or reschedule online and free up the slot for someone else.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <Syringe className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">View medicine history</h3>
                <p className="mt-1.5 text-gray-500 leading-relaxed">
                  After your visit, see prescribed medicines and past prescriptions in your profile.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Appointment reminders</h3>
                <p className="mt-1.5 text-gray-500 leading-relaxed">
                  Get notified before your visit so you never miss a checkup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Doctors */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-28">
          <div className="max-w-xl">
            <span className="text-sm font-semibold text-rose-600 uppercase tracking-widest">Doctors &amp; Staff</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Own your schedule.
            </h2>
            <p className="mt-3 text-gray-500 text-lg">
              Approve or decline appointment requests and keep your day manageable.
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-2 gap-12">
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Confirm requests</h3>
                <p className="mt-1.5 text-gray-500 leading-relaxed">
                  Review new bookings and confirm them with one click. Patients get notified instantly.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <CalendarX className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Cancel &amp; block slots</h3>
                <p className="mt-1.5 text-gray-500 leading-relaxed">
                  Need to close a time slot? Cancel with automatic patient notification.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Patient history at hand</h3>
                <p className="mt-1.5 text-gray-500 leading-relaxed">
                  View past visits, medicines prescribed, and medicare details before the patient walks in.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <Pill className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Prescribe digitally</h3>
                <p className="mt-1.5 text-gray-500 leading-relaxed">
                  Write prescriptions in the system. The pharmacy and patient get a copy automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medicine & Medicare */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-28">
          <div className="max-w-xl">
            <span className="text-sm font-semibold text-rose-600 uppercase tracking-widest">Medicines</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              Full medicine lifecycle management.
            </h2>
            <p className="mt-3 text-gray-500 text-lg">
              From procurement to prescription, track every medicine that moves through your clinic.
            </p>
          </div>

          {/* Inventory Management */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Package className="w-5 h-5 text-rose-600" />
              Inventory &amp; Stock
            </h3>
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Live stock tracking</h4>
                  <p className="mt-1 text-gray-500 text-sm leading-relaxed">
                    Every tablet, capsule, syrup, and injection is tracked with current quantity, batch number, and
                    supplier details. Stock updates automatically when a prescription is filled.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Low stock alerts</h4>
                  <p className="mt-1 text-gray-500 text-sm leading-relaxed">
                    Set minimum quantity thresholds per medicine. When stock dips below, the system sends an alert so
                    you can reorder before you run out.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <Archive className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Batch &amp; expiry tracking</h4>
                  <p className="mt-1 text-gray-500 text-sm leading-relaxed">
                    Record batch numbers and expiry dates for every shipment. Expired stock is flagged automatically
                    and blocked from dispensing.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Supplier management</h4>
                  <p className="mt-1 text-gray-500 text-sm leading-relaxed">
                    Store supplier contacts, price lists, and lead times. Generate purchase orders directly from low
                    stock alerts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Medicine Categories */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Tag className="w-5 h-5 text-rose-600" />
              Medicine Types &amp; Categories
            </h3>
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <Pill className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Tablets &amp; Capsules</h4>
                  <p className="mt-1 text-gray-500 text-sm leading-relaxed">
                    Track by strength (mg), dosage instructions, and package size. Supports strip, bottle, and blister
                    pack units.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Syrups &amp; Liquids</h4>
                  <p className="mt-1 text-gray-500 text-sm leading-relaxed">
                    Manage by volume (ml), concentration, and bottle quantity. Includes paediatric formulations and
                    suspensions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <Syringe className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Injections &amp; IV fluids</h4>
                  <p className="mt-1 text-gray-500 text-sm leading-relaxed">
                    Track vials, ampoules, IV bags with batch tracking. Cold chain items can be flagged for
                    temperature-sensitive storage.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Topicals &amp; Other forms</h4>
                  <p className="mt-1 text-gray-500 text-sm leading-relaxed">
                    Creams, ointments, drops, inhalers, and patches &mdash; each with custom unit tracking and usage
                    instructions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Prescription & Safety */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-rose-600" />
              Prescriptions &amp; Safety
            </h3>
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Digital prescriptions</h4>
                  <p className="mt-1 text-gray-500 text-sm leading-relaxed">
                    Doctors prescribe with dosage, duration, and notes. The pharmacy fills from a live queue. Patients
                    can download a PDF copy.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Medicine search</h4>
                  <p className="mt-1 text-gray-500 text-sm leading-relaxed">
                    Search by name, brand, category, or symptom. Results show available stock, alternatives, and
                    pricing.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Interaction warnings</h4>
                  <p className="mt-1 text-gray-500 text-sm leading-relaxed">
                    Flag known drug-drug interactions and patient allergies at prescription time so nothing unsafe gets
                    dispensed.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <Tag className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Price &amp; margins</h4>
                  <p className="mt-1 text-gray-500 text-sm leading-relaxed">
                    Set MRP, purchase price, and retail price per medicine. Bills auto-calculate margins and display
                    totals by medicare type.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Medicare Coverage */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-rose-600" />
              Medicare &amp; Billing
            </h3>
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Coverage types</h4>
                  <p className="mt-1 text-gray-500 text-sm leading-relaxed">
                    Supports cash, private insurance, Ayushman Bharat, CGHS, ESI, and state schemes. Each has
                    configurable coverage rules and claim forms.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <CalendarCheck className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Visit-linked billing</h4>
                  <p className="mt-1 text-gray-500 text-sm leading-relaxed">
                    Bills are generated per visit, linking consultation fees, medicines dispensed, and diagnostics.
                    Each bill references the appointment and medicare type.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Claim &amp; reimbursement</h4>
                  <p className="mt-1 text-gray-500 text-sm leading-relaxed">
                    Generate itemised bills suitable for insurance claims. Track which claims have been submitted and
                    which are still pending.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                  <Archive className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Reports &amp; audit</h4>
                  <p className="mt-1 text-gray-500 text-sm leading-relaxed">
                    View medicine consumption reports, expiry loss summaries, billing by medicare type, and monthly
                    revenue breakdowns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
