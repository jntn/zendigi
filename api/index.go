package main

import (
	//"fmt"
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

// func main() {
// 	if !isTesting {
// 		openDatabase()
// 	}
// 	defer db.Close()
// 	fmt.Println("\n🚀 Zendigi API")
// 	fmt.Println("--------------")
// 	fmt.Printf("  * Starting server on %v\n\n", port)

// 	log.Fatal(http.ListenAndServe(port, router()))

// 	log.Println("Shut down.")
// }

// Handler is the entrypoint for now
func Handler(w http.ResponseWriter, r *http.Request) {
	//fmt.Fprintf(w, "Hello from Go on Now 2.0!")
	openDatabase()

	us := &postgres.UserService{DB: db, SigningKey: []byte(signingKey)}
	ps := &postgres.ProjectService{DB: db}

	schema := graphqlgo.MustParseSchema(graphql.GetRootSchema(), &graphql.Resolver{UserService: us, ProjectService: ps})

	tokenAuth = jwtauth.New("HS256", []byte(signingKey), nil)

	(&relay.Handler{Schema: schema}).ServeHTTP(w, r)
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

	r.Post("/query", (&relay.Handler{Schema: schema}).ServeHTTP)

	return r
}