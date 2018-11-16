package models

// User describes a user in the system
type User struct {
	ID       int32
	Name     string
	Email    string
	Password string
}

// UserService handles CRUD for user
type UserService interface {
	User(id int32) (*User, error)
	Login(email string, password string) (string, error)
	Create(name string, email string, password string) (int32, error)
}
