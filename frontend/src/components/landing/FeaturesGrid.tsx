import { ImageIcon, Video, Shield, LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  label: string;
  desc: string;
}

const features: Feature[] = [
  {
    icon: ImageIcon,
    label: 'Photos',
    desc: 'Store all your image formats — JPEG, PNG, WebP, and more.',
  },
  {
    icon: Video,
    label: 'Videos',
    desc: 'MP4, WebM, MOV. Your footage, backed up securely.',
  },
  {
    icon: Shield,
    label: 'Versioning',
    desc: 'Every upload is versioned. Restore anything, anytime.',
  },
];

export default function FeaturesGrid() {
  return (
    <section style={{ padding: '28px 40px 0' }}>
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
        {features.map(({ icon: Icon, label, desc }, i) => (
          <div
            key={label}
            style={{
              padding: '28px 24px',
              borderLeft: i > 0 ? '1px solid var(--border)' : undefined,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 18,
                background: 'var(--accent-subtle)',
                border: '1px solid rgba(200,169,110,0.25)',
              }}
            >
              <Icon size={15} style={{ color: 'var(--accent-dark)' }} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 8 }}>
              {label}
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--text-secondary)', fontWeight: 300 }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
