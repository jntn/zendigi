package graphql

import (
	domain "github.com/jntn/zendigi/api/domain"
)

// Resolver is the root resolver
type Resolver struct {
	UserService    domain.UserService
	ProjectService domain.ProjectService
	JwtSecret      []byte
}
