package graphql

import (
	"context"
	"fmt"

	graphql "github.com/graph-gophers/graphql-go"
	"github.com/jntn/zendigi/api"
)

// UserResolver resolves the user type
type UserResolver struct {
	User *api.User
}

// Resolver is the root resolver
type Resolver struct {
	UserService api.UserService
}

// GetUser resolves the getUser query
func (r *Resolver) GetUser(ctx context.Context, args struct{ ID int32 }) (*UserResolver, error) {
	u, err := r.UserService.User(args.ID)
	if err != nil {
		return nil, err
	}

	return &UserResolver{u}, nil
}

// ID resolves the user ID
func (u *UserResolver) ID(ctx context.Context) *graphql.ID {
	return gqlIDP(u.User.ID)
}

// Name resolves the Name field for User, it is all caps to avoid name clashes
func (u *UserResolver) Name(ctx context.Context) *string {
	return &u.User.Name
}

// Email resolves the email field for User, it is all caps to avoid name clashes
func (u *UserResolver) Email(ctx context.Context) *string {
	return &u.User.Email
}

func gqlIDP(id int32) *graphql.ID {
	r := graphql.ID(fmt.Sprint(id))
	return &r
}
