import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, PhoneCall, ShieldCheck } from 'lucide-react';

export default function SOSPanel() {
  const [armed, setArmed] = useState(true);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);
  const [shareLocation, setShareLocation] = useState(true);
  const [recordAudio, setRecordAudio] = useState(true);
  const [autoMessage, setAutoMessage] = useState(true);
  const [log, setLog] = useState([]);
  const timerRef = useRef(null);
  const holdRef = useRef(null);

  function addLog(entry) {
    setLog((l) => [{ id: Date.now(), ...entry }, ...l].slice(0, 6));
  }

  const triggerSOS = () => {
    // Vibrate if supported
    if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
    setActive(true);
    setArmed(false);

    addLog({ level: 'warn', text: 'SOS triggered' });

    if (shareLocation && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          addLog({ level: 'info', text: `Location shared: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}` });
        },
        () => addLog({ level: 'error', text: 'Location sharing failed' }),
        { enableHighAccuracy: true, timeout: 4000 }
      );
    }

    if (recordAudio) {
      addLog({ level: 'info', text: 'Background audio recording requested' });
    }

    if (autoMessage) {
      addLog({ level: 'info', text: 'Auto-message sent to trusted contacts' });
    }
  };

  const startHold = () => {
    if (!armed) return;
    clearInterval(holdRef.current);
    setProgress(0);
    let p = 0;
    holdRef.current = setInterval(() => {
      p += 2; // 100% in ~1s
      setProgress(p);
      if (p >= 100) {
        clearInterval(holdRef.current);
        triggerSOS();
      }
    }, 20);
  };

  const cancelHold = () => {
    clearInterval(holdRef.current);
    setProgress(0);
  };

  // auto cool-down timer to re-arm after some time
  useEffect(() => {
    clearTimeout(timerRef.current);
    if (active) {
      timerRef.current = setTimeout(() => {
        setActive(false);
        setArmed(true);
        addLog({ level: 'info', text: 'System re-armed' });
      }, 12000);
    }
    return () => clearTimeout(timerRef.current);
  }, [active]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-xl font-semibold">Emergency SOS</h3>
        <p className="text-sm text-white/70 mt-1">Press and hold to trigger a secure SOS with safeguards against accidental activation.</p>

        <div className="mt-6 flex items-center justify-center">
          <div className="relative">
            <button
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
              onTouchStart={startHold}
              onTouchEnd={cancelHold}
              className={`relative size-40 rounded-full flex items-center justify-center select-none transition-transform active:scale-95 border ${active ? 'bg-red-500 text-white border-red-400/50' : 'bg-emerald-500 text-neutral-900 border-emerald-400/50'}`}
              aria-label="Hold to trigger SOS"
            >
              <div className="text-center">
                {active ? (
                  <div className="flex flex-col items-center">
                    <AlertTriangle className="size-6 mb-1" />
                    <span className="font-bold text-lg tracking-wide">SOS SENT</span>
                    <span className="text-xs opacity-80">Re-arming shortly</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <ShieldCheck className="size-6 mb-1" />
                    <span className="font-bold text-lg tracking-wide">HOLD</span>
                    <span className="text-xs opacity-80">To Send SOS</span>
                  </div>
                )}
              </div>

              {!active && (
                <svg className="absolute inset-0" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" stroke="rgba(255,255,255,0.15)" strokeWidth="6" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    stroke="rgb(16,185,129)"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="289"
                    strokeDashoffset={289 - (progress / 100) * 289}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 40ms linear' }}
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          <Toggle label="Share location" enabled={shareLocation} onChange={setShareLocation} />
          <Toggle label="Record audio" enabled={recordAudio} onChange={setRecordAudio} />
          <Toggle label="Auto message" enabled={autoMessage} onChange={setAutoMessage} />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => {
              addLog({ level: 'info', text: 'Test alert dispatched (no contacts configured)' });
              if (navigator.vibrate) navigator.vibrate(40);
            }}
            className="rounded-md border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm"
          >
            Send Test Alert
          </button>
          <button
            onClick={() => addLog({ level: 'info', text: 'Calling emergency hotline (simulated)' })}
            className="inline-flex items-center gap-2 rounded-md bg-emerald-500 hover:bg-emerald-400 text-neutral-900 px-4 py-2 text-sm"
          >
            <PhoneCall className="size-4" />
            Call Emergency
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h4 className="font-semibold">Activity</h4>
        <p className="text-sm text-white/70">Recent security events and system updates.</p>
        <div className="mt-4 space-y-2 max-h-[320px] overflow-auto pr-1">
          {log.length === 0 && (
            <div className="text-sm text-white/60">No activity yet. Hold the button to simulate an SOS.</div>
          )}
          {log.map((e) => (
            <LogItem key={e.id} entry={e} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Toggle({ label, enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`group flex items-center justify-between gap-4 rounded-lg border border-white/10 px-3 py-2 text-sm ${enabled ? 'bg-emerald-500/15 text-emerald-300' : 'bg-white/5 text-white/80 hover:bg-white/10'}`}
      aria-pressed={enabled}
    >
      <span>{label}</span>
      <span className={`inline-flex h-5 w-9 items-center rounded-full transition-colors ${enabled ? 'bg-emerald-500/60' : 'bg-white/15'}`}>
        <span className={`h-4 w-4 rounded-full bg-white transition-transform translate-x-0 ${enabled ? 'translate-x-4' : ''}`} />
      </span>
    </button>
  );
}

function LogItem({ entry }) {
  const color = entry.level === 'error' ? 'text-red-300' : entry.level === 'warn' ? 'text-yellow-300' : 'text-emerald-300';
  return (
    <div className="flex items-start gap-3 rounded-md border border-white/10 bg-neutral-900/60 px-3 py-2">
      {entry.level === 'warn' ? (
        <AlertTriangle className={`size-4 mt-0.5 ${color}`} />
      ) : entry.level === 'error' ? (
        <AlertTriangle className={`size-4 mt-0.5 ${color}`} />
      ) : (
        <ShieldCheck className={`size-4 mt-0.5 ${color}`} />
      )}
      <div className="text-sm">
        <div className="text-white/90">{entry.text}</div>
        <div className="text-white/50 text-[11px]">{new Date(entry.id).toLocaleTimeString()}</div>
      </div>
    </div>
  );
}
