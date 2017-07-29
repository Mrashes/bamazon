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