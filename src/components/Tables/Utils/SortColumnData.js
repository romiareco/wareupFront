export function SortColumnData(data, orderBy, order) {
    return [...data].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];
  
      if (typeof aValue === "number" && typeof bValue === "number") {
        // Si ambos valores son números, realiza una comparación numérica
        return order === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        // Si al menos uno de los valores no es un número, realiza una comparación de cadenas
        const stringA = String(aValue || ""); // Convierte a cadena de texto y maneja valores nulos o indefinidos
        const stringB = String(bValue || ""); // Convierte a cadena de texto y maneja valores nulos o indefinidos
        return order === "asc"
          ? stringA.localeCompare(stringB)
          : stringB.localeCompare(stringA);
      }
    });
  }