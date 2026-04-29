interface PageHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div
      style={{
        padding: '32px 32px 24px',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 24,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h1>
      <p
        style={{
          marginTop: 4,
          fontSize: 13,
          color: 'var(--text-muted)',
          fontWeight: 300,
        }}
      >
        {description}
      </p>
      {children && <div style={{ marginTop: 20 }}>{children}</div>}
    </div>
  );
}
