import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import SafetyMap from './components/SafetyMap';
import SOSPanel from './components/SOSPanel';

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded bg-emerald-500/20 border border-emerald-400/30" />
            <span className="font-semibold tracking-tight">AegisSafe</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#map" className="hover:text-white">Map</a>
            <a href="#sos" className="hover:text-white">SOS</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <section id="features" className="max-w-7xl mx-auto px-4 py-16">
          <FeatureGrid />
        </section>
        <section id="map" className="max-w-7xl mx-auto px-4 py-16">
          <SafetyMap />
        </section>
        <section id="sos" className="max-w-7xl mx-auto px-4 py-16">
          <SOSPanel />
        </section>
      </main>

      <footer className="border-t border-white/10 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 text-sm text-white/60">
          <p>© {new Date().getFullYear()} AegisSafe. Empowering safety through technology.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
