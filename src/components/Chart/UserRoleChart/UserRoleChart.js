import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { User } from "../../../api";
import { mapUserRole } from "../../../utils/mapFunctions";
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
      text: "Cantidad de usuarios registrados por rol",
    },
  },
};

const userController = new User();

export function UserRoleChart() {
  const { accessToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [labels, setLabels] = useState([]);

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
    const uniqueRoleValues = [
      ...new Set(users.map((user) => mapUserRole(user.role))),
    ];

    setLabels(uniqueRoleValues);
  }, [users]);

  const userCountByRole = labels.reduce((acc, label) => {
    acc[label] = 0;
    return acc;
  }, {});

  users.forEach((user) => {
    const role = mapUserRole(user.role);
    if (userCountByRole.hasOwnProperty(role)) {
      userCountByRole[role]++;
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
        data: labels.map((label) => userCountByRole[label]),
        backgroundColor: randomColors,
      },
    ],
  };

  return <Pie options={options} data={data} />;
}
