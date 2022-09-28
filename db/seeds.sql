INSERT INTO department (name)
VALUES ( "Sales"),
      ( "Engineering"),
       ( "Finance"),
       ( "Legal");


 INSERT INTO role ( title, salary, department_id)
 VALUES ("Sales Lead",110000,1),
        ( "Salesperson",90000,1),
        ( "Lead Engineer", 150000, 2),
        ( "Software Engineer", 120000,2),
        ( "Account Manager", 160000,3),
        ( "Accountant", 125000,3),
        ( "Legal Team Lead", 250000, 4),
        ( "Lawyer", 190000, 4);


INSERT INTO employee ( first_name, last_name, role_id, manager_id)
VALUES ("John","Doe",1,NULL),
       ("Mike","Chan",1,NULL),
       ("Ashley","Rodriguez",3,NULL),
       ("Kevin","Tupik",4,3),
       ("Kunal","Singh",5,NULL),
       ("Mahalia", "Wood", 6,5),
       ( "Joshua", "Jones", 7,NULL),
       ("Hailey", "Martinez", 8,7);





