package api

// Project describes a project in the system
type Project struct {
	ID          int32
	Title       string
	Description string
}

// ProjectService handles CRUD for projects
type ProjectService interface {
	Project(id int32) (*Project, error)
	ProjectsByAccountID(accountID int32) (*[]*Project, error)
}
