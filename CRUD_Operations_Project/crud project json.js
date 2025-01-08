document.addEventListener("DOMContentLoaded", function () {
  const employeeForm = document.getElementById("employeeForm")
  const employeeName = document.getElementById("employeeName")
  const employeeTitle = document.getElementById("employeeTitle")
  const employeeList = document.getElementById("employeeList")

  //  load employees from local storage

  function loadEmployees() {
    employeeList.innerHTML = ""
    const employees = JSON.parse(localStorage.getItem("employees")) || []
    employees.forEach((employee, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
     <td>${employee.name}</td>
     <td>${employee.title}</td>
     
     <td>
     <button onclick="editEmployee(${index})">Edit</button>
     <button onclick="deleteEmployee(${index})">Delete</button>
     </td>
     `;
      employeeList.append(row);
    });

  }

  //   add new employee

  employeeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newEmployeeName = employeeName.value.trim();
    const newEmployeeTitle = employeeTitle.value.trim();
    if (newEmployeeName !== "" && newEmployeeTitle !== "") {
      const employees = JSON.parse(localStorage.getItem("employees")) || [];
      const newEmployee = { name: newEmployeeName, title: newEmployeeTitle };
      employees.push(newEmployee);
      localStorage.setItem("employees", JSON.stringify(employees));
      employeeName.value = "";
      employeeTitle.value = "";
      loadEmployees();
    }
  });

  // edit an employee

  window.editEmployee = function (index) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employee = employees[index];
    const updatedName = prompt("Edit EmployeeName:", employee.name);
    const updatedTitle = prompt("Edit EmployeeTitle:", employee.title);
    if (updatedName !== null && updatedTitle !== null) {
      employee.name = updatedName;
      employee.title = updatedTitle;
      localStorage.setItem("employees", JSON.stringify(employees));
      loadEmployees();
    }

  };

  // delete an employee

  window.deleteEmployee = function (index) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.splice(index, 1);
    localStorage.setItem("employees", JSON.stringify(employees));
    loadEmployees();
  };

  // initial load of employees
  loadEmployees();

})