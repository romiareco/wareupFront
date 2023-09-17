import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import "./GoogleMaps.css";
import { ENV } from "../../utils";
import { Deposit } from "../../api";

const depositController = new Deposit();
export function GoogleMaps() {
  const [deposits, setDeposits] = useState([]);

  
  useEffect(() => {
    (async () => {
      const response = depositController.getAllDeposits();

      if(response.deposits) {

      }
    })();
  }, []);


  const { isLoaded } = useLoadScript({
    googleMapsApiKey: ENV.API_KEY.GOOGLE_MAPS || "",
  });
  const center = useMemo(() => ({ lat: -34.90867800000001, lng: -56.1893107 }), []);

  //Para saber las coordenadas de la dirección, puedo consultar la API de google maps
  // GET https://maps.googleapis.com/maps/api/geocode/json?address="Canelones 1228, Montevideo"&key=AIzaSyCyhhjlBSyQEUA1qNH9WATD6XPaB2pt3V4
  /**
   * 1. Filtrar depositos por zona
   * 2. Ir a buscar los depositos
   * 3. Recorrer los depositos y obtener las direcciones
   * 4. Pasar por la api de coordenadas de google maps
   * 5. Generar objeto con la siguiente info: coordenadas del deposito, titulo, id 
   * 6. Agregar hipervinculo a los markers para que muestre el titulo del deposito y te redireccione a la publicacion (si se puede mostrar fotito mejor)
   */
  return (
    <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={15}
        >
          <Marker position={{ lat: -34.90867800000001, lng: -56.1893107  }} 
            icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
            />
        </GoogleMap>
      )}
    </div>
  );
};