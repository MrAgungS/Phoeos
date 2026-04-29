import Link from 'next/link';

export default function NavBar() {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 40px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(250,250,247,0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'inline-block',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}
        >
          Selphos
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Link
          href="/auth/login"
          style={{
            fontSize: 13,
            padding: '7px 16px',
            borderRadius: 7,
            color: 'var(--text-secondary)',
            textDecoration: 'none',
          }}
        >
          Sign in
        </Link>
        <Link
          href="/auth/register"
          style={{
            fontSize: 13,
            fontWeight: 500,
            padding: '7px 18px',
            borderRadius: 7,
            background: 'var(--text-primary)',
            color: 'var(--bg)',
            textDecoration: 'none',
          }}
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}
