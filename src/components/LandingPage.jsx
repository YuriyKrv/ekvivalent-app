"use client"

import React, { useState, useEffect } from "react"
import { Menu, X, ArrowRight, Wallet, TrendingUp, ShoppingCart, Shield, Truck, LineChart, Mail } from "lucide-react"

// Utility function
function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

// GlassCard Component
function GlassCard({ children, className, hoverEffect = true }) {
  return (
    <div
      className={cn(
        "bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-3xl p-8 relative overflow-hidden group",
        hoverEffect && "hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {children}
    </div>
  )
}

// Navbar Component
function Navbar({ onStart }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Модулі", href: "#services" },
    { name: "Переваги", href: "#work" },
    { name: "Про нас", href: "#about" },
    { name: "Контакти", href: "#contact" },
  ]

  return (
    <nav
      className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6", isScrolled ? "py-4" : "py-6")}
    >
      <div className="max-w-7xl mx-auto rounded-full transition-all duration-300 flex items-center justify-between px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
        <a href="/" className="text-2xl font-bold tracking-tighter relative z-50 text-white">
          Ekvivalent<span className="text-blue-500">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={onStart}
            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Розпочати
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden relative z-50 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 flex items-center justify-center md:hidden">
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-light text-white hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onStart()
                }}
                className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Розпочати
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Hero Component
function Hero({ onStart }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[120px] animate-[blob_7s_infinite] mix-blend-screen" />
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-green-600/20 rounded-full blur-[120px] animate-[blob_7s_infinite] [animation-delay:2s] mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] bg-blue-500/20 rounded-full blur-[120px] animate-[blob_7s_infinite] [animation-delay:4s] mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
            Інноваційна платформа для всіх учасників агроіндустрії
          </span>
        </div>

        <h1 className="font-bold tracking-tighter mb-8">
          <div className="text-6xl md:text-8xl lg:text-[10rem] text-balance mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-600 to-green-500">
              EKVIVALENT
            </span>
          </div>
          <div className="text-4xl md:text-5xl lg:text-6xl text-white/90 text-balance">Рушій твоїх можливостей в агробізнесі</div>
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed text-balance">
          Зерновий гаманець для управління запасами, трейдинговий термінал, маркетплейс товарообміну, модуль хеджування
          цінових ризиків та планування логістики в одній платформі.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onStart}
            className="group relative px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2 text-base">
              Переглянути модулі <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-full font-semibold text-lg text-white hover:bg-white/10 transition-all hover:scale-105">
            Зв'язатися з нами
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-white/40 uppercase tracking-widest">Прокрутити</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
      </div>
    </section>
  )
}

