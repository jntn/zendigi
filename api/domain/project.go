package models

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
	CreateProject(title string, description string, accountID int32) (int32, error)
	DeleteProject(id int32) error
	UpdateProject(id int32, title string, description string) error
}
