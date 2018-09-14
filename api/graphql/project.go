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
