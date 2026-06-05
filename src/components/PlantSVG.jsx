// Ilustrações botânicas vetoriais por grupo de estádio fenológico

function Soil() {
  return (
    <>
      <defs>
        <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#92400e" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#78350f" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#eff6ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="120" height="128" fill="url(#skyGrad)" />
      <rect x="0" y="128" width="120" height="32" fill="url(#soilGrad)" />
      <line x1="0" y1="128" x2="120" y2="128" stroke="#92400e" strokeWidth="1.5" />
    </>
  )
}

function Roots({ x = 60, shallow = false }) {
  const d = shallow ? 12 : 20
  return (
    <g opacity="0.75">
      <path d={`M${x} 128 Q${x - 18} ${128 + d} ${x - 26} ${128 + d + 8}`}
        stroke="#a16207" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d={`M${x} 128 Q${x + 18} ${128 + d} ${x + 26} ${128 + d + 8}`}
        stroke="#a16207" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {!shallow && (
        <>
          <path d={`M${x} 132 Q${x - 8} ${132 + d} ${x - 12} ${132 + d + 10}`}
            stroke="#92400e" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d={`M${x} 132 Q${x + 8} ${132 + d} ${x + 12} ${132 + d + 10}`}
            stroke="#92400e" strokeWidth="1" fill="none" strokeLinecap="round" />
        </>
      )}
    </g>
  )
}

function Stem({ x = 60, y1 = 128, y2 = 60, color = '#15803d' }) {
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      {/* Pubescence (fine hairs) on stem */}
      <line x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    </g>
  )
}

function Node({ x = 60, y }) {
  return <circle cx={x} cy={y} r="3.5" fill="#14532d" opacity="0.9" />
}

