"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [nombre, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setPassword] = useState("");
  const [confirmarcontraseña, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    nombre: "",
    email: "",
    contraseña: "",
    confirmarcontraseña: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    }
  }, [successMessage, router]);

  const handleInputChange = (field: string, value: string) => {
    // Actualiza el estado y valida el campo correspondiente
    const newErrors = { ...errors };

    // Expresión regular para validar el email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    switch (field) {
      case "nombre":
        setName(value);
        newErrors.nombre =
          value.trim().length === 0 ? "Por favor, ingresa tu nombre." : "";
        break;
      case "email":
        setEmail(value);
        newErrors.email = !emailRegex.test(value)
          ? "Por favor, ingresa un correo electrónico válido."
          : "";
        break;
      case "contraseña":
        setPassword(value);
        newErrors.contraseña =
          value.length < 8
            ? "La contraseña debe tener al menos 8 caracteres."
            : "";
        break;
      case "confirmarcontraseña":
        setConfirmPassword(value);
        newErrors.confirmarcontraseña =
          value !== contraseña ? "Las contraseñas no coinciden." : "";
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Expresión regular para validar el email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const newErrors = {
      nombre: nombre.trim().length === 0 ? "Por favor, ingresa tu nombre." : "",
      email: !emailRegex.test(email)
        ? "Por favor, ingresa un correo electrónico válido."
        : "",
      contraseña:
        contraseña.length < 8
          ? "La contraseña debe tener al menos 8 caracteres."
          : "",
      confirmarcontraseña:
        contraseña !== confirmarcontraseña
          ? "Las contraseñas no coinciden."
          : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          email,
          contraseña,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error desconocido.");
      }

      setSuccessMessage("Cuenta creada exitosamente.");
      setErrorMessage("");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en la petición:", error.message);
        setErrorMessage("Hubo un error al conectar con el servidor.");
      } else {
        console.error("Error en la petición:", error);
        setErrorMessage("Hubo un error desconocido.");
      }
    }
  };

  return (
    <div>
      {successMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96 sm:w-1/3 transform scale-95 animate-fade-in">
            {/* Contenedor del mensaje */}
            <div className="flex flex-col items-center">
              {/* Logo del tilde más grande */}
              <div className="w-24 h-24 flex items-center justify-center bg-green-500 text-white rounded-full mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Mensaje principal grande */}
              <p className="text-gray-800 text-center text-xl sm:text-2xl font-semibold">
                {successMessage}
              </p>

              {/* Mensaje de redirección más pequeño y abajo */}
              <p className="mt-4 text-gray-500 text-center text-sm font-medium">
                Redirigiendo... Espere un momento.
              </p>
            </div>
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="w-full max-w-md mx-auto mt-4 p-4 bg-red-100 text-red-800 rounded-lg shadow-md text-center">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex justify-start">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
            >
              ← Volver
            </Button>
          </Link>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
                  <p className="text-balance text-muted-foreground">
                    Regístrate en PatriAR
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) =>
                      handleInputChange("nombre", e.target.value)
                    }
                    className={errors.nombre ? "border-red-500" : ""}
                    required
                  />
                  {errors.nombre && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.nombre}
                    </div>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="patriar@example.com"
                    value={email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-red-500" : ""}
                    required
                  />
                  {errors.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={contraseña}
                    onChange={(e) =>
                      handleInputChange("contraseña", e.target.value)
                    }
                    className={errors.contraseña ? "border-red-500" : ""}
                    required
                  />
                  {errors.contraseña && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.contraseña}
                    </div>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmarcontraseña}
                    onChange={(e) =>
                      handleInputChange("confirmarcontraseña", e.target.value)
                    }
                    className={
                      errors.confirmarcontraseña ? "border-red-500" : ""
                    }
                    required
                  />
                  {errors.confirmarcontraseña && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.confirmarcontraseña}
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Registrarse
                </Button>
                <div className="text-center text-sm">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    href={"/login"}
                    className="underline underline-offset-4"
                  >
                    Inicia sesión
                  </Link>
                </div>
              </div>
            </form>
            <div className="relative hidden bg-gradient-to-t from-[#e0f7fa] to-[#ffffff] md:flex flex-col items-center justify-center p-6">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={150}
                height={150}
              />
              <h1 className="mt-4 text-2xl font-bold text-center">PatriAR</h1>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
