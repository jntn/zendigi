package graphql

import (
	"fmt"

	graphql "github.com/graph-gophers/graphql-go"
)

func gqlIDP(id int32) *graphql.ID {
	r := graphql.ID(fmt.Sprint(id))
	return &r
}
