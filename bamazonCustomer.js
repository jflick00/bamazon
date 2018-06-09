require("dotenv").config();

var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.password,
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  itemsForsale();
  setTimeout(displayMessages, 1000);
});

function itemsForsale() {
  
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("-----------------------------------");
    console.log(" ID | Product Name | Price ");  
    console.log("-----------------------------------");
    
    for (var i = 0; i < res.length; i++) {
      console.log(" " + res[i].id + " | " + res[i].product_name + " | " + res[i].price.toFixed(2));
    }
    console.log("-----------------------------------");
  });
}

function displayMessages() {
  connection.query("SELECT * FROM products", function(res) {

  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "message1",
        type: "input",
        message: "Please type in the id of the product you would like to purchase.",
        // validate: function(answer) {
        //   for (var i=0; i < res.length; i++) {
        //       if (answer.message1 !== res.id[i]) {
        //         return true;
        //       }
        //       return false;
        //   }
        // }
        
      },
      {
        name: "message2",
        type: "input",
        message: "How many units of the product would you like to purchase?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      // // get the information of the chosen item
      var chosenItem;
      for (var i = 0; i < res.length; i++) {
        if (res[i].id === answer.message1) {
          chosenItem = res1[i];
        }
      }

      // determine if there is enough stock
      if (chosenItem.stock_quantity > parseInt(answer.message2)) {
        connection.query(
          "UPDATE products SET ? WHERE ?",
          
            {
              stock_quantity: answer.message2
            },
           
          function(error) {
            if (error) throw err;
            console.log("Order placed successfully!");
            itemsForsale();
          }
        );
      }
      else {
        console.log("Insufficient quantity!");
        itemsForsale();
      }
    });
  })
}

