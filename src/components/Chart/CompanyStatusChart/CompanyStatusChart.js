import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Company } from "../../../api";
import { mapCompanyStatus } from "../../../utils/mapFunctions";
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
      text: "Cantidad de empresas registradas por status",
    },
  },
};

const companyController = new Company();

export function CompanyStatusChart() {
  const { accessToken } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [labels, setLabels] = useState([]);

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

  useEffect(() => {
    const uniqueStatusValues = [
      ...new Set(companies.map((company) => mapCompanyStatus(company.status))),
    ];
    setLabels(uniqueStatusValues);
  }, [companies]);

  const companyCountByStatus = labels.reduce((acc, label) => {
    acc[label] = 0;
    return acc;
  }, {});

  companies.forEach((company) => {
    const status = mapCompanyStatus(company.status);
    if (companyCountByStatus.hasOwnProperty(status)) {
      companyCountByStatus[status]++;
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
        label: "# empresas",
        data: labels.map((label) => companyCountByStatus[label]),
        backgroundColor: randomColors,
      },
    ],
  };

  return <Pie options={options} data={data} />;
}
