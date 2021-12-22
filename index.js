// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");
const { printTable } = require("console-table-printer");
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "nefarious",
  database: "employee_db",
});

db.connect((err) => {
  if (err) throw err;
  startMenu();
});

function viewDeparment() {
  db.query("select * from department", (err, data) => {
    printTable(data);
    startMenu();
  });
}
function viewRoles() {
  db.query("select * from role", (err, data) => {
    printTable(data);
    startMenu();
  });
}
function viewEmployees() {
  db.query("select * from employee", (err, data) => {
    printTable(data);
    startMenu();
  });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the new department?",
      },
    ])
    .then((answer) => {
      db.query(
        "insert into department (name) values (?)",
        [answer.departmentName],
        (err, data) => {
          console.log("Your new department has been added!");
          viewDeparment();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "What is the new role?",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the salary of this role?",
      },
      {
        type: "input",
        name: "roleDepartmentId",
        message: "What is this role's deparment ID?",
      },
    ])
    .then((answer) => {
      db.query(
        "insert into role (title, salary, department_id) values (?, ?, ?)",
        [answer.roleTitle, answer.roleSalary, answer.roleDepartmentId],
        (err, data) => {
          console.log("Your new role has been added!");
          viewRoles();
        }
      );
    });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeFirstName",
        message: "What is the new employee's first name?",
      },
      {
        type: "input",
        name: "employeeLastName",
        message: "What is the new employee's last name",
      },
      {
        type: "input",
        name: "employeeRoleId",
        message: "What is the new employee's role ID?",
      }
    ])
    .then((answer) => {
      db.query(
        "insert into employee (first_name, last_name, role_id) values (?, ?, ?)",
        [
          answer.employeeFirstName,
          answer.employeeLastName,
          answer.employeeRoleId,
        ],
        (err, data) => {
          console.log("Your new Employee has been added!");
          viewEmployees();
        }
      );
    });
}
function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Which employee ID would you like to update?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the new role ID?",
      },
    ])
    .then((answer) => {
      db.query(
        "update employee set role_id = ? where id = ?",
        [answer.roleId, answer.employeeId],
        (err, data) => {
          console.log("Your new role has been updated!");
          viewEmployees();
        }
      );
    });
}

function startMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answers) => {
      if (answers.menu === "View all departments") {
        viewDeparment();
      } else if (answers.menu === "View all roles") {
        viewRoles();
      } else if (answers.menu === "View all employees") {
        viewEmployees();
      } else if (answers.menu === "Add a department") {
        addDepartment();
      } else if (answers.menu === "Add a role") {
        addRole();
      } else if (answers.menu === "Add an employee") {
        addEmployee();
      } else {
        updateEmployee();
      }
    });
}
