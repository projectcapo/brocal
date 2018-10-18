### Schema
DROP DATABASE IF EXISTS brocal_db;
CREATE DATABASE brocal_db;
USE brocal_db;

CREATE TABLE user
(
	id int NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(20) NOT NULL,
	first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    age INT(2) NOT NULL,
    start_weight INT(3) NOT NULL,
    goal_weight INT(3) NOT NULL,
    goal_date DATE NOT NULL,
    calorie_intake INT(10) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE user_session
(
	id int NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
	timestamp TIMESTAMP NOT NULL,
	session_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE food_log
(
	id int NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
	food_name VARCHAR(255) NOT NULL,
    food_type VARCHAR(255) NOT NULL,
    meal_category VARCHAR(255) NOT NULL,
    servings INT(3) NOT NULL,
    calories INT(10) NOT NULL,
	consumed_time TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE booze_log
(
	id int NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
	booze_name VARCHAR(255) NOT NULL,
    booze_type VARCHAR(255) NOT NULL,
    meal_category VARCHAR(255) NOT NULL,
    servings INT(3) NOT NULL,
    calories INT(10) NOT NULL,
	consumed_time TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE weight_log
(
	id int NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	current_weight INT(3) NOT NULL,
	weighed_time TIMESTAMP NOT NULL,
	feels VARCHAR(200) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES user(id)
);
