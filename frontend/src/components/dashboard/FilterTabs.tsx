'use client';

interface Tab {
  label: string;
  value: string;
}

interface FilterTabsProps {
  tabs: Tab[];
  active: string;
  onChange: (value: string) => void;
}

export default function FilterTabs({ tabs, active, onChange }: FilterTabsProps) {
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid var(--border)',
        borderRadius: 6,
        overflow: 'hidden',
        background: 'var(--surface)',
      }}
    >
      {tabs.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          style={{
            padding: '6px 14px',
            fontSize: 12,
            fontFamily: 'var(--font-sans)',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.15s, color 0.15s',
            background: active === value ? 'var(--text-primary)' : 'transparent',
            color: active === value ? 'var(--bg)' : 'var(--text-secondary)',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
