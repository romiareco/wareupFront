import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { BookingRequest } from "../../../api";
import { mapDepositRequestStatus } from "../../../utils/mapFunctions";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAuth } from "../../../hooks";

ChartJS.register(ArcElement, Tooltip, Legend);

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

export function BookingRequestStatusChart() {
  const { accessToken } = useAuth();
  const [bookingRequests, setBookingRequests] = useState([]);
  const [labels, setLabels] = useState([]);

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

  useEffect(() => {
    const uniqueStatusValues = [
      ...new Set(
        bookingRequests.map((bookingRequest) =>
          mapDepositRequestStatus(bookingRequest.status)
        )
      ),
    ];
    setLabels(uniqueStatusValues);
  }, [bookingRequests]);

  const bookingRequestCountByStatus = labels.reduce((acc, label) => {
    acc[label] = 0;
    return acc;
  }, {});

  bookingRequests.forEach((bookingRequest) => {
    const status = mapDepositRequestStatus(bookingRequest.status);
    if (bookingRequestCountByStatus.hasOwnProperty(status)) {
      bookingRequestCountByStatus[status]++;
    }
  });

  const randomColors = labels.map(() => {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.5)`;
    return randomColor;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "# solicitudes de arrendamiento",
        data: labels.map((label) => bookingRequestCountByStatus[label]),
        backgroundColor: randomColors,
      },
    ],
  };

  return <Pie options={options} data={data} />;
}
