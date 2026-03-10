// Placeholder for a simple area chart using SVG (since UI consistency is prioritized)
export function SimpleChart({ data, color = "stroke-primary-500" }: { data: number[], color?: string }) {
  const max = Math.max(...data);
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 100}`).join(" ");

  return (
    <svg viewBox="0 0 100 100" className={`w-full h-32 overflow-visible ${color}`}>
      <polyline
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}
