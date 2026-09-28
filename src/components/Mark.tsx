export function Mark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={(size * 22) / 34} viewBox="0 0 34 22" aria-hidden="true">
      <rect x="0" y="3" width="30" height="5" fill="#D6E4F7" />
      <rect x="0" y="14" width="25" height="5" fill="#E8A64A" />
      <rect x="30" y="0" width="3" height="22" fill="#E4574A" />
    </svg>
  );
}

export function Check({ color = "#E8A64A" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8.4l3.2 3.2L13 4.8" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
