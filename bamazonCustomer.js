

var mysql = require("mysql");
var prompt = require("prompt");

//  mysql connection
var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "Bamazon"
});

// Connecting to the Bamazon Database
connection.connect(function(err){
    if(err){
    console.log('Error connecting to Db');
    return;
    }
    console.log('Connection established');

    var schema = {
        properties: {
            ID: {
            message: "Please enter the ID of the product you would like to buy.",
            pattern: /^[0-9][0-9]$|^[0-9]$/,
            required: true
            },
            howMany: {
            message: "Please enter how many units would like to buy?",
            pattern: /^[0-9][0-9]$|^[0-9][0-9][0-9]$/,
            required: true
            }
        }
    };

    var schema2 = {
        properties: {
            AnotherPurchase: {
            message: "Would you like to buy another item?.",
            pattern: /(no|n|yes|y)/,
            required: true
            },
        }
    };

// Function stop to the app
var stopApp = function(){
    return next(err);
}
// Function to start the app
var beginApp = function(){
    connection.query("SELECT * FROM products", function(err, result) {
        if (err) throw err;
        return (getBamazonProducts(result));
      
      });
}

    // Function to display all of the products available for sale in a table
    var getBamazonProducts = function (products){
        console.log("Hello, Welcome to Bamazon. Listed are all of the current products, the cost of each product, and the current stock of the product.");
        for (var i = 0; i < products.length; i++) {
            var productsResults = "\r\n"+
            "Item id: " + products[i].item_id+"\r\n"+
            "Product Name: " + products[i].product_name+"\r\n"+
            "Department Name: " + products[i].department_name+"\r\n"+
            "price: $ "+ products[i].price+"\r\n"+
            "Current Stock: " + products[i].stock_quantity;
            console.log(productsResults);
        }
        userSelectID();
    }

    // Function to get the user selection
    var userSelectID = function(){
        prompt.start();
        console.log("Please enter the ID of the product you would like to buy.");

        prompt.get(schema, function (err, result) {
            if (err){
                console.log(err)
            }
            //console.log(result);
            var userChoiceID = parseInt(result.ID);
            var userChoiceHowMany = parseInt(result.howMany);
            // console.log("id=" + userChoiceID + " how many=" + userChoiceHowMany);

            // Function to check the inventory of an item
            var checkInventory = function(){
                connection.query('SELECT * FROM Products WHERE item_id =' + userChoiceID, function(err, result) {
                    if (err) throw err;
                    //console.log(result);

                    var userWantsToBuy = userChoiceHowMany;
                    var productInventory = result[0].stock_quantity;
                    var productsprice = result[0].price;
                    var isInStock = productInventory - userWantsToBuy;
                    var totalCost= productsprice * userWantsToBuy;

                    if (userWantsToBuy > productInventory || productInventory === 0){
                        console.log("Insufficient quantity!"+"\r\n"+"\r\n");
                        userSelectID();
                    } else {
                        console.log("There are "+result[0].stock_quantity+" of "+result[0].product_name);
                        console.log("You are purchasing "+ userWantsToBuy +" "+result[0].product_name+"s at $"+ result[0].price+" per item.");
                        console.log("Your total is $"+totalCost);
                        connection.query('UPDATE Products SET stock_quantity = '+isInStock+' WHERE item_id ='+userChoiceID, function(err, result){
                        if (err) throw err;
                            connection.query('SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE item_id ='+userChoiceID, function(err, result){
                                //console.log(result);
                            }); 
                        });
                        prompt.get(schema2, function (err, result) {
                            if (err){
                                console.log(err)
                            }
                            console.log(result);
                            var userAnswer = result.AnotherPurchase;
                            if (userAnswer === "n" || userAnswer === "no"){
                                stopApp();
                            }else{
                                beginApp();
                            }   
                        });
                    }
                  });
            };
            checkInventory();
        });
    }

// start the app
beginApp();
});
