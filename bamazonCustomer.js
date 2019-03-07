var inquirer = require('inquirer');
var mysql = require("mysql");
var itemQuantities = [];
var Table = require("easy-table");


var t = new Table;
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
            // console.log("________________________");
            // console.log();
            // console.log("ID: " + rows[i].item_id + " || Product: " + rows[i].product_name + " || Department: " + rows[i].department_name + 
            // " || Price: " + rows[i].price + " || Quantity: " + rows[i].stock_quantity);
            // console.log();
            // itemQuantities[i] = rows[i].stock_quantity;
            // console.log("itemQuantity: " + itemQuantities[i]);
            t.cell("Item id", rows[i].item_id);
            t.cell("Product", rows[i].product_name);
            t.cell("Department", rows[i].department_name);
            t.cell("Price", rows[i].price);
            t.cell("Quantity", rows[i].stock_quantity);
            t.newRow();

        }
        console.log();
        console.log(t.toString());
        //console.log(rows);
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
      itemQuantities[ItemId+1] = itemQuantities[ItemId+1] - HowMany; 
      var stock = itemQuantities[ItemId]
      console.log("ItemId: " + ItemId);
      console.log("HowMany: " + HowMany);
      console.log("stock: " + stock);
      // select * from products;

      // update products set stock_quantity = stock_quantity - 10 where item_id = 1;
      
      if (HowMany > stock || stock === 0) {
        console.log("Insufficient quantity (you ordered too many or we are currently out of stock).");
        start();
      } ``



      connection.query(query, [HowMany, ItemId], function (err, results) {
        if (err) throw err;
        
        return results;
      });

        
        connection.end();
        console.log(t.toString());
},

)}
  