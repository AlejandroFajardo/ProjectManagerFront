export const formatPriority = (string) => {
  switch (string) {
    case "A":
      return "Alta";
    case "M":
      return "Media";
    case "B":
      return "Baja";
    default:
      break;
  }
};

export const formatStatus = (string) => {
  switch (string) {
    case "E":
      return "En progreso";
    case "P":
      return "Pendiente";
    case "F":
      return "Finalizado";
    default:
      break;
  }
};
