import React from "react";

const habits = [
  { id: "breathe", label: "Take a few slow breaths" },
  { id: "water", label: "Drink some water" },
  { id: "stretch", label: "Gentle stretch" },
  { id: "light", label: "Step into natural light" },
  { id: "pause", label: "Pause and notice how you feel" },
];

const weekPattern = [
  { day: "Mon", tone: "soft" },
  { day: "Tue", tone: "soft" },
  { day: "Wed", tone: "empty" },
  { day: "Thu", tone: "soft" },
  { day: "Fri", tone: "empty" },
  { day: "Sat", tone: "soft" },
  { day: "Sun", tone: "empty" },
];

export default function HabitsPage() {
  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "32px 20px 64px",
      }}
    >
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>
          I'm allowed to take care of myself imperfectly.
        </h1>
        <p style={{ margin: 0, opacity: 0.75 }}>
          A quiet checklist for today. No pressure, just options.
        </p>
      </header>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>Today</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {habits.map((habit) => (
            <li
              key={habit.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 0",
              }}
            >
              <input id={habit.id} type="checkbox" />
              <label htmlFor={habit.id} style={{ cursor: "pointer" }}>
                {habit.label}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: 20 }}>
        <details
          style={{
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 12,
            padding: "10px 14px",
            background: "rgba(0,0,0,0.02)",
          }}
        >
          <summary style={{ cursor: "pointer", opacity: 0.75 }}>
            Weekly pattern preview
          </summary>
          <div style={{ marginTop: 12 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                gap: 8,
                textAlign: "center",
                fontSize: 12,
                opacity: 0.7,
              }}
            >
              {weekPattern.map((d) => (
                <div key={d.day}>
                  <div style={{ marginBottom: 6 }}>{d.day}</div>
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      margin: "0 auto",
                      borderRadius: 6,
                      background:
                        d.tone === "soft"
                          ? "rgba(0,0,0,0.12)"
                          : "rgba(0,0,0,0.04)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </details>
      </section>

      <section>
        <details
          style={{
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 12,
            padding: "10px 14px",
            background: "rgba(0,0,0,0.02)",
          }}
        >
          <summary style={{ cursor: "pointer", opacity: 0.75 }}>
            Optional wellness check-in
          </summary>
          <div style={{ marginTop: 12, opacity: 0.85 }}>
            <div style={{ marginBottom: 12 }}>
              <div style={{ marginBottom: 6 }}>Sleep</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <label>
                  <input type="radio" name="sleep" /> Rested
                </label>
                <label>
                  <input type="radio" name="sleep" /> Okay
                </label>
                <label>
                  <input type="radio" name="sleep" /> Tired
                </label>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ marginBottom: 6 }}>Energy</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <label>
                  <input type="radio" name="energy" /> Steady
                </label>
                <label>
                  <input type="radio" name="energy" /> Low
                </label>
                <label>
                  <input type="radio" name="energy" /> Gentle lift
                </label>
              </div>
            </div>
            <div>
              <div style={{ marginBottom: 6 }}>Mood</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <label>
                  <input type="radio" name="mood" /> Calm
                </label>
                <label>
                  <input type="radio" name="mood" /> Tender
                </label>
                <label>
                  <input type="radio" name="mood" /> Worn
                </label>
              </div>
            </div>
          </div>
        </details>
      </section>
    </main>
  );
}
