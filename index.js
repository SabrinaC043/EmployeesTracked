const inquirer = require("inquirer");
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


function addEmployee() {
    db.getAllRoles().then(([roles]) => {
        const arrayOfRoles = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }))

        db.getAllEmployees().then(([emps]) => {
            const arrayOfManagers = emps.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))



            inquirer.prompt([
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

                },
                {
                    type: "input",
                    name: "last_name",
                    message: "What is their last name?",
                }
            ]).then((answers) => {
                db.insertEmployee(answers).then(() => init())
            })
        })


    })



}


function addRole() {
    db.getAllDepartments().then(([deps]) => {
        const listOfDeparment = deps.map(({ id, name }) => ({
            name: name,
            value: id,
        }))

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
            db.insertRole(answers).then(() => init());
        });



    })

}

// THEN I am prompted to select an employee to update and their 

// new role and this information is updated in the database

function updateEmployeeRole() {
    db.getAllRoles().then(([roles]) => {
        const arrayOfRoles = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }))

        db.getAllEmployees().then(([emps]) => {
            const arrayOfEmployees = emps.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))



            inquirer.prompt([
                {
                    type: "list",
                    name: "emp_id",
                    message: "Please choose an employee to update?",
                    choices: arrayOfEmployees
                },
                {
                    type: "list",
                    name: "role_id",
                    message: "Please choose their new role:",
                    choices: arrayOfRoles
                },

            ]).then((answers) => {
                db.updateRole(answers.emp_id, answers.role_id).then(() => init())
            })
        })


    })
}






init();

