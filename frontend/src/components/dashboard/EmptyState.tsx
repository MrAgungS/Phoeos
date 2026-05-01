import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
        }}
      >
        <Icon size={20} style={{ color: 'var(--text-muted)' }} />
      </div>
      <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{title}</p>
      <p style={{ fontSize: 12, marginTop: 4, color: 'var(--text-muted)', fontWeight: 300 }}>
        {description}
      </p>
    </div>
  );
}
