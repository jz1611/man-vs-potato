SELECT r.total_time, u.first_name, u.last_name, u.gender
FROM results r
JOIN users u ON r.user_id = u.user_id
WHERE u.gender = $1
ORDER BY total_time
LIMIT 1;