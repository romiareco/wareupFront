import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Company } from "../../../api";
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
      text: "Cantidad de empresas registradas por mes",
    },
  },
};

const companyController = new Company();

export function CompanyRegistrationByMonthChart() {
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

  const companyCountByMonth = {};

  companies.forEach((company) => {
    const createdAt = new Date(company.createdAt);
    const monthYear = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}`;
    if (companyCountByMonth.hasOwnProperty(monthYear)) {
      companyCountByMonth[monthYear]++;
    } else {
      companyCountByMonth[monthYear] = 1;
    }
  });

  const labels = Object.keys(companyCountByMonth);
  const dataValues = Object.values(companyCountByMonth);

  const data = {
    labels,
    datasets: [
      {
        label: "# empresas",
        data: dataValues,
        borderColor: "rgb(179, 49, 37)",
        backgroundColor: "rgba(229, 63, 49, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
