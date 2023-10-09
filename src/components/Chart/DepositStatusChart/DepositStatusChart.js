import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Deposit } from "../../../api";
import { mapDepositStatus } from "../../../utils/mapFunctions";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Cantidad de depósitos por status",
    },
  },
};

const depositController = new Deposit();

export function DepositStatusChart() {
  const [deposits, setDeposits] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await depositController.getAllDeposits();
        setDeposits(response.deposits);
      } catch (error) {
        console.error("Error al obtener los datos de los depósitos:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const uniqueStatusValues = [
      ...new Set(deposits.map((deposit) => mapDepositStatus(deposit.status))),
    ];
    setLabels(uniqueStatusValues);
  }, [deposits]);

  const depositCountByStatus = labels.reduce((acc, label) => {
    acc[label] = 0;
    return acc;
  }, {});

  deposits.forEach((deposit) => {
    const status = mapDepositStatus(deposit.status);
    if (depositCountByStatus.hasOwnProperty(status)) {
      depositCountByStatus[status]++;
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
        label: "# depósitos",
        data: labels.map((label) => depositCountByStatus[label]),
        backgroundColor: randomColors,
      },
    ],
  };

  return <Pie options={options} data={data} />;
}
