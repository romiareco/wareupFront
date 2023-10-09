import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { User } from "../../../api";
import { mapUserStatus } from "../../../utils/mapFunctions";
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
      text: "Cantidad de usuarios registrados por status",
    },
  },
};

const userController = new User();

const labels = ["Activo", "Eliminado", "Bloqueado", "Pendiente", "Desconocido"];

export function UserStatusChart() {
  const { accessToken } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await userController.getAllUsers(accessToken);
        setUsers(response.users);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    fetchData();
  }, [accessToken]);

  // Inicializa un objeto para contar la cantidad de depósitos por estado
  const userCountByStatus = labels.reduce((acc, label) => {
    acc[label] = 0;
    return acc;
  }, {});

  // Procesa los datos de depósito para contar la cantidad por estado
  users.forEach((user) => {
    const status = mapUserStatus(user.status);
    if (userCountByStatus.hasOwnProperty(status)) {
      userCountByStatus[status]++;
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: "# usuarios",
        data: labels.map((label) => userCountByStatus[label]),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
