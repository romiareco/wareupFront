/* global google */
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import "./DepositsMap.css";
import { ENV } from "../../utils";
import { Google } from "../../api";
import { Box } from "@mui/material";
import { NotificationSnackbar } from "../Snackbar";

const googleMapsController = new Google();

export function DepositsMap({ filters, deposits }) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [userInteracting, setUserInteracting] = useState(false);
  const [customDeposits, setCustomDeposits] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: ENV.GOOGLE_DEFAULT_COORDINATES.INITIAL_LATITUDE,
    lng: ENV.GOOGLE_DEFAULT_COORDINATES.INITIAL_LONGITUDE,
  });

  useEffect(() => {
    (async () => {
      try {
        if (deposits.length > 0) {
          const updatedDeposits = await Promise.all(
            deposits.map(async (deposit) => {
              const response =
                await googleMapsController.getLocationCoordinates(
                  deposit.address,
                  filters && filters.department
                    ? filters.department
                    : deposit.city.department.title
                );

              if (
                response &&
                response.results.length > 0 &&
                response.results[0].geometry &&
                response.results[0].geometry.location
              ) {
                const location = response.results[0].geometry.location;
                const coordinates = {
                  lat: location.lat,
                  lng: location.lng,
                };

                return {
                  ...deposit,
                  coordinates,
                };
              }
              return deposit;
            })
          );

          const filteresDeposits = updatedDeposits.map((deposit) => ({
            id: deposit.id,
            title: deposit.title,
            description: deposit.description,
            currency: deposit.currency,
            price: deposit.expectedPrice,
            address: deposit.address,
            coordinates: deposit.coordinates,
            cityId: deposit.cityId,
          }));

          setCustomDeposits(filteresDeposits);
          setUserInteracting(false);
        }
      } catch (error) {
        console.error(error);
        setNotificationMessage(error);
        setNotificationSeverity("error");
        setNotificationOpen(true);
      }
    })();
  }, [deposits, filters, filters.department]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: ENV.API_KEY.GOOGLE_MAPS || "",
  });

  // Restablecer los valores cuando deposits cambia a un valor vacío
  useEffect(() => {
    if (deposits.length === 0) {
      setCustomDeposits([]);
      setMapCenter({
        lat: ENV.GOOGLE_DEFAULT_COORDINATES.INITIAL_LATITUDE,
        lng: ENV.GOOGLE_DEFAULT_COORDINATES.INITIAL_LONGITUDE,
      });
    }
  }, [deposits]);

  // Restablecer valores cuando se desmonta el componente
  useEffect(() => {
    return () => {
      setCustomDeposits([]);
      setMapCenter({
        lat: ENV.GOOGLE_DEFAULT_COORDINATES.INITIAL_LATITUDE,
        lng: ENV.GOOGLE_DEFAULT_COORDINATES.INITIAL_LONGITUDE,
      });
    };
  }, []);

  useEffect(() => {
    if (!userInteracting && customDeposits && customDeposits.length > 0) {
      const uniqueCityIds = [
        ...new Set(customDeposits.map((deposit) => deposit.cityId)),
      ];

      if (uniqueCityIds.length === 1) {
        // Calcula el promedio de las coordenadas de todos los marcadores
        let totalLat = 0;
        let totalLng = 0;

        customDeposits.forEach((deposit) => {
          if (deposit.coordinates) {
            totalLat += deposit.coordinates.lat;
            totalLng += deposit.coordinates.lng;
          }
        });

        const newCenter = {
          lat: totalLat / customDeposits.length,
          lng: totalLng / customDeposits.length,
        };
        setMapCenter(newCenter);
      } else {
        const newCenter = {
          lat: ENV.GOOGLE_DEFAULT_COORDINATES.INITIAL_LATITUDE,
          lng: ENV.GOOGLE_DEFAULT_COORDINATES.INITIAL_LONGITUDE,
        };
        setMapCenter(newCenter);
      }
    }
  }, [customDeposits, userInteracting]);

  return (
    <Box className="App" width={"100%"}>
      {!isLoaded || customDeposits.length === 0 ? null : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={mapCenter}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{ zoomControl: true }}
          onDragend={() => setUserInteracting(true)}
          onZoomChanged={() => setUserInteracting(true)}
        >
          {customDeposits &&
            customDeposits.map((deposit) =>
              deposit.coordinates ? (
                <Marker
                  key={deposit.id}
                  position={{
                    lat: deposit.coordinates.lat,
                    lng: deposit.coordinates.lng,
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
                lat: selectedMarker.coordinates.lat,
                lng: selectedMarker.coordinates.lng,
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h2>
                  <a
                    href={`/publication-view?id=${selectedMarker.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {selectedMarker.title}
                  </a>
                </h2>
                <p>{selectedMarker.description}</p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
