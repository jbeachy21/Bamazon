DROP TABLE IF EXISTS products;
CREATE TABLE products (
	item_id INT AUTO_INCREMENT,
	product_name VARCHAR(500),
	department_name VARCHAR(500),
	price DECIMAL(10,2),
	stock_quantity DECIMAL(4),
	PRIMARY KEY(item_id)
);

USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("Sweden home soccer jersey", "Clothing", 75, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("Google Home Mini", "Electronics", 50, 500); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("World Cup 2018 Russia Ball", "Sports", 30, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("Onkyo Receiver", "Electronics", 500, 500); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("Slanderous canvas poster about Shape of Water stating that it was most coked out idea for a movie ever", "Art", 75.00, 500); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("Zlatan is a better player than Messi and Ronaldo canvas poster", "Art", 75.00, 500); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("For the love of beer bottle opener", "Bar and Kitchen", 5.00, 500); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("Swedish flag", "Flags", 20.00, 500); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("Lava lamp", "Home", 20.00, 500); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("Walter White Chemistry set", "Scientific", 75.00, 500); 

INSERT INTO products (product_name, department_name, price, stock_quantity)
values("Mission Impossible: Fallout", "Multimedia", 20.00, 500); 