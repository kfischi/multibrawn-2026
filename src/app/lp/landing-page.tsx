'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
  useScroll,
  useInView,
  AnimatePresence,
} from 'framer-motion'
import {
  MessageSquare,
  Calendar,
  BarChart3,
  Zap,
  Moon,
  Sun,
  ArrowDown,
  Bell,
  ClipboardList,
  Heart,
  UserPlus,
  FileText,
  Clock,
  Mail,
  Workflow,
  Phone,
  ExternalLink,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import './styles.css'

// ═══════════════════════════════════════════════════════
// NICHE CONTENT DATA
// ═══════════════════════════════════════════════════════

interface NicheData {
  badge: string
  headline: string
  morphWords: string[]
  subheadline: string
  stats: { value: string; label: string }[]
  calc: {
    title: string
    subtitle: string
    sliders: {
      id: string
      label: string
      min: number
      max: number
      step: number
      initial: number
      prefix?: string
      suffix?: string
    }[]
  }
  features: {
    title: string
    desc: string
    icon: string
    wide?: boolean
  }[]
  cta: {
    headline: string
    sub: string
    button: string
    whatsapp: string
    message: string
  }
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  MessageSquare,
  Calendar,
  BarChart3,
  Zap,
  Bell,
  ClipboardList,
  Heart,
  UserPlus,
  FileText,
  Clock,
  Mail,
  Workflow,
}

const NICHES: Record<string, NicheData> = {
  default: {
    badge: 'AI-Powered Growth',
    headline: 'Your Business Is Bleeding',
    morphWords: ['Money', 'Time', 'Clients', 'Revenue'],
    subheadline:
      'Manual processes, missed leads, and slow responses cost you more than you think. We fix that.',
    stats: [
      { value: '73%', label: 'of leads lost to slow follow-up' },
      { value: '15h', label: 'wasted weekly on manual tasks' },
      { value: '3×', label: 'faster growth with automation' },
    ],
    calc: {
      title: 'Calculate Your Hidden Losses',
      subtitle: 'Move the sliders to see what manual work actually costs you',
      sliders: [
        { id: 'team', label: 'Team Size', min: 1, max: 50, step: 1, initial: 8, suffix: ' people' },
        { id: 'rate', label: 'Average Hourly Cost', min: 20, max: 300, step: 5, initial: 75, prefix: '$' },
        { id: 'hours', label: 'Hours Lost to Manual Work / Week', min: 2, max: 40, step: 1, initial: 12, suffix: ' hrs' },
      ],
    },
    features: [
      { title: 'Lead Capture & Nurture', desc: 'AI chatbots that qualify and route leads around the clock — no human bottleneck', icon: 'MessageSquare', wide: true },
      { title: 'Smart Scheduling', desc: 'Automated booking that eliminates the back-and-forth', icon: 'Calendar' },
      { title: 'Workflow Automation', desc: 'Connect your tools and kill manual data entry forever', icon: 'Workflow' },
      { title: 'Performance Analytics', desc: 'Real-time dashboards that surface only what moves the needle', icon: 'BarChart3', wide: true },
    ],
    cta: {
      headline: 'Ready to Stop the Bleeding?',
      sub: "One conversation. Zero commitment. Let's see what AI can do for your bottom line.",
      button: 'Talk to Us on WhatsApp',
      whatsapp: '972547669122',
      message: 'Hi, I saw your automation page and want to learn how AI can help my business.',
    },
  },
  medical: {
    badge: 'Healthcare Automation',
    headline: 'Your Practice Loses $12K/Month to',
    morphWords: ['No-Shows', 'Admin Tasks', 'Slow Intake', 'Paper Forms'],
    subheadline:
      'AI-powered patient engagement fills schedule gaps, recovers revenue, and frees your front desk.',
    stats: [
      { value: '$12K', label: 'lost monthly to no-shows' },
      { value: '23%', label: 'average no-show rate' },
      { value: '67%', label: 'reduction with AI reminders' },
    ],
    calc: {
      title: 'Calculate Your Practice Losses',
      subtitle: 'See exactly how much no-shows and admin overhead cost your practice',
      sliders: [
        { id: 'team', label: 'Practice Staff', min: 2, max: 30, step: 1, initial: 6, suffix: ' people' },
        { id: 'rate', label: 'Revenue Per Patient Visit', min: 50, max: 500, step: 10, initial: 150, prefix: '$' },
        { id: 'hours', label: 'Hours Lost to Admin / Week', min: 5, max: 40, step: 1, initial: 18, suffix: ' hrs' },
      ],
    },
    features: [
      { title: 'Patient Reminders', desc: 'AI-powered SMS and WhatsApp reminders that cut no-shows by 67%', icon: 'Bell', wide: true },
      { title: 'Smart Intake Forms', desc: 'Digital forms that auto-populate your EMR system', icon: 'ClipboardList' },
      { title: 'Self-Service Booking', desc: '24/7 appointment scheduling without phone calls', icon: 'Calendar' },
      { title: 'Follow-Up Automation', desc: 'Post-visit surveys and care reminders on autopilot', icon: 'Heart', wide: true },
    ],
    cta: {
      headline: 'Your Patients Deserve Better. So Does Your Revenue.',
      sub: "Let us show you exactly how much revenue your practice can recover.",
      button: 'Get Your Free Practice Audit',
      whatsapp: '972547669122',
      message: 'Hi, I run a medical practice and want to learn about reducing no-shows with AI.',
    },
  },
  legal: {
    badge: 'Legal Tech Automation',
    headline: 'Your Firm Bills 1,800 Hours. You Lose 400 to',
    morphWords: ['Admin', 'Data Entry', 'Manual Intake', 'Busywork'],
    subheadline:
      'AI automation reclaims billable hours, accelerates client intake, and makes your team superhuman.',
    stats: [
      { value: '400h', label: 'lost to admin annually per attorney' },
      { value: '$120K', label: 'in unbilled time yearly' },
      { value: '5×', label: 'faster client onboarding' },
    ],
    calc: {
      title: "Calculate Your Firm's Hidden Costs",
      subtitle: "Every hour spent on admin is an hour you can't bill",
      sliders: [
        { id: 'team', label: 'Attorneys & Paralegals', min: 1, max: 30, step: 1, initial: 5, suffix: ' people' },
        { id: 'rate', label: 'Average Billing Rate', min: 100, max: 800, step: 25, initial: 300, prefix: '$' },
        { id: 'hours', label: 'Non-Billable Hours / Week', min: 3, max: 30, step: 1, initial: 10, suffix: ' hrs' },
      ],
    },
    features: [
      { title: 'Client Intake', desc: 'AI-powered intake that qualifies and routes cases in minutes, not days', icon: 'UserPlus', wide: true },
      { title: 'Document Assembly', desc: 'Generate contracts and legal docs from templates in seconds', icon: 'FileText' },
      { title: 'Time Tracking', desc: 'Automatic time capture that never misses a billable minute', icon: 'Clock' },
      { title: 'Client Updates', desc: 'Automated status emails and communication on autopilot', icon: 'Mail', wide: true },
    ],
    cta: {
      headline: 'Bill More Hours. Do Less Admin.',
      sub: 'See how top firms use AI to reclaim 20% of their time.',
      button: 'Get Your Free Firm Audit',
      whatsapp: '972547669122',
      message: 'Hi, I run a law firm and want to learn about AI automation for reducing admin work.',
    },
  },
}

// ═══════════════════════════════════════════════════════
// ANIMATED NUMBER (SPRING PHYSICS)
// ═══════════════════════════════════════════════════════

function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number
  prefix?: string
  suffix?: string
}) {
  const spring = useSpring(0, { stiffness: 75, damping: 25 })
  const display = useTransform(spring, (v) =>
    `${prefix}${Math.round(v).toLocaleString()}${suffix}`
  )
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  useEffect(() => {
    const unsubscribe = display.on('change', (v) => {
      if (ref.current) ref.current.textContent = v
    })
    return unsubscribe
  }, [display])

  return (
    <span ref={ref} className="tabular-nums">
      {`${prefix}${Math.round(value).toLocaleString()}${suffix}`}
    </span>
  )
}

