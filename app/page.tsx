// app/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  // UI-only placeholders (no Supabase)
  const firstName = "Friend"; // later: hydrate from user profile
  const reassuranceLines = useMemo(
    () => [
      "You’re not behind.",
      "One gentle thing at a time.",
      "You can start small.",
      "Progress counts even when it’s quiet.",
      "You’re allowed to reset.",
    ],
    []
  );

  // Deterministic “rotation” for now (no timers, no urgency)
  const todayIndex = new Date().getDate() % reassuranceLines.length;
  const reassurance = reassuranceLines[todayIndex];

  // One reflective progress indicator (Season OR Chapter — not both)
  const seasonName = "Winter"; // placeholder
  const seasonLabel = "Season"; // placeholder
  const seasonProgress = 0.28; // 0–1 placeholder

  // Today’s Top 3 — tasks only, no counts, no “view all”
  const top3 = [
    { id: "t1", label: "One small reset task", done: false },
    { id: "t2", label: "One practical task", done: false },
    { id: "t3", label: "One gentle care task", done: false },
  ];

  // Brain Dump (local-only for now)
  const STORAGE_KEY_clarifyQue = "grounding:clarifyQue";

  type ClarifyQueItem = { id: string; text: string; createdAt: string };

  const [brainInput, setBrainInput] = useState("");
  const [clarifyQue, setClarifyQue] = useState<ClarifyQueItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_clarifyQue);
      if (raw) setClarifyQue(JSON.parse(raw));
    } catch {
      // ignore local parse issues
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_clarifyQue, JSON.stringify(clarifyQue));
    } catch {
      // ignore quota/private mode
    }
  }, [clarifyQue]);
  function splitBrainDump(input: string) {
    return input
      .split(/\r?\n/)
      .map((l) => l.trim())
      .map((l) => l.replace(/^[-*•]\s+/, "")) // remove leading bullets
      .filter(Boolean);
  }

  function uid() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function addBrainDumpToClarifyQue() {
    const lines = splitBrainDump(brainInput);
    if (lines.length === 0) return;

    const now = new Date().toISOString();
    const newItems: ClarifyQueItem[] = lines.map((text) => ({
      id: uid(),
      text,
      createdAt: now,
    }));

    setClarifyQue((prev) => [...newItems, ...prev]);
    setBrainInput("");
  }

  function deleteClarifyQueItem(id: string) {
    setClarifyQue((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <div className="home">
      {/* Greeting & reassurance (no CTA verbs, no guilt language) */}
      <section className="card">
        <div className="greeting">
          <div className="welcome">Welcome back, {firstName}</div>
          <div className="reassurance">{reassurance}</div>
        </div>
      </section>

      {/* Primary Progress Indicator (ONE only) */}
      <section className="card">
        <div className="card-title">
          {seasonLabel}: <span className="strong">{seasonName}</span>
        </div>

        <div className="progress-wrap" aria-label={`${seasonLabel} progress`}>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${Math.round(seasonProgress * 100)}%` }}
            />
          </div>
          {/* No % shown (per spec); purely visual */}
        </div>

        <div className="muted small">
          Reflective only — nothing here is a demand.
        </div>
      </section>

      {/* Today’s Top 3 */}
      <section className="card">
        <div className="card-title">Today’s Top 3</div>

        <ul className="list" aria-label="Today’s Top 3 tasks">
          {top3.map((t) => (
            <li key={t.id} className="list-item">
              <input
                className="checkbox"
                type="checkbox"
                checked={t.done}
                onChange={() => {
                  // UI-only stub: later connect to task state
                  alert("Stub: tasks will be wired in Phase 2 core flows.");
                }}
                aria-label={`Mark done: ${t.label}`}
              />
              <span className="item-text">{t.label}</span>
            </li>
          ))}
        </ul>

        {/* No “View all” by default (per spec) */}
        <div className="row">
          <Link className="soft-link" href="/todo">
            Go to To-Do
          </Link>
        </div>
      </section>

      {/* Brain Dump (local-only) */}
      <section className="card">
        <div className="card-title">Brain Dump</div>
        <div className="muted">
          Capture first. Clarify later. Nothing auto-commits.
        </div>

        <textarea
          className="brainTextarea"
          value={brainInput}
          onChange={(e) => setBrainInput(e.target.value)}
          placeholder={"Dump anything here.\nOne thought per line (pasting multiple lines is OK)."}
          rows={4}
        />

        <div className="brainActions">
          <button
            type="button"
            className="soft-button"
            onClick={addBrainDumpToClarifyQue}
            disabled={splitBrainDump(brainInput).length === 0}
          >
           Send to Clarification
          </button>

          <div className="muted small">
            Tip: paste a whole list, then tap once.
          </div>
        </div>

<div className="clarifyPreview">
  <div className="clarifyHeader">These items need classified</div>

  {clarifyQue.length === 0 ? (
    <div className="muted small">Nothing is waiting right now.</div>
  ) : (
    <ul className="clarifyQueList" aria-label="Items waiting for clarification">
      {clarifyQue.slice(0, 1).map((d) => (
        <li key={d.id} className="clarifyQueItem">
          <span className="draftText">{d.text}</span>
          <button
            type="button"
            className="iconButton"
            onClick={() => deleteClarifyQueItem(d.id)}
            aria-label="Delete item"
            title="Delete"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  )}
</div>

      </section>

      {/* Collapsed sections (opt-in depth; no overwhelm summaries) */}
      <section className="card">
        <details className="details">
          <summary className="summary">Today (expanded list)</summary>
          <div className="muted small">
            Later: shows only today’s tasks (not the universe).
          </div>
        </details>

        <details className="details">
          <summary className="summary">Recent wins</summary>
          <div className="muted small">Later: 1–2 quiet wins.</div>
        </details>

        <details className="details">
          <summary className="summary">Latest achievement</summary>
          <div className="muted small">
            Later: last badge only, muted (never interruptive).
          </div>
        </details>
      </section>

      <style jsx>{`
        .home {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .card {
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.9);
          padding: 14px;
        }

        .greeting {
          display: grid;
          gap: 6px;
        }

        .welcome {
          font-size: 18px;
          letter-spacing: 0.2px;
        }

        .reassurance {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.6);
        }

        .card-title {
          font-size: 13px;
          color: rgba(0, 0, 0, 0.55);
          margin-bottom: 10px;
          letter-spacing: 0.2px;
        }

        .strong {
          color: rgba(0, 0, 0, 0.85);
        }

        .progress-wrap {
          display: grid;
          gap: 10px;
        }

        .progress-track {
          width: 100%;
          height: 12px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.18);
          transition: width 220ms ease;
        }

        .muted {
          color: rgba(0, 0, 0, 0.55);
        }

        .small {
          font-size: 12px;
        }

        .list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 10px;
        }

        .list-item {
          display: grid;
          grid-template-columns: 18px 1fr;
          gap: 10px;
          align-items: center;
          padding: 10px 10px;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: white;
        }

        .checkbox {
          width: 16px;
          height: 16px;
        }

        .item-text {
          font-size: 14px;
        }

        .row {
          margin-top: 10px;
          display: flex;
          justify-content: flex-end;
        }

        .soft-link {
          text-decoration: none;
          font-size: 13px;
          color: rgba(0, 0, 0, 0.65);
          padding: 8px 10px;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(0, 0, 0, 0.02);
        }

        .soft-link:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .brainDumpHint {
          margin-top: 10px;
          padding: 10px 10px;
          border-radius: 14px;
          border: 1px dashed rgba(0, 0, 0, 0.18);
          background: rgba(0, 0, 0, 0.02);
          font-size: 13px;
          color: rgba(0, 0, 0, 0.6);
        }

        .kbd {
          display: inline-grid;
          place-items: center;
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 1px solid rgba(0, 0, 0, 0.18);
          background: white;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.7);
        }

        .clarifyPreview {
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(0, 0, 0, 0.12);
        }

        .clarifyHeader {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.55);
          margin-bottom: 6px;
        }

        .details {
          padding: 10px 0;
        }

        .summary {
          cursor: pointer;
          list-style: none;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.75);
          padding: 8px 4px;
        }

        summary::-webkit-details-marker {
          display: none;
        }

        .summary:before {
          content: "▸";
          display: inline-block;
          margin-right: 8px;
          color: rgba(0, 0, 0, 0.45);
        }
        .brainTextarea {
          margin-top: 10px;
          width: 100%;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: white;
          font-size: 14px;
          resize: vertical;
        }

        .brainActions {
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .soft-button {
          font-size: 13px;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(0, 0, 0, 0.02);
          cursor: pointer;
        }

        .soft-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }


        .iconButton {
          width: 30px;
          height: 30px;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(0, 0, 0, 0.02);
          cursor: pointer;
        }
        .brainTextarea {
          margin-top: 10px;
          width: 100%;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: white;
          font-size: 14px;
          resize: vertical;
        }

        .brainActions {
          margin-top: 10px;
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .soft-button,
        .ghost-button,
        .danger-button {
          font-size: 13px;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          cursor: pointer;
        }

        .soft-button {
          background: rgba(0, 0, 0, 0.02);
        }

        .soft-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .ghost-button {
          background: transparent;
          color: rgba(0, 0, 0, 0.65);
        }

        .danger-button {
          background: rgba(0, 0, 0, 0.02);
          color: rgba(160, 0, 0, 0.75);
        }

        .queueList {
          list-style: none;
          padding: 0;
          margin: 12px 0 0;
          display: grid;
          gap: 10px;
        }

        .queueItem,
        .oneItem {
          margin-top: 12px;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: white;
          display: grid;
          gap: 10px;
        }

        .queueText {
          font-size: 14px;
        }

        .suggestions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .pill {
          font-size: 12px;
          padding: 6px 8px;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(0, 0, 0, 0.02);
          color: rgba(0, 0, 0, 0.65);
        }

        .queueActions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        details[open] .summary:before {
          content: "▾";
        }
      `}</style>
    </div>
  );
}
