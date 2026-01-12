"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BrainDumpPage() {
  const [text, setText] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    const lines = trimmed
      .split("\n")
      .map(l => l.trim())
      .filter(Boolean);

    for (const line of lines) {
      const { error } = await supabase.rpc("create_brain_dump_entry", {
        p_content: line
      });

      if (error) {
        console.error(error);
        alert("Failed to save brain dump");
        return;
      }
    }

    setText("");
  }

  return (
    <main style={{ padding: "2rem", maxWidth: 600 }}>
      <h1>Brain Dump</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type anything. No organizing."
          rows={10}
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <button type="submit">Save</button>
      </form>
    </main>
  );
}