// ═══════════════════════════════════════════════════════
// MICRO-INTERACTION: MAGNETIC BUTTON WRAPPER
// ═══════════════════════════════════════════════════════

function MagneticWrap({
  children,
  className,
  strength = 0.15,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      x.set((e.clientX - rect.left - rect.width / 2) * strength)
      y.set((e.clientY - rect.top - rect.height / 2) * strength)
    },
    [x, y, strength]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════
// MICRO-INTERACTION: SPOTLIGHT HOVER CARD
// ═══════════════════════════════════════════════════════

function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      whileHover={{
        y: -6,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'border border-zinc-200 dark:border-zinc-800',
        'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm',
        'transition-colors duration-300',
        className
      )}
    >
      {hovering && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 250px at ${pos.x}px ${pos.y}px, rgba(255,0,144,0.12), transparent)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════
// MORPHING TEXT (HEADLINE WORD SWAP)
// ═══════════════════════════════════════════════════════

function MorphingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [words.length])

  return (
    <span className="relative inline-flex h-[1.15em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="lp-gradient-text whitespace-nowrap"
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ═══════════════════════════════════════════════════════
// SCROLL-REVEAL WRAPPER
// ═══════════════════════════════════════════════════════

function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════
// NAV (STICKY + GLASSMORPHISM ON SCROLL)
// ═══════════════════════════════════════════════════════

function LandingNav({
  isDark,
  onToggle,
}: {
  isDark: boolean
  onToggle: () => void
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a
          href="https://multibrawn.co.il"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-bold tracking-tight"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-brand-fuchsia">Multi</span>
          <span className="text-zinc-900 dark:text-white">brawn</span>
        </motion.a>

        <MagneticWrap>
          <button
            onClick={onToggle}
            className={cn(
              'p-2.5 rounded-xl transition-colors cursor-pointer',
              'bg-zinc-100 dark:bg-zinc-800',
              'hover:bg-zinc-200 dark:hover:bg-zinc-700',
              'text-zinc-600 dark:text-zinc-400'
            )}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDark ? 'moon' : 'sun'}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </MagneticWrap>
      </div>
    </motion.nav>
  )
}

