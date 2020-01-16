SELECT user_id, first_name, last_name, birthday, gender FROM users
WHERE (first_name ILIKE '%' || $1 || '%') AND (last_name ILIKE '%' || $2 || '%')
ORDER BY last_name;