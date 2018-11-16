package postgres

import (
	"database/sql"
	"errors"
	"fmt"

	domain "github.com/jntn/zendigi/domain"
	_ "github.com/lib/pq"
)

var _ domain.ProjectService = &ProjectService{}

// ProjectService postgres implementation
type ProjectService struct {
	DB *sql.DB
}

// Project gets a project by id
func (ps *ProjectService) Project(id int32) (*domain.Project, error) {
	var p domain.Project

	err := ps.DB.QueryRow("SELECT * FROM project WHERE id = $1", id).Scan(&p.ID, &p.Title, &p.Description)

	if err != nil {
		return nil, err
	}

	return &p, nil
}

// ProjectsByAccountID gets projects that belongs to an account
func (ps *ProjectService) ProjectsByAccountID(accountID int32) (*[]*domain.Project, error) {
	rows, err := ps.DB.Query("SELECT id, title, description FROM project WHERE account_id = $1", accountID)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var projects []*domain.Project
	for rows.Next() {
		project := domain.Project{}
		err := rows.Scan(&project.ID, &project.Title, &project.Description)

		if err != nil {
			return nil, err
		}

		projects = append(projects, &project)
	}

	return &projects, nil
}

// CreateProject creates a new project and returns the id
func (ps *ProjectService) CreateProject(title string, description string, accountID int32) (int32, error) {
	var id int32

	if len(title) < 1 {
		return 0, errors.New("Title must be longer than 1 character")
	}

	err := ps.DB.QueryRow(`
	INSERT INTO project (title, description, account_id)
	VALUES ($1, $2, $3)
	RETURNING id`, title, description, accountID).Scan(&id)

	if err != nil {
		return 0, err
	}

	return id, nil
}

// DeleteProject deletes a project
func (ps *ProjectService) DeleteProject(id int32) error {
	res, err := ps.DB.Exec("DELETE FROM project WHERE id = $1", id)

	if err != nil {
		return err
	}

	count, err := res.RowsAffected()
	if err != nil {
		return err
	}

	if count != 1 {
		return fmt.Errorf("No project deleted")
	}

	return nil
}

// UpdateProject updates a project and returns it
func (ps *ProjectService) UpdateProject(id int32, title string, description string) error {
	res, err := ps.DB.Exec(`
	UPDATE project
	SET title = $2, description = $3
	WHERE id = $1`, id, title, description)

	if err != nil {
		return err
	}

	count, err := res.RowsAffected()
	if err != nil {
		return err
	}

	if count != 1 {
		return fmt.Errorf("No project updated")
	}

	return nil
}
