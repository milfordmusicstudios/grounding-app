"use client";

import React, { useState } from "react";

export default function PlansReferencePage() {
  const [note, setNote] = useState("");
  const [listItem, setListItem] = useState("");
  const [items, setItems] = useState<string[]>([
    "Studio info / contacts",
    "House rules / routines",
    "Reference lists",
  ]);

  const addItem = () => {
    const trimmed = listItem.trim();
    if (!trimmed) return;
    setItems((prev) => [trimmed, ...prev]);
    setListItem("");
  };

  return (
    <div className="plans">
      {/* Header */}
      <section className="header">
        <h1 className="title">Plans & Reference</h1>
        <div className="subtext">Storage, not action.</div>
      </section>

      {/* Default view */}
      <section className="card">
        <div className="card-title">Reference categories</div>

        <div className="muted">
          This page is for information you don’t want to hold in your head.
          Nothing here nags you. Nothing “counts.”
        </div>

        <ul className="list" aria-label="Reference categories list">
          {items.map((x, idx) => (
            <li key={`${x}-${idx}`} className="listItem">
              <span className="dot" aria-hidden="true" />
              <span>{x}</span>
            </li>
          ))}
        </ul>

        <div className="row">
          <input
            className="input"
            value={listItem}
            onChange={(e) => setListItem(e.target.value)}
            placeholder="Add a category…"
            aria-label="Add a reference category"
            onKeyDown={(e) => {
              if (e.key === "Enter") addItem();
            }}
          />
          <button className="button" type="button" onClick={addItem}>
            Add
          </button>
        </div>

        <div className="muted small">
          Rules: no reminders, no progress tracking, no urgency language.
        </div>
      </section>

      {/* Notes (optional) */}
      <section className="card">
        <div className="card-title">Notes (optional)</div>

        <div className="muted">
          Keep a calm note here. Later this can become saved reference docs.
        </div>

        <textarea
          className="textarea"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Anything you want to store…"
          aria-label="Plans and reference notes input"
        />

        <div className="row">
          <button
            className="button"
            type="button"
            onClick={() => alert("Stub: reference notes will be saved later.")}
          >
            Save
          </button>
          <button className="ghostButton" type="button" onClick={() => setNote("")}>
            Clear
          </button>
        </div>
      </section>

      {/* Expandable depth */}
      <section className="card">
        <details className="details">
          <summary className="summary">Long-term plans</summary>
          <div className="muted small">
            Later: store plans without turning them into tasks automatically.
          </div>
        </details>

        <details className="details">
          <summary className="summary">Lists</summary>
          <div className="muted small">
            Later: checklists that don’t create reminders.
          </div>
        </details>

        <details className="details">
          <summary className="summary">Static info</summary>
          <div className="muted small">
            Later: addresses, logins (securely), FAQs, policies.
          </div>
        </details>
      </section>

      <style jsx>{`
        .plans {
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

        .muted {
          color: rgba(0, 0, 0, 0.55);
        }

        .small {
          font-size: 12px;
          margin-top: 10px;
        }

        .list {
          margin: 10px 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 8px;
        }

        .listItem {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 10px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 14px;
          background: white;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.25);
          flex: 0 0 auto;
        }

        .row {
          display: flex;
          gap: 10px;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        .input {
          flex: 1 1 220px;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: white;
          outline: none;
          font-family: inherit;
          font-size: 14px;
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
