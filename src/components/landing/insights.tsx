import Image from "next/image";

export function Insights() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
          Todo lo que necesitas para gestionar tus inversiones
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
          Nuestra plataforma combina potentes gráficos interactivos con
          herramientas avanzadas para la toma de decisiones, diseñadas para
          hacerte sentir en control total de tus inversiones, todo en un mismo
          lugar.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <Image
              src="/images/graph-analysis.jpg"
              alt="Análisis detallado de inversiones"
              className="rounded-md mb-4"
              width={500}
              height={300}
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Análisis Detallado
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Explora tus carteras financieras con gráficos claros e
              interactivos que te ayudan a visualizar el rendimiento de tus
              activos.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <Image
              src="/images/decision-support.jpg"
              alt="Soporte para toma de decisiones"
              className="rounded-md mb-4"
              width={500}
              height={300}
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Toma de Decisiones
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Usa herramientas diseñadas para comparar activos y optimizar
              estrategias según tus objetivos financieros.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <Image
              src="/images/all-in-one.jpg"
              alt="Todo en un solo lugar"
              className="rounded-md mb-4"
              width={500}
              height={300}
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Todo en un Solo Lugar
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Centraliza toda la información de tus inversiones en una
              plataforma intuitiva y de fácil uso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
