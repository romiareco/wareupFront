import { useEffect, useState } from "react";
import { Service } from "../../api";

const servicesController = new Service();

export function Filters() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await servicesController.getAllServices();

        if (response.serviceGroups && response.serviceGroups.length > 0) {
          const formattedData = response.serviceGroups.flatMap((group) =>
            group.services.map((service) => ({
              code: group.code,
              groupId: group.id,
              serviceId: service.id,
              serviceName: service.title,
            }))
          );
          setServices(formattedData);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
}
