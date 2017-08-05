const mysql = require('mysql');
const inquirer = require('inquirer')
const consoleTable = require('console.table')

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Shaina2013Walker",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
//   console.log("connected as id " + connection.threadId + "\n");
  bamazon.supervisor();
});

var bamazon = {
    supervisor: function() {
        inquirer
        .prompt([
            {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Product Sales by Department", "Create New Department"],
            name: "choice"
            }
        ])
        .then(function(inquirerResponse) {
            if (inquirerResponse.choice === "View Product Sales by Department") {
                bamazon.sales();
            }
            else if (inquirerResponse.choice === "Create New Department") {
                bamazon.create();
            }
        });
    },

    sales: function() {
        var query = connection.query(
            "SELECT departments.department_id, departments.department_name, departments.over_head_cost, products.product_sales, products.product_sales - departments.over_head_cost AS total_profit FROM departments INNER JOIN products ON departments.department_name = products.department_name order by departments.department_id",
            function(err, res) {
                //this displays a table
                console.table(res)
            }
        )
    },

    create: function() {
        inquirer
        .prompt([
            {
            type: "input",
            message: "Name of new department?",
            // choices: results,
            name: "department"
            },
            {
            type: "input",
            message: "What is the overhead of this department",
            // choices: results,
            name: "head"
            },
        ])
        .then(function(res) {
            bamazon.addDepartment(res.department, res.head)
        })
    },

    addDepartment: function(department, overhead) {
        var query = connection.query (
        "INSERT INTO departments (department_name, over_head_cost) VALUES ('"+department+"',"+overhead+")",
        function (err, res) {
            if (err) throw err
            console.log('department added');
            bamazon.supervisor()
        });
    },
}