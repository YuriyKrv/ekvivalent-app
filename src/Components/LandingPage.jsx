import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Work } from "@/components/work"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-green-500/30">
      <Navbar />
      <Hero />
      <Services />
      <Work />

      <section id="contact" className="py-32 relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-8 tracking-tight text-balance md:text-5xl">
            Готові перейти на <span className="text-gradient">новий рівень агробізнесу?</span>
          </h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Приєднуйтесь до Ekvivalent та керуйте запасами, угодами та логістикою в одному місці.
          </p>
          <a
            href="https://ekvivalent-app.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-green-500 text-white rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(34,197,94,0.4)]"
          >
            Розпочати роботу
          </a>
        </div>

        {/* Background Gradient for CTA */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-green-900/20 to-transparent pointer-events-none" />
      </section>

      <Footer />
    </main>
  )
}