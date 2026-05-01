const steps = [
  {
    number: '01',
    name: 'Create an account',
    desc: 'Register in seconds. No credit card, no fuss.',
  },
  {
    number: '02',
    name: 'Upload your media',
    desc: 'Drag and drop photos and videos. Files go straight to secure cloud storage.',
  },
  {
    number: '03',
    name: 'Access anywhere',
    desc: 'Browse, download, or restore any version of your files whenever you need.',
  },
];

export default function HowItWorks() {
  return (
    <section style={{ padding: '0 40px 36px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          overflow: 'hidden',
          background: 'var(--surface)',
        }}
      >
        {steps.map(({ number, name, desc }, i) => (
          <div
            key={number}
            style={{
              padding: '22px 20px',
              borderLeft: i > 0 ? '1px solid var(--border)' : undefined,
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', marginBottom: 12 }}>
              {number}
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 6 }}>
              {name}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.65, color: 'var(--text-secondary)', fontWeight: 300 }}>
              {desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
