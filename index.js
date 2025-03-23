// createEmployeeRecord
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// const employeeData = ["John", "Doe", "Manager", 25];
// const employeeRecord = createEmployeeRecord(employeeData);
// console.log(employeeRecord);

// createEmployeeRecords
function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
}

// const employeesData = [
//     ["John", "Doe", "Manager", 25],
//     ["Jane", "Smith", "Developer", 30]
// ];
// const employeeRecords = createEmployeeRecords(employeesData);
// console.log(employeeRecords);

// createTimeInEvent
function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employeeRecord;
}

// createTimeInEvent(employeeRecord, "2023-10-01 0900");
// console.log(employeeRecord.timeInEvents);

// createTimeOutEvent
function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employeeRecord;
}

// createTimeOutEvent(employeeRecord, "2023-10-01 1700");
// console.log(employeeRecord.timeOutEvents);

// hoursWorkedOnDate
function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date).hour;
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date).hour;
    return (timeOut - timeIn) / 100;
}

// const hoursWorked = hoursWorkedOnDate(employeeRecord, "2023-10-01");
// console.log(hoursWorked)

// wagesEarnedOnDate
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
}

// const wages = wagesEarnedOnDate(employeeRecord, "2023-10-01");
// console.log(wages);

// allWagesFor
function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employeeRecord, date), 0);
}

// const totalWages = allWagesFor(employeeRecord);
// console.log(totalWages);

// calculatePayroll
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employeeRecord) => totalPayroll + allWagesFor(employeeRecord), 0);
}
