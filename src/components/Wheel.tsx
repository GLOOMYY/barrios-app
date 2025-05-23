import { useRef } from "react"

const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  const rad = ((angle - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

const describeArcPath = (cx: number, cy: number, r: number, start: number, end: number) => {
  const startCoord = polarToCartesian(cx, cy, r, end)
  const endCoord = polarToCartesian(cx, cy, r, start)
  const largeArcFlag = end - start <= 180 ? 0 : 1
  return `M ${cx} ${cx} L ${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${endCoord.x} ${endCoord.y} Z`
}

type WheelProps = {
  elementos: string[]
  girando: boolean
  angulo: number
  nivelActual: "zonas" | "comunas" | "barrios"
  onGirar: () => void
}

const Wheel = ({ elementos, girando, angulo, nivelActual }: WheelProps) => {
  const ruletaRef = useRef(null)
  const radius = 100
  const cx = 100
  const cy = 100
  const total = elementos.length
  const anglePerSlice = 360 / total

  let colorBase = "#3b82f6" // blue-500
  if (nivelActual === "comunas") colorBase = "#22c55e" // green-500
  if (nivelActual === "barrios") colorBase = "#8b5cf6" // purple-500

  const colores = [colorBase, colorBase.replace("5", "6")]

  return (
    <div className="relative w-80 h-80 mb-8">
      {/* Indicador */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10 text-3xl text-gray-800">▼</div>

      {/* SVG Wheel */}
      <svg
        ref={ruletaRef}
        viewBox="0 0 200 200"
        className="w-full h-full transform transition-transform duration-[3000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
        style={{
          transform: `rotate(${angulo}deg)`,
          transition: girando ? "transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)" : "none"
        }}
      >
        {elementos.map((el, i) => {
          const startAngle = i * anglePerSlice
          const endAngle = (i + 1) * anglePerSlice
          const path = describeArcPath(cx, cy, radius, startAngle, endAngle)
          const color = colores[i % 2]

          const labelAngle = startAngle + anglePerSlice / 2
          const labelCoord = polarToCartesian(cx, cy, radius * 0.6, labelAngle)

          return (
            <g key={i}>
              <path d={path} fill={color} stroke="white" strokeWidth="1" />
                <text
                  x={labelCoord.x}
                  y={labelCoord.y}
                  fill="white"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {el.length > 15 ? el.slice(0, 12) + "…" : el}
                </text>

            </g>
          )
        })}
        {/* Centro de la ruleta */}
        <circle cx={cx} cy={cy} r="4" fill="#1f2937" />
      </svg>
    </div>
  )
}

export default Wheel;
