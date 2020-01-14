UPDATE users
SET
  username = $2,
  first_name = $3,
  last_name = $4,
  email = $5,
  birthday = $6,
  gender = $7
WHERE user_id = $1;