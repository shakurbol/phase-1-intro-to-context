// Your code here
function createEmployeeRecord(employeeArray) {
    return {
      firstName: employeeArray[0],
      familyName: employeeArray[1],
      title: employeeArray[2],
      payPerHour: employeeArray[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, timeStamp) {
    const [date, time] = timeStamp.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
  
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hour),
      minute: parseInt(minute),
      date: date,
    };
  
    employee.timeInEvents.push(timeInEvent);
    return employee;
  }
  
  function createTimeOutEvent(employee, timeStamp) {
    const [date, time] = timeStamp.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
  
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour),
      minute: parseInt(minute),
      date: date,
    };
  
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
  }
  
  function hoursWorkedOnDate(employee, workDate) {
    const timeInEvent = employee.timeInEvents.find((event) => event.date === workDate);
    const timeOutEvent = employee.timeOutEvents.find((event) => event.date === workDate);
  
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) +
      (timeOutEvent.minute - timeInEvent.minute) / 60;
  
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employee, workDate) {
    const hoursWorked = hoursWorkedOnDate(employee, workDate);
    const payRate = employee.payPerHour;
  
    return hoursWorked * payRate;
  }
  
  function allWagesFor(employee) {
    const workDates = employee.timeInEvents.map((event) => event.date);
    const totalWages = workDates.reduce((total, date) => {
      return total + wagesEarnedOnDate(employee, date);
    }, 0);
  
    return totalWages;
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor(employee);
    }, 0);
  }
  