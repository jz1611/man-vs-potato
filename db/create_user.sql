INSERT INTO users (first_name, last_name, username, email, birthday, gender, password)
VALUES ($1, $2, $3, $4, $5, $6, $7);

SELECT username FROM users
WHERE username = $3;