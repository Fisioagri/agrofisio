// Ilustrações botânicas vetoriais por grupo de estádio fenológico
// Substituem os emojis para uso profissional em laudos e apresentações

function Soil() {
  return (
    <>
      <defs>
        <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#92400e" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#78350f" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect x="0" y="128" width="120" height="32" fill="url(#soilGrad)" />
      <line x1="0" y1="128" x2="120" y2="128" stroke="#92400e" strokeWidth="1.5" />
    </>
  )
}

function Roots({ x = 60, shallow = false }) {
  const d = shallow ? 12 : 20
  return (
    <g opacity="0.7">
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

function Stem({ x = 60, y1 = 128, y2 = 60, color = '#166534' }) {
  return <line x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeWidth="3" strokeLinecap="round" />
}

function Node({ x = 60, y }) {
  return <circle cx={x} cy={y} r="3" fill="#14532d" />
}

// Folha trifoliolada
function Leaf({ cx, cy, angle = 0, size = 1, color = '#16a34a', colorDark = '#166534' }) {
  const s = size
  return (
    <g transform={`translate(${cx}, ${cy}) rotate(${angle})`}>
      {/* Folíolo central */}
      <ellipse cx="0" cy={-14 * s} rx={7 * s} ry={4.5 * s} fill={color} />
      <line x1="0" y1="0" x2="0" y2={-14 * s} stroke={colorDark} strokeWidth="0.8" />
      {/* Folíolo esquerdo */}
      <ellipse cx={-13 * s} cy={-7 * s} rx={7 * s} ry={4 * s} fill={color}
        transform={`rotate(-35, ${-13 * s}, ${-7 * s})`} />
      <line x1="0" y1="0" x2={-13 * s} y2={-7 * s} stroke={colorDark} strokeWidth="0.8" />
      {/* Folíolo direito */}
      <ellipse cx={13 * s} cy={-7 * s} rx={7 * s} ry={4 * s} fill={color}
        transform={`rotate(35, ${13 * s}, ${-7 * s})`} />
      <line x1="0" y1="0" x2={13 * s} y2={-7 * s} stroke={colorDark} strokeWidth="0.8" />
    </g>
  )
}

// Flor de soja (pequena, branco-rosada com estames)
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

// Vagem de soja
function Pod({ x1, y1, x2, y2, width = 5, fill = '#4ade80', stroke = '#16a34a' }) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI
  return (
    <g transform={`translate(${x1}, ${y1}) rotate(${angle})`}>
      <rect x="0" y={-width / 2} width={len} height={width}
        rx={width / 2} fill={fill} stroke={stroke} strokeWidth="0.8" />
      {/* Sementes visíveis */}
      {len > 20 && (
        <>
          <circle cx={len * 0.3} cy="0" r={width * 0.28} fill={fill === '#4ade80' ? '#86efac' : '#d97706'} opacity="0.8" />
          <circle cx={len * 0.6} cy="0" r={width * 0.28} fill={fill === '#4ade80' ? '#86efac' : '#d97706'} opacity="0.8" />
        </>
      )}
    </g>
  )
}

// ─── 11 Estágios ──────────────────────────────────────────────────────────────

function SVG_Seed() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Plântula emergindo">
      <Soil />
      <Roots x={60} shallow />
      <Stem x={60} y1={128} y2={96} />
      {/* Cotilédones */}
      <ellipse cx="44" cy="90" rx="13" ry="7" fill="#86efac" stroke="#16a34a" strokeWidth="0.8"
        transform="rotate(-20 44 90)" />
      <ellipse cx="76" cy="90" rx="13" ry="7" fill="#86efac" stroke="#16a34a" strokeWidth="0.8"
        transform="rotate(20 76 90)" />
      {/* Epicótilo nascendo */}
      <line x1="60" y1="96" x2="60" y2="82" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="60" cy="80" rx="5" ry="3" fill="#22c55e" />
    </svg>
  )
}

function SVG_VegEarly() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Planta vegetativa inicial">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={72} />
      <Node x={60} y={108} />
      <Node x={60} y={88} />
      {/* Unifólios em V1 */}
      <Leaf cx={60} cy={110} angle={-90} size={0.7} color="#22c55e" />
      <Leaf cx={60} cy={110} angle={90} size={0.7} color="#22c55e" />
      {/* Primeiro trifoliolado */}
      <Leaf cx={45} cy={88} angle={-60} size={0.85} />
      <Leaf cx={75} cy={88} angle={60} size={0.85} />
    </svg>
  )
}

function SVG_VegMid() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Planta vegetativa média">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={52} />
      <Node x={60} y={112} />
      <Node x={60} y={94} />
      <Node x={60} y={74} />
      <Leaf cx={42} cy={114} angle={-55} size={0.8} />
      <Leaf cx={78} cy={114} angle={55} size={0.8} />
      <Leaf cx={40} cy={95} angle={-60} size={0.95} />
      <Leaf cx={80} cy={95} angle={60} size={0.95} />
      <Leaf cx={44} cy={75} angle={-65} size={1.0} />
      <Leaf cx={76} cy={75} angle={65} size={1.0} />
    </svg>
  )
}

