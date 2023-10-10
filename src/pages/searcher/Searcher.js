import { useLocation } from "react-router-dom";
import { SearcherView } from "../../components/Searcher";
import { useEffect } from "react";

export function Searcher() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  let filters = {};

  useEffect(() => {
    document.title = "Buscador";
  }, []);

  const queryToFiltersMap = {
    city: "city",
    department: "department",
    servicesId: "servicesId",
    fromPrice: "fromPrice",
    toPrice: "toPrice",
    fromTotalM3: "fromTotalM3",
    toTotalM3: "toTotalM3",
  };

  for (const [queryKey, filtersKey] of Object.entries(queryToFiltersMap)) {
    const value = queryParams.get(queryKey);
    if (value !== null) {
      filters[filtersKey] = value;
    }
  }

  return <SearcherView filters={filters} />;
}
