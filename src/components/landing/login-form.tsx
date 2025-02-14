"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [contraseña, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contraseñaError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showInvalidCredentialsError, setShowInvalidCredentialsError] =
    useState(false);
  const router = useRouter();

  // Redirigir al dashboard si ya existe un token
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/dashboard"); // Si ya hay un usuario autenticado, redirigir a dashboard
    }
  }, [router]);

  const validateEmail = () => {
    if (!email.includes("@")) {
      setEmailError("Por favor, ingresa un correo electrónico válido.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (contraseña.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    setEmailError("");
    setPasswordError("");
    setShowInvalidCredentialsError(false);

    if (!email.includes("@")) {
      setEmailError("Por favor, ingresa un correo electrónico válido.");
      valid = false;
    }

    if (contraseña.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.");
      valid = false;
    }

    if (valid) {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, contraseña }),
          credentials: "include", // Enviar cookies si son necesarias
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("user", JSON.stringify(data.usuario)); // Guardar datos del usuario en localStorage
          router.push("/dashboard");
        } else {
          setShowInvalidCredentialsError(true);
        }
      } catch {
        setPasswordError("Hubo un error al intentar iniciar sesión.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleSuccess = (response: CredentialResponse) => {
    console.log("Login con Google Exitoso:", response);
    // Aquí puedes manejar la respuesta de Google, como obtener el token y usarlo
  };

  const handleGoogleError = () => {
    console.log("Error en el login con Google");
  };

  return (
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

      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Bienvenido de nuevo</h1>
                  <p className="text-balance text-muted-foreground">
                    Inicia sesión en tu cuenta de PatriAR
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="patriar@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={validateEmail}
                    className={cn({
                      "border-red-500":
                        emailError && !showInvalidCredentialsError,
                    })}
                    required
                  />
                  {emailError && (
                    <div className="text-red-500 text-sm mt-1">
                      {emailError}
                    </div>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                    <Link
                      href="/forgot-password"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={contraseña}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validatePassword}
                    className={cn({
                      "border-red-500":
                        contraseñaError && !showInvalidCredentialsError,
                    })}
                    required
                  />
                  {contraseñaError && (
                    <div className="text-red-500 text-sm mt-1">
                      {contraseñaError}
                    </div>
                  )}
                  {showInvalidCredentialsError && (
                    <div className="text-red-500 text-sm mt-1">
                      Credenciales inválidas.
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Cargando..." : "Iniciar sesión"}
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    O
                  </span>
                </div>

                <GoogleOAuthProvider clientId="TU_CLIENT_ID_AQUI">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap
                    theme="filled_blue"
                    shape="pill"
                    text="signin_with"
                  />
                </GoogleOAuthProvider>

                <div className="text-center text-sm">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    href={"/signup"}
                    className="underline underline-offset-4"
                  >
                    Regístrate
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
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Al continuar, aceptas nuestros Términos de servicio y Política de
        privacidad.
      </div>
    </div>
  );
}
