//TODO: analizar si deberiamos poner en mayusculas el nombre de los ENUMS
const userStatus = {
    ACTIVE: 1,
    DELETED: 2,
    PENDING: 3,
    BLOCKED: 4
}

const role = {
    ADMIN: 1,
    CLIENT: 2
}

const logsType = {
    database: 1,
    service: 2,
    routes: 3
}

const companyStatus = {
    ACTIVE: 1, 
    DELETED: 2,
    PENDING: 3 
}
 
const depositStatus = {
    ACTIVE: 1,
    DELETED: 2,
    PENDING: 3,
    PAUSED: 4
}

const depositRequestStatus = { 
    PENDING: 1,
    COMPLETED: 2,
    CANCELED: 3
}

const resultCodes = {
    OK: 1,
    genericError: 2,
    invalidData: 3, 
    requiredData: 4, 
}

module.exports = {
    userStatus,
    role,
    logsType,
    depositStatus,
    resultCodes,
    companyStatus,
    depositRequestStatus
}
