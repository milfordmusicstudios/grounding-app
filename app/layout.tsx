"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const THEME_KEY = "grounding:theme";
type Theme = "default" | "ink" | "80s";

function bodyThemeClass(theme: Theme) {
  if (theme === "ink") return "theme-ink";
  if (theme === "80s") return "theme-80s";
  return "";
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Theme state (UI-only for now)
  const [theme, setTheme] = useState<Theme>("default");

  useEffect(() => {
    // Load saved theme on boot
    try {
      const saved = localStorage.getItem(THEME_KEY) as Theme | null;
      if (saved === "default" || saved === "ink" || saved === "80s") {
        setTheme(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    // Listen for changes from Settings page (instant update)
    function onThemeChange() {
      try {
        const saved = localStorage.getItem(THEME_KEY) as Theme | null;
        if (saved === "default" || saved === "ink" || saved === "80s") {
          setTheme(saved);
        } else {
          setTheme("default");
        }
      } catch {
        setTheme("default");
      }
    }

    window.addEventListener("grounding-theme-change", onThemeChange);
    return () => window.removeEventListener("grounding-theme-change", onThemeChange);
  }, []);

  // UI-only local state (no Supabase needed)
  const [moreOpen, setMoreOpen] = useState(false);
  const [brainDumpOpen, setBrainDumpOpen] = useState(false);
  const [brainDumpText, setBrainDumpText] = useState("");
  const [clarifyText, setClarifyText] = useState("");

  const activeTab = useMemo(() => {
    // Map routes to bottom nav tabs
    if (pathname === "/") return "home";
    if (pathname?.startsWith("/todo")) return "todo";
    if (pathname?.startsWith("/habits")) return "habits";
    if (pathname?.startsWith("/faith")) return "faith";
    if (pathname?.startsWith("/review")) return "review";
    return "more"; // secondary pages live outside bottom nav
  }, [pathname]);

  function openBrainDump() {
    setMoreOpen(false);
    setBrainDumpOpen(true);
  }

  function closeBrainDump() {
    setBrainDumpOpen(false);
    // Do not auto-commit anything (per spec)
  }

  function submitBrainDumpToClarify() {
    // In the spec: capture first; clarify optional; nothing auto-commits.
    // For now, we just move text into a "Clarify" preview field.
    const trimmed = brainDumpText.trim();
    if (!trimmed) return;
    setClarifyText(trimmed);
    setBrainDumpText("");
  }

  return (
    <html lang="en">
      <body className={bodyThemeClass(theme)}>
        {/* App Frame */}
        <div className="app-shell">
          {/* Top Bar — calm, no counts */}
          <header className="topbar">
            <button
              className="icon-button"
              type="button"
              aria-label="Profile / Settings"
              onClick={() => {
                setMoreOpen(false);
                window.location.href = "/settings";
              }}
            >
              {/* Avatar placeholder */}
              <span className="avatar-circle" />
            </button>

            <div className="topbar-title" aria-label="Current section">
              {activeTab === "home"
                ? "Home"
                : activeTab === "todo"
                ? "To-Do"
                : activeTab === "habits"
                ? "Habits"
                : activeTab === "faith"
                ? "Faith"
                : activeTab === "review"
                ? "Review"
                : "More"}
            </div>

            <button
              className="icon-button"
              type="button"
              aria-label="Notifications (Tier 1 only)"
              onClick={() => {
                // Stub: later you can open a small notifications sheet
                alert("Notifications (Tier 1 only) — stub for now.");
              }}
            >
              <span className="bell-dot" />
            </button>
          </header>

          {/* Page Content */}
          <main className="page">{children}</main>

          {/* Brain Dump — floating access (global capture) */}
          <button
            type="button"
            className="fab"
            aria-label="Open Brain Dump"
            onClick={openBrainDump}
          >
            +
          </button>

          {/* Bottom Navigation */}
          <nav className="bottom-nav" aria-label="Bottom navigation">
            <Link
              className={navClass(activeTab === "home")}
              href="/"
              onClick={() => setMoreOpen(false)}
            >
              <span className="nav-icon">⌂</span>
              <span className="nav-label">Home</span>
            </Link>

            <Link
              className={navClass(activeTab === "todo")}
              href="/todo"
              onClick={() => setMoreOpen(false)}
            >
              <span className="nav-icon">☐</span>
              <span className="nav-label">To-Do</span>
            </Link>

            <Link
              className={navClass(activeTab === "habits")}
              href="/habits"
              onClick={() => setMoreOpen(false)}
            >
              <span className="nav-icon">✓</span>
              <span className="nav-label">Habits</span>
            </Link>

            <Link
              className={navClass(activeTab === "faith")}
              href="/faith"
              onClick={() => setMoreOpen(false)}
            >
              <span className="nav-icon">✦</span>
              <span className="nav-label">Faith</span>
            </Link>

            <Link
              className={navClass(activeTab === "review")}
              href="/review"
              onClick={() => setMoreOpen(false)}
            >
              <span className="nav-icon">★</span>
              <span className="nav-label">Review</span>
            </Link>

            <button
              type="button"
              className={navClass(activeTab === "more")}
              aria-label="More"
              onClick={() => setMoreOpen((v) => !v)}
            >
              <span className="nav-icon">≡</span>
              <span className="nav-label">More</span>
            </button>
          </nav>
        </div>

        {/* More Drawer (overlay menu, not a page) */}
        {moreOpen && (
          <div
            className="overlay"
            role="dialog"
            aria-modal="true"
            aria-label="More menu"
            onMouseDown={(e) => {
              // click outside closes
              if (e.target === e.currentTarget) setMoreOpen(false);
            }}
          >
            <div className="sheet">
              <div className="sheet-header">
                <div className="sheet-title">More</div>
                <button
                  type="button"
                  className="text-button"
                  onClick={() => setMoreOpen(false)}
                >
                  Close
                </button>
              </div>

              <div className="sheet-section">
                <div className="sheet-section-title">Domains</div>
                <MenuLink href="/home-life" label="Home & Life" onPick={() => setMoreOpen(false)} />
                <MenuLink href="/money" label="Money" onPick={() => setMoreOpen(false)} />
                <MenuLink href="/creative" label="Creative & Fun" onPick={() => setMoreOpen(false)} />
                <MenuLink
                  href="/plans-reference"
                  label="Plans & Reference"
                  onPick={() => setMoreOpen(false)}
                />
              </div>

              <div className="sheet-section">
                <div className="sheet-section-title">Account</div>
                <MenuLink href="/settings" label="Settings" onPick={() => setMoreOpen(false)} />
                <MenuLink href="/login" label="Login (stub)" onPick={() => setMoreOpen(false)} />
              </div>

              <div className="sheet-section">
                <div className="sheet-section-title">Capture</div>
                <button type="button" className="menu-button" onClick={openBrainDump}>
                  Open Brain Dump
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Brain Dump Sheet (global capture + nested Clarify preview) */}
        {brainDumpOpen && (
          <div
            className="overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Brain Dump"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeBrainDump();
            }}
          >
            <div className="sheet">
              <div className="sheet-header">
                <div className="sheet-title">Brain Dump</div>
                <button type="button" className="text-button" onClick={closeBrainDump}>
                  Close
                </button>
              </div>

              {/* Capture (collapsed-by-default concept: here it’s a single line) */}
              <label className="field-label" htmlFor="brainDumpInput">
                Capture (nothing auto-commits)
              </label>
              <input
                id="brainDumpInput"
                className="text-field"
                placeholder="Type one thought…"
                value={brainDumpText}
                onChange={(e) => setBrainDumpText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitBrainDumpToClarify();
                }}
              />

              <div className="row">
                <button type="button" className="primary-button" onClick={submitBrainDumpToClarify}>
                  Add to Clarify
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setBrainDumpText("")}
                >
                  Clear
                </button>
              </div>

              {/* Clarify (nested, optional, max 1 preview) */}
              <div className="sheet-section">
                <div className="sheet-section-title">Clarify (optional)</div>

                {clarifyText ? (
                  <div className="clarify-card">
                    <div className="clarify-item-title">Needs clarification</div>
                    <div className="clarify-item-body">{clarifyText}</div>
                    <label className="field-label" htmlFor="clarifyNotes">
                      Quick clarify note (optional)
                    </label>
                    <textarea
                      id="clarifyNotes"
                      className="text-area"
                      placeholder="What does this mean / what category does it belong to?"
                      rows={3}
                      defaultValue=""
                    />
                    <div className="row">
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() => setClarifyText("")}
                      >
                        Dismiss
                      </button>
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => alert("Later: convert to task/habit/domain item.")}
                      >
                        Convert (later)
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="muted">No items need clarification right now.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Minimal styling so it looks usable immediately (you can move this into globals later) */}
        <style jsx global>{`
          :root {
            --bg: #ffffff;
            --ink: #1a1a1a;
            --muted: rgba(0, 0, 0, 0.55);
            --border: rgba(0, 0, 0, 0.12);
            --card: rgba(255, 255, 255, 0.92);
            --shadow: 0 10px 30px rgba(0, 0, 0, 0.14);
            --radius: 16px;
            --nav-h: 64px;
            --top-h: 54px;
          }

          /* ===============================
             THEME: Ink & Slate
             =============================== */
          body.theme-ink {
            --bg: #121417;
            --ink: #e6e8eb;
            --muted: rgba(230, 232, 235, 0.65);
            --border: rgba(255, 255, 255, 0.1);

            --card: rgba(27, 31, 36, 0.92);
            --shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
          }

/* ===============================
   THEME: 80s NEON (OBNOXIOUS ON PURPOSE)
   =============================== */
body.theme-80s {
  /* FOUNDATION */
  --bg: #0b0016;                 /* deep purple-black */
  --ink: #39ff14;                /* NEON GREEN TEXT */
  --muted: #ff4fd8;              /* hot pink secondary */
  --border: #00eaff;             /* cyan outlines */

  /* SURFACES */
  --card: #1a0033;               /* saturated purple */
  --overlay: #26004d;
  --shadow: 
    0 0 0 3px #00eaff,
    0 0 20px #ff00ff,
    0 0 40px rgba(255, 0, 255, 0.6);

  --radius: 20px;

  /* ACCENTS / CONTROLS */
  --accent: #ffea00;             /* electric yellow */
  --accent-soft: rgba(255, 234, 0, 0.35);
  --focus: #ffea00;

  /* INPUTS */
  --input-bg: #000000;
  --input-text: #39ff14;
  --input-placeholder: rgba(57, 255, 20, 0.55);

  /* NAVIGATION */
  --nav-bg: linear-gradient(
    90deg,
    #ff00ff,
    #00eaff,
    #39ff14
  );
  --nav-text: #000000;
  --nav-icon: #000000;
  --nav-muted: rgba(0, 0, 0, 0.55);
  --nav-active: #ffea00;

  /* BUTTONS */
  --btn-primary: #ff00ff;
  --btn-primary-text: #000000;
  --btn-secondary: #00eaff;
  --danger: #ff0033;

  /* PROGRESS */
  --progress-track: #000000;
  --progress-fill: linear-gradient(
    90deg,
    #ff00ff,
    #00eaff,
    #39ff14
  );
}

          body {
            margin: 0;
            background: var(--bg);
            color: var(--ink);
            font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
              Helvetica, Arial;
          }

          .app-shell {
            min-height: 100vh;
            display: grid;
            grid-template-rows: var(--top-h) 1fr var(--nav-h);
          }

          .topbar {
            display: grid;
            grid-template-columns: 54px 1fr 54px;
            align-items: center;
            padding: 0 8px;
            border-bottom: 1px solid var(--border);
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(10px);
            position: sticky;
            top: 0;
            z-index: 10;
          }

          .topbar-title {
            text-align: center;
            font-size: 16px;
            letter-spacing: 0.2px;
          }

          .icon-button {
            width: 42px;
            height: 42px;
            border: 1px solid var(--border);
            border-radius: 999px;
            background: white;
            cursor: pointer;
            display: grid;
            place-items: center;
          }

          .avatar-circle {
            width: 18px;
            height: 18px;
            border-radius: 999px;
            border: 2px solid var(--border);
          }

          .bell-dot {
            width: 16px;
            height: 16px;
            border-radius: 999px;
            border: 2px solid var(--border);
            position: relative;
          }
          .bell-dot::after {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 999px;
            position: absolute;
            top: -2px;
            right: -2px;
            background: rgba(0, 0, 0, 0.35);
          }

          .page {
            padding: 16px 14px calc(var(--nav-h) + 18px);
            max-width: 520px;
            width: 100%;
            margin: 0 auto;
          }

          .bottom-nav {
            position: sticky;
            bottom: 0;
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            align-items: center;
            gap: 4px;
            padding: 8px 8px 10px;
            border-top: 1px solid var(--border);
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            z-index: 10;
          }

          .nav-item {
            display: grid;
            justify-items: center;
            gap: 2px;
            text-decoration: none;
            color: var(--muted);
            font-size: 11px;
            padding: 6px 2px;
            border-radius: 14px;
            border: 1px solid transparent;
          }

          .nav-item-active {
            color: var(--ink);
            border-color: var(--border);
            background: rgba(0, 0, 0, 0.03);
          }

          .nav-icon {
            font-size: 16px;
            line-height: 1;
          }

          .fab {
            position: fixed;
            right: 16px;
            bottom: calc(var(--nav-h) + 18px);
            width: 54px;
            height: 54px;
            border-radius: 999px;
            border: 1px solid var(--border);
            background: white;
            box-shadow: var(--shadow);
            font-size: 24px;
            cursor: pointer;
            z-index: 20;
          }

          .overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.25);
            display: grid;
            place-items: end center;
            padding: 16px;
            z-index: 30;
          }

          .sheet {
            width: min(560px, 100%);
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 22px;
            box-shadow: var(--shadow);
            padding: 14px;
          }

          .sheet-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 4px 2px 10px;
          }

          .sheet-title {
            font-size: 16px;
          }

          .text-button {
            border: none;
            background: transparent;
            color: var(--muted);
            cursor: pointer;
            padding: 8px 10px;
            border-radius: 12px;
          }
          .text-button:hover {
            background: rgba(0, 0, 0, 0.04);
          }

          .sheet-section {
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid var(--border);
          }

          .sheet-section-title {
            font-size: 12px;
            color: var(--muted);
            margin-bottom: 8px;
            letter-spacing: 0.2px;
          }

          .menu-button {
            width: 100%;
            text-align: left;
            padding: 10px 12px;
            border-radius: 14px;
            border: 1px solid var(--border);
            background: white;
            cursor: pointer;
            margin-bottom: 8px;
          }

          .field-label {
            display: block;
            font-size: 12px;
            color: var(--muted);
            margin: 8px 0 6px;
          }

          .text-field {
            width: 100%;
            padding: 12px 12px;
            border-radius: 14px;
            border: 1px solid var(--border);
            background: white;
            outline: none;
          }

          .text-area {
            width: 100%;
            padding: 12px 12px;
            border-radius: 14px;
            border: 1px solid var(--border);
            background: white;
            outline: none;
            resize: vertical;
          }

          .row {
            display: flex;
            gap: 10px;
            margin-top: 10px;
          }

          .primary-button,
          .secondary-button {
            flex: 1;
            padding: 12px 12px;
            border-radius: 14px;
            border: 1px solid var(--border);
            cursor: pointer;
            background: white;
          }

          .primary-button {
            background: rgba(0, 0, 0, 0.06);
          }

          .muted {
            color: var(--muted);
            font-size: 13px;
          }

          .clarify-card {
            border: 1px solid var(--border);
            border-radius: var(--radius);
            background: white;
            padding: 12px;
          }

          .clarify-item-title {
            font-size: 12px;
            color: var(--muted);
            margin-bottom: 6px;
          }

          .clarify-item-body {
            font-size: 14px;
            margin-bottom: 10px;
          }
        `}</style>
      </body>
    </html>
  );
}

function navClass(active: boolean) {
  return active ? "nav-item nav-item-active" : "nav-item";
}

function MenuLink({
  href,
  label,
  onPick,
}: {
  href: string;
  label: string;
  onPick: () => void;
}) {
  return (
    <Link href={href} className="menu-button" onClick={onPick}>
      {label}
    </Link>
  );
}
