import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Company, Deposit, DepositRequest } from "../../../api";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: "Cantidad de solicitudes de depósitos registrados por mes",
    },
  },
};

const depositRequestController = new DepositRequest();

export function DepositRequestRegistrationByMonthChart() {
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

  // Inicializa un objeto para contar la cantidad de empresas por mes
  const depositRequestCountByMonth = {};

  // Procesa los datos de las empresas para contar la cantidad por mes
  depositRequests.forEach((depositRequest) => {
    const createdAt = new Date(depositRequest.createdAt);
    const monthYear = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}`;
    if (depositRequestCountByMonth.hasOwnProperty(monthYear)) {
      depositRequestCountByMonth[monthYear]++;
    } else {
      depositRequestCountByMonth[monthYear] = 1;
    }
  });

  // Convierte el objeto en dos arrays (labels y data) para usar en el gráfico
  const labels = Object.keys(depositRequestCountByMonth);
  const dataValues = Object.values(depositRequestCountByMonth);

  const data = {
    labels,
    datasets: [
      {
        label: "# solicitudes de depósitos",
        data: dataValues,
        borderColor: "rgb(55, 146, 176)",
        backgroundColor: "rgba(70, 188, 227, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
