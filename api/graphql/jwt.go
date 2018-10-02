package graphql

import (
	"context"
	"fmt"

	"github.com/go-chi/jwtauth"
)

func getUserIDFromToken(ctx context.Context) (int32, error) {
	token, claims, err := jwtauth.FromContext(ctx)
	if err != nil {
		return 0, fmt.Errorf("Token not valid")
	}

	if token == nil || !token.Valid {
		return 0, fmt.Errorf("Token not valid")
	}

	userIDClaim, ok := claims["userId"]

	if !ok {
		return 0, fmt.Errorf("UserID claim not found in token")
	}

	userID, ok := userIDClaim.(float64)

	if !ok {
		return 0, fmt.Errorf("UserID claim not found in token")
	}

	return int32(userID), nil
}
