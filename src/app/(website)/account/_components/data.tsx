// Función para generar un ID aleatorio
const generateRandomId = () => Math.floor(Math.random() * 100000);

export const accountTablists = [
  {
    id: generateRandomId(),
    path: "/account",
    linkText: "Mi Perfil",
    roles: ["user"],
  },
  {
    id: generateRandomId(),
    path: "/account/documents",
    linkText: "Mis Documentos",
    roles: ["user"],
  },
  {
    id: generateRandomId(),
    path: "/account/markers",
    linkText: "Marcadores",
    roles: ["user"],
  },
  {
    id: generateRandomId(),
    path: "/account/highlights",
    linkText: "Destacados",
    roles: ["user"],
  },
  {
    id: generateRandomId(),
    path: "/account/notes",
    linkText: "Notas",
    roles: ["user"],
  },
];
