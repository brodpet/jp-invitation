export function Sprig({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <use href="#rose-stem" />
    </svg>
  );
}

export default function LeafDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <g
          id="rose-stem"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 182 C 50 150, 78 118, 118 76" />
          <path d="M60 140 c -20 -14, -22 -40, -6 -54 c 16 14, 18 40, 6 54z" />
          <path d="M60 140 c 4 -24, 22 -40, 46 -40 c -4 24, -22 40, -46 40z" />
          <path d="M92 104 c -22 -10, -32 -34, -22 -56 c 22 10, 32 34, 22 56z" />
          <path d="M36 166 c -14 -6, -20 -20, -14 -34 c 14 6, 20 20, 14 34z" />
          <path d="M126 68 c -6 -18, 6 -36, 24 -40 c 18 -4, 34 10, 34 28 c 0 20, -18 34, -38 30 c -12 -2, -20 -10, -20 -18z" />
          <path d="M132 62 c 0 -14, 12 -24, 26 -22 c 12 2, 20 12, 18 24 c -2 12, -14 20, -26 16 c -10 -2, -18 -10, -18 -18z" />
          <path d="M140 58 c 2 -8, 10 -14, 18 -12 c 8 2, 12 10, 8 16 c -4 8, -14 10, -20 6 c -4 -2, -6 -6, -6 -10z" />
          <path d="M148 54 c 4 -4, 10 -4, 12 0 c 2 4, -2 8, -6 8 c -4 0, -6 -4, -6 -8z" />
          <path d="M126 68 c -10 6, -22 8, -32 4" />
          <path d="M184 56 c 8 -10, 16 -12, 14 -4" />
        </g>
      </defs>
    </svg>
  );
}
