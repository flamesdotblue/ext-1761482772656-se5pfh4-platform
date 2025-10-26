import { ShieldCheck, MapPin, PhoneCall, Bell, MessageSquare, Navigation, Mic, Camera, AlertTriangle, Clock } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Panic SOS with Safeguards',
    desc: 'Long-press SOS to avoid accidental triggers, auto-calls trusted contacts, and sends live location with a safety code word.'
  },
  {
    icon: MapPin,
    title: 'Live Location & Geo-fencing',
    desc: 'Share your live route with select contacts and set safe zones. Get alerts on entry/exit and delayed arrivals.'
  },
  {
    icon: Navigation,
    title: 'Safe Route Guidance',
    desc: 'Suggests safer, well-lit routes based on community reports and historical incident density.'
  },
  {
    icon: Bell,
    title: 'Proactive Check-ins',
    desc: 'Smart timers ping you for periodic check-ins. Missed check-ins escalate to your circle automatically.'
  },
  {
    icon: MessageSquare,
    title: 'Trusted Circles',
    desc: 'Create circles for work, campus, or family. Broadcast one-tap status: I’m Safe, Need Escort, or SOS.'
  },
  {
    icon: PhoneCall,
    title: 'Emergency Call Assist',
    desc: 'One-tap calling to local hotlines with contextual information like location and medical notes.'
  },
  {
    icon: Mic,
    title: 'Background Audio Capture',
    desc: 'Securely record encrypted audio on SOS triggers for evidence, even with the screen locked (where supported).'
  },
  {
    icon: Camera,
    title: 'Stealth Video',
    desc: 'Quickly capture discreet video with dim screen mode. Auto-uploads when back online.'
  },
  {
    icon: AlertTriangle,
    title: 'Community Safety Alerts',
    desc: 'Receive nearby alerts about incidents and caution zones verified by moderators.'
  },
  {
    icon: Clock,
    title: 'Schedule & Commute Mode',
    desc: 'Auto-activate safety features during your usual commute windows or late-night schedules.'
  }
];

export default function FeatureGrid() {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Advanced Safety Features</h2>
      <p className="text-white/70 mt-2 max-w-2xl">Thoughtfully designed capabilities that work together to keep you informed, connected, and in control.</p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors p-5">
            <div className="flex items-start gap-4">
              <div className="mt-1 inline-flex items-center justify-center rounded-md bg-emerald-500/15 border border-emerald-400/20 text-emerald-300 p-2">
                <Icon className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-white/70 mt-1">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
