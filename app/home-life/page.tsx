"use client";

import React, { useMemo, useState } from "react";

type LifeFocus = {
  label: string;
  value: string;
  note: string;
};

export default function HomeLifePage() {
  // UI-only placeholder
  const focus = useMemo<LifeFocus>(
    () => ({
      label: "Household focus",
      value: "Gentle upkeep",
      note: "This is support, not scorekeeping.",
    }),
    []
  );

  const [mealNote, setMealNote] = useState("");
  const [homeNote, setHomeNote] = useState("");

  return (
    <div className="life">
      {/* Header */}
      <section className="header">
        <h1 className="title">Home & Life</h1>
        <div className="subtext">Stability & care.</div>
      </section>

      {/* Default view */}
      <section className="card">
        <div className="card-title">{focus.label}</div>

        <div className="focus">
          <div className="focusValue">{focus.value}</div>
          <div className="focusNote">{focus.note}</div>
        </div>

        <div className="muted small">
          Rules: no nags, no XP, no “behind” language.
        </div>
      </section>

      {/* Meal snapshot (light, optional) */}
      <section className="card">
        <div className="card-title">Meal snapshot (optional)</div>

        <div className="muted">
          Just enough to reduce decision fatigue. No meal prep pressure.
        </div>

        <textarea
          className="textarea"
          value={mealNote}
          onChange={(e) => setMealNote(e.target.value)}
          placeholder="What’s easy this week? (ideas, leftovers, simple defaults)"
          aria-label="Meal snapshot input"
        />

        <div className="row">
          <button
            className="button"
            type="button"
            onClick={() => alert("Stub: meal snapshot will be saved later.")}
          >
            Save
          </button>
          <button
            className="ghostButton"
            type="button"
            onClick={() => setMealNote("")}
          >
            Clear
          </button>
        </div>
      </section>

      {/* Expandable depth */}
      <section className="card">
        <details className="details">
          <summary className="summary">Cleaning zones</summary>
          <div className="muted small">
            Later: gentle zones (no “missed,” no “overdue”).
          </div>
        </details>

        <details className="details">
          <summary className="summary">Routines</summary>
          <div className="muted small">
            Later: optional routines (AM/PM), never forced.
          </div>
        </details>

        <details className="details">
          <summary className="summary">Important dates</summary>
          <div className="muted small">
            Later: dates as reference, not reminders.
          </div>
        </details>

        <details className="details">
          <summary className="summary">Notes</summary>
          <div className="muted">A place for life-admin thoughts (optional).</div>

          <textarea
            className="textarea"
            value={homeNote}
            onChange={(e) => setHomeNote(e.target.value)}
            placeholder="Notes… (optional)"
            aria-label="Home and life notes input"
          />

          <div className="row">
            <button
              className="button"
              type="button"
              onClick={() => alert("Stub: notes will be saved later.")}
            >
              Save
            </button>
            <button
              className="ghostButton"
              type="button"
              onClick={() => setHomeNote("")}
            >
              Clear
            </button>
          </div>
        </details>
      </section>

      <style jsx>{`
        .life {
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
          flex-wrap: wrap;
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
