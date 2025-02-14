"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Link from "next/link";

export function Hero() {
  const chartRef = useRef<HTMLCanvasElement | null>(null); // Tipamos el canvas

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d"); // Ahora TypeScript reconoce `getContext`
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(75,192,192,1)");
    gradient.addColorStop(1, "rgba(75,192,192,0)");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from({ length: 12 }, (_, i) => `Mes ${i + 1}`),
        datasets: [
          {
            label: "Crecimiento (%)",
            data: Array.from(
              { length: 12 },
              () => Math.random() * (10 - 5) + 5
            ),
            backgroundColor: gradient,
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { display: false },
          y: { display: false },
        },
      },
    });

    // Cleanup para evitar múltiples gráficos
    return () => Chart.getChart(ctx)?.destroy();
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white text-center py-20 min-h-screen overflow-hidden">
      {/* Fondo Animado */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-gradient-to-r from-yellow-500 to-transparent opacity-10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-r from-green-400 to-transparent opacity-10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-wide leading-tight">
          Domina tus Finanzas y Gestiona tus Inversiones
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-10 font-light opacity-90">
          La plataforma todo en uno para gestionar, analizar y maximizar tus
          inversiones.
        </p>
        <Link href="/signup">
          <Button
            size="lg"
            className="bg-green-500 text-gray-900 hover:bg-green-600 dark:bg-green-400 dark:text-gray-900 dark:hover:bg-green-500 transition duration-300 ease-in-out px-10 py-4 rounded-full shadow-lg transform hover:scale-105 mb-12"
          >
            Empieza Gratis Ahora
          </Button>
        </Link>
        {/* Gráfico Interactivo */}
        <div className="w-full sm:w-2/3 md:w-1/2 mx-auto mt-12">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </section>
  );
}