// ═══════════════════════════════════════════════════════
// HERO SECTION (SCROLL-DRIVEN PARALLAX)
// ═══════════════════════════════════════════════════════

function HeroSection({
  data,
  onScrollDown,
}: {
  data: NicheData
  onScrollDown: () => void
}) {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, 60])

  const stagger = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <motion.section
      style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Grid pattern */}
      <div className="lp-grid-bg absolute inset-0 pointer-events-none" />

      {/* Gradient orbs */}
      <div className="absolute top-[15%] left-[20%] w-[500px] h-[500px] rounded-full bg-brand-fuchsia/[0.06] dark:bg-brand-fuchsia/[0.08] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-brand-purple/[0.06] dark:bg-brand-purple/[0.08] blur-[140px] pointer-events-none" />
      <div className="absolute top-[50%] left-[60%] w-[300px] h-[300px] rounded-full bg-brand-gold/[0.04] blur-[120px] pointer-events-none" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-fuchsia/10 text-brand-fuchsia border border-brand-fuchsia/20 mb-8">
            {data.badge}
          </span>
        </motion.div>

        {/* Headline with morphing text */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          {data.headline}{' '}
          <MorphingText words={data.morphWords} />
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {data.subheadline}
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp} className="mb-16">
          <MagneticWrap className="inline-block">
            <Button size="xl" onClick={onScrollDown} className="group">
              See What You&#39;re Losing
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown size={18} />
              </motion.span>
            </Button>
          </MagneticWrap>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {data.stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{
                y: -4,
                transition: { type: 'spring', stiffness: 400, damping: 20 },
              }}
              className="px-6 py-5 rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/60"
            >
              <div className="text-2xl md:text-3xl font-bold text-brand-fuchsia">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-zinc-300 dark:border-zinc-700 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1.5 h-1.5 rounded-full bg-brand-fuchsia"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

