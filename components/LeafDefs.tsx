export function Sprig({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <use href="#leaf-branch" />
    </svg>
  );
}

export default function LeafDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <g
          id="leaf-branch"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 180 C 60 140, 100 100, 170 30" />
          <path d="M62 138 c -18 -22, -14 -44, 4 -56 c 12 18, 14 40, -4 56z" />
          <path d="M92 108 c -24 -10, -40 -30, -36 -52 c 22 4, 40 22, 36 52z" />
          <path d="M92 108 c 4 -24, 20 -42, 44 -46 c -2 24, -18 42, -44 46z" />
          <path d="M122 78 c -20 -14, -30 -36, -22 -58 c 20 8, 30 32, 22 58z" />
          <path d="M122 78 c 8 -22, 26 -36, 50 -36 c -6 22, -26 36, -50 36z" />
          <path d="M150 50 c 0 -18, 8 -30, 20 -36 c 4 14, -4 30, -20 36z" />
          <path d="M38 162 c -12 -8, -18 -20, -14 -32 c 12 6, 18 18, 14 32z" />
        </g>
      </defs>
    </svg>
  );
}
