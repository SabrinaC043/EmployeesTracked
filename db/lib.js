const connection = require("./connection");
const inquirer = require("inquirer");

class Lib {
    constructor(connection) {
        this.connection = connection;
    }

    getAllDepartments() {
        return this.connection.promise().query("SELECT * FROM department;");
    }
    getAllRoles() {
        return this.connection
            .promise()
            .query(
                "SELECT role.title, role.id, department.name, role.salary FROM role JOIN department ON role.department_id = department.id;"
            );
    }
    getAllEmployees() {
        return this.connection
            .promise()
            .query(
                "SELECT * FROM employee");
    }
    //employee.id, employee.first_name, employee.last_name, FROM employee JOIN role.title, role.salary, ON role WHERE manager_name=role.id;"

    addNewDepartment() {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "addDepartment",
                    message: "What is the name of the Department?",
                },
            ])
            .then((answers) => {
                return this.connection.promise().query(`INSERT INTO department (name) VALUES("${answers.addDepartment}")`);
            });
    }
};






module.exports = new Lib(connection);
 //WHEN I choose to view all roles
        // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
        // WHEN I choose to view all employees
         //WHEN I choose to view all employees
        // THEN I am presented with a formatted table showing
        //employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to