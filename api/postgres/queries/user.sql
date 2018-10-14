-- name: getUser
SELECT id, name, email FROM account WHERE id = $1