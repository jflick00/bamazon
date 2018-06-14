//  Require all npm packages
require("dotenv").config();

var mysql = require("mysql");
var inquirer = require("inquirer");

// Create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.password,
  database: "bamazon"
});

//  Initialize connection
connection.connect(function(err) {
  //  if error...
  if (err) throw err;
  //  if no error, run itemsForsale function
  itemsForsale();
});

function itemsForsale() {
  //  Connecting to sequel database and selecting table (products)
  connection.query("SELECT * FROM products", function(err, res) {
    
    //  Console log column headers
    console.log("-----------------------------------");
    console.log(" ID\tProduct Name\tPrice ");  
    console.log("-----------------------------------");
    
    //  For-loop to display id, product name, and price from table
    for (var i = 0; i < res.length; i++) {
      console.log(" " + res[i].id + "\t" + res[i].product_name + "\t" + res[i].price.toFixed(2));
    }
    console.log("-----------------------------------");
  });
  
  //  Run displayMessages function
  displayMessages();
}

function displayMessages(res) {

  //  Prompt user to see what item they would like to purchase
  inquirer
    .prompt([
      {
        name: "message1",
        type: "input",
        message: "Please type in the id of the product you would like to purchase.",
      }
    ]).then(function(answer) {
      var correct = false;
      for (var i=0; i < res.length; i++) {
        if(res[i].product_name == answer.message1) {
          correct = true;
          var product = answer.message1;
          var id=i;
          inquirer.prompt({
            name: "message2",
            type: "input",
            message: "How many units would you like to purchase?",
            validate: function(value) {
              if(isNaN(value)==false) {
                  return true;
              } else {
                  return false;
              }
            }
          }).then(function(answer) {
            if((res[id].stock_quantity-answer.message2) > 0) {
              connection.query("UPDATE products SET stock_quantity='"+(res[id].stock_quantity-answer.message2+"' WHERE product_name='"+product+"'", function() {
                console.log("Product Bought!");
                itemsForsale();
              }))
            } else {
                console.log("Not enough in stock, sorry!");
                displayMessages(res);
            }
          })
        }
      }
    })
}