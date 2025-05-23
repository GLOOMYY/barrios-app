import { ArrowRight, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ProgressTrackerProps {
  zonaSeleccionada: string
  comunaSeleccionada: string
  barrioSeleccionado: string
  onReiniciar: () => void
}

const ProgressTracker = ({
  zonaSeleccionada,
  comunaSeleccionada,
  barrioSeleccionado,
  onReiniciar,
}: ProgressTrackerProps) => {
  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>Progreso de Selección</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                zonaSeleccionada ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              1
            </div>
            <div className="ml-3">
              <p className="font-medium">Zona</p>
              <p className={zonaSeleccionada ? "font-bold" : "text-gray-400"}>
                {zonaSeleccionada || "No seleccionada"}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="text-gray-400" />
          </div>

          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                comunaSeleccionada ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              2
            </div>
            <div className="ml-3">
              <p className="font-medium">Comuna</p>
              <p className={comunaSeleccionada ? "font-bold" : "text-gray-400"}>
                {comunaSeleccionada || "No seleccionada"}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="text-gray-400" />
          </div>

          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                barrioSeleccionado ? "bg-purple-500 text-white" : "bg-gray-200"
              }`}
            >
              3
            </div>
            <div className="ml-3">
              <p className="font-medium">Barrio</p>
              <p className={barrioSeleccionado ? "font-bold" : "text-gray-400"}>
                {barrioSeleccionado || "No seleccionado"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onReiniciar} className="w-full" variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" /> Reiniciar Proceso
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProgressTracker;