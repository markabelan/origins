export default function ProtonGradient() {
  return (
    <div className="gradient-scene" aria-hidden="true">
      <svg className="gradient-scene__svg" viewBox="0 0 320 160">
        <text x="16" y="28" className="gradient-scene__label">
          outside · high H⁺
        </text>
        <text x="16" y="148" className="gradient-scene__label">
          inside · low H⁺
        </text>
        <rect x="24" y="70" width="272" height="18" rx="2" fill="#1c3d3a" stroke="#7aa39a" strokeWidth="1" />
        <rect x="40" y="70" width="18" height="18" fill="#c98a3d" opacity="0.85" />
        <rect x="150" y="70" width="18" height="18" fill="#e0742f" opacity="0.9" />
        <rect x="250" y="70" width="18" height="18" fill="#c98a3d" opacity="0.85" />

        <g className="gradient-scene__ions">
          <circle className="ion ion--1" cx="48" cy="36" r="5" />
          <circle className="ion ion--2" cx="120" cy="28" r="4.5" />
          <circle className="ion ion--3" cx="200" cy="40" r="5" />
          <circle className="ion ion--4" cx="268" cy="30" r="4" />
          <circle className="ion ion--5" cx="86" cy="44" r="4" />
        </g>
        <text x="148" y="83" fontSize="8" fill="#0b0a12" fontFamily="Inter, sans-serif">
          membrane
        </text>
      </svg>
      <p className="scene-caption-inline">H⁺ flow · looping</p>
    </div>
  )
}
