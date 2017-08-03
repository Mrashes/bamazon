const mysql = require('mysql');
const inquirer = require('inquirer')
const consoleTable = require('console.table')

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
//   console.log("connected as id " + connection.threadId + "\n");
  bamazon.manager();
});

var bamazon = {
    manager: function() {
        inquirer
        .prompt([
            {
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "choice"
            }
        ])
        .then(function(inquirerResponse) {
            if (inquirerResponse.choice === "View Products for Sale") {
                bamazon.forSale();
            }
            else if (inquirerResponse.choice === "View Low Inventory") {
                bamazon.lowInv();
            }
            else if (inquirerResponse.choice === "Add to Inventory") {
                bamazon.newInv();
            }
            else if (inquirerResponse.choice === "Add New Product") {
                bamazon.newProduct();
            }
        });
    },

    forSale: function() {
        // console.log('hit this')
        var query = connection.query(
            "select * from products",
            function(err, res) {
                // updateProdcut();
                console.table(res)
                bamazon.manager()
            }
        )
        // console.log(query.sql);
    },

    lowInv: function() {
        var query = connection.query(
            "SELECT * FROM products WHERE stock_quantity<5",
            function(err, res) {
                // updateProdcut();
                console.log(res)
                bamazon.manager()
            }
        )
    },

    newInv: function() {
        var query = connection.query(
            "SELECT product_name FROM products",
            function(err, res) {
                console.log(res)
                bamazon.messageInator(res).then(function(results){
                    inquirer
                    .prompt([
                        {
                        type: "list",
                        message: "Which product do you want to change",
                        choices: results,
                        name: "change"
                        },
                       {
                        type: "input",
                        message: "How much do you want to add",
                        // choices: results,
                        name: "addition"
                        },
                    ])
                    .then(function(inquirerResponse) {
                        bamazon.changeInv(inquirerResponse.addition, inquirerResponse.change)
                    })
                })
            });
    },

    changeInv: function(number, product) {
        var query = connection.query (
            "SELECT stock_quantity FROM products WHERE product_name = '"+product+"'",
            function (err, res) {
                if (err) throw err
                // console.log(res)
                var query = connection.query (
                "UPDATE products SET stock_quantity =  "+ (res[0].stock_quantity+number) +" WHERE product_name = '"+product+"'",
                function(err, res) {
                    // console.log(res)
                    bamazon.manager()
                });
            });
    },

        //next function to write
        //wooh
        //I'm gonna do job apps
    newProduct: function() {
            inquirer
                    .prompt([
                       {
                        type: "input",
                        message: "What is the name of the product",
                        // choices: results,
                        name: "product"
                        },
                        {
                        type: "input",
                        message: "Which department is that in?",
                        // choices: results,
                        name: "department"
                        },
                        {
                        type: "input",
                        message: "How much does it cost?",
                        // choices: results,
                        name: "cost"
                        },
                        {
                        type: "input",
                        message: "How many do we have?",
                        // choices: results,
                        name: "stock"
                        },
                    ])
                    .then(function(res) {
                        bamazon.addInv(res.product, res.department, res.cost, res.stock)
                    })
    },

    addInv: function(product, department, price, stock) {
        var query = connection.query (
        "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('"+product+"','"+department+"',"+price+","+stock+")",
        function (err, res) {
            if (err) throw err
            console.log('Product added');
            bamazon.manager()
        });
    },

    messageInator: function(res) {
        return new Promise(
        function(resolve, reject) {
            let message = []
            for (i=0; i<res.length; i++){
                message.push(res[i].product_name)
                if (i== res.length-1) {
                    resolve(message)
                }
            }
        });
    },
}

