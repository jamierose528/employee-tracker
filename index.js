// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");
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
    console.table(data);
    startMenu();
  });
}
function viewRoles() {}
function viewEmployees() {}
function addDepartment() {}
function addRole() {}
function addEmployee() {}
function updateEmployee() {}

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
