import { auth } from "@/auth";
import DocumentCard from "@/components/shared/cards/document-card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const cu = await auth();
  if (!cu || !cu.user || !cu.user.id) {
    redirect("/login");
  }

  const watchLists = await prisma.watchLists.findMany({
    where: {
      userId: cu.user.id,
    },
    include: {
      document: true,
    },
  });

  let content;
  if (watchLists.length === 0) {
    content = (
      <div className="min-h-[300px] flex flex-col items-center justify-center text-center space-y-2 text-gray-600 dark:text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-300 dark:text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 17v-2a4 4 0 014-4h5m-7 6h.01M4 6h16M4 10h16M4 14h10"
          />
        </svg>
        <p className="text-lg font-medium">
          No se encontraron documentos en tu lista de seguimiento
        </p>
        <p className="text-sm">Intenta visitar la página de colecciones</p>
        <Button>
          <Link href="/collections">Ver colecciones</Link>
        </Button>
      </div>
    );
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mt-10">
        {watchLists.map((item) => (
          <DocumentCard key={item.id} document={item.document} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2 className="text-tourHub-title2 text-[30px] font-bold font-inter">
          Lista de Seguimiento
        </h2>
        <p className="text-tourHub-green-dark text-base mb-1">
          visualiza tus documentos guardados
        </p>
      </div>

      {content}
    </div>
  );
};

export default Page;
