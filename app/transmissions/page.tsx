'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { transmissionIndex } from '@/content/transmissions';

const filters = ['ALL', 'LEARNING', 'HOMELAB', 'CAREER'];

export default function Transmissions() {
  const [filter, setFilter] = useState('ALL');
  const shown = useMemo(
    () => filter === 'ALL' ? transmissionIndex : transmissionIndex.filter((post) => post.tag === filter),
    [filter],
  );
  const liveCount = transmissionIndex.filter((post) => post.slug).length;

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
            <span>{liveCount} LIVE · {transmissionIndex.length - liveCount} QUEUED · {filter === 'ALL' ? 'ALL CHANNELS' : filter}</span>
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
              const content = (
                <>
                  <div className="post-id"><span>{post.id}</span><span>{post.date}</span></div>
                  <div className="post-copy"><h2>{post.title}</h2><p>{post.excerpt}</p></div>
                  <div className="post-meta">
                    <span className="post-tag">{post.tag}</span>
                    <span className={post.slug ? 'read-meter' : 'post-queued'}>
                      {post.slug ? `${meter} ${post.mins} MIN` : 'SIGNAL QUEUED'}
                    </span>
                  </div>
                </>
              );

              return post.slug ? (
                <Link className="post-row is-live" href={`/transmissions/${post.slug}`} key={post.id}>
                  {content}
                </Link>
              ) : (
                <div className="post-row is-queued" key={post.id} aria-label={`${post.title}, coming soon`}>
                  {content}
                </div>
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
