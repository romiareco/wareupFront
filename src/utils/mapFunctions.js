import {
  depositRequestStatus,
  depositStatus,
  userStatus,
  role,
  companyStatus,
} from "./enums";

export function mapDepositRequestStatus(statusNumber) {
  const status = parseInt(statusNumber);
  switch (status) {
    case depositRequestStatus.PENDING:
      return "Pendiente";
    case depositRequestStatus.COMPLETED:
      return "Completada";
    case depositRequestStatus.CANCELED:
      return "Cancelada";
    default:
      return "Desconocido";
  }
}

export function mapCompanyStatus(statusNumber) {
  const status = parseInt(statusNumber);
  switch (status) {
    case companyStatus.ACTIVE:
      return "Activa";
    case companyStatus.DELETED:
      return "Eliminada";
    case companyStatus.PENDING:
      return "Pendiente";
    default:
      return "Desconocido";
  }
}

export function mapDepositStatus(statusNumber) {
  const status = parseInt(statusNumber);
  switch (status) {
    case depositStatus.ACTIVE:
      return "Activo";
    case depositStatus.DELETED:
      return "Eliminado";
    case depositStatus.PAUSED:
      return "Pausado";
    case depositStatus.PENDING:
      return "Pendiente";
    default:
      return "Desconocido";
  }
}

export function mapUserStatus(statusNumber) {
  const status = parseInt(statusNumber);
  switch (status) {
    case userStatus.ACTIVE:
      return "Activo";
    case userStatus.BLOCKED:
      return "Bloqueado";
    case userStatus.DELETED:
      return "Eliminado";
    case userStatus.PENDING:
      return "Pendiente";
    default:
      return "Desconocido";
  }
}

export function mapUserRole(statusNumber) {
  const status = parseInt(statusNumber);
  switch (status) {
    case role.ADMIN:
      return "Admin";
    case role.CLIENT:
      return "Cliente";
    default:
      return "Desconocido";
  }
}

export function mapDepositRequestInformation(depositRequests) {
  const filteredInformation = depositRequests.map((deposit) => {
    const date = deposit.createdAt.split('T')[0]; // Divide la cadena en función del carácter 'T' y selecciona la primera parte (la fecha)

    return {
      id: deposit.id,
      title: deposit.title,
      description: deposit.description,
      email: deposit.email,
      phone: deposit.phone,
      createdAt: date,
    //  departmentName: deposit.city? deposit.city.department.title : null,
      cityId: deposit.city ? deposit.city.title : null,
      address: deposit.address,
      status: deposit.status,
      businessName: deposit.company ? deposit.company.businessName : null,
    };
  });

  filteredInformation.sort((a, b) => {
    if (a.status > b.status) return -1; // Cambiamos el orden aquí
    if (a.status < b.status) return 1; // Cambiamos el orden aquí
    return 0;
  });
  
  return filteredInformation;
}

export function mapDepositInformation(deposits) {
  const filteredInformation = deposits.map((deposit) => {
    const date = deposit.createdAt.split('T')[0]; // Divide la cadena en función del carácter 'T' y selecciona la primera parte (la fecha)

    return {
      id: deposit.id,
      title: deposit.title,
      description: deposit.description,
      totalM3: deposit.totalM3,
      currency: deposit.currency,
      expectedPrice: deposit.expectedPrice,
      street: deposit.street,
      cityName: deposit.city ? deposit.city.title : null,
      cityId: deposit.cityId,
      departmentId: deposit.city? deposit.city.departmentId : null,
      departmentName: deposit.city? deposit.city.department.title : null,
      status: deposit.status,
      createdAt: date,
      businessName: deposit.company ? deposit.company.businessName : null,
      companyId: deposit.companyId,
      postalCode: deposit.postalCode,
      depositServices: deposit.depositServices,
    };
  });

  filteredInformation.sort((a, b) => {
    if (a.status > b.status) return -1; // Cambiamos el orden aquí
    if (a.status < b.status) return 1; // Cambiamos el orden aquí
    return 0;
  });

  return filteredInformation;
}

export function mapBase64ToImage(base64String) {
  return `data:image/png;base64,${base64String}`;
}