// Folha trifoliolada realística com nervação
function Leaf({ cx, cy, angle = 0, size = 1, color = '#16a34a', colorDark = '#15803d' }) {
  const s = size
  // Leaflet shape: taller oval, pointed at tip
  const lx = 7.5 * s
  const ly = 11 * s
  return (
    <g transform={`translate(${cx}, ${cy}) rotate(${angle})`}>
      {/* Petiole */}
      <line x1="0" y1="0" x2="0" y2={-4 * s} stroke={colorDark} strokeWidth="0.9" />

      {/* --- Central leaflet --- */}
      <g transform={`translate(0, ${-4 * s - ly})`}>
        <ellipse cx="0" cy="0" rx={lx} ry={ly} fill={color} />
        {/* Midrib */}
        <line x1="0" y1={ly - 1} x2="0" y2={-ly + 1} stroke={colorDark} strokeWidth="0.9" />
        {/* Lateral veins (arching out) */}
        <path d={`M0 ${3*s} Q${-5*s} ${-1*s} ${-6*s} ${-3*s}`} stroke={colorDark} strokeWidth="0.4" fill="none" />
        <path d={`M0 ${3*s} Q${5*s} ${-1*s} ${6*s} ${-3*s}`} stroke={colorDark} strokeWidth="0.4" fill="none" />
        <path d={`M0 ${-2*s} Q${-5.5*s} ${-5*s} ${-5.5*s} ${-7.5*s}`} stroke={colorDark} strokeWidth="0.35" fill="none" />
        <path d={`M0 ${-2*s} Q${5.5*s} ${-5*s} ${5.5*s} ${-7.5*s}`} stroke={colorDark} strokeWidth="0.35" fill="none" />
        {/* Highlight sheen */}
        <ellipse cx={-1.5*s} cy={-3*s} rx={2*s} ry={3.5*s} fill="white" opacity="0.12" />
      </g>
      {/* Central petiolule */}
      <line x1="0" y1={-4*s} x2="0" y2={-4*s - (ly - 1)} stroke={colorDark} strokeWidth="0.7" />

      {/* --- Left leaflet --- */}
      <g transform={`translate(${-11*s}, ${-8*s}) rotate(-28)`}>
        <ellipse cx="0" cy="0" rx={lx * 0.88} ry={ly * 0.88} fill={color} />
        <line x1="0" y1={ly*0.85} x2="0" y2={-ly*0.85} stroke={colorDark} strokeWidth="0.8" />
        <path d={`M0 ${2.5*s} Q${-4.5*s} ${-0.5*s} ${-5.5*s} ${-2.5*s}`} stroke={colorDark} strokeWidth="0.35" fill="none" />
        <path d={`M0 ${2.5*s} Q${4.5*s} ${-0.5*s} ${5.5*s} ${-2.5*s}`} stroke={colorDark} strokeWidth="0.35" fill="none" />
        <path d={`M0 ${-2*s} Q${-5*s} ${-4.5*s} ${-4.8*s} ${-7*s}`} stroke={colorDark} strokeWidth="0.3" fill="none" />
        <path d={`M0 ${-2*s} Q${5*s} ${-4.5*s} ${4.8*s} ${-7*s}`} stroke={colorDark} strokeWidth="0.3" fill="none" />
        <ellipse cx={-1.5*s} cy={-2.5*s} rx={1.8*s} ry={3*s} fill="white" opacity="0.1" />
      </g>
      <line x1="0" y1={-4*s} x2={-11*s} y2={-8*s} stroke={colorDark} strokeWidth="0.7" />

      {/* --- Right leaflet --- */}
      <g transform={`translate(${11*s}, ${-8*s}) rotate(28)`}>
        <ellipse cx="0" cy="0" rx={lx * 0.88} ry={ly * 0.88} fill={color} />
        <line x1="0" y1={ly*0.85} x2="0" y2={-ly*0.85} stroke={colorDark} strokeWidth="0.8" />
        <path d={`M0 ${2.5*s} Q${-4.5*s} ${-0.5*s} ${-5.5*s} ${-2.5*s}`} stroke={colorDark} strokeWidth="0.35" fill="none" />
        <path d={`M0 ${2.5*s} Q${4.5*s} ${-0.5*s} ${5.5*s} ${-2.5*s}`} stroke={colorDark} strokeWidth="0.35" fill="none" />
        <path d={`M0 ${-2*s} Q${-5*s} ${-4.5*s} ${-4.8*s} ${-7*s}`} stroke={colorDark} strokeWidth="0.3" fill="none" />
        <path d={`M0 ${-2*s} Q${5*s} ${-4.5*s} ${4.8*s} ${-7*s}`} stroke={colorDark} strokeWidth="0.3" fill="none" />
        <ellipse cx={-1.5*s} cy={-2.5*s} rx={1.8*s} ry={3*s} fill="white" opacity="0.1" />
      </g>
      <line x1="0" y1={-4*s} x2={11*s} y2={-8*s} stroke={colorDark} strokeWidth="0.7" />
    </g>
  )
}

// Flor de soja (branco-rosada com estames)
function Flower({ cx, cy, size = 1 }) {
  return (
    <g transform={`translate(${cx}, ${cy})`}>
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <ellipse key={i}
          cx={Math.cos((deg * Math.PI) / 180) * 5 * size}
          cy={Math.sin((deg * Math.PI) / 180) * 5 * size}
          rx={3.5 * size} ry={2.5 * size}
          fill="#fce7f3" stroke="#f9a8d4" strokeWidth="0.5"
          transform={`rotate(${deg}, ${Math.cos((deg * Math.PI) / 180) * 5 * size}, ${Math.sin((deg * Math.PI) / 180) * 5 * size})`}
        />
      ))}
      <circle cx="0" cy="0" r={3 * size} fill="#fbbf24" />
    </g>
  )
}

