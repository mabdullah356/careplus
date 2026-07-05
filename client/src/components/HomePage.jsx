import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CalendarCheck, CalendarX, Pill, ClipboardList, ShieldCheck, ArrowRight, Clock, Syringe,
  Package, AlertTriangle, Search, Building, Tag, FlaskConical, Eye, Archive, DollarSign,
} from 'lucide-react'


const RevealText = ({ children, className, delay = 0, as: Tag = 'span' }) => {
  const words = children.split(' ')
  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0, 1], delay: delay + i * 0.04 }}
          >
            {word}{i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}


const LetterReveal = ({ children, className, delay = 0 }) => {
  const letters = children.split('')
  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20, rotateZ: -8 }}
          whileInView={{ opacity: 1, y: 0, rotateZ: 0 }}
          viewport={{ once: false, margin: '-40px' }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: delay + i * 0.025 }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  )
}


const slideIn = (dir = 'left', delay = 0) => ({
  hidden: { opacity: 0, x: dir === 'left' ? -40 : 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut', delay } },
})

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay } },
})

const scaleIn = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut', delay } },
})


function useInView(options) {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
        else setInView(false)
      },
      { threshold: 0.3, ...options }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, options])
  return [ref, inView]
}


const CountUp = ({ end, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({ once: false })
  const counted = useRef(false)

  useEffect(() => {
    if (!inView || counted.current) return
    counted.current = true
    let start = 0
    const step = Math.ceil(end / (duration * 60))
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(start)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}


const heroStats = [
  { icon: CalendarCheck, label: 'Used by 40+ clinics' },
  { icon: ClipboardList, label: '12k appointments processed' },
  { icon: ShieldCheck, label: '99.9% uptime' },
]

const patientFeatures = [
  { icon: CalendarCheck, title: 'Book online', desc: 'See real-time availability and pick a slot that works for you.', dir: 'left' },
  { icon: CalendarX, title: 'Cancel anytime', desc: 'Cancel or reschedule online and free up the slot for someone else.', dir: 'right' },
  { icon: Syringe, title: 'View medicine history', desc: 'See prescribed medicines and past prescriptions in your profile.', dir: 'left' },
  { icon: Clock, title: 'Appointment reminders', desc: 'Get notified before your visit so you never miss a checkup.', dir: 'right' },
]

const doctorFeatures = [
  { icon: ClipboardList, title: 'Confirm requests', desc: 'Review and confirm bookings with one click. Patients notified instantly.', dir: 'left' },
  { icon: CalendarX, title: 'Cancel & block slots', desc: 'Close time slots with automatic patient notification.', dir: 'right' },
  { icon: ShieldCheck, title: 'Patient history', desc: 'View past visits, medicines, and medicare details before the patient arrives.', dir: 'left' },
  { icon: Pill, title: 'Prescribe digitally', desc: 'Write prescriptions. Pharmacy and patient get copies automatically.', dir: 'right' },
]

const stats = [
  { end: 40, suffix: '+', label: 'Clinics onboarded' },
  { end: 12000, suffix: '+', label: 'Appointments processed' },
  { end: 99, suffix: '.9%', label: 'Uptime' },
  { end: 24, suffix: '/7', label: 'Support' },
]

const medGroups = [
  {
    icon: Package, title: 'Inventory & Stock',
    items: [
      { icon: Package, title: 'Live stock tracking', desc: 'Tracked with batch number, quantity, and supplier.' },
      { icon: AlertTriangle, title: 'Low stock alerts', desc: 'Get notified before you run out.' },
      { icon: Archive, title: 'Batch & expiry', desc: 'Expired stock flagged and blocked.' },
      { icon: Building, title: 'Supplier management', desc: 'Contacts, price lists, purchase orders.' },
    ],
  },
  {
    icon: Tag, title: 'Medicine Types',
    items: [
      { icon: Pill, title: 'Tablets & Capsules', desc: 'Track by strength, dosage, package.' },
      { icon: FlaskConical, title: 'Syrups & Liquids', desc: 'Volume, concentration, paediatric.' },
      { icon: Syringe, title: 'Injections & IV', desc: 'Vials, ampoules, cold chain flags.' },
      { icon: Eye, title: 'Topicals & Other', desc: 'Creams, drops, inhalers, patches.' },
    ],
  },
  {
    icon: ClipboardList, title: 'Prescriptions & Safety',
    items: [
      { icon: ClipboardList, title: 'Digital prescriptions', desc: 'Dosage, duration, live queue.' },
      { icon: Search, title: 'Medicine search', desc: 'Search by name, brand, category.' },
      { icon: AlertTriangle, title: 'Interaction warnings', desc: 'Flag drug interactions & allergies.' },
      { icon: Tag, title: 'Price & margins', desc: 'MRP, purchase, retail — auto-calculated.' },
    ],
  },
  {
    icon: DollarSign, title: 'Medicare & Billing',
    items: [
      { icon: ShieldCheck, title: 'Coverage types', desc: 'Cash, insurance, Ayushman Bharat, CGHS.' },
      { icon: CalendarCheck, title: 'Visit-linked billing', desc: 'Links to consultation & diagnostics.' },
      { icon: DollarSign, title: 'Claim tracking', desc: 'Itemised bills for claims.' },
      { icon: Archive, title: 'Reports & audit', desc: 'Consumption, expiry, revenue breakdowns.' },
    ],
  },
]

const HomePage = () => {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 70])

  return (
    <main>

      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop')] bg-cover bg-center"
          style={{ scale: bgScale }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <motion.div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" style={{ opacity: overlayOpacity }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full">
          <motion.div style={{ y: heroY }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="text-rose-300 border-rose-700 bg-rose-950/40 mb-5">
                Clinic Management Platform
              </Badge>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
              <RevealText>Your clinic.</RevealText>
              <br />
              <span className="text-rose-300">
                <RevealText delay={0.3}>Less paperwork,</RevealText>
              </span>
              <br />
              <RevealText delay={0.6}>more care.</RevealText>
            </h1>

            <motion.p
              className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Appointments, medicine tracking, prescriptions, and medicare billing &mdash; so your team
              spends time with patients, not on spreadsheets.
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/25">
              <Link to="/signup">
                Start free trial
                <ArrowRight className="ml-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/20  hover:bg-white/10">
              <Link to="/login">Sign in</Link>
            </Button>
          </motion.div>

          <motion.div
            className="mt-16 flex flex-wrap gap-x-8 gap-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            {heroStats.map((s, i) => (
              <motion.span
                key={s.label}
                className="flex items-center gap-2 text-sm text-gray-400"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.6 + i * 0.12 }}
              >
                <s.icon className="w-4 h-4 text-rose-400" />
                {s.label}
              </motion.span>
            ))}
          </motion.div>
        </div>


        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          <motion.div
            className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-white/60 rounded-full mt-1.5"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </section>


      <section className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-28 md:py-36">
          <motion.div
            className="max-w-xl"
            variants={slideIn('left')}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-80px' }}
          >
            <Badge variant="outline" className="text-rose-600 border-rose-200 mb-4">Patients</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              <RevealText>Book, cancel, stay informed.</RevealText>
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">
              No phone tag. No showing up to find the doctor is booked solid.
            </p>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-2 gap-10">
            {patientFeatures.map((f, i) => {
              const vars = slideIn(f.dir, i * 0.1)
              return (
                <motion.div
                  key={f.title}
                  className="flex gap-5 group"
                  variants={vars}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: '-60px' }}
                >
                  <div className="shrink-0 w-12 h-12 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-center group-hover:border-rose-300 group-hover:bg-rose-100 group-hover:scale-110 group-hover:rotate-[4deg] transition-all duration-200">
                    <f.icon className="w-5 h-5 text-rose-600" />
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>


      <section className="bg-primary relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-rose-700"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ originX: 0 }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={scaleIn(i * 0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground">
                  <CountUp end={stat.end} suffix={stat.suffix} duration={2} />
                </div>
                <div className="mt-1 text-sm text-rose-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="bg-muted/30 border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-28 md:py-36">
          <motion.div
            className="max-w-xl"
            variants={slideIn('right')}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-80px' }}
          >
            <Badge variant="outline" className="text-rose-600 border-rose-200 mb-4">Doctors &amp; Staff</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              <RevealText>Own your schedule.</RevealText>
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Approve or decline appointment requests and keep your day manageable.
            </p>
          </motion.div>
          <div className="mt-14 grid md:grid-cols-2 gap-10">
            {doctorFeatures.map((f, i) => {
              const vars = slideIn(f.dir, i * 0.1)
              return (
                <motion.div
                  key={f.title}
                  className="flex gap-5 group"
                  variants={vars}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: '-60px' }}
                >
                  <div className="shrink-0 w-12 h-12 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-center group-hover:border-rose-300 group-hover:bg-rose-100 group-hover:scale-110 group-hover:rotate-[4deg] transition-all duration-200">
                    <f.icon className="w-5 h-5 text-rose-600" />
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>


      <section className="h-[55vh] bg-[url('https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=2072&auto=format&fit=crop')] bg-fixed bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <motion.div
            className="max-w-2xl text-center"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="text-white text-xl md:text-3xl font-light italic leading-relaxed">
              &ldquo;CarePlus transformed how we manage our clinic. Patients love the ease of booking.&rdquo;
            </p>
            <motion.p
              className="mt-5 text-rose-300 text-sm font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              &mdash; Dr. Priya Sharma, City Medical Centre
            </motion.p>
          </motion.div>
        </div>
      </section>


      <section className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-28 md:py-36">
          <motion.div
            className="max-w-xl"
            variants={slideIn('left')}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-80px' }}
          >
            <Badge variant="outline" className="text-rose-600 border-rose-200 mb-4">Medicines</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              <RevealText>Full medicine lifecycle management.</RevealText>
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">
              From procurement to prescription, track every medicine that moves through your clinic.
            </p>
          </motion.div>

          {medGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              className="mt-16"
              variants={fadeUp(gi * 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: '-60px' }}
            >
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 hover:translate-x-1 transition-transform duration-200">
                <group.icon className="w-5 h-5 text-rose-600" />
                {group.title}
              </h3>
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                {group.items.map((item, ii) => (
                  <motion.div
                    key={item.title}
                    className="flex gap-4 group"
                    variants={fadeUp(ii * 0.05)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: '-40px' }}
                  >
                    <div className="shrink-0 w-10 h-10 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-center group-hover:border-rose-300 group-hover:bg-rose-100 group-hover:scale-110 group-hover:rotate-[4deg] transition-all duration-200">
                      <item.icon className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{item.title}</h4>
                      <p className="mt-0.5 text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      <section className="bg-foreground relative overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-rose-600/5 rounded-full -translate-y-1/2 translate-x-1/2"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 bg-rose-600/5 rounded-full translate-y-1/2 -translate-x-1/2"
          animate={{ scale: [1, 1.3, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-background tracking-tight">
            <LetterReveal>Ready to simplify your clinic?</LetterReveal>
          </h2>
          <motion.p
            className="mt-4 text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Join 40+ clinics already using CarePlus.
          </motion.p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/25 hover:scale-[1.04] active:scale-[0.96] transition-all duration-150">
              <Link to="/signup">
                Get started free
                <ArrowRight className="ml-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
