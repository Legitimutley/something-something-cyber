'use client';

import { useEffect, useState } from 'react';

type Section = {
  id: string;
  label: string;
};

type ReadingProgressProps = {
  sections: Section[];
};

export default function ReadingProgress({ sections }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? '');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const article = document.querySelector<HTMLElement>('[data-transmission-article]');
      if (!article) return;

      const articleTop = article.offsetTop;
      const readableDistance = Math.max(article.scrollHeight - window.innerHeight, 1);
      const nextProgress = Math.min(100, Math.max(0, ((window.scrollY - articleTop) / readableDistance) * 100));
      setProgress(Math.round(nextProgress));

      const headings = sections
        .map(({ id }) => document.getElementById(id))
        .filter((heading): heading is HTMLElement => Boolean(heading));
      const current = headings.reduce<HTMLElement | null>((latest, heading) => {
        return heading.getBoundingClientRect().top <= 150 ? heading : latest;
      }, null);
      setActiveSection(current?.id ?? sections[0]?.id ?? '');
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sections]);

  const activeLabel = sections.find(({ id }) => id === activeSection)?.label ?? 'INCOMING TRANSMISSION';

  return (
    <nav className={`reading-progress ${open ? 'is-open' : ''}`} aria-label="Article progress and sections">
      <button
        className="reading-progress-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="transmission-outline"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="reading-progress-status">
          <span className="reading-progress-label">SIGNAL</span>
          <output aria-label={`${progress}% read`}>{String(progress).padStart(2, '0')}%</output>
        </span>
        <span className="reading-progress-section">{activeLabel}</span>
        <span className="reading-progress-command" aria-hidden="true">{open ? 'CLOSE ×' : 'SECTIONS +'}</span>
      </button>

      <span className="reading-progress-track" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </span>

      <div className="reading-progress-menu" id="transmission-outline" hidden={!open}>
        <span className="reading-progress-menu-label">TRANSMISSION OUTLINE</span>
        <ol>
          {sections.map((section, index) => (
            <li key={section.id}>
              <a
                className={activeSection === section.id ? 'is-active' : ''}
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {section.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
