export default function HeroBadge({ label = 'Now in early access' }: { label?: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '5px 14px',
        borderRadius: 100,
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--text-muted)',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--accent)',
          display: 'inline-block',
          animation: 'pulse 2s ease infinite',
        }}
      />
      {label}
    </div>
  );
}
