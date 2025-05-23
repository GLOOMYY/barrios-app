"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { RotateCcw, ArrowRight } from "lucide-react"
import medellin from "@/data/diccionario"
import ProgressTracker from "@/components/ProgressTracker"
import Wheel from "@/components/Wheel"
import Results from "@/components/Results"

export default function RuletaPage() {
  // Diccionario con estructura jerárquica: Zonas -> Comunas -> Barrios

  // Estados para manejar la navegación jerárquica
  const [nivelActual, setNivelActual] = useState("zonas") // zonas, comunas, barrios
  const [zonaSeleccionada, setZonaSeleccionada] = useState("")
  const [comunaSeleccionada, setComunaSeleccionada] = useState("")
  const [barrioSeleccionado, setBarrioSeleccionado] = useState("")
  const [seleccionCompleta, setSeleccionCompleta] = useState(false)

  // Estados para la ruleta
  const [girando, setGirando] = useState(false)
  const [angulo, setAngulo] = useState(0)
  const ruletaRef = useRef(null)

  // Obtener los elementos a mostrar según el nivel actual
  function obtenerElementosActuales() {
    if (nivelActual === "zonas") {
      return Object.keys(medellin)
    } else if (nivelActual === "comunas" && zonaSeleccionada) {
      // Verificar que la zona seleccionada existe en el diccionario
      if (medellin[zonaSeleccionada]) {
        return Object.keys(medellin[zonaSeleccionada])
      }
      return []
    } else if (nivelActual === "barrios" && zonaSeleccionada && comunaSeleccionada) {
      // Verificar que tanto la zona como la comuna existen en el diccionario
      if (medellin[zonaSeleccionada] && medellin[zonaSeleccionada][comunaSeleccionada]) {
        return medellin[zonaSeleccionada][comunaSeleccionada]
      }
      return []
    }
    return []
  }

  const elementosActuales = obtenerElementosActuales()

  // Función para girar la ruleta
  const girarRuleta = () => {
    if (girando || elementosActuales.length === 0) return

    setGirando(true)

    // Generar un número aleatorio de vueltas (entre 2 y 5 vueltas completas)
    const vueltas = 2 + Math.random() * 3
    const nuevoAngulo = angulo + vueltas * 360

    setAngulo(nuevoAngulo)

    // Después de la animación, seleccionar un elemento aleatorio
    setTimeout(() => {
      const indiceAleatorio = Math.floor(Math.random() * elementosActuales.length)
      const elementoAleatorio = elementosActuales[indiceAleatorio]

      if (nivelActual === "zonas") {
        setZonaSeleccionada(elementoAleatorio)
        setNivelActual("comunas")
      } else if (nivelActual === "comunas") {
        setComunaSeleccionada(elementoAleatorio)
        setNivelActual("barrios")
      } else if (nivelActual === "barrios") {
        setBarrioSeleccionado(elementoAleatorio)
        setSeleccionCompleta(true)
      }

      setGirando(false)
    }, 3000) // 3 segundos de animación
  }

  // Función para reiniciar el proceso
  const reiniciarProceso = () => {
    setNivelActual("zonas")
    setZonaSeleccionada("")
    setComunaSeleccionada("")
    setBarrioSeleccionado("")
    setSeleccionCompleta(false)
  }

  // Obtener el título según el nivel actual
  const obtenerTitulo = () => {
    if (seleccionCompleta) return "¡Selección Completa!"
    if (nivelActual === "zonas") return "Selecciona una Zona Aleatoria"
    if (nivelActual === "comunas") return `Selecciona una Comuna Aleatoria en ${zonaSeleccionada}`
    if (nivelActual === "barrios") return `Selecciona un Barrio Aleatorio en ${comunaSeleccionada}`
    return ""
  }

  // Obtener el color de fondo según el nivel
  const obtenerColorFondo = () => {
    if (nivelActual === "zonas") return "bg-blue-100"
    if (nivelActual === "comunas") return "bg-green-100"
    if (nivelActual === "barrios") return "bg-purple-100"
    return ""
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Ruleta Jerárquica: Zonas → Comunas → Barrios</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ProgressTracker
          zonaSeleccionada={zonaSeleccionada}
          comunaSeleccionada={comunaSeleccionada}
          barrioSeleccionado={barrioSeleccionado}
          onReiniciar={reiniciarProceso}
        />

        <Card className={`md:col-span-2 ${obtenerColorFondo()}`}>
          <CardHeader>
            <CardTitle className="text-center">{obtenerTitulo()}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {seleccionCompleta ? (
              <Results
                zonaSeleccionada={zonaSeleccionada}
                comunaSeleccionada={comunaSeleccionada}
                barrioSeleccionado={barrioSeleccionado}
                onReiniciar={reiniciarProceso}
              />
            ) : (
              <>
                <Wheel
                  elementos={elementosActuales}
                  angulo={angulo}
                  girando={girando}
                  nivelActual={nivelActual}
                  ruletaRef={ruletaRef}
                />

                <Button
                  onClick={girarRuleta}
                  disabled={girando}
                  size="lg"
                  className="mb-4"
                  variant={nivelActual === "zonas" ? "default" : nivelActual === "comunas" ? "secondary" : "outline"}
                >
                  {girando
                    ? "Girando..."
                    : `Girar Ruleta de ${nivelActual.charAt(0).toUpperCase() + nivelActual.slice(1)}`}
                </Button>

                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    {nivelActual === "zonas"
                      ? "Selecciona una zona aleatoria para continuar"
                      : nivelActual === "comunas"
                        ? `Selecciona una comuna aleatoria en ${zonaSeleccionada}`
                        : `Selecciona un barrio aleatorio en ${comunaSeleccionada}`}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
