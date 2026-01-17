"use client";

import React, { useMemo, useState } from "react";

export default function FaithPage() {
  // UI-only placeholders (no quotas, no streaks, no pressure)
  const todaysReading = useMemo(
    () => ({
      title: "Today’s Reading",
      reference: "Psalm 23",
      excerpt:
        "A calm place to return to. This is here to center you — not to measure you.",
    }),
    []
  );

  const [reflection, setReflection] = useState("");

  return (
    <div className="faith">
      {/* Header */}
      <section className="header">
        <h1 className="title">Faith & Reflection</h1>
        <div className="subtext">Meaning without pressure.</div>
      </section>

      {/* Today’s reading */}
      <section className="card">
        <div className="card-title">{todaysReading.title}</div>

        <div className="readingRef">{todaysReading.reference}</div>
        <div className="readingText">{todaysReading.excerpt}</div>

        <div className="muted small">
          No quotas. No streaks. This can be skipped without consequence.
        </div>
      </section>

      {/* Gentle reflection prompt (optional) */}
      <section className="card">
        <div className="card-title">Reflection (optional)</div>

        <div className="prompt">
          What do you need to remember today?
        </div>

        <textarea
          className="textarea"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write a few words… or leave it blank."
          aria-label="Reflection input"
        />

        <div className="row">
          <button
            type="button"
            className="button"
            onClick={() => {
              // UI-only stub
              alert("Stub: reflections will be saved later (local-first / Supabase).");
            }}
          >
            Save
          </button>

          <button
            type="button"
            className="ghostButton"
            onClick={() => setReflection("")}
          >
            Clear
          </button>
        </div>

        <div className="muted small">
          Saving is for you — not a requirement.
        </div>
      </section>

      {/* Brain Dump access note (collapsed/floating access) */}
      <section className="card">
        <div className="card-title">Brain Dump</div>
        <div className="muted">
          Use the <span className="kbd">+</span> button to capture thoughts.
          Clarify can live under Brain Dump — never forced.
        </div>
      </section>

      {/* Expandable depth */}
      <section className="card">
        <details className="details">
          <summary className="summary">Prayer journal</summary>
          <div className="muted small">
            Later: entries, tags, answered prayers (quietly).
          </div>
        </details>

        <details className="details">
          <summary className="summary">Search past reflections</summary>
          <div className="muted small">
            Later: searchable archive.
          </div>
        </details>

        <details className="details">
          <summary className="summary">Reading progress (informational)</summary>
          <div className="muted small">
            Later: percent-based only. Informational, not motivational.
          </div>
        </details>
      </section>

      <style jsx>{`
        .faith {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .header {
          display: grid;
          gap: 4px;
          padding: 4px 2px 2px;
        }

        .title {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }

        .subtext {
          font-size: 13px;
          color: rgba(0, 0, 0, 0.55);
        }

        .card {
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.9);
          padding: 14px;
        }

        .card-title {
          font-size: 13px;
          color: rgba(0, 0, 0, 0.55);
          margin-bottom: 10px;
        }

        .readingRef {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.75);
          margin-bottom: 8px;
        }

        .readingText {
          font-size: 14px;
          line-height: 1.45;
          color: rgba(0, 0, 0, 0.7);
          margin-bottom: 10px;
        }

        .prompt {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.75);
          margin-bottom: 8px;
        }

        .textarea {
          width: 100%;
          min-height: 110px;
          resize: vertical;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: white;
          outline: none;
          font-family: inherit;
          font-size: 14px;
          line-height: 1.4;
        }

        .row {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        .button {
          padding: 12px 12px;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(0, 0, 0, 0.04);
          cursor: pointer;
        }

        .ghostButton {
          padding: 12px 12px;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: white;
          cursor: pointer;
          color: rgba(0, 0, 0, 0.65);
        }

        .muted {
          color: rgba(0, 0, 0, 0.55);
        }

        .small {
          font-size: 12px;
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

        .details {
          padding: 6px 0;
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

        details[open] .summary:before {
          content: "▾";
        }
      `}</style>
    </div>
  );
}
