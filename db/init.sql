-- Initial DB setup... DO NOT USE UNLESS THIS IS THE FIRST TIME SETTING UP
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS results;

-- Create tables
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  username VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL,
  birthday DATE NOT NULL,
  gender VARCHAR(1) NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE results (
  result_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  total_time TIME NOT NULL
);

CREATE TABLE shop (
  item_id SERIAL PRIMARY KEY,
  item_name VARCHAR(30) NOT NULL,
  img_url TEXT,
  img_alt_text VARCHAR(20) NOT NULL,
  price FLOAT NOT NULL
);

-- Dummy data
INSERT INTO users(first_name, last_name, username, email, birthday, gender, password)
VALUES ('Speedy', 'McFast', '2Fast4U', 'gottagofast@email.com', '1988-04-24', 'm', 'test');

INSERT INTO results(user_id, start_time, end_time, total_time)
VALUES (1, '06:00:00', '14:32:34', '8:32:34');

INSERT INTO shop(item_name, img_url, img_alt_text, price)
VALUES ('Commemorative Potato', 'img.png', 'potato', 9.99);