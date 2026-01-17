"use client";

import React, { useMemo, useState } from "react";

type Achievement = {
  id: string;
  title: string;
  note: string;
  dateLabel: string;
};

export default function ReviewPage() {
  // UI-only placeholders
  const mostRecent = useMemo<Achievement>(
    () => ({
      id: "a1",
      title: "Recent win",
      note: "Something small you did that matters.",
      dateLabel: "Today",
    }),
    []
  );

  const milestone = useMemo<Achievement>(
    () => ({
      id: "m1",
      title: "Milestone highlight",
      note: "One meaningful step forward — no comparison, no pressure.",
      dateLabel: "This week",
    }),
    []
  );

  const [weeklyReflection, setWeeklyReflection] = useState("");

  return (
    <div className="review">
      {/* Header */}
      <section className="header">
        <h1 className="title">Review</h1>
        <div className="subtext">Awareness & celebration.</div>
      </section>

      {/* Default view: Most recent achievement */}
      <section className="card">
        <div className="card-title">Most recent</div>

        <div className="highlight">
          <div className="highlightTop">
            <div className="highlightTitle">{mostRecent.title}</div>
            <div className="pill">{mostRecent.dateLabel}</div>
          </div>
          <div className="highlightNote">{mostRecent.note}</div>
        </div>

        <div className="muted small">
          This is reflective. It never interrupts your workflow anywhere else.
        </div>
      </section>

      {/* Default view: One milestone highlight */}
      <section className="card">
        <div className="card-title">Milestone</div>

        <div className="highlight">
          <div className="highlightTop">
            <div className="highlightTitle">{milestone.title}</div>
            <div className="pill">{milestone.dateLabel}</div>
          </div>
          <div className="highlightNote">{milestone.note}</div>
        </div>
      </section>

      {/* Expandable: deeper review */}
      <section className="card">
        <details className="details">
          <summary className="summary">Weekly review (optional)</summary>

          <div className="block">
            <div className="blockTitle">A gentle question</div>
            <div className="muted">
              What helped you most this week?
            </div>

            <textarea
              className="textarea"
              value={weeklyReflection}
              onChange={(e) => setWeeklyReflection(e.target.value)}
              placeholder="Write a few lines… or leave it blank."
              aria-label="Weekly reflection input"
            />

            <div className="row">
              <button
                className="button"
                type="button"
                onClick={() =>
                  alert("Stub: weekly review will be saved later (local-first / Supabase).")
                }
              >
                Save
              </button>
              <button
                className="ghostButton"
                type="button"
                onClick={() => setWeeklyReflection("")}
              >
                Clear
              </button>
            </div>

            <div className="muted small">
              No scoring. No “behind.” No obligation.
            </div>
          </div>
        </details>

        <details className="details">
          <summary className="summary">Badge history</summary>
          <div className="muted small">
            Later: badge archive + filter. Celebration only.
          </div>
        </details>

        <details className="details">
          <summary className="summary">Levels</summary>
          <div className="muted small">
            Later: levels live here only. Never shown during action.
          </div>
        </details>

        <details className="details">
          <summary className="summary">Progress timelines</summary>
          <div className="muted small">
            Later: timelines + chapter/season reflections.
          </div>
        </details>

        <details className="details">
          <summary className="summary">Monthly chapter review</summary>
          <div className="muted small">
            Later: calm prompts + optional summaries.
          </div>
        </details>
      </section>

      <style jsx>{`
        .review {
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

        .highlight {
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 16px;
          background: white;
          padding: 12px;
        }

        .highlightTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 6px;
        }

        .highlightTitle {
          font-size: 14px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.75);
        }

        .pill {
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(0, 0, 0, 0.03);
          color: rgba(0, 0, 0, 0.6);
          white-space: nowrap;
        }

        .highlightNote {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.7);
          line-height: 1.4;
        }

        .muted {
          color: rgba(0, 0, 0, 0.55);
        }

        .small {
          font-size: 12px;
          margin-top: 10px;
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

        .block {
          margin-top: 10px;
          padding: 12px;
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: white;
        }

        .blockTitle {
          font-size: 13px;
          color: rgba(0, 0, 0, 0.7);
          margin-bottom: 6px;
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
          margin-top: 10px;
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
      `}</style>
    </div>
  );
}
