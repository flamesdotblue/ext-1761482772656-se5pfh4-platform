import { useEffect, useMemo, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

export default function SafetyMap() {
  const [showHeat, setShowHeat] = useState(true);
  const [routeMode, setRouteMode] = useState('safe');
  const [pins, setPins] = useState([]);

  useEffect(() => {
    // Generate demo pins (incidents) deterministically per mount
    const seedPins = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: randomInRange(10, 90),
      y: randomInRange(10, 80),
      severity: Math.random() > 0.7 ? 'high' : 'med',
    }));
    setPins(seedPins);
  }, []);

  const route = useMemo(() => {
    // Mock up two route options: safe (longer) and fast (shorter crossing heat)
    const base = [
      { x: 8, y: 82 },
      { x: 20, y: 60 },
      { x: 40, y: 55 },
      { x: 60, y: 45 },
      { x: 80, y: 25 },
      { x: 92, y: 18 },
    ];

    const safer = base.map((p, i) => ({ x: p.x, y: p.y - (i % 2 === 0 ? 6 : 0) }));
    const faster = base.map((p, i) => ({ x: p.x + (i % 2 ? 4 : 0), y: p.y + (i % 2 ? 4 : 0) }));
    return routeMode === 'safe' ? safer : faster;
  }, [routeMode]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold">Safety Map</h3>
          <p className="text-white/70 text-sm">Simulated safety visualization with demo incidents and safer routing.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHeat((s) => !s)} className="rounded-md border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-sm">
            {showHeat ? 'Hide' : 'Show'} Heatmap
          </button>
          <button onClick={() => setRouteMode((m) => (m === 'safe' ? 'fast' : 'safe'))} className="inline-flex items-center gap-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-neutral-900 px-3 py-1.5 text-sm">
            <Navigation className="size-4" /> {routeMode === 'safe' ? 'Safer Route' : 'Faster Route'}
          </button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
        <svg viewBox="0 0 100 90" className="block w-full h-[48vh]">
          {/* background grid */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="heatHigh" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(248,113,113,0.55)" />
              <stop offset="100%" stopColor="rgba(248,113,113,0)" />
            </radialGradient>
            <radialGradient id="heatMed" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(250,204,21,0.45)" />
              <stop offset="100%" stopColor="rgba(250,204,21,0)" />
            </radialGradient>
          </defs>

          <rect x="0" y="0" width="100" height="90" fill="url(#grid)" />

          {showHeat && (
            <g>
              {pins.map((p) => (
                <circle key={p.id} cx={p.x} cy={p.y} r={8} fill={`url(#${p.severity === 'high' ? 'heatHigh' : 'heatMed'})`} />
              ))}
            </g>
          )}

          {/* route */}
          <polyline
            points={route.map((p) => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke={routeMode === 'safe' ? 'rgb(52,211,153)' : 'rgba(255,255,255,0.7)'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* start and end pins */}
          <g>
            <circle cx="8" cy="82" r="2.2" fill="rgb(52,211,153)" />
            <circle cx="92" cy="18" r="2.2" fill="rgb(52,211,153)" />
          </g>

          {/* incident markers */}
          {pins.map((p) => (
            <g key={`pin-${p.id}`}>
              <circle cx={p.x} cy={p.y} r={1.5} fill={p.severity === 'high' ? 'rgb(248,113,113)' : 'rgb(250,204,21)'} />
            </g>
          ))}
        </svg>

        {/* legend */}
        <div className="absolute bottom-3 left-3 flex items-center gap-3 text-xs bg-black/40 backdrop-blur px-3 py-2 rounded-md border border-white/10">
          <div className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-emerald-400" /> Safer Route
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-white/70" /> Faster Route
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-yellow-400" /> Medium Risk
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block size-2 rounded-full bg-red-400" /> High Risk
          </div>
        </div>

        <div className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-md bg-black/40 backdrop-blur px-3 py-1.5 border border-white/10 text-xs">
          <MapPin className="size-3.5" /> Demo data
        </div>
      </div>
    </div>
  );
}
