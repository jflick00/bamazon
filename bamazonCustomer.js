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

    setTimeout(function(){
      askUser(res);
     }, 1000);
  });
}

function askUser(inventory) {

  //  Prompt user to see what item they would like to purchase
  inquirer
    .prompt([
      {
        type: "input",
        name: "idMessage",
        message: "Please type in the id of the product you would like to purchase.",
        validate: function(value) {
          return !isNaN(value);
        }
      },
      {
        type: "input",
        name: "quantityMessage",
        message: "How many units of this product would you like to purchase?",
        validate: function(val) {
          return val > 0;
        }
      }
    // ]).then(function(inventory) {
    ]).then(function(value) {
      //  Storing the ID user chooses into a variable
      var userInput = parseInt(value.idMessage);

      //  Creating for-loop to see if the ID user chose matches any in the inventory
      for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].id === userInput) {
          return inventory[i].product_name;
        }
      }

      //  If userInput does NOT equal any of the item IDs...
      console.log("\nSorry, we do not currently supply that item.\n");
      itemsForsale();
    })
}

// function askQuantity(product) {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "quantityMessage",
//         message: "How many units of this product would you like to purchase?",
//         validate: function(val) {
//           return val > 0;
//         }

//       }
//     ]).then(function() {
//       //  If user enters in a higher number than how many are available in stock
//       if (quantityMessage > product.stock_quantity) {
//         console.log("Insufficient quantity!");
//         askId();
//       }
//       else {
//         //  Make the purchase and update the inventory
//         connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?",
//         [quantityMessage, product.item_id],
//         function(err, res) {
//           console.log("Successfully purchased " + quantityMessage + " " + product.product_name + "'s!");
//           askId();
//         })
//       }
//     })
// }