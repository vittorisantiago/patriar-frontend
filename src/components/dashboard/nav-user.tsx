"use client";

import { useState, useEffect } from "react";
import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";

export function NavUser() {
  const router = useRouter();
  const [user, setUser] = useState<{ nombre: string; email: string } | null>(
    null
  );
  const [avatarSvg, setAvatarSvg] = useState<string>("");

  useEffect(() => {
    // Cargar datos del usuario desde localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Generar avatar dinámico con DiceBear basado en el nombre o correo del usuario
      const avatar = createAvatar(thumbs, {
        seed: parsedUser.nombre || parsedUser.email || "Usuario",
        size: 48,
        backgroundColor: ["#f0f0f0", "#e0e0e0"], // Opcional: colores de fondo
      });
      setAvatarSvg(avatar.toString());
    }
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    document.cookie = "access_token=; path=/; max-age=0";
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-4 h16"
            >
              <div
                className="h-12 w-12 rounded-full overflow-hidden bg-gray-200"
                dangerouslySetInnerHTML={{ __html: avatarSvg }}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span>{user?.nombre || "Usuario"}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div
                  className="h-12 w-12 rounded-full overflow-hidden bg-gray-200"
                  dangerouslySetInnerHTML={{ __html: avatarSvg }}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span>{user?.nombre}</span>
                  <span>{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Cuenta
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notificaciones
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
