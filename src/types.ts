export interface Account{
    id: number,
    personal_id: string,
    name: string,
    lastname: string,
    username: string,
    password: string,
    position: string,
    active: boolean
}

export interface Position {
    id: number,
    name: string,
    salary: string,
    active: boolean,
    isByPass: boolean
}

export interface Employee {
    id: number,
    personal_id: number,
    fullName: string,
    priceHours: number,
    position: string,
    active: boolean
}
export interface TimeLog{
    id: number,
    userId: number,
    clockIn: Date,
    clockOut?: Date
}

export interface EmployeePosition {
    id: number,
    userID: number,
    positionID: Number,
    active: boolean
}

export interface WorkedHour {
    employeeId: number,
    hours: number,
    date: string
}

export interface Permission {
    permission: string,
    positionId: number,
    active: boolean
}

export interface Payroll {
    payrollID: number,
    employeeId: number;
    salary: number;
    workedHours: number;
    overtimeHours: number;
    overtimePay: number;
    payrollDate: string;
    payPeriod: string;
    totalPay: number;
}

export interface AccountsRegister {
    username: string,
    password: string,
    name: string,
    lastname: string,
}

export interface AccountLogin {
    token: string;
    username: string;
    password: string;
    expirationDate: Date;
    creationDate: Date;
    sessionId: string;
};

export interface UserData {
    id: number,
    username: string,
    password: string
}

export interface Token {
    userId: number,
    token: string
};

export interface TokenResponse {
    listOfTokens: Token[];
}

export interface TokenWithDetails {
    tokenId: number;
    userId: number;
    token: string;
    creationDate: string;
    expiresIn: string;
    active: boolean;
}


export interface DataBase {
    employees: Employee[],
    accounts: Account[],
    positions: Position[],
    workedHours: WorkedHour[],
    timeLogs: TimeLog[],
    permissions: Permission[],
    payroll: Payroll[]
}

