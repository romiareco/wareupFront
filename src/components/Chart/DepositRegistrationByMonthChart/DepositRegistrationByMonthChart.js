import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Deposit } from "../../../api";
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
      text: "Cantidad de depósitos registrados por mes",
    },
  },
};

const depositController = new Deposit();

export function DepositRegistrationByMonthChart() {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await depositController.getAllDeposits();
        setDeposits(response.deposits);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    fetchData();
  }, []);

  const depositCountByMonth = {};

  deposits.forEach((deposit) => {
    const createdAt = new Date(deposit.createdAt);
    const monthYear = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}`;
    if (depositCountByMonth.hasOwnProperty(monthYear)) {
      depositCountByMonth[monthYear]++;
    } else {
      depositCountByMonth[monthYear] = 1;
    }
  });

  const labels = Object.keys(depositCountByMonth);
  const dataValues = Object.values(depositCountByMonth);

  const data = {
    labels,
    datasets: [
      {
        label: "# depósitos",
        data: dataValues,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
