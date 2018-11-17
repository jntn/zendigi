package main

import (
	"log"
	"net/http"
	"os"
	"database/sql"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/jwtauth"
	graphqlgo "github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
	graphql "github.com/jntn/zendigi/api/graphql"
	"github.com/jntn/zendigi/api/postgres"
	"github.com/joho/godotenv"
)

var (
 tokenAuth *jwtauth.JWTAuth
 port = ":3001"
 db *sql.DB
 signingKey string
 isTesting bool
)

func openDatabase () {
	if (db != nil) {
		return
	}

	err := godotenv.Load()

	conn := os.Getenv("DB_CONN")
	signingKey = os.Getenv("SIGNING_KEY")

	db, err = postgres.Open(conn)
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}
}

// Handler is the entrypoint for now
func Handler(w http.ResponseWriter, r *http.Request) {
	openDatabase()

	us := &postgres.UserService{DB: db, SigningKey: []byte(signingKey)}
	ps := &postgres.ProjectService{DB: db}

	schema := graphqlgo.MustParseSchema(graphql.GetRootSchema(), &graphql.Resolver{UserService: us, ProjectService: ps})

	tokenAuth = jwtauth.New("HS256", []byte(signingKey), nil)

	middleware.DefaultCompress(middleware.Logger(
		jwtauth.Verifier(tokenAuth)(&relay.Handler{Schema: schema}))).ServeHTTP(w, r)
}

func router() http.Handler {
	us := &postgres.UserService{DB: db, SigningKey: []byte(signingKey)}
	ps := &postgres.ProjectService{DB: db}

	schema := graphqlgo.MustParseSchema(graphql.GetRootSchema(), &graphql.Resolver{UserService: us, ProjectService: ps})

	tokenAuth = jwtauth.New("HS256", []byte(signingKey), nil)

	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.DefaultCompress)
	r.Use(jwtauth.Verifier(tokenAuth))

	if !isTesting {
		r.Use(middleware.Logger)
		r.Use(middleware.Recoverer)
	}

	r.Post("/graphql", (&relay.Handler{Schema: schema}).ServeHTTP)

	return r
}