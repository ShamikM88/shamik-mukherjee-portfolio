// Shared shape for every golden-template case. Each case file in ./cases fills this in from its
// original long-form source (src/data/content.ts), so the template itself carries no facts.

import type { ReactNode } from "react";

export type Tone = "owned" | "shared" | "external" | "alert" | "muted";

// ReactNode (not just string) so a case can wire a figure to a Live* component
// (see golden/cases/opencam.ts) instead of a static number that goes stale.
export type Receipt = { value: ReactNode; label: string; note?: string };

export type Stage = {
  key: string;
  label: string;
  headline: string;
  points: string[];
  // Optional headline figure shown large above the points.
  figure?: { value: ReactNode; label: string };
};

export type ScopeItem = string | { text: string; status?: "done" | "pending" | "wont" };

export type Card = {
  title: string;
  sublabel?: string;
  letter?: string;
  body?: string;
  items?: ScopeItem[];
  tone?: "brand" | "blue" | "ember" | "muted";
};

export type Section =
  | {
      kind: "prose";
      eyebrow: string;
      heading: string;
      paragraphs: string[];
      callouts?: string[];
      links?: { label: string; href: string }[];
    }
  | {
      kind: "cards";
      eyebrow: string;
      heading: string;
      intro?: string;
      cards: Card[];
    }
  | {
      kind: "steps";
      eyebrow: string;
      heading: string;
      steps: { title: string; body: string }[];
    }
  | {
      kind: "moscow";
      eyebrow: string;
      heading: string;
      intro?: string;
      lanes: { label: string; sublabel: string; tone: "brand" | "blue" | "ember" | "muted"; items: ScopeItem[] }[];
    };

export type FlowNode = { label: string; note?: string; tone: Tone };

export type TechnicalPanel =
  | {
      kind: "flow";
      title: string;
      intro?: string;
      nodes: FlowNode[];
      branch?: { label: string; steps: string[]; note?: string };
      footnote?: string;
    }
  | {
      kind: "bars";
      title: string;
      intro?: string;
      scale: number;
      sla?: { at: number; label: string };
      rows: { label: string; value: string; mid: number; tone: "owned" | "muted" }[];
    }
  | {
      kind: "stack";
      title: string;
      intro?: string;
      layers: { label: string; layer: string; tone: Tone }[];
      event?: { title: string; facts: { label: string; value: string }[]; note: string };
    };

export type Decision = {
  title: string;
  problem: string;
  decision: string;
  why?: string;
  result: string;
  notMine?: string;
  // The full account from the source case study, shown in the expandable.
  fullAccount: string;
};

export type Artefact = {
  src: string;
  alt: string;
  caption: string;
  why: string;
  sourceUrl: string;
  sourceLabel: string;
};

export type CaseFile = {
  slug: string;
  // Position in the evidence set, 1-based, used for "01 of 04".
  index: number;
  // Grouping on the evidence home: professional delivery or the solo AI lab.
  group: "work" | "lab";
  name: string;
  short: string;
  category: string;
  proposition: string;
  mode: "Controlled Delivery" | "Lightweight Delivery";
  meta: { role: string; timeline: string; status: string };
  receipts: Receipt[];
  ownership: {
    owned: string[];
    shared: string[];
    // "Shared" for client work; "AI-executed" where the implementation was directed through Claude Code.
    sharedLabel: string;
    outOfScope: string[];
  };
  stages: Stage[];
  initial: string;
  // Short graph lines used on the evidence home's inspect disclosure.
  inspect: { constraint: string; decision: string; outcome: string };
  sections: Section[];
  decisions: { heading: string; items: Decision[] };
  technical: { heading: string; panels: TechnicalPanel[] };
  impact: { heading: string; bullets: string[] };
  proof: { chain: string[]; tiles: { value: ReactNode; label: string }[] };
  artefacts?: { heading: string; items: Artefact[] };
  sources: { label: string; href: string; note: string }[];
  neighbours: { prev: { slug: string; label: string }; next: { slug: string; label: string } };
};
