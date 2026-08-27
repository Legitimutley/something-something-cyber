'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const destinations = [
  { label: 'transmissions', eyebrow: 'BLOG / WRITING', href: '/transmissions', className: 'orb-one' },
  { label: 'project lab', eyebrow: 'BUILDS / TOOLS', href: '#', className: 'orb-two' },
  { label: 'profile', eyebrow: 'ABOUT ME', href: '#', className: 'orb-three' },
];

export default function Home() {
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState('');
  const [soundOn, setSoundOn] = useState(false);
  const [booting, setBooting] = useState(true);
  const audioContext = useRef<AudioContext | null>(null);
  const hum = useRef<GainNode | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 3400);
    const onKeyDown = (event: KeyboardEvent) => {
      if (booting && ['Enter', ' ', 'Escape'].includes(event.key)) {
        setBooting(false);
        return;
      }
      if (['ArrowRight', 'ArrowDown'].includes(event.key)) {
        event.preventDefault();
        setSelected((current) => (current + 1) % destinations.length);
      } else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) {
        event.preventDefault();
        setSelected((current) => (current + destinations.length - 1) % destinations.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
      void audioContext.current?.close();
    };
  }, [booting]);

  const prepareAudio = () => {
    if (audioContext.current) return audioContext.current;
    const Context = window.AudioContext;
    if (!Context) return null;
    const context = new Context();
    const gain = context.createGain();
    const filter = context.createBiquadFilter();
    const low = context.createOscillator();
    const high = context.createOscillator();
    gain.gain.value = 0;
    filter.type = 'lowpass';
    filter.frequency.value = 220;
    low.type = 'sawtooth';
    low.frequency.value = 52;
    high.type = 'sine';
    high.frequency.value = 104.5;
    low.connect(filter);
    high.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);
    low.start();
    high.start();
    audioContext.current = context;
    hum.current = gain;
    return context;
  };

  const toggleSound = async () => {
    const next = !soundOn;
    const context = prepareAudio();
    if (context?.state === 'suspended') await context.resume();
    if (context && hum.current) {
      const now = context.currentTime;
      hum.current.gain.cancelScheduledValues(now);
      hum.current.gain.linearRampToValueAtTime(next ? .018 : 0, now + .35);
    }
    setSoundOn(next);
  };

  const unavailable = (name: string) => {
    setMessage(`// ${name.toUpperCase()} — UNDER CONSTRUCTION`);
    window.setTimeout(() => setMessage(''), 2200);
  };

  return (
    <main className="hub crt-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      <header className="hub-header">
        <Link className="wordmark" href="/" aria-label="Something Something Cyber home">
          <span className="status-dot" />
          <span>something something cyber</span>
        </Link>
        <div className="system-state" aria-label="System online">
          <button className="sound-control" type="button" onClick={toggleSound} aria-pressed={soundOn}>SOUND: {soundOn ? 'ON' : 'OFF'}</button>
          <span>ONLINE</span>
          <span className="cursor" aria-hidden="true" />
        </div>
      </header>

      <section className="orb-field" aria-label="Site sections">
        {destinations.map((item, index) => {
          const orb = (
            <span className={`orb ${selected === index ? 'is-selected' : ''}`}>
              <span className="orb-ring" aria-hidden="true" />
              <span className="orb-label">
                <strong>{item.label}</strong>
                <small>{item.eyebrow}</small>
              </span>
            </span>
          );

          return (
            <div className={`orb-wrap ${item.className}`} key={item.label}>
              <span className="orb-tether" aria-hidden="true" />
              {item.href === '#' ? (
                <button
                  className="orb-button"
                  type="button"
                  onMouseEnter={() => setSelected(index)}
                  onFocus={() => setSelected(index)}
                  onClick={() => unavailable(item.label)}
                  aria-label={`${item.label}, under construction`}
                >
                  {orb}
                </button>
              ) : (
                <Link
                  className="orb-button"
                  href={item.href}
                  onMouseEnter={() => setSelected(index)}
                  onFocus={() => setSelected(index)}
                >
                  {orb}
                </Link>
              )}
            </div>
          );
        })}
      </section>

      <p className="hub-tagline">TECH · SECURITY · LEARNING IN PUBLIC</p>
      <div className="hub-help" aria-hidden="true">
        <span className="a-button">a</span>
        <span>SELECT &nbsp;·&nbsp; ◀▶ NAVIGATE</span>
      </div>

      {message && <div className="toast" role="status">{message}</div>}

      {booting && (
        <button className="boot-screen" type="button" onClick={() => setBooting(false)} aria-label="Skip introduction">
          <span className="boot-content">
            <span className="boot-orb">SSC</span>
            <span className="boot-copy">
              <strong>something something cyber</strong>
              <small className="boot-line-one">INITIALISING CORE SYSTEMS...</small>
              <small className="boot-line-two">UPLINK ESTABLISHED</small>
              <small className="boot-line-three">PRESS ANY KEY TO CONTINUE</small>
            </span>
          </span>
        </button>
      )}
    </main>
  );
}
