import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ResultsProps {
  zonaSeleccionada: string
  comunaSeleccionada: string
  barrioSeleccionado: string
  onReiniciar: () => void
}

const Results = ({ zonaSeleccionada, comunaSeleccionada, barrioSeleccionado, onReiniciar }: ResultsProps) => {
  return (
    <div className="text-center py-8">
      <h3 className="text-2xl font-bold mb-6">Resultado Final</h3>
      <div className="space-y-4">
        <p className="text-lg">
          <span className="font-semibold">Zona:</span> {zonaSeleccionada}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Comuna:</span> {comunaSeleccionada}
        </p>
        <p className="text-xl font-bold">
          <span className="font-semibold">Barrio:</span> {barrioSeleccionado}
        </p>
      </div>
      <Button onClick={onReiniciar} className="mt-8" size="lg">
        <RotateCcw className="mr-2 h-4 w-4" /> Iniciar Nueva Selección
      </Button>
    </div>
  )
}

export default Results