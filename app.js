const mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  createProduct();
});

function createProduct() {
    var query = connection.query(
        "insert into products set ?",
        {
            flavor: "rocky road",
            price: 3.0,
            quantity: 50
        },
        function(err, res) {
            updateProdcut();
        }
    )

    console.log(query.sql);
}

function updateProdcut() {
    var query = connection.query(
        'update products set ? where ?',
        [
            {
                quantity: 100
            },
            {
                id:4
            }
        ],
        function(err, res) {
            console.log(res.affectedRows)
        }
    );
}