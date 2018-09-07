package api

// User describes a user in the system
type User struct {
	ID    int32
	Name  string
	Email string
}

// UserService handles CRUD for user
type UserService interface {
	User(id int32) (*User, error)
}