// Vagem de soja realística — com sementes visíveis e curvatura
function Pod({ x1, y1, x2, y2, width = 6, fill = '#4ade80', stroke = '#16a34a' }) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI
  const nSeeds = len > 20 ? 3 : len > 14 ? 2 : 1
  return (
    <g transform={`translate(${x1}, ${y1}) rotate(${angle})`}>
      {/* Pod shadow */}
      <rect x="1" y={-width / 2 + 1} width={len - 1} height={width}
        rx={width / 2} fill={stroke} opacity="0.25" />
      {/* Pod body */}
      <rect x="0" y={-width / 2} width={len} height={width}
        rx={width / 2} fill={fill} stroke={stroke} strokeWidth="0.8" />
      {/* Seed bumps */}
      {Array.from({ length: nSeeds }).map((_, i) => (
        <ellipse key={i}
          cx={len * (1 / (nSeeds + 1)) * (i + 1)}
          cy="0"
          rx={width * 0.38}
          ry={width * 0.45}
          fill="none"
          stroke={stroke}
          strokeWidth="0.6"
          opacity="0.55"
        />
      ))}
      {/* Highlight */}
      <rect x={width / 2} y={-width / 2 + 0.8} width={len - width} height={width * 0.28}
        rx={width * 0.14} fill="white" opacity="0.22" />
    </g>
  )
}

// ─── 11 Estágios ──────────────────────────────────────────────────────────────

function SVG_Seed() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Plântula emergindo">
      <Soil />
      <Roots x={60} shallow />
      <Stem x={60} y1={128} y2={98} />
      {/* Cotilédones */}
      <ellipse cx="44" cy="91" rx="13" ry="7" fill="#86efac" stroke="#16a34a" strokeWidth="0.8"
        transform="rotate(-20 44 91)" />
      <ellipse cx="76" cy="91" rx="13" ry="7" fill="#86efac" stroke="#16a34a" strokeWidth="0.8"
        transform="rotate(20 76 91)" />
      {/* Epicótilo */}
      <line x1="60" y1="98" x2="60" y2="83" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="60" cy="81" rx="5" ry="3" fill="#22c55e" />
    </svg>
  )
}

function SVG_VegEarly() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Planta vegetativa inicial">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={74} />
      <Node x={60} y={110} />
      <Node x={60} y={90} />
      {/* Unifólios */}
      <Leaf cx={60} cy={111} angle={-90} size={0.65} color="#22c55e" colorDark="#15803d" />
      <Leaf cx={60} cy={111} angle={90} size={0.65} color="#22c55e" colorDark="#15803d" />
      {/* Primeiro trifoliolado */}
      <Leaf cx={46} cy={90} angle={-55} size={0.8} />
      <Leaf cx={74} cy={90} angle={55} size={0.8} />
    </svg>
  )
}

function SVG_VegMid() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Planta vegetativa média">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={50} />
      <Node x={60} y={114} />
      <Node x={60} y={96} />
      <Node x={60} y={76} />
      <Leaf cx={43} cy={115} angle={-52} size={0.78} />
      <Leaf cx={77} cy={115} angle={52} size={0.78} />
      <Leaf cx={41} cy={97} angle={-58} size={0.92} />
      <Leaf cx={79} cy={97} angle={58} size={0.92} />
      <Leaf cx={44} cy={77} angle={-62} size={1.0} />
      <Leaf cx={76} cy={77} angle={62} size={1.0} />
    </svg>
  )
}

function SVG_VegLate() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Planta vegetativa avançada">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={34} />
      {/* Lateral branch left */}
      <path d="M60 90 Q45 78 36 72" stroke="#15803d" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* Lateral branch right */}
      <path d="M60 90 Q75 78 84 72" stroke="#15803d" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <Node x={60} y={114} />
      <Node x={60} y={96} />
      <Node x={60} y={78} />
      <Node x={60} y={58} />
      <Leaf cx={41} cy={116} angle={-50} size={0.75} />
      <Leaf cx={79} cy={116} angle={50} size={0.75} />
      <Leaf cx={38} cy={98} angle={-57} size={0.9} />
      <Leaf cx={82} cy={98} angle={57} size={0.9} />
      <Leaf cx={38} cy={80} angle={-61} size={1.0} />
      <Leaf cx={82} cy={80} angle={61} size={1.0} />
      {/* Branch leaves */}
      <Leaf cx={31} cy={68} angle={-70} size={0.72} />
      <Leaf cx={88} cy={68} angle={70} size={0.72} />
      <Leaf cx={42} cy={60} angle={-63} size={1.02} />
      <Leaf cx={78} cy={60} angle={63} size={1.02} />
    </svg>
  )
}

