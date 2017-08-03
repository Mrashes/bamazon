const mysql = require('mysql');
const inquirer = require('inquirer')

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
  bamazon.start();
});

var bamazon = {
    start: function() {
        inquirer
        .prompt([
            {
            type: "input",
            message: "What id item would you like to buy?",
            // choices: ["Post", "Bid"],
            name: "id"
            },
            {
            type: "input",
            message: "How many units?",
            // choices: ["Post", "Bid"],
            name: "units"
            }
        ])
        .then(function(inquirerResponse) {
            var query = connection.query(
                "SELECT stock_quantity FROM products WHERE item_id = '" + inquirerResponse.id +"'",
                function(err, res) {
                    // updateProdcut();
                    if (res[0].stock_quantity < inquirerResponse.units) {
                            console.log('Insufficient quantity, we only have ' + res[0].stock_quantity + " in stock!")
                            bamazon.start();
                        }
                    else {
                        // console.log(res)
                        var query = connection.query(
                            "UPDATE products SET stock_quantity = "+(res[0].stock_quantity-inquirerResponse.units)+ " WHERE item_id = '" + inquirerResponse.id +"';",
                            function (err, res) {
                                console.log(res.affectedRows)
                            }
                        );
                        var query = connection.query(
                            "SELECT price FROM products WHERE item_id = '" + inquirerResponse.id +"';",
                            function (err, res) {
                                console.log("This cost you: " + (res[0].price * inquirerResponse.units))
                                var query = connection.query(
                                    "UPDATE products SET product_sales = "+(res[0].price * inquirerResponse.units)+ " WHERE item_id = " + inquirerResponse.id,
                                    function (err, res) {
                                        if (err) throw err
                                        // console.log("This cost you: " + (res[0].price * inquirerResponse.units))
                                        bamazon.start();
                                    }
                                );
                                
                            }
                        );

                    }
                }
            )
            var query = connection.query(
                "SELECT product_sales FROM products WHERE item_id = '" + inquirerResponse.id +"'",
                function(err, res) {

                })
        });
    },

    showTable: function() {
        var query = connection.query(
            "select * from products",
            function(err, res) {
                // updateProdcut();
                console.log(res)
            }
        )

        console.log(query.sql);
    },

    createProduct: function(name, department, price, stock) {
        var query = connection.query(
            "insert into products set ?",
            {
                product_name: name,
                department_name: department,
                price: price,
                stock_quantity: stock   
            },
            function(err, res) {
                // updateProdcut();
                // console.log(res.affectedRows + " product inserted")
            }
        )

        // console.log(query.sql);
    },


    updateProdcut: function(field, value, idNum) {
        var query = connection.query(
            'update products set ? where ?',
            [
                {
                    field: value
                },
                {
                    id: idNum
                }
            ],
            function(err, res) {
                // console.log(res.affectedRows)
            }
        );
    }
}