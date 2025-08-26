import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const FeatureLocker = ({ children }: Props) => {
  return (
    <div className="relative">
      <div className="filter blur-sm">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center bg-gray-800/5 bg-opacity-50 backdrop-blur-md h-full rounded-lg">
        <div className="bg-transparent  p-0 rounded-lg shadow-none w-full h-full text-center space-y-4 flex justify-center items-center flex-col">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Suscripción Requerida
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Renueva tu suscripción para acceder a todas las funciones.
          </p>
          <Button>
            <Link href="/pricing">Renovar Suscripción</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureLocker;
