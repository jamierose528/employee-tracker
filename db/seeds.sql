INSERT INTO department (name)
VALUES ("Finance"),
       ("Human Resources"),
       ("Sales"),
       ("Animal Control"),
       ("Engineering"),
       ("Management");

INSERT INTO role (title, salary, department_id)
VALUES ("Head Accounting", 50000, 1),
       ("Health and Safety Coordinator", 35000, 2),
       ("HR Manager", 60000, 6),
       ("Animal Handler", 30000, 4),
       ("Air Conditioning Engineer", 90000, 5),
       ("Product Specialist", 45000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jamie", "Chu", 6, )       