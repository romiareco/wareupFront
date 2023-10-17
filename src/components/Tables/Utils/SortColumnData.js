export function SortColumnData(data, orderBy, order) {
  return [...data].sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "asc" ? aValue - bValue : bValue - aValue;
    } else {
      const stringA = String(aValue || "");
      const stringB = String(bValue || "");
      return order === "asc"
        ? stringA.localeCompare(stringB)
        : stringB.localeCompare(stringA);
    }
  });
}
