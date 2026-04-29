import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  /** Bold italic headline on the dark left panel */
  headline: React.ReactNode;
  /** Subtitle below the headline */
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({ headline, subtitle, children }: AuthLayoutProps) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* ── Left dark panel (hidden on mobile) ── */}
      <div
        style={{
          display: 'none',
          width: '45%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 48,
          background: 'var(--text-primary)',
          flexShrink: 0,
        }}
        className="auth-left-panel"
      >
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            color: 'var(--bg)',
            textDecoration: 'none',
            opacity: 0.55,
          }}
        >
          <ArrowLeft size={13} />
          Back
        </Link>

        <div>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3vw, 40px)',
              lineHeight: 1.15,
              color: 'var(--bg)',
              letterSpacing: '-0.02em',
            }}
          >
            {headline}
          </p>
          <p
            style={{
              marginTop: 16,
              fontSize: 13,
              lineHeight: 1.7,
              color: 'var(--bg)',
              opacity: 0.45,
              fontWeight: 300,
              maxWidth: 280,
            }}
          >
            {subtitle}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--accent)',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--bg)',
              opacity: 0.35,
            }}
          >
            selphos.storage
          </span>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
        }}
      >
        {/* Mobile-only logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 20,
            color: 'var(--text-primary)',
            textDecoration: 'none',
            marginBottom: 32,
            display: 'none',
          }}
          className="auth-mobile-logo"
        >
          Selphos
        </Link>

        <div style={{ width: '100%', maxWidth: 360 }}>{children}</div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .auth-left-panel { display: flex !important; }
        }
        @media (max-width: 1023px) {
          .auth-mobile-logo { display: block !important; }
        }
      `}</style>
    </div>
  );
}
