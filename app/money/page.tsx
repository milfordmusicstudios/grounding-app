"use client";

import React, { useMemo, useState } from "react";

type MoneyFocus = {
  label: string;
  value: string;
  note: string;
};

export default function MoneyPage() {
  // UI-only placeholders
  const focus = useMemo<MoneyFocus>(
    () => ({
      label: "Current focus",
      value: "Clarity",
      note: "A calm snapshot. No red alerts. No guilt language.",
    }),
    []
  );

  const [quickNote, setQuickNote] = useState("");

  return (
    <div className="money">
      {/* Header */}
      <section className="header">
        <h1 className="title">Money</h1>
        <div className="subtext">Awareness without anxiety.</div>
      </section>

      {/* Default view: one summary metric */}
      <section className="card">
        <div className="card-title">{focus.label}</div>

        <div className="metric">
          <div className="metricValue">{focus.value}</div>
          <div className="metricNote">{focus.note}</div>
        </div>

        <div className="muted small">
          This page avoids backlog counts, overdue language, and pressure.
        </div>
      </section>

      {/* Brain dump reminder (collapsed/floating, not embedded everywhere) */}
      <section className="card">
        <div className="card-title">Notes (optional)</div>

        <div className="muted">
          Quick thoughts live here if you want them. Otherwise use Brain Dump
          via <span className="kbd">+</span>.
        </div>

        <textarea
          className="textarea"
          value={quickNote}
          onChange={(e) => setQuickNote(e.target.value)}
          placeholder="Write a note… (optional)"
          aria-label="Money notes input"
        />

        <div className="row">
          <button
            className="button"
            type="button"
            onClick={() => alert("Stub: money notes will be saved later.")}
          >
            Save
          </button>
          <button
            className="ghostButton"
            type="button"
            onClick={() => setQuickNote("")}
          >
            Clear
          </button>
        </div>
      </section>

      {/* Expandable depth */}
      <section className="card">
        <details className="details">
          <summary className="summary">Bills</summary>
          <div className="muted small">
            Later: bills list + due dates shown neutrally (no “overdue” language).
          </div>
        </details>

        <details className="details">
          <summary className="summary">Budget</summary>
          <div className="muted small">
            Later: simple categories + one gentle indicator (optional).
          </div>
        </details>

        <details className="details">
          <summary className="summary">Sinking funds</summary>
          <div className="muted small">
            Later: goals without urgency.
          </div>
        </details>

        <details className="details">
          <summary className="summary">History</summary>
          <div className="muted small">
            Later: informational view only.
          </div>
        </details>
      </section>

      <style jsx>{`
        .money {
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

        .metric {
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 16px;
          background: white;
          padding: 12px;
        }

        .metricValue {
          font-size: 18px;
          font-weight: 700;
          color: rgba(0, 0, 0, 0.75);
          margin-bottom: 6px;
        }

        .metricNote {
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
