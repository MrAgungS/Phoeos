interface AuthSubmitButtonProps {
  loading: boolean;
  label: string;
  loadingLabel: string;
}

export default function AuthSubmitButton({ loading, label, loadingLabel }: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{
        width: '100%',
        padding: '10px 0',
        borderRadius: 7,
        border: 'none',
        background: 'var(--text-primary)',
        color: 'var(--bg)',
        fontSize: 13,
        fontWeight: 500,
        fontFamily: 'var(--font-sans)',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.65 : 1,
        transition: 'opacity 0.15s',
        marginTop: 4,
      }}
    >
      {loading ? loadingLabel : label}
    </button>
  );
}
