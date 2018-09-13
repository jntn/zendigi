package postgres

import "database/sql"

// Open the connection to db
func Open(conn string) (*sql.DB, error) {
	db, err := sql.Open("postgres", conn)

	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, err
}
