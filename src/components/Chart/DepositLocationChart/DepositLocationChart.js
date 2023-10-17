import React, { useEffect, useState } from "react";
import { Common, Deposit } from "../../../api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const depositController = new Deposit();
const commonController = new Common();

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
      text: "Cantidad de depósitos por departamento",
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

  const depositCountByDepartment = labels.reduce((acc, label) => {
    acc[label] = 0;
    return acc;
  }, {});

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
        backgroundColor: "rgba(74, 229, 232, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
