import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { DepositRequest } from "../../../api";
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
      text: "Cantidad de solicitudes de depósitos por status",
    },
  },
};

const depositRequestController = new DepositRequest();

export function DepositRequestStatusChart() {
  const { accessToken } = useAuth();
  const [depositRequests, setDepositRequests] = useState([]);
  const [labels, setLabels] = useState([]);

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

  useEffect(() => {
    const uniqueStatusValues = [
      ...new Set(
        depositRequests.map((depositRequest) =>
          mapDepositRequestStatus(depositRequest.status)
        )
      ),
    ];
    setLabels(uniqueStatusValues);
  }, [depositRequests]);

  const depositRequestsCountByStatus = labels.reduce((acc, label) => {
    acc[label] = 0;
    return acc;
  }, {});

  depositRequests.forEach((depositRequest) => {
    const status = mapDepositRequestStatus(depositRequest.status);
    if (depositRequestsCountByStatus.hasOwnProperty(status)) {
      depositRequestsCountByStatus[status]++;
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
        label: "# solicitudes de depósitos",
        data: labels.map((label) => depositRequestsCountByStatus[label]),
        backgroundColor: randomColors,
      },
    ],
  };

  return <Pie options={options} data={data} />;
}
