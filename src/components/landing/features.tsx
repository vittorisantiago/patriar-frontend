import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function Features() {
  const features = [
    {
      title: "Visualización Clara",
      description: "Gráficos interactivos para entender tus inversiones.",
      image: "/images/visualization.png",
    },
    {
      title: "Seguimiento en Tiempo Real",
      description: "Datos actualizados de tus activos financieros.",
      image: "/images/realtime-tracking.png",
    },
    {
      title: "Comparaciones Inteligentes",
      description: "Compara contra inflación y maximiza tus rendimientos.",
      image: "/images/comparison.png",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
          Descubre lo que nuestra herramienta puede hacer por ti
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
          Potencia tus decisiones financieras con gráficos interactivos y datos
          actualizados.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 container mx-auto px-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="p-6 text-center bg-white dark:bg-gray-800 shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 dark:border-gray-700"
          >
            <CardHeader>
              <Image
                src={feature.image}
                alt={feature.title}
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {feature.title}
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
