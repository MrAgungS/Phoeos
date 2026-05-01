export default function SiteFooter() {
  return (
    <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 40px', borderTop: '1px solid var(--border-subtle)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--text-muted)' }}>Selphos</span>
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
        an experiment in storage
      </span>
    </footer>
  );
}