function SVG_VegLate() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Planta vegetativa avançada">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={36} />
      <Node x={60} y={114} />
      <Node x={60} y={96} />
      <Node x={60} y={78} />
      <Node x={60} y={58} />
      <Leaf cx={40} cy={116} angle={-50} size={0.75} />
      <Leaf cx={80} cy={116} angle={50} size={0.75} />
      <Leaf cx={38} cy={98} angle={-58} size={0.9} />
      <Leaf cx={82} cy={98} angle={58} size={0.9} />
      <Leaf cx={38} cy={80} angle={-62} size={1.0} />
      <Leaf cx={82} cy={80} angle={62} size={1.0} />
      <Leaf cx={40} cy={60} angle={-65} size={1.05} />
      <Leaf cx={80} cy={60} angle={65} size={1.05} />
    </svg>
  )
}

function SVG_FlowerEarly() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Início do florescimento">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={32} />
      <Node x={60} y={112} /><Node x={60} y={94} />
      <Node x={60} y={76} /><Node x={60} y={56} />
      <Leaf cx={40} cy={114} angle={-52} size={0.8} />
      <Leaf cx={80} cy={114} angle={52} size={0.8} />
      <Leaf cx={38} cy={96} angle={-60} size={0.95} />
      <Leaf cx={82} cy={96} angle={60} size={0.95} />
      <Leaf cx={38} cy={78} angle={-63} size={1.0} />
      <Leaf cx={82} cy={78} angle={63} size={1.0} />
      <Leaf cx={40} cy={58} angle={-65} size={1.0} />
      <Leaf cx={80} cy={58} angle={65} size={1.0} />
      {/* Primeiro botão floral */}
      <Flower cx={62} cy={44} size={0.7} />
    </svg>
  )
}

function SVG_FlowerFull() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Florescimento pleno">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={28} />
      <Node x={60} y={112} /><Node x={60} y={94} />
      <Node x={60} y={74} /><Node x={60} y={54} />
      <Leaf cx={40} cy={114} angle={-52} size={0.8} />
      <Leaf cx={80} cy={114} angle={52} size={0.8} />
      <Leaf cx={37} cy={96} angle={-60} size={0.9} />
      <Leaf cx={83} cy={96} angle={60} size={0.9} />
      <Leaf cx={37} cy={76} angle={-63} size={1.0} />
      <Leaf cx={83} cy={76} angle={63} size={1.0} />
      <Leaf cx={40} cy={56} angle={-65} size={0.9} />
      <Leaf cx={80} cy={56} angle={65} size={0.9} />
      {/* Flores abertas */}
      <Flower cx={50} cy={86} size={0.85} />
      <Flower cx={70} cy={68} size={0.9} />
      <Flower cx={52} cy={46} size={0.85} />
      <Flower cx={68} cy={38} size={0.75} />
    </svg>
  )
}

function SVG_PodEarly() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Formação de vagens">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={30} />
      <Node x={60} y={110} /><Node x={60} y={92} />
      <Node x={60} y={72} /><Node x={60} y={52} />
      <Leaf cx={40} cy={112} angle={-52} size={0.8} />
      <Leaf cx={80} cy={112} angle={52} size={0.8} />
      <Leaf cx={37} cy={94} angle={-60} size={0.9} />
      <Leaf cx={83} cy={94} angle={60} size={0.9} />
      <Leaf cx={37} cy={74} angle={-62} size={0.95} />
      <Leaf cx={83} cy={74} angle={62} size={0.95} />
      {/* Vagens pequenas nascendo */}
      <Pod x1={62} y1={84} x2={76} y2={74} width={4} fill="#86efac" stroke="#16a34a" />
      <Pod x1={58} y1={64} x2={74} y2={56} width={4} fill="#86efac" stroke="#16a34a" />
      <Pod x1={58} y1={44} x2={72} y2={38} width={3.5} fill="#a7f3d0" stroke="#10b981" />
    </svg>
  )
}

function SVG_PodLate() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Vagens desenvolvidas">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={30} />
      <Node x={60} y={110} /><Node x={60} y={90} />
      <Node x={60} y={70} /><Node x={60} y={50} />
      <Leaf cx={39} cy={112} angle={-52} size={0.85} />
      <Leaf cx={81} cy={112} angle={52} size={0.85} />
      <Leaf cx={37} cy={92} angle={-60} size={0.9} />
      <Leaf cx={83} cy={92} angle={60} size={0.9} />
      {/* Vagens desenvolvidas */}
      <Pod x1={62} y1={100} x2={80} y2={88} width={6} fill="#4ade80" />
      <Pod x1={40} y1={90} x2={58} y2={80} width={6} fill="#4ade80" />
      <Pod x1={62} y1={80} x2={80} y2={68} width={6} fill="#4ade80" />
      <Pod x1={40} y1={70} x2={58} y2={60} width={5.5} fill="#86efac" />
      <Leaf cx={38} cy={72} angle={-62} size={0.9} />
      <Leaf cx={82} cy={72} angle={62} size={0.9} />
    </svg>
  )
}

