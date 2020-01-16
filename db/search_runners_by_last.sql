SELECT r.total_time, u.first_name, u.last_name,  u.gender, r.result_id
FROM results r
JOIN users u ON r.user_id = u.user_id
WHERE (u.first_name ILIKE '%' || $1 || '%') AND (u.last_name ILIKE '%' || $2 || '%')
ORDER BY u.last_name;