// ═══════════════════════════════════════════════════════
// ROI / LOSS CALCULATOR
// ═══════════════════════════════════════════════════════

function RoiCalculator({ data }: { data: NicheData }) {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {}
    data.calc.sliders.forEach((s) => {
      init[s.id] = s.initial
    })
    return init
  })

  const monthlyLoss =
    (values.team || 1) * (values.rate || 50) * (values.hours || 10) * 4.33
  const annualLoss = monthlyLoss * 12
  const automationCost = 2000
  const annualSavings = annualLoss - automationCost * 12
  const roi = Math.round(
    (annualSavings / (automationCost * 12)) * 100
  )

  const updateValue = (id: string, val: number) => {
    setValues((prev) => ({ ...prev, [id]: val }))
  }

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              {data.calc.title}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl mx-auto">
              {data.calc.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Sliders panel */}
            <div className="space-y-8 p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              {data.calc.sliders.map((slider) => {
                const val = values[slider.id] ?? slider.initial
                const pct =
                  ((val - slider.min) / (slider.max - slider.min)) * 100

                return (
                  <div key={slider.id}>
                    <div className="flex justify-between items-center mb-3">
                      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {slider.label}
                      </label>
                      <motion.span
                        key={val}
                        initial={{ scale: 1.15, color: '#FF0090' }}
                        animate={{ scale: 1, color: '#FF0090' }}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 25,
                        }}
                        className="text-sm font-bold tabular-nums"
                      >
                        {slider.prefix || ''}
                        {val.toLocaleString()}
                        {slider.suffix || ''}
                      </motion.span>
                    </div>
                    <input
                      type="range"
                      min={slider.min}
                      max={slider.max}
                      step={slider.step}
                      value={val}
                      onChange={(e) =>
                        updateValue(slider.id, Number(e.target.value))
                      }
                      className="lp-slider w-full"
                      style={{
                        background: `linear-gradient(to right, #FF0090 0%, #9333EA ${pct}%, var(--lp-slider-track) ${pct}%)`,
                      }}
                    />
                    <div className="flex justify-between mt-1.5 text-[11px] text-zinc-400">
                      <span>
                        {slider.prefix || ''}
                        {slider.min}
                        {slider.suffix || ''}
                      </span>
                      <span>
                        {slider.prefix || ''}
                        {slider.max}
                        {slider.suffix || ''}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Results panel */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 text-white overflow-hidden shadow-2xl">
              {/* Accent glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-fuchsia/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-purple/10 rounded-full blur-[60px] pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Monthly loss */}
                <div>
                  <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Monthly Loss
                  </p>
                  <div className="text-4xl md:text-5xl font-bold text-red-400">
                    <AnimatedNumber value={monthlyLoss} prefix="$" />
                  </div>
                </div>

                <div className="h-px bg-zinc-700/50" />

                {/* Annual loss */}
                <div>
                  <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    Annual Loss
                  </p>
                  <div className="text-3xl font-bold text-red-300/90">
                    <AnimatedNumber value={annualLoss} prefix="$" />
                  </div>
                </div>

                <div className="h-px bg-zinc-700/50" />

                {/* Savings box */}
                <motion.div
                  layout
                  className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
                >
                  <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    With Automation — Annual Savings
                  </p>
                  <div className="text-3xl font-bold text-emerald-400">
                    <AnimatedNumber
                      value={annualSavings > 0 ? annualSavings : 0}
                      prefix="$"
                    />
                  </div>
                  <p className="text-emerald-400/70 text-sm mt-2">
                    ROI:{' '}
                    <span className="font-bold text-emerald-300">
                      {roi > 0 ? roi : 0}%
                    </span>
                  </p>
                </motion.div>

                <p className="text-[11px] text-zinc-600">
                  * Based on ${automationCost.toLocaleString()}/mo automation
                  investment
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// BENTO FEATURES GRID (SPOTLIGHT CARDS)
// ═══════════════════════════════════════════════════════

