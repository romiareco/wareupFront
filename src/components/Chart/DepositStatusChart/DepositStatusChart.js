import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Deposit } from "../../../api";
import { mapDepositStatus } from "../../../utils/mapFunctions";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

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
      position: 'top',
    },
    title: {
      display: true,
      text: 'Cantidad de depósitos por status',
    },
  },
};

const depositController = new Deposit();

const labels = ["Activo", "Eliminado", "Pendiente", "Pausado", "Desconocido"];

export function DepositStatusChart() {
  const [depositData, setDepositData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await depositController.getAllDeposits();
        setDepositData(response.deposits);
      } catch (error) {
        console.error("Error al obtener los datos de los depósitos:", error);
      }
    }

    fetchData();
  }, []);

  // Inicializa un objeto para contar la cantidad de depósitos por estado
  const depositCountByStatus = labels.reduce((acc, label) => {
    acc[label] = 0;
    return acc;
  }, {});

  // Procesa los datos de depósito para contar la cantidad por estado
  depositData.forEach((deposit) => {
    const status = mapDepositStatus(deposit.status);
    if (depositCountByStatus.hasOwnProperty(status)) {
      depositCountByStatus[status]++;
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: "# depósitos",
        data: labels.map((label) => depositCountByStatus[label]),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Bar options={options} data={data} />
  );
}
