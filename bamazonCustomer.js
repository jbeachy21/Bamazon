var inquirer = require('inquirer');
var mysql = require("mysql");
var itemQuantities = [];
var prices = [];
var Table = require("easy-table");


var t = new Table;
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    password: null,
    //password: "password",
    // Your password
    database: "bamazon"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Welcome to Bamazon we have the following products available");
    connection.query('SELECT * FROM products',function(err,rows){
        if(err) throw err;
      
        for (var i = 0; i<rows.length; i++) {
            prices[i] = rows[i].price;
            itemQuantities[i] = rows[i].stock_quantity;
            t.cell("ItemId", rows[i].item_id);
            t.cell("Product", rows[i].product_name);
            t.cell("Department", rows[i].department_name);
            t.cell("Price", rows[i].price);
            t.cell("Quantity", rows[i].stock_quantity);
            t.newRow();
        }
        console.log();
        console.log(t.toString());
        start();
      });
    
  });
  
  function start() {
      inquirer
  .prompt([
    {
        type: "input",
        message: "What is the id of the product that you are interested in?",
        name: "ItemId",
        
      },
      {
        type: "input",
        message: "How many units of that product would you like to buy?",
        name: "Units"
      }
  ])
  .then(answers => {
      var query = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id =?";
      var ItemId = answers.ItemId
      var HowMany = answers.Units;
      
      itemQuantities[ItemId] = itemQuantities[ItemId] - HowMany; 
      var stock = itemQuantities[ItemId];
      var totalPrice = HowMany * prices[ItemId];
      console.log("totalPrice: " + totalPrice);
       console.log("HowMany: " + HowMany);
       console.log("stock: " + stock);
       
      
      if (stock === 0 || HowMany > stock) {
        console.log("Insufficient quantity (you ordered too many or we are currently out of stock).");
        connection.end();
      } 
      else {
        connection.query(query, [HowMany, ItemId], function (err, results) {
          if (err) throw err;
          console.log();
          console.log("You spent " + totalPrice + " dollars today, thank you for shopping at Bamazon today");
          t.rows[ItemId].Quantity = stock;
          console.log(t.toString());
          return results;
        });

          connection.end();
      }
        
},

)}
  
