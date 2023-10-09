import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { User } from "../../../api";
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
      text: "Cantidad de usuarios registrados por mes",
    },
  },
};

const userController = new User();

export function UserRegistrationByMonthChart() {
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

  // Inicializa un objeto para contar la cantidad de empresas por mes
  const userCountByMonth = {};

  // Procesa los datos de las empresas para contar la cantidad por mes
  users.forEach((user) => {
    const createdAt = new Date(user.createdAt);
    const monthYear = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}`;
    if (userCountByMonth.hasOwnProperty(monthYear)) {
      userCountByMonth[monthYear]++;
    } else {
      userCountByMonth[monthYear] = 1;
    }
  });

  // Convierte el objeto en dos arrays (labels y data) para usar en el gráfico
  const labels = Object.keys(userCountByMonth);
  const dataValues = Object.values(userCountByMonth);

  const data = {
    labels,
    datasets: [
      {
        label: "# usuarios",
        data: dataValues,
        borderColor: "rgb(174, 55, 179)",
        backgroundColor: "rgba(224, 72, 229, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
