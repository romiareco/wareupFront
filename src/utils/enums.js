export const userStatus = {
    ACTIVE: 1,
    DELETED: 2,
    PENDING: 3,
    BLOCKED: 4
}

export const role = {
    ADMIN: 1,
    CLIENT: 2
}

export const companyStatus = {
    ACTIVE: 1, 
    DELETED: 2,
    PENDING: 3 
}
 
export const depositStatus = {
    ACTIVE: 1,
    DELETED: 2,
    PENDING: 3,
    PAUSED: 4
}

export const depositRequestStatus = { 
    PENDING: 1,
    COMPLETED: 2,
    CANCELED: 3
}

export const resultCodes = {
    OK: 1,
    genericError: 2,
    invalidData: 3, 
    requiredData: 4, 
}

export const currencies = [
    { value: "USD", label: "Dólar estadounidense (USD)" },
    { value: "UYU", label: "Peso uruguayo (UYU)" },
  ];