function SVG_FlowerEarly() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Início do florescimento">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={30} />
      <path d="M60 92 Q45 80 36 74" stroke="#15803d" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M60 92 Q75 80 84 74" stroke="#15803d" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <Node x={60} y={112} /><Node x={60} y={94} />
      <Node x={60} y={76} /><Node x={60} y={56} />
      <Leaf cx={41} cy={114} angle={-51} size={0.8} />
      <Leaf cx={79} cy={114} angle={51} size={0.8} />
      <Leaf cx={38} cy={96} angle={-59} size={0.95} />
      <Leaf cx={82} cy={96} angle={59} size={0.95} />
      <Leaf cx={38} cy={78} angle={-62} size={1.0} />
      <Leaf cx={82} cy={78} angle={62} size={1.0} />
      <Leaf cx={31} cy={70} angle={-70} size={0.7} />
      <Leaf cx={88} cy={70} angle={70} size={0.7} />
      <Leaf cx={41} cy={58} angle={-64} size={1.0} />
      <Leaf cx={79} cy={58} angle={64} size={1.0} />
      <Flower cx={62} cy={44} size={0.75} />
    </svg>
  )
}

function SVG_FlowerFull() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Florescimento pleno">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={26} />
      <path d="M60 92 Q44 80 34 74" stroke="#15803d" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M60 92 Q76 80 86 74" stroke="#15803d" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <Node x={60} y={112} /><Node x={60} y={94} />
      <Node x={60} y={74} /><Node x={60} y={54} />
      <Leaf cx={40} cy={114} angle={-51} size={0.8} />
      <Leaf cx={80} cy={114} angle={51} size={0.8} />
      <Leaf cx={37} cy={96} angle={-59} size={0.9} />
      <Leaf cx={83} cy={96} angle={59} size={0.9} />
      <Leaf cx={37} cy={76} angle={-62} size={1.0} />
      <Leaf cx={83} cy={76} angle={62} size={1.0} />
      <Leaf cx={30} cy={70} angle={-72} size={0.68} />
      <Leaf cx={90} cy={70} angle={72} size={0.68} />
      <Leaf cx={41} cy={56} angle={-64} size={0.9} />
      <Leaf cx={79} cy={56} angle={64} size={0.9} />
      <Flower cx={50} cy={87} size={0.85} />
      <Flower cx={70} cy={69} size={0.9} />
      <Flower cx={52} cy={46} size={0.85} />
      <Flower cx={68} cy={36} size={0.8} />
    </svg>
  )
}

function SVG_PodEarly() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Formação de vagens">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={28} />
      <path d="M60 90 Q44 79 34 73" stroke="#15803d" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M60 90 Q76 79 86 73" stroke="#15803d" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <Node x={60} y={110} /><Node x={60} y={92} />
      <Node x={60} y={72} /><Node x={60} y={52} />
      <Leaf cx={41} cy={112} angle={-51} size={0.8} />
      <Leaf cx={79} cy={112} angle={51} size={0.8} />
      <Leaf cx={37} cy={94} angle={-59} size={0.9} />
      <Leaf cx={83} cy={94} angle={59} size={0.9} />
      <Leaf cx={37} cy={74} angle={-61} size={0.95} />
      <Leaf cx={83} cy={74} angle={61} size={0.95} />
      {/* Vagens pequenas nascendo */}
      <Pod x1={62} y1={84} x2={78} y2={95} width={4} fill="#86efac" stroke="#16a34a" />
      <Pod x1={58} y1={84} x2={42} y2={95} width={4} fill="#86efac" stroke="#16a34a" />
      <Pod x1={62} y1={64} x2={77} y2={75} width={4} fill="#86efac" stroke="#16a34a" />
      <Pod x1={62} y1={44} x2={74} y2={53} width={3.5} fill="#a7f3d0" stroke="#10b981" />
    </svg>
  )
}

