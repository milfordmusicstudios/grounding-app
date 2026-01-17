"use client";

import React, { useEffect, useState } from "react";

type ToggleKey =
  | "showProgressOnTasks"
  | "useCircleProgress"
  | "reduceMotion"
  | "highContrast";

type Toggles = Record<ToggleKey, boolean>;

const THEME_KEY = "grounding:theme";
type Theme = "default" | "ink" | "80s";

export default function SettingsPage() {
  // UI-only local settings (we’ll persist later)
  const [toggles, setToggles] = useState<Toggles>({
    showProgressOnTasks: true,
    useCircleProgress: false,
    reduceMotion: false,
    highContrast: false,
  });

  // Theme selection (persist now via localStorage)
  const [theme, setTheme] = useState<Theme>("default");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY) as Theme | null;
      if (saved === "default" || saved === "ink" || saved === "80s") {
        setTheme(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  function applyTheme(next: Theme) {
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // ignore
    }

    // Tell layout.tsx to re-read theme immediately
    window.dispatchEvent(new Event("grounding-theme-change"));
  }

  function flip(key: ToggleKey) {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="settings">
      {/* Header */}
      <section className="header">
        <h1 className="title">Settings</h1>
        <div className="subtext">Quiet controls. No pressure.</div>
      </section>

      {/* Theme */}
      <section className="card">
        <div className="card-title">Theme</div>

        <div className="themeGroup" role="radiogroup" aria-label="Theme selection">
          <ThemeOption
            label="Default"
            hint="Clean and minimal."
            active={theme === "default"}
            onPick={() => applyTheme("default")}
          />
          <ThemeOption
            label="Ink"
            hint="Focused, calm dark."
            active={theme === "ink"}
            onPick={() => applyTheme("ink")}
          />
          <ThemeOption
            label="80’s Color Blocking"
            hint="Bright + playful contrast."
            active={theme === "80s"}
            onPick={() => applyTheme("80s")}
          />
        </div>
      </section>

      {/* Display */}
      <section className="card">
        <div className="card-title">Display</div>

        <SettingRow
          label="Show progress on tasks"
          hint="Progress only after interaction."
          checked={toggles.showProgressOnTasks}
          onToggle={() => flip("showProgressOnTasks")}
        />

        <SettingRow
          label="Progress style: circles"
          hint="Optional alternative to bars."
          checked={toggles.useCircleProgress}
          onToggle={() => flip("useCircleProgress")}
        />

        <SettingRow
          label="Reduce motion"
          hint="Gentler transitions."
          checked={toggles.reduceMotion}
          onToggle={() => flip("reduceMotion")}
        />

        <SettingRow
          label="High contrast"
          hint="Sharper edges and text."
          checked={toggles.highContrast}
          onToggle={() => flip("highContrast")}
        />
      </section>

      {/* Notifications (Tier-1 only concept) */}
      <section className="card">
        <div className="card-title">Notifications</div>

        <div className="muted">
          This app avoids urgency language and red alerts. Later: choose whether
          Tier-1 nudges appear on Home (subtle, no counts).
        </div>

        <div className="row">
          <button
            className="button"
            type="button"
            onClick={() => alert("Stub: notification preferences coming later.")}
          >
            Manage notifications
          </button>
        </div>
      </section>

      {/* Account (stub) */}
      <section className="card">
        <div className="card-title">Account</div>

        <div className="muted">
          You’re working locally right now. Later: login, sync, and export.
        </div>

        <div className="row">
          <button
            className="ghostButton"
            type="button"
            onClick={() => alert("Stub: login/sync later (Supabase).")}
          >
            Login & Sync
          </button>
        </div>
      </section>

      {/* Data (local-first intention) */}
      <section className="card">
        <div className="card-title">Data</div>

        <div className="muted">
          Later: export, import, and local backup. No tracking. No selling data.
        </div>

        <div className="row">
          <button
            className="ghostButton"
            type="button"
            onClick={() => alert("Stub: export coming later.")}
          >
            Export data
          </button>
          <button
            className="ghostButton"
            type="button"
            onClick={() => alert("Stub: import coming later.")}
          >
            Import data
          </button>
        </div>
      </section>

      <style jsx>{`
        .settings {
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
          font-size: 14px;
          line-height: 1.4;
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

        .themeGroup {
          display: grid;
          gap: 10px;
        }
      `}</style>
    </div>
  );
}

function ThemeOption({
  label,
  hint,
  active,
  onPick,
}: {
  label: string;
  hint: string;
  active: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      className={`themeOption ${active ? "active" : ""}`}
      onClick={onPick}
      aria-pressed={active}
    >
      <div className="left">
        <div className="label">{label}</div>
        <div className="hint">{hint}</div>
      </div>
      <div className={`dot ${active ? "on" : ""}`} aria-hidden="true" />

      <style jsx>{`
        .themeOption {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: white;
          cursor: pointer;
          text-align: left;
        }

        .themeOption.active {
          border-color: rgba(0, 0, 0, 0.22);
          background: rgba(0, 0, 0, 0.03);
        }

        .left {
          display: grid;
          gap: 3px;
        }

        .label {
          font-size: 14px;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.75);
        }

        .hint {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.55);
        }

        .dot {
          width: 14px;
          height: 14px;
          border-radius: 999px;
          border: 2px solid rgba(0, 0, 0, 0.25);
          background: transparent;
        }

        .dot.on {
          background: rgba(0, 0, 0, 0.55);
          border-color: rgba(0, 0, 0, 0.55);
        }
      `}</style>
    </button>
  );
}

function SettingRow({
  label,
  hint,
  checked,
  onToggle,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rowWrap">
      <div className="text">
        <div className="label">{label}</div>
        <div className="hint">{hint}</div>
      </div>

      <button
        type="button"
        className={`switch ${checked ? "on" : ""}`}
        onClick={onToggle}
        aria-label={`${label}: ${checked ? "On" : "Off"}`}
      >
        <span className="knob" />
      </button>

      <style jsx>{`
        .rowWrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px;
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: white;
          margin-bottom: 10px;
        }

        .text {
          display: grid;
          gap: 3px;
        }

        .label {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.75);
          font-weight: 600;
        }

        .hint {
          font-size: 12px;
          color: rgba(0,  0, 0, 0.55);
        }

        .switch {
          width: 44px;
          height: 26px;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.18);
          background: rgba(0, 0, 0, 0.06);
          padding: 3px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          transition: all 150ms ease;
        }

        .switch.on {
          background: rgba(0, 0, 0, 0.18);
          justify-content: flex-end;
        }

        .knob {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 1px solid rgba(0, 0, 0, 0.18);
        }
      `}</style>
    </div>
  );
}
