'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [message, setMessage] = useState<string>('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    if (!email || !password) {
      setMessage('Please enter email and password.');
      return;
    }

    const result =
      mode === 'signup'
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    setMessage(mode === 'signup'
      ? 'Check your email for a confirmation link (if confirmations are enabled).'
      : 'Signed in successfully.'
    );
  }

  return (
    <main style={{ maxWidth: 420, margin: '40px auto', padding: 16 }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>Login</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button
          onClick={() => setMode('signin')}
          style={{ padding: '8px 12px', fontWeight: mode === 'signin' ? 700 : 400 }}
        >
          Sign in
        </button>
        <button
          onClick={() => setMode('signup')}
          style={{ padding: '8px 12px', fontWeight: mode === 'signup' ? 700 : 400 }}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            style={{ padding: 10 }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            style={{ padding: 10 }}
          />
        </label>

        <button type="submit" style={{ padding: 10, fontWeight: 700 }}>
          {mode === 'signup' ? 'Create account' : 'Sign in'}
        </button>

        {message && <p>{message}</p>}
      </form>
    </main>
  );
}
