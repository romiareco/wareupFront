import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { User } from "../../../api";
import { mapUserStatus } from "../../../utils/mapFunctions";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
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
      text: "Cantidad de usuarios registrados por status",
    },
  },
};

const userController = new User();

export function UserStatusChart() {
  const { accessToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [labels, setLabels] = useState([]); // Estado para almacenar los labels dinámicos

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

  useEffect(() => {
    // Obtener una lista de valores de estado únicos
    const uniqueStatusValues = [...new Set(users.map((user) => mapUserStatus(user.status)))];

    // Establecer los labels en función de los valores únicos de estado
    setLabels(uniqueStatusValues);
  }, [users]);

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
        label: "# usuarios",
        data: labels.map((label) => userCountByStatus[label]),
        backgroundColor: randomColors,
      },
    ],
  };

  return <Pie options={options} data={data} />;
}
