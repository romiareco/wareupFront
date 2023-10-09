import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Company } from "../../../api";
import { mapCompanyStatus } from "../../../utils/mapFunctions";
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
      text: "Cantidad de empresas registradas por status",
    },
  },
};

const companyController = new Company();

const labels = ["Activa", "Eliminada", "Desconocido"];

export function CompanyStatusChart() {
  const { accessToken } = useAuth();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await companyController.getAllCompanies(accessToken);
        setCompanies(response.companies);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    fetchData();
  }, [accessToken]);

  // Inicializa un objeto para contar la cantidad de depósitos por estado
  const companyCountByStatus = labels.reduce((acc, label) => {
    acc[label] = 0;
    return acc;
  }, {});

  // Procesa los datos de depósito para contar la cantidad por estado
  companies.forEach((company) => {
    const status = mapCompanyStatus(company.status);
    if (companyCountByStatus.hasOwnProperty(status)) {
      companyCountByStatus[status]++;
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: "# empresas",
        data: labels.map((label) => companyCountByStatus[label]),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
