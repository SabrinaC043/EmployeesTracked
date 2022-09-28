const inquirer = require("inquirer");
// require('console.table');
const db = require('./db/lib');

function init() {
    inquirer.prompt([
        {
            type: "list",
            name: "choices",//what function do you want to run?
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add Department",
                "Add Employee",
                "Add Role",
                "Update Employee Role",
                "Done"
            ],
        },
    ]).then((answers) => {

        switch (answers.choices) {
            case "View All Departments":
                viewDepartments();
                break;
            case "View All Employees":
                viewEmployees();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Add Role":
                addRole();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Done":
                process.exit();
            default: "Error encountered, please try again"
                break;

        }
    })
};

function viewDepartments() {
    db.getAllDepartments().then(([data]) => console.table(data)).then(() => init())
}
function viewEmployees() {
    db.getAllEmployees().then(([data]) => console.table(data)).then(() => init())
}


function viewRoles() {
    db.getAllRoles().then(([data]) => console.table(data)).then(() => init())
}

function addDepartment() {
    db.addNewDepartment().then(() => console.log("Department added!").then(() => init()));
}

// function addEmployee() {
//     i
//     init();
// };

// function addRole() {
//     inquirier.prompt([
//         {
//             type: "input",
//             name: "addRole",
//             message: "What is the name of this role?"
//         },
//         {
//             type: "input",
//             name: "addSalary",
//             message: "What is the salary of the role?"
//         },
//         {
//             type: "list",
//             name: "selectDepartment",
//             message: "What department does this role belong to?",
//             choices: ["Finance", "Enginnering", "Legal", "Sales",]
//         },
//         {
//             type: "list",
//             name: "employeeRole",
//             message: "What is the employees role",
//             choices: ["Lawyer", "Enginner", "Legal Team Lead", "Salesperson", "Lead Engineer"]
//         },
//     ])
//     init();
// };

// function updateEmployeeRole() {
//     inquirer.prompt[{
//         type: "list",
//         name: "roleUpdate",
//         message: "Which role do you want to assign the selected employee?",
//         choices: ["Accountant",
//             "Legal Team Lead",
//             "Lawyer",
//             "Salesperson",
//             "Sales Lead"
//             , "Lead Engineer",
//             "Software Engineer",
//             "Account Manager",]
//     },
//     {
//         type: "list",
//         name: "whoseManager",
//         choices: ["Hailey Martinez", "John Doe", "Joshua Jones",]
//     }
//     ]
//     init();

// };




init();