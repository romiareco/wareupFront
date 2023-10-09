import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { BookingRequest } from "../../../api";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js";
import { useAuth } from "../../../hooks";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: "Cantidad de solicitudes de arrendamiento registradas por mes",
    },
  },
};

const bookingRequestController = new BookingRequest();

export function BookingRequestRegistrationByMonthChart() {
  const { accessToken } = useAuth();
  const [bookingRequests, setBookingRequests] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await bookingRequestController.getBookingRequests(accessToken);
        setBookingRequests(response.bookingRequests);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    fetchData();
  }, [accessToken]);

  // Inicializa un objeto para contar la cantidad de empresas por mes
  const bookingRequestCountByMonth = {};

  // Procesa los datos de las empresas para contar la cantidad por mes
  bookingRequests.forEach((bookingRequest) => {
    const createdAt = new Date(bookingRequest.createdAt);
    const monthYear = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}`;
    if (bookingRequestCountByMonth.hasOwnProperty(monthYear)) {
        bookingRequestCountByMonth[monthYear]++;
    } else {
        bookingRequestCountByMonth[monthYear] = 1;
    }
  });

  // Convierte el objeto en dos arrays (labels y data) para usar en el gráfico
  const labels = Object.keys(bookingRequestCountByMonth);
  const dataValues = Object.values(bookingRequestCountByMonth);

  const data = {
    labels,
    datasets: [
      {
        label: "# solicitudes de arrendamiento",
        data: dataValues,
        borderColor: "rgb(43, 179, 54)",
        backgroundColor: "rgba(56, 229, 70, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
