'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AppPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        router.replace('/login');
        return;
      }
      setEmail(data.user.email ?? null);
    });
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>App</h1>
      {email ? <p>Signed in as {email}</p> : <p>Loading…</p>}

      <button onClick={handleSignOut} style={{ padding: 10, fontWeight: 700 }}>
        Sign out
      </button>
    </main>
  );
}