function SVG_PodLate() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Vagens desenvolvidas">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={28} />
      <path d="M60 88 Q44 78 33 72" stroke="#15803d" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M60 88 Q76 78 87 72" stroke="#15803d" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <Node x={60} y={110} /><Node x={60} y={90} />
      <Node x={60} y={70} /><Node x={60} y={50} />
      <Leaf cx={40} cy={112} angle={-51} size={0.85} />
      <Leaf cx={80} cy={112} angle={51} size={0.85} />
      <Leaf cx={37} cy={92} angle={-59} size={0.9} />
      <Leaf cx={83} cy={92} angle={59} size={0.9} />
      {/* Vagens desenvolvidas — penduradas para baixo */}
      <Pod x1={62} y1={100} x2={80} y2={114} width={6.5} fill="#4ade80" stroke="#16a34a" />
      <Pod x1={58} y1={100} x2={40} y2={114} width={6.5} fill="#4ade80" stroke="#16a34a" />
      <Pod x1={62} y1={80} x2={80} y2={93} width={6} fill="#4ade80" stroke="#16a34a" />
      <Pod x1={58} y1={80} x2={40} y2={93} width={6} fill="#86efac" stroke="#16a34a" />
      <Leaf cx={37} cy={72} angle={-61} size={0.9} />
      <Leaf cx={83} cy={72} angle={61} size={0.9} />
      <Pod x1={62} y1={62} x2={77} y2={73} width={5.5} fill="#86efac" stroke="#16a34a" />
      <Leaf cx={30} cy={68} angle={-72} size={0.68} />
      <Leaf cx={90} cy={68} angle={72} size={0.68} />
    </svg>
  )
}

function SVG_Fill() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Enchimento de grãos">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={30} />
      <path d="M60 86 Q43 76 32 70" stroke="#166534" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M60 86 Q77 76 88 70" stroke="#166534" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <Node x={60} y={108} /><Node x={60} y={88} />
      <Node x={60} y={68} /><Node x={60} y={48} />
      <Leaf cx={38} cy={110} angle={-49} size={0.85} />
      <Leaf cx={82} cy={110} angle={49} size={0.85} />
      <Leaf cx={36} cy={90} angle={-57} size={0.88} />
      <Leaf cx={84} cy={90} angle={57} size={0.88} />
      {/* Vagens cheias e pesadas, caindo */}
      <Pod x1={62} y1={98} x2={84} y2={115} width={8} fill="#22c55e" stroke="#15803d" />
      <Pod x1={58} y1={98} x2={36} y2={115} width={8} fill="#22c55e" stroke="#15803d" />
      <Pod x1={62} y1={78} x2={84} y2={93} width={7.5} fill="#4ade80" stroke="#16a34a" />
      <Pod x1={58} y1={78} x2={36} y2={93} width={7.5} fill="#4ade80" stroke="#16a34a" />
      <Leaf cx={36} cy={70} angle={-61} size={0.85} />
      <Leaf cx={84} cy={70} angle={61} size={0.85} />
      <Pod x1={62} y1={60} x2={78} y2={72} width={7} fill="#4ade80" stroke="#16a34a" />
      <Pod x1={58} y1={60} x2={42} y2={72} width={7} fill="#86efac" stroke="#16a34a" />
      <Leaf cx={30} cy={66} angle={-72} size={0.65} />
      <Leaf cx={90} cy={66} angle={72} size={0.65} />
    </svg>
  )
}

