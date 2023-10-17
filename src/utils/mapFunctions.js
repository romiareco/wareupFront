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

export function mapUserInformation(users) {
  const filteredInformation = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      industry: user.industry,
      createdAt: mapDateFormat(user.createdAt),
      status: user.status,
    };
  });

  return filteredInformation;
}
export function mapCompanyInformation(companies) {
  const fileredInformation = companies.map((company) => {
    return {
      id: company.id,
      businessName: company.businessName,
      RUT: company.RUT,
      createdAt: mapDateFormat(company.createdAt),
      position: company.position,
      email: company.email,
      address: company.address,
      phone: company.phone,
      status: company.status,
      contactName: company.contactName,
    };
  });

  return fileredInformation;
}

export function mapDepositCalendar(depositCalendars) {
  const fileredInformation = depositCalendars.map((depositCalendar) => {
    return {
      id: depositCalendar.id,
      dateFrom: mapDateFormat(depositCalendar.dateFrom),
      dateTo: mapDateFormat(depositCalendar.dateTo),
      totalM3: depositCalendar.totalM3,
      depositId: depositCalendar.depositId,
      createdAt: mapDateFormat(depositCalendar.createdAt),
    };
  });

  return fileredInformation;
}

export function mapDepositRequestInformation(depositRequests) {
  const filteredInformation = depositRequests.map((deposit) => {
    return {
      id: deposit.id,
      title: deposit.title,
      description: deposit.description,
      email: deposit.email,
      phone: deposit.phone,
      createdAt: mapDateFormat(deposit.createdAt),
      departmentName: deposit.city ? deposit.city.department.title : null,
      cityId: deposit.city ? deposit.city.title : null,
      address: deposit.address,
      status: deposit.status,
      businessName: deposit.company ? deposit.company.businessName : null,
    };
  });

  return filteredInformation;
}

export function mapBookingRequestInformation(bookingRequests) {
  const filteredInformation = bookingRequests.map((bookingRequest) => {
    return {
      id: bookingRequest.id,
      totalM3: bookingRequest.totalM3,
      status: bookingRequest.status,
      createdAt: mapDateFormat(bookingRequest.createdAt),
      dateTo: mapDateFormat(bookingRequest.dateTo),
      dateFrom: mapDateFormat(bookingRequest.dateFrom),
      depositId: bookingRequest.depositId,
    };
  });

  return filteredInformation;
}

export function mapDepositInformation(deposits) {
  const filteredInformation = deposits.map((deposit) => {
    return {
      id: deposit.id,
      title: deposit.title,
      description: deposit.description,
      totalM3: deposit.totalM3,
      currency: deposit.currency,
      expectedPrice: deposit.expectedPrice,
      address: deposit.address,
      cityName: deposit.city ? deposit.city.title : null,
      cityId: deposit.cityId,
      departmentId: deposit.city ? deposit.city.departmentId : null,
      departmentName: deposit.city ? deposit.city.department.title : null,
      status: deposit.status,
      createdAt: mapDateFormat(deposit.createdAt),
      businessName: deposit.company ? deposit.company.businessName : null,
      companyId: deposit.companyId,
      postalCode: deposit.postalCode,
      depositServices: deposit.depositServices,
      minimumBusinessVolume: deposit.minimumBusinessVolume,
      minimumBusinessPeriod: deposit.minimumBusinessPeriod,
    };
  });

  return filteredInformation;
}

export function mapBase64ToImage(base64String) {
  return `data:image/png;base64,${base64String}`;
}

export function mapDateFormat(date) {
  if (date) {
    return date.split("T")[0];
  }
  return null;
}
