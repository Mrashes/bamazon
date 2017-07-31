create database bamazon;

use bamazon;

create table products (
	item_id int(11) not null auto_increment,
    product_name varchar(100) null,
    department_name varchar(100) null,
    price decimal(10,2) null,
    stock_quantity int(11) null,
    primary key (item_id)
);

create table departments (
	department_id int(11) not null auto_increment,
    department_name varchar(100) null,
    over_head_cost decimal(10,2) null,
    primary key (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ('CD Player', 'Electronics', 20.99, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Flash Drive', 'Electronics', 19.99, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Table', 'Furniture', 80.00, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Apple', 'Produce', 60.25, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Entertainment Center', 'Furniture', 119.99, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('T-shirt', 'Clothing', 19.99, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Pants', 'Clothing', 30.00, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Socks', 'Clothing', 5.99, 80);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Potato', 'Produce', 9.99, 400);