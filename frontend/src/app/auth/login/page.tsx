'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import toast from 'react-hot-toast';
import { AuthLayout, AuthField, AuthSubmitButton } from '@/components/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back');
      router.push('/dashboard/files');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      headline={<>Your files,<br /><em style={{ color: 'var(--accent)' }}>your space.</em></>}
      subtitle="A minimal cloud storage for photos and videos. Simple and yours."
    >
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Sign in
        </h1>
        <p style={{ marginTop: 6, fontSize: 13, color: 'var(--text-muted)', fontWeight: 300 }}>
          Welcome back to your storage
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <AuthField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
        <AuthField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />
        <AuthSubmitButton loading={loading} label="Sign in" loadingLabel="Signing in…" />
      </form>

      <p style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', fontWeight: 300 }}>
        No account?{' '}
        <Link href="/auth/register" style={{ color: 'var(--text-secondary)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
          Register here
        </Link>
      </p>
    </AuthLayout>
  );
}