// Services Component - ПОВЕРНУТО ДО ОРИГІНАЛЬНОГО ВИГЛЯДУ (ТІЛЬКИ ІКОНКИ)
function Services() {
  const services = [
    {
      icon: <Wallet className="w-8 h-8 text-blue-400" />,
      title: "Grain Wallet",
      description:
        "Цифровий гаманець для управління запасами зерна. Відслідковуйте обсяги, якість та вартість у реальному часі на всіх елеваторах.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
      title: "Трейдинговий термінал",
      description:
        "Професійний інтерфейс для аналізу ринкових цін, відслідковування котирувань та управління портфелем.",
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-blue-500" />,
      title: "Маркетплейс",
      description:
        "Обмінюйте зерно на добрива, паливо, насіння та ЗЗР напряму з виробниками. Швидко та без посередників.",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "Хеджування цін",
      description:
        "Інвестиційний модуль для захисту від цінових ризиків та оптимізації фінансової стратегії вашого бізнесу.",
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-400" />,
      title: "Планування логістики",
      description: "Розрахунок оптимальних маршрутів, планування поставок та контроль витрат на транспортування.",
    },
    {
      icon: <LineChart className="w-8 h-8 text-green-400" />,
      title: "Аналітика та звіти",
      description: "Ринкові індикатори, прогнозування врожаю, детальна аналітика для прийняття обґрунтованих рішень.",
    },
  ]

  return (
    <section id="services" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Модулі платформи</h2>
          <div className="h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full w-[100px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <GlassCard key={index} className="h-full flex flex-col justify-between">
              <div>
                <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:bg-white/10 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-white/60 leading-relaxed">{service.description}</p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm font-medium text-white/40 group-hover:text-white transition-colors">
                Дізнатися більше <div className="w-4 h-[1px] bg-current transition-all group-hover:w-8" />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// Work Component - ОНОВЛЕНО З ФОТО (ТОРГОВИЙ ТЕРМІНАЛ + БАНКІВСЬКІ ДІАГРАМИ + ЛОГІСТИКА)
function Work() {
  const projects = [
    {
      title: "Grain Wallet & Трейдинг",
      category: "Управління активами",
      // Фото фінансового дашборду/терміналу
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop", 
      description:
        "Повний контроль над запасами зерна в цифровому форматі. Відслідковуйте обсяги, вартість та локації в реальному часі.",
    },
    {
      title: "Швидкі розрахунки",
      category: "Фінтех інтеграції",
      // ОНОВЛЕНО: Фото банківських діаграм та рахунків
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2000&auto=format&fit=crop",
      description:
        "Миттєві транзакції та розрахунки через платформу. Обмін зерна на ресурси без затримок та посередників.",
    },
    {
      title: "Оптимальна логістика",
      category: "Планування маршрутів",
      // Фото залізничних вагонів (вантажний потяг)
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2000&auto=format&fit=crop",
      description:
        "Розрахунок найефективніших маршрутів доставки з урахуванням витрат та часу. Повна прозорість логістики.",
    },
  ]

  return (
    <section id="work" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Ключові переваги</h2>
            <p className="text-xl text-white/60 max-w-md">Що робить Ekvivalent унікальною платформою для агробізнесу</p>
          </div>
          <button className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm font-medium">
            Всі можливості
          </button>
        </div>

        <div className="space-y-20">
          {projects.map((project, index) => (
            <GlassCard key={index} className="p-0 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-12 flex flex-col justify-center relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-sm font-medium text-white/50 mb-4 block uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-bold mb-6 group-hover:translate-x-2 transition-transform duration-500">
                      {project.title}
                    </h3>
                    <p className="text-white/70 mb-8 max-w-md leading-relaxed">{project.description}</p>
                  </div>
                </div>
                <div className="relative h-[400px] md:h-auto overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="relative pt-32 pb-12 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <a href="/" className="text-2xl font-bold tracking-tighter mb-6 block">
              Ekvivalent<span className="text-blue-500">.</span>
            </a>
            <p className="text-white/50 leading-relaxed">
              Інноваційна B2B платформа для агробізнесу з модулями трейдингу, маркетплейсу та логістики.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Навігація</h4>
            <ul className="space-y-4 text-white/60">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Модулі
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">
                  Переваги
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Про нас
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Контакти
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Модулі</h4>
            <ul className="space-y-4 text-white/60">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Grain Wallet
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Трейдинговий термінал
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Маркетплейс
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Хеджування цін
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Контакти</h4>
            <p className="text-white/60 mb-4">Є питання? Зв'яжіться з нами</p>
            <a
              href="mailto:info@ekvivalent.ua"
              className="text-lg font-medium hover:text-green-400 transition-colors flex items-center gap-2 mb-3"
            >
              <Mail className="w-4 h-4" />
              info@ekvivalent.com
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm text-white/40">
          <p>&copy; 2025 Ekvivalent. Всі права захищено.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Політика конфіденційності
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Умови використання
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Landing Page Component
export default function LandingPage({ onStart }) {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-green-500/30">
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>

      <Navbar onStart={onStart} />
      <Hero onStart={onStart} />
      <Services />
      <Work />

      <section id="contact" className="py-32 relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-8 tracking-tight text-balance md:text-5xl">
            Готові перейти на{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-600 to-green-500">
              новий рівень агробізнесу?
            </span>
          </h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Приєднуйтесь до Ekvivalent та керуйте запасами, угодами та логістикою в одному місці.
          </p>
          <button
            onClick={onStart}
            className="inline-block px-10 py-5 bg-green-500 text-white rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(34,197,94,0.4)]"
          >
            Розпочати роботу
          </button>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-green-900/20 to-transparent pointer-events-none" />
      </section>

      <Footer />
    </main>
  )
}