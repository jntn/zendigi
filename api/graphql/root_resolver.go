package graphql

import "github.com/jntn/zendigi/api"

// Resolver is the root resolver
type Resolver struct {
	UserService    api.UserService
	ProjectService api.ProjectService
	JwtSecret      []byte
}
