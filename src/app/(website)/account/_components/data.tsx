// Function to generate a random ID
const generateRandomId = () => Math.floor(Math.random() * 100000);

export const accountTablists = [
  {
    id: generateRandomId(),
    path: "/account",
    linkText: "My Profile",
    roles: ["user"],
  },
  {
    id: generateRandomId(),
    path: "/account/documents",
    linkText: "My Documents",
    roles: ["user"],
  },
  {
    id: generateRandomId(),
    path: "/account/markers",
    linkText: "Markers",
    roles: ["user"],
  },
  {
    id: generateRandomId(),
    path: "/account/highlights",
    linkText: "Highlights",
    roles: ["user"],
  },
  {
    id: generateRandomId(),
    path: "/account/notes",
    linkText: "Notes",
    roles: ["user"],
  },
];
