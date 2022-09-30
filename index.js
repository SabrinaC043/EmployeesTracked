const inquirer = require("inquirer");
const { insertRole } = require("./db/lib");
require('console.table');
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
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the Department?"
        },
    ])
        .then((answers) => {
            db.insertDepartment(answers).then(() => init())
        });
}


async function addEmployee() {
    let listOfEmployees = await db.getAllEmployees();
    console.log(listOfEmployees[0])

    let listOfRoles = await db.getAllRoles();
    console.log(listOfRoles[0])

    let arrayOfRoles = [];
    listOfRoles[0].map(role => {
        arrayOfRoles.push(role.id);
        console.log(role)

    })

    let arrayOfManagers = [];
    listOfEmployees[0].map(emp => {
        arrayOfManagers.push(emp.id)

    })
    console.log(arrayOfManagers)

    let answer = await inquirer.prompt([
        {
            type: "list",
            name: "role_id",
            message: "What is the name of this role?",
            choices: arrayOfRoles
        },


        {
            type: "list",
            name: "manager_id",
            message: "Who is their manager?",
            choices: arrayOfManagers
        },
        {
            type: "input",
            name: "first_name",
            message: "What is their first name?",
            // choices: arrayOfManagers
        },
        {
            type: "input",
            name: "last_name",
            message: "What is their last name?",
        }

    ])
    console.log(answer) // 1. add employee with the role of Manager 
    // 2. assign the employee 
    db.insertRole(answer);
    init();
}



function addRole() {
    let listOfDeparment = [];
    db.getAllDepartments().then(([data]) => {
        // what kind of array can I build? return an array of object with key value pairs name:name   value: id


        data.map(dep => {
            listOfDeparment
                .push(dep.id)
        }
        )
    })
    // let arrayOfManagers = [];
    // listOfEmployees[0].map(emp => {
    //     arrayOfManagers.push(emp.id)

    // })
    // let data = await db.getAllDepartments();
    // console.log(data[0])

    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the name of this role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?"
        },
        {
            type: "list",
            name: "department_id",
            message: "What department does this role belong to?",
            choices: listOfDeparment
        }

    ]).then((answers) => {
        console.log(answers)
    });
}



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

module.exports = init