DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,3) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO Products (product_name, department_name, price, stock_quantity) VALUES ("It's A Wonderful Life", "Drama", 19.99, 32);
INSERT INTO Products (product_name, department_name, price, stock_quantity) VALUES ("Willy Wonka and the Chocolate Factory", "Family", 9.99, 52);
INSERT INTO Products (product_name, department_name, price, stock_quantity) VALUES ("Arrival", "Drama", 8.99, 17);
INSERT INTO Products (product_name, department_name, price, stock_quantity) VALUES ("The Wizard of Oz", "Family", 9.95, 29);
INSERT INTO Products (product_name, department_name, price, stock_quantity) VALUES ("Hereditary", "Mystery", 4.99, 34);
INSERT INTO Products (product_name, department_name, price, stock_quantity) VALUES ("Wonder Woman", "Action", 14.99, 24);
INSERT INTO Products (product_name, department_name, price, stock_quantity) VALUES ("The Avengers", "Action", 15.99, 54);
INSERT INTO Products (product_name, department_name, price, stock_quantity) VALUES ("Mad Max: Fury Road", "Action", 17.99, 72);
INSERT INTO Products (product_name, department_name, price, stock_quantity) VALUES ("The Revenant", "Adventure", 18.99, 89);
INSERT INTO Products (product_name, department_name, price, stock_quantity) VALUES ("Shutter Island", "Mystery", 19.99, 98);

select * from products;