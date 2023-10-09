import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { BookingRequest, Company } from "../../../api";
import {
  mapBookingRequestInformation,
  mapCompanyStatus,
  mapDepositRequestStatus,
} from "../../../utils/mapFunctions";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAuth } from "../../../hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Cantidad de solicitudes de arrendamiento registradas por status",
    },
  },
};

const bookingRequestController = new BookingRequest();

const labels = ["Pendiente", "Completada", "Cancelada", "Desconocido"];

export function BookingRequestStatusChart() {
  const { accessToken } = useAuth();
  const [bookingRequests, setBookingRequests] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await bookingRequestController.getBookingRequests(
          accessToken
        );
        setBookingRequests(response.bookingRequests);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    fetchData();
  }, [accessToken]);

  // Inicializa un objeto para contar la cantidad de depósitos por estado
  const bookingRequestCountByStatus = labels.reduce((acc, label) => {
    acc[label] = 0;
    return acc;
  }, {});

  // Procesa los datos de depósito para contar la cantidad por estado
  bookingRequests.forEach((bookingRequest) => {
    const status = mapDepositRequestStatus(bookingRequest.status);
    if (bookingRequestCountByStatus.hasOwnProperty(status)) {
      bookingRequestCountByStatus[status]++;
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: "# solicitudes de arrendamiento",
        data: labels.map((label) => bookingRequestCountByStatus[label]),
        backgroundColor: "rgba(230, 218, 76, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
