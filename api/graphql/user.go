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

// Login hej
func (r *Resolver) Login(ctx context.Context, args struct {
	Email    string
	Password string
}) (string, error) {
	t, err := r.UserService.Login(args.Email, args.Password)
	if err != nil {
		return "", err
	}

	return t, nil
}

// CreateUser hej
func (r *Resolver) CreateUser(ctx context.Context, args struct {
	Name     string
	Email    string
	Password string
}) (*graphql.ID, error) {
	id, err := r.UserService.Create(args.Name, args.Email, args.Password)

	return gqlIDP(id), err
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

// Password resolves the Password field for User
func (u *UserResolver) Password(ctx context.Context) *string {
	return &u.User.Password
}

// Projects resolves the related project for user
func (u *UserResolver) Projects(ctx context.Context) (*[]*ProjectResolver, error) {
	userID, err := getUserIDFromToken(ctx)

	if err != nil {
		return nil, err
	}

	p, err := u.ProjectService.ProjectsByAccountID(userID)

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
