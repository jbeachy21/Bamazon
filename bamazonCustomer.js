var inquirer = require('inquirer');
var mysql = require("mysql");
var itemQuantities = [];

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    password: "Yggdrasil22",
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
            console.log("________________________");
            console.log();
            console.log("ID: " + rows[i].item_id + " || Product: " + rows[i].product_name + " || Department: " + rows[i].department_name + 
            " || Price: " + rows[i].price + " || Quantity: " + rows[i].stock_quantity);
            console.log();
            itemQuantities[i] = rows[i].stock_quantity;
            console.log("itemQuantity: " + itemQuantities[i]);

        }
        //console.log(rows);
        start();
      });
    
  });
  
  function start() {
      console.log("Hello");
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
      var query = "UPDATE products SET stock_quantity = stock_quantity - '?' WHERE item_id ='?'";
      var ItemId = answers.ItemId
      var HowMany = answers.Units;
      // select * from products;

      // update products set stock_quantity = stock_quantity - 10 where item_id = 1;
      
      connection.query(query, HowMany, ItemId, function (err, results) {
        if (err) throw err;
        console.log("stock_quantity: " + results[0].stock_quantity);
        return results;
      });


      console.log("units2: " + connection.units);
      console.log("connection: " + connection);
        
        //Subtract Units from results[0].stock_quantity and update the products table in the bamazon database
      //}
}
)}
  