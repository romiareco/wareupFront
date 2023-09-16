import { useLocation } from "react-router-dom";
import { Searcher } from "../../components/Searcher";


export function MapSearcher() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const cityValue = queryParams.get("city");

    const filter = {
        "applyFilter": true,
        "city": cityValue
    }
    return(
        <Searcher filters={filter}/>
    );
}