export default function QuoteBlock({
  quote = "I'm just experimenting with how cloud-based storage works — and maybe you can use it too.",
  attribution = 'Selphos, 2024',
}: {
  quote?: string;
  attribution?: string;
}) {
  return (
    <section style={{ padding: '28px 40px 40px', textAlign: 'center' }}>
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 20,
          lineHeight: 1.5,
          color: 'var(--text-muted)',
          maxWidth: 500,
          margin: '0 auto',
        }}
      >
        `{quote}`
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 16 }}>
        <div style={{ width: 32, height: 1, background: 'var(--border)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
          {attribution}
        </span>
        <div style={{ width: 32, height: 1, background: 'var(--border)' }} />
      </div>
    </section>
  );
}