function SVG_FillLate() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Enchimento avançado">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={32} color="#a16207" />
      <path d="M60 86 Q43 76 32 70" stroke="#a16207" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M60 86 Q77 76 88 70" stroke="#a16207" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <Node x={60} y={108} /><Node x={60} y={88} />
      <Node x={60} y={68} /><Node x={60} y={50} />
      {/* Folhas amarelando */}
      <Leaf cx={38} cy={110} angle={-49} size={0.8} color="#fbbf24" colorDark="#d97706" />
      <Leaf cx={82} cy={110} angle={49} size={0.8} color="#fbbf24" colorDark="#d97706" />
      <Leaf cx={36} cy={90} angle={-57} size={0.82} color="#f59e0b" colorDark="#b45309" />
      <Leaf cx={84} cy={90} angle={57} size={0.82} color="#f59e0b" colorDark="#b45309" />
      {/* Vagens pesadas, quase cheias */}
      <Pod x1={62} y1={98} x2={86} y2={115} width={8.5} fill="#22c55e" stroke="#166534" />
      <Pod x1={58} y1={98} x2={34} y2={115} width={8.5} fill="#22c55e" stroke="#166534" />
      <Pod x1={62} y1={78} x2={86} y2={93} width={8} fill="#4ade80" stroke="#16a34a" />
      <Pod x1={58} y1={78} x2={34} y2={93} width={8} fill="#4ade80" stroke="#16a34a" />
      <Leaf cx={36} cy={70} angle={-57} size={0.8} color="#f59e0b" colorDark="#b45309" />
      <Leaf cx={84} cy={70} angle={57} size={0.8} color="#f59e0b" colorDark="#b45309" />
      <Leaf cx={29} cy={66} angle={-72} size={0.62} color="#fbbf24" colorDark="#d97706" />
      <Leaf cx={91} cy={66} angle={72} size={0.62} color="#fbbf24" colorDark="#d97706" />
    </svg>
  )
}

function SVG_Mature() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Maturação — pronto para colheita">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={32} color="#78350f" />
      <path d="M60 88 Q43 78 32 72" stroke="#78350f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M60 88 Q77 78 88 72" stroke="#78350f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <Node x={60} y={108} /><Node x={60} y={88} />
      <Node x={60} y={68} /><Node x={60} y={50} />
      {/* Folhas secas */}
      <Leaf cx={38} cy={110} angle={-47} size={0.7} color="#92400e" colorDark="#78350f" />
      <Leaf cx={82} cy={110} angle={47} size={0.7} color="#92400e" colorDark="#78350f" />
      <Leaf cx={36} cy={90} angle={-54} size={0.65} color="#a16207" colorDark="#92400e" />
      <Leaf cx={84} cy={90} angle={54} size={0.65} color="#a16207" colorDark="#92400e" />
      {/* Vagens secas marrons */}
      <Pod x1={62} y1={97} x2={87} y2={114} width={8} fill="#92400e" stroke="#78350f" />
      <Pod x1={58} y1={97} x2={33} y2={114} width={8} fill="#92400e" stroke="#78350f" />
      <Pod x1={62} y1={77} x2={87} y2={92} width={8} fill="#a16207" stroke="#92400e" />
      <Pod x1={58} y1={77} x2={33} y2={92} width={8} fill="#a16207" stroke="#92400e" />
      <Pod x1={62} y1={60} x2={78} y2={71} width={7} fill="#b45309" stroke="#a16207" />
    </svg>
  )
}

// ─── Mapa grupo → componente ──────────────────────────────────────────────────
const SVG_MAP = {
  seed:         SVG_Seed,
  veg_early:    SVG_VegEarly,
  veg_mid:      SVG_VegMid,
  veg_late:     SVG_VegLate,
  flower_early: SVG_FlowerEarly,
  flower_full:  SVG_FlowerFull,
  pod_early:    SVG_PodEarly,
  pod_late:     SVG_PodLate,
  fill:         SVG_Fill,
  fill_late:    SVG_FillLate,
  mature:       SVG_Mature,
}

export default function PlantSVG({ group }) {
  const Component = SVG_MAP[group] || SVG_VegMid
  return <Component />
}
