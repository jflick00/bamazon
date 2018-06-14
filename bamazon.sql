DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ready Player One", "Movies and TV", 24.99, 500), ("Echo (Smart speaker with Alexa)", "Echo and Alexa", 79.99, 150), ("Sony KD70X69OE 70-Inch 4K Ultra HD Smart LED TV (2017 Model)", "TV and Video", 998.00, 100), ("Apple 13 inch MacBook Air (2017 Version) 1.8GHz Core i5 CPU, 8GB RAM, 256GB SSD", "Computers", 1035.00, 50), ("Fire HD 8 Tablet with Alexa", "Computers", 59.99, 100), ("Playstation 4 Slim 500GB Console", "Video Games", 289.95, 130), ("Xbox One S 500GB Console", "Video Games", 199.00, 150), ("Nintendo Switch", "Video Games", 299.00, 80), ("Oculus Rift - Virtual Reality Headset", "Video Games", 499.00, 60), ("Black Panther", "Movies and TV", 17.00, 500);

SELECT * FROM products;
