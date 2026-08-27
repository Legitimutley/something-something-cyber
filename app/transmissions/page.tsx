'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const posts = [
  { id: 'LOG-006', date: '2026-08-20', title: "Why I'm learning security in public", excerpt: 'The plan, the rules, and why shipping monthly beats a perfect portfolio.', tag: 'CAREER', mins: 6 },
  { id: 'LOG-005', date: '2026-08-11', title: 'Homelab v1: what I built and what caught fire', excerpt: 'A tour of the rack, the mistakes, and the cable that cost me a Saturday.', tag: 'HOMELAB', mins: 9 },
  { id: 'LOG-004', date: '2026-08-02', title: 'Notes from my first CTF weekend', excerpt: 'Placed nowhere, learned everything. Write-up of three challenges.', tag: 'LEARNING', mins: 7 },
  { id: 'LOG-003', date: '2026-07-24', title: 'Building this site: an Xbox-inspired design system', excerpt: 'How the green glow works under the hood, and what I stole vs. reinvented.', tag: 'LEARNING', mins: 8 },
  { id: 'LOG-002', date: '2026-07-15', title: 'Scripting away my most boring work task', excerpt: 'A tiny automation that saves 40 minutes a week, step by step.', tag: 'HOMELAB', mins: 5 },
  { id: 'LOG-001', date: '2026-07-06', title: 'Hello world, or whatever the cyber version is', excerpt: 'Who I am, what I do, and what this site holds me accountable for.', tag: 'CAREER', mins: 4 },
];

const filters = ['ALL', 'LEARNING', 'HOMELAB', 'CAREER'];

export default function Transmissions() {
  const [filter, setFilter] = useState('ALL');
  const shown = useMemo(() => filter === 'ALL' ? posts : posts.filter((post) => post.tag === filter), [filter]);

  return (
    <main className="transmissions crt-shell">
      <div className="ambient-grid transmissions-grid" aria-hidden="true" />
      <div className="scanlines transmissions-scanlines" aria-hidden="true" />
      <div className="transmissions-frame">
        <header className="transmissions-header">
          <Link className="back-link" href="/"><span aria-hidden="true">◀</span> HUB</Link>
          <div className="domain-state">
            <span>SOMETHINGSOMETHINGCYBER.CO.UK</span>
            <span className="cursor" aria-hidden="true" />
          </div>
        </header>

        <section className="transmissions-index" aria-labelledby="transmissions-heading">
          <div className="index-title-row">
            <h1 id="transmissions-heading">TRANSMISSIONS</h1>
            <span>{shown.length} ITEMS · {filter === 'ALL' ? 'ALL CHANNELS' : filter}</span>
          </div>
          <p className="index-intro">Everything I write as I learn: honest write-ups, mistakes included. Newest first.</p>

          <div className="filters" aria-label="Filter transmissions">
            {filters.map((name) => (
              <button
                key={name}
                type="button"
                className={filter === name ? 'is-active' : ''}
                onClick={() => setFilter(name)}
                aria-pressed={filter === name}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="post-list">
            {shown.map((post) => {
              const filled = Math.min(5, Math.ceil(post.mins / 2));
              const meter = `${'█'.repeat(filled)}${'░'.repeat(5 - filled)}`;
              return (
                <a className="post-row" href="#" key={post.id} onClick={(event) => event.preventDefault()}>
                  <div className="post-id"><span>{post.id}</span><span>{post.date}</span></div>
                  <div className="post-copy"><h2>{post.title}</h2><p>{post.excerpt}</p></div>
                  <div className="post-meta"><span className="post-tag">{post.tag}</span><span className="read-meter">{meter} {post.mins} MIN</span></div>
                </a>
              );
            })}
          </div>
        </section>

        <footer className="transmissions-footer">
          <span>© 2026 SOMETHING SOMETHING CYBER</span>
          <Link href="/">◀ BACK TO HUB</Link>
        </footer>
      </div>
    </main>
  );
}
