import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-gray-100 dark:bg-gray-900 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Logo" width={70} height={70} />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            PatriAR
          </h1>
        </div>
        <div className="flex gap-4">
          <Link rel="stylesheet" href="/login">
            <Button
              variant="ghost"
              className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
            >
              Iniciar Sesión
            </Button>
          </Link>
          <Link rel="stylesheet" href="/signup">
            <Button className="bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-600 dark:hover:bg-gray-500">
              Crear Cuenta
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
