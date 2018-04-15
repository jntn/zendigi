-- name: getEventsForCategory
select *
from event
where "categoryId" = :id

-- name: getCategory
select *
from category
where id = :id

-- name: getAll
SELECT * FROM event