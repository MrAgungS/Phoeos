export default function SkeletonRows({ count = 6 }: { count?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 52,
            borderRadius: 8,
            background: 'var(--bg-secondary)',
            animation: 'pulse 1.5s ease infinite',
            opacity: 1 - i * 0.1,
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
