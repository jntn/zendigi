package postgres

import (
	"database/sql"

	"github.com/jntn/zendigi/api"
	// Import needed for database/sql with postgres
	_ "github.com/lib/pq"
)

// Make sure UserService implements api.UserService
// Needed?
var _ api.UserService = &UserService{}

// UserService postgres implementation
type UserService struct {
	DB *sql.DB
}

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

// User gets a user by id
func (s *UserService) User(id int32) (*api.User, error) {
	var u api.User

	err := s.DB.QueryRow("SELECT * FROM account WHERE id = $1", id).Scan(&u.ID, &u.Name, &u.Email)

	if err != nil {
		return nil, err
	}

	return &u, nil
}
