const connection = require("./connection");

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
            // THEN I am presented with a formatted table showing
            //, departments, salaries, and managers that the employees report to
            // employee table, role , department,employee onto itself
            // SELECT 
            .promise()
            .query(
                "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name,' ',manager.last_name) FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id=department.id LEFT JOIN employee AS manager ON manager.id= employee.manager_id;");
    }

    insertDepartment(dept) {
        return this.connection.promise().query('INSERT INTO department SET ?', dept);

    }

    insertRole(employee) {

        return this.connection
            // .promise()
            .query(
                `INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ( '${employee.first_name}', '${employee.last_name}', '${employee.role_id}','${employee.manager_id}');`

            )

    }


}









module.exports = new Lib(connection);
 //WHEN I choose to view all roles
        // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
        // WHEN I choose to view all employees
         //WHEN I choose to view all employees
        // THEN I am presented with a formatted table showing
        //employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to