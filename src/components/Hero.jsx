import Spline from '@splinetool/react-spline';
import { ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[72vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/DtQLjBkD1UpownGS/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/20 via-neutral-950/40 to-neutral-950" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full grid md:grid-cols-2 gap-8">
          <div className="pointer-events-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-emerald-300 text-xs mb-4">
              <ShieldCheck className="size-4" />
              Real-time safety, reimagined
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
              AegisSafe: Advanced Women Safety Companion
            </h1>
            <p className="mt-4 text-white/70 max-w-xl">
              Instant SOS, trusted location sharing, and smart safety insights. Built with privacy-first design and resilient offline fallbacks.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#sos" className="inline-flex items-center justify-center rounded-md bg-emerald-500 hover:bg-emerald-400 text-neutral-900 px-5 py-2.5 font-medium transition-colors">Quick SOS</a>
              <a href="#features" className="inline-flex items-center justify-center rounded-md border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 px-5 py-2.5 font-medium transition-colors">Explore Features</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
