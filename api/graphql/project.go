package graphql

import (
	"context"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/jntn/zendigi/api"
)

// ProjectResolver resolves the Project type
type ProjectResolver struct {
	Project *api.Project
}

// GetProject resolves the getProject query
func (r *Resolver) GetProject(ctx context.Context, args struct{ ID int32 }) (*ProjectResolver, error) {
	p, err := r.ProjectService.Project(args.ID)
	if err != nil {
		return nil, err
	}

	return &ProjectResolver{p}, nil
}

// GetProjectsByAccountID x
func (r *Resolver) GetProjectsByAccountID(ctx context.Context, args struct{ AccountID int32 }) (*[]*ProjectResolver, error) {
	ps, err := r.ProjectService.ProjectsByAccountID(args.AccountID)
	if err != nil {
		return nil, err
	}

	var projectResolvers []*ProjectResolver

	for _, p := range *ps {
		projectResolvers = append(projectResolvers, &ProjectResolver{p})
	}

	return &projectResolvers, nil
}

// CreateProject x
func (r *Resolver) CreateProject(ctx context.Context, args struct {
	Title       string
	Description string
}) (*graphql.ID, error) {
	userID, err := getUserIDFromToken(ctx)

	if err != nil {
		return nil, err
	}

	id, err := r.ProjectService.CreateProject(args.Title, args.Description, userID)

	if err != nil {
		return nil, err
	}

	return gqlIDP(id), err
}

// ID resolves the user ID
func (u *ProjectResolver) ID(ctx context.Context) *graphql.ID {
	return gqlIDP(u.Project.ID)
}

// Title resolves the Title field for Project
func (u *ProjectResolver) Title(ctx context.Context) *string {
	return &u.Project.Title
}

// Description resolves the Description field for Project
func (u *ProjectResolver) Description(ctx context.Context) *string {
	return &u.Project.Description
}
