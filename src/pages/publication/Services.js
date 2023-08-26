import { Box } from "@mui/system";
import { useAuth } from "../../hooks";
import React, { useEffect, useState } from "react";
import { Deposit } from "../../api";

const depositController = new Deposit();

export function Services({depositId}) {
    const [depositServices, setDepositServices] = useState([]);
    const { accessToken } = useAuth();

    useEffect(() => {
        (async () => {
          try {
            const response = await depositController.getDepositServicesById(
              accessToken,
              depositId
            );
            setDepositServices(response.depositServices);
          } catch (error) {
            console.error(error);
          }
        })();
      }, [accessToken, depositId]);

    return(
        <Box>
            Todos los servicios irán aca
        </Box>
    );
}