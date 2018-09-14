package graphql

import (
	"context"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/jntn/zendigi/api"
)

// UserResolver resolves the user type
type UserResolver struct {
	User           *api.User
	ProjectService api.ProjectService
}

// GetUser resolves the getUser query
func (r *Resolver) GetUser(ctx context.Context, args struct{ ID int32 }) (*UserResolver, error) {
	u, err := r.UserService.User(args.ID)
	if err != nil {
		return nil, err
	}

	return &UserResolver{User: u, ProjectService: r.ProjectService}, nil
}

// ID resolves the user ID
func (u *UserResolver) ID(ctx context.Context) *graphql.ID {
	return gqlIDP(u.User.ID)
}

// Name resolves the Name field for User
func (u *UserResolver) Name(ctx context.Context) *string {
	return &u.User.Name
}

// Email resolves the Email field for User
func (u *UserResolver) Email(ctx context.Context) *string {
	return &u.User.Email
}

// Projects resolves the related project for user
func (u *UserResolver) Projects(ctx context.Context) (*[]*ProjectResolver, error) {
	p, err := u.ProjectService.ProjectsByAccountID(u.User.ID)

	if err != nil {
		return nil, err
	}

	l := make([]*ProjectResolver, len(*p))
	for i := range l {
		l[i] = &ProjectResolver{
			Project: (*p)[i],
		}
	}

	return &l, nil
}