function SVG_Fill() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Enchimento de grãos">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={32} />
      <Node x={60} y={108} /><Node x={60} y={88} />
      <Node x={60} y={68} /><Node x={60} y={48} />
      <Leaf cx={38} cy={110} angle={-50} size={0.85} />
      <Leaf cx={82} cy={110} angle={50} size={0.85} />
      <Leaf cx={36} cy={90} angle={-58} size={0.88} />
      <Leaf cx={84} cy={90} angle={58} size={0.88} />
      {/* Vagens cheias */}
      <Pod x1={62} y1={98} x2={84} y2={84} width={7.5} fill="#22c55e" stroke="#15803d" />
      <Pod x1={36} y1={88} x2={58} y2={76} width={7.5} fill="#22c55e" stroke="#15803d" />
      <Pod x1={62} y1={78} x2={84} y2={64} width={7} fill="#4ade80" />
      <Pod x1={36} y1={68} x2={58} y2={55} width={7} fill="#4ade80" />
      <Pod x1={52} y1={52} x2={72} y2={40} width={6.5} fill="#86efac" />
      <Leaf cx={37} cy={70} angle={-62} size={0.85} />
      <Leaf cx={83} cy={70} angle={62} size={0.85} />
    </svg>
  )
}

function SVG_FillLate() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Enchimento avançado">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={34} color="#a16207" />
      <Node x={60} y={108} /><Node x={60} y={88} />
      <Node x={60} y={68} /><Node x={60} y={50} />
      {/* Folhas amarelando */}
      <Leaf cx={38} cy={110} angle={-50} size={0.8} color="#fbbf24" colorDark="#d97706" />
      <Leaf cx={82} cy={110} angle={50} size={0.8} color="#fbbf24" colorDark="#d97706" />
      <Leaf cx={36} cy={90} angle={-58} size={0.82} color="#f59e0b" colorDark="#b45309" />
      <Leaf cx={84} cy={90} angle={58} size={0.82} color="#f59e0b" colorDark="#b45309" />
      {/* Vagens pesadas, quase cheias */}
      <Pod x1={62} y1={98} x2={86} y2={83} width={8} fill="#22c55e" stroke="#166534" />
      <Pod x1={34} y1={88} x2={58} y2={75} width={8} fill="#22c55e" stroke="#166534" />
      <Pod x1={62} y1={78} x2={86} y2={63} width={8} fill="#4ade80" stroke="#16a34a" />
      <Pod x1={34} y1={67} x2={58} y2={54} width={7.5} fill="#4ade80" stroke="#16a34a" />
      <Leaf cx={36} cy={70} angle={-58} size={0.8} color="#f59e0b" colorDark="#b45309" />
      <Leaf cx={84} cy={70} angle={58} size={0.8} color="#f59e0b" colorDark="#b45309" />
    </svg>
  )
}

function SVG_Mature() {
  return (
    <svg viewBox="0 0 120 160" className="w-full h-full" role="img" aria-label="Maturação — pronto para colheita">
      <Soil />
      <Roots x={60} />
      <Stem x={60} y1={128} y2={34} color="#78350f" />
      <Node x={60} y={108} /><Node x={60} y={88} />
      <Node x={60} y={68} /><Node x={60} y={50} />
      {/* Folhas secas, caindo */}
      <Leaf cx={38} cy={110} angle={-48} size={0.7} color="#92400e" colorDark="#78350f" />
      <Leaf cx={82} cy={110} angle={48} size={0.7} color="#92400e" colorDark="#78350f" />
      <Leaf cx={36} cy={90} angle={-55} size={0.65} color="#a16207" colorDark="#92400e" />
      <Leaf cx={84} cy={90} angle={55} size={0.65} color="#a16207" colorDark="#92400e" />
      {/* Vagens secas, marrons */}
      <Pod x1={62} y1={97} x2={87} y2={82} width={7.5} fill="#92400e" stroke="#78350f" />
      <Pod x1={33} y1={87} x2={58} y2={74} width={7.5} fill="#92400e" stroke="#78350f" />
      <Pod x1={62} y1={77} x2={87} y2={62} width={7.5} fill="#a16207" stroke="#92400e" />
      <Pod x1={33} y1={66} x2={58} y2={53} width={7.5} fill="#a16207" stroke="#92400e" />
      <Pod x1={52} y1={52} x2={74} y2={40} width={7} fill="#b45309" stroke="#a16207" />
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
