'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import toast from 'react-hot-toast';
import { AuthLayout, AuthField, AuthSubmitButton } from '@/components/auth';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      toast.success('Account created — please sign in');
      router.push('/auth/login');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      headline={<>Join the<br /><em style={{ color: 'var(--accent)' }}>experiment.</em></>}
      subtitle="Selphos is a personal cloud storage project. Create an account and start uploading your media."
    >
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 22, fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Create account
        </h1>
        <p style={{ marginTop: 6, fontSize: 13, color: 'var(--text-muted)', fontWeight: 300 }}>
          Join Selphos for free
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <AuthField
          label="Name"
          type="text"
          value={name}
          onChange={setName}
          placeholder="Your name"
          required
          autoComplete="name"
        />
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
          placeholder="Min. 8 characters"
          required
          minLength={8}
          autoComplete="new-password"
        />
        <AuthSubmitButton loading={loading} label="Create account" loadingLabel="Creating account…" />
      </form>

      <p style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', fontWeight: 300 }}>
        Already have an account?{' '}
        <Link href="/auth/login" style={{ color: 'var(--text-secondary)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
