import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTransmission, transmissions } from '@/content/transmissions';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return transmissions.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const transmission = getTransmission(slug);

  if (!transmission) return {};

  return {
    title: `${transmission.title} | Something Something Cyber`,
    description: transmission.excerpt,
    openGraph: {
      title: transmission.title,
      description: transmission.excerpt,
      type: 'article',
      publishedTime: transmission.date,
      images: [],
    },
    twitter: {
      card: 'summary',
      title: transmission.title,
      description: transmission.excerpt,
      images: [],
    },
  };
}

export default async function TransmissionPage({ params }: PageProps) {
  const { slug } = await params;
  const transmission = getTransmission(slug);

  if (!transmission) notFound();

  return (
    <main className="transmission-reader crt-shell">
      <div className="ambient-grid transmissions-grid" aria-hidden="true" />
      <div className="scanlines transmissions-scanlines" aria-hidden="true" />

      <header className="reader-header">
        <Link className="back-link" href="/transmissions"><span aria-hidden="true">◀</span> TRANSMISSIONS</Link>
        <Link className="reader-wordmark" href="/">SSC // FIELD LOG</Link>
        <span className="reader-online"><span className="status-dot" /> ARCHIVE ONLINE</span>
      </header>

      <article className="reader-article">
        <header className="article-hero">
          <div className="article-signal" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <p className="article-kicker">TRANSMISSION RECEIVED // {transmission.id}</p>
          <h1>{transmission.title}</h1>
          <p className="article-dek">{transmission.dek}</p>
          <dl className="article-readout">
            <div><dt>FILED</dt><dd><time dateTime={transmission.date}>{transmission.displayDate}</time></dd></div>
            <div><dt>CHANNEL</dt><dd>{transmission.tag}</dd></div>
            <div><dt>DURATION</dt><dd>{transmission.mins} MIN READ</dd></div>
            <div><dt>CLEARANCE</dt><dd>{transmission.clearance}</dd></div>
          </dl>
        </header>

        <div className="article-layout">
          <aside className="article-rail" aria-label="Transmission status">
            <span>{transmission.id}</span>
            <span className="rail-line" aria-hidden="true" />
            <span>AUTHENTICATED</span>
          </aside>

          <div className="article-body">
            {transmission.blocks.map((block, index) => {
              if (block.type === 'heading') {
                return <h2 id={block.id} key={block.id}>{block.text}</h2>;
              }
              if (block.type === 'paragraph') {
                return <p key={index}>{block.text}</p>;
              }
              if (block.type === 'list') {
                return <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
              }
              if (block.type === 'code') {
                return (
                  <figure className="field-note" key={index}>
                    <figcaption>{block.label}</figcaption>
                    <pre><code>{block.code}</code></pre>
                  </figure>
                );
              }
              return (
                <aside className="article-callout" key={index}>
                  <strong>{block.label}</strong>
                  <p>{block.text}</p>
                </aside>
              );
            })}
          </div>
        </div>

        <footer className="article-footer">
          <div>
            <span>END OF TRANSMISSION</span>
            <strong>{`${transmission.id} // CHECKSUM VERIFIED`}</strong>
          </div>
          <Link className="article-return" href="/transmissions">RETURN TO ARCHIVE <span aria-hidden="true">▶</span></Link>
        </footer>
      </article>
    </main>
  );
}
