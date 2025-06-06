export const getBackgroundClass = (colorName: string) => {
  const colors: Record<string, string> = {
    yellow: "bg-yellow-100",
    green: "bg-green-100",
    blue: "bg-blue-100",
    pink: "bg-pink-100",
    orange: "bg-orange-100",
    white: "bg-white",
  };
  return colors[colorName] || "bg-white";
};
