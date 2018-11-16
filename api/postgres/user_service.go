package postgres

import (
	"database/sql"

	jwt "github.com/dgrijalva/jwt-go"
	domain "github.com/jntn/zendigi/api/domain"
	_ "github.com/lib/pq" // Import needed for database/sql with postgres
	"golang.org/x/crypto/bcrypt"
)

// Make sure UserService implements domain.UserService
var _ domain.UserService = &UserService{}

// UserService postgres implementation
type UserService struct {
	DB         *sql.DB
	SigningKey []byte
}

// Claims is a custom claims struct
type Claims struct {
	Role   string `json:"role"`
	UserID int32  `json:"userId"`
	jwt.StandardClaims
}

// User gets a user by id
func (us *UserService) User(id int32) (*domain.User, error) {
	var u domain.User

	err := us.DB.QueryRow(queries["getUser"], id).Scan(&u.ID, &u.Name, &u.Email)

	if err != nil {
		return nil, err
	}

	return &u, nil
}

// Create add a new user
func (us *UserService) Create(name string, email string, password string) (int32, error) {
	var id int32

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(password), 12)

	if err != nil {
		return 0, err
	}

	err = us.DB.QueryRow(`
	INSERT INTO account (name, email, password)
	VALUES ($1, $2, $3)
	RETURNING id`, name, email, passwordHash).Scan(&id)

	if err != nil {
		return 0, err
	}

	return id, nil
}

// Login logs in a user
func (us *UserService) Login(email string, password string) (string, error) {

	var u domain.User

	err := us.DB.QueryRow("SELECT * FROM account WHERE email = $1", email).Scan(&u.ID, &u.Name, &u.Email, &u.Password)

	if err != nil {
		return "", err
	}

	err = bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))

	if err != nil {
		return "", err
	}

	claims := Claims{
		"user",
		u.ID,
		jwt.StandardClaims{
			Issuer: "zendigi",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(us.SigningKey)

	if err != nil {
		return "", err
	}

	return tokenString, nil
}