function BentoFeatures({ data }: { data: NicheData }) {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              What We Automate
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl mx-auto">
              Every tool is designed to remove friction and multiply your output
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.features.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] || Zap

            return (
              <ScrollReveal
                key={i}
                delay={i * 0.08}
                className={feature.wide ? 'md:col-span-2' : ''}
              >
                <SpotlightCard className="h-full">
                  <div className="p-8">
                    <motion.div
                      whileHover={{
                        rotate: [0, -8, 8, 0],
                        transition: { duration: 0.4 },
                      }}
                      className="w-12 h-12 rounded-xl bg-brand-fuchsia/10 flex items-center justify-center mb-5"
                    >
                      <Icon size={22} className="text-brand-fuchsia" />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-50">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// CTA SECTION (WHATSAPP HANDOVER)
// ═══════════════════════════════════════════════════════

function CtaSection({ data }: { data: NicheData }) {
  const waLink = `https://wa.me/${data.cta.whatsapp}?text=${encodeURIComponent(data.cta.message)}`

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-fuchsia/[0.04] to-transparent pointer-events-none" />
      <div className="absolute inset-0 lp-grid-bg pointer-events-none opacity-50" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {data.cta.headline}
          </h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed">
            {data.cta.sub}
          </p>

          {/* WhatsApp CTA button */}
          <MagneticWrap className="inline-block" strength={0.1}>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Button
                  size="xl"
                  className="gap-3 text-lg px-10 shadow-xl shadow-brand-fuchsia/20"
                >
                  <Phone size={20} />
                  {data.cta.button}
                  <ExternalLink
                    size={16}
                    className="opacity-50 group-hover:opacity-100 transition-opacity"
                  />
                </Button>
              </motion.div>
            </a>
          </MagneticWrap>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-zinc-400">
            {['No commitment', 'Free consultation', 'Results in 30 days'].map(
              (item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <Check
                    size={14}
                    className="text-emerald-500 flex-shrink-0"
                  />
                  {item}
                </span>
              )
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════

function LandingFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
        <span>
          &copy; {new Date().getFullYear()}{' '}
          <span className="text-brand-fuchsia font-semibold">Multibrawn</span>.
          All rights reserved.
        </span>
        <a
          href="https://multibrawn.co.il"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand-fuchsia transition-colors"
        >
          multibrawn.co.il
        </a>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════
// SKELETON (CLS PREVENTION)
// ═══════════════════════════════════════════════════════

function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <div className="h-6 w-40 mx-auto rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        <div className="h-16 w-full max-w-2xl mx-auto rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        <div className="h-6 w-2/3 mx-auto rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        <div className="h-14 w-56 mx-auto rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse mt-8" />
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-20 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
// MAIN LANDING PAGE COMPONENT
// ═══════════════════════════════════════════════════════

export default function LandingPage({ niche }: { niche: string }) {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)
  const calcRef = useRef<HTMLDivElement>(null)
  const data = NICHES[niche] || NICHES.default

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem('lp-theme')
      if (saved) {
        setIsDark(saved === 'dark')
      } else {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
      }
    } catch {
      // localStorage unavailable
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem('lp-theme', isDark ? 'dark' : 'light')
    } catch {
      // localStorage unavailable
    }
  }, [isDark, mounted])

  const scrollToCalc = useCallback(() => {
    calcRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div
      className={cn(isDark ? 'dark' : '')}
      dir="ltr"
      lang="en"
      style={{ fontFamily: "'Heebo', 'Inter', system-ui, sans-serif" }}
    >
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-500">
        <LandingNav isDark={isDark} onToggle={() => setIsDark(!isDark)} />

        {!mounted ? (
          <HeroSkeleton />
        ) : (
          <>
            <HeroSection data={data} onScrollDown={scrollToCalc} />
            <div ref={calcRef}>
              <RoiCalculator data={data} />
            </div>
            <BentoFeatures data={data} />
            <CtaSection data={data} />
            <LandingFooter />
          </>
        )}
      </div>
    </div>
  )
}
