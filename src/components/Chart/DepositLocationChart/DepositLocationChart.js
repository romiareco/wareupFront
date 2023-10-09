import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Common, Deposit } from "../../../api";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const depositController = new Deposit();
const commonController = new Common();

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Cantidad de depósitos por departmento",
    },
  },
};

export function DepositLocationChart() {
  const [depositData, setDepositData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await commonController.getDepartments();
        const departmentTitles = response.departments.map(
          (department) => department.title
        );
        setLabels(departmentTitles);
      } catch (error) {
        console.error("Error al obtener los datos de los depósitos:", error);
      }
    }

    fetchDepartments();
  }, []);

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

  let data = {};

  if (labels.length > 0) {
    const depositCountByDepartment = labels.reduce((acc, label) => {
      acc[label] = 0;
      return acc;
    }, {});

    const randomColors = labels.map(() => {
      const randomColor = `rgba(${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, 0.5)`;
      return randomColor;
    });

    depositData.forEach((deposit) => {
      const depositDepartment = deposit.city.department.title;
      if (depositCountByDepartment.hasOwnProperty(depositDepartment)) {
        depositCountByDepartment[depositDepartment]++;
      }
    });

    data = {
      labels,
      datasets: [
        {
          label: "# depósitos",
          data: labels.map((label) => depositCountByDepartment[label]),
          backgroundColor: randomColors,
        },
      ],
    };
  } else {
    // Si labels aún no está definido, puedes manejar este caso de manera adecuada, por ejemplo, mostrando un mensaje de carga o un indicador.
    data = {
      labels: [],
      datasets: [],
    };
  }

  // Procesa los datos de depósito para contar la cantidad por estado

  return <Pie options={options} data={data} />;
}
