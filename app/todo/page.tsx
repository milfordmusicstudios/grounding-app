"use client";

import React, { useMemo, useState } from "react";

type Task = {
  id: string;
  label: string;
  done: boolean;
  bucket: "today" | "tomorrow" | "week" | "future";
};

export default function TodoPage() {
  // UI-only placeholder tasks (no backend)
  const [tasks, setTasks] = useState<Task[]>([
    { id: "t1", label: "One small reset task", done: false, bucket: "today" },
    { id: "t2", label: "One practical task", done: false, bucket: "today" },
    { id: "t3", label: "One gentle care task", done: false, bucket: "today" },
    { id: "t4", label: "Something for tomorrow (collapsed)", done: false, bucket: "tomorrow" },
    { id: "t5", label: "A this-week idea (collapsed)", done: false, bucket: "week" },
    { id: "t6", label: "A future task (collapsed)", done: false, bucket: "future" },
  ]);

  const [newTask, setNewTask] = useState("");
  const [showRoutines, setShowRoutines] = useState(false);

  const grouped = useMemo(() => {
    const by: Record<Task["bucket"], Task[]> = {
      today: [],
      tomorrow: [],
      week: [],
      future: [],
    };
    for (const t of tasks) by[t.bucket].push(t);
    return by;
  }, [tasks]);

  function toggleDone(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
    // No XP, no streaks, no urgency — just quiet interaction.
  }

  function addToToday() {
    const label = newTask.trim();
    if (!label) return;
    setTasks((prev) => [
      { id: crypto.randomUUID(), label, done: false, bucket: "today" },
      ...prev,
    ]);
    setNewTask("");
  }

  return (
    <div className="todo">
      {/* Calm header */}
      <section className="header">
        <h1 className="title">To-Do</h1>
        <div className="subtext">A calm stack: Today, Soon, Exists.</div>
      </section>

      {/* Today (open by default) */}
      <section className="card">
        <div className="card-title">Today</div>

        {/* Add a task (manual; no auto-promotion) */}
        <div className="addRow">
          <input
            className="textField"
            placeholder="Add one task for today…"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addToToday();
            }}
            aria-label="Add a task for today"
          />
          <button className="button" type="button" onClick={addToToday}>
            Add
          </button>
        </div>

        <TaskList tasks={grouped.today} onToggle={toggleDone} emptyText="Nothing here right now." />

        {/* Optional: Times hidden by default (we just don’t show them at all yet) */}
      </section>

      {/* Brain Dump + Clarify note (nested elsewhere; no forced navigation) */}
      <section className="card">
        <div className="card-title">Brain Dump + Clarify</div>
        <div className="muted">
          Use the <span className="kbd">+</span> button to capture. Clarify is optional.
        </div>
        <div className="muted small">
          Preview rule: max 1 Clarify item visible by default (handled in the global sheet).
        </div>
      </section>

      {/* Collapsed buckets */}
      <section className="card">
        <details className="details">
          <summary className="summary">Tomorrow</summary>
          <TaskList
            tasks={grouped.tomorrow}
            onToggle={toggleDone}
            emptyText="Nothing parked for tomorrow."
          />
        </details>

        <details className="details">
          <summary className="summary">This Week</summary>
          <TaskList
            tasks={grouped.week}
            onToggle={toggleDone}
            emptyText="Nothing parked for this week."
          />
        </details>

        <details className="details">
          <summary className="summary">Future Tasks</summary>
          <TaskList
            tasks={grouped.future}
            onToggle={toggleDone}
            emptyText="Nothing parked for the future."
          />
        </details>
      </section>

      {/* Optional toggle: Routines (collapsed, never steals focus) */}
      <section className="card">
        <div className="rowBetween">
          <div>
            <div className="card-title" style={{ marginBottom: 4 }}>
              Routines (optional)
            </div>
            <div className="muted small">Collapsed by default. Not required.</div>
          </div>

          <button
            className="ghostButton"
            type="button"
            onClick={() => setShowRoutines((v) => !v)}
            aria-label="Toggle routines section"
          >
            {showRoutines ? "Hide" : "Show"}
          </button>
        </div>

        {showRoutines && (
          <div className="routines">
            <div className="routineBlock">
              <div className="routineTitle">AM (optional)</div>
              <div className="muted small">Later: simple checklist.</div>
            </div>
            <div className="routineBlock">
              <div className="routineTitle">PM (optional)</div>
              <div className="muted small">Later: simple checklist.</div>
            </div>
          </div>
        )}
      </section>

      <style jsx>{`
        .todo {
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
          letter-spacing: 0.2px;
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
          letter-spacing: 0.2px;
        }

        .addRow {
          display: grid;
          grid-template-columns: 1fr 86px;
          gap: 10px;
          margin-bottom: 12px;
        }

        .textField {
          width: 100%;
          padding: 12px 12px;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: white;
          outline: none;
        }

        .button {
          padding: 12px 12px;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: rgba(0, 0, 0, 0.04);
          cursor: pointer;
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

        .rowBetween {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .ghostButton {
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: white;
          border-radius: 14px;
          padding: 10px 12px;
          cursor: pointer;
          color: rgba(0, 0, 0, 0.65);
          font-size: 13px;
        }

        .routines {
          margin-top: 12px;
          display: grid;
          gap: 10px;
        }

        .routineBlock {
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 16px;
          background: white;
          padding: 12px;
        }

        .routineTitle {
          font-size: 13px;
          color: rgba(0, 0, 0, 0.7);
          margin-bottom: 6px;
        }
      `}</style>
    </div>
  );
}

function TaskList({
  tasks,
  onToggle,
  emptyText,
}: {
  tasks: Task[];
  onToggle: (id: string) => void;
  emptyText: string;
}) {
  if (!tasks.length) {
    return <div className="muted small">{emptyText}</div>;
  }

  return (
    <ul className="list" aria-label="Task list">
      {tasks.map((t) => (
        <li key={t.id} className="item">
          <input
            type="checkbox"
            className="checkbox"
            checked={t.done}
            onChange={() => onToggle(t.id)}
            aria-label={`Mark done: ${t.label}`}
          />
          <span className="text">{t.label}</span>
        </li>
      ))}

      <style jsx>{`
        .list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 10px;
        }

        .item {
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

        .text {
          font-size: 14px;
        }
      `}</style>
    </ul>
  );
}
