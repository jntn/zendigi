package postgres

import (
	"database/sql"

	"github.com/jntn/zendigi/api"

	// Import needen for database/sql with postgres
	_ "github.com/lib/pq"
)

var _ api.ProjectService = &ProjectService{}

// ProjectService postgres implementation
type ProjectService struct {
	DB *sql.DB
}

// Project gets a project by id
func (ps *ProjectService) Project(id int32) (*api.Project, error) {
	var p api.Project

	err := ps.DB.QueryRow("SELECT * FROM project WHERE id = $1", id).Scan(&p.ID, &p.Title, &p.Description)

	if err != nil {
		return nil, err
	}

	return &p, nil
}

// ProjectsByAccountID gets projects that belongs to an account
func (ps *ProjectService) ProjectsByAccountID(accountID int32) (*[]*api.Project, error) {
	rows, err := ps.DB.Query("SELECT id, title, description FROM project WHERE account_id = $1", accountID)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var projects []*api.Project
	for rows.Next() {
		project := api.Project{}
		err := rows.Scan(&project.ID, &project.Title, &project.Description)

		if err != nil {
			return nil, err
		}

		projects = append(projects, &project)
	}

	return &projects, nil
}
