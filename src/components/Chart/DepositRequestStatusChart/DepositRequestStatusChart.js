import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Deposit, DepositRequest } from "../../../api";
import {
  mapDepositRequestStatus,
  mapDepositStatus,
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
      text: "Cantidad de solicitudes de depósitos por status",
    },
  },
};

const depositRequestController = new DepositRequest();

const labels = ["Pendiente", "Completada", "Cancelada", "Desconocido"];

export function DepositRequestStatusChart() {
  const { accessToken } = useAuth();
  const [depositRequests, setDepositRequests] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await depositRequestController.getAllRequestDeposits(
          accessToken
        );
        setDepositRequests(response.depositRequests);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    fetchData();
  }, [accessToken]);

  // Inicializa un objeto para contar la cantidad de depósitos por estado
  const depositRequestsCountByStatus = labels.reduce((acc, label) => {
    acc[label] = 0;
    return acc;
  }, {});

  // Procesa los datos de depósito para contar la cantidad por estado
  depositRequests.forEach((depositRequest) => {
    const status = mapDepositRequestStatus(depositRequest.status);
    if (depositRequestsCountByStatus.hasOwnProperty(status)) {
      depositRequestsCountByStatus[status]++;
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: "# solicitudes de depósitos",
        data: labels.map((label) => depositRequestsCountByStatus[label]),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
