import { useLocation } from "react-router-dom";
import { Searcher } from "../../components/Searcher";
import { depositStatus } from "../../utils";


export function MapSearcher() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const cityValue = queryParams.get("city");

    const filter = {
        "applyFilter": true,
        "city": cityValue,
        "status": depositStatus.ACTIVE,
    }
    return(
        <Searcher filters={filter}/>
    );
}