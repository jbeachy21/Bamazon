var inquirer = require('inquirer');
var mysql = require("mysql");

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
      
        console.log('Data received');
        for (var i = 0; i<rows.length; i++) {
            console.log("________________________");
            console.log();
            console.log("ID: " + rows[i].item_id + " || Product: " + rows[i].product_name + " || Department: " + rows[i].department_name + 
            " || Price: " + rows[i].price + " || Quantity: " + rows[i].stock_quantity);
            console.log();
        }
        //console.log(rows);
        start();
      });
    
    // run the start function after the connection is made to prompt the user
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
    
    var query = "SELECT * FROM products WHERE item_id=?";
    connection.query(query,answers.ItemId, function(err, results) {
      if (err) throw err;
      
      console.log("The item is: " + JSON.stringify(results[0]));
      if (results[0].stock_quantity === 0) {
        console.log("Sorry but we have just run out of that product. You will have to select another");
      }
      else {
        //Subtract Units from results[0].stock_quantity and update the products table in the bamazon database
      }
      start();
    

  });})
  }
  