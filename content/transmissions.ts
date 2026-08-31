export type TransmissionBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; id: string; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; label: string; code: string }
  | { type: 'callout'; label: string; text: string };

export type Transmission = {
  id: string;
  slug: string;
  date: string;
  displayDate: string;
  title: string;
  excerpt: string;
  tag: 'CAREER' | 'HOMELAB' | 'LEARNING';
  mins: number;
  clearance: string;
  dek: string;
  blocks: TransmissionBlock[];
};

export type TransmissionSummary = Pick<
  Transmission,
  'id' | 'date' | 'title' | 'excerpt' | 'tag' | 'mins'
> & {
  slug?: string;
};

export const transmissions: Transmission[] = [
  {
    id: 'LOG-004',
    slug: 'notes-from-my-first-ctf-weekend',
    date: '2026-08-02',
    displayDate: '02 AUG 2026',
    title: 'Notes from my first CTF weekend',
    excerpt: 'Placed nowhere, learned everything. A field report from three challenges and a very long Saturday.',
    tag: 'LEARNING',
    mins: 7,
    clearance: 'PUBLIC',
    dek: 'I went in expecting flags. I came out with a better process, a longer notes file, and a new respect for reading the obvious things twice.',
    blocks: [
      {
        type: 'paragraph',
        text: 'My goal for the weekend was deliberately small: finish one challenge without following a write-up, keep useful notes, and avoid turning the scoreboard into a measure of whether I belonged there. Two of those three things went to plan.',
      },
      {
        type: 'paragraph',
        text: 'The event opened on Friday evening. By Saturday morning I had a terminal full of abandoned commands, twelve browser tabs, and exactly zero flags. That turned out to be the useful part. A CTF compresses the normal learning loop until every weak habit becomes visible: guessing instead of observing, changing several things at once, and failing to record what has already been ruled out.',
      },
      { type: 'heading', id: 'challenge-one', text: '01 / Web — trust boundaries' },
      {
        type: 'paragraph',
        text: 'The first challenge looked like a tiny account portal. I spent far too long testing inputs before asking the simpler question: what does the application trust? The browser was sending an object identifier to an API endpoint, and the server returned a different record when that identifier changed. The interface hid the control; the request did not.',
      },
      {
        type: 'code',
        label: 'FIELD NOTE 01',
        code: '$ curl -s /api/profile/7\n{ "user": "guest", "access": "standard" }\n\n$ curl -s /api/profile/8\n{ "user": "operator", "access": "restricted" }',
      },
      {
        type: 'callout',
        label: 'LESSON CAPTURED',
        text: 'Map the application before attacking it. Routes, parameters, client-side code, and response shapes usually tell a better story than a random list of payloads.',
      },
      { type: 'heading', id: 'challenge-two', text: '02 / Forensics — build the timeline' },
      {
        type: 'paragraph',
        text: 'The second challenge came as a directory of logs. My first instinct was to search for suspicious words. That produced plenty of noise and no explanation. The breakthrough was sorting the events into a timeline and treating gaps as evidence rather than inconvenience.',
      },
      {
        type: 'list',
        items: [
          'Normal sign-in from a known address.',
          'A burst of failed requests against an old endpoint.',
          'A successful request with a new user agent.',
          'An archive created seconds before outbound traffic spiked.',
        ],
      },
      {
        type: 'paragraph',
        text: 'None of those events was decisive alone. Together they described a sequence. Once I could tell the story in plain English, finding the evidence for the flag became mechanical.',
      },
      { type: 'heading', id: 'challenge-three', text: '03 / Crypto — read the implementation' },
      {
        type: 'paragraph',
        text: 'The crypto challenge was the one I expected to skip. The maths looked intimidating, but the bug was not in the algorithm; it was in how the program used it. A value that should have been unique was repeated, creating a relationship between messages that the scheme assumed would never exist.',
      },
      {
        type: 'paragraph',
        text: 'I did not solve this one before the event ended. I did get close enough to understand the official solution afterwards, which felt more valuable than copying a working script. The difference between “I have no idea” and “I know which assumption failed” is a real piece of progress.',
      },
      { type: 'heading', id: 'mistakes', text: 'What I got wrong' },
      {
        type: 'list',
        items: [
          'I reached for tools before I had written down a hypothesis.',
          'I treated every dead end as lost time instead of recording it as eliminated territory.',
          'I stayed stuck alone for too long because asking for a hint felt like failing.',
          'I optimized for flags when the actual objective was learning a repeatable process.',
        ],
      },
      {
        type: 'callout',
        label: 'NEW OPERATING PROCEDURE',
        text: 'Observe. Form one hypothesis. Test one variable. Record the result. Repeat. It sounds obvious; under pressure, it is surprisingly easy to abandon.',
      },
      { type: 'heading', id: 'next', text: 'Next transmission' },
      {
        type: 'paragraph',
        text: 'For the next event I am taking a smaller toolkit and a better template for notes. I want every challenge page to start with the same four questions: what do I know, what is controlled by the user, what crosses a trust boundary, and what result would disprove my current theory?',
      },
      {
        type: 'paragraph',
        text: 'I placed nowhere. I also left with three techniques I can reuse and a much clearer picture of how I behave when I am stuck. For a first weekend, that is a result I will take.',
      },
    ],
  },
];

const queuedTransmissions: TransmissionSummary[] = [
  {
    id: 'LOG-006',
    date: '2026-08-20',
    title: "Why I'm learning security in public",
    excerpt: 'The plan, the rules, and why shipping monthly beats a perfect portfolio.',
    tag: 'CAREER',
    mins: 6,
  },
  {
    id: 'LOG-005',
    date: '2026-08-11',
    title: 'Homelab v1: what I built and what caught fire',
    excerpt: 'A tour of the rack, the mistakes, and the cable that cost me a Saturday.',
    tag: 'HOMELAB',
    mins: 9,
  },
  {
    id: 'LOG-003',
    date: '2026-07-24',
    title: 'Building this site: an Xbox-inspired design system',
    excerpt: 'How the green glow works under the hood, and what I borrowed versus reinvented.',
    tag: 'LEARNING',
    mins: 8,
  },
  {
    id: 'LOG-002',
    date: '2026-07-15',
    title: 'Scripting away my most boring work task',
    excerpt: 'A tiny automation that saves 40 minutes a week, step by step.',
    tag: 'HOMELAB',
    mins: 5,
  },
  {
    id: 'LOG-001',
    date: '2026-07-06',
    title: 'Hello world, or whatever the cyber version is',
    excerpt: 'Who I am, what I do, and what this site holds me accountable for.',
    tag: 'CAREER',
    mins: 4,
  },
];

const liveSummary: TransmissionSummary = {
  id: transmissions[0].id,
  date: transmissions[0].date,
  title: transmissions[0].title,
  excerpt: transmissions[0].excerpt,
  tag: transmissions[0].tag,
  mins: transmissions[0].mins,
  slug: transmissions[0].slug,
};

export const transmissionIndex: TransmissionSummary[] = [
  ...queuedTransmissions.slice(0, 2),
  liveSummary,
  ...queuedTransmissions.slice(2),
];

export function getTransmission(slug: string) {
  return transmissions.find((transmission) => transmission.slug === slug);
}
