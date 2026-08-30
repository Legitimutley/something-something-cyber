import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found-page crt-shell">
      <div className="ambient-grid not-found-grid" aria-hidden="true" />
      <div className="scanlines not-found-scanlines" aria-hidden="true" />

      <header className="not-found-header">
        <Link className="wordmark" href="/" aria-label="Something Something Cyber home">
          <span className="status-dot" />
          <span>something something cyber</span>
        </Link>
        <div className="not-found-state" aria-label="Route failure">
          <span>ROUTE FAILURE</span>
          <span className="cursor" aria-hidden="true" />
        </div>
      </header>

      <section className="not-found-console" aria-labelledby="not-found-heading">
        <div className="not-found-code" aria-hidden="true">
          <span>4</span>
          <span className="not-found-orb">
            <span className="not-found-orb-ring" />
            <strong>0</strong>
          </span>
          <span>4</span>
        </div>

        <p className="not-found-kicker">{'// SIGNAL LOST · HTTP 404'}</p>
        <h1 id="not-found-heading">NODE NOT FOUND</h1>
        <p className="not-found-copy">
          The requested route has fallen outside the mapped network. Re-establish a known uplink to continue.
        </p>

        <dl className="not-found-readout">
          <div><dt>STATUS</dt><dd>UNRESOLVED</dd></div>
          <div><dt>TRACE</dt><dd>NO RETURN SIGNAL</dd></div>
          <div><dt>RECOVERY</dt><dd>MANUAL ROUTE SELECT</dd></div>
        </dl>

        <nav className="not-found-actions" aria-label="Recovery routes">
          <Link className="not-found-action is-primary" href="/">RETURN TO HUB</Link>
          <Link className="not-found-action" href="/transmissions">VIEW TRANSMISSIONS</Link>
        </nav>
      </section>

      <footer className="not-found-footer">
        <span>SSC NETWORK · EDGE NODE 04</span>
        <span>AWAITING INPUT</span>
      </footer>
    </main>
  );
}
