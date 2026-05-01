const stats = [
  { value: '∞', label: 'Storage limit is yours to set' },
  { value: '2', label: 'Media types supported' },
];

export default function StatsBar() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        border: '1px solid var(--border)',
        borderRadius: 14,
        overflow: 'hidden',
        background: 'var(--surface)',
      }}
    >
      {stats.map(({ value, label }, i) => (
        <div
          key={label}
          style={{
            padding: '24px 40px',
            borderLeft: i > 0 ? '1px solid var(--border)' : undefined,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 32,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            {value}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--text-muted)',
              fontWeight: 300,
              marginTop: 4,
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}