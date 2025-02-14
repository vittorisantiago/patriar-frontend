"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  PieChart,
  Settings2,
  DollarSign,
  LineChart,
  Cpu,
} from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import { CarteraSwitcher } from "@/components/dashboard/cartera-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

const navMain = [
  {
    title: "Inicio",
    url: "/dashboard/inicio",
    icon: PieChart,
    items: [],
  },
  {
    title: "Reportes",
    url: "/dashboard/reportes",
    icon: BarChart,
    items: [],
  },
  {
    title: "Operaciones",
    url: "/dashboard/operaciones",
    icon: DollarSign,
    items: [],
  },
  {
    title: "Análisis",
    url: "/dashboard/analisis",
    icon: LineChart,
    items: [],
  },
  {
    title: "Inteligencia Artificial",
    url: "/dashboard/ia",
    icon: Cpu,
    items: [],
  },
  {
    title: "Configuración",
    url: "/dashboard/configuracion",
    icon: Settings2,
    items: [],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [carteras, setCarteras] = useState<
    { id: number; nombre: string; logo: React.ElementType }[]
  >([]);

  useEffect(() => {
    const fetchCarteras = async () => {
      try {
        const response = await fetch("http://localhost:5000/carteras");
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error("La API no devolvió un array:", data);
          return;
        }

        setCarteras(
          data.map((cartera) => ({
            id: cartera.id || 0,
            nombre: cartera.nombre || "Sin Nombre",
            logo: () => (
              <Image
                src={cartera.logo || "/default-logo.png"}
                alt={cartera.nombre}
              />
            ),
          }))
        );
      } catch (error) {
        console.error("Error al obtener carteras:", error);
      }
    };

    fetchCarteras();
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {carteras.length > 0 ? (
          <CarteraSwitcher initialCarteras={carteras} />
        ) : (
          <p className="text-sm text-gray-500">Cargando carteras...</p>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
