"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronsUpDown,
  Plus,
  Edit,
  Trash2,
  BriefcaseBusiness,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CarteraSwitcher({
  initialCarteras,
}: {
  initialCarteras: {
    id: number;
    nombre: string;
    logo: React.ElementType;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [carteras, setCarteras] = useState(initialCarteras);
  const [activeCartera, setActiveCartera] = useState(carteras[0]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [currentCartera, setCurrentCartera] = useState({ id: 0, nombre: "" });
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [carteraToDelete, setCarteraToDelete] = useState<number | null>(null);

  const fetchCarteras = async () => {
    try {
      const response = await fetch("http://localhost:5000/carteras");
      if (!response.ok) throw new Error("Error al obtener carteras");
      const data = await response.json();
      setCarteras(data);
      if (data.length > 0) {
        setActiveCartera(data[0]);
      } else {
        setActiveCartera({ id: 0, nombre: "Ninguna cartera", logo: Plus });
      }
    } catch (error) {
      console.error("Error al obtener las carteras:", error);
    }
  };

  const handleAdd = async () => {
    setDialogMode("add");
    setCurrentCartera({ id: 0, nombre: "" });
    setIsDialogOpen(true);
  };

  const handleEdit = (cartera: (typeof carteras)[0]) => {
    setDialogMode("edit");
    setCurrentCartera(cartera);
    setIsDialogOpen(true);
  };

  const handleDelete = (carteraId: number) => {
    setCarteraToDelete(carteraId);
    setIsConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (carteraToDelete !== null) {
      await fetch(`http://localhost:5000/carteras/${carteraToDelete}`, {
        method: "DELETE",
      });

      const updatedCarteras = carteras.filter(
        (cartera) => cartera.id !== carteraToDelete
      );
      setCarteras(updatedCarteras);

      if (activeCartera.id === carteraToDelete) {
        if (updatedCarteras.length > 0) {
          setActiveCartera(updatedCarteras[0]);
        } else {
          setActiveCartera({ id: 0, nombre: "Ninguna cartera", logo: Plus });
        }
      }
    }
    setIsConfirmDeleteOpen(false);
    setCarteraToDelete(null);
  };

  const cancelDelete = () => {
    setIsConfirmDeleteOpen(false);
    setCarteraToDelete(null);
  };

  const handleDialogSubmit = async () => {
    if (dialogMode === "add") {
      const newCartera = {
        id: Date.now(),
        nombre: currentCartera.nombre,
        logo: BriefcaseBusiness,
      };

      await fetch("http://localhost:5000/carteras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCartera),
      });

      setCarteras([...carteras, newCartera]);
      setActiveCartera(newCartera);
    } else if (dialogMode === "edit") {
      await fetch(`http://localhost:5000/carteras/${currentCartera.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: currentCartera.nombre,
        }),
      });

      setCarteras(
        carteras.map((cartera) =>
          cartera.id === currentCartera.id
            ? { ...cartera, nombre: currentCartera.nombre }
            : cartera
        )
      );
    }
    setIsDialogOpen(false);
  };

  useEffect(() => {
    fetchCarteras();
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {activeCartera.logo && (
                  <activeCartera.logo className="size-4" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeCartera.nombre}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Carteras
            </DropdownMenuLabel>
            {carteras.map((cartera) => (
              <DropdownMenuItem
                key={cartera.id}
                className="flex justify-between items-center gap-2 p-2"
                onClick={() => setActiveCartera(cartera)}
              >
                <div className="flex items-center gap-2">
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    <cartera.logo className="size-4 shrink-0" />
                  </div>
                  <span>{cartera.nombre}</span>
                </div>
                <div className="flex gap-2">
                  <Edit
                    className="text-gray-400 hover:text-black cursor-pointer text-xs transition-all duration-200 transform hover:scale-110"
                    style={{ width: "18px", height: "18px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(cartera);
                    }}
                  />
                  <Trash2
                    className="text-red-500 hover:text-red-800 cursor-pointer text-xs transition-all duration-200 transform hover:scale-110"
                    style={{ width: "18px", height: "18px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(cartera.id);
                    }}
                  />
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" onClick={handleAdd}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Añadir cartera
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      <Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
        <DialogContent>
          <DialogTitle></DialogTitle>
          <DialogHeader>Eliminar Cartera</DialogHeader>
          <DialogHeader>
            ¿Estás seguro de que deseas eliminar esta cartera?
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>
              No
            </Button>
            <Button onClick={confirmDelete}>Sí</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <DialogHeader>
            {dialogMode === "add" ? "Añadir cartera" : "Editar cartera"}
          </DialogHeader>
          <Input
            placeholder="Nombre de la cartera"
            value={currentCartera.nombre}
            onChange={(e) =>
              setCurrentCartera({ ...currentCartera, nombre: e.target.value })
            }
          />
          <DialogFooter>
            <Button onClick={handleDialogSubmit}>
              {dialogMode === "add" ? "Añadir" : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarMenu>
  );
}
