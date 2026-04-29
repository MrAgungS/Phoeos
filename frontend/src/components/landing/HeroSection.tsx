import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HeroBadge from './HeroBadge';

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 40px 60px',
        minHeight: 480,
        overflow: 'hidden',
      }}
    >
      {/* Decorative rings */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        {[440, 660, 880].map((size, i) => (
          <div
            key={size}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              border: '1px solid var(--accent)',
              opacity: [0.15, 0.07, 0.04][i],
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 560,
          margin: '0 auto',
        }}
      >
        <HeroBadge />

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 60px)',
            lineHeight: 1.08,
            color: 'var(--text-primary)',
            letterSpacing: '-0.025em',
            marginTop: 28,
          }}
        >
          Your memories,
          <br />
          <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>simply stored.</em>
        </h1>

        <p
          style={{
            marginTop: 20,
            fontSize: 15,
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            fontWeight: 300,
            maxWidth: 420,
          }}
        >
          Selphos is an experiment in cloud storage — a clean, personal space to keep your photos
          and videos. Nothing more, nothing less.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 36 }}>
          <Link
            href="/auth/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              fontWeight: 500,
              padding: '10px 22px',
              borderRadius: 8,
              background: 'var(--text-primary)',
              color: 'var(--bg)',
              textDecoration: 'none',
            }}
          >
            Start storing
            <ArrowRight size={13} />
          </Link>
          <Link
            href="/auth/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              fontSize: 13,
              padding: '10px 22px',
              borderRadius: 8,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
            }}
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
