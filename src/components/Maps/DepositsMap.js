/* global google */
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import "./DepositsMap.css";
import { ENV } from "../../utils";
import { Deposit, Google } from "../../api";
import { Box } from "@mui/material";
import { NotificationSnackbar } from "../NotificationSnackbar";

const depositController = new Deposit();
const googleMapsController = new Google();

export function DepositsMap({ cityId, departmentId }) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [deposits, setDeposits] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: ENV.GOOGLE_DEFAULT_COORDINATES.INITIAL_LATITUDE,
    lng: ENV.GOOGLE_DEFAULT_COORDINATES.INITIAL_LONGITUDE,
  });

  useEffect(() => {
    (async () => {
      try {
        const filters = {
          applyFilter: true,
          city: cityId,
          department: departmentId,
        };

        const response = await depositController.getAllDeposits(filters);

        if (response.deposits && response.deposits.length > 0) {
          const filteresDeposits = [];

          for (const deposit of response.deposits) {
            const depositInfo = {
              id: deposit.id,
              title: deposit.title,
              description: deposit.description,
              currency: deposit.currency,
              price: deposit.expectedPrice,
              address: deposit.street,
            };

            filteresDeposits.push(depositInfo);
          }
          setDeposits(filteresDeposits);
        }
      } catch (error) {
        console.error(error);
        setNotificationMessage(error);
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    })();
  }, [cityId, departmentId]);

  useEffect(() => {
    (async () => {
      try {
        const updatedDeposits = await Promise.all(
          deposits.map(async (deposit) => {
            const response = await googleMapsController.getLocationCoordinates(
              deposit.address,
              departmentId
            );

            if (
              response &&
              response.results.length > 0 &&
              response.results[0].geometry &&
              response.results[0].geometry.location
            ) {
              const location = response.results[0].geometry.location;
              const depositCoordinates = {
                lat: location.lat,
                lng: location.lng,
              };

              // Retorna un nuevo objeto de depósito con 'depositCoordinates' actualizado
              return {
                ...deposit,
                depositCoordinates,
              };
            }
            // Si no se obtienen coordenadas válidas, se retorna el depósito original
            return deposit;
          })
        );

        // Actualiza el estado con la lista de depósitos actualizada
        setDeposits(updatedDeposits);
      } catch (error) {
        console.error(error);
        setNotificationMessage(error);
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    })();
  }, [deposits, departmentId]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: ENV.API_KEY.GOOGLE_MAPS || "",
  });

  useEffect(() => {
    if (deposits && deposits.length > 0) {
      // Calcula el promedio de las coordenadas de todos los marcadores
      let totalLat = 0;
      let totalLng = 0;

      deposits.forEach((deposit) => {
        if (deposit.depositCoordinates) {
          // Verifica si deposit.depositCoordinates existe
          totalLat += deposit.depositCoordinates.lat;
          totalLng += deposit.depositCoordinates.lng;
        }
      });

      const newCenter = {
        lat: totalLat / deposits.length,
        lng: totalLng / deposits.length,
      };
      setMapCenter(newCenter); // Actualiza el centro del mapa
    }
  }, [deposits]);

  return (
    <Box className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={mapCenter}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "600px" }}
          options={{ zoomControl: true }}
        >
          {deposits &&
            deposits.map((deposit) =>
              deposit.depositCoordinates ? (
                <Marker
                  key={deposit.id}
                  position={{
                    lat: deposit.depositCoordinates.lat,
                    lng: deposit.depositCoordinates.lng,
                  }}
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  }}
                  onClick={() => setSelectedMarker(deposit)}
                />
              ) : null
            )}
          {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.depositCoordinates.lat,
                lng: selectedMarker.depositCoordinates.lng,
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                {/* Agrega un hipervínculo en el título */}
                <h2>
                  <a href={`/publication-view?id=${selectedMarker.id}`}>
                    {selectedMarker.title}
                  </a>
                </h2>
                <p>{selectedMarker.description}</p>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                  <h3 style={{ marginRight: "5px" }}>
                    {selectedMarker.currency}
                  </h3>
                  <h3>{selectedMarker.price}</h3>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
      <NotificationSnackbar
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </Box>
  );
}
