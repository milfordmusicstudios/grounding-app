"use client";

import React, { useMemo, useState } from "react";

type CreativeFocus = {
  label: string;
  value: string;
  note: string;
};

export default function CreativePage() {
  // UI-only placeholders
  const focus = useMemo<CreativeFocus>(
    () => ({
      label: "Current creative focus",
      value: "Make something small",
      note: "This section exists to invite joy, not measure output.",
    }),
    []
  );

  const [idea, setIdea] = useState("");
  const [projectNote, setProjectNote] = useState("");

  return (
    <div className="creative">
      {/* Header */}
      <section className="header">
        <h1 className="title">Creative & Fun</h1>
        <div className="subtext">Expression & joy.</div>
      </section>

      {/* Default view */}
      <section className="card">
        <div className="card-title">{focus.label}</div>

        <div className="focus">
          <div className="focusValue">{focus.value}</div>
          <div className="focusNote">{focus.note}</div>
        </div>
      </section>

      {/* Ideas (light capture) */}
      <section className="card">
        <div className="card-title">Ideas</div>

        <div className="muted">
          Capture an idea without committing to it.
        </div>

        <textarea
          className="textarea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="An idea I don’t want to lose…"
          aria-label="Creative idea input"
        />

        <div className="row">
          <button
            className="button"
            type="button"
            onClick={() => alert("Stub: ideas will be saved later.")}
          >
            Save idea
          </button>
          <button
            className="ghostButton"
            type="button"
            onClick={() => setIdea("")}
          >
            Clear
          </button>
        </div>
      </section>

      {/* Expandable: Projects / Play logs / Inspiration */}
      <section className="card">
        <details className="details">
          <summary className="summary">Projects</summary>

          <div className="muted small">
            Later: optional project list (no due dates required).
          </div>

          <textarea
            className="textarea"
            value={projectNote}
            onChange={(e) => setProjectNote(e.target.value)}
            placeholder="A project note… (optional)"
            aria-label="Project note input"
          />

          <div className="row">
            <button
              className="button"
              type="button"
              onClick={() => alert("Stub: project notes will be saved later.")}
            >
              Save
            </button>
            <button
              className="ghostButton"
              type="button"
              onClick={() => setProjectNote("")}
            >
              Clear
            </button>
          </div>
        </details>

        <details className="details">
          <summary className="summary">Play logs</summary>
          <div className="muted small">
            Later: “what did I enjoy?” logs. No streaks. No totals.
          </div>
        </details>

        <details className="details">
          <summary className="summary">Inspiration</summary>
          <div className="muted small">
            Later: links, screenshots, prompts, playlists.
          </div>
        </details>

        <div className="muted small">
          Rule: no deadlines, no productivity scoring, no guilt framing.
        </div>
      </section>

      <style jsx>{`
        .creative {
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

        .focus {
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 16px;
          background: white;
          padding: 12px;
        }

        .focusValue {
          font-size: 16px;
          font-weight: 700;
          color: rgba(0, 0, 0, 0.75);
          margin-bottom: 6px;
        }

        .focusNote {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.6);
          line-height: 1.4;
        }

        .muted {
          color: rgba(0, 0, 0, 0.55);
        }

        .small {
          font-size: 12px;
          margin-top: 10px;
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
