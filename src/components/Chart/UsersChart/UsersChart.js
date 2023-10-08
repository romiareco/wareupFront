import { useEffect, useState } from "react";
import { User } from "../../../api";
import { useAuth } from "../../../hooks";
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartsTooltip } from "@mui/x-charts";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
const userController = new User();

export function UsersChart() {
  const { accessToken } = useAuth();
  const [userCreationData, setUserCreationData] = useState([]);

  useEffect(() => {
    const getUsersData = async () => {
      return await userController.getAllUsers(accessToken);
    };

    getUsersData().then((data) => {
      // Aquí debes procesar los datos para contar la cantidad de usuarios creados por día.
      // Por ejemplo, puedes usar un objeto para realizar el conteo.
      const userCountByDay = {};
      data.forEach((user) => {
        const date = user.createdAt.split("T")[0];
        userCountByDay[date] = (userCountByDay[date] || 0) + 1;
      });

      // Luego, transformamos los datos en un formato adecuado para la gráfica.
      const chartData = {
        xAxis: [{ data: Object.keys(userCountByDay) }], // Días
        series: [
          {
            data: Object.values(userCountByDay), // Cantidad de usuarios creados por día
          },
        ],
      };

      setUserCreationData(chartData);
    });
  }, [accessToken]);

  return (
    <LineChart data={userCreationData} width={500} height={300}>
      <xAxis dataKey="data[0]" />
      <yAxis />
      <ChartsTooltip />
      <ChartsLegend />
    </LineChart>
  );
}
